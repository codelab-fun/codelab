import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { convertExerciseToMap } from '../../../../../../../ng2ts/ng2ts';
import { compileTsFilesWatch } from '../../../../../../../libs/code-demos/src/lib/runner/compile-ts-files';
import { filter, map, publishReplay, refCount, startWith, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

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
  selector: 'slides-codelab-exercise',
  templateUrl: 'exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodelabExerciseComponent),
      multi: true
    }
  ]
})
export class CodelabExerciseComponent {
  @Input() bootstrapTest;
  @Input() milestone = '';
  @Input() url = '';
  @Input() translations = {};
  @Input() slidesSimpleHighlightMatch = [];
  @Input() testRunner: 'babel' | 'iframe' = 'iframe';

  code: any = {};
  solutions = {};
  filesConfig: any;
  changedTsFilesSubject = new BehaviorSubject<Record<string, string>>({});
  changedStaticFilesSubject = new ReplaySubject<Record<string, string>>(1);
  public bootstrap: string;
  public file: string;
  public files$: Observable<Record<string, string>>;
  private codeCache: Record<string, string> = {};

  constructor() {
    const ts = this.changedTsFilesSubject.pipe(
      map(files =>
        Object.entries(files).reduce((result, [file, code]) => {
          const f = this.filesConfig.files.find(f => f.path === file);
          result[file] = (f.before || '') + code + (f.after || '');
          return result;
        }, {})
      ),
      filter(value => Object.keys(value).length > 0),
      compileTsFilesWatch()
    );

    const staticFiles = this.changedStaticFilesSubject.pipe(
      filter(value => Object.keys(value).length > 0),
      tap(a => console.log(a)),
      startWith({})
    );

    this.files$ = combineLatest(ts, staticFiles).pipe(
      map(([js, staticFiles]) => ({...staticFiles, ...js})),
      map(files => ({...this.code, ...files})),
      publishReplay(1),
      refCount()
    );
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
  }

  update(code: Record<string, string>) {
    const changesTs = getChanges(
      filterByFileType('ts', code),
      filterByFileType('ts', this.codeCache)
    );
    const changesStatic = getChanges(
      filterByFileType('html|css', code),
      filterByFileType('html|css', this.codeCache)
    );
    this.codeCache = {...code};
    this.changedTsFilesSubject.next(changesTs);
    this.changedStaticFilesSubject.next(changesStatic);
  }
}
