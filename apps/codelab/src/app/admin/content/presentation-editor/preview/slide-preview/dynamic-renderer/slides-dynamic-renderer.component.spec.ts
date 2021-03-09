import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesDynamicRendererComponent } from './slides-dynamic-renderer.component';

describe('DynamicRendererComponent', () => {
  let component: SlidesDynamicRendererComponent;
  let fixture: ComponentFixture<SlidesDynamicRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlidesDynamicRendererComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesDynamicRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
