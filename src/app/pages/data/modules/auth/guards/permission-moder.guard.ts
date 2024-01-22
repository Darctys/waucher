import {ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Observable, of} from "rxjs";


@Injectable()
export class PermissionModerGuard implements CanActivate {


  constructor(
    private _auth: AuthService,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return of(this._auth.canMangeModer())
  }

}
