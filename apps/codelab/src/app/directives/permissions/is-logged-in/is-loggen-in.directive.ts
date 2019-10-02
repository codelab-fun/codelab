import { Directive, OnInit } from '@angular/core';
import { AbstractPermission } from '../abstract-permission';

@Directive({
  selector: '[isLoggedIn]'
})
export class IsLoggedInDirective extends AbstractPermission implements OnInit {
  ngOnInit() {
    this.render(this.accessService.oldIsAdmin$);
  }
}
