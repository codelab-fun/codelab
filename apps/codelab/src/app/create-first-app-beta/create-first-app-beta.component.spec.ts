import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFirstAppBetaComponent } from './create-first-app-beta.component';

describe('CreateFirstAppBetaComponent', () => {
  let component: CreateFirstAppBetaComponent;
  let fixture: ComponentFixture<CreateFirstAppBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFirstAppBetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFirstAppBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
