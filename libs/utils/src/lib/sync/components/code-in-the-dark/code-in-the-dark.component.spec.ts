import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeInTheDarkComponent } from './code-in-the-dark.component';

describe('CodeInTheDarkComponent', () => {
  let component: CodeInTheDarkComponent;
  let fixture: ComponentFixture<CodeInTheDarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodeInTheDarkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeInTheDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
