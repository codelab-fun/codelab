import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitComponent } from './bit.component';

describe('BitComponent', () => {
  let component: BitComponent;
  let fixture: ComponentFixture<BitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
