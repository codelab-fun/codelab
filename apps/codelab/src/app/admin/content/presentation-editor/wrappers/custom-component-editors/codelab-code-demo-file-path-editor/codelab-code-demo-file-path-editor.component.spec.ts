import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CodelabCodeDemoFilePathEditorComponent } from './codelab-code-demo-file-path-editor.component';

describe('CodelabCodeDemoFilePathEditorComponent', () => {
  let component: CodelabCodeDemoFilePathEditorComponent;
  let fixture: ComponentFixture<CodelabCodeDemoFilePathEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabCodeDemoFilePathEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabCodeDemoFilePathEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
