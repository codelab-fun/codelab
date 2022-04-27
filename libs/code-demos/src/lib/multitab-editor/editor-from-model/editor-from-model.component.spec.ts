import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditorFromModelComponent } from './editor-from-model.component';

describe('EditorFromModelComponent', () => {
  let component: EditorFromModelComponent;
  let fixture: ComponentFixture<EditorFromModelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditorFromModelComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFromModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
