import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentsHierarchySvgComponent } from './components-hierarchy-svg.component';

describe('ComponentsHierarchySvgComponent', () => {
  let component: ComponentsHierarchySvgComponent;
  let fixture: ComponentFixture<ComponentsHierarchySvgComponent>;

  beforeEach(waitForAsync(() => {
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
