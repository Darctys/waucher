import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IFaceInterface} from "../../interfaces/face.interface";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FacesPosAddComponent} from "../faces-pos-add/faces-pos-add.component";
import {FacesPosEditComponent} from "../faces-pos-edit/faces-pos-edit.component";
import {FormBuilder} from "@angular/forms";
import {InstituteEnum} from "../../enums/institute.enum";
import {PosFaceDataService} from "../services/pos-face-data.service";
import {FacePosInterface} from "../models/face-pos.interface";

@Component({
  selector: 'faces-pos-detail',
  templateUrl: './faces-pos-detail.component.html',
  styleUrls: ['./faces-pos-detail.component.css']
})
export class FacesPosDetailComponent implements OnInit {

  public face!: FacePosInterface;
  public instituteEnum = InstituteEnum;

  constructor(
    private _posFaceDataService: PosFaceDataService,
    private _route: ActivatedRoute,
    private _modal:NzModalService,
    private _fb: FormBuilder,
  ) {}

  public ngOnInit() {
    const id: string = this._route.snapshot.queryParams['id']
    this._posFaceDataService.getPosFaceById(id);
  }

  public createEditFaceModal(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Изменить данные лица POS',
      nzContent: FacesPosEditComponent,
      nzComponentParams: {
        face: this.face,
      },
    });
  }
}
