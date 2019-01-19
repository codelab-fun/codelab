import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultitabEditorComponent } from './multitab-editor.component';

describe('MultitabEditorComponent', () => {
  let component: MultitabEditorComponent;
  let fixture: ComponentFixture<MultitabEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultitabEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultitabEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
