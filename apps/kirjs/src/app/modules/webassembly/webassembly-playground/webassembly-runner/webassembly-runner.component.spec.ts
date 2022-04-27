import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebassemblyRunnerComponent } from './webassembly-runner.component';

describe('WebassemblyRunnerComponent', () => {
  let component: WebassemblyRunnerComponent;
  let fixture: ComponentFixture<WebassemblyRunnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WebassemblyRunnerComponent],
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
