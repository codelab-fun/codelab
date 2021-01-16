import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlPostComponent } from './html-post.component';

describe('HtmlPostComponent', () => {
  let component: HtmlPostComponent;
  let fixture: ComponentFixture<HtmlPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlPostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
