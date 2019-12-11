import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionConfigComponent } from './session-config.component';

describe('SessionConfigComponent', () => {
  let component: SessionConfigComponent;
  let fixture: ComponentFixture<SessionConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionConfigComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
