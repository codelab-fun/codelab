import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideEditorComponent } from './slide-editor.component';

describe('SlideEditorComponent', () => {
  let component: SlideEditorComponent;
  let fixture: ComponentFixture<SlideEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideEditorComponent]
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
