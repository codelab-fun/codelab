import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'slides-slide-preview',
  templateUrl: './slide-preview.component.html',
  styleUrls: ['./slide-preview.component.scss']
})
export class SlidePreviewComponent implements OnInit, OnChanges {
  @Input() slide;
  @Input() code: SafeHtml;

  constructor(readonly sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.code = this.sanitizer.bypassSecurityTrustHtml(this.slide.innerHTML);
  }

  ngOnInit(): void {}
}
