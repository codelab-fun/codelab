import {
  Directive,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

export const SYNC_FIRESTORE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SyncFireStoreDirective),
  multi: true
};

// TODO(kirjs): This is not yet working
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncFireStore]'
})
export class SyncFireStoreDirective<T> implements OnChanges {
  @Input() syncFireStore!: T;
  private doc: AngularFirestoreDocument<T>;
  private subscription?: Subscription;

  constructor(private afs: AngularFirestore, control: NgControl) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.key) {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }

      this.doc = this.afs.doc<T>('items/1');
      this.subscription = this.doc.valueChanges().subscribe();
    }
  }
}
