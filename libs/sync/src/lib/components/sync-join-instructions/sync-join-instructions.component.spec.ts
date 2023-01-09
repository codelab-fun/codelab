import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { getMockAngularFireProviders, getSyncDbService } from '@codelab/utils';

import { SyncJoinInstructionsComponent } from './sync-join-instructions.component';
import { SyncJoinInstructionsModule } from './sync-join-instructions.module';

describe('SyncJoinInstructionsComponent', () => {
  let component: SyncJoinInstructionsComponent;
  let fixture: ComponentFixture<SyncJoinInstructionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SyncJoinInstructionsModule],
      providers: [...getSyncDbService(), ...getMockAngularFireProviders()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncJoinInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});