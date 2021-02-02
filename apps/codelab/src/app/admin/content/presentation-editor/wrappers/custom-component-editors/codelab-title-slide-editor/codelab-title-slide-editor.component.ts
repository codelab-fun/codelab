import { Component, Input, OnInit } from '@angular/core';
import { ContentSlide, CustomBlock } from '../../../types';
import { ContentService } from '../../../content.service';

@Component({
  selector: 'codelab-title-slide-editor',
  templateUrl: './codelab-title-slide-editor.component.html',
  styleUrls: ['./codelab-title-slide-editor.component.css']
})
export class CodelabTitleSlideEditorComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() prereqs = '';

  @Input() block!: CustomBlock;
  @Input() slide!: ContentSlide;

  constructor(private readonly contentService: ContentService) {}

  update() {
    this.contentService.updateBlock(this.slide.id, {
      ...this.block,
      props: {
        title: this.title,
        description: this.description,
        prereqs: this.prereqs
      }
    });
  }
}
