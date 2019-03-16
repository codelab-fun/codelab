import { Component } from '@angular/core';

@Component({
  selector: 'codelab-snippet-info',
  templateUrl: './snippet-info.component.html',
  styleUrls: ['./snippet-info.component.scss']
})
export class SnippetInfoComponent {
  scrollUp() {
    window.scroll({top: 0, behavior: 'smooth'});
  }

}
