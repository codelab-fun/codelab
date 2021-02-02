import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabImageEditorComponent } from './codelab-image-editor.component';

describe('CodelabImageEditorComponent', () => {
  let component: CodelabImageEditorComponent;
  let fixture: ComponentFixture<CodelabImageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabImageEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
