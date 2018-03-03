import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class TestsComponent implements OnInit {
  @Input() tests: Array<TestInfo>;
  @Input() files: Array<FileConfig>;
  @Input() translations: { [key: string]: string } = {};
  @Output() public onSelectFile: EventEmitter<FileConfig> = new EventEmitter<FileConfig>();

  seeAll = false;

  ngOnInit(): void {
    this.translations = this.translations || {};
  }

  hasTests() {
    return this.tests && this.tests.length > 0;
  }

  constructor(private sanitizer: DomSanitizer) {}

  getTranslation(title) {
    return this.translations[title.replace('@@', '')] || title;
  }

  trackTest(index, test: TestInfo) {
    return test.title;
  }

  getTestFile(test: TestInfo): FileConfig {
    return this.files.find(file => test.title.includes(getFileName(file)));
  }

  getTitle(test: TestInfo) {
    const file = this.getTestFile(test);
    const title = this.getTranslation(test.title);
    return file ? title.replace(getFileName(file), '') : title;
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
