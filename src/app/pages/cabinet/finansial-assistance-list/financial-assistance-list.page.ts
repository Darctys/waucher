import {Component, OnInit} from "@angular/core";
import {BehaviorSubject, debounceTime, Observable, of, Subject, switchMap, tap} from "rxjs";
import {IFinancialAssistanceFullInfo} from "./models/financial-assistance.model";
import {InstituteEnum} from "../enums/institute.enum";
import {NzTableFilterList} from "ng-zorro-antd/table";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {FinancialAssistanceDataService} from "./services/financial-assistance-data.service";
import {takeUntil} from "rxjs/operators";
import {FinancialAssistanceStatusEnum} from "../enums/financial-assitance-status.enum";
import {instituteFilterModel, purposeFilterModel, stageFinancialAssistanceFilterModel} from "../models/filter.models";
import {PermissionEnum} from "../moders/enums/permission.enum";
import {AuthService} from "../../data/modules/auth/services/auth.service";


@Component({
  templateUrl: 'financial-assistance-list.page.html',
  providers: [NzDestroyService]
})
export class FinancialAssistanceListPage implements OnInit {
  public financialAssistanceList$: BehaviorSubject<IFinancialAssistanceFullInfo[]> = new BehaviorSubject<IFinancialAssistanceFullInfo[]>([]);
  public searchChange$: Subject<string> = new Subject<string>()

  public instituteEnum = InstituteEnum;
  public permissionEnum = PermissionEnum;
  public stageEnum = FinancialAssistanceStatusEnum
  public listLength: number = 1;

  public searchValue: string | undefined = undefined;
  public purpose: 'Institute' | 'University' | undefined = undefined
  public stage: FinancialAssistanceStatusEnum | undefined = undefined
  public institute: InstituteEnum[] | undefined = undefined
  public pageSize = 10;
  public pageIndex = 1;

