import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OnlineIndicatorComponent } from './online-indicator.component';
import { OnlineIndicatorModule } from '@codelab/utils/src/lib/sync/components/online-indicator/online-indicator.module';

describe('OnlineIndicatorComponent', () => {
  let component: OnlineIndicatorComponent;
  let fixture: ComponentFixture<OnlineIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OnlineIndicatorModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
