import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizComponent } from './viz.component';

describe('VizComponent', () => {
  let component: VizComponent;
  let fixture: ComponentFixture<VizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
