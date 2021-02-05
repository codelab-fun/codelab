import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
import { auditTime, map, scan, share, takeUntil } from 'rxjs/operators';
import { ContentBlock, ContentPresentation } from './types';
import { nanoid } from 'nanoid';
import * as firebase from 'firebase';
import { reducer } from './reducer';

const DOC_KEY = 'presentations';

@Injectable()
export class ContentService implements OnDestroy {
  private readonly selectedSlideSubject = new BehaviorSubject(0);

  public readonly selectedSlide$ = this.selectedSlideSubject;

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
  const;
  allActions2$ = merge(
    this.presentations$.pipe(
      map((presentations: ContentPresentation[] = []) => ({
        type: 'init',
        payload: presentations
      }))
    ),
    this.localActions$
  );

  public readonly state$ = this.allActions2$.pipe(
    scan((state: ContentPresentation[], action: any) => {
      return reducer(state, action);
    }, {}),
    share()
  );

  constructor(
    readonly firestore: AngularFirestore,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly location: Location
  ) {
    // TODO: There should be a better way
    // this.goToSlide(router.routerState.snapshot.root.firstChild.firstChild.params.id || 0);
    this.state$
      .pipe(auditTime(1000), takeUntil(this.onDestroy))
      .subscribe(presentations => {
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

  // TODO: Move this out
  goToSlide(presentationId: string, index: number) {
    if (index >= 0) {
      this.selectedSlideSubject.next(index);
      this.location.replaceState(
        'admin/content/' + presentationId + '/' + index
      );
    }
  }

  dispatch(presentationId, action) {
    const a = {
      ...action,
      presentationId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      id: this.uniqueId()
    };

    this.localActions$.next(a);
  }

  // TODO: Move out
  nextSlide(presentationId: string) {
    this.goToSlide(presentationId, this.selectedSlide$.value + 1);
  }

  // TODO: Move out
  previousSlide(presentationId: string) {
    this.goToSlide(presentationId, this.selectedSlide$.value - 1);
  }

  addSlide(presentationId: string) {
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
        slideId
      }
    };
    this.dispatch(presentationId, action);
  }

  deleteSlide(presentationId: string, slideId: string) {
    const action = {
      type: 'deleteSlide',
      payload: {
        slideId
      }
    };
    this.dispatch(presentationId, action);
  }

  addBlock(presentationId: string, slideId: string, block: ContentBlock) {
    const action = {
      type: 'addBlock',
      payload: {
        block,
        slideId
      }
    };

    this.dispatch(presentationId, action);
  }

  updateBlock(presentationId: string, slideId: string, block: ContentBlock) {
    const action = {
      type: 'updateBlock',
      payload: {
        block,
        slideId
      }
    };

    this.dispatch(presentationId, action);
  }

  deleteBlock(presentationId: string, slideId: string, blockId: string) {
    const action = {
      type: 'deleteBlock',
      payload: {
        blockId,
        slideId
      }
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
        toId
      }
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
      payload
    };

    this.dispatch(payload.id, action);
  }

  deletePresentation(presentationId: string) {
    const action = {
      type: 'deletePresentation',
      payload: { presentationId }
    };

    this.dispatch(presentationId, action);
  }
}
