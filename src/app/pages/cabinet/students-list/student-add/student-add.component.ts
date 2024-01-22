import { Component, OnInit } from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {of, switchMap, tap} from "rxjs";
import {emailValidator, mobileValidator} from "../../../../validators/form.validator";
import {IStudentFullInfo} from "../models/student-full-info.interface";
import {StudentListDataService} from "../services/student-list-data.service";
import {AuthService} from "../../../data/modules/auth/services/auth.service";
import {InstituteEnum} from "../../enums/institute.enum";


@Component({
  selector: 'student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit{

  public validateForm!: FormGroup;

  public phoneMask = { mask: "+{7} (000) 000-00-00" };

  public isRoot(): boolean {
    return this._authService.isRoot();
  }

  public getUserGroup(): InstituteEnum {
    return this._authService.getUserGroup()
  }

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _studentsService: StudentListDataService,
    private _requestService: RequestService,
    private _authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.validateForm = this._fb.group({
      fullName: [null, [Validators.required]],
      institute: [{value: this.isRoot() ? null : this.getUserGroup(), disabled: !this.isRoot()}, [Validators.required]],
      isContract: [null, [Validators.required]],
      academicGroup: [null, [Validators.required]],
      posIdCard: [null, [Validators.required]],
      studentIdCard: [null, [Validators.required]],
      hasElectronicSignature: [null, [Validators.required]],
      phone: [null, [Validators.required, mobileValidator]],
      email: [null, [Validators.required, emailValidator]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
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
    this._studentsService.saveNewStudent(this.toModel()).pipe(
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
      hasElectronicSignature: this.validateForm.value.hasElectronicSignature === 'true',
      phone: this.validateForm.value.phone,
      posIdCard: this.validateForm.value.posIdCard,
      studentIdCard: this.validateForm.value.studentIdCard,
      login: this.validateForm.value.login,
      password: this.validateForm.value.password
    }
  }
}
