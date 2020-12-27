import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare const require;

function importSlide(s, sanitizer: DomSanitizer) {
  const slide = s.cloneNode(true);
  const header = slide.querySelector('h2, h3, h4');

  if (header) {
    header.remove();
  }

  return {
    slide,
    id: slide.id,
    title: header && header.innerText,
    content: sanitizer.bypassSecurityTrustHtml(slide.innerHTML)
  };
}

function getContent(sanitizer: DomSanitizer) {
  const sample = require(`!raw-loader!./sample/sample.html`);
  const node = new DOMParser().parseFromString(sample, 'text/html');

  return {
    slides: Array.from(node.querySelectorAll('slide')).map(slide =>
      importSlide(slide, sanitizer)
    )
  };
}

@Component({
  selector: 'slides-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  readonly content = getContent(this.sanitizer);
  readonly slides = this.content.slides;

  constructor(readonly sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
