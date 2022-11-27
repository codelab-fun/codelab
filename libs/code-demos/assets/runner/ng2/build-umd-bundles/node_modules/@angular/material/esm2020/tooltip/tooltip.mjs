/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { take, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty, coerceNumberProperty, } from '@angular/cdk/coercion';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Inject, InjectionToken, Input, NgZone, Optional, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher, } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/platform";
import * as i3 from "@angular/cdk/a11y";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "@angular/common";
/** Time in ms to throttle repositioning after scroll events. */
export const SCROLL_THROTTLE_MS = 20;
/**
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @docs-private
 */
export function getMatTooltipInvalidPositionError(position) {
    return Error(`Tooltip position "${position}" is invalid.`);
}
/** Injection token that determines the scroll handling while a tooltip is visible. */
export const MAT_TOOLTIP_SCROLL_STRATEGY = new InjectionToken('mat-tooltip-scroll-strategy');
/** @docs-private */
export function MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: SCROLL_THROTTLE_MS });
}
/** @docs-private */
export const MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MAT_TOOLTIP_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,
};
/** @docs-private */
export function MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY() {
    return {
        showDelay: 0,
        hideDelay: 0,
        touchendHideDelay: 1500,
    };
}
/** Injection token to be used to override the default options for `matTooltip`. */
export const MAT_TOOLTIP_DEFAULT_OPTIONS = new InjectionToken('mat-tooltip-default-options', {
    providedIn: 'root',
    factory: MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
});
/**
 * CSS class that will be attached to the overlay panel.
 * @deprecated
 * @breaking-change 13.0.0 remove this variable
 */
export const TOOLTIP_PANEL_CLASS = 'mat-mdc-tooltip-panel';
const PANEL_CLASS = 'tooltip-panel';
/** Options used to bind passive event listeners. */
const passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * Time between the user putting the pointer on a tooltip
 * trigger and the long press event being fired.
 */
const LONGPRESS_DELAY = 500;
// These constants were taken from MDC's `numbers` object. We can't import them from MDC,
// because they have some top-level references to `window` which break during SSR.
const MIN_VIEWPORT_TOOLTIP_THRESHOLD = 8;
const UNBOUNDED_ANCHOR_GAP = 8;
const MIN_HEIGHT = 24;
const MAX_WIDTH = 200;
export class _MatTooltipBase {
    constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _platform, _ariaDescriber, _focusMonitor, scrollStrategy, _dir, _defaultOptions, _document) {
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._platform = _platform;
        this._ariaDescriber = _ariaDescriber;
        this._focusMonitor = _focusMonitor;
        this._dir = _dir;
        this._defaultOptions = _defaultOptions;
        this._position = 'below';
        this._positionAtOrigin = false;
        this._disabled = false;
        this._viewInitialized = false;
        this._pointerExitEventsInitialized = false;
        this._viewportMargin = 8;
        this._cssClassPrefix = 'mat';
        this._showDelay = this._defaultOptions.showDelay;
        this._hideDelay = this._defaultOptions.hideDelay;
        /**
         * How touch gestures should be handled by the tooltip. On touch devices the tooltip directive
         * uses a long press gesture to show and hide, however it can conflict with the native browser
         * gestures. To work around the conflict, Angular Material disables native gestures on the
         * trigger, but that might not be desirable on particular elements (e.g. inputs and draggable
         * elements). The different values for this option configure the touch event handling as follows:
         * - `auto` - Enables touch gestures for all elements, but tries to avoid conflicts with native
         *   browser gestures on particular elements. In particular, it allows text selection on inputs
         *   and textareas, and preserves the native browser dragging on elements marked as `draggable`.
         * - `on` - Enables touch gestures for all elements and disables native
         *   browser gestures with no exceptions.
         * - `off` - Disables touch gestures. Note that this will prevent the tooltip from
         *   showing on touch devices.
         */
        this.touchGestures = 'auto';
        this._message = '';
        /** Manually-bound passive event listeners. */
        this._passiveListeners = [];
        /** Emits when the component is destroyed. */
        this._destroyed = new Subject();
        this._scrollStrategy = scrollStrategy;
        this._document = _document;
        if (_defaultOptions) {
            if (_defaultOptions.position) {
                this.position = _defaultOptions.position;
            }
            if (_defaultOptions.positionAtOrigin) {
                this.positionAtOrigin = _defaultOptions.positionAtOrigin;
            }
            if (_defaultOptions.touchGestures) {
                this.touchGestures = _defaultOptions.touchGestures;
            }
        }
        _dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
            if (this._overlayRef) {
                this._updatePosition(this._overlayRef);
            }
        });
    }
    /** Allows the user to define the position of the tooltip relative to the parent element */
    get position() {
        return this._position;
    }
    set position(value) {
        if (value !== this._position) {
            this._position = value;
            if (this._overlayRef) {
                this._updatePosition(this._overlayRef);
                this._tooltipInstance?.show(0);
                this._overlayRef.updatePosition();
            }
        }
    }
    get positionAtOrigin() {
        return this._positionAtOrigin;
    }
    set positionAtOrigin(value) {
        this._positionAtOrigin = coerceBooleanProperty(value);
        this._detach();
        this._overlayRef = null;
    }
    /** Disables the display of the tooltip. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // If tooltip is disabled, hide immediately.
        if (this._disabled) {
            this.hide(0);
        }
        else {
            this._setupPointerEnterEventsIfNeeded();
        }
    }
    /** The default delay in ms before showing the tooltip after show is called */
    get showDelay() {
        return this._showDelay;
    }
    set showDelay(value) {
        this._showDelay = coerceNumberProperty(value);
    }
    /** The default delay in ms before hiding the tooltip after hide is called */
    get hideDelay() {
        return this._hideDelay;
    }
    set hideDelay(value) {
        this._hideDelay = coerceNumberProperty(value);
        if (this._tooltipInstance) {
            this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay;
        }
    }
    /** The message to be displayed in the tooltip */
    get message() {
        return this._message;
    }
    set message(value) {
        this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._message, 'tooltip');
        // If the message is not a string (e.g. number), convert it to a string and trim it.
        // Must convert with `String(value)`, not `${value}`, otherwise Closure Compiler optimises
        // away the string-conversion: https://github.com/angular/components/issues/20684
        this._message = value != null ? String(value).trim() : '';
        if (!this._message && this._isTooltipVisible()) {
            this.hide(0);
        }
        else {
            this._setupPointerEnterEventsIfNeeded();
            this._updateTooltipMessage();
            this._ngZone.runOutsideAngular(() => {
                // The `AriaDescriber` has some functionality that avoids adding a description if it's the
                // same as the `aria-label` of an element, however we can't know whether the tooltip trigger
                // has a data-bound `aria-label` or when it'll be set for the first time. We can avoid the
                // issue by deferring the description by a tick so Angular has time to set the `aria-label`.
                Promise.resolve().then(() => {
                    this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, 'tooltip');
                });
            });
        }
    }
    /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
    get tooltipClass() {
        return this._tooltipClass;
    }
    set tooltipClass(value) {
        this._tooltipClass = value;
        if (this._tooltipInstance) {
            this._setTooltipClass(this._tooltipClass);
        }
    }
    ngAfterViewInit() {
        // This needs to happen after view init so the initial values for all inputs have been set.
        this._viewInitialized = true;
        this._setupPointerEnterEventsIfNeeded();
        this._focusMonitor
            .monitor(this._elementRef)
            .pipe(takeUntil(this._destroyed))
            .subscribe(origin => {
            // Note that the focus monitor runs outside the Angular zone.
            if (!origin) {
                this._ngZone.run(() => this.hide(0));
            }
            else if (origin === 'keyboard') {
                this._ngZone.run(() => this.show());
            }
        });
    }
    /**
     * Dispose the tooltip when destroyed.
     */
    ngOnDestroy() {
        const nativeElement = this._elementRef.nativeElement;
        clearTimeout(this._touchstartTimeout);
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._tooltipInstance = null;
        }
        // Clean up the event listeners set in the constructor
        this._passiveListeners.forEach(([event, listener]) => {
            nativeElement.removeEventListener(event, listener, passiveListenerOptions);
        });
        this._passiveListeners.length = 0;
        this._destroyed.next();
        this._destroyed.complete();
        this._ariaDescriber.removeDescription(nativeElement, this.message, 'tooltip');
        this._focusMonitor.stopMonitoring(nativeElement);
    }
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    show(delay = this.showDelay, origin) {
        if (this.disabled || !this.message || this._isTooltipVisible()) {
            this._tooltipInstance?._cancelPendingAnimations();
            return;
        }
        const overlayRef = this._createOverlay(origin);
        this._detach();
        this._portal =
            this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
        const instance = (this._tooltipInstance = overlayRef.attach(this._portal).instance);
        instance._triggerElement = this._elementRef.nativeElement;
        instance._mouseLeaveHideDelay = this._hideDelay;
        instance
            .afterHidden()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._detach());
        this._setTooltipClass(this._tooltipClass);
        this._updateTooltipMessage();
        instance.show(delay);
    }
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    hide(delay = this.hideDelay) {
        const instance = this._tooltipInstance;
        if (instance) {
            if (instance.isVisible()) {
                instance.hide(delay);
            }
            else {
                instance._cancelPendingAnimations();
                this._detach();
            }
        }
    }
    /** Shows/hides the tooltip */
    toggle(origin) {
        this._isTooltipVisible() ? this.hide() : this.show(undefined, origin);
    }
    /** Returns true if the tooltip is currently visible to the user */
    _isTooltipVisible() {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    }
    /** Create the overlay config and position strategy */
    _createOverlay(origin) {
        if (this._overlayRef) {
            const existingStrategy = this._overlayRef.getConfig()
                .positionStrategy;
            if ((!this.positionAtOrigin || !origin) && existingStrategy._origin instanceof ElementRef) {
                return this._overlayRef;
            }
            this._detach();
        }
        const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);
        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this._overlay
            .position()
            .flexibleConnectedTo(this.positionAtOrigin ? origin || this._elementRef : this._elementRef)
            .withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`)
            .withFlexibleDimensions(false)
            .withViewportMargin(this._viewportMargin)
            .withScrollableContainers(scrollableAncestors);
        strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe(change => {
            this._updateCurrentPositionClass(change.connectionPair);
            if (this._tooltipInstance) {
                if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    this._ngZone.run(() => this.hide(0));
                }
            }
        });
        this._overlayRef = this._overlay.create({
            direction: this._dir,
            positionStrategy: strategy,
            panelClass: `${this._cssClassPrefix}-${PANEL_CLASS}`,
            scrollStrategy: this._scrollStrategy(),
        });
        this._updatePosition(this._overlayRef);
        this._overlayRef
            .detachments()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._detach());
        this._overlayRef
            .outsidePointerEvents()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._tooltipInstance?._handleBodyInteraction());
        this._overlayRef
            .keydownEvents()
            .pipe(takeUntil(this._destroyed))
            .subscribe(event => {
            if (this._isTooltipVisible() && event.keyCode === ESCAPE && !hasModifierKey(event)) {
                event.preventDefault();
                event.stopPropagation();
                this._ngZone.run(() => this.hide(0));
            }
        });
        if (this._defaultOptions?.disableTooltipInteractivity) {
            this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`);
        }
        return this._overlayRef;
    }
    /** Detaches the currently-attached tooltip. */
    _detach() {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this._tooltipInstance = null;
    }
    /** Updates the position of the current tooltip. */
    _updatePosition(overlayRef) {
        const position = overlayRef.getConfig().positionStrategy;
        const origin = this._getOrigin();
        const overlay = this._getOverlayPosition();
        position.withPositions([
            this._addOffset({ ...origin.main, ...overlay.main }),
            this._addOffset({ ...origin.fallback, ...overlay.fallback }),
        ]);
    }
    /** Adds the configured offset to a position. Used as a hook for child classes. */
    _addOffset(position) {
        return position;
    }
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    _getOrigin() {
        const isLtr = !this._dir || this._dir.value == 'ltr';
        const position = this.position;
        let originPosition;
        if (position == 'above' || position == 'below') {
            originPosition = { originX: 'center', originY: position == 'above' ? 'top' : 'bottom' };
        }
        else if (position == 'before' ||
            (position == 'left' && isLtr) ||
            (position == 'right' && !isLtr)) {
            originPosition = { originX: 'start', originY: 'center' };
        }
        else if (position == 'after' ||
            (position == 'right' && isLtr) ||
            (position == 'left' && !isLtr)) {
            originPosition = { originX: 'end', originY: 'center' };
        }
        else if (typeof ngDevMode === 'undefined' || ngDevMode) {
            throw getMatTooltipInvalidPositionError(position);
        }
        const { x, y } = this._invertPosition(originPosition.originX, originPosition.originY);
        return {
            main: originPosition,
            fallback: { originX: x, originY: y },
        };
    }
    /** Returns the overlay position and a fallback position based on the user's preference */
    _getOverlayPosition() {
        const isLtr = !this._dir || this._dir.value == 'ltr';
        const position = this.position;
        let overlayPosition;
        if (position == 'above') {
            overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
        }
        else if (position == 'below') {
            overlayPosition = { overlayX: 'center', overlayY: 'top' };
        }
        else if (position == 'before' ||
            (position == 'left' && isLtr) ||
            (position == 'right' && !isLtr)) {
            overlayPosition = { overlayX: 'end', overlayY: 'center' };
        }
        else if (position == 'after' ||
            (position == 'right' && isLtr) ||
            (position == 'left' && !isLtr)) {
            overlayPosition = { overlayX: 'start', overlayY: 'center' };
        }
        else if (typeof ngDevMode === 'undefined' || ngDevMode) {
            throw getMatTooltipInvalidPositionError(position);
        }
        const { x, y } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
        return {
            main: overlayPosition,
            fallback: { overlayX: x, overlayY: y },
        };
    }
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    _updateTooltipMessage() {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        if (this._tooltipInstance) {
            this._tooltipInstance.message = this.message;
            this._tooltipInstance._markForCheck();
            this._ngZone.onMicrotaskEmpty.pipe(take(1), takeUntil(this._destroyed)).subscribe(() => {
                if (this._tooltipInstance) {
                    this._overlayRef.updatePosition();
                }
            });
        }
    }
    /** Updates the tooltip class */
    _setTooltipClass(tooltipClass) {
        if (this._tooltipInstance) {
            this._tooltipInstance.tooltipClass = tooltipClass;
            this._tooltipInstance._markForCheck();
        }
    }
    /** Inverts an overlay position. */
    _invertPosition(x, y) {
        if (this.position === 'above' || this.position === 'below') {
            if (y === 'top') {
                y = 'bottom';
            }
            else if (y === 'bottom') {
                y = 'top';
            }
        }
        else {
            if (x === 'end') {
                x = 'start';
            }
            else if (x === 'start') {
                x = 'end';
            }
        }
        return { x, y };
    }
    /** Updates the class on the overlay panel based on the current position of the tooltip. */
    _updateCurrentPositionClass(connectionPair) {
        const { overlayY, originX, originY } = connectionPair;
        let newPosition;
        // If the overlay is in the middle along the Y axis,
        // it means that it's either before or after.
        if (overlayY === 'center') {
            // Note that since this information is used for styling, we want to
            // resolve `start` and `end` to their real values, otherwise consumers
            // would have to remember to do it themselves on each consumption.
            if (this._dir && this._dir.value === 'rtl') {
                newPosition = originX === 'end' ? 'left' : 'right';
            }
            else {
                newPosition = originX === 'start' ? 'left' : 'right';
            }
        }
        else {
            newPosition = overlayY === 'bottom' && originY === 'top' ? 'above' : 'below';
        }
        if (newPosition !== this._currentPosition) {
            const overlayRef = this._overlayRef;
            if (overlayRef) {
                const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
                overlayRef.removePanelClass(classPrefix + this._currentPosition);
                overlayRef.addPanelClass(classPrefix + newPosition);
            }
            this._currentPosition = newPosition;
        }
    }
    /** Binds the pointer events to the tooltip trigger. */
    _setupPointerEnterEventsIfNeeded() {
        // Optimization: Defer hooking up events if there's no message or the tooltip is disabled.
        if (this._disabled ||
            !this.message ||
            !this._viewInitialized ||
            this._passiveListeners.length) {
            return;
        }
        // The mouse events shouldn't be bound on mobile devices, because they can prevent the
        // first tap from firing its click event or can cause the tooltip to open for clicks.
        if (this._platformSupportsMouseEvents()) {
            this._passiveListeners.push([
                'mouseenter',
                event => {
                    this._setupPointerExitEventsIfNeeded();
                    let point = undefined;
                    if (event.x !== undefined && event.y !== undefined) {
                        point = event;
                    }
                    this.show(undefined, point);
                },
            ]);
        }
        else if (this.touchGestures !== 'off') {
            this._disableNativeGesturesIfNecessary();
            this._passiveListeners.push([
                'touchstart',
                event => {
                    const touch = event.targetTouches?.[0];
                    const origin = touch ? { x: touch.clientX, y: touch.clientY } : undefined;
                    // Note that it's important that we don't `preventDefault` here,
                    // because it can prevent click events from firing on the element.
                    this._setupPointerExitEventsIfNeeded();
                    clearTimeout(this._touchstartTimeout);
                    this._touchstartTimeout = setTimeout(() => this.show(undefined, origin), LONGPRESS_DELAY);
                },
            ]);
        }
        this._addListeners(this._passiveListeners);
    }
    _setupPointerExitEventsIfNeeded() {
        if (this._pointerExitEventsInitialized) {
            return;
        }
        this._pointerExitEventsInitialized = true;
        const exitListeners = [];
        if (this._platformSupportsMouseEvents()) {
            exitListeners.push([
                'mouseleave',
                event => {
                    const newTarget = event.relatedTarget;
                    if (!newTarget || !this._overlayRef?.overlayElement.contains(newTarget)) {
                        this.hide();
                    }
                },
            ], ['wheel', event => this._wheelListener(event)]);
        }
        else if (this.touchGestures !== 'off') {
            this._disableNativeGesturesIfNecessary();
            const touchendListener = () => {
                clearTimeout(this._touchstartTimeout);
                this.hide(this._defaultOptions.touchendHideDelay);
            };
            exitListeners.push(['touchend', touchendListener], ['touchcancel', touchendListener]);
        }
        this._addListeners(exitListeners);
        this._passiveListeners.push(...exitListeners);
    }
    _addListeners(listeners) {
        listeners.forEach(([event, listener]) => {
            this._elementRef.nativeElement.addEventListener(event, listener, passiveListenerOptions);
        });
    }
    _platformSupportsMouseEvents() {
        return !this._platform.IOS && !this._platform.ANDROID;
    }
    /** Listener for the `wheel` event on the element. */
    _wheelListener(event) {
        if (this._isTooltipVisible()) {
            const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
            const element = this._elementRef.nativeElement;
            // On non-touch devices we depend on the `mouseleave` event to close the tooltip, but it
            // won't fire if the user scrolls away using the wheel without moving their cursor. We
            // work around it by finding the element under the user's cursor and closing the tooltip
            // if it's not the trigger.
            if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
                this.hide();
            }
        }
    }
    /** Disables the native browser gestures, based on how the tooltip has been configured. */
    _disableNativeGesturesIfNecessary() {
        const gestures = this.touchGestures;
        if (gestures !== 'off') {
            const element = this._elementRef.nativeElement;
            const style = element.style;
            // If gestures are set to `auto`, we don't disable text selection on inputs and
            // textareas, because it prevents the user from typing into them on iOS Safari.
            if (gestures === 'on' || (element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA')) {
                style.userSelect =
                    style.msUserSelect =
                        style.webkitUserSelect =
                            style.MozUserSelect =
                                'none';
            }
            // If we have `auto` gestures and the element uses native HTML dragging,
            // we don't set `-webkit-user-drag` because it prevents the native behavior.
            if (gestures === 'on' || !element.draggable) {
                style.webkitUserDrag = 'none';
            }
            style.touchAction = 'none';
            style.webkitTapHighlightColor = 'transparent';
        }
    }
}
_MatTooltipBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatTooltipBase, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
_MatTooltipBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _MatTooltipBase, inputs: { position: ["matTooltipPosition", "position"], positionAtOrigin: ["matTooltipPositionAtOrigin", "positionAtOrigin"], disabled: ["matTooltipDisabled", "disabled"], showDelay: ["matTooltipShowDelay", "showDelay"], hideDelay: ["matTooltipHideDelay", "hideDelay"], touchGestures: ["matTooltipTouchGestures", "touchGestures"], message: ["matTooltip", "message"], tooltipClass: ["matTooltipClass", "tooltipClass"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatTooltipBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ElementRef }, { type: i1.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: i0.NgZone }, { type: i2.Platform }, { type: i3.AriaDescriber }, { type: i3.FocusMonitor }, { type: undefined }, { type: i4.Directionality }, { type: undefined }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { position: [{
                type: Input,
                args: ['matTooltipPosition']
            }], positionAtOrigin: [{
                type: Input,
                args: ['matTooltipPositionAtOrigin']
            }], disabled: [{
                type: Input,
                args: ['matTooltipDisabled']
            }], showDelay: [{
                type: Input,
                args: ['matTooltipShowDelay']
            }], hideDelay: [{
                type: Input,
                args: ['matTooltipHideDelay']
            }], touchGestures: [{
                type: Input,
                args: ['matTooltipTouchGestures']
            }], message: [{
                type: Input,
                args: ['matTooltip']
            }], tooltipClass: [{
                type: Input,
                args: ['matTooltipClass']
            }] } });
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.io/design/components/tooltips.html
 */
