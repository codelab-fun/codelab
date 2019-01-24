import { Component, OnInit } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoginPanelComponent } from '../login-panel/login-panel.component';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'angular-presentation-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  constructor(private overlay: Overlay, private el: ElementRef) { }

  ngOnInit() {

  }

  open() {
    const positionStrategy = this.overlay.position()
      .connectedTo(this.el, {
        originY: 'top',
        originX: 'center'
      }, {
          overlayY: 'bottom',
          overlayX: 'center'
        });
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
