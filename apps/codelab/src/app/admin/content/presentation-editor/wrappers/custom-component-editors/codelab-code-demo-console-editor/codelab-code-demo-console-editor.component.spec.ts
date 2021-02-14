import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CodelabCodeDemoConsoleEditorComponent } from './codelab-code-demo-console-editor.component';

describe('CodelabCodeDemoConsoleComponent', () => {
  let component: CodelabCodeDemoConsoleEditorComponent;
  let fixture: ComponentFixture<CodelabCodeDemoConsoleEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabCodeDemoConsoleEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabCodeDemoConsoleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
