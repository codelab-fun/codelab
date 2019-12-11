import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayConfigComponent } from './overlay-config.component';

describe('OverlayConfigComponent', () => {
  let component: OverlayConfigComponent;
  let fixture: ComponentFixture<OverlayConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayConfigComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
