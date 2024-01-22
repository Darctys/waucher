import {PermissionEnum} from "../moders/enums/permission.enum";

export function checkPermission(permission: PermissionEnum, permissionList: PermissionEnum[] | undefined): boolean {
  if(!permissionList?.length || undefined){
    return false
  }

  return permissionList.some((item: PermissionEnum) => item === permission);
}
