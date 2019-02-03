import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  data: Observable<LiveInfo> = of({
    user: 'code',
    sessionId: 'test',
    status: 'presenter', // 'viewer'
    presentationId: 'regex',
    slide: 'poll'
  } as LiveInfo);

  constructor() { }
}
