import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTagRendererComponent } from './dynamic-tag-renderer.component';

describe('DynamicTagRendererComponent', () => {
  let component: DynamicTagRendererComponent;
  let fixture: ComponentFixture<DynamicTagRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicTagRendererComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTagRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
