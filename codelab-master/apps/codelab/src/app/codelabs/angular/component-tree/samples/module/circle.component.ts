import { Component, Input } from '@angular/core';

@Component({
  selector: 'slides-circle',
  template:
    '<div class="circle" [style.width]="size" [style.height]="size" [style.background]="color"></div>'
})
export class CircleComponent {
  @Input() size: number;
  @Input() color: string;
}
