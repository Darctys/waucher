import {InstituteEnum} from "../../enums/institute.enum";

export interface StudentListFilterModel {
  FullName?: string,
  AcademicGroup?: string,
  StudentIdCard?: string,
  Institute?: InstituteEnum[],
  Page?: number,
  PerPage?: number,
  SortBy?: 'Ascending' | 'Descending',
  Sort?: 'FullName'| 'AcademicGroup' | 'StudentIdCard' | 'Institute',
  CombineWith?: 'And' | 'Or'
}
