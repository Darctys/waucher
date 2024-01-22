import { NgModule } from '@angular/core';
import {FacesPosDetailComponent} from './faces-pos-detail.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzButtonModule} from "ng-zorro-antd/button";
import {FacesPosEditModule} from "../faces-pos-edit/faces-pos-edit.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzDescriptionsModule,
    NzButtonModule,
    FacesPosEditModule
  ],
  declarations: [FacesPosDetailComponent],
  exports: [FacesPosDetailComponent]
})
export class FacesPosDetailModule { }
