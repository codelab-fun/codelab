import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent {
  private isExpanded: boolean;
  iframeSource;
  constructor(private sanitizer:DomSanitizer){
    this.iframeSource = this.sanitizer.bypassSecurityTrustResourceUrl(window.location.href);
  }
  expandToggle() {
    return this.isExpanded = !this.isExpanded;
  }

  getSource(){

  }
}
