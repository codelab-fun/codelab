import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'slides-new-progress-bar',
  templateUrl: './new-progress-bar.component.html',
  styleUrls: ['./new-progress-bar.component.css']
})
export class NewProgressBarComponent {
  @Input() fontSize = 28;
  @Input() title = 'JavaScript AST';
  @Output() fontSizeChange = new EventEmitter();

}
