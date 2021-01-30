import { Component, EventEmitter, Output } from '@angular/core';
import { ContentBlock } from '../../types';

@Component({
  selector: 'slides-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent {
  @Output() addBlock = new EventEmitter<ContentBlock>();

  addCustom(tag: string, props: Record<string, string> = {}) {
    this.addBlock.emit({
      id: '11',
      type: 'custom',
      tag,
      props
    });
  }

  addP() {
    this.addBlock.emit({
      id: '12',
      type: 'html',
      code: '<p>TODO</p>'
    });
  }
}
