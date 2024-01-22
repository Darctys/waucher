// import { Pipe, PipeTransform } from '@angular/core';
// import {IStudentInterface} from "../models/student-full-info.interface";
//
// @Pipe({
//   name: 'search'
// })
// export class SearchPipe implements PipeTransform {
//
//   transform(items: IStudentInterface[], searchTxt: string): any[] {
//     if(!items || !items.length) {
//       return items;
//     }
//     if(!searchTxt || !searchTxt.length) {
//       return items;
//     }
//     return items.filter(item => {
//       return item.fullName.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
//         || item.institute.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
//         || item.academicGroup.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
//         || item.studentIdCard.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
//     });
//   }
//
// }
