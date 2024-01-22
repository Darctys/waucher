import {NzUploadFile} from "ng-zorro-antd/upload";

export interface IFaceInterface {
  id?: string;
  fullName: string;
  birthday: Date;
  institute: string;
  photo: string;
  description: string;
  vkLink: string;
  tgLink: string;
  email: string;
  phone: string;
}
