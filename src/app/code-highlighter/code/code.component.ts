import {Component, OnInit, ElementRef, ContentChild, Input} from '@angular/core';
import {highlightBlock} from 'highlight.js'
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'ng-code',
  templateUrl: './code.component.html'
})
export class CodeComponent implements OnInit {
  @Input() code:string;
  @Input() language:string = '';
  @Input() theme:string = 'default';

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
