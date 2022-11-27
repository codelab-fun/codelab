/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Host, Inject, InjectionToken, Input, NgZone, Optional, ViewContainerRef, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW, hasModifierKey } from '@angular/cdk/keycodes';
import { _getEventTarget } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOptionSelectionChange, _countGroupLabelsBeforeOption, _getOptionScrollPosition, } from '@angular/material/core';
import { MAT_FORM_FIELD, MatFormField } from '@angular/material/form-field';
import { defer, fromEvent, merge, of as observableOf, Subject, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, take, tap, startWith } from 'rxjs/operators';
import { _MatAutocompleteOriginBase } from './autocomplete-origin';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, _MatAutocompleteBase, } from './autocomplete';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "@angular/cdk/scrolling";
import * as i4 from "@angular/material/form-field";
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
export const MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatAutocompleteTrigger),
    multi: true,
};
/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 * @docs-private
 */
export function getMatAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `mat-autocomplete`. ' +
        'Make sure that the id passed to the `matAutocomplete` is correct and that ' +
        "you're attempting to open it after the ngAfterContentInit hook.");
}
/** Injection token that determines the scroll handling while the autocomplete panel is open. */
export const MAT_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken('mat-autocomplete-scroll-strategy');
/** @docs-private */
export function MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
export const MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY,
};
/** Base class with all of the `MatAutocompleteTrigger` functionality. */
export class _MatAutocompleteTriggerBase {
    constructor(_element, _overlay, _viewContainerRef, _zone, _changeDetectorRef, scrollStrategy, _dir, _formField, _document, _viewportRuler, _defaults) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._zone = _zone;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this._formField = _formField;
        this._document = _document;
        this._viewportRuler = _viewportRuler;
        this._defaults = _defaults;
        this._componentDestroyed = false;
        this._autocompleteDisabled = false;
        /** Whether or not the label state is being overridden. */
        this._manuallyFloatingLabel = false;
        /** Subscription to viewport size changes. */
        this._viewportSubscription = Subscription.EMPTY;
        /**
         * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
         * closed autocomplete from being reopened if the user switches to another browser tab and then
         * comes back.
         */
        this._canOpenOnNextFocus = true;
        /** Stream of keyboard events that can close the panel. */
        this._closeKeyEventStream = new Subject();
        /**
         * Event handler for when the window is blurred. Needs to be an
         * arrow function in order to preserve the context.
         */
        this._windowBlurHandler = () => {
            // If the user blurred the window while the autocomplete is focused, it means that it'll be
            // refocused when they come back. In this case we want to skip the first focus event, if the
            // pane was closed, in order to avoid reopening it unintentionally.
            this._canOpenOnNextFocus =
                this._document.activeElement !== this._element.nativeElement || this.panelOpen;
        };
        /** `View -> model callback called when value changes` */
        this._onChange = () => { };
        /** `View -> model callback called when autocomplete has been touched` */
        this._onTouched = () => { };
        /**
         * Position of the autocomplete panel relative to the trigger element. A position of `auto`
         * will render the panel underneath the trigger if there is enough space for it to fit in
         * the viewport, otherwise the panel will be shown above it. If the position is set to
         * `above` or `below`, the panel will always be shown above or below the trigger. no matter
         * whether it fits completely in the viewport.
         */
        this.position = 'auto';
        /**
         * `autocomplete` attribute to be set on the input element.
         * @docs-private
         */
        this.autocompleteAttribute = 'off';
        this._overlayAttached = false;
        /** Stream of changes to the selection state of the autocomplete options. */
        this.optionSelections = defer(() => {
            const options = this.autocomplete ? this.autocomplete.options : null;
            if (options) {
                return options.changes.pipe(startWith(options), switchMap(() => merge(...options.map(option => option.onSelectionChange))));
            }
            // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
            // Return a stream that we'll replace with the real one once everything is in place.
            return this._zone.onStable.pipe(take(1), switchMap(() => this.optionSelections));
        });
        this._scrollStrategy = scrollStrategy;
    }
    /**
     * Whether the autocomplete is disabled. When disabled, the element will
     * act as a regular input and the user won't be able to open the panel.
     */
    get autocompleteDisabled() {
        return this._autocompleteDisabled;
    }
    set autocompleteDisabled(value) {
        this._autocompleteDisabled = coerceBooleanProperty(value);
    }
    ngAfterViewInit() {
        const window = this._getWindow();
        if (typeof window !== 'undefined') {
            this._zone.runOutsideAngular(() => window.addEventListener('blur', this._windowBlurHandler));
        }
    }
    ngOnChanges(changes) {
        if (changes['position'] && this._positionStrategy) {
            this._setStrategyPositions(this._positionStrategy);
            if (this.panelOpen) {
                this._overlayRef.updatePosition();
            }
        }
    }
    ngOnDestroy() {
        const window = this._getWindow();
        if (typeof window !== 'undefined') {
            window.removeEventListener('blur', this._windowBlurHandler);
        }
        this._viewportSubscription.unsubscribe();
        this._componentDestroyed = true;
        this._destroyPanel();
        this._closeKeyEventStream.complete();
    }
    /** Whether or not the autocomplete panel is open. */
    get panelOpen() {
        return this._overlayAttached && this.autocomplete.showPanel;
    }
    /** Opens the autocomplete suggestion panel. */
    openPanel() {
        this._attachOverlay();
        this._floatLabel();
    }
    /** Closes the autocomplete suggestion panel. */
    closePanel() {
        this._resetLabel();
        if (!this._overlayAttached) {
            return;
        }
        if (this.panelOpen) {
            // Only emit if the panel was visible.
            // The `NgZone.onStable` always emits outside of the Angular zone,
            // so all the subscriptions from `_subscribeToClosingActions()` are also outside of the Angular zone.
            // We should manually run in Angular zone to update UI after panel closing.
            this._zone.run(() => {
                this.autocomplete.closed.emit();
            });
        }
        this.autocomplete._isOpen = this._overlayAttached = false;
        this._pendingAutoselectedOption = null;
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
            this._closingActionsSubscription.unsubscribe();
        }
        // Note that in some cases this can end up being called after the component is destroyed.
        // Add a check to ensure that we don't try to run change detection on a destroyed view.
        if (!this._componentDestroyed) {
            // We need to trigger change detection manually, because
            // `fromEvent` doesn't seem to do it at the proper time.
            // This ensures that the label is reset when the
            // user clicks outside.
            this._changeDetectorRef.detectChanges();
        }
    }
    /**
     * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
     * within the viewport.
     */
    updatePosition() {
        if (this._overlayAttached) {
            this._overlayRef.updatePosition();
        }
    }
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions() {
        return merge(this.optionSelections, this.autocomplete._keyManager.tabOut.pipe(filter(() => this._overlayAttached)), this._closeKeyEventStream, this._getOutsideClickStream(), this._overlayRef
            ? this._overlayRef.detachments().pipe(filter(() => this._overlayAttached))
            : observableOf()).pipe(
        // Normalize the output so we return a consistent type.
        map(event => (event instanceof MatOptionSelectionChange ? event : null)));
    }
    /** The currently active option, coerced to MatOption type. */
    get activeOption() {
        if (this.autocomplete && this.autocomplete._keyManager) {
            return this.autocomplete._keyManager.activeItem;
        }
        return null;
    }
    /** Stream of clicks outside of the autocomplete panel. */
    _getOutsideClickStream() {
        return merge(fromEvent(this._document, 'click'), fromEvent(this._document, 'auxclick'), fromEvent(this._document, 'touchend')).pipe(filter(event => {
            // If we're in the Shadow DOM, the event target will be the shadow root, so we have to
            // fall back to check the first element in the path of the click event.
            const clickTarget = _getEventTarget(event);
            const formField = this._formField ? this._formField._elementRef.nativeElement : null;
            const customOrigin = this.connectedTo ? this.connectedTo.elementRef.nativeElement : null;
            return (this._overlayAttached &&
                clickTarget !== this._element.nativeElement &&
                // Normally focus moves inside `mousedown` so this condition will almost always be
                // true. Its main purpose is to handle the case where the input is focused from an
                // outside click which propagates up to the `body` listener within the same sequence
                // and causes the panel to close immediately (see #3106).
                this._document.activeElement !== this._element.nativeElement &&
                (!formField || !formField.contains(clickTarget)) &&
                (!customOrigin || !customOrigin.contains(clickTarget)) &&
                !!this._overlayRef &&
                !this._overlayRef.overlayElement.contains(clickTarget));
        }));
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        Promise.resolve(null).then(() => this._assignOptionValue(value));
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this._onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this._element.nativeElement.disabled = isDisabled;
    }
    _handleKeydown(event) {
        const keyCode = event.keyCode;
        const hasModifier = hasModifierKey(event);
        // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.
        if (keyCode === ESCAPE && !hasModifier) {
            event.preventDefault();
        }
        if (this.activeOption && keyCode === ENTER && this.panelOpen && !hasModifier) {
            this.activeOption._selectViaInteraction();
            this._resetActiveItem();
            event.preventDefault();
        }
        else if (this.autocomplete) {
            const prevActiveItem = this.autocomplete._keyManager.activeItem;
            const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
            if (keyCode === TAB || (isArrowKey && !hasModifier && this.panelOpen)) {
                this.autocomplete._keyManager.onKeydown(event);
            }
            else if (isArrowKey && this._canOpen()) {
                this.openPanel();
            }
            if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
                this._scrollToOption(this.autocomplete._keyManager.activeItemIndex || 0);
                if (this.autocomplete.autoSelectActiveOption && this.activeOption) {
                    if (!this._pendingAutoselectedOption) {
                        this._valueBeforeAutoSelection = this._element.nativeElement.value;
                    }
                    this._pendingAutoselectedOption = this.activeOption;
                    this._assignOptionValue(this.activeOption.value);
                }
            }
        }
    }
    _handleInput(event) {
        let target = event.target;
        let value = target.value;
        // Based on `NumberValueAccessor` from forms.
        if (target.type === 'number') {
            value = value == '' ? null : parseFloat(value);
        }
        // If the input has a placeholder, IE will fire the `input` event on page load,
        // focus and blur, in addition to when the user actually changed the value. To
        // filter out all of the extra events, we save the value on focus and between
        // `input` events, and we check whether it changed.
        // See: https://connect.microsoft.com/IE/feedback/details/885747/
        if (this._previousValue !== value) {
            this._previousValue = value;
            this._pendingAutoselectedOption = null;
            this._onChange(value);
            if (this._canOpen() && this._document.activeElement === event.target) {
                this.openPanel();
            }
        }
    }
    _handleFocus() {
        if (!this._canOpenOnNextFocus) {
            this._canOpenOnNextFocus = true;
        }
        else if (this._canOpen()) {
            this._previousValue = this._element.nativeElement.value;
            this._attachOverlay();
            this._floatLabel(true);
        }
    }
    _handleClick() {
        if (this._canOpen() && !this.panelOpen) {
            this.openPanel();
        }
    }
    /**
     * In "auto" mode, the label will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the label until the panel can be closed.
     * @param shouldAnimate Whether the label should be animated when it is floated.
     */
    _floatLabel(shouldAnimate = false) {
        if (this._formField && this._formField.floatLabel === 'auto') {
            if (shouldAnimate) {
                this._formField._animateAndLockLabel();
            }
            else {
                this._formField.floatLabel = 'always';
            }
            this._manuallyFloatingLabel = true;
        }
    }
    /** If the label has been manually elevated, return it to its normal state. */
    _resetLabel() {
        if (this._manuallyFloatingLabel) {
            this._formField.floatLabel = 'auto';
            this._manuallyFloatingLabel = false;
        }
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    _subscribeToClosingActions() {
        const firstStable = this._zone.onStable.pipe(take(1));
        const optionChanges = this.autocomplete.options.changes.pipe(tap(() => this._positionStrategy.reapplyLastPosition()), 
        // Defer emitting to the stream until the next tick, because changing
        // bindings in here will cause "changed after checked" errors.
        delay(0));
        // When the zone is stable initially, and when the option list changes...
        return (merge(firstStable, optionChanges)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        switchMap(() => {
            // The `NgZone.onStable` always emits outside of the Angular zone, thus we have to re-enter
            // the Angular zone. This will lead to change detection being called outside of the Angular
            // zone and the `autocomplete.opened` will also emit outside of the Angular.
            this._zone.run(() => {
                const wasOpen = this.panelOpen;
                this._resetActiveItem();
                this.autocomplete._setVisibility();
                this._changeDetectorRef.detectChanges();
                if (this.panelOpen) {
                    this._overlayRef.updatePosition();
                }
                if (wasOpen !== this.panelOpen) {
                    // If the `panelOpen` state changed, we need to make sure to emit the `opened` or
                    // `closed` event, because we may not have emitted it. This can happen
                    // - if the users opens the panel and there are no options, but the
                    //   options come in slightly later or as a result of the value changing,
                    // - if the panel is closed after the user entered a string that did not match any
                    //   of the available options,
                    // - if a valid string is entered after an invalid one.
                    if (this.panelOpen) {
                        this.autocomplete.opened.emit();
                    }
                    else {
                        this.autocomplete.closed.emit();
                    }
                }
            });
            return this.panelClosingActions;
        }), 
        // when the first closing event occurs...
        take(1))
            // set the value, close the panel, and complete.
            .subscribe(event => this._setValueAndClose(event)));
    }
    /** Destroys the autocomplete suggestion panel. */
    _destroyPanel() {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
    _assignOptionValue(value) {
        const toDisplay = this.autocomplete && this.autocomplete.displayWith
            ? this.autocomplete.displayWith(value)
            : value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        this._updateNativeInputValue(toDisplay != null ? toDisplay : '');
    }
    _updateNativeInputValue(value) {
        // If it's used within a `MatFormField`, we should set it through the property so it can go
        // through change detection.
        if (this._formField) {
            this._formField._control.value = value;
        }
        else {
            this._element.nativeElement.value = value;
        }
        this._previousValue = value;
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    _setValueAndClose(event) {
        const toSelect = event ? event.source : this._pendingAutoselectedOption;
        if (toSelect) {
            this._clearPreviousSelectedOption(toSelect);
            this._assignOptionValue(toSelect.value);
            this._onChange(toSelect.value);
            this.autocomplete._emitSelectEvent(toSelect);
            this._element.nativeElement.focus();
        }
        this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    _clearPreviousSelectedOption(skip) {
        this.autocomplete.options.forEach(option => {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        });
    }
    _attachOverlay() {
        if (!this.autocomplete && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getMatAutocompleteMissingPanelError();
        }
        let overlayRef = this._overlayRef;
        if (!overlayRef) {
            this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef, {
                id: this._formField?.getLabelId(),
            });
            overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef = overlayRef;
            this._handleOverlayEvents(overlayRef);
            this._viewportSubscription = this._viewportRuler.change().subscribe(() => {
                if (this.panelOpen && overlayRef) {
                    overlayRef.updateSize({ width: this._getPanelWidth() });
                }
            });
        }
        else {
            // Update the trigger, panel width and direction, in case anything has changed.
            this._positionStrategy.setOrigin(this._getConnectedElement());
            overlayRef.updateSize({ width: this._getPanelWidth() });
        }
        if (overlayRef && !overlayRef.hasAttached()) {
            overlayRef.attach(this._portal);
            this._closingActionsSubscription = this._subscribeToClosingActions();
        }
        const wasOpen = this.panelOpen;
        this.autocomplete._setVisibility();
        this.autocomplete._isOpen = this._overlayAttached = true;
        // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.
        if (this.panelOpen && wasOpen !== this.panelOpen) {
            this.autocomplete.opened.emit();
        }
    }
    _getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this._getOverlayPosition(),
            scrollStrategy: this._scrollStrategy(),
            width: this._getPanelWidth(),
            direction: this._dir,
            panelClass: this._defaults?.overlayPanelClass,
        });
    }
    _getOverlayPosition() {
        const strategy = this._overlay
            .position()
            .flexibleConnectedTo(this._getConnectedElement())
            .withFlexibleDimensions(false)
            .withPush(false);
        this._setStrategyPositions(strategy);
        this._positionStrategy = strategy;
        return strategy;
    }
    /** Sets the positions on a position strategy based on the directive's input state. */
    _setStrategyPositions(positionStrategy) {
        // Note that we provide horizontal fallback positions, even though by default the dropdown
        // width matches the input, because consumers can override the width. See #18854.
        const belowPositions = [
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
            { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        ];
        // The overlay edge connected to the trigger should have squared corners, while
        // the opposite end has rounded corners. We apply a CSS class to swap the
        // border-radius based on the overlay position.
        const panelClass = this._aboveClass;
        const abovePositions = [
            { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', panelClass },
            { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', panelClass },
        ];
        let positions;
        if (this.position === 'above') {
            positions = abovePositions;
        }
        else if (this.position === 'below') {
            positions = belowPositions;
        }
        else {
            positions = [...belowPositions, ...abovePositions];
        }
        positionStrategy.withPositions(positions);
    }
    _getConnectedElement() {
        if (this.connectedTo) {
            return this.connectedTo.elementRef;
        }
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._element;
    }
    _getPanelWidth() {
        return this.autocomplete.panelWidth || this._getHostWidth();
    }
    /** Returns the width of the input element, so the panel width can match it. */
    _getHostWidth() {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     */
    _resetActiveItem() {
        const autocomplete = this.autocomplete;
        if (autocomplete.autoActiveFirstOption) {
            // Note that we go through `setFirstItemActive`, rather than `setActiveItem(0)`, because
            // the former will find the next enabled option, if the first one is disabled.
            autocomplete._keyManager.setFirstItemActive();
        }
        else {
            autocomplete._keyManager.setActiveItem(-1);
        }
    }
    /** Determines whether the panel can be opened. */
    _canOpen() {
        const element = this._element.nativeElement;
        return !element.readOnly && !element.disabled && !this._autocompleteDisabled;
    }
    /** Use defaultView of injected document if available or fallback to global window reference */
    _getWindow() {
        return this._document?.defaultView || window;
    }
    /** Scrolls to a particular option in the list. */
    _scrollToOption(index) {
        // Given that we are not actually focusing active options, we must manually adjust scroll
        // to reveal options below the fold. First, we find the offset of the option from the top
        // of the panel. If that offset is below the fold, the new scrollTop will be the offset -
        // the panel height + the option height, so the active option will be just visible at the
        // bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
        // will become the offset. If that offset is visible within the panel already, the scrollTop is
        // not adjusted.
        const autocomplete = this.autocomplete;
        const labelCount = _countGroupLabelsBeforeOption(index, autocomplete.options, autocomplete.optionGroups);
        if (index === 0 && labelCount === 1) {
            // If we've got one group label before the option and we're at the top option,
            // scroll the list to the top. This is better UX than scrolling the list to the
            // top of the option, because it allows the user to read the top group's label.
            autocomplete._setScrollTop(0);
        }
        else if (autocomplete.panel) {
            const option = autocomplete.options.toArray()[index];
            if (option) {
                const element = option._getHostElement();
                const newScrollPosition = _getOptionScrollPosition(element.offsetTop, element.offsetHeight, autocomplete._getScrollTop(), autocomplete.panel.nativeElement.offsetHeight);
                autocomplete._setScrollTop(newScrollPosition);
            }
        }
    }
    /** Handles keyboard events coming from the overlay panel. */
    _handleOverlayEvents(overlayRef) {
        // Use the `keydownEvents` in order to take advantage of
        // the overlay event targeting provided by the CDK overlay.
        overlayRef.keydownEvents().subscribe(event => {
            // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
            // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
            if ((event.keyCode === ESCAPE && !hasModifierKey(event)) ||
                (event.keyCode === UP_ARROW && hasModifierKey(event, 'altKey'))) {
                // If the user had typed something in before we autoselected an option, and they decided
                // to cancel the selection, restore the input value to the one they had typed in.
                if (this._pendingAutoselectedOption) {
                    this._updateNativeInputValue(this._valueBeforeAutoSelection ?? '');
                    this._pendingAutoselectedOption = null;
                }
                this._closeKeyEventStream.next();
                this._resetActiveItem();
                // We need to stop propagation, otherwise the event will eventually
                // reach the input itself and cause the overlay to be reopened.
                event.stopPropagation();
                event.preventDefault();
            }
        });
        // Subscribe to the pointer events stream so that it doesn't get picked up by other overlays.
        // TODO(crisbeto): we should switch `_getOutsideClickStream` eventually to use this stream,
        // but the behvior isn't exactly the same and it ends up breaking some internal tests.
        overlayRef.outsidePointerEvents().subscribe();
    }
}
_MatAutocompleteTriggerBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatAutocompleteTriggerBase, deps: [{ token: i0.ElementRef }, { token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: MAT_AUTOCOMPLETE_SCROLL_STRATEGY }, { token: i2.Directionality, optional: true }, { token: MAT_FORM_FIELD, host: true, optional: true }, { token: DOCUMENT, optional: true }, { token: i3.ViewportRuler }, { token: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
_MatAutocompleteTriggerBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _MatAutocompleteTriggerBase, inputs: { autocomplete: ["matAutocomplete", "autocomplete"], position: ["matAutocompletePosition", "position"], connectedTo: ["matAutocompleteConnectedTo", "connectedTo"], autocompleteAttribute: ["autocomplete", "autocompleteAttribute"], autocompleteDisabled: ["matAutocompleteDisabled", "autocompleteDisabled"] }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatAutocompleteTriggerBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY]
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i4.MatFormField, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_FORM_FIELD]
                }, {
                    type: Host
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i3.ViewportRuler }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_AUTOCOMPLETE_DEFAULT_OPTIONS]
                }] }]; }, propDecorators: { autocomplete: [{
                type: Input,
                args: ['matAutocomplete']
            }], position: [{
                type: Input,
                args: ['matAutocompletePosition']
            }], connectedTo: [{
                type: Input,
                args: ['matAutocompleteConnectedTo']
            }], autocompleteAttribute: [{
                type: Input,
                args: ['autocomplete']
            }], autocompleteDisabled: [{
                type: Input,
                args: ['matAutocompleteDisabled']
            }] } });
