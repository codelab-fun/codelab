import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularRunnerComponent } from './angular-runner.component';

describe('AngularRunnerComponent', () => {
  let component: AngularRunnerComponent;
  let fixture: ComponentFixture<AngularRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
