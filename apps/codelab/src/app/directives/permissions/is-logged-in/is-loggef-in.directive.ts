import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AccessService } from '../../../shared/services/access.service';
import { AbstractPermission } from '../abstract-permission';

@Directive({
  selector: '[isLoggedIn]'
})
export class IsLoggedInDirective extends AbstractPermission implements OnInit {
  constructor(
    templateRef: TemplateRef<any>,
    viewContainer: ViewContainerRef,
    accessService: AccessService
  ) {
    super(templateRef, viewContainer, accessService);
  }

  ngOnInit() {
    this.render(this.accessService.oldIsAdmin$);
  }
}
