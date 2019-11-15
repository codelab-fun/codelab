import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSyncComponent } from './code-sync.component';

describe('CodeSyncComponent', () => {
  let component: CodeSyncComponent;
  let fixture: ComponentFixture<CodeSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodeSyncComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
