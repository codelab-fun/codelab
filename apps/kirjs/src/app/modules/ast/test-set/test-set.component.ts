import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirjs-test-set',
  templateUrl: './test-set.component.html',
  styleUrls: ['./test-set.component.css']
})
export class TestSetComponent {
  @Input() files = [];
  @Input() fontSize = 30;
  @Input() showAst = false;
}
