import { Component, ElementRef } from '@angular/core';

import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { MenuShortcutContentComponent } from '../menu-shortcut-content/menu-shortcut-content.component';


@Component({
  selector: 'codelab-menu-shortcut-widget',
  templateUrl: './menu-shortcut-widget.component.html',
  styleUrls: ['./menu-shortcut-widget.component.css']
})
export class MenuShortcutWidgetComponent {

  constructor(
    private overlay: Overlay,
    private el: ElementRef,
  ) {
  }

  open() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.el).withPositions([
        {
          originX: 'center',
          overlayX: 'center',
          originY: 'top',
          overlayY: 'bottom',
        },
      ]);
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy
    });
    const overlayRef = this.overlay.create(overlayConfig);
    const portal = new ComponentPortal(MenuShortcutContentComponent);

    overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }


}
