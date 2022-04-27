import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncComponent } from './sync.component';
import { SyncModule } from './sync.module';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  getMockAngularFireProviders,
  MockAngularFireAuth,
  MockAngularFireDatabase,
} from '@codelab/utils/src/lib/testing/mocks/angular-fire';

describe('SyncComponent', () => {
  let component: SyncComponent;
  let fixture: ComponentFixture<SyncComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SyncModule],
      providers: [getMockAngularFireProviders()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
