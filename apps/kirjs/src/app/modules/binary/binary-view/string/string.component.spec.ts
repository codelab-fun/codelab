import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StringComponent } from './string.component';

describe('StringComponent', () => {
  let component: StringComponent;
  let fixture: ComponentFixture<StringComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StringComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
