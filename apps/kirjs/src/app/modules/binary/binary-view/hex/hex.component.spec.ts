import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexComponent } from './hex.component';

describe('HexComponent', () => {
  let component: HexComponent;
  let fixture: ComponentFixture<HexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HexComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexComponent);
    component = fixture.debugElement.componentInstance;
    component.data = 'hex_data';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
