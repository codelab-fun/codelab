import { Component, ElementRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoginContentComponent } from '../login-content/login-content.component';
import { LoginService } from '@codelab/firebase-login/src/lib/login.service';

@Component({
  selector: 'codelab-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent {

  constructor(
    private overlay: Overlay,
    private el: ElementRef,
    readonly  loginService: LoginService) {
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
    const portal = new ComponentPortal(LoginContentComponent);

    overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }

}
