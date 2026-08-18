# Catálogo exaustivo — APIs DIMEP Kairos e IMUV

> Gerado mecanicamente a partir das especificações locais. Este arquivo preserva inclusive inconsistências, lacunas e exemplos das fontes; consulte o guia humano `API_DIMEP_IMUV_GUIA_DE_INTEGRACAO.md` antes de implementar.

## 1. DIMEP Kairos — inventário completo

- Swagger: `2.0`
- Título: API de Integração.
- Versão declarada: `v1`
- Base: `https://www.dimepkairos.com.br`

**Total:** 141 operações, 141 rotas e 100 modelos.

### 1.1 Matriz de operações

| Grupo | Método | Rota | Operação | Entrada | Respostas declaradas |
|---|---|---|---|---|---|
| Absence | `POST` | `/RestServiceApi/Absence/GetAbsences` | Método responsável por retornar as ocorrências de falta na empresa consultada. | `object` | 200 |
| AbsenceDelay | `POST` | `/RestServiceApi/AbsenceDelay/GetAbsenceDelay` | Método responsável por consultar as ocorrências de faltas e atrasos do funcionário da empresa. | `object` | 200 |
| AbsenceDelay | `POST` | `/RestServiceApi/AbsenceDelay/Justify` | Método responsável por tratar as ocorrências de faltas e atrasos do funcionário da empresa. | `object` | 200 |
| Absent | `POST` | `/RestServiceApi/Absent/GetAbsent` | Método responsável por retornar os afastamentos na empresa consultada. | `object` | 200 |
| Absent | `POST` | `/RestServiceApi/Absent/GetTypeAbsent` | Método responsável por retornar o tipo de afastamento na empresa consultada. | `object` | 200 |
| Absent | `POST` | `/RestServiceApi/Absent/MarkAbsent` | Método responsável por salvar o afastamento do funcionário da empresa. | `object` | 200 |
| Absent | `POST` | `/RestServiceApi/Absent/UnMarkAbsent` | Método responsável por retirar o afastamento do funcionário da empresa. | `object` | 200 |
| Appointment | `POST` | `/RestServiceApi/Appointment/GetAppointments` | Buscar todas as marcações de acordo com os parâmetros informados no Json. | `object` | 200 |
| Appointment | `POST` | `/RestServiceApi/Appointment/GetAppointmentsPointer` | Buscar todas as marcações de acordo com os parâmetros informados no Json. | `object` | 200 |
| Appointment | `POST` | `/RestServiceApi/Appointment/GetAppointmentsV2` | Buscar todas as marcações de acordo com os parâmetros informados no Json. | `object` | 200 |
| Appointment | `POST` | `/RestServiceApi/Appointment/SetAppointmentsPointer` | Altera o valor de coleta das marcações de acordo com os parâmetros informados no Json. | `object` | 200 |
| CalculationRules | `POST` | `/RestServiceApi/CalculationRules/GetCalculationRulesSummary` | Método responsável por retornar informações de id, código e descrição de Regra de Cálculo. | `object` | 200 |
| Clock | `POST` | `/RestServiceApi/Clock/AssociateClocks` | Associar pessoas ao relógio | `object` | 200 |
| Clock | `POST` | `/RestServiceApi/Clock/ScheduleCommands` | Método responsável por agendar um comando para o relógio. | `object` | 200 |
| Clock | `POST` | `/RestServiceApi/Clock/SearchClocks` | Método responsável por buscar os relógios do sistema. | `object` | 200 |
| Clock | `POST` | `/RestServiceApi/Clock/UnassociateClocks` | Método responsável por desassociar pessoas do relógio. | `object` | 200 |
| Company | `POST` | `/RestServiceApi/Company/GetCompany` | Método responsável por retornar os dados da empresa consultada. | `object` | 200 |
| Delay | `POST` | `/RestServiceApi/Delay/GetDelays` | Método responsável por consultar os atrasos do funcionário da empresa. | `object` | 200 |
| Digital | `POST` | `/RestServiceApi/Digital/ChangeDigital` | Método responsável por salvar a digital. | `object` | 200 |
| Digital | `POST` | `/RestServiceApi/Digital/DeleteDigital` | Método responsável por excluir a digital. | `object` | 200 |
| Digital | `POST` | `/RestServiceApi/Digital/GetAllPeopleWithOrWithoutDigital` | Método para buscar todos os templates biométricos | `object` | 200 |
| Digital | `POST` | `/RestServiceApi/Digital/SaveDigital` | Método responsável por salvar a digital. | `object` | 200 |
| Digital | `POST` | `/RestServiceApi/Digital/SearchDigital` | Método responsável por retornar a digital consultada. | `object` | 200 |
| Dismiss | `POST` | `/RestServiceApi/Dismiss/GetDismissType` | Método responsável por retornar os tipos de desligamentos na empresa consultada. | `object` | 200 |
| Dismiss | `POST` | `/RestServiceApi/Dismiss/MarkDismiss` | Método responsável por salvar o desligamento do funcionário da empresa. | `object` | 200 |
| Dismiss | `POST` | `/RestServiceApi/Dismiss/UnmarkDismiss` | Método responsável por retirar o desligamento do funcionário da empresa. | `object` | 200 |
| Event | `POST` | `/RestServiceApi/Event/GetEvents` | Buscar todos os eventos. | `object` | 200 |
| Event | `POST` | `/RestServiceApi/Event/GetEventsGrouped` | Buscar todos os eventos agrupados por funcionário. | `object` | 200 |
| Event | `POST` | `/RestServiceApi/Event/GetTypeEvents` | Buscar todos os tipos de eventos. | `object` | 200 |
| ExtraHour | `POST` | `/RestServiceApi/ExtraHour/GetExtraHours` | Método responsável por consultar as horas extras. | `object` | 200 |
| Facial | `POST` | `/RestServiceApi/Facial/ChangeFacial` | Método responsável por atualizar a facial. | `object` | 200 |
| Facial | `POST` | `/RestServiceApi/Facial/DeleteFacial` | Método responsável por excluir a facial. | `object` | 200 |
| Facial | `POST` | `/RestServiceApi/Facial/GetAllPeopleWithOrWithoutFacial` | Método para buscar todos os templates faciais | `object` | 200 |
| Facial | `POST` | `/RestServiceApi/Facial/SaveFacial` | Método responsável por salvar a facial. | `object` | 200 |
| Facial | `POST` | `/RestServiceApi/Facial/SearchFacial` | Método responsável por retornar a facial consultada. | `object` | 200 |
| HealthCheck | `POST` | `/RestServiceApi/HealthCheck/ApplicationHealthCheck` |  | `—` | 200 |
| HealthCheck | `POST` | `/RestServiceApi/HealthCheck/DatabaseHealthCheck` |  | `—` | 200 |
| Holiday | `POST` | `/RestServiceApi/Holiday/GetHoliday` | Método responsável por retornar as férias dos funcionários da empresa. | `object` | 200 |
| Holiday | `POST` | `/RestServiceApi/Holiday/MarkHoliday` | Método responsável por salvar as férias do funcionário da empresa. | `object` | 200 |
| Holiday | `POST` | `/RestServiceApi/Holiday/ReMarkHoliday` | Método responsável por remarcar as férias do funcionário da empresa. | `object` | 200 |
| Holiday | `POST` | `/RestServiceApi/Holiday/UnMarkHoliday` | Método responsável por retirar as férias do funcionário da empresa. | `object` | 200 |
| JobPosition | `POST` | `/RestServiceApi/JobPosition/ChangeJobPosition` | Método responsável por alterar o cargo da empresa. | `object` | 200 |
| JobPosition | `POST` | `/RestServiceApi/JobPosition/DeleteJobPosition` | Método responsável por excluir o cargo da empresa. | `object` | 200 |
| JobPosition | `POST` | `/RestServiceApi/JobPosition/SaveJobPosition` | Método responsável por salvar o cargo na empresa. | `object` | 200 |
| JobPosition | `POST` | `/RestServiceApi/JobPosition/SearchJobPosition` | Método responsável por retornar o cargo na empresa consultada. | `object` | 200 |
| Justification | `POST` | `/RestServiceApi/Justification/GetApprover` |  | `object` | 200 |
| Justification | `POST` | `/RestServiceApi/Justification/GetJustification` | Método responsável por consultar as justificativas da empresa. | `object` | 200 |
| JustificationRequest | `POST` | `/RestServiceApi/JustificationRequest/ApprovalJustificationRequest` | Método responsável por aprovar o pedido de justificativa do funcionário da empresa. | `object` | 200 |
| JustificationRequest | `POST` | `/RestServiceApi/JustificationRequest/GetJustificationRequest` | Método responsável por consultar o pedido de justificativa do funcionário da empresa. | `object` | 200 |
| JustificationRequest | `POST` | `/RestServiceApi/JustificationRequest/JustificationRequest` | Método responsável por criar o pedido de justificativa do funcionário da empresa. | `object` | 200 |
| Mark | `POST` | `/RestServiceApi/Mark/GetMarks` | Método responsável pelas as marcações de um unico funcionario por período | `object` | 200 |
| Mark | `POST` | `/RestServiceApi/Mark/SetListMark` | Método responsável por gravar as marcações. | `object` | 200 |
| Mark | `POST` | `/RestServiceApi/Mark/SetMarks` | Método responsável por gravar a marcação. | `object` | 200 |
| Mark | `GET` | `/RestServiceApi/Mark/TimeClockRecordWithCertificate` |  | `—` | 200 |
| Mark | `GET` | `/RestServiceApi/Mark/TimeClockRecordWithoutCertificate` |  | `—` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/AllRequests` |  | `RequestsRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/ApprovalStatus` |  | `ApprovalStatusRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Assiduity` |  | `AssiduityRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/BuscaCPF` | Método responsável por retornar os afastamentos na empresa consultada. | `RecoverRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Companies` |  | `BaseRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Contacts` |  | `ContactsRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Dashboard` |  | `DashboardRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/ExcludeRequest` |  | `ExcludeRequestRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/FaceRegistration` |  | `FaceRegistrationRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/GetDelayOccurrences` |  | `DelayOccurrencesRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/GetJustifications` |  | `BaseRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/GetJustificationsDelay` |  | `BaseRequestModel` | 200 |
| MobileApp | `GET` | `/RestServiceApi/MobileApp/GetLastCode` |  | `—` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/GetRequestDates` |  | `ExtraDatesRequestModel` | 200 |
| MobileApp | `GET` | `/RestServiceApi/MobileApp/GetStructure` |  | `—` | 200 |
| MobileApp | `GET` | `/RestServiceApi/MobileApp/GetTime` |  | `—` | 200 |
| MobileApp | `GET` | `/RestServiceApi/MobileApp/GetTimeLocalizacaoAlternativa` |  | `—` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Holidays` |  | `HolidaysRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Inconsistencies` |  | `InconsistenciesRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/InsertLogErro` |  | `LogErro` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/LimitBank` |  | `BaseRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Login` | Método responsável por realizar o login. | `LoginRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/LoginWithCachePermissions` | Método responsável por realizar o login. | `LoginRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/ManageFCMToken` |  | `ManageFCMTokenRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Mark` |  | `MarkRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Messages` |  | `MessagesRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/NewDelayRequest` |  | `NewDelayRequestRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/NewExtraRequest` |  | `NewExtraRequestRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/NewHolidayRequest` |  | `NewHolidayRequestRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/NewMarkRequest` |  | `NewMarkRequestRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/NewMarkRequestWithStringDate` |  | `NewMarkRequestRequestModelExtension` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/NewPreJustificationRequest` |  | `NewPreJustificationRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/NewSmartTag` |  | `NewSmartTagRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Notifications` |  | `NotificationsRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Pair` |  | `PairRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/PersonFaceSearch` |  | `PersonFaceSearchRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/PlannedAbsence` |  | `PlannedAbsenceRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/ProcessDelayRequest` |  | `ProcessDelayRequest` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/ProcessExtraRequest` |  | `ProcessExtraRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/ProcessHolidayRequest` |  | `ProcessHolidayRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/ProcessMarkRequest` |  | `ProcessMarkRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/ProcessPreJustificationRequest` |  | `ProcessPreJustificationRequestModel` | 200 |
| MobileApp | `GET` | `/RestServiceApi/MobileApp/ProjectsOfPerson` |  | `—` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Recover` |  | `RecoverRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Replacements` |  | `ReplacementsRequestModel` | 200 |
| MobileApp | `POST` | `/RestServiceApi/MobileApp/Requests` |  | `RequestsRequestModel` | 200 |
| MobileAppAuth | `POST` | `/RestServiceApi/MobileAppAuth/Authenticate` |  | `AuthenticateRequestModel` | 200 |
| OrganizationalStructure | `POST` | `/RestServiceApi/OrganizationalStructure/ChangeOrganizationalStructure` | Método responsável por alterar a estrutura organizacional da empresa. | `object` | 200 |
| OrganizationalStructure | `POST` | `/RestServiceApi/OrganizationalStructure/DeleteOrganizationalStructure` | Método responsável por excluir a estrutura organizacional da empresa. | `object` | 200 |
| OrganizationalStructure | `POST` | `/RestServiceApi/OrganizationalStructure/GetOrganizationalStructure` | Método responsável por retornar as estruturas matrizes e filiais da empresa consultada. | `object` | 200 |
| OrganizationalStructure | `POST` | `/RestServiceApi/OrganizationalStructure/SaveOrganizationalStructure` | Método responsável por salvar a estrutura organizacional na empresa. | `object` | 200 |
| OrganizationalStructure | `POST` | `/RestServiceApi/OrganizationalStructure/SearchOrganizationalStructure` | Método responsável por retornar as estruturas matrizes e filiais da empresa consultada. | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/AssosciateWorks` | Modelo que representa os dados necessários para associar obras a pessoas. | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/AssosciateWorks2` | Modelo que representa os dados necessários para associar obras a pessoas. | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/ChangePerson` | Método responsável por alterar o funcionário. | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/DeletePerson` | Método para deletar o funcionário | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/DesassociateWorks` | Modelo que representa os dados necessários para desassociar obras a pessoas. | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/RetornarMensagemExcecao` |  | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/SavePerson` | Método responsável por incluir o funcionário. | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/SearchPeople` | Método para buscar os funcionários | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/SearchPerson` | Método para buscar o funcionário | `object` | 200 |
| People | `POST` | `/RestServiceApi/People/TransitionPeople` | Método responsável por realizar a transição de funcionários. | `object` | 200 |
| Period | `POST` | `/RestServiceApi/Period/GetPeriodOpen` | Método responsável por consultar os peridos abertos da empresa. | `object` | 200 |
| PreJustificationRequest | `POST` | `/RestServiceApi/PreJustificationRequest/PreJustificationRequest` | Método responsável por inserir a pré-justificativa. | `object` | 200 |
| PunchesRequest | `POST` | `/RestServiceApi/PunchesRequest/ApprovalPunchesRequest` | Método responsável por aprovar o pedido de marcacao do funcionário da empresa. | `object` | 200 |
| PunchesRequest | `POST` | `/RestServiceApi/PunchesRequest/GetPunchesRequest` | Método responsável por consultar o pedido de marcacao do funcionário da empresa. | `object` | 200 |
| PunchesRequest | `POST` | `/RestServiceApi/PunchesRequest/PuncheRequest` | Método responsável por criar o pedido de marcacaodo funcionário da empresa. | `object` | 200 |
| ReportEmployeeHour | `POST` | `/RestServiceApi/ReportEmployeeHour/GetReportEmployeeHour` | Relatorio de horas dos Funcionarios. | `object` | 200 |
| ReportEmployeePunch | `POST` | `/RestServiceApi/ReportEmployeePunch/GetReportEmployeePunch` | Relatorio de ponto dos Funcionarios. | `object` | 200 |
| ReportJourneySimplified | `POST` | `/RestServiceApi/ReportJourneySimplified/GetReportJourneySimplified` | Relatorio de Jornada de trabalho simplicada | `object` | 200 |
| ReportTeamHour | `POST` | `/RestServiceApi/ReportTeamHour/GetReportTeamHour` | Relatorio de horas dos Funcionarios subordinados ao usuario informado.. | `object` | 200 |
| Schedules | `POST` | `/RestServiceApi/Schedules/GetSchedulesSummary` | Método responsável por retornar informações de id, código e descrição de Horário. | `object` | 200 |
| System | `POST` | `/RestServiceApi/System/GetIntegrationRestApi` | Método responsável por buscar a chave de integração. | `IntegracaoRestRequest` | 200 |
| User | `POST` | `/RestServiceApi/User/Create` | Método responsável por criar o usuário na empresa. | `object` | 200 |
| User | `POST` | `/RestServiceApi/User/ExistUserBaseMuro` |  | `object` | 200 |
| User | `POST` | `/RestServiceApi/User/Search` | Método para buscar o usuário | `object` | 200 |
| User | `POST` | `/RestServiceApi/User/SearchOnlyEmail` | Método para buscar o usuário informando apenas o e-mail | `object` | 200 |
| User | `POST` | `/RestServiceApi/User/Update` | Método responsável por atualizar o usuário na empresa. | `object` | 200 |
| Works | `POST` | `/RestServiceApi/Works/CreateWorks` | Método responsável por gravar uma lista de obras. | `object` | 200 |
| Works | `POST` | `/RestServiceApi/Works/EditWorks` | Método responsável por editar uma lista de obras. | `object` | 200 |
| Works | `POST` | `/RestServiceApi/Works/GetReportEmployeeWorkSummary` | Método responsável por buscar relatórios de funcionários com base nos critérios fornecidos. | `object` | 200 |
| Works | `POST` | `/RestServiceApi/Works/GetReportWorkSummary` | Método de responsável por buscar relatórios de obra com base nos critérios fornecidos. | `object` | 200 |
| Works | `POST` | `/RestServiceApi/Works/LinkPunchTimeRangeToWorks` | Método responsável por associar apontamentos obras com base nos critérios fornecidos. | `object` | 200, 400, 500 |
| Works | `POST` | `/RestServiceApi/Works/RemoveWorks` | Método responsável por deletar uma lista de obras com base nos códigos fornecidos. | `object` | 200 |
| Works | `POST` | `/RestServiceApi/Works/SearchWorks` | Método responsável por buscar obras com base nos critérios fornecidos. | `object` | 200 |
| Works | `POST` | `/RestServiceApi/Works/UnLinkPunchTimeRangeToWorks` | Método responsável pela desvinculação apontamentos de uma obra com base nos critérios fornecidos. | `object` | 200, 400 |

### 1.2 Detalhamento de cada operação

#### Grupo: Absence

##### `POST /RestServiceApi/Absence/GetAbsences`

Método responsável por retornar as ocorrências de falta na empresa consultada.

- `operationId`: `Absence_GetAbsences`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as faces | `array<GetAbsencesExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar as ocorrências de falta na empresa consultada. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Informar apenas um parâmetro ou não informar nenhuma para retornar todas as ocorrências de falta da empresa.
        
        "IdsPessoa": [1 , 2], /* (Campo obrigatório)  Lista de valores informados para consultar os funcionários. Informar 0 quando não há filtro de funcionário.  */
        "DataInicio":"01-02-2023", /* (Campo obrigatório) Filtro de inicio do período da consulta. Formato dd-MM-aaaa. */
        "DataFim":"23-02-2023", /* (Campo obrigatório) Filtro de inicio do período da consulta. Formato dd-MM-aaaa. */
        "RequestType": 2, /* (Campo obrigatório) É o tipo de valor que será informado na lista de "IdsPessoa". 1 = Consulta por id dos funcionários, 2 = Consulta pelo crachá do funcionário, 3 = Consulta pela matrícula do funcionário. */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */             
     }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": [
      {
        "Id": 1,
        "CodigoRegisto": 0,
        "TipoRegisto": "",
        "Numero": 1,
        "Ano": 2024,
        "Mes": 7,
        "Dia": 1,
        "QuantidadeTempo": 420,
        "Aprovado": "N"
      }
    ]
  }
}
````

#### Grupo: AbsenceDelay

##### `POST /RestServiceApi/AbsenceDelay/GetAbsenceDelay`

Método responsável por consultar as ocorrências de faltas e atrasos do funcionário da empresa.

- `operationId`: `AbsenceDelay_GetAbsenceDelay`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método responsável por consultar as ocorrências de faltas e atrasos do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "IdsEmployee": [1], /* (Campo obrigatório) Lista de matricula. Informar 0 quando não há filtro de funcionário. */
        "Start":"01-02-2023", /* (Campo obrigatório) Filtro de inicio do período da consulta. Formato dd-MM-aaaa. */
        "End":"23-02-2023", /* (Campo obrigatório) Filtro de fim do período da consulta. Formato dd-MM-aaaa. */
        "RequestType":"1", /* (Campo obrigatório) É o tipo de valor que será informado no "IdsEmployee". 1 = Consulta por id dos funcionários, 2 = Consulta pelo crachá do funcionário, 3 = Consulta pela matrícula do funcionário. */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

##### `POST /RestServiceApi/AbsenceDelay/Justify`

Método responsável por tratar as ocorrências de faltas e atrasos do funcionário da empresa.

- `operationId`: `AbsenceDelay_Justify`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Justificado com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por tratar as ocorrências de faltas e atrasos do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     
        
         "IdUser" : 2398, /* (Campo obrigatório) Id do usuario. */
         "IdJustification": 1, /* (Campo obrigatório) Id da justificativa. */
         "IdsOccurrence": [33510115], /* (Campo obrigatório) Lista de id das ocorrêncisa que serão tratadas. */
         "Percentage" : 50, /* (Campo obrigatório) Percentagem de horas tratadas. */
         "Hours" : "1753-01-01T08:00:00", /* (Campo obrigatório) Data e hora tratadas. */
         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

#### Grupo: Absent

##### `POST /RestServiceApi/Absent/GetAbsent`

Método responsável por retornar os afastamentos na empresa consultada.

- `operationId`: `Absent_GetAbsent`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar os afastamentos na empresa consultada. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Informar apenas um parâmetro ou não informar nenhuma para retornar todos os afastamento da empresa.
        
        // "Cracha": [ 7560, 1088 ] /* (Campo opcional) Filtro de lista de crachá dos funcionários, se caso não for informado retornará todos os afastamento de todos os funcionários da empresa. */
        // "Discriminador": "" /* (Campo opcional) Descrição do afastamento. */
        // "InicioPesquisa": "2020/07/01", /* (Campo opcional) Filtro de inicio do período da consulta. */
        // "FimPesquisa": "2020/07/31" /* (Campo opcional) Filtro de fim do período da consulta. */
        // "CodigoAfastamento": 1 /* (Campo opcional) Código de afastamento. */
        // "Discriminador": "Licença Maternidade" /* (Campo opcional) Filtro de descrição do afastamento da consulta. */
     }
````

##### `POST /RestServiceApi/Absent/GetTypeAbsent`

Método responsável por retornar o tipo de afastamento na empresa consultada.

- `operationId`: `Absent_GetTypeAbsent`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar o tipo de afastamento na empresa consultada. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
````

##### `POST /RestServiceApi/Absent/MarkAbsent`

Método responsável por salvar o afastamento do funcionário da empresa.

- `operationId`: `Absent_MarkAbsent`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por salvar o afastamento do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     

         "MATRICULA": 9999, /* (Campo obrigatório) Matrícula do funcionário */
         //"PESSOAID": 999, /* (Campo opcional) Id do Funcionário */
         //"CRACHA": 99999, /* (Campo opcional) Cracha do Funcionário */
         "MOTIVO": "Licença Maternidade", /* (Campo obrigatório) Descrição do motivo do afastamento */
         "DATAINICIO": "2023-02-10", /* (Campo obrigatório) Inicio do afastamento do funcionário. Formato aaaa-MM-dd. */
         "DATAFIM": "2023-02-20", /* (Campo obrigatório) Fim do afastamento do funcionário. Formato aaaa-MM-dd. */
         // "REMOVERFERIAS": false /* (Campo opcional) Excluir as férias do período. Valor padrão é false. false = Não exclui as férias, true = Exclui as férias  */
         // "REMOVERFOLGAS": false /* (Campo opcional) Excluir as Folgas do período. Valor padrão é false. false = Não exclui as folgas, true = Exclui as folgas  */
     }
````

##### `POST /RestServiceApi/Absent/UnMarkAbsent`

Método responsável por retirar o afastamento do funcionário da empresa.

- `operationId`: `Absent_UnMarkAbsent`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Excluído com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retirar o afastamento do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão excluídos.     

         "MATRICULA": 9999, /* (Campo obrigatório) Matrícula do funcionário */
         //"PESSOAID": 999, /* (Campo opcional) Id do Funcionário */
         //"CRACHA": 99999, /* (Campo opcional) Cracha do Funcionário */
     }
````

#### Grupo: Appointment

##### `POST /RestServiceApi/Appointment/GetAppointments`

Buscar todas as marcações de acordo com os parâmetros informados no Json.

- `operationId`: `Appointment_GetAppointments`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as marcações | `array<GetAppointmentsExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por buscar todas as marcações de acordo com os parâmetros informados no Json. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "IdsPessoa": [1, 2, 3, 4, 5], /* (Campo obrigatório) Ids dos funcionários. Informar 0 quando não há filtro de funcionário. */
        "DataInicio": "01-09-2019", /* (Campo obrigatório) Início do período consultado */ 
        "DataFim": "16-09-2019", /* (Campo obrigatório) Fim do período consultado */
        "ResponseType": "AS400V1" /* (Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": [
    {
      "Numero": 2,
      "Ano": 2019,
      "Mes": 9,
      "Dia": 10,
      "Hora": 8,
      "Minuto": 0
    },
    {
      "Numero": 2,
      "Ano": 2019,
      "Mes": 9,
      "Dia": 10,
      "Hora": 12,
      "Minuto": 0
    },
    {
      "Numero": 2,
      "Ano": 2019,
      "Mes": 9,
      "Dia": 11,
      "Hora": 8,
      "Minuto": 0
    },
    {
      "Numero": 2,
      "Ano": 2019,
      "Mes": 9,
      "Dia": 11,
      "Hora": 20,
      "Minuto": 0
    }
  ]
}
````

##### `POST /RestServiceApi/Appointment/GetAppointmentsPointer`

Buscar todas as marcações de acordo com os parâmetros informados no Json.

- `operationId`: `Appointment_GetAppointmentsPointer`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as marcações | `array<GetAppointmentsPointerExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Post */        
     {
        "IdsPessoa": [22], /* (Campo obrigatório) Id do funcionário. Informar 0 quando não há filtro de funcionário. */
        "CrachasPessoa":[1,2 ],
        "MatriculasPessoa":[1,2 ],
        "PisPessoa":["00000000000","00000000000"],
        "CpfsPessoa":["00000000000","00000000000"],
        "NifsPessoa":["000.000.000-00","000.000.000-00"],
        "NifsPessoa":["000.000.000-00","000.000.000-00"],
        "CnpjsEmpresas":["56831401000148", "88277465000135"]
        "MarcacaoColetadaAPI": false /* (Campo obrigatório) Default false */
        "DataInicio":"01-09-2019", /* (Campo obrigatório) Início do período consultado, caso não informado buscará todas as marcações de acordo com a flag de coleta passada. Formato dd-MM-aaaa. */ 
        "DataFim":"01-06-2020", /* (Campo obrigatório) Fim do período consultado, caso não informado buscará todas as marcações de acordo com a flag de coleta passada. Formato dd-MM-aaaa. */ 
        "ResponseType":"AS400V1" /* (Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
        "Pagina":1 /* Página da consulta de marcações de acordo com a flag MarcacaoColetadaAPI */ 
     }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": [
    {
      "Id": 0,
      "Matricula": 1,
      "Ano": 2021,
      "Mes": 1,
      "Dia": 28,
      "Hora": 8,
      "Minuto": 0,
      "NSR": 0,
      "PIS": "10305690938",
      "TipoMarcacao": "E",
      "PessoaID": 3015,
      "NumeroSerieRep": 0,
      "RelogioID": 0,
      "Indevido": false,
      "AnoColeta": 2021,
      "MesColeta": 1,
      "DiaColeta": 28,
      "HoraColeta": 8,
      "MinutoColeta": 0,
      "SegundoColeta": 0,
      "IdApont": 9000
    }
  ]
}
````

##### `POST /RestServiceApi/Appointment/GetAppointmentsV2`

Buscar todas as marcações de acordo com os parâmetros informados no Json.

- `operationId`: `Appointment_GetAppointmentsV2`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as marcações | `array<GetAppointmentsV2Example>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por buscar todas as marcações de acordo com os parâmetros informados no Json. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "IdsPessoa": [22], /* (Campo obrigatório) Id do funcionário. Informar 0 quando não há filtro de funcionário. */
        "CrachasPessoa":[1,2 ],
        "MatriculasPessoa":[1,2 ],
        "PisPessoa":["00000000000","00000000000"],
        "CpfsPessoa":["00000000000","00000000000"],
        "NifsPessoa":["000.000.000-00","000.000.000-00"],
        "EmailsPessoa":["email@empresa.com","email2@empresa.com"],
        "CnpjsEmpresas":["56831401000148", "88277465000135"],
        "DataInicio":"01-09-2019", /* (Campo obrigatório) Início do período consultado */ 
        "DataFim":"01-06-2020", /* (Campo obrigatório) Fim do período consultado */
        //"Hora":"12:00", /* (Campo opcional) Hora da marcação consultada */
        "CalculoNaoAtualizado":"true",  /* (Campo obrigatório) Valor padrão é false. Quando o valor for false retorna os dias com calculo atualizado, se o valor for true retorna todos os dias do período consultado independente do cálculo */
        "ResponseType":"AS400V1" /* (Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": [
    {
      "Matricula": 1,
      "Ano": 2021,
      "Mes": 1,
      "Dia": 28,
      "Hora": 8,
      "Minuto": 0,
      "NSR": 0,
      "TipoMarcacao": "E",
      "NumeroSerieRep": 0,
      "CodigoObra": 1,
      "DescricaoObra": "Obra 1",
      "PIS": "10305690938",
      "PessoaID": 3015,
      "RelogioID": 0,
      "Indevido": "true",
      "AnoColeta": 0,
      "MesColeta": 0,
      "DiaColeta": 0,
      "HoraColeta": 0,
      "MinutoColeta": 0,
      "SegundoColeta": 0,
      "CPF": "",
      "IDSequence": 1,
      "CodigoMobile": "1",
      "MobileID": "1",
      "Latitude": "-23.5545988",
      "Longitude": "-46.8137927"
    }
  ]
}
````

##### `POST /RestServiceApi/Appointment/SetAppointmentsPointer`

Altera o valor de coleta das marcações de acordo com os parâmetros informados no Json.

- `operationId`: `Appointment_SetAppointmentsPointer`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Altera o valor de coleta das marcações | `array<SetAppointmentsPointerExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por alterar o valor de coleta das marcações de acordo com os parâmetros informados no Json. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "IdsMarcacoes": [22], /* (Campo obrigatório) Ids das marcações. não informar quando utilizar data início e fim. */
        "CnpjsEmpresas":["56831401000148", "88277465000135"] /* (Campo opcional) */
        "MarcacaoColetadaAPI": false /* (Campo obrigatório) Default false */
        "DataInicio":"01-09-2019", /* (Campo obrigatório) Início do período, caso não informado usará os ids das marcações. Formato dd-MM-aaaa. */ 
        "DataFim":"01-06-2020", /* (Campo obrigatório) Fim do período consultado, caso não informado usará os ids das marcações. Formato dd-MM-aaaa. */ 
        "ResponseType":"AS400V1" /* (Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": [
    {
      "Success": true
    }
  ]
}
````

#### Grupo: CalculationRules

##### `POST /RestServiceApi/CalculationRules/GetCalculationRulesSummary`

Método responsável por retornar informações de id, código e descrição de Regra de Cálculo.

- `operationId`: `CalculationRules_GetCalculationRulesSummary`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este Método responsável por retornar informações de id, código e descrição de Regra de Cálculo por empresa. */  
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "Pagina": "1" /* Traz resultados de página indicada, em caso de resultados com mais de 1000 registros. Padrão: Pagina = 1 */
     }
````

#### Grupo: Clock

##### `POST /RestServiceApi/Clock/AssociateClocks`

Associar pessoas ao relógio

- `operationId`: `Clock_AssociateClocks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as pessoas associadas | `array<ClockModelsApiRet>` |

Descrição e exemplo da especificação:

````text
Exemplo:
            
    /* Post */
    {
       "PessoaCracha":[5,6,7,8,9,12,13,15,16,17], /* (Campo obrigatório) Lista de cracha*/
       "RelogioNumero":[1,2], /* (Campo obrigatório) Lista de números de relógios*/
       "EnviarListaCredenciais":true, /* (Campo obrigatório) Envia a lista de credenciais. Valor padrão é false. false = Não envia credenciais, false = Envia credenciais  */
       "EnviarListaTemplate":true, /* (Campo obrigatório) Envia a lista de template. Valor padrão é false. false = Não envia templates, false = Envia templates  */
       "EnviarListaTemplateFace":true /* (Campo obrigatório) Envia a lista de face. Valor padrão é false. false = Não envia face, false = Envia face  */
    }
````

##### `POST /RestServiceApi/Clock/ScheduleCommands`

Método responsável por agendar um comando para o relógio.

- `operationId`: `Clock_ScheduleCommands`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna sucesso ou erro no envio dos comandos | `` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por agendar um comando para o relógio.
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "PessoaCracha":[1533], /* (Campo obrigatório) Crachá do funcionário */
         "RelogioNumero":[6969], /* (Campo obrigatório) Número do relógio */
         "EnviarListaCredenciais":true /* (Campo obrigatório) Envia a lista de credenciais. Valor padrão é false. false = Não envia credenciais, true = Envia credenciais  */
         "ExcluirListaPessoas":true /* (Campo obrigatório) Exclui as pessoas. Valor padrão é false. false = Exclui a pessoa, true = Não exclui a pessoa */
         "ExcluirListaCredenciais":true /* (Campo obrigatório) Exclui as credenciais das pessoas. Valor padrão é false. false = Exclui a credencial, true = Não exclui a credencial */
         "EnviarListaTemplate":true, /* (Campo obrigatório) Exclui os templates das pessoas. Valor padrão é false. false = Exclui o template, true = Não exclui o template */
         "BuscarListaTemplatesRelogioPessoa":true, /* (Campo obrigatório) Exclui a lista de templates das pessoas. Valor padrão é false. false = Exclui a lista de template, true = Não exclui lista de template */
         "ExcluirListaTemplates":true, /* (Campo obrigatório) Exclui a lista de templates das pessoas. Valor padrão é false. false = Exclui a lista de template, true = Não exclui lista de template */
         "BuscarListaTemplatesRelogioPessoaTotal":true, /* (Campo obrigatório) Buscar todos os de templates das pessoas. Valor padrão é false. false = Não buscar todos os templates template, true = Busca todos os templates template */
         "EnviarListaTemplateFace":true /* (Campo obrigatório) Enviar a lista de face das pessoas. Valor padrão é false. false = Não envia a lista de face, true = Buscar a envia de face */
         "ExcluirListaTemplatesFace":true, /* (Campo obrigatório) Excluir a lista de face das pessoas. Valor padrão é false. false = Não exclui a lista de face, true = Exclui a lista de face */
         "BuscarListaFacesRelogioPessoa":true, /* (Campo obrigatório) Buscar a lista de face das pessoas. Valor padrão é false. false = Não buscar a lista de face, true = Buscar a lista de face */
         "BuscarListaFacesRelogioPessoaTotal":true /* (Campo obrigatório) Buscar a lista de face total das pessoas. Valor padrão é false. false = Não buscar a lista de face total, true = Buscar a lista de face total */
     }
   
     <returns>Retorna a resposta da solicitação</returns><response code="200">Comando efetuado com sucesso</response>
````

##### `POST /RestServiceApi/Clock/SearchClocks`

Método responsável por buscar os relógios do sistema.

- `operationId`: `Clock_SearchClocks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as pessoas associadas | `array<ClockModelApiSearchReturn>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por buscar os relógios do sistema.
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        RelogioIp": "192.168.15.127", /* (Campo obrigatório) Id do relogio */
        "Compartilhado": "true", /* (Campo obrigatório) Relogio compartilhado. Valor padrão é false. false = Não é compartilhado, true = Compartilhado */
        "NumeroFabricacao": "45645645465", /* (Campo obrigatório) Número de fabricação. */
        "RelogioDesativado": "true", /* (Campo obrigatório) Relógio desativado. Valor padrão é false. false = Não é desativado, true = Desativado */
        "TodosRelogios": "true", /* (Campo obrigatório) Todos relógios. Valor padrão é false. false = Não retorna todos relógios, true = Todos relógios */
        "RelogioNumero": 2 /* (Campo obrigatório) Número do relógio */
     }
   
     <returns>Retorna a resposta da solicitação</returns><response code="200">Comando efetuado com sucesso</response>
````

##### `POST /RestServiceApi/Clock/UnassociateClocks`

Método responsável por desassociar pessoas do relógio.

- `operationId`: `Clock_UnassociateClocks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna sucesso ou erro na desassociação de pessoas | `` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por desassociar pessoas do relógio.
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "PessoaCracha":[5,6,7,8,9,12,13,15,16,17],
        "RelogioNumero":[1,2],
        "ExcluirListaPessoas":true,
        "ExcluirListaTemplates":true,
        "ExcluirListaTemplatesFace":true,
     }
   
     <returns>Retorna a resposta da solicitação</returns><response code="200">Comando efetuado com sucesso</response>
````

#### Grupo: Company

##### `POST /RestServiceApi/Company/GetCompany`

Método responsável por retornar os dados da empresa consultada.

- `operationId`: `Company_GetCompany`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar os dados na empresa consultada. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Get */
     {
        "Id" : 313, /* (Campo obrigatório) Id da empresa  */
        "Code": 0, /* (Campo obrigatório) Código da empresa. */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */             
     }
````

#### Grupo: Delay

##### `POST /RestServiceApi/Delay/GetDelays`

Método responsável por consultar os atrasos do funcionário da empresa.

- `operationId`: `Delay_GetDelays`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método responsável por consultar os atrasos do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "IdsPessoa": [1], /* (Campo obrigatório) Lista de id dos funcionários. */
        "DataInicio":"01-09-2019", /* (Campo obrigatório) Filtro de inicio do período da consulta. Formato dd-MM-aaaa. */
        "DataFim":"16-09-2019", /* (Campo obrigatório) Filtro de fim do período da consulta. Formato dd-MM-aaaa. */
        "RequestType":"1", /* (Campo obrigatório) É o tipo de valor que será informado no "IdsPessoa". 1 = Consulta por id dos funcionários, 2 = Consulta pelo crachá do funcionário, 3 = Consulta pela matrícula do funcionário. */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

#### Grupo: Digital

##### `POST /RestServiceApi/Digital/ChangeDigital`

Método responsável por salvar a digital.

- `operationId`: `Digital_ChangeDigital`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as faces | `array<GetDigitalExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por atualizar biometria digital. */

    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API. */
    
    /* Os dados abaixo são fictícios, altere e informe os dados corretos.
    !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.

    O parâmetro IdSensor poderá receber os seguintes códigos referenciados:
    
    Tipos de Módulos Biométricos:
    "2601" Capacitivo; "2602" Testech 317; "2603" Sagem; "2604" Testech 320; "2605" NeoKoros; "2606" Suprema; 
    "2607" ZK; "2608" ZK9; "2609" Virdi; "2610" NG; "2611" Secukey; "2612" SupremaH; "2613" Sinatra; "2614" NitGen; 
    "2615" 500 DPi; "2616" ZKAIPushBio*/

    O parâmetro Finger1 e Finger2 poderá receber os seguintes identificadores
    
    Mão esquerda:
    "01" dedo mínimo; "02" anelar;"03" dedo médio;"04" indicador; "05" polegar;
    
    Mão direita
    "06" polegar;"07" indicador;"08"dedo médio;"09" anelar;"10" dedo mínimo 
    */

    /* Post */
    {
    "lstDigitalBiometrics":
        [{
           "IdEmployee": 1, /* (Campo obrigatório) Id do funcionário */
           "IdSensor": 2603, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
           "CapturedString": "Informe aqui a string do template", /* (Campo obrigatório) Informe a string do template */
           "Finger1": "04", /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
           "Finger2": "07" /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
        },
        {
           "IdEmployee": 2, /* (Campo obrigatório) Id do funcionário */
           "IdSensor": 2604, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
           "CapturedString": "Informe aqui a string do template", /* (Campo obrigatório) Informe a string do template */
           "Finger1": "03", /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
           "Finger2": "09" /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
        },
        {
           "IdEmployee": 3, /* (Campo obrigatório) Id do funcionário */
           "IdSensor": 2605, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
           "CapturedString": "Informe aqui a string do template", /* (Campo obrigatório) Informe a string do template */
           "Finger1": "01", /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
           "Finger2": "06" /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
        }]
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": null
  }
}
````

##### `POST /RestServiceApi/Digital/DeleteDigital`

Método responsável por excluir a digital.

- `operationId`: `Digital_DeleteDigital`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as faces | `array<GetDigitalExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por excluir a digital. */

     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "lstDigitalBiometrics":
        [{
           "IdEmployee": 1, /* (Campo obrigatório) Id do funcionário */
           "IdDigital": 1 /* (Campo obrigatório) Informe o id da digital cadastrada */
        },
        {
           "IdEmployee": 2, /* (Campo obrigatório) Id do funcionário */
           "IdDigital": 2 /* (Campo obrigatório) Informe o id da digital cadastrada */
        },
        {
           "IdEmployee": 3, /* (Campo obrigatório) Id do funcionário */
           "IdDigital": 3 /* (Campo obrigatório) Informe o id da digital cadastrada */
        }]
     }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": null
  }
}
````

##### `POST /RestServiceApi/Digital/GetAllPeopleWithOrWithoutDigital`

Método para buscar todos os templates biométricos

- `operationId`: `Digital_GetAllPeopleWithOrWithoutDigital`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna os funcionários do sistema | `array<GetAllPeopleWithOrWithoutDigitalExample>` |

Descrição e exemplo da especificação:

````text
Exemplo:
            
    /* Este método é responsável por buscar o funcionário o funcionário. */
    
    O parâmetro IdSensor poderá receber os seguintes códigos referenciados:
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* 
    Tipos de Módulos Biométricos:
    "2601" Capacitivo; "2602" Testech 317; "2603" Sagem; "2604" Testech 320; "2605" NeoKoros; "2606" Suprema; 
    "2607" ZK; "2608" ZK9; "2609" Virdi; "2610" NG; "2611" Secukey; "2612" SupremaH; "2613" Sinatra; "2614" NitGen; 
    "2615" 500 DPi; "2616" ZKAIPushBio*/
    */
    
    /* Post */
    {
       "Id": 1, /* (Campo opcional) Id do funcionário. */
       "Matricula": 01, /* (Campo opcional) Matricula do funcionário. */
       "Cracha": 01, /* (Campo opcional) Cracha do funcionário. */
       "Nome": "Novo Funcionário", /* (Campo opcional) Nome do funcionário. */
       "IdSensor": 2603 /* (Campo opcional) Informe o id do sensor biometrico cadastrado */
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "TotalPagina": 1,
    "PaginaAtual": 1,
    "Obj": [
      {
        "Id": 1,
        "Matricula": 1,
        "Cracha": 1,
        "Nome": "Employee 1",
        "LstTemplate": [
          {
            "IdDigital": 1,
            "Template": "3;92406:38::2>24107;?<2...",
            "IdSensor": 2606
          }
        ]
      }
    ]
  }
}
````

##### `POST /RestServiceApi/Digital/SaveDigital`

Método responsável por salvar a digital.

- `operationId`: `Digital_SaveDigital`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as faces | `array<GetDigitalExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por incluir biometria digital. */

    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API. */
    
    /* 
        Os dados abaixo são fictícios, altere e informe os dados corretos.
        !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.

        O parâmetro IdSensor poderá receber os seguintes códigos referenciados:
        
        Tipos de Módulos Biométricos:
        "2601" Capacitivo; "2602" Testech 317; "2603" Sagem; "2604" Testech 320; "2605" NeoKoros; "2606" Suprema; 
        "2607" ZK; "2608" ZK9; "2609" Virdi; "2610" NG; "2611" Secukey; "2612" SupremaH; "2613" Sinatra; "2614" NitGen; 
        "2615" 500 DPi; "2616" ZKAIPushBio; "2617" HikVision 

        O parâmetro Finger1 e Finger2 poderá receber os seguintes identificadores
        
        Mão esquerda:
        "01" dedo mínimo; "02" anelar;"03" dedo médio;"04" indicador; "05" polegar;
        
        Mão direita
        "06" polegar;"07" indicador;"08"dedo médio;"09" anelar;"10" dedo mínimo 
    */

    /* Post */
    
    {
        "lstDigitalBiometrics" :
        [{
           "IdEmployee": 1, /* (Campo obrigatório) Id do funcionário */
           "IdSensor": 2603, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
           "CapturedString": "Informe aqui a string do template", /* (Campo obrigatório) Informe a string do template */
           "Finger1": "04", /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
           "Finger2": "07" /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
        },
        {
           "IdEmployee": 2, /* (Campo obrigatório) Id do funcionário */
           "IdSensor": 2604, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
           "CapturedString": "Informe aqui a string do template", /* (Campo obrigatório) Informe a string do template */
           "Finger1": "01", /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
           "Finger2": "06" /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
        },
        {
           "IdEmployee": 3, /* (Campo obrigatório) Id do funcionário */
           "IdSensor": 2605, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
           "CapturedString": "Informe aqui a string do template", /* (Campo obrigatório) Informe a string do template */
           "Finger1": "02", /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
           "Finger2": "08" /* (Campo obrigatório) Informe o código correspondente a captura da anatomia da mão do funcionário. */
        }]
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": null
  }
}
````

##### `POST /RestServiceApi/Digital/SearchDigital`

Método responsável por retornar a digital consultada.

- `operationId`: `Digital_SearchDigital`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as faces | `array<SearchDigitalExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por retornar a digital consultada. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* 
       Os dados abaixo são fictícios, altere e informe os dados corretos.
       !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.
    
       O parâmetro IdSensor poderá receber os seguintes códigos referenciados:
       
       Tipos de Módulos Biométricos:
       "2601" Capacitivo; "2602" Testech 317; "2603" Sagem; "2604" Testech 320; "2605" NeoKoros; "2606" Suprema; 
       "2607" ZK; "2608" ZK9; "2609" Virdi; "2610" NG; "2611" Secukey; "2612" SupremaH; "2613" Sinatra; "2614" NitGen; 
       "2615" 500 DPi; "2616" ZKAIPushBio; "2617" HikVision 

       O parâmetro Finger1 e Finger2 poderá receber os seguintes identificadores
       
       Mão esquerda:
       "01" dedo mínimo; "02" anelar;"03" dedo médio;"04" indicador; "05" polegar;
       
       Mão direita
       "06" polegar;"07" indicador;"08"dedo médio;"09" anelar;"10" dedo mínimo 
    */

    /* Post */
    {
        "lstDigitalBiometrics":
        [{
           "IdEmployee": 1, /* (Campo obrigatório) Id do funcionário */
           "IdSensor": 2603 /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
        },
        {
           "IdEmployee": 2, /* (Campo obrigatório) Id do funcionário */
           "IdSensor": 2604 /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
        },
        {
           "IdEmployee": 3, /* (Campo obrigatório) Id do funcionário */
           "IdSensor": 2605 /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
        }]
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": [
      {
        "IdEmployee": 1,
        "LstTemplate": [
          {
            "IdDigital": 1,
            "IdSensor": 2606,
            "Template": "3;92406:38::2>24107;?<2...",
            "Finger1": 1,
            "Finger2": 6
          }
        ]
      }
    ]
  }
}
````

#### Grupo: Dismiss

##### `POST /RestServiceApi/Dismiss/GetDismissType`

Método responsável por retornar os tipos de desligamentos na empresa consultada.

- `operationId`: `Dismiss_GetDismissType`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar os tipos de desligamentos na empresa consultada. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "COUNTRY":"BR" /* (Campo obrigatório) Abreviãção do País consultado. BR = Brasil, PT = Prtugal, MX = México, US = Estados Unidos */
     }
````

##### `POST /RestServiceApi/Dismiss/MarkDismiss`

Método responsável por salvar o desligamento do funcionário da empresa.

- `operationId`: `Dismiss_MarkDismiss`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por salvar o desligamento do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     
         // !!!Obrigatório enviar ou o campo MOTIVOID ou o campo MOTIVO, caso os dois forem enviados o primeiro a validar é o MOTIVOID!!
         "MATRICULA": 9999, /* (Campo obrigatório) Matrícula do funcionário */
         //"PESSOAID": 999, /* (Campo opcional) Id do Funcionário */
         //"CRACHA": 99999, /* (Campo opcional) Cracha do Funcionário */
         "MOTIVOID": 999, /*  Id do motivo do desligamento */
         "MOTIVO": "10-Rescisão com justa causa por iniciativa do empregador", /* Descrição do motivo do desligamento */
         "DATA": "2023-02-10" /* (Campo obrigatório) Data do desligamento do funcionário. Formato aaaa-MM-dd. */
     }
````

##### `POST /RestServiceApi/Dismiss/UnmarkDismiss`

Método responsável por retirar o desligamento do funcionário da empresa.

- `operationId`: `Dismiss_UnmarkDismiss`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Excluído com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retirar o desligamento do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão excluídos.     

         "MATRICULA": 9999, /* (Campo obrigatório) Matrícula do funcionário */
         //"PESSOAID": 999, /* (Campo opcional) Id do Funcionário */
         //"CRACHA": 99999, /* (Campo opcional) Cracha do Funcionário */
     }
````

#### Grupo: Event

##### `POST /RestServiceApi/Event/GetEvents`

Buscar todos os eventos.

- `operationId`: `Event_GetEvents`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `object` |

Descrição e exemplo da especificação:

````text
 Sample request:

      /* Este método é responsável por buscar todos os eventos. */
      
      /* Headers */
      /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
      /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
      
      /* Post */
      {
          "Start":"01-06-2022", /* (Campo obrigatório) Filtro de inicio do período da consulta. Formato dd-MM-aaaa. */
          "End":"24-06-2022", /* (Campo obrigatório) Filtro de fim do período da consulta. Formato dd-MM-aaaa. */
          "IdTypeEvent": 0, /* (Campo obrigatório) Id do tipo do evento. */
          "IdsEmployee": [], /* (Campo opcional) Filtro de lista do id dos funcionários. */
          "IdsOrganizationStructure": [1,2,3], /* (Campo opcional) Filtro de lista do id das estruturas. */
          // "EventCode": 1, /* (Campo opcional) Código do Evento. */
          // "PayrollCode": "1", /* (Campo opcional) Código da folha de pagamento. */
	         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
      }
````

##### `POST /RestServiceApi/Event/GetEventsGrouped`

Buscar todos os eventos agrupados por funcionário.

- `operationId`: `Event_GetEventsGrouped`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `object` |

Descrição e exemplo da especificação:

````text
 Sample request:

      /* Este método é responsável por buscar todos os eventos agrupados por funcionário. */
      
      /* Headers */
      /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
      /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
      
      /* Post */
      {
          "Start":"01-06-2022", /* (Campo obrigatório) Filtro de inicio do período da consulta. Formato dd-MM-aaaa. */
          "End":"24-06-2022", /* (Campo obrigatório) Filtro de fim do período da consulta. Formato dd-MM-aaaa. */
          "IdTypeEvent": 0, /* (Campo obrigatório) Id do tipo do evento. */
          "IdsEmployee": [], /* (Campo opcional) Filtro de lista do id dos funcionários. */
          "IdsOrganizationStructure": [1,2,3], /* (Campo opcional) Filtro de lista do id das estruturas. */
          // "EventCode": 1, /* (Campo opcional) Código do Evento. */
          // "PayrollCode": "1", /* (Campo opcional) Código da folha de pagamento. */
	         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
      }
````

##### `POST /RestServiceApi/Event/GetTypeEvents`

Buscar todos os tipos de eventos.

- `operationId`: `Event_GetTypeEvents`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `object` |

Descrição e exemplo da especificação:

````text
 Sample request:

      /* Este método é responsável por buscar todos os tipos de eventos. */
      
      /* Headers */
      /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
      /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
      
      /* Post */
      {
          "Id" : 0, /* (Campo obrigatório) Id do tipo do evento. */
          "Code": 0, /* (Campo obrigatório) Código do tipo do evento. */
          "Description": "", /* (Campo obrigatório) Descrição do tipo do evento. */
	         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
      }
````

#### Grupo: ExtraHour

##### `POST /RestServiceApi/ExtraHour/GetExtraHours`

Método responsável por consultar as horas extras.

- `operationId`: `ExtraHour_GetExtraHours`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método responsável por consultar as horas extras. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "IdsPessoa": [1], /* (Campo obrigatório) Lista de cracha. */ 
        "DataInicio":"01-02-2023", /* (Campo obrigatório) Filtro de inicio do período da consulta. Formato dd-MM-aaaa. */
        "DataFim":"23-02-2023", /* (Campo obrigatório) Filtro de fim do período da consulta. Formato dd-MM-aaaa. */
        "RequestType":"1", /* (Campo obrigatório) É o tipo de valor que será informado no "IdsPessoa". 1 = Consulta por id dos funcionários, 2 = Consulta pelo crachá do funcionário, 3 = Consulta pela matrícula do funcionário. */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada. */ 
     }
````

#### Grupo: Facial

##### `POST /RestServiceApi/Facial/ChangeFacial`

Método responsável por atualizar a facial.

- `operationId`: `Facial_ChangeFacial`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Alterar as faces | `array<GetFacialExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por atualizar biometria facial. */

    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API. */
    
    /* 
        Os dados abaixo são fictícios, altere e informe os dados corretos.
        !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.

        O parâmetro IdSensor poderá receber os seguintes códigos referenciados:
    
        Tipos de Módulos Faciais:
        "2701" Face; "2702" FaceAccess; "2703" SpeedFace; "2704" Visica
    */

    /* Post */
    {
        "lstFacialBiometrics":
        [{
                "IdEmployee": 1, /* (Campo obrigatório) Id do funcionário */
                "IdSensor": 2701, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
                "CapturedFace": "Informe aqui a string do template" /* (Campo obrigatório) Informe a string do template */
            },
        	{
                "IdEmployee": 2, /* (Campo obrigatório) Id do funcionário */
                "IdSensor": 2702, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
                "CapturedFace": "Informe aqui a string do template" /* (Campo obrigatório) Informe a string do template */
            },
        	{
            "IdEmployee": 3, /* (Campo obrigatório) Id do funcionário */
                "IdSensor": 2703, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
                "CapturedFace": "Informe aqui a string do template" /* (Campo obrigatório) Informe a string do template */
            },
        	{
            "IdEmployee": 4, /* (Campo obrigatório) Id do funcionário */
                "IdSensor": 2704, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
                "CapturedFace": "Informe aqui a string do template" /* (Campo obrigatório) Informe a string do template */
        }]
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": null
  }
}
````

##### `POST /RestServiceApi/Facial/DeleteFacial`

Método responsável por excluir a facial.

- `operationId`: `Facial_DeleteFacial`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Deletar as faces | `array<GetFacialExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por excluir a facial. */

     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     { 
        "lstFacialBiometrics":
        [{
        	   "IdEmployee": 1, /* (Campo obrigatório) Id do funcionário */
        	   "IdFacial": 1 /* (Campo obrigatório) Informe o id da facial cadastrada */
        	},
        	{
        	   "IdEmployee": 2, /* (Campo obrigatório) Id do funcionário */
        	   "IdFacial": 2 /* (Campo obrigatório) Informe o id da facial cadastrada */
        	},
        	{
            "IdEmployee": 3, /* (Campo obrigatório) Id do funcionário */
        	   "IdFacial": 3 /* (Campo obrigatório) Informe o id da facial cadastrada */
        
            },
        	{
            "IdEmployee": 4, /* (Campo obrigatório) Id do funcionário */
        	   "IdFacial": 4 /* (Campo obrigatório) Informe o id da facial cadastrada */
        }]
     }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": null
  }
}
````

##### `POST /RestServiceApi/Facial/GetAllPeopleWithOrWithoutFacial`

Método para buscar todos os templates faciais

- `operationId`: `Facial_GetAllPeopleWithOrWithoutFacial`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna os funcionários do sistema | `array<GetAllPeopleWithOrWithoutFacialExample>` |

Descrição e exemplo da especificação:

````text
Exemplo:
            
    /* Este método é responsável por buscar o funcionário o funcionário. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/

    /* 
        O parâmetro IdSensor poderá receber os seguintes códigos referenciados:
    
        Tipos de Módulos Faciais:
       "2701" Face; "2702" FaceAccess; "2703" SpeedFace; "2704" Visica
    */

    /* Post */
    {
       "Id": 1, /* (Campo opcional) Id do funcionário. */
       "Matricula": 01, /* (Campo opcional) Matricula do funcionário. */
       "Cracha": 01, /* (Campo opcional) Cracha do funcionário. */
       "Nome": "Novo Funcionário", /* (Campo opcional) Nome do funcionário. */
       "IdSensor": 2702 /* (Campo opcional) Informe o id do sensor biometrico cadastrado */ 
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "TotalPagina": 1,
    "PaginaAtual": 1,
    "Obj": [
      {
        "Id": 1,
        "Matricula": 1,
        "Cracha": 1,
        "Nome": "Employee 1",
        "LstTemplate": [
          {
            "IdFacial": 1,
            "Template": "3;92406:38::2>24107;?<2...",
            "IdSensor": 2702
          }
        ]
      }
    ]
  }
}
````

##### `POST /RestServiceApi/Facial/SaveFacial`

Método responsável por salvar a facial.

- `operationId`: `Facial_SaveFacial`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Incluir as faces | `array<GetFacialExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por incluir biometria facial. */

    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API. */
    
    /* 
        Os dados abaixo são fictícios, altere e informe os dados corretos.
        !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.

        O parâmetro IdSensor poderá receber os seguintes códigos referenciados:
    
        Tipos de Módulos Faciais:
        "2701" Face; "2702" FaceAccess; "2703" SpeedFace; "2704" Visica; "2706" HikVision
    */

    /* Post */
    {
        "lstFacialBiometrics":
        [{
            "IdEmployee": 1, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2701, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
            "CapturedFace": "Informe aqui a string do template" /* (Campo obrigatório) Informe a string do template */
        },
        {
            "IdEmployee": 2, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2702, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
            "CapturedFace": "Informe aqui a string do template" /* (Campo obrigatório) Informe a string do template */
        },
        {
            "IdEmployee": 3, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2703, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
            "CapturedFace": "Informe aqui a string do template" /* (Campo obrigatório) Informe a string do template */
        },
        {
        "IdEmployee": 4, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2704, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
            "CapturedFace": "Informe aqui a string do template" /* (Campo obrigatório) Informe a string do template */
        },
        {
        "IdEmployee": 5, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2706, /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
            "CapturedFace": "Informe aqui a string do template" /* (Campo obrigatório) Informe a string do template */
        }]
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": null
  }
}
````

##### `POST /RestServiceApi/Facial/SearchFacial`

Método responsável por retornar a facial consultada.

- `operationId`: `Facial_SearchFacial`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as faces | `array<SearchFacialExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar a facial consultada. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/

     /* 
         O parâmetro IdSensor poderá receber os seguintes códigos referenciados:
     
         Tipos de Módulos Faciais:
        "2701" Face; "2702" FaceAccess; "2703" SpeedFace; "2704" Visica; "2706" HikVision
     */

    /* Post */
    {
        "lstFacialBiometrics":
        [{
            "IdEmployee": 1, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2701 /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
        },
    	{
            "IdEmployee": 2, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2702 /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
        },
    	{
        "IdEmployee": 3, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2703 /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
        },
    	{
        "IdEmployee": 4, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2704 /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
        },
    	{
        "IdEmployee": 5, /* (Campo obrigatório) Id do funcionário */
            "IdSensor": 2706 /* (Campo obrigatório) Informe o id do sensor biometrico cadastrado */
        }]
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": [
      {
        "IdEmployee": 1,
        "LstTemplate": [
          {
            "IdFacial": 1,
            "IdSensor": 2702,
            "Template": "3;92406:38::2>24107;?<2..."
          }
        ]
      }
    ]
  }
}
````

#### Grupo: HealthCheck

##### `POST /RestServiceApi/HealthCheck/ApplicationHealthCheck`

- `operationId`: `HealthCheck_ApplicationHealthCheck`
- Consome: ``
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `HealthCheck-Token` | header | sim | `string` | `` | Token de autenticação do Health Check |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Valida se a aplicação está disponível. | `Status` |

##### `POST /RestServiceApi/HealthCheck/DatabaseHealthCheck`

- `operationId`: `HealthCheck_DatabaseHealthCheck`
- Consome: ``
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `HealthCheck-Token` | header | sim | `string` | `` | Token de autenticação do Health Check |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Valida a conexão com o banco de dados. | `Status` |

#### Grupo: Holiday

##### `POST /RestServiceApi/Holiday/GetHoliday`

Método responsável por retornar as férias dos funcionários da empresa.

- `operationId`: `Holiday_GetHoliday`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar as férias dos funcionários da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Informar apenas um parâmetro ou não informar nenhuma para retornar todas as férias dos funcionários da empresa.
        
         "Cracha": [ 9998, 9999 ], /* (Campo opcional) Filtro de lista de cracha do Funcionário */
         "InicioPesquisa": "2020-07-01T00:00:00", /* (Campo obrigatório) Filtro de inicio do período da consulta. */
         "FimPesquisa": "2021-07-11T00:00:00" /* (Campo obrigatório) Filtro de fim do período da consulta. */
     }
````

##### `POST /RestServiceApi/Holiday/MarkHoliday`

Método responsável por salvar as férias do funcionário da empresa.

- `operationId`: `Holiday_MarkHoliday`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por salvar as férias do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     

         "MATRICULA": 9999, /* (Campo obrigatório) Matrícula do funcionário */
         //"PESSOAID": 999, /* (Campo opcional) Id do Funcionário */
         //"CRACHA": 99999, /* (Campo opcional) Cracha do Funcionário */
         "DATAINICIO": "2023-02-10", /* (Campo obrigatório) Inicio das férias do funcionário. Formato aaaa-MM-dd. */
         "DATAFIM": "2023-02-20", /* (Campo obrigatório) Fim das férias do funcionário. Formato aaaa-MM-dd. */
         "PermitirExtrapolarDataFinal": false, /* (Campo opcional) Permitir extrapolar as férias. Valor padrão é false. false = Não permite extrapolar as férias, true = Permite extrapolar as férias  */
         "RemoverFolgas": false, /* (Campo opcional) Remove as folgas do período de férias informado. Valor padrão é false. false = Não exclui as folgas, true = Exclui as folgas */
         "Coletiva": false, /* (Campo opcional) Informa se as férias são ou não coletivas. Valor padrão é false. false = Não são férias coletivas, true = São férias coletivas */
         "ConfirmacaoFeriasPrimeiroPeriodoAquisitivo": false, /* (Campo opcional) Confirma se as férias são do primeiro período aquisitivo. Valor padrão é false. false = As férias não são do primeiro período aquisitivo, true = As férias são do primeiro período aquisitivo  */
     }
````

##### `POST /RestServiceApi/Holiday/ReMarkHoliday`

Método responsável por remarcar as férias do funcionário da empresa.

- `operationId`: `Holiday_ReMarkHoliday`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Alterado com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por remarcar as férias do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     

         "MATRICULA": 9999, /* (Campo obrigatório) Matrícula do funcionário */
         //"PESSOAID": 999, /* (Campo opcional) Id do Funcionário */
         //"CRACHA": 99999, /* (Campo opcional) Cracha do Funcionário */
         "DATAINICIO": "2023-02-10", /* (Campo obrigatório) Inicio das férias do funcionário. Formato de data aaaa-MM-dd. */
         "DATAFIM": "2023-02-20", /* (Campo obrigatório) Fim das férias do funcionário. Formato de data aaaa-MM-dd. */
         "PermitirExtrapolarDataFinal": false, /* (Campo opcional) Permitir extrapolar as férias. Valor padrão é false. false = Não permite extrapolar as férias, true = Permite extrapolar as férias  */
     }
````

##### `POST /RestServiceApi/Holiday/UnMarkHoliday`

Método responsável por retirar as férias do funcionário da empresa.

- `operationId`: `Holiday_UnMarkHoliday`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Excluído com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retirar as férias do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão excluídos.     

         "MATRICULA": 9999, /* (Campo obrigatório) Matrícula do funcionário */
         //"PESSOAID": 999, /* (Campo opcional) Id do Funcionário */
         //"CRACHA": 99999, /* (Campo opcional) Cracha do Funcionário */
     }
````

#### Grupo: JobPosition

##### `POST /RestServiceApi/JobPosition/ChangeJobPosition`

Método responsável por alterar o cargo da empresa.

- `operationId`: `JobPosition_ChangeJobPosition`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por alterar o cargo da empresa. */

     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
        // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão alterados.
        
        "Id" : "9999", /* (Campo obrigatório) Id do cargo */
        "Codigo" : "9999", /* (Campo obrigatório) Código do cargo */
        "Descricao": 18261, /* (Campo obrigatório) Descrição do cargo */
        // "Extra1": "Informação extra 1", /* (Campo opcional) Informação adicional 1 referente a estrutura que está sendo gravada. */
        // "Extra2": "Informação extra 2", /* (Campo opcional) Informação adicional 2 referente a estrutura que está sendo gravada */
     }
````

##### `POST /RestServiceApi/JobPosition/DeleteJobPosition`

Método responsável por excluir o cargo da empresa.

- `operationId`: `JobPosition_DeleteJobPosition`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Excluído com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por excluir o cargo da empresa. */

     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
        // !!! ALERTA !!! - Cuidado antes de executar este método, o dado será excluído.
        
        "Id" : "9999", /* (Campo obrigatório) Id do cargo */
     }
````

##### `POST /RestServiceApi/JobPosition/SaveJobPosition`

Método responsável por salvar o cargo na empresa.

- `operationId`: `JobPosition_SaveJobPosition`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por salvar o cargo na empresa. */
            
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e Value são obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e Value são obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
        
        "Codigo" : "9999", /* (Campo obrigatório) Código do cargo */
        "Descricao" : "Cargo de teste 9999", /* (Campo obrigatório) Descrição do cargo */
        // "Extra1": "Informação extra 1", /* (Campo opcional) Informação adicional 1 referente ao cargo que está sendo gravada. */
        // "Extra2": "Informação extra 2", /* (Campo opcional) Informação adicional 2 referente ao cargo que está sendo gravada */
     }
````

##### `POST /RestServiceApi/JobPosition/SearchJobPosition`

Método responsável por retornar o cargo na empresa consultada.

- `operationId`: `JobPosition_SearchJobPosition`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar o cargo na empresa consultada. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Informar apenas um parâmetro ou não informar nenhuma para retornar todas as estruturas da empresa.
        
        // "Id": 4, /* (Campo opcional) Filtro de id do cargo*/
        // "Codigo": 4, /* (Campo opcional) Filtro de código do cargo */
        // "Descricao": "ANALISTA BIBLIOTECA", /* (Campo opcional) Filtro de descrição do cargo */
        // "Modify": false, /* (Campo opcional) Retornar as estruturas que foram alteradas dependendo do parâmetro informado. Valor padrão é false. false = Não retorna os alterados, true = Retorna somente os alterados  */
        // "Exclude": false /* (Campo opcional) Retornar as estruturas que foram excluídas dependendo do parâmetro informado. Valor padrão é false. false = Não retorna os excluídos, true = Retorna somente os excluídos  */
     }
````

#### Grupo: Justification

##### `POST /RestServiceApi/Justification/GetApprover`

- `operationId`: `Justification_GetApprover`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `object` |

##### `POST /RestServiceApi/Justification/GetJustification`

Método responsável por consultar as justificativas da empresa.

- `operationId`: `Justification_GetJustification`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método responsável por consultar as justificativas da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "Code" : 0, /* (Campo obrigatório) Filtro de codigo da justificativa. */
        "IdType": 1202, /* (Campo obrigatório) Filtro de id do tipo da justificativa. */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

#### Grupo: JustificationRequest

##### `POST /RestServiceApi/JustificationRequest/ApprovalJustificationRequest`

Método responsável por aprovar o pedido de justificativa do funcionário da empresa.

- `operationId`: `JustificationRequest_ApprovalJustificationRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Aprovado com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por aprovar o pedido de justificativa do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     
        
         "LstJustificationReq": /* (Campo obrigatório) Lista de pedidos de marcacoes. */
         [{
            "Id":13197, /* (Campo obrigatório) Id do pedido de justificativa */
            "ValidQtdHours":"10:00", /* (Campo obrigatório) Quantidade de horas validas que será aprovada. */
            "Situation": 1, /* (Campo obrigatório) Id da Situação. 1 – Abonado , 3 - Rejeitado */  
            "IdUser": 2398, /* (Campo obrigatório) Id do usuário. */ 
            "ResponseType":"AS400V1" /* (Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
         }] 
     }
````

##### `POST /RestServiceApi/JustificationRequest/GetJustificationRequest`

Método responsável por consultar o pedido de justificativa do funcionário da empresa.

- `operationId`: `JustificationRequest_GetJustificationRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método responsável por consultar o pedido de justificativa do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "IdUser" : 2398, /* (Campo obrigatório) Id do usuario que fez a justificativa será construido um api para pegar esse id do usuario*/ 
        "IdEmployee": 51157, /* (Campo obrigatório) Id do funcionário. Informar 0 quando não há filtro de funcionário. */
        "Start":"13-08-2021", /* (Campo obrigatório) Filtro de inicio do período da consulta. Formato dd-MM-aaaa. */
        "End":"17-08-2021", /* (Campo obrigatório) Filtro de fim do período da consulta. Formato dd-MM-aaaa. */
        "Country":"BR", /* Versão do país. BR – Brasil, PT – Portugal, MX – México e US – Estados Unidos*/  
        "RequestType":"1", /* (Campo obrigatório) É o tipo de valor que será informado no "IdEmployee". 1 = Consulta por id dos funcionários, 2 = Consulta pelo crachá do funcionário, 3 = Consulta pela matrícula do funcionário. */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

##### `POST /RestServiceApi/JustificationRequest/JustificationRequest`

Método responsável por criar o pedido de justificativa do funcionário da empresa.

- `operationId`: `JustificationRequest_JustificationRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Criado com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por criar o pedido de justificativa do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     
        
         "IdUser" : 2398, /* (Campo obrigatório) Id do usuario. */
         "Country":"BR", /* (Campo obrigatório) Abreviãção do país consultado. BR = Brasil, PT = Prtugal, MX = México */
         "LstJustificationReq": (Campo obrigatório) Lista de pedidos de justificativas. */
         [{
            "IdJustication":"1", /* (Campo obrigatório) Id da justificativa. */
            "Description":"testeapi", /* (Campo obrigatório) Motivo do pedido da justificativa. */
            "IdOccurrence":"38795116", /* (Campo obrigatório) Id da ocorrencia. */
            "Documents":[] /* (Campo opcional) Imagem em anexo. */
         }],
         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

#### Grupo: Mark

##### `POST /RestServiceApi/Mark/GetMarks`

Método responsável pelas as marcações de um unico funcionario por período

- `operationId`: `Mark_GetMarks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna as marcações | `array<GetMarksExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Post */        
     {
        "MatriculaPessoa": [1001], /*(Campo obrigatório) Matricula do funcionário da consulta. */
        "DataInicio": "01/09/2019", /*(Campo obrigatório) Início do período consultado. Formato dd/MM/aaaa. */ 
        "DataFim": "20/09/2019", /*(Campo obrigatório) Fim do período consultado. Formato dd/MM/aaaa. */
        "ResponseType": "AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada. */
     }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": [
    {
      "Matricula": 1001,
      "Indevido": false,
      "Ano": 2019,
      "Mes": 9,
      "Dia": 10,
      "Hora": 8,
      "Minuto": 0,
      "FotoFacial": "iVBORw0KGgoAAAANSUhEUgAAAO4AAAHgCAIAAAAt8caxAAAAAXNSR0IArs4c6QAAAANzQklUCAgI2+FP4AAAIABJREFUeJzsvVuPJElyLmZm7hGZWZe+1HTP7vbM7OwMd5ck9CKSAvhAQSIg6HKgB+oc6AiSoMuLAEk/Q6/6EfoDAqQXApIeCBDEISQ+UEudJZe7JJdz69mZ7q7uumdmRLib6cHcLTwjI7Oyqqv3xjY0qjMjIzw8PMzNzT67OP4v//P/1LYtIoYYGYSIAKAjBwBEJADoaj1IRM45RAQARPzmN795//79er8CABGBTHqyc845BwAgHhERMSJcRy5/iIMfmLn8ICIxxsVi0XVxsVg65+q69h71jp4c5QvFc/4ETnz62P8ORFXZ7fIzEQ0O6oMQSXG+K68tzx9tEwC0kcGNRi9fGYFI6ydsOX8nwtA3kgdnQCJSvtyRjuVXsyNtOX/w0+iZWy6nnuduQkT05Zdffv31103T3PTauyLtuffpHYQQYhzOgbf0T4e8irQQAouIrAg/ZgZAQmZm55xkSld6f3l5ic/hyZMn1pyeSUTMLCLGZ69J2iBkEaLdcM6FwM65GGMIwTlgZiKKMQKinlletZ0GZ6rgHL1cnzH/tKsUsKa082WbzKyi+tremky66dNd2zGQmwlXuIk83iLadxe91x70LCIA5MiDlxBFWASgVwZEOAKAIERhANYVUgC6EKqqOjs7J/KPHz3Sw7r0a7+zsBd9GMBrR3zbQrZyXm7fe44xAkgIQX9CRCQHiOvnb2iKceVkKfuMq33WdhBh65J7g0fIDaJ9GPTWfgLg1cv11/7zdbRRvRNeab+cJNaHXW6w2j3Z8nX0yI0Ojv7ku5iZgJxzFGMU4ZKrJHZEBCzgKMaIiEQUBQGh4ygLOZGz2XR/f38fnZgwS/pxjESCSCICUG9//lKxtE+jcsi+VpUX4eUyECWRzMyMWLZw3XBEHJtjmVeGP4kIomO+gTzecN8VVs4tb2ZlXGUOYOuewA7ScVQVlp3E+XZd+XaXvBFWbpqmruts0qXfCAVWpyYz68TWFVwg2X+61H755ZdPnjy5/2DfWlfZrDrGLaa10SgHl1TXNQAsFgtEDCGICAJEQFUD+qtkd6HfT8VrD/76Uam03NSkM3rNy3dsytROJR9jzCoBAiQVEzhcew8DEwAAEZ8+fVrVH0ynU3vZaoRlq//1bO0NVKIlqmPEGAmRkW5hy76lX2nyMULbRu+RORrbOXQxRuP6xPsUAdKq5BhFhICAAcSRcwDw5Zdfvv/++5PJpJT8zKrOAkk/3WMW8Dv20s5cN3REZDKZdF0nInqvyBxAAAEQUBdW6W+qrex89wgAzBEK2G6DhJD1M9fppvJetaZNN71DGh2NgZH6pvtwC1qBO9u2bdu2aZq2bQ3M8t5vBx9GYa+mab744ouLi4vBmbdQtm5KdV1771USi/RW4Fv6p0Ne9Uv9YupvjCvIkf5aSmjfo1EUY1TFNAIsFovj42Pn3GQyIaIQggFzIYbXX/QHIJTeN4SgAHOMUXV3ImqaZjqdjgKC16JdmxaBdRxtO+0Irg3GedDJHX0KdwPJ3erXG515U8fHLrdOPGkabfmbuOF6JyKl2aTqB2S7O90PHRKenZ1Np9N3Hz9WREtBD0R0RMoMiACCgAAicBdWlPc+hKB/dbboUjDo5KbLSxhhcLw8aEhc+XUAO6x/3nLH9fN3b2SAclz7jDvYvHbt6JnXvKbtC+/uKMTuba6f4/7w9/8tlQr2AzMzoTmolUQEGECQ0CGQNqDHTc/zVDv0nqpuuZDIk6pySOAonUOAKAKRHBIQKb5Et2Fle4ByxRjocwOJWAqt0VdeHrTPNgjaJKIgAuLK2qIObUjomJ6J642MUnnO6Pm7s/L2GwHKNf8MvsS47dcNdDv0bfuFN2VlDwClMANd7wjUnbZ+cVIzMPGxLuuIqCt7lg2ssrmqKigUa50zzCwctfHX9FcZ+3rvRaSu667rTGXquk5BRrWrbqQYlLy1ResoXHQjjezuk1u3ruzz4MJ1VaRUt3Z8wJJuN/ivqZC8pkYxSkmP1BVZnRoAwIVVdwskVRt5/vy5954mlb111WVv19Edqa5rHQvD5n4ON31LvwzUm0RmQomIByAGYnU+i4g4wI6KsARRh5gECIYbMLdJLXYTEeg6OT4+vXf0sK7rqkqREqBeFWlRHBFptJrqKzuEziUa9ZuYbJ5OJtx2iKR8rKanrgZbxOToQYz9Qellp/6oyljfKb0CAIji6sGN7Q9o3T0xCD7ZRZjdVMrmC9v0vZD446YnBoA15Vn8SPcw40iCAO51RPXomYMn7VlZ7aTUh1VJfO3o6IWGFehX59xyuexevnz8+DERscTR4Mm7JeccAqimAQDL0KUAo6J7b+nXkvq3W3rpVEIbvKXHR6eMSnFlTZV/RATApqE28/nJyck777xTTxJLqW6dxCQC2HR0N+PvTdohEU2n0/x4IiJt26pz3k6A68SkCmCH/ZmCUMav5aY2mhMDgTpK164Pm1wkmx5800/lCbtT0dTIhSs32hxYx8wguAkD2VES7wLhDQWV/Wx6MxiX33AgEgxHOJ/Pp9Op83srxxHfkAqLiOr/Y2YSDiHos6gN+pZ+XclnjyuXpjFRZUe898rfrvCgddRfDywIwhyEUKUIESMmJRujR8Czl6+urq6Ojo6m0ykh5Ag2BCzQgKyY3k5pLkVOYHaTOiJUCObQbtvWez9Qb1xWDUdv2hXOdtrsIhmIh+J3lQV6j4TYjDquy8cpD66L9nUEY/2S0V/X+zlOar2MLRSJcKyRrBZzLAUwFX9v3pMb0opUNpRe71R+tcCdzAorLsB8vSKs6YXpW8esQiyXy7Ozs9QUAuSoOrv61gr0uk9BRX5VVcY6bdvq7cw7uCnmYVNPRhE6VbvWzCOTCOVMS0vQFpfh+mhsj8EYHb3XxDfXW77hObSuS2yZfre++zoNdeV17N2CKMq/4DZC9yWKDFmdUOmyXC6JqK5rTtHAWFd3YIqt+8xSUJRzdV3HGBVgNvz7FvDiW/rlJ++RACAIszDkxVcjvJijAARyHhE4EJFDIRQCnnIKdVBNI0kCAEB0zgVhW9YV22VGrKYhhPl8vr+/jzjpQBDY+5aIcoJJrU25coW+LdcpAFdVlQbNKeXUKWeaepftFdqc5LI1MMNC56rioApgyoFyI1rQ7hbhjgvXOjSpX9dN1Wto1IDDQrk0WSduXQAz8waAYFe6te6RhkaVyE0nhRA0CbT8MLpkKJS7/rls6tmzZ2dnZxqI93PILZ1MJpaK+zaV9deYfLHyehDeMics8EhEBMaDV3I4R49+qDhExK7rlJ+IaLFYEJH3vo5ERCopWV5LyTNpZHJIU2shZ5poT1TZwBwDaJcPILBR40wPriuv466EDd7sLS7xdRo4rndXYXcxE++E7sSAu5NGfBkLsQslbDgNkUB9jbKrqjYzx2zqAUDXdfP5vK5rX4GIGAz8hshlMmD7jbpp3tIvhHyWo8DMHokRACAUGnBJygQhhIpyeZRC+PFqEjwUgUSISDULMEtkYYkOAC4uLgDD/v6+5v/hmI5lenOEayMN"
    },
    {
      "Matricula": 1001,
      "Indevido": false,
      "Ano": 2019,
      "Mes": 9,
      "Dia": 10,
      "Hora": 12,
      "Minuto": 0,
      "FotoFacial": ""
    },
    {
      "Matricula": 1001,
      "Indevido": false,
      "Ano": 2019,
      "Mes": 9,
      "Dia": 11,
      "Hora": 8,
      "Minuto": 0,
      "FotoFacial": ""
    },
    {
      "Matricula": 1001,
      "Indevido": false,
      "Ano": 2019,
      "Mes": 9,
      "Dia": 11,
      "Hora": 20,
      "Minuto": 0,
      "FotoFacial": "iVBORw0KGgoAAAANSUhEUgAAAO4AAAHgCAIAAAAt8caxAAAAAXNSR0IArs4c6QAAAANzQklUCAgI2+FP4AAAIABJREFUeJzsvVuPJElyLmZm7hGZWZe+1HTP7vbM7OwMd5ck9CKSAvhAQSIg6HKgB+oc6AiSoMuLAEk/Q6/6EfoDAqQXApIeCBDEISQ+UEudJZe7JJdz69mZ7q7uumdmRLib6cHcLTwjI7Oyqqv3xjY0qjMjIzw8PMzNzT67OP4v//P/1LYtIoYYGYSIAKAjBwBEJADoaj1IRM45RAQARPzmN795//79er8CABGBTHqyc845BwAgHhERMSJcRy5/iIMfmLn8ICIxxsVi0XVxsVg65+q69h71jp4c5QvFc/4ETnz62P8ORFXZ7fIzEQ0O6oMQSXG+K68tzx9tEwC0kcGNRi9fGYFI6ydsOX8nwtA3kgdnQCJSvtyRjuVXsyNtOX/w0+iZWy6nnuduQkT05Zdffv31103T3PTauyLtuffpHYQQYhzOgbf0T4e8irQQAouIrAg/ZgZAQmZm55xkSld6f3l5ic/hyZMn1pyeSUTMLCLGZ69J2iBkEaLdcM6FwM65GGMIwTlgZiKKMQKinlletZ0GZ6rgHL1cnzH/tKsUsKa082WbzKyi+tremky66dNd2zGQmwlXuIk83iLadxe91x70LCIA5MiDlxBFWASgVwZEOAKAIERhANYVUgC6EKqqOjs7J/KPHz3Sw7r0a7+zsBd9GMBrR3zbQrZyXm7fe44xAkgIQX9CRCQHiOvnb2iKceVkKfuMq33WdhBh65J7g0fIDaJ9GPTWfgLg1cv11/7zdbRRvRNeab+cJNaHXW6w2j3Z8nX0yI0Ojv7ku5iZgJxzFGMU4ZKrJHZEBCzgKMaIiEQUBQGh4ygLOZGz2XR/f38fnZgwS/pxjESCSCICUG9//lKxtE+jcsi+VpUX4eUyECWRzMyMWLZw3XBEHJtjmVeGP4kIomO+gTzecN8VVs4tb2ZlXGUOYOuewA7ScVQVlp3E+XZd+XaXvBFWbpqmruts0qXfCAVWpyYz68TWFVwg2X+61H755ZdPnjy5/2DfWlfZrDrGLaa10SgHl1TXNQAsFgtEDCGICAJEQFUD+qtkd6HfT8VrD/76Uam03NSkM3rNy3dsytROJR9jzCoBAiQVEzhcew8DEwAAEZ8+fVrVH0ynU3vZaoRlq//1bO0NVKIlqmPEGAmRkW5hy76lX2nyMULbRu+RORrbOXQxRuP6xPsUAdKq5BhFhICAAcSRcwDw5Zdfvv/++5PJpJT8zKrOAkk/3WMW8Dv20s5cN3REZDKZdF0nInqvyBxAAAEQUBdW6W+qrex89wgAzBEK2G6DhJD1M9fppvJetaZNN71DGh2NgZH6pvtwC1qBO9u2bdu2aZq2bQ3M8t5vBx9GYa+mab744ouLi4vBmbdQtm5KdV1771USi/RW4Fv6p0Ne9Uv9YupvjCvIkf5aSmjfo1EUY1TFNAIsFovj42Pn3GQyIaIQggFzIYbXX/QHIJTeN4SgAHOMUXV3ImqaZjqdjgKC16JdmxaBdRxtO+0Irg3GedDJHX0KdwPJ3erXG515U8fHLrdOPGkabfmbuOF6JyKl2aTqB2S7O90PHRKenZ1Np9N3Hz9WREtBD0R0RMoMiACCgAAicBdWlPc+hKB/dbboUjDo5KbLSxhhcLw8aEhc+XUAO6x/3nLH9fN3b2SAclz7jDvYvHbt6JnXvKbtC+/uKMTuba6f4/7w9/8tlQr2AzMzoTmolUQEGECQ0CGQNqDHTc/zVDv0nqpuuZDIk6pySOAonUOAKAKRHBIQKb5Et2Fle4ByxRjocwOJWAqt0VdeHrTPNgjaJKIgAuLK2qIObUjomJ6J642MUnnO6Pm7s/L2GwHKNf8MvsS47dcNdDv0bfuFN2VlDwClMANd7wjUnbZ+cVIzMPGxLuuIqCt7lg2ssrmqKigUa50zzCwctfHX9FcZ+3rvRaSu667rTGXquk5BRrWrbqQYlLy1ResoXHQjjezuk1u3ruzz4MJ1VaRUt3Z8wJJuN/ivqZC8pkYxSkmP1BVZnRoAwIVVdwskVRt5/vy5954mlb111WVv19Edqa5rHQvD5n4ON31LvwzUm0RmQomIByAGYnU+i4g4wI6KsARRh5gECIYbMLdJLXYTEeg6OT4+vXf0sK7rqkqREqBeFWlRHBFptJrqKzuEziUa9ZuYbJ5OJtx2iKR8rKanrgZbxOToQYz9Qellp/6oyljfKb0CAIji6sGN7Q9o3T0xCD7ZRZjdVMrmC9v0vZD446YnBoA15Vn8SPcw40iCAO51RPXomYMn7VlZ7aTUh1VJfO3o6IWGFehX59xyuexevnz8+DERscTR4Mm7JeccAqimAQDL0KUAo6J7b+nXkvq3W3rpVEIbvKXHR6eMSnFlTZV/RATApqE28/nJyck777xTTxJLqW6dxCQC2HR0N+PvTdohEU2n0/x4IiJt26pz3k6A68SkCmCH/ZmCUMav5aY2mhMDgTpK164Pm1wkmx5800/lCbtT0dTIhSs32hxYx8wguAkD2VES7wLhDQWV/Wx6MxiX33AgEgxHOJ/Pp9Op83srxxHfkAqLiOr/Y2YSDiHos6gN+pZ+XclnjyuXpjFRZUe898rfrvCgddRfDywIwhyEUKUIESMmJRujR8Czl6+urq6Ojo6m0ykh5Ag2BCzQgKyY3k5pLkVOYHaTOiJUCObQbtvWez9Qb1xWDUdv2hXOdtrsIhmIh+J3lQV6j4TYjDquy8cpD66L9nUEY/2S0V/X+zlOar2MLRSJcKyRrBZzLAUwFX9v3pMb0opUNpRe71R+tcCdzAorLsB8vSKs6YXpW8esQiyXy7Ozs9QUAuSoOrv61gr0uk9BRX5VVcY6bdvq7cw7uCnmYVNPRhE6VbvWzCOTCOVMS0vQFpfh+mhsj8EYHb3XxDfXW77hObSuS2yZfre++zoNdeV17N2CKMq/4DZC9yWKDFmdUOmyXC6JqK5rTtHAWFd3YIqt+8xSUJRzdV3HGBVgNvz7FvDiW/rlJ++RACAIszDkxVcjvJijAARyHhE4EJFDIRQCnnIKdVBNI0kCAEB0zgVhW9YV22VGrKYhhPl8vr+/jzjpQBDY+5aIcoJJrU25coW+LdcpAFdVlQbNKeXUKWeaepftFdqc5LI1MMNC56rioApgyoFyI1rQ7hbhjgvXOjSpX9dN1Wto1IDDQrk0WSduXQAz8waAYFe6te6RhkaVyE0nhRA0CbT8MLpkKJS7/rls6tmzZ2dnZxqI93PILZ1MJpaK+zaV9deYfLHyehDeMics8EhEBMaDV3I4R49+qDhExK7rlJ+IaLFYEJH3vo5ERCopWV5LyTNpZHJIU2shZ5poT1TZwBwDaJcPILBR40wPriuv466EDd7sLS7xdRo4rndXYXcxE++E7sSAu5NGfBkLsQslbDgNkUB9jbKrqjYzx2zqAUDXdfP5vK5rX4GIGAz8hshlMmD7jbpp3tIvhHyWo8DMHokRACAUGnBJygQhhIpyeZRC+PFqEjwUgUSISDULMEtkYYkOAC4uLgDD/v6+5v/hmI5lenOEayMN"
    }
  ]
}
````

##### `POST /RestServiceApi/Mark/SetListMark`

Método responsável por gravar as marcações.

- `operationId`: `Mark_SetListMark`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Marcação gravada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por gravar as marcações em lote. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* 
        O parâmetro NumeroFabricacao ou RelogioNumero deve ser informado caso você já tenha cadastrado o relógio no sistema.
    */
    
    /* Post */
    {
       "CpfResponsavel": "00000000000", /*(Obrigatório o parâmetro cpf no header ou CpfResponsavel no body quando portaria 671) Cpf do usuário responsável  */ 
       "lstMark":
       [{
           "Id":  1, /* (Campo opcional) Id do retorno da api */
           "Matricula":  21, /*(Campo obrigatório) Matricula do funcionário da consulta. */
           "DataHoraApontamento": "08/02/2022 18:00", /*(Campo obrigatório) Data e hora da marcação */ 
           "NumeroFabricacao": "45645645465", /* (Campo opcional) Número de fabricação. */
           "Nsr": 1 /* (Campo opcional) Número do NSR */
       },
       {
           "Id":  2, /* (Campo opcional) Id do retorno da api */
           "Matricula":  22, /*(Campo obrigatório) Matricula do funcionário da consulta. */
           "DataHoraApontamento": "08/02/2022 19:00", /*(Campo obrigatório) Data e hora da marcação */ 
           "NumeroFabricacao": "45645645465", /* (Campo opcional) Número de fabricação. */
           "Nsr": 1 /* (Campo opcional) Número do NSR */
       },
       {
           "Id":  3, /* (Campo opcional) Id do retorno da api */
           "Matricula":  23, /*(Campo obrigatório) Matricula do funcionário da consulta. */
           "DataHoraApontamento": "08/02/2022 20:00", /*(Campo obrigatório) Data e hora da marcação */ 
           "NumeroFabricacao": "45645645465", /* (Campo opcional) Número de fabricação. */
           "Nsr": 1 /* (Campo opcional) Número do NSR */
       },
       {
           "Id":  4, /* (Campo opcional) Id do retorno da api */
           "Matricula":  24, /*(Campo obrigatório) Matricula do funcionário da consulta. */
           "DataHoraApontamento": "08/02/2022 21:00", /*(Campo obrigatório) Data e hora da marcação */ 
           "NumeroFabricacao": "45645645465", /* (Campo opcional) Número de fabricação. */
           "Nsr": 1 /* (Campo opcional) Número do NSR */
       }],
       "ResponseType": "AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre  será  esse  valor  fixo. É  o tipo  da  resposta  esperada. */
    }
````

##### `POST /RestServiceApi/Mark/SetMarks`

Método responsável por gravar a marcação.

- `operationId`: `Mark_SetMarks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |
| `cpf` | header | não | `string` | `` | CPF do usuário responsável (Obrigatório o parâmetro cpf no header ou CpfResponsavel no body quando portaria 671) |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Marcação gravada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Post */
     {
        "Matricula":  21, /*(Campo obrigatório) Matricula do funcionário da consulta. */
        "DataHoraApontamento": "08/02/2022 18:00", /*(Campo obrigatório) Data e hora da marcação */ 
        "CpfResponsavel": "00000000000", /*(Obrigatório o parâmetro cpf no header ou CpfResponsavel no body quando portaria 671) Cpf do usuário responsável  */ 
        "ResponseType": "AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada. */
     }
````

##### `GET /RestServiceApi/Mark/TimeClockRecordWithCertificate`

- `operationId`: `Mark_TimeClockRecordWithCertificate`
- Consome: ``
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `idSequence` | query | sim | `integer` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Return the p7s for download. | `` |

Descrição e exemplo da especificação:

````text
Se por acaso não for possível realizar o download do arquivo no momento. Isso pode ter ocorrido devido a uma incompatibilidade entre o Swagger UI e o formato do arquivo ou à falta de suporte do navegador para esse tipo de solicitação.

Soluções sugeridas:
- Tente acessar o endpoint diretamente em outra ferramenta, como Postman.
- Verifique se o servidor está retornando corretamente o arquivo e os cabeçalhos adequados.
- Caso o problema persista, entre em contato com o suporte técnico fornecendo detalhes do erro.
````

##### `GET /RestServiceApi/Mark/TimeClockRecordWithoutCertificate`

- `operationId`: `Mark_TimeClockRecordWithoutCertificate`
- Consome: ``
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `idSequence` | query | sim | `integer` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Returns the pdf for download. | `` |

Descrição e exemplo da especificação:

````text
Se por acaso não for possível realizar o download do arquivo no momento. Isso pode ter ocorrido devido a uma incompatibilidade entre o Swagger UI e o formato do arquivo ou à falta de suporte do navegador para esse tipo de solicitação.

Soluções sugeridas:
- Tente acessar o endpoint diretamente em outra ferramenta, como Postman.
- Verifique se o servidor está retornando corretamente o arquivo e os cabeçalhos adequados.
- Caso o problema persista, entre em contato com o suporte técnico fornecendo detalhes do erro.
````

#### Grupo: MobileApp

##### `POST /RestServiceApi/MobileApp/AllRequests`

- `operationId`: `MobileApp_AllRequests`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `RequestsRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `RequestsModel` |

##### `POST /RestServiceApi/MobileApp/ApprovalStatus`

- `operationId`: `MobileApp_ApprovalStatus`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ApprovalStatusRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `array<PassoAprovacao>` |

##### `POST /RestServiceApi/MobileApp/Assiduity`

- `operationId`: `MobileApp_Assiduity`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `AssiduityRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `AssiduityModel` |

##### `POST /RestServiceApi/MobileApp/BuscaCPF`

Método responsável por retornar os afastamentos na empresa consultada.

- `operationId`: `MobileApp_BuscaCPF`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `RecoverRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar os afastamentos na empresa consultada. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Informar apenas um parâmetro ou não informar nenhuma para retornar todos os afastamento da empresa.
        
        "IdsPessoa": [1 , 2], /* (Campo obrigatório)  Lista de valores informados para consultar os funcionários */
        "DataInicio":"01-02-2023", /* (Campo obrigatório) Filtro de inicio do período da consulta. */
        "DataFim":"23-02-2023", /* (Campo obrigatório) Filtro de inicio do período da consulta. */
        "RequestType": 2, /* (Campo obrigatório) É o tipo de valor que será informado na lista de "IdsPessoa". 1 = Consulta por id dos funcionários, 2 = Consulta pelo crachá do funcionário, 3 = Consulta pela matrícula do funcionário. */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */             
     }
````

##### `POST /RestServiceApi/MobileApp/Companies`

- `operationId`: `MobileApp_Companies`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `BaseRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `CompaniesModel` |

##### `POST /RestServiceApi/MobileApp/Contacts`

- `operationId`: `MobileApp_Contacts`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ContactsRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `ContactsResponseModel` |

##### `POST /RestServiceApi/MobileApp/Dashboard`

- `operationId`: `MobileApp_Dashboard`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `DashboardRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `DashboardModel` |

##### `POST /RestServiceApi/MobileApp/ExcludeRequest`

- `operationId`: `MobileApp_ExcludeRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ExcludeRequestRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/FaceRegistration`

- `operationId`: `MobileApp_FaceRegistration`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `FaceRegistrationRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `FaceRegistrationResponseModel` |

##### `POST /RestServiceApi/MobileApp/GetDelayOccurrences`

- `operationId`: `MobileApp_GetDelayOccurrences`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `DelayOccurrencesRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `DelayOccurrencesResponseModel` |

##### `POST /RestServiceApi/MobileApp/GetJustifications`

- `operationId`: `MobileApp_GetJustifications`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `BaseRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `JustificationResponseModel` |

##### `POST /RestServiceApi/MobileApp/GetJustificationsDelay`

- `operationId`: `MobileApp_GetJustificationsDelay`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `BaseRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `JustificationsDelayResponseModel` |

##### `GET /RestServiceApi/MobileApp/GetLastCode`

- `operationId`: `MobileApp_GetLastCode`
- Consome: ``
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `idEmpresa` | query | sim | `integer` | `` |  |
| `idEstrutura` | query | não | `integer` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `integer` |

##### `POST /RestServiceApi/MobileApp/GetRequestDates`

- `operationId`: `MobileApp_GetRequestDates`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ExtraDatesRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `ExtraRequestDatesResponseModel` |

##### `GET /RestServiceApi/MobileApp/GetStructure`

- `operationId`: `MobileApp_GetStructure`
- Consome: ``
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `idEmpresa` | query | sim | `integer` | `` |  |
| `userId` | query | não | `integer` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `array<StructureRequestModel>` |

##### `GET /RestServiceApi/MobileApp/GetTime`

- `operationId`: `MobileApp_GetTime`
- Consome: ``
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `idEmpresa` | query | sim | `integer` | `` |  |
| `idPess` | query | sim | `integer` | `` |  |
| `idFusoHorario` | query | sim | `integer` | `` |  |
| `horarioVerao` | query | sim | `boolean` | `` |  |
| `inicioHorarioVerao` | query | sim | `string` | `` |  |
| `fimHorarioVerao` | query | sim | `string` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `string` |

##### `GET /RestServiceApi/MobileApp/GetTimeLocalizacaoAlternativa`

- `operationId`: `MobileApp_GetTimeLocalizacaoAlternativa`
- Consome: ``
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `idEmpresa` | query | sim | `integer` | `` |  |
| `idPess` | query | sim | `integer` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `string` |

##### `POST /RestServiceApi/MobileApp/Holidays`

- `operationId`: `MobileApp_Holidays`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `HolidaysRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `HolidaysModel` |

##### `POST /RestServiceApi/MobileApp/Inconsistencies`

- `operationId`: `MobileApp_Inconsistencies`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `InconsistenciesRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `InconsistenciesModel` |

##### `POST /RestServiceApi/MobileApp/InsertLogErro`

- `operationId`: `MobileApp_InsertLogErro`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `LogErro` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/LimitBank`

- `operationId`: `MobileApp_LimitBank`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `BaseRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `LimitBankModel` |

##### `POST /RestServiceApi/MobileApp/Login`

Método responsável por realizar o login.

- `operationId`: `MobileApp_Login`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `LoginRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Logado com sucesso | `UserModel` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por realizar o login. */
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         
         "AppManager": false, /* (Campo obrigatório) App gerencial. true - Utilizar o app gerencial, false - Não utilizar o app gerencial. */
         "Companies": [0], /* (Campo obrigatório) Lista de id de empresas. */
         "CompanyId": 504311,  /* (Campo obrigatório) id de empresa. */
         "CompanyIdApiFace": 0, /* (Campo obrigatório) id de empresa. */
         "Email": "filial@br.com", /* (Campo obrigatório) E-mail do usuário. */
         "IsBiometria": false, /* (Campo obrigatório) Login biométrico. true - O login é biométrico, false - O login não é biométrico */
         "Mode": 0, /* (Campo obrigatório) Modo de login. 0 - EmailPassword, 1 - Pis, 2 - Matricula, 3 - Cpf, 4 - Azure */
         "Password": "1", /* (Campo obrigatório) Password do login/usuário. */
         "PasswordAlreadyHashed": false, /* (Campo obrigatório) Passoword criptografado. false - Senha não criptografada, true - Senha criptografada */
         "SkipGetOfflineUsers": false, /* (Campo obrigatório) Permite o login de usuários offline. false - não permite, true - permite */
         "StructPersonId": 0, /* (Campo obrigatório) Id de estrutura organizacional. */
         "Structures": [0], /* (Campo obrigatório) Lista de id de estrutura organizacional. */
         "UserThatDidSync": /* (Campo obrigatório) E-mail do usuário. */
     }
````

##### `POST /RestServiceApi/MobileApp/LoginWithCachePermissions`

Método responsável por realizar o login.

- `operationId`: `MobileApp_LoginWithCachePermissions`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `LoginRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Logado com sucesso | `UserModel` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por realizar o login. */
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         
         "AppManager": false, /* (Campo obrigatório) App gerencial. true - Utilizar o app gerencial, false - Não utilizar o app gerencial. */
         "Companies": [0], /* (Campo obrigatório) Lista de id de empresas. */
         "CompanyId": 504311,  /* (Campo obrigatório) id de empresa. */
         "CompanyIdApiFace": 0, /* (Campo obrigatório) id de empresa. */
         "Email": "filial@br.com", /* (Campo obrigatório) E-mail do usuário. */
         "IsBiometria": false, /* (Campo obrigatório) Login biométrico. true - O login é biométrico, false - O login não é biométrico */
         "Mode": 0, /* (Campo obrigatório) Modo de login. 0 - EmailPassword, 1 - Pis, 2 - Matricula, 3 - Cpf, 4 - Azure */
         "Password": "1", /* (Campo obrigatório) Password do login/usuário. */
         "PasswordAlreadyHashed": false, /* (Campo obrigatório) Passoword criptografado. false - Senha não criptografada, true - Senha criptografada */
         "SkipGetOfflineUsers": false, /* (Campo obrigatório) Permite o login de usuários offline. false - não permite, true - permite */
         "StructPersonId": 0, /* (Campo obrigatório) Id de estrutura organizacional. */
         "Structures": [0], /* (Campo obrigatório) Lista de id de estrutura organizacional. */
         "UserThatDidSync": /* (Campo obrigatório) E-mail do usuário. */
     }
````

##### `POST /RestServiceApi/MobileApp/ManageFCMToken`

- `operationId`: `MobileApp_ManageFCMToken`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ManageFCMTokenRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/Mark`

- `operationId`: `MobileApp_Mark`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `MarkRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `MarkResponseModel` |

##### `POST /RestServiceApi/MobileApp/Messages`

- `operationId`: `MobileApp_Messages`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `MessagesRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `MessagesModel` |

##### `POST /RestServiceApi/MobileApp/NewDelayRequest`

- `operationId`: `MobileApp_NewDelayRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `NewDelayRequestRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/NewExtraRequest`

- `operationId`: `MobileApp_NewExtraRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `NewExtraRequestRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/NewHolidayRequest`

- `operationId`: `MobileApp_NewHolidayRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `NewHolidayRequestRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/NewMarkRequest`

- `operationId`: `MobileApp_NewMarkRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `NewMarkRequestRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/NewMarkRequestWithStringDate`

- `operationId`: `MobileApp_NewMarkRequestWithStringDate`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `NewMarkRequestRequestModelExtension` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/NewPreJustificationRequest`

- `operationId`: `MobileApp_NewPreJustificationRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `NewPreJustificationRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/NewSmartTag`

- `operationId`: `MobileApp_NewSmartTag`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `NewSmartTagRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/Notifications`

- `operationId`: `MobileApp_Notifications`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `NotificationsRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `NotificationsModel` |

##### `POST /RestServiceApi/MobileApp/Pair`

- `operationId`: `MobileApp_Pair`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `PairRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `PairResponseModel` |

##### `POST /RestServiceApi/MobileApp/PersonFaceSearch`

- `operationId`: `MobileApp_PersonFaceSearch`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `PersonFaceSearchRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `PersonFaceSearchResponseModel` |

##### `POST /RestServiceApi/MobileApp/PlannedAbsence`

- `operationId`: `MobileApp_PlannedAbsence`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `PlannedAbsenceRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `PlannedAbsenceModel` |

##### `POST /RestServiceApi/MobileApp/ProcessDelayRequest`

- `operationId`: `MobileApp_ProcessDelayRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ProcessDelayRequest` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/ProcessExtraRequest`

- `operationId`: `MobileApp_ProcessExtraRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ProcessExtraRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/ProcessHolidayRequest`

- `operationId`: `MobileApp_ProcessHolidayRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ProcessHolidayRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/ProcessMarkRequest`

- `operationId`: `MobileApp_ProcessMarkRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ProcessMarkRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/ProcessPreJustificationRequest`

- `operationId`: `MobileApp_ProcessPreJustificationRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ProcessPreJustificationRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `GET /RestServiceApi/MobileApp/ProjectsOfPerson`

- `operationId`: `MobileApp_ProjectsOfPerson`
- Consome: ``
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `login` | query | sim | `string` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `array<ProjectModel>` |

##### `POST /RestServiceApi/MobileApp/Recover`

- `operationId`: `MobileApp_Recover`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `RecoverRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `boolean` |

##### `POST /RestServiceApi/MobileApp/Replacements`

- `operationId`: `MobileApp_Replacements`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `ReplacementsRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `ReplacementModel` |

##### `POST /RestServiceApi/MobileApp/Requests`

- `operationId`: `MobileApp_Requests`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `RequestsRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `RequestsModel` |

#### Grupo: MobileAppAuth

##### `POST /RestServiceApi/MobileAppAuth/Authenticate`

- `operationId`: `MobileAppAuth_Authenticate`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `AuthenticateRequestModel` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `AuthenticateResponseModel` |

#### Grupo: OrganizationalStructure

##### `POST /RestServiceApi/OrganizationalStructure/ChangeOrganizationalStructure`

Método responsável por alterar a estrutura organizacional da empresa.

- `operationId`: `OrganizationalStructure_ChangeOrganizationalStructure`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por alterar a estrutura organizacional da empresa. */

     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
        // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão alterados.
        
        "Id" : "9999", /* (Campo obrigatório) Id da estrutura organizacional*/
        "Codigo" : "9999", /* (Campo obrigatório) Código da estrutura organizacional*/
        "Descricao": 18261, /* (Campo obrigatório) Descrição da estrutura */
        // "EstruturaPai": 18261, /* (Campo opcional) Id da estrutura pai que está sendo gravada, caso não for informada a estrutura será apenas filha da estrutura principal do sistema. */
        // "DescricaoEstruturaPai": "Estrutura de teste pai 9998", /* (Campo opcional) Descrição da estrutura pai que está sendo gravada */
        // "Extra1": "Informação extra 1", /* (Campo opcional) Informação adicional 1 referente a estrutura que está sendo gravada. */
        // "Extra2": "Informação extra 2", /* (Campo opcional) Informação adicional 2 referente a estrutura que está sendo gravada */
     }
````

##### `POST /RestServiceApi/OrganizationalStructure/DeleteOrganizationalStructure`

Método responsável por excluir a estrutura organizacional da empresa.

- `operationId`: `OrganizationalStructure_DeleteOrganizationalStructure`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Excluído com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por excluir a estrutura organizacional da empresa. */

     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
        // !!! ALERTA !!! - Cuidado antes de executar este método, o dado será excluído.
        
        "Id" : "9999", /* (Campo obrigatório) Id da estrutura organizacional*/
     }
````

##### `POST /RestServiceApi/OrganizationalStructure/GetOrganizationalStructure`

Método responsável por retornar as estruturas matrizes e filiais da empresa consultada.

- `operationId`: `OrganizationalStructure_GetOrganizationalStructure`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar as estruturas matrizes e filiais da empresa consultada. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Informar apenas um dos parâmetros identificadores ou não informar nenhum para retornar todas as estruturas da empresa.
        
        // "Id": 3695 /* (Campo opcional) Filtro de id da estrutura organizacional*/
        // "Code": 11261 /* (Campo opcional) Filtro de código da estrutura organizacional */
        // "Description": "Garagem" /* (Campo opcional) Filtro de descrição da estrutura */
        // "Modify": false /* (Campo opcional) Retornar as estruturas que foram alteradas dependendo do parâmetro informado. Valor padrão é false. false = Não retorna os alterados, true = Retorna somente os alterados  */
        // "Exclude": false /* (Campo opcional) Retornar as estruturas que foram excluídas dependendo do parâmetro informado. Valor padrão é false. false = Não retorna os excluídos, true = Retorna somente os excluídos  */
     }
````

##### `POST /RestServiceApi/OrganizationalStructure/SaveOrganizationalStructure`

Método responsável por salvar a estrutura organizacional na empresa.

- `operationId`: `OrganizationalStructure_SaveOrganizationalStructure`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por salvar a estrutura organizacional da empresa. */
            
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e Value são obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e Value são obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
        
        "Codigo" : "9999", /* (Campo obrigatório) Código da estrutura organizacional*/
        "Descricao" : "Estrutura de teste 9999", /* (Campo obrigatório) Descrição da estrutura */
        // "EstruturaPai": 9998, /* (Campo opcional) Id da estrutura pai que está sendo gravada, caso não for informada a estrutura será apenas filha da estrutura principal do sistema. */
        // "DescricaoEstruturaPai": "Estrutura de teste pai 9998", /* (Campo opcional) Descrição da estrutura pai que está sendo gravada */
        // "Extra1": "Informação extra 1", /* (Campo opcional) Informação adicional 1 referente a estrutura que está sendo gravada. */
        // "Extra2": "Informação extra 2", /* (Campo opcional) Informação adicional 2 referente a estrutura que está sendo gravada */
     }
````

##### `POST /RestServiceApi/OrganizationalStructure/SearchOrganizationalStructure`

Método responsável por retornar as estruturas matrizes e filiais da empresa consultada.

- `operationId`: `OrganizationalStructure_SearchOrganizationalStructure`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por retornar as estruturas matrizes e filiais da empresa consultada. */

     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        // Informar apenas um parâmetro ou não informar nenhuma para retornar todas as estruturas da empresa.
        
        // "Id": 3695 /* (Campo opcional) Filtro de id da estrutura organizacional*/
        // "Codigo": 11261 /* (Campo opcional) Filtro de código da estrutura organizacional */
        // "Descricao": "Garagem" /* (Campo opcional) Filtro de descrição da estrutura */
        // "Modificado": false /* (Campo opcional) Retornar as estruturas que foram alteradas dependendo do parâmetro informado. Valor padrão é false. false = Não retorna os alterados, true = Retorna somente os alterados  */
        // "Excluido": false /* (Campo opcional) Retornar as estruturas que foram excluídas dependendo do parâmetro informado. Valor padrão é false. false = Não retorna os excluídos, true = Retorna somente os excluídos  */
     }
````

#### Grupo: People

##### `POST /RestServiceApi/People/AssosciateWorks`

Modelo que representa os dados necessários para associar obras a pessoas.

- `operationId`: `People_AssosciateWorks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Obras associadas com sucesso. | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
            
    /* Post */
    {
        "IdsPessoa": [1, 2, 3], /* (Opcional) Lista de IDs das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "CrachasPessoa": [123456789, 987654321], /* (Opcional) Lista de crachás das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "MatriculasPessoa": [1001, 1002], /* (Opcional) Lista de matrículas das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "PisPessoa": ["12345678901"], /* (Opcional) Lista de PIS das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "CpfsPessoa": ["11122233344"], /* (Opcional) Lista de CPFs das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "NifsPessoa": ["NIF123456"], /* (Opcional) Lista de NIFs das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "CodigosObras": [2501, 2502] /* (Obrigatório) Lista de códigos das obras a serem associadas. Este parâmetro deve conter pelo menos um código de obra. */
    }
````

##### `POST /RestServiceApi/People/AssosciateWorks2`

Modelo que representa os dados necessários para associar obras a pessoas.

- `operationId`: `People_AssosciateWorks2`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Obras associadas com sucesso. | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
            
    /* Post */
    {
        "IdsPessoa": [1, 2, 3], /* (Opcional) Lista de IDs das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "CrachasPessoa": [123456789, 987654321], /* (Opcional) Lista de crachás das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "MatriculasPessoa": [1001, 1002], /* (Opcional) Lista de matrículas das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "PisPessoa": ["12345678901"], /* (Opcional) Lista de PIS das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "CpfsPessoa": ["11122233344"], /* (Opcional) Lista de CPFs das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "NifsPessoa": ["NIF123456"], /* (Opcional) Lista de NIFs das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "CodigosObras": [2501, 2502] /* (Obrigatório) Lista de códigos das obras a serem associadas. Este parâmetro deve conter pelo menos um código de obra. */
    }
````

##### `POST /RestServiceApi/People/ChangePerson`

Método responsável por alterar o funcionário.

- `operationId`: `People_ChangePerson`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:

    /* Este método é responsável por alterar o funcionário. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* Post */      
    {
        // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
        // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.         

        "Id": 51157, /* (Campo obrigatório) Id do funcionário. */
        "Matricula": 1005, /* (Campo obrigatório) Matrícula do funcionário. */
        "Cracha": 1005, /* (Campo obrigatório) crachá do funcionário. */
        "Nome": "Novo Funcionário", /* (Campo obrigatório) Nome do funcionário. */
        "DataNascimento": "23-09-1979 00:00:00", /* (Campo opcional) Data de nascimento do funcionário. */
        "Endereco": null, /* (Campo opcional) Endereço do funcionário. */
        "DataAdmissao": "01-01-1753 00:00:00", /* (Campo opcional) Data de admissão do funcionário. */
        "DataDemissao": "01-01-1753 00:00:00", /* (Campo opcional) Data de demissão do funcionário. */
        "Rg": "0000000000000", /* (Campo opcional) RG do funcionário. */
        "Cpf": "649.482.730-66", /* (Campo obrigatório) CPF do funcionário. */
        "Telefone": null, /* (Campo opcional) Telefone de contato do funcionário. */
        "TelefoneCelular": null, /* (Campo opcional) Telefone celular do funcionário. */
        "Email": "claudio.francisco@csgd.com.br", /* (Campo opcional) Email celular do funcionário. */
        "ControlaPonto": true, /* (Campo opcional) Controla ponto. Valor padrão é false caso não seja informado. false = Não controla ponto, true = Controla ponto */
        "DataControlaPonto": "01-01-1753 00:00:00", /* (Campo opcional) Data do ínicio do controle ponto. Se caso o valor "ControlaPonto" for true deve-se informar a data que iniciou o controle de ponto. Valor padrão "01/01/1753 00:00:00" */
        "EhResponsavel": false, /* (Campo opcional) Informa se a pessoa é responsávle pela estrutura organizacional. Valor padrão é false. false = Não é reponsável pela estrutura organizacional, true = É reponsável pela estrutura organizacional */
        "BaseHoras": 220.00, /* (Campo obrigatório) Base de horas do funcionário. */
        "ValorHora": 35.9, /* (Campo opcional) Valor da hora do funcionário. */
        "CodCrachaProv": 0, /* (Campo opcional) Código do crachá provisório do funcionário. */
        "DataInicioCrachaProv": "01/01/1753 00:00:00", /* (Campo opcional) Data de ínicio do crachá provisório do funcionário. */
        "DataFimCrachaProv": "31/08/2020 00:00:00", (Campo opcional) Data de fim do crachá provisório do funcionário. */
        "Estrutura": /*(Campo obrigatório) Estrutura Organizacional do funcionário. */
        { 
            "Id": 1, /*(Campo obrigatório) Id da Estrutura Organizacional. */
            "Codigo": 0, /* (Campo opcional) Codigo da Estrutura Organizacional. */
            "CentroCusto": null, /* (Campo opcional) Centro de custo da Estrutura Organizacional. */
            "Descricao": null, /* (Campo opcional) Descrição da Estrutura Organizacional. */
            "DescricaoEstruturaPai": null, /* (Campo opcional) Descrição da Estrutura Pai da Estrutura Organizacional. */
            "Extra1": null, /* (Campo opcional) Extra 1 da Estrutura Organizacional. */
            "Extra2": null /* (Campo opcional) Extra 2 da Estrutura Organizacional. */
        },
        "TipoFuncionario": /* (Campo obrigatório) Tipo de funcionário. */
        { 
            "IdTipoFuncionario": 1,  /* (Campo obrigatório) Id do tipo de funcionário. 1 = Funcionario Normal, 2 = Funcionario Cooperado, 3 = FuncionarioEstagiario, 4 = Funcionario Terceiro */
            "CarteiraTrabalho": null,  /* (Campo opcional) Carteira de trabalho do funcionário. */
            "InformacaoInstituicao": null, /* (Campo opcional) Informação da instituição. */
            "CnpjEmpresa": null, /* (Campo opcional) Cnpj da empresa. */
            "EnderecoEmpresa": null (Campo opcional) Endereço da empresa. */
        },
        "TipoSalario": /* (Campo obrigatório) Tipo de salário do funcionário */
        { 
            "Id": 101, /* (Campo obrigatório) Id do tipo de salário do funcionário. 101 = Mensalista, 102 = Horista */
            "Nome": null
        },
        "TipoSalarioExportacao": null, /* (Campo opcional) Tipo de salário de exportação. */
        "Horarios": /* Lista de Horários do funcionário */
        [
            {
                "Id": 180590, /* (Campo obrigatório) Id do Horário Pessoa */
                "Horario": /* Horário do funcionário */
                { 
                    "Id": 13379 /* (Campo obrigatório) Id do Horário */
                },
                "Inicio": "01/08/2018 00:00:00", /* (Campo obrigatório) Inicio do horario do funcionário */
                "Fim": "18/12/2022 23:59:59" /* (Campo obrigatório) Fim do horario do funcionário */
            },
            {
                "Id": 180938, /* (Campo obrigatório) Id do Horário Pessoa */
                "Horario": /* Horário do funcionário */
                {
                    "Id": 8206 /* (Campo obrigatório) Id do Horário */
                },
                "Inicio": "19/12/2022 00:00:00", /* (Campo obrigatório) Inicio do horario do funcionário */
                "Fim": "31/12/9999 23:59:59" /* (Campo obrigatório) Fim do horario do funcionário */
            }
        ],
        "ReceberLembreteMarcacaoPonto":false, /* (Campo Opcional) Recebe Lembrete de Marcação de Ponto no Mobile por push. Envia = true, Não envia = false */
        "ReceberLembretesPontoPorEmail":false, /* (Campo Opcional) Recebe Lembrete de Marcação de Ponto no Mobile por email. Envia = true, Não envia = false */
        "RegrasCalculo": /* Lista de Regra de cálculo do funcionário */
        [ 
            {
                "Id": 120792, 
                "Regra": /* Regra de cálculo do funcionário */
                {
                    "Id": 1874 /* (Campo obrigatório) Id da Regra de cálculo */
                },
                "Inicio": "01/08/2018 00:00:00", /* (Campo obrigatório) Inicio da regra de cálculo do funcionário */
                "Fim": "31/12/9999 23:59:59" /* (Campo obrigatório) Fim da regra de cálculo do funcionário */
            }
        ],
        "CodigoPis": "12033410643", /* (Campo obrigatório) Pis do funcionário */
        "CodigoPisNumerico": 12033410643, /* (Campo opcional) Pis Numérico do funcionário */
        "FlagGerarNumeroPISAutomatico": 0, /* Indica se funcionário possui PIS. Caso não possua, será gerado um número automaticamente, 
                                              baseado no CPF. 1 = SIM, 0 = NÃO. Opcional. Se não indicado, será considerado 0   */   
        "Sexo": 1, /* (Campo obrigatório) Sexo do funcionário. 1 = Masculino, 2 = Feminino  */
        "Foto": "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACqAIwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDYPDUMc012+anY4zWBoAp46Ui07tTQD16Uq5z1pF6U5MZ60wJRnHWnhS3zJgg9jxTS0caF3OFUZP0rgvEHjKW4uWtdJO2Hp5g5oEzt7i9sbJSbm72eqDBrGm8XaOkuwTk++2vN5vtFzlpZzI2eW9KgNo2M4J96Li5T1u01bT76QJBdZY9jxV0rlyoO3HXHevE8T27eZDKUYd/Su08L+MWZ0stQ5Y8K5NUhWO1YcZC4HpTOatMFIypyOxqPy6LEsgqJ89qssnFQ4Ctk0AVipJ5pfLqUkE07FADcfMaVTxUQkyxp6GszUmXindRUbcAU4N0poCYfdp0fOT3AxUJapoyB83ZeTTA4/wAca4wddMhYjaoZivHUVxEK7iF6EmrepTtdardSPy5cgfQE1c0LSH1GUlB/q25qZOyHGN2PsbITxybhgLirBjghiKnrXVf2EbZcAfeHNZ1/o6eUT/FXN7TU6vZaHJSojK2MVkyK8cu5eCOhFb9xpVwCCoO2s6a1kHBHNbRmZOmdf4J8QveQvp0x/eQcoT1auzY4ZdvII+b2rxy2afSr23vYwRtcb/cV6za3IuLeOZOUkUEn0NaqRhKJZbpUDDJqbtUR61RmQnrS7aCPmzTgeKAM1ZN7fLxU6ybTjFVYOG4q3gE81ijZknmbhSqSe9NCjtTkGKpEEoGal+7FL6eWc0iCkuMpZ3LekRobKmrrQ8mQGW9mJ5bzHAP4mvQ/B9oLK1DlQC/3j61w1ggN45Pdyf1r0aykUWkSr2rnrSOuhDQ2ZZN2QTn0rPltUlHSpt+Tk9hV2zgWVTxWMVdnQ3ZGJNp6+WAKxbnRoyScDNd5NYp5JPpXO3MWHIqpRaIi0zjL+yVYipUEAba3/Cc5bR/JJz5bnj2zxVfUYOCMdTmoPCkm28vISeOCK2pM5cRE6wyCozkml2c1IMAV1HIQninjGOlK+KQAYoAyIGw1XG6ZrNR/myK04SGj5rFGzFQ8VIMnkU0EZqUHjiqRKJFO3FF2wNhcIDyyEYpCM4phQfalB5VlqZM3ox5mebWiGK6cNw244/Ouz0yViiZrA1y1W31QOowpaugtI2WCMqOa5qmp1Q91tGxHIQSCOtbVgwEfCmufWRY+ZmAFbFgWkX926lfrVU0FQvu/ysp71gXmRI2RxWvOrRsDnPFUJImmya0mZwepzmokeWWxjAxWP4aAOuzkH5SoyK3dZRLa2eSVwFAyBmsDwYyXep3U8Z4HGKVOJFeR25GBxTduRnvUuM8Uxhiuo4SIoSaUIcU+k30Ac3GMCtG2btVBBxVqBsEVijZl/aOtSDpTF5WpBVIQ7rQziJldlB7CgUHH3W5JHy05JWNKU+V6GN4sso5be3nj4O9c/mK1HiItgYQvyjjms/VCLjTvs7nbIrgj6ZrRtCJrVStcktGda1V0c1qCTzuTcTvEoPITmsyDxFqFlNKdNaS5t4vvFuP5V197p0ZcSEbgRtYexqjaQ2+lLNb6dbBvOPzGuiKjYzfNcbpfjp9RdYrm3MZI6gGtHU/Ea6bYblUvM/3Vx1qOPS7eJ43ktwp71W1W3jGqQlEztGVH4UnYFF3OMluNV8RS3E10Gt4YTjyx0PfvWp4MUwalMsSkREDPFa0sdzebsp5bZ+cetR6OGg8SPHjanljj8KqDRjWizrVYE5NKwBOagJNPDcVqcwrAYqLYPWnk0lAHPpwMVKnBzUEbU/fg1ijZmnDICMVZxx1rJhc7s1pROJFx3qkQSjPbmpI03OWb5Qv8Z6Cmp8p21zHjzW5dM09La1P76RdzYqkTezOg8iz1aK7mglV/swG51PBJ7fhUekzlFKMQMdBjrWp4E8LTwfDV45iReXJaYk9wTuFc4N8cyxnKyRnaRWVaFmjsoT0OqREZRuXJPagpErFREOOdwFZNpqeU3v1JwKmW+OXU9xUo3bQTTmWcqMFQcDFZ+vRFbq2kPQelSwSpHN8x6nNSeITHJZo6sMgcUNBFohIhCMzsFx0Nc1osrX3ie5uVBMUYCj36im3t3KmlTTSsR8uxfetLwzZHT9LjcjLyksT9eaqCOetJHQBhjrRweQaZs+WmjKmtzjJuadsNReYamEnFAHLjIqVRuFN6DGKnhhZ8cVikatiIrhsVp2sR5J6jmiG2AUE1bVFJUAfMDkVokTcI2GGkPGwZOa8p8S6gL/XLi4UlolJCA+leg+J9Wh07TpYt4+1yjAA9K8nLgBmznZ+tXFEM+nfA2sQ674Vs5UIUxr5RA7bRjmuY8baT/Z+ofboU/dSnOVHQ1yHwh1/7Brcmk3EmIbpQyZPQ9TXtd9Yw6jZy2MwBSQfIT2qpw5kOM3FnkaKjPtJA6bfqaF81J5EfG4DjBqbVdLk0+7a1lBypyh9ajcM8CyKNsqda49Uz0IcskPeFDahyku/thKz9V86NIlckKwzg9a14dbnt41R03FvunPSue1SW4vL9pJ5CVUHAq9xuKijMuN2ratb6dFzBER5n1ruI0VFWIKQqKAOK4Twhq9hHfXDXOEmZ+GNegGRlCuHEqtyOa0ijhqO7FReMGkIGakL4XOKbuHWqMiNhxSbwOKc8gqAsM0AUlgz1FWYyqDFVy3zdeKXzC7BFH41mkaNmgjF32Ac+lU9d1uHQrIng3Mgwid8etUdR8RwaTblFw9yR8uP4frXnuoahPfztNcPuYn8B9K1SJI77UJr28ae4kLN/DVDJLDjAByRSSt8wozzVpCZasb6XT7+G+jJEkbgjHYZ5/SvqbQ9Wj1vRLLUYWBE6Bjj+Gvk/OTzXrXwc8THz7jw/cPjzDut8/gMVpFqxDPTvEWijVbNxGB9pi+ZWx1xziuBh+YvFMNsynDL3r1YZJwc/JwfeuB+Iz6botgt8p2XcrYCZ69+lY1KfU0o1GnqYFzZbAwDfKeh96xtSkhs9PnkZDuVfvZrPXxvbz3EaAHzpGCqD0/KuX8V6hqMt9JaXeYwuGwoxuB6VkoHVOsmjDZnMobJB6kjit3RvFV/plwu+QvHkDB7CsDPbNNPIreKsjjbue/Wl3DqFgs1uweMjIYelSFRgc1wfw31GSaCWxdv9XyB7V3h54/KpsBGY8ml8ingGnc0WAxgoaQ/3R1NYOs+IVtd1va4aQ8bvSma/4gSAtYWb/P0Zx3rj2kBLHPJPzH1qVEdyWWYncZnLs38Z5NUpHGMDtSu1QOea0QDJDlhTieKY1KCMAVQXHDOKsWOoz6VqFvfWzFZoCGXHeqxOFqNWywPoKXUR9Z+Fddh8RaDb38TKW24cZ5BHrXiXxM1pte8Tz2rAoLT5FUjAJB60fCXxQ+mX8mku21LjLDnuOn866rxn4PTVhNfWi7b6NdzkDkj0q3qhM8QnBgm8xVCsp3K3oRXU+NF+26bpepoMloVSQ+pC/wD16w7+23xmMjLrkGupt4G1b4Ts68zWc75HoOAKhLoLU8/6cU6m8DgUZoZSdjrPh7cGHxI654kh2498164VwQPSvEfCc/2fxXYHtI4WvbA287vSpAXIFG6o5KQHigDwsSM74Zs+rVJuAXg1Tyc8VOpwlCQDmamZzTWbmm5yauwCtUbkrzTs/NQw38UACy5FMYnovel2iOmCkBctLt7S+truNtrQSKx+gINfSmn6kmp6TbatFjbLHvkHrkdK+YhkjA717B8J9ZF3od9o0jfPbgyrk9jgVfQlnnLyh9XuFP3GZiv511Pw3cXUmvaKeY5YAyj3yT/SuXvoAdQLDgiQnj61peEtSj0bx3bTMcJP8jc8cg/41F9QOSvLdrS8mt26xsQagrpvH9j/AGd4y1CID5ZX3L+QrmhwW9gKGwLuky+RrWmyf3JQa96jH7tD/eUH9K+eo22XUMvo+6voaz5s7d/WNf5VJQrp8tRbatEn0pn4UAeBRx7RzUbk7uOlWHqu3WqQDKcKb3p1UAwn5qdzjimN96pF6UgImz3op0vWm0uoCq20/pXReCtW/sfxTazbsRTN5Mv+7gn+dc4Oo+tS23/H5H/10q+hLOiuMDUbnPRZP0PNYmoy+VqEcq8MjKy/nWzdf8f999U/9BrC1b/j6h/3f6Vl1A6v4hMNQGj6uP8Al6ti5P8AwLH9K4c9/wDartPEv/IkeFv+vE/+htXF90okAu4KMnsMV77o919p0ezlXp5YH6V8/S/6l/rXunhH/kWbX6UFG3uNJk0tLQB//9k=", /* (Campo opcional) Foto do funcionário */
        "MiniFoto": "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAsACwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDYBBP0NTpgc5rNtyWQHceetWJgwsLjbkuYmCj1ODisE+ppZvRHN3PivUtRuZI9HURQJwJWj3M3vzkD8s1TtfF1/YXgj1NhdW+cMyxhXT3wAM/TFb/hPyotIWJEAMhy5I6np/StTWtFsjErLGjHnnHSsvayu7LQ6PYKyvuSDy5YRJE4dHAZWU5BBGQRVfylJPy96q6AD/ZYiydsUjoPpnP9cVo7DngV0J3Vzjas7GXYsF+Vjwa1MhELMyoqjJZiAq+5J4xWVa2jMwDNt9PWsLxh4gt0t/7KtZBK+4eecZXA52+/OM/T8pjG5pzWd0dHHphuLOW3gmNrIJHcbWKkBmLD8s/pTrtNQjsWibU5mYuIzISu5AQeN20eg5xmtiXZ4s0C28UacAs0kYF5CgPyuvDY78Y/EYP15XxDfNY6PI+GUqQWcyAq3p8vrkjvUOm4vlOqNSMlzdi94fCW9hJDG5eNZ3AYtnPPzc/724VqEbjnFZHh7VNL1Kw2ac7EQqqsknDjjqfr61pkNn5VOK2SaRxNps811bxY1zvisXaODoX5DP8A4D/J9K5WSX5txPFMcbAACeRzTO+PatErIVzvfhp4ym8P602nmQC0vyIwSMiOY8I/54B9sZ6Vlazp14tzrdhdT/abi2/0gSsxY5VhuC55AKybiP8AY9q5POAT1rqxfT3mvWVxOQ0t48UU7Y++ssQV/wAwzfnVPYkZ8PLoxeKki6ieF4z+A3Z/8dr1okqcba8W8GytF4w04rgnzCvPoVIP869u3E1Az//Z", /* (Campo opcional) Mini foto do funcionário */
        "PessoaStatus": 102, /* (Campo obrigatório) Status do funcionário. 101 = Presente, 102 = Ausente, 103 = Folga, 104 = Compensando, 105 = Férias, 106 = Afastamento, 108 = Desligamento, 109 = Sobreaviso */
        "AmbienteTrabalhoPessoa": [ /* (Campo opcional) Lista de ambiente de trabalho do funcionário */
            {
                /* As informações abaixo só serão obrigatórias caso informe o AmbienteTrabalhoPessoa */
                    
                "Id": 64755, /* (Campo obrigatório) Id do ambiente de trabalho */
                "Inicio": "01/08/2018 00:00:00", /* (Campo obrigatório) Data de ínicio do ambiente de trabalho */
                "Fim": "21/12/9998 23:59:59", /* (Campo obrigatório) Data fim do ambiente de trabalho */
                "TipoAmbienteTrabalho": 4 /* (Campo obrigatório) Tipo do ambiente de trabalho. 1 = Penoso, 2 = Insalubre, 3 = Periculosidade, 4 = Normal */
            }
        ],    
        "HorariosAlternativos": null, /* (Campo opcional) Lista de horários alternativos do funcionário */
        "Grupo": /* (Campo opcional) /* (Campo opcional) Grupo do funcionário */
        {
            "Codigo": 5 /* (Campo opcional) Código do funcionário */
        },
        "LocalizacaoAlternativaGPS": /* (Campo opcional) Localização alternativa do GPS do funcionário */
        [
            {
                /* As informações abaixo só serão obrigatórias caso informe o LocalizacaoAlternativaGPS */            

                "IdLocalizacaoAlternativaGPS": 21, /* (Campo obrigatório) Id da localização alternativa do GPS */
                "Nome": "teste", /* (Campo obrigatório) Descrição da localização alternativa do GPS */
                "DataInicio": "20/09/2022 00:00:00", /* (Campo obrigatório) Data de ínicio da localização alternativa do GPS */
                "DateFim": "20/09/2022 23:59:00", /* (Campo obrigatório) Data fim da localização alternativa do GPS */
                "Latitude": "-23.4840293", /* (Campo obrigatório) Latitude da localização alternativa do GPS */
                "Longitude": "-46.8066402", /* (Campo obrigatório) Longitude da localização alternativa do GPS */
                "UltimaAlteracao": "2022-09-20T14:25:03.8" /* (Campo obrigatório) Informa a data e hora atual */
            }
        ],
        "Cargo": /* (Campo opcional) Cargo do funcionário */
        {
            /* As informações abaixo só serão obrigatórias caso informe o LocalizacaoAlternativaGPS */
        
            "Id": 3399, /* (Campo obrigatório) Id do cargo */
            "Codigo": 5, /* (Campo obrigatório) código do cargo */
            "Descricao": "Reserva", /* (Campo obrigatório) Descrição do cargo */
            "Extra1": null, /* (Campo obrigatório) Informação extra 1 do cargo */
            "Extra2": null /* (Campo obrigatório) Informação extra 2 do cargo */
        },
        "CpfResponsavel": "18759236752" /* (Campo opcional) CPF do responsável */
    }
````

##### `POST /RestServiceApi/People/DeletePerson`

Método para deletar o funcionário

- `operationId`: `People_DeletePerson`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna os funcionários do sistema | `object` |

Descrição e exemplo da especificação:

````text
Exemplo:

    /* Este método é responsável por deletar o funcionário. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* Post */      
    {
       "Id":151 /* (Campo obrigatório) Id do Funcionário */ 
       ,"CpfResponsavel": "" /* (Campo opcional) Cpf do responsável pela exclusão */ 
    }
````

##### `POST /RestServiceApi/People/DesassociateWorks`

Modelo que representa os dados necessários para desassociar obras a pessoas.

- `operationId`: `People_DesassociateWorks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Obras associadas com sucesso. | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
            
    /* Post */
    {
        "IdsPessoa": [1, 2, 3], /* (Opcional) Lista de IDs das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "CrachasPessoa": [123456789, 987654321], /* (Opcional) Lista de crachás das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "MatriculasPessoa": [1001, 1002], /* (Opcional) Lista de matrículas das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "PisPessoa": ["12345678901"], /* (Opcional) Lista de PIS das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "CpfsPessoa": ["11122233344"], /* (Opcional) Lista de CPFs das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "NifsPessoa": ["NIF123456"], /* (Opcional) Lista de NIFs das pessoas a serem associadas. Pelo menos um dos outros parâmetros deve ser informado. */
        "CodigosObras": [2501, 2502] /* (Obrigatório) Lista de códigos das obras a serem associadas. Este parâmetro deve conter pelo menos um código de obra. */
    }
````

##### `POST /RestServiceApi/People/RetornarMensagemExcecao`

- `operationId`: `People_RetornarMensagemExcecao`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `ex` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `string` |

##### `POST /RestServiceApi/People/SavePerson`

Método responsável por incluir o funcionário.

- `operationId`: `People_SavePerson`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:

     /* Este método é responsável por incluir o funcionário. */
     Formato de Data: dd-mm-aaaa
            
     dd: Dois dígitos para o dia(01 a 31)
     mm: Dois dígitos para o mês(01 a 12)
     aaaa: Quatro dígitos para o ano
     Exemplo:
     A data 10 de maio de 2024 deve ser escrita como "10-05-2024".
     Nota:
     Utilize o hífen "-" como separador entre o dia, mês e ano.
     Certifique-se de usar dois dígitos para o dia e o mês, e quatro dígitos para o ano.

     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */      
     {
        "Matricula": 01, /* (Campo obrigatório) Matricula do funcionário. */
        "Cracha": 01, /* (Campo obrigatório) Cracha do funcionário. */
        "Nome": "Novo Funcionário", /* (Campo obrigatório) Nome do funcionário. */
        "Cpf":"18759236752",  /* (Campo obrigatório portaria 671) CPF do funcionário. */
        "CpfResponsavel": "10371429340", /* (Campo obrigatório portaria 671) Cpf do usuário responsável. */
        "DataAdmissao": "10-05-2024", /*(Campo obrigatório) Data de admissão do funcionário. */
        "DataNascimento": "20-07-1980",
        "BaseHoras": 168.0, /*(Campo obrigatório) Base de horas do funcionário. */
        "Extra1":"a",
        "Extra2":"b",
        "Extra3":"c",
        "Extra4":"d",
        "Extra5":"e",    
        "Extra6":"f",
        "Extra7":"g",
        "Extra8":"h",
        "Extra9":"i",
        "Extra10":"j",   
        "CampoAlternativo1":"campo1",
        "CampoAlternativo2":"campo2",
        "CampoAlternativo3":"campo3",
        "Estrutura": /*(Campo obrigatório) Estrutura Organizacional do funcionário. */
        { 
            "Id": 1, /*(Campo obrigatório) Id da Estrutura Organizacional. */
            "Codigo": 0, /* Codigo da Estrutura Organizacional. */
            "CentroCusto": null, /* Centro de custo da Estrutura Organizacional. */
            "Descricao": null, /* Descrição da Estrutura Organizacional. */
            "DescricaoEstruturaPai": null, /* Descrição da Estrutura Pai da Estrutura Organizacional. */
            "Extra1": null, /* Extra 1 da Estrutura Organizacional. */
            "Extra2": null /* Extra 2 da Estrutura Organizacional. */
        },
        "TipoFuncionario": /* (Campo obrigatório) Tipo de funcionário. */
        { 
            "IdTipoFuncionario": 1,  /* (Campo obrigatório) Id do tipo de funcionário. 1 = Funcionario Normal, 2 = Funcionario Cooperado, 3 = FuncionarioEstagiario, 4 = Funcionario Terceiro */
            "CarteiraTrabalho": null  /* Carteira de trabalho do funcionário. */
        },
        "TipoSalario": /* (Campo obrigatório) Tipo de salário do funcionário */
        { 
            "Id": 101 /* (Campo obrigatório) Id do tipo de salário do funcionário. 101 = Mensalista, 102 = Horista */
        },
        "Horarios": /* Lista de Horários do funcionário */
        [
            {
                "Id": 0, /* (Campo obrigatório) Id do horário pessoa. Informar sempre 0. */
                "Horario": 
                { /* Horário do funcionário */
                    "Id": 1 /* (Campo obrigatório) Id do Horário */
                },
                "Inicio": "0001-01-01T00:00:00", /* Inicio do horario do funcionário */
                "Fim": "0001-01-01T00:00:00" /* Fim do horario do funcionário */
            }
        ],
        "MaisDeUmVinculoEmpregaticio":false, /* (Campo obrigatório) Multiplos vinculos do funcionário */
        "ReceberLembreteMarcacaoPonto":false, /* (Campo Opcional) Recebe Lembrete de Marcação de Ponto no Mobile por push. Envia = true, Não envia = false */
        "ReceberLembretesPontoPorEmail":false, /* (Campo Opcional) Recebe Lembrete de Marcação de Ponto no Mobile por email. Envia = true, Não envia = false */
        "RegrasCalculo": /* Lista de Regra de cálculo do funcionário */
        [ 
            {
                "Id": 0, /* (Campo obrigatório) Id da regra de cálculo da pessoa. Informar sempre 0. */
                "Regra": 
                {   /* Regra de cálculo do funcionário */
                    "Id": 1 /* (Campo obrigatório) Id da Regra de cálculo */
                },
                "Inicio": "0001-01-01T00:00:00", /* Inicio da regra de cálculo do funcionário */
                "Fim": "0001-01-01T00:00:00" /* Fim da regra de cálculo do funcionário */
            }
        ],
        "CodigoPis": "120.4079.283-1", /* (Campo obrigatório) Pis do funcionário */
        "CodigoPisNumerico": 0, /* Pis Numérico do funcionário */
        "FlagGerarNumeroPISAutomatico": 0, /* Indica se funcionário possui PIS. Caso não possua, será gerado um número automaticamente, 
                                              baseado no CPF. 1 = SIM, 0 = NÃO. Opcional. Se não indicado, será considerado 0   */         
        "Sexo": 1, /* (Campo obrigatório) Sexo do funcionário. 1 = Masculino, 2 = Feminino  */
        "AmbienteTrabalhoPessoa": 
        [
            {
                "Inicio": "0001-01-01T00:00:00",
                "Fim": "0001-01-01T00:00:00",
                "TipoAmbienteTrabalho": 6
            }
        ]
     }
````

##### `POST /RestServiceApi/People/SearchPeople`

Método para buscar os funcionários

- `operationId`: `People_SearchPeople`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna os funcionários do sistema | `array<SearchPersonExample>` |

Descrição e exemplo da especificação:

````text
Exemplo:
            
    /* Este método é responsável por buscar o funcionário o funcionário. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* Post */      
    {
       // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.        

       "Matricula": 1 /* Matricula do Funcionário */ 
       // "Cracha": 1 /* Crachá do Funcionário */ 
       // "Modificado": "true" /* Funcionário modificado ou atualizado */ 
       // "Excluido": "false" /* (Campo opcional) Retornar os funcionários que foram excluídos. Valor padrão é false. false = Não retorna os excluídos, true = Retorna somente os excluídos  */
       // "Id": 151 /* Id do Funcionário */ 
       // "CodigoPis": 111111116 /* Pis do Funcionário */ 
       // "CPF": 123.123.123-12 ou 12312312312 /* CPF do Funcionário */ 
       // "IdEstruturaOrganizacional": 1 /* Id da Estrutura Organizacional */
       // "Extra1" : "Extra 1" /* Campo Extra 1 */ 
       // "Extra2" : "Extra 2" /* Campo Extra 2 */ 
       // "Extra3" : "Extra 3" /* Campo Extra 3 */ 
       // "Extra4" : "Extra 4" /* Campo Extra 4 */ 
       // "Extra5" : "Extra 5" /* Campo Extra 5 */ 
       // "Extra6" : "Extra 6" /* Campo Extra 6 */ 
       // "Extra7" : "Extra 7" /* Campo Extra 7 */ 
       // "Extra8" : "Extra 8" /* Campo Extra 8 */ 
       // "Extra9" : "Extra 9" /* Campo Extra 9 */ 
       // "Extra10" : "Extra 10" /* Campo Extra 10 */
       // "Pagina":1 /* Página da consulta da Lista de Funcionários conforme a listagem dos Funcionários no menu Pessoa */ 
       // "CarregarBiometrias": "false"  (Campo opcional - valor default : false)
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": [
    {
      "Id": 151
    }
  ]
}
````

##### `POST /RestServiceApi/People/SearchPerson`

Método para buscar o funcionário

- `operationId`: `People_SearchPerson`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna os funcionários do sistema | `array<SearchPersonExample>` |

Descrição e exemplo da especificação:

````text
Exemplo:

    /* Este método é responsável por buscar o funcionário ativo e o funcionário desligado à 31 dias a partir da data de hoje. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* Post */      
    {
       // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.    

       "Matricula": 1 /* Matricula do Funcionário */ 
       // "Cracha": 1 /* Crachá do Funcionário */ 
       // "Modificado": "true" /* Funcionário modificado ou atualizado */ 
       // "Excluido": "false" /* (Campo opcional) Retornar os funcionários que foram excluídos. Valor padrão é false. false = Não retorna os excluídos, true = Retorna somente os excluídos  */
       // "Id": 151 /* Id do Funcionário */ 
       // "CodigoPis": 111111116 /* Pis do Funcionário */ 
       // "CPF": 123.123.123-12 ou 12312312312 /* CPF do Funcionário */ 
       // "IdEstruturaOrganizacional": 1 /* Id da Estrutura Organizacional */ 
       // "Extra1" : "Extra 1" /* Campo Extra 1 */ 
       // "Extra2" : "Extra 2" /* Campo Extra 2 */ 
       // "Extra3" : "Extra 3" /* Campo Extra 3 */ 
       // "Extra4" : "Extra 4" /* Campo Extra 4 */ 
       // "Extra5" : "Extra 5" /* Campo Extra 5 */ 
       // "Extra6" : "Extra 6" /* Campo Extra 6 */ 
       // "Extra7" : "Extra 7" /* Campo Extra 7 */ 
       // "Extra8" : "Extra 8" /* Campo Extra 8 */ 
       // "Extra9" : "Extra 9" /* Campo Extra 9 */ 
       // "Extra10" : "Extra 10" /* Campo Extra 10 */ 
       // "Pagina":1 /* Página da consulta da Lista de Funcionários conforme a listagem dos Funcionários no menu Pessoa */ 
       // "CarregarBiometrias": "false" (Campo opcional - valor default : false)
    }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": [
    {
      "Id": 151
    }
  ]
}
````

##### `POST /RestServiceApi/People/TransitionPeople`

Método responsável por realizar a transição de funcionários.

- `operationId`: `People_TransitionPeople`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Salvo com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:

    /* Este método é responsável por transitar o funcionário entre as Empresas do grupo. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     
        
         "lstPersonTransition": /* (Campo obrigatório) Lista de funcionários. */
         [{
            "Id":"1", /* (Campo obrigatório) Id do funcionário. */
            "IdEstrutura":"1", /* (Campo obrigatório) Id da Estrutura Organizacional de destino. */
            "IdHorario":"1", /* (Campo obrigatório) Id do Horário de destino. */
            "IdHorarioCarga":"0", /* (Campo opcional) Id do Horário Carga de destino. Valor padrão é 0. Informar o valor se possuir o módulo.*/
            "IdRegraCalculo":"1", /* (Campo obrigatório) Id da Regra de Cálculo de destino. */
            "DataTransicao":"15-01-2019", /* (Campo obrigatório) Data da Transição. Formato dd-MM-aaaa. Informar uma data de transição dentro de um período aberto. */
            "Matricula":"0", /* (Campo opcional) Matrícula do funcionário de destino. Valor padrão é 0 para manter a mesma matrícula. */
            "Cracha":"0", /* (Campo opcional) Crachá do funcionário de destino. Valor padrão é 0 para manter o mesma crachá. */
            "IdUsuario":"1" /* (Campo obrigatório) Id do usuário responsável pela alteração. */
         }]
     }
````

#### Grupo: Period

##### `POST /RestServiceApi/Period/GetPeriodOpen`

Método responsável por consultar os peridos abertos da empresa.

- `operationId`: `Period_GetPeriodOpen`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método responsável por consultar os peridos abertos da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "IdUser" : 2398 /* (Campo obrigatório) Filtro de id de usuario. */
     }
````

#### Grupo: PreJustificationRequest

##### `POST /RestServiceApi/PreJustificationRequest/PreJustificationRequest`

Método responsável por inserir a pré-justificativa.

- `operationId`: `PreJustificationRequest_PreJustificationRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Inserida com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por inserir a pré-justificativa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     
         
         "IdJustification" : 1, /* (Campo obrigatório) Id da justificativa. */
         "IdUser" : 2, /* (Campo obrigatório) Id do usuario. */
         "IdEmployee" : 80, /* (Campo obrigatório) Id do funcionário. */
         "QtdHours" : "1753-01-01 05:30:00", /* (Campo obrigatório) Quantidade de horas justificadas. */
         "Date" : "2021-07-29 00:00:00", /* (Campo obrigatório) Data da justificativa. */
         "Notes" : "teste pre justificativa", /* (Campo obrigatório) Motivo da justificativa. */
         "RequestType":"1", /* (Campo obrigatório) É o tipo de valor que será informado no "IdEmployee". 1 = Consulta por id dos funcionários, 2 = Consulta pelo crachá do funcionário, 3 = Consulta pela matrícula do funcionário. */
         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

#### Grupo: PunchesRequest

##### `POST /RestServiceApi/PunchesRequest/ApprovalPunchesRequest`

Método responsável por aprovar o pedido de marcacao do funcionário da empresa.

- `operationId`: `PunchesRequest_ApprovalPunchesRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Aprovado com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por aprovar o pedido de marcacao do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     
        
         "LstPunchesReq": /* (Campo obrigatório) Lista de pedidos de marcacoes. */
         [{
            "Id" :2474, /* (Campo obrigatório) Id do pedido de marcação */
            "IdUser" : 2398, /* (Campo obrigatório) Id do usuário */
            "Situation": 1, /* (Campo obrigatório) Situação do pedido. 1 – aprovar o pedido de marcação, 2 – reprovar o pedido de marcação  */ 
            "Punch":"2021-08-16 16:00:00", /* (Campo obrigatório) Data e hora da marcação aprovada. */
            "ResponseType":"AS400V1" /* (Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
         }] 
     }
````

##### `POST /RestServiceApi/PunchesRequest/GetPunchesRequest`

Método responsável por consultar o pedido de marcacao do funcionário da empresa.

- `operationId`: `PunchesRequest_GetPunchesRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método responsável por consultar o pedido de marcacao do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "IdUser" : 2398, /* (Campo obrigatório) Filtro de id de usuario. */
        "IdEmployee": 51157, /* (Campo obrigatório) Filtro de id do funcionario. */
        "Start":"13-08-2021", /* (Campo obrigatório) Filtro de inicio do período da consulta. Formato dd-MM-aaaa. */
        "End":"17-08-2021", /* (Campo obrigatório) Filtro de fim do período da consulta. Formato dd-MM-aaaa. */
        "RequestType":"1", /* (Campo obrigatório) É o tipo de valor que será informado no "IdEmployee". 1 = Consulta por id dos funcionários, 2 = Consulta pelo crachá do funcionário, 3 = Consulta pela matrícula do funcionário. */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

##### `POST /RestServiceApi/PunchesRequest/PuncheRequest`

Método responsável por criar o pedido de marcacaodo funcionário da empresa.

- `operationId`: `PunchesRequest_PuncheRequest`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Criado com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por criar o pedido de marcacao do funcionário da empresa. */
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         // !!! ALERTA !!! - Cuidado antes de executar este método, os dados serão salvos.     
        
         "IdUser" : 2398, /* (Campo obrigatório) Id do usuario. */
         "IdEmployee" : 51157, /* (Campo obrigatório) Id do funcionario. */
         "Punch":"2021-08-19 08:03:00", /* (Campo obrigatório) Data e hora do pedido de marcacao. */
         "Description":"teste de marcacao pela api", /* (Campo obrigatório) Motivo do pedido de marcacao. */
         "RequestType":"1", /* (Campo obrigatório) É o tipo de valor que será informado no "IdEmployee". 1 = Consulta por id dos funcionários, 2 = Consulta pelo crachá do funcionário, 3 = Consulta pela matrícula do funcionário. */
         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
     }
````

#### Grupo: ReportEmployeeHour

##### `POST /RestServiceApi/ReportEmployeeHour/GetReportEmployeeHour`

Relatorio de horas dos Funcionarios.

- `operationId`: `ReportEmployeeHour_GetReportEmployeeHour`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `object` |

Descrição e exemplo da especificação:

````text
 Sample request:

      /* Este método é responsável por retornar o relatorio de horas dos Funcionarios. */
      
      /* Headers */
      /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
      /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
      
      /* Post */
      {
          "IdsEmployee": [1], /* (Campo obrigatório) Lista de id dos funcionarios. */
          "Start":"01/08/2021", /* (Campo obrigatório) Filtro de inicio do período da consulta. */
          "End":"31/08/2021", /* (Campo obrigatório) Filtro de fim do período da consulta. */
	         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
	         "Pagina": "1" /* Traz resultados de página indicada, em caso de resultados com mais de 1000 registros. Caso não indicado, segue o padrão: Pagina = 1 */
      }
````

#### Grupo: ReportEmployeePunch

##### `POST /RestServiceApi/ReportEmployeePunch/GetReportEmployeePunch`

Relatorio de ponto dos Funcionarios.

- `operationId`: `ReportEmployeePunch_GetReportEmployeePunch`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `object` |

Descrição e exemplo da especificação:

````text
 Sample request:

      /* Este método é responsável por retornar o relatorio de ponto dos Funcionarios. */
      
      /* Headers */
      /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
      /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
      
      /* Post */
      {
          "MatriculaPessoa": [1005], /* (Campo obrigatório) Lista de matricula dos funcionarios. */
          "DataInicio":"01/08/2021", /* (Campo obrigatório) Filtro de inicio do período da consulta. */
          "DataFim":"31/08/2021", /* (Campo obrigatório) Filtro de fim do período da consulta. */
	         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
      }
````

#### Grupo: ReportJourneySimplified

##### `POST /RestServiceApi/ReportJourneySimplified/GetReportJourneySimplified`

Relatorio de Jornada de trabalho simplicada

- `operationId`: `ReportJourneySimplified_GetReportJourneySimplified`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `object` |

Descrição e exemplo da especificação:

````text
 Sample request:

      /* Este método é responsável por retornar o relatorio de Jornada de trabalho simplicada. */
      
      /* Headers */
      /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
      /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
      
      /* Post */
      {
          "MatriculaPessoa": [1001,1002], /* (Campo obrigatório) Matricula do funcionario. */
          "DataInicio": "01/12/2024", /* (Campo obrigatório) Filtro de inicio do período da consulta. */
          "DataFim": "02/12/2024", /* (Campo obrigatório) Filtro de fim do período da consulta. */
	         "ResponseType": "AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
      }
````

#### Grupo: ReportTeamHour

##### `POST /RestServiceApi/ReportTeamHour/GetReportTeamHour`

Relatorio de horas dos Funcionarios subordinados ao usuario informado..

- `operationId`: `ReportTeamHour_GetReportTeamHour`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `object` |

Descrição e exemplo da especificação:

````text
 Sample request:

      /* Este método é responsável por retornar o relatorio de horas dos funcionarios subordinados ao usuario informado. */
      
      /* Headers */
      /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
      /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
      
      /* Post */
      {
          "IdUser" : 1, /* (Campo obrigatório) Id do Usuario. Este ID é gerado pelo sistema e exibido na url da edição do usuário selecionado. */
          "Start":"01/08/2021", /* (Campo obrigatório) Filtro de inicio do período da consulta. */
          "End":"31/08/2021", /* (Campo obrigatório) Filtro de fim do período da consulta. */
	         "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
      }
````

#### Grupo: Schedules

##### `POST /RestServiceApi/Schedules/GetSchedulesSummary`

Método responsável por retornar informações de id, código e descrição de Horário.

- `operationId`: `Schedules_GetSchedulesSummary`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Consulta realizada com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request: 
     
     /* Este Método responsável por retornar informações de id, código e descrição de Horário por empresa. */  
     
     /* Headers */
     /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
     /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
     
     /* Post */
     {
        "Pagina": "1" /* Traz resultados de página indicada, em caso de resultados com mais de 1000 registros. Padrão: Pagina = 1 */
     }
````

#### Grupo: System

##### `POST /RestServiceApi/System/GetIntegrationRestApi`

Método responsável por buscar a chave de integração.

- `operationId`: `System_GetIntegrationRestApi`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `model` | body | sim | `IntegracaoRestRequest` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna os funcionários do sistema | `array<GetIntegrationRestExample>` |

Descrição e exemplo da especificação:

````text
Sample request:
     
     /* Este método é responsável por buscar a chave de integração. */
     
     /* Post */
     {
         // Os dados abaixo são fictícios, altere e informe os dados corretos da sua empresa.
         
         "Email": "filial@br.com", /* (Campo obrigatório) E-mail do usuário. */
         "Password": "1", /* (Campo obrigatório) Password do login/usuário. */
     }
````

Exemplo de resposta HTTP 200:

````json
{
  "application/json": {
    "Sucesso": true,
    "Mensagem": "",
    "Obj": {
      "Key": "c9cb8088-e08c-49da-be9e-387a61b..."
    }
  }
}
````

#### Grupo: User

##### `POST /RestServiceApi/User/Create`

Método responsável por criar o usuário na empresa.

- `operationId`: `User_Create`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Criado com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por criar o usuário na empresa. */
     
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* Post */        
    {
       "Nome":"example", /* (Campo obrigatório) Nome do usuário */
       "Email": "example@integracaoApi.com", /* (Campo obrigatório) Email do usuário */
       "Password":"123456", /* (Campo obrigatório) Senha do usuário */
       "CnpjCpfEmpresa": "74424812000109", /* (Campo obrigatório) Cnpj da empresa */
       "PerfilNoSoftware":10, /* (Campo obrigatório) Id do perfil. Este ID é gerado pelo sistema e exibido na url da edição do perfil selecionado */
       "Cracha":"1", /* (Campo obrigatório) Crachá do funcionário */
       "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
       "TipoVisualizaDados":"1" /* 1 - Somente Usuário, 2 - Somente Subordinados,  3 - Usuario e Subordinados 
                Caso o perfil seja Funcionario (igual a 5) o valor do TipoVisualizaDados será 1 - somente usuário, 
                Caso o perfil seja Gestor (igual a 6) o valor do TipoVisualizaDados será o informado
                Para os outros perfis o valor do TipoVisualizaDados será 2 - Subordinados
        "Estruturas": /* Lista de Estruturas Organizacionais do funcionário. Ao informar o Id da estrutua no body, o sistema irá incluir esse Id e suas estruturas filhas. */
        [
            { 
                "Id": 1 /* Id da Estrutura Organizacional. */
            }
        ]
    }
````

##### `POST /RestServiceApi/User/ExistUserBaseMuro`

- `operationId`: `User_ExistUserBaseMuro`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | OK | `object` |

##### `POST /RestServiceApi/User/Search`

Método para buscar o usuário

- `operationId`: `User_Search`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna os usuário do sistema | `object` |

Descrição e exemplo da especificação:

````text
Exemplo:

    /* Este método é responsável por buscar o usuário. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* Post */      
    {
       "Email": "example@integracaoApi.com", /* (Campo obrigatório) Email do usuário */
       // "Password":"1", /* (Campo opcional) Senha do usuário */
       "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
    }
````

##### `POST /RestServiceApi/User/SearchOnlyEmail`

Método para buscar o usuário informando apenas o e-mail

- `operationId`: `User_SearchOnlyEmail`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Retorna os usuário do sistema | `object` |

Descrição e exemplo da especificação:

````text
Exemplo:

    /* Este método é responsável por buscar o usuário informando apenas o e-mail. */
    
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* Post */      
    {
       "Email": "example@integracaoApi.com", /* (Campo obrigatório) Email do usuário */
       "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
    }
````

##### `POST /RestServiceApi/User/Update`

Método responsável por atualizar o usuário na empresa.

- `operationId`: `User_Update`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Atualizado com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
     
    /* Este método é responsável por atualizar o usuário na empresa. */
     
    /* Headers */
    /* Key = identifier | Value = 10358656000134 (Key e value obrigatórios) O value é o CPF ou CNPJ (BR)/ NIF (PT) / RFC ou CURP (MX) sem acentuação ou separador. */
    /* Key = Key | Value = 6404bd39-2c02-4feb-ba4f-9c8d19fa9529 (Key e value obrigatórios) Esta chave é gerada pelo sistema no menu Integração REST API.*/
    
    /* Post */        
    {
        "Nome":"example", /* (Campo obrigatório) Nome do usuário */
        "Email": "example@integracaoApi.com", /* (Campo obrigatório) Email do usuário */
        "OldPassword":"123", /* (Campo obrigatório) Senha antiga do usuário */
        "Password":"123456", /* (Campo obrigatório) Senha nova do usuário */
        "CnpjCpfEmpresa": "74424812000109", /* (Campo obrigatório) Cnpj da empresa */
        "PerfilNoSoftware":10, /* (Campo obrigatório) Id do perfil */
        "Cracha":"1", /* (Campo obrigatório) Crachá do funcionário */
        "ResponseType":"AS400V1" /*(Campo obrigatório) Possível valor "AS400V1", sempre será esse valor fixo. É o tipo da resposta esperada */ 
    }
````

#### Grupo: Works

##### `POST /RestServiceApi/Works/CreateWorks`

Método responsável por gravar uma lista de obras.

- `operationId`: `Works_CreateWorks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Obras gravadas com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:

    /* Post */
    [
        {
            "Codigo": 101, /* (Campo obrigatório) Código identificador da obra. */
            "Descricao": "Construção de Escola", /* (Campo obrigatório) Descrição da obra. */
            "Observacoes": "Início em janeiro de 2023.", /* (Opcional) Observações sobre a obra. */
            "SolicitaAprovacaoHoras": true, /* (Campo obrigatório) Indica se a aprovação de horas é necessária. */
            "SomenteGestoresVisualiza": false, /* (Campo obrigatório) Define se somente gestores podem visualizar a obra. */
            "EstadoSelected": 2501, /* (Campo obrigatório) Estado da obra: Ativada (2501), Desativada (2502), Finalizada (2503). */
            "ObraPaiSelected": null /* (Opcional) Código da obra pai, se aplicável. */
        },
        {
            "Codigo": 102, /* (Opcional) Código identificador da obra. */
            "Descricao": "Reforma de Biblioteca", /* (Campo obrigatório) Descrição da obra. */
            "Observacoes": "Prazo até junho de 2023.", /* (Opcional) Observações sobre a obra. */
            "SolicitaAprovacaoHoras": false, /* (Campo obrigatório) Indica se a aprovação de horas é necessária. */
            "SomenteGestoresVisualiza": true, /* (Campo obrigatório) Define se somente gestores podem visualizar a obra. */
            "EstadoSelected": 2502, /* (Campo obrigatório) Estado da obra: Ativada (2501), Desativada (2502), Finalizada (2503). */
            "ObraPaiSelected": null /* (Opcional) Código da obra pai, se aplicável. */
        }
    ]
````

##### `POST /RestServiceApi/Works/EditWorks`

Método responsável por editar uma lista de obras.

- `operationId`: `Works_EditWorks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Obras editadas com sucesso | `object` |

Descrição e exemplo da especificação:

````text
Sample request:

    /* Post */
    [
        {
            
            "Codigo": 101, /* (Campo obrigatório) Código identificador da obra existente. */
            "Descricao": "Construção de Escola", /* (Campo obrigatório) Descrição da obra existente. */
            "NovoCodigo": 201, /* (Opcional) Novo código identificador da obra. */
            "NovaDescricao": "Ampliação de Escola", /* (Opcional) Nova descrição da obra. */
            "Observacoes": "Início em janeiro de 2023.", /* (Opcional) Observações sobre a obra. */
            "SolicitaAprovacaoHoras": true, /* (Campo obrigatório) Indica se a aprovação de horas é necessária. */
            "SomenteGestoresVisualiza": false, /* (Campo obrigatório) Define se somente gestores podem visualizar a obra. */
            "EstadoSelected": 2501, /* (Campo obrigatório) Estado da obra: Ativada (2501), Desativada (2502), Finalizada (2503). */
            "ObraPaiSelected": null /* (Opcional) Código da obra pai, se aplicável. */
        },
        {
            "Codigo": 102, /* (Campo obrigatório) Código identificador da obra existente. */
            "Descricao": "Reforma de Biblioteca", /* (Campo obrigatório) Descrição da obra existente. */
            "NovoCodigo": 202, /* (Opcional) Novo código identificador da obra. */
            "NovaDescricao": "Reforma de Biblioteca", /* (Opcional Nova descrição da obra. */
            "Observacoes": "Prazo até junho de 2023.", /* (Opcional) Observações sobre a obra. */
            "SolicitaAprovacaoHoras": false, /* (Campo obrigatório) Indica se a aprovação de horas é necessária. */
            "SomenteGestoresVisualiza": true, /* (Campo obrigatório) Define se somente gestores podem visualizar a obra. */
            "EstadoSelected": 2502, /* (Campo obrigatório) Estado da obra: Ativada (2501), Desativada (2502), Finalizada (2503). */
            "ObraPaiSelected": null /* (Opcional) Código da obra pai, se aplicável. */
        }
    ]
````

##### `POST /RestServiceApi/Works/GetReportEmployeeWorkSummary`

Método responsável por buscar relatórios de funcionários com base nos critérios fornecidos.

- `operationId`: `Works_GetReportEmployeeWorkSummary`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Relatório gerado com sucesso. | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
            
    /* Post */
    {
        "IdsPessoa": [1, 2, 3], /* (Opcional) Lista de IDs de pessoas. */
        "CrachasPessoa": [1234567890], /* (Opcional) Lista de crachás de pessoas. */
        "MatriculasPessoa": [987654321], /* (Opcional) Lista de matrículas de pessoas. */
        "PisPessoa": ["1234567890"], /* (Opcional) Lista de PIS de pessoas. */
        "CpfsPessoa": ["12345678901"], /* (Opcional) Lista de CPFs de pessoas. */
        "NifsPessoa": ["NIF123"], /* (Opcional) Lista de NIFs de pessoas. */
        "DataInicio": "2023-01-01", /* (Obrigatório) Data de início do período do relatório. */
        "DataFim": "2023-12-31" /* (Obrigatório) Data de fim do período do relatório. */
    }
````

##### `POST /RestServiceApi/Works/GetReportWorkSummary`

Método de responsável por buscar relatórios de obra com base nos critérios fornecidos.

- `operationId`: `Works_GetReportWorkSummary`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Relatório de obra gerado com sucesso com os critérios especificados. | `object` |

Descrição e exemplo da especificação:

````text
Exemplo de requisição:
            
    POST
    {
        "CodigoObra": "123", // (Obrigatório) Identificador da obra.
        "CrachasPessoa": [1234567890], // (Opcional) Lista de crachás de pessoas.
        "MatriculasPessoa": [987654321], // (Opcional) Lista de matrículas de pessoas.
        "PisPessoa": ["1234567890"], // (Opcional) Lista de PIS de pessoas.
        "CpfsPessoa": ["12345678901"], // (Opcional) Lista de CPFs de pessoas.
        "NifsPessoa": ["NIF123"], // (Opcional) Lista de NIFs de pessoas.
        "DataInicio": "2023-01-01", // (Obrigatório) Data de início do período do relatório (formato ISO 8601).
        "DataFim": "2023-12-31", // (Obrigatório) Data de fim do período do relatório (formato ISO 8601).
        "ObrasFilhas": true // (Opcional) Indica se as obras filhas devem ser incluídas no relatório.
    }
            
Importante: ao menos um dos parâmetros "IdsPessoa", "CrachasPessoa", "MatriculasPessoa", "PisPessoa", "CpfsPessoa" ou "NifsPessoa" deve ser fornecido.
````

##### `POST /RestServiceApi/Works/LinkPunchTimeRangeToWorks`

Método responsável por associar apontamentos obras com base nos critérios fornecidos.

- `operationId`: `Works_LinkPunchTimeRangeToWorks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Dados da obra vinculados com sucesso com os critérios especificados. | `object` |
| 400 | Parâmetros inválidos ou requisição malformada. | `` |
| 500 | Erro interno do servidor ao processar a solicitação. | `` |

Descrição e exemplo da especificação:

````text
Exemplo de requisição:
            
    POST
    {
        "IdsPessoa": [1, 2, 3], // (Opcional) Lista de IDs de pessoas.
        "CrachasPessoa": [1234567890], // (Opcional) Lista de crachás de pessoas.
        "MatriculasPessoa": [987654321], // (Opcional) Lista de matrículas de pessoas.
        "PisPessoa": ["1234567890"], // (Opcional) Lista de PIS de pessoas.
        "CpfsPessoa": ["12345678901"], // (Opcional) Lista de CPFs de pessoas.
        "NifsPessoa": ["NIF123"], // (Opcional) Lista de NIFs de pessoas.
        "DataHoraInicio": "2023-01-01T00:00:00", // (Obrigatório) Data e hora de início do período do relatório (ISO 8601).
        "DataHoraFim": "2023-12-31T23:59:59", // (Obrigatório) Data e hora de fim do período do relatório (ISO 8601).
        "CodigoObra": 101 // (Obrigatório) Código da obra.
    }
Importante: ao menos um dos parâmetros "IdsPessoa", "CrachasPessoa", "MatriculasPessoa", "PisPessoa", "CpfsPessoa" ou "NifsPessoa" deve ser fornecido.
````

##### `POST /RestServiceApi/Works/RemoveWorks`

Método responsável por deletar uma lista de obras com base nos códigos fornecidos.

- `operationId`: `Works_RemoveWorks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Obras deletadas com sucesso. | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
            
    /* Post */
    [
        {
            "Codigo": 101 /* (Campo obrigatório) Código identificador da primeira obra a ser deletada. */
        },
        {
            "Codigo": 102 /* (Campo obrigatório) Código identificador da segunda obra a ser deletada. */
        }
    ]
````

##### `POST /RestServiceApi/Works/SearchWorks`

Método responsável por buscar obras com base nos critérios fornecidos.

- `operationId`: `Works_SearchWorks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Lista de obras encontradas. | `object` |

Descrição e exemplo da especificação:

````text
Sample request:
            
    /* Post */
    {
        "Codigo": 101, /* (Opcional) Código identificador da obra a ser buscada. */
        "Descricao": "Construção", /* (Opcional) Descrição da obra a ser buscada. */
        "EstadoSelected": 2501 /* (Opcional) Estado da obra: Ativada (2501), Desativada (2502), Finalizada (2503). */
    }
````

##### `POST /RestServiceApi/Works/UnLinkPunchTimeRangeToWorks`

Método responsável pela desvinculação apontamentos de uma obra com base nos critérios fornecidos.

- `operationId`: `Works_UnLinkPunchTimeRangeToWorks`
- Consome: `application/json`, `text/json`, `application/xml`, `text/xml`, `application/x-www-form-urlencoded`
- Produz: `application/json`, `text/json`, `application/xml`, `text/xml`

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `jsonData` | body | sim | `object` | `` |  |
| `identifier` | header | não | `string` | `` | Cnpj/Cpf da empresa |
| `key` | header | não | `string` | `` | Chave da Integração REST API |

Respostas declaradas:

| HTTP | Descrição | Schema |
|---:|---|---|
| 200 | Desvinculação realizada com sucesso. | `object` |
| 400 | Requisição inválida, verifique os parâmetros. | `` |

Descrição e exemplo da especificação:

````text
Exemplo de requisição:
            
    /* Post */
    {
        "IdsPessoa": [1, 2, 3], /* (Opcional) Lista de IDs das pessoas a serem desvinculadas. */
        "CrachasPessoa": [1234567890], /* (Opcional) Lista de crachás das pessoas. */
        "MatriculasPessoa": [987654321], /* (Opcional) Lista de matrículas das pessoas. */
        "PisPessoa": ["1234567890"], /* (Opcional) Lista de PIS das pessoas. */
        "CpfsPessoa": ["12345678901"], /* (Opcional) Lista de CPFs das pessoas. */
        "NifsPessoa": ["NIF123"], /* (Opcional) Lista de NIFs das pessoas. */
        "DataHoraInicio": "2023-01-01T08:00:00", /* (Opcional) Data e hora de início do vínculo. */
        "DataHoraFim": "2023-12-31T18:00:00", /* (Opcional) Data e hora de fim do vínculo. */
        "CodigoObra": 101 /* (Obrigatório) Código identificador da obra. */
    }
````

### 1.3 Modelos DIMEP

#### `ApprovalStatusRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Tipologia` | `integer` | `int32` | `0, 1, 2, 3, 4, 5` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `AssiduityItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Name` | `string` | `` | `` |  |
| `Photo` | `string` | `` | `` |  |
| `Badge` | `integer` | `int64` | `` |  |
| `Structure` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Phone` | `string` | `` | `` |  |
| `MobilePhone` | `string` | `` | `` |  |
| `Status` | `integer` | `int32` | `` |  |
| `Alert1` | `boolean` | `` | `` |  |
| `Alert2` | `boolean` | `` | `` |  |
| `Alert3` | `boolean` | `` | `` |  |
| `Alert4` | `boolean` | `` | `` |  |
| `Alert5` | `boolean` | `` | `` |  |
| `Date` | `string` | `date-time` | `` |  |
| `Schedule` | `string` | `` | `` |  |
| `Marks` | `string` | `` | `` |  |
| `ExpectedEntry` | `string` | `` | `` |  |

#### `AssiduityModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `People` | `array<AssiduityItem>` | `` | `#/definitions/AssiduityItem` |  |
| `Limits` | `object` | `` | `` |  |
| `Counts` | `object` | `` | `` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `AssiduityRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Tab` | `integer` | `int32` | `1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `AuthenticateRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Name` | `string` | `` | `` |  |
| `Password` | `string` | `` | `` |  |

#### `AuthenticateResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Token` | `string` | `` | `` |  |
| `Error` | `string` | `` | `` |  |
| `Success` | `boolean` | `` | `` |  |

#### `BaseRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ClockModelApiSearchReturn`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `RelogioNumero` | `integer` | `int32` | `` |  |
| `RelogioNome` | `string` | `` | `` |  |
| `RelogioIp` | `string` | `` | `` |  |
| `RelogioDesativado` | `boolean` | `` | `` |  |
| `Compartilhado` | `boolean` | `` | `` |  |
| `NumeroFabricacao` | `string` | `` | `` |  |
| `UltimoStatus` | `string` | `date-time` | `` |  |
| `UltimaColeta` | `string` | `date-time` | `` |  |

#### `ClockModelsApiRet`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `PessoaCracha` | `integer` | `int64` | `` |  |
| `PessoaNome` | `string` | `` | `` |  |
| `RelogioNumero` | `integer` | `int32` | `` |  |
| `RelogioNome` | `string` | `` | `` |  |
| `RelogioIp` | `string` | `` | `` |  |

#### `CompaniesModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Companies` | `array<CompanyItem>` | `` | `#/definitions/CompanyItem` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `CompanyItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Name` | `string` | `` | `` |  |

#### `ContactsRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `PeopleId` | `integer` | `int32` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ContactsResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Email` | `string` | `` | `` |  |
| `Phone` | `string` | `` | `` |  |
| `Mobile` | `string` | `` | `` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `DashboardModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `NumberOfMessages` | `integer` | `int64` | `` |  |
| `NumberOfRequests` | `integer` | `int64` | `` |  |
| `NumberOfInconsistencies` | `integer` | `int64` | `` |  |
| `Matricula` | `integer` | `int64` | `` |  |
| `Cracha` | `integer` | `int64` | `` |  |
| `HasLimitAbsence` | `boolean` | `` | `` |  |
| `LimitAbsence` | `string` | `` | `` |  |
| `NumberOfAbsence` | `integer` | `int64` | `` |  |
| `Holidays` | `integer` | `int32` | `` |  |
| `HasDelay1` | `boolean` | `` | `` |  |
| `HasDelay2` | `boolean` | `` | `` |  |
| `HasDelay3` | `boolean` | `` | `` |  |
| `LimitDelay1` | `string` | `` | `` |  |
| `LimitDelay2` | `string` | `` | `` |  |
| `LimitDelay3` | `string` | `` | `` |  |
| `NumberOfDelayLimit1` | `integer` | `int64` | `` |  |
| `NumberOfDelayLimit2` | `integer` | `int64` | `` |  |
| `NumberOfDelayLimit3` | `integer` | `int64` | `` |  |
| `HasExtra1` | `boolean` | `` | `` |  |
| `HasExtra2` | `boolean` | `` | `` |  |
| `HasExtra3` | `boolean` | `` | `` |  |
| `HasExtra4` | `boolean` | `` | `` |  |
| `HasExtra5` | `boolean` | `` | `` |  |
| `LimitExtra1` | `string` | `` | `` |  |
| `LimitExtra2` | `string` | `` | `` |  |
| `LimitExtra3` | `string` | `` | `` |  |
| `LimitExtra4` | `string` | `` | `` |  |
| `LimitExtra5` | `string` | `` | `` |  |
| `NumberOfExtraLimit1` | `integer` | `int64` | `` |  |
| `NumberOfExtraLimit2` | `integer` | `int64` | `` |  |
| `NumberOfExtraLimit3` | `integer` | `int64` | `` |  |
| `NumberOfExtraLimit4` | `integer` | `int64` | `` |  |
| `NumberOfExtraLimit5` | `integer` | `int64` | `` |  |
| `HasLimitBank` | `boolean` | `` | `` |  |
| `LimitBank` | `string` | `` | `` |  |
| `NumberOfLimitBank` | `integer` | `int64` | `` |  |
| `NumberDelaysLastSevenDays` | `array<integer>` | `` | `` |  |
| `NumberAbsencesLastSevenDays` | `array<integer>` | `` | `` |  |
| `NumberOfPlannedAbsence` | `integer` | `int64` | `` |  |
| `LastMark` | `string` | `date-time` | `` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `DashboardRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `PeopleId` | `integer` | `int32` | `` |  |
| `Login` | `string` | `` | `` |  |
| `LicenseId` | `string` | `uuid` | `` |  |
| `CurrentDate` | `string` | `date-time` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `DelayOccurenceItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdOccurrence` | `integer` | `int32` | `` |  |
| `OccurrenceTypeId` | `integer` | `int32` | `` |  |
| `Date` | `string` | `date-time` | `` |  |
| `Hours` | `string` | `date-time` | `` |  |

#### `DelayOccurrencesRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Page` | `integer` | `int32` | `` |  |
| `PeopleBadge` | `integer` | `int64` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `DelayOccurrencesResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `NumberOfPages` | `integer` | `int32` | `` |  |
| `Page` | `integer` | `int32` | `` |  |
| `Occurrences` | `array<DelayOccurenceItem>` | `` | `#/definitions/DelayOccurenceItem` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `ExcludeRequestRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdRequest` | `integer` | `int32` | `` |  |
| `Tab` | `integer` | `int32` | `1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ExtraDatesRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `PeopleId` | `integer` | `int32` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ExtraRequestDatesResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Dates` | `array<ItemDateExtra>` | `` | `#/definitions/ItemDateExtra` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `FaceRegistrationRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdPeople` | `integer` | `int32` | `` |  |
| `Base64Image` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `FaceRegistrationResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `RegisteredSuccessfully` | `boolean` | `` | `` |  |
| `ExceededFaceLicense` | `boolean` | `` | `` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `FileUploadModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `FileName` | `string` | `` | `` |  |
| `FileContents` | `string` | `` | `` |  |
| `File` | `string` | `` | `` |  |
| `InputStream` | `Stream` | `` | `#/definitions/Stream` |  |

#### `GetAbsencesExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|

#### `GetAllPeopleWithOrWithoutDigitalExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|

#### `GetAllPeopleWithOrWithoutFacialExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|

#### `GetAppointmentsExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Numero` | `integer` | `int32` | `` |  |
| `Ano` | `integer` | `int32` | `` |  |
| `Mes` | `integer` | `int32` | `` |  |
| `Dia` | `integer` | `int32` | `` |  |
| `Hora` | `integer` | `int32` | `` |  |
| `Minuto` | `integer` | `int32` | `` |  |

#### `GetAppointmentsPointerExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Matricula` | `integer` | `int32` | `` |  |
| `Ano` | `integer` | `int32` | `` |  |
| `Mes` | `integer` | `int32` | `` |  |
| `Dia` | `integer` | `int32` | `` |  |
| `Hora` | `integer` | `int32` | `` |  |
| `Minuto` | `integer` | `int32` | `` |  |
| `NSR` | `integer` | `int32` | `` |  |
| `PIS` | `string` | `` | `` |  |
| `TipoMarcacao` | `string` | `` | `` |  |
| `PessoaID` | `integer` | `int32` | `` |  |
| `NumeroSerieRep` | `integer` | `int32` | `` |  |
| `RelogioID` | `integer` | `int32` | `` |  |
| `Indevido` | `boolean` | `` | `` |  |
| `AnoColeta` | `integer` | `int32` | `` |  |
| `MesColeta` | `integer` | `int32` | `` |  |
| `DiaColeta` | `integer` | `int32` | `` |  |
| `HoraColeta` | `integer` | `int32` | `` |  |
| `MinutoColeta` | `integer` | `int32` | `` |  |
| `SegundoColeta` | `integer` | `int32` | `` |  |
| `IdApont` | `integer` | `int32` | `` |  |

#### `GetAppointmentsV2Example`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Matricula` | `integer` | `int32` | `` |  |
| `Ano` | `integer` | `int32` | `` |  |
| `Mes` | `integer` | `int32` | `` |  |
| `Dia` | `integer` | `int32` | `` |  |
| `Hora` | `integer` | `int32` | `` |  |
| `Minuto` | `integer` | `int32` | `` |  |
| `NSR` | `integer` | `int32` | `` |  |
| `TipoMarcacao` | `string` | `` | `` |  |
| `NumeroSerieRep` | `integer` | `int32` | `` |  |
| `CodigoObra` | `integer` | `int32` | `` |  |
| `DescricaoObra` | `string` | `` | `` |  |
| `PIS` | `string` | `` | `` |  |
| `PessoaID` | `integer` | `int32` | `` |  |
| `RelogioID` | `integer` | `int32` | `` |  |
| `Indevido` | `string` | `` | `` |  |
| `AnoColeta` | `integer` | `int32` | `` |  |
| `MesColeta` | `integer` | `int32` | `` |  |
| `DiaColeta` | `integer` | `int32` | `` |  |
| `HoraColeta` | `integer` | `int32` | `` |  |
| `MinutoColeta` | `integer` | `int32` | `` |  |
| `SegundoColeta` | `integer` | `int32` | `` |  |
| `CPF` | `string` | `` | `` |  |
| `IDSequence` | `integer` | `int32` | `` |  |
| `CodigoMobile` | `string` | `` | `` |  |
| `MobileID` | `string` | `` | `` |  |
| `Latitude` | `string` | `` | `` |  |
| `Longitude` | `string` | `` | `` |  |

#### `GetDigitalExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|

#### `GetFacialExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|

#### `GetIntegrationRestExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|

#### `GetMarksExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Matricula` | `integer` | `int32` | `` |  |
| `Indevido` | `boolean` | `` | `` |  |
| `Ano` | `integer` | `int32` | `` |  |
| `Mes` | `integer` | `int32` | `` |  |
| `Dia` | `integer` | `int32` | `` |  |
| `Hora` | `integer` | `int32` | `` |  |
| `Minuto` | `integer` | `int32` | `` |  |
| `FotoFacial` | `string` | `` | `` |  |

#### `HolidaysItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdPessoa` | `integer` | `int32` | `` |  |
| `Nome` | `string` | `` | `` |  |
| `Foto` | `string` | `` | `` |  |
| `Matricula` | `integer` | `int64` | `` |  |
| `Estrutura` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Telefone` | `string` | `` | `` |  |
| `TelefoneCelular` | `string` | `` | `` |  |
| `Estado` | `integer` | `int32` | `` |  |
| `Date` | `string` | `date-time` | `` |  |

#### `HolidaysModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `People` | `array<HolidaysItem>` | `` | `#/definitions/HolidaysItem` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `HolidaysRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `CurrentDate` | `string` | `date-time` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `InconsistenciesModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `People` | `array<InconsistencyItem>` | `` | `#/definitions/InconsistencyItem` |  |
| `CountInconsistencies` | `integer` | `int64` | `` |  |
| `CountUnusualMarking` | `integer` | `int64` | `` |  |
| `NumberOfPages` | `integer` | `int32` | `` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `InconsistenciesRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Tab` | `integer` | `int32` | `0, 1` |  |
| `Page` | `integer` | `int32` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `InconsistencyItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Name` | `string` | `` | `` |  |
| `MiniPhoto` | `string` | `` | `` |  |
| `Badge` | `integer` | `int64` | `` |  |
| `Structure` | `string` | `` | `` |  |
| `Date` | `string` | `date-time` | `` |  |
| `Schedule` | `string` | `` | `` |  |
| `Marks` | `array<string>` | `` | `` |  |
| `IsInconsistency` | `boolean` | `` | `` |  |
| `IsUnusualMark` | `boolean` | `` | `` |  |

#### `IntegracaoRestRequest`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Email` | `string` | `` | `` |  |
| `Password` | `string` | `` | `` |  |

#### `ItemDateExtra`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Date` | `string` | `` | `` |  |
| `Hours` | `string` | `` | `` |  |

#### `JustificationItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Description` | `string` | `` | `` |  |

#### `JustificationResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Justifications` | `array<JustificationItem>` | `` | `#/definitions/JustificationItem` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `JustificationsDelayResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `JustificationsAllowance` | `array<JustificationItem>` | `` | `#/definitions/JustificationItem` |  |
| `JustificationsBh` | `array<JustificationItem>` | `` | `#/definitions/JustificationItem` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `LimitBankItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Name` | `string` | `` | `` |  |
| `Badge` | `integer` | `int64` | `` |  |
| `Photo` | `string` | `` | `` |  |
| `Structure` | `string` | `` | `` |  |
| `Date` | `string` | `date-time` | `` |  |
| `CurrentBalance` | `string` | `` | `` |  |
| `LimitBalance` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Phone` | `string` | `` | `` |  |
| `MobilePhone` | `string` | `` | `` |  |
| `Status` | `integer` | `int32` | `` |  |

#### `LimitBankModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `People` | `array<LimitBankItem>` | `` | `#/definitions/LimitBankItem` |  |
| `Limit` | `string` | `` | `` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `LogErro`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `DataHora` | `string` | `date-time` | `` |  |
| `MensagemErro` | `string` | `` | `` |  |
| `RastreamentoPilha` | `string` | `` | `` |  |
| `MensagemErroInterna` | `string` | `` | `` |  |
| `RastreamentoPilhaInterna` | `string` | `` | `` |  |
| `KairosControl` | `string` | `` | `` |  |
| `Login` | `string` | `` | `` |  |
| `IdUsuario` | `integer` | `int32` | `` |  |
| `IdBanco` | `integer` | `int32` | `` |  |
| `IdEmpresaMatriz` | `integer` | `int32` | `` |  |
| `NomeEmpresa` | `string` | `` | `` |  |
| `IdLicenca` | `string` | `` | `` |  |
| `VersaoKairos` | `string` | `` | `` |  |
| `Endereco` | `string` | `` | `` |  |
| `Token` | `string` | `uuid` | `` |  |
| `Sessao` | `string` | `` | `` |  |

#### `LoginRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Mode` | `integer` | `int32` | `0, 1, 2, 3, 4` |  |
| `Email` | `string` | `` | `` |  |
| `Password` | `string` | `` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `PasswordAlreadyHashed` | `boolean` | `` | `` |  |
| `IsBiometria` | `boolean` | `` | `` |  |
| `CompanyIdApiFace` | `integer` | `int32` | `` |  |
| `StructPersonId` | `integer` | `int32` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |
| `SkipGetOfflineUsers` | `boolean` | `` | `` |  |
| `ForceRefreshUserList` | `boolean` | `` | `` |  |
| `LastSync` | `string` | `date-time` | `` |  |
| `Structures` | `array<integer>` | `` | `` |  |
| `Companies` | `array<integer>` | `` | `` |  |
| `UserThatDidSync` | `string` | `` | `` |  |

#### `ManageFCMTokenRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Token` | `string` | `` | `` |  |
| `Register` | `boolean` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `MarkRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdPeople` | `integer` | `int32` | `` |  |
| `Badge` | `integer` | `int64` | `` |  |
| `Date` | `string` | `date-time` | `` |  |
| `Key` | `string` | `` | `` |  |
| `Offline` | `boolean` | `` | `` |  |
| `GPSRequired` | `boolean` | `` | `` |  |
| `SmartTagRequired` | `boolean` | `` | `` |  |
| `Latitude` | `string` | `` | `` |  |
| `Longitude` | `string` | `` | `` |  |
| `LatitudeBase` | `string` | `` | `` |  |
| `LongitudeBase` | `string` | `` | `` |  |
| `MultipleLogin` | `boolean` | `` | `` |  |
| `SmartTags` | `array<SmartTagRequestModel>` | `` | `#/definitions/SmartTagRequestModel` |  |
| `Face` | `string` | `` | `` |  |
| `IdProject` | `integer` | `int32` | `` |  |
| `DeviceId` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `MarkResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `ProofOfPoint` | `string` | `` | `` |  |
| `MarkStatus` | `integer` | `int32` | `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `MessageItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `string` | `uuid` | `` |  |
| `Subject` | `string` | `` | `` |  |
| `SendingDate` | `string` | `date-time` | `` |  |
| `IsRead` | `boolean` | `` | `` |  |

#### `MessagesModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `ReadCount` | `integer` | `int64` | `` |  |
| `UnreadCount` | `integer` | `int64` | `` |  |
| `Messages` | `array<MessageItem>` | `` | `#/definitions/MessageItem` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `MessagesRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Login` | `string` | `` | `` |  |
| `LicenseId` | `string` | `uuid` | `` |  |
| `Tab` | `integer` | `int32` | `0, 1` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `NewDelayRequestRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdOccurrence` | `integer` | `int32` | `` |  |
| `OccurrenceTypeId` | `integer` | `int32` | `` |  |
| `Date` | `string` | `date-time` | `` |  |
| `Hours` | `string` | `date-time` | `` |  |
| `Description` | `string` | `` | `` |  |
| `IdJustification` | `integer` | `int32` | `` |  |
| `HasDocument` | `boolean` | `` | `` |  |
| `Documents` | `array<FileUploadModel>` | `` | `#/definitions/FileUploadModel` |  |
| `IdPeople` | `integer` | `int32` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `Url` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `NewExtraRequestRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Date` | `string` | `date-time` | `` |  |
| `Hours` | `string` | `date-time` | `` |  |
| `Reason` | `string` | `` | `` |  |
| `IdPeople` | `integer` | `int32` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `Url` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `NewHolidayRequestRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Begin` | `string` | `date-time` | `` |  |
| `End` | `string` | `date-time` | `` |  |
| `Reason` | `string` | `` | `` |  |
| `IdPeople` | `integer` | `int32` | `` |  |
| `AllowExtrapolationFinalDate` | `boolean` | `` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `Url` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `NewMarkRequestRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Date` | `string` | `date-time` | `` |  |
| `Reason` | `string` | `` | `` |  |
| `IdPeople` | `integer` | `int32` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `Url` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `NewMarkRequestRequestModelExtension`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Date` | `string` | `` | `` |  |
| `Reason` | `string` | `` | `` |  |
| `IdPeople` | `integer` | `int32` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `Url` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `NewPreJustificationRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Date` | `string` | `date-time` | `` |  |
| `Hours` | `string` | `date-time` | `` |  |
| `Observations` | `string` | `` | `` |  |
| `IdJustification` | `integer` | `int32` | `` |  |
| `IdPeople` | `integer` | `int32` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `Url` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `NewSmartTagRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Estrutura` | `integer` | `int32` | `` |  |
| `Codigo` | `integer` | `int32` | `` |  |
| `Descricao` | `string` | `` | `` |  |
| `MAC` | `string` | `` | `` |  |
| `Rssi` | `integer` | `int32` | `` |  |
| `TxPower` | `integer` | `int32` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `NotificationItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdNotification` | `integer` | `int32` | `` |  |
| `Title` | `string` | `` | `` |  |
| `Message` | `string` | `` | `` |  |
| `Read` | `boolean` | `` | `` |  |
| `Date` | `string` | `date-time` | `` |  |

#### `NotificationsModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Notifications` | `array<NotificationItem>` | `` | `#/definitions/NotificationItem` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `NotificationsRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `CurrentDate` | `string` | `date-time` | `` |  |
| `Token` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `PairRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdPeople` | `integer` | `int32` | `` |  |
| `key` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `PairResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `DateOfUse` | `string` | `date-time` | `` |  |
| `PairStatus` | `integer` | `int32` | `0, 1, 2, 3, 4, 5` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `PassoAprovacao`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `IdPedidoMarcacao` | `integer` | `int32` | `` |  |
| `IdPedidoFerias` | `integer` | `int32` | `` |  |
| `IdPedidoFaltaAtraso` | `integer` | `int32` | `` |  |
| `IdPedidoHoraExtra` | `integer` | `int32` | `` |  |
| `Passo` | `integer` | `int32` | `` |  |
| `Atual` | `boolean` | `` | `` |  |
| `IdEstrutura` | `integer` | `int32` | `` |  |
| `NomeEstrutura` | `string` | `` | `` |  |
| `tipologia` | `integer` | `int32` | `` |  |
| `Assinaturas` | `array<PassoAprovacaoAssinatura>` | `` | `#/definitions/PassoAprovacaoAssinatura` |  |

#### `PassoAprovacaoAssinatura`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `IdDestinatario` | `integer` | `int32` | `` |  |
| `NomeDestinatario` | `string` | `` | `` |  |
| `QtdAprovada` | `integer` | `int32` | `` |  |
| `DataInicioAprovada` | `string` | `date-time` | `` |  |
| `DataFimAprovada` | `string` | `date-time` | `` |  |
| `Situacao` | `integer` | `int32` | `0, 1, 2, 3, 4, 5, 6` |  |
| `DataSituacao` | `string` | `date-time` | `` |  |
| `IdAssinante` | `integer` | `int32` | `` |  |
| `NomeAssinante` | `string` | `` | `` |  |

#### `PersonFaceSearchRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdPess` | `integer` | `int32` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `PersonFaceSearchResponseModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `base64` | `string` | `` | `` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `PessoaPedidoFeriasModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Dia` | `string` | `` | `` |  |
| `DataRequisicao` | `string` | `date-time` | `` |  |
| `DataSolicitada` | `string` | `date-time` | `` |  |
| `DataValidade` | `string` | `date-time` | `` |  |
| `IdRegraAprovacao` | `integer` | `int32` | `` |  |
| `Motivo` | `string` | `` | `` |  |
| `Status` | `integer` | `int32` | `` |  |
| `IdPedido` | `integer` | `int32` | `` |  |
| `IdPessoa` | `integer` | `int32` | `` |  |
| `Matricula` | `integer` | `int64` | `` |  |
| `Nome` | `string` | `` | `` |  |
| `Estrutura` | `string` | `` | `` |  |
| `Foto` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Telefone` | `string` | `` | `` |  |
| `TelefoneCelular` | `string` | `` | `` |  |
| `PessoaStatus` | `integer` | `int32` | `` |  |

#### `PessoaPedidoHeModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Dia` | `string` | `` | `` |  |
| `DataRequisicao` | `string` | `date-time` | `` |  |
| `DataValidade` | `string` | `date-time` | `` |  |
| `IdRegraAprovacao` | `integer` | `int32` | `` |  |
| `QtdHorasRequisitada` | `string` | `` | `` |  |
| `QtdHorasAprovada` | `string` | `` | `` |  |
| `Motivo` | `string` | `` | `` |  |
| `Status` | `integer` | `int32` | `` |  |
| `IdPedido` | `integer` | `int32` | `` |  |
| `IdPessoa` | `integer` | `int32` | `` |  |
| `Matricula` | `integer` | `int64` | `` |  |
| `Nome` | `string` | `` | `` |  |
| `Estrutura` | `string` | `` | `` |  |
| `Foto` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Telefone` | `string` | `` | `` |  |
| `TelefoneCelular` | `string` | `` | `` |  |
| `PessoaStatus` | `integer` | `int32` | `` |  |

#### `PessoaPedidoJustificativaModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Dia` | `string` | `date-time` | `` |  |
| `Data` | `string` | `date-time` | `` |  |
| `DataValidade` | `string` | `date-time` | `` |  |
| `IdRegraAprovacao` | `integer` | `int32` | `` |  |
| `HorasJustificadas` | `string` | `` | `` |  |
| `Horas` | `string` | `` | `` |  |
| `IdJustificativa` | `integer` | `int32` | `` |  |
| `Justificativa` | `string` | `` | `` |  |
| `Descricao` | `string` | `` | `` |  |
| `Status` | `integer` | `int32` | `` |  |
| `Tipo` | `integer` | `int32` | `` |  |
| `PossuiDocumento` | `boolean` | `` | `` |  |
| `TransferenciaBH` | `string` | `` | `` |  |
| `IdPedido` | `integer` | `int32` | `` |  |
| `IdPessoa` | `integer` | `int32` | `` |  |
| `Matricula` | `integer` | `int64` | `` |  |
| `Nome` | `string` | `` | `` |  |
| `Estrutura` | `string` | `` | `` |  |
| `Foto` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Telefone` | `string` | `` | `` |  |
| `TelefoneCelular` | `string` | `` | `` |  |
| `PessoaStatus` | `integer` | `int32` | `` |  |

#### `PessoaPedidoMarcacaoPontoModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Dia` | `string` | `` | `` |  |
| `DataRequisicao` | `string` | `date-time` | `` |  |
| `DataSolicitada` | `string` | `date-time` | `` |  |
| `DataValidade` | `string` | `date-time` | `` |  |
| `IdRegraAprovacao` | `integer` | `int32` | `` |  |
| `Marcacao` | `string` | `date-time` | `` |  |
| `MarcacaoAprovada` | `string` | `date-time` | `` |  |
| `Motivo` | `string` | `` | `` |  |
| `Status` | `integer` | `int32` | `` |  |
| `IdPedido` | `integer` | `int32` | `` |  |
| `IdPessoa` | `integer` | `int32` | `` |  |
| `Matricula` | `integer` | `int64` | `` |  |
| `Nome` | `string` | `` | `` |  |
| `Estrutura` | `string` | `` | `` |  |
| `Foto` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Telefone` | `string` | `` | `` |  |
| `TelefoneCelular` | `string` | `` | `` |  |
| `PessoaStatus` | `integer` | `int32` | `` |  |

#### `PessoaPedidoPreJustificativaModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Dia` | `string` | `date-time` | `` |  |
| `Data` | `string` | `date-time` | `` |  |
| `DataValidade` | `string` | `date-time` | `` |  |
| `IdRegraAprovacao` | `integer` | `int32` | `` |  |
| `HorasAbonadas` | `string` | `` | `` |  |
| `Horas` | `string` | `` | `` |  |
| `HorasJustificadas` | `string` | `` | `` |  |
| `IdJustificativa` | `integer` | `int32` | `` |  |
| `Justificativa` | `string` | `` | `` |  |
| `Observacoes` | `string` | `` | `` |  |
| `Status` | `integer` | `int32` | `` |  |
| `TransferenciaBH` | `string` | `` | `` |  |
| `IdPedido` | `integer` | `int32` | `` |  |
| `IdPessoa` | `integer` | `int32` | `` |  |
| `Matricula` | `integer` | `int64` | `` |  |
| `Nome` | `string` | `` | `` |  |
| `Estrutura` | `string` | `` | `` |  |
| `Foto` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Telefone` | `string` | `` | `` |  |
| `TelefoneCelular` | `string` | `` | `` |  |
| `PessoaStatus` | `integer` | `int32` | `` |  |

#### `PlannedAbsenceItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Name` | `string` | `` | `` |  |
| `Photo` | `string` | `` | `` |  |
| `Badge` | `integer` | `int64` | `` |  |
| `Structure` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Phone` | `string` | `` | `` |  |
| `MobilePhone` | `string` | `` | `` |  |
| `Status` | `integer` | `int32` | `` |  |
| `Justification` | `string` | `` | `` |  |
| `Hours` | `string` | `` | `` |  |
| `Date` | `string` | `date-time` | `` |  |

#### `PlannedAbsenceModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `People` | `array<PlannedAbsenceItem>` | `` | `#/definitions/PlannedAbsenceItem` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `PlannedAbsenceRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `CurrentDate` | `string` | `date-time` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ProcessDelayRequest`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Request` | `PessoaPedidoJustificativaModel` | `` | `#/definitions/PessoaPedidoJustificativaModel` |  |
| `Status` | `integer` | `int32` | `1, 2, 3` |  |
| `Url` | `string` | `` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `HasWorkForceModule` | `boolean` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ProcessExtraRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Request` | `PessoaPedidoHeModel` | `` | `#/definitions/PessoaPedidoHeModel` |  |
| `Status` | `integer` | `int32` | `0, 1, 2, 3, 4, 5, 6, 7` |  |
| `Url` | `string` | `` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `HasWorkForceModule` | `boolean` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ProcessHolidayRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Request` | `PessoaPedidoFeriasModel` | `` | `#/definitions/PessoaPedidoFeriasModel` |  |
| `Status` | `integer` | `int32` | `0, 1, 2, 3, 4, 5, 6, 7` |  |
| `CompanyCountry` | `string` | `` | `` |  |
| `Url` | `string` | `` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `HasWorkForceModule` | `boolean` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ProcessMarkRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Request` | `PessoaPedidoMarcacaoPontoModel` | `` | `#/definitions/PessoaPedidoMarcacaoPontoModel` |  |
| `Status` | `integer` | `int32` | `0, 1, 2, 3, 4, 5, 6, 7` |  |
| `Url` | `string` | `` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `HasWorkForceModule` | `boolean` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ProcessPreJustificationRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Request` | `PessoaPedidoPreJustificativaModel` | `` | `#/definitions/PessoaPedidoPreJustificativaModel` |  |
| `Status` | `integer` | `int32` | `0, 1, 2, 3, 4, 5, 6, 7` |  |
| `CompanyCountry` | `string` | `` | `` |  |
| `Url` | `string` | `` | `` |  |
| `HasWidgetModule` | `boolean` | `` | `` |  |
| `HasWorkForceModule` | `boolean` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `ProjectModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Code` | `integer` | `int64` | `` |  |
| `Name` | `string` | `` | `` |  |

#### `RecoverRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Email` | `string` | `` | `` |  |
| `Url` | `string` | `` | `` |  |

#### `ReplacementModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `People` | `array<ReplacementModelItem>` | `` | `#/definitions/ReplacementModelItem` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `ReplacementModelItem`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `IdPessoa` | `integer` | `int32` | `` |  |
| `Nome` | `string` | `` | `` |  |
| `Foto` | `string` | `` | `` |  |
| `Matricula` | `integer` | `int64` | `` |  |
| `Estrutura` | `string` | `` | `` |  |
| `Email` | `string` | `` | `` |  |
| `Telefone` | `string` | `` | `` |  |
| `TelefoneCelular` | `string` | `` | `` |  |
| `Status` | `integer` | `int32` | `` |  |
| `EstadoParaSubstituicao` | `integer` | `int32` | `0, 1, 2` |  |
| `Entrance` | `string` | `` | `` |  |
| `AvailableHours` | `string` | `` | `` |  |

#### `ReplacementsRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `CurrentDate` | `string` | `date-time` | `` |  |
| `IdPeople` | `integer` | `int32` | `` |  |
| `ExpectedEntry` | `string` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `RequestsModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `RequestsExtra` | `array<PessoaPedidoHeModel>` | `` | `#/definitions/PessoaPedidoHeModel` |  |
| `RequestsHolidays` | `array<PessoaPedidoFeriasModel>` | `` | `#/definitions/PessoaPedidoFeriasModel` |  |
| `RequestsDelay` | `array<PessoaPedidoJustificativaModel>` | `` | `#/definitions/PessoaPedidoJustificativaModel` |  |
| `RequestsMarks` | `array<PessoaPedidoMarcacaoPontoModel>` | `` | `#/definitions/PessoaPedidoMarcacaoPontoModel` |  |
| `RequestsPreJustifications` | `array<PessoaPedidoPreJustificativaModel>` | `` | `#/definitions/PessoaPedidoPreJustificativaModel` |  |
| `Counts` | `object` | `` | `` |  |
| `ForceLogout` | `boolean` | `` | `` |  |

#### `RequestsRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Tab` | `integer` | `int32` | `1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22` |  |
| `FromTab` | `integer` | `int32` | `0, 1` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CurrentReadOnly` | `boolean` | `` | `` |  |
| `AppManager` | `boolean` | `` | `` |  |

#### `SearchDigitalExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|

#### `SearchFacialExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|

#### `SearchPersonExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |

#### `SetAppointmentsPointerExample`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Success` | `boolean` | `` | `` |  |

#### `SmartTagRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `MAC` | `string` | `` | `` |  |
| `Rssi` | `integer` | `int32` | `` |  |
| `TxPower` | `integer` | `int32` | `` |  |

#### `Status`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Sucesso` | `boolean` | `` | `` |  |
| `Mensagem` | `string` | `` | `` |  |
| `Obj` | `object` | `` | `` |  |

#### `Stream`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `__identity` | `object` | `` | `` |  |

#### `StructureRequestModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `Id` | `integer` | `int32` | `` |  |
| `Description` | `string` | `` | `` |  |
| `SmartTags` | `array<string>` | `` | `` |  |

#### `UserModel`

- Tipo: `object`

| Campo | Tipo | Formato | Enum/Referência | Descrição |
|---|---|---|---|---|
| `StoreUser` | `boolean` | `` | `` |  |
| `UserId` | `integer` | `int32` | `` |  |
| `Language` | `string` | `` | `` |  |
| `UserProfileId` | `integer` | `int32` | `` |  |
| `RegistrationCode` | `integer` | `int64` | `` |  |
| `Badge` | `integer` | `int64` | `` |  |
| `Pis` | `string` | `` | `` |  |
| `Cpf` | `string` | `` | `` |  |
| `Nif` | `string` | `` | `` |  |
| `Rg` | `string` | `` | `` |  |
| `PeopleId` | `integer` | `int32` | `` |  |
| `PeopleCompanyId` | `integer` | `int32` | `` |  |
| `PeopleCompanyName` | `string` | `` | `` |  |
| `GPSRequired` | `boolean` | `` | `` |  |
| `SmartTagRequired` | `boolean` | `` | `` |  |
| `AllowOfflineMark` | `boolean` | `` | `` |  |
| `AllowOnlyOfflineMark` | `boolean` | `` | `` |  |
| `AllowBiometricLogin` | `boolean` | `` | `` |  |
| `UseBiometricToMark` | `boolean` | `` | `` |  |
| `RequireAuthFaceToMark` | `boolean` | `` | `` |  |
| `DoesNotAllowMarkInIndividualMode` | `boolean` | `` | `` |  |
| `FacialPhoto` | `string` | `` | `` |  |
| `ReadOnly` | `boolean` | `` | `` |  |
| `MarkKey` | `string` | `` | `` |  |
| `MarkKeyActive` | `string` | `` | `` |  |
| `MarkKeyPending` | `string` | `` | `` |  |
| `PairDate` | `string` | `date-time` | `` |  |
| `Login` | `string` | `` | `` |  |
| `Password` | `string` | `` | `` |  |
| `LicenseId` | `string` | `uuid` | `` |  |
| `LicenseStatus` | `integer` | `int32` | `` |  |
| `CompanyId` | `integer` | `int32` | `` |  |
| `CompanyTimezone` | `integer` | `int32` | `` |  |
| `CompanyCountry` | `string` | `` | `` |  |
| `Name` | `string` | `` | `` |  |
| `BirthDate` | `string` | `date-time` | `` |  |
| `Photo` | `string` | `` | `` |  |
| `CompanyName` | `string` | `` | `` |  |
| `Permissions` | `array<integer>` | `` | `` |  |
| `ExtraPermissions` | `array<integer>` | `` | `` |  |
| `UpdateList` | `boolean` | `` | `` |  |
| `UsersOffline` | `array<UserModel>` | `` | `#/definitions/UserModel` |  |
| `RequerChave` | `boolean` | `` | `` |  |
| `StatusEstado` | `string` | `` | `` |  |
| `FacialUrl` | `string` | `` | `` |  |
| `FacialUser` | `string` | `` | `` |  |
| `FacialPassword` | `string` | `` | `` |  |
| `Projects` | `array<ProjectModel>` | `` | `#/definitions/ProjectModel` |  |
| `LoginLicense` | `string` | `` | `` |  |
| `PasswordLicense` | `string` | `` | `` |  |
| `DocumentLicense` | `string` | `` | `` |  |
| `LoginMobile` | `string` | `` | `` |  |
| `PasswordMobile` | `string` | `` | `` |  |
| `ClientIDMobile` | `integer` | `int64` | `` |  |
| `ThresholdMobile` | `number` | `double` | `` |  |
| `StructPersonId` | `integer` | `int32` | `` |  |
| `PersonOff` | `boolean` | `` | `` |  |
| `FusoHorarioID` | `integer` | `int32` | `` |  |
| `HorarioVerao` | `boolean` | `` | `` |  |
| `InicioHorarioVerao` | `string` | `date-time` | `` |  |
| `FimHorarioVerao` | `string` | `date-time` | `` |  |
| `UtilizaVisica` | `boolean` | `` | `` |  |

## 2. IMUV — inventário completo

- Nome: API da IMUV.ME
- Última atualização declarada: `27/03/2026 11:57:14`
- Produção de exemplo: `https://demo.imuv.me/administrator/api/`
- Mock: `https://private-anon-c40c881afc-imuv.apiary-mock.com/administrator/api/`

**Total:** 89 operações em 26 recursos.

### 2.1 Matriz de operações

| Recurso | Método | Rota | Operação | Respostas declaradas |
|---|---|---|---|---|
| Autenticação | `POST` | `/auth/login` | Autenticação | 200 |
| Autenticação | `POST` | `/auth/recovery/request` | Recuperação de senha | 200 |
| Colaborador | `GET` | `/collaborator?id={id}&name={name}&gender={gender}&date_of_birth={date_of_birth}&marital_status={marital_status}&schooling={schooling}&naturalness={naturalness}&cpf_cnpj={cpf_cnpj}&rg_number={rg_number}&rg_shipping_date={rg_shipping_date}&rg_issuing_body={rg_issuing_body}&voter_title={voter_title}&pis={pis}&cnh_number={cnh_number}&expiry_cnh={expiry_cnh}&cnh_category={cnh_category}&passport={passport}&ctps_number={ctps_number}&serial_number_ctps={serial_number_ctps}&ctps_issue_date={ctps_issue_date}&email={email}&phone={phone}&secondary_phone={secondary_phone}&father_name={father_name}&mother_name={mother_name}&spouse_name={spouse_name}&address_zip_code={address_zip_code}&address_public_place={address_public_place}&address_number={address_number}&address_complement={address_complement}&address_neighborhood={address_neighborhood}&address_city={address_city}&image={image}&active={active}&created_by={created_by}&updated_by={updated_by}&created_at={created_at}&updated_at={updated_at}&company_name={company_name}&collaborator_type={collaborator_type}&user_id={user_id}&salary={salary}&admission_date={admission_date}&expedient_id={expedient_id}&department_id={department_id}&profession_id={profession_id}&job_level_id={job_level_id}&manager={manager}&hourly={hourly}&extra_hour_permission={extra_hour_permission}&extra_hour_rate={extra_hour_rate}&per-page={perpage}&page={page}` | Obter um ou vários colaboradores | 200 |
| Colaborador | `POST` | `/collaborator` | Incluir um colaborador | 200 |
| Colaborador | `PUT` | `/collaborator/{id}` | Alterar um colaborador | 200 |
| Colaborador | `DELETE` | `/collaborator/{id}` | Excluir um colaborador | 200 |
| Departamento | `GET` | `/department?id={id}&name={name}&active={active}&host={host}&username={username}&password={password}&port={port}&encryption={encryption}&id_card_status={id_card_status}&last_date_email={last_date_email}&port_smtp={port_smtp}&host_smtp={host_smtp}` | Obter um ou vários tipos de departamento | 200 |
| Departamento | `POST` | `/department` | Incluir um departamento | 200 |
| Departamento | `PUT` | `/department/{id}` | Alterar um departamento | 200 |
| Departamento | `DELETE` | `/department/{id}` | Excluir um departamento | 200 |
| Etapa do Fluxo de Trabalho | `GET` | `/card-status?id={id}&name={name}&id_pipeline={id_pipeline}&color={color}&color_text={color_text}&created_by={created_by}&updated_by={updated_by}&created_at={created_at}&updated_at={updated_at}&order={order}&stop_days_send_mail={stop_days_send_mail}&active={active}&per-page={perpage}&page={page}` | Obter uma ou várias etapas do fluxo de trabalho | 200 |
| Etapa do Fluxo de Trabalho | `POST` | `/card-status` | Incluir uma etapa do fluxo de trabalho | 200 |
| Etapa do Fluxo de Trabalho | `PUT` | `/card-status/{id}` | Alterar uma etapa do fluxo de trabalho | 200 |
| Etapa do Fluxo de Trabalho | `DELETE` | `/card-status/{id}` | Excluir um fluxo de trabalho | 200 |
| Fluxo de Trabalho | `GET` | `/workflow?id={id}&name={name}&active={active}&created_by={created_by}&updated_by={updated_by}&created_at={created_at}&updated_at={updated_at}&default={default}&relation={relation}&id_workflow_category={id_workflow_category}&template={template}&per-page={perpage}&page={page}&expand={expand}` | Obter um ou vários fluxos de trabalho | 200 |
| Fluxo de Trabalho | `POST` | `/workflow` | Incluir um fluxo de trabalho | 200 |
| Fluxo de Trabalho | `PUT` | `/workflow/{id}` | Alterar um fluxo de trabalho | 200 |
| Fluxo de Trabalho | `DELETE` | `/workflow/{id}` | Excluir um fluxo de trabalho | 200 |
| Kits | `GET` | `/kit?id={id}&name={name}&code={code}&sell_unit_as={sell_unit_as}&product_value_type={product_value_type}&active={active}` | Obter um ou vários kits | 200 |
| Layout Checklist | `GET` | `/layout_checklist?id={id}&name={name}&active={active}` | Obter um ou vários Layout Checklist | 200 |
| Layout Checklist | `POST` | `/layout_checklist` | Incluir um Layout Checklist | 200 |
| Layout Checklist | `PUT` | `/layout_checklist/{id}` | Alterar um Layout Checklist | 200 |
| Layout Checklist | `DELETE` | `/layout_checklist/{id}` | Excluir um Layout Checklist | 200 |
| Layout Checklist Group | `GET` | `/layout_checklist_group?id={id}&name={name}&active={active}&task_id={task_id}&description={description}&complete={complete}&comment={comment}` | Obter um ou vários Layout Checklist Group | 200 |
| Layout Checklist Group | `POST` | `/layout_checklist_group` | Incluir um Layout Checklist Group | 200 |
| Layout Checklist Group | `PUT` | `/layout_checklist_group/{id}` | Alterar um Layout Checklist Group | 200 |
| Layout Checklist Group | `DELETE` | `/layout_checklist_group/{id}` | Excluir um Layout Checklist Group | 200 |
| Layout Checklist Item | `GET` | `/layout_checklist_item?id={id}&name={name}&active={active}&id_task={id_task}&list_order={list_order}&id_task_checklist_item_workflow={id_task_checklist_item_workflow}&complete={complete}&description={description}&comment={comment}` | Obter um ou vários Layout Checklist Item | 200 |
| Layout Checklist Item | `POST` | `/layout_checklist` | Incluir um Layout Checklist Item | 200 |
| Layout Checklist Item | `PUT` | `/layout_checklist_item/{id}` | Alterar um Layout Checklist Item | 200 |
| Layout Checklist Item | `DELETE` | `/layout_checklist_item/{id}` | Excluir um Layout Checklist Item | 200 |
| Layout Checklist Item Workflow | `GET` | `/layout_checklist_item_workflow?id={id}&id_card_status_config={id_card_status_config}&id_required_in_card_status={id_required_in_card_status}&active={active}&list_order={list_order}&description={description}` | Obter um ou vários Layout Checklist Item Workflow | 200 |
| Layout Checklist Item Workflow | `POST` | `/layout_checklist` | Incluir um Layout Checklist Item | 200 |
| Layout Checklist Item Workflow | `PUT` | `/layout_checklist_item/{id}` | Alterar um Layout Checklist Item | 200 |
| Layout Checklist Item Workflow | `DELETE` | `/layout_checklist_item_workflow/{id}` | Excluir um Layout Checklist Item Workflow | 200 |
| Leads | `GET` | `/lead?id={id}&id_lead_source={id_lead_source}&cpf_cnpj={cpf_cnpj}&name={name}&email={email}&phone={phone}&website={website}&lead_value={lead_value}&thermometer={thermometer}&closing_forecast={closing_forecast}&leadCollaborators={leadCollaborators}&company={company}&converted={converted}&address_city={address_city}&address_state={address_state}&address_zip_code={address_zip_code}&address_public_place={address_public_place}&address_number={address_number}&address_complement={address_complement}&address_neighborhood={address_neighborhood}&description={description}&leadContacts={leadContacts}&active={active}&page={page}` | Obter um ou vários leads | 200 |
| Leads | `POST` | `/lead` | Incluir um lead | 200 |
| Leads | `PUT` | `/lead/{id}` | Alterar um lead | 200 |
| Leads | `DELETE` | `/lead/{id}` | Excluir um lead | 200 |
| Leads | `GET` | `/lead/{id}/pdf` | Obter o PDF da visualização do Lead | 200 |
| Locais de estoque | `GET` | `/warehouse?id={id}&type={type}&code={code}&production_order={production_order}&consumption_production_order={consumption_production_order}&shipping={shipping}&sale={sale}&people_id={people_id}&description={description}&active={active}` | Obter um ou vários locais de estoque | 200 |
| Locais de estoque | `POST` | `/warehouse` | Incluir um local de estoque | 200 |
| Locais de estoque | `PUT` | `/warehouse/{id}` | Alterar um local de estoque | 200 |
| Locais de estoque | `DELETE` | `/warehouse/{id}` | Excluir um local de estoque | 200 |
| Meios de Pagamento | `GET` | `/payment-mode?id={id}&code={code}&name={name}&active={active}` | Obter um ou vários meios de pagamento | 200 |
| Movimentos de estoque | `GET` | `/stock-movement?id={id}&type={type}&date={date}&quantity={quantity}&unitary_value={unitary_value}&warehouse_id={warehouse_id}&product_id={product_id}&warehouse_destination_id={warehouse_destination_id}&reason={reason}&observation={observation}&products={products}&active={active}` | Obter um ou vários movimentos de estoque | 200 |
| Movimentos de estoque | `POST` | `/stock-movement` | Incluir um movimento de estoque | 200 |
| Movimentos de estoque | `PUT` | `/stock-movement/{id}` | Alterar um movimento de estoque | 200 |
| Movimentos de estoque | `DELETE` | `/stock-movement/{id}` | Excluir um movimento de estoque | 200 |
| Ordens de Produção | `GET` | `/production-order{?id,value,project_id,warehouse_id,third_parties,status,active,sale_id,collaborator_id,produced_disp,initial_date_range,conclusion_date_range,conclusion_forecast_range,created_by,created_at,created_at_range,updated_by,updated_at,updated_at_range,per-page,page,sort,expand}&per-page={perpage}` | Listar ordens de produção | 200 |
| Ordens de Produção | `GET` | `/production-order/{id}{?expand}` | Obter uma ordem de produção | 200 |
| Ordens de Produção | `POST` | `/production-order` | Criar uma ordem de produção | 201 |
| Ordens de Produção | `PUT` | `/production-order/{id}` | Alterar uma ordem de produção | 200 |
| Ordens de Produção | `GET` | `/production-order/{id}/pdf` | Obter o PDF da visualização da Ordem de Produção | 200 |
| Pessoas | `GET` | `/people?id={id}&cpf_cnpj={cpf_cnpj}&name={name}&email={email}&phone={phone}&secundary_phone={secundary_phone}&website={website}&state_registration={state_registration}&municipal_registration={municipal_registration}&tax_payer={tax_payer}&credit_limit={credit_limit}&company_name={company_name}&observation={observation}&peopleCollaborators={peopleCollaborators}&peopleContacts={peopleContacts}&address_city={address_city}&address_state={address_state}&address_zip_code={address_zip_code}&address_public_place={address_public_place}&address_number={address_number}&address_complement={address_complement}&address_neighborhood={address_neighborhood}&address_delivery_city={address_delivery_city}&address_delivery_state={address_delivery_state}&address_delivery_zip_code={address_delivery_zip_code}&address_delivery_public_place={address_delivery_public_place}&address_delivery_number={address_delivery_number}&address_delivery_complement={address_delivery_complement}&address_delivery_neighborhood={address_delivery_neighborhood}&active={active}` | Obter uma ou várias pessoas | 200 |
| Pessoas | `POST` | `/people` | Incluir uma pessoa | 200 |
| Pessoas | `PUT` | `/people/{id}` | Alterar uma pessoa | 200 |
| Pessoas | `DELETE` | `/people/{id}` | Excluir uma pessoa | 200 |
| Prazos de Pagamento | `GET` | `/payment-term?id={id}&code={code}&name={name}&active={active}` | Obter um ou vários prazos de pagamento | 200 |
| Produtos | `GET` | `/product?id={id}&value={value}&name={name}&code={code}&ncm_code={ncm_code}&ean_code={ean_code}&stock={stock}&unit_of_measurement={unit_of_measurement}&weight={weight}&width={width}&height={height}&length={length}&productPeoples={productPeoples}&id_brand={id_brand}&id_category_product={id_category_product}&id_family_product={id_family_product}&discount_type={discount_type}&maximum_discount={maximum_discount}&information={information}&observation={observation}&image={image}&active={active}` | Obter um ou vários produtos | 200 |
| Produtos | `POST` | `/product` | Incluir um produto | 200 |
| Produtos | `PUT` | `/product/{id}` | Alterar um produto | 200 |
| Produtos | `DELETE` | `/product/{id}` | Excluir um produto | 200 |
| Projetos | `GET` | `/project{?id,code,name,people_id,type,status,progress,progress_from_tasks,budget,profit,administration,operational_cost,expense_forecast,start_date,start_date_range,deadline,deadline_range,date_finished,date_finished_range,members_disp,tags,workflow,address,active,created_by,created_at,updated_by,updated_at,page,sort,expand}&per-page={perpage` | Listar projetos | 200 |
| Projetos | `GET` | `/project/{id}{?expand}` | Obter um projeto | 200 |
| Projetos | `POST` | `/project` | Criar um projeto | 201 |
| Projetos | `PUT` | `/project/{id}` | Alterar um projeto | 200 |
| Projetos | `DELETE` | `/project/{id}` | Excluir um projeto | 204 |
| Serviços | `GET` | `/service?id={id}&value={value}&name={name}&code={code}&service_code_cnae={service_code_cnae}&service_code_lc116={service_code_lc116}&taxation_of_service={taxation_of_service}&id_service_category={id_service_category}&discount_type={discount_type}&maximum_discount={maximum_discount}&information={information}&observation={observation}&image={image}&active={active}` | Obter um ou vários serviços | 200 |
| Serviços | `POST` | `/service` | Incluir um serviço | 200 |
| Serviços | `PUT` | `/service/{id}` | Alterar um serviço | 200 |
| Serviços | `DELETE` | `/service/{id}` | Excluir um serviço | 200 |
| Tabelas de Preço | `GET` | `/price-list?id={id}&name={name}&code={code}&type={type}&default={default}&maximum_discount={maximum_discount}&suggested_discount={suggested_discount}&percentage={percentage}&start_date={start_date}&product_ncm_code={product_ncm_code}&due_date={due_date}&client_id_state={client_id_state}&product_id_family={product_id_family}&client_tag={client_tag}&product_id_provider={product_id_provider}&active={active}` | Obter uma ou várias tabelas de preço | 200 |
| Tarefas | `GET` | `/task?id={id}&name={name}&hourly_rate={hourly_rate}&start_date_range={start_date_range}&due_date_range={due_date_range}&priority={priority}&department_id={department_id}&collaborator_disp={collaborator_disp}&follower_disp={follower_disp}&status={status}&public={public}&description={description}&observation={observation}&date_finished_range={date_finished_range}&budget={budget}&bill_value={bill_value}&billing_type={billing_type}&type={type}&active={active}&weight={weight}&subscription_id={subscription_id}&main_task_id={main_task_id}&related_task={related_task}&workflow={workflow}&related_to={related_to}&related_id={related_id}&created_by={created_by}&created_at_range={created_at_range}&updated_by={updated_by}&updated_at_range={updated_at_range}&per-page={perpage}&page={page}&sort={sort}&expand={expand}` | Listar tarefas | 200 |
| Tarefas | `GET` | `/task/{id}{?expand}` | Obter uma tarefa | 200 |
| Tarefas | `POST` | `/task` | Incluir uma Tarefa | 200 |
| Tarefas | `PUT` | `/task/{id}` | Alterar uma tarefa | 200 |
| Tarefas | `DELETE` | `/task/{id}` | Excluir uma tarefa | 200 |
| Tarefas Pessoais | `GET` | `/todo?id={id}&complete={complete}&active={active}&description={description}&due_date={due_date}&due_time={due_time}` | Obter uma ou várias Tarefas Pessoais | 200 |
| Tarefas Pessoais | `POST` | `/todo` | Incluir uma tarefa pessoal | 200 |
| Tarefas Pessoais | `PUT` | `/todo/{id}` | Alterar uma tarefa pessoal | 200 |
| Tarefas Pessoais | `DELETE` | `/todo/{id}` | Excluir uma tarefa pessoal | 200 |
| Tipos de Documento | `GET` | `/bill-doc-type?id={id}&code={code}&description={description}&active={active}` | Obter um ou vários tipos de documentos | 200 |
| Tributação de Serviços | `GET` | `/service-tax?id={id}&name={name}&code={code}&active={active}` | Obter uma ou várias tributações de serviços | 200 |
| Vendas | `GET` | `/sale?id={id}&type={type}&id_buyer={id_buyer}&opening_date={opening_date}&forecast_closing_date={forecast_closing_date}&status={status}&active={active}&created_by={created_by}&updated_by={updated_by}&created_at={created_at}&updated_at={updated_at}&admin_note={admin_note}&nf_informations={nf_informations}&terms={terms}&email={email}&freight={freight}&id_payment_term={id_payment_term}&payment_gateway={payment_gateway}&freight_type={freight_type}&discount={discount}&discount_type={discount_type}&number_of_installments={number_of_installments}&invoice_for_final_consumption={invoice_for_final_consumption}&id_price_list={id_price_list}&subject={subject}&task_id={task_id}&merged_sale_id={merged_sale_id}&id_document_type={id_document_type}&due_date={due_date}&review={review}&lost_reason_id={lost_reason_id}&expedition={expedition}&warehouse_id={warehouse_id}&id_project={id_project}&request_number={request_number}&contract_number={contract_number}&delivery_date={delivery_date}&shipping_company={shipping_company}&volume_quantity={volume_quantity}&volume_type={volume_type}&days_to_delivery={days_to_delivery}&net_weight={net_weight}&gross_weight={gross_weight}&volume_mark={volume_mark}&volume_number={volume_number}&seal_number={seal_number}&tracking_code={tracking_code}&vehicle_plate={vehicle_plate}&vehicle_plate_state={vehicle_plate_state}&record_carrier={record_carrier}&safe_value={safe_value}&other_expenses={other_expenses}&subscription_id={subscription_id}&billed_from={billed_from}&total_pis={total_pis}&total_cofins={total_cofins}&total_icms={total_icms}&total_icms_st={total_icms_st}&total_ipi={total_ipi}&id_buyer_contact={id_buyer_contact}&total_pis_st={total_pis_st}&total_fcp_st={total_fcp_st}&total_cofins_st={total_cofins_st}&total={total}&id_address_buyer={id_address_buyer}&id_tax_scenario={id_tax_scenario}&code={code}&asset_rental_departure_date={asset_rental_departure_date}&asset_rental_expected_return_date={asset_rental_expected_return_date}&asset_rental_id={asset_rental_id}&asset_rental_service_id={asset_rental_service_id}&remaining_invoice={remaining_invoice}&per-page={perpage}&page={page}&expand={expand}` | Obter uma ou várias vendas | 200 |
| Vendas | `POST` | `/sale` | Incluir uma venda | 200 |
| Vendas | `PUT` | `/sale/{id}` | Alterar uma venda | 200 |
| Vendas | `DELETE` | `/sale/{id}` | Excluir uma venda | 200 |
| Vendas | `GET` | `/sale/{id}/pdf` | Obter o PDF da visualização da Venda | 200 |

### 2.2 Detalhamento de cada recurso e operação

#### Autenticação

<p>Para ter acesso a API, cada ambiente possui uma chave de acesso da API (auth_key) em cada usuário. Para obter essa chave de acesso da API (auth_key) deve-se realizar a autentição como demonstra abaixo.</p>
<p>Após obter sua chave de acesso da API (auth_key), para acessar e obter resultados de cada recursos deve-se passar sua chave de acesso da API (auth_key) como parâmetro de autenticação na requisição.</p>

##### `POST /auth/login` — Autenticação

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Content-Type": "application/json"
}
````

Corpo da requisição:

````json
{
    "email": "imuv@imuv.me",
    "password": "imuv"
}
````

Schema da requisição:

````json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string"
    }
  },
  "required": [
    "email",
    "password"
  ]
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
  "success": true,
  "username": "imuv",
  "email": "imuv@imuv.me",
  "auth_key": "123456789abcdefghijklmnopqrstuvwxyz"
}
````

##### `POST /auth/recovery/request` — Recuperação de senha

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Content-Type": "application/json"
}
````

Corpo da requisição:

````json
{
    "email": "imuv@imuv.me"
}
````

Schema da requisição:

````json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    }
  },
  "required": [
    "email"
  ]
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
  "success": true
}
````

#### Colaborador

##### `GET /collaborator?id={id}&name={name}&gender={gender}&date_of_birth={date_of_birth}&marital_status={marital_status}&schooling={schooling}&naturalness={naturalness}&cpf_cnpj={cpf_cnpj}&rg_number={rg_number}&rg_shipping_date={rg_shipping_date}&rg_issuing_body={rg_issuing_body}&voter_title={voter_title}&pis={pis}&cnh_number={cnh_number}&expiry_cnh={expiry_cnh}&cnh_category={cnh_category}&passport={passport}&ctps_number={ctps_number}&serial_number_ctps={serial_number_ctps}&ctps_issue_date={ctps_issue_date}&email={email}&phone={phone}&secondary_phone={secondary_phone}&father_name={father_name}&mother_name={mother_name}&spouse_name={spouse_name}&address_zip_code={address_zip_code}&address_public_place={address_public_place}&address_number={address_number}&address_complement={address_complement}&address_neighborhood={address_neighborhood}&address_city={address_city}&image={image}&active={active}&created_by={created_by}&updated_by={updated_by}&created_at={created_at}&updated_at={updated_at}&company_name={company_name}&collaborator_type={collaborator_type}&user_id={user_id}&salary={salary}&admission_date={admission_date}&expedient_id={expedient_id}&department_id={department_id}&profession_id={profession_id}&job_level_id={job_level_id}&manager={manager}&hourly={hourly}&extra_hour_permission={extra_hour_permission}&extra_hour_rate={extra_hour_rate}&per-page={perpage}&page={page}` — Obter um ou vários colaboradores

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno.</p><br> |
| `` |  | não | `string` | `` | <p>Nome.</p><br> |
| `` |  | não | `enum` | `` | <p>Gênero/Sexo.</p><br><ul><br><li><br><p>1 (number) - Homem</p><br></li><br><li><br><p>2 (number) - Mulher</p><br></li><br><li><br><p>3 (number) - Outro(a)</p><br></li><br></ul><br> |
| `` |  | não | `string` | `` | <p>Data de nascimento (AAAA-MM-DD).</p><br> |
| `` |  | não | `enum` | `` | <p>Estado civil.</p><br><ul><br><li><br><p>1 (number) - Solteiro(a)</p><br></li><br><li><br><p>2 (number) - Casado(a)</p><br></li><br><li><br><p>3 (number) - Viúvo(a)</p><br></li><br><li><br><p>4 (number) - Divorciado(a)</p><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Escolaridade.</p><br><ul><br><li><br><p>1 (number) - Ensino fundamental incompleto</p><br></li><br><li><br><p>2 (number) - Ensino fundamental completo</p><br></li><br><li><br><p>3 (number) - Ensino médio incompleto</p><br></li><br><li><br><p>4 (number) - Ensino médio completo</p><br></li><br><li><br><p>5 (number) - Graduação incompleta</p><br></li><br><li><br><p>6 (number) - Graduação completa</p><br></li><br><li><br><p>7 (number) - Pós graduação incompleta</p><br></li><br><li><br><p>8 (number) - Pós graduação completa</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Cidade de naturalidade (Código do município).</p><br> |
| `` |  | não | `number` | `` | <p>CPF/CNPJ.</p><br> |
| `` |  | não | `number` | `` | <p>Número do RG.</p><br> |
| `` |  | não | `string` | `` | <p>Data de expedição do RG (AAAA-MM-DD).</p><br> |
| `` |  | não | `string` | `` | <p>Órgão expedidor do RG.</p><br> |
| `` |  | não | `number` | `` | <p>Título de eleitor.</p><br> |
| `` |  | não | `number` | `` | <p>PIS.</p><br> |
| `` |  | não | `number` | `` | <p>Número da CNH.</p><br> |
| `` |  | não | `string` | `` | <p>Validade da CNH (AAAA-MM-DD).</p><br> |
| `` |  | não | `string` | `` | <p>Categoria da CNH.</p><br> |
| `` |  | não | `number` | `` | <p>Passaporte.</p><br> |
| `` |  | não | `number` | `` | <p>Número da CTPS.</p><br> |
| `` |  | não | `number` | `` | <p>Número de série da CTPS.</p><br> |
| `` |  | não | `string` | `` | <p>Data de emissão da CTPS (AAAA-MM-DD).</p><br> |
| `` |  | sim | `string` | `` | <p>Email.</p><br> |
| `` |  | não | `string` | `` | <p>Telefone.</p><br> |
| `` |  | não | `string` | `` | <p>Telefone secundário.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do pai.</p><br> |
| `` |  | não | `string` | `` | <p>Nome da mãe.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do cônjuge.</p><br> |
| `` |  | não | `number` | `` | <p>CEP.</p><br> |
| `` |  | não | `string` | `` | <p>Logradouro.</p><br> |
| `` |  | não | `string` | `` | <p>Número do endereço.</p><br> |
| `` |  | não | `string` | `` | <p>Complemento.</p><br> |
| `` |  | não | `string` | `` | <p>Bairro.</p><br> |
| `` |  | não | `string` | `` | <p>Cidade.</p><br> |
| `` |  | não | `string` | `` | <p>Imagem.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Código identificador do usuário que criou o colaborador.</p><br> |
| `` |  | não | `number` | `` | <p>Código identificador do último usuário que atualizou o colaborador.</p><br> |
| `` |  | não | `number` | `` | <p>Data de criação.</p><br> |
| `` |  | não | `number` | `` | <p>Data de atualização.</p><br> |
| `` |  | não | `string` | `` | <p>Razão social.</p><br> |
| `` |  | não | `enum` | `` | <p>Tipo do colaborador.</p><br><ul><br><li><br><p>1 (number) - Vendedor</p><br></li><br><li><br><p>2 (number) - Comprador</p><br></li><br><li><br><p>3 (number) - Vendedor e Comprador</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Código identificador do usuário do colaborador.</p><br> |
| `` |  | não | `number` | `` | <p>Salário.</p><br> |
| `` |  | não | `string` | `` | <p>Data de admissão (AAAA-MM-DD).</p><br> |
| `` |  | não | `number` | `` | <p>Código identificador do expediente.</p><br> |
| `` |  | não | `number` | `` | <p>Código identificador do departamento.</p><br> |
| `` |  | não | `number` | `` | <p>Código identificador da profissão.</p><br> |
| `` |  | não | `number` | `` | <p>Código identificador da função.</p><br> |
| `` |  | não | `number` | `` | <p>Indica se é gerente ou não.</p><br><ul><br><li><br><p>0 (number) - Não</p><br></li><br><li><br><p>1 (number) - Sim</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Indica se é horista ou não.</p><br><ul><br><li><br><p>0 (number) - Não</p><br></li><br><li><br><p>1 (number) - Sim</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Indica se tem permissão para hora extra ou não.</p><br><ul><br><li><br><p>0 (number) - Não</p><br></li><br><li><br><p>1 (number) - Sim</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Valor por hora extra.</p><br> |
| `` |  | sim | `string` | `` | <p>page (number, optional) - Quantidade de registros por requisição.</p><br> |
| `` |  | não | `number` | `` | <p>Número da página.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "Noah Yuri Mendes",
    "gender": 1,
    "date_of_birth": "2000-12-01",
    "marital_status": 1,
    "schooling": 1,
    "naturalness": 2700102,
    "cpf_cnpj": 66845342962,
    "rg_number": "292415126",
    "rg_shipping_date": "2020-12-01",
    "rg_issuing_body": "SSP",
    "voter_title": 51551561115,
    "pis": 156156154611,
    "cnh_number": 2782372737,
    "expiry_cnh": "2030-12-31",
    "cnh_category": "B",
    "passport": 5555555,
    "ctps_number": 2277378387,
    "serial_number_ctps": 78387373783,
    "ctps_issue_date": "2020-12-01",
    "email": "noah.yuri.mendes@pss.adv.br",
    "phone": 41991184016,
    "secondary_phone": 4128744759,
    "father_name": "Ruan Pietro André Mendes",
    "mother_name": "Laís Tereza Francisca",
    "spouse_name": "Isabel Pereira Antunês",
    "address_zip_code": null,
    "address_public_place": "",
    "address_number": "",
    "address_complement": "",
    "address_neighborhood": "",
    "address_city": null,
    "image": null,
    "active": 1,
    "created_by": 23,
    "updated_by": 23,
    "created_at": "2025-06-11 17:17:04",
    "updated_at": "2025-12-10 08:19:39",
    "company_name": "Noah LTDA",
    "collaborator_type": 1,
    "user_id": null,
    "salary": 2000,
    "admission_date": "2025-12-01",
    "expedient_id": 1,
    "department_id": 1,
    "profession_id": 1,
    "job_level_id": 1,
    "manager": 0,
    "hourly": 0,
    "extra_hour_permission": 0,
    "extra_hour_rate": null,
    "custom_field": null
},
````

##### `POST /collaborator` — Incluir um colaborador

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "name": "Noah Yuri Mendes",
    "gender": 1,
    "date_of_birth": "2000-12-01",
    "marital_status": 1,
    "schooling": 1,
    "naturalness": 2700102,
    "cpf_cnpj": 66845342962,
    "rg_number": "292415126",
    "rg_shipping_date": "2020-12-01",
    "rg_issuing_body": "SSP",
    "voter_title": 51551561115,
    "pis": 156156154611,
    "cnh_number": 2782372737,
    "expiry_cnh": "2030-12-31",
    "cnh_category": "B",
    "passport": 5555555,
    "ctps_number": 2277378387,
    "serial_number_ctps": 78387373783,
    "ctps_issue_date": "2020-12-01",
    "email": "noah.yuri.mendes@pss.adv.br",
    "phone": 41991184016,
    "secondary_phone": 4128744759,
    "father_name": "Ruan Pietro André Mendes",
    "mother_name": "Laís Tereza Francisca",
    "spouse_name": "Isabel Pereira Antunês",
    "address_zip_code": null,
    "address_public_place": "",
    "address_number": "",
    "address_complement": "",
    "address_neighborhood": "",
    "address_city": null,
    "image": null,
    "active": 1,
    "created_by": 23,
    "updated_by": 23,
    "created_at": "2025-06-11 17:17:04",
    "updated_at": "2025-12-10 08:19:39",
    "company_name": "Noah LTDA",
    "collaborator_type": 1,
    "user_id": null,
    "salary": 2000,
    "admission_date": "2025-12-01",
    "expedient_id": 1,
    "department_id": 1,
    "profession_id": 1,
    "job_level_id": 1,
    "manager": 0,
    "hourly": 0,
    "extra_hour_permission": 0,
    "extra_hour_rate": null,
    "custom_field": null
},
````

##### `PUT /collaborator/{id}` — Alterar um colaborador

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do colaborador.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "name": "Noah Yuri Mendes",
    "gender": 1,
    "date_of_birth": "2000-12-01",
    "marital_status": 1,
    "schooling": 1,
    "naturalness": 2700102,
    "cpf_cnpj": 66845342962,
    "rg_number": "292415126",
    "rg_shipping_date": "2020-12-01",
    "rg_issuing_body": "SSP",
    "voter_title": 51551561115,
    "pis": 156156154611,
    "cnh_number": 2782372737,
    "expiry_cnh": "2030-12-31",
    "cnh_category": "B",
    "passport": 5555555,
    "ctps_number": 2277378387,
    "serial_number_ctps": 78387373783,
    "ctps_issue_date": "2020-12-01",
    "email": "noah.yuri.mendes@pss.adv.br",
    "phone": 41991184016,
    "secondary_phone": 4128744759,
    "father_name": "Ruan Pietro André Mendes",
    "mother_name": "Laís Tereza Francisca",
    "spouse_name": "Isabel Pereira Antunês",
    "address_zip_code": null,
    "address_public_place": "",
    "address_number": "",
    "address_complement": "",
    "address_neighborhood": "",
    "address_city": null,
    "image": null,
    "active": 1,
    "created_by": 23,
    "updated_by": 23,
    "created_at": "2025-06-11 17:17:04",
    "updated_at": "2025-12-10 08:19:39",
    "company_name": "Noah LTDA",
    "collaborator_type": 1,
    "user_id": null,
    "salary": 2000,
    "admission_date": "2025-12-01",
    "expedient_id": 1,
    "department_id": 1,
    "profession_id": 1,
    "job_level_id": 1,
    "manager": 0,
    "hourly": 0,
    "extra_hour_permission": 0,
    "extra_hour_rate": null,
    "custom_field": null
},
````

##### `DELETE /collaborator/{id}` — Excluir um colaborador

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do colaborador.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Departamento

##### `GET /department?id={id}&name={name}&active={active}&host={host}&username={username}&password={password}&port={port}&encryption={encryption}&id_card_status={id_card_status}&last_date_email={last_date_email}&port_smtp={port_smtp}&host_smtp={host_smtp}` — Obter um ou vários tipos de departamento

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do departamento.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do departamento.</p><br> |
| `` |  | não | `string` | `` | <p>Hospedagem IMAP.</p><br> |
| `` |  | não | `string` | `` | <p>Usuário IMAP - E-mail.</p><br> |
| `` |  | não | `string` | `` | <p>Senha.</p><br> |
| `` |  | não | `number` | `` | <p>Número da porta de conexão com o email.</p><br> |
| `` |  | não | `string` | `` | <p>Criptografia.</p><br><ul><br><li><br><p>ssl (string) - SSL</p><br></li><br><li><br><p>tsl (string) - TLS</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do Fluxo de Trabalho.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o departamento está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "Financeiro",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
    "host": "127.1.0.1",
    "username": "genilton.ferreira@mapa.srv.br",
    "password": "123456",
    "port": 5,
    "encryption": "ssl",
    "id_card_status": 194,
    "last_date_email": null,
    "port_smtp": 49169,
    "host_smtp": ""
}
````

##### `POST /department` — Incluir um departamento

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "name": "Financeiro",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
    "host": "127.1.0.1",
    "username": "genilton.ferreira@mapa.srv.br",
    "password": "123456",
    "port": 5,
    "encryption": "ssl",
    "id_card_status": 194,
    "last_date_email": null,
    "port_smtp": 49169,
    "host_smtp": ""
}
````

##### `PUT /department/{id}` — Alterar um departamento

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do departamento.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "name": "Financeiro",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
    "host": "127.1.0.1",
    "username": "genilton.ferreira@mapa.srv.br",
    "password": "123456",
    "port": 5,
    "encryption": "ssl",
    "id_card_status": 194,
    "last_date_email": null,
    "port_smtp": 49169,
    "host_smtp": ""
}
````

##### `DELETE /department/{id}` — Excluir um departamento

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do departamento.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Etapa do Fluxo de Trabalho

##### `GET /card-status?id={id}&name={name}&id_pipeline={id_pipeline}&color={color}&color_text={color_text}&created_by={created_by}&updated_by={updated_by}&created_at={created_at}&updated_at={updated_at}&order={order}&stop_days_send_mail={stop_days_send_mail}&active={active}&per-page={perpage}&page={page}` — Obter uma ou várias etapas do fluxo de trabalho

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno da etapa do fluxo de trabalho.</p><br> |
| `` |  | sim | `string` | `` | <p>Nome da etapa.</p><br> |
| `` |  | sim | `number` | `` | <p>Identificador interno do fluxo de trabalho.</p><br> |
| `` |  | não | `string` | `` | <p>Código HEX da cor da etapa.</p><br> |
| `` |  | não | `string` | `` | <p>Código HEX da cor do texto da etapa.</p><br> |
| `` |  | não | `number` | `` | <p>Código identificador do usuário que criou o fluxo.</p><br> |
| `` |  | não | `number` | `` | <p>Código identificador do último usuário que atualizou o fluxo.</p><br> |
| `` |  | não | `number` | `` | <p>Data de criação.</p><br> |
| `` |  | não | `number` | `` | <p>Data da última atualização.</p><br> |
| `` |  | não | `number` | `` | <p>Número sequencial correspondente a ordem da etapa.</p><br> |
| `` |  | não | `number` | `` | <p>Dias parados para enviar email Lead.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se a etapa do fluxo está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |
| `` |  | sim | `string` | `` | <p>page (number, optional) - Quantidade de registros por requisição.</p><br> |
| `` |  | não | `number` | `` | <p>Número da página.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 268,
    "name": "A fazer",
    "id_pipeline": 1036,
    "color": "#00ff00",
    "color_text": "#4a86e8",
    "created_by": 4,
    "updated_by": 4,
    "created_at": "2025-05-06 14:33:19",
    "updated_at": "2025-05-06 14:33:19",
    "order": 1,
    "stop_days_send_mail": 0,
    "active": 1
}
````

##### `POST /card-status` — Incluir uma etapa do fluxo de trabalho

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 268,
    "name": "A fazer",
    "id_pipeline": 1036,
    "color": "#00ff00",
    "color_text": "#4a86e8",
    "created_by": 4,
    "updated_by": 4,
    "created_at": "2025-05-06 14:33:19",
    "updated_at": "2025-05-06 14:33:19",
    "order": 1,
    "stop_days_send_mail": 0,
    "active": 1
}
````

##### `PUT /card-status/{id}` — Alterar uma etapa do fluxo de trabalho

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da etapa do fluxo de trabalho.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 268,
    "name": "A fazer",
    "id_pipeline": 1036,
    "color": "#00ff00",
    "color_text": "#4a86e8",
    "created_by": 4,
    "updated_by": 4,
    "created_at": "2025-05-06 14:33:19",
    "updated_at": "2025-05-06 14:33:19",
    "order": 1,
    "stop_days_send_mail": 0,
    "active": 1
}
````

##### `DELETE /card-status/{id}` — Excluir um fluxo de trabalho

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da etapa do fluxo de trabalho.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Fluxo de Trabalho

##### `GET /workflow?id={id}&name={name}&active={active}&created_by={created_by}&updated_by={updated_by}&created_at={created_at}&updated_at={updated_at}&default={default}&relation={relation}&id_workflow_category={id_workflow_category}&template={template}&per-page={perpage}&page={page}&expand={expand}` — Obter um ou vários fluxos de trabalho

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno.</p><br> |
| `` |  | sim | `array` | `` | <p>Nome.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o fluxo está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Código identificador do usuário que criou o fluxo.</p><br> |
| `` |  | não | `number` | `` | <p>Código identificador do último usuário que atualizou o fluxo.</p><br> |
| `` |  | não | `number` | `` | <p>Data de criação.</p><br> |
| `` |  | não | `number` | `` | <p>Data da última atualização.</p><br> |
| `` |  | não | `number` | `` | <p>Indica se é padrão ou não.</p><br><ul><br><li><br><p>0 (number) - Não</p><br></li><br><li><br><p>1 (number) - Sim</p><br></li><br></ul><br> |
| `` |  | sim | `string` | `` | <p>Nome/classe da relação do fluxo.</p><br><ul><br><li><br><p>&quot;app\modules\administrator\models\Expedition&quot; (string) - Expedição</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\Expense&quot; (string) - Despesa</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\Lead&quot; (string) - Lead</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\ProductionOrder&quot; (string) - Ordem de produção</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\Project&quot; (string) - Projeto</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\Purchase&quot; (string) - Requisição de compra</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\PurchaseOrder&quot; (string) - Pedido de compra</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\Revenue&quot; (string) - Receita</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\Sale&quot; (string) - Venda</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\Support&quot; (string) - Suporte</p><br></li><br><li><br><p>&quot;app\modules\administrator\models\Task&quot; (string) - Tarefa</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Identificador da categoria do fluxo.</p><br> |
| `` |  | não | `number` | `` | <p>Indica se é um modelo de fluxo ou não.</p><br><ul><br><li><br><p>0 (number) - Não</p><br></li><br><li><br><p>1 (number) - Sim</p><br></li><br></ul><br> |
| `` |  | sim | `string` | `` | <p>page (number, optional) - Quantidade de registros por requisição.</p><br> |
| `` |  | não | `number` | `` | <p>Número da página.</p><br> |
| `` |  | não | `string` | `` | <p>Expande registros com relações.</p><br><ul><br><li><code>cardStatuses</code> - Etapas do fluxo de trabalho.</li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "Contas a receber",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 10:53:30",
    "updated_at": "2021-12-13 10:53:30",
    "default": 0,
    "relation": "app\\modules\\administrator\\models\\Revenue",
    "id_workflow_category": null,
    "template": 0,
    "cardStatuses": [
      {
        "id": 1,
        "name": "Agendar o recebimento",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      },
      {
        "id": 2,
        "name": "Recebimento pendentes",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      },
      {
        "id": 3,
        "name": "Receber fatura",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      },
      {
        "id": 4,
        "name": "Pagamentos confirmados",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      }
    ]
  }
````

##### `POST /workflow` — Incluir um fluxo de trabalho

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "name": "Contas a receber",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 10:53:30",
    "updated_at": "2021-12-13 10:53:30",
    "default": 0,
    "relation": "app\\modules\\administrator\\models\\Revenue",
    "id_workflow_category": null,
    "template": 0,
    "cardStatuses": [
      {
        "id": 1,
        "name": "Agendar o recebimento",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      },
      {
        "id": 2,
        "name": "Recebimento pendentes",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      },
      {
        "id": 3,
        "name": "Receber fatura",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      },
      {
        "id": 4,
        "name": "Pagamentos confirmados",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      }
    ]
  }
````

##### `PUT /workflow/{id}` — Alterar um fluxo de trabalho

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do fluxo.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "name": "Contas a receber",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 10:53:30",
    "updated_at": "2021-12-13 10:53:30",
    "default": 0,
    "relation": "app\\modules\\administrator\\models\\Revenue",
    "id_workflow_category": null,
    "template": 0,
    "cardStatuses": [
      {
        "id": 1,
        "name": "Agendar o recebimento",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      },
      {
        "id": 2,
        "name": "Recebimento pendentes",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      },
      {
        "id": 3,
        "name": "Receber fatura",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      },
      {
        "id": 4,
        "name": "Pagamentos confirmados",
        "id_pipeline": 1,
        "color": null,
        "color_text": null,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-12-13 10:53:30",
        "updated_at": "2021-12-13 10:53:30",
        "order": null,
        "stop_days_send_mail": 0,
        "active": 1
      }
    ]
  }
````

##### `DELETE /workflow/{id}` — Excluir um fluxo de trabalho

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do fluxo de trabalho.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Kits

##### `GET /kit?id={id}&name={name}&code={code}&sell_unit_as={sell_unit_as}&product_value_type={product_value_type}&active={active}` — Obter um ou vários kits

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do kit.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do kit.</p><br> |
| `` |  | não | `string` | `` | <p>Código do kit.</p><br> |
| `` |  | não | `enum` | `` | <p>Forma do produto do kit a ser vendido.</p><br><ul><br><li><br><p>0 (number) - Vendido somente inteiro.</p><br></li><br><li><br><p>1 (number) - Pode ser vendido fracionado.</p><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Qual valor do produto do kit deve ser usado.</p><br><ul><br><li><br><p>0 (number) - Valor original do produto.</p><br></li><br><li><br><p>1 (number) - Valor cadastrado no kit.</p><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Indica se o kit está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "Kit de integração",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-09-23 16:34:12",
    "updated_at": "2021-09-23 16:34:12",
    "code": "KIT623",
    "sell_unit_as": 0,
    "product_value_type": 0,
    "kitProducts": [
        {
            "id": 1,
            "id_kit": 1,
            "id_product": 4,
            "quantity": 12,
            "unitary_value": 69,
            "active": 1,
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2021-09-23 16:34:12",
            "updated_at": "2021-09-23 16:34:12"
        },
        {
            "id": 2,
            "id_kit": 1,
            "id_product": 9,
            "quantity": 12,
            "unitary_value": 10,
            "active": 1,
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2021-09-23 16:34:12",
            "updated_at": "2021-09-23 16:34:12"
        }
    ]
}
````

#### Layout Checklist

##### `GET /layout_checklist?id={id}&name={name}&active={active}` — Obter um ou vários Layout Checklist

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do Layout Checklist.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do Layout Checklist.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o Layout Checklist está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "Financeiro",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58"
}
````

##### `POST /layout_checklist` — Incluir um Layout Checklist

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "Financeiro",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `PUT /layout_checklist/{id}` — Alterar um Layout Checklist

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do Layout Checklist.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "Financeiro",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `DELETE /layout_checklist/{id}` — Excluir um Layout Checklist

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do Layout Checklist.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Layout Checklist Group

##### `GET /layout_checklist_group?id={id}&name={name}&active={active}&task_id={task_id}&description={description}&complete={complete}&comment={comment}` — Obter um ou vários Layout Checklist Group

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do Layout Checklist Group.</p><br> |
| `` |  | sim | `number` | `` | <p>Identificador Interno da Tarefa que referência.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o Layout Checklist Group está completo ou não.</p><br><ul><br><li><br><p>0 (number) - Incompleto (padrão)</p><br></li><br><li><br><p>1 (number) - Completo</p><br></li><br></ul><br> |
| `` |  | sim | `string` | `` | <p>Nome do Layout Checklist Group.</p><br> |
| `` |  | sim | `string` | `` | <p>Comentário do Layout Checklist Group (Máximo 255 caracteres).</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o Layout Checklist Group está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "task_id": 1,
    "complete": 1,
    "name": "Despesas e Receitas injetadas",
    "comment": "",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `POST /layout_checklist_group` — Incluir um Layout Checklist Group

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "task_id": 1,
    "complete": 1,
    "name": "Despesas e Receitas injetadas",
    "comment": "",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `PUT /layout_checklist_group/{id}` — Alterar um Layout Checklist Group

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do Layout Checklist Group.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "task_id": 1,
    "complete": 1,
    "name": "Despesas e Receitas injetadas",
    "comment": "",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `DELETE /layout_checklist_group/{id}` — Excluir um Layout Checklist Group

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do Layout Checklist Group.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Layout Checklist Item

##### `GET /layout_checklist_item?id={id}&name={name}&active={active}&id_task={id_task}&list_order={list_order}&id_task_checklist_item_workflow={id_task_checklist_item_workflow}&complete={complete}&description={description}&comment={comment}` — Obter um ou vários Layout Checklist Item

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do Layout Checklist Item.</p><br> |
| `` |  | sim | `integer` | `` | <p>Identificador Interno da Tarefa que referência.</p><br> |
| `` |  | sim | `integer` | `` | <p>Posição na visualização.</p><br> |
| `` |  | não | `integer` | `` | <p>Identificador interno de Tarefa Checklist Item Workflow.</p><br> |
| `` |  | não | `integer` | `` | <p>Indica se o Layout Checklist Item está completo ou não.</p><br><ul><br><li><br><p>0 (number) - Incompleto (padrão)</p><br></li><br><li><br><p>1 (number) - Completo</p><br></li><br></ul><br> |
| `` |  | sim | `string` | `` | <p>Descrição do Layout Checklist Item.</p><br> |
| `` |  | sim | `string` | `` | <p>Comentário do Layout Checklist Item (Máximo 100 caracteres).</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o Layout Checklist está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "id_task": 1,
    "id_task_checklist_item_workflow": 1,
    "complete": 1,
    "list_order": 0,
    "description": "Despesas e Receitas injetadas",
    "comment": "",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `POST /layout_checklist` — Incluir um Layout Checklist Item

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "id_task": 1,
    "id_task_checklist_item_workflow": 1,
    "complete": 1,
    "list_order": 0,
    "description": "Despesas e Receitas injetadas",
    "comment": "",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `PUT /layout_checklist_item/{id}` — Alterar um Layout Checklist Item

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do Layout Checklist.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "id_task": 1,
    "id_task_checklist_item_workflow": 1,
    "complete": 1,
    "list_order": 0,
    "description": "Despesas e Receitas injetadas",
    "comment": "",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `DELETE /layout_checklist_item/{id}` — Excluir um Layout Checklist Item

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do Layout Checklist Item.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Layout Checklist Item Workflow

##### `GET /layout_checklist_item_workflow?id={id}&id_card_status_config={id_card_status_config}&id_required_in_card_status={id_required_in_card_status}&active={active}&list_order={list_order}&description={description}` — Obter um ou vários Layout Checklist Item Workflow

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do Layout Checklist Item Workflow.</p><br> |
| `` |  | sim | `integer` | `` | <p>Posição na visualização (Mínimo 0).</p><br> |
| `` |  | não | `integer` | `` | <p>Identificador interno de Tarefa Checklist Item Workflow.</p><br> |
| `` |  | não | `integer` | `` | <p>Identificador interno de Configuração do Card Status.</p><br> |
| `` |  | sim | `string` | `` | <p>Descrição do Layout Checklist Item Workflow.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o Layout Checklist está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "list_order": 0,
    "description": "Despesas e Receitas injetadas",
    "id_card_status_config": 1,
    "id_required_in_card_status": 1,
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `POST /layout_checklist` — Incluir um Layout Checklist Item

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "list_order": 0,
    "description": "Despesas e Receitas injetadas",
    "id_card_status_config": 1,
    "id_required_in_card_status": 1,
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `PUT /layout_checklist_item/{id}` — Alterar um Layout Checklist Item

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do Layout Checklist.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "list_order": 0,
    "description": "Despesas e Receitas injetadas",
    "id_card_status_config": 1,
    "id_required_in_card_status": 1,
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
}
````

##### `DELETE /layout_checklist_item_workflow/{id}` — Excluir um Layout Checklist Item Workflow

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do Layout Checklist Item Workflow.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Leads

##### `GET /lead?id={id}&id_lead_source={id_lead_source}&cpf_cnpj={cpf_cnpj}&name={name}&email={email}&phone={phone}&website={website}&lead_value={lead_value}&thermometer={thermometer}&closing_forecast={closing_forecast}&leadCollaborators={leadCollaborators}&company={company}&converted={converted}&address_city={address_city}&address_state={address_state}&address_zip_code={address_zip_code}&address_public_place={address_public_place}&address_number={address_number}&address_complement={address_complement}&address_neighborhood={address_neighborhood}&description={description}&leadContacts={leadContacts}&active={active}&page={page}` — Obter um ou vários leads

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do lead.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno da fonte do lead.</p><br> |
| `` |  | não | `number` | `` | <p>CPF/CNPJ do lead.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do lead.</p><br> |
| `` |  | não | `string` | `` | <p>Email do lead.</p><br> |
| `` |  | não | `number` | `` | <p>Telefone do lead, sem pontuação.</p><br> |
| `` |  | não | `string` | `` | <p>Website do lead.</p><br> |
| `` |  | não | `number` | `` | <p>Valor do lead.</p><br> |
| `` |  | não | `enum` | `` | <p>Identificador do termômetro do lead.</p><br><ul><br><li><br><p>0 (number) - Frio</p><br></li><br><li><br><p>1 (number) - Morno</p><br></li><br><li><br><p>2 (number) - Quente</p><br></li><br></ul><br> |
| `` |  | não | `date` | `` | <p>Esta requisição filtra todos os leads que tem como previsão de fechamento nesta data (AAAA-MM-DD).</p><br> |
| `` |  | não | `array` | `` | <p>Colaboradores responsáveis pelo lead</p><br><ul><br><li>(object)<br><ul><br><li>id_collaborator (number) - Identificador do colaborador responsável</li><br></ul><br></li><br></ul><br> |
| `` |  | não | `string` | `` | <p>Razão social do lead.</p><br> |
| `` |  | não | `string` | `` | <p>Descrição do lead.</p><br> |
| `` |  | não | `boolean` | `` | <p>Indica se o lead é convertido ou não.</p><br> |
| `` |  | não | `string` | `` | <p>Cidade deste lead.</p><br> |
| `` |  | não | `string` | `` | <p>Estado do país ao qual pertence o lead.</p><br> |
| `` |  | não | `string` | `` | <p>Cep deste lead.</p><br> |
| `` |  | não | `string` | `` | <p>Endereço do lead.</p><br> |
| `` |  | não | `string` | `` | <p>Número do endereço do lead.</p><br> |
| `` |  | não | `string` | `` | <p>Complemento do endereço do lead.</p><br> |
| `` |  | não | `string` | `` | <p>Bairro do endereço do lead.</p><br> |
| `` |  | não | `array` | `` | <p>Contatos relacionados ao lead</p><br><ul><br><li>(object)<br><ul><br><li>name (string) - Nome do contato relacionado</li><br><li>email (string) - E-mail do contato relacionado</li><br><li>phone (string) - Telefone do contato relacionado</li><br><li>secondary_phone (string) - Telefone secundário do contato relacionado</li><br></ul><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Indica se o lead está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Número da página a ser buscada (20 registros por página).</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "application/json"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 69,
    "id_lead_source": 1,
    "active": 1,
    "name": "Felipe André Rocha",
    "email": "felipeandrerocha92@hotmail.com.br",
    "phone": 4139753625,
    "website": "https://www.ritaemilenacontabilme.com.br",
    "lead_value": 9850000,
    "thermometer": 2,
    "closing_forecast": "2021-01-26",
    "description": "Suscipit facilisis quam at purus nam viverra libero, sodales conubia mi conubia interdum eget, cubilia condimentum in iaculis inceptos feugiat. ",
    "company": "Rita e Milena Contábil ME",
    "address_public_place": "Rua Antônio de Pauli",
    "address_number": "513",
    "address_complement": "Qd A4 Lt 34",
    "address_neighborhood": "Campo Comprido",
    "address_city": 4106902,
    "address_zip_code": 81210150,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-01-25 14:17:48",
    "updated_at": "2021-01-25 14:17:48",
    "converted": 0,
    "cpf_cnpj": 2355348111,
    "addressCity": {
        "id": 4106902,
        "name": "Curitiba",
        "id_state": 41,
        "active": 1,
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null
    },
    "leadSource": {
        "id": 1,
        "name": "Facebook",
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null,
        "active": 1
    }
}
````

##### `POST /lead` — Incluir um lead

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "name": "Felipe André Rocha",
    "address_zip_code": 81210150,
    "cpf_cnpj": 2355348111,
    "id_lead_source": 1,
    "phone": 4139753625,
    "thermometer": 2,
    "address_city": 4106902,
    "created_by": 1,
    "updated_by": 1,
    "active": 1,
    "converted": 0,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "id": 70,
    "addressCity": {
        "id": 4106902,
        "name": "Curitiba",
        "id_state": 41,
        "active": 1,
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null
    },
    "leadSource": {
        "id": 1,
        "name": "Facebook",
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null,
        "active": 1
    }
}
````

##### `PUT /lead/{id}` — Alterar um lead

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do lead.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "name": "Felipe Rocha Silva",
    "address_zip_code": 81210150,
    "cpf_cnpj": 2355348111,
    "id_lead_source": 1,
    "phone": 4139753625,
    "thermometer": 1,
    "address_city": 4106902,
    "created_by": 1,
    "updated_by": 1,
    "active": 1,
    "converted": 0,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "id": 70,
    "addressCity": {
        "id": 4106902,
        "name": "Curitiba",
        "id_state": 41,
        "active": 1,
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null
    },
    "leadSource": {
        "id": 1,
        "name": "Facebook",
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null,
        "active": 1
    }
}
````

##### `DELETE /lead/{id}` — Excluir um lead

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do lead.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

##### `GET /lead/{id}/pdf` — Obter o PDF da visualização do Lead

<p>Retorna o documento PDF da visualização do Lead gerado pelo sistema.</p>

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do lead.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/pdf",
  "Content-Disposition": "inline; filename=\"Lead_{id}.pdf\""
}
````

````json
[Dados binários do PDF]
````

#### Locais de estoque

##### `GET /warehouse?id={id}&type={type}&code={code}&production_order={production_order}&consumption_production_order={consumption_production_order}&shipping={shipping}&sale={sale}&people_id={people_id}&description={description}&active={active}` — Obter um ou vários locais de estoque

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do local de estoque.</p><br> |
| `` |  | não | `enum` | `` | <p>Tipo do local de estoque.</p><br><ul><br><li><br><p>0 (number) - Estoque próprio da Empresa</p><br></li><br><li><br><p>1 (number) - Estoque próprio da Empresa em poder de terceiros</p><br></li><br><li><br><p>2 (number) - Estoque de terceiros em poder da Empresa</p><br></li><br></ul><br> |
| `` |  | não | `string` | `` | <p>Código do local de estoque.</p><br> |
| `` |  | não | `enum` | `` | <p>Entrada da ordem de produção do local de estoque.</p><br><ul><br><li><br><p>0 (number) - Indisponível</p><br></li><br><li><br><p>1 (number) - Disponível</p><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Consumo da ordem de produção do local de estoque.</p><br><ul><br><li><br><p>0 (number) - Indisponível</p><br></li><br><li><br><p>1 (number) - Disponível</p><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Remessa do produto do local de estoque.</p><br><ul><br><li><br><p>0 (number) - Indisponível</p><br></li><br><li><br><p>1 (number) - Disponível</p><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Venda do produto do local de estoque.</p><br><ul><br><li><br><p>0 (number) - Indisponível</p><br></li><br><li><br><p>1 (number) - Disponível</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Indentificador da pessoa do local de estoque.</p><br> |
| `` |  | não | `string` | `` | <p>Descrição do local de estoque.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o local de estoque está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "code": "PADRAO",
    "description": "Local de Estoque Padrão",
    "type": 1,
    "production_order": 1,
    "consumption_production_order": 1,
    "shipping": 1,
    "sale": 1,
    "people_id": null,
    "active": 1,
    "created_by": null,
    "updated_by": null,
    "created_at": "2021-04-28 15:32:50",
    "updated_at": "2021-04-28 15:32:50",
    "id_omie": 683646004,
    "people": null
},
````

##### `POST /warehouse` — Incluir um local de estoque

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "code": "ERG12",
    "description": "Estoque Curitiba",
    "type": "1",
    "production_order": 1,
    "consumption_production_order": 1,
    "shipping": 1,
    "sale": 1,
    "active": 1,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "created_by": 1,
    "updated_by": 1,
    "id": 4,
    "people": null
}
````

##### `PUT /warehouse/{id}` — Alterar um local de estoque

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do local de estoque.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "code": "CCPR32",
    "description": "Armazem Curitiba",
    "type": "1",
    "production_order": 1,
    "consumption_production_order": 1,
    "shipping": 1,
    "sale": 1,
    "active": 1,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "created_by": 1,
    "updated_by": 1,
    "id": 4,
    "people": null
}
````

##### `DELETE /warehouse/{id}` — Excluir um local de estoque

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do local de estoque.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Meios de Pagamento

##### `GET /payment-mode?id={id}&code={code}&name={name}&active={active}` — Obter um ou vários meios de pagamento

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do meio de pagamento.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do meio de pagamento.</p><br> |
| `` |  | não | `string` | `` | <p>Código do meio de pagamento.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o meio de pagamento está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "Dinheiro",
    "code": "01",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-09-23 16:34:12",
    "updated_at": "2021-09-23 16:34:12",
}
````

#### Movimentos de estoque

##### `GET /stock-movement?id={id}&type={type}&date={date}&quantity={quantity}&unitary_value={unitary_value}&warehouse_id={warehouse_id}&product_id={product_id}&warehouse_destination_id={warehouse_destination_id}&reason={reason}&observation={observation}&products={products}&active={active}` — Obter um ou vários movimentos de estoque

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do movimento de estoque.</p><br> |
| `` |  | não | `enum` | `` | <p>Tipo do movimento de estoque.</p><br><ul><br><li><br><p>1 (number) - Ajustar o saldo de estoque do dia</p><br></li><br><li><br><p>2 (number) - Criar um movimento de entrada</p><br></li><br><li><br><p>3 (number) - Criar um movimento de saida</p><br></li><br><li><br><p>4 (number) - Transferência entre locais</p><br></li><br></ul><br> |
| `` |  | não | `string` | `` | <p>Data do movimento de estoque (AAAA-MM-DD).</p><br> |
| `` |  | não | `number` | `` | <p>Identificador do local de estoque do movimento de estoque.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador do local de estoque de destino do movimento de estoque.</p><br> |
| `` |  | não | `enum` | `` | <p>Identificador do motivo do movimento de estoque.</p><br><ul><br><li><br><p>1 (number) - Ajuste do valor do CMC</p><br></li><br><li><br><p>2 (number) - Ajuste por inventário (Estoque inicial)</p><br></li><br><li><br><p>3 (number) - Ajuste por inventário</p><br></li><br><li><br><p>4 (number) - Integração com ordem de produção</p><br></li><br><li><br><p>5 (number) - Integração com PDF</p><br></li><br><li><br><p>6 (number) - Baixa por perda ou quebra</p><br></li><br><li><br><p>7 (number) - Transferência por perda ou quebra</p><br></li><br><li><br><p>8 (number) - Transferência entre armazens</p><br></li><br></ul><br> |
| `` |  | não | `string` | `` | <p>Observação do movimento de estoque.</p><br> |
| `` |  | não | `array` | `` | <p>Produtos do movimento de estoque.</p><br><ul><br><li>(object)<br><ul><br><li>id_product (number, optional) - Identificador do produto da venda.</li><br><li>quantity (number, optional) - Quantidade do produto da venda.</li><br><li>unitary_value (number, optional) - Valor unitário do produto da venda.</li><br></ul><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Indica se o movimento de estoque está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
[
    {
        "id": 10,
        "type": 1,
        "date": "2021-05-21",
        "warehouse_id": 2,
        "warehouse_destination_id": null,
        "reason": 1,
        "observation": "",
        "active": 1,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-05-21 13:29:12",
        "updated_at": "2021-05-21 13:29:12",
        "warehouse": {
            "id": 2,
            "code": "PADRAO",
            "description": "Local de Estoque Padrão",
            "type": 1,
            "production_order": 1,
            "consumption_production_order": 1,
            "shipping": 1,
            "sale": 1,
            "people_id": null,
            "active": 1,
            "created_by": null,
            "updated_by": null,
            "created_at": "2021-05-12 17:55:31",
            "updated_at": "2021-05-12 17:55:31",
            "id_omie": 683646004,
            "people": null
        },
        "warehouseDestination": null,
        "stockMovementProducts": [
            {
                "id": 12,
                "stock_movement_id": 10,
                "product_id": 53,
                "quantity": 500,
                "unitary_value": 90000,
                "id_omie": null,
                "active": 1,
                "created_by": 1,
                "updated_by": 1,
                "created_at": "2021-05-21 13:29:12",
                "updated_at": "2021-05-21 13:29:12"
            }
        ]
    }
]
````

##### `POST /stock-movement` — Incluir um movimento de estoque

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "type": 1,
    "warehouse_id": 2,
    "date": "2021-05-21",
    "reason": 1,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "created_by": 1,
    "updated_by": 1,
    "id": 11,
    "warehouse": {
        "id": 2,
        "code": "PADRAO",
        "description": "Local de Estoque Padrão",
        "type": 1,
        "production_order": 1,
        "consumption_production_order": 1,
        "shipping": 1,
        "sale": 1,
        "people_id": null,
        "active": 1,
        "created_by": null,
        "updated_by": null,
        "created_at": "2021-05-12 17:55:31",
        "updated_at": "2021-05-12 17:55:31",
        "id_omie": 683646004,
        "people": null
    },
    "warehouseDestination": null,
    "stockMovementProducts": [
        {
            "id": 13,
            "stock_movement_id": 11,
            "product_id": 53,
            "quantity": 500,
            "unitary_value": 90000,
            "id_omie": null,
            "active": 1,
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2021-05-21 13:50:56",
            "updated_at": "2021-05-21 13:50:56"
        }
    ]
}
````

##### `PUT /stock-movement/{id}` — Alterar um movimento de estoque

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do movimento de estoque.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "type": 1,
    "warehouse_id": 2,
    "date": "2021-05-21",
    "reason": 1,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "created_by": 1,
    "updated_by": 1,
    "id": 11,
    "warehouse": {
        "id": 2,
        "code": "PADRAO",
        "description": "Local de Estoque Padrão",
        "type": 1,
        "production_order": 1,
        "consumption_production_order": 1,
        "shipping": 1,
        "sale": 1,
        "people_id": null,
        "active": 1,
        "created_by": null,
        "updated_by": null,
        "created_at": "2021-05-12 17:55:31",
        "updated_at": "2021-05-12 17:55:31",
        "id_omie": 683646004,
        "people": null
    },
    "warehouseDestination": null,
    "stockMovementProducts": [
        {
            "id": 13,
            "stock_movement_id": 11,
            "product_id": 53,
            "quantity": 500,
            "unitary_value": 90000,
            "id_omie": null,
            "active": 1,
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2021-05-21 13:50:56",
            "updated_at": "2021-05-21 13:50:56"
        }
    ]
}
````

##### `DELETE /stock-movement/{id}` — Excluir um movimento de estoque

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do movimento de estoque.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Ordens de Produção

##### `GET /production-order{?id,value,project_id,warehouse_id,third_parties,status,active,sale_id,collaborator_id,produced_disp,initial_date_range,conclusion_date_range,conclusion_forecast_range,created_by,created_at,created_at_range,updated_by,updated_at,updated_at_range,per-page,page,sort,expand}&per-page={perpage}` — Listar ordens de produção

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Filtra resultados pelo identificador interno da ordem.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo valor total da ordem.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID do projeto associado.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID do local de estoque.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra se a produção é terceirizada.</p><br><ul><br><li><br><p>0 (number) - Não</p><br></li><br><li><br><p>1 (number) - Sim</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo status da ordem.</p><br><ul><br><li><br><p>0 (number) - Não iniciado</p><br></li><br><li><br><p>1 (number) - Produzindo</p><br></li><br><li><br><p>2 (number) - Concluído</p><br></li><br><li><br><p>3 (number) - Parado</p><br></li><br><li><br><p>4 (number) - Cancelado</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra por ordens ativas ou inativas.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID da venda associada.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID do colaborador responsável.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID de um produto produzido na ordem.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra por um intervalo de datas de início. Formato: <code>DD/MM/YYYY - DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra por um intervalo de datas de conclusão. Formato: <code>DD/MM/YYYY - DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra por um intervalo de datas de previsão de conclusão. Formato: <code>DD/MM/YYYY - DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID do usuário que criou a tarefa.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data de criação da tarefa. Formato: <code>YYYY-MM-DD HH:mm:ss</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pelo intervalo de data de criação da tarefa. Formato: <code>YYYY-MM-DD - YYYY-MM-DD</code> ou <code>YYYY-MM-DD HH:mm:ss - YYYY-MM-DD HH:mm:ss</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID do último usuário que atualizou a tarefa.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pelo intervalo de data da última atualização da tarefa. Formato: <code>YYYY-MM-DD - YYYY-MM-DD</code> ou <code>YYYY-MM-DD HH:mm:ss - YYYY-MM-DD HH:mm:ss</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data de criação da tarefa. Formato: <code>YYYY-MM-DD HH:mm:ss</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Número de itens por página. Padrão: <code>20</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Número da página. Padrão: <code>1</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Ordenação. Para ordenar de forma ascendente, use <code>campo</code> e para ordenar de forma descendente use <code>-campo</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Expande registros com relações separadas por vírgula.</p><br><ul><br><li><br><p><code>produced</code> - Produtos a serem produzidos.</p><br></li><br><li><br><p><code>processed</code> - Produtos já processados.</p><br></li><br></ul><br> |

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
[
    {
        "id": 1,
        "conclusion_forecast": "2024-08-30",
        "conclusion_date": null,
        "initial_date": "2024-08-01",
        "value": 15000.00,
        "project_id": 1,
        "warehouse_id": 1,
        "third_parties": 0,
        "status": 1,
        "observation": "Produção do lote #123 de Cadeiras Ergonômicas CE-01.",
        "active": 1,
        "created_by": 3,
        "updated_by": 3,
        "created_at": "2024-07-30 09:00:00",
        "updated_at": "2024-08-01 10:00:00",
        "sale_id": 25,
        "collaborator_id": 10,
        "executed": 0
    }
]
````

##### `GET /production-order/{id}{?expand}` — Obter uma ordem de produção

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da ordem de produção.</p><br> |
| `` |  | não | `string` | `` | <p>Expande registros com relações.</p><br> |

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "conclusion_forecast": "2024-08-30",
    "conclusion_date": null,
    "initial_date": "2024-08-01",
    "value": 15000.00,
    "project_id": 1,
    "warehouse_id": 1,
    "third_parties": 0,
    "status": 1,
    "observation": "Produção do lote #123 de Cadeiras Ergonômicas CE-01.",
    "active": 1,
    "created_by": 3,
    "updated_by": 3,
    "created_at": "2024-07-30 09:00:00",
    "updated_at": "2024-08-01 10:00:00",
    "sale_id": 25,
    "collaborator_id": 10,
    "executed": 0
}
````

##### `POST /production-order` — Criar uma ordem de produção

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz"
}
````

Corpo da requisição:

````json
{
  "initial_date": "",
  "warehouse_id": 0,
  "status": 0,
  "produced": [
    {},
    {
      "product_id": 0,
      "quantity": 0,
      "composition": [
        {},
        {
          "product_id": 0,
          "quantity": 0,
          "warehouse_id": 0
        }
      ]
    }
  ]
}
````

Schema da requisição:

````json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "initial_date": {
      "type": "string"
    },
    "warehouse_id": {
      "type": "number"
    },
    "status": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ]
    },
    "produced": {
      "type": "array"
    },
    "conclusion_forecast": {
      "type": "string"
    },
    "conclusion_date": {
      "type": "string"
    },
    "project_id": {
      "type": "number"
    },
    "sale_id": {
      "type": "number"
    },
    "collaborator_id": {
      "type": "number"
    },
    "value": {
      "type": "number"
    },
    "observation": {
      "type": "string"
    },
    "third_parties": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    },
    "active": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    }
  },
  "required": [
    "initial_date",
    "warehouse_id",
    "status",
    "produced"
  ]
}
````

Resposta HTTP `201`:

Cabeçalhos:

````json
{
  "Content-Type": "Created"
}
````

##### `PUT /production-order/{id}` — Alterar uma ordem de produção

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da ordem de produção.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz"
}
````

Corpo da requisição:

````json
{
  "initial_date": "",
  "warehouse_id": 0,
  "status": 0,
  "produced": [
    {},
    {
      "product_id": 0,
      "quantity": 0,
      "composition": [
        {},
        {
          "product_id": 0,
          "quantity": 0,
          "warehouse_id": 0
        }
      ]
    }
  ]
}
````

Schema da requisição:

````json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "initial_date": {
      "type": "string"
    },
    "warehouse_id": {
      "type": "number"
    },
    "status": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ]
    },
    "produced": {
      "type": "array"
    },
    "conclusion_forecast": {
      "type": "string"
    },
    "conclusion_date": {
      "type": "string"
    },
    "project_id": {
      "type": "number"
    },
    "sale_id": {
      "type": "number"
    },
    "collaborator_id": {
      "type": "number"
    },
    "value": {
      "type": "number"
    },
    "observation": {
      "type": "string"
    },
    "third_parties": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    },
    "active": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    }
  },
  "required": [
    "initial_date",
    "warehouse_id",
    "status",
    "produced"
  ]
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

##### `GET /production-order/{id}/pdf` — Obter o PDF da visualização da Ordem de Produção

<p>Retorna o documento PDF da visualização da Ordem de Produção gerado pelo sistema.</p>

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da ordem de produção.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/pdf",
  "Content-Disposition": "inline; filename=\"Ordem_Producao_{id}.pdf\""
}
````

````json
[Dados binários do PDF]
````

#### Pessoas

##### `GET /people?id={id}&cpf_cnpj={cpf_cnpj}&name={name}&email={email}&phone={phone}&secundary_phone={secundary_phone}&website={website}&state_registration={state_registration}&municipal_registration={municipal_registration}&tax_payer={tax_payer}&credit_limit={credit_limit}&company_name={company_name}&observation={observation}&peopleCollaborators={peopleCollaborators}&peopleContacts={peopleContacts}&address_city={address_city}&address_state={address_state}&address_zip_code={address_zip_code}&address_public_place={address_public_place}&address_number={address_number}&address_complement={address_complement}&address_neighborhood={address_neighborhood}&address_delivery_city={address_delivery_city}&address_delivery_state={address_delivery_state}&address_delivery_zip_code={address_delivery_zip_code}&address_delivery_public_place={address_delivery_public_place}&address_delivery_number={address_delivery_number}&address_delivery_complement={address_delivery_complement}&address_delivery_neighborhood={address_delivery_neighborhood}&active={active}` — Obter uma ou várias pessoas

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno da pessoa.</p><br> |
| `` |  | não | `number` | `` | <p>CPF/CNPJ da pessoa</p><br> |
| `` |  | não | `string` | `` | <p>Nome da pessoa</p><br> |
| `` |  | não | `string` | `` | <p>Email da pessoa</p><br> |
| `` |  | não | `number` | `` | <p>Telefone da pessoa, sem pontuação</p><br> |
| `` |  | não | `number` | `` | <p>Telefone da pessoa, sem pontuação</p><br> |
| `` |  | não | `string` | `` | <p>Website da pessoa</p><br> |
| `` |  | não | `string` | `` | <p>Inscrição estadual da pessoa</p><br> |
| `` |  | não | `string` | `` | <p>Inscrição municipal da pessoa</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se a pessoa é contribuinte ou não</p><br><ul><br><li><br><p>0 (number) - Não</p><br></li><br><li><br><p>1 (number) - Sim</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Limite de crédito da pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Razão social da pessoa</p><br> |
| `` |  | não | `string` | `` | <p>Observação da pessoa.</p><br> |
| `` |  | não | `array` | `` | <p>Vendedores responsáveis (colaborador) pela pessoa.</p><br><ul><br><li>(object)<br><ul><br><li>id_collaborator (number) - Identificador do vendedor responsável (colaborador) pela pessoa</li><br></ul><br></li><br></ul><br> |
| `` |  | não | `array` | `` | <p>Contatos relacionados a pessoa.</p><br><ul><br><li>(object)<br><ul><br><li>name (string) - Nome do contato relacionado a pessoa</li><br><li>email (string) - E-mail do contato relacionado a pessoa</li><br><li>phone (string) - Telefone do contato relacionado a pessoa</li><br><li>secundary_phone (string) - Telefone secundário do contato relacionado a pessoa</li><br></ul><br></li><br></ul><br> |
| `` |  | não | `string` | `` | <p>Cidade desta pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Cep desta pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Endereço da pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Número do endereço da pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Complemento do endereço da pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Bairro do endereço da pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Cidade de entrega desta pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Cep de entrega desta pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Endereço de entrega da pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Número do endereço de entrega da pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Complemento do endereço de entrega da pessoa.</p><br> |
| `` |  | não | `string` | `` | <p>Bairro do endereço de entrega da pessoa.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se a pessoa está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
        "id": 2,
        "active": 1,
        "name": "Brenda Carolina Gomes",
        "company_name": "Henry e Cauê Ferragens Ltda",
        "cpf_cnpj": 54943671853,
        "email": "brendacarolinagomes__brendacarolinagomes@infolink.com.br",
        "phone": 7326520582,
        "website": "https://www.henryecaueferragensltda.com.br",
        "secondary_phone": 73987463724,
        "state_registration": "563611650",
        "municipal_registration": "85546633",
        "image": null,
        "address_zip_code": 45604880,
        "address_public_place": "Rua E",
        "address_number": "888",
        "address_complement": "Qd 4 Lt 69",
        "address_neighborhood": "Parque Verde",
        "address_city": null,
        "address_delivery_zip_code": 45604880,
        "address_delivery_public_place": "Rua E",
        "address_delivery_number": "888",
        "address_delivery_complement": "Qd 4 Lt 69",
        "address_delivery_neighborhood": "Parque Verde",
        "address_delivery_city": null,
        "credit_limit": 655225,
        "observation": "Convallis placerat adipiscing eros nunc amet, pulvinar mauris commodo semper suscipit scelerisque, odio hac magna eu. tempor orci lacus, habitant. ",
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-01-18 14:07:17",
        "updated_at": "2021-03-30 18:48:42",
        "id_omie": null,
        "available_credit_limit": null,
        "taxpayer": 0,
        "id_woocommerce": null,
        "collaborators": [],
        "contacts": [],
        "tags": "",
        "projects": [
            {
                "id": 40,
                "name": "Projeto 1",
                "people_id": 2,
                "progress_from_tasks": 0,
                "progress": null,
                "billing_type": 0,
                "total_cost": 4502215,
                "rate_per_hour": null,
                "estimated_hours": 12,
                "status": 0,
                "start_date": "2021-04-12",
                "deadline": null,
                "date_finished": null,
                "description": "<p>descrição de projeto</p>",
                "active": 1,
                "created_by": 1,
                "updated_by": 1,
                "created_at": "2021-04-13 16:18:56",
                "updated_at": "2021-04-27 17:00:24",
                "id_omie": null,
                "budget": 546845268,
                "type": 0,
                "code": "6075EE82C6763",
                "expected_profit": 5465
            },
        ],
        "documents": []
    }
````

##### `POST /people` — Incluir uma pessoa

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "phone": "8427461392",
    "cpf_cnpj": "44694644220",
    "name": "Samuel Nicolas Cauê Porto",
    "email": "samuelnicolascaueporto@deltaturismo.com.br",
    "address_zip_code": null,
    "address_delivery_zip_code": null,
    "secondary_phone": null,
    "address_city": null,
    "address_delivery_city": null,
    "created_by": 1,
    "updated_by": 1,
    "id_omie": null,
    "taxpayer": null,
    "active": 1,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "id": 61,
    "collaborators": [],
    "contacts": null,
    "tags": "",
    "projects": [],
    "documents": null
}
````

##### `PUT /people/{id}` — Alterar uma pessoa

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do people.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "phone": "8427461392",
    "cpf_cnpj": "44694644220",
    "name": "Samuel Nicolai",
    "email": "samuelnicolai@deltaturismo.com.br",
    "address_zip_code": null,
    "address_delivery_zip_code": null,
    "secondary_phone": null,
    "address_city": null,
    "address_delivery_city": null,
    "created_by": 1,
    "updated_by": 1,
    "id_omie": null,
    "taxpayer": null,
    "active": 1,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "id": 61,
    "collaborators": [],
    "contacts": null,
    "tags": "",
    "projects": [],
    "documents": null
}
````

##### `DELETE /people/{id}` — Excluir uma pessoa

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do people.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Prazos de Pagamento

##### `GET /payment-term?id={id}&code={code}&name={name}&active={active}` — Obter um ou vários prazos de pagamento

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do prazo de pagamento.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do prazo de pagamento.</p><br> |
| `` |  | não | `string` | `` | <p>Código do prazo de pagamento.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o prazo de pagamento está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "A Vista",
    "code": "000",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-09-23 16:34:12",
    "updated_at": "2021-09-23 16:34:12",
}
````

#### Produtos

##### `GET /product?id={id}&value={value}&name={name}&code={code}&ncm_code={ncm_code}&ean_code={ean_code}&stock={stock}&unit_of_measurement={unit_of_measurement}&weight={weight}&width={width}&height={height}&length={length}&productPeoples={productPeoples}&id_brand={id_brand}&id_category_product={id_category_product}&id_family_product={id_family_product}&discount_type={discount_type}&maximum_discount={maximum_discount}&information={information}&observation={observation}&image={image}&active={active}` — Obter um ou vários produtos

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do produto.</p><br> |
| `` |  | não | `number` | `` | <p>Valor do produto.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do produto.</p><br> |
| `` |  | não | `string` | `` | <p>Código do produto</p><br> |
| `` |  | não | `string` | `` | <p>Código NCM do produto.</p><br> |
| `` |  | não | `string` | `` | <p>Código EAN do produto.</p><br> |
| `` |  | não | `number` | `` | <p>Quantidade de estoque do produto</p><br> |
| `` |  | não | `number` | `` | <p>Unidade de medida do produto.</p><br> |
| `` |  | não | `number` | `` | <p>Peso do produto.</p><br> |
| `` |  | não | `number` | `` | <p>Largura do produto.</p><br> |
| `` |  | não | `number` | `` | <p>Altura do produto.</p><br> |
| `` |  | não | `number` | `` | <p>Comprimento do produto.</p><br> |
| `` |  | não | `array` | `` | <p>Fornecedores do produto.</p><br><ul><br><li>(object)<br><ul><br><li>people_id (number) - Identificador do fornecedor do produto.</li><br></ul><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Identificador da marca do produto.</p><br> |
| `` |  | não | `enum` | `` | <p>Identificador da categoria do produto.</p><br><ul><br><li><br><p>0 (number) - Mercadoria para revenda.</p><br></li><br><li><br><p>1 (number) - Matéria prima.</p><br></li><br><li><br><p>2 (number) - Embalagem.</p><br></li><br><li><br><p>3 (number) - Produto em processo.</p><br></li><br><li><br><p>4 (number) - Produto acabado.</p><br></li><br><li><br><p>5 (number) - Subproduto.</p><br></li><br><li><br><p>6 (number) - Produto Intermediário.</p><br></li><br><li><br><p>7 (number) - Material de uso e consumo.</p><br></li><br><li><br><p>8 (number) - Ativo imobilizado.</p><br></li><br><li><br><p>9 (number) - Serviços.</p><br></li><br><li><br><p>10 (number) - Outros insumos.</p><br></li><br><li><br><p>99 (number) - Desconto em porcentagem.</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Identificador da família do produto.</p><br> |
| `` |  | não | `enum` | `` | <p>Tipo de desconto do produto.</p><br><ul><br><li><br><p>0 (number) - Desconto em real.</p><br></li><br><li><br><p>1 (number) - Desconto em porcentagem.</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Desconto máximo do produto.</p><br> |
| `` |  | não | `string` | `` | <p>Informação do produto.</p><br> |
| `` |  | não | `string` | `` | <p>Observação do produto.</p><br> |
| `` |  | não | `string` | `` | <p>Imagem do produto.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o produto está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 10,
    "name": "TACHA MONODIRECIONAL ",
    "value": 921042,
    "stock": 50,
    "unit_of_measurement": 1,
    "weight": null,
    "width": null,
    "height": null,
    "length": null,
    "code": "0021",
    "ncm_code": "",
    "ean_code": "",
    "id_brand": 2,
    "id_category_product": "0",
    "id_family_product": 2,
    "discount_type": null,
    "maximum_discount": null,
    "information": "",
    "observation": "",
    "image": "Sem-t-tulo (1).png",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-03-26 14:54:04",
    "updated_at": "2021-04-29 16:07:14",
    "id_omie": null,
    "brand": {
        "id": 2,
        "name": "Quadra 127",
        "active": 1,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-01-15 13:25:17",
        "updated_at": "2021-01-15 13:25:17"
    },
    "familyProduct": {
        "id": 2,
        "name": "Familia 2",
        "active": 1,
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2021-01-18 15:03:46",
        "updated_at": "2021-03-30 16:48:21",
        "id_omie": null
    },
    "unitOfMeasurement": {
        "id": 1,
        "name": "Quilograma",
        "initials": "KG",
        "active": 1,
        "created_by": null,
        "updated_by": null,
        "created_at": null,
        "updated_at": null
    },
    "productGroupAndSubgroupProducts": [],
    "purchaseOrderProducts": [],
    "purchaseProducts": [],
    "quotationProducts": [],
    "saleProducts": [],
    "woocommerceProducts": [
        {
            "id": 2,
            "id_woocommerce": 1,
            "id_product": 10,
            "id_woocommerce_external": null,
            "active": 1,
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2021-03-26 14:54:04",
            "updated_at": "2021-04-29 16:07:14"
        }
    ],
    "productWarehouses": [
        {
            "id": 7,
            "product_id": 10,
            "warehouse_id": 2,
            "available_stock": 50,
            "unit_cmc": 500,
            "total_cmc": null,
            "minimum_stock": null,
            "outflow_forecast": 10,
            "inflow_forecast": null,
            "active": 1,
            "created_by": null,
            "updated_by": null,
            "created_at": null,
            "updated_at": null,
            "productWarehouseBatches": [
                {
                    "id": 6,
                    "product_warehouse_id": 7,
                    "batch": "215487",
                    "available_stock": 25,
                    "validity": "2021-10-08",
                    "active": 1,
                    "created_by": 1,
                    "updated_by": 1,
                    "created_at": "2021-09-14 16:50:05",
                    "updated_at": "2021-09-14 16:50:05",
                    "outflow_forecast": 10
                },
                {
                    "id": 9,
                    "product_warehouse_id": 7,
                    "batch": "LOTE02",
                    "available_stock": 25,
                    "validity": "2022-03-03",
                    "active": 1,
                    "created_by": 1,
                    "updated_by": 1,
                    "created_at": "2021-10-06 20:00:05",
                    "updated_at": "2021-10-06 20:00:05",
                    "outflow_forecast": null
                }
            ]
        },
        {
            "id": 8,
            "product_id": 10,
            "warehouse_id": 3,
            "available_stock": 1000,
            "unit_cmc": 200,
            "total_cmc": null,
            "minimum_stock": null,
            "outflow_forecast": null,
            "inflow_forecast": null,
            "active": 1,
            "created_by": null,
            "updated_by": null,
            "created_at": null,
            "updated_at": null,
            "productWarehouseBatches": []
        }
    ]
},
````

##### `POST /product` — Incluir um produto

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "code": "ERG12",
    "name": "MESA GRANDE",
    "unit_of_measurement": null,
    "id_brand": null,
    "id_category_product": null,
    "id_family_product": null,
    "discount_type": null,
    "created_by": 1,
    "updated_by": 1,
    "id_omie": null,
    "active": 1,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "id": 64,
    "brand": null,
    "familyProduct": null,
    "unitOfMeasurement": null,
    "productGroupAndSubgroupProducts": [],
    "purchaseOrderProducts": [],
    "purchaseProducts": [],
    "quotationProducts": [],
    "saleProducts": [],
    "woocommerceProducts": [],
    "productWarehouses": []
}
````

##### `PUT /product/{id}` — Alterar um produto

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do produto.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "code": "CUR123",
    "name": "MESA GRANDE C/ 4 CADEIRAS",
    "unit_of_measurement": null,
    "id_brand": null,
    "id_category_product": null,
    "id_family_product": null,
    "discount_type": null,
    "created_by": 1,
    "updated_by": 1,
    "id_omie": null,
    "active": 1,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "id": 64,
    "brand": null,
    "familyProduct": null,
    "unitOfMeasurement": null,
    "productGroupAndSubgroupProducts": [],
    "purchaseOrderProducts": [],
    "purchaseProducts": [],
    "quotationProducts": [],
    "saleProducts": [],
    "woocommerceProducts": [],
    "productWarehouses": []
}
````

##### `DELETE /product/{id}` — Excluir um produto

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do produto.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Projetos

##### `GET /project{?id,code,name,people_id,type,status,progress,progress_from_tasks,budget,profit,administration,operational_cost,expense_forecast,start_date,start_date_range,deadline,deadline_range,date_finished,date_finished_range,members_disp,tags,workflow,address,active,created_by,created_at,updated_by,updated_at,page,sort,expand}&per-page={perpage` — Listar projetos

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Filtra resultados pelo identificador interno do projeto.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pelo código do projeto.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pelo nome do projeto.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo ID da pessoa (cliente) associada ao projeto.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo tipo do projeto.</p><br><ul><br><li><br><p>0 (number) - Interno</p><br></li><br><li><br><p>1 (number) - Externo</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo status do projeto.</p><br><ul><br><li><br><p>0 (number) - Não iniciado</p><br></li><br><li><br><p>1 (number) - Em andamento</p><br></li><br><li><br><p>2 (number) - Em espera</p><br></li><br><li><br><p>3 (number) - Cancelado</p><br></li><br><li><br><p>4 (number) - Concluído</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo progresso do projeto.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados se o progresso é calculado a partir das tarefas.</p><br><ul><br><li><br><p>0 (number) - Não</p><br></li><br><li><br><p>1 (number) - Sim</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo custo planejado do projeto.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo lucro do projeto.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pela taxa de administração do projeto.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo custo operacional do projeto.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pela previsão de despesas do projeto.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data de início do projeto. Formato: <code>DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra por um intervalo de datas de início. Formato: <code>DD/MM/YYYY - DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data limite do projeto. Formato: <code>DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra por um intervalo de datas de prazo final. Formato: <code>DD/MM/YYYY - DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data de finalização do projeto. Formato: <code>DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra por um intervalo de datas de finalização. Formato: <code>DD/MM/YYYY - DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra projetos por um membro específico (ID do colaborador).</p><br> |
| `` |  | não | `array[number]` | `` | <p>Filtra por uma lista de IDs de tags. Ex.: <code>?tags[]=1&amp;tags[]=2</code> (antes de formatar para URL encoded).</p><br> |
| `` |  | não | `array[number]` | `` | <p>Filtra por uma lista de IDs de status do fluxo de trabalho (kanban).</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pelo endereço do projeto.</p><br> |
| `` |  | não | `number` | `` | <p>Indica se o projeto está ativo ou inativo.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID do usuário que criou o projeto.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data de criação do projeto. Formato: <code>DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID do último usuário que atualizou o projeto.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data de criação do projeto. Formato: <code>DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Número de itens por página. Padrão: <code>20</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Número da página. Padrão: <code>1</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Ordenação. Para ordenar de forma ascendente, use <code>campo</code> e para ordenar de forma descendente use <code>-campo</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Expande registros com relações separadas por vírgula.</p><br><ul><br><li><br><p><code>expenseProjects</code> - Despesas do projeto.</p><br></li><br><li><br><p><code>revenueProjects</code> - Receitas do projeto.</p><br></li><br><li><br><p><code>people</code> - Cliente do projeto.</p><br></li><br><li><br><p><code>projectCollaborators</code> - Colaboradores do projeto.</p><br></li><br><li><br><p><code>projectTagProjects</code> - Tags do projeto.</p><br></li><br><li><br><p><code>tasks</code> - Tarefas do projeto.</p><br></li><br></ul><br> |

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
[
    {
        "id": 2,
        "name": "Teste 1",
        "people_id": 1,
        "progress_from_tasks": 0,
        "progress": 25,
        "total_cost": 1250.50,
        "rate_per_hour": 120,
        "estimated_hours": 80,
        "status": 1,
        "start_date": "2025-10-13",
        "deadline": "2025-12-22",
        "date_finished": null,
        "description": "Descrição de exemplo para o projeto de teste.",
        "active": 1,
        "created_by": 3,
        "updated_by": 3,
        "created_at": "2025-09-29 18:09:04",
        "updated_at": "2025-10-07 15:41:26",
        "budget": 5000,
        "type": 1,
        "code": "68DAF536500E6",
        "address": "Rua Exemplo, 123, Cidade, Estado",
        "administration": 10,
        "profit": 20,
        "real_cost": 1100.75,
        "sell_value": 6000,
        "copied_from": null,
        "custom_field": null,
        "update_job_id": null,
        "calculation_method": 0,
        "expense_forecast": 500,
        "operational_cost": 300,
        "color": "#f39c12"
    }
]
````

##### `GET /project/{id}{?expand}` — Obter um projeto

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do projeto.</p><br> |
| `` |  | não | `string` | `` | <p>Expande registros com relações separadas por vírgula.</p><br> |

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 2,
    "name": "Teste 1",
    "people_id": 1,
    "progress_from_tasks": 0,
    "progress": 25,
    "total_cost": 1250.50,
    "rate_per_hour": 120,
    "estimated_hours": 80,
    "status": 1,
    "start_date": "2025-10-13",
    "deadline": "2025-12-22",
    "date_finished": null,
    "description": "Descrição de exemplo para o projeto de teste.",
    "active": 1,
    "created_by": 3,
    "updated_by": 3,
    "created_at": "2025-09-29 18:09:04",
    "updated_at": "2025-10-07 15:41:26",
    "budget": 5000,
    "type": 1,
    "code": "68DAF536500E6",
    "address": "Rua Exemplo, 123, Cidade, Estado",
    "administration": 10,
    "profit": 20,
    "real_cost": 1100.75,
    "sell_value": 6000,
    "copied_from": null,
    "custom_field": null,
    "update_job_id": null,
    "calculation_method": 0,
    "expense_forecast": 500,
    "operational_cost": 300,
    "color": "#f39c12"
}
````

##### `POST /project` — Criar um projeto

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz"
}
````

Corpo da requisição:

````json
{
  "name": "",
  "code": "",
  "start_date": "",
  "members": [],
  "taxes": [
    {},
    {
      "type": "app\\modules\\administrator\\models\\Tax",
      "type_id": 0
    }
  ],
  "additionalExpenses": [
    {},
    {
      "description": "",
      "quantity": 0,
      "unitary_value": 0
    }
  ]
}
````

Schema da requisição:

````json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "code": {
      "type": "string"
    },
    "start_date": {
      "type": "string"
    },
    "people_id": {
      "type": "number"
    },
    "deadline": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "status": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ]
    },
    "progress_from_tasks": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    },
    "progress": {
      "type": "number"
    },
    "budget": {
      "type": "number"
    },
    "estimated_hours": {
      "type": "number"
    },
    "calculation_method": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    },
    "profit": {
      "type": "number"
    },
    "administration": {
      "type": "number"
    },
    "operational_cost": {
      "type": "number"
    },
    "expense_forecast": {
      "type": "number"
    },
    "sell_value": {
      "type": "number"
    },
    "type": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    },
    "address": {
      "type": "string"
    },
    "color": {
      "type": "string"
    },
    "active": {
      "type": "number"
    },
    "tags": {
      "type": "string"
    },
    "members": {
      "type": "array"
    },
    "taxes": {
      "type": "array"
    },
    "additionalExpenses": {
      "type": "array"
    },
    "custom_field": {
      "type": "object"
    }
  },
  "required": [
    "name",
    "code",
    "start_date"
  ]
}
````

Resposta HTTP `201`:

Cabeçalhos:

````json
{
  "Content-Type": "Created"
}
````

````json
{
    "name": "Desenvolvimento de residencial",
    "code": "PROJ-APP-2024",
    "start_date": "2024-09-01",
    "deadline": "2025-03-31",
    "people_id": 1,
    "status": 1,
    "progress_from_tasks": 1,
    "type": 1,
    "budget": 75000,
    "description": "Projeto completo para a criação e lançamento do novo aplicativo mobile da empresa para iOS e Android.",
    "calculation_method": 1,
    "profit": 25,
    "administration": 15,
    "color": "#3498db",
    "estimated_hours": 0,
    "real_cost": 0,
    "expense_forecast": 0,
    "created_at": {
      "expression": "CURRENT_TIMESTAMP",
      "params": []
    },
    "updated_at": {
      "expression": "CURRENT_TIMESTAMP",
      "params": []
    },
    "created_by": 4,
    "updated_by": 4,
    "date_finished": null,
    "custom_field": null,
    "id": 4
}
````

##### `PUT /project/{id}` — Alterar um projeto

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do projeto.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz"
}
````

Corpo da requisição:

````json
{
  "name": "",
  "code": "",
  "start_date": "",
  "members": [],
  "taxes": [
    {},
    {
      "type": "app\\modules\\administrator\\models\\Tax",
      "type_id": 0
    }
  ],
  "additionalExpenses": [
    {},
    {
      "description": "",
      "quantity": 0,
      "unitary_value": 0
    }
  ]
}
````

Schema da requisição:

````json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "code": {
      "type": "string"
    },
    "start_date": {
      "type": "string"
    },
    "people_id": {
      "type": "number"
    },
    "deadline": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "status": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ]
    },
    "progress_from_tasks": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    },
    "progress": {
      "type": "number"
    },
    "budget": {
      "type": "number"
    },
    "estimated_hours": {
      "type": "number"
    },
    "calculation_method": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    },
    "profit": {
      "type": "number"
    },
    "administration": {
      "type": "number"
    },
    "operational_cost": {
      "type": "number"
    },
    "expense_forecast": {
      "type": "number"
    },
    "sell_value": {
      "type": "number"
    },
    "type": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "enum": [
            0,
            1
          ]
        }
      ]
    },
    "address": {
      "type": "string"
    },
    "color": {
      "type": "string"
    },
    "active": {
      "type": "number"
    },
    "tags": {
      "type": "string"
    },
    "members": {
      "type": "array"
    },
    "taxes": {
      "type": "array"
    },
    "additionalExpenses": {
      "type": "array"
    },
    "custom_field": {
      "type": "object"
    }
  },
  "required": [
    "name",
    "code",
    "start_date"
  ]
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "name": "Desenvolvimento de residencial",
    "code": "PROJ-APP-2024",
    "start_date": "2024-09-01",
    "deadline": "2025-03-31",
    "people_id": 1,
    "status": 1,
    "progress_from_tasks": 1,
    "type": 1,
    "budget": 75000,
    "description": "Projeto completo para a criação e lançamento do novo aplicativo mobile da empresa para iOS e Android.",
    "calculation_method": 1,
    "profit": 25,
    "administration": 15,
    "color": "#3498db",
    "estimated_hours": 0,
    "real_cost": 0,
    "expense_forecast": 0,
    "created_at": {
      "expression": "CURRENT_TIMESTAMP",
      "params": []
    },
    "updated_at": {
      "expression": "CURRENT_TIMESTAMP",
      "params": []
    },
    "created_by": 4,
    "updated_by": 4,
    "date_finished": null,
    "custom_field": null,
    "id": 4
}
````

##### `DELETE /project/{id}` — Excluir um projeto

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do projeto.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz"
}
````

Resposta HTTP `204`:

Cabeçalhos:

````json
{
  "Content-Type": "No Content"
}
````

#### Serviços

##### `GET /service?id={id}&value={value}&name={name}&code={code}&service_code_cnae={service_code_cnae}&service_code_lc116={service_code_lc116}&taxation_of_service={taxation_of_service}&id_service_category={id_service_category}&discount_type={discount_type}&maximum_discount={maximum_discount}&information={information}&observation={observation}&image={image}&active={active}` — Obter um ou vários serviços

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do serviço.</p><br> |
| `` |  | não | `number` | `` | <p>Valor do serviço.</p><br> |
| `` |  | não | `string` | `` | <p>Nome do serviço.</p><br> |
| `` |  | não | `string` | `` | <p>Código do serviço.</p><br> |
| `` |  | não | `string` | `` | <p>Identificador interno da categoria do serviço.</p><br> |
| `` |  | não | `string` | `` | <p>Código de serviço CNAE.</p><br> |
| `` |  | não | `string` | `` | <p>Código de serviço LC 116.</p><br> |
| `` |  | não | `enum` | `` | <p>Identificador da tributação dos serviços.</p><br> |
| `` |  | não | `enum` | `` | <p>Tipo de desconto do serviço.</p><br><ul><br><li><br><p>0 (number) - Desconto em real.</p><br></li><br><li><br><p>1 (number) - Desconto em porcentagem.</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Desconto máximo do serviço.</p><br> |
| `` |  | não | `string` | `` | <p>Informação do serviço.</p><br> |
| `` |  | não | `string` | `` | <p>Observação do serviço.</p><br> |
| `` |  | não | `string` | `` | <p>Imagem do serviço.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o serviço está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 8,
    "name": "INSTALAÇÃO DE MCT (EM CARRO FORTE)",
    "value": 120.5,
    "code": "10164",
    "taxation_of_service": 1,
    "service_code_cnae": "3101",
    "service_code_lc116": "14.02",
    "discount_type": 1,
    "maximum_discount": 12.52,
    "id_service_category": 1,
    "image": null,
    "information": "INSTALAÇÃO DE MCT (EM CARRO FORTE) ",
    "observation": "Só pode ser em carro forte",
    "active": 1,
    "created_by": null,
    "updated_by": 1,
    "created_at": "2021-04-22 20:28:10",
    "updated_at": "2021-09-27 20:41:03",
    "id_omie": 123456789
},
````

##### `POST /service` — Incluir um serviço

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "value": 120.5,
    "name": "Serviço incluído via API",
    "code": "SRV666",
    "active": 1,
    "discount_type": null,
    "id_service_category": null,
    "created_by": 1,
    "updated_by": 1,
    "id_omie": null,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "id": 342
}
````

##### `PUT /service/{id}` — Alterar um serviço

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do serviço.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "value": 120.5,
    "name": "Serviço incluído via API",
    "code": "SRV666",
    "active": 1,
    "discount_type": null,
    "id_service_category": null,
    "created_by": 1,
    "updated_by": 1,
    "id_omie": null,
    "created_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "updated_at": {
        "expression": "CURRENT_TIMESTAMP",
        "params": []
    },
    "id": 342
}
````

##### `DELETE /service/{id}` — Excluir um serviço

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do serviço.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Tabelas de Preço

##### `GET /price-list?id={id}&name={name}&code={code}&type={type}&default={default}&maximum_discount={maximum_discount}&suggested_discount={suggested_discount}&percentage={percentage}&start_date={start_date}&product_ncm_code={product_ncm_code}&due_date={due_date}&client_id_state={client_id_state}&product_id_family={product_id_family}&client_tag={client_tag}&product_id_provider={product_id_provider}&active={active}` — Obter uma ou várias tabelas de preço

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno da tabela de preço.</p><br> |
| `` |  | não | `string` | `` | <p>Nome da tabela de preço.</p><br> |
| `` |  | não | `string` | `` | <p>Código da tabela de preço.</p><br> |
| `` |  | não | `enum` | `` | <p>Regra da tabela de preço.</p><br><ul><br><li><br><p>0 (number) - Aumentar o valor</p><br></li><br><li><br><p>1 (number) - Diminuir o valor</p><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Se a tabela de preço é padrão ou não.</p><br><ul><br><li><br><p>0 (number) - Não</p><br></li><br><li><br><p>1 (number) - Sim</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Percentual de desconto máximo.</p><br> |
| `` |  | não | `number` | `` | <p>Percentual de desconto sugerido.</p><br> |
| `` |  | não | `number` | `` | <p>Percentual da tabela de preço.</p><br> |
| `` |  | não | `string` | `` | <p>Data de início da tabela de preço (AAAA-MM-DD).</p><br> |
| `` |  | não | `string` | `` | <p>Data de início da tabela de preço (AAAA-MM-DD).</p><br> |
| `` |  | não | `string` | `` | <p>Código NCM da tabela de preço.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador do estado no qual a tabela de preço é restringida.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador da família do produto utilizada para restrição da tabela de preço.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador da tag do cliente utilizada para restrição da tabela de preço.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador do fornecedor utilizado para restrição da tabela de preço.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se a tabela de preço está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "name": "Tabela 2",
    "code": "6081DC8E9A458",
    "type": 1,
    "percentage": 2,
    "due_date": null,
    "active": 1,
    "created_by": null,
    "updated_by": null,
    "created_at": "2021-04-22 20:29:02",
    "updated_at": "2021-04-22 20:29:02",
    "id_omie": null,
    "product_id_family": null,
    "product_ncm_code": "",
    "product_id_provider": null,
    "client_tag": null,
    "client_id_state": null,
    "start_date": null,
    "suggested_discount": 0,
    "maximum_discount": 0,
    "default": null,
    "productIdFamily": null,
    "productIdProvider": null,
    "clientIdState": null
},
````

#### Tarefas

##### `GET /task?id={id}&name={name}&hourly_rate={hourly_rate}&start_date_range={start_date_range}&due_date_range={due_date_range}&priority={priority}&department_id={department_id}&collaborator_disp={collaborator_disp}&follower_disp={follower_disp}&status={status}&public={public}&description={description}&observation={observation}&date_finished_range={date_finished_range}&budget={budget}&bill_value={bill_value}&billing_type={billing_type}&type={type}&active={active}&weight={weight}&subscription_id={subscription_id}&main_task_id={main_task_id}&related_task={related_task}&workflow={workflow}&related_to={related_to}&related_id={related_id}&created_by={created_by}&created_at_range={created_at_range}&updated_by={updated_by}&updated_at_range={updated_at_range}&per-page={perpage}&page={page}&sort={sort}&expand={expand}` — Listar tarefas

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Filtra resultados pelo identificador interno da tarefa.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pelo nome da tarefa.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo valor por hora da tarefa.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data que se inicia a tarefa. Formato: <code>DD/MM/YYYY - DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data de vencimento do prazo de entrega da tarefa. Formato: <code>DD/MM/YYYY - DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pela prioridade da tarefa</p><br><ul><br><li><br><p>1 (number) - Baixo</p><br></li><br><li><br><p>2 (number) - Média</p><br></li><br><li><br><p>3 (number) - Alta</p><br></li><br><li><br><p>4 (number) - Urgente</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo identificador do departamento que se refere a tarefa.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo id do colaborador (responsáveis pela tarefa).</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo id do colaborador (seguidor da tarefa).</p><br> |
| `` |  | não | `number` | `` | <p>Status do andamento da tarefa.</p><br><ul><br><li><br><p>0 (number) - Não iniciado</p><br></li><br><li><br><p>1 (number) - Em espera/análise</p><br></li><br><li><br><p>2 (number) - Emandamento</p><br></li><br><li><br><p>3 (number) - Concluído</p><br></li><br><li><br><p>4 (number) - Cancelado</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Privacidade da tarefa, se pública aparece para todos na base, se privada aparece somente aos envolvidos.</p><br><ul><br><li><br><p>0 (number) - Privada (padrão)</p><br></li><br><li><br><p>1 (number) - Pública</p><br></li><br></ul><br> |
| `` |  | não | `string` | `` | <p>Descrição completa da tarefa.</p><br> |
| `` |  | não | `string` | `` | <p>Breve descrição do que será feito na tarefa, destacando pontos importantes.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data de finalização da tarefa. Formato: <code>DD/MM/YYYY - DD/MM/YYYY</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo orçamento da tarefa.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo valor da tarefa.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo tipo de faturamento da tarefa.</p><br><ul><br><li><br><p>0 (number) - Conclusão</p><br></li><br><li><br><p>1 (number) - Medição</p><br></li><br><li><br><p>2 (number) - Horas</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo tipo da tarefa.</p><br><ul><br><li><br><p>0 (number) - Faturável</p><br></li><br><li><br><p>1 (number) - Despesa</p><br></li><br><li><br><p>2 (number) - Receita</p><br></li><br><li><br><p>3 (number) - Movimento de estoque</p><br></li><br><li><br><p>4 (number) - Simples</p><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Indica se a pessoa está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo peso definido na tarefa.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo identificador da recorrência.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo identificador da tarefa dependente.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra resultados pelo identificador da tarefa principal.</p><br> |
| `` |  | não | `array[number]` | `` | <p>Filtra resultados por uma lista de identificadores de status do fluxo de trabalho.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados por tipo de relacionamento.</p><br><ul><br><li><br><p><code>app\modules\administrator\models\Lead</code> - Lead</p><br></li><br><li><br><p><code>app\modules\administrator\models\People</code> - Pessoa</p><br></li><br><li><br><p><code>app\modules\administrator\models\Project</code> - Projeto</p><br></li><br><li><br><p><code>app\modules\administrator\models\Sale</code> - Venda</p><br></li><br><li><br><p><code>app\modules\administrator\models\Task</code> - Tarefa</p><br></li><br><li><br><p><code>app\modules\administrator\models\Support</code> - Suporte</p><br></li><br><li><br><p><code>Provider</code> - Fornecedor</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Filtra por ID do registro relacionado.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID do usuário que criou a tarefa.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela data de criação da tarefa. Formato: <code>YYYY-MM-DD - YYYY-MM-DD</code> ou <code>YYYY-MM-DD HH:mm:ss - YYYY-MM-DD HH:mm:ss</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Filtra pelo ID do último usuário que atualizou a tarefa.</p><br> |
| `` |  | não | `string` | `` | <p>Filtra resultados pela última data de atualização da tarefa. Formato: <code>YYYY-MM-DD - YYYY-MM-DD</code> ou <code>YYYY-MM-DD HH:mm:ss - YYYY-MM-DD HH:mm:ss</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Número de itens por página. Padrão: <code>20</code>.</p><br> |
| `` |  | não | `number` | `` | <p>Número da página. Padrão: <code>1</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Ordenação. Para ordenar de forma ascendente, use <code>campo</code> e para ordenar de forma descendente use <code>-campo</code>.</p><br> |
| `` |  | não | `string` | `` | <p>Expande registros com relações.</p><br><ul><br><li><br><p><code>sale</code> - Vendas geradas pela tarefa.</p><br></li><br><li><br><p><code>department</code> - Vendas geradas pela tarefa.</p><br></li><br><li><br><p><code>warehouse</code> - Vendas geradas pela tarefa.</p><br></li><br><li><br><p><code>subscription</code> - Vendas geradas pela tarefa.</p><br></li><br><li><br><p><code>chronometers</code> - Vendas geradas pela tarefa.</p><br></li><br><li><br><p><code>taskChecklistItems</code> - Itens de checklist da tarefa.</p><br></li><br><li><br><p><code>taskComments</code> - Colaboradores da tarefa.</p><br></li><br><li><br><p><code>taskDocuments</code> - Documentos da tarefa.</p><br></li><br><li><br><p><code>taskRevenues</code> - Documentos da tarefa.</p><br></li><br><li><br><p><code>taskExpenses</code> - Documentos da tarefa.</p><br></li><br><li><br><p><code>taskTagTask</code> - Tags da tarefa.</p><br></li><br><li><br><p><code>taskRelations</code> - Relacionamentos da tarefa.</p><br></li><br><li><br><p><code>taskFollower</code> - Seguidores da tarefa.</p><br></li><br><li><br><p><code>taskProducts</code> - Produtos da tarefa.</p><br></li><br><li><br><p><code>taskServices</code> - Serviços da tarefa.</p><br></li><br><li><br><p><code>taskDepartments</code> - Grupos de checklist da tarefa.</p><br></li><br><li><br><p><code>taskChecklistGroup</code> - Grupos de checklist da tarefa.</p><br></li><br><li><br><p><code>taskCollaborators</code> - Colaboradores da tarefa.</p><br></li><br><li><br><p><code>taskSignatures</code> - Assinaturas da tarefa.</p><br></li><br><li><br><p><code>cardStatuses</code> - Status do fluxo de trabalho da tarefa.</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
[
  {
    "id" : "16" ,
    "name" : "teste" ,
    "hourly_rate" : "" ,
    "start_date" : "2022-01-19" ,
    "due_date" : "" ,
    "priority" : "" ,
    "recurring" : "" ,
    "recurring_type" : "" ,
    "department_id" : "" ,
    "checklist_templates" : "" ,
    "type" : "" ,
    "cycles" : 0 ,
    "last_recurring_date" : "" ,
    "total_cycles" : 0 ,
    "status" : 0 ,
    "public" : 0 ,
    "related_to" : "" ,
    "related_id" : "" ,
    "description" : "<p>descrição<br></p>" ,
    "observation" : "" ,
    "date_finished" : "2021-01-22" ,
    "active" : 1 ,
    "created_by" : 1,
    "updated_by" : 1,
    "created_at" : "2022-01-18 13:27:24" ,
    "updated_at" : "2022-01-18 13:27:24" ,
    "select_recurring" : "" ,
    "tags" : "" ,
    "documents" : "" ,
    "budget" : "" ,
    "collaborator" : "" ,
    "follower" : "" ,
    "collaborator_disp" : "" ,
    "follower_disp" : "" ,
    "bill_value" : 0 ,
    "billing_type" : 2 ,
    "stock_movement_id" : "" ,
    "warehouse_id" : "" ,
    "estimated_hours" : 35 ,
    "total_time" : "" ,
    "weight" : "" 
  }
]
````

##### `GET /task/{id}{?expand}` — Obter uma tarefa

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da tarefa.</p><br> |
| `` |  | não | `string` | `` | <p>Expande registros com relações separadas por vírgula.</p><br><ul><br><li><br><p><code>sale</code> - Vendas geradas pela tarefa.</p><br></li><br><li><br><p><code>department</code> - Departamento principal da tarefa.</p><br></li><br><li><br><p><code>warehouse</code> - Local de estoque da tarefa.</p><br></li><br><li><br><p><code>subscription</code> - Recorrência da tarefa.</p><br></li><br><li><br><p><code>chronometers</code> - Cronômetros da tarefa.</p><br></li><br><li><br><p><code>taskChecklistItems</code> - Itens de checklist da tarefa.</p><br></li><br><li><br><p><code>taskComments</code> - Comentários da tarefa.</p><br></li><br><li><br><p><code>taskDocuments</code> - Documentos da tarefa.</p><br></li><br><li><br><p><code>taskRevenues</code> - Receitas da tarefa.</p><br></li><br><li><br><p><code>taskExpenses</code> - Despesas da tarefa.</p><br></li><br><li><br><p><code>taskTagTask</code> - Tags da tarefa.</p><br></li><br><li><br><p><code>taskRelations</code> - Relacionamentos da tarefa.</p><br></li><br><li><br><p><code>taskFollower</code> - Seguidores da tarefa.</p><br></li><br><li><br><p><code>taskProducts</code> - Produtos da tarefa.</p><br></li><br><li><br><p><code>taskServices</code> - Serviços da tarefa.</p><br></li><br><li><br><p><code>taskDepartments</code> - Departamentos associados à tarefa.</p><br></li><br><li><br><p><code>taskChecklistGroup</code> - Grupos de checklist da tarefa.</p><br></li><br><li><br><p><code>taskCollaborators</code> - Colaboradores da tarefa.</p><br></li><br><li><br><p><code>taskSignatures</code> - Assinaturas da tarefa.</p><br></li><br><li><br><p><code>cardStatuses</code> - Status do fluxo de trabalho da tarefa.</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
  "id": 42,
  "name": "Planejamento da Campanha de Lançamento - Produto Y",
  "hourly_rate": 150.50,
  "start_date": "2023-11-20",
  "due_date": "2023-12-22",
  "priority": 3,
  "recurring": 1,
  "recurring_type": 2,
  "department_id": 5,
  "checklist_templates": 2,
  "recurring_quantity": 1,
  "status": 2,
  "public": 1,
  "description": "<p>Elaboração do plano de marketing completo para o lançamento do Produto Y.</p>",
  "observation": "Focar em estratégias de marketing digital com ênfase em mídias sociais e influenciadores",
  "date_finished": null,
  "active": 1,
  "created_by": 1,
  "updated_by": 3,
  "created_at": "2023-11-15 10:30:00",
  "updated_at": "2023-11-18 14:00:00",
  "budget": 25000.00,
  "bill_value": 0,
  "billing_type": 2,
  "stock_movement_id": null,
  "warehouse_id": null,
  "estimated_hours": 160,
  "weight": 5,
  "custom_field": {
      "especificacoes_tecnicas": "",
      "data_aprovacao_cliente": "2023-11-14"
  },
  "type": 0,
  "subscription_id": 12,
  "main_task_id": null,
  "copied_from": 5,
  "related_task": 38,
  "start_time": "09:00",
  "due_time": "18:00",
  "send_mail_when_signed": 1
}
````

##### `POST /task` — Incluir uma Tarefa

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
  "id": 42,
  "name": "Planejamento da Campanha de Lançamento - Produto Y",
  "hourly_rate": 150.50,
  "start_date": "2023-11-20",
  "due_date": "2023-12-22",
  "priority": 3,
  "recurring": 1,
  "recurring_type": 2,
  "department_id": 5,
  "checklist_templates": 2,
  "recurring_quantity": 1,
  "status": 2,
  "public": 1,
  "description": "<p>Elaboração do plano de marketing completo para o lançamento do Produto Y.</p>",
  "observation": "Focar em estratégias de marketing digital com ênfase em mídias sociais e influenciadores",
  "date_finished": null,
  "active": 1,
  "created_by": 1,
  "updated_by": 3,
  "created_at": "2023-11-15 10:30:00",
  "updated_at": "2023-11-18 14:00:00",
  "budget": 25000.00,
  "bill_value": 0,
  "billing_type": 2,
  "stock_movement_id": null,
  "warehouse_id": null,
  "estimated_hours": 160,
  "weight": 5,
  "custom_field": {
      "especificacoes_tecnicas": "",
      "data_aprovacao_cliente": "2023-11-14"
  },
  "type": 0,
  "subscription_id": 12,
  "main_task_id": null,
  "copied_from": 5,
  "related_task": 38,
  "start_time": "09:00",
  "due_time": "18:00",
  "send_mail_when_signed": 1
}
````

##### `PUT /task/{id}` — Alterar uma tarefa

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do task.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
  "id": 42,
  "name": "Planejamento da Campanha de Lançamento - Produto Y",
  "hourly_rate": 150.50,
  "start_date": "2023-11-20",
  "due_date": "2023-12-22",
  "priority": 3,
  "recurring": 1,
  "recurring_type": 2,
  "department_id": 5,
  "checklist_templates": 2,
  "recurring_quantity": 1,
  "status": 2,
  "public": 1,
  "description": "<p>Elaboração do plano de marketing completo para o lançamento do Produto Y.</p>",
  "observation": "Focar em estratégias de marketing digital com ênfase em mídias sociais e influenciadores",
  "date_finished": null,
  "active": 1,
  "created_by": 1,
  "updated_by": 3,
  "created_at": "2023-11-15 10:30:00",
  "updated_at": "2023-11-18 14:00:00",
  "budget": 25000.00,
  "bill_value": 0,
  "billing_type": 2,
  "stock_movement_id": null,
  "warehouse_id": null,
  "estimated_hours": 160,
  "weight": 5,
  "custom_field": {
      "especificacoes_tecnicas": "",
      "data_aprovacao_cliente": "2023-11-14"
  },
  "type": 0,
  "subscription_id": 12,
  "main_task_id": null,
  "copied_from": 5,
  "related_task": 38,
  "start_time": "09:00",
  "due_time": "18:00",
  "send_mail_when_signed": 1
}
````

##### `DELETE /task/{id}` — Excluir uma tarefa

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno do task.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Tarefas Pessoais

##### `GET /todo?id={id}&complete={complete}&active={active}&description={description}&due_date={due_date}&due_time={due_time}` — Obter uma ou várias Tarefas Pessoais

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno da tarefa pessoal.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se a tarefa pessoal está completa.</p><br><ul><br><li><br><p>0 (number) - Não foi realizada ainda(padrão)</p><br></li><br><li><br><p>1 (number) - Tarefa pessoal completa</p><br></li><br></ul><br> |
| `` |  | não | `string` | `` | <p>Descrição da tarefa pessoal.</p><br> |
| `` |  | não | `string` | `` | <p>Data de vencimento da tarefa pessoal.</p><br> |
| `` |  | não | `string` | `` | <p>Hora de vencimento da tarefa pessoal.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se a tarefa pessoal está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "complete": 0,
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
    "description": "Realizar testes de cadastrar tarefas do tipo venda",
    "due_date": "2022-02-15",
    "due_time": "16:00:00"
}
````

##### `POST /todo` — Incluir uma tarefa pessoal

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
  {
    "id": 1,
    "complete": 0,
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
    "description": "Realizar testes de cadastrar tarefas do tipo venda",
    "due_date": "2022-02-15",
    "due_time": "16:00:00"
}
````

##### `PUT /todo/{id}` — Alterar uma tarefa pessoal

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da tarefa pessoal.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "complete": 0,
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-12-13 20:15:21",
    "updated_at": "2022-01-21 19:18:58",
    "description": "Realizar testes de cadastrar tarefas do tipo venda",
    "due_date": "2022-02-15",
    "due_time": "16:00:00"
}
````

##### `DELETE /todo/{id}` — Excluir uma tarefa pessoal

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da tarefa pessoal.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

#### Tipos de Documento

##### `GET /bill-doc-type?id={id}&code={code}&description={description}&active={active}` — Obter um ou vários tipos de documentos

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno do tipo de documento.</p><br> |
| `` |  | não | `string` | `` | <p>Código do tipo de documento.</p><br> |
| `` |  | não | `string` | `` | <p>Descrição do tipo de documento.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se o tipo de documento está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 1,
    "code": "DIN",
    "description": "Dinheiro",
    "active": 1,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2021-09-23 16:34:12",
    "updated_at": "2021-09-23 16:34:12",
}
````

#### Tributação de Serviços

##### `GET /service-tax?id={id}&name={name}&code={code}&active={active}` — Obter uma ou várias tributações de serviços

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno da tributação.</p><br> |
| `` |  | não | `string` | `` | <p>Nome da tributação.</p><br> |
| `` |  | não | `string` | `` | <p>Código da tributação.</p><br> |
| `` |  | não | `enum` | `` | <p>Indica se a tributação está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 5,
    "name": "Imune",
    "code": 5,
    "active": 1,
    "created_by": null,
    "updated_by": null,
    "created_at": null,
    "updated_at": null
},
````

#### Vendas

##### `GET /sale?id={id}&type={type}&id_buyer={id_buyer}&opening_date={opening_date}&forecast_closing_date={forecast_closing_date}&status={status}&active={active}&created_by={created_by}&updated_by={updated_by}&created_at={created_at}&updated_at={updated_at}&admin_note={admin_note}&nf_informations={nf_informations}&terms={terms}&email={email}&freight={freight}&id_payment_term={id_payment_term}&payment_gateway={payment_gateway}&freight_type={freight_type}&discount={discount}&discount_type={discount_type}&number_of_installments={number_of_installments}&invoice_for_final_consumption={invoice_for_final_consumption}&id_price_list={id_price_list}&subject={subject}&task_id={task_id}&merged_sale_id={merged_sale_id}&id_document_type={id_document_type}&due_date={due_date}&review={review}&lost_reason_id={lost_reason_id}&expedition={expedition}&warehouse_id={warehouse_id}&id_project={id_project}&request_number={request_number}&contract_number={contract_number}&delivery_date={delivery_date}&shipping_company={shipping_company}&volume_quantity={volume_quantity}&volume_type={volume_type}&days_to_delivery={days_to_delivery}&net_weight={net_weight}&gross_weight={gross_weight}&volume_mark={volume_mark}&volume_number={volume_number}&seal_number={seal_number}&tracking_code={tracking_code}&vehicle_plate={vehicle_plate}&vehicle_plate_state={vehicle_plate_state}&record_carrier={record_carrier}&safe_value={safe_value}&other_expenses={other_expenses}&subscription_id={subscription_id}&billed_from={billed_from}&total_pis={total_pis}&total_cofins={total_cofins}&total_icms={total_icms}&total_icms_st={total_icms_st}&total_ipi={total_ipi}&id_buyer_contact={id_buyer_contact}&total_pis_st={total_pis_st}&total_fcp_st={total_fcp_st}&total_cofins_st={total_cofins_st}&total={total}&id_address_buyer={id_address_buyer}&id_tax_scenario={id_tax_scenario}&code={code}&asset_rental_departure_date={asset_rental_departure_date}&asset_rental_expected_return_date={asset_rental_expected_return_date}&asset_rental_id={asset_rental_id}&asset_rental_service_id={asset_rental_service_id}&remaining_invoice={remaining_invoice}&per-page={perpage}&page={page}&expand={expand}` — Obter uma ou várias vendas

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | não | `number` | `` | <p>Identificador interno.</p><br> |
| `` |  | não | `enum` | `` | <p>Tipo do cliente relacionado.</p><br><ul><br><li><br><p><code>app\\modules\\administrator\\models\\People</code> - Pessoa</p><br></li><br><li><br><p><code>app\\modules\\administrator\\models\\Lead</code> - Lead</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do comprador.</p><br> |
| `` |  | não | `string` | `` | <p>Data de abertura (AAAA-MM-DD).</p><br> |
| `` |  | não | `string` | `` | <p>Data da previsão de fechamento (AAAA-MM-DD).</p><br> |
| `` |  | não | `enum` | `` | <p>Status/Situação atual.</p><br><ul><br><li><br><p>1 (number) - Orçamento</p><br></li><br><li><br><p>2 (number) - Pedido</p><br></li><br><li><br><p>3 (number) - Faturar</p><br></li><br><li><br><p>4 (number) - Faturado</p><br></li><br><li><br><p>5 (number) - Cancelado</p><br></li><br><li><br><p>6 (number) - Devolvido</p><br></li><br><li><br><p>7 (number) - Agrupado</p><br></li><br><li><br><p>8 (number) - Expedição gerada</p><br></li><br><li><br><p>9 (number) - Expedição finalizada</p><br></li><br><li><br><p>10 (number) - Gerar expedição</p><br></li><br><li><br><p>11 (number) - Faturado parcialmente</p><br></li><br><li><br><p>12 (number) - Oportunidade perdida</p><br></li><br><li><br><p>13 (number) - Declinada</p><br></li><br></ul><br> |
| `` |  | não | `enum` | `` | <p>Indica se está no estado ativo ou não.</p><br><ul><br><li><br><p>0 (number) - Inativo</p><br></li><br><li><br><p>1 (number) - Ativo (padrão)</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Código identificador do usuário que criou o colaborador.</p><br> |
| `` |  | não | `number` | `` | <p>Código identificador do último usuário que atualizou o colaborador.</p><br> |
| `` |  | não | `number` | `` | <p>Data de criação.</p><br> |
| `` |  | não | `number` | `` | <p>Data de atualização.</p><br> |
| `` |  | não | `string` | `` | <p>Nota do administrador.</p><br> |
| `` |  | não | `string` | `` | <p>Informação da nota fiscal.</p><br> |
| `` |  | não | `string` | `` | <p>Termos de compromisso.</p><br> |
| `` |  | não | `string` | `` | <p>E-mail cadastrado.</p><br> |
| `` |  | não | `number` | `` | <p>Valor do frete.</p><br> |
| `` |  | não | `number` | `` | <p>Indentificador interno do prazo de pagamento.</p><br> |
| `` |  | não | `number` | `` | <p>Sistema para pagamento.</p><br> |
| `` |  | não | `enum` | `` | <p>Identificador do tipo do frete.</p><br><ul><br><li><br><p>0 (number) - Contratação do frete por conta do remetente (CIF).</p><br></li><br><li><br><p>1 (number) - Contratação do frete por conta do destinatário (FOB).</p><br></li><br><li><br><p>2 (number) - Contratação do frete por conta de terceiros.</p><br></li><br><li><br><p>3 (number) - Transporte próprio por conta do remetente.</p><br></li><br><li><br><p>4 (number) - Transporte próprio por conta do destinatário.</p><br></li><br><li><br><p>9 (number) - Sem ocorrência de transporte.</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Valor do desconto.</p><br> |
| `` |  | não | `enum` | `` | <p>Tipo de desconto.</p><br><ul><br><li><br><p>1 (number) - Desconto em real.</p><br></li><br><li><br><p>2 (number) - Desconto em porcentagem.</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Número de parcelas.</p><br> |
| `` |  | não | `boolean` | `` | <p>Nota fiscal para consumo final.</p><br><ul><br><li><br><p>0 (number) - Não.</p><br></li><br><li><br><p>1 (number) - Sim.</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Identificador interno da Tabela de preço.</p><br> |
| `` |  | não | `string` | `` | <p>Assunto.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno da Tareta.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno da Venda agrupada.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do Tipo de documento.</p><br> |
| `` |  | não | `string` | `` | <p>Data de vencimento (AAAA-MM-DD).</p><br> |
| `` |  | não | `string` | `` | <p>Revisão.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do Motivo de perda.</p><br> |
| `` |  | não | `boolean` | `` | <p>Expedição.</p><br><ul><br><li><br><p>0 (number) - Não.</p><br></li><br><li><br><p>1 (number) - Sim.</p><br></li><br></ul><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do local de estoque da saída de produtos. Obrigatório quando a situação da venda está a partir de &quot;Pedido&quot;.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do Projeto.</p><br> |
| `` |  | não | `string` | `` | <p>Número do pedido.</p><br> |
| `` |  | não | `string` | `` | <p>Número do contrato.</p><br> |
| `` |  | não | `string` | `` | <p>Data de entrega (AAAA-MM-DD).</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno da Transportadora.</p><br> |
| `` |  | não | `number` | `` | <p>Quantidade de volume(s).</p><br> |
| `` |  | não | `string` | `` | <p>Tipo de volume.</p><br> |
| `` |  | não | `number` | `` | <p>Dias para a entrega.</p><br> |
| `` |  | não | `number` | `` | <p>Peso líquido.</p><br> |
| `` |  | não | `number` | `` | <p>Peso bruto.</p><br> |
| `` |  | não | `string` | `` | <p>Marca do volume.</p><br> |
| `` |  | não | `string` | `` | <p>Número do volume.</p><br> |
| `` |  | não | `string` | `` | <p>Número do lacre.</p><br> |
| `` |  | não | `string` | `` | <p>Códigos de rastreio.</p><br> |
| `` |  | não | `string` | `` | <p>Placa do veículo.</p><br> |
| `` |  | não | `string` | `` | <p>Estado da placa do veículo.</p><br> |
| `` |  | não | `string` | `` | <p>RNTRC (ANTT).</p><br> |
| `` |  | não | `number` | `` | <p>Valor do seguro.</p><br> |
| `` |  | não | `number` | `` | <p>Outras despesas.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno da Recorrência.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno da venda do faturamento parcial.</p><br> |
| `` |  | não | `number` | `` | <p>Total de PIS.</p><br> |
| `` |  | não | `number` | `` | <p>Total de COFINS.</p><br> |
| `` |  | não | `number` | `` | <p>Total de ICMS.</p><br> |
| `` |  | não | `number` | `` | <p>Total de ICMS ST.</p><br> |
| `` |  | não | `number` | `` | <p>Total de IPI.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do Contato do cliente.</p><br> |
| `` |  | não | `number` | `` | <p>Total de PIS ST.</p><br> |
| `` |  | não | `number` | `` | <p>Total de FCP ST.</p><br> |
| `` |  | não | `number` | `` | <p>Total de COFINS ST.</p><br> |
| `` |  | não | `number` | `` | <p>Total da venda.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do Endereço para entrega.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do Cenário de impostos.</p><br> |
| `` |  | não | `string` | `` | <p>Código da venda.</p><br> |
| `` |  | não | `string` | `` | <p>Data de saída da Locação de ativos (AAAA-MM-DD).</p><br> |
| `` |  | não | `string` | `` | <p>Data esperada de retorno da Locação de ativos (AAAA-MM-DD).</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno da Locação de Ativos.</p><br> |
| `` |  | não | `number` | `` | <p>Identificador interno do serviço da Locação de Ativos.</p><br> |
| `` |  | não | `number` | `` | <p>Valor restante a faturar.</p><br> |
| `` |  | não | `array` | `` | <p>Campos personalizados da venda.</p><br> |
| `` |  | sim | `string` | `` | <p>page (number, optional) - Quantidade de registros por requisição.</p><br> |
| `` |  | não | `number` | `` | <p>Número da página.</p><br> |
| `` |  | não | `string` | `` | <p>Expande registros com relações separadas por vírgula.</p><br><ul><br><li><br><p><code>priceList</code> - Tabela de preço da venda.</p><br></li><br><li><br><p><code>paymentTerm</code> - Prazo de pagamento da venda.</p><br></li><br><li><br><p><code>saleCollaborators</code> - Vendedores da venda.</p><br></li><br><li><br><p><code>salePaymentModes</code> - Modos de pagamento da venda.</p><br></li><br><li><br><p><code>saleProducts</code> - Produtos da venda.</p><br></li><br><li><br><p><code>saleServices</code> - Serviços da venda.</p><br></li><br><li><br><p><code>saleTags</code> - Tags da venda.</p><br></li><br><li><br><p><code>saleKits</code> - Kits da venda.</p><br></li><br><li><br><p><code>saleUnregisteredItems</code> - Itens não cadastrados da venda.</p><br></li><br><li><br><p><code>saleDepartments</code> - Departamentos da venda.</p><br></li><br><li><br><p><code>workflows</code> - Fluxos de trabalho da venda.</p><br></li><br></ul><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 125,
    "type": "app\\modules\\administrator\\models\\People",
    "id_buyer": 4,
    "opening_date": "2025-07-28",
    "forecast_closing_date": null,
    "status": 1,
    "active": 1,
    "created_by": 15,
    "updated_by": 23,
    "created_at": "2025-07-28 15:50:47",
    "updated_at": "2025-12-23 08:54:46",
    "admin_note": "",
    "nf_informations": "",
    "terms": "",
    "email": "imuv@imuv.me",
    "freight": null,
    "id_payment_term": null,
    "payment_gateway": null,
    "freight_type": null,
    "discount": null,
    "discount_type": null,
    "number_of_installments": null,
    "invoice_for_final_consumption": 1,
    "id_price_list": 1,
    "subject": "Proposta - Cliente X",
    "task_id": null,
    "merged_sale_id": null,
    "id_document_type": null,
    "due_date": null,
    "review": "",
    "lost_reason_id": null,
    "expedition": null,
    "warehouse_id": 1,
    "id_project": null,
    "request_number": "",
    "contract_number": "",
    "delivery_date": null,
    "shipping_company": null,
    "volume_quantity": null,
    "volume_type": "",
    "days_to_delivery": null,
    "net_weight": null,
    "gross_weight": null,
    "volume_mark": "",
    "volume_number": "",
    "seal_number": "",
    "tracking_code": "",
    "vehicle_plate": "",
    "vehicle_plate_state": null,
    "record_carrier": "",
    "safe_value": null,
    "other_expenses": null,
    "custom_field": {
        "datadoevento": "",
        "localdoevento": "",
        "horariodoevento": ""
    },
    "subscription_id": null,
    "billed_from": null,
    "total_pis": null,
    "total_cofins": null,
    "total_icms": null,
    "total_icms_st": null,
    "total_ipi": null,
    "id_buyer_contact": null,
    "total_pis_st": null,
    "total_fcp_st": null,
    "total_cofins_st": null,
    "total": 158,
    "id_address_buyer": null,
    "id_tax_scenario": null,
    "code": "#000125",
    "asset_rental_departure_date": null,
    "asset_rental_expected_return_date": null,
    "asset_rental_id": null,
    "asset_rental_service_id": null,
    "remaining_invoice": null,
    "priceList": {
        "id": 1,
        "name": "Tabela 10-CR",
        "code": "67B3856CED167",
        "type": 1,
        "percentage": 8,
        "due_date": null,
        "active": 1,
        "created_by": null,
        "updated_by": 21,
        "created_at": "2025-02-17 15:52:28",
        "updated_at": "2025-07-14 17:36:18",
        "product_id_family": null,
        "product_ncm_code": "CAD.MAD.001",
        "product_id_provider": null,
        "client_tag": null,
        "client_id_state": null,
        "start_date": null,
        "suggested_discount": 2,
        "maximum_discount": 10,
        "default": 0
    },
    "paymentTerm": null,
    "saleCollaborators": [
        {
            "sale_id": 125,
            "collaborator_id": 6,
            "active": 1,
            "created_by": 23,
            "updated_by": 23,
            "created_at": "2025-12-23 08:54:46",
            "updated_at": "2025-12-23 08:54:46",
            "id": 257
        }
    ],
    "salePaymentModes": [],
    "saleProducts": [
        {
            "id": 204,
            "id_sale": 125,
            "id_product": 46,
            "quantity": 1,
            "unitary_value": 30,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 4,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 03 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 1,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 205,
            "id_sale": 125,
            "id_product": 47,
            "quantity": 1,
            "unitary_value": 35,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 5,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 10 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 2,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 206,
            "id_sale": 125,
            "id_product": 48,
            "quantity": 1,
            "unitary_value": 28,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 0,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 15 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 3,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 207,
            "id_sale": 125,
            "id_product": 49,
            "quantity": 1,
            "unitary_value": 32,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 0,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 25 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 4,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 208,
            "id_sale": 125,
            "id_product": 50,
            "quantity": 1,
            "unitary_value": 33,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 0,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 7 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 5,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        }
    ],
    "saleServices": [],
    "saleTags": "",
    "saleKits": [],
    "saleUnregisteredItems": [],
    "saleDepartments": [],
    "workflows": [
        {
            "workflow": "1021",
            "card_status": "174"
        }
    ]
}
````

##### `POST /sale` — Incluir uma venda

Parâmetros:

Sem parâmetros declarados.

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 125,
    "type": "app\\modules\\administrator\\models\\People",
    "id_buyer": 4,
    "opening_date": "2025-07-28",
    "forecast_closing_date": null,
    "status": 1,
    "active": 1,
    "created_by": 15,
    "updated_by": 23,
    "created_at": "2025-07-28 15:50:47",
    "updated_at": "2025-12-23 08:54:46",
    "admin_note": "",
    "nf_informations": "",
    "terms": "",
    "email": "imuv@imuv.me",
    "freight": null,
    "id_payment_term": null,
    "payment_gateway": null,
    "freight_type": null,
    "discount": null,
    "discount_type": null,
    "number_of_installments": null,
    "invoice_for_final_consumption": 1,
    "id_price_list": 1,
    "subject": "Proposta - Cliente X",
    "task_id": null,
    "merged_sale_id": null,
    "id_document_type": null,
    "due_date": null,
    "review": "",
    "lost_reason_id": null,
    "expedition": null,
    "warehouse_id": 1,
    "id_project": null,
    "request_number": "",
    "contract_number": "",
    "delivery_date": null,
    "shipping_company": null,
    "volume_quantity": null,
    "volume_type": "",
    "days_to_delivery": null,
    "net_weight": null,
    "gross_weight": null,
    "volume_mark": "",
    "volume_number": "",
    "seal_number": "",
    "tracking_code": "",
    "vehicle_plate": "",
    "vehicle_plate_state": null,
    "record_carrier": "",
    "safe_value": null,
    "other_expenses": null,
    "custom_field": {
        "datadoevento": "",
        "localdoevento": "",
        "horariodoevento": ""
    },
    "subscription_id": null,
    "billed_from": null,
    "total_pis": null,
    "total_cofins": null,
    "total_icms": null,
    "total_icms_st": null,
    "total_ipi": null,
    "id_buyer_contact": null,
    "total_pis_st": null,
    "total_fcp_st": null,
    "total_cofins_st": null,
    "total": 158,
    "id_address_buyer": null,
    "id_tax_scenario": null,
    "code": "#000125",
    "asset_rental_departure_date": null,
    "asset_rental_expected_return_date": null,
    "asset_rental_id": null,
    "asset_rental_service_id": null,
    "remaining_invoice": null,
    "priceList": {
        "id": 1,
        "name": "Tabela 10-CR",
        "code": "67B3856CED167",
        "type": 1,
        "percentage": 8,
        "due_date": null,
        "active": 1,
        "created_by": null,
        "updated_by": 21,
        "created_at": "2025-02-17 15:52:28",
        "updated_at": "2025-07-14 17:36:18",
        "product_id_family": null,
        "product_ncm_code": "CAD.MAD.001",
        "product_id_provider": null,
        "client_tag": null,
        "client_id_state": null,
        "start_date": null,
        "suggested_discount": 2,
        "maximum_discount": 10,
        "default": 0
    },
    "paymentTerm": null,
    "saleCollaborators": [
        {
            "sale_id": 125,
            "collaborator_id": 6,
            "active": 1,
            "created_by": 23,
            "updated_by": 23,
            "created_at": "2025-12-23 08:54:46",
            "updated_at": "2025-12-23 08:54:46",
            "id": 257
        }
    ],
    "salePaymentModes": [],
    "saleProducts": [
        {
            "id": 204,
            "id_sale": 125,
            "id_product": 46,
            "quantity": 1,
            "unitary_value": 30,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 4,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 03 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 1,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 205,
            "id_sale": 125,
            "id_product": 47,
            "quantity": 1,
            "unitary_value": 35,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 5,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 10 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 2,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 206,
            "id_sale": 125,
            "id_product": 48,
            "quantity": 1,
            "unitary_value": 28,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 0,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 15 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 3,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 207,
            "id_sale": 125,
            "id_product": 49,
            "quantity": 1,
            "unitary_value": 32,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 0,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 25 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 4,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 208,
            "id_sale": 125,
            "id_product": 50,
            "quantity": 1,
            "unitary_value": 33,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 0,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 7 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 5,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        }
    ],
    "saleServices": [],
    "saleTags": "",
    "saleKits": [],
    "saleUnregisteredItems": [],
    "saleDepartments": [],
    "workflows": [
        {
            "workflow": "1021",
            "card_status": "174"
        }
    ]
}
````

##### `PUT /sale/{id}` — Alterar uma venda

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da venda.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

````json
{
    "id": 125,
    "type": "app\\modules\\administrator\\models\\People",
    "id_buyer": 4,
    "opening_date": "2025-07-28",
    "forecast_closing_date": null,
    "status": 1,
    "active": 1,
    "created_by": 15,
    "updated_by": 23,
    "created_at": "2025-07-28 15:50:47",
    "updated_at": "2025-12-23 08:54:46",
    "admin_note": "",
    "nf_informations": "",
    "terms": "",
    "email": "imuv@imuv.me",
    "freight": null,
    "id_payment_term": null,
    "payment_gateway": null,
    "freight_type": null,
    "discount": null,
    "discount_type": null,
    "number_of_installments": null,
    "invoice_for_final_consumption": 1,
    "id_price_list": 1,
    "subject": "Proposta - Cliente X",
    "task_id": null,
    "merged_sale_id": null,
    "id_document_type": null,
    "due_date": null,
    "review": "",
    "lost_reason_id": null,
    "expedition": null,
    "warehouse_id": 1,
    "id_project": null,
    "request_number": "",
    "contract_number": "",
    "delivery_date": null,
    "shipping_company": null,
    "volume_quantity": null,
    "volume_type": "",
    "days_to_delivery": null,
    "net_weight": null,
    "gross_weight": null,
    "volume_mark": "",
    "volume_number": "",
    "seal_number": "",
    "tracking_code": "",
    "vehicle_plate": "",
    "vehicle_plate_state": null,
    "record_carrier": "",
    "safe_value": null,
    "other_expenses": null,
    "custom_field": {
        "datadoevento": "",
        "localdoevento": "",
        "horariodoevento": ""
    },
    "subscription_id": null,
    "billed_from": null,
    "total_pis": null,
    "total_cofins": null,
    "total_icms": null,
    "total_icms_st": null,
    "total_ipi": null,
    "id_buyer_contact": null,
    "total_pis_st": null,
    "total_fcp_st": null,
    "total_cofins_st": null,
    "total": 158,
    "id_address_buyer": null,
    "id_tax_scenario": null,
    "code": "#000125",
    "asset_rental_departure_date": null,
    "asset_rental_expected_return_date": null,
    "asset_rental_id": null,
    "asset_rental_service_id": null,
    "remaining_invoice": null,
    "priceList": {
        "id": 1,
        "name": "Tabela 10-CR",
        "code": "67B3856CED167",
        "type": 1,
        "percentage": 8,
        "due_date": null,
        "active": 1,
        "created_by": null,
        "updated_by": 21,
        "created_at": "2025-02-17 15:52:28",
        "updated_at": "2025-07-14 17:36:18",
        "product_id_family": null,
        "product_ncm_code": "CAD.MAD.001",
        "product_id_provider": null,
        "client_tag": null,
        "client_id_state": null,
        "start_date": null,
        "suggested_discount": 2,
        "maximum_discount": 10,
        "default": 0
    },
    "paymentTerm": null,
    "saleCollaborators": [
        {
            "sale_id": 125,
            "collaborator_id": 6,
            "active": 1,
            "created_by": 23,
            "updated_by": 23,
            "created_at": "2025-12-23 08:54:46",
            "updated_at": "2025-12-23 08:54:46",
            "id": 257
        }
    ],
    "salePaymentModes": [],
    "saleProducts": [
        {
            "id": 204,
            "id_sale": 125,
            "id_product": 46,
            "quantity": 1,
            "unitary_value": 30,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 4,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 03 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 1,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 205,
            "id_sale": 125,
            "id_product": 47,
            "quantity": 1,
            "unitary_value": 35,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 5,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 10 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 2,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 206,
            "id_sale": 125,
            "id_product": 48,
            "quantity": 1,
            "unitary_value": 28,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 0,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 15 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 3,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 207,
            "id_sale": 125,
            "id_product": 49,
            "quantity": 1,
            "unitary_value": 32,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 0,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 25 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 4,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        },
        {
            "id": 208,
            "id_sale": 125,
            "id_product": 50,
            "quantity": 1,
            "unitary_value": 33,
            "active": 1,
            "created_by": 15,
            "updated_by": 23,
            "created_at": "2025-07-30 09:32:22",
            "updated_at": "2025-12-23 08:54:46",
            "discount": null,
            "discount_type": null,
            "change_stock": 0,
            "icms": 0,
            "width": null,
            "height": null,
            "length": null,
            "used_in_service": 0,
            "description": "Entrega em 7 dias",
            "group": "Produtos",
            "product_warehouse_batch_id": null,
            "total_ipi": null,
            "ipi_tax_rate": null,
            "origin_sale_product_id": null,
            "group_order": 1,
            "order": 5,
            "icms_st": null,
            "purchase_order_number": "",
            "purchase_order_item": null
        }
    ],
    "saleServices": [],
    "saleTags": "",
    "saleKits": [],
    "saleUnregisteredItems": [],
    "saleDepartments": [],
    "workflows": [
        {
            "workflow": "1021",
            "card_status": "174"
        }
    ]
}
````

##### `DELETE /sale/{id}` — Excluir uma venda

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da venda.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz",
  "Content-Type": "multipart/form-data"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/json"
}
````

##### `GET /sale/{id}/pdf` — Obter o PDF da visualização da Venda

<p>Retorna o documento PDF da visualização da venda gerada pelo sistema.</p>

Parâmetros:

| Nome | Local | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---:|---|---|---|
| `` |  | sim | `number` | `` | <p>Identificador interno da venda.</p><br> |

Cabeçalhos da requisição:

````json
{
  "Authorization": "Bearer 123456789abcdefghijklmnopqrstuvwxyz"
}
````

Resposta HTTP `200`:

Cabeçalhos:

````json
{
  "Content-Type": "application/pdf",
  "Content-Disposition": "inline; filename=\"Venda_{id}.pdf\""
}
````

````json
[Dados binários do PDF]
````

