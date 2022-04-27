import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LittleCarComponent } from './little-car.component';

describe('LittleCarComponent', () => {
  let component: LittleCarComponent;
  let fixture: ComponentFixture<LittleCarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LittleCarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LittleCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
