import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { addMetaInformation, createSystemJsSandbox } from '@codelab/code-demos';
import { ScriptLoaderService } from '@codelab/sandbox-runner';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TestRunResult } from '@codelab/utils';
import { handleTestMessage } from './tests';

@Component({
  selector: 'codelab-simple-angular-test-runner',
  templateUrl: './angular-test-runner.component.html',
  styleUrls: ['./angular-test-runner.component.css'],
})
export class SimpleAngularTestRunnerComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  handleMessageBound: any;
  @Output() solved: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public selectFile: EventEmitter<string> =
    new EventEmitter<string>();
  @Input() translations: { [key: string]: string } = {};
  @Input() code: any;
  @Input() bootstrap: string;

  @ViewChild('runner', { static: false }) runnerElement: ElementRef;

  changedFilesSubject = new BehaviorSubject<Record<string, string>>({});
  tests: any;
  private subscription: Subscription;
  result: TestRunResult = { tests: [] };

  constructor(
    private scriptLoaderService: ScriptLoaderService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.handleMessageBound = (message) => {
      this.tests = handleTestMessage(message, this.tests || []);

      this.result = {
        tests: this.tests.map((test) => {
          const name =
            this.translations[test.title.replace('@@', '')] || test.title;
          return { ...test, name, error: test.result };
        }),
      };

      if (message.data.type === 'testEnd') {
        this.solved.emit(
          this.tests.length > 0 && this.tests.every((test) => test.pass)
        );
      }

      this.cd.markForCheck();
    };
    window.addEventListener('message', this.handleMessageBound, false);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code) {
      this.changedFilesSubject.next(changes.code.currentValue);
    }
  }

  async ngAfterViewInit() {
    const sandbox = await createSystemJsSandbox(
      this.runnerElement.nativeElement,
      {
        id: 'testing',
        url: '/assets/runner',
      },
      ({ evalJs }) => {
        evalJs(this.scriptLoaderService.getScript('chai'));
        evalJs(this.scriptLoaderService.getScript('zone'));
        evalJs(this.scriptLoaderService.getScript('reflectMetadata'));
      }
    );

    sandbox.setHtml(
      this.code['index.html'] ||
        '<app-root></app-root><my-app></my-app><div class="error"></div>'
    );

    sandbox.evalJs(this.scriptLoaderService.getScript('mocha'));
    sandbox.evalJs(this.scriptLoaderService.getScript('test-bootstrap'));

    this.subscription = this.changedFilesSubject.subscribe((files) => {
      addMetaInformation(sandbox, this.code);


      const hasErrors = Object.entries(files)
        .filter(([path]) => path.match(/\.js$/) && !path.startsWith('code'))
        .map(([path, code]) => {
          try {

            sandbox.evalJs(`console.log('I remove module')`);
            sandbox.evalJs(code);
          } catch (e) {
            console.groupCollapsed(e.message);
            console.log(e);
            console.groupEnd();
            return true;
          }
          return false;
        })
        .some((a) => a);

      if (!hasErrors) {
        sandbox.evalJs(`System.import('./${this.bootstrap}')`);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
