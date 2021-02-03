import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, from, merge, Subject } from 'rxjs';
import { map, mergeMap, scan, share, take } from 'rxjs/operators';
import { ContentBlock, ContentPresentation, ContentSlide } from './types';
import { nanoid } from 'nanoid';
import * as firebase from 'firebase';
import { reducer } from './reducer';

@Injectable()
export class ContentService implements OnDestroy {
  private readonly selectedSlideSubject = new BehaviorSubject(0);

  public readonly selectedSlide$ = this.selectedSlideSubject;

  readonly presentations = this.firestore.collection('presentations');
  readonly presentation$ = this.presentations.valueChanges();

  private readonly presentationJs = this.presentations.doc('typescriptjs');
  private readonly presentationActions = this.presentationJs.collection(
    'actions',
    ref => ref.orderBy('created', 'asc')
  );
  private readonly presentationSnapshots = this.presentationJs.collection(
    'snapshots',
    ref => ref.orderBy('created', 'desc').limit(1)
  );

  private readonly newActions$ = this.presentationSnapshots.valueChanges().pipe(
    take(1),
    mergeMap(([snap]) => {
      return this.presentationJs
        .collection('actions', ref => {
          const r = ref.orderBy('created', 'asc');
          return snap.created ? r.where('created', '>', snap.created) : r;
        })
        .valueChanges()
        .pipe(take(1));
    })
  );

  private readonly localActions$ = new Subject();

  readonly appliedActions = new Set();
  const;
  allActions2$ = merge(
    this.presentation$.pipe(
      map((presentations: ContentPresentation[] = []) => ({
        type: 'init',
        payload: presentations
      }))
    ),
    this.localActions$
  );
  private readonly allActions$ = merge(
    this.presentationSnapshots.valueChanges().pipe(
      map((slides: ContentSlide[] = []) => ({
        type: 'init',
        payload: slides
      }))
    ),
    this.presentationActions.valueChanges().pipe(
      take(1),
      mergeMap(actions => from(actions))
    ),
    this.localActions$
  );
  i = 0;

  // public readonly slides$ = this.allActions$.pipe(
  //   scan((state, action: any) => {
  //     if (this.appliedActions.has(action.id)) {
  //       return state;
  //     }
  //     this.appliedActions.add(action.id);
  //     return reducer(state, action);
  //   }, []),
  //   share()
  // );
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
    // // TODO: There should be a better way
    // // this.goToSlide(router.routerState.snapshot.root.firstChild.firstChild.params.id || 0);
    // combineLatest([this.slides$])
    //   .pipe(auditTime(1000), takeUntil(this.onDestroy))
    //   .subscribe(([slide]) => {
    //     // this.presentationSnapshots.add({
    //     //   created: firebase.firestore.FieldValue.serverTimestamp(),
    //     //   snapshot: slide
    //     // });
    //   });
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
}
