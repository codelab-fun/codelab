import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlideHtmlEditorComponent } from './slide-html-editor.component';

describe('SlideHtmlEditorComponent', () => {
  let component: SlideHtmlEditorComponent;
  let fixture: ComponentFixture<SlideHtmlEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SlideHtmlEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideHtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
