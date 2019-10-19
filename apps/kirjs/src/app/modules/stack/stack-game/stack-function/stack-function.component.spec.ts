import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackFunctionComponent } from './stack-function.component';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

describe('StackFunctionComponent', () => {
  let component: StackFunctionComponent;
  let fixture: ComponentFixture<StackFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackFunctionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackFunctionComponent);
    component = fixture.debugElement.componentInstance;
    component.func = { inputs: 'string', outputs: 'string', name: 'mockfunc' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
