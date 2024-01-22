import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {IOfferInterface} from "../interfaces/offer.interface";
import {IFaceInterface} from "../interfaces/face.interface";
import {HttpService} from "../../data/modules/http-request/services/http.service";
import {IStudent} from "../students-list/models/student.interface";



@Injectable()
export class RequestService {
  constructor(
    private http: HttpClient,
    private _httpService: HttpService,
  ) {

  }

  public getAllStudents(): Observable<IStudent[]> {
    return this.http.post<IStudent[]>('http://193.107.239.60/api/v1/Students/get_filtered',null, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }
  public getStudentById(id: string) {
    return this.http.post('http://193.107.239.60/api/v1/Students/get',{id: id}, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }
  public deleteStudentById(id: string) {
    return this.http.post('http://193.107.239.60/api/v1/Students/delete',{id: id}, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }
  public saveStudentById(student: IStudent) {
    return this.http.post('http://193.107.239.60/api/v1/Students/save', student , {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }

  public getAllOffers() {
    return this.http.post('http://193.107.239.60/api/v1/admin/Offers/get_all',null, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }
  public getOfferById(id: string) {
    return this.http.post('http://193.107.239.60/api/v1/admin/Offers/get',{id: id}, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }
  public deleteOfferById(id: string) {
    return this.http.post('http://193.107.239.60/api/v1/admin/Offers/delete',{id: id}, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }
  public saveOffersById(offer: IOfferInterface) {
    return this.http.post('http://193.107.239.60/api/v1/admin/Offers/save', offer, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }

  public getAllFaces() {
    return this.http.post('http://193.107.239.60/api/v1/admin/Faces/get_all',null, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }
  public getFaceById(id: string) {
    return this.http.post('http://193.107.239.60/api/v1/admin/Faces/get',{id: id}, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }
  public deleteFaceById(id: string) {
    return this.http.post('http://193.107.239.60/api/v1/admin/Faces/delete',{id: id}, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }
  public saveFaceById(face: IFaceInterface) {
    return this.http.post('http://193.107.239.60/api/v1/admin/Faces/save',face, {
      headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    });
  }

}
