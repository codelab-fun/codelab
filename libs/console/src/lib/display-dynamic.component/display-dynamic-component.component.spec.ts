import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DisplayDynamicComponent } from './display-dynamic-component.component';

describe('DisplayDynamicComponent', () => {
  let component: DisplayDynamicComponent;
  let fixture: ComponentFixture<DisplayDynamicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayDynamicComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
