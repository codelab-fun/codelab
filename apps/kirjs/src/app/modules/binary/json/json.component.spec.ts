import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JsonComponent } from './json.component';

describe('JsonComponent', () => {
  let component: JsonComponent;
  let fixture: ComponentFixture<JsonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JsonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
