import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'codelab-full-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent {
}
