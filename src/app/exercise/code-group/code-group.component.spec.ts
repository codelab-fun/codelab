import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGroupComponent } from './code-group.component';

describe('CodeGroupComponent', () => {
  let component: CodeGroupComponent;
  let fixture: ComponentFixture<CodeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
