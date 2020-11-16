import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleCarComponent } from './little-car.component';

describe('LittleCarComponent', () => {
  let component: LittleCarComponent;
  let fixture: ComponentFixture<LittleCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LittleCarComponent]
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
