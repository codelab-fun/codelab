import { Component, OnInit } from '@angular/core';
import { ContentService } from './content.service';

declare const require;

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
export class ContentComponent {
  slides$ = this.contentService.slides$;
  selectedSlide$ = this.contentService.selectedSlide$;

  constructor(readonly contentService: ContentService) {}

  addSlide() {
    this.contentService.addSlide();
  }

  reorder(move) {
    // this.contentService.setCode(
    //   moveSlide(
    //     this.contentService.code$.value,
    //     move.previousIndex,
    //     move.currentIndex
    //   )
    // );
  }
}
