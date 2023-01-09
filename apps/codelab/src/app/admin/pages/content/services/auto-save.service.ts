import { Injectable } from '@angular/core';
import { auditTime, skip, take, takeUntil, tap } from "rxjs/operators";
import { ContentService } from "./content.service";
import { BehaviorSubject, ReplaySubject } from "rxjs";

export enum SaveStatus {
  UNSAVED = 1,
  SAVING,
  SAVED
}

@Injectable({
  providedIn: 'root'
})
export class AutoSaveService {
  readonly onDestroy$ = new ReplaySubject<void>();
  private readonly saveStatus = new BehaviorSubject(SaveStatus.SAVING);
  readonly saveStatus$ = this.saveStatus.asObservable();

  constructor(private readonly contentService: ContentService) {
  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  startAutosave() {
    this.contentService.state$
      .pipe(
        skip(1),
        tap(() => {
          this.saveStatus.next(SaveStatus.UNSAVED);
        }),
        auditTime(2500),
        takeUntil(this.onDestroy$),
      )
      .subscribe(() => {
        this.save();
      });
  }

  save() {
    this.contentService.state$.pipe(
      take(1),
      takeUntil(this.onDestroy$),
    ).subscribe((presentations) => {
      this.saveStatus.next(SaveStatus.SAVING);
      this.contentService.saveState(presentations);
      this.saveStatus.next(SaveStatus.SAVED);
    });

  }
}
