/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusKeyManager, FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { A, DOWN_ARROW, ENTER, hasModifierKey, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, Inject, Input, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatLine, mixinDisableRipple, setLines, } from '@angular/material/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatLegacyListAvatarCssMatStyler, MatLegacyListIconCssMatStyler } from './list';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/core";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/a11y";
const _MatSelectionListBase = mixinDisableRipple(class {
});
const _MatListOptionBase = mixinDisableRipple(class {
});
/**
 * @docs-private
 * @deprecated Use `MAT_SELECTION_LIST_VALUE_ACCESSOR` from `@angular/material/list` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const MAT_LEGACY_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatLegacySelectionList),
    multi: true,
};
/**
 * Change event that is being fired whenever the selected state of an option changes.
 * @deprecated Use `MatSelectionListChange` from `@angular/material/list` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacySelectionListChange {
    constructor(
    /** Reference to the selection list that emitted the event. */
    source, 
    /** Reference to the options that have been changed. */
    options) {
        this.source = source;
        this.options = options;
    }
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 * @deprecated Use `MatListOption` from `@angular/material/list` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyListOption extends _MatListOptionBase {
    constructor(_element, _changeDetector, 
    /** @docs-private */
    selectionList) {
        super();
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.selectionList = selectionList;
        this._selected = false;
        this._disabled = false;
        this._hasFocus = false;
        /**
         * Emits when the selected state of the option has changed.
         * Use to facilitate two-data binding to the `selected` property.
         * @docs-private
         */
        this.selectedChange = new EventEmitter();
        /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
        this.checkboxPosition = 'after';
        /**
         * This is set to true after the first OnChanges cycle so we don't clear the value of `selected`
         * in the first cycle.
         */
        this._inputsInitialized = false;
    }
    /** Theme color of the list option. This sets the color of the checkbox. */
    get color() {
        return this._color || this.selectionList.color;
    }
    set color(newValue) {
        this._color = newValue;
    }
    /** Value of the option */
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (this.selected &&
            !this.selectionList.compareWith(newValue, this.value) &&
            this._inputsInitialized) {
            this.selected = false;
        }
        this._value = newValue;
    }
    /** Whether the option is disabled. */
    get disabled() {
        return this._disabled || (this.selectionList && this.selectionList.disabled);
    }
    set disabled(value) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._changeDetector.markForCheck();
        }
    }
    /** Whether the option is selected. */
    get selected() {
        return this.selectionList.selectedOptions.isSelected(this);
    }
    set selected(value) {
        const isSelected = coerceBooleanProperty(value);
        if (isSelected !== this._selected) {
            this._setSelected(isSelected);
            if (isSelected || this.selectionList.multiple) {
                this.selectionList._reportValueChange();
            }
        }
    }
    ngOnInit() {
        const list = this.selectionList;
        if (list._value && list._value.some(value => list.compareWith(this._value, value))) {
            this._setSelected(true);
        }
        const wasSelected = this._selected;
        // List options that are selected at initialization can't be reported properly to the form
        // control. This is because it takes some time until the selection-list knows about all
        // available options. Also it can happen that the ControlValueAccessor has an initial value
        // that should be used instead. Deferring the value change report to the next tick ensures
        // that the form control value is not being overwritten.
        Promise.resolve().then(() => {
            if (this._selected || wasSelected) {
                this.selected = true;
                this._changeDetector.markForCheck();
            }
        });
        this._inputsInitialized = true;
    }
    ngAfterContentInit() {
        setLines(this._lines, this._element);
    }
    ngOnDestroy() {
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(() => {
                this.selected = false;
            });
        }
        const hadFocus = this._hasFocus;
        const newActiveItem = this.selectionList._removeOptionFromList(this);
        // Only move focus if this option was focused at the time it was destroyed.
        if (hadFocus && newActiveItem) {
            newActiveItem.focus();
        }
    }
    /** Toggles the selection state of the option. */
    toggle() {
        this.selected = !this.selected;
    }
    /** Allows for programmatic focusing of the option. */
    focus() {
        this._element.nativeElement.focus();
    }
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    getLabel() {
        return this._text ? this._text.nativeElement.textContent || '' : '';
    }
    /** Whether this list item should show a ripple effect when clicked. */
    _isRippleDisabled() {
        return this.disabled || this.disableRipple || this.selectionList.disableRipple;
    }
    _handleClick() {
        if (!this.disabled && (this.selectionList.multiple || !this.selected)) {
            this.toggle();
            // Emit a change event if the selected state of the option changed through user interaction.
            this.selectionList._emitChangeEvent([this]);
        }
    }
    _handleFocus() {
        this.selectionList._setFocusedOption(this);
        this._hasFocus = true;
    }
    _handleBlur() {
        this.selectionList._onTouched();
        this._hasFocus = false;
    }
    /** Retrieves the DOM element of the component host. */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /** Sets the selected state of the option. Returns whether the value has changed. */
    _setSelected(selected) {
        if (selected === this._selected) {
            return false;
        }
        this._selected = selected;
        if (selected) {
            this.selectionList.selectedOptions.select(this);
        }
        else {
            this.selectionList.selectedOptions.deselect(this);
        }
        this.selectedChange.emit(selected);
        this._changeDetector.markForCheck();
        return true;
    }
    /**
     * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
     * used to trigger an update of the list option if the disabled state of the selection list
     * changed.
     */
    _markForCheck() {
        this._changeDetector.markForCheck();
    }
}
MatLegacyListOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyListOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: forwardRef(() => MatLegacySelectionList) }], target: i0.ɵɵFactoryTarget.Component });
MatLegacyListOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyListOption, selector: "mat-list-option", inputs: { disableRipple: "disableRipple", checkboxPosition: "checkboxPosition", color: "color", value: "value", disabled: "disabled", selected: "selected" }, outputs: { selectedChange: "selectedChange" }, host: { attributes: { "role": "option" }, listeners: { "focus": "_handleFocus()", "blur": "_handleBlur()", "click": "_handleClick()" }, properties: { "class.mat-list-item-disabled": "disabled", "class.mat-list-item-with-avatar": "_avatar || _icon", "class.mat-primary": "color === \"primary\"", "class.mat-accent": "color !== \"primary\" && color !== \"warn\"", "class.mat-warn": "color === \"warn\"", "class.mat-list-single-selected-option": "selected && !selectionList.multiple", "attr.aria-selected": "selected", "attr.aria-disabled": "disabled", "attr.tabindex": "-1" }, classAttribute: "mat-list-item mat-list-option mat-focus-indicator" }, queries: [{ propertyName: "_avatar", first: true, predicate: MatLegacyListAvatarCssMatStyler, descendants: true }, { propertyName: "_icon", first: true, predicate: MatLegacyListIconCssMatStyler, descendants: true }, { propertyName: "_lines", predicate: MatLine, descendants: true }], viewQueries: [{ propertyName: "_text", first: true, predicate: ["text"], descendants: true }], exportAs: ["matListOption"], usesInheritance: true, ngImport: i0, template: "<div class=\"mat-list-item-content\"\n  [class.mat-list-item-content-reverse]=\"checkboxPosition == 'after'\">\n\n  <div mat-ripple\n    class=\"mat-list-item-ripple\"\n    [matRippleTrigger]=\"_getHostElement()\"\n    [matRippleDisabled]=\"_isRippleDisabled()\"></div>\n\n  <mat-pseudo-checkbox\n    *ngIf=\"selectionList.multiple\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\"></mat-pseudo-checkbox>\n\n  <div class=\"mat-list-text\" #text><ng-content></ng-content></div>\n\n  <ng-content select=\"[mat-list-avatar], [mat-list-icon], [matListAvatar], [matListIcon]\">\n  </ng-content>\n\n</div>\n", dependencies: [{ kind: "directive", type: i1.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "component", type: i1.MatPseudoCheckbox, selector: "mat-pseudo-checkbox", inputs: ["state", "disabled"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyListOption, decorators: [{
            type: Component,
            args: [{ selector: 'mat-list-option', exportAs: 'matListOption', inputs: ['disableRipple'], host: {
                        'role': 'option',
                        'class': 'mat-list-item mat-list-option mat-focus-indicator',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()',
                        '(click)': '_handleClick()',
                        '[class.mat-list-item-disabled]': 'disabled',
                        '[class.mat-list-item-with-avatar]': '_avatar || _icon',
                        // Manually set the "primary" or "warn" class if the color has been explicitly
                        // set to "primary" or "warn". The pseudo checkbox picks up these classes for
                        // its theme.
                        '[class.mat-primary]': 'color === "primary"',
                        // Even though accent is the default, we need to set this class anyway, because the  list might
                        // be placed inside a parent that has one of the other colors with a higher specificity.
                        '[class.mat-accent]': 'color !== "primary" && color !== "warn"',
                        '[class.mat-warn]': 'color === "warn"',
                        '[class.mat-list-single-selected-option]': 'selected && !selectionList.multiple',
                        '[attr.aria-selected]': 'selected',
                        '[attr.aria-disabled]': 'disabled',
                        '[attr.tabindex]': '-1',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mat-list-item-content\"\n  [class.mat-list-item-content-reverse]=\"checkboxPosition == 'after'\">\n\n  <div mat-ripple\n    class=\"mat-list-item-ripple\"\n    [matRippleTrigger]=\"_getHostElement()\"\n    [matRippleDisabled]=\"_isRippleDisabled()\"></div>\n\n  <mat-pseudo-checkbox\n    *ngIf=\"selectionList.multiple\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\"></mat-pseudo-checkbox>\n\n  <div class=\"mat-list-text\" #text><ng-content></ng-content></div>\n\n  <ng-content select=\"[mat-list-avatar], [mat-list-icon], [matListAvatar], [matListIcon]\">\n  </ng-content>\n\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: MatLegacySelectionList, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MatLegacySelectionList)]
                }] }]; }, propDecorators: { _avatar: [{
                type: ContentChild,
                args: [MatLegacyListAvatarCssMatStyler]
            }], _icon: [{
                type: ContentChild,
                args: [MatLegacyListIconCssMatStyler]
            }], _lines: [{
                type: ContentChildren,
                args: [MatLine, { descendants: true }]
            }], selectedChange: [{
                type: Output
            }], _text: [{
                type: ViewChild,
                args: ['text']
            }], checkboxPosition: [{
                type: Input
            }], color: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });
/**
 * Material Design list component where each item is a selectable option. Behaves as a listbox.
 * @deprecated Use `MatSelectionList` from `@angular/material/list` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacySelectionList extends _MatSelectionListBase {
    constructor(_element, _changeDetector, _focusMonitor) {
        super();
        this._element = _element;
        this._changeDetector = _changeDetector;
        this._focusMonitor = _focusMonitor;
        this._multiple = true;
        this._contentInitialized = false;
        /** Emits a change event whenever the selected state of an option changes. */
        this.selectionChange = new EventEmitter();
        /** Theme color of the selection list. This sets the checkbox color for all list options. */
        this.color = 'accent';
        /**
         * Function used for comparing an option against the selected value when determining which
         * options should appear as selected. The first argument is the value of an options. The second
         * one is a value from the selected value. A boolean must be returned.
         */
        this.compareWith = (a1, a2) => a1 === a2;
        this._disabled = false;
        /** The currently selected options. */
        this.selectedOptions = new SelectionModel(this._multiple);
        /** The tabindex of the selection list. */
        this._tabIndex = -1;
        /** View to model callback that should be called whenever the selected options change. */
        this._onChange = (_) => { };
        /** Emits when the list has been destroyed. */
        this._destroyed = new Subject();
        /** View to model callback that should be called if the list or its options lost focus. */
        this._onTouched = () => { };
    }
    /** Whether the selection list is disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // The `MatSelectionList` and `MatListOption` are using the `OnPush` change detection
        // strategy. Therefore the options will not check for any changes if the `MatSelectionList`
        // changed its state. Since we know that a change to `disabled` property of the list affects
        // the state of the options, we manually mark each option for check.
        this._markOptionsForCheck();
    }
    /** Whether selection is limited to one or multiple items (default multiple). */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._multiple) {
            if (this._contentInitialized && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw new Error('Cannot change `multiple` mode of mat-selection-list after initialization.');
            }
            this._multiple = newValue;
            this.selectedOptions = new SelectionModel(this._multiple, this.selectedOptions.selected);
        }
    }
    ngAfterContentInit() {
        this._contentInitialized = true;
        this._keyManager = new FocusKeyManager(this.options)
            .withWrap()
            .withTypeAhead()
            .withHomeAndEnd()
            // Allow disabled items to be focusable. For accessibility reasons, there must be a way for
            // screen reader users, that allows reading the different options of the list.
            .skipPredicate(() => false)
            .withAllowedModifierKeys(['shiftKey']);
        if (this._value) {
            this._setOptionsFromValues(this._value);
        }
        // If the user attempts to tab out of the selection list, allow focus to escape.
        this._keyManager.tabOut.subscribe(() => this._allowFocusEscape());
        // When the number of options change, update the tabindex of the selection list.
        this.options.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            this._updateTabIndex();
        });
        // Sync external changes to the model back to the options.
        this.selectedOptions.changed.pipe(takeUntil(this._destroyed)).subscribe(event => {
            if (event.added) {
                for (let item of event.added) {
                    item.selected = true;
                }
            }
            if (event.removed) {
                for (let item of event.removed) {
                    item.selected = false;
                }
            }
        });
        this._focusMonitor
            .monitor(this._element)
            .pipe(takeUntil(this._destroyed))
            .subscribe(origin => {
            if (origin === 'keyboard' || origin === 'program') {
                let toFocus = 0;
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options.get(i)?.selected) {
                        toFocus = i;
                        break;
                    }
                }
                this._keyManager.setActiveItem(toFocus);
            }
        });
    }
    ngOnChanges(changes) {
        const disableRippleChanges = changes['disableRipple'];
        const colorChanges = changes['color'];
        if ((disableRippleChanges && !disableRippleChanges.firstChange) ||
            (colorChanges && !colorChanges.firstChange)) {
            this._markOptionsForCheck();
        }
    }
    ngOnDestroy() {
        this._keyManager?.destroy();
        this._focusMonitor.stopMonitoring(this._element);
        this._destroyed.next();
        this._destroyed.complete();
        this._isDestroyed = true;
    }
    /** Focuses the selection list. */
    focus(options) {
        this._element.nativeElement.focus(options);
    }
    /** Selects all of the options. Returns the options that changed as a result. */
    selectAll() {
        return this._setAllOptionsSelected(true);
    }
    /** Deselects all of the options. Returns the options that changed as a result. */
    deselectAll() {
        return this._setAllOptionsSelected(false);
    }
    /** Sets the focused option of the selection-list. */
    _setFocusedOption(option) {
        this._keyManager.updateActiveItem(option);
    }
    /**
     * Removes an option from the selection list and updates the active item.
     * @returns Currently-active item.
     */
    _removeOptionFromList(option) {
        const optionIndex = this._getOptionIndex(option);
        if (optionIndex > -1 && this._keyManager.activeItemIndex === optionIndex) {
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.updateActiveItem(optionIndex - 1);
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.updateActiveItem(Math.min(optionIndex + 1, this.options.length - 1));
            }
        }
        return this._keyManager.activeItem;
    }
    /** Passes relevant key presses to our key manager. */
    _keydown(event) {
        const keyCode = event.keyCode;
        const manager = this._keyManager;
        const previousFocusIndex = manager.activeItemIndex;
        const hasModifier = hasModifierKey(event);
        switch (keyCode) {
            case SPACE:
            case ENTER:
                if (!hasModifier && !manager.isTyping()) {
                    this._toggleFocusedOption();
                    // Always prevent space from scrolling the page since the list has focus
                    event.preventDefault();
                }
                break;
            default:
                // The "A" key gets special treatment, because it's used for the "select all" functionality.
                if (keyCode === A &&
                    this.multiple &&
                    hasModifierKey(event, 'ctrlKey') &&
                    !manager.isTyping()) {
                    const shouldSelect = this.options.some(option => !option.disabled && !option.selected);
                    this._setAllOptionsSelected(shouldSelect, true, true);
                    event.preventDefault();
                }
                else {
                    manager.onKeydown(event);
                }
        }
        if (this.multiple &&
            (keyCode === UP_ARROW || keyCode === DOWN_ARROW) &&
            event.shiftKey &&
            manager.activeItemIndex !== previousFocusIndex) {
            this._toggleFocusedOption();
        }
    }
    /** Reports a value change to the ControlValueAccessor */
    _reportValueChange() {
        // Stop reporting value changes after the list has been destroyed. This avoids
        // cases where the list might wrongly reset its value once it is removed, but
        // the form control is still live.
        if (this.options && !this._isDestroyed) {
            const value = this._getSelectedOptionValues();
            this._onChange(value);
            this._value = value;
        }
    }
    /** Emits a change event if the selected state of an option changed. */
    _emitChangeEvent(options) {
        this.selectionChange.emit(new MatLegacySelectionListChange(this, options));
    }
    /** Implemented as part of ControlValueAccessor. */
    writeValue(values) {
        this._value = values;
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
    }
    /** Implemented as a part of ControlValueAccessor. */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /** Sets the selected options based on the specified values. */
    _setOptionsFromValues(values) {
        this.options.forEach(option => option._setSelected(false));
        values.forEach(value => {
            const correspondingOption = this.options.find(option => {
                // Skip options that are already in the model. This allows us to handle cases
                // where the same primitive value is selected multiple times.
                return option.selected ? false : this.compareWith(option.value, value);
            });
            if (correspondingOption) {
                correspondingOption._setSelected(true);
            }
        });
    }
    /** Returns the values of the selected options. */
    _getSelectedOptionValues() {
        return this.options.filter(option => option.selected).map(option => option.value);
    }
    /** Toggles the state of the currently focused option if enabled. */
    _toggleFocusedOption() {
        let focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            let focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && !focusedOption.disabled && (this._multiple || !focusedOption.selected)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user
                // interaction.
                this._emitChangeEvent([focusedOption]);
            }
        }
    }
    /**
     * Sets the selected state on all of the options
     * and emits an event if anything changed.
     */
    _setAllOptionsSelected(isSelected, skipDisabled, isUserInput) {
        // Keep track of whether anything changed, because we only want to
        // emit the changed event when something actually changed.
        const changedOptions = [];
        this.options.forEach(option => {
            if ((!skipDisabled || !option.disabled) && option._setSelected(isSelected)) {
                changedOptions.push(option);
            }
        });
        if (changedOptions.length) {
            this._reportValueChange();
            if (isUserInput) {
                this._emitChangeEvent(changedOptions);
            }
        }
        return changedOptions;
    }
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this.options.length;
    }
    /** Returns the index of the specified list option. */
    _getOptionIndex(option) {
        return this.options.toArray().indexOf(option);
    }
    /** Marks all the options to be checked in the next change detection run. */
    _markOptionsForCheck() {
        if (this.options) {
            this.options.forEach(option => option._markForCheck());
        }
    }
    /**
     * Removes the tabindex from the selection list and resets it back afterwards, allowing the user
     * to tab out of it. This prevents the list from capturing focus and redirecting it back within
     * the list, creating a focus trap if it user tries to tab away.
     */
    _allowFocusEscape() {
        this._tabIndex = -1;
        setTimeout(() => {
            this._tabIndex = 0;
            this._changeDetector.markForCheck();
        });
    }
    /** Updates the tabindex based upon if the selection list is empty. */
    _updateTabIndex() {
        this._tabIndex = this.options.length === 0 ? -1 : 0;
    }
}
MatLegacySelectionList.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelectionList, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i3.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
MatLegacySelectionList.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacySelectionList, selector: "mat-selection-list", inputs: { disableRipple: "disableRipple", color: "color", compareWith: "compareWith", disabled: "disabled", multiple: "multiple" }, outputs: { selectionChange: "selectionChange" }, host: { attributes: { "role": "listbox" }, listeners: { "keydown": "_keydown($event)" }, properties: { "attr.aria-multiselectable": "multiple", "attr.aria-disabled": "disabled.toString()", "attr.tabindex": "_tabIndex" }, classAttribute: "mat-selection-list mat-list-base" }, providers: [MAT_LEGACY_SELECTION_LIST_VALUE_ACCESSOR], queries: [{ propertyName: "options", predicate: MatLegacyListOption, descendants: true }], exportAs: ["matSelectionList"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mat-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.mat-list-base .mat-subheader{margin:0}button.mat-list-item,button.mat-list-option{padding:0;width:100%;background:none;color:inherit;border:none;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] button.mat-list-item,[dir=rtl] button.mat-list-option{text-align:right}button.mat-list-item::-moz-focus-inner,button.mat-list-option::-moz-focus-inner{border:0}.mat-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-list-base .mat-subheader{height:48px;line-height:16px}.mat-list-base .mat-subheader:first-child{margin-top:-8px}.mat-list-base .mat-list-item,.mat-list-base .mat-list-option{display:block;height:48px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.mat-list-base .mat-list-item .mat-list-item-content,.mat-list-base .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base .mat-list-item .mat-list-item-content-reverse,.mat-list-base .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base .mat-list-item .mat-list-item-ripple,.mat-list-base .mat-list-option .mat-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar,.mat-list-base .mat-list-option.mat-list-item-with-avatar{height:56px}.mat-list-base .mat-list-item.mat-2-line,.mat-list-base .mat-list-option.mat-2-line{height:72px}.mat-list-base .mat-list-item.mat-3-line,.mat-list-base .mat-list-option.mat-3-line{height:88px}.mat-list-base .mat-list-item.mat-multi-line,.mat-list-base .mat-list-option.mat-multi-line{height:auto}.mat-list-base .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base .mat-list-item .mat-list-text,.mat-list-base .mat-list-option .mat-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base .mat-list-item .mat-list-text>*,.mat-list-base .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-list-base .mat-list-item .mat-list-text:empty,.mat-list-base .mat-list-option .mat-list-text:empty{display:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base .mat-list-item .mat-list-avatar,.mat-list-base .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:72px}.mat-list-base .mat-list-item .mat-list-icon,.mat-list-base .mat-list-option .mat-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:64px}.mat-list-base .mat-list-item .mat-divider,.mat-list-base .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base .mat-list-item .mat-divider,[dir=rtl] .mat-list-base .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-list-base[dense]{padding-top:4px;display:block}.mat-list-base[dense] .mat-subheader{height:40px;line-height:8px}.mat-list-base[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list-base[dense] .mat-list-item,.mat-list-base[dense] .mat-list-option{display:block;height:40px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-item-content,.mat-list-base[dense] .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base[dense] .mat-list-item .mat-list-item-content-reverse,.mat-list-base[dense] .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base[dense] .mat-list-item .mat-list-item-ripple,.mat-list-base[dense] .mat-list-option .mat-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar{height:48px}.mat-list-base[dense] .mat-list-item.mat-2-line,.mat-list-base[dense] .mat-list-option.mat-2-line{height:60px}.mat-list-base[dense] .mat-list-item.mat-3-line,.mat-list-base[dense] .mat-list-option.mat-3-line{height:76px}.mat-list-base[dense] .mat-list-item.mat-multi-line,.mat-list-base[dense] .mat-list-option.mat-multi-line{height:auto}.mat-list-base[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base[dense] .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base[dense] .mat-list-item .mat-list-text,.mat-list-base[dense] .mat-list-option .mat-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-text>*,.mat-list-base[dense] .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-list-base[dense] .mat-list-item .mat-list-text:empty,.mat-list-base[dense] .mat-list-option .mat-list-text:empty{display:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base[dense] .mat-list-item .mat-list-avatar,.mat-list-base[dense] .mat-list-option .mat-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:68px}.mat-list-base[dense] .mat-list-item .mat-list-icon,.mat-list-base[dense] .mat-list-option .mat-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:60px}.mat-list-base[dense] .mat-list-item .mat-divider,.mat-list-base[dense] .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-divider,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base[dense] .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item{cursor:pointer;outline:none}mat-action-list .mat-list-item{cursor:pointer;outline:inherit}.mat-list-option:not(.mat-list-item-disabled){cursor:pointer;outline:none}.mat-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .mat-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .mat-list-item-disabled{opacity:.5}.cdk-high-contrast-active .mat-list-option:hover,.cdk-high-contrast-active .mat-nav-list .mat-list-item:hover,.cdk-high-contrast-active mat-action-list .mat-list-item:hover{outline:dotted 1px;z-index:1}.cdk-high-contrast-active .mat-list-single-selected-option::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .mat-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.mat-list-option:not(.mat-list-single-selected-option):not(.mat-list-item-disabled):hover,.mat-nav-list .mat-list-item:not(.mat-list-item-disabled):hover,.mat-action-list .mat-list-item:not(.mat-list-item-disabled):hover{background:none}}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelectionList, decorators: [{
            type: Component,
            args: [{ selector: 'mat-selection-list', exportAs: 'matSelectionList', inputs: ['disableRipple'], host: {
                        'role': 'listbox',
                        'class': 'mat-selection-list mat-list-base',
                        '(keydown)': '_keydown($event)',
                        '[attr.aria-multiselectable]': 'multiple',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.tabindex]': '_tabIndex',
                    }, template: '<ng-content></ng-content>', encapsulation: ViewEncapsulation.None, providers: [MAT_LEGACY_SELECTION_LIST_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mat-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.mat-list-base .mat-subheader{margin:0}button.mat-list-item,button.mat-list-option{padding:0;width:100%;background:none;color:inherit;border:none;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] button.mat-list-item,[dir=rtl] button.mat-list-option{text-align:right}button.mat-list-item::-moz-focus-inner,button.mat-list-option::-moz-focus-inner{border:0}.mat-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-list-base .mat-subheader{height:48px;line-height:16px}.mat-list-base .mat-subheader:first-child{margin-top:-8px}.mat-list-base .mat-list-item,.mat-list-base .mat-list-option{display:block;height:48px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.mat-list-base .mat-list-item .mat-list-item-content,.mat-list-base .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base .mat-list-item .mat-list-item-content-reverse,.mat-list-base .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base .mat-list-item .mat-list-item-ripple,.mat-list-base .mat-list-option .mat-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar,.mat-list-base .mat-list-option.mat-list-item-with-avatar{height:56px}.mat-list-base .mat-list-item.mat-2-line,.mat-list-base .mat-list-option.mat-2-line{height:72px}.mat-list-base .mat-list-item.mat-3-line,.mat-list-base .mat-list-option.mat-3-line{height:88px}.mat-list-base .mat-list-item.mat-multi-line,.mat-list-base .mat-list-option.mat-multi-line{height:auto}.mat-list-base .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base .mat-list-item .mat-list-text,.mat-list-base .mat-list-option .mat-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base .mat-list-item .mat-list-text>*,.mat-list-base .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-list-base .mat-list-item .mat-list-text:empty,.mat-list-base .mat-list-option .mat-list-text:empty{display:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base .mat-list-item .mat-list-avatar,.mat-list-base .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:72px}.mat-list-base .mat-list-item .mat-list-icon,.mat-list-base .mat-list-option .mat-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:64px}.mat-list-base .mat-list-item .mat-divider,.mat-list-base .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base .mat-list-item .mat-divider,[dir=rtl] .mat-list-base .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-list-base[dense]{padding-top:4px;display:block}.mat-list-base[dense] .mat-subheader{height:40px;line-height:8px}.mat-list-base[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list-base[dense] .mat-list-item,.mat-list-base[dense] .mat-list-option{display:block;height:40px;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-item-content,.mat-list-base[dense] .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base[dense] .mat-list-item .mat-list-item-content-reverse,.mat-list-base[dense] .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base[dense] .mat-list-item .mat-list-item-ripple,.mat-list-base[dense] .mat-list-option .mat-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar{height:48px}.mat-list-base[dense] .mat-list-item.mat-2-line,.mat-list-base[dense] .mat-list-option.mat-2-line{height:60px}.mat-list-base[dense] .mat-list-item.mat-3-line,.mat-list-base[dense] .mat-list-option.mat-3-line{height:76px}.mat-list-base[dense] .mat-list-item.mat-multi-line,.mat-list-base[dense] .mat-list-option.mat-multi-line{height:auto}.mat-list-base[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base[dense] .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base[dense] .mat-list-item .mat-list-text,.mat-list-base[dense] .mat-list-option .mat-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-text>*,.mat-list-base[dense] .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-list-base[dense] .mat-list-item .mat-list-text:empty,.mat-list-base[dense] .mat-list-option .mat-list-text:empty{display:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base[dense] .mat-list-item .mat-list-avatar,.mat-list-base[dense] .mat-list-option .mat-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:68px}.mat-list-base[dense] .mat-list-item .mat-list-icon,.mat-list-base[dense] .mat-list-option .mat-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:60px}.mat-list-base[dense] .mat-list-item .mat-divider,.mat-list-base[dense] .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-divider,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base[dense] .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item{cursor:pointer;outline:none}mat-action-list .mat-list-item{cursor:pointer;outline:inherit}.mat-list-option:not(.mat-list-item-disabled){cursor:pointer;outline:none}.mat-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .mat-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .mat-list-item-disabled{opacity:.5}.cdk-high-contrast-active .mat-list-option:hover,.cdk-high-contrast-active .mat-nav-list .mat-list-item:hover,.cdk-high-contrast-active mat-action-list .mat-list-item:hover{outline:dotted 1px;z-index:1}.cdk-high-contrast-active .mat-list-single-selected-option::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .mat-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.mat-list-option:not(.mat-list-single-selected-option):not(.mat-list-item-disabled):hover,.mat-nav-list .mat-list-item:not(.mat-list-item-disabled):hover,.mat-action-list .mat-list-item:not(.mat-list-item-disabled):hover{background:none}}"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i3.FocusMonitor }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [MatLegacyListOption, { descendants: true }]
            }], selectionChange: [{
                type: Output
            }], color: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], disabled: [{
                type: Input
            }], multiple: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LWxpc3Qvc2VsZWN0aW9uLWxpc3QudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LWxpc3QvbGlzdC1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWtCLGVBQWUsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRixPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUYsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEVBQ04sU0FBUyxFQUVULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFFTCxPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLFFBQVEsR0FFVCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsK0JBQStCLEVBQUUsNkJBQTZCLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7O0FBRXRGLE1BQU0scUJBQXFCLEdBQUcsa0JBQWtCLENBQUM7Q0FBUSxDQUFDLENBQUM7QUFDM0QsTUFBTSxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztDQUFRLENBQUMsQ0FBQztBQUV4RDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sd0NBQXdDLEdBQVE7SUFDM0QsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDO0lBQ0UsOERBQThEO0lBQ3ZELE1BQThCO0lBQ3JDLHVEQUF1RDtJQUNoRCxPQUE4QjtRQUY5QixXQUFNLEdBQU4sTUFBTSxDQUF3QjtRQUU5QixZQUFPLEdBQVAsT0FBTyxDQUF1QjtJQUNwQyxDQUFDO0NBQ0w7QUFVRDs7Ozs7O0dBTUc7QUE4QkgsTUFBTSxPQUFPLG1CQUNYLFNBQVEsa0JBQWtCO0lBeUYxQixZQUNVLFFBQWlDLEVBQ2pDLGVBQWtDO0lBQzFDLG9CQUFvQjtJQUNxQyxhQUFxQztRQUU5RixLQUFLLEVBQUUsQ0FBQztRQUxBLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjtRQUVlLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtRQTFGeEYsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFNMUI7Ozs7V0FJRztRQUVNLG1CQUFjLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFLN0Usd0ZBQXdGO1FBQy9FLHFCQUFnQixHQUF3QyxPQUFPLENBQUM7UUFZekU7OztXQUdHO1FBQ0ssdUJBQWtCLEdBQUcsS0FBSyxDQUFDO0lBeURuQyxDQUFDO0lBdkVELDJFQUEyRTtJQUMzRSxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDakQsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLFFBQXNCO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFRRCwwQkFBMEI7SUFDMUIsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFhO1FBQ3JCLElBQ0UsSUFBSSxDQUFDLFFBQVE7WUFDYixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3JELElBQUksQ0FBQyxrQkFBa0IsRUFDdkI7WUFDQSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFHRCxzQ0FBc0M7SUFDdEMsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFtQjtRQUM5QixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5QyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsc0NBQXNDO0lBQ3RDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFtQjtRQUM5QixNQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoRCxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUIsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUN6QztTQUNGO0lBQ0gsQ0FBQztJQVdELFFBQVE7UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBRWhDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2xGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRW5DLDBGQUEwRjtRQUMxRix1RkFBdUY7UUFDdkYsMkZBQTJGO1FBQzNGLDBGQUEwRjtRQUMxRix3REFBd0Q7UUFDeEQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFdBQVcsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDakMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIscURBQXFEO1lBQ3JELHlDQUF5QztZQUN6QyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRSwyRUFBMkU7UUFDM0UsSUFBSSxRQUFRLElBQUksYUFBYSxFQUFFO1lBQzdCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxpREFBaUQ7SUFDakQsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUNqRixDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDckUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRWQsNEZBQTRGO1lBQzVGLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsdURBQXVEO0lBQ3ZELGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxvRkFBb0Y7SUFDcEYsWUFBWSxDQUFDLFFBQWlCO1FBQzVCLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBRTFCLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxhQUFhO1FBQ1gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QyxDQUFDOztxSEF6TlUsbUJBQW1CLDZFQThGcEIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO3lHQTlGdkMsbUJBQW1CLCs2QkFRaEIsK0JBQStCLHdFQUMvQiw2QkFBNkIsNERBQzFCLE9BQU8sbU1DL0gxQiw0bkJBbUJBO2dHRGtHYSxtQkFBbUI7a0JBN0IvQixTQUFTOytCQUNFLGlCQUFpQixZQUNqQixlQUFlLFVBQ2pCLENBQUMsZUFBZSxDQUFDLFFBQ25CO3dCQUNKLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixPQUFPLEVBQUUsbURBQW1EO3dCQUM1RCxTQUFTLEVBQUUsZ0JBQWdCO3dCQUMzQixRQUFRLEVBQUUsZUFBZTt3QkFDekIsU0FBUyxFQUFFLGdCQUFnQjt3QkFDM0IsZ0NBQWdDLEVBQUUsVUFBVTt3QkFDNUMsbUNBQW1DLEVBQUUsa0JBQWtCO3dCQUN2RCw4RUFBOEU7d0JBQzlFLDZFQUE2RTt3QkFDN0UsYUFBYTt3QkFDYixxQkFBcUIsRUFBRSxxQkFBcUI7d0JBQzVDLCtGQUErRjt3QkFDL0Ysd0ZBQXdGO3dCQUN4RixvQkFBb0IsRUFBRSx5Q0FBeUM7d0JBQy9ELGtCQUFrQixFQUFFLGtCQUFrQjt3QkFDdEMseUNBQXlDLEVBQUUscUNBQXFDO3dCQUNoRixzQkFBc0IsRUFBRSxVQUFVO3dCQUNsQyxzQkFBc0IsRUFBRSxVQUFVO3dCQUNsQyxpQkFBaUIsRUFBRSxJQUFJO3FCQUN4QixpQkFFYyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzswQkFnRzVDLE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDOzRDQXRGSCxPQUFPO3NCQUFyRCxZQUFZO3VCQUFDLCtCQUErQjtnQkFDQSxLQUFLO3NCQUFqRCxZQUFZO3VCQUFDLDZCQUE2QjtnQkFDSSxNQUFNO3NCQUFwRCxlQUFlO3VCQUFDLE9BQU8sRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7Z0JBUXBDLGNBQWM7c0JBRHRCLE1BQU07Z0JBSVksS0FBSztzQkFBdkIsU0FBUzt1QkFBQyxNQUFNO2dCQUdSLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFJRixLQUFLO3NCQURSLEtBQUs7Z0JBZ0JGLEtBQUs7c0JBRFIsS0FBSztnQkFtQkYsUUFBUTtzQkFEWCxLQUFLO2dCQWVGLFFBQVE7c0JBRFgsS0FBSzs7QUFrSlI7Ozs7R0FJRztBQW1CSCxNQUFNLE9BQU8sc0JBQ1gsU0FBUSxxQkFBcUI7SUFvRjdCLFlBQ1UsUUFBaUMsRUFDakMsZUFBa0MsRUFDbEMsYUFBMkI7UUFFbkMsS0FBSyxFQUFFLENBQUM7UUFKQSxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFwRjdCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBU3BDLDZFQUE2RTtRQUMxRCxvQkFBZSxHQUNoQyxJQUFJLFlBQVksRUFBZ0MsQ0FBQztRQUVuRCw0RkFBNEY7UUFDbkYsVUFBSyxHQUFpQixRQUFRLENBQUM7UUFFeEM7Ozs7V0FJRztRQUNNLGdCQUFXLEdBQWtDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQWdCcEUsY0FBUyxHQUFZLEtBQUssQ0FBQztRQXNCbkMsc0NBQXNDO1FBQ3RDLG9CQUFlLEdBQUcsSUFBSSxjQUFjLENBQXNCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUxRSwwQ0FBMEM7UUFDMUMsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWYseUZBQXlGO1FBQ2pGLGNBQVMsR0FBeUIsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUt6RCw4Q0FBOEM7UUFDN0IsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFbEQsMEZBQTBGO1FBQzFGLGVBQVUsR0FBZSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFXbEMsQ0FBQztJQS9ERCw4Q0FBOEM7SUFDOUMsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFtQjtRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlDLHFGQUFxRjtRQUNyRiwyRkFBMkY7UUFDM0YsNEZBQTRGO1FBQzVGLG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBR0QsZ0ZBQWdGO0lBQ2hGLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBbUI7UUFDOUIsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMvQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsRUFBRTtnQkFDL0UsTUFBTSxJQUFJLEtBQUssQ0FDYiwyRUFBMkUsQ0FDNUUsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUY7SUFDSCxDQUFDO0lBK0JELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBRWhDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQXNCLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDdEUsUUFBUSxFQUFFO2FBQ1YsYUFBYSxFQUFFO2FBQ2YsY0FBYyxFQUFFO1lBQ2pCLDJGQUEyRjtZQUMzRiw4RUFBOEU7YUFDN0UsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQzthQUMxQix1QkFBdUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFFekMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QztRQUVELGdGQUFnRjtRQUNoRixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUVsRSxnRkFBZ0Y7UUFDaEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNwRixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCwwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUUsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNmLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQ3RCO2FBQ0Y7WUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtvQkFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7aUJBQ3ZCO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhO2FBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLElBQUksTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUNqRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUU7d0JBQ2pDLE9BQU8sR0FBRyxDQUFDLENBQUM7d0JBQ1osTUFBTTtxQkFDUDtpQkFDRjtnQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN6QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdEMsSUFDRSxDQUFDLG9CQUFvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDO1lBQzNELENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUMzQztZQUNBLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELGtDQUFrQztJQUNsQyxLQUFLLENBQUMsT0FBc0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxnRkFBZ0Y7SUFDaEYsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxrRkFBa0Y7SUFDbEYsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxxREFBcUQ7SUFDckQsaUJBQWlCLENBQUMsTUFBMkI7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUJBQXFCLENBQUMsTUFBMkI7UUFDL0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsS0FBSyxXQUFXLEVBQUU7WUFDeEUsNENBQTRDO1lBQzVDLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7aUJBQU0sSUFBSSxXQUFXLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2RjtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsc0RBQXNEO0lBQ3RELFFBQVEsQ0FBQyxLQUFvQjtRQUMzQixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDakMsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQ25ELE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQyxRQUFRLE9BQU8sRUFBRTtZQUNmLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNSLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO29CQUM1Qix3RUFBd0U7b0JBQ3hFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDeEI7Z0JBQ0QsTUFBTTtZQUNSO2dCQUNFLDRGQUE0RjtnQkFDNUYsSUFDRSxPQUFPLEtBQUssQ0FBQztvQkFDYixJQUFJLENBQUMsUUFBUTtvQkFDYixjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQztvQkFDaEMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQ25CO29CQUNBLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN2RixJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUN4QjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjtTQUNKO1FBRUQsSUFDRSxJQUFJLENBQUMsUUFBUTtZQUNiLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssVUFBVSxDQUFDO1lBQ2hELEtBQUssQ0FBQyxRQUFRO1lBQ2QsT0FBTyxDQUFDLGVBQWUsS0FBSyxrQkFBa0IsRUFDOUM7WUFDQSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRCx5REFBeUQ7SUFDekQsa0JBQWtCO1FBQ2hCLDhFQUE4RTtRQUM5RSw2RUFBNkU7UUFDN0Usa0NBQWtDO1FBQ2xDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsZ0JBQWdCLENBQUMsT0FBOEI7UUFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsbURBQW1EO0lBQ25ELFVBQVUsQ0FBQyxNQUFnQjtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRCxxREFBcUQ7SUFDckQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDN0IsQ0FBQztJQUVELG1EQUFtRDtJQUNuRCxnQkFBZ0IsQ0FBQyxFQUF3QjtRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsbURBQW1EO0lBQ25ELGlCQUFpQixDQUFDLEVBQWM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELCtEQUErRDtJQUN2RCxxQkFBcUIsQ0FBQyxNQUFnQjtRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUUzRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3JELDZFQUE2RTtnQkFDN0UsNkRBQTZEO2dCQUM3RCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxtQkFBbUIsRUFBRTtnQkFDdkIsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0RBQWtEO0lBQzFDLHdCQUF3QjtRQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsb0VBQW9FO0lBQzVELG9CQUFvQjtRQUMxQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztRQUVwRCxJQUFJLFlBQVksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1RCxJQUFJLGFBQWEsR0FBd0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUU5RSxJQUFJLGFBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMzRixhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBRXZCLGdGQUFnRjtnQkFDaEYsZUFBZTtnQkFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQ3hDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssc0JBQXNCLENBQzVCLFVBQW1CLEVBQ25CLFlBQXNCLEVBQ3RCLFdBQXFCO1FBRXJCLGtFQUFrRTtRQUNsRSwwREFBMEQ7UUFDMUQsTUFBTSxjQUFjLEdBQTBCLEVBQUUsQ0FBQztRQUVqRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDMUUsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBRTFCLElBQUksV0FBVyxFQUFFO2dCQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN2QztTQUNGO1FBRUQsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxhQUFhLENBQUMsS0FBYTtRQUNqQyxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ25ELENBQUM7SUFFRCxzREFBc0Q7SUFDOUMsZUFBZSxDQUFDLE1BQTJCO1FBQ2pELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELDRFQUE0RTtJQUNwRSxvQkFBb0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXBCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNFQUFzRTtJQUM5RCxlQUFlO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7O3dIQTlZVSxzQkFBc0I7NEdBQXRCLHNCQUFzQixxZkFIdEIsQ0FBQyx3Q0FBd0MsQ0FBQyxrREFjcEMsbUJBQW1CLDRIQWpCMUIsMkJBQTJCO2dHQU0xQixzQkFBc0I7a0JBbEJsQyxTQUFTOytCQUNFLG9CQUFvQixZQUNwQixrQkFBa0IsVUFDcEIsQ0FBQyxlQUFlLENBQUMsUUFDbkI7d0JBQ0osTUFBTSxFQUFFLFNBQVM7d0JBQ2pCLE9BQU8sRUFBRSxrQ0FBa0M7d0JBQzNDLFdBQVcsRUFBRSxrQkFBa0I7d0JBQy9CLDZCQUE2QixFQUFFLFVBQVU7d0JBQ3pDLHNCQUFzQixFQUFFLHFCQUFxQjt3QkFDN0MsaUJBQWlCLEVBQUUsV0FBVztxQkFDL0IsWUFDUywyQkFBMkIsaUJBRXRCLGlCQUFpQixDQUFDLElBQUksYUFDMUIsQ0FBQyx3Q0FBd0MsQ0FBQyxtQkFDcEMsdUJBQXVCLENBQUMsTUFBTTs0SkFjL0MsT0FBTztzQkFETixlQUFlO3VCQUFDLG1CQUFtQixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQztnQkFJdEMsZUFBZTtzQkFBakMsTUFBTTtnQkFJRSxLQUFLO3NCQUFiLEtBQUs7Z0JBT0csV0FBVztzQkFBbkIsS0FBSztnQkFJRixRQUFRO3NCQURYLEtBQUs7Z0JBaUJGLFFBQVE7c0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0ZvY3VzYWJsZU9wdGlvbiwgRm9jdXNLZXlNYW5hZ2VyLCBGb2N1c01vbml0b3J9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1NlbGVjdGlvbk1vZGVsfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtBLCBET1dOX0FSUk9XLCBFTlRFUiwgaGFzTW9kaWZpZXJLZXksIFNQQUNFLCBVUF9BUlJPV30gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgTWF0TGluZSxcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxuICBzZXRMaW5lcyxcbiAgVGhlbWVQYWxldHRlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aCwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdExlZ2FjeUxpc3RBdmF0YXJDc3NNYXRTdHlsZXIsIE1hdExlZ2FjeUxpc3RJY29uQ3NzTWF0U3R5bGVyfSBmcm9tICcuL2xpc3QnO1xuXG5jb25zdCBfTWF0U2VsZWN0aW9uTGlzdEJhc2UgPSBtaXhpbkRpc2FibGVSaXBwbGUoY2xhc3Mge30pO1xuY29uc3QgX01hdExpc3RPcHRpb25CYXNlID0gbWl4aW5EaXNhYmxlUmlwcGxlKGNsYXNzIHt9KTtcblxuLyoqXG4gKiBAZG9jcy1wcml2YXRlXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1BVF9TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY29uc3QgTUFUX0xFR0FDWV9TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0TGVnYWN5U2VsZWN0aW9uTGlzdCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuLyoqXG4gKiBDaGFuZ2UgZXZlbnQgdGhhdCBpcyBiZWluZyBmaXJlZCB3aGVuZXZlciB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgYW4gb3B0aW9uIGNoYW5nZXMuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFNlbGVjdGlvbkxpc3RDaGFuZ2VgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2xpc3RgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVNlbGVjdGlvbkxpc3RDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBzZWxlY3Rpb24gbGlzdCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyBzb3VyY2U6IE1hdExlZ2FjeVNlbGVjdGlvbkxpc3QsXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyB0aGF0IGhhdmUgYmVlbiBjaGFuZ2VkLiAqL1xuICAgIHB1YmxpYyBvcHRpb25zOiBNYXRMZWdhY3lMaXN0T3B0aW9uW10sXG4gICkge31cbn1cblxuLyoqXG4gKiBUeXBlIGRlc2NyaWJpbmcgcG9zc2libGUgcG9zaXRpb25zIG9mIGEgY2hlY2tib3ggaW4gYSBsaXN0IG9wdGlvblxuICogd2l0aCByZXNwZWN0IHRvIHRoZSBsaXN0IGl0ZW0ncyB0ZXh0LlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRMaXN0T3B0aW9uQ2hlY2tib3hQb3NpdGlvbmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgdHlwZSBNYXRMZWdhY3lMaXN0T3B0aW9uQ2hlY2tib3hQb3NpdGlvbiA9ICdiZWZvcmUnIHwgJ2FmdGVyJztcblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIGxpc3Qtb3B0aW9ucyBvZiBzZWxlY3Rpb24tbGlzdC4gRWFjaCBsaXN0LW9wdGlvbiBjYW4gYXV0b21hdGljYWxseVxuICogZ2VuZXJhdGUgYSBjaGVja2JveCBhbmQgY2FuIHB1dCBjdXJyZW50IGl0ZW0gaW50byB0aGUgc2VsZWN0aW9uTW9kZWwgb2Ygc2VsZWN0aW9uLWxpc3RcbiAqIGlmIHRoZSBjdXJyZW50IGl0ZW0gaXMgc2VsZWN0ZWQuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdExpc3RPcHRpb25gIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2xpc3RgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWxpc3Qtb3B0aW9uJyxcbiAgZXhwb3J0QXM6ICdtYXRMaXN0T3B0aW9uJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVSaXBwbGUnXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ29wdGlvbicsXG4gICAgJ2NsYXNzJzogJ21hdC1saXN0LWl0ZW0gbWF0LWxpc3Qtb3B0aW9uIG1hdC1mb2N1cy1pbmRpY2F0b3InLFxuICAgICcoZm9jdXMpJzogJ19oYW5kbGVGb2N1cygpJyxcbiAgICAnKGJsdXIpJzogJ19oYW5kbGVCbHVyKCknLFxuICAgICcoY2xpY2spJzogJ19oYW5kbGVDbGljaygpJyxcbiAgICAnW2NsYXNzLm1hdC1saXN0LWl0ZW0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1saXN0LWl0ZW0td2l0aC1hdmF0YXJdJzogJ19hdmF0YXIgfHwgX2ljb24nLFxuICAgIC8vIE1hbnVhbGx5IHNldCB0aGUgXCJwcmltYXJ5XCIgb3IgXCJ3YXJuXCIgY2xhc3MgaWYgdGhlIGNvbG9yIGhhcyBiZWVuIGV4cGxpY2l0bHlcbiAgICAvLyBzZXQgdG8gXCJwcmltYXJ5XCIgb3IgXCJ3YXJuXCIuIFRoZSBwc2V1ZG8gY2hlY2tib3ggcGlja3MgdXAgdGhlc2UgY2xhc3NlcyBmb3JcbiAgICAvLyBpdHMgdGhlbWUuXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgPT09IFwicHJpbWFyeVwiJyxcbiAgICAvLyBFdmVuIHRob3VnaCBhY2NlbnQgaXMgdGhlIGRlZmF1bHQsIHdlIG5lZWQgdG8gc2V0IHRoaXMgY2xhc3MgYW55d2F5LCBiZWNhdXNlIHRoZSAgbGlzdCBtaWdodFxuICAgIC8vIGJlIHBsYWNlZCBpbnNpZGUgYSBwYXJlbnQgdGhhdCBoYXMgb25lIG9mIHRoZSBvdGhlciBjb2xvcnMgd2l0aCBhIGhpZ2hlciBzcGVjaWZpY2l0eS5cbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yICE9PSBcInByaW1hcnlcIiAmJiBjb2xvciAhPT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2NvbG9yID09PSBcIndhcm5cIicsXG4gICAgJ1tjbGFzcy5tYXQtbGlzdC1zaW5nbGUtc2VsZWN0ZWQtb3B0aW9uXSc6ICdzZWxlY3RlZCAmJiAhc2VsZWN0aW9uTGlzdC5tdWx0aXBsZScsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnLTEnLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogJ2xpc3Qtb3B0aW9uLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5TGlzdE9wdGlvblxuICBleHRlbmRzIF9NYXRMaXN0T3B0aW9uQmFzZVxuICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgT25Jbml0LCBGb2N1c2FibGVPcHRpb24sIENhbkRpc2FibGVSaXBwbGVcbntcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFzRm9jdXMgPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkKE1hdExlZ2FjeUxpc3RBdmF0YXJDc3NNYXRTdHlsZXIpIF9hdmF0YXI6IE1hdExlZ2FjeUxpc3RBdmF0YXJDc3NNYXRTdHlsZXI7XG4gIEBDb250ZW50Q2hpbGQoTWF0TGVnYWN5TGlzdEljb25Dc3NNYXRTdHlsZXIpIF9pY29uOiBNYXRMZWdhY3lMaXN0SWNvbkNzc01hdFN0eWxlcjtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaW5lLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfbGluZXM6IFF1ZXJ5TGlzdDxNYXRMaW5lPjtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIG9wdGlvbiBoYXMgY2hhbmdlZC5cbiAgICogVXNlIHRvIGZhY2lsaXRhdGUgdHdvLWRhdGEgYmluZGluZyB0byB0aGUgYHNlbGVjdGVkYCBwcm9wZXJ0eS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqIERPTSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGl0ZW0ncyB0ZXh0LiAqL1xuICBAVmlld0NoaWxkKCd0ZXh0JykgX3RleHQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBhcHBlYXIgYmVmb3JlIG9yIGFmdGVyIHRoZSBjaGVja2JveC4gRGVmYXVsdHMgdG8gJ2FmdGVyJyAqL1xuICBASW5wdXQoKSBjaGVja2JveFBvc2l0aW9uOiBNYXRMZWdhY3lMaXN0T3B0aW9uQ2hlY2tib3hQb3NpdGlvbiA9ICdhZnRlcic7XG5cbiAgLyoqIFRoZW1lIGNvbG9yIG9mIHRoZSBsaXN0IG9wdGlvbi4gVGhpcyBzZXRzIHRoZSBjb2xvciBvZiB0aGUgY2hlY2tib3guICovXG4gIEBJbnB1dCgpXG4gIGdldCBjb2xvcigpOiBUaGVtZVBhbGV0dGUge1xuICAgIHJldHVybiB0aGlzLl9jb2xvciB8fCB0aGlzLnNlbGVjdGlvbkxpc3QuY29sb3I7XG4gIH1cbiAgc2V0IGNvbG9yKG5ld1ZhbHVlOiBUaGVtZVBhbGV0dGUpIHtcbiAgICB0aGlzLl9jb2xvciA9IG5ld1ZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2NvbG9yOiBUaGVtZVBhbGV0dGU7XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgc2V0IHRvIHRydWUgYWZ0ZXIgdGhlIGZpcnN0IE9uQ2hhbmdlcyBjeWNsZSBzbyB3ZSBkb24ndCBjbGVhciB0aGUgdmFsdWUgb2YgYHNlbGVjdGVkYFxuICAgKiBpbiB0aGUgZmlyc3QgY3ljbGUuXG4gICAqL1xuICBwcml2YXRlIF9pbnB1dHNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAvKiogVmFsdWUgb2YgdGhlIG9wdGlvbiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnNlbGVjdGVkICYmXG4gICAgICAhdGhpcy5zZWxlY3Rpb25MaXN0LmNvbXBhcmVXaXRoKG5ld1ZhbHVlLCB0aGlzLnZhbHVlKSAmJlxuICAgICAgdGhpcy5faW5wdXRzSW5pdGlhbGl6ZWRcbiAgICApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG9wdGlvbiBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5zZWxlY3Rpb25MaXN0ICYmIHRoaXMuc2VsZWN0aW9uTGlzdC5kaXNhYmxlZCk7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG9wdGlvbiBpcyBzZWxlY3RlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbkxpc3Quc2VsZWN0ZWRPcHRpb25zLmlzU2VsZWN0ZWQodGhpcyk7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgIGlmIChpc1NlbGVjdGVkICE9PSB0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2V0U2VsZWN0ZWQoaXNTZWxlY3RlZCk7XG5cbiAgICAgIGlmIChpc1NlbGVjdGVkIHx8IHRoaXMuc2VsZWN0aW9uTGlzdC5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkxpc3QuX3JlcG9ydFZhbHVlQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdExlZ2FjeVNlbGVjdGlvbkxpc3QpKSBwdWJsaWMgc2VsZWN0aW9uTGlzdDogTWF0TGVnYWN5U2VsZWN0aW9uTGlzdCxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnNlbGVjdGlvbkxpc3Q7XG5cbiAgICBpZiAobGlzdC5fdmFsdWUgJiYgbGlzdC5fdmFsdWUuc29tZSh2YWx1ZSA9PiBsaXN0LmNvbXBhcmVXaXRoKHRoaXMuX3ZhbHVlLCB2YWx1ZSkpKSB7XG4gICAgICB0aGlzLl9zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICB9XG5cbiAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkO1xuXG4gICAgLy8gTGlzdCBvcHRpb25zIHRoYXQgYXJlIHNlbGVjdGVkIGF0IGluaXRpYWxpemF0aW9uIGNhbid0IGJlIHJlcG9ydGVkIHByb3Blcmx5IHRvIHRoZSBmb3JtXG4gICAgLy8gY29udHJvbC4gVGhpcyBpcyBiZWNhdXNlIGl0IHRha2VzIHNvbWUgdGltZSB1bnRpbCB0aGUgc2VsZWN0aW9uLWxpc3Qga25vd3MgYWJvdXQgYWxsXG4gICAgLy8gYXZhaWxhYmxlIG9wdGlvbnMuIEFsc28gaXQgY2FuIGhhcHBlbiB0aGF0IHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBoYXMgYW4gaW5pdGlhbCB2YWx1ZVxuICAgIC8vIHRoYXQgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC4gRGVmZXJyaW5nIHRoZSB2YWx1ZSBjaGFuZ2UgcmVwb3J0IHRvIHRoZSBuZXh0IHRpY2sgZW5zdXJlc1xuICAgIC8vIHRoYXQgdGhlIGZvcm0gY29udHJvbCB2YWx1ZSBpcyBub3QgYmVpbmcgb3ZlcndyaXR0ZW4uXG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgfHwgd2FzU2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2lucHV0c0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBzZXRMaW5lcyh0aGlzLl9saW5lcywgdGhpcy5fZWxlbWVudCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgLy8gV2UgaGF2ZSB0byBkZWxheSB0aGlzIHVudGlsIHRoZSBuZXh0IHRpY2sgaW4gb3JkZXJcbiAgICAgIC8vIHRvIGF2b2lkIGNoYW5nZWQgYWZ0ZXIgY2hlY2tlZCBlcnJvcnMuXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFkRm9jdXMgPSB0aGlzLl9oYXNGb2N1cztcbiAgICBjb25zdCBuZXdBY3RpdmVJdGVtID0gdGhpcy5zZWxlY3Rpb25MaXN0Ll9yZW1vdmVPcHRpb25Gcm9tTGlzdCh0aGlzKTtcblxuICAgIC8vIE9ubHkgbW92ZSBmb2N1cyBpZiB0aGlzIG9wdGlvbiB3YXMgZm9jdXNlZCBhdCB0aGUgdGltZSBpdCB3YXMgZGVzdHJveWVkLlxuICAgIGlmIChoYWRGb2N1cyAmJiBuZXdBY3RpdmVJdGVtKSB7XG4gICAgICBuZXdBY3RpdmVJdGVtLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiB0aGUgb3B0aW9uLiAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgLyoqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBvcHRpb24uICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxpc3QgaXRlbSdzIHRleHQgbGFiZWwuIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiB0aGUgRm9jdXNLZXlNYW5hZ2VyLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXRMYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGV4dCA/IHRoaXMuX3RleHQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudCB8fCAnJyA6ICcnO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBsaXN0IGl0ZW0gc2hvdWxkIHNob3cgYSByaXBwbGUgZWZmZWN0IHdoZW4gY2xpY2tlZC4gKi9cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlUmlwcGxlIHx8IHRoaXMuc2VsZWN0aW9uTGlzdC5kaXNhYmxlUmlwcGxlO1xuICB9XG5cbiAgX2hhbmRsZUNsaWNrKCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAodGhpcy5zZWxlY3Rpb25MaXN0Lm11bHRpcGxlIHx8ICF0aGlzLnNlbGVjdGVkKSkge1xuICAgICAgdGhpcy50b2dnbGUoKTtcblxuICAgICAgLy8gRW1pdCBhIGNoYW5nZSBldmVudCBpZiB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIG9wdGlvbiBjaGFuZ2VkIHRocm91Z2ggdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgIHRoaXMuc2VsZWN0aW9uTGlzdC5fZW1pdENoYW5nZUV2ZW50KFt0aGlzXSk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUZvY3VzKCkge1xuICAgIHRoaXMuc2VsZWN0aW9uTGlzdC5fc2V0Rm9jdXNlZE9wdGlvbih0aGlzKTtcbiAgICB0aGlzLl9oYXNGb2N1cyA9IHRydWU7XG4gIH1cblxuICBfaGFuZGxlQmx1cigpIHtcbiAgICB0aGlzLnNlbGVjdGlvbkxpc3QuX29uVG91Y2hlZCgpO1xuICAgIHRoaXMuX2hhc0ZvY3VzID0gZmFsc2U7XG4gIH1cblxuICAvKiogUmV0cmlldmVzIHRoZSBET00gZWxlbWVudCBvZiB0aGUgY29tcG9uZW50IGhvc3QuICovXG4gIF9nZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiB0aGUgb3B0aW9uLiBSZXR1cm5zIHdoZXRoZXIgdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuICBfc2V0U2VsZWN0ZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAoc2VsZWN0ZWQgPT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcblxuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3Rpb25MaXN0LnNlbGVjdGVkT3B0aW9ucy5zZWxlY3QodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uTGlzdC5zZWxlY3RlZE9wdGlvbnMuZGVzZWxlY3QodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZmllcyBBbmd1bGFyIHRoYXQgdGhlIG9wdGlvbiBuZWVkcyB0byBiZSBjaGVja2VkIGluIHRoZSBuZXh0IGNoYW5nZSBkZXRlY3Rpb24gcnVuLiBNYWlubHlcbiAgICogdXNlZCB0byB0cmlnZ2VyIGFuIHVwZGF0ZSBvZiB0aGUgbGlzdCBvcHRpb24gaWYgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBzZWxlY3Rpb24gbGlzdFxuICAgKiBjaGFuZ2VkLlxuICAgKi9cbiAgX21hcmtGb3JDaGVjaygpIHtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuXG4vKipcbiAqIE1hdGVyaWFsIERlc2lnbiBsaXN0IGNvbXBvbmVudCB3aGVyZSBlYWNoIGl0ZW0gaXMgYSBzZWxlY3RhYmxlIG9wdGlvbi4gQmVoYXZlcyBhcyBhIGxpc3Rib3guXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFNlbGVjdGlvbkxpc3RgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2xpc3RgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNlbGVjdGlvbi1saXN0JyxcbiAgZXhwb3J0QXM6ICdtYXRTZWxlY3Rpb25MaXN0JyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVSaXBwbGUnXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ2xpc3Rib3gnLFxuICAgICdjbGFzcyc6ICdtYXQtc2VsZWN0aW9uLWxpc3QgbWF0LWxpc3QtYmFzZScsXG4gICAgJyhrZXlkb3duKSc6ICdfa2V5ZG93bigkZXZlbnQpJyxcbiAgICAnW2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGVdJzogJ211bHRpcGxlJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdfdGFiSW5kZXgnLFxuICB9LFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBzdHlsZVVybHM6IFsnbGlzdC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbTUFUX0xFR0FDWV9TRUxFQ1RJT05fTElTVF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lTZWxlY3Rpb25MaXN0XG4gIGV4dGVuZHMgX01hdFNlbGVjdGlvbkxpc3RCYXNlXG4gIGltcGxlbWVudHMgQ2FuRGlzYWJsZVJpcHBsZSwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgT25DaGFuZ2VzXG57XG4gIHByaXZhdGUgX211bHRpcGxlID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfY29udGVudEluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBGb2N1c0tleU1hbmFnZXIgd2hpY2ggaGFuZGxlcyBmb2N1cy4gKi9cbiAgX2tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxNYXRMZWdhY3lMaXN0T3B0aW9uPjtcblxuICAvKiogVGhlIG9wdGlvbiBjb21wb25lbnRzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBzZWxlY3Rpb24tbGlzdC4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMZWdhY3lMaXN0T3B0aW9uLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICBvcHRpb25zOiBRdWVyeUxpc3Q8TWF0TGVnYWN5TGlzdE9wdGlvbj47XG5cbiAgLyoqIEVtaXRzIGEgY2hhbmdlIGV2ZW50IHdoZW5ldmVyIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiBhbiBvcHRpb24gY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdExlZ2FjeVNlbGVjdGlvbkxpc3RDaGFuZ2U+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPE1hdExlZ2FjeVNlbGVjdGlvbkxpc3RDaGFuZ2U+KCk7XG5cbiAgLyoqIFRoZW1lIGNvbG9yIG9mIHRoZSBzZWxlY3Rpb24gbGlzdC4gVGhpcyBzZXRzIHRoZSBjaGVja2JveCBjb2xvciBmb3IgYWxsIGxpc3Qgb3B0aW9ucy4gKi9cbiAgQElucHV0KCkgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB1c2VkIGZvciBjb21wYXJpbmcgYW4gb3B0aW9uIGFnYWluc3QgdGhlIHNlbGVjdGVkIHZhbHVlIHdoZW4gZGV0ZXJtaW5pbmcgd2hpY2hcbiAgICogb3B0aW9ucyBzaG91bGQgYXBwZWFyIGFzIHNlbGVjdGVkLiBUaGUgZmlyc3QgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIGFuIG9wdGlvbnMuIFRoZSBzZWNvbmRcbiAgICogb25lIGlzIGEgdmFsdWUgZnJvbSB0aGUgc2VsZWN0ZWQgdmFsdWUuIEEgYm9vbGVhbiBtdXN0IGJlIHJldHVybmVkLlxuICAgKi9cbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuID0gKGExLCBhMikgPT4gYTEgPT09IGEyO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3Rpb24gbGlzdCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgIC8vIFRoZSBgTWF0U2VsZWN0aW9uTGlzdGAgYW5kIGBNYXRMaXN0T3B0aW9uYCBhcmUgdXNpbmcgdGhlIGBPblB1c2hgIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAvLyBzdHJhdGVneS4gVGhlcmVmb3JlIHRoZSBvcHRpb25zIHdpbGwgbm90IGNoZWNrIGZvciBhbnkgY2hhbmdlcyBpZiB0aGUgYE1hdFNlbGVjdGlvbkxpc3RgXG4gICAgLy8gY2hhbmdlZCBpdHMgc3RhdGUuIFNpbmNlIHdlIGtub3cgdGhhdCBhIGNoYW5nZSB0byBgZGlzYWJsZWRgIHByb3BlcnR5IG9mIHRoZSBsaXN0IGFmZmVjdHNcbiAgICAvLyB0aGUgc3RhdGUgb2YgdGhlIG9wdGlvbnMsIHdlIG1hbnVhbGx5IG1hcmsgZWFjaCBvcHRpb24gZm9yIGNoZWNrLlxuICAgIHRoaXMuX21hcmtPcHRpb25zRm9yQ2hlY2soKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHNlbGVjdGlvbiBpcyBsaW1pdGVkIHRvIG9uZSBvciBtdWx0aXBsZSBpdGVtcyAoZGVmYXVsdCBtdWx0aXBsZSkuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gIH1cbiAgc2V0IG11bHRpcGxlKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX211bHRpcGxlKSB7XG4gICAgICBpZiAodGhpcy5fY29udGVudEluaXRpYWxpemVkICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnQ2Fubm90IGNoYW5nZSBgbXVsdGlwbGVgIG1vZGUgb2YgbWF0LXNlbGVjdGlvbi1saXN0IGFmdGVyIGluaXRpYWxpemF0aW9uLicsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX211bHRpcGxlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IG5ldyBTZWxlY3Rpb25Nb2RlbCh0aGlzLl9tdWx0aXBsZSwgdGhpcy5zZWxlY3RlZE9wdGlvbnMuc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIG9wdGlvbnMuICovXG4gIHNlbGVjdGVkT3B0aW9ucyA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxNYXRMZWdhY3lMaXN0T3B0aW9uPih0aGlzLl9tdWx0aXBsZSk7XG5cbiAgLyoqIFRoZSB0YWJpbmRleCBvZiB0aGUgc2VsZWN0aW9uIGxpc3QuICovXG4gIF90YWJJbmRleCA9IC0xO1xuXG4gIC8qKiBWaWV3IHRvIG1vZGVsIGNhbGxiYWNrIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgc2VsZWN0ZWQgb3B0aW9ucyBjaGFuZ2UuICovXG4gIHByaXZhdGUgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9IChfOiBhbnkpID0+IHt9O1xuXG4gIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHZhbHVlLiAqL1xuICBfdmFsdWU6IHN0cmluZ1tdIHwgbnVsbDtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgbGlzdCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIFZpZXcgdG8gbW9kZWwgY2FsbGJhY2sgdGhhdCBzaG91bGQgYmUgY2FsbGVkIGlmIHRoZSBsaXN0IG9yIGl0cyBvcHRpb25zIGxvc3QgZm9jdXMuICovXG4gIF9vblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogV2hldGhlciB0aGUgbGlzdCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgX2lzRGVzdHJveWVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZW50SW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5fa2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXI8TWF0TGVnYWN5TGlzdE9wdGlvbj4odGhpcy5vcHRpb25zKVxuICAgICAgLndpdGhXcmFwKClcbiAgICAgIC53aXRoVHlwZUFoZWFkKClcbiAgICAgIC53aXRoSG9tZUFuZEVuZCgpXG4gICAgICAvLyBBbGxvdyBkaXNhYmxlZCBpdGVtcyB0byBiZSBmb2N1c2FibGUuIEZvciBhY2Nlc3NpYmlsaXR5IHJlYXNvbnMsIHRoZXJlIG11c3QgYmUgYSB3YXkgZm9yXG4gICAgICAvLyBzY3JlZW4gcmVhZGVyIHVzZXJzLCB0aGF0IGFsbG93cyByZWFkaW5nIHRoZSBkaWZmZXJlbnQgb3B0aW9ucyBvZiB0aGUgbGlzdC5cbiAgICAgIC5za2lwUHJlZGljYXRlKCgpID0+IGZhbHNlKVxuICAgICAgLndpdGhBbGxvd2VkTW9kaWZpZXJLZXlzKFsnc2hpZnRLZXknXSk7XG5cbiAgICBpZiAodGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMuX3NldE9wdGlvbnNGcm9tVmFsdWVzKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgdXNlciBhdHRlbXB0cyB0byB0YWIgb3V0IG9mIHRoZSBzZWxlY3Rpb24gbGlzdCwgYWxsb3cgZm9jdXMgdG8gZXNjYXBlLlxuICAgIHRoaXMuX2tleU1hbmFnZXIudGFiT3V0LnN1YnNjcmliZSgoKSA9PiB0aGlzLl9hbGxvd0ZvY3VzRXNjYXBlKCkpO1xuXG4gICAgLy8gV2hlbiB0aGUgbnVtYmVyIG9mIG9wdGlvbnMgY2hhbmdlLCB1cGRhdGUgdGhlIHRhYmluZGV4IG9mIHRoZSBzZWxlY3Rpb24gbGlzdC5cbiAgICB0aGlzLm9wdGlvbnMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVUYWJJbmRleCgpO1xuICAgIH0pO1xuXG4gICAgLy8gU3luYyBleHRlcm5hbCBjaGFuZ2VzIHRvIHRoZSBtb2RlbCBiYWNrIHRvIHRoZSBvcHRpb25zLlxuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zLmNoYW5nZWQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC5hZGRlZCkge1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGV2ZW50LmFkZGVkKSB7XG4gICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LnJlbW92ZWQpIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBldmVudC5yZW1vdmVkKSB7XG4gICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9mb2N1c01vbml0b3JcbiAgICAgIC5tb25pdG9yKHRoaXMuX2VsZW1lbnQpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUob3JpZ2luID0+IHtcbiAgICAgICAgaWYgKG9yaWdpbiA9PT0gJ2tleWJvYXJkJyB8fCBvcmlnaW4gPT09ICdwcm9ncmFtJykge1xuICAgICAgICAgIGxldCB0b0ZvY3VzID0gMDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5nZXQoaSk/LnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgIHRvRm9jdXMgPSBpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHRvRm9jdXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBkaXNhYmxlUmlwcGxlQ2hhbmdlcyA9IGNoYW5nZXNbJ2Rpc2FibGVSaXBwbGUnXTtcbiAgICBjb25zdCBjb2xvckNoYW5nZXMgPSBjaGFuZ2VzWydjb2xvciddO1xuXG4gICAgaWYgKFxuICAgICAgKGRpc2FibGVSaXBwbGVDaGFuZ2VzICYmICFkaXNhYmxlUmlwcGxlQ2hhbmdlcy5maXJzdENoYW5nZSkgfHxcbiAgICAgIChjb2xvckNoYW5nZXMgJiYgIWNvbG9yQ2hhbmdlcy5maXJzdENoYW5nZSlcbiAgICApIHtcbiAgICAgIHRoaXMuX21hcmtPcHRpb25zRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9rZXlNYW5hZ2VyPy5kZXN0cm95KCk7XG4gICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnQpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5faXNEZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIHNlbGVjdGlvbiBsaXN0LiAqL1xuICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKSB7XG4gICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgYWxsIG9mIHRoZSBvcHRpb25zLiBSZXR1cm5zIHRoZSBvcHRpb25zIHRoYXQgY2hhbmdlZCBhcyBhIHJlc3VsdC4gKi9cbiAgc2VsZWN0QWxsKCk6IE1hdExlZ2FjeUxpc3RPcHRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldEFsbE9wdGlvbnNTZWxlY3RlZCh0cnVlKTtcbiAgfVxuXG4gIC8qKiBEZXNlbGVjdHMgYWxsIG9mIHRoZSBvcHRpb25zLiBSZXR1cm5zIHRoZSBvcHRpb25zIHRoYXQgY2hhbmdlZCBhcyBhIHJlc3VsdC4gKi9cbiAgZGVzZWxlY3RBbGwoKTogTWF0TGVnYWN5TGlzdE9wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0QWxsT3B0aW9uc1NlbGVjdGVkKGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBmb2N1c2VkIG9wdGlvbiBvZiB0aGUgc2VsZWN0aW9uLWxpc3QuICovXG4gIF9zZXRGb2N1c2VkT3B0aW9uKG9wdGlvbjogTWF0TGVnYWN5TGlzdE9wdGlvbikge1xuICAgIHRoaXMuX2tleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShvcHRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gb3B0aW9uIGZyb20gdGhlIHNlbGVjdGlvbiBsaXN0IGFuZCB1cGRhdGVzIHRoZSBhY3RpdmUgaXRlbS5cbiAgICogQHJldHVybnMgQ3VycmVudGx5LWFjdGl2ZSBpdGVtLlxuICAgKi9cbiAgX3JlbW92ZU9wdGlvbkZyb21MaXN0KG9wdGlvbjogTWF0TGVnYWN5TGlzdE9wdGlvbik6IE1hdExlZ2FjeUxpc3RPcHRpb24gfCBudWxsIHtcbiAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuX2dldE9wdGlvbkluZGV4KG9wdGlvbik7XG5cbiAgICBpZiAob3B0aW9uSW5kZXggPiAtMSAmJiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gb3B0aW9uSW5kZXgpIHtcbiAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIG9wdGlvbiBpcyB0aGUgbGFzdCBpdGVtXG4gICAgICBpZiAob3B0aW9uSW5kZXggPiAwKSB7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShvcHRpb25JbmRleCAtIDEpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25JbmRleCA9PT0gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oTWF0aC5taW4ob3B0aW9uSW5kZXggKyAxLCB0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gIH1cblxuICAvKiogUGFzc2VzIHJlbGV2YW50IGtleSBwcmVzc2VzIHRvIG91ciBrZXkgbWFuYWdlci4gKi9cbiAgX2tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcbiAgICBjb25zdCBwcmV2aW91c0ZvY3VzSW5kZXggPSBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcbiAgICBjb25zdCBoYXNNb2RpZmllciA9IGhhc01vZGlmaWVyS2V5KGV2ZW50KTtcblxuICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgY2FzZSBTUEFDRTpcbiAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIGlmICghaGFzTW9kaWZpZXIgJiYgIW1hbmFnZXIuaXNUeXBpbmcoKSkge1xuICAgICAgICAgIHRoaXMuX3RvZ2dsZUZvY3VzZWRPcHRpb24oKTtcbiAgICAgICAgICAvLyBBbHdheXMgcHJldmVudCBzcGFjZSBmcm9tIHNjcm9sbGluZyB0aGUgcGFnZSBzaW5jZSB0aGUgbGlzdCBoYXMgZm9jdXNcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gVGhlIFwiQVwiIGtleSBnZXRzIHNwZWNpYWwgdHJlYXRtZW50LCBiZWNhdXNlIGl0J3MgdXNlZCBmb3IgdGhlIFwic2VsZWN0IGFsbFwiIGZ1bmN0aW9uYWxpdHkuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBrZXlDb2RlID09PSBBICYmXG4gICAgICAgICAgdGhpcy5tdWx0aXBsZSAmJlxuICAgICAgICAgIGhhc01vZGlmaWVyS2V5KGV2ZW50LCAnY3RybEtleScpICYmXG4gICAgICAgICAgIW1hbmFnZXIuaXNUeXBpbmcoKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBzaG91bGRTZWxlY3QgPSB0aGlzLm9wdGlvbnMuc29tZShvcHRpb24gPT4gIW9wdGlvbi5kaXNhYmxlZCAmJiAhb3B0aW9uLnNlbGVjdGVkKTtcbiAgICAgICAgICB0aGlzLl9zZXRBbGxPcHRpb25zU2VsZWN0ZWQoc2hvdWxkU2VsZWN0LCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMubXVsdGlwbGUgJiZcbiAgICAgIChrZXlDb2RlID09PSBVUF9BUlJPVyB8fCBrZXlDb2RlID09PSBET1dOX0FSUk9XKSAmJlxuICAgICAgZXZlbnQuc2hpZnRLZXkgJiZcbiAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICE9PSBwcmV2aW91c0ZvY3VzSW5kZXhcbiAgICApIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUZvY3VzZWRPcHRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKiogUmVwb3J0cyBhIHZhbHVlIGNoYW5nZSB0byB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgKi9cbiAgX3JlcG9ydFZhbHVlQ2hhbmdlKCkge1xuICAgIC8vIFN0b3AgcmVwb3J0aW5nIHZhbHVlIGNoYW5nZXMgYWZ0ZXIgdGhlIGxpc3QgaGFzIGJlZW4gZGVzdHJveWVkLiBUaGlzIGF2b2lkc1xuICAgIC8vIGNhc2VzIHdoZXJlIHRoZSBsaXN0IG1pZ2h0IHdyb25nbHkgcmVzZXQgaXRzIHZhbHVlIG9uY2UgaXQgaXMgcmVtb3ZlZCwgYnV0XG4gICAgLy8gdGhlIGZvcm0gY29udHJvbCBpcyBzdGlsbCBsaXZlLlxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgIXRoaXMuX2lzRGVzdHJveWVkKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2dldFNlbGVjdGVkT3B0aW9uVmFsdWVzKCk7XG4gICAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBFbWl0cyBhIGNoYW5nZSBldmVudCBpZiB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgYW4gb3B0aW9uIGNoYW5nZWQuICovXG4gIF9lbWl0Q2hhbmdlRXZlbnQob3B0aW9uczogTWF0TGVnYWN5TGlzdE9wdGlvbltdKSB7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChuZXcgTWF0TGVnYWN5U2VsZWN0aW9uTGlzdENoYW5nZSh0aGlzLCBvcHRpb25zKSk7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZXM7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICB0aGlzLl9zZXRPcHRpb25zRnJvbVZhbHVlcyh2YWx1ZXMgfHwgW10pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbnMgYmFzZWQgb24gdGhlIHNwZWNpZmllZCB2YWx1ZXMuICovXG4gIHByaXZhdGUgX3NldE9wdGlvbnNGcm9tVmFsdWVzKHZhbHVlczogc3RyaW5nW10pIHtcbiAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLl9zZXRTZWxlY3RlZChmYWxzZSkpO1xuXG4gICAgdmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMub3B0aW9ucy5maW5kKG9wdGlvbiA9PiB7XG4gICAgICAgIC8vIFNraXAgb3B0aW9ucyB0aGF0IGFyZSBhbHJlYWR5IGluIHRoZSBtb2RlbC4gVGhpcyBhbGxvd3MgdXMgdG8gaGFuZGxlIGNhc2VzXG4gICAgICAgIC8vIHdoZXJlIHRoZSBzYW1lIHByaW1pdGl2ZSB2YWx1ZSBpcyBzZWxlY3RlZCBtdWx0aXBsZSB0aW1lcy5cbiAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZCA/IGZhbHNlIDogdGhpcy5jb21wYXJlV2l0aChvcHRpb24udmFsdWUsIHZhbHVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICBjb3JyZXNwb25kaW5nT3B0aW9uLl9zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSB2YWx1ZXMgb2YgdGhlIHNlbGVjdGVkIG9wdGlvbnMuICovXG4gIHByaXZhdGUgX2dldFNlbGVjdGVkT3B0aW9uVmFsdWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnNlbGVjdGVkKS5tYXAob3B0aW9uID0+IG9wdGlvbi52YWx1ZSk7XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgc3RhdGUgb2YgdGhlIGN1cnJlbnRseSBmb2N1c2VkIG9wdGlvbiBpZiBlbmFibGVkLiAqL1xuICBwcml2YXRlIF90b2dnbGVGb2N1c2VkT3B0aW9uKCk6IHZvaWQge1xuICAgIGxldCBmb2N1c2VkSW5kZXggPSB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcblxuICAgIGlmIChmb2N1c2VkSW5kZXggIT0gbnVsbCAmJiB0aGlzLl9pc1ZhbGlkSW5kZXgoZm9jdXNlZEluZGV4KSkge1xuICAgICAgbGV0IGZvY3VzZWRPcHRpb246IE1hdExlZ2FjeUxpc3RPcHRpb24gPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpW2ZvY3VzZWRJbmRleF07XG5cbiAgICAgIGlmIChmb2N1c2VkT3B0aW9uICYmICFmb2N1c2VkT3B0aW9uLmRpc2FibGVkICYmICh0aGlzLl9tdWx0aXBsZSB8fCAhZm9jdXNlZE9wdGlvbi5zZWxlY3RlZCkpIHtcbiAgICAgICAgZm9jdXNlZE9wdGlvbi50b2dnbGUoKTtcblxuICAgICAgICAvLyBFbWl0IGEgY2hhbmdlIGV2ZW50IGJlY2F1c2UgdGhlIGZvY3VzZWQgb3B0aW9uIGNoYW5nZWQgaXRzIHN0YXRlIHRocm91Z2ggdXNlclxuICAgICAgICAvLyBpbnRlcmFjdGlvbi5cbiAgICAgICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KFtmb2N1c2VkT3B0aW9uXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIHN0YXRlIG9uIGFsbCBvZiB0aGUgb3B0aW9uc1xuICAgKiBhbmQgZW1pdHMgYW4gZXZlbnQgaWYgYW55dGhpbmcgY2hhbmdlZC5cbiAgICovXG4gIHByaXZhdGUgX3NldEFsbE9wdGlvbnNTZWxlY3RlZChcbiAgICBpc1NlbGVjdGVkOiBib29sZWFuLFxuICAgIHNraXBEaXNhYmxlZD86IGJvb2xlYW4sXG4gICAgaXNVc2VySW5wdXQ/OiBib29sZWFuLFxuICApOiBNYXRMZWdhY3lMaXN0T3B0aW9uW10ge1xuICAgIC8vIEtlZXAgdHJhY2sgb2Ygd2hldGhlciBhbnl0aGluZyBjaGFuZ2VkLCBiZWNhdXNlIHdlIG9ubHkgd2FudCB0b1xuICAgIC8vIGVtaXQgdGhlIGNoYW5nZWQgZXZlbnQgd2hlbiBzb21ldGhpbmcgYWN0dWFsbHkgY2hhbmdlZC5cbiAgICBjb25zdCBjaGFuZ2VkT3B0aW9uczogTWF0TGVnYWN5TGlzdE9wdGlvbltdID0gW107XG5cbiAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgaWYgKCghc2tpcERpc2FibGVkIHx8ICFvcHRpb24uZGlzYWJsZWQpICYmIG9wdGlvbi5fc2V0U2VsZWN0ZWQoaXNTZWxlY3RlZCkpIHtcbiAgICAgICAgY2hhbmdlZE9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGNoYW5nZWRPcHRpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5fcmVwb3J0VmFsdWVDaGFuZ2UoKTtcblxuICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudChjaGFuZ2VkT3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoYW5nZWRPcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgdG8gZW5zdXJlIGFsbCBpbmRleGVzIGFyZSB2YWxpZC5cbiAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbmRleCBpcyB2YWxpZCBmb3Igb3VyIGxpc3Qgb2Ygb3B0aW9ucy5cbiAgICovXG4gIHByaXZhdGUgX2lzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLm9wdGlvbnMubGVuZ3RoO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdCBvcHRpb24uICovXG4gIHByaXZhdGUgX2dldE9wdGlvbkluZGV4KG9wdGlvbjogTWF0TGVnYWN5TGlzdE9wdGlvbik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50b0FycmF5KCkuaW5kZXhPZihvcHRpb24pO1xuICB9XG5cbiAgLyoqIE1hcmtzIGFsbCB0aGUgb3B0aW9ucyB0byBiZSBjaGVja2VkIGluIHRoZSBuZXh0IGNoYW5nZSBkZXRlY3Rpb24gcnVuLiAqL1xuICBwcml2YXRlIF9tYXJrT3B0aW9uc0ZvckNoZWNrKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBvcHRpb24uX21hcmtGb3JDaGVjaygpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgdGFiaW5kZXggZnJvbSB0aGUgc2VsZWN0aW9uIGxpc3QgYW5kIHJlc2V0cyBpdCBiYWNrIGFmdGVyd2FyZHMsIGFsbG93aW5nIHRoZSB1c2VyXG4gICAqIHRvIHRhYiBvdXQgb2YgaXQuIFRoaXMgcHJldmVudHMgdGhlIGxpc3QgZnJvbSBjYXB0dXJpbmcgZm9jdXMgYW5kIHJlZGlyZWN0aW5nIGl0IGJhY2sgd2l0aGluXG4gICAqIHRoZSBsaXN0LCBjcmVhdGluZyBhIGZvY3VzIHRyYXAgaWYgaXQgdXNlciB0cmllcyB0byB0YWIgYXdheS5cbiAgICovXG4gIHByaXZhdGUgX2FsbG93Rm9jdXNFc2NhcGUoKSB7XG4gICAgdGhpcy5fdGFiSW5kZXggPSAtMTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fdGFiSW5kZXggPSAwO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogVXBkYXRlcyB0aGUgdGFiaW5kZXggYmFzZWQgdXBvbiBpZiB0aGUgc2VsZWN0aW9uIGxpc3QgaXMgZW1wdHkuICovXG4gIHByaXZhdGUgX3VwZGF0ZVRhYkluZGV4KCk6IHZvaWQge1xuICAgIHRoaXMuX3RhYkluZGV4ID0gdGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMCA/IC0xIDogMDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1hdC1saXN0LWl0ZW0tY29udGVudFwiXG4gIFtjbGFzcy5tYXQtbGlzdC1pdGVtLWNvbnRlbnQtcmV2ZXJzZV09XCJjaGVja2JveFBvc2l0aW9uID09ICdhZnRlcidcIj5cblxuICA8ZGl2IG1hdC1yaXBwbGVcbiAgICBjbGFzcz1cIm1hdC1saXN0LWl0ZW0tcmlwcGxlXCJcbiAgICBbbWF0UmlwcGxlVHJpZ2dlcl09XCJfZ2V0SG9zdEVsZW1lbnQoKVwiXG4gICAgW21hdFJpcHBsZURpc2FibGVkXT1cIl9pc1JpcHBsZURpc2FibGVkKClcIj48L2Rpdj5cblxuICA8bWF0LXBzZXVkby1jaGVja2JveFxuICAgICpuZ0lmPVwic2VsZWN0aW9uTGlzdC5tdWx0aXBsZVwiXG4gICAgW3N0YXRlXT1cInNlbGVjdGVkID8gJ2NoZWNrZWQnIDogJ3VuY2hlY2tlZCdcIlxuICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPjwvbWF0LXBzZXVkby1jaGVja2JveD5cblxuICA8ZGl2IGNsYXNzPVwibWF0LWxpc3QtdGV4dFwiICN0ZXh0PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5cblxuICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWF0LWxpc3QtYXZhdGFyXSwgW21hdC1saXN0LWljb25dLCBbbWF0TGlzdEF2YXRhcl0sIFttYXRMaXN0SWNvbl1cIj5cbiAgPC9uZy1jb250ZW50PlxuXG48L2Rpdj5cbiJdfQ==