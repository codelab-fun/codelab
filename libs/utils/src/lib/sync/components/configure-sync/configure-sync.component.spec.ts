import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigureSyncComponent } from './configure-sync.component';

describe('ConfigureSyncComponent', () => {
  let component: ConfigureSyncComponent;
  let fixture: ComponentFixture<ConfigureSyncComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigureSyncComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
