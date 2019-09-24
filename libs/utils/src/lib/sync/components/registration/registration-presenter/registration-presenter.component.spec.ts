import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPresenterComponent } from './registration-presenter.component';

describe('RegistrationPresenterComponent', () => {
  let component: RegistrationPresenterComponent;
  let fixture: ComponentFixture<RegistrationPresenterComponent>;

  beforeEach(async(() => {
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
