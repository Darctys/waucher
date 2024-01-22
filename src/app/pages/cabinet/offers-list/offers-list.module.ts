import { NgModule } from '@angular/core';
import { OffersListComponent } from './offers-list.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {OffersAddModule} from "./offers-add/offers-add.module";
import {OffersService} from "../services/offers.service";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzIconModule} from "ng-zorro-antd/icon";
import {SearchPipe} from "./pipes/search.pipe";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzListModule} from "ng-zorro-antd/list";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {RequestService} from "../services/request.service";


@NgModule({
  imports: [
    NzTableModule,
    CommonModule,
    NzInputModule,
    NzPopconfirmModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    OffersAddModule,
    NzIconModule,
    NzCardModule,
    NzListModule,
    NzSpaceModule,
    NzLayoutModule,

  ],
  declarations: [
    OffersListComponent,
    SearchPipe
  ],
    exports: [
      OffersListComponent,
      SearchPipe],
  providers: [
    OffersService,
  ]
})
export class OffersListModule { }
