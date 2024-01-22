import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AnswersComponent} from "./answers.component";

const routes: Routes = [
  { path: '', component: AnswersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswersRoutingModule {

}
