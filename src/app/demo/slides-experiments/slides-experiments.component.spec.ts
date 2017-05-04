import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesExperimentsComponent } from './slides-experiments.component';

// TODO: Fix this test suite.
xdescribe('SlidesExperimentsComponent', () => {
  let component: SlidesExperimentsComponent;
  let fixture: ComponentFixture<SlidesExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
