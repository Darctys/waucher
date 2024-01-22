import { Component, OnInit } from '@angular/core';
import {PermissionListModel} from "../models/permissionList.model";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";
import {SessionStorageService} from "../../data/modules/auth/services/session-storage.service";
import {AuthService} from "../../data/modules/auth/services/auth.service";
import {ProfileInfoInterface} from "../../data/modules/auth/interfaces/profile-info.interface";
import {tap} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {PermissionEnum} from "../moders/enums/permission.enum";

@Component({
  selector: 'app-welcome',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css'],
  providers: [NzDestroyService]
})
export class CabinetComponent implements OnInit {

  public isCollapsed = false;

  public permissionEnum = PermissionEnum;

  public isHavePermission(value: PermissionEnum): boolean {
    return this._authService.isHavePermission(value)
  }

  public canManageModer(): boolean {
    return this._authService.canMangeModer();
  }


  constructor(
    private _sessionService: SessionStorageService,
    private _modalService: NzModalService,
    private _router: Router,
    private _authService: AuthService,
    private _destroy$: NzDestroyService
  ) { }

  public ngOnInit() {
    this.setUserData();
  }

  public logout(): void {
    this._modalService.confirm({
      nzTitle: 'Вы действительно хотите выйти?',
      nzOnOk:() => {
        this._sessionService.removeSession();
        this._router.navigateByUrl('/');
      }
    })
  }

  public setUserData(): void {
    this._authService.getProfileInfo().pipe(
      tap((profileInfo: ProfileInfoInterface) => {
          this._sessionService.setAdditionalData('profile', profileInfo);
      }),
      takeUntil(this._destroy$)
    ).subscribe()
  }

}
