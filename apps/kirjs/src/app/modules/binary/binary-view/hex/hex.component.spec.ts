import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexComponent } from './hex.component';

describe('HexComponent', () => {
  let component: HexComponent;
  let fixture: ComponentFixture<HexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
