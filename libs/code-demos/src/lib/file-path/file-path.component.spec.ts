import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FilePathComponent } from './file-path.component';
describe('FilePathComponent', () => {
  let component: FilePathComponent;
  let fixture: ComponentFixture<FilePathComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FilePathComponent]
    });
    fixture = TestBed.createComponent(FilePathComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
