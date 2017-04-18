import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileConfig} from '../interfaces/file-config';


@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})
export class EditorsComponent {
  @Input() public files: Array<any>;
  @Output() public onChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onToggle: EventEmitter<any> = new EventEmitter<FileConfig>();
  @Output() public onLoadSolution: EventEmitter<any> = new EventEmitter<FileConfig>();
  private debug: boolean;
  private currentFile;

  constructor() {
    // TODO
    this.debug = true;
  }

  onCodeChange(change) {
    this.onChanges.emit(change);
  }

  ngOnInit() {
    this.currentFile = this.visibleFiles[0]
  }

  get visibleFiles() {
    return this.files.filter(file => !file.hidden);
  }

  getFileName(file) {
    return file.path.replace(/^.*[\\\/]/, '');
  }

  getOpenedFile() {
    return this.currentFile;
  }

  isOpenFile(file) {
    if (!file || !this.currentFile) { return; }
    return file.path == this.currentFile.path;
  }

  showFile(file) {
    this.currentFile = file;
  }

  trackFile(index, file) {
    return file.path;
  }

  loadSolution(file: FileConfig) {
    this.onLoadSolution.next(file);
  }
}
