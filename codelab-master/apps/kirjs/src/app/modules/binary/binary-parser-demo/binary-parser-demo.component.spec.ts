import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryParserDemoComponent } from './binary-parser-demo.component';

describe('BinaryParserDemoComponent', () => {
  let component: BinaryParserDemoComponent;
  let fixture: ComponentFixture<BinaryParserDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryParserDemoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryParserDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
