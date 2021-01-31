import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ContentBlock, ContentSlide } from './types';
import { nanoid } from 'nanoid';
import { moveItemInArray } from '@angular/cdk/drag-drop';

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
  private readonly presentationJs = this.presentations.doc('typescriptjs');

  readonly code$ = new BehaviorSubject('');
  public readonly slides$ = this.presentationJs
    .valueChanges()
    .pipe(map((code: any) => code.slides));

  constructor(
    readonly firestore: AngularFirestore,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly location: Location
  ) {
    // TODO: There should be a better way
    // this.goToSlide(router.routerState.snapshot.root.firstChild.firstChild.params.id || 0);
  }

  uniqueId() {
    return nanoid();
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

  dispatch({ type, payload }: any) {
    function findBlockById(slide: ContentSlide, blockId: string) {
      const result = slide.blocks.findIndex(({ id }) => id === blockId);
      console.assert(result !== -1);
      return result;
    }

    this.slides$.pipe(take(1)).subscribe(slides => {
      function getSlide() {
        const slide = slides.find(({ id }) => id === payload.slideId);
        console.assert(slide);
        return slide;
      }

      switch (type) {
        case 'addSlide':
          slides.splice(payload.index, 0, payload.slide);
          break;
        case 'deleteSlide':
          slides = slides.filter(({ id }) => id !== payload.id);
          break;
        case 'addBlock': {
          const slide = getSlide();
          slide.blocks.push(payload.block);
          break;
        }
        case 'updateBlock': {
          const slide = getSlide();
          const blockIndex = slide.blocks.findIndex(
            ({ id }) => id === payload.block.id
          );
          console.assert(blockIndex);
          slide.blocks[blockIndex] = payload.block;
          break;
        }
        case 'reorderBlocks': {
          const slide = getSlide();
          const toIndex = findBlockById(slide, payload.toId);
          const fromIndex = findBlockById(slide, payload.fromId);
          moveItemInArray(slide.blocks, toIndex, fromIndex);
          break;
        }
        case 'deleteBlock': {
          const slide = getSlide();
          slide.blocks = slide.blocks.filter(
            ({ id }) => id !== payload.blockId
          );
          break;
        }
        case 'updateSlideMeta':
          getSlide()[payload.name] = payload.value;
          break;
      }

      slides = slides.filter(s => !!s.id);
      console.log(slides);
      this.presentationJs.set({ slides });
    });
  }

  addSlide() {
    const index = this.selectedSlide$.value;
    const action = {
      type: 'addSlide',
      payload: {
        slide: {
          id: this.uniqueId(),
          title: 'New slide',
          blocks: []
        },
        index
      }
    };
    this.dispatch(action);
  }

  updateSlideMeta(slideId: string, name: string, value: string) {
    const action = {
      type: 'updateSlideMeta',
      payload: {
        name,
        value,
        slideId
      }
    };
    this.dispatch(action);
  }

  deleteSlide(slideId: string) {
    const action = {
      type: 'deleteSlide',
      payload: {
        slideId
      }
    };
    this.dispatch(action);
  }

  addBlock(slideId: string, block: ContentBlock) {
    const action = {
      type: 'addBlock',
      payload: {
        block,
        slideId
      }
    };

    this.dispatch(action);
  }

  updateBlock(slideId: string, block: ContentBlock) {
    const action = {
      type: 'updateBlock',
      payload: {
        block,
        slideId
      }
    };

    this.dispatch(action);
  }

  deleteBlock(slideId: string, blockId: string) {
    const action = {
      type: 'deleteBlock',
      payload: {
        blockId,
        slideId
      }
    };

    this.dispatch(action);
  }

  reorderBlocks(slideId: string, fromId: string, toId: string) {
    const action = {
      type: 'reorderBlocks',
      payload: {
        slideId,
        fromId,
        toId
      }
    };

    this.dispatch(action);
  }
}
