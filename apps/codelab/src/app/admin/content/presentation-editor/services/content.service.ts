import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { auditTime, map, scan, shareReplay, takeUntil } from 'rxjs/operators';
import { nanoid } from 'nanoid';
import { ContentBlock, ContentPresentation } from '../types';
import { reducer } from '../reducer';
import { serverTimestamp } from '@angular/fire/database';

const DOC_KEY = 'presentations';

@Injectable({ providedIn: 'root' })
export class ContentService implements OnDestroy {
  private readonly currentSlideSubject = new BehaviorSubject(0);

  public readonly currentSlideIndex$ = this.currentSlideSubject;

  readonly presentations = this.firestore.collection('presentations');
  private readonly presentations$ = this.presentations
    .doc(DOC_KEY)
    .valueChanges()
    .pipe(
      map((doc: any) => {
        console.log({ doc });
        return doc?.presentations || [];
      })
    );

  private readonly localActions$ = new Subject();

  readonly appliedActions = new Set();

  readonly allActions$ = merge(
    this.presentations$.pipe(
      map((presentations: ContentPresentation[] = []) => ({
        type: 'init',
        payload: presentations,
      }))
    ),
    this.localActions$
  );

  public readonly state$ = this.allActions$.pipe(
    scan((state: ContentPresentation[], action: any) => {
      return reducer(state, action);
    }, {}),
    shareReplay(1)
  );

  constructor(
    readonly firestore: AngularFirestore,
    readonly route: ActivatedRoute,
    readonly router: Router
  ) {
    // TODO: There should be a better way
    // this.goToSlide(router.routerState.snapshot.root.firstChild.firstChild.params.id || 0);
    this.state$
      .pipe(auditTime(1000), takeUntil(this.onDestroy))
      .subscribe((presentations) => {
        this.presentations.doc('presentations').set({ presentations });
      });
  }

  readonly onDestroy = new Subject();

  uniqueId() {
    return nanoid();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
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
    const index = this.currentSlideIndex$.value;
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
      payload: { presentationId },
    };

    this.dispatch(presentationId, action);
  }
}
