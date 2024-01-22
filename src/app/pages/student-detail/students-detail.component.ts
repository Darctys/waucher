import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {StudentEditComponent} from "../cabinet/students-list/edit-student/edit-student.component";
import {FormBuilder} from "@angular/forms";
import {InstituteEnum} from "../cabinet/enums/institute.enum";
import {RequestService} from "../cabinet/services/request.service";
import {IStudentFullInfo} from "../cabinet/students-list/models/student-full-info.interface";
import {StudentsService} from "../cabinet/students-list/services/students.service";
import {StudentListDataService} from "../cabinet/students-list/services/student-list-data.service";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {takeUntil} from "rxjs/operators";
import {StudentStorageService} from "../cabinet/students-list/services/student-storage.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css'],
  providers: [NzDestroyService]
})
export class StudentsDetailComponent implements OnInit {

  public student!: IStudentFullInfo;
  public instituteEnum = InstituteEnum;

  constructor(
    private _studentsService: StudentsService,
    private _route: ActivatedRoute,
    private _modal:NzModalService,
    private destroy$: NzDestroyService,
    private _studentListDataService: StudentListDataService,
    private _studentStorage: StudentStorageService,

  ) {

  }

  public ngOnInit() {
    const id: string = this._route.snapshot.params['id'];
    this._studentListDataService.getStudentById(id)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((student: IStudentFullInfo) => {
        this.student = student
    })
  }

  public createEditStudentModal(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Изменить данные студента',
      nzContent: StudentEditComponent,
      nzComponentParams: {
        student: this.student,
      },
    });
  }
}
