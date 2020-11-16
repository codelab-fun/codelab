import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncPlaygroundTestComponent } from './sync-playground-test.component';
import { SyncModule } from '@codelab/utils/src/lib/sync/sync.module';
import { RouterTestingModule } from '@angular/router/testing';
import { getMockAngularFireProviders } from '@codelab/utils/src/lib/testing/mocks/angular-fire';

describe('SyncPlaygroundTestComponent', () => {
  let component: SyncPlaygroundTestComponent;
  let fixture: ComponentFixture<SyncPlaygroundTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SyncModule, RouterTestingModule],
      providers: [...getMockAngularFireProviders()]
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
