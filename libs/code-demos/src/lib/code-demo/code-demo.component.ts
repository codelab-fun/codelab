import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  filter,
  map,
  publishReplay,
  refCount,
  startWith,
  takeWhile,
} from 'rxjs/operators';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { compileTsFilesWatch } from '../runner/compile-ts-files';
import { Code } from '../shared/types';

function filterByFileType(
  type: string,
  files: Record<string, string>
): Record<string, string> {
  return Object.entries(files)
    .filter(([path]) => path.endsWith(type))
    .reduce((changedFiles, [path, code]) => {
      changedFiles[path] = code;
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
      multi: true,
    },
  ],
})
export class CodeDemoComponent implements ControlValueAccessor, OnDestroy {
  @Input() bootstrapTest;
  @Input() milestone = '';
  @Input() url = 'about:blank';
  @Input() ui = 'browser';
  @Input() translations = {};
  @Input() codeDemoHighlight = [];
  @Input() testRunner: 'babel' | 'iframe' = 'iframe';
  @Input() files: string[];
  @Input() presets = ['angular'];
  @Input() bootstrap = 'bootstrap';
  @Input() displayFileName = false;
  @Input() solutions: Code = {};
  @Input() highlights: Record<string, string | RegExp> = {};
  @Input() allowSwitchingFiles = true;
  @Input() enableAutoFolding = true;
  @Input() fontSize = '18';
  @Input() showPreview = true;

  openFileIndex = 0;
  code?: Code;
  filesConfig: any;
  changedTsFilesSubject = new BehaviorSubject<Record<string, string>>({});
  changedStaticFilesSubject = new ReplaySubject<Record<string, string>>(1);

  public files$: Observable<Record<string, string>>;

  private codeCache: Record<string, string> = {};
  private onChange: (code: Code) => void;

  constructor(protected readonly cdr: ChangeDetectorRef) {
    const ts = this.changedTsFilesSubject.pipe(
      map((files) =>
        Object.entries(files).reduce((result, [file, code]) => {
          result[file] = this.retrieveFile(file, code);
          return result;
        }, {})
      ),
      filter((value) => Object.keys(value).length > 0),
      compileTsFilesWatch(),
      map((a) => a.files),
      startWith({})
    );

    const staticFiles = this.changedStaticFilesSubject.pipe(
      filter((value) => Object.keys(value).length > 0),
      startWith({})
    );

    this.files$ = combineLatest([ts, staticFiles]).pipe(
      takeWhile(() => this.showPreview),
      map(([js, staticFiles]) => ({ ...staticFiles, ...js })),
      map((files) => ({ ...this.code, ...files })),
      filter((value) => Object.keys(value).length > 0),
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
    // TODO: This is a hack to prevent copied objects
    if (JSON.stringify(code) === JSON.stringify(this.code)) {
      return;
    }

    if (code) {
      this.code = code;
      this.files = this.files || [Object.keys(this.code)[0]];
      this.update(code);
      this.cdr.markForCheck();
    }
  }

  update(code: Record<string, string>) {
    if (this.onChange) {
      this.onChange(code);
    }

    if (this.showPreview === false) {
      return;
    }

    const changesTs = getChanges(
      filterByFileType('ts', code),
      filterByFileType('ts', this.codeCache)
    );

    const changesStatic = getChanges(
      {
        ...filterByFileType('html', code),
        ...filterByFileType('css', code),
      },
      {
        ...filterByFileType('html', this.codeCache),
        ...filterByFileType('css', this.codeCache),
      }
    );

    this.codeCache = { ...code };

    this.changedTsFilesSubject.next(changesTs);
    this.changedStaticFilesSubject.next(changesStatic);
  }
}
