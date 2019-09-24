import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationViewerComponent } from './registration-viewer.component';

describe('RegistrationViewerComponent', () => {
  let component: RegistrationViewerComponent;
  let fixture: ComponentFixture<RegistrationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationViewerComponent]
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
