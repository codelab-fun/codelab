import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncJoinInstructionsComponent } from './sync-join-instructions.component';
import { SyncJoinInstructionsModule } from '@codelab/utils/src/lib/sync/components/sync-join-instructions/sync-join-instructions.module';
import { getSyncDbService } from '@codelab/utils/src/lib/testing/mocks/sync-db-service';
import { getMockAngularFireProviders } from '@codelab/utils/src/lib/testing/mocks/angular-fire';

describe('SyncJoinInstructionsComponent', () => {
  let component: SyncJoinInstructionsComponent;
  let fixture: ComponentFixture<SyncJoinInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SyncJoinInstructionsModule],
      providers: [...getSyncDbService(), ...getMockAngularFireProviders()]
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
