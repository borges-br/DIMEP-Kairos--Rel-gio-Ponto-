param(
    [string]$DimepSpec = "docs/specs/dimep-swagger-v1.json",
    [string]$ImuvSpec = "docs/specs/imuv-apiary-2026-03-27.json",
    [string]$Output = "docs/API_DIMEP_IMUV_CATALOGO_EXAUSTIVO.md"
)

$ErrorActionPreference = "Stop"

function Add-Line {
    param([System.Collections.Generic.List[string]]$Lines, [object]$Value = "")
    [void]$Lines.Add([string]$Value)
}

function Escape-Cell {
    param([object]$Value)
    if ($null -eq $Value) { return "" }
    return (([string]$Value) -replace "\r?\n", "<br>" -replace "\|", "\|").Trim()
}

function Schema-Label {
    param([object]$Schema)
    if ($null -eq $Schema) { return "" }
    if ($Schema.'$ref') { return ([string]$Schema.'$ref') -replace '^#/definitions/', '' }
    if ($Schema.type -eq 'array') {
        $item = Schema-Label $Schema.items
        if ($item) { return "array<$item>" }
        return "array"
    }
    if ($Schema.type) { return [string]$Schema.type }
    return "object"
}

function Add-CodeBlock {
    param(
        [System.Collections.Generic.List[string]]$Lines,
        [object]$Value,
        [string]$Language = "text"
    )
    if ($null -eq $Value -or [string]::IsNullOrWhiteSpace([string]$Value)) { return }
    Add-Line $Lines ('````' + $Language)
    Add-Line $Lines ([string]$Value)
    Add-Line $Lines '````'
    Add-Line $Lines
}

function Add-Parameters {
    param(
        [System.Collections.Generic.List[string]]$Lines,
        [object[]]$Parameters
    )
    if (-not $Parameters -or $Parameters.Count -eq 0) {
        Add-Line $Lines "Sem parâmetros declarados."
        Add-Line $Lines
        return
    }
    Add-Line $Lines "| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |"
    Add-Line $Lines "|---|---|---:|---|---|---|"
    foreach ($parameter in $Parameters) {
        $type = if ($parameter.schema) { Schema-Label $parameter.schema } elseif ($parameter.type) { $parameter.type } else { "" }
        $required = if ($parameter.required) { "sim" } else { "não" }
        Add-Line $Lines ('| `{0}` | {1} | {2} | `{3}` | `{4}` | {5} |' -f
            (Escape-Cell $parameter.name),
            (Escape-Cell $parameter.in),
            $required,
            (Escape-Cell $type),
            (Escape-Cell $parameter.default),
            (Escape-Cell $parameter.description))
    }
    Add-Line $Lines
}

$dimep = Get-Content -Raw -LiteralPath $DimepSpec | ConvertFrom-Json
$imuv = Get-Content -Raw -LiteralPath $ImuvSpec | ConvertFrom-Json
$lines = [System.Collections.Generic.List[string]]::new()

Add-Line $lines "# Catálogo exaustivo — APIs DIMEP Kairos e IMUV"
Add-Line $lines
Add-Line $lines '> Gerado mecanicamente a partir das especificações locais. Este arquivo preserva inclusive inconsistências, lacunas e exemplos das fontes; consulte o guia humano `API_DIMEP_IMUV_GUIA_DE_INTEGRACAO.md` antes de implementar.'
Add-Line $lines
Add-Line $lines "## 1. DIMEP Kairos — inventário completo"
Add-Line $lines
Add-Line $lines ('- Swagger: `{0}`' -f $dimep.swagger)
Add-Line $lines ("- Título: {0}" -f $dimep.info.title)
Add-Line $lines ('- Versão declarada: `{0}`' -f $dimep.info.version)
Add-Line $lines ('- Base: `{0}://{1}`' -f $dimep.schemes[0], $dimep.host)
Add-Line $lines

$dimepOperations = foreach ($pathProperty in $dimep.paths.PSObject.Properties) {
    foreach ($operationProperty in $pathProperty.Value.PSObject.Properties) {
        if ($operationProperty.Name -notin @('get','post','put','delete','patch','head','options')) { continue }
        [pscustomobject]@{
            Tag = ($operationProperty.Value.tags -join ', ')
            Method = $operationProperty.Name.ToUpperInvariant()
            Path = $pathProperty.Name
            Operation = $operationProperty.Value
        }
    }
}