export class MatTooltip extends _MatTooltipBase {
    constructor(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document) {
        super(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document);
        this._tooltipComponent = TooltipComponent;
        this._cssClassPrefix = 'mat-mdc';
        this._viewportMargin = MIN_VIEWPORT_TOOLTIP_THRESHOLD;
    }
    _addOffset(position) {
        const offset = UNBOUNDED_ANCHOR_GAP;
        const isLtr = !this._dir || this._dir.value == 'ltr';
        if (position.originY === 'top') {
            position.offsetY = -offset;
        }
        else if (position.originY === 'bottom') {
            position.offsetY = offset;
        }
        else if (position.originX === 'start') {
            position.offsetX = isLtr ? -offset : offset;
        }
        else if (position.originX === 'end') {
            position.offsetX = isLtr ? offset : -offset;
        }
        return position;
    }
}
MatTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTooltip, deps: [{ token: i1.Overlay }, { token: i0.ElementRef }, { token: i1.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: i0.NgZone }, { token: i2.Platform }, { token: i3.AriaDescriber }, { token: i3.FocusMonitor }, { token: MAT_TOOLTIP_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: MAT_TOOLTIP_DEFAULT_OPTIONS, optional: true }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatTooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatTooltip, selector: "[matTooltip]", host: { classAttribute: "mat-mdc-tooltip-trigger" }, exportAs: ["matTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTooltip]',
                    exportAs: 'matTooltip',
                    host: {
                        'class': 'mat-mdc-tooltip-trigger',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ElementRef }, { type: i1.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: i0.NgZone }, { type: i2.Platform }, { type: i3.AriaDescriber }, { type: i3.FocusMonitor }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_TOOLTIP_SCROLL_STRATEGY]
                }] }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_TOOLTIP_DEFAULT_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
