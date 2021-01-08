import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'codelab-code-demo-editor-editor',
  templateUrl: './code-demo-editor.component.html',
  styleUrls: ['./code-demo-editor.component.css']
})
export class CodeDemoEditorEditorComponent implements OnInit {
  @Input() data;
  @Output() dataChange = new EventEmitter();
  props;

  lineNumbers: boolean;
  fontSize: number;
  content = '';

  constructor() {}

  ngOnInit(): void {
    const props = JSON.parse(this.data);
    this.fontSize = props.fontSize || 14;
    this.lineNumbers = props.lineNumbers || false;
    this.content = props.content;
  }

  update() {
    const props = {
      fontSize: this.fontSize,
      lineNumbers: this.lineNumbers,
      content: this.content
    };

    this.dataChange.emit(props);
  }
}
