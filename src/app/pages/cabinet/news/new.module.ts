import {NgModule} from "@angular/core";
import {IconsProviderModule} from "../../../icons-provider.module";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NewsList} from "./news-list/news-list";


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
    NzCheckboxModule
  ],
  declarations: [
    NewsList
  ]
})
export class NewModule {

}
