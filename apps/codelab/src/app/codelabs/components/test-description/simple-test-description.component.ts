import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'slides-simple-test-description',
  templateUrl: './simple-test-description.component.html',
  styleUrls: ['./simple-test-description.component.css']
})
export class SimpleTestDescriptionComponent {
  @Input() title: string;
  @Input() file: string;
  @Input() pass: boolean;
  @Output() selectFile = new EventEmitter<string>();

  constructor() {}
}
