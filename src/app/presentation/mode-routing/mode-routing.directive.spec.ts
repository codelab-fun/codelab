import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { ModeRoutingDirective } from './mode-routing.directive';
import { Mode } from './../mode.enum';


@Component({
  selector: 'slides-test-component',
  template: '<div slides-mode-routing></div>'
})
class TestComponent {
}

describe('ModeRoutingDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ModeRoutingDirective
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    directiveEl = fixture.debugElement.query(By.directive(ModeRoutingDirective));
  }));

  it('should create an instance', () => {
    expect(directiveEl).not.toBeNull();
    expect(directiveEl).toBeDefined();
  });

  it('should set queryParams onModeChange event of overview', inject([Router], (router: Router) => {
    const MODE: Mode = 'overview';
    const componentInstance = fixture.componentInstance;

    const spy = spyOn(router, 'navigate');

    directiveEl.triggerEventHandler('onModeChange', MODE);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
    expect(spy.calls.first().args[1].queryParams.mode).toBe(MODE);
  }));

  it('should not set queryParams onModeChange event of none', inject([Router], (router: Router) => {
    const MODE: Mode = 'none';
    const componentInstance = fixture.componentInstance;

    const spy = spyOn(router, 'navigate');

    directiveEl.triggerEventHandler('onModeChange', MODE);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
    expect(spy.calls.first().args[1].queryParams).toBeUndefined();
  }));
});
