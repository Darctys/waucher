import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {ILoginResponseModel} from "./data/response-models/login.response-model.interface";
import {AuthService} from "../data/modules/auth/services/auth.service";
import {LoginModel} from "../data/modules/auth/data/models/login.model";
import {SessionStorageService} from "../data/modules/auth/services/session-storage.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {ProfileInfoInterface} from "../data/modules/auth/interfaces/profile-info.interface";

@Component({
  selector: 'auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'],
  providers: [NzDestroyService]
})
export class AuthComponent implements OnInit {

  public validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _sessionStorageService: SessionStorageService,
    private _destroy$: NzDestroyService,
    private _authService: AuthService,
  ) {

  }

  public submitForm(): void {
    console.log(1111111)
    this._router.navigate(['cabinet/students']);
    // if (this.validateForm.valid) {
    //   this.login()
    //     .pipe(
    //       switchMap(() => {
    //         return this.setUserData()
    //       }),
    //       takeUntil(this._destroy$)
    //     )
    //     .subscribe({
    //       next: () => this._router.navigate(['cabinet/students'])
    //     })
    // } else {
    //   Object.values(this.validateForm.controls).forEach(control => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

  public ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  public login(): Observable<ILoginResponseModel> {
    const loginModel: LoginModel = {
      login: this.validateForm.value.userName,
      password: this.validateForm.value.password
    }
    return this._authService.auth(loginModel).pipe(
      tap((response: ILoginResponseModel) => {
        this._sessionStorageService.setSessionData({
          token: response.token,
          refreshToken: response.refreshToken
        })
      })
    )
  }

  public setUserData(): Observable<ProfileInfoInterface> {
    return this._authService.getProfileInfo().pipe(
      tap((profileInfo: ProfileInfoInterface) => {
        this._sessionStorageService.setAdditionalData('profile', profileInfo);
      }));
  };
}
