import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularThirtySecondsComponent } from './angular-thirty-seconds.component';

describe('AngularThirtySecondsComponent', () => {
  let component: AngularThirtySecondsComponent;
  let fixture: ComponentFixture<AngularThirtySecondsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularThirtySecondsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularThirtySecondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
