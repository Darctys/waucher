import { NgModule } from '@angular/core';
import { FacesPosComponent } from './faces-pos.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {FacesPosAddModule} from "./faces-pos-add/faces-pos-add.module";
import {NzIconModule} from "ng-zorro-antd/icon";
import {SearchPipe} from "./pipes/search.pipe";
import {NzImageModule} from "ng-zorro-antd/experimental/image";
import {PosFaceDataService} from "./services/pos-face-data.service";


@NgModule({
  imports: [
    NzTableModule,
    CommonModule,
    NzInputModule,
    NzPopconfirmModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    FacesPosAddModule,
    NzIconModule,
    NzImageModule,

  ],
  declarations: [
    FacesPosComponent,
    SearchPipe,
  ],
  exports: [
    FacesPosComponent,
    SearchPipe
  ],
  providers:[
    PosFaceDataService
  ]
})
export class FacesPosModule { }
