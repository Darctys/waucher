import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import {StudentsListComponent} from "../students-list/students-list.component";
import {OffersListComponent} from "../offers-list/offers-list.component";
import {StudentsDetailComponent} from "../../student-detail/students-detail.component";
import {FormsListComponent} from "../forms-list/forms-list.component";
import {FormsCreateComponent} from "../form-create/forms-create.component";
import {FacesPosComponent} from "../faces-pos/faces-pos.component";
import {FacesPosDetailComponent} from "../faces-pos/faces-pos-detail/faces-pos-detail.component";
import {FinancialAssistancePage} from "../financial-assistance/financial-assistance.page";
import {ModersListPage} from "../moders/moders-list/moders-list.page";
import {FinancialAssistanceListPage} from "../finansial-assistance-list/financial-assistance-list.page";
import {
  FinancialAssistanceDetail
} from "../finansial-assistance-list/financial-assiatance-detail/financial-assistance-detail";
import {ModerDetailPage} from "../moders/datail-user-info/moder-detail.page";
import {PermissionEnum} from "../moders/enums/permission.enum";
import {PermissionGuard} from "../../data/modules/auth/guards/permission.guard";
import {PermissionModerGuard} from "../../data/modules/auth/guards/permission-moder.guard";

const routes: Routes = [
  { path: '', component: CabinetComponent, children:
      [
        {
          path: 'students',
          data: [PermissionEnum.studentsGet],
          component: StudentsListComponent,
        },
        {
          path: 'offers',
          component: OffersListComponent
        },
        {
          path: 'forms',
          component: FormsListComponent
        },
        {
          path: 'add-form',
          component: FormsCreateComponent
        },
        {
          path: 'edit-form/:id',
          component: FormsCreateComponent
        },
        {
          path: 'student/:id',
          data: [PermissionEnum.studentsGet],
          component: StudentsDetailComponent,
          canActivate: [PermissionGuard],
          pathMatch: 'full',
        },
        {
          path: 'answers', loadChildren: () => import('../answers/answers.module').then(m => m.AnswersModule)
        },
        {
          path: 'faces-pos',
          data: [PermissionEnum.facesGet],
          component: FacesPosComponent,
          canActivate: [PermissionGuard]
        },
        {
          path: 'faces-pos/:id',
          component: FacesPosDetailComponent,
          data: [PermissionEnum.facesGet],
          canActivate: [PermissionGuard],
          pathMatch: 'full'
        },
        {
          path: 'material-assistance',
          data: [PermissionEnum.assistancesSave],
          component: FinancialAssistancePage,
          canActivate: [PermissionGuard]
        },
        {
          path: 'material-assistance-list',
          data: [PermissionEnum.assistancesGet],
          component: FinancialAssistanceListPage,
          canActivate: [PermissionGuard]
        },
        {
          path: 'material-assistance-list/:id',
          data: [PermissionEnum.assistancesGet],
          component: FinancialAssistanceDetail,
          canActivate: [PermissionGuard]
        },
        {
          path: 'moder-list',
          component: ModersListPage,
          canActivate: [PermissionModerGuard]
        },
        {
          path: 'moder-list/:id',
          component: ModerDetailPage,
          canActivate: [PermissionModerGuard]
        }

      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule {

}
