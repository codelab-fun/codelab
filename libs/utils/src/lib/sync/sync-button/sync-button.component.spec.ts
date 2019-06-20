import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncButtonComponent } from './sync-button.component';

describe('SyncButtonComponent', () => {
  let component: SyncButtonComponent;
  let fixture: ComponentFixture<SyncButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
