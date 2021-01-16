import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardViewerComponent } from './leaderboard-viewer.component';

describe('LeaderboardViewerComponent', () => {
  let component: LeaderboardViewerComponent;
  let fixture: ComponentFixture<LeaderboardViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardViewerComponent]
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
