/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, NgZone, ViewChild, ViewEncapsulation, } from '@angular/core';
import { matSnackBarAnimations } from './snack-bar-animations';
import { BasePortalOutlet, CdkPortalOutlet, } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { take } from 'rxjs/operators';
import { MatSnackBarConfig } from './snack-bar-config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
import * as i2 from "./snack-bar-config";
import * as i3 from "@angular/cdk/portal";
/**
 * Base class for snack bar containers.
 * @docs-private
 */
export class _MatSnackBarContainerBase extends BasePortalOutlet {
    constructor(_ngZone, _elementRef, _changeDetectorRef, _platform, 
    /** The snack bar configuration. */
    snackBarConfig) {
        super();
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._platform = _platform;
        this.snackBarConfig = snackBarConfig;
        /** The number of milliseconds to wait before announcing the snack bar's content. */
        this._announceDelay = 150;
        /** Whether the component has been destroyed. */
        this._destroyed = false;
        /** Subject for notifying that the snack bar has announced to screen readers. */
        this._onAnnounce = new Subject();
        /** Subject for notifying that the snack bar has exited from view. */
        this._onExit = new Subject();
        /** Subject for notifying that the snack bar has finished entering the view. */
        this._onEnter = new Subject();
        /** The state of the snack bar animations. */
        this._animationState = 'void';
        /**
         * Attaches a DOM portal to the snack bar container.
         * @deprecated To be turned into a method.
         * @breaking-change 10.0.0
         */
        this.attachDomPortal = (portal) => {
            this._assertNotAttached();
            const result = this._portalOutlet.attachDomPortal(portal);
            this._afterPortalAttached();
            return result;
        };
        // Use aria-live rather than a live role like 'alert' or 'status'
        // because NVDA and JAWS have show inconsistent behavior with live roles.
        if (snackBarConfig.politeness === 'assertive' && !snackBarConfig.announcementMessage) {
            this._live = 'assertive';
        }
        else if (snackBarConfig.politeness === 'off') {
            this._live = 'off';
        }
        else {
            this._live = 'polite';
        }
        // Only set role for Firefox. Set role based on aria-live because setting role="alert" implies
        // aria-live="assertive" which may cause issues if aria-live is set to "polite" above.
        if (this._platform.FIREFOX) {
            if (this._live === 'polite') {
                this._role = 'status';
            }
            if (this._live === 'assertive') {
                this._role = 'alert';
            }
        }
    }
    /** Attach a component portal as content to this snack bar container. */
    attachComponentPortal(portal) {
        this._assertNotAttached();
        const result = this._portalOutlet.attachComponentPortal(portal);
        this._afterPortalAttached();
        return result;
    }
    /** Attach a template portal as content to this snack bar container. */
    attachTemplatePortal(portal) {
        this._assertNotAttached();
        const result = this._portalOutlet.attachTemplatePortal(portal);
        this._afterPortalAttached();
        return result;
    }
    /** Handle end of animations, updating the state of the snackbar. */
    onAnimationEnd(event) {
        const { fromState, toState } = event;
        if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
            this._completeExit();
        }
        if (toState === 'visible') {
            // Note: we shouldn't use `this` inside the zone callback,
            // because it can cause a memory leak.
            const onEnter = this._onEnter;
            this._ngZone.run(() => {
                onEnter.next();
                onEnter.complete();
            });
        }
    }
    /** Begin animation of snack bar entrance into view. */
    enter() {
        if (!this._destroyed) {
            this._animationState = 'visible';
            this._changeDetectorRef.detectChanges();
            this._screenReaderAnnounce();
        }
    }
    /** Begin animation of the snack bar exiting from view. */
    exit() {
        // It's common for snack bars to be opened by random outside calls like HTTP requests or
        // errors. Run inside the NgZone to ensure that it functions correctly.
        this._ngZone.run(() => {
            // Note: this one transitions to `hidden`, rather than `void`, in order to handle the case
            // where multiple snack bars are opened in quick succession (e.g. two consecutive calls to
            // `MatSnackBar.open`).
            this._animationState = 'hidden';
            // Mark this element with an 'exit' attribute to indicate that the snackbar has
            // been dismissed and will soon be removed from the DOM. This is used by the snackbar
            // test harness.
            this._elementRef.nativeElement.setAttribute('mat-exit', '');
            // If the snack bar hasn't been announced by the time it exits it wouldn't have been open
            // long enough to visually read it either, so clear the timeout for announcing.
            clearTimeout(this._announceTimeoutId);
        });
        return this._onExit;
    }
    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    ngOnDestroy() {
        this._destroyed = true;
        this._completeExit();
    }
    /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     */
    _completeExit() {
        this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
            this._ngZone.run(() => {
                this._onExit.next();
                this._onExit.complete();
            });
        });
    }
    /**
     * Called after the portal contents have been attached. Can be
     * used to modify the DOM once it's guaranteed to be in place.
     */
    _afterPortalAttached() {
        const element = this._elementRef.nativeElement;
        const panelClasses = this.snackBarConfig.panelClass;
        if (panelClasses) {
            if (Array.isArray(panelClasses)) {
                // Note that we can't use a spread here, because IE doesn't support multiple arguments.
                panelClasses.forEach(cssClass => element.classList.add(cssClass));
            }
            else {
                element.classList.add(panelClasses);
            }
        }
    }
    /** Asserts that no content is already attached to the container. */
    _assertNotAttached() {
        if (this._portalOutlet.hasAttached() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('Attempting to attach snack bar content after content is already attached');
        }
    }
    /**
     * Starts a timeout to move the snack bar content to the live region so screen readers will
     * announce it.
     */
    _screenReaderAnnounce() {
        if (!this._announceTimeoutId) {
            this._ngZone.runOutsideAngular(() => {
                this._announceTimeoutId = setTimeout(() => {
                    const inertElement = this._elementRef.nativeElement.querySelector('[aria-hidden]');
                    const liveElement = this._elementRef.nativeElement.querySelector('[aria-live]');
                    if (inertElement && liveElement) {
                        // If an element in the snack bar content is focused before being moved
                        // track it and restore focus after moving to the live region.
                        let focusedElement = null;
                        if (this._platform.isBrowser &&
                            document.activeElement instanceof HTMLElement &&
                            inertElement.contains(document.activeElement)) {
                            focusedElement = document.activeElement;
                        }
                        inertElement.removeAttribute('aria-hidden');
                        liveElement.appendChild(inertElement);
                        focusedElement?.focus();
                        this._onAnnounce.next();
                        this._onAnnounce.complete();
                    }
                }, this._announceDelay);
            });
        }
    }
}
_MatSnackBarContainerBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatSnackBarContainerBase, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.Platform }, { token: i2.MatSnackBarConfig }], target: i0.ɵɵFactoryTarget.Directive });
_MatSnackBarContainerBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _MatSnackBarContainerBase, viewQueries: [{ propertyName: "_portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatSnackBarContainerBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.Platform }, { type: i2.MatSnackBarConfig }]; }, propDecorators: { _portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }] } });
/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
export class MatSnackBarContainer extends _MatSnackBarContainerBase {
    /** Applies the correct CSS class to the label based on its content. */
    _afterPortalAttached() {
        super._afterPortalAttached();
        // Check to see if the attached component or template uses the MDC template structure,
        // specifically the MDC label. If not, the container should apply the MDC label class to this
        // component's label container, which will apply MDC's label styles to the attached view.
        const label = this._label.nativeElement;
        const labelClass = 'mdc-snackbar__label';
        label.classList.toggle(labelClass, !label.querySelector(`.${labelClass}`));
    }
}
MatSnackBarContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSnackBarContainer, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatSnackBarContainer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatSnackBarContainer, selector: "mat-snack-bar-container", host: { listeners: { "@state.done": "onAnimationEnd($event)" }, properties: { "@state": "_animationState" }, classAttribute: "mdc-snackbar mat-mdc-snack-bar-container mdc-snackbar--open" }, viewQueries: [{ propertyName: "_label", first: true, predicate: ["label"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"mdc-snackbar__surface\">\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <!-- Initialy holds the snack bar content, will be empty after announcing to screen readers. -->\n    <div aria-hidden=\"true\">\n      <ng-template cdkPortalOutlet></ng-template>\n    </div>\n\n    <!-- Will receive the snack bar content from the non-live div, move will happen a short delay after opening -->\n    <div [attr.aria-live]=\"_live\" [attr.role]=\"_role\"></div>\n  </div>\n</div>\n", styles: [".mdc-snackbar{display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-snackbar__surface::before{border-color:CanvasText}}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{margin:8px;position:static}.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:100%}}.mat-mdc-snack-bar-container .mdc-snackbar__surface{max-width:672px}.mat-mdc-snack-bar-container .mdc-snackbar__surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-snack-bar-container .mdc-snackbar__dismiss .mdc-button__icon{font-size:var(--mdc-icon-button-icon-size, 24px)}.mat-mdc-snack-bar-container .mdc-snackbar__dismiss svg,.mat-mdc-snack-bar-container .mdc-snackbar__dismiss img{width:var(--mdc-icon-button-icon-size, 24px);height:var(--mdc-icon-button-icon-size, 24px)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{background-color:var(--mdc-snackbar-container-color, inherit)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{border-radius:var(--mdc-snackbar-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-snack-bar-container .mdc-snackbar__label{color:var(--mdc-snackbar-supporting-text-color, inherit)}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-size:var(--mdc-snackbar-supporting-text-size, inherit);font-family:var(--mdc-snackbar-supporting-text-font, inherit);font-weight:var(--mdc-snackbar-supporting-text-weight, inherit);line-height:var(--mdc-snackbar-supporting-text-line-height, inherit)}.cdk-high-contrast-active .mat-mdc-snack-bar-container{border:solid 1px}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-mdc-snack-bar-button-color, transparent);--mat-mdc-button-persistent-ripple-color: currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{background-color:currentColor;opacity:.1}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}"], dependencies: [{ kind: "directive", type: i3.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [matSnackBarAnimations.snackBarState], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSnackBarContainer, decorators: [{
            type: Component,
            args: [{ selector: 'mat-snack-bar-container', changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, animations: [matSnackBarAnimations.snackBarState], host: {
                        'class': 'mdc-snackbar mat-mdc-snack-bar-container mdc-snackbar--open',
                        '[@state]': '_animationState',
                        '(@state.done)': 'onAnimationEnd($event)',
                    }, template: "<div class=\"mdc-snackbar__surface\">\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <!-- Initialy holds the snack bar content, will be empty after announcing to screen readers. -->\n    <div aria-hidden=\"true\">\n      <ng-template cdkPortalOutlet></ng-template>\n    </div>\n\n    <!-- Will receive the snack bar content from the non-live div, move will happen a short delay after opening -->\n    <div [attr.aria-live]=\"_live\" [attr.role]=\"_role\"></div>\n  </div>\n</div>\n", styles: [".mdc-snackbar{display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-snackbar__surface::before{border-color:CanvasText}}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{margin:8px;position:static}.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:100%}}.mat-mdc-snack-bar-container .mdc-snackbar__surface{max-width:672px}.mat-mdc-snack-bar-container .mdc-snackbar__surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-snack-bar-container .mdc-snackbar__dismiss .mdc-button__icon{font-size:var(--mdc-icon-button-icon-size, 24px)}.mat-mdc-snack-bar-container .mdc-snackbar__dismiss svg,.mat-mdc-snack-bar-container .mdc-snackbar__dismiss img{width:var(--mdc-icon-button-icon-size, 24px);height:var(--mdc-icon-button-icon-size, 24px)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{background-color:var(--mdc-snackbar-container-color, inherit)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{border-radius:var(--mdc-snackbar-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-snack-bar-container .mdc-snackbar__label{color:var(--mdc-snackbar-supporting-text-color, inherit)}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-size:var(--mdc-snackbar-supporting-text-size, inherit);font-family:var(--mdc-snackbar-supporting-text-font, inherit);font-weight:var(--mdc-snackbar-supporting-text-weight, inherit);line-height:var(--mdc-snackbar-supporting-text-line-height, inherit)}.cdk-high-contrast-active .mat-mdc-snack-bar-container{border:solid 1px}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-mdc-snack-bar-button-color, transparent);--mat-mdc-button-persistent-ripple-color: currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{background-color:currentColor;opacity:.1}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}"] }]
        }], propDecorators: { _label: [{
                type: ViewChild,
                args: ['label', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zbmFjay1iYXIvc25hY2stYmFyLWNvbnRhaW5lci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zbmFjay1iYXIvc25hY2stYmFyLWNvbnRhaW5lci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxTQUFTLEVBQ1QsVUFBVSxFQUVWLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxHQUloQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFekMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRS9DLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7QUFFckQ7OztHQUdHO0FBRUgsTUFBTSxPQUFnQix5QkFBMEIsU0FBUSxnQkFBZ0I7SUFrQ3RFLFlBQ1UsT0FBZSxFQUNiLFdBQW9DLEVBQ3RDLGtCQUFxQyxFQUNyQyxTQUFtQjtJQUMzQixtQ0FBbUM7SUFDNUIsY0FBaUM7UUFFeEMsS0FBSyxFQUFFLENBQUM7UUFQQSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2IsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsY0FBUyxHQUFULFNBQVMsQ0FBVTtR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Q3JDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTdCLHNGQUFzRjtRQUN0Riw2RkFBNkY7UUFDN0YseUZBQXlGO1FBQ3pGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLHFCQUFxQixDQUFDO1FBQ3pDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7c0hBbEJVLG9CQUFvQjswR0FBcEIsb0JBQW9CLG1ZQ2hTakMsdW9CQWVBLCs1SEQwUWMsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUM7Z0dBT3RDLG9CQUFvQjtrQkFqQmhDLFNBQVM7K0JBQ0UseUJBQXlCLG1CQU9sQix1QkFBdUIsQ0FBQyxPQUFPLGlCQUNqQyxpQkFBaUIsQ0FBQyxJQUFJLGNBQ3pCLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLFFBQzNDO3dCQUNKLE9BQU8sRUFBRSw2REFBNkQ7d0JBQ3RFLFVBQVUsRUFBRSxpQkFBaUI7d0JBQzdCLGVBQWUsRUFBRSx3QkFBd0I7cUJBQzFDOzhCQVFtQyxNQUFNO3NCQUF6QyxTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7bWF0U25hY2tCYXJBbmltYXRpb25zfSBmcm9tICcuL3NuYWNrLWJhci1hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEJhc2VQb3J0YWxPdXRsZXQsXG4gIENka1BvcnRhbE91dGxldCxcbiAgQ29tcG9uZW50UG9ydGFsLFxuICBEb21Qb3J0YWwsXG4gIFRlbXBsYXRlUG9ydGFsLFxufSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0FyaWFMaXZlUG9saXRlbmVzc30gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7QW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHt0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdFNuYWNrQmFyQ29uZmlnfSBmcm9tICcuL3NuYWNrLWJhci1jb25maWcnO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIHNuYWNrIGJhciBjb250YWluZXJzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBfTWF0U25hY2tCYXJDb250YWluZXJCYXNlIGV4dGVuZHMgQmFzZVBvcnRhbE91dGxldCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBhbm5vdW5jaW5nIHRoZSBzbmFjayBiYXIncyBjb250ZW50LiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9hbm5vdW5jZURlbGF5OiBudW1iZXIgPSAxNTA7XG5cbiAgLyoqIFRoZSB0aW1lb3V0IGZvciBhbm5vdW5jaW5nIHRoZSBzbmFjayBiYXIncyBjb250ZW50LiAqL1xuICBwcml2YXRlIF9hbm5vdW5jZVRpbWVvdXRJZDogbnVtYmVyO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICBwcml2YXRlIF9kZXN0cm95ZWQgPSBmYWxzZTtcblxuICAvKiogVGhlIHBvcnRhbCBvdXRsZXQgaW5zaWRlIG9mIHRoaXMgY29udGFpbmVyIGludG8gd2hpY2ggdGhlIHNuYWNrIGJhciBjb250ZW50IHdpbGwgYmUgbG9hZGVkLiAqL1xuICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwge3N0YXRpYzogdHJ1ZX0pIF9wb3J0YWxPdXRsZXQ6IENka1BvcnRhbE91dGxldDtcblxuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHNuYWNrIGJhciBoYXMgYW5ub3VuY2VkIHRvIHNjcmVlbiByZWFkZXJzLiAqL1xuICByZWFkb25seSBfb25Bbm5vdW5jZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSBzbmFjayBiYXIgaGFzIGV4aXRlZCBmcm9tIHZpZXcuICovXG4gIHJlYWRvbmx5IF9vbkV4aXQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgc25hY2sgYmFyIGhhcyBmaW5pc2hlZCBlbnRlcmluZyB0aGUgdmlldy4gKi9cbiAgcmVhZG9ubHkgX29uRW50ZXI6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKiBUaGUgc3RhdGUgb2YgdGhlIHNuYWNrIGJhciBhbmltYXRpb25zLiAqL1xuICBfYW5pbWF0aW9uU3RhdGUgPSAndm9pZCc7XG5cbiAgLyoqIGFyaWEtbGl2ZSB2YWx1ZSBmb3IgdGhlIGxpdmUgcmVnaW9uLiAqL1xuICBfbGl2ZTogQXJpYUxpdmVQb2xpdGVuZXNzO1xuXG4gIC8qKlxuICAgKiBSb2xlIG9mIHRoZSBsaXZlIHJlZ2lvbi4gVGhpcyBpcyBvbmx5IGZvciBGaXJlZm94IGFzIHRoZXJlIGlzIGEga25vd24gaXNzdWUgd2hlcmUgRmlyZWZveCArXG4gICAqIEpBV1MgZG9lcyBub3QgcmVhZCBvdXQgYXJpYS1saXZlIG1lc3NhZ2UuXG4gICAqL1xuICBfcm9sZT86ICdzdGF0dXMnIHwgJ2FsZXJ0JztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgLyoqIFRoZSBzbmFjayBiYXIgY29uZmlndXJhdGlvbi4gKi9cbiAgICBwdWJsaWMgc25hY2tCYXJDb25maWc6IE1hdFNuYWNrQmFyQ29uZmlnLFxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gVXNlIGFyaWEtbGl2ZSByYXRoZXIgdGhhbiBhIGxpdmUgcm9sZSBsaWtlICdhbGVydCcgb3IgJ3N0YXR1cydcbiAgICAvLyBiZWNhdXNlIE5WREEgYW5kIEpBV1MgaGF2ZSBzaG93IGluY29uc2lzdGVudCBiZWhhdmlvciB3aXRoIGxpdmUgcm9sZXMuXG4gICAgaWYgKHNuYWNrQmFyQ29uZmlnLnBvbGl0ZW5lc3MgPT09ICdhc3NlcnRpdmUnICYmICFzbmFja0JhckNvbmZpZy5hbm5vdW5jZW1lbnRNZXNzYWdlKSB7XG4gICAgICB0aGlzLl9saXZlID0gJ2Fzc2VydGl2ZSc7XG4gICAgfSBlbHNlIGlmIChzbmFja0JhckNvbmZpZy5wb2xpdGVuZXNzID09PSAnb2ZmJykge1xuICAgICAgdGhpcy5fbGl2ZSA9ICdvZmYnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXZlID0gJ3BvbGl0ZSc7XG4gICAgfVxuXG4gICAgLy8gT25seSBzZXQgcm9sZSBmb3IgRmlyZWZveC4gU2V0IHJvbGUgYmFzZWQgb24gYXJpYS1saXZlIGJlY2F1c2Ugc2V0dGluZyByb2xlPVwiYWxlcnRcIiBpbXBsaWVzXG4gICAgLy8gYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCIgd2hpY2ggbWF5IGNhdXNlIGlzc3VlcyBpZiBhcmlhLWxpdmUgaXMgc2V0IHRvIFwicG9saXRlXCIgYWJvdmUuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLkZJUkVGT1gpIHtcbiAgICAgIGlmICh0aGlzLl9saXZlID09PSAncG9saXRlJykge1xuICAgICAgICB0aGlzLl9yb2xlID0gJ3N0YXR1cyc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fbGl2ZSA9PT0gJ2Fzc2VydGl2ZScpIHtcbiAgICAgICAgdGhpcy5fcm9sZSA9ICdhbGVydCc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEF0dGFjaCBhIGNvbXBvbmVudCBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNuYWNrIGJhciBjb250YWluZXIuICovXG4gIGF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxUPik6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgdGhpcy5fYXNzZXJ0Tm90QXR0YWNoZWQoKTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9wb3J0YWxPdXRsZXQuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG4gICAgdGhpcy5fYWZ0ZXJQb3J0YWxBdHRhY2hlZCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogQXR0YWNoIGEgdGVtcGxhdGUgcG9ydGFsIGFzIGNvbnRlbnQgdG8gdGhpcyBzbmFjayBiYXIgY29udGFpbmVyLiAqL1xuICBhdHRhY2hUZW1wbGF0ZVBvcnRhbDxDPihwb3J0YWw6IFRlbXBsYXRlUG9ydGFsPEM+KTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcbiAgICB0aGlzLl9hc3NlcnROb3RBdHRhY2hlZCgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3BvcnRhbE91dGxldC5hdHRhY2hUZW1wbGF0ZVBvcnRhbChwb3J0YWwpO1xuICAgIHRoaXMuX2FmdGVyUG9ydGFsQXR0YWNoZWQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIGEgRE9NIHBvcnRhbCB0byB0aGUgc25hY2sgYmFyIGNvbnRhaW5lci5cbiAgICogQGRlcHJlY2F0ZWQgVG8gYmUgdHVybmVkIGludG8gYSBtZXRob2QuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wXG4gICAqL1xuICBvdmVycmlkZSBhdHRhY2hEb21Qb3J0YWwgPSAocG9ydGFsOiBEb21Qb3J0YWwpID0+IHtcbiAgICB0aGlzLl9hc3NlcnROb3RBdHRhY2hlZCgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3BvcnRhbE91dGxldC5hdHRhY2hEb21Qb3J0YWwocG9ydGFsKTtcbiAgICB0aGlzLl9hZnRlclBvcnRhbEF0dGFjaGVkKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvKiogSGFuZGxlIGVuZCBvZiBhbmltYXRpb25zLCB1cGRhdGluZyB0aGUgc3RhdGUgb2YgdGhlIHNuYWNrYmFyLiAqL1xuICBvbkFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICBjb25zdCB7ZnJvbVN0YXRlLCB0b1N0YXRlfSA9IGV2ZW50O1xuXG4gICAgaWYgKCh0b1N0YXRlID09PSAndm9pZCcgJiYgZnJvbVN0YXRlICE9PSAndm9pZCcpIHx8IHRvU3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICB0aGlzLl9jb21wbGV0ZUV4aXQoKTtcbiAgICB9XG5cbiAgICBpZiAodG9TdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAvLyBOb3RlOiB3ZSBzaG91bGRuJ3QgdXNlIGB0aGlzYCBpbnNpZGUgdGhlIHpvbmUgY2FsbGJhY2ssXG4gICAgICAvLyBiZWNhdXNlIGl0IGNhbiBjYXVzZSBhIG1lbW9yeSBsZWFrLlxuICAgICAgY29uc3Qgb25FbnRlciA9IHRoaXMuX29uRW50ZXI7XG5cbiAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBvbkVudGVyLm5leHQoKTtcbiAgICAgICAgb25FbnRlci5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEJlZ2luIGFuaW1hdGlvbiBvZiBzbmFjayBiYXIgZW50cmFuY2UgaW50byB2aWV3LiAqL1xuICBlbnRlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uU3RhdGUgPSAndmlzaWJsZSc7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLl9zY3JlZW5SZWFkZXJBbm5vdW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBCZWdpbiBhbmltYXRpb24gb2YgdGhlIHNuYWNrIGJhciBleGl0aW5nIGZyb20gdmlldy4gKi9cbiAgZXhpdCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAvLyBJdCdzIGNvbW1vbiBmb3Igc25hY2sgYmFycyB0byBiZSBvcGVuZWQgYnkgcmFuZG9tIG91dHNpZGUgY2FsbHMgbGlrZSBIVFRQIHJlcXVlc3RzIG9yXG4gICAgLy8gZXJyb3JzLiBSdW4gaW5zaWRlIHRoZSBOZ1pvbmUgdG8gZW5zdXJlIHRoYXQgaXQgZnVuY3Rpb25zIGNvcnJlY3RseS5cbiAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgIC8vIE5vdGU6IHRoaXMgb25lIHRyYW5zaXRpb25zIHRvIGBoaWRkZW5gLCByYXRoZXIgdGhhbiBgdm9pZGAsIGluIG9yZGVyIHRvIGhhbmRsZSB0aGUgY2FzZVxuICAgICAgLy8gd2hlcmUgbXVsdGlwbGUgc25hY2sgYmFycyBhcmUgb3BlbmVkIGluIHF1aWNrIHN1Y2Nlc3Npb24gKGUuZy4gdHdvIGNvbnNlY3V0aXZlIGNhbGxzIHRvXG4gICAgICAvLyBgTWF0U25hY2tCYXIub3BlbmApLlxuICAgICAgdGhpcy5fYW5pbWF0aW9uU3RhdGUgPSAnaGlkZGVuJztcblxuICAgICAgLy8gTWFyayB0aGlzIGVsZW1lbnQgd2l0aCBhbiAnZXhpdCcgYXR0cmlidXRlIHRvIGluZGljYXRlIHRoYXQgdGhlIHNuYWNrYmFyIGhhc1xuICAgICAgLy8gYmVlbiBkaXNtaXNzZWQgYW5kIHdpbGwgc29vbiBiZSByZW1vdmVkIGZyb20gdGhlIERPTS4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBzbmFja2JhclxuICAgICAgLy8gdGVzdCBoYXJuZXNzLlxuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWF0LWV4aXQnLCAnJyk7XG5cbiAgICAgIC8vIElmIHRoZSBzbmFjayBiYXIgaGFzbid0IGJlZW4gYW5ub3VuY2VkIGJ5IHRoZSB0aW1lIGl0IGV4aXRzIGl0IHdvdWxkbid0IGhhdmUgYmVlbiBvcGVuXG4gICAgICAvLyBsb25nIGVub3VnaCB0byB2aXN1YWxseSByZWFkIGl0IGVpdGhlciwgc28gY2xlYXIgdGhlIHRpbWVvdXQgZm9yIGFubm91bmNpbmcuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fYW5ub3VuY2VUaW1lb3V0SWQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX29uRXhpdDtcbiAgfVxuXG4gIC8qKiBNYWtlcyBzdXJlIHRoZSBleGl0IGNhbGxiYWNrcyBoYXZlIGJlZW4gaW52b2tlZCB3aGVuIHRoZSBlbGVtZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB0aGlzLl9jb21wbGV0ZUV4aXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXYWl0cyBmb3IgdGhlIHpvbmUgdG8gc2V0dGxlIGJlZm9yZSByZW1vdmluZyB0aGUgZWxlbWVudC4gSGVscHMgcHJldmVudFxuICAgKiBlcnJvcnMgd2hlcmUgd2UgZW5kIHVwIHJlbW92aW5nIGFuIGVsZW1lbnQgd2hpY2ggaXMgaW4gdGhlIG1pZGRsZSBvZiBhbiBhbmltYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9jb21wbGV0ZUV4aXQoKSB7XG4gICAgdGhpcy5fbmdab25lLm9uTWljcm90YXNrRW1wdHkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuX29uRXhpdC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRXhpdC5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGFmdGVyIHRoZSBwb3J0YWwgY29udGVudHMgaGF2ZSBiZWVuIGF0dGFjaGVkLiBDYW4gYmVcbiAgICogdXNlZCB0byBtb2RpZnkgdGhlIERPTSBvbmNlIGl0J3MgZ3VhcmFudGVlZCB0byBiZSBpbiBwbGFjZS5cbiAgICovXG4gIHByb3RlY3RlZCBfYWZ0ZXJQb3J0YWxBdHRhY2hlZCgpIHtcbiAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBwYW5lbENsYXNzZXMgPSB0aGlzLnNuYWNrQmFyQ29uZmlnLnBhbmVsQ2xhc3M7XG5cbiAgICBpZiAocGFuZWxDbGFzc2VzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYW5lbENsYXNzZXMpKSB7XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4ndCB1c2UgYSBzcHJlYWQgaGVyZSwgYmVjYXVzZSBJRSBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgYXJndW1lbnRzLlxuICAgICAgICBwYW5lbENsYXNzZXMuZm9yRWFjaChjc3NDbGFzcyA9PiBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChwYW5lbENsYXNzZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBBc3NlcnRzIHRoYXQgbm8gY29udGVudCBpcyBhbHJlYWR5IGF0dGFjaGVkIHRvIHRoZSBjb250YWluZXIuICovXG4gIHByaXZhdGUgX2Fzc2VydE5vdEF0dGFjaGVkKCkge1xuICAgIGlmICh0aGlzLl9wb3J0YWxPdXRsZXQuaGFzQXR0YWNoZWQoKSAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0F0dGVtcHRpbmcgdG8gYXR0YWNoIHNuYWNrIGJhciBjb250ZW50IGFmdGVyIGNvbnRlbnQgaXMgYWxyZWFkeSBhdHRhY2hlZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYSB0aW1lb3V0IHRvIG1vdmUgdGhlIHNuYWNrIGJhciBjb250ZW50IHRvIHRoZSBsaXZlIHJlZ2lvbiBzbyBzY3JlZW4gcmVhZGVycyB3aWxsXG4gICAqIGFubm91bmNlIGl0LlxuICAgKi9cbiAgcHJpdmF0ZSBfc2NyZWVuUmVhZGVyQW5ub3VuY2UoKSB7XG4gICAgaWYgKCF0aGlzLl9hbm5vdW5jZVRpbWVvdXRJZCkge1xuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5fYW5ub3VuY2VUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBpbmVydEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtaGlkZGVuXScpO1xuICAgICAgICAgIGNvbnN0IGxpdmVFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWxpdmVdJyk7XG5cbiAgICAgICAgICBpZiAoaW5lcnRFbGVtZW50ICYmIGxpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBJZiBhbiBlbGVtZW50IGluIHRoZSBzbmFjayBiYXIgY29udGVudCBpcyBmb2N1c2VkIGJlZm9yZSBiZWluZyBtb3ZlZFxuICAgICAgICAgICAgLy8gdHJhY2sgaXQgYW5kIHJlc3RvcmUgZm9jdXMgYWZ0ZXIgbW92aW5nIHRvIHRoZSBsaXZlIHJlZ2lvbi5cbiAgICAgICAgICAgIGxldCBmb2N1c2VkRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyICYmXG4gICAgICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxuICAgICAgICAgICAgICBpbmVydEVsZW1lbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZXJ0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgICAgICBsaXZlRWxlbWVudC5hcHBlbmRDaGlsZChpbmVydEVsZW1lbnQpO1xuICAgICAgICAgICAgZm9jdXNlZEVsZW1lbnQ/LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX29uQW5ub3VuY2UubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5fb25Bbm5vdW5jZS5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5fYW5ub3VuY2VEZWxheSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBJbnRlcm5hbCBjb21wb25lbnQgdGhhdCB3cmFwcyB1c2VyLXByb3ZpZGVkIHNuYWNrIGJhciBjb250ZW50LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc25hY2stYmFyLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnc25hY2stYmFyLWNvbnRhaW5lci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NuYWNrLWJhci1jb250YWluZXIuY3NzJ10sXG4gIC8vIEluIEl2eSBlbWJlZGRlZCB2aWV3cyB3aWxsIGJlIGNoYW5nZSBkZXRlY3RlZCBmcm9tIHRoZWlyIGRlY2xhcmF0aW9uIHBsYWNlLCByYXRoZXIgdGhhblxuICAvLyB3aGVyZSB0aGV5IHdlcmUgc3RhbXBlZCBvdXQuIFRoaXMgbWVhbnMgdGhhdCB3ZSBjYW4ndCBoYXZlIHRoZSBzbmFjayBiYXIgY29udGFpbmVyIGJlIE9uUHVzaCxcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBjYXVzZSBzbmFjayBiYXJzIHRoYXQgd2VyZSBvcGVuZWQgZnJvbSBhIHRlbXBsYXRlIG5vdCB0byBiZSBvdXQgb2YgZGF0ZS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBhbmltYXRpb25zOiBbbWF0U25hY2tCYXJBbmltYXRpb25zLnNuYWNrQmFyU3RhdGVdLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1zbmFja2JhciBtYXQtbWRjLXNuYWNrLWJhci1jb250YWluZXIgbWRjLXNuYWNrYmFyLS1vcGVuJyxcbiAgICAnW0BzdGF0ZV0nOiAnX2FuaW1hdGlvblN0YXRlJyxcbiAgICAnKEBzdGF0ZS5kb25lKSc6ICdvbkFuaW1hdGlvbkVuZCgkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U25hY2tCYXJDb250YWluZXIgZXh0ZW5kcyBfTWF0U25hY2tCYXJDb250YWluZXJCYXNlIHtcbiAgLyoqXG4gICAqIEVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIGBtZGMtc25hY2tiYXJfX2xhYmVsYCBjbGFzcyBhcHBsaWVkIGlmIHRoZSBhdHRhY2hlZCBjb21wb25lbnRcbiAgICogb3IgdGVtcGxhdGUgZG9lcyBub3QgaGF2ZSBpdC4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIGFwcHJvcHJpYXRlIHN0cnVjdHVyZSwgdHlwb2dyYXBoeSwgYW5kXG4gICAqIGNvbG9yIGlzIGFwcGxpZWQgdG8gdGhlIGF0dGFjaGVkIHZpZXcuXG4gICAqL1xuICBAVmlld0NoaWxkKCdsYWJlbCcsIHtzdGF0aWM6IHRydWV9KSBfbGFiZWw6IEVsZW1lbnRSZWY7XG5cbiAgLyoqIEFwcGxpZXMgdGhlIGNvcnJlY3QgQ1NTIGNsYXNzIHRvIHRoZSBsYWJlbCBiYXNlZCBvbiBpdHMgY29udGVudC4gKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9hZnRlclBvcnRhbEF0dGFjaGVkKCkge1xuICAgIHN1cGVyLl9hZnRlclBvcnRhbEF0dGFjaGVkKCk7XG5cbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGF0dGFjaGVkIGNvbXBvbmVudCBvciB0ZW1wbGF0ZSB1c2VzIHRoZSBNREMgdGVtcGxhdGUgc3RydWN0dXJlLFxuICAgIC8vIHNwZWNpZmljYWxseSB0aGUgTURDIGxhYmVsLiBJZiBub3QsIHRoZSBjb250YWluZXIgc2hvdWxkIGFwcGx5IHRoZSBNREMgbGFiZWwgY2xhc3MgdG8gdGhpc1xuICAgIC8vIGNvbXBvbmVudCdzIGxhYmVsIGNvbnRhaW5lciwgd2hpY2ggd2lsbCBhcHBseSBNREMncyBsYWJlbCBzdHlsZXMgdG8gdGhlIGF0dGFjaGVkIHZpZXcuXG4gICAgY29uc3QgbGFiZWwgPSB0aGlzLl9sYWJlbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGxhYmVsQ2xhc3MgPSAnbWRjLXNuYWNrYmFyX19sYWJlbCc7XG4gICAgbGFiZWwuY2xhc3NMaXN0LnRvZ2dsZShsYWJlbENsYXNzLCAhbGFiZWwucXVlcnlTZWxlY3RvcihgLiR7bGFiZWxDbGFzc31gKSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtZGMtc25hY2tiYXJfX3N1cmZhY2VcIj5cbiAgPCEtLVxuICAgIFRoaXMgb3V0ZXIgbGFiZWwgd3JhcHBlciB3aWxsIGhhdmUgdGhlIGNsYXNzIGBtZGMtc25hY2tiYXJfX2xhYmVsYCBhcHBsaWVkIGlmXG4gICAgdGhlIGF0dGFjaGVkIHRlbXBsYXRlL2NvbXBvbmVudCBkb2VzIG5vdCBjb250YWluIGl0LlxuICAtLT5cbiAgPGRpdiBjbGFzcz1cIm1hdC1tZGMtc25hY2stYmFyLWxhYmVsXCIgI2xhYmVsPlxuICAgIDwhLS0gSW5pdGlhbHkgaG9sZHMgdGhlIHNuYWNrIGJhciBjb250ZW50LCB3aWxsIGJlIGVtcHR5IGFmdGVyIGFubm91bmNpbmcgdG8gc2NyZWVuIHJlYWRlcnMuIC0tPlxuICAgIDxkaXYgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgY2RrUG9ydGFsT3V0bGV0PjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFdpbGwgcmVjZWl2ZSB0aGUgc25hY2sgYmFyIGNvbnRlbnQgZnJvbSB0aGUgbm9uLWxpdmUgZGl2LCBtb3ZlIHdpbGwgaGFwcGVuIGEgc2hvcnQgZGVsYXkgYWZ0ZXIgb3BlbmluZyAtLT5cbiAgICA8ZGl2IFthdHRyLmFyaWEtbGl2ZV09XCJfbGl2ZVwiIFthdHRyLnJvbGVdPVwiX3JvbGVcIj48L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==