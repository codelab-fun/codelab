import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KirjsPollComponent } from './kirjs-poll.component';

describe('KirjsPollComponent', () => {
  let component: KirjsPollComponent;
  let fixture: ComponentFixture<KirjsPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KirjsPollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KirjsPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
