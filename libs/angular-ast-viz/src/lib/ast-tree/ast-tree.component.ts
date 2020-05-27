import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

const systemKeys = new Set([
  'type',
  'start',
  'end',
  'loc',
  'comments',
  'tokens',
  'sourceType',
  'directives',
  'extra'
]);

@Component({
  selector: 'ast-viz',
  templateUrl: './ast-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ast-tree.component.css']
})
export class AstTreeComponent implements OnInit {
  @Input() node: any = {};
  @Input() key: string;
  @Input() shortNames = true;
  @Output() selectNode = new EventEmitter();

  split(value) {
    return value.replace(/([A-Z])/g, ' $1');
  }

  get specialKeys() {
    return Object.keys(this.node).filter(key => !systemKeys.has(key));
  }

  get stringKeys() {
    return this.specialKeys.filter(
      key =>
        typeof this.node[key] === 'string' || typeof this.node[key] === 'number'
    );
  }

  get objectKeys() {
    return this.specialKeys
      .filter(key => typeof this.node[key] === 'object')
      .reverse();
  }

  get isArray() {
    return Array.isArray(this.node);
  }

  constructor() {}

  ngOnInit() {}
}
