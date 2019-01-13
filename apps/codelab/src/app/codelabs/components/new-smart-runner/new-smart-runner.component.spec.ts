import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSmartRunnerComponent } from './new-smart-runner.component';

describe('NewSmartRunnerComponent', () => {
  let component: NewSmartRunnerComponent;
  let fixture: ComponentFixture<NewSmartRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSmartRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSmartRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
