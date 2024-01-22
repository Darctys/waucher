import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFaceInterface} from "../../interfaces/face.interface";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import { RequestService } from '../../services/request.service';
import { tap } from 'rxjs';
import {emailValidator, mobileValidator} from "../../../../validators/form.validator";
import {FacePosInterface} from "../models/face-pos.interface";
import {PosFaceDataService} from "../services/pos-face-data.service";


@Component({
  selector: 'faces-pos-edit',
  templateUrl: './faces-pos-edit.component.html',
  styleUrls: ['./faces-pos-edit.component.css']
})
export class FacesPosEditComponent implements OnInit{

  public validateForm!: FormGroup;
  public face!: FacePosInterface;
  public fileList: NzUploadFile[] = [];
  public phoneMask = { mask: "+{7} (000) 000-00-00" };

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _posFaceDataService: PosFaceDataService,
  ) {}

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-2);

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }

  ngOnInit(): void {
    // const blob = new Blob([this.face.photo],{type:'image'});
    // const file = blob as unknown as NzUploadFile;
    // file.name = 'Прикреплённое изображение'
    // this.fileList = [file]
    this.validateForm = this._fb.group({
      fullName: [this.face.fullName, [Validators.required]],
      institute: [this.face.institute, [Validators.required]],
      birthday: [this.face.birthday.toString(), [Validators.required]],
      photo: [this.face.photo, [Validators.required]],
      description: [this.face.description, [Validators.required]],
      vkLink: [this.face.vkLink, [Validators.required]],
      tgLink: [this.face.tgLink, [Validators.required]],
      phone: [this.face.phone, [Validators.required, mobileValidator]],
      email: [this.face.email, [Validators.required, emailValidator]]
    });
  }

  public confirm(): void {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      return
    }
    this._posFaceDataService.savePosFace(this.toModel()).pipe(
      tap(() => {
        this._modal.destroy();
      })
    ).subscribe()
    this._modal.destroy();
  }
  public cancel(): void {
    this._modal.destroy();
  }

  public toModel(): FacePosInterface{
    return {
      fullName: this.validateForm.value.fullName,
      institute: this.validateForm.value.institute,
      birthday: this.validateForm.value.birthday,
      photo: this.validateForm.value.photo,
      description: this.validateForm.value.description,
      vkLink: this.validateForm.value.vkLink,
      tgLink: this.validateForm.value.tgLink,
      phone: this.validateForm.value.phone,
      email: this.validateForm.value.email,
      id: this.face.id
    }
  }
}
