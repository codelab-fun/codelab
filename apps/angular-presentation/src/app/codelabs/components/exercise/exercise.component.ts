import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { convertExerciseToMap } from '../../../../../../../ng2ts/ng2ts';
import { compileTsFilesWatch } from '../../../../../../../libs/code-demos/src/lib/runner/compile-ts-files';
import { filter, map, publishReplay, refCount, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

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
      result[file.path] = file.solution;
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
  selector: 'slides-codelab-exercise',
  templateUrl: 'exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodelabExerciseComponent),
      multi: true
    }
  ],
})
export class CodelabExerciseComponent {
  @Input() bootstrapTest;
  @Input() milestone = '';
  @Input() url = '';
  @Input() translations = {};
  @Input() slidesSimpleHighlightMatch = [];
  code: any = {};
  solutions = {};
  filesConfig: any;
  changedTsFilesSubject = new BehaviorSubject<Record<string, string>>({});
  changedHtmlFilesSubject = new BehaviorSubject<Record<string, string>>({});
  private file: string;
  private bootstrap: string;
  private runFilesMap: any;
  private files: string[];
  private files$: Observable<Record<string, string>>;
  private codeCache: Record<string, string> = {};

  constructor() {
    this.files$ = combineLatest(this.changedTsFilesSubject.pipe(
      map(files =>
        Object.entries(files).reduce((result, [file, code]) => {
          const f = this.filesConfig.files.find(f => f.path === file);
          result[file] = (f.before || '') + code + (f.after || '');
          return result;
        }, {})
      ),
      filter(value => Object.keys(value).length > 0),
      compileTsFilesWatch()),
      this.changedHtmlFilesSubject.pipe(filter(value => Object.keys(value).length > 0))).pipe(
      map(([html, js]) => ({...html, ...js})),
      tap(a => {
        console.log('HI', a)
      }),
      map((files) => ({...this.code, ...files})),
      publishReplay(1),
      refCount()
    )
    ;
  }

  @Input() set exercise(exercise) {
    const map = convertExerciseToMap(exercise);
    this.bootstrap = map.bootstrap;
    this.bootstrapTest = map.bootstrapTest;
    this.file = exercise.files[0].path;
    this.filesConfig = exercise;
    this.solutions = extractSolutions(this.filesConfig.files);
    this.code = map.code;
    this.update(map.code);
  };

  update(code: Record<string, string>) {
    const changesTs = getChanges(filterByFileType('ts', code), filterByFileType('ts', this.codeCache));
    const changesHtml = getChanges(filterByFileType('html', code), filterByFileType('html', this.codeCache));
    this.codeCache = {...code};
    this.changedTsFilesSubject.next(changesTs);
    this.changedHtmlFilesSubject.next(changesHtml);
  }

}

