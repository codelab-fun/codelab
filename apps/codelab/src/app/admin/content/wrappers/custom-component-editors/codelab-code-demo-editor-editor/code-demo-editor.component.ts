import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'codelab-code-demo-editor-editor',
  templateUrl: './code-demo-editor.component.html',
  styleUrls: ['./code-demo-editor.component.css']
})
export class CodeDemoEditorEditorComponent implements OnInit {
  props;

  @Input() lineNumbers: boolean;
  @Input() fontSize: number;
  @Input() content = '';

  constructor() {}

  ngOnInit(): void {}

  update() {}
}
