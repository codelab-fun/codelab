import { Component, Input, OnInit } from '@angular/core';
import { ContentSlide, CustomBlock } from '../../../types';
import { ContentService } from '../../../../../services/content.service';

@Component({
  selector: 'codelab-code-demo-editor-editor',
  templateUrl: './code-demo-editor.component.html',
  styleUrls: ['./code-demo-editor.component.css'],
})
export class CodeDemoEditorEditorComponent implements OnInit {
  @Input() lineNumbers = true;
  @Input() fontSize = 20;
  @Input() content = 'lol';
  @Input() block!: CustomBlock;
  @Input() slide!: ContentSlide;
  @Input() presentationId!: string;

  constructor(private readonly contentService: ContentService) {}

  ngOnInit(): void {}

  update() {
    this.contentService.updateBlock(this.presentationId, this.slide.id, {
      ...this.block,
      props: {
        lineNumbers: this.lineNumbers,
        fontSize: this.fontSize,
        content: this.content,
      },
    });
  }
}
