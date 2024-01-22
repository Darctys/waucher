import { Pipe, PipeTransform } from '@angular/core';
import {IOfferInterface} from "../../interfaces/offer.interface";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: IOfferInterface[], searchTxt: string): any[] {
    if(!items || !items.length) {
      return items;
    }
    if(!searchTxt || !searchTxt.length) {
      return items;
    }
    return items.filter(item => {
      return item.title.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1;
    });
  }
}
