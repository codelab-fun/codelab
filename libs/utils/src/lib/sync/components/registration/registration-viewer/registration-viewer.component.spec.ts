import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationViewerComponent } from './registration-viewer.component';

describe('RegistrationViewerComponent', () => {
  let component: RegistrationViewerComponent;
  let fixture: ComponentFixture<RegistrationViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
