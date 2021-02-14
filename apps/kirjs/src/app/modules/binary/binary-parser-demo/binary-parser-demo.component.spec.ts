import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BinaryParserDemoComponent } from './binary-parser-demo.component';

describe('BinaryParserDemoComponent', () => {
  let component: BinaryParserDemoComponent;
  let fixture: ComponentFixture<BinaryParserDemoComponent>;

  beforeEach(waitForAsync(() => {
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
