import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileConfig} from '../interfaces/file-config';

@Component({
  selector: 'app-file-structure',
  templateUrl: './file-structure.component.html',
  styleUrls: ['./file-structure.component.css']
})
export class FileStructureComponent implements OnInit {
  showFileTree = true;
  @Input() files: Array<FileConfig>;
  @Input() currentFile: FileConfig;
  @Output() onSelectFile = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }


  toggleTree(): void {
    this.showFileTree = !this.showFileTree;
  }

}
