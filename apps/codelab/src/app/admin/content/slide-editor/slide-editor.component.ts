import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  removeBlock(i: number) {
    this.slide.blocks.splice(i, 1);
  }

  reorder(event) {
    moveItemInArray(this.slide.blocks, event.previousIndex, event.currentIndex);
  }

  addBlock(block: any) {
    this.slide.blocks.push(block);
  }

  updateBlocks(i: number, code: string) {
    this.slide.blocks[i].code = code;
  }
}
