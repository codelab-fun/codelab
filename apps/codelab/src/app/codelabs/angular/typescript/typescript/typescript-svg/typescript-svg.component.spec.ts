import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptSvgComponent } from './typescript-svg.component';

describe('TypescriptSvgComponent', () => {
  let component: TypescriptSvgComponent;
  let fixture: ComponentFixture<TypescriptSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypescriptSvgComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescriptSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
