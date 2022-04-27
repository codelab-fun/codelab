import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularFlagsComponent } from './angular-flags.component';

describe('AngularFlagsComponent', () => {
  let component: AngularFlagsComponent;
  let fixture: ComponentFixture<AngularFlagsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AngularFlagsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
