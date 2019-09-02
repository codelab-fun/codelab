import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirjs-binary-display',
  templateUrl: './binary-display.component.html',
  styleUrls: ['./binary-display.component.css']
})
export class BinaryDisplayComponent {
  binaries = [];

  @Input() set binary(binary: string) {
    this.binaries = binary.match(/.{8}/g);
  }
}
