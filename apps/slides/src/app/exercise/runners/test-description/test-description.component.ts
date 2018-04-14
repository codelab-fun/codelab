import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileConfig } from '../../interfaces/file-config';

@Component({
  selector: 'slides-test-description',
  templateUrl: './test-description.component.html',
  styleUrls: ['./test-description.component.css']
})
export class TestDescriptionComponent {
  @Input() title: string;
  @Input() file: FileConfig;
  @Input() pass: boolean;
  @Output() onSelectFile = new EventEmitter<FileConfig>();

  constructor() {
  }
}
