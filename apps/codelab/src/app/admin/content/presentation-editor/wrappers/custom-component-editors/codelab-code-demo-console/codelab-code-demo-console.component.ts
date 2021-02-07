import { Component, Input } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ContentSlide, CustomBlock } from '../../../types';

@Component({
  selector: 'codelab-code-demo-console-editor',
  templateUrl: './codelab-code-demo-console.component.html',
  styleUrls: ['./codelab-code-demo-console.component.css']
})
export class CodelabCodeDemoConsoleComponent {
  files = ['app.ts'];
  @Input() code = {};
  @Input() ui = 'browser';
  @Input() block!: CustomBlock;
  @Input() slide!: ContentSlide;
  @Input() presentationId!: string;
  @Input() selectedFiles = [];

  constructor(private readonly contentService: ContentService) {}

  update() {
    this.files = Object.keys(this.code);
    this.selectedFiles =
      this.selectedFiles.length === 0 ? [this.files[0]] : this.selectedFiles;
    this.contentService.updateBlock(this.presentationId, this.slide.id, {
      ...this.block,
      props: {
        code: this.code,
        selectedFiles: this.selectedFiles
      }
    });
  }
}
