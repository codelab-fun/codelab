import { Component, ComponentFactoryResolver, Input, OnInit, Type, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'slides-display-dynamic-component',
  templateUrl: './display-dynamic-component.component.html',
  styleUrls: ['./display-dynamic-component.component.css']
})
export class DisplayDynamicComponent implements OnInit {

  @Input() component: Type<any>;
  @Input() param: string;

  constructor(private vcr: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }


  ngOnInit() {
    const cf = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.vcr.clear();
    const componentRef = this.vcr.createComponent(cf);
    componentRef.instance.param = this.param;
  }

}
