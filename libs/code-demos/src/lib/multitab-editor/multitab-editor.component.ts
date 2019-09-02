import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { editor } from 'monaco-editor';
import { Subject, Subscription, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MonacoConfigService } from '../shared/monaco-config.service';
import ITextModel = editor.ITextModel;
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import { FileFolderNode } from './file-tree/file-tree.utils';


declare const monaco;
const extenstionToLang = {
  ts: 'typescript',
  js: 'javascript',
  html: 'html'
};

interface MonacoModel {
  model: ITextModel;
  path: string;
  editorIndex?: number;
  highlight: RegExp;
}

type Code = Record<string, string>;

@Component({
  selector: 'code-demo-multitab-editor',
  templateUrl: './multitab-editor.component.html',
  styleUrls: [
    './multitab-editor.component.scss',
    './file-tree/icons/icons.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultitabEditorComponent),
      multi: true
    }
  ]
})
export class MultitabEditorComponent implements OnDestroy, ControlValueAccessor {

  @Input() code: Code = {};
  @Input() solutions: Code = {};
  @Input() allowSwitchingFiles = true;
  @Input() displayFileName = false;
  @Input() highlights = {};
  @Input() debounce = 250;
  files = [];
  openModels: MonacoModel[] = [];
  changeSubject = new Subject();

  hideFileNavigationContent = true;
  activeTabIndex = 0;

  private onChange: any;
  private editor: IStandaloneCodeEditor;
  private models: MonacoModel[];
  private subscription: Subscription;

  constructor(
    readonly monacoConfigService: MonacoConfigService,
    readonly cdr: ChangeDetectorRef
  ) {
    this.subscription = this.changeSubject
      .pipe(debounceTime(this.debounce))
      .subscribe(changes => {
        if (this.onChange) {
          this.onChange(changes);
        }
      });
  }

  @Input('files') set setFiles(files: string | string[]) {
    if (typeof files === 'string') {
      files = files.split(',');
    }
    this.files = files;
    this.updateOpenModels();
  }

  get treeFileNames() {
    return Object.keys(this.code);
  }

  retrieveFileNameFromPath(path: string) {
    return path.split('/').pop();
  }

  toggleNav() {
    this.hideFileNavigationContent = !this.hideFileNavigationContent;
  }

  shouldShowSolution(model: FileFolderNode|MonacoModel) {
    return this.solutions[model.path] && this.solutions[model.path] != this.code[model.path]
  }

  updateActiveFileSelected(file: string) {
    const alreadyShownInTab = this.openModels.findIndex(v => v.path === file);

    if (alreadyShownInTab < 0) {
      const monacoModel = this.models.find(m => m.path === file);
      this.openModels = [...this.openModels, monacoModel];
      this.activeTabIndex = this.openModels.length - 1;
    } else {
      this.activeTabIndex = alreadyShownInTab;
    }

    // this is needed for any outside access to this method
    // like CodelabExerciseComponent for the test files to become visible
    this.cdr.markForCheck();
  }

  removeActiveNode(model: FileFolderNode|MonacoModel, event: Event) {
    event.stopPropagation();

    const index = this.openModels.findIndex(m => m.path === model.path);
    this.openModels = this.openModels.filter(m => m.path !== model.path);

    const isRemovingLeft = index < this.activeTabIndex;
    const isRemovingLastItem = this.activeTabIndex > this.openModels.length -1;

    if (isRemovingLeft || isRemovingLastItem) {
      this.activeTabIndex--;
    }

    if(this.openModels.length === 0) {
      this.activeTabIndex = 0;
    }
  }

  handleFileChange(index, { value }) {
    if (this.models) {
      const m = this.getModelByFileName(value.path);
      m.model.setValue(m.model.getValue());
      delete this.openModels[index].editorIndex;
      m.editorIndex = index;
      this.openModels[index] = m;
      this.openModels = [...this.openModels];
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  loadSolution(file: string) {
    this.getModelByFileName(file).model.setValue(this.solutions[file]);
  }

  getModelByFileName(file): MonacoModel | undefined {
    if (this.models) {
      return this.models.find(({ path }) => path === file);
    }
  }

  generateModels() {
    const textModels = Object.entries(this.code).filter(
      ([path, code]) => typeof code === 'string'
    );

    this.models = textModels.map(([path, code]) => {
      const monacoModel = this.getModelByFileName(path);

      if (monacoModel) {
        return monacoModel;
      } else {
        const language = extenstionToLang[path.match(/\.(\w+)$/)[1]];
        const model = this.monacoConfigService.monaco.editor.createModel(
          code,
          language,
          'file:///' + path
        );

        model.onDidChangeContent(() => {
          this.code[path] = model.getValue();
          this.changeSubject.next({ ...this.code });
        });

        return {
          highlight: this.highlights[path],
          path,
          model
        };
      }
    });

    if (!this.files) {
      this.files = [Object.keys(this.code)[0]];
    }

    this.updateOpenModels();
  }

  writeValue(code: Code): void {
    if (code) {
      this.code = { ...code };
      this.generateModels();
    }
  }

  ngOnDestroy() {
    this.dispose();
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  trackByEditorIndex(index, model) {
    return model.editorIndex;
  }

  private updateOpenModels() {
    if (this.models) {
      this.openModels = this.files.map((file, index) => {
        const model = this.getModelByFileName(file);
        model.editorIndex = index;
        return model;
      });
      this.cdr.markForCheck();
    }
  }

  private dispose() {
    if (this.models) {
      this.models.forEach(model => {
        model.model.dispose();
      });
      this.models = null;
    }

    if (this.editor) {
      this.editor.dispose();
      this.editor = null;
    }
  }
}
