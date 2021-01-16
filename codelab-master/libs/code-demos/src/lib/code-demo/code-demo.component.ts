import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  filter,
  map,
  publishReplay,
  refCount,
  startWith
} from 'rxjs/operators';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject
} from 'rxjs';
import { compileTsFilesWatch } from '../runner/compile-ts-files';
import { Code } from '../shared/types';

function filterByFileType(type: string, files: Record<string, string>) {
  return Object.entries(files).reduce((changedFiles, [path, code]) => {
    if (path.match(new RegExp(`\\\.${type}$`))) {
      changedFiles[path] = code;
    }
    return changedFiles;
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
  selector: 'code-demo',
  templateUrl: 'code-demo.component.html',
  styleUrls: ['./code-demo.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeDemoComponent),
      multi: true
    }
  ]
})
export class CodeDemoComponent implements ControlValueAccessor, OnDestroy {
  @Input() bootstrapTest;
  @Input() milestone = '';
  @Input() url = 'about:blank';
  @Input() translations = {};
  @Input() codeDemoHighlight = [];
  @Input() testRunner: 'babel' | 'iframe' = 'iframe';
  @Input() files: string[];
  @Input() presets = ['angular'];
  @Input() bootstrap = 'bootstrap';
  @Input() solutions: Code = {};
  @Input() highlights: Record<string, string | RegExp> = {};
  @Input() allowSwitchingFiles = true;
  @Input() enableAutoFolding = true;
  @Input() fontSize = '18';

  openFileIndex = 0;
  code: Code = {};
  filesConfig: any;
  changedTsFilesSubject = new BehaviorSubject<Record<string, string>>({});
  changedStaticFilesSubject = new ReplaySubject<Record<string, string>>(1);

  public files$: Observable<Record<string, string>>;

  private codeCache: Record<string, string> = {};
  private onChange: (code: Code) => void;

  constructor() {
    const ts = this.changedTsFilesSubject.pipe(
      map(files =>
        Object.entries(files).reduce((result, [file, code]) => {
          result[file] = this.retrieveFile(file, code);
          return result;
        }, {})
      ),
      filter(value => Object.keys(value).length > 0),
      compileTsFilesWatch(),
      map(a => a.files),
      startWith({})
    );

    const staticFiles = this.changedStaticFilesSubject.pipe(
      filter(value => Object.keys(value).length > 0),
      startWith({})
    );

    this.files$ = combineLatest([ts, staticFiles]).pipe(
      map(([js, staticFiles]) => ({ ...staticFiles, ...js })),
      map(files => ({ ...this.code, ...files })),
      filter(value => Object.keys(value).length > 0),
      publishReplay(1),
      refCount()
    );
  }

  retrieveFile(file, code) {
    return code;
  }

  registerOnTouched() {}

  ngOnDestroy() {
    this.changedTsFilesSubject.complete();
    this.changedStaticFilesSubject.complete();
  }

  registerOnChange(onChange: (code: Code) => void) {
    this.onChange = onChange;
  }

  writeValue(code: Record<string, string>) {
    if (code) {
      this.code = code;
      this.files = this.files || [Object.keys(this.code)[0]];
      this.update(code);
    }
  }

  update(code: Record<string, string>) {
    if (this.onChange) {
      this.onChange(code);
    }
    const changesTs = getChanges(
      filterByFileType('ts', code),
      filterByFileType('ts', this.codeCache)
    );
    const changesStatic = getChanges(
      filterByFileType('html|css', code),
      filterByFileType('html|css', this.codeCache)
    );

    this.codeCache = { ...code };
    this.changedTsFilesSubject.next(changesTs);
    this.changedStaticFilesSubject.next(changesStatic);
  }
}
