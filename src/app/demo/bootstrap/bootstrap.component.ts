import {Component} from '@angular/core';
import {BaseRouteableComponent} from '../BaseRouteableComponent';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent extends BaseRouteableComponent {

  code = {};
}
