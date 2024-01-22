import {Injectable} from "@angular/core";
import {IAnswerInterface} from "../interfaces/answer.interface";

@Injectable()
export class AnswersService {
  public answersList: IAnswerInterface[] = []


  public getFace(id: string): IAnswerInterface {
    return this.answersList.find((x: IAnswerInterface) => x.id === id)!
  }
}
