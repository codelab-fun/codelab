import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from '../../content.service';

@Component({
  selector: 'slides-slide-meta-editor',
  templateUrl: './slide-meta-editor.component.html',
  styleUrls: ['./slide-meta-editor.component.scss']
})
export class SlideMetaEditorComponent implements OnInit {
  @Input() slide;

  constructor(private contentService: ContentService) {}

  updateAttr(id: string, value: any) {
    this.contentService.updateSlideMeta(this.slide.id, id, value);
  }

  deleteSlide() {
    this.contentService.deleteSlide(this.slide.id);
  }

  ngOnInit(): void {}
}
