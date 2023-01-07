import { Component, Input } from '@angular/core';

@Component({
  selector: 'slides-codelab-code-demo-preview',
  templateUrl: './codelab-code-demo-preview.component.html',
  styleUrls: ['./codelab-code-demo-preview.component.css'],
})
export class CodelabCodeDemoPreviewComponent {

  @Input() code;
  @Input() ngModel;
  @Input() files;

}
