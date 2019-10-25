import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderInViewportComponent } from './render-in-viewport.component';

describe('RenderInViewportComponent', () => {
  let component: RenderInViewportComponent;
  let fixture: ComponentFixture<RenderInViewportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderInViewportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderInViewportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
