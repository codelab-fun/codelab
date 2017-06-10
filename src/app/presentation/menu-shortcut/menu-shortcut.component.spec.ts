import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuShortcutComponent } from './menu-shortcut.component';

// TODO: Fix this test suite.
xdescribe('MenuShortcutComponent', () => {
  let component: MenuShortcutComponent;
  let fixture: ComponentFixture<MenuShortcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuShortcutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
