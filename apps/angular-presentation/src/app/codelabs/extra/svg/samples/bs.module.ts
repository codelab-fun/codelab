import { AppComponent as A1 } from './sub.component';
import { AppComponent as A2 } from './attr/app.component';
import { AppComponent as A3 } from './chart/app.component';
import { AppComponent as A4 } from './svg/app.component';
import { AppComponent as A5 } from './chart4/app.component.solved';
import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[appTicks]',
  template: ''
})
export class FakeTicksComponent {
  @Input() data: any;
}


@NgModule({
  imports: [CommonModule],
  declarations: [A1, A2, A3, A4, A5, FakeTicksComponent],
})
export class AppModule {
}
