import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileAwareDescriptionComponent } from './file-aware-description.component';

describe('FileAwareDescriptionComponent', () => {
  let component: FileAwareDescriptionComponent;
  let fixture: ComponentFixture<FileAwareDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FileAwareDescriptionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAwareDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
