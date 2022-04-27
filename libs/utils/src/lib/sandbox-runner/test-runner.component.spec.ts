import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestRunnerComponent } from './test-runner.component';

describe('TestRunnerComponent', () => {
  let component: TestRunnerComponent;
  let fixture: ComponentFixture<TestRunnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestRunnerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
