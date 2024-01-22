import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsService} from "../services/forms.service";
import {Router} from "@angular/router";
import {FormField, TypeFields} from "../forms-list/models/form-list.model";


@Component({
  selector: 'form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['form-item.component.css'],
})
export class FormItemComponent implements OnInit {

  @Input() public model!: FormField;
  public fieldType = TypeFields;
  public additionalData: string[] = [];
  public fieldTypeList = [
    { label: 'Выбор даты', value: TypeFields.dataPicker },
    { label: 'Текстовое поле', value: TypeFields.text },
    { label: 'Множетсвенный выбор', value: TypeFields.multiSelect },
    { label: 'Радио', value: TypeFields.radioButtons },
    { label: 'Текстовый блок', value: TypeFields.textArea },
    { label: 'Селект', value: TypeFields.select },
  ];

  @Output() deleteEvent = new EventEmitter();


  constructor(public formsService: FormsService)
  {

  }

  ngOnInit() {
  }

  public deleteField(): void {
    this.deleteEvent.emit(this.model.id)
  }

  public addDataItem(): void {
    const item = 'Вариант' + ' ' + (this.additionalData.length + 1)
    this.additionalData.push(item)
  }

  public deleteDataItem(index: number): void {
    this.additionalData.splice(index,1)
  }

  public cleatAdditionalData(): void {
    this.additionalData = []
  }


}
