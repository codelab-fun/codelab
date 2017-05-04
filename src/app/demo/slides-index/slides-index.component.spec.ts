import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesIndexComponent } from './slides-index.component';

// TODO: Fix this test suite.
xdescribe('SlidesIndexComponent', () => {
  let component: SlidesIndexComponent;
  let fixture: ComponentFixture<SlidesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
