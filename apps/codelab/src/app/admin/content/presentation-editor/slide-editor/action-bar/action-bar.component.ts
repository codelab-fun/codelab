import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentBlock, ContentSlide } from '../../types';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'slides-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent {
  @Output() addBlock = new EventEmitter<ContentBlock>();
  @Input() slide: ContentSlide;
  @Input() presentationId!: string;

  readonly templates = {
    simpleApp: {
      code: { 'app.ts': '// Type your code here!' }
    },
    angularApp: {
      code: {
        'app.ts': '// Angular app!!',
        'component.ts': '// C',
        'module.ts': '// M'
      }
    }
  };

  constructor(private contentService: ContentService) {}

  addCustom(tag: string, props: Record<string, any> = {}) {
    this.contentService.addBlock(this.presentationId, this.slide.id, {
      type: 'custom',
      tag,
      props,
      id: this.contentService.uniqueId()
    });
  }

  addP() {
    this.contentService.addBlock(this.presentationId, this.slide.id, {
      type: 'html',
      code: 'Add your content here...',
      id: this.contentService.uniqueId()
    });
  }
}
