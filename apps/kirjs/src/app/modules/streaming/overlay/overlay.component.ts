import { Component, Inject, OnInit } from '@angular/core';
import { FLAME_LINK, StreamSession } from '../common';
import { interval, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'slides-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  readonly layout = 'horizontal';
  data$: Observable<StreamSession> = interval(5000).pipe(
    startWith(0),
    switchMap(() => {
      return this.flameLink.content.get({
        schemaKey: 'currentSession',
        populate: true
      });
    }),
    map((a: any) => a.session)
  );

  constructor(@Inject(FLAME_LINK) private flameLink: any) {}

  ngOnInit() {}
}
