import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InlineRootComponent } from './inline-root.component';

describe('InlineRootComponent', () => {
  let component: InlineRootComponent;
  let fixture: ComponentFixture<InlineRootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InlineRootComponent],
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
