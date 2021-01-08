import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabPresetComponent } from './codelab-preset.component';

describe('CodelabPresetComponent', () => {
  let component: CodelabPresetComponent;
  let fixture: ComponentFixture<CodelabPresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabPresetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabPresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
