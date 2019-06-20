import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { PresentationComponent } from '../../presentation/presentation/presentation.component';

@Component({
  selector: 'slides-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.css']
})
export class SyncButtonComponent implements OnInit {

  syncOn = false;
  syncId = '';
  list = this.db.list('sync-sessions');
  sessions$ = this.list.snapshotChanges();

  constructor(private db: AngularFireDatabase,
              private presentation: PresentationComponent) {
    presentation.onSlideChange.filter(() => this.syncOn).subscribe((slideId) => {
      this.list.update(this.syncId, {slide: slideId});
    })

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
      this.presentation.goToSlide(index);
    })

  }
}
