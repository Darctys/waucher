import {Injectable} from "@angular/core";
import {HttpService} from "../../../data/modules/http-request/services/http.service";
import {StudentListFilterModel} from "../../students-list/models/student-list-filter-model";
import {mapTo, Observable} from "rxjs";
import {IRequestOptions} from "../../../data/modules/http-request/interfaces/request-options.interface";
import {appendQueryParams} from "../../../data/modules/http-request/helpers";
import {RequestMethodType} from "../../../data/modules/http-request/enums";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {FinancialAssistanceFilterModel} from "../models/financial-assistance-filter.model";
import {IStudentFullInfo} from "../../students-list/models/student-full-info.interface";
import {IFinancialAssistanceFullInfo} from "../models/financial-assistance.model";
import {IStudent} from "../../students-list/models/student.interface";


@Injectable()
export class FinancialAssistanceDataService {

  constructor(
    private _dataService: HttpService
  ) {
  }

  public getFinancialAssistanceListLength(filterModel?: FinancialAssistanceFilterModel): Observable<{ count: number }> {
    const request: IRequestOptions = {
      url: appendQueryParams("http://193.107.239.60/api/v1/admin/Assistance/get_count",{
        Purpose: filterModel?.Purpose,
        Reason: filterModel?.Reason,
        Stage: filterModel?.Stage,
        Institute: filterModel?.Institute,
        Page: filterModel?.Page,
        PerPage: filterModel?.PerPage,
        SortBy: filterModel?.SortBy,
        Sort: filterModel?.Sort,
        CombineWith: 'Or'
      }),
      method: RequestMethodType.post
    }

    return this._dataService.request<{ count: number }>(request).pipe(
      map((response: HttpResponse<{ count: number }>) => {
        if (response.body) {
          return response.body!;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public getFinancialAssistanceList(filterModel?: FinancialAssistanceFilterModel): Observable<IFinancialAssistanceFullInfo[]> {
    const request: IRequestOptions = {
      url: appendQueryParams("http://193.107.239.60/api/v1/admin/Assistance/get_filtered",{
        Purpose: filterModel?.Purpose,
        Reason: filterModel?.Reason,
        Stage: filterModel?.Stage,
        Institute: filterModel?.Institute,
        Page: filterModel?.Page,
        PerPage: filterModel?.PerPage,
        SortBy: filterModel?.SortBy,
        Sort: filterModel?.Sort,
        CombineWith: 'Or'
      }),
      method: RequestMethodType.post
    }

    return this._dataService.request<IFinancialAssistanceFullInfo[]>(request).pipe(
      map((response: HttpResponse<IFinancialAssistanceFullInfo[]>) => {
        if (response.body) {
          return response.body!;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public saveNewFinancialAssistance(financialAssistance: IFinancialAssistanceFullInfo): Observable<IFinancialAssistanceFullInfo>{
    const request: IRequestOptions<IFinancialAssistanceFullInfo> = {
      url: "http://193.107.239.60/api/v1/admin/Assistance/save",
      body: financialAssistance,
      method: RequestMethodType.post
    }

    return this._dataService.request<IFinancialAssistanceFullInfo, IFinancialAssistanceFullInfo>(request).pipe(
      map((response: HttpResponse<IFinancialAssistanceFullInfo>) => {
        if (response.body) {
          return response.body!;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public deleteFinancialAssistance(id: string): Observable<void>{
    const request: IRequestOptions<{ id: string }> = {
      url: "http://193.107.239.60/api/v1/admin/Assistance/delete",
      body: { id: id },
      method: RequestMethodType.post
    }

    return this._dataService.request<void, { id: string }>(request)
      .pipe(
        mapTo(void 0)
      )
  }

  public getFinancialAssistanceById(id: string): Observable<IFinancialAssistanceFullInfo> {
    const request: IRequestOptions<{ id: string }> = {
      url: "http://193.107.239.60/api/v1/admin/Assistance/get",
      body: { id: id },
      method: RequestMethodType.post
    }

    return this._dataService.request<IFinancialAssistanceFullInfo, { id: string }>(request).pipe(
      map((response: HttpResponse<IFinancialAssistanceFullInfo>) => {
        if (response.body) {
          return response.body!;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  // public createNewFinancialAssistance()

}
