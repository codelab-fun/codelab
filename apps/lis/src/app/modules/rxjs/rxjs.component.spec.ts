import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RxjsComponent } from './rxjs.component';

describe('RxjsComponent', () => {
  let component: RxjsComponent;
  let fixture: ComponentFixture<RxjsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RxjsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
