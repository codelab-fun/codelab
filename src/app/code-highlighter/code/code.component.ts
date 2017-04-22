import { Component, OnInit, ElementRef, ContentChild, Input, ViewChild } from '@angular/core';
import {highlightBlock} from 'highlight.js'
import {DomSanitizer} from '@angular/platform-browser';

/*
This component is used to highlight code using highlight.js
Examples:

Passing string code as an input:
 <ng-code [language]="'typescript'" [theme]="'atom-one-dark'" [code]="myCode">
 </ng-code>

Writing code within the component tag:
<ng-code ngNonBindable [language]="'typescript'" [theme]="'atom-one-dark'">
<![CDATA[
import {Component} from '@angular/core';
]]
</ng-code>
*/

@Component({
  selector: 'ng-code',
  templateUrl: './code.component.html'
})
export class CodeComponent implements OnInit {
  @Input() code:string;
  @Input() language:string = '';
  @Input() theme:string = 'default';

  @ViewChild('pre') pre: ElementRef;

  securedURL;

  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getThemeStylesUrl();

    if (this.code) {
      this.pre.nativeElement.innerHTML = this.code;
    }
  }

  ngAfterViewInit() {
    highlightBlock(this.pre.nativeElement);
  }

  getThemeStylesUrl(){
    this.securedURL = this.sanitizer.bypassSecurityTrustResourceUrl(`/node_modules/highlight.js/styles/${this.theme}.css`);
  }
}
