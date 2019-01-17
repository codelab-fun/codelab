import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDescriptionSvgComponent } from './tree-description-svg.component';

describe('TreeDescriptionSvgComponent', () => {
  let component: TreeDescriptionSvgComponent;
  let fixture: ComponentFixture<TreeDescriptionSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeDescriptionSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDescriptionSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
