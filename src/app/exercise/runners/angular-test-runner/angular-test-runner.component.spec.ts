import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTestRunnerComponent } from './angular-test-runner.component';

describe('AngularTestRunnerComponent', () => {
  let component: AngularTestRunnerComponent;
  let fixture: ComponentFixture<AngularTestRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularTestRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTestRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
