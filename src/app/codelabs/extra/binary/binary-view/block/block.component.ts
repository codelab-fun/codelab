import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { ObjectComponent } from '../object/object.component';
import { BitsComponent } from '../bits/bits.component';
import { StringComponent } from '../string/string.component';
import { NumberComponent } from '../number/number.component';
import { ArrayComponent } from '../array/array.component';
import { ColorComponent } from '../color/color.component';
import { HexComponent } from '../hex/hex.component';

const componentMap = {
  object: ObjectComponent,
  bits: BitsComponent,
  string: StringComponent,
  number: NumberComponent,
  array: ArrayComponent,
  color: ColorComponent,
  hex: HexComponent
};

@Component({
  selector: 'slides-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() showMeta: boolean;
  private componentRef: any;

  constructor(private vcr: ViewContainerRef,
              private readonly cdr: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnChanges(changes) {
    if (this.componentRef && changes.showMeta) {
      this.componentRef.instance.showMeta = changes.showMeta.currentValue;
    }

    if (this.componentRef && changes.data) {
      this.componentRef.instance.data = changes.data.currentValue;
    }
    this.cdr.detectChanges();
  }

  ngOnInit() {
    if (!componentMap[this.data.type]) {
      debugger;
    }

    const cf = this.componentFactoryResolver.resolveComponentFactory(componentMap[this.data.type]);
    this.vcr.clear();
    this.componentRef = this.vcr.createComponent(cf) as any;
    this.componentRef.instance.data = this.data;
    this.componentRef.instance.showMeta = this.showMeta;
  }
}
