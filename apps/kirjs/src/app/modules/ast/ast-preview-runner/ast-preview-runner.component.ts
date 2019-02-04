import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { parse } from 'babylon';

declare const require;

@Component({
  selector: 'kirjs-ast-preview-runner',
  templateUrl: './ast-preview-runner.component.html',
  styleUrls: ['./ast-preview-runner.component.css']
})
export class AstPreviewRunnerComponent implements OnChanges {
  ast: any;
  hasError = false;
  @Input() program = true;
  @Input() code = '';
  @Output() highlight = new EventEmitter();

  update() {
    this.run();
  }

  selectNode({ loc }) {
    this.highlight.emit([
      loc.start.line,
      loc.start.column + 1,
      loc.end.line,
      loc.end.column + 1
    ]);
  }

  run() {
    this.hasError = false;
    try {
      this.ast = parse(this.code);
      if (this.program) {
        this.ast = this.ast.program.body;
      }
    } catch (e) {
      this.hasError = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.run();
  }

  constructor() {}
}
