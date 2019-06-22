import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'codelab-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.css']
})
export class SyncButtonComponent implements OnInit {

  syncOn = false;
  syncId = '';
  list = this.db.list('sync-sessions');
  sessions$ = this.list.snapshotChanges();

  constructor(private db: AngularFireDatabase,
              private presentation: SlidesDeckComponent) {
    presentation.slideChange.pipe(filter(() => this.syncOn)).subscribe((slideId) => {
      this.list.update(this.syncId, {slide: slideId});
    });

  }

  ngOnInit() {
  }

  start() {
    this.syncOn = true;
    this.syncId = this.list.push({
      slide: this.presentation.activeSlideIndex
    }).key;
  }

  follow({value}: { value: string }) {
    this.db.list('sync-sessions/' + value).valueChanges().subscribe(([index]) => {
      this.presentation.goToSlide(Number(index));
    });

  }
}
