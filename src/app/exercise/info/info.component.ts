import { Component, Input } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {PresentationService} from '../../presentation/presentation/presentation.service';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent {
  @Input() milestone;
  private isExpanded: boolean;
  private iframeSource;

  constructor(
    public presentationService: PresentationService,
    private sanitizer:DomSanitizer) {}

  ngOnInit() {
    let href = `${window.location.origin}/milestone/${this.milestone}/0`;
    this.iframeSource = this.sanitizer.bypassSecurityTrustResourceUrl(href);
  }

  }


  expandToggle() {
    return this.isExpanded = !this.isExpanded;
  }
}
