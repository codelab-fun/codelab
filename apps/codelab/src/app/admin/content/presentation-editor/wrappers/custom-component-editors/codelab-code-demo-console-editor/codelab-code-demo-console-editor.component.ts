import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ContentSlide, CustomBlock } from '../../../types';
import { MonacoConfigService } from '@codelab/code-demos';
import { Observable } from 'rxjs';
import { Selection } from 'monaco-editor';

interface SelectableFile {
  selected: boolean;
  name: string;
  highlights: Highlight[];
}

interface Highlight {
  file: string;
  selection?: Selection | string;
  prefix: string;
  text: string;
}

@Component({
  selector: 'codelab-code-demo-console-editor',
  templateUrl: './codelab-code-demo-console-editor.component.html',
  styleUrls: ['./codelab-code-demo-console-editor.component.scss'],
})
export class CodelabCodeDemoConsoleEditorComponent implements OnInit {
  files = ['app.ts'];
  @Input() code = {};
  @Input() ui = 'browser';
  @Input() block!: CustomBlock;
  @Input() slide!: ContentSlide;
  @Input() presentationId!: string;
  @Input() selectedFiles: SelectableFile[] = [];
  @Input() showPreview = true;
  @Input() allowSwitchingFiles = true;
  @Input() displayFileName = false;
  readonly defaultNewFileName = 'new.ts';

  readonly selection$ = new Observable<Highlight | undefined>((subscriber) => {
    // TODO: Unsubscribe
    MonacoConfigService.monacoReady.then((monaco: any) => {
      monaco.editor.onDidCreateEditor((editor) => {
        const subscription = editor.onDidChangeCursorPosition(() => {
          const selection = editor.getSelection();
          const text = editor.getModel().getValueInRange(selection);
          const match = editor
            .getModel()
            .uri.path.match(/prefix\/(.+?)\/(.*)$/);
          if (text === '') {
            subscriber.next();
            return;
          }
          if (!match) {
            return;
          }
          const [, prefix, file] = match;

          subscriber.next({ file, prefix, selection, text });
        });

        editor.onDidDispose(() => subscription.dispose());
      });
    });
  });

  openFiles: string[] = [];
  highlights: Record<string, Selection>;

  async ngOnInit() {
    this.inferVars();
  }

  constructor(
    private readonly monacoConfigService: MonacoConfigService,
    private readonly contentService: ContentService
  ) {}

  update() {
    this.inferVars();

    this.contentService.updateBlock(this.presentationId, this.slide.id, {
      ...this.block,
      props: {
        code: this.code,
        selectedFiles: this.selectedFiles,
        showPreview: this.showPreview,
        allowSwitchingFiles: this.allowSwitchingFiles,
      },
    });
  }

  private inferVars() {
    this.files = Object.keys(this.code);

    this.selectedFiles =
      this.selectedFiles.length === 0
        ? this.files.map((name, i) => ({
            name,
            selected: i === 0,
            highlights: [],
          }))
        : this.selectedFiles;

    console.log('hi');

    this.highlights = this.selectedFiles.reduce((result, file) => {
      result[file.name] = file.highlights.map((highlight) => {
        if (typeof highlight.selection === 'string') {
          try {
            return new RegExp(highlight.selection);
          } catch (e) {
            console.error('Invalid regexp', highlight.selection);
          }
        }

        return highlight.selection;
      });
      return result;
    }, {});

    console.log(this.highlights);

    this.openFiles = this.selectedFiles
      .filter((file) => file.selected)
      .map(({ name }) => name);
  }

  updateFileName(index: number, oldName: string, newName: string) {
    if (!this.code[newName]) {
      this.selectedFiles[index].name = newName;
      console.assert(!!this.code[oldName]);
      this.code[newName] = this.code[oldName];
      delete this.code[oldName];
    }
    this.update();
  }

  addFile() {
    if (!this.code[this.defaultNewFileName]) {
      this.selectedFiles.push({
        name: this.defaultNewFileName,
        selected: false,
        highlights: [],
      });
      this.code[this.defaultNewFileName] = '// code';
    }
  }

  deleteFile(name: string) {
    delete this.code[name];
    this.selectedFiles = this.selectedFiles.filter(
      (file) => file.name !== name
    );
  }

  addHighlight(file: SelectableFile, highlight: Highlight) {
    file.highlights.push(JSON.parse(JSON.stringify(highlight)));
    this.update();
  }

  deleteHighlight(file: SelectableFile, highlightIndex: number) {
    file.highlights.splice(highlightIndex, 1);
    this.update();
  }

  addRegexHighlight(file: SelectableFile) {
    file.highlights.push({
      text: 'hi',
      prefix: 'hi',
      file: 'dsd',
      selection: '/dsdasdsad/',
    });
    this.update();
  }
}
