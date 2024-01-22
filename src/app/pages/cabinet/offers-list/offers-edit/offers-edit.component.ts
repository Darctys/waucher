import { Component, OnInit } from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OffersService} from "../../services/offers.service";
import {IOfferInterface} from "../../interfaces/offer.interface";
import {tap} from "rxjs";
import {RequestService} from "../../services/request.service";


@Component({
  selector: 'offers-add',
  templateUrl: './offers-edit.component.html',
  styleUrls: ['./offers-edit.component.css']
})
export class OffersEditComponent implements OnInit{

  public validateForm!: FormGroup;

  public offer!: IOfferInterface;

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _offersService: OffersService,
    private _requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.validateForm = this._fb.group({
      title: [this.offer.title, [Validators.required]],
      companyName: [this.offer.companyName, [Validators.required]],
      activity: [this.offer.activity, [Validators.required]],
      deliveryWay: [this.offer.deliveryWay, [Validators.required]],
      description: [this.offer.description, [Validators.required]]
    });
  }

  public confirm(): void {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      return
    }
    this._requestService.saveOffersById(this.toModel()).pipe(
      tap(() => {
        this._offersService.editOffer(this.toModel())
        this._modal.destroy();
      })
    ).subscribe()
    this._modal.destroy();
  }
  public cancel(): void {
    this._modal.destroy();
  }

  public toModel(): IOfferInterface{
    return {
      title: this.validateForm.value.title,
      companyName: this.validateForm.value.companyName,
      activity: this.validateForm.value.activity,
      deliveryWay: this.validateForm.value.deliveryWay,
      description: this.validateForm.value.description,
      id: this.offer.id,
    }
  }
}
