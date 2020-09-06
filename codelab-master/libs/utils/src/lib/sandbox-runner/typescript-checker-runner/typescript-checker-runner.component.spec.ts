import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptCheckerRunnerComponent } from './typescript-checker-runner.component';

describe('TypescriptCheckerRunnerComponent', () => {
  let component: TypescriptCheckerRunnerComponent;
  let fixture: ComponentFixture<TypescriptCheckerRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypescriptCheckerRunnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescriptCheckerRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
