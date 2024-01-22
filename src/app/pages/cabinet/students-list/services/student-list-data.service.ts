import {Injectable} from "@angular/core";
import {HttpService} from "../../../data/modules/http-request/services/http.service";
import {mapTo, Observable} from "rxjs";
import {IRequestOptions} from "../../../data/modules/http-request/interfaces/request-options.interface";
import {RequestMethodType, RequestResponseType} from "../../../data/modules/http-request/enums";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {StudentListFilterModel} from "../models/student-list-filter-model";
import {appendQueryParams} from "../../../data/modules/http-request/helpers";
import {IStudent} from "../models/student.interface";
import {IStudentFullInfo} from "../models/student-full-info.interface";
import {IssuerInterface} from "../interfaces/issuer.interface";


@Injectable()
export class StudentListDataService {


  constructor(
    private _dataService: HttpService
  ) {
  }

  public getCompleteIssuer(): Observable<IssuerInterface[]> {
    const request: IRequestOptions = {
      url: 'http://188.73.139.171:8080/issueController/getAllCompletedIssues',
      method: RequestMethodType.get
    }

    return this._dataService.request<IssuerInterface[]>(request).pipe(
      map((response: HttpResponse<IssuerInterface[]>) => {
        if (response.body) {
          return response.body!;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public getCompleteIssuerXls(): Observable<string> {
    const request: IRequestOptions = {
      url: 'http://188.73.139.171:8080/issueController/getAllCompletedIssuesExcel',
      method: RequestMethodType.get,
      responseType: RequestResponseType.text
    }

    return this._dataService.request<string>(request).pipe(
      map((response: HttpResponse<string>) => {
        if (response.body) {
          return response.body!;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public getStudentListLength(filterModel?: StudentListFilterModel): Observable<{ count: number }> {
    const request: IRequestOptions = {
      url: appendQueryParams("http://193.107.239.60/api/v1/admin/Students/get_count",{
        FullName: filterModel?.FullName,
        AcademicGroup: filterModel?.AcademicGroup,
        StudentIdCard: filterModel?.StudentIdCard,
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

  public getStudentList(filterModel?: StudentListFilterModel): Observable<IStudent[]> {
    const request: IRequestOptions = {
      url: appendQueryParams("http://193.107.239.60/api/v1/admin/Students/get_filtered",{
        FullName: filterModel?.FullName,
        AcademicGroup: filterModel?.AcademicGroup,
        StudentIdCard: filterModel?.StudentIdCard,
        Institute: filterModel?.Institute,
        Page: filterModel?.Page,
        PerPage: filterModel?.PerPage,
        SortBy: filterModel?.SortBy,
        Sort: filterModel?.Sort,
        CombineWith: 'Or'
      }),
      method: RequestMethodType.post
    }

    return this._dataService.request<IStudent[]>(request).pipe(
      map((response: HttpResponse<IStudent[]>) => {
        if (response.body) {
          return response.body!;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public saveNewStudent(student: IStudentFullInfo): Observable<IStudentFullInfo>{
    const request: IRequestOptions<IStudentFullInfo> = {
      url: "http://193.107.239.60/api/v1/admin/Students/save",
      body: student,
      method: RequestMethodType.post
    }

    return this._dataService.request<IStudentFullInfo, IStudentFullInfo>(request).pipe(
      map((response: HttpResponse<IStudentFullInfo>) => {
        if (response.body) {
          return response.body!;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public deleteStudent(id: string): Observable<void>{
    const request: IRequestOptions<{ id: string }> = {
      url: "http://193.107.239.60/api/v1/admin/Students/delete",
      body: { id: id },
      method: RequestMethodType.post
    }

    return this._dataService.request<void, { id: string }>(request)
      .pipe(
          mapTo(void 0)
    )
  }

  public getStudentById(id: string): Observable<IStudentFullInfo> {
    const request: IRequestOptions<{ id: string }> = {
      url: "http://193.107.239.60/api/v1/admin/Students/get",
      body: { id: id },
      method: RequestMethodType.post
    }

    return this._dataService.request<IStudentFullInfo, { id: string }>(request).pipe(
      map((response: HttpResponse<IStudentFullInfo>) => {
        if (response.body) {
          return response.body!;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }
}
