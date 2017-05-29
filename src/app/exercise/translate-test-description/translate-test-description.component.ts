import {Component, Input} from '@angular/core';

@Component({
  selector: 'slides-translate-test-description',
  templateUrl: './translate-test-description.component.html',
  styleUrls: ['./translate-test-description.component.css']
})
export class TranslateTestDescriptionComponent {
  @Input() public description: string;

  constructor() {
  }

}
