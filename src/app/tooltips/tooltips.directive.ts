import {Directive, Input, ElementRef} from '@angular/core';

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
  @Input('ng-tooltips') matches = [];
  constructor(private el: ElementRef) { }

  ngAfterViewInit(){
    let codeHTML = this.el.nativeElement.innerHTML;
    this.matches.forEach((item, i) => {
      codeHTML = codeHTML.replace(item.match, '<span class="popup-src-'+ i + '">' + item.match + '</span>');
    });
    this.el.nativeElement.innerHTML = codeHTML;

    this.matches.forEach((item, i) => {
      let text = this.el.nativeElement.querySelector('.popup-src-' + i);
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

      this.el.nativeElement.append(newPopup);
      newPopup.style.position = 'absolute';
      newPopup.style.top = text.offsetTop - (newPopup.offsetHeight) + 5 + 'px';
      newPopup.style.left = text.offsetLeft + (text.offsetWidth) + 'px';
    });
  }
}
