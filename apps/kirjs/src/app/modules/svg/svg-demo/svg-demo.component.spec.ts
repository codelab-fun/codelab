import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDemoComponent } from './svg-demo.component';
import { SafeHtml } from '@codelab/utils/src/lib/pipes/safeHtml.pipe';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SvgDemoComponent', () => {
  let component: SvgDemoComponent;
  let fixture: ComponentFixture<SvgDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgDemoComponent, SafeHtml],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDemoComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
