import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import {AuthComponent} from "./auth.component";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./data/services/login.service";
import {LoginGuard} from "../guards/login-guard";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    AuthRoutingModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent
  ],
  providers: [
    LoginService,
    LoginGuard
  ]
})
export class Auth { }
