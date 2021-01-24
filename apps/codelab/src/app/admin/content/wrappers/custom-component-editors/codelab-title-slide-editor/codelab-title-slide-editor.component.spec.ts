import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabTitleSlideEditorComponent } from './codelab-title-slide-editor.component';

describe('CodelabTitleSlideEditorComponent', () => {
  let component: CodelabTitleSlideEditorComponent;
  let fixture: ComponentFixture<CodelabTitleSlideEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabTitleSlideEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabTitleSlideEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
