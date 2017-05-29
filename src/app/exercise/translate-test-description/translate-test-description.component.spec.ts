import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateTestDescriptionComponent } from './translate-test-description.component';

describe('TranslateTestDescriptionComponent', () => {
  let component: TranslateTestDescriptionComponent;
  let fixture: ComponentFixture<TranslateTestDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateTestDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateTestDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
