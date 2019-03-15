import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'codelab-snippet-info',
  templateUrl: './snippet-info.component.html',
  styleUrls: ['./snippet-info.component.scss']
})
export class SnippetInfoComponent {

  isInfoOnMotion = false;

  @HostListener('window:scroll', ['$event'])
  onScrollPosition() {
    this.isInfoOnMotion = window.pageYOffset > 40;
  }

  scrollUp() {
    window.scroll({top: 0, behavior: 'smooth'});
  }

}
