import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'codelab-slides-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  @ViewChild('translations', { static: false }) translations;

  showContents: boolean;
}
