import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetDemoComponent } from './snippet-demo.component';

describe('SnippetDemoComponent', () => {
  let component: SnippetDemoComponent;
  let fixture: ComponentFixture<SnippetDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
