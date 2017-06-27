import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileConfig } from '../../interfaces/file-config';
import { TestInfo } from '../../interfaces/test-info';

function getFileName(file: FileConfig) {
  return file.path.split('/').pop();
}

@Component({
  selector: 'slides-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent {
  @Input() tests: Array<TestInfo>;
  @Input() files: Array<FileConfig>;
  @Output()
  public onSelectFile: EventEmitter<FileConfig> = new EventEmitter<FileConfig>();

  seeAll = false;

  constructor(private sanitizer: DomSanitizer) {
  };

  trackTest(index, test: TestInfo) {
    return test.title;
  }

  getTestFile(test: TestInfo): FileConfig {
    return this.files.find(file => test.title.includes(getFileName(file)));
  }

  getTitle(test: TestInfo) {
    const file = this.getTestFile(test);
    return file ? test.title.replace(getFileName(file), '') : test.title;
  }

  isFirstUnsolved(test) {
    return this.tests.find(t => !t.pass) === test;
  }

  indexOfFirstUnsolved() {
    return this.tests.findIndex(t => !t.pass);
  }

  toggleSeeAll(event) {
    this.seeAll = !this.seeAll;
    event.preventDefault();
  }
}
