import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncComponent } from './sync.component';
import { SyncModule } from './sync.module';
import { getMockAngularFireProviders } from '@codelab/utils/src/lib/testing/mocks/angular-fire';

describe('SyncComponent', () => {
  let component: SyncComponent;
  let fixture: ComponentFixture<SyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SyncModule],
      providers: [getMockAngularFireProviders()]
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