export class MatAutocompleteTrigger extends _MatAutocompleteTriggerBase {
    constructor() {
        super(...arguments);
        this._aboveClass = 'mat-mdc-autocomplete-panel-above';
    }
}
MatAutocompleteTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatAutocompleteTrigger, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatAutocompleteTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatAutocompleteTrigger, selector: "input[matAutocomplete], textarea[matAutocomplete]", host: { listeners: { "focusin": "_handleFocus()", "blur": "_onTouched()", "input": "_handleInput($event)", "keydown": "_handleKeydown($event)", "click": "_handleClick()" }, properties: { "attr.autocomplete": "autocompleteAttribute", "attr.role": "autocompleteDisabled ? null : \"combobox\"", "attr.aria-autocomplete": "autocompleteDisabled ? null : \"list\"", "attr.aria-activedescendant": "(panelOpen && activeOption) ? activeOption.id : null", "attr.aria-expanded": "autocompleteDisabled ? null : panelOpen.toString()", "attr.aria-owns": "(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id", "attr.aria-haspopup": "autocompleteDisabled ? null : \"listbox\"" }, classAttribute: "mat-mdc-autocomplete-trigger" }, providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR], exportAs: ["matAutocompleteTrigger"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatAutocompleteTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: `input[matAutocomplete], textarea[matAutocomplete]`,
                    host: {
                        'class': 'mat-mdc-autocomplete-trigger',
                        '[attr.autocomplete]': 'autocompleteAttribute',
                        '[attr.role]': 'autocompleteDisabled ? null : "combobox"',
                        '[attr.aria-autocomplete]': 'autocompleteDisabled ? null : "list"',
                        '[attr.aria-activedescendant]': '(panelOpen && activeOption) ? activeOption.id : null',
                        '[attr.aria-expanded]': 'autocompleteDisabled ? null : panelOpen.toString()',
                        '[attr.aria-owns]': '(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id',
                        '[attr.aria-haspopup]': 'autocompleteDisabled ? null : "listbox"',
                        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
                        // a little earlier. This avoids issues where IE delays the focusing of the input.
                        '(focusin)': '_handleFocus()',
                        '(blur)': '_onTouched()',
                        '(input)': '_handleInput($event)',
                        '(keydown)': '_handleKeydown($event)',
                        '(click)': '_handleClick()',
                    },
                    exportAs: 'matAutocompleteTrigger',
                    providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXRyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsSUFBSSxFQUNKLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBRVIsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0YsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUVMLE9BQU8sRUFDUCxhQUFhLEdBS2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUNMLHdCQUF3QixFQUN4Qiw2QkFBNkIsRUFDN0Isd0JBQXdCLEdBRXpCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUMsTUFBTSw4QkFBOEIs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QUM7Z0dBRWpDLHNCQUFzQjtrQkF0QmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1EQUFtRDtvQkFDN0QsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSw4QkFBOEI7d0JBQ3ZDLHFCQUFxQixFQUFFLHVCQUF1Qjt3QkFDOUMsYUFBYSxFQUFFLDBDQUEwQzt3QkFDekQsMEJBQTBCLEVBQUUsc0NBQXNDO3dCQUNsRSw4QkFBOEIsRUFBRSxzREFBc0Q7d0JBQ3RGLHNCQUFzQixFQUFFLG9EQUFvRDt3QkFDNUUsa0JBQWtCLEVBQUUsZ0VBQWdFO3dCQUNwRixzQkFBc0IsRUFBRSx5Q0FBeUM7d0JBQ2pFLDRFQUE0RTt3QkFDNUUsa0ZBQWtGO3dCQUNsRixXQUFXLEVBQUUsZ0JBQWdCO3dCQUM3QixRQUFRLEVBQUUsY0FBYzt3QkFDeEIsU0FBUyxFQUFFLHNCQUFzQjt3QkFDakMsV0FBVyxFQUFFLHdCQUF3Qjt3QkFDckMsU0FBUyxFQUFFLGdCQUFnQjtxQkFDNUI7b0JBQ0QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7aUJBQzdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3QsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7RE9XTl9BUlJPVywgRU5URVIsIEVTQ0FQRSwgVEFCLCBVUF9BUlJPVywgaGFzTW9kaWZpZXJLZXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge19nZXRFdmVudFRhcmdldH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7VGVtcGxhdGVQb3J0YWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtWaWV3cG9ydFJ1bGVyfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7XG4gIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVJlZixcbiAgUG9zaXRpb25TdHJhdGVneSxcbiAgU2Nyb2xsU3RyYXRlZ3ksXG4gIENvbm5lY3RlZFBvc2l0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgTWF0T3B0aW9uU2VsZWN0aW9uQ2hhbmdlLFxuICBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxuICBfTWF0T3B0aW9uQmFzZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01BVF9GT1JNX0ZJRUxELCBNYXRGb3JtRmllbGR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHtkZWZlciwgZnJvbUV2ZW50LCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWxheSwgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFwLCBzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7X01hdEF1dG9jb21wbGV0ZU9yaWdpbkJhc2V9IGZyb20gJy4vYXV0b2NvbXBsZXRlLW9yaWdpbic7XG5pbXBvcnQge1xuICBNYXRBdXRvY29tcGxldGVEZWZhdWx0T3B0aW9ucyxcbiAgTUFUX0FVVE9DT01QTEVURV9ERUZBVUxUX09QVElPTlMsXG4gIF9NYXRBdXRvY29tcGxldGVCYXNlLFxufSBmcm9tICcuL2F1dG9jb21wbGV0ZSc7XG5cbi8qKlxuICogUHJvdmlkZXIgdGhhdCBhbGxvd3MgdGhlIGF1dG9jb21wbGV0ZSB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0QXV0b2NvbXBsZXRlVHJpZ2dlciksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biB3aGVuIGF0dGVtcHRpbmcgdG8gdXNlIGFuIGF1dG9jb21wbGV0ZSB0cmlnZ2VyIHdpdGhvdXQgYSBwYW5lbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1hdEF1dG9jb21wbGV0ZU1pc3NpbmdQYW5lbEVycm9yKCk6IEVycm9yIHtcbiAgcmV0dXJuIEVycm9yKFxuICAgICdBdHRlbXB0aW5nIHRvIG9wZW4gYW4gdW5kZWZpbmVkIGluc3RhbmNlIG9mIGBtYXQtYXV0b2NvbXBsZXRlYC4gJyArXG4gICAgICAnTWFrZSBzdXJlIHRoYXQgdGhlIGlkIHBhc3NlZCB0byB0aGUgYG1hdEF1dG9jb21wbGV0ZWAgaXMgY29ycmVjdCBhbmQgdGhhdCAnICtcbiAgICAgIFwieW91J3JlIGF0dGVtcHRpbmcgdG8gb3BlbiBpdCBhZnRlciB0aGUgbmdBZnRlckNvbnRlbnRJbml0IGhvb2suXCIsXG4gICk7XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZID0gbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PihcbiAgJ21hdC1hdXRvY29tcGxldGUtc2Nyb2xsLXN0cmF0ZWd5Jyxcbik7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gTUFUX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQVRfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBNQVRfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWSxcbiAgZGVwczogW092ZXJsYXldLFxuICB1c2VGYWN0b3J5OiBNQVRfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZLFxufTtcblxuLyoqIEJhc2UgY2xhc3Mgd2l0aCBhbGwgb2YgdGhlIGBNYXRBdXRvY29tcGxldGVUcmlnZ2VyYCBmdW5jdGlvbmFsaXR5LiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgX01hdEF1dG9jb21wbGV0ZVRyaWdnZXJCYXNlXG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95XG57XG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICBwcml2YXRlIF9wb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuICBwcml2YXRlIF9jb21wb25lbnREZXN0cm95ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYXV0b2NvbXBsZXRlRGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuXG4gIC8qKiBPbGQgdmFsdWUgb2YgdGhlIG5hdGl2ZSBpbnB1dC4gVXNlZCB0byB3b3JrIGFyb3VuZCBpc3N1ZXMgd2l0aCB0aGUgYGlucHV0YCBldmVudCBvbiBJRS4gKi9cbiAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcblxuICAvKiogU3RyYXRlZ3kgdGhhdCBpcyB1c2VkIHRvIHBvc2l0aW9uIHRoZSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfcG9zaXRpb25TdHJhdGVneTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgbGFiZWwgc3RhdGUgaXMgYmVpbmcgb3ZlcnJpZGRlbi4gKi9cbiAgcHJpdmF0ZSBfbWFudWFsbHlGbG9hdGluZ0xhYmVsID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBzdWJzY3JpcHRpb24gZm9yIGNsb3NpbmcgYWN0aW9ucyAoc29tZSBhcmUgYm91bmQgdG8gZG9jdW1lbnQpLiAqL1xuICBwcml2YXRlIF9jbG9zaW5nQWN0aW9uc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gdmlld3BvcnQgc2l6ZSBjaGFuZ2VzLiAqL1xuICBwcml2YXRlIF92aWV3cG9ydFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgYXV0b2NvbXBsZXRlIGNhbiBvcGVuIHRoZSBuZXh0IHRpbWUgaXQgaXMgZm9jdXNlZC4gVXNlZCB0byBwcmV2ZW50IGEgZm9jdXNlZCxcbiAgICogY2xvc2VkIGF1dG9jb21wbGV0ZSBmcm9tIGJlaW5nIHJlb3BlbmVkIGlmIHRoZSB1c2VyIHN3aXRjaGVzIHRvIGFub3RoZXIgYnJvd3NlciB0YWIgYW5kIHRoZW5cbiAgICogY29tZXMgYmFjay5cbiAgICovXG4gIHByaXZhdGUgX2Nhbk9wZW5Pbk5leHRGb2N1cyA9IHRydWU7XG5cbiAgLyoqIFZhbHVlIGluc2lkZSB0aGUgaW5wdXQgYmVmb3JlIHdlIGF1dG8tc2VsZWN0ZWQgYW4gb3B0aW9uLiAqL1xuICBwcml2YXRlIF92YWx1ZUJlZm9yZUF1dG9TZWxlY3Rpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQ3VycmVudCBvcHRpb24gdGhhdCB3ZSBoYXZlIGF1dG8tc2VsZWN0ZWQgYXMgdGhlIHVzZXIgaXMgbmF2aWdhdGluZyxcbiAgICogYnV0IHdoaWNoIGhhc24ndCBiZWVuIHByb3BhZ2F0ZWQgdG8gdGhlIG1vZGVsIHZhbHVlIHlldC5cbiAgICovXG4gIHByaXZhdGUgX3BlbmRpbmdBdXRvc2VsZWN0ZWRPcHRpb246IF9NYXRPcHRpb25CYXNlIHwgbnVsbDtcblxuICAvKiogU3RyZWFtIG9mIGtleWJvYXJkIGV2ZW50cyB0aGF0IGNhbiBjbG9zZSB0aGUgcGFuZWwuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Nsb3NlS2V5RXZlbnRTdHJlYW0gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciB3aGVuIHRoZSB3aW5kb3cgaXMgYmx1cnJlZC4gTmVlZHMgdG8gYmUgYW5cbiAgICogYXJyb3cgZnVuY3Rpb24gaW4gb3JkZXIgdG8gcHJlc2VydmUgdGhlIGNvbnRleHQuXG4gICAqL1xuICBwcml2YXRlIF93aW5kb3dCbHVySGFuZGxlciA9ICgpID0+IHtcbiAgICAvLyBJZiB0aGUgdXNlciBibHVycmVkIHRoZSB3aW5kb3cgd2hpbGUgdGhlIGF1dG9jb21wbGV0ZSBpcyBmb2N1c2VkLCBpdCBtZWFucyB0aGF0IGl0J2xsIGJlXG4gICAgLy8gcmVmb2N1c2VkIHdoZW4gdGhleSBjb21lIGJhY2suIEluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIHNraXAgdGhlIGZpcnN0IGZvY3VzIGV2ZW50LCBpZiB0aGVcbiAgICAvLyBwYW5lIHdhcyBjbG9zZWQsIGluIG9yZGVyIHRvIGF2b2lkIHJlb3BlbmluZyBpdCB1bmludGVudGlvbmFsbHkuXG4gICAgdGhpcy5fY2FuT3Blbk9uTmV4dEZvY3VzID1cbiAgICAgIHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCB8fCB0aGlzLnBhbmVsT3BlbjtcbiAgfTtcblxuICAvKiogYFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlc2AgKi9cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBgVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBhdXRvY29tcGxldGUgaGFzIGJlZW4gdG91Y2hlZGAgKi9cbiAgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBUaGUgYXV0b2NvbXBsZXRlIHBhbmVsIHRvIGJlIGF0dGFjaGVkIHRvIHRoaXMgdHJpZ2dlci4gKi9cbiAgQElucHV0KCdtYXRBdXRvY29tcGxldGUnKSBhdXRvY29tcGxldGU6IF9NYXRBdXRvY29tcGxldGVCYXNlO1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBvZiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIHJlbGF0aXZlIHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnQuIEEgcG9zaXRpb24gb2YgYGF1dG9gXG4gICAqIHdpbGwgcmVuZGVyIHRoZSBwYW5lbCB1bmRlcm5lYXRoIHRoZSB0cmlnZ2VyIGlmIHRoZXJlIGlzIGVub3VnaCBzcGFjZSBmb3IgaXQgdG8gZml0IGluXG4gICAqIHRoZSB2aWV3cG9ydCwgb3RoZXJ3aXNlIHRoZSBwYW5lbCB3aWxsIGJlIHNob3duIGFib3ZlIGl0LiBJZiB0aGUgcG9zaXRpb24gaXMgc2V0IHRvXG4gICAqIGBhYm92ZWAgb3IgYGJlbG93YCwgdGhlIHBhbmVsIHdpbGwgYWx3YXlzIGJlIHNob3duIGFib3ZlIG9yIGJlbG93IHRoZSB0cmlnZ2VyLiBubyBtYXR0ZXJcbiAgICogd2hldGhlciBpdCBmaXRzIGNvbXBsZXRlbHkgaW4gdGhlIHZpZXdwb3J0LlxuICAgKi9cbiAgQElucHV0KCdtYXRBdXRvY29tcGxldGVQb3NpdGlvbicpIHBvc2l0aW9uOiAnYXV0bycgfCAnYWJvdmUnIHwgJ2JlbG93JyA9ICdhdXRvJztcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHJlbGF0aXZlIHRvIHdoaWNoIHRvIHBvc2l0aW9uIHRoZSBhdXRvY29tcGxldGUgcGFuZWwuXG4gICAqIERlZmF1bHRzIHRvIHRoZSBhdXRvY29tcGxldGUgdHJpZ2dlciBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCdtYXRBdXRvY29tcGxldGVDb25uZWN0ZWRUbycpIGNvbm5lY3RlZFRvOiBfTWF0QXV0b2NvbXBsZXRlT3JpZ2luQmFzZTtcblxuICAvKipcbiAgICogYGF1dG9jb21wbGV0ZWAgYXR0cmlidXRlIHRvIGJlIHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KCdhdXRvY29tcGxldGUnKSBhdXRvY29tcGxldGVBdHRyaWJ1dGU6IHN0cmluZyA9ICdvZmYnO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBhdXRvY29tcGxldGUgaXMgZGlzYWJsZWQuIFdoZW4gZGlzYWJsZWQsIHRoZSBlbGVtZW50IHdpbGxcbiAgICogYWN0IGFzIGEgcmVndWxhciBpbnB1dCBhbmQgdGhlIHVzZXIgd29uJ3QgYmUgYWJsZSB0byBvcGVuIHRoZSBwYW5lbC5cbiAgICovXG4gIEBJbnB1dCgnbWF0QXV0b2NvbXBsZXRlRGlzYWJsZWQnKVxuICBnZXQgYXV0b2NvbXBsZXRlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dG9jb21wbGV0ZURpc2FibGVkO1xuICB9XG4gIHNldCBhdXRvY29tcGxldGVEaXNhYmxlZCh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fYXV0b2NvbXBsZXRlRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KE1BVF9BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneTogYW55LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfRk9STV9GSUVMRCkgQEhvc3QoKSBwcml2YXRlIF9mb3JtRmllbGQ6IE1hdEZvcm1GaWVsZCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgX3ZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE1BVF9BVVRPQ09NUExFVEVfREVGQVVMVF9PUFRJT05TKVxuICAgIHByaXZhdGUgX2RlZmF1bHRzPzogTWF0QXV0b2NvbXBsZXRlRGVmYXVsdE9wdGlvbnMsXG4gICkge1xuICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gc2Nyb2xsU3RyYXRlZ3k7XG4gIH1cblxuICAvKiogQ2xhc3MgdG8gYXBwbHkgdG8gdGhlIHBhbmVsIHdoZW4gaXQncyBhYm92ZSB0aGUgaW5wdXQuICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfYWJvdmVDbGFzczogc3RyaW5nO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCB3aW5kb3cgPSB0aGlzLl9nZXRXaW5kb3coKTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX3dpbmRvd0JsdXJIYW5kbGVyKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydwb3NpdGlvbiddICYmIHRoaXMuX3Bvc2l0aW9uU3RyYXRlZ3kpIHtcbiAgICAgIHRoaXMuX3NldFN0cmF0ZWd5UG9zaXRpb25zKHRoaXMuX3Bvc2l0aW9uU3RyYXRlZ3kpO1xuXG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZiEudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjb25zdCB3aW5kb3cgPSB0aGlzLl9nZXRXaW5kb3coKTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl93aW5kb3dCbHVySGFuZGxlcik7XG4gICAgfVxuXG4gICAgdGhpcy5fdmlld3BvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jb21wb25lbnREZXN0cm95ZWQgPSB0cnVlO1xuICAgIHRoaXMuX2Rlc3Ryb3lQYW5lbCgpO1xuICAgIHRoaXMuX2Nsb3NlS2V5RXZlbnRTdHJlYW0uY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW4uICovXG4gIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJsYXlBdHRhY2hlZCAmJiB0aGlzLmF1dG9jb21wbGV0ZS5zaG93UGFuZWw7XG4gIH1cbiAgcHJpdmF0ZSBfb3ZlcmxheUF0dGFjaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIE9wZW5zIHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbiBwYW5lbC4gKi9cbiAgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dGFjaE92ZXJsYXkoKTtcbiAgICB0aGlzLl9mbG9hdExhYmVsKCk7XG4gIH1cblxuICAvKiogQ2xvc2VzIHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbiBwYW5lbC4gKi9cbiAgY2xvc2VQYW5lbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNldExhYmVsKCk7XG5cbiAgICBpZiAoIXRoaXMuX292ZXJsYXlBdHRhY2hlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgLy8gT25seSBlbWl0IGlmIHRoZSBwYW5lbCB3YXMgdmlzaWJsZS5cbiAgICAgIC8vIFRoZSBgTmdab25lLm9uU3RhYmxlYCBhbHdheXMgZW1pdHMgb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lLFxuICAgICAgLy8gc28gYWxsIHRoZSBzdWJzY3JpcHRpb25zIGZyb20gYF9zdWJzY3JpYmVUb0Nsb3NpbmdBY3Rpb25zKClgIGFyZSBhbHNvIG91dHNpZGUgb2YgdGhlIEFuZ3VsYXIgem9uZS5cbiAgICAgIC8vIFdlIHNob3VsZCBtYW51YWxseSBydW4gaW4gQW5ndWxhciB6b25lIHRvIHVwZGF0ZSBVSSBhZnRlciBwYW5lbCBjbG9zaW5nLlxuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5jbG9zZWQuZW1pdCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5hdXRvY29tcGxldGUuX2lzT3BlbiA9IHRoaXMuX292ZXJsYXlBdHRhY2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3BlbmRpbmdBdXRvc2VsZWN0ZWRPcHRpb24gPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYgJiYgdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5fY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvLyBOb3RlIHRoYXQgaW4gc29tZSBjYXNlcyB0aGlzIGNhbiBlbmQgdXAgYmVpbmcgY2FsbGVkIGFmdGVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICAgIC8vIEFkZCBhIGNoZWNrIHRvIGVuc3VyZSB0aGF0IHdlIGRvbid0IHRyeSB0byBydW4gY2hhbmdlIGRldGVjdGlvbiBvbiBhIGRlc3Ryb3llZCB2aWV3LlxuICAgIGlmICghdGhpcy5fY29tcG9uZW50RGVzdHJveWVkKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBtYW51YWxseSwgYmVjYXVzZVxuICAgICAgLy8gYGZyb21FdmVudGAgZG9lc24ndCBzZWVtIHRvIGRvIGl0IGF0IHRoZSBwcm9wZXIgdGltZS5cbiAgICAgIC8vIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBsYWJlbCBpcyByZXNldCB3aGVuIHRoZVxuICAgICAgLy8gdXNlciBjbGlja3Mgb3V0c2lkZS5cbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uIHBhbmVsIHRvIGVuc3VyZSB0aGF0IGl0IGZpdHMgYWxsIG9wdGlvbnNcbiAgICogd2l0aGluIHRoZSB2aWV3cG9ydC5cbiAgICovXG4gIHVwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5QXR0YWNoZWQpIHtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYhLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgc3RyZWFtIG9mIGFjdGlvbnMgdGhhdCBzaG91bGQgY2xvc2UgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCwgaW5jbHVkaW5nXG4gICAqIHdoZW4gYW4gb3B0aW9uIGlzIHNlbGVjdGVkLCBvbiBibHVyLCBhbmQgd2hlbiBUQUIgaXMgcHJlc3NlZC5cbiAgICovXG4gIGdldCBwYW5lbENsb3NpbmdBY3Rpb25zKCk6IE9ic2VydmFibGU8TWF0T3B0aW9uU2VsZWN0aW9uQ2hhbmdlIHwgbnVsbD4ge1xuICAgIHJldHVybiBtZXJnZShcbiAgICAgIHRoaXMub3B0aW9uU2VsZWN0aW9ucyxcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLl9rZXlNYW5hZ2VyLnRhYk91dC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLl9vdmVybGF5QXR0YWNoZWQpKSxcbiAgICAgIHRoaXMuX2Nsb3NlS2V5RXZlbnRTdHJlYW0sXG4gICAgICB0aGlzLl9nZXRPdXRzaWRlQ2xpY2tTdHJlYW0oKSxcbiAgICAgIHRoaXMuX292ZXJsYXlSZWZcbiAgICAgICAgPyB0aGlzLl9vdmVybGF5UmVmLmRldGFjaG1lbnRzKCkucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5fb3ZlcmxheUF0dGFjaGVkKSlcbiAgICAgICAgOiBvYnNlcnZhYmxlT2YoKSxcbiAgICApLnBpcGUoXG4gICAgICAvLyBOb3JtYWxpemUgdGhlIG91dHB1dCBzbyB3ZSByZXR1cm4gYSBjb25zaXN0ZW50IHR5cGUuXG4gICAgICBtYXAoZXZlbnQgPT4gKGV2ZW50IGluc3RhbmNlb2YgTWF0T3B0aW9uU2VsZWN0aW9uQ2hhbmdlID8gZXZlbnQgOiBudWxsKSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBTdHJlYW0gb2YgY2hhbmdlcyB0byB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cbiAgcmVhZG9ubHkgb3B0aW9uU2VsZWN0aW9uczogT2JzZXJ2YWJsZTxNYXRPcHRpb25TZWxlY3Rpb25DaGFuZ2U+ID0gZGVmZXIoKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmF1dG9jb21wbGV0ZSA/IHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMgOiBudWxsO1xuXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmNoYW5nZXMucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKG9wdGlvbnMpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gbWVyZ2UoLi4ub3B0aW9ucy5tYXAob3B0aW9uID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGFueSBzdWJzY3JpYmVycyBiZWZvcmUgYG5nQWZ0ZXJWaWV3SW5pdGAsIHRoZSBgYXV0b2NvbXBsZXRlYCB3aWxsIGJlIHVuZGVmaW5lZC5cbiAgICAvLyBSZXR1cm4gYSBzdHJlYW0gdGhhdCB3ZSdsbCByZXBsYWNlIHdpdGggdGhlIHJlYWwgb25lIG9uY2UgZXZlcnl0aGluZyBpcyBpbiBwbGFjZS5cbiAgICByZXR1cm4gdGhpcy5fem9uZS5vblN0YWJsZS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm9wdGlvblNlbGVjdGlvbnMpLFxuICAgICk7XG4gIH0pIGFzIE9ic2VydmFibGU8TWF0T3B0aW9uU2VsZWN0aW9uQ2hhbmdlPjtcblxuICAvKiogVGhlIGN1cnJlbnRseSBhY3RpdmUgb3B0aW9uLCBjb2VyY2VkIHRvIE1hdE9wdGlvbiB0eXBlLiAqL1xuICBnZXQgYWN0aXZlT3B0aW9uKCk6IF9NYXRPcHRpb25CYXNlIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlICYmIHRoaXMuYXV0b2NvbXBsZXRlLl9rZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRvY29tcGxldGUuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBTdHJlYW0gb2YgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfZ2V0T3V0c2lkZUNsaWNrU3RyZWFtKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIG1lcmdlKFxuICAgICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCAnY2xpY2snKSBhcyBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+LFxuICAgICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCAnYXV4Y2xpY2snKSBhcyBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+LFxuICAgICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCAndG91Y2hlbmQnKSBhcyBPYnNlcnZhYmxlPFRvdWNoRXZlbnQ+LFxuICAgICkucGlwZShcbiAgICAgIGZpbHRlcihldmVudCA9PiB7XG4gICAgICAgIC8vIElmIHdlJ3JlIGluIHRoZSBTaGFkb3cgRE9NLCB0aGUgZXZlbnQgdGFyZ2V0IHdpbGwgYmUgdGhlIHNoYWRvdyByb290LCBzbyB3ZSBoYXZlIHRvXG4gICAgICAgIC8vIGZhbGwgYmFjayB0byBjaGVjayB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgcGF0aCBvZiB0aGUgY2xpY2sgZXZlbnQuXG4gICAgICAgIGNvbnN0IGNsaWNrVGFyZ2V0ID0gX2dldEV2ZW50VGFyZ2V0PEhUTUxFbGVtZW50PihldmVudCkhO1xuICAgICAgICBjb25zdCBmb3JtRmllbGQgPSB0aGlzLl9mb3JtRmllbGQgPyB0aGlzLl9mb3JtRmllbGQuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA6IG51bGw7XG4gICAgICAgIGNvbnN0IGN1c3RvbU9yaWdpbiA9IHRoaXMuY29ubmVjdGVkVG8gPyB0aGlzLmNvbm5lY3RlZFRvLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB0aGlzLl9vdmVybGF5QXR0YWNoZWQgJiZcbiAgICAgICAgICBjbGlja1RhcmdldCAhPT0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50ICYmXG4gICAgICAgICAgLy8gTm9ybWFsbHkgZm9jdXMgbW92ZXMgaW5zaWRlIGBtb3VzZWRvd25gIHNvIHRoaXMgY29uZGl0aW9uIHdpbGwgYWxtb3N0IGFsd2F5cyBiZVxuICAgICAgICAgIC8vIHRydWUuIEl0cyBtYWluIHB1cnBvc2UgaXMgdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSBpbnB1dCBpcyBmb2N1c2VkIGZyb20gYW5cbiAgICAgICAgICAvLyBvdXRzaWRlIGNsaWNrIHdoaWNoIHByb3BhZ2F0ZXMgdXAgdG8gdGhlIGBib2R5YCBsaXN0ZW5lciB3aXRoaW4gdGhlIHNhbWUgc2VxdWVuY2VcbiAgICAgICAgICAvLyBhbmQgY2F1c2VzIHRoZSBwYW5lbCB0byBjbG9zZSBpbW1lZGlhdGVseSAoc2VlICMzMTA2KS5cbiAgICAgICAgICB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgICAoIWZvcm1GaWVsZCB8fCAhZm9ybUZpZWxkLmNvbnRhaW5zKGNsaWNrVGFyZ2V0KSkgJiZcbiAgICAgICAgICAoIWN1c3RvbU9yaWdpbiB8fCAhY3VzdG9tT3JpZ2luLmNvbnRhaW5zKGNsaWNrVGFyZ2V0KSkgJiZcbiAgICAgICAgICAhIXRoaXMuX292ZXJsYXlSZWYgJiZcbiAgICAgICAgICAhdGhpcy5fb3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldClcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLl9hc3NpZ25PcHRpb25WYWx1ZSh2YWx1ZSkpO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSkge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgY29uc3QgaGFzTW9kaWZpZXIgPSBoYXNNb2RpZmllcktleShldmVudCk7XG5cbiAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiBvbiBhbGwgZXNjYXBlIGtleSBwcmVzc2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5IHRvIGJyaW5nIElFXG4gICAgLy8gaW4gbGluZSB3aXRoIG90aGVyIGJyb3dzZXJzLiBCeSBkZWZhdWx0LCBwcmVzc2luZyBlc2NhcGUgb24gSUUgd2lsbCBjYXVzZSBpdCB0byByZXZlcnRcbiAgICAvLyB0aGUgaW5wdXQgdmFsdWUgdG8gdGhlIG9uZSB0aGF0IGl0IGhhZCBvbiBmb2N1cywgaG93ZXZlciBpdCB3b24ndCBkaXNwYXRjaCBhbnkgZXZlbnRzXG4gICAgLy8gd2hpY2ggbWVhbnMgdGhhdCB0aGUgbW9kZWwgdmFsdWUgd2lsbCBiZSBvdXQgb2Ygc3luYyB3aXRoIHRoZSB2aWV3LlxuICAgIGlmIChrZXlDb2RlID09PSBFU0NBUEUgJiYgIWhhc01vZGlmaWVyKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZU9wdGlvbiAmJiBrZXlDb2RlID09PSBFTlRFUiAmJiB0aGlzLnBhbmVsT3BlbiAmJiAhaGFzTW9kaWZpZXIpIHtcbiAgICAgIHRoaXMuYWN0aXZlT3B0aW9uLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgdGhpcy5fcmVzZXRBY3RpdmVJdGVtKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvY29tcGxldGUpIHtcbiAgICAgIGNvbnN0IHByZXZBY3RpdmVJdGVtID0gdGhpcy5hdXRvY29tcGxldGUuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXlDb2RlID09PSBVUF9BUlJPVyB8fCBrZXlDb2RlID09PSBET1dOX0FSUk9XO1xuXG4gICAgICBpZiAoa2V5Q29kZSA9PT0gVEFCIHx8IChpc0Fycm93S2V5ICYmICFoYXNNb2RpZmllciAmJiB0aGlzLnBhbmVsT3BlbikpIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuX2tleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJvd0tleSAmJiB0aGlzLl9jYW5PcGVuKCkpIHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQXJyb3dLZXkgfHwgdGhpcy5hdXRvY29tcGxldGUuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSAhPT0gcHJldkFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsVG9PcHRpb24odGhpcy5hdXRvY29tcGxldGUuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDApO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZS5hdXRvU2VsZWN0QWN0aXZlT3B0aW9uICYmIHRoaXMuYWN0aXZlT3B0aW9uKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9wZW5kaW5nQXV0b3NlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZUJlZm9yZUF1dG9TZWxlY3Rpb24gPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fcGVuZGluZ0F1dG9zZWxlY3RlZE9wdGlvbiA9IHRoaXMuYWN0aXZlT3B0aW9uO1xuICAgICAgICAgIHRoaXMuX2Fzc2lnbk9wdGlvblZhbHVlKHRoaXMuYWN0aXZlT3B0aW9uLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBsZXQgdmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGwgPSB0YXJnZXQudmFsdWU7XG5cbiAgICAvLyBCYXNlZCBvbiBgTnVtYmVyVmFsdWVBY2Nlc3NvcmAgZnJvbSBmb3Jtcy5cbiAgICBpZiAodGFyZ2V0LnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlID09ICcnID8gbnVsbCA6IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBpbnB1dCBoYXMgYSBwbGFjZWhvbGRlciwgSUUgd2lsbCBmaXJlIHRoZSBgaW5wdXRgIGV2ZW50IG9uIHBhZ2UgbG9hZCxcbiAgICAvLyBmb2N1cyBhbmQgYmx1ciwgaW4gYWRkaXRpb24gdG8gd2hlbiB0aGUgdXNlciBhY3R1YWxseSBjaGFuZ2VkIHRoZSB2YWx1ZS4gVG9cbiAgICAvLyBmaWx0ZXIgb3V0IGFsbCBvZiB0aGUgZXh0cmEgZXZlbnRzLCB3ZSBzYXZlIHRoZSB2YWx1ZSBvbiBmb2N1cyBhbmQgYmV0d2VlblxuICAgIC8vIGBpbnB1dGAgZXZlbnRzLCBhbmQgd2UgY2hlY2sgd2hldGhlciBpdCBjaGFuZ2VkLlxuICAgIC8vIFNlZTogaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84ODU3NDcvXG4gICAgaWYgKHRoaXMuX3ByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9wcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9wZW5kaW5nQXV0b3NlbGVjdGVkT3B0aW9uID0gbnVsbDtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcblxuICAgICAgaWYgKHRoaXMuX2Nhbk9wZW4oKSAmJiB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaGFuZGxlRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9jYW5PcGVuT25OZXh0Rm9jdXMpIHtcbiAgICAgIHRoaXMuX2Nhbk9wZW5Pbk5leHRGb2N1cyA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jYW5PcGVuKCkpIHtcbiAgICAgIHRoaXMuX3ByZXZpb3VzVmFsdWUgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICB0aGlzLl9hdHRhY2hPdmVybGF5KCk7XG4gICAgICB0aGlzLl9mbG9hdExhYmVsKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVDbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2FuT3BlbigpICYmICF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW4gXCJhdXRvXCIgbW9kZSwgdGhlIGxhYmVsIHdpbGwgYW5pbWF0ZSBkb3duIGFzIHNvb24gYXMgZm9jdXMgaXMgbG9zdC5cbiAgICogVGhpcyBjYXVzZXMgdGhlIHZhbHVlIHRvIGp1bXAgd2hlbiBzZWxlY3RpbmcgYW4gb3B0aW9uIHdpdGggdGhlIG1vdXNlLlxuICAgKiBUaGlzIG1ldGhvZCBtYW51YWxseSBmbG9hdHMgdGhlIGxhYmVsIHVudGlsIHRoZSBwYW5lbCBjYW4gYmUgY2xvc2VkLlxuICAgKiBAcGFyYW0gc2hvdWxkQW5pbWF0ZSBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYmUgYW5pbWF0ZWQgd2hlbiBpdCBpcyBmbG9hdGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfZmxvYXRMYWJlbChzaG91bGRBbmltYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZm9ybUZpZWxkICYmIHRoaXMuX2Zvcm1GaWVsZC5mbG9hdExhYmVsID09PSAnYXV0bycpIHtcbiAgICAgIGlmIChzaG91bGRBbmltYXRlKSB7XG4gICAgICAgIHRoaXMuX2Zvcm1GaWVsZC5fYW5pbWF0ZUFuZExvY2tMYWJlbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZm9ybUZpZWxkLmZsb2F0TGFiZWwgPSAnYWx3YXlzJztcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbWFudWFsbHlGbG9hdGluZ0xhYmVsID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKiogSWYgdGhlIGxhYmVsIGhhcyBiZWVuIG1hbnVhbGx5IGVsZXZhdGVkLCByZXR1cm4gaXQgdG8gaXRzIG5vcm1hbCBzdGF0ZS4gKi9cbiAgcHJpdmF0ZSBfcmVzZXRMYWJlbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFudWFsbHlGbG9hdGluZ0xhYmVsKSB7XG4gICAgICB0aGlzLl9mb3JtRmllbGQuZmxvYXRMYWJlbCA9ICdhdXRvJztcbiAgICAgIHRoaXMuX21hbnVhbGx5RmxvYXRpbmdMYWJlbCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBsaXN0ZW5zIHRvIGEgc3RyZWFtIG9mIHBhbmVsIGNsb3NpbmcgYWN0aW9ucyBhbmQgcmVzZXRzIHRoZVxuICAgKiBzdHJlYW0gZXZlcnkgdGltZSB0aGUgb3B0aW9uIGxpc3QgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvQ2xvc2luZ0FjdGlvbnMoKTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBmaXJzdFN0YWJsZSA9IHRoaXMuX3pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKTtcbiAgICBjb25zdCBvcHRpb25DaGFuZ2VzID0gdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucy5jaGFuZ2VzLnBpcGUoXG4gICAgICB0YXAoKCkgPT4gdGhpcy5fcG9zaXRpb25TdHJhdGVneS5yZWFwcGx5TGFzdFBvc2l0aW9uKCkpLFxuICAgICAgLy8gRGVmZXIgZW1pdHRpbmcgdG8gdGhlIHN0cmVhbSB1bnRpbCB0aGUgbmV4dCB0aWNrLCBiZWNhdXNlIGNoYW5naW5nXG4gICAgICAvLyBiaW5kaW5ncyBpbiBoZXJlIHdpbGwgY2F1c2UgXCJjaGFuZ2VkIGFmdGVyIGNoZWNrZWRcIiBlcnJvcnMuXG4gICAgICBkZWxheSgwKSxcbiAgICApO1xuXG4gICAgLy8gV2hlbiB0aGUgem9uZSBpcyBzdGFibGUgaW5pdGlhbGx5LCBhbmQgd2hlbiB0aGUgb3B0aW9uIGxpc3QgY2hhbmdlcy4uLlxuICAgIHJldHVybiAoXG4gICAgICBtZXJnZShmaXJzdFN0YWJsZSwgb3B0aW9uQ2hhbmdlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHN0cmVhbSBvZiBwYW5lbENsb3NpbmdBY3Rpb25zLCByZXBsYWNpbmcgYW55IHByZXZpb3VzIHN0cmVhbXNcbiAgICAgICAgICAvLyB0aGF0IHdlcmUgY3JlYXRlZCwgYW5kIGZsYXR0ZW4gaXQgc28gb3VyIHN0cmVhbSBvbmx5IGVtaXRzIGNsb3NpbmcgZXZlbnRzLi4uXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFRoZSBgTmdab25lLm9uU3RhYmxlYCBhbHdheXMgZW1pdHMgb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lLCB0aHVzIHdlIGhhdmUgdG8gcmUtZW50ZXJcbiAgICAgICAgICAgIC8vIHRoZSBBbmd1bGFyIHpvbmUuIFRoaXMgd2lsbCBsZWFkIHRvIGNoYW5nZSBkZXRlY3Rpb24gYmVpbmcgY2FsbGVkIG91dHNpZGUgb2YgdGhlIEFuZ3VsYXJcbiAgICAgICAgICAgIC8vIHpvbmUgYW5kIHRoZSBgYXV0b2NvbXBsZXRlLm9wZW5lZGAgd2lsbCBhbHNvIGVtaXQgb3V0c2lkZSBvZiB0aGUgQW5ndWxhci5cbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgd2FzT3BlbiA9IHRoaXMucGFuZWxPcGVuO1xuICAgICAgICAgICAgICB0aGlzLl9yZXNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuX3NldFZpc2liaWxpdHkoKTtcbiAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX292ZXJsYXlSZWYhLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAod2FzT3BlbiAhPT0gdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgYHBhbmVsT3BlbmAgc3RhdGUgY2hhbmdlZCwgd2UgbmVlZCB0byBtYWtlIHN1cmUgdG8gZW1pdCB0aGUgYG9wZW5lZGAgb3JcbiAgICAgICAgICAgICAgICAvLyBgY2xvc2VkYCBldmVudCwgYmVjYXVzZSB3ZSBtYXkgbm90IGhhdmUgZW1pdHRlZCBpdC4gVGhpcyBjYW4gaGFwcGVuXG4gICAgICAgICAgICAgICAgLy8gLSBpZiB0aGUgdXNlcnMgb3BlbnMgdGhlIHBhbmVsIGFuZCB0aGVyZSBhcmUgbm8gb3B0aW9ucywgYnV0IHRoZVxuICAgICAgICAgICAgICAgIC8vICAgb3B0aW9ucyBjb21lIGluIHNsaWdodGx5IGxhdGVyIG9yIGFzIGEgcmVzdWx0IG9mIHRoZSB2YWx1ZSBjaGFuZ2luZyxcbiAgICAgICAgICAgICAgICAvLyAtIGlmIHRoZSBwYW5lbCBpcyBjbG9zZWQgYWZ0ZXIgdGhlIHVzZXIgZW50ZXJlZCBhIHN0cmluZyB0aGF0IGRpZCBub3QgbWF0Y2ggYW55XG4gICAgICAgICAgICAgICAgLy8gICBvZiB0aGUgYXZhaWxhYmxlIG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgLy8gLSBpZiBhIHZhbGlkIHN0cmluZyBpcyBlbnRlcmVkIGFmdGVyIGFuIGludmFsaWQgb25lLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUub3BlbmVkLmVtaXQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuY2xvc2VkLmVtaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbENsb3NpbmdBY3Rpb25zO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIC8vIHdoZW4gdGhlIGZpcnN0IGNsb3NpbmcgZXZlbnQgb2NjdXJzLi4uXG4gICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgKVxuICAgICAgICAvLyBzZXQgdGhlIHZhbHVlLCBjbG9zZSB0aGUgcGFuZWwsIGFuZCBjb21wbGV0ZS5cbiAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB0aGlzLl9zZXRWYWx1ZUFuZENsb3NlKGV2ZW50KSlcbiAgICApO1xuICB9XG5cbiAgLyoqIERlc3Ryb3lzIHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbiBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfZGVzdHJveVBhbmVsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXNzaWduT3B0aW9uVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHRvRGlzcGxheSA9XG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZSAmJiB0aGlzLmF1dG9jb21wbGV0ZS5kaXNwbGF5V2l0aFxuICAgICAgICA/IHRoaXMuYXV0b2NvbXBsZXRlLmRpc3BsYXlXaXRoKHZhbHVlKVxuICAgICAgICA6IHZhbHVlO1xuXG4gICAgLy8gU2ltcGx5IGZhbGxpbmcgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGRpc3BsYXkgdmFsdWUgaXMgZmFsc3kgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICAvLyBUaGUgZGlzcGxheSB2YWx1ZSBjYW4gYWxzbyBiZSB0aGUgbnVtYmVyIHplcm8gYW5kIHNob3VsZG4ndCBmYWxsIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nLlxuICAgIHRoaXMuX3VwZGF0ZU5hdGl2ZUlucHV0VmFsdWUodG9EaXNwbGF5ICE9IG51bGwgPyB0b0Rpc3BsYXkgOiAnJyk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVOYXRpdmVJbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBJZiBpdCdzIHVzZWQgd2l0aGluIGEgYE1hdEZvcm1GaWVsZGAsIHdlIHNob3VsZCBzZXQgaXQgdGhyb3VnaCB0aGUgcHJvcGVydHkgc28gaXQgY2FuIGdvXG4gICAgLy8gdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgIGlmICh0aGlzLl9mb3JtRmllbGQpIHtcbiAgICAgIHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC52YWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcbiAgICogY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eSBpZiB0aGlzIGludGVyYWN0aW9uXG4gICAqIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIHByaXZhdGUgX3NldFZhbHVlQW5kQ2xvc2UoZXZlbnQ6IE1hdE9wdGlvblNlbGVjdGlvbkNoYW5nZSB8IG51bGwpOiB2b2lkIHtcbiAgICBjb25zdCB0b1NlbGVjdCA9IGV2ZW50ID8gZXZlbnQuc291cmNlIDogdGhpcy5fcGVuZGluZ0F1dG9zZWxlY3RlZE9wdGlvbjtcblxuICAgIGlmICh0b1NlbGVjdCkge1xuICAgICAgdGhpcy5fY2xlYXJQcmV2aW91c1NlbGVjdGVkT3B0aW9uKHRvU2VsZWN0KTtcbiAgICAgIHRoaXMuX2Fzc2lnbk9wdGlvblZhbHVlKHRvU2VsZWN0LnZhbHVlKTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHRvU2VsZWN0LnZhbHVlKTtcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLl9lbWl0U2VsZWN0RXZlbnQodG9TZWxlY3QpO1xuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oc2tpcDogX01hdE9wdGlvbkJhc2UpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGlmIChvcHRpb24gIT09IHNraXAgJiYgb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNoT3ZlcmxheSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYXV0b2NvbXBsZXRlICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBnZXRNYXRBdXRvY29tcGxldGVNaXNzaW5nUGFuZWxFcnJvcigpO1xuICAgIH1cblxuICAgIGxldCBvdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheVJlZjtcblxuICAgIGlmICghb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fcG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuYXV0b2NvbXBsZXRlLnRlbXBsYXRlLCB0aGlzLl92aWV3Q29udGFpbmVyUmVmLCB7XG4gICAgICAgIGlkOiB0aGlzLl9mb3JtRmllbGQ/LmdldExhYmVsSWQoKSxcbiAgICAgIH0pO1xuICAgICAgb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKHRoaXMuX2dldE92ZXJsYXlDb25maWcoKSk7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmID0gb3ZlcmxheVJlZjtcbiAgICAgIHRoaXMuX2hhbmRsZU92ZXJsYXlFdmVudHMob3ZlcmxheVJlZik7XG4gICAgICB0aGlzLl92aWV3cG9ydFN1YnNjcmlwdGlvbiA9IHRoaXMuX3ZpZXdwb3J0UnVsZXIuY2hhbmdlKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuICYmIG92ZXJsYXlSZWYpIHtcbiAgICAgICAgICBvdmVybGF5UmVmLnVwZGF0ZVNpemUoe3dpZHRoOiB0aGlzLl9nZXRQYW5lbFdpZHRoKCl9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVwZGF0ZSB0aGUgdHJpZ2dlciwgcGFuZWwgd2lkdGggYW5kIGRpcmVjdGlvbiwgaW4gY2FzZSBhbnl0aGluZyBoYXMgY2hhbmdlZC5cbiAgICAgIHRoaXMuX3Bvc2l0aW9uU3RyYXRlZ3kuc2V0T3JpZ2luKHRoaXMuX2dldENvbm5lY3RlZEVsZW1lbnQoKSk7XG4gICAgICBvdmVybGF5UmVmLnVwZGF0ZVNpemUoe3dpZHRoOiB0aGlzLl9nZXRQYW5lbFdpZHRoKCl9KTtcbiAgICB9XG5cbiAgICBpZiAob3ZlcmxheVJlZiAmJiAhb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLl9wb3J0YWwpO1xuICAgICAgdGhpcy5fY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb24gPSB0aGlzLl9zdWJzY3JpYmVUb0Nsb3NpbmdBY3Rpb25zKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgd2FzT3BlbiA9IHRoaXMucGFuZWxPcGVuO1xuXG4gICAgdGhpcy5hdXRvY29tcGxldGUuX3NldFZpc2liaWxpdHkoKTtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZS5faXNPcGVuID0gdGhpcy5fb3ZlcmxheUF0dGFjaGVkID0gdHJ1ZTtcblxuICAgIC8vIFdlIG5lZWQgdG8gZG8gYW4gZXh0cmEgYHBhbmVsT3BlbmAgY2hlY2sgaW4gaGVyZSwgYmVjYXVzZSB0aGVcbiAgICAvLyBhdXRvY29tcGxldGUgd29uJ3QgYmUgc2hvd24gaWYgdGhlcmUgYXJlIG5vIG9wdGlvbnMuXG4gICAgaWYgKHRoaXMucGFuZWxPcGVuICYmIHdhc09wZW4gIT09IHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcGVuZWQuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuX2dldE92ZXJsYXlQb3NpdGlvbigpLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX3Njcm9sbFN0cmF0ZWd5KCksXG4gICAgICB3aWR0aDogdGhpcy5fZ2V0UGFuZWxXaWR0aCgpLFxuICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXIsXG4gICAgICBwYW5lbENsYXNzOiB0aGlzLl9kZWZhdWx0cz8ub3ZlcmxheVBhbmVsQ2xhc3MsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPdmVybGF5UG9zaXRpb24oKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5XG4gICAgICAucG9zaXRpb24oKVxuICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fZ2V0Q29ubmVjdGVkRWxlbWVudCgpKVxuICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAud2l0aFB1c2goZmFsc2UpO1xuXG4gICAgdGhpcy5fc2V0U3RyYXRlZ3lQb3NpdGlvbnMoc3RyYXRlZ3kpO1xuICAgIHRoaXMuX3Bvc2l0aW9uU3RyYXRlZ3kgPSBzdHJhdGVneTtcbiAgICByZXR1cm4gc3RyYXRlZ3k7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgcG9zaXRpb25zIG9uIGEgcG9zaXRpb24gc3RyYXRlZ3kgYmFzZWQgb24gdGhlIGRpcmVjdGl2ZSdzIGlucHV0IHN0YXRlLiAqL1xuICBwcml2YXRlIF9zZXRTdHJhdGVneVBvc2l0aW9ucyhwb3NpdGlvblN0cmF0ZWd5OiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpIHtcbiAgICAvLyBOb3RlIHRoYXQgd2UgcHJvdmlkZSBob3Jpem9udGFsIGZhbGxiYWNrIHBvc2l0aW9ucywgZXZlbiB0aG91Z2ggYnkgZGVmYXVsdCB0aGUgZHJvcGRvd25cbiAgICAvLyB3aWR0aCBtYXRjaGVzIHRoZSBpbnB1dCwgYmVjYXVzZSBjb25zdW1lcnMgY2FuIG92ZXJyaWRlIHRoZSB3aWR0aC4gU2VlICMxODg1NC5cbiAgICBjb25zdCBiZWxvd1Bvc2l0aW9uczogQ29ubmVjdGVkUG9zaXRpb25bXSA9IFtcbiAgICAgIHtvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJ30sXG4gICAgICB7b3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAndG9wJ30sXG4gICAgXTtcblxuICAgIC8vIFRoZSBvdmVybGF5IGVkZ2UgY29ubmVjdGVkIHRvIHRoZSB0cmlnZ2VyIHNob3VsZCBoYXZlIHNxdWFyZWQgY29ybmVycywgd2hpbGVcbiAgICAvLyB0aGUgb3Bwb3NpdGUgZW5kIGhhcyByb3VuZGVkIGNvcm5lcnMuIFdlIGFwcGx5IGEgQ1NTIGNsYXNzIHRvIHN3YXAgdGhlXG4gICAgLy8gYm9yZGVyLXJhZGl1cyBiYXNlZCBvbiB0aGUgb3ZlcmxheSBwb3NpdGlvbi5cbiAgICBjb25zdCBwYW5lbENsYXNzID0gdGhpcy5fYWJvdmVDbGFzcztcbiAgICBjb25zdCBhYm92ZVBvc2l0aW9uczogQ29ubmVjdGVkUG9zaXRpb25bXSA9IFtcbiAgICAgIHtvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJywgcGFuZWxDbGFzc30sXG4gICAgICB7b3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnYm90dG9tJywgcGFuZWxDbGFzc30sXG4gICAgXTtcblxuICAgIGxldCBwb3NpdGlvbnM6IENvbm5lY3RlZFBvc2l0aW9uW107XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gJ2Fib3ZlJykge1xuICAgICAgcG9zaXRpb25zID0gYWJvdmVQb3NpdGlvbnM7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uID09PSAnYmVsb3cnKSB7XG4gICAgICBwb3NpdGlvbnMgPSBiZWxvd1Bvc2l0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zaXRpb25zID0gWy4uLmJlbG93UG9zaXRpb25zLCAuLi5hYm92ZVBvc2l0aW9uc107XG4gICAgfVxuXG4gICAgcG9zaXRpb25TdHJhdGVneS53aXRoUG9zaXRpb25zKHBvc2l0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb25uZWN0ZWRFbGVtZW50KCk6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHtcbiAgICBpZiAodGhpcy5jb25uZWN0ZWRUbykge1xuICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGVkVG8uZWxlbWVudFJlZjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZm9ybUZpZWxkID8gdGhpcy5fZm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSA6IHRoaXMuX2VsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQYW5lbFdpZHRoKCk6IG51bWJlciB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXV0b2NvbXBsZXRlLnBhbmVsV2lkdGggfHwgdGhpcy5fZ2V0SG9zdFdpZHRoKCk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGlucHV0IGVsZW1lbnQsIHNvIHRoZSBwYW5lbCB3aWR0aCBjYW4gbWF0Y2ggaXQuICovXG4gIHByaXZhdGUgX2dldEhvc3RXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9nZXRDb25uZWN0ZWRFbGVtZW50KCkubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIC0xIHNvIGFycm93IGV2ZW50cyB3aWxsIGFjdGl2YXRlIHRoZVxuICAgKiBjb3JyZWN0IG9wdGlvbnMsIG9yIHRvIDAgaWYgdGhlIGNvbnN1bWVyIG9wdGVkIGludG8gaXQuXG4gICAqL1xuICBwcml2YXRlIF9yZXNldEFjdGl2ZUl0ZW0oKTogdm9pZCB7XG4gICAgY29uc3QgYXV0b2NvbXBsZXRlID0gdGhpcy5hdXRvY29tcGxldGU7XG5cbiAgICBpZiAoYXV0b2NvbXBsZXRlLmF1dG9BY3RpdmVGaXJzdE9wdGlvbikge1xuICAgICAgLy8gTm90ZSB0aGF0IHdlIGdvIHRocm91Z2ggYHNldEZpcnN0SXRlbUFjdGl2ZWAsIHJhdGhlciB0aGFuIGBzZXRBY3RpdmVJdGVtKDApYCwgYmVjYXVzZVxuICAgICAgLy8gdGhlIGZvcm1lciB3aWxsIGZpbmQgdGhlIG5leHQgZW5hYmxlZCBvcHRpb24sIGlmIHRoZSBmaXJzdCBvbmUgaXMgZGlzYWJsZWQuXG4gICAgICBhdXRvY29tcGxldGUuX2tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF1dG9jb21wbGV0ZS5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICB9XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYW5lbCBjYW4gYmUgb3BlbmVkLiAqL1xuICBwcml2YXRlIF9jYW5PcGVuKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgcmV0dXJuICFlbGVtZW50LnJlYWRPbmx5ICYmICFlbGVtZW50LmRpc2FibGVkICYmICF0aGlzLl9hdXRvY29tcGxldGVEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBVc2UgZGVmYXVsdFZpZXcgb2YgaW5qZWN0ZWQgZG9jdW1lbnQgaWYgYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIGdsb2JhbCB3aW5kb3cgcmVmZXJlbmNlICovXG4gIHByaXZhdGUgX2dldFdpbmRvdygpOiBXaW5kb3cge1xuICAgIHJldHVybiB0aGlzLl9kb2N1bWVudD8uZGVmYXVsdFZpZXcgfHwgd2luZG93O1xuICB9XG5cbiAgLyoqIFNjcm9sbHMgdG8gYSBwYXJ0aWN1bGFyIG9wdGlvbiBpbiB0aGUgbGlzdC4gKi9cbiAgcHJpdmF0ZSBfc2Nyb2xsVG9PcHRpb24oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIEdpdmVuIHRoYXQgd2UgYXJlIG5vdCBhY3R1YWxseSBmb2N1c2luZyBhY3RpdmUgb3B0aW9ucywgd2UgbXVzdCBtYW51YWxseSBhZGp1c3Qgc2Nyb2xsXG4gICAgLy8gdG8gcmV2ZWFsIG9wdGlvbnMgYmVsb3cgdGhlIGZvbGQuIEZpcnN0LCB3ZSBmaW5kIHRoZSBvZmZzZXQgb2YgdGhlIG9wdGlvbiBmcm9tIHRoZSB0b3BcbiAgICAvLyBvZiB0aGUgcGFuZWwuIElmIHRoYXQgb2Zmc2V0IGlzIGJlbG93IHRoZSBmb2xkLCB0aGUgbmV3IHNjcm9sbFRvcCB3aWxsIGJlIHRoZSBvZmZzZXQgLVxuICAgIC8vIHRoZSBwYW5lbCBoZWlnaHQgKyB0aGUgb3B0aW9uIGhlaWdodCwgc28gdGhlIGFjdGl2ZSBvcHRpb24gd2lsbCBiZSBqdXN0IHZpc2libGUgYXQgdGhlXG4gICAgLy8gYm90dG9tIG9mIHRoZSBwYW5lbC4gSWYgdGhhdCBvZmZzZXQgaXMgYWJvdmUgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYW5lbCwgdGhlIG5ldyBzY3JvbGxUb3BcbiAgICAvLyB3aWxsIGJlY29tZSB0aGUgb2Zmc2V0LiBJZiB0aGF0IG9mZnNldCBpcyB2aXNpYmxlIHdpdGhpbiB0aGUgcGFuZWwgYWxyZWFkeSwgdGhlIHNjcm9sbFRvcCBpc1xuICAgIC8vIG5vdCBhZGp1c3RlZC5cbiAgICBjb25zdCBhdXRvY29tcGxldGUgPSB0aGlzLmF1dG9jb21wbGV0ZTtcbiAgICBjb25zdCBsYWJlbENvdW50ID0gX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oXG4gICAgICBpbmRleCxcbiAgICAgIGF1dG9jb21wbGV0ZS5vcHRpb25zLFxuICAgICAgYXV0b2NvbXBsZXRlLm9wdGlvbkdyb3VwcyxcbiAgICApO1xuXG4gICAgaWYgKGluZGV4ID09PSAwICYmIGxhYmVsQ291bnQgPT09IDEpIHtcbiAgICAgIC8vIElmIHdlJ3ZlIGdvdCBvbmUgZ3JvdXAgbGFiZWwgYmVmb3JlIHRoZSBvcHRpb24gYW5kIHdlJ3JlIGF0IHRoZSB0b3Agb3B0aW9uLFxuICAgICAgLy8gc2Nyb2xsIHRoZSBsaXN0IHRvIHRoZSB0b3AuIFRoaXMgaXMgYmV0dGVyIFVYIHRoYW4gc2Nyb2xsaW5nIHRoZSBsaXN0IHRvIHRoZVxuICAgICAgLy8gdG9wIG9mIHRoZSBvcHRpb24sIGJlY2F1c2UgaXQgYWxsb3dzIHRoZSB1c2VyIHRvIHJlYWQgdGhlIHRvcCBncm91cCdzIGxhYmVsLlxuICAgICAgYXV0b2NvbXBsZXRlLl9zZXRTY3JvbGxUb3AoMCk7XG4gICAgfSBlbHNlIGlmIChhdXRvY29tcGxldGUucGFuZWwpIHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IGF1dG9jb21wbGV0ZS5vcHRpb25zLnRvQXJyYXkoKVtpbmRleF07XG5cbiAgICAgIGlmIChvcHRpb24pIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IG9wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKTtcbiAgICAgICAgY29uc3QgbmV3U2Nyb2xsUG9zaXRpb24gPSBfZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgZWxlbWVudC5vZmZzZXRUb3AsXG4gICAgICAgICAgZWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgYXV0b2NvbXBsZXRlLl9nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICBhdXRvY29tcGxldGUucGFuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICk7XG5cbiAgICAgICAgYXV0b2NvbXBsZXRlLl9zZXRTY3JvbGxUb3AobmV3U2Nyb2xsUG9zaXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyBjb21pbmcgZnJvbSB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlT3ZlcmxheUV2ZW50cyhvdmVybGF5UmVmOiBPdmVybGF5UmVmKSB7XG4gICAgLy8gVXNlIHRoZSBga2V5ZG93bkV2ZW50c2AgaW4gb3JkZXIgdG8gdGFrZSBhZHZhbnRhZ2Ugb2ZcbiAgICAvLyB0aGUgb3ZlcmxheSBldmVudCB0YXJnZXRpbmcgcHJvdmlkZWQgYnkgdGhlIENESyBvdmVybGF5LlxuICAgIG92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAvLyBDbG9zZSB3aGVuIHByZXNzaW5nIEVTQ0FQRSBvciBBTFQgKyBVUF9BUlJPVywgYmFzZWQgb24gdGhlIGExMXkgZ3VpZGVsaW5lcy5cbiAgICAgIC8vIFNlZTogaHR0cHM6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLXByYWN0aWNlcy0xLjEvI3RleHRib3gta2V5Ym9hcmQtaW50ZXJhY3Rpb25cbiAgICAgIGlmIChcbiAgICAgICAgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB8fFxuICAgICAgICAoZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cgJiYgaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdhbHRLZXknKSlcbiAgICAgICkge1xuICAgICAgICAvLyBJZiB0aGUgdXNlciBoYWQgdHlwZWQgc29tZXRoaW5nIGluIGJlZm9yZSB3ZSBhdXRvc2VsZWN0ZWQgYW4gb3B0aW9uLCBhbmQgdGhleSBkZWNpZGVkXG4gICAgICAgIC8vIHRvIGNhbmNlbCB0aGUgc2VsZWN0aW9uLCByZXN0b3JlIHRoZSBpbnB1dCB2YWx1ZSB0byB0aGUgb25lIHRoZXkgaGFkIHR5cGVkIGluLlxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ0F1dG9zZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZU5hdGl2ZUlucHV0VmFsdWUodGhpcy5fdmFsdWVCZWZvcmVBdXRvU2VsZWN0aW9uID8/ICcnKTtcbiAgICAgICAgICB0aGlzLl9wZW5kaW5nQXV0b3NlbGVjdGVkT3B0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Nsb3NlS2V5RXZlbnRTdHJlYW0ubmV4dCgpO1xuICAgICAgICB0aGlzLl9yZXNldEFjdGl2ZUl0ZW0oKTtcblxuICAgICAgICAvLyBXZSBuZWVkIHRvIHN0b3AgcHJvcGFnYXRpb24sIG90aGVyd2lzZSB0aGUgZXZlbnQgd2lsbCBldmVudHVhbGx5XG4gICAgICAgIC8vIHJlYWNoIHRoZSBpbnB1dCBpdHNlbGYgYW5kIGNhdXNlIHRoZSBvdmVybGF5IHRvIGJlIHJlb3BlbmVkLlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFN1YnNjcmliZSB0byB0aGUgcG9pbnRlciBldmVudHMgc3RyZWFtIHNvIHRoYXQgaXQgZG9lc24ndCBnZXQgcGlja2VkIHVwIGJ5IG90aGVyIG92ZXJsYXlzLlxuICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB3ZSBzaG91bGQgc3dpdGNoIGBfZ2V0T3V0c2lkZUNsaWNrU3RyZWFtYCBldmVudHVhbGx5IHRvIHVzZSB0aGlzIHN0cmVhbSxcbiAgICAvLyBidXQgdGhlIGJlaHZpb3IgaXNuJ3QgZXhhY3RseSB0aGUgc2FtZSBhbmQgaXQgZW5kcyB1cCBicmVha2luZyBzb21lIGludGVybmFsIHRlc3RzLlxuICAgIG92ZXJsYXlSZWYub3V0c2lkZVBvaW50ZXJFdmVudHMoKS5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBpbnB1dFttYXRBdXRvY29tcGxldGVdLCB0ZXh0YXJlYVttYXRBdXRvY29tcGxldGVdYCxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWF1dG9jb21wbGV0ZS10cmlnZ2VyJyxcbiAgICAnW2F0dHIuYXV0b2NvbXBsZXRlXSc6ICdhdXRvY29tcGxldGVBdHRyaWJ1dGUnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdhdXRvY29tcGxldGVEaXNhYmxlZCA/IG51bGwgOiBcImNvbWJvYm94XCInLFxuICAgICdbYXR0ci5hcmlhLWF1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlRGlzYWJsZWQgPyBudWxsIDogXCJsaXN0XCInLFxuICAgICdbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdJzogJyhwYW5lbE9wZW4gJiYgYWN0aXZlT3B0aW9uKSA/IGFjdGl2ZU9wdGlvbi5pZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdhdXRvY29tcGxldGVEaXNhYmxlZCA/IG51bGwgOiBwYW5lbE9wZW4udG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnKGF1dG9jb21wbGV0ZURpc2FibGVkIHx8ICFwYW5lbE9wZW4pID8gbnVsbCA6IGF1dG9jb21wbGV0ZT8uaWQnLFxuICAgICdbYXR0ci5hcmlhLWhhc3BvcHVwXSc6ICdhdXRvY29tcGxldGVEaXNhYmxlZCA/IG51bGwgOiBcImxpc3Rib3hcIicsXG4gICAgLy8gTm90ZTogd2UgdXNlIGBmb2N1c2luYCwgYXMgb3Bwb3NlZCB0byBgZm9jdXNgLCBpbiBvcmRlciB0byBvcGVuIHRoZSBwYW5lbFxuICAgIC8vIGEgbGl0dGxlIGVhcmxpZXIuIFRoaXMgYXZvaWRzIGlzc3VlcyB3aGVyZSBJRSBkZWxheXMgdGhlIGZvY3VzaW5nIG9mIHRoZSBpbnB1dC5cbiAgICAnKGZvY3VzaW4pJzogJ19oYW5kbGVGb2N1cygpJyxcbiAgICAnKGJsdXIpJzogJ19vblRvdWNoZWQoKScsXG4gICAgJyhpbnB1dCknOiAnX2hhbmRsZUlucHV0KCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnX2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgJyhjbGljayknOiAnX2hhbmRsZUNsaWNrKCknLFxuICB9LFxuICBleHBvcnRBczogJ21hdEF1dG9jb21wbGV0ZVRyaWdnZXInLFxuICBwcm92aWRlcnM6IFtNQVRfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0QXV0b2NvbXBsZXRlVHJpZ2dlciBleHRlbmRzIF9NYXRBdXRvY29tcGxldGVUcmlnZ2VyQmFzZSB7XG4gIHByb3RlY3RlZCBfYWJvdmVDbGFzcyA9ICdtYXQtbWRjLWF1dG9jb21wbGV0ZS1wYW5lbC1hYm92ZSc7XG59XG4iXX0=