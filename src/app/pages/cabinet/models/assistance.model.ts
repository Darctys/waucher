import {FinancialAssistanceListPage} from "../finansial-assistance-list/financial-assistance-list.page";
import {FinancialAssistanceStatusEnum} from "../enums/financial-assitance-status.enum";
import {InstituteEnum} from "../enums/institute.enum";

export class AssistanceModel {
  public studentId!: string;
  public studentFullName!: string;
  public institute!: InstituteEnum;
  public id!: string;
  public reason!: string;
  public submissionPlace!: string;
  public documents!: string[];
  public status!: FinancialAssistanceStatusEnum
}
