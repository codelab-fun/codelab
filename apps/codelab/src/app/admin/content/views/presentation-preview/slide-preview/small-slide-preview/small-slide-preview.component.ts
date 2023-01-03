import { Component, Input } from '@angular/core';
import { ContentSlide, SlideViewType } from '../../../presentation-editor/types';

@Component({
  selector: 'slides-small-slide-preview',
  templateUrl: './small-slide-preview.component.html',
  styleUrls: ['./small-slide-preview.component.css'],
})
export class SmallSlidePreviewComponent {

  @Input() slide!: ContentSlide;
  @Input() mode: SlideViewType = 'preview';

}
