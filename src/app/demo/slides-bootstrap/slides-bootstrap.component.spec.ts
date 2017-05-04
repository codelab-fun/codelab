import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesBootstrapComponent } from './slides-bootstrap.component';

// TODO: Fix this test suite.
xdescribe('SlidesBootstrapComponent', () => {
  let component: SlidesBootstrapComponent;
  let fixture: ComponentFixture<SlidesBootstrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesBootstrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
