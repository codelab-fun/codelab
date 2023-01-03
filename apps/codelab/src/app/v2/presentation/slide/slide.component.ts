import { Component, Input } from '@angular/core';
import { ContentSlide } from '../../../admin/content/views/presentation-editor/types';
import { CommonModule } from '@angular/common';
import { PresentationPreviewModule } from '../../../admin/content/views/presentation-preview';
import { DynamicRendererModule } from '../../../admin/content/views/presentation-preview/slide-preview/dynamic-renderer';

@Component({
  selector: 'slides-v2-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  standalone: true,
  imports: [PresentationPreviewModule, CommonModule, DynamicRendererModule],
})
export class SlideComponent {
  @Input() slide1!: ContentSlide;
}