  public instituteFilter: NzTableFilterList = instituteFilterModel;
  public purposeFilter: NzTableFilterList = purposeFilterModel;
  public stageFinancialAssistanceFilter: NzTableFilterList = stageFinancialAssistanceFilterModel;

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
    private _financialAssistanceDataService: FinancialAssistanceDataService,
    private _authService: AuthService,
  ) {

  }

  public ngOnInit() {
    this.loading = true
    this.getFinancialAssistanceWithFilter()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next:(financialAssistanceList: IFinancialAssistanceFullInfo[]) => {
          this.financialAssistanceList$.next(financialAssistanceList);
          this.loading = false;
        }
      });

    this.searchChange$
      .pipe(
        tap(() => this.loading = true),
        debounceTime(500),
        switchMap((value: string) => {
          return this.onSearchChange(value)
        }),
        takeUntil(this.destroy$)
      ).subscribe({
      next:(financialAssistanceList: IFinancialAssistanceFullInfo[]) => {
        this.financialAssistanceList$.next(financialAssistanceList);
        this.loading = false;
      }
    });
  }

  public getFinancialAssistanceWithFilter(): Observable<IFinancialAssistanceFullInfo[]> {
    return this._financialAssistanceDataService.getFinancialAssistanceListLength({
      Purpose: this.purpose,
      Reason: this.searchValue,
      Stage: this.stage,
      Institute: this.institute,
    })
      .pipe(
        tap( (count: { count: number }) => {
          this.listLength = count.count
        }),
        switchMap(() => {
          return this._financialAssistanceDataService.getFinancialAssistanceList({
            Purpose: this.purpose,
            Reason: this.searchValue,
            Stage: this.stage,
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

    this.getFinancialAssistanceWithFilter()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
      next:(financialAssistanceList: IFinancialAssistanceFullInfo[]) => {
        this.financialAssistanceList$.next(financialAssistanceList);
        this.loading = false;
      }
    });
  }

  public onSearch(value: string): void {
    this.searchChange$.next(value);
  }

  public onInstituteFilterChange(value: InstituteEnum[]): void {
    this.loading = true;
    this.institute = value

    if(!value?.length){
      this.getFinancialAssistanceWithFilter()
    }

    this._financialAssistanceDataService.getFinancialAssistanceListLength({
      Purpose: this.purpose,
      Reason: this.searchValue,
      Stage: this.stage,
      Institute: this.institute,
    }).pipe(
      tap( (count: { count: number }) => {
        this.listLength = count.count
      }),
      switchMap(() => {
        return this._financialAssistanceDataService.getFinancialAssistanceList({
          Purpose: this.purpose,
          Reason: this.searchValue,
          Stage: this.stage,
          Institute: this.institute,
        })
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next:(financialAssistanceList: IFinancialAssistanceFullInfo[]) => {
        this.financialAssistanceList$.next(financialAssistanceList);
        this.loading = false;
      }
    });
  }

  public onPurposeFilterChange(value: 'Institute' | 'University'): void {
    this.loading = true;
    this.purpose = value

    if(!value?.length){
      this.getFinancialAssistanceWithFilter()
    }

    this._financialAssistanceDataService.getFinancialAssistanceListLength({
      Purpose: this.purpose,
      Reason: this.searchValue,
      Stage: this.stage,
      Institute: this.institute,
    }).pipe(
      tap( (count: { count: number }) => {
        this.listLength = count.count
      }),
      switchMap(() => {
        return this._financialAssistanceDataService.getFinancialAssistanceList({
          Purpose: this.purpose,
          Reason: this.searchValue,
          Stage: this.stage,
          Institute: this.institute,
        })
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next:(financialAssistanceList: IFinancialAssistanceFullInfo[]) => {
        this.financialAssistanceList$.next(financialAssistanceList);
        this.loading = false;
      }
    });
  }

  public onStageFinancialAssistanceFilterChange(value: FinancialAssistanceStatusEnum): void {
    this.loading = true;
    this.stage = value

    if(!value?.length){
      this.getFinancialAssistanceWithFilter()
    }

    this._financialAssistanceDataService.getFinancialAssistanceListLength({
      Purpose: this.purpose,
      Reason: this.searchValue,
      Stage: this.stage,
      Institute: this.institute,
    }).pipe(
      tap( (count: { count: number }) => {
        this.listLength = count.count
      }),
      switchMap(() => {
        return this._financialAssistanceDataService.getFinancialAssistanceList({
          Purpose: this.purpose,
          Reason: this.searchValue,
          Stage: this.stage,
          Institute: this.institute,
        })
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next:(financialAssistanceList: IFinancialAssistanceFullInfo[]) => {
        this.financialAssistanceList$.next(financialAssistanceList);
        this.loading = false;
      }
    });
  }

  public navigateToFinancialAssistanceDetail(id: string | undefined): void {
    this._router.navigateByUrl(`cabinet/material-assistance-list/?id=${id}`)
  }

  public deleteFinancialAssistance(id: string | undefined): void {
    this.loading = true;

    this._financialAssistanceDataService.deleteFinancialAssistance(id!).pipe(
      switchMap((data) => {
        return this.getFinancialAssistanceWithFilter()
      })
    ).subscribe({
      next:(financialAssistanceList: IFinancialAssistanceFullInfo[]) => {
        this.financialAssistanceList$.next(financialAssistanceList);
        this.loading = false;
      }
    });
  }

  private onSearchChange(value: string): Observable<IFinancialAssistanceFullInfo[]> {
    if(!value){
      return this.getFinancialAssistanceWithFilter()
    }

    return of(null)
      .pipe(
        debounceTime(1000),
        switchMap(() => {
          return this._financialAssistanceDataService.getFinancialAssistanceListLength({
            Purpose: this.purpose,
            Reason: this.searchValue,
            Stage: this.stage,
            Institute: this.institute,
          })
        }),
        tap( (count: { count: number }) => {
          this.listLength = count.count
        }),
        switchMap(() => {
          return this._financialAssistanceDataService.getFinancialAssistanceList({
            Purpose: this.purpose,
            Reason: this.searchValue,
            Stage: this.stage,
            Institute: this.institute,
          })
        })
      )
  }




}
