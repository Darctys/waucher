import {ChangeDetectionStrategy, Component} from "@angular/core";


@Component({
  templateUrl: 'news-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsList {

}
