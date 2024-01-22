import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./pages/authorization/auth.component";

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/auth'
  },
  {
    path: 'auth', component: AuthComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
