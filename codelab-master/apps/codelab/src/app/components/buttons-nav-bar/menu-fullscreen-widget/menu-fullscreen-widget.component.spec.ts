import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFullscreenWidgetComponent } from './menu-fullscreen-widget.component';

describe('MenuFullscreenWidgetComponent', () => {
  let component: MenuFullscreenWidgetComponent;
  let fixture: ComponentFixture<MenuFullscreenWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFullscreenWidgetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFullscreenWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
