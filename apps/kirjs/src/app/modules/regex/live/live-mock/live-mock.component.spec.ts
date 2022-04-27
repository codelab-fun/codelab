import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LiveMockComponent } from './live-mock.component';

describe('LiveMockComponent', () => {
  let component: LiveMockComponent;
  let fixture: ComponentFixture<LiveMockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LiveMockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
