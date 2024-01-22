import {RoleInterface} from "./role.interface";

export interface UserInterface {
  name: string,
  login: string,
  password: string,
  role: RoleInterface[],
  institute: string,
  id: string,
  createdOn: string,
  modifiedOn: string,
  createdBy: string
  modifiedBy: string,
  isDeleted: true
}
