import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Observable, of, switchMap} from "rxjs";
import {PermissionEnum} from "../../../../cabinet/moders/enums/permission.enum";


@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return of(this._auth.isHavePermission(route.data[0]))
  }

}
