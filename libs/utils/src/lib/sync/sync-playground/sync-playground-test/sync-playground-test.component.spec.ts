import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncPlaygroundTestComponent } from './sync-playground-test.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SyncModule } from '../../sync.module';
import { getMockAngularFireProviders } from '../../../testing/mocks/angular-fire';

describe('SyncPlaygroundTestComponent', () => {
  let component: SyncPlaygroundTestComponent;
  let fixture: ComponentFixture<SyncPlaygroundTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SyncModule, RouterTestingModule],
      providers: [...getMockAngularFireProviders()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPlaygroundTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
