import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabCodeDemoConsoleComponent } from './codelab-code-demo-console.component';

describe('CodelabCodeDemoConsoleComponent', () => {
  let component: CodelabCodeDemoConsoleComponent;
  let fixture: ComponentFixture<CodelabCodeDemoConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabCodeDemoConsoleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabCodeDemoConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
