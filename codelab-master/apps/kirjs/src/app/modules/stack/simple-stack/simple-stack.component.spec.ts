import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleStackComponent } from './simple-stack.component';

describe('SimpleStackComponent', () => {
  let component: SimpleStackComponent;
  let fixture: ComponentFixture<SimpleStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleStackComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
