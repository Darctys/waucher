import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {StudentAddComponent} from "./student-add/student-add.component";
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";
import {InstituteEnum} from "../enums/institute.enum";
import {RequestService} from "../services/request.service";
import {StudentEditComponent} from "./edit-student/edit-student.component";
import {BehaviorSubject, debounceTime, delay, from, Observable, of, Subject, switchMap, tap} from "rxjs";
import {IStudent} from "./models/student.interface";
import {IStudentFullInfo} from "./models/student-full-info.interface";
import {StudentListDataService} from "./services/student-list-data.service";
import {takeUntil} from "rxjs/operators";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {StudentsService} from "./services/students.service";
import {FormControl, FormControlName} from "@angular/forms";
import {instituteFilterModel} from "../models/filter.models";
import {PermissionEnum} from "../moders/enums/permission.enum";
import {AuthService} from "../../data/modules/auth/services/auth.service";
import {IssuerInterface} from "./interfaces/issuer.interface";
import {getMimeTipes} from "../../data/modules/files/heplers";



interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<IStudent> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<IStudent> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}


@Component({
  selector: 'app-welcome',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  providers: [NzDestroyService]
})
export class StudentsListComponent implements OnInit {

  public students$: BehaviorSubject<IStudent[]> = new BehaviorSubject<IStudent[]>([])
  public searchChange$: Subject<string> = new Subject<string>()

  public isssueList$: BehaviorSubject<IssuerInterface[]> = new BehaviorSubject<IssuerInterface[]>([])

  public instituteEnum = InstituteEnum;
  public listLength: number = 1;

  public searchValue: string | undefined = undefined;
  public institute: InstituteEnum[] | undefined = undefined
  public pageSize = 10;
  public pageIndex = 1;

  public filterList: NzTableFilterList = instituteFilterModel;

  public permissionEnum = PermissionEnum;

  public loading: boolean = true;

  public isHavePermission(value: PermissionEnum): boolean {
    return this._authService.isHavePermission(value)
  }

  public isRoot(): boolean {
    return this._authService.isRoot();
  }

  constructor(
   private _router: Router,
   private _modal: NzModalService,
   private destroy$: NzDestroyService,
   private _studentListDataService: StudentListDataService,
   private _authService: AuthService,
  ) {

  }

  public ngOnInit() {
    this._studentListDataService.getCompleteIssuer()
      .subscribe((data: IssuerInterface[]) => {
        this.isssueList$.next(data)
      })
  }

  public getExel(): void {
    this._studentListDataService.getCompleteIssuerXls()
      .subscribe((data: string) => {
        this.downloadFile(data);
      })
  }

  private downloadFile(data: string) {
    let dataString: string = data + '.xls';
    const blob = new Blob([dataString], { type:  getMimeTipes('.xls')});
    const url= window.URL.createObjectURL(blob);
    window.open('http://188.73.139.171:8080/issueController/getAllCompletedIssuesExcel');
  }

  public getStudentsWithFilter(): Observable<IStudent[]> {
    return this._studentListDataService.getStudentListLength({
      FullName: this.searchValue,
      AcademicGroup: this.searchValue,
      StudentIdCard: this.searchValue,
      Institute: this.institute,
    })
      .pipe(
        tap( (count: { count: number }) => {
          this.listLength = count.count
        }),
        switchMap(() => {
          return this._studentListDataService.getStudentList({
            FullName: this.searchValue,
            AcademicGroup: this.searchValue,
            StudentIdCard: this.searchValue,
            Institute: this.institute,
            Page: this.pageIndex,
            PerPage: this.pageSize
          })
        }),
        takeUntil(this.destroy$)
      )
  }

  public onIndexChange(pageIndex: number): void {
    this.loading = true;
    this.pageIndex = pageIndex

    this.getStudentsWithFilter()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
          next:(studentList: IStudent[]) => {
            this.students$.next(studentList);
            this.loading = false
          }
    });
  }

  public onSearch(value: string): void {
    this.searchChange$.next(value);
  }

  public onInstituteFilterChange(value: InstituteEnum[]): void {
    this.loading = true;
    this.institute = value

    if(!value.length){
      this.getStudentsWithFilter()
    }

    this._studentListDataService.getStudentListLength({
      FullName: this.searchValue,
      AcademicGroup: this.searchValue,
      StudentIdCard: this.searchValue,
      Institute: value,
    }).pipe(
      tap( (count: { count: number }) => {
        this.listLength = count.count
      }),
      switchMap(() => {
        return this._studentListDataService.getStudentList({
          FullName: this.searchValue,
          AcademicGroup: this.searchValue,
          StudentIdCard: this.searchValue,
          Institute: this.institute,
        })
      })
    ).subscribe({
      next:(studentList: IStudent[]) => {
        this.students$.next(studentList);
        this.loading = false
      }
    });
  }

  public navigateToStudentDetail(id: string | undefined): void {
    this._router.navigate(['cabinet/student/', id], )
  }

  public deleteStudent(id: string | undefined): void {
    this.loading = true;

    this._studentListDataService.deleteStudent(id!).pipe(
      switchMap((data) => {
        return this.getStudentsWithFilter()
      })
    ).subscribe({
      next:(studentList: IStudent[]) => {
        this.students$.next(studentList);
        this.loading = false
      }
    });
  }

  public createAddStudentModal(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Добавить студента',
      nzContent: StudentAddComponent
    })

    modal.afterClose
      .pipe(
        tap(() => this.loading = true),
        switchMap(value => {
          if(value && value === 'ok') {
            return this.getStudentsWithFilter()
          }

          return of(void 0)
        }),
        takeUntil(this.destroy$)
      ).subscribe({
      next:(studentList: IStudent[] | undefined) => {
        if(studentList?.length){
          this.students$.next(studentList);
        }
        this.loading = false
      }
    });
  }

  public createEditStudentModal(id: string | undefined): void {
    this._studentListDataService.getStudentById(id!)
      .pipe(
        switchMap((student: IStudentFullInfo) => {
          const modal: NzModalRef = this._modal.create({
            nzTitle: 'Изменить данные студента',
            nzContent: StudentEditComponent,
            nzComponentParams: {
              student: student as IStudentFullInfo,
            },
          });

          return modal.afterClose
        }),
        tap(() => this.loading = true),
        switchMap(value => {
          if(value && value === 'ok') {
            return this.getStudentsWithFilter()
          }

          return of(void 0)
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next:(studentList: IStudent[] | undefined) => {
          if(studentList?.length){
            this.students$.next(studentList);
          }
          this.loading = false
        }
      });
  }

  private onSearchChange(value: string): Observable<IStudent[]> {
    if(!value){
      return this.getStudentsWithFilter()
    }

    return of(null)
      .pipe(
        debounceTime(1000),
        switchMap(() => {
          return this._studentListDataService.getStudentListLength({
            FullName: value,
            AcademicGroup: value,
            StudentIdCard: value,
            Institute: this.institute,
          })
        }),
        tap( (count: { count: number }) => {
          this.listLength = count.count
        }),
        switchMap(() => {
          return this._studentListDataService.getStudentList({
            FullName: value,
            AcademicGroup: value,
            StudentIdCard: value,
            Institute: this.institute,
          })
        })
      )
  }
}
