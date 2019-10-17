import { Directive, OnInit } from '@angular/core';
import { Permissions } from '../../../shared/services/access.service';
import { AbstractPermission } from '../abstract-permission';

@Directive({
  selector: '[canLoadAdmin]'
})
export class CanLoadAdminDirective extends AbstractPermission
  implements OnInit {
  ngOnInit() {
    this.render(this.accessService.can(Permissions.CAN_LOAD_ADMIN));
  }
}
