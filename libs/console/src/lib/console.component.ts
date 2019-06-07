import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewChildren
} from '@angular/core';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

@Component({
  selector: 'console-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit, AfterViewInit {
  fontSize = 40;
  output = [];
  input = '';
  inputHeight = 50;
  autocomplete: string[] = [];

  @Input() componentMap: { [key: string]: Type<any> };
  @Input() commands: string[];

  @ViewChild('inp', { static: false }) inputEl;
  @ViewChildren('outputBlock') blocks;

  typeInQueue = [];

  currentCommand = 0;

  @HostListener('document:keydown.esc', ['$event'])
  handleKeyboardEvent() {
    this.inputEl.nativeElement.focus();
  }

  trackByFn(a, i) {
    return i;
  }

  post(code: any, type: string = 'output') {
    if (code && code.dynamicComponent) {
      this.output.push({
        code: code.dynamicComponent,
        param: code.param,
        type: 'dynamic'
      });
    } else {
      this.output.push({ code: code, type });
    }
  }

  evalCode(code: string) {
    return new Function('return (' + code + ')')();
  }

  ngOnInit() {
    this.updateAutocomplete();
  }

  calcInputHeight() {
    this.inputHeight = Math.max(50, this.inputEl.nativeElement.scrollHeight);
  }

  next() {
    this.typeIn(this.commands[this.currentCommand]);
    this.currentCommand++;
  }

  ngAfterViewInit() {
    const that = this;
    (window as any).explain = (component: string, param: string) =>
      this.explain(component, param);

    console.log = function() {
      Array.from(arguments).map(a => that.post(a, 'log'));
    };

    const addChar = () => {
      if (this.typeInQueue.length > 0) {
        const next = this.typeInQueue.shift();
        if (next === 'execute') {
          this.execute(this.input);
        } else {
          this.input += next;
        }
      }
      window.setTimeout(() => addChar(), Math.random() * 1);
    };

    requestAnimationFrame(() => {
      this.next();
    });

    addChar();
  }

  execute(code: string) {
    if (code.trim() === '') {
      return;
    }

    if (!/['"`<]/.test(code[0])) {
      this.post(code);
    }

    if (code.trim().substr(0, 1) === '<') {
      this.post(escapeHtml(code));
      code = `explain('html', \`${code}\`)`;
    }

    try {
      this.post(this.evalCode(code), 'result');
    } catch (e) {
      this.post(e.message, 'error');
    }

    requestAnimationFrame(() => {
      this.calcInputHeight();
      this.blocks.last.nativeElement.scrollIntoView();
      this.inputEl.nativeElement.focus();
    });

    this.input = '';
  }

  typeIn(code) {
    this.typeInQueue = this.typeInQueue.concat(code.split(''));
    this.typeInQueue.push('execute');
  }

  updateAutocomplete() {
    if (this.input.length < 3) {
      this.autocomplete = [];
    } else {
      this.autocomplete = this.commands.filter(a => a.includes(this.input));
    }
  }

  private explain(s: string, param: string) {
    if (!this.componentMap[s]) {
      throw new Error(`Unknown component type: ${s}`);
    }
    return {
      dynamicComponent: this.componentMap[s],
      param
    };
  }
}
