import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncPlaygroundTestComponent } from './sync-playground-test.component';

describe('SyncPlaygroundTestComponent', () => {
  let component: SyncPlaygroundTestComponent;
  let fixture: ComponentFixture<SyncPlaygroundTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncPlaygroundTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPlaygroundTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
