import {getMimeTipes} from "../../../data/modules/files/heplers";

export class FileModel {
  public name!: string;
  public content!: string;
  public type!: string;
}

export function FileModelToFileSrc(file: FileModel): string {
  return `data:${getMimeTipes(file.type)};base64,${file.content}`
}
