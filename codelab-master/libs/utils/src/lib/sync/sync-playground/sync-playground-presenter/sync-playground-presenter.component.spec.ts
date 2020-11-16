import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncPlaygroundPresenterComponent } from './sync-playground-presenter.component';

describe('SyncPlaygroundPresenterComponent', () => {
  let component: SyncPlaygroundPresenterComponent;
  let fixture: ComponentFixture<SyncPlaygroundPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SyncPlaygroundPresenterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPlaygroundPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
