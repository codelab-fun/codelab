import { Component, Input } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ContentSlide, CustomBlock } from '../../../types';

interface SelectableFiles {
  selected: boolean;
  name: string;
}

@Component({
  selector: 'codelab-code-demo-console-editor',
  templateUrl: './codelab-code-demo-console-editor.component.html',
  styleUrls: ['./codelab-code-demo-console-editor.component.css']
})
export class CodelabCodeDemoConsoleEditorComponent {
  files = ['app.ts'];
  @Input() code = {};
  @Input() ui = 'browser';
  @Input() block!: CustomBlock;
  @Input() slide!: ContentSlide;
  @Input() presentationId!: string;
  @Input() selectedFiles: SelectableFiles[] = [];
  readonly defaultNewFileName = 'new.ts';

  openFiles: string[] = [];

  constructor(private readonly contentService: ContentService) {}

  update() {
    this.files = Object.keys(this.code);
    this.selectedFiles =
      this.selectedFiles.length === 0
        ? this.files.map((name, i) => ({
            name,
            selected: i === 0
          }))
        : this.selectedFiles;

    this.openFiles = this.selectedFiles
      .filter(file => file.selected)
      .map(({ name }) => name);

    this.contentService.updateBlock(this.presentationId, this.slide.id, {
      ...this.block,
      props: {
        code: this.code,
        selectedFiles: this.selectedFiles
      }
    });
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
        selected: false
      });
      this.code[this.defaultNewFileName] = '// code';
    }
  }

  deleteFile(name: string) {
    delete this.code[name];
    this.selectedFiles = this.selectedFiles.filter(file => file.name !== name);
  }
}
