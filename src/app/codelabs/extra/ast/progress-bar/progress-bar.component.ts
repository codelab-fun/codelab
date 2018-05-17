import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgressBarComponent } from '../../../../presentation/progress-bar/progress-bar.component';

@Component({
  selector: 'slides-ast-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class AstProgressBarComponent extends ProgressBarComponent {
  @Input() fontSize = 28;
  @Output() fontSizeChange = new EventEmitter();


}
