import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ISelect} from "../../interfaces/ISelect";
import {UserInterface} from "../../interfaces/users/user.interface";
import {InstituteEnum} from "../../enums/institute.enum";

@Injectable()
export class UserService {
  public userList: UserInterface[] = [];
  public instituteFilterList: BehaviorSubject<ISelect[]> = new BehaviorSubject<ISelect[]>([])

  constructor() {

  }

}
