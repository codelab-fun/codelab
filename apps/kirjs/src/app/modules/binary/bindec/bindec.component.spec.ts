import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BindecComponent } from './bindec.component';

describe('BindecComponent', () => {
  let component: BindecComponent;
  let fixture: ComponentFixture<BindecComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BindecComponent],
    }).compileComponents();
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
