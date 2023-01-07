import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentSlide } from '../../../admin/pages/content/pages/presentation-editor/types';
import { PresentationPreviewModule } from '../../../admin/pages/content/pages/presentation-preview';
import { DynamicRendererModule } from '../../../admin/pages/content/pages/presentation-preview/components/slide-preview/dynamic-renderer';

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
