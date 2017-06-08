import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueComponent } from './vue.component';

// TODO: Fix this test suite.
xdescribe('VueComponent', () => {
  let component: VueComponent;
  let fixture: ComponentFixture<VueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
