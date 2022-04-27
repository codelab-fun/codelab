import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StackTestComponent } from './stack-test.component';

describe('StackTestComponent', () => {
  let component: StackTestComponent;
  let fixture: ComponentFixture<StackTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StackTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
