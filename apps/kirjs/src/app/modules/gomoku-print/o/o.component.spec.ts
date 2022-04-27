import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OComponent } from './o.component';

describe('OComponent', () => {
  let component: OComponent;
  let fixture: ComponentFixture<OComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
