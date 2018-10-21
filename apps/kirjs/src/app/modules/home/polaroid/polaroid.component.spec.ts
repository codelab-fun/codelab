import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolaroidComponent } from './polaroid.component';

describe('PolaroidComponent', () => {
  let component: PolaroidComponent;
  let fixture: ComponentFixture<PolaroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolaroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolaroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
