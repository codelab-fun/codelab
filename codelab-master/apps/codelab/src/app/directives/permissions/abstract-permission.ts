import {
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  Injectable
} from '@angular/core';
import { AccessService } from '../../shared/services/access.service';
import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Injectable()
export class AbstractPermission implements OnDestroy {
  public destroy = new ReplaySubject<any>(1);

  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainer: ViewContainerRef,
    public accessService: AccessService
  ) {}

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public render(observable: Observable<boolean>): void {
    observable.pipe(takeUntil(this.destroy)).subscribe(hasPermission => {
      if (hasPermission) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
