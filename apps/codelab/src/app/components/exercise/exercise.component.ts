import { Component, Input, ViewChild } from '@angular/core';
import { convertExerciseToMap } from '../../../../../../ng2ts/ng2ts';
import { CodeDemoComponent } from '@codelab/code-demos/src/lib/code-demo/code-demo.component';
import { Subject } from 'rxjs';
import { MultitabEditorComponent } from '@codelab/code-demos/src/lib/multitab-editor/multitab-editor.component';

function filterByFileType(type: string, files: Record<string, string>) {
  return Object.entries(files).reduce((changedFiles, [path, code]) => {
    if (path.match(new RegExp(`\\\.${type}$`))) {
      changedFiles[path] = code;
    }
    return changedFiles;
  }, {});
}

export function extractSolutions(files: any[]) {
  return files.reduce((result, file) => {
    if (file.solution) {
      result[file.path] = file.solution || file.template;
    }

    return result;
  }, {});
}

export function getChanges(current, previous) {
  return Object.keys(current).reduce((changedFiles, path) => {
    if (current[path] !== previous[path]) {
      changedFiles[path] = current[path];
    }
    return changedFiles;
  }, {});
}

@Component({
  selector: 'codelab-exercise',
  templateUrl: 'exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class CodelabExerciseComponent extends CodeDemoComponent {

  @ViewChild(MultitabEditorComponent, {static: false}) editorComponent: MultitabEditorComponent;

  @Input() set exercise(exercise) {
    const map = convertExerciseToMap(exercise);

    if (!this.highlights) {
      this.highlights = map.highlights;
    }
    this.bootstrap = map.bootstrap;
    this.bootstrapTest = map.bootstrapTest;
    if (!this.files) {
      this.files = [exercise.files[this.openFileIndex].path];
    }
    this.filesConfig = exercise;
    this.solutions = extractSolutions(this.filesConfig.files);
    this.code = map.code;
    this.update(map.code);
  }

  retrieveFile(file, code) {
    const f = this.filesConfig.files.find(f => f.path === file);
    return (f.before || '') + code + (f.after || '');
  }

  onTestFileSelected(file: string) {
    this.editorComponent.updateActiveFileSelected(file);
  }
}
