/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf, TemplateRef, } from '@angular/core';
import { MatSnackBarModule } from './module';
import { SimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarContainer } from './snack-bar-container';
import { MAT_SNACK_BAR_DATA, MatSnackBarConfig } from './snack-bar-config';
import { MatSnackBarRef } from './snack-bar-ref';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/cdk/layout";
import * as i4 from "./snack-bar-config";
/** @docs-private */
export function MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY() {
    return new MatSnackBarConfig();
}
/** Injection token that can be used to specify default snack bar. */
export const MAT_SNACK_BAR_DEFAULT_OPTIONS = new InjectionToken('mat-snack-bar-default-options', {
    providedIn: 'root',
    factory: MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY,
});
export class _MatSnackBarBase {
    constructor(_overlay, _live, _injector, _breakpointObserver, _parentSnackBar, _defaultConfig) {
        this._overlay = _overlay;
        this._live = _live;
        this._injector = _injector;
        this._breakpointObserver = _breakpointObserver;
        this._parentSnackBar = _parentSnackBar;
        this._defaultConfig = _defaultConfig;
        /**
         * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
         * If there is a parent snack-bar service, all operations should delegate to that parent
         * via `_openedSnackBarRef`.
         */
        this._snackBarRefAtThisLevel = null;
    }
    /** Reference to the currently opened snackbar at *any* level. */
    get _openedSnackBarRef() {
        const parent = this._parentSnackBar;
        return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
    }
    set _openedSnackBarRef(value) {
        if (this._parentSnackBar) {
            this._parentSnackBar._openedSnackBarRef = value;
        }
        else {
            this._snackBarRefAtThisLevel = value;
        }
    }
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @param component Component to be instantiated.
     * @param config Extra configuration for the snack bar.
     */
    openFromComponent(component, config) {
        return this._attach(component, config);
    }
    /**
     * Creates and dispatches a snack bar with a custom template for the content, removing any
     * currently opened snack bars.
     *
     * @param template Template to be instantiated.
     * @param config Extra configuration for the snack bar.
     */
    openFromTemplate(template, config) {
        return this._attach(template, config);
    }
    /**
     * Opens a snackbar with a message and an optional action.
     * @param message The message to show in the snackbar.
     * @param action The label for the snackbar action.
     * @param config Additional configuration options for the snackbar.
     */
    open(message, action = '', config) {
        const _config = { ...this._defaultConfig, ...config };
        // Since the user doesn't have access to the component, we can
        // override the data to pass in our own message and action.
        _config.data = { message, action };
        // Since the snack bar has `role="alert"`, we don't
        // want to announce the same message twice.
        if (_config.announcementMessage === message) {
            _config.announcementMessage = undefined;
        }
        return this.openFromComponent(this.simpleSnackBarComponent, _config);
    }
    /**
     * Dismisses the currently-visible snack bar.
     */
    dismiss() {
        if (this._openedSnackBarRef) {
            this._openedSnackBarRef.dismiss();
        }
    }
    ngOnDestroy() {
        // Only dismiss the snack bar at the current level on destroy.
        if (this._snackBarRefAtThisLevel) {
            this._snackBarRefAtThisLevel.dismiss();
        }
    }
    /**
     * Attaches the snack bar container component to the overlay.
     */
    _attachSnackBarContainer(overlayRef, config) {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this._injector,
            providers: [{ provide: MatSnackBarConfig, useValue: config }],
        });
        const containerPortal = new ComponentPortal(this.snackBarContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.snackBarConfig = config;
        return containerRef.instance;
    }
    /**
     * Places a new component or a template as the content of the snack bar container.
     */
    _attach(content, userConfig) {
        const config = { ...new MatSnackBarConfig(), ...this._defaultConfig, ...userConfig };
        const overlayRef = this._createOverlay(config);
        const container = this._attachSnackBarContainer(overlayRef, config);
        const snackBarRef = new MatSnackBarRef(container, overlayRef);
        if (content instanceof TemplateRef) {
            const portal = new TemplatePortal(content, null, {
                $implicit: config.data,
                snackBarRef,
            });
            snackBarRef.instance = container.attachTemplatePortal(portal);
        }
        else {
            const injector = this._createInjector(config, snackBarRef);
            const portal = new ComponentPortal(content, undefined, injector);
            const contentRef = container.attachComponentPortal(portal);
            // We can't pass this via the injector, because the injector is created earlier.
            snackBarRef.instance = contentRef.instance;
        }
        // Subscribe to the breakpoint observer and attach the mat-snack-bar-handset class as
        // appropriate. This class is applied to the overlay element because the overlay must expand to
        // fill the width of the screen for full width snackbars.
        this._breakpointObserver
            .observe(Breakpoints.HandsetPortrait)
            .pipe(takeUntil(overlayRef.detachments()))
            .subscribe(state => {
            overlayRef.overlayElement.classList.toggle(this.handsetCssClass, state.matches);
        });
        if (config.announcementMessage) {
            // Wait until the snack bar contents have been announced then deliver this message.
            container._onAnnounce.subscribe(() => {
                this._live.announce(config.announcementMessage, config.politeness);
            });
        }
        this._animateSnackBar(snackBarRef, config);
        this._openedSnackBarRef = snackBarRef;
        return this._openedSnackBarRef;
    }
    /** Animates the old snack bar out and the new one in. */
    _animateSnackBar(snackBarRef, config) {
        // When the snackbar is dismissed, clear the reference to it.
        snackBarRef.afterDismissed().subscribe(() => {
            // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
            if (this._openedSnackBarRef == snackBarRef) {
                this._openedSnackBarRef = null;
            }
            if (config.announcementMessage) {
                this._live.clear();
            }
        });
        if (this._openedSnackBarRef) {
            // If a snack bar is already in view, dismiss it and enter the
            // new snack bar after exit animation is complete.
            this._openedSnackBarRef.afterDismissed().subscribe(() => {
                snackBarRef.containerInstance.enter();
            });
            this._openedSnackBarRef.dismiss();
        }
        else {
            // If no snack bar is in view, enter the new snack bar.
            snackBarRef.containerInstance.enter();
        }
        // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
        if (config.duration && config.duration > 0) {
            snackBarRef.afterOpened().subscribe(() => snackBarRef._dismissAfter(config.duration));
        }
    }
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified snack bar config.
     */
    _createOverlay(config) {
        const overlayConfig = new OverlayConfig();
        overlayConfig.direction = config.direction;
        let positionStrategy = this._overlay.position().global();
        // Set horizontal position.
        const isRtl = config.direction === 'rtl';
        const isLeft = config.horizontalPosition === 'left' ||
            (config.horizontalPosition === 'start' && !isRtl) ||
            (config.horizontalPosition === 'end' && isRtl);
        const isRight = !isLeft && config.horizontalPosition !== 'center';
        if (isLeft) {
            positionStrategy.left('0');
        }
        else if (isRight) {
            positionStrategy.right('0');
        }
        else {
            positionStrategy.centerHorizontally();
        }
        // Set horizontal position.
        if (config.verticalPosition === 'top') {
            positionStrategy.top('0');
        }
        else {
            positionStrategy.bottom('0');
        }
        overlayConfig.positionStrategy = positionStrategy;
        return this._overlay.create(overlayConfig);
    }
    /**
     * Creates an injector to be used inside of a snack bar component.
     * @param config Config that was used to create the snack bar.
     * @param snackBarRef Reference to the snack bar.
     */
    _createInjector(config, snackBarRef) {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        return Injector.create({
            parent: userInjector || this._injector,
            providers: [
                { provide: MatSnackBarRef, useValue: snackBarRef },
                { provide: MAT_SNACK_BAR_DATA, useValue: config.data },
            ],
        });
    }
}
_MatSnackBarBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatSnackBarBase, deps: [{ token: i1.Overlay }, { token: i2.LiveAnnouncer }, { token: i0.Injector }, { token: i3.BreakpointObserver }, { token: _MatSnackBarBase, optional: true, skipSelf: true }, { token: MAT_SNACK_BAR_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Injectable });
_MatSnackBarBase.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatSnackBarBase });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatSnackBarBase, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i2.LiveAnnouncer }, { type: i0.Injector }, { type: i3.BreakpointObserver }, { type: _MatSnackBarBase, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i4.MatSnackBarConfig, decorators: [{
                    type: Inject,
                    args: [MAT_SNACK_BAR_DEFAULT_OPTIONS]
                }] }]; } });
