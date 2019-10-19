import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'code-demo-file-path',
  templateUrl: './file-path.component.html',
  styleUrls: ['./file-path.component.css']
})
export class FilePathComponent implements OnChanges {
  @Input('path') pathSetter: string;

  path: string;
  extension: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('path' in changes) {
      this.path = this.pathSetter;
      const match = this.path.match(/.(\w+)$/);
      this.extension = (match && match[1]) || 'unknown';
    }
  }
}
