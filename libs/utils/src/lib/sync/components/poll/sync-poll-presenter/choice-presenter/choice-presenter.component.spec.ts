import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePresenterComponent } from './choice-presenter.component';

describe('ChoicePresenterComponent', () => {
  let component: ChoicePresenterComponent;
  let fixture: ComponentFixture<ChoicePresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChoicePresenterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicePresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
