import {Component, OnInit} from "@angular/core";
import {InstituteEnum} from "../../enums/institute.enum";
import {NzTableFilterList} from "ng-zorro-antd/table";
import {IStudent} from "../../students-list/models/student.interface";
import {instituteFilterModel} from "../../models/filter.models";
import {BehaviorSubject, of, switchMap, tap} from "rxjs";
import {ModerInfoModel} from "../interfaces/moder-info.model";
import {ModerDataService} from "../services/moder-data.service";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {takeUntil} from "rxjs/operators";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {CreateNewModer} from "../create-new-moder/create-new-moder";
import {ModerFullInfoModel} from "../interfaces/moder-full-info.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../data/modules/auth/services/auth.service";
import {RoleEnum} from "../enums/role.enum";

@Component({
  templateUrl: 'moders-list.page.html',
  providers: [NzDestroyService]
})
export class ModersListPage implements OnInit{


  public searchValue = '';
  public instituteEnum = InstituteEnum;
  public roleEnum = RoleEnum;
  public students: IStudent[] = []
  public instituteFilterFn = (list: InstituteEnum[], item: ModerInfoModel): boolean => list
    .some((institute: InstituteEnum) => item.institute.indexOf(institute) !== -1);

  public filterList: NzTableFilterList = instituteFilterModel;

  public moderList$: BehaviorSubject<ModerInfoModel[]> = new BehaviorSubject<ModerInfoModel[]>([]);

  public loading: boolean = true;

  public isRoot(): boolean {
    return this._authService.isRoot();
  }

  public checkRole(userRole: RoleEnum): boolean {
    return this._authService.checkRole(userRole);
  }


  constructor(
    private _moderDataService: ModerDataService,
    private _destroy$: NzDestroyService,
    private _modal: NzModalService,
    private _router: Router,
    private _authService: AuthService,

  ) {
  }

  public ngOnInit(): void {
    this.getModerLIst();
  }

  public getModerLIst(): void {
    this._moderDataService.getModerList()
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe({
      next: (moderList: ModerInfoModel[]) => {
        this.moderList$!.next(moderList);
        this.loading = false;
      }
    })
  }

  public addNewModer(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Добавить нового пользователя',
      nzContent: CreateNewModer
    })

    modal.afterClose
      .pipe(
        tap(() => this.loading = true),
        switchMap(value => {
          if(value && value === 'ok') {
            return  this._moderDataService.getModerList();
          }

          return of(void 0);
        }),
        takeUntil(this._destroy$)
      ).subscribe({
      next:(moderList: ModerInfoModel[] | undefined) => {
        if(moderList?.length){
          this.moderList$.next(moderList);
        }
        this.loading = false
      }
    });
  }

  public editModer(id: string | undefined): void {
    this._moderDataService.getModerById(id!)
      .pipe(
        switchMap((moder: ModerFullInfoModel) => {
          const modal: NzModalRef = this._modal.create({
            nzTitle: 'Добавить нового пользователя',
            nzContent: CreateNewModer,
            nzComponentParams: {
              moder: moder
            }
          })

          return modal.afterClose
        }),
        tap(() => this.loading = true),
        switchMap(value => {
          if(value && value === 'ok') {
            return  this._moderDataService.getModerList();
          }

          return of(void 0);
        }),
        takeUntil(this._destroy$)
      ).subscribe({
      next:(moderList: ModerInfoModel[] | undefined) => {
        if(moderList?.length){
          this.moderList$.next(moderList);
        }
        this.loading = false
      }
    });
  }

  public deleteUser(id: string | undefined): void {
    this.loading = true;

    this._moderDataService.deleteModer(id!)
      .pipe(
        switchMap(() => this._moderDataService.getModerList())
      ).subscribe({
      next:(moderList: ModerInfoModel[] | undefined) => {
        if(moderList?.length){
          this.moderList$.next(moderList);
        }
        this.loading = false
      }});
  }

  public navigateToModerDetail(id: string | undefined): void {
    this._router.navigate(['cabinet/moder-list/', id], )
  }

}
