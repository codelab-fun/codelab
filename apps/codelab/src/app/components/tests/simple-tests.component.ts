import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestInfo } from '../../shared/interfaces/test-info';


function getFileName(file: string) {
  return file.split('/').pop();
}

@Component({
  selector: 'codelab-simple-tests',
  templateUrl: './simple-tests.component.html',
  styleUrls: ['./simple-tests.component.css']
})
export class SimpleTestsComponent implements OnInit {
  @Input() code: any;
  @Input() translations: { [key: string]: string } = {};
  @Output()
  public selectFile: EventEmitter<string> = new EventEmitter<string>();
  seeAll = false;
  tests: Array<TestInfo>;

  constructor() {
  }

  @Input('tests') set testsSetter(tests: Array<TestInfo>) {
    this.tests = (tests || []).map(test => ({
      ...test,
      filename: this.getTestFile(test),
      title: this.getTitle(test),
      isFirstUnresolved: this.isFirstUnsolved(test, tests)
    }));
  }

  ngOnInit(): void {
    this.translations = this.translations || {};
  }

  hasTests() {
    return this.tests && this.tests.length > 0;
  }

  hasMoreThanOneTest() {
    return this.tests && this.tests.length > 1;
  }

  getTranslation(title) {
    return this.translations[title.replace('@@', '')] || title;
  }

  trackTest(index, test: TestInfo) {
    return test.title;
  }

  getTestFile(test: TestInfo): string {
    return Object.keys(this.code).find(file =>
      this.getTranslation(test.title).includes(getFileName(file))
    );
  }

  getTitle(test: TestInfo) {
    const file = this.getTestFile(test);
    const title = this.getTranslation(test.title);
    return file ? title.replace(getFileName(file), '') : title;
  }

  isFirstUnsolved(test, tests) {
    return tests.find(t => !t.pass) === test;
  }

  toggleSeeAll(event) {
    this.seeAll = !this.seeAll;
    event.preventDefault();
  }
}
