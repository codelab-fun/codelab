import { Component, Input, OnInit } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';
import { ExerciseComponent } from '../exercise/exercise.component';

@Component({
  selector: 'slides-new-editors',
  templateUrl: './new-editors.component.html',
  styleUrls: ['./new-editors.component.css']
})
export class NewEditorsComponent implements OnInit {
  files: any;
  @Input() fontSize = 16;
  private currentFile: FileConfig;


  ngOnInit(): void {
    this.files = this.parent.files;
  }

  constructor(public parent: ExerciseComponent) {

  }

  onSelectFile(fileConfig: FileConfig): void {
    this.parent.currentFile = fileConfig;
  }

  onCodeChanges(change) {
    this.parent.updateFiles(files => files.map(file => file.path === change.file.path ? {
      ...file, code: change.code
    } : file));
  }

  loadSolution(changedFile) {
    this.parent.updateFiles(files => this.files = files.map(file => file.path === changedFile.path ? {
      ...file, code: file.solution
    } : file));
  }


}
