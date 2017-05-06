import {
  Component,
  EventEmitter,
  Input,
  Output
  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FileConfig } from './../interfaces/file-config';
import { TestInfo } from '../interfaces/test-info';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent {
  private static fileRegex = `/[^\\]*\.(\w+)$/`;

  @Input() tests: Array<TestInfo>;
  @Input() files: Array<FileConfig>;
  @Output()
  public onCurrentFile: EventEmitter<FileConfig> = new EventEmitter<FileConfig>();

  constructor(
    private sanitizer: DomSanitizer) { };

  click(test: TestInfo): void {
    const match = this.testToFileConfig(test);
    if (!!match) {
      this.onCurrentFile.emit(match);
    }
  }

  getTitle(test: TestInfo): SafeHtml {
    let title: string = test.title;
    this.files.forEach(f => {
      const file = f.path.split('/').splice(-1)[0];
      // Replace instance of filename with link.  Inline styles here due to the nature of
      // injecting html.  Needs pointer-events:none or click will no propagate.
      title = title.replace(new RegExp(file, 'ig'),
        `<span style="text-decoration:underline;cursor: pointer;pointer-events:none">${file}</span>`);
    });

    return this.sanitizer.bypassSecurityTrustHtml(title);
  }

  isFirstUnsolved(test) {
    return this.tests.find(t => !t.pass) === test;
  }

  private testToFileConfig(test: TestInfo): FileConfig {
    const match: FileConfig = this.files.find(f => {
      // Get only filename
      const file = f.path.split('/').splice(-1)[0];
      // If file is contained in title, consider it a match
      return new RegExp(file, 'ig').test(test.title);
    });
    return match;
  }
}
