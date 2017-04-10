import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCodelabComponent } from './new-codelab.component';

describe('NewCodelabComponent', () => {
  let component: NewCodelabComponent;
  let fixture: ComponentFixture<NewCodelabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCodelabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCodelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
