import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileConfig} from '../interfaces/file-config';

@Component({
  selector: 'slides-test-description',
  templateUrl: './test-description.component.html',
  styleUrls: ['./test-description.component.css']
})
export class TestDescriptionComponent implements OnInit {
  @Input() title: string;
  @Input() filePath: string;
  @Input() pass: boolean;
  @Output() onSelectFile = new EventEmitter<FileConfig>();

  constructor() {
  }
  ngOnInit() {
    if (!this.title) {
      console.error('Test description is missing');
    }
  }
}
