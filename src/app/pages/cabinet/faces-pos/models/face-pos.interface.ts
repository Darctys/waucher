import {InstituteEnum} from "../../enums/institute.enum";
import {FileModel} from "../../finansial-assistance-list/models/file.model";

export interface FacePosInterface {
  id?: string,
  fullName: string,
  birthday: Date,
  photo?: FileModel,
  description: string,
  vkLink: string,
  tgLink: string,
  email: string,
  phone: string,
  institute: InstituteEnum,
}
