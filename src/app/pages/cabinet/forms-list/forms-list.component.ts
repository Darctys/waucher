import { Component, OnInit } from '@angular/core';
import {FormsService} from "../services/forms.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.css']
})
export class FormsListComponent implements OnInit {

  constructor(
    public formsService: FormsService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  public addForm(): void {
    this._router.navigateByUrl(`cabinet/add-form`).then()
  }

  public editForm(id: number): void {
    this._router.navigateByUrl(`cabinet/edit-form/?id=${id}`).then()
  }

  public deleteForm(id: number): void {
    this.formsService.delete(id);
  }
}
