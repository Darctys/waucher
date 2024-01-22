import { NgModule } from '@angular/core';
import { StudentsListComponent } from './students-list.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {StudentAddModule} from "./student-add/student-add.module";
import {NzIconModule} from "ng-zorro-antd/icon";
import {StudentListDataService} from "./services/student-list-data.service";
import {StudentsService} from "./services/students.service";
import {NzTypographyModule} from "ng-zorro-antd/typography";



@NgModule({
    imports: [
        NzTableModule,
        CommonModule,
        NzInputModule,
        NzPopconfirmModule,
        FormsModule,
        NzButtonModule,
        NzModalModule,
        StudentAddModule,
        NzIconModule,
        ReactiveFormsModule,
        NzTypographyModule,
    ],
  declarations: [
    StudentsListComponent,
  ],
  exports: [StudentsListComponent],
  providers:[
    StudentsService,
    StudentListDataService
  ]
})
export class StudentsListModule { }
