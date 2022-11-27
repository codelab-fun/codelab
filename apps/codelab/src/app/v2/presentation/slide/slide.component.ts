import { Component, Input } from '@angular/core';
import { ContentSlide } from '../../../admin/content/presentation-editor/types';
import { PreviewModule } from '../../../admin/content/presentation-editor/preview/preview.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'slides-v2-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  standalone: true,
  imports: [PreviewModule, CommonModule],
})
export class SlideComponent {
  @Input() slide1!: ContentSlide;
}
