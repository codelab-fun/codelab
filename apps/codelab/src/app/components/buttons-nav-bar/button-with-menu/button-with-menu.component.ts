import { Component, ContentChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ButtonWithMenuModalDirective } from './button-with-menu-modal.directive';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'button-with-menu',
  templateUrl: './button-with-menu.component.html'
})
export class ButtonWithMenuComponent {

  @ContentChild(ButtonWithMenuModalDirective) modal;

  constructor(
    private _vcr: ViewContainerRef,
    readonly el: ElementRef,
    readonly overlay: Overlay
  ) {
  }

  open() {

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.el.nativeElement).withPositions([
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
    const portal = new TemplatePortal(this.modal.template, this._vcr, {
      $implicit: {
        close: () => {
          overlayRef.detach();
        }
      }
    });

    overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }

}
