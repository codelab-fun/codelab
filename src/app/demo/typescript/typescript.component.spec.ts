import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptComponent } from './typescript.component';

describe('TypescriptComponent', () => {
  let component: TypescriptComponent;
  let fixture: ComponentFixture<TypescriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypescriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
