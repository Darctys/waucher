export interface RoleInterface {
  name: string,
  permissions: string[],
  isProtected: string,
  priority: number,
  users: string[],
  id: string,
  createdOn: string,
  modifiedOn: string,
  createdBy: string
  modifiedBy: string,
  isDeleted: true
}
