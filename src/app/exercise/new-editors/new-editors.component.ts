import { Component, OnInit } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';
import { NewExerciseComponent } from '../new-exercise/new-exercise.component';

@Component({
  selector: 'slides-new-editors',
  templateUrl: './new-editors.component.html',
  styleUrls: ['./new-editors.component.css']
})
export class NewEditorsComponent implements OnInit {
  files: any;
  private currentFile: FileConfig;


  ngOnInit(): void {
    this.files = this.parent.files;
  }

  constructor(public parent: NewExerciseComponent) {

  }

  onSelectFile(fileConfig: FileConfig): void {
    this.currentFile = fileConfig;
  }

  onCodeChanges(change) {
    this.parent.updateFiles(files => files.map(file => file === change.file ? {
      ...file, code: change.code
    } : file));
  }

  loadSolution(change) {
    this.parent.updateFiles(files => this.files = files.map(file => file === change.file ? {
      ...file, code: file.solution
    } : file));
  }
}
