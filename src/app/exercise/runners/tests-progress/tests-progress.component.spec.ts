import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsProgressComponent } from './tests-progress.component';

describe('TestsProgressComponent', () => {
  let component: TestsProgressComponent;
  let fixture: ComponentFixture<TestsProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
