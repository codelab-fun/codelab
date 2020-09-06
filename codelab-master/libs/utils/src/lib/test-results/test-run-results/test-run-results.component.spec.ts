import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunResultsComponent } from './test-run-results.component';

describe('TestRunResultsComponent', () => {
  let component: TestRunResultsComponent;
  let fixture: ComponentFixture<TestRunResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestRunResultsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRunResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
