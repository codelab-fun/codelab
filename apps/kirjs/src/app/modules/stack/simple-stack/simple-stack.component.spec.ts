import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleStackComponent } from './simple-stack.component';

describe('SimpleStackComponent', () => {
  let component: SimpleStackComponent;
  let fixture: ComponentFixture<SimpleStackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleStackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
