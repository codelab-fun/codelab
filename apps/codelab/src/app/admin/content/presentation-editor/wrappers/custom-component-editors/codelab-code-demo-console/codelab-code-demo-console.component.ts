import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ContentSlide, CustomBlock } from '../../../types';

@Component({
  selector: 'codelab-code-demo-console-editor',
  templateUrl: './codelab-code-demo-console.component.html',
  styleUrls: ['./codelab-code-demo-console.component.css']
})
export class CodelabCodeDemoConsoleComponent {
  @Input() files = ['app.ts'];
  @Input() code = {};
  @Input() ui = 'browser';
  @Input() block!: CustomBlock;
  @Input() slide!: ContentSlide;
  @Input() presentationId!: string;

  constructor(private readonly contentService: ContentService) {}

  update() {
    this.contentService.updateBlock(this.presentationId, this.slide.id, {
      ...this.block,
      props: {
        code: this.code
      }
    });
  }
}
