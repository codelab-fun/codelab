import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlideEditorComponent } from './slide-editor.component';

describe('SlideEditorComponent', () => {
  let component: SlideEditorComponent;
  let fixture: ComponentFixture<SlideEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SlideEditorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
