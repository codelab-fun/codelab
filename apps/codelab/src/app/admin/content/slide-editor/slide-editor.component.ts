import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'slides-slide-editor',
  templateUrl: './slide-editor.component.html',
  styleUrls: ['./slide-editor.component.scss']
})
export class SlideEditorComponent {
  @Input() slide;
  @Output() updateSlide = new EventEmitter();

  blocks = [];

  updateAttr(id: string, value: any) {
    this.slide.setAttribute(id, value);
    this.updateSlide.emit(this.slide);
  }

  updateHTML() {
    this.slide.innerHTML = this.blocks.map(b => b.code).join('\n');
    this.updateSlide.emit(this.slide);
  }

  updateBlocks(i: number, html: string) {
    this.blocks[i].code = html.trim();
    this.updateHTML();
  }

  removeBlock(i: number) {
    this.blocks.splice(i, 1);
    this.updateHTML();
  }

  reorder(event) {
    moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
  }

  addBlock(block: any) {
    this.blocks.push(block);
    this.updateHTML();
  }
}
