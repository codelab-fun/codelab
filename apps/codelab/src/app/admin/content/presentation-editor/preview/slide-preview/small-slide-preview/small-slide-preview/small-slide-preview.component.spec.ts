import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSlidePreviewComponent } from './small-slide-preview.component';

describe('SmallSlidePreviewComponent', () => {
  let component: SmallSlidePreviewComponent;
  let fixture: ComponentFixture<SmallSlidePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallSlidePreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSlidePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
