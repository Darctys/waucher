import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import {CommonModule, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {Auth} from "./pages/authorization/auth.module";
import ru from '@angular/common/locales/ru';
import {AuthInterceptor} from "./pages/data/modules/auth/helpers/auth.interceptor";
import {SessionStorageService} from "./pages/data/modules/auth/services/session-storage.service";
import {AuthService} from "./pages/data/modules/auth/services/auth.service";
import {HttpService} from "./pages/data/modules/http-request/services/http.service";
import {AuthGuard} from "./pages/data/modules/auth/guards/auth.guard";
import {RequestService} from "./pages/cabinet/services/request.service";

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    Auth,
    CommonModule,
    FormsModule
  ],
  providers: [
    SessionStorageService,
    AuthService,
    HttpService,
    AuthGuard,
    RequestService,
    { provide: NZ_I18N, useValue: ru_RU },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
