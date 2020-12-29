import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'slides-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.css']
})
export class CustomEditorComponent implements OnInit {
  @Input() html;
  @Output() changeHtml = new EventEmitter();
  slide;

  ngOnInit(): void {
    const tag = this.html.match(/<([\w\d-]*) /)[1];
    const html = this.html.replaceAll(tag, tag + '-editor');

    this.slide = new DOMParser().parseFromString(
      html,
      'text/html'
    ).body.children[0];
  }
}
