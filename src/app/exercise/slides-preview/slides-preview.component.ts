import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'slides-slides-preview',
  templateUrl: './slides-preview.component.html',
  styleUrls: ['./slides-preview.component.scss']
})

export class SlidesPreviewComponent implements OnInit {
  @Input() milestone;
  public isExpanded: boolean;
  private iframeSource;

  constructor(private sanitizer: DomSanitizer, private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    const url = this.location.prepareExternalUrl(this.router.createUrlTree(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {milestone: this.milestone, disableArrowsForCode: false},
      queryParamsHandling: 'merge'
    }).toString());

    this.iframeSource = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  expandToggle() {
    return this.isExpanded = !this.isExpanded;
  }
}
