import { NgModule } from '@angular/core';
import { StudentAddComponent } from './student-add.component';
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {RequestService} from "../../services/request.service";
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
  declarations: [StudentAddComponent],
  exports: [StudentAddComponent],
})
export class StudentAddModule { }
