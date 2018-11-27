import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HooksTestComponent } from './hooks-test.component';

describe('HooksTestComponent', () => {
  let component: HooksTestComponent;
  let fixture: ComponentFixture<HooksTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HooksTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HooksTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
