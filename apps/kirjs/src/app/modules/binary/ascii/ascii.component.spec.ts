import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsciiComponent } from './ascii.component';
import { FormsModule } from '@angular/forms';

// TODO this is broken because TextEncoder... :/
describe.skip('AsciiComponent', () => {
  let component: AsciiComponent;
  let fixture: ComponentFixture<AsciiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsciiComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsciiComponent);
    component = fixture.debugElement.componentInstance;
    component.encoding = { key: 'UTF-8', value: [{ key: 8, value: 'UTF-8' }] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
