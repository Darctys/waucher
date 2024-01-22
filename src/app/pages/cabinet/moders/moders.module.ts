import {NgModule} from "@angular/core";
import {IconsProviderModule} from "../../../icons-provider.module";
import {HttpClientModule} from "@angular/common/http";
import {ModersListPage} from "./moders-list/moders-list.page";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {UserPipe} from "./pipes/user.pipe";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {ModerDataService} from "./services/moder-data.service";
import {CreateNewModer} from "./create-new-moder/create-new-moder";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {ModerDetailPage} from "./datail-user-info/moder-detail.page";

@NgModule({
  imports: [
    IconsProviderModule,
    HttpClientModule,
    CommonModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule,
    FormsModule,
    NzCheckboxModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzModalModule,
    NzDescriptionsModule,
  ],
  providers: [
    UserService,
    ModerDataService
  ],
  declarations: [
    UserPipe,
    ModersListPage,
    CreateNewModer,
    ModerDetailPage
  ],
  exports: [
    ModersListPage,
    CreateNewModer,
    ModerDetailPage
  ]
})
export class ModersModule { }
