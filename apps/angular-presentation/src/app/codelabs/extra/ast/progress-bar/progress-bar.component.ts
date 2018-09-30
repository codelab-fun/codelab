import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgressBarComponent } from '../../../../presentation/progress-bar/progress-bar.component';

@Component({
  selector: 'slides-new-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class NewProgressBarComponent extends ProgressBarComponent {
  @Input() fontSize = 28;
  @Input() title = 'JavaScript AST';
  @Output() fontSizeChange = new EventEmitter();


}
