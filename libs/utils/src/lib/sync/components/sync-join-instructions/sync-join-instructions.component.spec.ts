import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncJoinInstructionsComponent } from './sync-join-instructions.component';

describe('SyncJoinInstructionsComponent', () => {
  let component: SyncJoinInstructionsComponent;
  let fixture: ComponentFixture<SyncJoinInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SyncJoinInstructionsComponent]
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
