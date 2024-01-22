export class FormModel {
  public name!: string;
  public description!: string;
  public id!: number;
  public fields: FormField[] = [];
  public start!: string;
  public end!: string;



}


export class FormField {
  public id!: number;
  public formId!: number;
  public name!: string;
  public type: TypeFields | undefined;
  public required: boolean | undefined;
  public additionalData?: string[] = []
}

export enum TypeFields {
  radioButtons = 'radioButtons',
  text = 'text',
  select = 'select',
  dataPicker = 'dataPicker',
  multiSelect = 'multiselect',
  textArea = 'textArea',
}
