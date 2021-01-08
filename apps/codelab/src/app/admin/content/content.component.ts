import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';

declare const require;

function importSlide(s, sanitizer: DomSanitizer) {
  return s;
}

function getContent(code: string, sanitizer: DomSanitizer) {
  const node = new DOMParser().parseFromString(code, 'text/html');

  return {
    slides: Array.from(node.querySelectorAll('slide')).map(slide =>
      importSlide(slide, sanitizer)
    )
  };
}

function updateSlide(code, slideIndex, html) {
  const node = new DOMParser().parseFromString(code, 'text/html');
  node.querySelectorAll('slide')[slideIndex].outerHTML = html;
  return node.body.innerHTML;
}

function addSlide(code, slideIndex) {
  const node = new DOMParser().parseFromString(code, 'text/html');
  const slides = node.querySelectorAll('slide');
  const parent = slides[slideIndex].parentNode;

  const newSlide = document.createElement('slide');
  newSlide.innerHTML = 'new';

  if (slideIndex + 1 === slides.length) {
    parent.appendChild(newSlide);
  } else {
    parent.insertBefore(newSlide, slides[slideIndex].nextElementSibling);
  }
  return node.body.innerHTML;
}

function updateAttr(
  code: string,
  slideIndex: number,
  attr: string,
  value: any
) {
  const node = new DOMParser().parseFromString(code, 'text/html');
  node.querySelectorAll('slide')[slideIndex].setAttribute(attr, value);
  return node.body.innerHTML;
}

@Component({
  selector: 'slides-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  code = '';
  content;
  slides = [];
  selectedSlide = 0;

  constructor(readonly sanitizer: DomSanitizer, route: ActivatedRoute) {
    this.setCode(require(`!raw-loader!./sample/sample.html`));
    route.paramMap.subscribe(a => {
      this.selectedSlide = Number((a as any)?.params?.id) || 0;
    });
  }

  ngOnInit(): void {}

  setCode(code: string) {
    this.code = code;
    this.content = getContent(this.code, this.sanitizer);
    this.slides = this.content.slides;
  }

  updateSlide(slide) {
    this.setCode(updateSlide(this.code, this.selectedSlide, slide.outerHTML));
  }

  addSlide() {
    this.setCode(addSlide(this.code, this.selectedSlide));
    this.selectedSlide++;
  }
}
