import {Injectable} from "@angular/core";

import {BehaviorSubject, Observable, tap} from "rxjs";
import {IStudent} from "../models/student.interface";
import {ISelect} from "../../interfaces/ISelect";
import {RequestService} from "../../services/request.service";
import {StudentListDataService} from "./student-list-data.service";
import {InstituteEnum} from "../../enums/institute.enum";




@Injectable()
export class StudentsService {
  public students: BehaviorSubject<IStudent[]> = new BehaviorSubject<IStudent[]>([])
  public instituteFilterList: BehaviorSubject<ISelect[]> = new BehaviorSubject<ISelect[]>([])

  constructor(
    private _studentListService: StudentListDataService,
  ) {


  }

  public getStudents(): Observable<IStudent[]> {
    return this._studentListService.getStudentList().pipe(
      tap((response: IStudent[]) => this.students.next(response))
    )
  }

  public initStudents(): void{
    // this.studentList = [
    //   {
    //     userId: '1434324124',
    //     fullName: 'Парамонов Никита Сергеевич',
    //     isContract: false,
    //     academicGroup: 'РИ-200018',
    //     posIdCard: '333',
    //     studentIdCard: '234324',
    //     hasElectronicSignature: true,
    //     email: 'email@mail.ru',
    //     phone: '799999999',
    //     institute: 'Rtf',
    //   },
    //   {
    //     userId: '12432152',
    //     fullName: 'Сычев Тимофей Михайлович',
    //     isContract: false,
    //     academicGroup: 'РИ-200016',
    //     posIdCard: '222',
    //     studentIdCard: '234324',
    //     hasElectronicSignature: true,
    //     email: 'email@mail.ru',
    //     phone: '799999999',
    //     institute: 'Inmt',
    //   },
    //   {
    //     userId: '342314214',
    //     fullName: 'Шкатова Ангелина Валерьевна',
    //     isContract: false,
    //     academicGroup: 'РИ-200017',
    //     posIdCard: '111',
    //     studentIdCard: '234324',
    //     hasElectronicSignature: true,
    //     email: 'email@mail.ru',
    //     phone: '799999999',
    //     institute: 'Info',
    //   },
    // ];

  }

  // public initFilterList():void {
  //   const filterList: ISelect[] = [];
  //   const filterValues: Set<string> = new Set()
  //   this.studentList.forEach((student:IStudentInterface) => {
  //     filterValues.add(student.institute);
  //   });
  //   filterValues.forEach((value: string) => {
  //     switch (value) {
  //       case InstituteEnum.Rtf:
  //         filterList.push({text: 'ИРИТ-РТФ', value: value});
  //         break;
  //       case InstituteEnum.Info:
  //         filterList.push({text: 'ИНФО', value: value});
  //         break;
  //       case InstituteEnum.Inmt:
  //         filterList.push({text: 'ИНМТ', value: value});
  //         break;
  //     }
  //
  //   });
  //   this.instituteFilterList.next(filterList)
  // }

}
