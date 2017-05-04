import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesTemplatesComponent } from './slides-templates.component';

// TODO: Fix this test suite.
xdescribe('SlidesTemplatesComponent', () => {
  let component: SlidesTemplatesComponent;
  let fixture: ComponentFixture<SlidesTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
