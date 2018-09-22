import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeGifComponent } from './fake-gif.component';

describe('FakeGifComponent', () => {
  let component: FakeGifComponent;
  let fixture: ComponentFixture<FakeGifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeGifComponent ]
    })
    .compileComponents();
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
