BEGIN;

SET search_path TO rdo, public;

-- Permissao por pagina e por perfil. O administrador nao depende desta tabela:
-- a aplicacao concede escrita total a ele para que ninguem se tranque do lado
-- de fora ao editar a matriz.
CREATE TABLE IF NOT EXISTS page_permissions (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  role text NOT NULL CHECK (role IN ('leader', 'foreman', 'manager', 'hr', 'director', 'admin')),
  page_key text NOT NULL CHECK (page_key IN (
    'dashboard', 'projects', 'employees', 'rdos', 'distribution', 'hours', 'users', 'settings'
  )),
  access text NOT NULL DEFAULT 'none' CHECK (access IN ('none', 'read', 'write')),
  updated_by_user_id uuid,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, role, page_key),
  FOREIGN KEY (organization_id, updated_by_user_id)
    REFERENCES organization_users(organization_id, user_id)
);

DROP TRIGGER IF EXISTS page_permissions_updated_at ON page_permissions;
CREATE TRIGGER page_permissions_updated_at BEFORE UPDATE ON page_permissions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Padrao por perfil, aplicado a cada organizacao existente. A tela de Usuarios
-- ajusta a partir daqui.
INSERT INTO page_permissions (organization_id, role, page_key, access)
SELECT o.id, padrao.role, padrao.page_key, padrao.access
  FROM organizations o
  CROSS JOIN (VALUES
    ('leader',  'dashboard','read'), ('leader',  'projects','read'), ('leader',  'employees','read'),
    ('leader',  'rdos','write'),     ('leader',  'distribution','write'), ('leader','hours','read'),
    ('leader',  'users','none'),     ('leader',  'settings','none'),

    ('foreman', 'dashboard','read'), ('foreman', 'projects','read'), ('foreman', 'employees','read'),
    ('foreman', 'rdos','write'),     ('foreman', 'distribution','write'), ('foreman','hours','write'),
    ('foreman', 'users','none'),     ('foreman', 'settings','read'),

    ('manager', 'dashboard','read'), ('manager', 'projects','write'), ('manager','employees','read'),
    ('manager', 'rdos','write'),     ('manager', 'distribution','write'), ('manager','hours','write'),
    ('manager', 'users','none'),     ('manager', 'settings','read'),

    ('hr',      'dashboard','read'), ('hr',      'projects','read'), ('hr',      'employees','write'),
    ('hr',      'rdos','read'),      ('hr',      'distribution','none'), ('hr',    'hours','read'),
    ('hr',      'users','none'),     ('hr',      'settings','read'),

    ('director','dashboard','read'), ('director','projects','write'), ('director','employees','write'),
    ('director','rdos','write'),     ('director','distribution','write'), ('director','hours','write'),
    ('director','users','none'),     ('director','settings','write'),

    ('admin',   'dashboard','write'),('admin',   'projects','write'),('admin',   'employees','write'),
    ('admin',   'rdos','write'),     ('admin',   'distribution','write'), ('admin', 'hours','write'),
    ('admin',   'users','write'),    ('admin',   'settings','write')
  ) AS padrao(role, page_key, access)
ON CONFLICT (organization_id, role, page_key) DO NOTHING;

GRANT SELECT, INSERT, UPDATE, DELETE ON page_permissions TO rdo_runtime;
ALTER TABLE page_permissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON page_permissions;
CREATE POLICY tenant_isolation ON page_permissions TO rdo_runtime
  USING (organization_id = rdo.current_organization_id())
  WITH CHECK (organization_id = rdo.current_organization_id());

-- Pares de colaboradores ja avaliados pelo administrador. "distinct" silencia o
-- alerta para sempre; "merged" guarda para quem o cadastro foi consolidado.
CREATE TABLE IF NOT EXISTS collaborator_duplicate_reviews (
  organization_id uuid NOT NULL REFERENCES organizations(id),
  collaborator_id uuid NOT NULL,
  duplicate_of_id uuid NOT NULL,
  decision text NOT NULL CHECK (decision IN ('distinct', 'merged')),
  reason text NOT NULL,
  decided_by_user_id uuid NOT NULL,
  decided_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, collaborator_id, duplicate_of_id),
  FOREIGN KEY (organization_id, collaborator_id) REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, duplicate_of_id) REFERENCES collaborators(organization_id, id),
  FOREIGN KEY (organization_id, decided_by_user_id)
    REFERENCES organization_users(organization_id, user_id),
  CONSTRAINT duplicate_review_pair CHECK (collaborator_id <> duplicate_of_id),
  CONSTRAINT duplicate_review_reason CHECK (length(btrim(reason)) >= 10)
);

GRANT SELECT, INSERT, DELETE ON collaborator_duplicate_reviews TO rdo_runtime;
ALTER TABLE collaborator_duplicate_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON collaborator_duplicate_reviews;
CREATE POLICY tenant_isolation ON collaborator_duplicate_reviews TO rdo_runtime
  USING (organization_id = rdo.current_organization_id())
  WITH CHECK (organization_id = rdo.current_organization_id());

-- A tela de Usuarios cria contas com o papel de execucao. app_users so tinha
-- politica de SELECT e UPDATE; sem INSERT o cadastro era impossivel fora do
-- script administrativo. A linha sozinha nao da acesso a nada: quem vincula a
-- conta ao tenant e organization_users, que tem isolamento proprio.
DROP POLICY IF EXISTS app_users_runtime_insert ON app_users;
CREATE POLICY app_users_runtime_insert ON app_users
  FOR INSERT TO rdo_runtime WITH CHECK (true);

-- O login procura a conta pelo e-mail, entao duplicidade tornaria o acesso
-- ambiguo. O indice so e criado quando a base ja esta consistente.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM app_users WHERE email IS NOT NULL
     GROUP BY email HAVING count(*) > 1
  ) THEN
    CREATE UNIQUE INDEX IF NOT EXISTS app_users_email_uq ON app_users(email) WHERE email IS NOT NULL;
  ELSE
    RAISE WARNING 'app_users tem e-mails repetidos: indice unico nao criado';
  END IF;
END;
$$;

COMMIT;
