import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {
  AccessService,
  Permissions
} from '../../../shared/services/access.service';
import { AbstractPermission } from '../abstract-permission';

@Directive({
  selector: '[canLoadAdmin]'
})
export class CanLoadAdminDirective extends AbstractPermission
  implements OnInit {
  constructor(
    templateRef: TemplateRef<any>,
    viewContainer: ViewContainerRef,
    accessService: AccessService
  ) {
    super(templateRef, viewContainer, accessService);
  }

  ngOnInit() {
    this.render(this.accessService.can(Permissions.CAN_LOAD_ADMIN));
  }
}
