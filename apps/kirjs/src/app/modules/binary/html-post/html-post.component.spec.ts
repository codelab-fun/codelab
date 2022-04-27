import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HtmlPostComponent } from './html-post.component';

describe('HtmlPostComponent', () => {
  let component: HtmlPostComponent;
  let fixture: ComponentFixture<HtmlPostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlPostComponent],
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
