import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidePreviewComponent } from './slide-preview.component';

describe('SlidePreviewComponent', () => {
  let component: SlidePreviewComponent;
  let fixture: ComponentFixture<SlidePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlidePreviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
