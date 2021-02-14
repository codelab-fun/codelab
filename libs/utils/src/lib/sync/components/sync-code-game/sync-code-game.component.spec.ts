import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncCodeGameComponent } from './sync-code-game.component';

describe('CodeInTheDarkComponent', () => {
  let component: SyncCodeGameComponent;
  let fixture: ComponentFixture<SyncCodeGameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SyncCodeGameComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncCodeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
