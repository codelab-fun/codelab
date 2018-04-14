import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { EditorComponent } from '../exercise/editor/editor.component';
import { findPosition } from './utils';
import 'rxjs/add/operator/filter';

/*
 This directive adds tooltips to the provided text

 Usage in template:
 <slides-slide [slidesTooltips]="tooltips">

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
  // tslint:disable-next-line:all TODO: Fix
  // linter warnings on the selector and delete this comment.
  selector: '[slidesTooltips]'
})
export class TooltipsDirective implements AfterViewInit {
  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('slidesTooltips') tooltips: Array<any> = [];

  constructor(private el: ElementRef, private editorComponent: EditorComponent) {
  }

  ngAfterViewInit(): void {
    // only generate tooltip when the slide is active
    const decorations = this.tooltips.map((tooltip, i) => {
      const {indexStart, lineStart, indexEnd, lineEnd} = findPosition(this.editorComponent.code, tooltip.match);
      return {
        range: new this.editorComponent.monacoConfigService.monaco.Range(lineStart, indexStart, lineEnd, indexEnd),
        options: {
          inlineClassName: 'tooltip-text-' + i
        }
      };
    });

    this.editorComponent.editor.deltaDecorations([], decorations);

    setTimeout(() => {
      this.tooltips.forEach((item, i) => {
        const text = this.el.nativeElement.querySelector('.tooltip-text-' + i);
        if (!text) {
          return;
        }
        const newPopup = document.createElement('div');
        newPopup.className = 'popup';

        const popupMessage = document.createElement('div');
        const popupArrow = document.createElement('div');
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
        while (currentNode.nodeName !== 'BODY') {
          offsetTop += currentNode.offsetTop;
          currentNode = currentNode.offsetParent;
        }
        let offsetLeft = 0;
        currentNode = text;
        while (currentNode.nodeName !== 'BODY') {
          offsetLeft += currentNode.offsetLeft;
          currentNode = currentNode.offsetParent;
        }
        this.el.nativeElement.append(newPopup);
        newPopup.style.position = 'fixed';
        newPopup.style.top = offsetTop - (newPopup.offsetHeight) + 5 + 'px';
        newPopup.style.left = offsetLeft + (text.offsetWidth) + 'px';
      });
    }, 500);


  }
}
