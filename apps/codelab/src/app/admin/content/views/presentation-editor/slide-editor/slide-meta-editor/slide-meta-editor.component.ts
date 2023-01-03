import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from '../../../../services/content.service';

@Component({
  selector: 'slides-slide-meta-editor',
  templateUrl: './slide-meta-editor.component.html',
  styleUrls: ['./slide-meta-editor.component.scss'],
})
export class SlideMetaEditorComponent implements OnInit {
  @Input() slide;
  @Input() presentationId!: string;

  constructor(private contentService: ContentService) {}

  updateAttr(id: string, value: any) {
    this.contentService.updateSlideMeta(
      this.presentationId,
      this.slide.id,
      id,
      value
    );
  }

  deleteSlide() {
    this.contentService.deleteSlide(this.presentationId, this.slide.id);
  }

  ngOnInit(): void {}
}
