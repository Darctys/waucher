import { Component, OnInit } from '@angular/core';
import {FormsService} from "../services/forms.service";
import {FormField, FormModel} from "../forms-list/models/form-list.model";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-welcome',
  templateUrl: './forms-create.component.html',
  styleUrls: ['./forms-create.css'],
})
export class FormsCreateComponent implements OnInit {

  public form: FormModel = new FormModel()

  public start!: Date;
  public end!: Date;

  constructor(
    public formsService: FormsService,
    private _location: Location,
    private _route: ActivatedRoute,
  )
  {

    const id: number = this._route.snapshot.queryParams['id']
    if (id) {
      this.form = formsService.getForm(id);
      this.start = new Date(this.form.start)
      this.end = new Date(this.form.end)

      console.log(formsService.formsList)
    }else{
      this.form.id = this.formsService.formsList.length + 1
    }
  }

  ngOnInit() {
  }

  public addField(): void {
    const field = new FormField()
    field.formId = this.form.id
    field.id = this.form.fields.length + 1
    field.name='';
    field.type = undefined;
    field.required = false
    this.form.fields.push(field)
  }

  public deleteField(formId: number): void {
    let index = this.form.fields.findIndex(x => x.id === formId);
    this.form.fields.splice(index, 1)
  }

  // Придумать новую систему сохранения формы.
  // С промежуточной чтобы можно было юзать просто бэк
  public saveForm(): void{
    let flag = true;
    this.form.end= this.end?.toUTCString()
    this.form.start= this.start?.toUTCString()
    this.formsService.formsList.forEach((item:FormModel) => {
      if (item.id === this.form.id){
        flag = false
        this._location.back();

      }
    })
    if (flag){
      this.formsService.formsList.push(this.form);
      this._location.back();
    }
  }

}
