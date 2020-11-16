import { Component, EventEmitter, Input, Output } from '@angular/core';

function getTestFile(test: string): string | null {
  const match = test.trim().match(/^([\w.\/]+):/);
  return match && match[1];
}

function getTitle(test: string) {
  const file = getTestFile(test);
  return file ? test.replace(file + ':', '') : test;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-file-aware-description',
  templateUrl: './file-aware-description.component.html',
  styleUrls: ['./file-aware-description.component.css']
})
export class FileAwareDescriptionComponent {
  file: string;
  title: string;

  @Output() selectFile = new EventEmitter<string>();

  @Input() set test(test: string) {
    this.file = getTestFile(test);
    this.title = getTitle(test);
  }
}
