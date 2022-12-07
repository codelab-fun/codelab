import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ContentSlide, CustomBlock } from '../../../types';
import { MonacoConfigService } from '@codelab/code-demos';
import { IRange, Selection } from 'monaco-editor';
import { assert } from '@codelab/code-demos/src/lib/shared/utils';
import { rangeToJSON } from './highlight-button/highlight-button.component';

interface SelectableFile {
  highlights2: IRange[];
  selected: boolean;
  name: string;
  highlights: IRange[];
}

interface Highlight {
  file: string;
  selection?: Selection | string;
  prefix: string;
  text: string;
}

type Highlights2 = Record<string, IRange[]>;

@Component({
  selector: 'codelab-code-demo-console-viewer',
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

  openFiles: string[] = [];
  highlights2: Highlights2 = {};

  async ngOnInit() {
    this.inferVars();
  }

  constructor(
    private readonly monacoConfigService: MonacoConfigService,
    private readonly contentService: ContentService
  ) {
  }

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


    if (this.selectedFiles.length === 0) {
      console.log('regen');
      this.selectedFiles = this.files.map((name, i) => ({
        name,
        selected: i === 0,
        highlights: [],
        highlights2: [],
      }));
    }
    this.highlights2 = this.selectedFiles.reduce((result, file) => {
      result[file.name] = file.highlights2 ?? [];
      return result;
    }, {});

    this.openFiles = this.selectedFiles
      .filter((file) => file.selected)
      .map(({name}) => name);
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
        highlights2: [],
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

  updateHighlights(hightlighs: Highlights2) {
    const filenames = Object.keys(this.highlights2);
    for (const file of filenames) {
      assert(this.selectedFiles.find((a) => a.name === file)).highlights2 =
        hightlighs[file].map(rangeToJSON);
    }

    this.update();
  }
}
