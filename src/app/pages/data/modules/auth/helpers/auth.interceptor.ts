import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import {AuthService} from "../services/auth.service";
import {IJWTSession} from "../interfaces/jwt-session.interface";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
      private _sessionStorageService: SessionStorageService,
      private router: Router,
      private _authService: AuthService,
    ) {


    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const sessionData = this._sessionStorageService.getSessionData();
        if (sessionData?.token) {
            authReq = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + sessionData.token)
            });
        }

        return next.handle(authReq).pipe(
            tap({
                error:
                    (err: any) => {
                        if (err instanceof HttpErrorResponse) {
                            if (!sessionData?.refreshToken && err.status !== 401) {
                                this._sessionStorageService.removeSession();
                                this.router.navigateByUrl('/', {replaceUrl: true})
                                return;
                            }
                            if(sessionData?.token && sessionData.refreshToken && err.status === 401){
                              this._authService.auth({
                                token: sessionData.token,
                                refreshToken: sessionData.refreshToken
                              }).pipe(
                                tap((data: IJWTSession) => {
                                  if (data.token) {
                                    this._sessionStorageService.setSessionData({
                                      token: data.token,
                                      refreshToken: data.refreshToken
                                    })
                                  }
                                })
                              ).subscribe()
                            }
                        }
                    }
            })
        )
    }
}
