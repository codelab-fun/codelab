import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OscilatorsComponent } from './oscilators.component';

describe('OscilatorsComponent', () => {
  let component: OscilatorsComponent;
  let fixture: ComponentFixture<OscilatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OscilatorsComponent]
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
