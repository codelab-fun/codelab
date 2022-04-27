import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MultitabEditorComponent } from './multitab-editor.component';

describe('MultitabEditorComponent', () => {
  let component: MultitabEditorComponent;
  let fixture: ComponentFixture<MultitabEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MultitabEditorComponent],
      teardown: { destroyAfterEach: false },
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
