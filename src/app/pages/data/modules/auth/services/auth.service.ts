import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {RequestMethodType} from '../../http-request/enums';
import {IRequestOptions} from '../../http-request/interfaces/request-options.interface';
import {HttpService} from '../../http-request/services/http.service';
import {LoginModel} from '../data/models/login.model';
import {ILoginRequestModel} from '../data/request-models/login.request-model';
import {ILoginResponseModel} from '../data/response-models/login.response-model';
import {SessionStorageService} from './session-storage.service';
import {map} from "rxjs/operators";
import {ProfileInfoInterface} from "../interfaces/profile-info.interface";
import {PermissionEnum} from "../../../../cabinet/moders/enums/permission.enum";
import {RoleEnum} from "../../../../cabinet/moders/enums/role.enum";
import {InstituteEnum} from "../../../../cabinet/enums/institute.enum";


@Injectable()
export class AuthService {

    public loading!: boolean;

    constructor(
        private _httpServiceCustom: HttpService,
        private _httpService: HttpClient,
        private _sessionStorageService: SessionStorageService,
        private _router: Router
    ) { }

    public auth(model: LoginModel): Observable<ILoginResponseModel> {

        const request: IRequestOptions<ILoginRequestModel> = {
            url: "http://193.107.239.60/api/v1/auth/Auth/login",
            body: model,
            method: RequestMethodType.post
        }

        return this._httpServiceCustom.request<ILoginResponseModel, ILoginRequestModel>(request).pipe(
          map((response: HttpResponse<ILoginResponseModel>) => {
            if (response.body) {
              return response.body!;
            }
            throw Error('Не удалось получить ответ');
          })
        )

    }

    public getProfileInfo(): Observable<ProfileInfoInterface> {
      const request: IRequestOptions = {
        url: "http://193.107.239.60/api/v1/auth/Auth/get_info",
        method: RequestMethodType.post
      }

      return this._httpServiceCustom.request<ProfileInfoInterface>(request).pipe(
        map((response: HttpResponse<ProfileInfoInterface>) => {
          if (response.body) {
            return response.body!;
          }
          throw Error('Не удалось получить ответ');
        })
      )
    }

    public isHavePermission(value: PermissionEnum): boolean {
      if(localStorage.getItem('profile')){
        const data: ProfileInfoInterface = JSON.parse(localStorage.getItem('profile')!) as ProfileInfoInterface;

        if(data.roles[0] === RoleEnum.root || data.roles[0] === RoleEnum.admin){
          return true
        }

        return data.permissions.some((item: PermissionEnum) => item === value);
      }

      return false
    }

    public canMangeModer(): boolean {
      if(localStorage.getItem('profile')){
        const data: ProfileInfoInterface = JSON.parse(localStorage.getItem('profile')!) as ProfileInfoInterface;

        return data.roles[0] === RoleEnum.admin || data.roles[0] === RoleEnum.root
      }

      return false
    }

    public isRoot(): boolean {
      if(localStorage.getItem('profile')){
        const data: ProfileInfoInterface = JSON.parse(localStorage.getItem('profile')!) as ProfileInfoInterface;

        return data.roles[0] === RoleEnum.root
      }

      return false
    }

    public getCurrentRole(): RoleEnum | null {
      if(localStorage.getItem('profile')){
        const data: ProfileInfoInterface = JSON.parse(localStorage.getItem('profile')!) as ProfileInfoInterface;

        return data.roles[0]
      }

      return null
    }

  public checkRole(userRole: RoleEnum): boolean {
    if(this.getCurrentRole()){
      if(this.isRoot() && (userRole === RoleEnum.moderator || userRole === RoleEnum.admin)){
        return true;
      }

      return this.getCurrentRole() === RoleEnum.admin && userRole === RoleEnum.moderator;
    }

    return false
  }

    public getUserGroup(): InstituteEnum {
      return (JSON.parse(localStorage.getItem('profile')!) as ProfileInfoInterface).group
    }

    public isValidToken(): Observable<boolean> {
        if (!this._sessionStorageService.getSessionData()?.token) {
            return of(false);
        }

        return of(true)
    }

    public logout(): void {
        this._sessionStorageService.removeSession()
    }
}
