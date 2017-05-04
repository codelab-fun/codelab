import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesTypescriptComponent } from './slides-typescript.component';

// TODO: Fix this test suite.
xdescribe('SlidesTypescriptComponent', () => {
  let component: SlidesTypescriptComponent;
  let fixture: ComponentFixture<SlidesTypescriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesTypescriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesTypescriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
