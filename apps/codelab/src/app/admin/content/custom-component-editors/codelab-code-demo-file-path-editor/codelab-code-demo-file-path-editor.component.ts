import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'codelab-code-demo-file-path-editor',
  templateUrl: './codelab-code-demo-file-path-editor.component.html',
  styleUrls: ['./codelab-code-demo-file-path-editor.component.css']
})
export class CodelabCodeDemoFilePathEditorComponent implements OnInit {
  @Input() data;
  @Output() dataChange = new EventEmitter();

  path: string;

  constructor() {}

  ngOnInit(): void {
    const props = JSON.parse(this.data);
    this.path = props.path;
  }

  update() {
    this.dataChange.emit({
      path: this.path
    });
  }
}
