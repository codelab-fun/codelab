import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsHierarchySvgComponent } from './components-hierarchy-svg.component';

describe('ComponentsHierarchySvgComponent', () => {
  let component: ComponentsHierarchySvgComponent;
  let fixture: ComponentFixture<ComponentsHierarchySvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentsHierarchySvgComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsHierarchySvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
