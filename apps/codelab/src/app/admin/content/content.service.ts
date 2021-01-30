import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentBlock, ContentSlide } from './types';

function generateBlocks(slide): ContentBlock[] {
  let current: ContentBlock = { type: 'html', code: '', id: '' };
  const blocks: ContentBlock[] = [current];

  for (const tag of slide.childNodes) {
    if (tag.nodeType === 3 && tag.textContent.trim() === '') {
      continue;
    }

    const type =
      tag.tagName && tag.tagName.toLowerCase().startsWith('codelab')
        ? 'custom'
        : 'html';

    if (type === 'html') {
      if (current.type !== type) {
        current = { type: 'html', code: '', id: '' };
        blocks.push(current);
      }
      current.code += (tag.outerHTML || tag.textContent).trim();
    } else {
      const props = Array.from(tag.attributes).reduce((a, { name, value }) => {
        a[name] = value;
        return a;
      }, {}) as Record<string, string>;

      if (props.code) {
        props.code = JSON.parse(props.code);
      }

      current = {
        type: 'custom',
        id: '',
        tag: tag.tagName.toLowerCase(),
        props
      };

      blocks.push(current);
    }
  }

  return blocks.filter(b => b.type !== 'html' || b.code !== '');
}

function convertSlide(s): ContentSlide {
  return {
    blocks: generateBlocks(s),
    id: s.id,
    title: s.title,
    milestone: s.getAttribute('milestone')
  };
}

function getSides2(code: string): ContentSlide[] {
  const node = new DOMParser().parseFromString(code, 'text/html');
  const slides = Array.from(node.querySelectorAll('slide'));
  return slides.map(convertSlide).slice(0, 15);
}

@Injectable()
export class ContentService {
  private readonly selectedSlideSubject = new BehaviorSubject(0);

  public readonly selectedSlide$ = this.selectedSlideSubject;

  private readonly presentations = this.firestore.collection('presentations');
  private readonly presentation = this.presentations.doc('typescript');

  readonly code$ = new BehaviorSubject('');
  public readonly slides$ = this.code$.pipe(map(code => getSides2(code)));

  constructor(
    readonly firestore: AngularFirestore,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly location: Location
  ) {
    // TODO: There should be a better way
    // this.goToSlide(router.routerState.snapshot.root.firstChild.firstChild.params.id || 0);
    this.fetchPresentation();
  }

  async fetchPresentation() {
    const code = (await this.presentation.get().toPromise()).data().code;
    this.parseCode(code);
  }

  parseCode(code: string) {
    this.code$.next(code);
  }

  setCode(code: string) {
    this.parseCode(code);
    this.presentation.set({ code });
  }

  goToSlide(index: number) {
    if (index >= 0) {
      this.selectedSlideSubject.next(index);
      this.location.replaceState('admin/content/a/' + index);
    }
  }

  nextSlide() {
    this.goToSlide(this.selectedSlide$.value + 1);
  }

  previousSlide() {
    this.goToSlide(this.selectedSlide$.value - 1);
  }
}
