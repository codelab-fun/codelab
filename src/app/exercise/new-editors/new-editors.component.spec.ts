import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditorsComponent } from './new-editors.component';

describe('NewEditorsComponent', () => {
  let component: NewEditorsComponent;
  let fixture: ComponentFixture<NewEditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
