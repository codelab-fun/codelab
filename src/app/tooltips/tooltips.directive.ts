import {Directive, ElementRef, Input} from '@angular/core';
import {EditorComponent} from '../exercise/editor/editor.component';
import {findPosition} from './utils';

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
  @Input('ng-tooltips') tooltips: Array<any> = [];

  constructor(private el: ElementRef, private editorComponent: EditorComponent) {
  }

  ngAfterViewInit() {
    this.editorComponent.slide.onActive.filter(a => a).subscribe(() => { //only generate tooltip when the slide is active
      let decorations = this.tooltips.map((tooltip, i) => {
        const {indexStart, lineNumber, indexEnd} = findPosition(this.editorComponent.code, tooltip.match);
        return {
          range: new this.editorComponent.monacoConfigService.monaco.Range(lineNumber, indexStart, lineNumber, indexEnd),
          options: {
            inlineClassName: 'tooltip-text-' + i
          }
        };
      });

      this.editorComponent._editor.deltaDecorations([], decorations);

      setTimeout(() => {
        this.tooltips.forEach((item, i) => {
          let text = this.el.nativeElement.querySelector('.tooltip-text-' + i);
          if (!text) {
            return;
          }
          let newPopup = document.createElement('div');
          newPopup.className = 'popup';

          let popupMessage = document.createElement('div');
          let popupArrow = document.createElement('div');
          popupMessage.className = 'popup-message';
          popupArrow.className = 'popup-arrow';
          popupMessage.innerHTML = item.text;
          if (item.fontSize) {
            popupMessage.style['font-size'] = item.fontSize + 'px';
          }

          newPopup.appendChild(popupMessage);
          newPopup.appendChild(popupArrow);

          let offsetTop = 0;
          let currentNode = text;
          while (currentNode.nodeName != 'BODY') {
            offsetTop += currentNode.offsetTop;
            currentNode = currentNode.offsetParent;
          }
          let offsetLeft = 0;
          currentNode = text;
          while (currentNode.nodeName != 'BODY') {
            offsetLeft += currentNode.offsetLeft;
            currentNode = currentNode.offsetParent;
          }
          this.el.nativeElement.append(newPopup);
          newPopup.style.position = 'fixed';
          newPopup.style.top = offsetTop - (newPopup.offsetHeight) + 5 + 'px';
          newPopup.style.left = offsetLeft + (text.offsetWidth) + 'px';
        });
      }, 500);
    });

  }
}
