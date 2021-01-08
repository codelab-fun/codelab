import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'codelab-title-slide-editor',
  templateUrl: './codelab-title-slide-editor.component.html',
  styleUrls: ['./codelab-title-slide-editor.component.css']
})
export class CodelabTitleSlideEditorComponent implements OnInit {
  @Input() data;
  @Output() dataChange = new EventEmitter();
  title: string;
  description: string;
  prereqs: string;

  ngOnInit(): void {
    const props = JSON.parse(this.data);
    this.title = props.title;
    this.description = props.description;
    this.prereqs = props.prereqs;
  }

  constructor() {}

  update() {
    this.dataChange.emit({
      content: '',
      title: this.title,
      description: this.description,
      prereqs: this.prereqs
    });
  }
}
