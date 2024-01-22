import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, switchMap, tap} from "rxjs";
import {ILoginResponseModel} from "../response-models/login.response-model.interface";

@Injectable()
export class LoginService {

  constructor(
    private _http: HttpClient
  ) {

  }

  public login(login: string, password: string): Observable<ILoginResponseModel> {
    return this._http.post<ILoginResponseModel>('http://193.107.239.60/api/v1/auth/Auth/login',{login: login, password: password})
      .pipe(
        tap((value: ILoginResponseModel) => {
          localStorage.setItem('token', value.token!)
          localStorage.setItem('refreshToken', value.refreshToken!)
        })
      )
  }

}
