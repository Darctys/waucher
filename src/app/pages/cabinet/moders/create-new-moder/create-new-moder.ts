import {Component, OnInit } from "@angular/core";
import {PermissionListModel} from "../../models/permissionList.model";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {PermissionEnum} from "../enums/permission.enum";
import {NzCheckboxGroupComponent, NzCheckBoxOptionInterface} from "ng-zorro-antd/checkbox/checkbox-group.component";
import {RoleEnum} from "../enums/role.enum";
import {ModerFullInfoModel} from "../interfaces/moder-full-info.model";
import {checkPermission} from "../../helpers/helpers";
import {tap} from "rxjs";
import {ModerDataService} from "../services/moder-data.service";
import {AuthService} from "../../../data/modules/auth/services/auth.service";
import {InstituteEnum} from "../../enums/institute.enum";


@Component({
  templateUrl: 'create-new-moder.html',
  styleUrls: ['./create-new-moder.scss'],
  providers: [NzDestroyService]
})
export class CreateNewModer implements OnInit {

  public checkOptionsOne!: NzCheckBoxOptionInterface[]

  public validateForm!: FormGroup;
  public moder: ModerFullInfoModel | undefined;

  public roleEnum = RoleEnum

  public isRoot(): boolean {
    return this._authService.isRoot();
  }

  public getUserGroup(): InstituteEnum {
    return this._authService.getUserGroup()
  }

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _destroy$: NzDestroyService,
    private _moderDataService: ModerDataService,
    private _authService: AuthService,
  ) {
  }

  public ngOnInit(): void {
    this.createForm();
  }


  public createForm(): void {
    let instituteValue: InstituteEnum | null = null
    if(this.isRoot()){
      if(this.moder && this.moder?.institute) {
        instituteValue = this.moder.institute
      } else {
        instituteValue = null;
      }
    } else {
      if(this.moder && this.moder?.institute) {
        instituteValue = this.moder.institute
      } else {
        instituteValue = this.getUserGroup()
      }
    }

    this.validateForm = this._fb.group({
      fullName: [this.moder?.fullName || null, [Validators.required]],
      institute: [{ value: instituteValue,  disabled: !this.isRoot()}, [Validators.required]],
      login: [this.moder?.login || null, [Validators.required]],
      roles: [this.moder?.roles[0] ||null, [Validators.required]],
      permission: [null],
    });
    if(!this.moder) {
      this.validateForm.addControl('password', new FormControl(null, Validators.required))
    } else {
      this.validateForm.addControl('password', new FormControl(null))
    }

    this.checkOptionsOne = [
      { label: 'Может просматривать студентов', value: PermissionEnum.studentsGet, checked: checkPermission(PermissionEnum.studentsGet, this.moder?.permissions) },
      { label: 'Может удалять студентов', value: PermissionEnum.studentsDelete, checked: checkPermission(PermissionEnum.studentsDelete, this.moder?.permissions) },
      { label: 'Может редактировать студентов', value: PermissionEnum.studentsSave, checked: checkPermission(PermissionEnum.studentsSave, this.moder?.permissions) },
      { label: 'Может просматривать лица POS', value: PermissionEnum.facesGet, checked: checkPermission(PermissionEnum.facesGet, this.moder?.permissions) },
      { label: 'Может удалять лица POS', value: PermissionEnum.facesDelete, checked: checkPermission(PermissionEnum.facesDelete, this.moder?.permissions) },
      { label: 'Может редактировать лица POS', value: PermissionEnum.facesSave, checked: checkPermission(PermissionEnum.facesSave, this.moder?.permissions) },
      { label: 'Может просматривать заявления на материальную помощь', value: PermissionEnum.assistancesGet, checked: checkPermission(PermissionEnum.assistancesGet, this.moder?.permissions) },
      { label: 'Может удалять заявления на материальную помощь', value: PermissionEnum.assistancesDelete, checked: checkPermission(PermissionEnum.assistancesDelete, this.moder?.permissions) },
      { label: 'Может редактировать заявления на материальную помощь', value: PermissionEnum.assistancesSave, checked: checkPermission(PermissionEnum.assistancesSave, this.moder?.permissions) },
      { label: 'Может просматривать новости', value: PermissionEnum.newsGet, checked: checkPermission(PermissionEnum.newsGet, this.moder?.permissions) },
      { label: 'Может удалять новости', value: PermissionEnum.newsDelete, checked: checkPermission(PermissionEnum.newsDelete, this.moder?.permissions) },
      { label: 'Может редактировать новости', value: PermissionEnum.newsSave, checked: checkPermission(PermissionEnum.newsSave, this.moder?.permissions) },
    ];
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
    this._moderDataService.saveModer(this.toModel()).pipe(
      tap(() => this._modal.destroy('ok'))
    ).subscribe()
  }

  public cancel(): void {
    this._modal.destroy();
  }

  private toModel(): ModerFullInfoModel {
    return {
      id: this.moder?.id,
      fullName: this.validateForm.value.fullName,
      institute: this.validateForm.getRawValue().institute,
      password: this.validateForm.value.password,
      login: this.validateForm.value.login,
      roles: [this.validateForm.value.roles],
      permissions: this.getPermission()
    }
  }

  private getPermission(): PermissionEnum[] {
    const answer: PermissionEnum[] = [];
    if(this.validateForm.value.permission as NzCheckBoxOptionInterface[]){
      (this.validateForm.value.permission as NzCheckBoxOptionInterface[]).forEach((item: NzCheckBoxOptionInterface) => {
        if(item.checked) {
          answer.push(item.value as PermissionEnum)
        }
      })
    }

    return answer
  }

}
