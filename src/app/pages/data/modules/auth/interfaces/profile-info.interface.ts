import {InstituteEnum} from "../../../../cabinet/enums/institute.enum";
import {RoleEnum} from "../../../../cabinet/moders/enums/role.enum";
import {PermissionEnum} from "../../../../cabinet/moders/enums/permission.enum";

export interface ProfileInfoInterface {
  fullName: string,
  group: InstituteEnum,
  roles: RoleEnum[],
  permissions: PermissionEnum[]
}
