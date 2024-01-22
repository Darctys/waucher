import {FinancialAssistanceStatusEnum} from "../../enums/financial-assitance-status.enum";
import {DocumentModel} from "./document.model";
import {InstituteEnum} from "../../enums/institute.enum";

export interface IFinancialAssistanceFullInfo {
  id?: string
  studentId: string,
  purpose: 'Institute' | 'University',
  reason: string,
  stage: FinancialAssistanceStatusEnum,
  attachments: DocumentModel[],
  institute: InstituteEnum,
}
