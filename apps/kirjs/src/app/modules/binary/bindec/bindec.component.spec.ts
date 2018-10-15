import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindecComponent } from './bindec.component';

describe('BindecComponent', () => {
  let component: BindecComponent;
  let fixture: ComponentFixture<BindecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
