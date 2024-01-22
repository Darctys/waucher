import { NgModule } from '@angular/core';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {IconsProviderModule} from "../../../icons-provider.module";
import {OffersListModule} from "../offers-list/offers-list.module";
import {StudentsListModule} from "../students-list/students-list.module";
import {CommonModule} from "@angular/common";
import {StudentsDetailModule} from "../../student-detail/students-detail.module";
import {FormsListModule} from "../forms-list/forms-list.module";
import {FormsCreateModule} from "../form-create/forms-create.module";
import {FacesPosModule} from "../faces-pos/faces-pos.module";
import {FacesPosAddModule} from "../faces-pos/faces-pos-add/faces-pos-add.module";
import {FacesPosEditModule} from "../faces-pos/faces-pos-edit/faces-pos-edit.module";
import {FacesPosDetailModule} from "../faces-pos/faces-pos-detail/faces-pos-detail.module";
import {OffersAddModule} from "../offers-list/offers-add/offers-add.module";
import {OffersEditModule} from "../offers-list/offers-edit/offers-edit.module";
import {FinancialAssistancePage} from "../financial-assistance/financial-assistance.page";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ModersModule} from "../moders/moders.module";
import {FinancialAssistanceListPage} from "../finansial-assistance-list/financial-assistance-list.page";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NewModule} from "../news/new.module";
import {StudentListDataService} from "../students-list/services/student-list-data.service";
import {FinancialAssistanceDataService} from "../finansial-assistance-list/services/financial-assistance-data.service";
import {
  FinancialAssistanceDetail
} from "../finansial-assistance-list/financial-assiatance-detail/financial-assistance-detail";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzMessageModule} from "ng-zorro-antd/message";
import {PermissionGuard} from "../../data/modules/auth/guards/permission.guard";
import {PermissionModerGuard} from "../../data/modules/auth/guards/permission-moder.guard";

@NgModule({
  imports: [
    CabinetRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    OffersListModule,
    StudentsListModule,
    CommonModule,
    StudentsDetailModule,
    FormsListModule,
    FormsCreateModule,
    FacesPosModule,
    FacesPosAddModule,
    FacesPosEditModule,
    FacesPosDetailModule,
    OffersListModule,
    OffersAddModule,
    OffersEditModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    ModersModule,
    NzTableModule,
    NzButtonModule,
    NewModule,
    FormsModule,
    NzUploadModule,
    NzTypographyModule,
    NzDescriptionsModule,
    NzMessageModule,
  ],
  declarations: [
    CabinetComponent,
    FinancialAssistancePage,
    FinancialAssistanceListPage,
    FinancialAssistanceDetail
  ],
  exports: [CabinetComponent],
  providers: [
    PermissionGuard,
    PermissionModerGuard,
    FinancialAssistanceDataService
  ]
})
export class CabinetModule { }
