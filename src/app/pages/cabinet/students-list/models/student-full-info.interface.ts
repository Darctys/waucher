import {IStudent} from "./student.interface";
import {InstituteEnum} from "../../enums/institute.enum";

export interface IStudentFullInfo extends IStudent {
  id?: string;
  fullName: string;
  isContract: boolean;
  academicGroup: string;
  posIdCard: string;
  studentIdCard: string;
  hasElectronicSignature: boolean;
  email: string;
  phone: string;
  institute: InstituteEnum;
  login: string;
  password: string | null;
  // isPosCardActive: boolean сказать Никите добавить
}
