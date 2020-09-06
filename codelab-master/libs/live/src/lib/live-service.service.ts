import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LiveServiceService {
  @Input() user = 'pikachu';
  @Input() host = 'pirojok';
  @Input() session = 'live-share';
  @Input() bucket = 'config';

  constructor() {}
}
