import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeScriptSvgComponent } from './typescript-svg.component';

describe('TypeScriptSvgComponent', () => {
  let component: TypeScriptSvgComponent;
  let fixture: ComponentFixture<TypeScriptSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypeScriptSvgComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeScriptSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