Add-Line $lines ("**Total:** {0} operações, {1} rotas e {2} modelos." -f $dimepOperations.Count, ($dimep.paths.PSObject.Properties | Measure-Object).Count, ($dimep.definitions.PSObject.Properties | Measure-Object).Count)
Add-Line $lines
Add-Line $lines "### 1.1 Matriz de operações"
Add-Line $lines
Add-Line $lines "| Grupo | Método | Rota | Operação | Entrada | Respostas declaradas |"
Add-Line $lines "|---|---|---|---|---|---|"
foreach ($entry in ($dimepOperations | Sort-Object Tag, Path, Method)) {
    $body = @($entry.Operation.parameters | Where-Object in -eq 'body')
    $input = if ($body.Count) { (($body | ForEach-Object { Schema-Label $_.schema }) -join ', ') } else { "—" }
    $statuses = ($entry.Operation.responses.PSObject.Properties.Name -join ', ')
    Add-Line $lines ('| {0} | `{1}` | `{2}` | {3} | `{4}` | {5} |' -f
        (Escape-Cell $entry.Tag), $entry.Method, (Escape-Cell $entry.Path),
        (Escape-Cell $entry.Operation.summary), (Escape-Cell $input), (Escape-Cell $statuses))
}
Add-Line $lines

Add-Line $lines "### 1.2 Detalhamento de cada operação"
Add-Line $lines
foreach ($group in ($dimepOperations | Group-Object Tag | Sort-Object Name)) {
    Add-Line $lines ("#### Grupo: {0}" -f $group.Name)
    Add-Line $lines
    foreach ($entry in ($group.Group | Sort-Object Path, Method)) {
        $operation = $entry.Operation
        Add-Line $lines ('##### `{0} {1}`' -f $entry.Method, $entry.Path)
        Add-Line $lines
        if ($operation.summary) { Add-Line $lines $operation.summary; Add-Line $lines }
        Add-Line $lines ('- `operationId`: `{0}`' -f $operation.operationId)
        Add-Line $lines ('- Consome: `{0}`' -f ($operation.consumes -join '`, `'))
        Add-Line $lines ('- Produz: `{0}`' -f ($operation.produces -join '`, `'))
        Add-Line $lines
        Add-Line $lines "Parâmetros:"
        Add-Line $lines
        Add-Parameters $lines @($operation.parameters)
        Add-Line $lines "Respostas declaradas:"
        Add-Line $lines
        Add-Line $lines "| HTTP | Descrição | Schema |"
        Add-Line $lines "|---:|---|---|"
        foreach ($responseProperty in $operation.responses.PSObject.Properties) {
            Add-Line $lines ('| {0} | {1} | `{2}` |' -f
                (Escape-Cell $responseProperty.Name),
                (Escape-Cell $responseProperty.Value.description),
                (Escape-Cell (Schema-Label $responseProperty.Value.schema)))
        }
        Add-Line $lines
        if ($operation.description) {
            Add-Line $lines "Descrição e exemplo da especificação:"
            Add-Line $lines
            Add-CodeBlock $lines $operation.description "text"
        }
        foreach ($responseProperty in $operation.responses.PSObject.Properties) {
            if ($responseProperty.Value.examples) {
                Add-Line $lines ("Exemplo de resposta HTTP {0}:" -f $responseProperty.Name)
                Add-Line $lines
                Add-CodeBlock $lines ($responseProperty.Value.examples | ConvertTo-Json -Depth 100) "json"
            }
        }
    }
}

Add-Line $lines "### 1.3 Modelos DIMEP"
Add-Line $lines
foreach ($definitionProperty in ($dimep.definitions.PSObject.Properties | Sort-Object Name)) {
    $definition = $definitionProperty.Value
    Add-Line $lines ('#### `{0}`' -f $definitionProperty.Name)
    Add-Line $lines
    Add-Line $lines ('- Tipo: `{0}`' -f $definition.type)
    if ($definition.required) { Add-Line $lines ('- Obrigatórios: `{0}`' -f ($definition.required -join '`, `')) }
    Add-Line $lines
    if ($definition.properties) {
        Add-Line $lines "| Campo | Tipo | Formato | Enum/Referência | Descrição |"
        Add-Line $lines "|---|---|---|---|---|"
        foreach ($property in $definition.properties.PSObject.Properties) {
            $schema = $property.Value
            $enumOrRef = if ($schema.'$ref') {
                $schema.'$ref'
            } elseif ($schema.items.'$ref') {
                $schema.items.'$ref'
            } elseif ($schema.enum) {
                $schema.enum -join ', '
            } else { "" }
            Add-Line $lines ('| `{0}` | `{1}` | `{2}` | `{3}` | {4} |' -f
                (Escape-Cell $property.Name),
                (Escape-Cell (Schema-Label $schema)),
                (Escape-Cell $schema.format),
                (Escape-Cell $enumOrRef),
                (Escape-Cell $schema.description))
        }
        Add-Line $lines
    } else {
        Add-Line $lines "Sem propriedades declaradas na especificação."
        Add-Line $lines
    }
}

