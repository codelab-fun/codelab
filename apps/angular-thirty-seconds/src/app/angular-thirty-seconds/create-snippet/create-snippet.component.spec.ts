import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnippetComponent } from './create-snippet.component';

describe('CreateSnippetComponent', () => {
  let component: CreateSnippetComponent;
  let fixture: ComponentFixture<CreateSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
