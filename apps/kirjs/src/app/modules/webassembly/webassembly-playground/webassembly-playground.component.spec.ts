import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebassemblyPlaygroundComponent } from './webassembly-playground.component';

describe('WebassemblyPlaygroundComponent', () => {
  let component: WebassemblyPlaygroundComponent;
  let fixture: ComponentFixture<WebassemblyPlaygroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WebassemblyPlaygroundComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebassemblyPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
