import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineComponent } from './inline.component';
import { InlineRootComponent } from '../inline-root/inline-root.component';
import { BinaryParentComponent } from '../binary-parent/binary-parent.component';

describe('InlineComponent', () => {
  let component: InlineComponent;
  let fixture: ComponentFixture<InlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InlineComponent],
      providers: [InlineRootComponent, BinaryParentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineComponent);
    component = fixture.debugElement.componentInstance;
    component.isArray = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
