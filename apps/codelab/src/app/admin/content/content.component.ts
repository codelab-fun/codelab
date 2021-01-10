import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

declare const require;

function getContent(code: string) {
  const node = new DOMParser().parseFromString(code, 'text/html');

  return {
    slides: Array.from(node.querySelectorAll('slide')).map(slide => slide)
  };
}

function updateSlide(code, slideIndex, html) {
  const node = new DOMParser().parseFromString(code, 'text/html');
  node.querySelectorAll('slide')[slideIndex].outerHTML = html;
  return node.body.innerHTML;
}

function moveSlide(code, previousIndex, currentIndex) {
  const node = new DOMParser().parseFromString(code, 'text/html');
  const slides = node.querySelectorAll('slide');
  if (previousIndex < currentIndex) {
    slides[currentIndex].after(slides[previousIndex]);
  } else {
    slides[currentIndex].before(slides[previousIndex]);
  }
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
  readonly presentations = this.firestore.collection('presentations');
  readonly presentation = this.presentations.doc('typescript');

  constructor(readonly firestore: AngularFirestore, route: ActivatedRoute) {
    route.paramMap.subscribe(a => {
      this.selectedSlide = Number((a as any)?.params?.id) || 0;
    });
    this.fetchPresentation();
  }

  async fetchPresentation() {
    const data = (await this.presentation.get().toPromise()).data();
    this.parseCode(data.code);
  }

  ngOnInit(): void {}

  parseCode(code: string) {
    this.code = code;
    this.content = getContent(this.code);
    this.slides = this.content.slides;
  }

  setCode(code: string) {
    this.parseCode(code);
    this.presentation.set({ code });
  }

  updateSlide(slide) {
    this.setCode(updateSlide(this.code, this.selectedSlide, slide.outerHTML));
  }

  addSlide() {
    this.setCode(addSlide(this.code, this.selectedSlide));
    this.selectedSlide++;
  }

  reorder(move) {
    this.setCode(moveSlide(this.code, move.previousIndex, move.currentIndex));
  }

  next() {
    this.selectedSlide++;
  }
}
