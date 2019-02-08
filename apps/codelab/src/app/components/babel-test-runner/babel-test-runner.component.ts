import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { TestInfo } from '../../shared/interfaces/test-info';
import { FileConfig } from '../../shared/interfaces/file-config';


declare const require;

@Component({
  selector: 'codelab-babel-test-runner',
  templateUrl: './babel-test-runner.component.html',
  styleUrls: ['./babel-test-runner.component.css']
})
export class BabelTestRunnerComponent implements AfterViewInit, OnChanges {
  @Input() bootstrap: string;
  tests: Array<TestInfo> = [];
  @Input() translations: { [key: string]: string } = {};
  @Input() code: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code) {
      this.run(this.code);
    }
  }

  run(files: any) {
    const test = files[this.bootstrap + '.ts.execute'];
    try {
      this.tests = test(files);
    } catch (e) {
      this.tests.find(t => !t.pass).result = '[Parsing error]' + e;
    }
  }

  selectFile(file: FileConfig) {
    // this.parent.currentFile = file;
  }

  ngAfterViewInit(): void {
    // this.parent.files$.subscribe(files => requestAnimationFrame(() => this.run(files)));
  }
}
