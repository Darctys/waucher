import {AbstractControl} from "@angular/forms";
import {NzSafeAny} from "ng-zorro-antd/core/types";

export type MyErrorsOptions = { ru: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export function mobileValidator(control: AbstractControl): MyValidationErrors | null {
  const value = control.value;

  if (isEmptyInputValue(value)) {
    return null;
  }

  return isMobile(value) ? null : { mobile: { ru: 'Не правильный номер телефона' }};
}

export function emailValidator(control: AbstractControl): MyValidationErrors | null {
  const value = control.value;

  if (isEmptyInputValue(value)) {
    return null;
  }

  return isEmail(value) ? null : { mobile: { ru: 'Не правильный email' }};
}

function isMobile(value: string): boolean {
  return value.length === 18;
}

function isEmail(value: string): boolean {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value);
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

