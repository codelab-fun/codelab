import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GifPaletteComponent } from './gif-palette.component';

describe('GifPaletteComponent', () => {
  let component: GifPaletteComponent;
  let fixture: ComponentFixture<GifPaletteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GifPaletteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GifPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
