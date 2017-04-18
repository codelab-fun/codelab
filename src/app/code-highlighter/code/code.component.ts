import {Component, OnInit, ElementRef, ContentChild, Input} from '@angular/core';
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
{{code
import {Component} from '@angular/core';
code}}
</ng-code>
*/

@Component({
  selector: 'ng-code',
  templateUrl: './code.component.html',
  styleUrls:['./code.component.css']
})
export class CodeComponent implements OnInit {
  @Input() code:string;
  @Input() language:string = '';
  @Input() theme:string = 'default';
  @Input() fileName: string = '';
  constructor(private el: ElementRef, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    if (this.code){
      this.el.nativeElement.querySelector('pre').innerHTML = this.code;
    }
  }
  getThemeStylesUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`/node_modules/highlight.js/styles/${this.theme}.css`);
  }
  ngAfterViewInit() {
    let elem = this.el.nativeElement.querySelector('pre');
    elem.innerHTML = elem.innerHTML.replace(/(\r?\n)*{{code(\r)?(\n)/g, '').replace(/((\r)?(\n))*code}}((\r)?(\n))*/g,'')  ;
    highlightBlock(elem);
  }
}
