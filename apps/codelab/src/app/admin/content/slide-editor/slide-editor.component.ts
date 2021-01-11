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
export class SlideEditorComponent implements OnInit, OnChanges {
  @Input() slide;
  @Output() updateSlide = new EventEmitter();

  blocks = [];

  ngOnChanges() {
    if (JSON.stringify(this.generateBlocks()) !== JSON.stringify(this.blocks)) {
      this.blocks = this.generateBlocks();
    }
  }

  generateBlocks() {
    let current = { type: '', code: '' };
    const blocks = [current];

    for (const tag of this.slide.childNodes) {
      if (tag.nodeType === 3 && tag.textContent.trim() === '') {
        continue;
      }

      const type =
        tag.tagName && tag.tagName.toLowerCase().startsWith('codelab')
          ? 'custom'
          : 'html';

      if (current.type !== type || type === 'custom') {
        current = { type, code: '' };
        blocks.push(current);
      }

      current.code += (tag.outerHTML || tag.textContent).trim();
    }

    return blocks;
  }

  ngOnInit() {
    this.blocks = this.generateBlocks();
  }

  updateAttr(id: string, value: any) {
    this.slide.setAttribute(id, value);
    this.updateSlide.emit(this.slide);
  }

  updateHTML() {
    const innerHTML = this.blocks.map(b => b.code).join('\n');
    this.slide.innerHTML = innerHTML;
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
