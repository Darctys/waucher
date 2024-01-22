import {Component} from "@angular/core";
import {AnswersService} from "../services/answers.service";


@Component({
  selector: 'app-welcome',
  templateUrl: './answers.component.html',
})
export  class AnswersComponent {

  public searchValue: string ='';

  constructor(public answersService: AnswersService) {

  }



}
