import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slides-slide-preview',
  templateUrl: './slide-preview.component.html',
  styleUrls: ['./slide-preview.component.scss']
})
export class SlidePreviewComponent implements OnInit {
  @Input() slide;

  constructor() {}

  ngOnInit(): void {}
}
