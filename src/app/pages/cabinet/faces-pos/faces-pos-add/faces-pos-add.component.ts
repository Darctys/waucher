import { Component, OnInit } from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {forkJoin, Observable, of, switchMap, tap} from "rxjs";
import {emailValidator, mobileValidator} from "../../../../validators/form.validator";
import {PosFaceDataService} from "../services/pos-face-data.service";
import {FacePosInterface} from "../models/face-pos.interface";
import {FileModel} from "../../finansial-assistance-list/models/file.model";
import {fileReadAsBase64$} from "../../../data/modules/files/heplers";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'faces-pos-add',
  templateUrl: './faces-pos-add.component.html',
  styleUrls: ['./faces-pos-add.component.css']
})
export class FacesPosAddComponent implements OnInit{

  public validateForm!: FormGroup;
  public image!: NzUploadFile[];
  public fileList: NzUploadFile[] = [];
  public phoneMask = { mask: "+{7} (000) 000-00-00" };

  public fd = new FormData();

  public beforeUpload(file: NzUploadFile) {
    this.image = [file];
    console.log(this.image)
    return false;
}


  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _posFaceDataService: PosFaceDataService,
  ) {}



  ngOnInit(): void {
    this.validateForm = this._fb.group({
      fullName: [null, [Validators.required]],
      institute: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      photo: [null],
      description: [null, [Validators.required]],
      vkLink: [null, [Validators.required]],
      tgLink: [null, [Validators.required]],
      phone: [null, [Validators.required, mobileValidator]],
      email: [null, [Validators.required, emailValidator]]
    });
  }

  public OnFileSelected(event: any) {
    let image = event.target.files[0];
    const file: File = event.target.files[0].arrayBuffer().then((g: any) => {
      console.log(g)
      }
    )
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = (e) => this.image = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.fd.append('image',event.target.files[0], event.target.files[0].name)
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
    // this._facesService.addFace(this.toModel())
    this._modal.destroy();
    this.getImage().pipe(
      switchMap((image: FileModel) => {
        return this._posFaceDataService.savePosFace(this.toModel(image))
      }),
      switchMap((value: any) => {
        return this._posFaceDataService.getPosFaceList()
      }),
      tap(() =>
        this._modal.destroy()
      ),
    ).subscribe()

  }
  public cancel(): void {
    this._modal.destroy();
  }

  public toModel(image: FileModel): FacePosInterface{
    return {
      fullName: this.validateForm.value.fullName,
      institute: this.validateForm.value.institute,
      birthday: this.validateForm.value.birthday,
      photo: image,
      description: this.validateForm.value.description,
      vkLink: this.validateForm.value.vkLink,
      tgLink: this.validateForm.value.tgLink,
      phone: this.validateForm.value.phone,
      email: this.validateForm.value.email,
    }
  }

  private getImage(): Observable<FileModel> {
    return of(this.image)
      .pipe(
        switchMap((file: NzUploadFile[]) => {
          console.log(file)
          const trueFile: FileModel = new FileModel();
          trueFile.type = `.${file[0].type!.split('/')[1]}`;
          trueFile.name = file[0].name;
          return fileReadAsBase64$(file[0] as any)
            .pipe(
              switchMap((value: string) => {
                trueFile.content = value;

                return of(trueFile)
              })
            )
        })
      )
  }
}