export class _TooltipComponentBase {
    constructor(_changeDetectorRef, animationMode) {
        this._changeDetectorRef = _changeDetectorRef;
        /** Whether interactions on the page should close the tooltip */
        this._closeOnInteraction = false;
        /** Whether the tooltip is currently visible. */
        this._isVisible = false;
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new Subject();
        this._animationsDisabled = animationMode === 'NoopAnimations';
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    show(delay) {
        // Cancel the delayed hide if it is scheduled
        clearTimeout(this._hideTimeoutId);
        this._showTimeoutId = setTimeout(() => {
            this._toggleVisibility(true);
            this._showTimeoutId = undefined;
        }, delay);
    }
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    hide(delay) {
        // Cancel the delayed show if it is scheduled
        clearTimeout(this._showTimeoutId);
        this._hideTimeoutId = setTimeout(() => {
            this._toggleVisibility(false);
            this._hideTimeoutId = undefined;
        }, delay);
    }
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden() {
        return this._onHide;
    }
    /** Whether the tooltip is being displayed. */
    isVisible() {
        return this._isVisible;
    }
    ngOnDestroy() {
        this._cancelPendingAnimations();
        this._onHide.complete();
        this._triggerElement = null;
    }
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.io/design/components/tooltips.html#behavior
     */
    _handleBodyInteraction() {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    }
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     */
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
    _handleMouseLeave({ relatedTarget }) {
        if (!relatedTarget || !this._triggerElement.contains(relatedTarget)) {
            if (this.isVisible()) {
                this.hide(this._mouseLeaveHideDelay);
            }
            else {
                this._finalizeAnimation(false);
            }
        }
    }
    /**
     * Callback for when the timeout in this.show() gets completed.
     * This method is only needed by the mdc-tooltip, and so it is only implemented
     * in the mdc-tooltip, not here.
     */
    _onShow() { }
    /** Event listener dispatched when an animation on the tooltip finishes. */
    _handleAnimationEnd({ animationName }) {
        if (animationName === this._showAnimation || animationName === this._hideAnimation) {
            this._finalizeAnimation(animationName === this._showAnimation);
        }
    }
    /** Cancels any pending animation sequences. */
    _cancelPendingAnimations() {
        clearTimeout(this._showTimeoutId);
        clearTimeout(this._hideTimeoutId);
        this._showTimeoutId = this._hideTimeoutId = undefined;
    }
    /** Handles the cleanup after an animation has finished. */
    _finalizeAnimation(toVisible) {
        if (toVisible) {
            this._closeOnInteraction = true;
        }
        else if (!this.isVisible()) {
            this._onHide.next();
        }
    }
    /** Toggles the visibility of the tooltip element. */
    _toggleVisibility(isVisible) {
        // We set the classes directly here ourselves so that toggling the tooltip state
        // isn't bound by change detection. This allows us to hide it even if the
        // view ref has been detached from the CD tree.
        const tooltip = this._tooltip.nativeElement;
        const showClass = this._showAnimation;
        const hideClass = this._hideAnimation;
        tooltip.classList.remove(isVisible ? hideClass : showClass);
        tooltip.classList.add(isVisible ? showClass : hideClass);
        this._isVisible = isVisible;
        // It's common for internal apps to disable animations using `* { animation: none !important }`
        // which can break the opening sequence. Try to detect such cases and work around them.
        if (isVisible && !this._animationsDisabled && typeof getComputedStyle === 'function') {
            const styles = getComputedStyle(tooltip);
            // Use `getPropertyValue` to avoid issues with property renaming.
            if (styles.getPropertyValue('animation-duration') === '0s' ||
                styles.getPropertyValue('animation-name') === 'none') {
                this._animationsDisabled = true;
            }
        }
        if (isVisible) {
            this._onShow();
        }
        if (this._animationsDisabled) {
            tooltip.classList.add('_mat-animation-noopable');
            this._finalizeAnimation(isVisible);
        }
    }
}
_TooltipComponentBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _TooltipComponentBase, deps: [{ token: i0.ChangeDetectorRef }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
_TooltipComponentBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _TooltipComponentBase, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _TooltipComponentBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; } });
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
export class TooltipComponent extends _TooltipComponentBase {
    constructor(changeDetectorRef, _elementRef, animationMode) {
        super(changeDetectorRef, animationMode);
        this._elementRef = _elementRef;
        /* Whether the tooltip text overflows to multiple lines */
        this._isMultiline = false;
        this._showAnimation = 'mat-mdc-tooltip-show';
        this._hideAnimation = 'mat-mdc-tooltip-hide';
    }
    _onShow() {
        this._isMultiline = this._isTooltipMultiline();
        this._markForCheck();
    }
    /** Whether the tooltip text has overflown to the next line */
    _isTooltipMultiline() {
        const rect = this._elementRef.nativeElement.getBoundingClientRect();
        return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
    }
}
TooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: TooltipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
TooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: TooltipComponent, selector: "mat-tooltip-component", host: { attributes: { "aria-hidden": "true" }, listeners: { "mouseleave": "_handleMouseLeave($event)" }, properties: { "style.zoom": "isVisible() ? 1 : null" } }, viewQueries: [{ propertyName: "_tooltip", first: true, predicate: ["tooltip"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div\n  #tooltip\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  (animationend)=\"_handleAnimationEnd($event)\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n", styles: [".mdc-tooltip__surface{word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{position:fixed;display:none;z-index:9}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;display:flex;flex-direction:column;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(200px - (2 * 8px));margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(320px - (2 * 8px));align-self:stretch}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions,.mdc-tooltip__content,.mdc-tooltip__title{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mdc-tooltip__surface{background-color:var(--mdc-plain-tooltip-container-color, #fff)}.mdc-tooltip__surface{border-radius:var(--mdc-plain-tooltip-container-shape, var(--mdc-shape-small, 4px))}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:var(--mdc-plain-tooltip-container-shape, var(--mdc-shape-small, 4px))}.mdc-tooltip__surface{color:var(--mdc-plain-tooltip-supporting-text-color, #000)}.mdc-tooltip__surface{font-family:var(--mdc-plain-tooltip-supporting-text-font, inherit);font-size:var(--mdc-plain-tooltip-supporting-text-size, inherit);font-weight:var(--mdc-plain-tooltip-supporting-text-weight, inherit);letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking, inherit)}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:\"\";top:-8px;right:-8px;bottom:-8px;left:-8px;z-index:-1;position:absolute}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tooltip-component', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                        // won't be rendered if the animations are disabled or there is no web animations polyfill.
                        '[style.zoom]': 'isVisible() ? 1 : null',
                        '(mouseleave)': '_handleMouseLeave($event)',
                        'aria-hidden': 'true',
                    }, template: "<div\n  #tooltip\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  (animationend)=\"_handleAnimationEnd($event)\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n", styles: [".mdc-tooltip__surface{word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{position:fixed;display:none;z-index:9}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;display:flex;flex-direction:column;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(200px - (2 * 8px));margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(320px - (2 * 8px));align-self:stretch}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions,.mdc-tooltip__content,.mdc-tooltip__title{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mdc-tooltip__surface{background-color:var(--mdc-plain-tooltip-container-color, #fff)}.mdc-tooltip__surface{border-radius:var(--mdc-plain-tooltip-container-shape, var(--mdc-shape-small, 4px))}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:var(--mdc-plain-tooltip-container-shape, var(--mdc-shape-small, 4px))}.mdc-tooltip__surface{color:var(--mdc-plain-tooltip-supporting-text-color, #000)}.mdc-tooltip__surface{font-family:var(--mdc-plain-tooltip-supporting-text-font, inherit);font-size:var(--mdc-plain-tooltip-supporting-text-size, inherit);font-weight:var(--mdc-plain-tooltip-supporting-text-weight, inherit);letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking, inherit)}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:\"\";top:-8px;right:-8px;bottom:-8px;left:-8px;z-index:-1;position:absolute}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { _tooltip: [{
                type: ViewChild,
                args: ['tooltip', {
                        // Use a static query here since we interact directly with
                        // the DOM which can happen before `ngAfterViewInit`.
                        static: true,
                    }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC90b29sdGlwL3Rvb2x0aXAudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvdG9vbHRpcC90b29sdGlwLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBRUwscUJBQXFCLEVBQ3JCLG9CQUFvQixHQUVyQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBQyxNQUFNLEVBQUUsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLCtCQUErQixFQUFFLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFPTCxPQUFPLEVBR1AsZ0JBQWdCLEdBR2pCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBYSxPQUFP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LENBQUM7SUFFRCw4REFBOEQ7SUFDdEQsbUJBQW1CO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDcEUsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztJQUM3RCxDQUFDOztrSEEvQlUsZ0JBQWdCLDZFQWlCTCxxQkFBcUI7c0dBakJoQyxnQkFBZ0IsMFdDNWxDN0Isb1RBUUE7Z0dEb2xDYSxnQkFBZ0I7a0JBZDVCLFNBQVM7K0JBQ0UsdUJBQXVCLGlCQUdsQixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDO3dCQUNKLDBGQUEwRjt3QkFDMUYsMkZBQTJGO3dCQUMzRixjQUFjLEVBQUUsd0JBQXdCO3dCQUN4QyxjQUFjLEVBQUUsMkJBQTJCO3dCQUMzQyxhQUFhLEVBQUUsTUFBTTtxQkFDdEI7OzBCQW1CRSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLHFCQUFxQjs0Q0FQM0MsUUFBUTtzQkFMUCxTQUFTO3VCQUFDLFNBQVMsRUFBRTt3QkFDcEIsMERBQTBEO3dCQUMxRCxxREFBcUQ7d0JBQ3JELE1BQU0sRUFBRSxJQUFJO3FCQUNiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge3Rha2UsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQm9vbGVhbklucHV0LFxuICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gIGNvZXJjZU51bWJlclByb3BlcnR5LFxuICBOdW1iZXJJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7RVNDQVBFLCBoYXNNb2RpZmllcktleX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7bm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucywgUGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7QXJpYURlc2NyaWJlciwgRm9jdXNNb25pdG9yfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDb21wb25lbnRUeXBlLFxuICBDb25uZWN0ZWRQb3NpdGlvbixcbiAgQ29ubmVjdGlvblBvc2l0aW9uUGFpcixcbiAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyxcbiAgT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uLFxuICBPdmVybGF5LFxuICBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uLFxuICBPdmVybGF5UmVmLFxuICBTY3JvbGxEaXNwYXRjaGVyLFxuICBTY3JvbGxTdHJhdGVneSxcbiAgVmVydGljYWxDb25uZWN0aW9uUG9zLFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge0NvbXBvbmVudFBvcnRhbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG4vKiogUG9zc2libGUgcG9zaXRpb25zIGZvciBhIHRvb2x0aXAuICovXG5leHBvcnQgdHlwZSBUb29sdGlwUG9zaXRpb24gPSAnbGVmdCcgfCAncmlnaHQnIHwgJ2Fib3ZlJyB8ICdiZWxvdycgfCAnYmVmb3JlJyB8ICdhZnRlcic7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgaG93IHRoZSB0b29sdGlwIHRyaWdnZXIgc2hvdWxkIGhhbmRsZSB0b3VjaCBnZXN0dXJlcy5cbiAqIFNlZSBgTWF0VG9vbHRpcC50b3VjaEdlc3R1cmVzYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IHR5cGUgVG9vbHRpcFRvdWNoR2VzdHVyZXMgPSAnYXV0bycgfCAnb24nIHwgJ29mZic7XG5cbi8qKiBQb3NzaWJsZSB2aXNpYmlsaXR5IHN0YXRlcyBvZiBhIHRvb2x0aXAuICovXG5leHBvcnQgdHlwZSBUb29sdGlwVmlzaWJpbGl0eSA9ICdpbml0aWFsJyB8ICd2aXNpYmxlJyB8ICdoaWRkZW4nO1xuXG4vKiogVGltZSBpbiBtcyB0byB0aHJvdHRsZSByZXBvc2l0aW9uaW5nIGFmdGVyIHNjcm9sbCBldmVudHMuICovXG5leHBvcnQgY29uc3QgU0NST0xMX1RIUk9UVExFX01TID0gMjA7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCB0b29sdGlwIHBvc2l0aW9uLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0VG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgcmV0dXJuIEVycm9yKGBUb29sdGlwIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIiBpcyBpbnZhbGlkLmApO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIGEgdG9vbHRpcCBpcyB2aXNpYmxlLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oXG4gICdtYXQtdG9vbHRpcC1zY3JvbGwtc3RyYXRlZ3knLFxuKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oe3Njcm9sbFRocm90dGxlOiBTQ1JPTExfVEhST1RUTEVfTVN9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLFxuICBkZXBzOiBbT3ZlcmxheV0sXG4gIHVzZUZhY3Rvcnk6IE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZLFxufTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfVE9PTFRJUF9ERUZBVUxUX09QVElPTlNfRkFDVE9SWSgpOiBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMge1xuICByZXR1cm4ge1xuICAgIHNob3dEZWxheTogMCxcbiAgICBoaWRlRGVsYXk6IDAsXG4gICAgdG91Y2hlbmRIaWRlRGVsYXk6IDE1MDAsXG4gIH07XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdG8gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBgbWF0VG9vbHRpcGAuICovXG5leHBvcnQgY29uc3QgTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPE1hdFRvb2x0aXBEZWZhdWx0T3B0aW9ucz4oXG4gICdtYXQtdG9vbHRpcC1kZWZhdWx0LW9wdGlvbnMnLFxuICB7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIGZhY3Rvcnk6IE1BVF9UT09MVElQX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZLFxuICB9LFxuKTtcblxuLyoqIERlZmF1bHQgYG1hdFRvb2x0aXBgIG9wdGlvbnMgdGhhdCBjYW4gYmUgb3ZlcnJpZGRlbi4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zIHtcbiAgLyoqIERlZmF1bHQgZGVsYXkgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93bi4gKi9cbiAgc2hvd0RlbGF5OiBudW1iZXI7XG5cbiAgLyoqIERlZmF1bHQgZGVsYXkgd2hlbiB0aGUgdG9vbHRpcCBpcyBoaWRkZW4uICovXG4gIGhpZGVEZWxheTogbnVtYmVyO1xuXG4gIC8qKiBEZWZhdWx0IGRlbGF5IHdoZW4gaGlkaW5nIHRoZSB0b29sdGlwIG9uIGEgdG91Y2ggZGV2aWNlLiAqL1xuICB0b3VjaGVuZEhpZGVEZWxheTogbnVtYmVyO1xuXG4gIC8qKiBEZWZhdWx0IHRvdWNoIGdlc3R1cmUgaGFuZGxpbmcgZm9yIHRvb2x0aXBzLiAqL1xuICB0b3VjaEdlc3R1cmVzPzogVG9vbHRpcFRvdWNoR2VzdHVyZXM7XG5cbiAgLyoqIERlZmF1bHQgcG9zaXRpb24gZm9yIHRvb2x0aXBzLiAqL1xuICBwb3NpdGlvbj86IFRvb2x0aXBQb3NpdGlvbjtcblxuICAvKipcbiAgICogRGVmYXVsdCB2YWx1ZSBmb3Igd2hldGhlciB0b29sdGlwcyBzaG91bGQgYmUgcG9zaXRpb25lZCBuZWFyIHRoZSBjbGljayBvciB0b3VjaCBvcmlnaW5cbiAgICogaW5zdGVhZCBvZiBvdXRzaWRlIHRoZSBlbGVtZW50IGJvdW5kaW5nIGJveC5cbiAgICovXG4gIHBvc2l0aW9uQXRPcmlnaW4/OiBib29sZWFuO1xuXG4gIC8qKiBEaXNhYmxlcyB0aGUgYWJpbGl0eSBmb3IgdGhlIHVzZXIgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgdG9vbHRpcCBlbGVtZW50LiAqL1xuICBkaXNhYmxlVG9vbHRpcEludGVyYWN0aXZpdHk/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIENTUyBjbGFzcyB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIG92ZXJsYXkgcGFuZWwuXG4gKiBAZGVwcmVjYXRlZFxuICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjAgcmVtb3ZlIHRoaXMgdmFyaWFibGVcbiAqL1xuZXhwb3J0IGNvbnN0IFRPT0xUSVBfUEFORUxfQ0xBU1MgPSAnbWF0LW1kYy10b29sdGlwLXBhbmVsJztcblxuY29uc3QgUEFORUxfQ0xBU1MgPSAndG9vbHRpcC1wYW5lbCc7XG5cbi8qKiBPcHRpb25zIHVzZWQgdG8gYmluZCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycy4gKi9cbmNvbnN0IHBhc3NpdmVMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiB0cnVlfSk7XG5cbi8qKlxuICogVGltZSBiZXR3ZWVuIHRoZSB1c2VyIHB1dHRpbmcgdGhlIHBvaW50ZXIgb24gYSB0b29sdGlwXG4gKiB0cmlnZ2VyIGFuZCB0aGUgbG9uZyBwcmVzcyBldmVudCBiZWluZyBmaXJlZC5cbiAqL1xuY29uc3QgTE9OR1BSRVNTX0RFTEFZID0gNTAwO1xuXG4vLyBUaGVzZSBjb25zdGFudHMgd2VyZSB0YWtlbiBmcm9tIE1EQydzIGBudW1iZXJzYCBvYmplY3QuIFdlIGNhbid0IGltcG9ydCB0aGVtIGZyb20gTURDLFxuLy8gYmVjYXVzZSB0aGV5IGhhdmUgc29tZSB0b3AtbGV2ZWwgcmVmZXJlbmNlcyB0byBgd2luZG93YCB3aGljaCBicmVhayBkdXJpbmcgU1NSLlxuY29uc3QgTUlOX1ZJRVdQT1JUX1RPT0xUSVBfVEhSRVNIT0xEID0gODtcbmNvbnN0IFVOQk9VTkRFRF9BTkNIT1JfR0FQID0gODtcbmNvbnN0IE1JTl9IRUlHSFQgPSAyNDtcbmNvbnN0IE1BWF9XSURUSCA9IDIwMDtcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgX01hdFRvb2x0aXBCYXNlPFQgZXh0ZW5kcyBfVG9vbHRpcENvbXBvbmVudEJhc2U+XG4gIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0XG57XG4gIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgX3Rvb2x0aXBJbnN0YW5jZTogVCB8IG51bGw7XG5cbiAgcHJpdmF0ZSBfcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD47XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBUb29sdGlwUG9zaXRpb24gPSAnYmVsb3cnO1xuICBwcml2YXRlIF9wb3NpdGlvbkF0T3JpZ2luOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3Rvb2x0aXBDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICBwcml2YXRlIF9zY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG4gIHByaXZhdGUgX3ZpZXdJbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIF9wb2ludGVyRXhpdEV2ZW50c0luaXRpYWxpemVkID0gZmFsc2U7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSBfdG9vbHRpcENvbXBvbmVudDogQ29tcG9uZW50VHlwZTxUPjtcbiAgcHJvdGVjdGVkIF92aWV3cG9ydE1hcmdpbiA9IDg7XG4gIHByaXZhdGUgX2N1cnJlbnRQb3NpdGlvbjogVG9vbHRpcFBvc2l0aW9uO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Nzc0NsYXNzUHJlZml4OiBzdHJpbmcgPSAnbWF0JztcblxuICAvKiogQWxsb3dzIHRoZSB1c2VyIHRvIGRlZmluZSB0aGUgcG9zaXRpb24gb2YgdGhlIHRvb2x0aXAgcmVsYXRpdmUgdG8gdGhlIHBhcmVudCBlbGVtZW50ICovXG4gIEBJbnB1dCgnbWF0VG9vbHRpcFBvc2l0aW9uJylcbiAgZ2V0IHBvc2l0aW9uKCk6IFRvb2x0aXBQb3NpdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiBUb29sdGlwUG9zaXRpb24pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Bvc2l0aW9uKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuXG4gICAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbih0aGlzLl9vdmVybGF5UmVmKTtcbiAgICAgICAgdGhpcy5fdG9vbHRpcEluc3RhbmNlPy5zaG93KDApO1xuICAgICAgICB0aGlzLl9vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdtYXRUb29sdGlwUG9zaXRpb25BdE9yaWdpbicpXG4gIGdldCBwb3NpdGlvbkF0T3JpZ2luKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbkF0T3JpZ2luO1xuICB9XG4gIHNldCBwb3NpdGlvbkF0T3JpZ2luKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9wb3NpdGlvbkF0T3JpZ2luID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9kZXRhY2goKTtcbiAgICB0aGlzLl9vdmVybGF5UmVmID0gbnVsbDtcbiAgfVxuXG4gIC8qKiBEaXNhYmxlcyB0aGUgZGlzcGxheSBvZiB0aGUgdG9vbHRpcC4gKi9cbiAgQElucHV0KCdtYXRUb29sdGlwRGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAvLyBJZiB0b29sdGlwIGlzIGRpc2FibGVkLCBoaWRlIGltbWVkaWF0ZWx5LlxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5oaWRlKDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXR1cFBvaW50ZXJFbnRlckV2ZW50c0lmTmVlZGVkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBkZWZhdWx0IGRlbGF5IGluIG1zIGJlZm9yZSBzaG93aW5nIHRoZSB0b29sdGlwIGFmdGVyIHNob3cgaXMgY2FsbGVkICovXG4gIEBJbnB1dCgnbWF0VG9vbHRpcFNob3dEZWxheScpXG4gIGdldCBzaG93RGVsYXkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0RlbGF5O1xuICB9XG5cbiAgc2V0IHNob3dEZWxheSh2YWx1ZTogTnVtYmVySW5wdXQpIHtcbiAgICB0aGlzLl9zaG93RGVsYXkgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zaG93RGVsYXkgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5zaG93RGVsYXk7XG5cbiAgLyoqIFRoZSBkZWZhdWx0IGRlbGF5IGluIG1zIGJlZm9yZSBoaWRpbmcgdGhlIHRvb2x0aXAgYWZ0ZXIgaGlkZSBpcyBjYWxsZWQgKi9cbiAgQElucHV0KCdtYXRUb29sdGlwSGlkZURlbGF5JylcbiAgZ2V0IGhpZGVEZWxheSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9oaWRlRGVsYXk7XG4gIH1cblxuICBzZXQgaGlkZURlbGF5KHZhbHVlOiBOdW1iZXJJbnB1dCkge1xuICAgIHRoaXMuX2hpZGVEZWxheSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcblxuICAgIGlmICh0aGlzLl90b29sdGlwSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5fbW91c2VMZWF2ZUhpZGVEZWxheSA9IHRoaXMuX2hpZGVEZWxheTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oaWRlRGVsYXkgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5oaWRlRGVsYXk7XG5cbiAgLyoqXG4gICAqIEhvdyB0b3VjaCBnZXN0dXJlcyBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGUgdG9vbHRpcC4gT24gdG91Y2ggZGV2aWNlcyB0aGUgdG9vbHRpcCBkaXJlY3RpdmVcbiAgICogdXNlcyBhIGxvbmcgcHJlc3MgZ2VzdHVyZSB0byBzaG93IGFuZCBoaWRlLCBob3dldmVyIGl0IGNhbiBjb25mbGljdCB3aXRoIHRoZSBuYXRpdmUgYnJvd3NlclxuICAgKiBnZXN0dXJlcy4gVG8gd29yayBhcm91bmQgdGhlIGNvbmZsaWN0LCBBbmd1bGFyIE1hdGVyaWFsIGRpc2FibGVzIG5hdGl2ZSBnZXN0dXJlcyBvbiB0aGVcbiAgICogdHJpZ2dlciwgYnV0IHRoYXQgbWlnaHQgbm90IGJlIGRlc2lyYWJsZSBvbiBwYXJ0aWN1bGFyIGVsZW1lbnRzIChlLmcuIGlucHV0cyBhbmQgZHJhZ2dhYmxlXG4gICAqIGVsZW1lbnRzKS4gVGhlIGRpZmZlcmVudCB2YWx1ZXMgZm9yIHRoaXMgb3B0aW9uIGNvbmZpZ3VyZSB0aGUgdG91Y2ggZXZlbnQgaGFuZGxpbmcgYXMgZm9sbG93czpcbiAgICogLSBgYXV0b2AgLSBFbmFibGVzIHRvdWNoIGdlc3R1cmVzIGZvciBhbGwgZWxlbWVudHMsIGJ1dCB0cmllcyB0byBhdm9pZCBjb25mbGljdHMgd2l0aCBuYXRpdmVcbiAgICogICBicm93c2VyIGdlc3R1cmVzIG9uIHBhcnRpY3VsYXIgZWxlbWVudHMuIEluIHBhcnRpY3VsYXIsIGl0IGFsbG93cyB0ZXh0IHNlbGVjdGlvbiBvbiBpbnB1dHNcbiAgICogICBhbmQgdGV4dGFyZWFzLCBhbmQgcHJlc2VydmVzIHRoZSBuYXRpdmUgYnJvd3NlciBkcmFnZ2luZyBvbiBlbGVtZW50cyBtYXJrZWQgYXMgYGRyYWdnYWJsZWAuXG4gICAqIC0gYG9uYCAtIEVuYWJsZXMgdG91Y2ggZ2VzdHVyZXMgZm9yIGFsbCBlbGVtZW50cyBhbmQgZGlzYWJsZXMgbmF0aXZlXG4gICAqICAgYnJvd3NlciBnZXN0dXJlcyB3aXRoIG5vIGV4Y2VwdGlvbnMuXG4gICAqIC0gYG9mZmAgLSBEaXNhYmxlcyB0b3VjaCBnZXN0dXJlcy4gTm90ZSB0aGF0IHRoaXMgd2lsbCBwcmV2ZW50IHRoZSB0b29sdGlwIGZyb21cbiAgICogICBzaG93aW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAqL1xuICBASW5wdXQoJ21hdFRvb2x0aXBUb3VjaEdlc3R1cmVzJykgdG91Y2hHZXN0dXJlczogVG9vbHRpcFRvdWNoR2VzdHVyZXMgPSAnYXV0byc7XG5cbiAgLyoqIFRoZSBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdG9vbHRpcCAqL1xuICBASW5wdXQoJ21hdFRvb2x0aXAnKVxuICBnZXQgbWVzc2FnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcbiAgfVxuXG4gIHNldCBtZXNzYWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hcmlhRGVzY3JpYmVyLnJlbW92ZURlc2NyaXB0aW9uKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fbWVzc2FnZSwgJ3Rvb2x0aXAnKTtcblxuICAgIC8vIElmIHRoZSBtZXNzYWdlIGlzIG5vdCBhIHN0cmluZyAoZS5nLiBudW1iZXIpLCBjb252ZXJ0IGl0IHRvIGEgc3RyaW5nIGFuZCB0cmltIGl0LlxuICAgIC8vIE11c3QgY29udmVydCB3aXRoIGBTdHJpbmcodmFsdWUpYCwgbm90IGAke3ZhbHVlfWAsIG90aGVyd2lzZSBDbG9zdXJlIENvbXBpbGVyIG9wdGltaXNlc1xuICAgIC8vIGF3YXkgdGhlIHN0cmluZy1jb252ZXJzaW9uOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8yMDY4NFxuICAgIHRoaXMuX21lc3NhZ2UgPSB2YWx1ZSAhPSBudWxsID8gU3RyaW5nKHZhbHVlKS50cmltKCkgOiAnJztcblxuICAgIGlmICghdGhpcy5fbWVzc2FnZSAmJiB0aGlzLl9pc1Rvb2x0aXBWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMuaGlkZSgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0dXBQb2ludGVyRW50ZXJFdmVudHNJZk5lZWRlZCgpO1xuICAgICAgdGhpcy5fdXBkYXRlVG9vbHRpcE1lc3NhZ2UoKTtcbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIC8vIFRoZSBgQXJpYURlc2NyaWJlcmAgaGFzIHNvbWUgZnVuY3Rpb25hbGl0eSB0aGF0IGF2b2lkcyBhZGRpbmcgYSBkZXNjcmlwdGlvbiBpZiBpdCdzIHRoZVxuICAgICAgICAvLyBzYW1lIGFzIHRoZSBgYXJpYS1sYWJlbGAgb2YgYW4gZWxlbWVudCwgaG93ZXZlciB3ZSBjYW4ndCBrbm93IHdoZXRoZXIgdGhlIHRvb2x0aXAgdHJpZ2dlclxuICAgICAgICAvLyBoYXMgYSBkYXRhLWJvdW5kIGBhcmlhLWxhYmVsYCBvciB3aGVuIGl0J2xsIGJlIHNldCBmb3IgdGhlIGZpcnN0IHRpbWUuIFdlIGNhbiBhdm9pZCB0aGVcbiAgICAgICAgLy8gaXNzdWUgYnkgZGVmZXJyaW5nIHRoZSBkZXNjcmlwdGlvbiBieSBhIHRpY2sgc28gQW5ndWxhciBoYXMgdGltZSB0byBzZXQgdGhlIGBhcmlhLWxhYmVsYC5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fYXJpYURlc2NyaWJlci5kZXNjcmliZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMubWVzc2FnZSwgJ3Rvb2x0aXAnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9tZXNzYWdlID0gJyc7XG5cbiAgLyoqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSB0b29sdGlwLiBTdXBwb3J0cyB0aGUgc2FtZSBzeW50YXggYXMgYG5nQ2xhc3NgLiAqL1xuICBASW5wdXQoJ21hdFRvb2x0aXBDbGFzcycpXG4gIGdldCB0b29sdGlwQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBDbGFzcztcbiAgfVxuXG4gIHNldCB0b29sdGlwQ2xhc3ModmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIHRoaXMuX3Rvb2x0aXBDbGFzcyA9IHZhbHVlO1xuICAgIGlmICh0aGlzLl90b29sdGlwSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3NldFRvb2x0aXBDbGFzcyh0aGlzLl90b29sdGlwQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNYW51YWxseS1ib3VuZCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycy4gKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfcGFzc2l2ZUxpc3RlbmVyczogKHJlYWRvbmx5IFtzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RdKVtdID1cbiAgICBbXTtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IGRvY3VtZW50LiAqL1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgLyoqIFRpbWVyIHN0YXJ0ZWQgYXQgdGhlIGxhc3QgYHRvdWNoc3RhcnRgIGV2ZW50LiAqL1xuICBwcml2YXRlIF90b3VjaHN0YXJ0VGltZW91dDogbnVtYmVyO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBwcml2YXRlIF9hcmlhRGVzY3JpYmVyOiBBcmlhRGVzY3JpYmVyLFxuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgcHJvdGVjdGVkIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMsXG4gICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICkge1xuICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gc2Nyb2xsU3RyYXRlZ3k7XG4gICAgdGhpcy5fZG9jdW1lbnQgPSBfZG9jdW1lbnQ7XG5cbiAgICBpZiAoX2RlZmF1bHRPcHRpb25zKSB7XG4gICAgICBpZiAoX2RlZmF1bHRPcHRpb25zLnBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBfZGVmYXVsdE9wdGlvbnMucG9zaXRpb247XG4gICAgICB9XG5cbiAgICAgIGlmIChfZGVmYXVsdE9wdGlvbnMucG9zaXRpb25BdE9yaWdpbikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uQXRPcmlnaW4gPSBfZGVmYXVsdE9wdGlvbnMucG9zaXRpb25BdE9yaWdpbjtcbiAgICAgIH1cblxuICAgICAgaWYgKF9kZWZhdWx0T3B0aW9ucy50b3VjaEdlc3R1cmVzKSB7XG4gICAgICAgIHRoaXMudG91Y2hHZXN0dXJlcyA9IF9kZWZhdWx0T3B0aW9ucy50b3VjaEdlc3R1cmVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9kaXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbih0aGlzLl9vdmVybGF5UmVmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBUaGlzIG5lZWRzIHRvIGhhcHBlbiBhZnRlciB2aWV3IGluaXQgc28gdGhlIGluaXRpYWwgdmFsdWVzIGZvciBhbGwgaW5wdXRzIGhhdmUgYmVlbiBzZXQuXG4gICAgdGhpcy5fdmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9zZXR1cFBvaW50ZXJFbnRlckV2ZW50c0lmTmVlZGVkKCk7XG5cbiAgICB0aGlzLl9mb2N1c01vbml0b3JcbiAgICAgIC5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUob3JpZ2luID0+IHtcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoZSBmb2N1cyBtb25pdG9yIHJ1bnMgb3V0c2lkZSB0aGUgQW5ndWxhciB6b25lLlxuICAgICAgICBpZiAoIW9yaWdpbikge1xuICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5oaWRlKDApKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcmlnaW4gPT09ICdrZXlib2FyZCcpIHtcbiAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuc2hvdygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgdG9vbHRpcCB3aGVuIGRlc3Ryb3llZC5cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdG91Y2hzdGFydFRpbWVvdXQpO1xuXG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5fdG9vbHRpcEluc3RhbmNlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBDbGVhbiB1cCB0aGUgZXZlbnQgbGlzdGVuZXJzIHNldCBpbiB0aGUgY29uc3RydWN0b3JcbiAgICB0aGlzLl9wYXNzaXZlTGlzdGVuZXJzLmZvckVhY2goKFtldmVudCwgbGlzdGVuZXJdKSA9PiB7XG4gICAgICBuYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBwYXNzaXZlTGlzdGVuZXJPcHRpb25zKTtcbiAgICB9KTtcbiAgICB0aGlzLl9wYXNzaXZlTGlzdGVuZXJzLmxlbmd0aCA9IDA7XG5cbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuXG4gICAgdGhpcy5fYXJpYURlc2NyaWJlci5yZW1vdmVEZXNjcmlwdGlvbihuYXRpdmVFbGVtZW50LCB0aGlzLm1lc3NhZ2UsICd0b29sdGlwJyk7XG4gICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKG5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgLyoqIFNob3dzIHRoZSB0b29sdGlwIGFmdGVyIHRoZSBkZWxheSBpbiBtcywgZGVmYXVsdHMgdG8gdG9vbHRpcC1kZWxheS1zaG93IG9yIDBtcyBpZiBubyBpbnB1dCAqL1xuICBzaG93KGRlbGF5OiBudW1iZXIgPSB0aGlzLnNob3dEZWxheSwgb3JpZ2luPzoge3g6IG51bWJlcjsgeTogbnVtYmVyfSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLm1lc3NhZ2UgfHwgdGhpcy5faXNUb29sdGlwVmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLl90b29sdGlwSW5zdGFuY2U/Ll9jYW5jZWxQZW5kaW5nQW5pbWF0aW9ucygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLl9jcmVhdGVPdmVybGF5KG9yaWdpbik7XG4gICAgdGhpcy5fZGV0YWNoKCk7XG4gICAgdGhpcy5fcG9ydGFsID1cbiAgICAgIHRoaXMuX3BvcnRhbCB8fCBuZXcgQ29tcG9uZW50UG9ydGFsKHRoaXMuX3Rvb2x0aXBDb21wb25lbnQsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICAgIGNvbnN0IGluc3RhbmNlID0gKHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSA9IG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMuX3BvcnRhbCkuaW5zdGFuY2UpO1xuICAgIGluc3RhbmNlLl90cmlnZ2VyRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBpbnN0YW5jZS5fbW91c2VMZWF2ZUhpZGVEZWxheSA9IHRoaXMuX2hpZGVEZWxheTtcbiAgICBpbnN0YW5jZVxuICAgICAgLmFmdGVySGlkZGVuKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9kZXRhY2goKSk7XG4gICAgdGhpcy5fc2V0VG9vbHRpcENsYXNzKHRoaXMuX3Rvb2x0aXBDbGFzcyk7XG4gICAgdGhpcy5fdXBkYXRlVG9vbHRpcE1lc3NhZ2UoKTtcbiAgICBpbnN0YW5jZS5zaG93KGRlbGF5KTtcbiAgfVxuXG4gIC8qKiBIaWRlcyB0aGUgdG9vbHRpcCBhZnRlciB0aGUgZGVsYXkgaW4gbXMsIGRlZmF1bHRzIHRvIHRvb2x0aXAtZGVsYXktaGlkZSBvciAwbXMgaWYgbm8gaW5wdXQgKi9cbiAgaGlkZShkZWxheTogbnVtYmVyID0gdGhpcy5oaWRlRGVsYXkpOiB2b2lkIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuX3Rvb2x0aXBJbnN0YW5jZTtcblxuICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgaWYgKGluc3RhbmNlLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgIGluc3RhbmNlLmhpZGUoZGVsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5zdGFuY2UuX2NhbmNlbFBlbmRpbmdBbmltYXRpb25zKCk7XG4gICAgICAgIHRoaXMuX2RldGFjaCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBTaG93cy9oaWRlcyB0aGUgdG9vbHRpcCAqL1xuICB0b2dnbGUob3JpZ2luPzoge3g6IG51bWJlcjsgeTogbnVtYmVyfSk6IHZvaWQge1xuICAgIHRoaXMuX2lzVG9vbHRpcFZpc2libGUoKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KHVuZGVmaW5lZCwgb3JpZ2luKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRvb2x0aXAgaXMgY3VycmVudGx5IHZpc2libGUgdG8gdGhlIHVzZXIgKi9cbiAgX2lzVG9vbHRpcFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fdG9vbHRpcEluc3RhbmNlICYmIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5pc1Zpc2libGUoKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KG9yaWdpbj86IHt4OiBudW1iZXI7IHk6IG51bWJlcn0pOiBPdmVybGF5UmVmIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgY29uc3QgZXhpc3RpbmdTdHJhdGVneSA9IHRoaXMuX292ZXJsYXlSZWYuZ2V0Q29uZmlnKClcbiAgICAgICAgLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuXG4gICAgICBpZiAoKCF0aGlzLnBvc2l0aW9uQXRPcmlnaW4gfHwgIW9yaWdpbikgJiYgZXhpc3RpbmdTdHJhdGVneS5fb3JpZ2luIGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3ZlcmxheVJlZjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2Nyb2xsYWJsZUFuY2VzdG9ycyA9IHRoaXMuX3Njcm9sbERpc3BhdGNoZXIuZ2V0QW5jZXN0b3JTY3JvbGxDb250YWluZXJzKFxuICAgICAgdGhpcy5fZWxlbWVudFJlZixcbiAgICApO1xuXG4gICAgLy8gQ3JlYXRlIGNvbm5lY3RlZCBwb3NpdGlvbiBzdHJhdGVneSB0aGF0IGxpc3RlbnMgZm9yIHNjcm9sbCBldmVudHMgdG8gcmVwb3NpdGlvbi5cbiAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMuX292ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLnBvc2l0aW9uQXRPcmlnaW4gPyBvcmlnaW4gfHwgdGhpcy5fZWxlbWVudFJlZiA6IHRoaXMuX2VsZW1lbnRSZWYpXG4gICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKGAuJHt0aGlzLl9jc3NDbGFzc1ByZWZpeH0tdG9vbHRpcGApXG4gICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgIC53aXRoVmlld3BvcnRNYXJnaW4odGhpcy5fdmlld3BvcnRNYXJnaW4pXG4gICAgICAud2l0aFNjcm9sbGFibGVDb250YWluZXJzKHNjcm9sbGFibGVBbmNlc3RvcnMpO1xuXG4gICAgc3RyYXRlZ3kucG9zaXRpb25DaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZShjaGFuZ2UgPT4ge1xuICAgICAgdGhpcy5fdXBkYXRlQ3VycmVudFBvc2l0aW9uQ2xhc3MoY2hhbmdlLmNvbm5lY3Rpb25QYWlyKTtcblxuICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSkge1xuICAgICAgICBpZiAoY2hhbmdlLnNjcm9sbGFibGVWaWV3UHJvcGVydGllcy5pc092ZXJsYXlDbGlwcGVkICYmIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5pc1Zpc2libGUoKSkge1xuICAgICAgICAgIC8vIEFmdGVyIHBvc2l0aW9uIGNoYW5nZXMgb2NjdXIgYW5kIHRoZSBvdmVybGF5IGlzIGNsaXBwZWQgYnlcbiAgICAgICAgICAvLyBhIHBhcmVudCBzY3JvbGxhYmxlIHRoZW4gY2xvc2UgdGhlIHRvb2x0aXAuXG4gICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLmhpZGUoMCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoe1xuICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXIsXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiBzdHJhdGVneSxcbiAgICAgIHBhbmVsQ2xhc3M6IGAke3RoaXMuX2Nzc0NsYXNzUHJlZml4fS0ke1BBTkVMX0NMQVNTfWAsXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICB9KTtcblxuICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKHRoaXMuX292ZXJsYXlSZWYpO1xuXG4gICAgdGhpcy5fb3ZlcmxheVJlZlxuICAgICAgLmRldGFjaG1lbnRzKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9kZXRhY2goKSk7XG5cbiAgICB0aGlzLl9vdmVybGF5UmVmXG4gICAgICAub3V0c2lkZVBvaW50ZXJFdmVudHMoKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3Rvb2x0aXBJbnN0YW5jZT8uX2hhbmRsZUJvZHlJbnRlcmFjdGlvbigpKTtcblxuICAgIHRoaXMuX292ZXJsYXlSZWZcbiAgICAgIC5rZXlkb3duRXZlbnRzKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9pc1Rvb2x0aXBWaXNpYmxlKCkgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5oaWRlKDApKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5fZGVmYXVsdE9wdGlvbnM/LmRpc2FibGVUb29sdGlwSW50ZXJhY3Rpdml0eSkge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5hZGRQYW5lbENsYXNzKGAke3RoaXMuX2Nzc0NsYXNzUHJlZml4fS10b29sdGlwLXBhbmVsLW5vbi1pbnRlcmFjdGl2ZWApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9vdmVybGF5UmVmO1xuICB9XG5cbiAgLyoqIERldGFjaGVzIHRoZSBjdXJyZW50bHktYXR0YWNoZWQgdG9vbHRpcC4gKi9cbiAgcHJpdmF0ZSBfZGV0YWNoKCkge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmICYmIHRoaXMuX292ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB9XG5cbiAgICB0aGlzLl90b29sdGlwSW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHRvb2x0aXAuICovXG4gIHByaXZhdGUgX3VwZGF0ZVBvc2l0aW9uKG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IG92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgY29uc3Qgb3JpZ2luID0gdGhpcy5fZ2V0T3JpZ2luKCk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuX2dldE92ZXJsYXlQb3NpdGlvbigpO1xuXG4gICAgcG9zaXRpb24ud2l0aFBvc2l0aW9ucyhbXG4gICAgICB0aGlzLl9hZGRPZmZzZXQoey4uLm9yaWdpbi5tYWluLCAuLi5vdmVybGF5Lm1haW59KSxcbiAgICAgIHRoaXMuX2FkZE9mZnNldCh7Li4ub3JpZ2luLmZhbGxiYWNrLCAuLi5vdmVybGF5LmZhbGxiYWNrfSksXG4gICAgXSk7XG4gIH1cblxuICAvKiogQWRkcyB0aGUgY29uZmlndXJlZCBvZmZzZXQgdG8gYSBwb3NpdGlvbi4gVXNlZCBhcyBhIGhvb2sgZm9yIGNoaWxkIGNsYXNzZXMuICovXG4gIHByb3RlY3RlZCBfYWRkT2Zmc2V0KHBvc2l0aW9uOiBDb25uZWN0ZWRQb3NpdGlvbik6IENvbm5lY3RlZFBvc2l0aW9uIHtcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgb3JpZ2luIHBvc2l0aW9uIGFuZCBhIGZhbGxiYWNrIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcG9zaXRpb24gcHJlZmVyZW5jZS5cbiAgICogVGhlIGZhbGxiYWNrIHBvc2l0aW9uIGlzIHRoZSBpbnZlcnNlIG9mIHRoZSBvcmlnaW4gKGUuZy4gYCdiZWxvdycgLT4gJ2Fib3ZlJ2ApLlxuICAgKi9cbiAgX2dldE9yaWdpbigpOiB7bWFpbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uOyBmYWxsYmFjazogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9ufSB7XG4gICAgY29uc3QgaXNMdHIgPSAhdGhpcy5fZGlyIHx8IHRoaXMuX2Rpci52YWx1ZSA9PSAnbHRyJztcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgbGV0IG9yaWdpblBvc2l0aW9uOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb247XG5cbiAgICBpZiAocG9zaXRpb24gPT0gJ2Fib3ZlJyB8fCBwb3NpdGlvbiA9PSAnYmVsb3cnKSB7XG4gICAgICBvcmlnaW5Qb3NpdGlvbiA9IHtvcmlnaW5YOiAnY2VudGVyJywgb3JpZ2luWTogcG9zaXRpb24gPT0gJ2Fib3ZlJyA/ICd0b3AnIDogJ2JvdHRvbSd9O1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBwb3NpdGlvbiA9PSAnYmVmb3JlJyB8fFxuICAgICAgKHBvc2l0aW9uID09ICdsZWZ0JyAmJiBpc0x0cikgfHxcbiAgICAgIChwb3NpdGlvbiA9PSAncmlnaHQnICYmICFpc0x0cilcbiAgICApIHtcbiAgICAgIG9yaWdpblBvc2l0aW9uID0ge29yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInfTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcG9zaXRpb24gPT0gJ2FmdGVyJyB8fFxuICAgICAgKHBvc2l0aW9uID09ICdyaWdodCcgJiYgaXNMdHIpIHx8XG4gICAgICAocG9zaXRpb24gPT0gJ2xlZnQnICYmICFpc0x0cilcbiAgICApIHtcbiAgICAgIG9yaWdpblBvc2l0aW9uID0ge29yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAnY2VudGVyJ307XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgIHRocm93IGdldE1hdFRvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbik7XG4gICAgfVxuXG4gICAgY29uc3Qge3gsIHl9ID0gdGhpcy5faW52ZXJ0UG9zaXRpb24ob3JpZ2luUG9zaXRpb24hLm9yaWdpblgsIG9yaWdpblBvc2l0aW9uIS5vcmlnaW5ZKTtcblxuICAgIHJldHVybiB7XG4gICAgICBtYWluOiBvcmlnaW5Qb3NpdGlvbiEsXG4gICAgICBmYWxsYmFjazoge29yaWdpblg6IHgsIG9yaWdpblk6IHl9LFxuICAgIH07XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgb3ZlcmxheSBwb3NpdGlvbiBhbmQgYSBmYWxsYmFjayBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgdXNlcidzIHByZWZlcmVuY2UgKi9cbiAgX2dldE92ZXJsYXlQb3NpdGlvbigpOiB7bWFpbjogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbjsgZmFsbGJhY2s6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb259IHtcbiAgICBjb25zdCBpc0x0ciA9ICF0aGlzLl9kaXIgfHwgdGhpcy5fZGlyLnZhbHVlID09ICdsdHInO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcbiAgICBsZXQgb3ZlcmxheVBvc2l0aW9uOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uO1xuXG4gICAgaWYgKHBvc2l0aW9uID09ICdhYm92ZScpIHtcbiAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHtvdmVybGF5WDogJ2NlbnRlcicsIG92ZXJsYXlZOiAnYm90dG9tJ307XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PSAnYmVsb3cnKSB7XG4gICAgICBvdmVybGF5UG9zaXRpb24gPSB7b3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCd9O1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBwb3NpdGlvbiA9PSAnYmVmb3JlJyB8fFxuICAgICAgKHBvc2l0aW9uID09ICdsZWZ0JyAmJiBpc0x0cikgfHxcbiAgICAgIChwb3NpdGlvbiA9PSAncmlnaHQnICYmICFpc0x0cilcbiAgICApIHtcbiAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHtvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnY2VudGVyJ307XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHBvc2l0aW9uID09ICdhZnRlcicgfHxcbiAgICAgIChwb3NpdGlvbiA9PSAncmlnaHQnICYmIGlzTHRyKSB8fFxuICAgICAgKHBvc2l0aW9uID09ICdsZWZ0JyAmJiAhaXNMdHIpXG4gICAgKSB7XG4gICAgICBvdmVybGF5UG9zaXRpb24gPSB7b3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnY2VudGVyJ307XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgIHRocm93IGdldE1hdFRvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbik7XG4gICAgfVxuXG4gICAgY29uc3Qge3gsIHl9ID0gdGhpcy5faW52ZXJ0UG9zaXRpb24ob3ZlcmxheVBvc2l0aW9uIS5vdmVybGF5WCwgb3ZlcmxheVBvc2l0aW9uIS5vdmVybGF5WSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWFpbjogb3ZlcmxheVBvc2l0aW9uISxcbiAgICAgIGZhbGxiYWNrOiB7b3ZlcmxheVg6IHgsIG92ZXJsYXlZOiB5fSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIFVwZGF0ZXMgdGhlIHRvb2x0aXAgbWVzc2FnZSBhbmQgcmVwb3NpdGlvbnMgdGhlIG92ZXJsYXkgYWNjb3JkaW5nIHRvIHRoZSBuZXcgbWVzc2FnZSBsZW5ndGggKi9cbiAgcHJpdmF0ZSBfdXBkYXRlVG9vbHRpcE1lc3NhZ2UoKSB7XG4gICAgLy8gTXVzdCB3YWl0IGZvciB0aGUgbWVzc2FnZSB0byBiZSBwYWludGVkIHRvIHRoZSB0b29sdGlwIHNvIHRoYXQgdGhlIG92ZXJsYXkgY2FuIHByb3Blcmx5XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBjb3JyZWN0IHBvc2l0aW9uaW5nIGJhc2VkIG9uIHRoZSBzaXplIG9mIHRoZSB0ZXh0LlxuICAgIGlmICh0aGlzLl90b29sdGlwSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5tZXNzYWdlID0gdGhpcy5tZXNzYWdlO1xuICAgICAgdGhpcy5fdG9vbHRpcEluc3RhbmNlLl9tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgdGhpcy5fbmdab25lLm9uTWljcm90YXNrRW1wdHkucGlwZSh0YWtlKDEpLCB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSkge1xuICAgICAgICAgIHRoaXMuX292ZXJsYXlSZWYhLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBVcGRhdGVzIHRoZSB0b29sdGlwIGNsYXNzICovXG4gIHByaXZhdGUgX3NldFRvb2x0aXBDbGFzcyh0b29sdGlwQ2xhc3M6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIGlmICh0aGlzLl90b29sdGlwSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS50b29sdGlwQ2xhc3MgPSB0b29sdGlwQ2xhc3M7XG4gICAgICB0aGlzLl90b29sdGlwSW5zdGFuY2UuX21hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBJbnZlcnRzIGFuIG92ZXJsYXkgcG9zaXRpb24uICovXG4gIHByaXZhdGUgX2ludmVydFBvc2l0aW9uKHg6IEhvcml6b250YWxDb25uZWN0aW9uUG9zLCB5OiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MpIHtcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gJ2Fib3ZlJyB8fCB0aGlzLnBvc2l0aW9uID09PSAnYmVsb3cnKSB7XG4gICAgICBpZiAoeSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgeSA9ICdib3R0b20nO1xuICAgICAgfSBlbHNlIGlmICh5ID09PSAnYm90dG9tJykge1xuICAgICAgICB5ID0gJ3RvcCc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh4ID09PSAnZW5kJykge1xuICAgICAgICB4ID0gJ3N0YXJ0JztcbiAgICAgIH0gZWxzZSBpZiAoeCA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICB4ID0gJ2VuZCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHt4LCB5fTtcbiAgfVxuXG4gIC8qKiBVcGRhdGVzIHRoZSBjbGFzcyBvbiB0aGUgb3ZlcmxheSBwYW5lbCBiYXNlZCBvbiB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgdG9vbHRpcC4gKi9cbiAgcHJpdmF0ZSBfdXBkYXRlQ3VycmVudFBvc2l0aW9uQ2xhc3MoY29ubmVjdGlvblBhaXI6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIpOiB2b2lkIHtcbiAgICBjb25zdCB7b3ZlcmxheVksIG9yaWdpblgsIG9yaWdpbll9ID0gY29ubmVjdGlvblBhaXI7XG4gICAgbGV0IG5ld1Bvc2l0aW9uOiBUb29sdGlwUG9zaXRpb247XG5cbiAgICAvLyBJZiB0aGUgb3ZlcmxheSBpcyBpbiB0aGUgbWlkZGxlIGFsb25nIHRoZSBZIGF4aXMsXG4gICAgLy8gaXQgbWVhbnMgdGhhdCBpdCdzIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIuXG4gICAgaWYgKG92ZXJsYXlZID09PSAnY2VudGVyJykge1xuICAgICAgLy8gTm90ZSB0aGF0IHNpbmNlIHRoaXMgaW5mb3JtYXRpb24gaXMgdXNlZCBmb3Igc3R5bGluZywgd2Ugd2FudCB0b1xuICAgICAgLy8gcmVzb2x2ZSBgc3RhcnRgIGFuZCBgZW5kYCB0byB0aGVpciByZWFsIHZhbHVlcywgb3RoZXJ3aXNlIGNvbnN1bWVyc1xuICAgICAgLy8gd291bGQgaGF2ZSB0byByZW1lbWJlciB0byBkbyBpdCB0aGVtc2VsdmVzIG9uIGVhY2ggY29uc3VtcHRpb24uXG4gICAgICBpZiAodGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcpIHtcbiAgICAgICAgbmV3UG9zaXRpb24gPSBvcmlnaW5YID09PSAnZW5kJyA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdQb3NpdGlvbiA9IG9yaWdpblggPT09ICdzdGFydCcgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdQb3NpdGlvbiA9IG92ZXJsYXlZID09PSAnYm90dG9tJyAmJiBvcmlnaW5ZID09PSAndG9wJyA/ICdhYm92ZScgOiAnYmVsb3cnO1xuICAgIH1cblxuICAgIGlmIChuZXdQb3NpdGlvbiAhPT0gdGhpcy5fY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheVJlZjtcblxuICAgICAgaWYgKG92ZXJsYXlSZWYpIHtcbiAgICAgICAgY29uc3QgY2xhc3NQcmVmaXggPSBgJHt0aGlzLl9jc3NDbGFzc1ByZWZpeH0tJHtQQU5FTF9DTEFTU30tYDtcbiAgICAgICAgb3ZlcmxheVJlZi5yZW1vdmVQYW5lbENsYXNzKGNsYXNzUHJlZml4ICsgdGhpcy5fY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgb3ZlcmxheVJlZi5hZGRQYW5lbENsYXNzKGNsYXNzUHJlZml4ICsgbmV3UG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jdXJyZW50UG9zaXRpb24gPSBuZXdQb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICAvKiogQmluZHMgdGhlIHBvaW50ZXIgZXZlbnRzIHRvIHRoZSB0b29sdGlwIHRyaWdnZXIuICovXG4gIHByaXZhdGUgX3NldHVwUG9pbnRlckVudGVyRXZlbnRzSWZOZWVkZWQoKSB7XG4gICAgLy8gT3B0aW1pemF0aW9uOiBEZWZlciBob29raW5nIHVwIGV2ZW50cyBpZiB0aGVyZSdzIG5vIG1lc3NhZ2Ugb3IgdGhlIHRvb2x0aXAgaXMgZGlzYWJsZWQuXG4gICAgaWYgKFxuICAgICAgdGhpcy5fZGlzYWJsZWQgfHxcbiAgICAgICF0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICF0aGlzLl92aWV3SW5pdGlhbGl6ZWQgfHxcbiAgICAgIHRoaXMuX3Bhc3NpdmVMaXN0ZW5lcnMubGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhlIG1vdXNlIGV2ZW50cyBzaG91bGRuJ3QgYmUgYm91bmQgb24gbW9iaWxlIGRldmljZXMsIGJlY2F1c2UgdGhleSBjYW4gcHJldmVudCB0aGVcbiAgICAvLyBmaXJzdCB0YXAgZnJvbSBmaXJpbmcgaXRzIGNsaWNrIGV2ZW50IG9yIGNhbiBjYXVzZSB0aGUgdG9vbHRpcCB0byBvcGVuIGZvciBjbGlja3MuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtU3VwcG9ydHNNb3VzZUV2ZW50cygpKSB7XG4gICAgICB0aGlzLl9wYXNzaXZlTGlzdGVuZXJzLnB1c2goW1xuICAgICAgICAnbW91c2VlbnRlcicsXG4gICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICB0aGlzLl9zZXR1cFBvaW50ZXJFeGl0RXZlbnRzSWZOZWVkZWQoKTtcbiAgICAgICAgICBsZXQgcG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKChldmVudCBhcyBNb3VzZUV2ZW50KS54ICE9PSB1bmRlZmluZWQgJiYgKGV2ZW50IGFzIE1vdXNlRXZlbnQpLnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcG9pbnQgPSBldmVudCBhcyBNb3VzZUV2ZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNob3codW5kZWZpbmVkLCBwb2ludCk7XG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudG91Y2hHZXN0dXJlcyAhPT0gJ29mZicpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVOYXRpdmVHZXN0dXJlc0lmTmVjZXNzYXJ5KCk7XG5cbiAgICAgIHRoaXMuX3Bhc3NpdmVMaXN0ZW5lcnMucHVzaChbXG4gICAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IHRvdWNoID0gKGV2ZW50IGFzIFRvdWNoRXZlbnQpLnRhcmdldFRvdWNoZXM/LlswXTtcbiAgICAgICAgICBjb25zdCBvcmlnaW4gPSB0b3VjaCA/IHt4OiB0b3VjaC5jbGllbnRYLCB5OiB0b3VjaC5jbGllbnRZfSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAvLyBOb3RlIHRoYXQgaXQncyBpbXBvcnRhbnQgdGhhdCB3ZSBkb24ndCBgcHJldmVudERlZmF1bHRgIGhlcmUsXG4gICAgICAgICAgLy8gYmVjYXVzZSBpdCBjYW4gcHJldmVudCBjbGljayBldmVudHMgZnJvbSBmaXJpbmcgb24gdGhlIGVsZW1lbnQuXG4gICAgICAgICAgdGhpcy5fc2V0dXBQb2ludGVyRXhpdEV2ZW50c0lmTmVlZGVkKCk7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RvdWNoc3RhcnRUaW1lb3V0KTtcbiAgICAgICAgICB0aGlzLl90b3VjaHN0YXJ0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zaG93KHVuZGVmaW5lZCwgb3JpZ2luKSwgTE9OR1BSRVNTX0RFTEFZKTtcbiAgICAgICAgfSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIHRoaXMuX2FkZExpc3RlbmVycyh0aGlzLl9wYXNzaXZlTGlzdGVuZXJzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwUG9pbnRlckV4aXRFdmVudHNJZk5lZWRlZCgpIHtcbiAgICBpZiAodGhpcy5fcG9pbnRlckV4aXRFdmVudHNJbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9wb2ludGVyRXhpdEV2ZW50c0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGV4aXRMaXN0ZW5lcnM6IChyZWFkb25seSBbc3RyaW5nLCBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XSlbXSA9IFtdO1xuICAgIGlmICh0aGlzLl9wbGF0Zm9ybVN1cHBvcnRzTW91c2VFdmVudHMoKSkge1xuICAgICAgZXhpdExpc3RlbmVycy5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgJ21vdXNlbGVhdmUnLFxuICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1RhcmdldCA9IChldmVudCBhcyBNb3VzZUV2ZW50KS5yZWxhdGVkVGFyZ2V0IGFzIE5vZGUgfCBudWxsO1xuICAgICAgICAgICAgaWYgKCFuZXdUYXJnZXQgfHwgIXRoaXMuX292ZXJsYXlSZWY/Lm92ZXJsYXlFbGVtZW50LmNvbnRhaW5zKG5ld1RhcmdldCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgWyd3aGVlbCcsIGV2ZW50ID0+IHRoaXMuX3doZWVsTGlzdGVuZXIoZXZlbnQgYXMgV2hlZWxFdmVudCldLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudG91Y2hHZXN0dXJlcyAhPT0gJ29mZicpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVOYXRpdmVHZXN0dXJlc0lmTmVjZXNzYXJ5KCk7XG4gICAgICBjb25zdCB0b3VjaGVuZExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdG91Y2hzdGFydFRpbWVvdXQpO1xuICAgICAgICB0aGlzLmhpZGUodGhpcy5fZGVmYXVsdE9wdGlvbnMudG91Y2hlbmRIaWRlRGVsYXkpO1xuICAgICAgfTtcblxuICAgICAgZXhpdExpc3RlbmVycy5wdXNoKFsndG91Y2hlbmQnLCB0b3VjaGVuZExpc3RlbmVyXSwgWyd0b3VjaGNhbmNlbCcsIHRvdWNoZW5kTGlzdGVuZXJdKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hZGRMaXN0ZW5lcnMoZXhpdExpc3RlbmVycyk7XG4gICAgdGhpcy5fcGFzc2l2ZUxpc3RlbmVycy5wdXNoKC4uLmV4aXRMaXN0ZW5lcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTGlzdGVuZXJzKGxpc3RlbmVyczogKHJlYWRvbmx5IFtzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RdKVtdKSB7XG4gICAgbGlzdGVuZXJzLmZvckVhY2goKFtldmVudCwgbGlzdGVuZXJdKSA9PiB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIHBhc3NpdmVMaXN0ZW5lck9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGxhdGZvcm1TdXBwb3J0c01vdXNlRXZlbnRzKCkge1xuICAgIHJldHVybiAhdGhpcy5fcGxhdGZvcm0uSU9TICYmICF0aGlzLl9wbGF0Zm9ybS5BTkRST0lEO1xuICB9XG5cbiAgLyoqIExpc3RlbmVyIGZvciB0aGUgYHdoZWVsYCBldmVudCBvbiB0aGUgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfd2hlZWxMaXN0ZW5lcihldmVudDogV2hlZWxFdmVudCkge1xuICAgIGlmICh0aGlzLl9pc1Rvb2x0aXBWaXNpYmxlKCkpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRVbmRlclBvaW50ZXIgPSB0aGlzLl9kb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgLy8gT24gbm9uLXRvdWNoIGRldmljZXMgd2UgZGVwZW5kIG9uIHRoZSBgbW91c2VsZWF2ZWAgZXZlbnQgdG8gY2xvc2UgdGhlIHRvb2x0aXAsIGJ1dCBpdFxuICAgICAgLy8gd29uJ3QgZmlyZSBpZiB0aGUgdXNlciBzY3JvbGxzIGF3YXkgdXNpbmcgdGhlIHdoZWVsIHdpdGhvdXQgbW92aW5nIHRoZWlyIGN1cnNvci4gV2VcbiAgICAgIC8vIHdvcmsgYXJvdW5kIGl0IGJ5IGZpbmRpbmcgdGhlIGVsZW1lbnQgdW5kZXIgdGhlIHVzZXIncyBjdXJzb3IgYW5kIGNsb3NpbmcgdGhlIHRvb2x0aXBcbiAgICAgIC8vIGlmIGl0J3Mgbm90IHRoZSB0cmlnZ2VyLlxuICAgICAgaWYgKGVsZW1lbnRVbmRlclBvaW50ZXIgIT09IGVsZW1lbnQgJiYgIWVsZW1lbnQuY29udGFpbnMoZWxlbWVudFVuZGVyUG9pbnRlcikpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIERpc2FibGVzIHRoZSBuYXRpdmUgYnJvd3NlciBnZXN0dXJlcywgYmFzZWQgb24gaG93IHRoZSB0b29sdGlwIGhhcyBiZWVuIGNvbmZpZ3VyZWQuICovXG4gIHByaXZhdGUgX2Rpc2FibGVOYXRpdmVHZXN0dXJlc0lmTmVjZXNzYXJ5KCkge1xuICAgIGNvbnN0IGdlc3R1cmVzID0gdGhpcy50b3VjaEdlc3R1cmVzO1xuXG4gICAgaWYgKGdlc3R1cmVzICE9PSAnb2ZmJykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IHN0eWxlID0gZWxlbWVudC5zdHlsZTtcblxuICAgICAgLy8gSWYgZ2VzdHVyZXMgYXJlIHNldCB0byBgYXV0b2AsIHdlIGRvbid0IGRpc2FibGUgdGV4dCBzZWxlY3Rpb24gb24gaW5wdXRzIGFuZFxuICAgICAgLy8gdGV4dGFyZWFzLCBiZWNhdXNlIGl0IHByZXZlbnRzIHRoZSB1c2VyIGZyb20gdHlwaW5nIGludG8gdGhlbSBvbiBpT1MgU2FmYXJpLlxuICAgICAgaWYgKGdlc3R1cmVzID09PSAnb24nIHx8IChlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnICYmIGVsZW1lbnQubm9kZU5hbWUgIT09ICdURVhUQVJFQScpKSB7XG4gICAgICAgIHN0eWxlLnVzZXJTZWxlY3QgPVxuICAgICAgICAgIChzdHlsZSBhcyBhbnkpLm1zVXNlclNlbGVjdCA9XG4gICAgICAgICAgc3R5bGUud2Via2l0VXNlclNlbGVjdCA9XG4gICAgICAgICAgKHN0eWxlIGFzIGFueSkuTW96VXNlclNlbGVjdCA9XG4gICAgICAgICAgICAnbm9uZSc7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGhhdmUgYGF1dG9gIGdlc3R1cmVzIGFuZCB0aGUgZWxlbWVudCB1c2VzIG5hdGl2ZSBIVE1MIGRyYWdnaW5nLFxuICAgICAgLy8gd2UgZG9uJ3Qgc2V0IGAtd2Via2l0LXVzZXItZHJhZ2AgYmVjYXVzZSBpdCBwcmV2ZW50cyB0aGUgbmF0aXZlIGJlaGF2aW9yLlxuICAgICAgaWYgKGdlc3R1cmVzID09PSAnb24nIHx8ICFlbGVtZW50LmRyYWdnYWJsZSkge1xuICAgICAgICAoc3R5bGUgYXMgYW55KS53ZWJraXRVc2VyRHJhZyA9ICdub25lJztcbiAgICAgIH1cblxuICAgICAgc3R5bGUudG91Y2hBY3Rpb24gPSAnbm9uZSc7XG4gICAgICAoc3R5bGUgYXMgYW55KS53ZWJraXRUYXBIaWdobGlnaHRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYXR0YWNoZXMgYSBtYXRlcmlhbCBkZXNpZ24gdG9vbHRpcCB0byB0aGUgaG9zdCBlbGVtZW50LiBBbmltYXRlcyB0aGUgc2hvd2luZyBhbmRcbiAqIGhpZGluZyBvZiBhIHRvb2x0aXAgcHJvdmlkZWQgcG9zaXRpb24gKGRlZmF1bHRzIHRvIGJlbG93IHRoZSBlbGVtZW50KS5cbiAqXG4gKiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3Rvb2x0aXBzLmh0bWxcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFRvb2x0aXBdJyxcbiAgZXhwb3J0QXM6ICdtYXRUb29sdGlwJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXRvb2x0aXAtdHJpZ2dlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRvb2x0aXAgZXh0ZW5kcyBfTWF0VG9vbHRpcEJhc2U8VG9vbHRpcENvbXBvbmVudD4ge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgcmVhZG9ubHkgX3Rvb2x0aXBDb21wb25lbnQgPSBUb29sdGlwQ29tcG9uZW50O1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgcmVhZG9ubHkgX2Nzc0NsYXNzUHJlZml4ID0gJ21hdC1tZGMnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBhcmlhRGVzY3JpYmVyOiBBcmlhRGVzY3JpYmVyLFxuICAgIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIEBJbmplY3QoTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneTogYW55LFxuICAgIEBPcHRpb25hbCgpIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfVE9PTFRJUF9ERUZBVUxUX09QVElPTlMpIGRlZmF1bHRPcHRpb25zOiBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMsXG4gICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICkge1xuICAgIHN1cGVyKFxuICAgICAgb3ZlcmxheSxcbiAgICAgIGVsZW1lbnRSZWYsXG4gICAgICBzY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgdmlld0NvbnRhaW5lclJlZixcbiAgICAgIG5nWm9uZSxcbiAgICAgIHBsYXRmb3JtLFxuICAgICAgYXJpYURlc2NyaWJlcixcbiAgICAgIGZvY3VzTW9uaXRvcixcbiAgICAgIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgZGlyLFxuICAgICAgZGVmYXVsdE9wdGlvbnMsXG4gICAgICBfZG9jdW1lbnQsXG4gICAgKTtcbiAgICB0aGlzLl92aWV3cG9ydE1hcmdpbiA9IE1JTl9WSUVXUE9SVF9UT09MVElQX1RIUkVTSE9MRDtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfYWRkT2Zmc2V0KHBvc2l0aW9uOiBDb25uZWN0ZWRQb3NpdGlvbik6IENvbm5lY3RlZFBvc2l0aW9uIHtcbiAgICBjb25zdCBvZmZzZXQgPSBVTkJPVU5ERURfQU5DSE9SX0dBUDtcbiAgICBjb25zdCBpc0x0ciA9ICF0aGlzLl9kaXIgfHwgdGhpcy5fZGlyLnZhbHVlID09ICdsdHInO1xuXG4gICAgaWYgKHBvc2l0aW9uLm9yaWdpblkgPT09ICd0b3AnKSB7XG4gICAgICBwb3NpdGlvbi5vZmZzZXRZID0gLW9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uLm9yaWdpblkgPT09ICdib3R0b20nKSB7XG4gICAgICBwb3NpdGlvbi5vZmZzZXRZID0gb2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24ub3JpZ2luWCA9PT0gJ3N0YXJ0Jykge1xuICAgICAgcG9zaXRpb24ub2Zmc2V0WCA9IGlzTHRyID8gLW9mZnNldCA6IG9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uLm9yaWdpblggPT09ICdlbmQnKSB7XG4gICAgICBwb3NpdGlvbi5vZmZzZXRYID0gaXNMdHIgPyBvZmZzZXQgOiAtb2Zmc2V0O1xuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBfVG9vbHRpcENvbXBvbmVudEJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKiogTWVzc2FnZSB0byBkaXNwbGF5IGluIHRoZSB0b29sdGlwICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKiogQ2xhc3NlcyB0byBiZSBhZGRlZCB0byB0aGUgdG9vbHRpcC4gU3VwcG9ydHMgdGhlIHNhbWUgc3ludGF4IGFzIGBuZ0NsYXNzYC4gKi9cbiAgdG9vbHRpcENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwge1trZXk6IHN0cmluZ106IGFueX07XG5cbiAgLyoqIFRoZSB0aW1lb3V0IElEIG9mIGFueSBjdXJyZW50IHRpbWVyIHNldCB0byBzaG93IHRoZSB0b29sdGlwICovXG4gIHByaXZhdGUgX3Nob3dUaW1lb3V0SWQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAvKiogVGhlIHRpbWVvdXQgSUQgb2YgYW55IGN1cnJlbnQgdGltZXIgc2V0IHRvIGhpZGUgdGhlIHRvb2x0aXAgKi9cbiAgcHJpdmF0ZSBfaGlkZVRpbWVvdXRJZDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBFbGVtZW50IHRoYXQgY2F1c2VkIHRoZSB0b29sdGlwIHRvIG9wZW4uICovXG4gIF90cmlnZ2VyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqIEFtb3VudCBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkgdGhlIGNsb3Npbmcgc2VxdWVuY2UuICovXG4gIF9tb3VzZUxlYXZlSGlkZURlbGF5OiBudW1iZXI7XG5cbiAgLyoqIFdoZXRoZXIgYW5pbWF0aW9ucyBhcmUgY3VycmVudGx5IGRpc2FibGVkLiAqL1xuICBwcml2YXRlIF9hbmltYXRpb25zRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgaW50ZXJuYWwgdG9vbHRpcCBlbGVtZW50LiAqL1xuICBhYnN0cmFjdCBfdG9vbHRpcDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIFdoZXRoZXIgaW50ZXJhY3Rpb25zIG9uIHRoZSBwYWdlIHNob3VsZCBjbG9zZSB0aGUgdG9vbHRpcCAqL1xuICBwcml2YXRlIF9jbG9zZU9uSW50ZXJhY3Rpb24gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgdG9vbHRpcCBpcyBjdXJyZW50bHkgdmlzaWJsZS4gKi9cbiAgcHJpdmF0ZSBfaXNWaXNpYmxlID0gZmFsc2U7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSB0b29sdGlwIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHRoZSB2aWV3ICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29uSGlkZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIE5hbWUgb2YgdGhlIHNob3cgYW5pbWF0aW9uIGFuZCB0aGUgY2xhc3MgdGhhdCB0b2dnbGVzIGl0LiAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgX3Nob3dBbmltYXRpb246IHN0cmluZztcblxuICAvKiogTmFtZSBvZiB0aGUgaGlkZSBhbmltYXRpb24gYW5kIHRoZSBjbGFzcyB0aGF0IHRvZ2dsZXMgaXQuICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSBfaGlkZUFuaW1hdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgKSB7XG4gICAgdGhpcy5fYW5pbWF0aW9uc0Rpc2FibGVkID0gYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgdG9vbHRpcCB3aXRoIGFuIGFuaW1hdGlvbiBvcmlnaW5hdGluZyBmcm9tIHRoZSBwcm92aWRlZCBvcmlnaW5cbiAgICogQHBhcmFtIGRlbGF5IEFtb3VudCBvZiBtaWxsaXNlY29uZHMgdG8gdGhlIGRlbGF5IHNob3dpbmcgdGhlIHRvb2x0aXAuXG4gICAqL1xuICBzaG93KGRlbGF5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBDYW5jZWwgdGhlIGRlbGF5ZWQgaGlkZSBpZiBpdCBpcyBzY2hlZHVsZWRcbiAgICBjbGVhclRpbWVvdXQodGhpcy5faGlkZVRpbWVvdXRJZCk7XG5cbiAgICB0aGlzLl9zaG93VGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl90b2dnbGVWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgdGhpcy5fc2hvd1RpbWVvdXRJZCA9IHVuZGVmaW5lZDtcbiAgICB9LCBkZWxheSk7XG4gIH1cblxuICAvKipcbiAgICogQmVnaW5zIHRoZSBhbmltYXRpb24gdG8gaGlkZSB0aGUgdG9vbHRpcCBhZnRlciB0aGUgcHJvdmlkZWQgZGVsYXkgaW4gbXMuXG4gICAqIEBwYXJhbSBkZWxheSBBbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5IHNob3dpbmcgdGhlIHRvb2x0aXAuXG4gICAqL1xuICBoaWRlKGRlbGF5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBDYW5jZWwgdGhlIGRlbGF5ZWQgc2hvdyBpZiBpdCBpcyBzY2hlZHVsZWRcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd1RpbWVvdXRJZCk7XG5cbiAgICB0aGlzLl9oaWRlVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl90b2dnbGVWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgIHRoaXMuX2hpZGVUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XG4gICAgfSwgZGVsYXkpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHdoZW4gdGhlIHRvb2x0aXAgaGFzIGJlZW4gaGlkZGVuIGZyb20gdmlldy4gKi9cbiAgYWZ0ZXJIaWRkZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX29uSGlkZTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0b29sdGlwIGlzIGJlaW5nIGRpc3BsYXllZC4gKi9cbiAgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1Zpc2libGU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jYW5jZWxQZW5kaW5nQW5pbWF0aW9ucygpO1xuICAgIHRoaXMuX29uSGlkZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3RyaWdnZXJFbGVtZW50ID0gbnVsbCE7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJhY3Rpb25zIG9uIHRoZSBIVE1MIGJvZHkgc2hvdWxkIGNsb3NlIHRoZSB0b29sdGlwIGltbWVkaWF0ZWx5IGFzIGRlZmluZWQgaW4gdGhlXG4gICAqIG1hdGVyaWFsIGRlc2lnbiBzcGVjLlxuICAgKiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3Rvb2x0aXBzLmh0bWwjYmVoYXZpb3JcbiAgICovXG4gIF9oYW5kbGVCb2R5SW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Nsb3NlT25JbnRlcmFjdGlvbikge1xuICAgICAgdGhpcy5oaWRlKDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrcyB0aGF0IHRoZSB0b29sdGlwIG5lZWRzIHRvIGJlIGNoZWNrZWQgaW4gdGhlIG5leHQgY2hhbmdlIGRldGVjdGlvbiBydW4uXG4gICAqIE1haW5seSB1c2VkIGZvciByZW5kZXJpbmcgdGhlIGluaXRpYWwgdGV4dCBiZWZvcmUgcG9zaXRpb25pbmcgYSB0b29sdGlwLCB3aGljaFxuICAgKiBjYW4gYmUgcHJvYmxlbWF0aWMgaW4gY29tcG9uZW50cyB3aXRoIE9uUHVzaCBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgKi9cbiAgX21hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIF9oYW5kbGVNb3VzZUxlYXZlKHtyZWxhdGVkVGFyZ2V0fTogTW91c2VFdmVudCkge1xuICAgIGlmICghcmVsYXRlZFRhcmdldCB8fCAhdGhpcy5fdHJpZ2dlckVsZW1lbnQuY29udGFpbnMocmVsYXRlZFRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgdGhpcy5oaWRlKHRoaXMuX21vdXNlTGVhdmVIaWRlRGVsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZmluYWxpemVBbmltYXRpb24oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmb3Igd2hlbiB0aGUgdGltZW91dCBpbiB0aGlzLnNob3coKSBnZXRzIGNvbXBsZXRlZC5cbiAgICogVGhpcyBtZXRob2QgaXMgb25seSBuZWVkZWQgYnkgdGhlIG1kYy10b29sdGlwLCBhbmQgc28gaXQgaXMgb25seSBpbXBsZW1lbnRlZFxuICAgKiBpbiB0aGUgbWRjLXRvb2x0aXAsIG5vdCBoZXJlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9vblNob3coKTogdm9pZCB7fVxuXG4gIC8qKiBFdmVudCBsaXN0ZW5lciBkaXNwYXRjaGVkIHdoZW4gYW4gYW5pbWF0aW9uIG9uIHRoZSB0b29sdGlwIGZpbmlzaGVzLiAqL1xuICBfaGFuZGxlQW5pbWF0aW9uRW5kKHthbmltYXRpb25OYW1lfTogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICBpZiAoYW5pbWF0aW9uTmFtZSA9PT0gdGhpcy5fc2hvd0FuaW1hdGlvbiB8fCBhbmltYXRpb25OYW1lID09PSB0aGlzLl9oaWRlQW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLl9maW5hbGl6ZUFuaW1hdGlvbihhbmltYXRpb25OYW1lID09PSB0aGlzLl9zaG93QW5pbWF0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2FuY2VscyBhbnkgcGVuZGluZyBhbmltYXRpb24gc2VxdWVuY2VzLiAqL1xuICBfY2FuY2VsUGVuZGluZ0FuaW1hdGlvbnMoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dUaW1lb3V0SWQpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9oaWRlVGltZW91dElkKTtcbiAgICB0aGlzLl9zaG93VGltZW91dElkID0gdGhpcy5faGlkZVRpbWVvdXRJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIHRoZSBjbGVhbnVwIGFmdGVyIGFuIGFuaW1hdGlvbiBoYXMgZmluaXNoZWQuICovXG4gIHByaXZhdGUgX2ZpbmFsaXplQW5pbWF0aW9uKHRvVmlzaWJsZTogYm9vbGVhbikge1xuICAgIGlmICh0b1Zpc2libGUpIHtcbiAgICAgIHRoaXMuX2Nsb3NlT25JbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5fb25IaWRlLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgdG9vbHRpcCBlbGVtZW50LiAqL1xuICBwcml2YXRlIF90b2dnbGVWaXNpYmlsaXR5KGlzVmlzaWJsZTogYm9vbGVhbikge1xuICAgIC8vIFdlIHNldCB0aGUgY2xhc3NlcyBkaXJlY3RseSBoZXJlIG91cnNlbHZlcyBzbyB0aGF0IHRvZ2dsaW5nIHRoZSB0b29sdGlwIHN0YXRlXG4gICAgLy8gaXNuJ3QgYm91bmQgYnkgY2hhbmdlIGRldGVjdGlvbi4gVGhpcyBhbGxvd3MgdXMgdG8gaGlkZSBpdCBldmVuIGlmIHRoZVxuICAgIC8vIHZpZXcgcmVmIGhhcyBiZWVuIGRldGFjaGVkIGZyb20gdGhlIENEIHRyZWUuXG4gICAgY29uc3QgdG9vbHRpcCA9IHRoaXMuX3Rvb2x0aXAubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBzaG93Q2xhc3MgPSB0aGlzLl9zaG93QW5pbWF0aW9uO1xuICAgIGNvbnN0IGhpZGVDbGFzcyA9IHRoaXMuX2hpZGVBbmltYXRpb247XG4gICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKGlzVmlzaWJsZSA/IGhpZGVDbGFzcyA6IHNob3dDbGFzcyk7XG4gICAgdG9vbHRpcC5jbGFzc0xpc3QuYWRkKGlzVmlzaWJsZSA/IHNob3dDbGFzcyA6IGhpZGVDbGFzcyk7XG4gICAgdGhpcy5faXNWaXNpYmxlID0gaXNWaXNpYmxlO1xuXG4gICAgLy8gSXQncyBjb21tb24gZm9yIGludGVybmFsIGFwcHMgdG8gZGlzYWJsZSBhbmltYXRpb25zIHVzaW5nIGAqIHsgYW5pbWF0aW9uOiBub25lICFpbXBvcnRhbnQgfWBcbiAgICAvLyB3aGljaCBjYW4gYnJlYWsgdGhlIG9wZW5pbmcgc2VxdWVuY2UuIFRyeSB0byBkZXRlY3Qgc3VjaCBjYXNlcyBhbmQgd29yayBhcm91bmQgdGhlbS5cbiAgICBpZiAoaXNWaXNpYmxlICYmICF0aGlzLl9hbmltYXRpb25zRGlzYWJsZWQgJiYgdHlwZW9mIGdldENvbXB1dGVkU3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUodG9vbHRpcCk7XG5cbiAgICAgIC8vIFVzZSBgZ2V0UHJvcGVydHlWYWx1ZWAgdG8gYXZvaWQgaXNzdWVzIHdpdGggcHJvcGVydHkgcmVuYW1pbmcuXG4gICAgICBpZiAoXG4gICAgICAgIHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdhbmltYXRpb24tZHVyYXRpb24nKSA9PT0gJzBzJyB8fFxuICAgICAgICBzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnYW5pbWF0aW9uLW5hbWUnKSA9PT0gJ25vbmUnXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uc0Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICB0aGlzLl9vblNob3coKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uc0Rpc2FibGVkKSB7XG4gICAgICB0b29sdGlwLmNsYXNzTGlzdC5hZGQoJ19tYXQtYW5pbWF0aW9uLW5vb3BhYmxlJyk7XG4gICAgICB0aGlzLl9maW5hbGl6ZUFuaW1hdGlvbihpc1Zpc2libGUpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IHdyYXBzIHRoZSB0b29sdGlwJ3MgY29udGVudC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXRvb2x0aXAtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICd0b29sdGlwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndG9vbHRpcC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAvLyBGb3JjZXMgdGhlIGVsZW1lbnQgdG8gaGF2ZSBhIGxheW91dCBpbiBJRSBhbmQgRWRnZS4gVGhpcyBmaXhlcyBpc3N1ZXMgd2hlcmUgdGhlIGVsZW1lbnRcbiAgICAvLyB3b24ndCBiZSByZW5kZXJlZCBpZiB0aGUgYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQgb3IgdGhlcmUgaXMgbm8gd2ViIGFuaW1hdGlvbnMgcG9seWZpbGwuXG4gICAgJ1tzdHlsZS56b29tXSc6ICdpc1Zpc2libGUoKSA/IDEgOiBudWxsJyxcbiAgICAnKG1vdXNlbGVhdmUpJzogJ19oYW5kbGVNb3VzZUxlYXZlKCRldmVudCknLFxuICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbXBvbmVudCBleHRlbmRzIF9Ub29sdGlwQ29tcG9uZW50QmFzZSB7XG4gIC8qIFdoZXRoZXIgdGhlIHRvb2x0aXAgdGV4dCBvdmVyZmxvd3MgdG8gbXVsdGlwbGUgbGluZXMgKi9cbiAgX2lzTXVsdGlsaW5lID0gZmFsc2U7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgaW50ZXJuYWwgdG9vbHRpcCBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCd0b29sdGlwJywge1xuICAgIC8vIFVzZSBhIHN0YXRpYyBxdWVyeSBoZXJlIHNpbmNlIHdlIGludGVyYWN0IGRpcmVjdGx5IHdpdGhcbiAgICAvLyB0aGUgRE9NIHdoaWNoIGNhbiBoYXBwZW4gYmVmb3JlIGBuZ0FmdGVyVmlld0luaXRgLlxuICAgIHN0YXRpYzogdHJ1ZSxcbiAgfSlcbiAgX3Rvb2x0aXA6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBfc2hvd0FuaW1hdGlvbiA9ICdtYXQtbWRjLXRvb2x0aXAtc2hvdyc7XG4gIF9oaWRlQW5pbWF0aW9uID0gJ21hdC1tZGMtdG9vbHRpcC1oaWRlJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICkge1xuICAgIHN1cGVyKGNoYW5nZURldGVjdG9yUmVmLCBhbmltYXRpb25Nb2RlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfb25TaG93KCk6IHZvaWQge1xuICAgIHRoaXMuX2lzTXVsdGlsaW5lID0gdGhpcy5faXNUb29sdGlwTXVsdGlsaW5lKCk7XG4gICAgdGhpcy5fbWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgdG9vbHRpcCB0ZXh0IGhhcyBvdmVyZmxvd24gdG8gdGhlIG5leHQgbGluZSAqL1xuICBwcml2YXRlIF9pc1Rvb2x0aXBNdWx0aWxpbmUoKSB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gcmVjdC5oZWlnaHQgPiBNSU5fSEVJR0hUICYmIHJlY3Qud2lkdGggPj0gTUFYX1dJRFRIO1xuICB9XG59XG4iLCI8ZGl2XG4gICN0b29sdGlwXG4gIGNsYXNzPVwibWRjLXRvb2x0aXAgbWRjLXRvb2x0aXAtLXNob3duIG1hdC1tZGMtdG9vbHRpcFwiXG4gIFtuZ0NsYXNzXT1cInRvb2x0aXBDbGFzc1wiXG4gIChhbmltYXRpb25lbmQpPVwiX2hhbmRsZUFuaW1hdGlvbkVuZCgkZXZlbnQpXCJcbiAgW2NsYXNzLm1kYy10b29sdGlwLS1tdWx0aWxpbmVdPVwiX2lzTXVsdGlsaW5lXCI+XG4gIDxkaXYgY2xhc3M9XCJtZGMtdG9vbHRpcF9fc3VyZmFjZSBtZGMtdG9vbHRpcF9fc3VyZmFjZS1hbmltYXRpb25cIj57e21lc3NhZ2V9fTwvZGl2PlxuPC9kaXY+XG4iXX0=