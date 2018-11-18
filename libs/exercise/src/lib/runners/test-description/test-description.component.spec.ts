import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDescriptionComponent } from './test-description.component';

describe('TestDescriptionComponent', () => {
  let component: TestDescriptionComponent;
  let fixture: ComponentFixture<TestDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestDescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
