import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'kirjs-html-post',
  templateUrl: './html-post.component.html',
  styleUrls: ['./html-post.component.css']
})
export class HtmlPostComponent {
  html: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.html = sanitizer.bypassSecurityTrustHtml('');
  }

  @Input()
  set param(html: string) {
    this.html = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
