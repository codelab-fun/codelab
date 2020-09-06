import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorIndexingComponent } from './color-indexing.component';

describe('ColorIndexingComponent', () => {
  let component: ColorIndexingComponent;
  let fixture: ComponentFixture<ColorIndexingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorIndexingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorIndexingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
