import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'codelab-menu-fullscreen-widget',
  templateUrl: './menu-fullscreen-widget.component.html',
  styleUrls: ['./menu-fullscreen-widget.component.scss']
})
export class MenuFullscreenWidgetComponent implements OnInit {

  constructor() { }

  handleClick() {
    const event = new KeyboardEvent('keydown', {
      // dispatching the combination defined in shortcuts.directive.ts
      'key': 'Enter',
      'altKey': true
    });
    window.dispatchEvent(event);
  }

  ngOnInit() {
  }

}
