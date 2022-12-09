import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentBlock, ContentSlide } from '../../types';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'slides-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
})
export class ActionBarComponent {
  @Output() addBlock = new EventEmitter<ContentBlock>();
  @Input() slide: ContentSlide;
  @Input() presentationId!: string;

  readonly templates = {
    simpleHtml: {
      code: { 'index.html': '<h1>Hello world</h1> ' },
    },
    simpleApp: {
      code: { 'app.ts': '// Type your code here!' },
    },
    angularApp: {
      code: {
        'index.html': `
           [<app-component></app-component>]
        `,
        'main.ts': `
          import {bootstrapApplication} from '@angular/platform-browser';
          import {AppComponent} from './app.component';
          bootstrapApplication(AppComponent);
        `,
        'app.component.ts': `
import {Component} from '@angular/core';

@Component({
  selector: 'app-component',
  template: '<h1>LOL<h1>',
  standalone: true
})
export class AppComponent {
}
        `,
      },
    },
  };

  constructor(private contentService: ContentService) {}

  addCustom(tag: string, props: Record<string, any> = {}) {
    this.contentService.addBlock(this.presentationId, this.slide.id, {
      type: 'custom',
      tag,
      props,
      id: this.contentService.uniqueId(),
    });
  }

  addP() {
    this.contentService.addBlock(this.presentationId, this.slide.id, {
      type: 'html',
      code: 'Add your content here...',
      id: this.contentService.uniqueId(),
    });
  }
}
