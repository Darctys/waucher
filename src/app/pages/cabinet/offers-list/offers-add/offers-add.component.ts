import { Component, OnInit } from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OffersService} from "../../services/offers.service";
import {IOfferInterface} from "../../interfaces/offer.interface";
import {switchMap, tap} from "rxjs";
import {RequestService} from "../../services/request.service";


@Component({
  selector: 'offers-add',
  templateUrl: './offers-add.component.html',
  styleUrls: ['./offers-add.component.css']
})
export class OffersAddComponent implements OnInit{

  public validateForm!: FormGroup;

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _offersService: OffersService,
    private _requestService: RequestService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this._fb.group({
      title: [null, [Validators.required]],
      companyName: [null, [Validators.required]],
      activity: [null, [Validators.required]],
      deliveryWay: [null, [Validators.required]],
      description: [null, [Validators.required]]
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
      switchMap((value: any) => {
        this._offersService.addOffer(value)
        return this._requestService.getAllOffers()
      }),
      tap(() =>
        this._modal.destroy()
      )
    ).subscribe()
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
    }
  }
}
