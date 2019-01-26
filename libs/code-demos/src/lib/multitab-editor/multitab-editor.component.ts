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
import { MonacoConfigService } from '../../../../exercise/src/lib/services/monaco-config.service';
import ITextModel = editor.ITextModel;
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

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
  styleUrls: ['./multitab-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultitabEditorComponent),
      multi: true
    }
  ]
})
export class MultitabEditorComponent
  implements OnDestroy, ControlValueAccessor {
  @Input() code: Code = {};
  @Input() solutions: Code = {};
  @Input() allowSwitchingFiles = true;
  @Input() displayFileName = false;
  @Input() codeDemoHighlight = [];
  @Input() highlights = {};
  files = [];
  openModels: MonacoModel[];
  private onChange: any;
  private fileNames: string[] = [];
  private editor: IStandaloneCodeEditor;
  private models: MonacoModel[];

  constructor(
    readonly monacoConfigService: MonacoConfigService,
    readonly cdr: ChangeDetectorRef
  ) {}

  @Input('files') set setFiles(files: string | string[]) {
    if (typeof files === 'string') {
      files = files.split(',');
    }
    this.files = files;
    this.updateOpenModels();
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

  loadSolution(file) {
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
          this.onChange({ ...this.code });
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
      this.fileNames = Object.keys(this.code);
      this.generateModels();
    }
  }

  ngOnDestroy() {
    this.dispose();
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
