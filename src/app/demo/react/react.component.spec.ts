import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactComponent } from './react.component';

// TODO: Fix this test suite.
xdescribe('ReactComponent', () => {
  let component: ReactComponent;
  let fixture: ComponentFixture<ReactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReactComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
