import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { auditTime } from 'rxjs/operators';

declare const require;
const useStateComponent = require('!!raw-loader!./use-state/use-state.component.ts');
const bootstrap = require('!!raw-loader!./use-state/bootstrap.ts');
const useStateTemplate = require('!!raw-loader!./use-state/use-state.component.html');
const useStateDirective = require('!!raw-loader!./use-state/use-state.directive.ts');
const hooksTestModule = require('!!raw-loader!./use-state/fake/fake-use-state.module.ts');
const useStateCss = require('!!raw-loader!./use-state/use-state.css');


@Component({
  selector: 'slides-hooks',
  templateUrl: './hooks.component.html',
  styleUrls: ['./hooks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HooksComponent {
  refresh = new Subject<void>();
  code = {
    'use-state.component.ts': useStateComponent,
    'use-state.component.html': useStateTemplate,
    'use-state.directive.ts': useStateDirective,
    'bootstrap.ts': bootstrap,
    'use-state.css': useStateCss,
    'use-state.module.ts': hooksTestModule,
    'index.html': '<use-state-test></use-state-test>'
  };

  isBuilding = true;
  fontSize = 30;

  ngOnInit() {
    this.refresh.pipe(auditTime(300)).subscribe(() => {
      this.code = {...this.code};
    });
  }

  regenerateCode() {
    this.refresh.next();
  }
}
