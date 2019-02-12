import { Component, ElementRef } from '@angular/core';

import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { MenuGithubContentComponent } from '../menu-github-content/menu-github-content.component';


@Component({
  selector: 'codelab-menu-github-widget',
  templateUrl: './menu-github-widget.component.html',
  styleUrls: ['./menu-github-widget.component.css']
})
export class MenuGithubWidgetComponent {

  constructor(
    private overlay: Overlay,
    private el: ElementRef
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
    const portal = new ComponentPortal(MenuGithubContentComponent);

    overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }

}
