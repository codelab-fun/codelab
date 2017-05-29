import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FileConfig} from '../interfaces/file-config';
import {TestInfo} from '../interfaces/test-info';

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
  @Input() descriptions: string[];
  @Output()
  public onSelectFile: EventEmitter<FileConfig> = new EventEmitter<FileConfig>();

  constructor(private sanitizer: DomSanitizer) {
  };

  trackTest(index, test: TestInfo) {
    return test.title;
  }

  getFilePath(test: TestInfo) {
    const file = this.getTestFile(test);
    return file ? file.path : null;
  }

  getTestFile(test: TestInfo): FileConfig {
    return this.files.find(file => test.title.includes(getFileName(file)));
  }

  getTitle(test: TestInfo, i: number) {
    const title = this.descriptions[i];
    const file = this.getTestFile(test);
    return file ? title.replace(getFileName(file), '') : title;
  }

  isFirstUnsolved(test) {
    return this.tests.find(t => !t.pass) === test;
  }
}
