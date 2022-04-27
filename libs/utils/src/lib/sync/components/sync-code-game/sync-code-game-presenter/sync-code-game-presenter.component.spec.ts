import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncCodeGamePresenterComponent } from './sync-code-game-presenter.component';

describe('SyncCodeGamePresenterComponent', () => {
  let component: SyncCodeGamePresenterComponent;
  let fixture: ComponentFixture<SyncCodeGamePresenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SyncCodeGamePresenterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncCodeGamePresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
