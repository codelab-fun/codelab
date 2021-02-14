import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestSetComponent } from './test-set.component';

describe('TestSetComponent', () => {
  let component: TestSetComponent;
  let fixture: ComponentFixture<TestSetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestSetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
