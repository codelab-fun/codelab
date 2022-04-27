import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestResultsComponent } from './test-results.component';

describe('TestResultsComponent', () => {
  let component: TestResultsComponent;
  let fixture: ComponentFixture<TestResultsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestResultsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
