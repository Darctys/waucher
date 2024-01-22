import {FormsListComponent} from "./forms-list.component";
import {IconsProviderModule} from "../../../icons-provider.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "../../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsService} from "../services/forms.service";
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {StudentAddModule} from "../students-list/student-add/student-add.module";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  imports: [
    NzTableModule,
    CommonModule,
    NzInputModule,
    NzPopconfirmModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    StudentAddModule,
    NzIconModule,
  ],
  declarations: [FormsListComponent],
  exports: [FormsListComponent],
  providers: [FormsService]
})
export class FormsListModule { }
