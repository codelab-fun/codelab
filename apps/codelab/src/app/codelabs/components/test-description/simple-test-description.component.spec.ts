import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTestDescriptionComponent } from './simple-test-description.component';

describe('SimpleTestDescriptionComponent', () => {
  let component: SimpleTestDescriptionComponent;
  let fixture: ComponentFixture<SimpleTestDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleTestDescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTestDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
