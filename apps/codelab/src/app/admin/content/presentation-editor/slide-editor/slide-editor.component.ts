import { Component, EventEmitter, Input, Output } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ContentService } from '../content.service';
import { ContentBlock } from '../types';

@Component({
  selector: 'slides-slide-editor',
  templateUrl: './slide-editor.component.html',
  styleUrls: ['./slide-editor.component.scss']
})
export class SlideEditorComponent {
  @Input() slide;
  @Output() updateSlide = new EventEmitter();

  constructor(private contentService: ContentService) {}

  updateAttr(id: string, value: any) {
    this.contentService.updateSlideMeta(this.slide.id, id, value);
  }

  reorder({ previousIndex, currentIndex }) {
    this.contentService.reorderBlocks(
      this.slide.id,
      this.slide.blocks[previousIndex].id,
      this.slide.blocks[currentIndex].id
    );
  }

  addBlock(block: any) {
    this.contentService.updateBlock(this.slide.id, block);
  }

  trackByBlockId(i: number, block: ContentBlock) {
    return block.id || i;
  }

  updateBlockHTML(blockId: string, code: string) {
    const block = this.slide.blocks.find(({ id }) => id === blockId);
    this.contentService.updateBlock(this.slide.id, { ...block, code });
  }

  deleteBlock(block: ContentBlock) {
    this.contentService.deleteBlock(this.slide.id, block.id);
  }
}
