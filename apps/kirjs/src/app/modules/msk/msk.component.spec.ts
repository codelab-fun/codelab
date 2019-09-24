import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MskComponent } from './msk.component';

describe('MskComponent', () => {
  let component: MskComponent;
  let fixture: ComponentFixture<MskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MskComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
