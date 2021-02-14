import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationAdminComponent } from './registration-admin.component';

describe('RegistrationAdminComponent', () => {
  let component: RegistrationAdminComponent;
  let fixture: ComponentFixture<RegistrationAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationAdminComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
