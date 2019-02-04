import { Component, OnInit, ViewChild, ViewContainerRef, Compiler, Injector, NgModuleRef, NgModule } from '@angular/core';

@Component({
  selector: 'app-outputs',
  template: '<div #vc></div><br><br><input type=\"text\" #hero> <button (click)="onClickMe(hero.value)">check</button>'
})

export class OutputsComponent implements OnInit {
  stylestr = "s"
  @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;
  
  constructor(private _compiler: Compiler,
    private _injector: Injector,
    private _m: NgModuleRef<any>) { }

  ngOnInit() {
  }

  onClickMe(val) {
    this.stylestr = val
    this.ngAfterViewInit()
  }

  ngAfterViewInit() {
    const template = `<style> ${this.stylestr} {color:blue}</style>
      Select this <br>
      <div class="x">&lt;div class="x"&gt;</div>
      <div class="y">&lt;div class="y"&gt;</div>

      <br><br>
      Not select<br>
      &lt;span&gt; <br>
      &lt;p&gt;
    `;

    const tmpCmp = Component({template: template})(class {});
    const tmpModule = NgModule({declarations: [tmpCmp]})(class {});

    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        const cmpRef = f.create(this._injector, [], null, this._m);
        this._container.clear();
        this._container.insert(cmpRef.hostView);
      })
  }

}
