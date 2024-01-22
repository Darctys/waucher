import {InstituteEnum} from "../../enums/institute.enum";
import {FinancialAssistanceStatusEnum} from "../../enums/financial-assitance-status.enum";

export interface FinancialAssistanceFilterModel {
  Purpose?: 'Institute' | 'University',
  Reason?: string,
  Stage?: FinancialAssistanceStatusEnum,
  Institute?: InstituteEnum[],
  Page?: number,
  PerPage?: number,
  SortBy?: 'Ascending' | 'Descending',
  Sort?: 'FullName'| 'AcademicGroup' | 'StudentIdCard' | 'Institute',
  CombineWith?: 'And' | 'Or'
}
