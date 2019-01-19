import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDemoRunnerComponent } from './code-demo-runner.component';

describe('CodeDemoRunnerComponent', () => {
  let component: CodeDemoRunnerComponent;
  let fixture: ComponentFixture<CodeDemoRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodeDemoRunnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeDemoRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
