import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'code-demo-file-path',
  templateUrl: './file-path.component.html',
  styleUrls: ['./file-path.component.css']
})
export class FilePathComponent implements OnInit {
  path: string;
  extension: string;

  constructor() {}

  @Input('path') set pathSetter(path: string) {
    this.path = path;
    const match = this.path.match(/.(\w+)$/);
    this.extension = (match && match[1]) || 'unknown';
  }

  ngOnInit() {}
}
