import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FakeGifComponent } from './fake-gif.component';

describe('FakeGifComponent', () => {
  let component: FakeGifComponent;
  let fixture: ComponentFixture<FakeGifComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FakeGifComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
