import {ModerInfoModel} from "./moder-info.model";
import {InstituteEnum} from "../../enums/institute.enum";
import {PermissionEnum} from "../enums/permission.enum";
import {RoleEnum} from "../enums/role.enum";

export interface ModerFullInfoModel extends ModerInfoModel{
  id?: string,
  fullName: string,
  login: string,
  password?: string
  institute: InstituteEnum,
  roles: RoleEnum[],
  permissions: PermissionEnum[],
}
