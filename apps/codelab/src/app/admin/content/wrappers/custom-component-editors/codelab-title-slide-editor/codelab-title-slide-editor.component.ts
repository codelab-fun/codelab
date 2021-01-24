import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-title-slide-editor',
  templateUrl: './codelab-title-slide-editor.component.html',
  styleUrls: ['./codelab-title-slide-editor.component.css']
})
export class CodelabTitleSlideEditorComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() prereqs: string;

  ngOnInit(): void {}

  constructor() {}

  update() {}
}
