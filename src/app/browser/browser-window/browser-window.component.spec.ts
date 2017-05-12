import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserWindowComponent } from './browser-window.component';

describe('BrowserWindowComponent', () => {
  let component: BrowserWindowComponent;
  let fixture: ComponentFixture<BrowserWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
