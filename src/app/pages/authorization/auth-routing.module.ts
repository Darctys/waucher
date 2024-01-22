import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import {AuthGuard} from "../data/modules/auth/guards/auth.guard";

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'cabinet', loadChildren: () => import('../cabinet/cabinet-layout/cabinet.module').then(m => m.CabinetModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
