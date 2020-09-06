import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineRootComponent } from './inline-root.component';

describe('InlineRootComponent', () => {
  let component: InlineRootComponent;
  let fixture: ComponentFixture<InlineRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InlineRootComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
