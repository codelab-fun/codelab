import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CodelabPresetComponent } from './codelab-preset.component';

describe('CodelabPresetComponent', () => {
  let component: CodelabPresetComponent;
  let fixture: ComponentFixture<CodelabPresetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabPresetComponent],
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