/**
 * Service to dispatch Material Design snack bar messages.
 */
export class MatSnackBar extends _MatSnackBarBase {
    constructor(overlay, live, injector, breakpointObserver, parentSnackBar, defaultConfig) {
        super(overlay, live, injector, breakpointObserver, parentSnackBar, defaultConfig);
        this.simpleSnackBarComponent = SimpleSnackBar;
        this.snackBarContainerComponent = MatSnackBarContainer;
        this.handsetCssClass = 'mat-mdc-snack-bar-handset';
    }
}
MatSnackBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSnackBar, deps: [{ token: i1.Overlay }, { token: i2.LiveAnnouncer }, { token: i0.Injector }, { token: i3.BreakpointObserver }, { token: MatSnackBar, optional: true, skipSelf: true }, { token: MAT_SNACK_BAR_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Injectable });
MatSnackBar.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSnackBar, providedIn: MatSnackBarModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSnackBar, decorators: [{
            type: Injectable,
            args: [{ providedIn: MatSnackBarModule }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i2.LiveAnnouncer }, { type: i0.Injector }, { type: i3.BreakpointObserver }, { type: MatSnackBar, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i4.MatSnackBarConfig, decorators: [{
                    type: Inject,
                    args: [MAT_SNACK_BAR_DEFAULT_OPTIONS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3NuYWNrLWJhci9zbmFjay1iYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRSxPQUFPLEVBQWdCLE9BQU8sRUFBRSxhQUFhLEVBQWEsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RixPQUFPLEVBR0wsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsUUFBUSxFQUVSLFFBQVEsRUFDUixRQUFRLEVBQ1IsV0FBVyxHQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFtQixNQUFNLG9CQUFvQixDQUFDO0FBQ3BFLE9BQU8sRUFBNEIsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RixPQUFPLEVBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUV6QyxvQkFBb0I7QUFDcEIsTUFBTSxVQUFVLHFDQUFxQztJQUNuRCxPQUFPLElBQUksaUJBQWlCLEVBQUUsQ0FBQztBQUNqQyxDQUFDO0FBRUQscUVBQXFFO0FBQ3JFLE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFHLElBQUksY0FBYyxDQUM3RCwrQkFBK0IsRUFDL0I7SUFD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cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMaXZlQW5ub3VuY2VyfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0JyZWFrcG9pbnRPYnNlcnZlciwgQnJlYWtwb2ludHN9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHtDb21wb25lbnRUeXBlLCBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFNuYWNrQmFyTW9kdWxlfSBmcm9tICcuL21vZHVsZSc7XG5pbXBvcnQge1NpbXBsZVNuYWNrQmFyLCBUZXh0T25seVNuYWNrQmFyfSBmcm9tICcuL3NpbXBsZS1zbmFjay1iYXInO1xuaW1wb3J0IHtfTWF0U25hY2tCYXJDb250YWluZXJCYXNlLCBNYXRTbmFja0JhckNvbnRhaW5lcn0gZnJvbSAnLi9zbmFjay1iYXItY29udGFpbmVyJztcbmltcG9ydCB7TUFUX1NOQUNLX0JBUl9EQVRBLCBNYXRTbmFja0JhckNvbmZpZ30gZnJvbSAnLi9zbmFjay1iYXItY29uZmlnJztcbmltcG9ydCB7TWF0U25hY2tCYXJSZWZ9IGZyb20gJy4vc25hY2stYmFyLXJlZic7XG5pbXBvcnQge0NvbXBvbmVudFBvcnRhbCwgVGVtcGxhdGVQb3J0YWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfU05BQ0tfQkFSX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1hdFNuYWNrQmFyQ29uZmlnIHtcbiAgcmV0dXJuIG5ldyBNYXRTbmFja0JhckNvbmZpZygpO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBkZWZhdWx0IHNuYWNrIGJhci4gKi9cbmV4cG9ydCBjb25zdCBNQVRfU05BQ0tfQkFSX0RFRkFVTFRfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRTbmFja0JhckNvbmZpZz4oXG4gICdtYXQtc25hY2stYmFyLWRlZmF1bHQtb3B0aW9ucycsXG4gIHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogTUFUX1NOQUNLX0JBUl9ERUZBVUxUX09QVElPTlNfRkFDVE9SWSxcbiAgfSxcbik7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBfTWF0U25hY2tCYXJCYXNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBzbmFjayBiYXIgaW4gdGhlIHZpZXcgKmF0IHRoaXMgbGV2ZWwqIChpbiB0aGUgQW5ndWxhciBpbmplY3RvciB0cmVlKS5cbiAgICogSWYgdGhlcmUgaXMgYSBwYXJlbnQgc25hY2stYmFyIHNlcnZpY2UsIGFsbCBvcGVyYXRpb25zIHNob3VsZCBkZWxlZ2F0ZSB0byB0aGF0IHBhcmVudFxuICAgKiB2aWEgYF9vcGVuZWRTbmFja0JhclJlZmAuXG4gICAqL1xuICBwcml2YXRlIF9zbmFja0JhclJlZkF0VGhpc0xldmVsOiBNYXRTbmFja0JhclJlZjxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSBjb21wb25lbnQgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQgYXMgdGhlIHNuYWNrIGJhcidzIHNpbXBsZSBjb21wb25lbnQuICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBzaW1wbGVTbmFja0JhckNvbXBvbmVudDogVHlwZTxUZXh0T25seVNuYWNrQmFyPjtcblxuICAvKiogVGhlIGNvbnRhaW5lciBjb21wb25lbnQgdGhhdCBhdHRhY2hlcyB0aGUgcHJvdmlkZWQgdGVtcGxhdGUgb3IgY29tcG9uZW50LiAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc25hY2tCYXJDb250YWluZXJDb21wb25lbnQ6IFR5cGU8X01hdFNuYWNrQmFyQ29udGFpbmVyQmFzZT47XG5cbiAgLyoqIFRoZSBDU1MgY2xhc3MgdG8gYXBwbHkgZm9yIGhhbmRzZXQgbW9kZS4gKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGhhbmRzZXRDc3NDbGFzczogc3RyaW5nO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnRseSBvcGVuZWQgc25hY2tiYXIgYXQgKmFueSogbGV2ZWwuICovXG4gIGdldCBfb3BlbmVkU25hY2tCYXJSZWYoKTogTWF0U25hY2tCYXJSZWY8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuX3BhcmVudFNuYWNrQmFyO1xuICAgIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuX29wZW5lZFNuYWNrQmFyUmVmIDogdGhpcy5fc25hY2tCYXJSZWZBdFRoaXNMZXZlbDtcbiAgfVxuXG4gIHNldCBfb3BlbmVkU25hY2tCYXJSZWYodmFsdWU6IE1hdFNuYWNrQmFyUmVmPGFueT4gfCBudWxsKSB7XG4gICAgaWYgKHRoaXMuX3BhcmVudFNuYWNrQmFyKSB7XG4gICAgICB0aGlzLl9wYXJlbnRTbmFja0Jhci5fb3BlbmVkU25hY2tCYXJSZWYgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc25hY2tCYXJSZWZBdFRoaXNMZXZlbCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfbGl2ZTogTGl2ZUFubm91bmNlcixcbiAgICBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBfYnJlYWtwb2ludE9ic2VydmVyOiBCcmVha3BvaW50T2JzZXJ2ZXIsXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBfcGFyZW50U25hY2tCYXI6IF9NYXRTbmFja0JhckJhc2UsXG4gICAgQEluamVjdChNQVRfU05BQ0tfQkFSX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBfZGVmYXVsdENvbmZpZzogTWF0U25hY2tCYXJDb25maWcsXG4gICkge31cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbmQgZGlzcGF0Y2hlcyBhIHNuYWNrIGJhciB3aXRoIGEgY3VzdG9tIGNvbXBvbmVudCBmb3IgdGhlIGNvbnRlbnQsIHJlbW92aW5nIGFueVxuICAgKiBjdXJyZW50bHkgb3BlbmVkIHNuYWNrIGJhcnMuXG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnQgQ29tcG9uZW50IHRvIGJlIGluc3RhbnRpYXRlZC5cbiAgICogQHBhcmFtIGNvbmZpZyBFeHRyYSBjb25maWd1cmF0aW9uIGZvciB0aGUgc25hY2sgYmFyLlxuICAgKi9cbiAgb3BlbkZyb21Db21wb25lbnQ8VCwgRCA9IGFueT4oXG4gICAgY29tcG9uZW50OiBDb21wb25lbnRUeXBlPFQ+LFxuICAgIGNvbmZpZz86IE1hdFNuYWNrQmFyQ29uZmlnPEQ+LFxuICApOiBNYXRTbmFja0JhclJlZjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaChjb21wb25lbnQsIGNvbmZpZykgYXMgTWF0U25hY2tCYXJSZWY8VD47XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbmQgZGlzcGF0Y2hlcyBhIHNuYWNrIGJhciB3aXRoIGEgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgY29udGVudCwgcmVtb3ZpbmcgYW55XG4gICAqIGN1cnJlbnRseSBvcGVuZWQgc25hY2sgYmFycy5cbiAgICpcbiAgICogQHBhcmFtIHRlbXBsYXRlIFRlbXBsYXRlIHRvIGJlIGluc3RhbnRpYXRlZC5cbiAgICogQHBhcmFtIGNvbmZpZyBFeHRyYSBjb25maWd1cmF0aW9uIGZvciB0aGUgc25hY2sgYmFyLlxuICAgKi9cbiAgb3BlbkZyb21UZW1wbGF0ZShcbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PixcbiAgICBjb25maWc/OiBNYXRTbmFja0JhckNvbmZpZyxcbiAgKTogTWF0U25hY2tCYXJSZWY8RW1iZWRkZWRWaWV3UmVmPGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5fYXR0YWNoKHRlbXBsYXRlLCBjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgc25hY2tiYXIgd2l0aCBhIG1lc3NhZ2UgYW5kIGFuIG9wdGlvbmFsIGFjdGlvbi5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gc2hvdyBpbiB0aGUgc25hY2tiYXIuXG4gICAqIEBwYXJhbSBhY3Rpb24gVGhlIGxhYmVsIGZvciB0aGUgc25hY2tiYXIgYWN0aW9uLlxuICAgKiBAcGFyYW0gY29uZmlnIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgc25hY2tiYXIuXG4gICAqL1xuICBvcGVuKFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBhY3Rpb246IHN0cmluZyA9ICcnLFxuICAgIGNvbmZpZz86IE1hdFNuYWNrQmFyQ29uZmlnLFxuICApOiBNYXRTbmFja0JhclJlZjxUZXh0T25seVNuYWNrQmFyPiB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHsuLi50aGlzLl9kZWZhdWx0Q29uZmlnLCAuLi5jb25maWd9O1xuXG4gICAgLy8gU2luY2UgdGhlIHVzZXIgZG9lc24ndCBoYXZlIGFjY2VzcyB0byB0aGUgY29tcG9uZW50LCB3ZSBjYW5cbiAgICAvLyBvdmVycmlkZSB0aGUgZGF0YSB0byBwYXNzIGluIG91ciBvd24gbWVzc2FnZSBhbmQgYWN0aW9uLlxuICAgIF9jb25maWcuZGF0YSA9IHttZXNzYWdlLCBhY3Rpb259O1xuXG4gICAgLy8gU2luY2UgdGhlIHNuYWNrIGJhciBoYXMgYHJvbGU9XCJhbGVydFwiYCwgd2UgZG9uJ3RcbiAgICAvLyB3YW50IHRvIGFubm91bmNlIHRoZSBzYW1lIG1lc3NhZ2UgdHdpY2UuXG4gICAgaWYgKF9jb25maWcuYW5ub3VuY2VtZW50TWVzc2FnZSA9PT0gbWVzc2FnZSkge1xuICAgICAgX2NvbmZpZy5hbm5vdW5jZW1lbnRNZXNzYWdlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9wZW5Gcm9tQ29tcG9uZW50KHRoaXMuc2ltcGxlU25hY2tCYXJDb21wb25lbnQsIF9jb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc21pc3NlcyB0aGUgY3VycmVudGx5LXZpc2libGUgc25hY2sgYmFyLlxuICAgKi9cbiAgZGlzbWlzcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3BlbmVkU25hY2tCYXJSZWYpIHtcbiAgICAgIHRoaXMuX29wZW5lZFNuYWNrQmFyUmVmLmRpc21pc3MoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvLyBPbmx5IGRpc21pc3MgdGhlIHNuYWNrIGJhciBhdCB0aGUgY3VycmVudCBsZXZlbCBvbiBkZXN0cm95LlxuICAgIGlmICh0aGlzLl9zbmFja0JhclJlZkF0VGhpc0xldmVsKSB7XG4gICAgICB0aGlzLl9zbmFja0JhclJlZkF0VGhpc0xldmVsLmRpc21pc3MoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgdGhlIHNuYWNrIGJhciBjb250YWluZXIgY29tcG9uZW50IHRvIHRoZSBvdmVybGF5LlxuICAgKi9cbiAgcHJpdmF0ZSBfYXR0YWNoU25hY2tCYXJDb250YWluZXIoXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICBjb25maWc6IE1hdFNuYWNrQmFyQ29uZmlnLFxuICApOiBfTWF0U25hY2tCYXJDb250YWluZXJCYXNlIHtcbiAgICBjb25zdCB1c2VySW5qZWN0b3IgPSBjb25maWcgJiYgY29uZmlnLnZpZXdDb250YWluZXJSZWYgJiYgY29uZmlnLnZpZXdDb250YWluZXJSZWYuaW5qZWN0b3I7XG4gICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcGFyZW50OiB1c2VySW5qZWN0b3IgfHwgdGhpcy5faW5qZWN0b3IsXG4gICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTWF0U25hY2tCYXJDb25maWcsIHVzZVZhbHVlOiBjb25maWd9XSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoXG4gICAgICB0aGlzLnNuYWNrQmFyQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgY29uZmlnLnZpZXdDb250YWluZXJSZWYsXG4gICAgICBpbmplY3RvcixcbiAgICApO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlZjogQ29tcG9uZW50UmVmPF9NYXRTbmFja0JhckNvbnRhaW5lckJhc2U+ID1cbiAgICAgIG92ZXJsYXlSZWYuYXR0YWNoKGNvbnRhaW5lclBvcnRhbCk7XG4gICAgY29udGFpbmVyUmVmLmluc3RhbmNlLnNuYWNrQmFyQ29uZmlnID0gY29uZmlnO1xuICAgIHJldHVybiBjb250YWluZXJSZWYuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogUGxhY2VzIGEgbmV3IGNvbXBvbmVudCBvciBhIHRlbXBsYXRlIGFzIHRoZSBjb250ZW50IG9mIHRoZSBzbmFjayBiYXIgY29udGFpbmVyLlxuICAgKi9cbiAgcHJpdmF0ZSBfYXR0YWNoPFQ+KFxuICAgIGNvbnRlbnQ6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcbiAgICB1c2VyQ29uZmlnPzogTWF0U25hY2tCYXJDb25maWcsXG4gICk6IE1hdFNuYWNrQmFyUmVmPFQgfCBFbWJlZGRlZFZpZXdSZWY8YW55Pj4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IHsuLi5uZXcgTWF0U25hY2tCYXJDb25maWcoKSwgLi4udGhpcy5fZGVmYXVsdENvbmZpZywgLi4udXNlckNvbmZpZ307XG4gICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuX2NyZWF0ZU92ZXJsYXkoY29uZmlnKTtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9hdHRhY2hTbmFja0JhckNvbnRhaW5lcihvdmVybGF5UmVmLCBjb25maWcpO1xuICAgIGNvbnN0IHNuYWNrQmFyUmVmID0gbmV3IE1hdFNuYWNrQmFyUmVmPFQgfCBFbWJlZGRlZFZpZXdSZWY8YW55Pj4oY29udGFpbmVyLCBvdmVybGF5UmVmKTtcblxuICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbChjb250ZW50LCBudWxsISwge1xuICAgICAgICAkaW1wbGljaXQ6IGNvbmZpZy5kYXRhLFxuICAgICAgICBzbmFja0JhclJlZixcbiAgICAgIH0gYXMgYW55KTtcblxuICAgICAgc25hY2tCYXJSZWYuaW5zdGFuY2UgPSBjb250YWluZXIuYXR0YWNoVGVtcGxhdGVQb3J0YWwocG9ydGFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5qZWN0b3IgPSB0aGlzLl9jcmVhdGVJbmplY3Rvcihjb25maWcsIHNuYWNrQmFyUmVmKTtcbiAgICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29udGVudCwgdW5kZWZpbmVkLCBpbmplY3Rvcik7XG4gICAgICBjb25zdCBjb250ZW50UmVmID0gY29udGFpbmVyLmF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihwb3J0YWwpO1xuXG4gICAgICAvLyBXZSBjYW4ndCBwYXNzIHRoaXMgdmlhIHRoZSBpbmplY3RvciwgYmVjYXVzZSB0aGUgaW5qZWN0b3IgaXMgY3JlYXRlZCBlYXJsaWVyLlxuICAgICAgc25hY2tCYXJSZWYuaW5zdGFuY2UgPSBjb250ZW50UmVmLmluc3RhbmNlO1xuICAgIH1cblxuICAgIC8vIFN1YnNjcmliZSB0byB0aGUgYnJlYWtwb2ludCBvYnNlcnZlciBhbmQgYXR0YWNoIHRoZSBtYXQtc25hY2stYmFyLWhhbmRzZXQgY2xhc3MgYXNcbiAgICAvLyBhcHByb3ByaWF0ZS4gVGhpcyBjbGFzcyBpcyBhcHBsaWVkIHRvIHRoZSBvdmVybGF5IGVsZW1lbnQgYmVjYXVzZSB0aGUgb3ZlcmxheSBtdXN0IGV4cGFuZCB0b1xuICAgIC8vIGZpbGwgdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW4gZm9yIGZ1bGwgd2lkdGggc25hY2tiYXJzLlxuICAgIHRoaXMuX2JyZWFrcG9pbnRPYnNlcnZlclxuICAgICAgLm9ic2VydmUoQnJlYWtwb2ludHMuSGFuZHNldFBvcnRyYWl0KVxuICAgICAgLnBpcGUodGFrZVVudGlsKG92ZXJsYXlSZWYuZGV0YWNobWVudHMoKSkpXG4gICAgICAuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgICAgb3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuaGFuZHNldENzc0NsYXNzLCBzdGF0ZS5tYXRjaGVzKTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKGNvbmZpZy5hbm5vdW5jZW1lbnRNZXNzYWdlKSB7XG4gICAgICAvLyBXYWl0IHVudGlsIHRoZSBzbmFjayBiYXIgY29udGVudHMgaGF2ZSBiZWVuIGFubm91bmNlZCB0aGVuIGRlbGl2ZXIgdGhpcyBtZXNzYWdlLlxuICAgICAgY29udGFpbmVyLl9vbkFubm91bmNlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2xpdmUuYW5ub3VuY2UoY29uZmlnLmFubm91bmNlbWVudE1lc3NhZ2UhLCBjb25maWcucG9saXRlbmVzcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9hbmltYXRlU25hY2tCYXIoc25hY2tCYXJSZWYsIGNvbmZpZyk7XG4gICAgdGhpcy5fb3BlbmVkU25hY2tCYXJSZWYgPSBzbmFja0JhclJlZjtcbiAgICByZXR1cm4gdGhpcy5fb3BlbmVkU25hY2tCYXJSZWY7XG4gIH1cblxuICAvKiogQW5pbWF0ZXMgdGhlIG9sZCBzbmFjayBiYXIgb3V0IGFuZCB0aGUgbmV3IG9uZSBpbi4gKi9cbiAgcHJpdmF0ZSBfYW5pbWF0ZVNuYWNrQmFyKHNuYWNrQmFyUmVmOiBNYXRTbmFja0JhclJlZjxhbnk+LCBjb25maWc6IE1hdFNuYWNrQmFyQ29uZmlnKSB7XG4gICAgLy8gV2hlbiB0aGUgc25hY2tiYXIgaXMgZGlzbWlzc2VkLCBjbGVhciB0aGUgcmVmZXJlbmNlIHRvIGl0LlxuICAgIHNuYWNrQmFyUmVmLmFmdGVyRGlzbWlzc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIENsZWFyIHRoZSBzbmFja2JhciByZWYgaWYgaXQgaGFzbid0IGFscmVhZHkgYmVlbiByZXBsYWNlZCBieSBhIG5ld2VyIHNuYWNrYmFyLlxuICAgICAgaWYgKHRoaXMuX29wZW5lZFNuYWNrQmFyUmVmID09IHNuYWNrQmFyUmVmKSB7XG4gICAgICAgIHRoaXMuX29wZW5lZFNuYWNrQmFyUmVmID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy5hbm5vdW5jZW1lbnRNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuX2xpdmUuY2xlYXIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl9vcGVuZWRTbmFja0JhclJlZikge1xuICAgICAgLy8gSWYgYSBzbmFjayBiYXIgaXMgYWxyZWFkeSBpbiB2aWV3LCBkaXNtaXNzIGl0IGFuZCBlbnRlciB0aGVcbiAgICAgIC8vIG5ldyBzbmFjayBiYXIgYWZ0ZXIgZXhpdCBhbmltYXRpb24gaXMgY29tcGxldGUuXG4gICAgICB0aGlzLl9vcGVuZWRTbmFja0JhclJlZi5hZnRlckRpc21pc3NlZCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHNuYWNrQmFyUmVmLmNvbnRhaW5lckluc3RhbmNlLmVudGVyKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX29wZW5lZFNuYWNrQmFyUmVmLmRpc21pc3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgbm8gc25hY2sgYmFyIGlzIGluIHZpZXcsIGVudGVyIHRoZSBuZXcgc25hY2sgYmFyLlxuICAgICAgc25hY2tCYXJSZWYuY29udGFpbmVySW5zdGFuY2UuZW50ZXIoKTtcbiAgICB9XG5cbiAgICAvLyBJZiBhIGRpc21pc3MgdGltZW91dCBpcyBwcm92aWRlZCwgc2V0IHVwIGRpc21pc3MgYmFzZWQgb24gYWZ0ZXIgdGhlIHNuYWNrYmFyIGlzIG9wZW5lZC5cbiAgICBpZiAoY29uZmlnLmR1cmF0aW9uICYmIGNvbmZpZy5kdXJhdGlvbiA+IDApIHtcbiAgICAgIHNuYWNrQmFyUmVmLmFmdGVyT3BlbmVkKCkuc3Vic2NyaWJlKCgpID0+IHNuYWNrQmFyUmVmLl9kaXNtaXNzQWZ0ZXIoY29uZmlnLmR1cmF0aW9uISkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IG92ZXJsYXkgYW5kIHBsYWNlcyBpdCBpbiB0aGUgY29ycmVjdCBsb2NhdGlvbi5cbiAgICogQHBhcmFtIGNvbmZpZyBUaGUgdXNlci1zcGVjaWZpZWQgc25hY2sgYmFyIGNvbmZpZy5cbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXkoY29uZmlnOiBNYXRTbmFja0JhckNvbmZpZyk6IE92ZXJsYXlSZWYge1xuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZygpO1xuICAgIG92ZXJsYXlDb25maWcuZGlyZWN0aW9uID0gY29uZmlnLmRpcmVjdGlvbjtcblxuICAgIGxldCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpO1xuICAgIC8vIFNldCBob3Jpem9udGFsIHBvc2l0aW9uLlxuICAgIGNvbnN0IGlzUnRsID0gY29uZmlnLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG4gICAgY29uc3QgaXNMZWZ0ID1cbiAgICAgIGNvbmZpZy5ob3Jpem9udGFsUG9zaXRpb24gPT09ICdsZWZ0JyB8fFxuICAgICAgKGNvbmZpZy5ob3Jpem9udGFsUG9zaXRpb24gPT09ICdzdGFydCcgJiYgIWlzUnRsKSB8fFxuICAgICAgKGNvbmZpZy5ob3Jpem9udGFsUG9zaXRpb24gPT09ICdlbmQnICYmIGlzUnRsKTtcbiAgICBjb25zdCBpc1JpZ2h0ID0gIWlzTGVmdCAmJiBjb25maWcuaG9yaXpvbnRhbFBvc2l0aW9uICE9PSAnY2VudGVyJztcbiAgICBpZiAoaXNMZWZ0KSB7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5LmxlZnQoJzAnKTtcbiAgICB9IGVsc2UgaWYgKGlzUmlnaHQpIHtcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3kucmlnaHQoJzAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zaXRpb25TdHJhdGVneS5jZW50ZXJIb3Jpem9udGFsbHkoKTtcbiAgICB9XG4gICAgLy8gU2V0IGhvcml6b250YWwgcG9zaXRpb24uXG4gICAgaWYgKGNvbmZpZy52ZXJ0aWNhbFBvc2l0aW9uID09PSAndG9wJykge1xuICAgICAgcG9zaXRpb25TdHJhdGVneS50b3AoJzAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zaXRpb25TdHJhdGVneS5ib3R0b20oJzAnKTtcbiAgICB9XG5cbiAgICBvdmVybGF5Q29uZmlnLnBvc2l0aW9uU3RyYXRlZ3kgPSBwb3NpdGlvblN0cmF0ZWd5O1xuICAgIHJldHVybiB0aGlzLl9vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluamVjdG9yIHRvIGJlIHVzZWQgaW5zaWRlIG9mIGEgc25hY2sgYmFyIGNvbXBvbmVudC5cbiAgICogQHBhcmFtIGNvbmZpZyBDb25maWcgdGhhdCB3YXMgdXNlZCB0byBjcmVhdGUgdGhlIHNuYWNrIGJhci5cbiAgICogQHBhcmFtIHNuYWNrQmFyUmVmIFJlZmVyZW5jZSB0byB0aGUgc25hY2sgYmFyLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSW5qZWN0b3I8VD4oY29uZmlnOiBNYXRTbmFja0JhckNvbmZpZywgc25hY2tCYXJSZWY6IE1hdFNuYWNrQmFyUmVmPFQ+KTogSW5qZWN0b3Ige1xuICAgIGNvbnN0IHVzZXJJbmplY3RvciA9IGNvbmZpZyAmJiBjb25maWcudmlld0NvbnRhaW5lclJlZiAmJiBjb25maWcudmlld0NvbnRhaW5lclJlZi5pbmplY3RvcjtcblxuICAgIHJldHVybiBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcGFyZW50OiB1c2VySW5qZWN0b3IgfHwgdGhpcy5faW5qZWN0b3IsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IE1hdFNuYWNrQmFyUmVmLCB1c2VWYWx1ZTogc25hY2tCYXJSZWZ9LFxuICAgICAgICB7cHJvdmlkZTogTUFUX1NOQUNLX0JBUl9EQVRBLCB1c2VWYWx1ZTogY29uZmlnLmRhdGF9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFNlcnZpY2UgdG8gZGlzcGF0Y2ggTWF0ZXJpYWwgRGVzaWduIHNuYWNrIGJhciBtZXNzYWdlcy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46IE1hdFNuYWNrQmFyTW9kdWxlfSlcbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhciBleHRlbmRzIF9NYXRTbmFja0JhckJhc2Uge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc2ltcGxlU25hY2tCYXJDb21wb25lbnQgPSBTaW1wbGVTbmFja0JhcjtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHNuYWNrQmFyQ29udGFpbmVyQ29tcG9uZW50ID0gTWF0U25hY2tCYXJDb250YWluZXI7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBoYW5kc2V0Q3NzQ2xhc3MgPSAnbWF0LW1kYy1zbmFjay1iYXItaGFuZHNldCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgb3ZlcmxheTogT3ZlcmxheSxcbiAgICBsaXZlOiBMaXZlQW5ub3VuY2VyLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBicmVha3BvaW50T2JzZXJ2ZXI6IEJyZWFrcG9pbnRPYnNlcnZlcixcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRTbmFja0JhcjogTWF0U25hY2tCYXIsXG4gICAgQEluamVjdChNQVRfU05BQ0tfQkFSX0RFRkFVTFRfT1BUSU9OUykgZGVmYXVsdENvbmZpZzogTWF0U25hY2tCYXJDb25maWcsXG4gICkge1xuICAgIHN1cGVyKG92ZXJsYXksIGxpdmUsIGluamVjdG9yLCBicmVha3BvaW50T2JzZXJ2ZXIsIHBhcmVudFNuYWNrQmFyLCBkZWZhdWx0Q29uZmlnKTtcbiAgfVxufVxuIl19