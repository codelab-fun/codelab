import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncCodeGameViewerComponent } from './sync-code-game-viewer.component';

describe('SyncCodeGameViewerComponent', () => {
  let component: SyncCodeGameViewerComponent;
  let fixture: ComponentFixture<SyncCodeGameViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SyncCodeGameViewerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncCodeGameViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
