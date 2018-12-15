import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { publishReplay, refCount, tap } from 'rxjs/operators';
import { compileTsFilesWatch } from '../../../../../../../libs/code-demos/src/lib/runner/compile-ts-files';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { createSystemJsSandbox } from '../../../../../../../libs/exercise/src/lib/runners/utils/sandbox';
import { compileTemplates } from '../../../../../../../libs/code-demos/src/lib/runner/prepare-templates';
import { ScriptLoaderService } from '../../../../../../../libs/exercise/src/lib/services/script-loader.service';

interface CodeFiles {
  [key: string]: string;
}

@Component({
  selector: 'new-smart-runner',
  templateUrl: './new-smart-runner.component.html',
  styleUrls: ['./new-smart-runner.component.css']
})
export class NewSmartRunnerComponent implements OnDestroy, OnInit, OnChanges {
  @Input() code: CodeFiles = {};
  @Input() bootstrap: string;
  changedFilesSubject = new BehaviorSubject<Record<string, string>>({});
  @ViewChild('runner') runnerElement: ElementRef;

  private subscription: SubscriptionLike;

  constructor(public scriptLoaderService: ScriptLoaderService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code) {
      const current = changes.code.currentValue || {};
      const previous = changes.code.previousValue || {};
      const changedFiles = Object.keys(current).reduce((changedFiles, path) => {
        if (current[path] !== previous[path] && path.match(/\.ts$/)) {
          changedFiles[path] = current[path];
        }
        return changedFiles;
      }, {});

      if (Object.keys(changedFiles).length) {
        console.time('compile');
        this.changedFilesSubject.next(changedFiles);
      }
    }
  }

  async ngOnInit() {
    const sandbox = await createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': 'about:blank'
    });

    sandbox.setHtml(this.code['index.html'] || '<app-root></app-root><my-app></my-app><div class="error"></div>');

    sandbox.evalJs(this.scriptLoaderService.getScript('shim'));
    sandbox.evalJs(this.scriptLoaderService.getScript('zone'));
    sandbox.evalJs(this.scriptLoaderService.getScript('system-config'));
    sandbox.evalJs(this.scriptLoaderService.getScript('ng-bundle'));
    sandbox.addDep('reflect-metadata', Reflect);


    compileTemplates(this.code, sandbox);

    Object.entries(this.code).filter(([moduleName]) => moduleName.match(/\.css/))
      .forEach(([moduleName, code]) => {
        sandbox.addCss(code);
      });

    const files$ = this.changedFilesSubject.pipe(
      tap(() => {
        console.time('hi');
      }),
      compileTsFilesWatch(),
      publishReplay(1),
      refCount()
    );


    this.subscription = files$.subscribe(files => {

      Object.keys(files).map(file => sandbox.evalJs(`System.registry.delete(System.normalizeSync('./${file.replace('.js', '')}'));`));
      Object.values(files).map(file => sandbox.evalJs(file));
      sandbox.evalJs(`System.import('${this.bootstrap}')`);
      console.timeEnd('hi');
    });


    // const jsFiles = compileTsFiles(this.code);
    // const moduleFactory: ModuleWithComponentFactories<DynamicModule> = this.compiler.compileModuleAndAllComponentsSync(DynamicModule);
    // const moduleRef: NgModuleRef<DynamicModule> = moduleFactory.ngModuleFactory.create(this.injector);
    // debugger;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
