import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDynamicComponent } from './display-dynamic-component.component';

describe('DisplayDynamicComponent', () => {
  let component: DisplayDynamicComponent;
  let fixture: ComponentFixture<DisplayDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDynamicComponent ]
    })
    .compileComponents();
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
