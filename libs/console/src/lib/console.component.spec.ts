import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsoleComponent } from './console.component';

describe('ConsoleComponent', () => {
  let component: ConsoleComponent;
  let fixture: ComponentFixture<ConsoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConsoleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
