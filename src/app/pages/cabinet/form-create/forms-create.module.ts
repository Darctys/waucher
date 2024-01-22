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
import {FormsCreateComponent} from "./forms-create.component";
import {FormItemComponent} from "../form-item/form-item.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";


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
        NzCardModule,
        NzSelectModule,
        NzSwitchModule,
        NzGridModule,
        NzDatePickerModule,
    ],
  declarations: [
    FormsCreateComponent,
    FormItemComponent
  ],
  exports: [FormsCreateComponent],
  providers: [FormsService]
})
export class FormsCreateModule { }
