import { Component, Input, OnInit } from '@angular/core';

import { CodeDemoModule, MonacoConfigService } from '@codelab/code-demos';

import { ContentSlide, CustomBlock } from '../../../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'codelab-code-demo-console-viewer',
  templateUrl: './codelab-code-demo-console-viewer.component.html',
  standalone: true,
  imports: [CodeDemoModule, FormsModule],
})
export class CodelabCodeDemoConsoleViewerComponent implements OnInit {
  files = ['app.ts'];
  @Input() code = {};
  @Input() ui = 'browser';
  @Input() block!: CustomBlock;
  @Input() slide!: ContentSlide;
  @Input() presentationId!: string;
  @Input() selectedFiles: any[] = [];
  @Input() showPreview = true;
  @Input() allowSwitchingFiles = true;
  @Input() displayFileName = false;
  readonly defaultNewFileName = 'new.ts';
  openFiles: any[];
  highlights: any;

  async ngOnInit() {
    this.inferVars();
  }

  constructor(private readonly monacoConfigService: MonacoConfigService) {}

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

    this.highlights = this.selectedFiles.reduce((result, file) => {
      result[file.name] = file.highlights2;
      return result;
    }, {});

    this.openFiles = this.selectedFiles
      .filter((file) => file.selected)
      .map(({ name }) => name);
  }
}
