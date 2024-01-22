import {Injectable} from "@angular/core";
import {HttpService} from "../../../data/modules/http-request/services/http.service";
import {mapTo, Observable} from "rxjs";
import {IRequestOptions} from "../../../data/modules/http-request/interfaces/request-options.interface";
import {RequestMethodType} from "../../../data/modules/http-request/enums";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {FacePosInterface} from "../models/face-pos.interface";


@Injectable()
export class PosFaceDataService {


  constructor(
    private _dataService: HttpService
  ) {
  }

  public getPosFaceList(): Observable<FacePosInterface[]> {
    const request: IRequestOptions = {
      url: 'http://193.107.239.60/api/v1/admin/Faces/get_all',
      method: RequestMethodType.post
    }

    return this._dataService.request<FacePosInterface[]>(request).pipe(
      map((response: HttpResponse<FacePosInterface[]>) => {
        if (response.body) {
          return response.body;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public getPosFaceById(id: string): Observable<FacePosInterface> {
    const request: IRequestOptions<{ id: string }> = {
      url: 'http://193.107.239.60/api/v1/admin/Faces/get',
      body: {id: id},
      method: RequestMethodType.post
    }

    return this._dataService.request<FacePosInterface, { id: string }>(request).pipe(
      map((response: HttpResponse<FacePosInterface>) => {
        if (response.body) {
          return response.body;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public savePosFace(model: FacePosInterface): Observable<FacePosInterface> {
    const request: IRequestOptions<FacePosInterface> = {
      url: 'http://193.107.239.60/api/v1/admin/Faces/save',
      body: model,
      method: RequestMethodType.post
    }

    return this._dataService.request<FacePosInterface, FacePosInterface>(request).pipe(
      map((response: HttpResponse<FacePosInterface>) => {
        if (response.body) {
          return response.body;
        }
        throw Error('Не удалось получить ответ');
      })
    )
  }

  public deletePosFace(id: string): Observable<void> {
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
