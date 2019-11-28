import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncCodeEditorComponent } from './sync-code-editor.component';

describe('CodeInTheDarkComponent', () => {
  let component: SyncCodeEditorComponent;
  let fixture: ComponentFixture<SyncCodeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SyncCodeEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
