import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-code-demo-file-path-editor',
  templateUrl: './codelab-code-demo-file-path-editor.component.html',
  styleUrls: ['./codelab-code-demo-file-path-editor.component.css'],
})
export class CodelabCodeDemoFilePathEditorComponent implements OnInit {
  @Input() path: string;

  constructor() {}

  ngOnInit(): void {}

  update() {}
}
