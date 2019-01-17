import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePathComponent } from './file-path.component';

describe('FilePathComponent', () => {
  let component: FilePathComponent;
  let fixture: ComponentFixture<FilePathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilePathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
