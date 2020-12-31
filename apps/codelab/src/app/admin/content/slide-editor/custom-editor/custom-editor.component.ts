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

  updateHtml(props) {
    const slide = new DOMParser().parseFromString(this.html, 'text/html').body
      .children[0] as HTMLElement;

    slide.innerHTML = props.content;

    Object.entries(props)
      .filter(([key]) => key !== 'content')
      .forEach(([key, value]) => {
        slide.setAttribute(key, value.toString());
      });

    this.changeHtml.emit(slide.outerHTML);
  }

  ngOnInit(): void {
    const slide = new DOMParser().parseFromString(this.html, 'text/html').body
      .children[0] as HTMLElement;

    this.slide = document.createElement(slide.tagName + '-editor');
    const attrs = {
      content: slide.innerHTML
    };
    for (const attr of Array.from(slide.attributes)) {
      attrs[attr.name] = attr.value;
    }

    this.slide.setAttribute('data', JSON.stringify(attrs));

    this.slide['[data]'] = JSON.stringify(attrs);

    this.slide['(dataChange)'] = props => {
      this.updateHtml(props);
    };
  }
}
