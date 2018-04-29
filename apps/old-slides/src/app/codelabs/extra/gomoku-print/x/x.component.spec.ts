import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XComponent } from './x.component';

describe('XComponent', () => {
  let component: XComponent;
  let fixture: ComponentFixture<XComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
