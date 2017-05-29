import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyInjectionComponent } from './dependency-injection.component';

// TODO: Fix this test suite.
xdescribe('DependencyInjectionComponent', () => {
  let component: DependencyInjectionComponent;
  let fixture: ComponentFixture<DependencyInjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DependencyInjectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyInjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
