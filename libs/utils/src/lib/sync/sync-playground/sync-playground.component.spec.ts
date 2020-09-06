import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncPlaygroundComponent } from './sync-playground.component';

describe('SyncPlaygroundComponent', () => {
  let component: SyncPlaygroundComponent;
  let fixture: ComponentFixture<SyncPlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SyncPlaygroundComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
