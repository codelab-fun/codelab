import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryGifComponent } from './binary-gif.component';

describe('BinaryGifComponent', () => {
  let component: BinaryGifComponent;
  let fixture: ComponentFixture<BinaryGifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryGifComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
