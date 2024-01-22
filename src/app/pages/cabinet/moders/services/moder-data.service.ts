import {Injectable} from "@angular/core";
import {HttpService} from "../../../data/modules/http-request/services/http.service";
import {StudentListFilterModel} from "../../students-list/models/student-list-filter-model";
import {mapTo, Observable} from "rxjs";
import {IRequestOptions} from "../../../data/modules/http-request/interfaces/request-options.interface";
import {appendQueryParams} from "../../../data/modules/http-request/helpers";
import {RequestMethodType} from "../../../data/modules/http-request/enums";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {ModerInfoModel} from "../interfaces/moder-info.model";
import {RoleEnum} from "../enums/role.enum";
import {ModerFullInfoModel} from "../interfaces/moder-full-info.model";


@Injectable()
export class ModerDataService {


  constructor(
    private _dataService: HttpService
  ) {

  }

  public getModerList(): Observable<ModerInfoModel[]> {
    const request: IRequestOptions = {
      url: 'http://193.107.239.60/api/v1/admin/Users/get_all',
      method: RequestMethodType.post
    }

    return this._dataService.request<ModerInfoModel[]>(request).pipe(
      map((response: HttpResponse<ModerInfoModel[]>) => {
        if (response.body) {
          return response.body.filter((moder: ModerInfoModel) => !(moder.roles.some((role: RoleEnum) => role === RoleEnum.client)));
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public getModerById(id: string): Observable<ModerFullInfoModel> {
    const request: IRequestOptions<{ id: string }> = {
      url: 'http://193.107.239.60/api/v1/admin/Users/get',
      body: {id: id},
      method: RequestMethodType.post
    }

    return this._dataService.request<ModerFullInfoModel, { id: string }>(request).pipe(
      map((response: HttpResponse<ModerFullInfoModel>) => {
        if (response.body) {
          return response.body;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public saveModer(model: ModerFullInfoModel): Observable<ModerFullInfoModel> {
    const request: IRequestOptions<ModerFullInfoModel> = {
      url: 'http://193.107.239.60/api/v1/admin/Users/save',
      body: model,
      method: RequestMethodType.post
    }

    return this._dataService.request<ModerFullInfoModel, ModerFullInfoModel>(request).pipe(
      map((response: HttpResponse<ModerFullInfoModel>) => {
        if (response.body) {
          return response.body;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public deleteModer(id: string): Observable<void> {
    const request: IRequestOptions<{ id: string }> = {
      url: 'http://193.107.239.60/api/v1/admin/Users/delete',
      body: { id: id},
      method: RequestMethodType.post
    }

    return this._dataService.request<void, { id: string }>(request).pipe(
      mapTo(void 0)
    )
  }
}
