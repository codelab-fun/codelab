import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {
  @Input() milestone;
  private isExpanded: boolean;
  private iframeSource;

  constructor(private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit() {
    const href = `${window.location.origin}/milestone/${this.milestone}/0`;
    this.iframeSource = this.sanitizer.bypassSecurityTrustResourceUrl(href);
  }


  expandToggle() {
    return this.isExpanded = !this.isExpanded;
  }
}
