import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginContentComponent } from './login-content.component';

describe('LoginContentComponent', () => {
  let component: LoginContentComponent;
  let fixture: ComponentFixture<LoginContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
