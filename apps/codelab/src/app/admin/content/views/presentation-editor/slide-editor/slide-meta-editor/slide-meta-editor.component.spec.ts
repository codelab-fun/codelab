import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlideMetaEditorComponent } from './slide-meta-editor.component';

describe('SlideMetaEditorComponent', () => {
  let component: SlideMetaEditorComponent;
  let fixture: ComponentFixture<SlideMetaEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SlideMetaEditorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideMetaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
