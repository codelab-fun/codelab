import { Component, Input } from '@angular/core';
import { ContentSlide, SlideViewType } from "../../../../types";
import { PreviewModule } from "../../../preview.module";

@Component({
  selector: 'slides-small-slide-preview',
  templateUrl: './small-slide-preview.component.html',
  styleUrls: ['./small-slide-preview.component.css'],
  standalone: true,
  imports: [PreviewModule]
})
export class SmallSlidePreviewComponent {
  @Input() slide!: ContentSlide;
  @Input() mode: SlideViewType = 'preview';
}
