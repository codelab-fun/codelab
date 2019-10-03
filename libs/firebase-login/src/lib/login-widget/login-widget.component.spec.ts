import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWidgetComponent } from './login-widget.component';
import { FirebaseLoginModule, LoginService } from '@codelab/firebase-login';

describe('LoginWidgetComponent', () => {
  let component: LoginWidgetComponent;
  let fixture: ComponentFixture<LoginWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseLoginModule],
      providers: [
        {
          provide: LoginService,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
