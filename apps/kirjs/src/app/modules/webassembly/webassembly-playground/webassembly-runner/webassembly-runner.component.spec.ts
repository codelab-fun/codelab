import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebassemblyRunnerComponent } from './webassembly-runner.component';

describe('WebassemblyRunnerComponent', () => {
  let component: WebassemblyRunnerComponent;
  let fixture: ComponentFixture<WebassemblyRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebassemblyRunnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebassemblyRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
