import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsPresenterComponent } from './stars-presenter.component';

describe('StarsPresenterComponent', () => {
  let component: StarsPresenterComponent;
  let fixture: ComponentFixture<StarsPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarsPresenterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
