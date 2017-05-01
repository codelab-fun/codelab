import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {
  @Input() milestone;
  private isExpanded: boolean;
  private iframeSource;

  constructor(private sanitizer: DomSanitizer, private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    const url = this.location.prepareExternalUrl(this.router.createUrlTree(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {milestone: this.milestone},
      queryParamsHandling: 'merge'
    }).toString());

    this.iframeSource = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  expandToggle() {
    return this.isExpanded = !this.isExpanded;
  }
}
