import { AfterContentInit, Component } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';
import { SlideComponent } from '../../presentation/slide/slide.component';
import { MonacoConfigService } from 'app/exercise/services/monaco-config.service';
import { CodeEditorComponent } from '../code-editor/code-editor.component';

/**
 * this is meant to wrap multiple instances of CodeEditor components, and aggregate files to pass to monaco.
 * Not proud of this solution.
 */
@Component({
  selector: 'slides-code-group',
  templateUrl: './code-group.component.html',
  styleUrls: ['./code-group.component.css']
})
export class CodeGroupComponent implements AfterContentInit {
  components: Array<any> = [];
  files: Array<FileConfig> = [];

  constructor(public slide: SlideComponent, private monacoConfig: MonacoConfigService) {
  }


  register(codeEditorComponent: CodeEditorComponent) {
    this.components.push(codeEditorComponent);
  }

  ngAfterContentInit() {
    const files = this.components.map(component => component.file);
    this.monacoConfig.createFileModels(files);
    this.components.forEach(component => component.active = true);
  }

}
