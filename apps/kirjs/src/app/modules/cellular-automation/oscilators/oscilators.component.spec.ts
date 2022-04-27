import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OscilatorsComponent } from './oscilators.component';

describe('OscilatorsComponent', () => {
  let component: OscilatorsComponent;
  let fixture: ComponentFixture<OscilatorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OscilatorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OscilatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
