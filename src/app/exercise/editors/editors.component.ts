import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileConfig} from '../interfaces/file-config';


@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.css']
})
export class EditorsComponent {
  @Input() public files: Array<any>;
  @Output() public onChanges: EventEmitter<any> = new EventEmitter<any>();
  private debug: boolean;

  get visibleFiles() {
    return this.files.filter(file => !file.hidden);
  }

  onCodeChange(change) {
    this.onChanges.emit(change);
  }

  constructor() {
    // TODO
    this.debug = true;
  }

  toggleFile(file: FileConfig) {
    // TODO
  }

  loadSolution(file: FileConfig) {
    file.code = file.solution;
  }
}
