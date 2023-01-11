import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FirebaseLoginModule } from '../firebase-login.module';
import { LoginService } from '../login.service';

import { LoginWidgetComponent } from './login-widget.component';

describe('LoginWidgetComponent', () => {
  let component: LoginWidgetComponent;
  let fixture: ComponentFixture<LoginWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseLoginModule],
      providers: [
        {
          provide: LoginService,
          useValue: {},
        },
      ],
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
