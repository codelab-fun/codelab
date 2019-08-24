import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineIndicatorComponent } from './online-indicator.component';

describe('OnlineIndicatorComponent', () => {
  let component: OnlineIndicatorComponent;
  let fixture: ComponentFixture<OnlineIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
