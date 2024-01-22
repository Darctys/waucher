import {Injectable} from "@angular/core";
import {FormField, FormModel} from "../forms-list/models/form-list.model";


@Injectable()
export class FormsService {

  public formsList: FormModel[] = []

  constructor() {

  }

  public getForm(id: number): FormModel {
    return this.formsList.find((item: FormModel) => item.id === Number(id))!
  }

  public delete(id: number): void {
    this.formsList = this.formsList.filter(item => item.id !== id);
  }

  public deleteField(fieldId: number, formId: number): void {
    this.formsList.forEach((form:FormModel) => {
      if (form.id === formId){
        let index = form.fields.findIndex(x => x.id === formId);
        form.fields.splice(index, 1)
      }
    });
  }
}
