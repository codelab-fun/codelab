import {Directive, Input, ElementRef} from '@angular/core';
import {EditorComponent} from "../exercise/editor/editor.component";

/*
This directive adds tooltips to the provided text

Usage in template:
<app-slide [ng-tooltips]="tooltips">

...
tooltips = [
 {
  match:'Angular',
  text:'This is Angular',
  fontSize: 40 ---optional
 }
];

 */

@Directive({
  selector: '[ng-tooltips]'
})
export class TooltipsDirective {
  @Input('ng-tooltips') tooltips : Array<any> = [];
  constructor(private el: ElementRef, private component:EditorComponent) {
  }

  ngAfterViewInit(){
    this.component.slide.onActive.filter(a => a).subscribe(() => { //only generate tooltip when the slide is active
      let decorations = this.tooltips.map((tooltip,i) => {
        let textBeforeMatch = this.component.code.slice(0,this.component.code.indexOf(tooltip.match));
        let lineBreaks = textBeforeMatch.match(/(\r\n|\n|\r)/g);
        let lineNumber = (lineBreaks ? lineBreaks.length : 0) + 1;

        let lineStart = textBeforeMatch.lastIndexOf('\n');
        let indexStart = this.component.code.slice(lineStart, this.component.code.length - 1).indexOf(tooltip.match);
        let indexEnd = indexStart+tooltip.match.length;
        return { range: new this.component.monacoConfigService.monaco.Range(lineNumber,indexStart,lineNumber,indexEnd), options: { inlineClassName: 'tooltip-text-'+i }};
      });
      let a = this.component._editor.deltaDecorations([], decorations);

      setTimeout(() => {
        this.tooltips.forEach((item, i) => {
          let text = this.el.nativeElement.querySelector('.tooltip-text-' + i);
          if (!text){
            return;
          }
          let newPopup = document.createElement('div');
          newPopup.className = 'popup';

          let popupMessage = document.createElement('div');
          let popupArrow = document.createElement('div');
          popupMessage.className = 'popup-message';
          popupArrow.className = 'popup-arrow';
          popupMessage.innerHTML = item.text;
          if (item.fontSize){
            popupMessage.style['font-size'] = item.fontSize + 'px';
          }

          newPopup.appendChild(popupMessage);
          newPopup.appendChild(popupArrow);

          let offsetTop = 0;
          let currentNode = text;
          while(currentNode.nodeName != 'BODY'){
            offsetTop += currentNode.offsetTop;
            currentNode = currentNode.offsetParent;
          }
          let offsetLeft = 0;
          currentNode = text;
          while(currentNode.nodeName != 'BODY'){
            offsetLeft += currentNode.offsetLeft;
            currentNode = currentNode.offsetParent;
          }
          this.el.nativeElement.append(newPopup);
          newPopup.style.position = 'absolute';
          newPopup.style.top = offsetTop - (newPopup.offsetHeight) + 5 + 'px';
          newPopup.style.left = offsetLeft + (text.offsetWidth) + 'px';
        });
      },500);
    });

  }
}
