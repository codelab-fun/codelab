import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'codelab-full-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent {
  displayButtons: boolean;
  constructor(@Optional() route: ActivatedRoute) {
    this.displayButtons = !route.snapshot.queryParams.milestone;
  }
}
