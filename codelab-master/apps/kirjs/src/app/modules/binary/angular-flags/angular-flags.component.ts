import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-angular-flags',
  templateUrl: './angular-flags.component.html',
  styleUrls: ['./angular-flags.component.css']
})
export class AngularFlagsComponent implements OnInit {
  number = 124;
  flags = [
    { checked: false, name: 'None', value: 0 },
    { checked: false, name: 'TypeElement', value: 1 },
    { checked: false, name: 'TypeText', value: 2 },
    { checked: false, name: 'ProjectedTemplate', value: 4 },
    { checked: false, name: 'CatRenderNode', value: 3 },
    { checked: false, name: 'TypeNgContent', value: 8 },
    { checked: false, name: 'TypePipe', value: 16 },
    { checked: false, name: 'TypePureArray', value: 32 },
    { checked: false, name: 'TypePureObject', value: 64 },
    { checked: false, name: 'TypePurePipe', value: 128 },
    { checked: false, name: 'CatPureExpression', value: 224 },
    { checked: false, name: 'TypeValueProvider', value: 256 },
    { checked: false, name: 'TypeClassProvider', value: 512 },
    { checked: false, name: 'TypeFactoryProvider', value: 1024 },
    { checked: false, name: 'TypeUseExistingProvider', value: 2048 },
    { checked: false, name: 'LazyProvider', value: 4096 },
    { checked: false, name: 'PrivateProvider', value: 8192 },
    { checked: false, name: 'TypeDirective', value: 16384 },
    { checked: false, name: 'Component', value: 32768 },
    { checked: false, name: 'CatProviderNoDirective', value: 3840 },
    { checked: false, name: 'CatProvider', value: 20224 },
    { checked: false, name: 'OnInit', value: 65536 },
    { checked: false, name: 'OnDestroy', value: 131072 },
    { checked: false, name: 'DoCheck', value: 262144 },
    { checked: false, name: 'OnChanges', value: 524288 },
    { checked: false, name: 'AfterContentInit', value: 1048576 },
    { checked: false, name: 'AfterContentChecked', value: 2097152 },
    { checked: false, name: 'AfterViewInit', value: 4194304 },
    { checked: false, name: 'AfterViewChecked', value: 8388608 },
    { checked: false, name: 'EmbeddedViews', value: 16777216 },
    { checked: false, name: 'ComponentView', value: 33554432 },
    { checked: false, name: 'TypeContentQuery', value: 67108864 },
    { checked: false, name: 'TypeViewQuery', value: 134217728 },
    { checked: false, name: 'StaticQuery', value: 268435456 },
    { checked: false, name: 'DynamicQuery', value: 536870912 },
    { checked: false, name: 'TypeModuleProvider', value: 1073741824 },
    { checked: false, name: 'CatQuery', value: 201326592 },
    { checked: false, name: 'Types', value: 201347067 }
  ];

  checked: string[];

  constructor() {
    this.syncCheckBoxes();
  }

  syncCheckBoxes() {
    this.flags.forEach(f => (f.checked = !!(this.number & f.value)));
  }

  ngOnInit() {}

  handleClick(checked: boolean, value: number) {
    this.number = this.number | value;
    this.syncCheckBoxes();
  }
}
