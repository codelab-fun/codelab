import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LeaderboardViewerComponent } from './leaderboard-viewer.component';

describe('LeaderboardViewerComponent', () => {
  let component: LeaderboardViewerComponent;
  let fixture: ComponentFixture<LeaderboardViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
