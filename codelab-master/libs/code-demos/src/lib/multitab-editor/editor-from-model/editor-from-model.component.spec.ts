import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFromModelComponent } from './editor-from-model.component';

describe('EditorFromModelComponent', () => {
  let component: EditorFromModelComponent;
  let fixture: ComponentFixture<EditorFromModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorFromModelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFromModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
