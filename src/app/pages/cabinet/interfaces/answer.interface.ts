export interface IAnswerInterface {
  formId: string;
  studentId: string;
  inputs: IInputs[];
  id: string;
  status: string;
  date: Date;

}

export interface IInputs {
  value: string;
  name: string;
}
