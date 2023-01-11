import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LeaderboardPresenterComponent } from './leaderboard-presenter.component';

describe('LeaderboardPresenterComponent', () => {
  let component: LeaderboardPresenterComponent;
  let fixture: ComponentFixture<LeaderboardPresenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardPresenterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
