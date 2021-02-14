import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationPresenterComponent } from './registration-presenter.component';

describe('RegistrationPresenterComponent', () => {
  let component: RegistrationPresenterComponent;
  let fixture: ComponentFixture<RegistrationPresenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationPresenterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
