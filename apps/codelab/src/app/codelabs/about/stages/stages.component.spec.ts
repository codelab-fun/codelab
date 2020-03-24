import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesComponent } from './stages.component';

describe('StagesComponent', () => {
  let component: StagesComponent;
  let fixture: ComponentFixture<StagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StagesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
