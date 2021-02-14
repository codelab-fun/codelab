import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RealtimeEvalComponent } from './code-demo-realtime-eval.component';

describe('RealtimeEvalComponent', () => {
  let component: RealtimeEvalComponent;
  let fixture: ComponentFixture<RealtimeEvalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RealtimeEvalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
