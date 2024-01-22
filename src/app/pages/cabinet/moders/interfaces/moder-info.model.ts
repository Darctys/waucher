import {InstituteEnum} from "../../enums/institute.enum";
import {RoleEnum} from "../enums/role.enum";

export interface ModerInfoModel {
  id?: string,
  fullName: string,
  institute: InstituteEnum,
  roles: RoleEnum[],
}
