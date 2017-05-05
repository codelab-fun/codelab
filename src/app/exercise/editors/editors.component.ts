import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';

@Component({
  selector: 'slides-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})
export class EditorsComponent implements OnInit {
  @Input() public files: Array<any>;
  @Input() public currentFile;
  @Output() public onChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onToggle: EventEmitter<any> = new EventEmitter<FileConfig>();
  @Output() public onCurrentFile: EventEmitter<any> = new EventEmitter<FileConfig>();
  @Output() public onLoadSolution: EventEmitter<any> = new EventEmitter<FileConfig>();
  private debug: boolean;

  constructor() {
    // TODO
    this.debug = true;
  }

  onCodeChange(change) {
    this.onChanges.emit(change);
  }

  ngOnInit(): void {
    this.showFile(this.visibleFiles[0]);
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
    return file.path === this.currentFile.path;
  }

  showFile(file): void {
    this.currentFile = file;
    this.onCurrentFile.emit(file);
  }

  trackFile(index, file) {
    return file.path;
  }

  loadSolution(file: FileConfig): void {
    this.onLoadSolution.next(file);
  }
}
