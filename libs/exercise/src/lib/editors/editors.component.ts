import {
  ChangeDetectionStrategy,
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
  styleUrls: ['./editors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorsComponent implements OnInit {
  @Input() public files: Array<any>;
  @Input() public currentFile;
  @Input() public fontSize = 16;
  @Output() public onChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onToggle: EventEmitter<any> = new EventEmitter<FileConfig>();
  @Output() public selectFile: EventEmitter<any> = new EventEmitter<
    FileConfig
  >();
  @Output() public loadSolution: EventEmitter<any> = new EventEmitter<
    FileConfig
  >();
  private debug: boolean;

  constructor() {
    // TODO
    this.debug = true;
  }

  get visibleFiles() {
    return this.files.filter(file => !file.hidden);
  }

  ngOnInit() {
    this.files.map(file => {
      file.opened = !file.readonly;
    });
  }

  closeTab(file) {
    file.opened = false;

    if (file === this.currentFile) {
      this.showFile(
        this.visibleFiles
          .concat()
          .reverse()
          .find(f => f.opened)
      );
    }
  }

  isTabVisible(file) {
    return file.opened !== false;
  }

  onCodeChange(change) {
    this.onChanges.emit(change);
  }

  getFileName(file) {
    return file.path.replace(/^.*[\\\/]/, '');
  }

  getOpenedFile() {
    return this.currentFile;
  }

  isActiveFile(file) {
    return file.path === this.currentFile.path;
  }

  showFile(file): void {
    this.currentFile = file;
    this.selectFile.emit(file);
  }

  trackFile(index, file) {
    return file.path;
  }
}
