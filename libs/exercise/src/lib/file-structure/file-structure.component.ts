import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';

@Component({
  selector: 'slides-file-structure',
  templateUrl: './file-structure.component.html',
  styleUrls: ['./file-structure.component.css']
})
export class FileStructureComponent implements OnInit {
  showFileTree = false;
  @Input() files: Array<FileConfig>;
  @Input() currentFile: FileConfig;
  @Output() selectFile = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  toggleTree(): void {
    this.showFileTree = !this.showFileTree;
  }
}
