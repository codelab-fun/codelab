import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ObjectComponent } from './object.component';

describe('ObjectComponent', () => {
  let component: ObjectComponent;
  let fixture: ComponentFixture<ObjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