Add-Line $lines "## 2. IMUV — inventário completo"
Add-Line $lines
Add-Line $lines ("- Nome: {0}" -f $imuv.name)
Add-Line $lines ('- Última atualização declarada: `{0}`' -f $imuv.lastUpdated)
Add-Line $lines ('- Produção de exemplo: `{0}`' -f $imuv.urls.production)
Add-Line $lines ('- Mock: `{0}`' -f $imuv.urls.mock)
Add-Line $lines

$imuvResources = @($imuv.resourceGroups | ForEach-Object resources)
$imuvActions = @($imuvResources | ForEach-Object actions)
Add-Line $lines ("**Total:** {0} operações em {1} recursos." -f $imuvActions.Count, $imuvResources.Count)
Add-Line $lines
Add-Line $lines "### 2.1 Matriz de operações"
Add-Line $lines
Add-Line $lines "| Recurso | Método | Rota | Operação | Respostas declaradas |"
Add-Line $lines "|---|---|---|---|---|"
foreach ($resource in $imuvResources) {
    foreach ($action in $resource.actions) {
        $statuses = @($action.examples | ForEach-Object responses | ForEach-Object status | Sort-Object -Unique) -join ', '
        Add-Line $lines ('| {0} | `{1}` | `{2}` | {3} | {4} |' -f
            (Escape-Cell $resource.name),
            (Escape-Cell $action.method),
            (Escape-Cell $action.uriTemplate),
            (Escape-Cell $action.name),
            (Escape-Cell $statuses))
    }
}
Add-Line $lines

Add-Line $lines "### 2.2 Detalhamento de cada recurso e operação"
Add-Line $lines
foreach ($resource in $imuvResources) {
    Add-Line $lines ("#### {0}" -f $resource.name)
    Add-Line $lines
    if ($resource.description) { Add-Line $lines $resource.description; Add-Line $lines }
    foreach ($action in $resource.actions) {
        Add-Line $lines ('##### `{0} {1}` — {2}' -f $action.method, $action.uriTemplate, $action.name)
        Add-Line $lines
        if ($action.description) { Add-Line $lines $action.description; Add-Line $lines }
        $allParameters = @($resource.parameters) + @($action.parameters)
        Add-Line $lines "Parâmetros:"
        Add-Line $lines
        Add-Parameters $lines $allParameters
        $exampleIndex = 0
        foreach ($example in $action.examples) {
            $exampleIndex++
            if ($action.examples.Count -gt 1) { Add-Line $lines ("Exemplo {0}:" -f $exampleIndex); Add-Line $lines }
            foreach ($request in $example.requests) {
                if ($request.headers -and $request.headers.PSObject.Properties.Count) {
                    Add-Line $lines "Cabeçalhos da requisição:"
                    Add-Line $lines
                    Add-CodeBlock $lines ($request.headers | ConvertTo-Json -Depth 20) "json"
                }
                if ($request.body) {
                    Add-Line $lines "Corpo da requisição:"
                    Add-Line $lines
                    Add-CodeBlock $lines $request.body "json"
                }
                if ($request.schema) {
                    Add-Line $lines "Schema da requisição:"
                    Add-Line $lines
                    Add-CodeBlock $lines $request.schema "json"
                }
            }
            foreach ($response in $example.responses) {
                Add-Line $lines ('Resposta HTTP `{0}`:' -f $response.status)
                Add-Line $lines
                if ($response.headers -and $response.headers.PSObject.Properties.Count) {
                    Add-Line $lines "Cabeçalhos:"
                    Add-Line $lines
                    Add-CodeBlock $lines ($response.headers | ConvertTo-Json -Depth 20) "json"
                }
                if ($response.body) { Add-CodeBlock $lines $response.body "json" }
                if ($response.schema) {
                    Add-Line $lines "Schema da resposta:"
                    Add-Line $lines
                    Add-CodeBlock $lines $response.schema "json"
                }
            }
        }
    }
}

$outputDirectory = Split-Path -Parent $Output
if ($outputDirectory) { New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null }
[System.IO.File]::WriteAllLines((Join-Path (Get-Location) $Output), $lines, [System.Text.UTF8Encoding]::new($false))
Write-Host ("Generated {0} with {1} lines." -f $Output, $lines.Count)
