import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssGameComponent } from './css-game.component';

describe('CssGameComponent', () => {
  let component: CssGameComponent;
  let fixture: ComponentFixture<CssGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
