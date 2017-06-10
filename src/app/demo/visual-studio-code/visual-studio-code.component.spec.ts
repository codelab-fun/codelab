import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualStudioCodeComponent } from './visual-studio-code.component';

xdescribe('VisualStudioCodeComponent', () => {
  let component: VisualStudioCodeComponent;
  let fixture: ComponentFixture<VisualStudioCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisualStudioCodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualStudioCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
