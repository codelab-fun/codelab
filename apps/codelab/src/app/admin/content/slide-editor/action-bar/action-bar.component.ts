import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'slides-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent {
  @Output() addBlock = new EventEmitter();

  addCustom(code: string) {
    this.addBlock.emit({
      type: 'custom',
      code
    });
  }

  addP() {
    this.addBlock.emit({
      type: 'html',
      code: '<p>Lol</p>'
    });
  }
}
