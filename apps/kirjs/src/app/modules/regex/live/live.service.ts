import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LiveInfo {
  // Login service
  user: string;
  // Global
  sessionId: string;

  //
  status: 'presenter' | 'viewer'; // in the future 'admin';
  // e.g. regex
  presentationId: string;
  // slide id
  slide: string;
}

type AllData<T = any> = Record<string, T>;

@Injectable({
  providedIn: 'root'
})
export class LiveService<T = any> implements OnDestroy {
  private liveInfoSubject: BehaviorSubject<LiveInfo> = new BehaviorSubject<
    LiveInfo
  >({
    user: 'code',
    sessionId: 'test',
    status: 'presenter', // 'viewer'
    presentationId: 'regex',
    slide: 'config'
  } as LiveInfo);
  liveInfo: Observable<LiveInfo> = this.liveInfoSubject.asObservable();
  private allDataSubject: BehaviorSubject<AllData<T>> = new BehaviorSubject<
    AllData<T>
  >({} as AllData<T>);
  allData = this.allDataSubject.asObservable();
  myData = combineLatest([this.allData, this.liveInfo]).pipe(
    map(([allData, { user }]) => {
      return allData[user];
    })
  );

  constructor() {}

  storeLiveInfo(data: LiveInfo): void {
    const liveInfo = this.liveInfoSubject.getValue();
    this.liveInfoSubject.next({ ...liveInfo, ...data });
  }

  // Viewer
  storeMyData(data: T): void {
    // firebase.store
    const liveInfo = this.liveInfoSubject.getValue();
    const allData = this.allDataSubject.getValue();
    const value = { ...allData, [liveInfo.user]: data };

    this.allDataSubject.next(value);
  }

  ngOnDestroy() {
    if (this.allDataSubject) {
      this.allDataSubject.complete();
      this.allDataSubject = null;
    }
    if (this.liveInfoSubject) {
      this.liveInfoSubject.complete();
      this.liveInfoSubject = null;
    }
  }
}
