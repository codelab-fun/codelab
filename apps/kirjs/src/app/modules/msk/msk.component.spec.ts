import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MskComponent } from './msk.component';

describe('MskComponent', () => {
  let component: MskComponent;
  let fixture: ComponentFixture<MskComponent>;

  beforeEach(waitForAsync(() => {
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
