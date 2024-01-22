import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzModalModule} from "ng-zorro-antd/modal";
import {StudentEditComponent} from "./edit-student.component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {IMaskModule} from "angular-imask";


@NgModule({
    imports: [
        NzInputModule,
        NzButtonModule,
        NzFormModule,
        ReactiveFormsModule,
        NzModalModule,
        NzSelectModule,
        IMaskModule,
    ],
  declarations: [StudentEditComponent],
  exports: [StudentEditComponent]
})
export class StudentEditModule { }
