import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizComponent } from './viz.component';

describe('VizComponent', () => {
  let component: VizComponent;
  let fixture: ComponentFixture<VizComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VizComponent],
    }).compileComponents();
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
