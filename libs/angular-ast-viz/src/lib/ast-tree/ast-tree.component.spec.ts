import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AstTreeComponent } from './ast-tree.component';

describe('AstTreeComponent', () => {
  let component: AstTreeComponent;
  let fixture: ComponentFixture<AstTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AstTreeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
