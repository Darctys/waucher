import {InstituteEnum} from "../../enums/institute.enum";

export interface IStudent {
  id?: string;
  fullName: string;
  academicGroup: string;
  studentIdCard: string;
  institute: InstituteEnum;
}

export class SelectStudent {
  public fullName!: string;
  public id!: string;
}

export function mapStudentToSelectStudent(student: IStudent): SelectStudent {
  const model: SelectStudent = new SelectStudent();
  model.id = student.id!;
  model.fullName = student.fullName

  return model
}
