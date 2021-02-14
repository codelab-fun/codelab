import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypescriptTestRunnerComponent } from './typescript-test-runner.component';

describe('TypescriptTestRunnerComponent', () => {
  let component: TypescriptTestRunnerComponent;
  let fixture: ComponentFixture<TypescriptTestRunnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TypescriptTestRunnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescriptTestRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
