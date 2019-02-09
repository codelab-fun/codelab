import { Component, ElementRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoginPanelComponent } from '../login-panel/login-panel.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'codelab-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent {

  constructor(
    private overlay: Overlay,
    private el: ElementRef,
    private auth: AngularFireAuth) {
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
    const portal = new ComponentPortal(LoginPanelComponent);

    overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }

}
