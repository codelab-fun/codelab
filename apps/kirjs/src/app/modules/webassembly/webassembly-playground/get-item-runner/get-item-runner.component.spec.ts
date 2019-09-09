import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetItemRunnerComponent } from './get-item-runner.component';

describe('GetItemRunnerComponent', () => {
  let component: GetItemRunnerComponent;
  let fixture: ComponentFixture<GetItemRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetItemRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetItemRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
