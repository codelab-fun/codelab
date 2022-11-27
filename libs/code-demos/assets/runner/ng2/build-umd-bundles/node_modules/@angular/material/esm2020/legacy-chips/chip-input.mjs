/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, hasModifierKey, TAB } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, Inject, Input, Output, } from '@angular/core';
import { MAT_LEGACY_CHIPS_DEFAULT_OPTIONS, } from './chip-default-options';
import { MatLegacyChipList } from './chip-list';
import * as i0 from "@angular/core";
// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of an `<mat-chip-list>`.
 * @deprecated Use `MatChipInput` from `@angular/material/chips` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyChipInput {
    constructor(_elementRef, _defaultOptions) {
        this._elementRef = _elementRef;
        this._defaultOptions = _defaultOptions;
        /** Whether the control is focused. */
        this.focused = false;
        this._addOnBlur = false;
        /**
         * The list of key codes that will trigger a chipEnd event.
         *
         * Defaults to `[ENTER]`.
         */
        this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes;
        /** Emitted when a chip is to be added. */
        this.chipEnd = new EventEmitter();
        /** The input's placeholder text. */
        this.placeholder = '';
        /** Unique id for the input. */
        this.id = `mat-chip-list-input-${nextUniqueId++}`;
        this._disabled = false;
        this.inputElement = this._elementRef.nativeElement;
    }
    /** Register input for chip list */
    set chipList(value) {
        if (value) {
            this._chipList = value;
            this._chipList.registerInput(this);
        }
    }
    /**
     * Whether or not the chipEnd event will be emitted when the input is blurred.
     */
    get addOnBlur() {
        return this._addOnBlur;
    }
    set addOnBlur(value) {
        this._addOnBlur = coerceBooleanProperty(value);
    }
    /** Whether the input is disabled. */
    get disabled() {
        return this._disabled || (this._chipList && this._chipList.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /** Whether the input is empty. */
    get empty() {
        return !this.inputElement.value;
    }
    ngOnChanges() {
        this._chipList.stateChanges.next();
    }
    ngOnDestroy() {
        this.chipEnd.complete();
    }
    ngAfterContentInit() {
        this._focusLastChipOnBackspace = this.empty;
    }
    /** Utility method to make host definition/tests more clear. */
    _keydown(event) {
        if (event) {
            // Allow the user's focus to escape when they're tabbing forward. Note that we don't
            // want to do this when going backwards, because focus should go back to the first chip.
            if (event.keyCode === TAB && !hasModifierKey(event, 'shiftKey')) {
                this._chipList._allowFocusEscape();
            }
            // To prevent the user from accidentally deleting chips when pressing BACKSPACE continuously,
            // We focus the last chip on backspace only after the user has released the backspace button,
            // and the input is empty (see behaviour in _keyup)
            if (event.keyCode === BACKSPACE && this._focusLastChipOnBackspace) {
                this._chipList._keyManager.setLastItemActive();
                event.preventDefault();
                return;
            }
            else {
                this._focusLastChipOnBackspace = false;
            }
        }
        this._emitChipEnd(event);
    }
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    _keyup(event) {
        // Allow user to move focus to chips next time he presses backspace
        if (!this._focusLastChipOnBackspace && event.keyCode === BACKSPACE && this.empty) {
            this._focusLastChipOnBackspace = true;
            event.preventDefault();
        }
    }
    /** Checks to see if the blur should emit the (chipEnd) event. */
    _blur() {
        if (this.addOnBlur) {
            this._emitChipEnd();
        }
        this.focused = false;
        // Blur the chip list if it is not focused
        if (!this._chipList.focused) {
            this._chipList._blur();
        }
        this._chipList.stateChanges.next();
    }
    _focus() {
        this.focused = true;
        this._focusLastChipOnBackspace = this.empty;
        this._chipList.stateChanges.next();
    }
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    _emitChipEnd(event) {
        if (!this.inputElement.value && !!event) {
            this._chipList._keydown(event);
        }
        if (!event || this._isSeparatorKey(event)) {
            this.chipEnd.emit({
                input: this.inputElement,
                value: this.inputElement.value,
                chipInput: this,
            });
            event?.preventDefault();
        }
    }
    _onInput() {
        // Let chip list know whenever the value changes.
        this._chipList.stateChanges.next();
    }
    /** Focuses the input. */
    focus(options) {
        this.inputElement.focus(options);
    }
    /** Clears the input */
    clear() {
        this.inputElement.value = '';
        this._focusLastChipOnBackspace = true;
    }
    /** Checks whether a keycode is one of the configured separators. */
    _isSeparatorKey(event) {
        return !hasModifierKey(event) && new Set(this.separatorKeyCodes).has(event.keyCode);
    }
}
MatLegacyChipInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyChipInput, deps: [{ token: i0.ElementRef }, { token: MAT_LEGACY_CHIPS_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyChipInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyChipInput, selector: "input[matChipInputFor]", inputs: { chipList: ["matChipInputFor", "chipList"], addOnBlur: ["matChipInputAddOnBlur", "addOnBlur"], separatorKeyCodes: ["matChipInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", id: "id", disabled: "disabled" }, outputs: { chipEnd: "matChipInputTokenEnd" }, host: { listeners: { "keydown": "_keydown($event)", "keyup": "_keyup($event)", "blur": "_blur()", "focus": "_focus()", "input": "_onInput()" }, properties: { "id": "id", "attr.disabled": "disabled || null", "attr.placeholder": "placeholder || null", "attr.aria-invalid": "_chipList && _chipList.ngControl ? _chipList.ngControl.invalid : null", "attr.aria-required": "_chipList && _chipList.required || null" }, classAttribute: "mat-chip-input mat-input-element" }, exportAs: ["matChipInput", "matChipInputFor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyChipInput, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[matChipInputFor]',
                    exportAs: 'matChipInput, matChipInputFor',
                    host: {
                        'class': 'mat-chip-input mat-input-element',
                        '(keydown)': '_keydown($event)',
                        '(keyup)': '_keyup($event)',
                        '(blur)': '_blur()',
                        '(focus)': '_focus()',
                        '(input)': '_onInput()',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.placeholder]': 'placeholder || null',
                        '[attr.aria-invalid]': '_chipList && _chipList.ngControl ? _chipList.ngControl.invalid : null',
                        '[attr.aria-required]': '_chipList && _chipList.required || null',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_LEGACY_CHIPS_DEFAULT_OPTIONS]
                }] }]; }, propDecorators: { chipList: [{
                type: Input,
                args: ['matChipInputFor']
            }], addOnBlur: [{
                type: Input,
                args: ['matChipInputAddOnBlur']
            }], separatorKeyCodes: [{
                type: Input,
                args: ['matChipInputSeparatorKeyCodes']
            }], chipEnd: [{
                type: Output,
                args: ['matChipInputTokenEnd']
            }], placeholder: [{
                type: Input
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktY2hpcHMvY2hpcC1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVMLGdDQUFnQyxHQUNqQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUF1QjlDLGdEQUFnRDtBQUNoRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7Ozs7O0dBS0c7QUFrQkgsTUFBTSxPQUFPLGtCQUFrQjtJQW1FN0IsWUFDWSxXQUF5QyxFQUNELGVBQTZDO1FBRHJGLGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQUNELG9CQUFlLEdBQWYsZUFBZSxDQUE4QjtRQS9Eakcsc0NBQXNDO1FBQ3RDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFzQnpCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUI7Ozs7V0FJRztRQUVILHNCQUFpQixHQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFFekMsMENBQTBDO1FBQ0QsWUFBTyxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO1FBRS9GLG9DQUFvQztRQUMzQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUVsQywrQkFBK0I7UUFDdEIsT0FBRSxHQUFXLHVCQUF1QixZQUFZLEVBQUUsRUFBRSxDQUFDO1FBVXRELGNB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VixLQUFLO2dCQUlGLFFBQVE7c0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtCQUNLU1BBQ0UsIGhhc01vZGlmaWVyS2V5LCBUQUJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNYXRMZWdhY3lDaGlwc0RlZmF1bHRPcHRpb25zLFxuICBNQVRfTEVHQUNZX0NISVBTX0RFRkFVTFRfT1BUSU9OUyxcbn0gZnJvbSAnLi9jaGlwLWRlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQge01hdExlZ2FjeUNoaXBMaXN0fSBmcm9tICcuL2NoaXAtbGlzdCc7XG5pbXBvcnQge01hdExlZ2FjeUNoaXBUZXh0Q29udHJvbH0gZnJvbSAnLi9jaGlwLXRleHQtY29udHJvbCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnB1dCBldmVudCBvbiBhIGBtYXRDaGlwSW5wdXRgLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRDaGlwSW5wdXRFdmVudGAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHNgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRMZWdhY3lDaGlwSW5wdXRFdmVudCB7XG4gIC8qKlxuICAgKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci5cbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRDaGlwSW5wdXRFdmVudCNjaGlwSW5wdXQuaW5wdXRFbGVtZW50YCBpbnN0ZWFkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMCBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICovXG4gIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICB2YWx1ZTogc3RyaW5nO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGNoaXAgaW5wdXQgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgY2hpcElucHV0OiBNYXRMZWdhY3lDaGlwSW5wdXQ7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBjaGlwLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1hdC1mb3JtLWZpZWxkPmAuXG4gKiBNYXkgYmUgcGxhY2VkIGluc2lkZSBvciBvdXRzaWRlIG9mIGFuIGA8bWF0LWNoaXAtbGlzdD5gLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRDaGlwSW5wdXRgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NoaXBzYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21hdENoaXBJbnB1dEZvcl0nLFxuICBleHBvcnRBczogJ21hdENoaXBJbnB1dCwgbWF0Q2hpcElucHV0Rm9yJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtY2hpcC1pbnB1dCBtYXQtaW5wdXQtZWxlbWVudCcsXG4gICAgJyhrZXlkb3duKSc6ICdfa2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGtleXVwKSc6ICdfa2V5dXAoJGV2ZW50KScsXG4gICAgJyhibHVyKSc6ICdfYmx1cigpJyxcbiAgICAnKGZvY3VzKSc6ICdfZm9jdXMoKScsXG4gICAgJyhpbnB1dCknOiAnX29uSW5wdXQoKScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlciB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdfY2hpcExpc3QgJiYgX2NoaXBMaXN0Lm5nQ29udHJvbCA/IF9jaGlwTGlzdC5uZ0NvbnRyb2wuaW52YWxpZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdfY2hpcExpc3QgJiYgX2NoaXBMaXN0LnJlcXVpcmVkIHx8IG51bGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lDaGlwSW5wdXRcbiAgaW1wbGVtZW50cyBNYXRMZWdhY3lDaGlwVGV4dENvbnRyb2wsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0XG57XG4gIC8qKiBVc2VkIHRvIHByZXZlbnQgZm9jdXMgbW92aW5nIHRvIGNoaXBzIHdoaWxlIHVzZXIgaXMgaG9sZGluZyBiYWNrc3BhY2UgKi9cbiAgcHJpdmF0ZSBfZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGZvY3VzZWQuICovXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2NoaXBMaXN0OiBNYXRMZWdhY3lDaGlwTGlzdDtcblxuICAvKiogUmVnaXN0ZXIgaW5wdXQgZm9yIGNoaXAgbGlzdCAqL1xuICBASW5wdXQoJ21hdENoaXBJbnB1dEZvcicpXG4gIHNldCBjaGlwTGlzdCh2YWx1ZTogTWF0TGVnYWN5Q2hpcExpc3QpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2NoaXBMaXN0ID0gdmFsdWU7XG4gICAgICB0aGlzLl9jaGlwTGlzdC5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgY2hpcEVuZCBldmVudCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZC5cbiAgICovXG4gIEBJbnB1dCgnbWF0Q2hpcElucHV0QWRkT25CbHVyJylcbiAgZ2V0IGFkZE9uQmx1cigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWRkT25CbHVyO1xuICB9XG4gIHNldCBhZGRPbkJsdXIodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2FkZE9uQmx1ciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX2FkZE9uQmx1cjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBrZXkgY29kZXMgdGhhdCB3aWxsIHRyaWdnZXIgYSBjaGlwRW5kIGV2ZW50LlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBgW0VOVEVSXWAuXG4gICAqL1xuICBASW5wdXQoJ21hdENoaXBJbnB1dFNlcGFyYXRvcktleUNvZGVzJylcbiAgc2VwYXJhdG9yS2V5Q29kZXM6IHJlYWRvbmx5IG51bWJlcltdIHwgUmVhZG9ubHlTZXQ8bnVtYmVyPiA9XG4gICAgdGhpcy5fZGVmYXVsdE9wdGlvbnMuc2VwYXJhdG9yS2V5Q29kZXM7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiBhIGNoaXAgaXMgdG8gYmUgYWRkZWQuICovXG4gIEBPdXRwdXQoJ21hdENoaXBJbnB1dFRva2VuRW5kJykgcmVhZG9ubHkgY2hpcEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0TGVnYWN5Q2hpcElucHV0RXZlbnQ+KCk7XG5cbiAgLyoqIFRoZSBpbnB1dCdzIHBsYWNlaG9sZGVyIHRleHQuICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcblxuICAvKiogVW5pcXVlIGlkIGZvciB0aGUgaW5wdXQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWF0LWNoaXAtbGlzdC1pbnB1dC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLl9jaGlwTGlzdCAmJiB0aGlzLl9jaGlwTGlzdC5kaXNhYmxlZCk7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZW1wdHkuICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaW5wdXRFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCB0byB3aGljaCB0aGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZC4gKi9cbiAgcmVhZG9ubHkgaW5wdXRFbGVtZW50ITogSFRNTElucHV0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgQEluamVjdChNQVRfTEVHQUNZX0NISVBTX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM6IE1hdExlZ2FjeUNoaXBzRGVmYXVsdE9wdGlvbnMsXG4gICkge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGlwTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jaGlwRW5kLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gdGhpcy5lbXB0eTtcbiAgfVxuXG4gIC8qKiBVdGlsaXR5IG1ldGhvZCB0byBtYWtlIGhvc3QgZGVmaW5pdGlvbi90ZXN0cyBtb3JlIGNsZWFyLiAqL1xuICBfa2V5ZG93bihldmVudD86IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIC8vIEFsbG93IHRoZSB1c2VyJ3MgZm9jdXMgdG8gZXNjYXBlIHdoZW4gdGhleSdyZSB0YWJiaW5nIGZvcndhcmQuIE5vdGUgdGhhdCB3ZSBkb24ndFxuICAgICAgLy8gd2FudCB0byBkbyB0aGlzIHdoZW4gZ29pbmcgYmFja3dhcmRzLCBiZWNhdXNlIGZvY3VzIHNob3VsZCBnbyBiYWNrIHRvIHRoZSBmaXJzdCBjaGlwLlxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IFRBQiAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdzaGlmdEtleScpKSB7XG4gICAgICAgIHRoaXMuX2NoaXBMaXN0Ll9hbGxvd0ZvY3VzRXNjYXBlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIHByZXZlbnQgdGhlIHVzZXIgZnJvbSBhY2NpZGVudGFsbHkgZGVsZXRpbmcgY2hpcHMgd2hlbiBwcmVzc2luZyBCQUNLU1BBQ0UgY29udGludW91c2x5LFxuICAgICAgLy8gV2UgZm9jdXMgdGhlIGxhc3QgY2hpcCBvbiBiYWNrc3BhY2Ugb25seSBhZnRlciB0aGUgdXNlciBoYXMgcmVsZWFzZWQgdGhlIGJhY2tzcGFjZSBidXR0b24sXG4gICAgICAvLyBhbmQgdGhlIGlucHV0IGlzIGVtcHR5IChzZWUgYmVoYXZpb3VyIGluIF9rZXl1cClcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBCQUNLU1BBQ0UgJiYgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlKSB7XG4gICAgICAgIHRoaXMuX2NoaXBMaXN0Ll9rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2VtaXRDaGlwRW5kKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzIGV2ZW50cyB0byB0aGUga2V5Ym9hcmQgbWFuYWdlci4gQXZhaWxhYmxlIGhlcmUgZm9yIHRlc3RzLlxuICAgKi9cbiAgX2tleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gQWxsb3cgdXNlciB0byBtb3ZlIGZvY3VzIHRvIGNoaXBzIG5leHQgdGltZSBoZSBwcmVzc2VzIGJhY2tzcGFjZVxuICAgIGlmICghdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlICYmIGV2ZW50LmtleUNvZGUgPT09IEJBQ0tTUEFDRSAmJiB0aGlzLmVtcHR5KSB7XG4gICAgICB0aGlzLl9mb2N1c0xhc3RDaGlwT25CYWNrc3BhY2UgPSB0cnVlO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgYmx1ciBzaG91bGQgZW1pdCB0aGUgKGNoaXBFbmQpIGV2ZW50LiAqL1xuICBfYmx1cigpIHtcbiAgICBpZiAodGhpcy5hZGRPbkJsdXIpIHtcbiAgICAgIHRoaXMuX2VtaXRDaGlwRW5kKCk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIC8vIEJsdXIgdGhlIGNoaXAgbGlzdCBpZiBpdCBpcyBub3QgZm9jdXNlZFxuICAgIGlmICghdGhpcy5fY2hpcExpc3QuZm9jdXNlZCkge1xuICAgICAgdGhpcy5fY2hpcExpc3QuX2JsdXIoKTtcbiAgICB9XG4gICAgdGhpcy5fY2hpcExpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIF9mb2N1cygpIHtcbiAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSA9IHRoaXMuZW1wdHk7XG4gICAgdGhpcy5fY2hpcExpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKiBDaGVja3MgdG8gc2VlIGlmIHRoZSAoY2hpcEVuZCkgZXZlbnQgbmVlZHMgdG8gYmUgZW1pdHRlZC4gKi9cbiAgX2VtaXRDaGlwRW5kKGV2ZW50PzogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICghdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgJiYgISFldmVudCkge1xuICAgICAgdGhpcy5fY2hpcExpc3QuX2tleWRvd24oZXZlbnQpO1xuICAgIH1cblxuICAgIGlmICghZXZlbnQgfHwgdGhpcy5faXNTZXBhcmF0b3JLZXkoZXZlbnQpKSB7XG4gICAgICB0aGlzLmNoaXBFbmQuZW1pdCh7XG4gICAgICAgIGlucHV0OiB0aGlzLmlucHV0RWxlbWVudCxcbiAgICAgICAgdmFsdWU6IHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlLFxuICAgICAgICBjaGlwSW5wdXQ6IHRoaXMsXG4gICAgICB9KTtcblxuICAgICAgZXZlbnQ/LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgX29uSW5wdXQoKSB7XG4gICAgLy8gTGV0IGNoaXAgbGlzdCBrbm93IHdoZW5ldmVyIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgIHRoaXMuX2NoaXBMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgaW5wdXQuICovXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5mb2N1cyhvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBDbGVhcnMgdGhlIGlucHV0ICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhIGtleWNvZGUgaXMgb25lIG9mIHRoZSBjb25maWd1cmVkIHNlcGFyYXRvcnMuICovXG4gIHByaXZhdGUgX2lzU2VwYXJhdG9yS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgcmV0dXJuICFoYXNNb2RpZmllcktleShldmVudCkgJiYgbmV3IFNldCh0aGlzLnNlcGFyYXRvcktleUNvZGVzKS5oYXMoZXZlbnQua2V5Q29kZSk7XG4gIH1cbn1cbiJdfQ==