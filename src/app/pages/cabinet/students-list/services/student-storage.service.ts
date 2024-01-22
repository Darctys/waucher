import {Injectable} from "@angular/core";
import {IStudentStorage} from "../interfaces/student-storage.interface";


@Injectable()
export class StudentStorageService {

  private _studentStorageToken = 'student'

  private _studentData!: IStudentStorage | null


  public getStudentData(): IStudentStorage | null {
    if(!localStorage.getItem(this._studentStorageToken)) {
      return null;
    }

    const studentData = localStorage.getItem(this._studentStorageToken);

    if(!studentData){
      return null;
    }
    this._studentData = JSON.parse(studentData) as IStudentStorage;

    return this._studentData
  }

  public setStudentData(data: IStudentStorage): void {
    localStorage.setItem(this._studentStorageToken, JSON.stringify(data))
  }

}
