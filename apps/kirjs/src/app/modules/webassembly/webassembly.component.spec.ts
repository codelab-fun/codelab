import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebassemblyComponent } from './webassembly.component';

// TODO this is broken due to monaco for some reason
describe.skip('WebassemblyComponent', () => {
  let component: WebassemblyComponent;
  let fixture: ComponentFixture<WebassemblyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebassemblyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebassemblyComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
