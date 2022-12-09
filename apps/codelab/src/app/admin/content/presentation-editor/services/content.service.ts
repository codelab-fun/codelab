import { inject, Injectable, OnDestroy } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, shareReplay, take, tap, } from 'rxjs/operators';
import { nanoid } from 'nanoid';
import { ContentBlock, ContentPresentation } from '../types';
import { reducer } from '../reducer';
import { serverTimestamp } from '@angular/fire/database';
import { NavigationService } from "./navigation.service";
import { collection, doc, docData, Firestore, setDoc } from "@angular/fire/firestore";

const DOC_KEY = 'presentations';

@Injectable({providedIn: 'root'})
export class ContentService implements OnDestroy {
  public readonly currentSlideIndex$ = this.navigationService.currentSlideIndex$;

  readonly onDestroy$ = new Subject();
  private firestore: Firestore = inject(Firestore);
  private readonly presentations = collection(this.firestore, DOC_KEY);
  private readonly presentationDoc = doc(this.presentations, DOC_KEY);
  private readonly presentations$ = docData(this.presentationDoc)
    .pipe(
      distinctUntilChanged((a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
      }),
      map((doc: any) => {
        console.log('update');
        return doc?.presentations || [];
      })
    );
  private readonly localActions$ = new Subject();
  readonly allActions$ = merge(
    this.presentations$.pipe(
      // TODO(kirjs): actually make it work
      distinctUntilChanged((a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
      }),
      map((presentations: ContentPresentation[] = []) => ({
        type: 'init',
        payload: presentations,
      }))
    ),
    this.localActions$.pipe()
  );

  public readonly state$ = this.allActions$.pipe(
    scan((state: ContentPresentation[], action: any) => {
      console.log('aAaaa');
      return reducer(state, action);
    }, {}),
    shareReplay(1),
    tap(() => {
      console.log('kmon');
    }),
  );

  constructor(
    private readonly navigationService: NavigationService
  ) {
  }

  uniqueId() {
    return nanoid();
  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  dispatch(presentationId, action) {
    const a = {
      ...action,
      presentationId,
      created: serverTimestamp(),
      id: this.uniqueId(),
    };

    this.localActions$.next(a);
  }

  addSlide(presentationId: string) {
    this.currentSlideIndex$.pipe(take(1)).subscribe(index => {
      const action = {
        type: 'addSlide',
        payload: {
          slide: {
            id: this.uniqueId(),
            title: 'New slide',
            blocks: [],
          },
          index,
        },
      };
      this.dispatch(presentationId, action);
    });

  }

  updateSlideMeta(
    presentationId: string,
    slideId: string,
    name: string,
    value: string
  ) {
    const action = {
      type: 'updateSlideMeta',
      payload: {
        name,
        value,
        slideId,
      },
    };
    this.dispatch(presentationId, action);
  }

  updatePresentationMeta(presentationId: string, name: string, value: string) {
    const action = {
      type: 'updatePresentationMeta',
      payload: {
        name,
        value,
      },
    };
    this.dispatch(presentationId, action);
  }

  deleteSlide(presentationId: string, slideId: string) {
    const action = {
      type: 'deleteSlide',
      payload: {
        slideId,
      },
    };
    this.dispatch(presentationId, action);
  }

  deleteSlides(presentationId: string, selections: number[]) {
    const action = {
      type: 'deleteSlides',
      payload: {
        selections
      }
    };

    this.dispatch(presentationId, action);
  }

  reorderSlides(presentationId: string, selections: number[], toIndex: number) {
    const action = {
      type: 'reorderSlides',
      payload: {
        selections,
        toIndex
      }
    };

    this.dispatch(presentationId, action);
  }

  addBlock(presentationId: string, slideId: string, block: ContentBlock) {
    const action = {
      type: 'addBlock',
      payload: {
        block,
        slideId,
      },
    };

    this.dispatch(presentationId, action);
  }

  updateBlock(presentationId: string, slideId: string, block: ContentBlock) {
    const action = {
      type: 'updateBlock',
      payload: {
        block,
        slideId,
      },
    };

    this.dispatch(presentationId, action);
  }

  deleteBlock(presentationId: string, slideId: string, blockId: string) {
    const action = {
      type: 'deleteBlock',
      payload: {
        blockId,
        slideId,
      },
    };

    this.dispatch(presentationId, action);
  }

  reorderBlocks(
    presentationId: string,
    slideId: string,
    fromId: string,
    toId: string
  ) {
    const action = {
      type: 'reorderBlocks',
      payload: {
        slideId,
        fromId,
        toId,
      },
    };

    this.dispatch(presentationId, action);
  }

  addPresentation(payload: {
    slides: any[];
    name: string;
    id: string;
    actions: any[];
    version: number;
  }) {
    const action = {
      type: 'addPresentation',
      payload,
    };

    this.dispatch(payload.id, action);
  }

  deletePresentation(presentationId: string) {
    const action = {
      type: 'deletePresentation',
      payload: {presentationId},
    };

    this.dispatch(presentationId, action);
  }

  saveState(presentations) {
    console.log('save');
    setDoc(this.presentationDoc, {presentations});
  }
}
