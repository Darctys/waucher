import { Pipe, PipeTransform } from '@angular/core';
import {UserInterface} from "../../interfaces/users/user.interface";
import {ModerInfoModel} from "../interfaces/moder-info.model";

@Pipe({
  name: 'userPipe'
})
export class UserPipe implements PipeTransform {

  transform(items: ModerInfoModel[], searchTxt: string): ModerInfoModel[] {
    if(!items || !items.length) {
      return items;
    }
    if(!searchTxt || !searchTxt.length) {
      return items;
    }
    return items.filter(item => {
      return item.fullName.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
        || item.institute.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });
  }

}
