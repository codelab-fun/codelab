import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentService } from '../services/content.service';
import { assertIsHtmlBlock, ContentBlock, ContentSlide } from '../types';

@Component({
  selector: 'slides-slide-editor',
  templateUrl: './slide-editor.component.html',
  styleUrls: ['./slide-editor.component.scss'],
})
export class SlideEditorComponent {
  @Input() slide: ContentSlide;
  @Input() presentationId: string;
  @Output() updateSlide = new EventEmitter();

  constructor(private contentService: ContentService) {}

  reorder({ previousIndex, currentIndex }) {
    this.contentService.reorderBlocks(
      this.presentationId,
      this.slide.id,
      this.slide.blocks[previousIndex].id,
      this.slide.blocks[currentIndex].id
    );
  }

  addBlock(block: any) {
    this.contentService.updateBlock(this.presentationId, this.slide.id, block);
  }

  trackByBlockId(i: number, block: ContentBlock) {
    return block.id || i;
  }

  updateBlockHTML(blockId: string, code: string) {
    const block = this.slide.blocks.find(({ id }) => id === blockId);
    assertIsHtmlBlock(block);

    this.contentService.updateBlock(this.presentationId, this.slide.id, {
      ...block,
      code,
    });
  }

  deleteBlock(block: ContentBlock) {
    this.contentService.deleteBlock(
      this.presentationId,
      this.slide.id,
      block.id
    );
  }
}
