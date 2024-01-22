import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {emailValidator, mobileValidator} from "../../../../validators/form.validator";
import {IStudentFullInfo} from "../models/student-full-info.interface";
import {StudentsService} from "../services/students.service";
import {StudentListDataService} from "../services/student-list-data.service";
import {AuthService} from "../../../data/modules/auth/services/auth.service";


@Component({
  selector: 'student-edit',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class StudentEditComponent implements OnInit{

  public validateForm!: FormGroup;
  public id!: string;
  public student!: IStudentFullInfo;
  public phoneMask = { mask: "+{7} (000) 000-00-00" };

  public isRoot(): boolean {
    return this._authService.isRoot();
  }

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _studentsService: StudentsService,
    private _studentListDataService: StudentListDataService,
    private _authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.validateForm = this._fb.group({
      fullName: [this.student.fullName, [Validators.required]],
      institute: [{ value: this.student.institute, disabled: !this.isRoot()}, [Validators.required]],
      isContract: [String(this.student.isContract), [Validators.required]],
      academicGroup: [this.student.academicGroup, [Validators.required]],
      posIdCard: [this.student.posIdCard, [Validators.required]],
      studentIdCard: [this.student.studentIdCard, [Validators.required]],
      hasElectronicSignature: [String(this.student.hasElectronicSignature), [Validators.required]],
      phone: [this.student.phone, [Validators.required, mobileValidator]],
      email: [this.student.email, [Validators.required, emailValidator]],
      login: [this.student.login, [Validators.required]],
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
    this._studentListDataService.saveNewStudent(this.toModel()).pipe(
      tap(() => this._modal.destroy('ok'))
    ).subscribe()
  }
  public cancel(): void {
    this._modal.destroy();
  }

  public toModel(): IStudentFullInfo{
    return {
      fullName: this.validateForm.value.fullName,
      institute: this.validateForm.getRawValue().institute,
      isContract: this.validateForm.value.isContract === 'true',
      academicGroup: this.validateForm.value.academicGroup,
      email: this.validateForm.value.email,
      hasElectronicSignature: this.validateForm.value.isContract === 'true',
      phone: this.validateForm.value.phone,
      posIdCard: this.validateForm.value.posIdCard,
      studentIdCard: this.validateForm.value.studentIdCard,
      id: this.student.id,
      password: null,
      login: this.validateForm.value.login
    }
  }
}
