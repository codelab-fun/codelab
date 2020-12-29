import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'slides-slide-meta-editor',
  templateUrl: './slide-meta-editor.component.html',
  styleUrls: ['./slide-meta-editor.component.scss']
})
export class SlideMetaEditorComponent implements OnInit {
  @Input() slide;
  @Output() updateTitle = new EventEmitter();
  @Output() updateId = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
