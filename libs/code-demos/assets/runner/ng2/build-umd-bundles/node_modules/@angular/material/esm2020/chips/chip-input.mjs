/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, hasModifierKey } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output, } from '@angular/core';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material/form-field';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './tokens';
import { MatChipGrid } from './chip-grid';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/form-field";
// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of a `<mat-chip-grid>`.
 */
export class MatChipInput {
    constructor(_elementRef, _defaultOptions, formField) {
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
        this.id = `mat-mdc-chip-list-input-${nextUniqueId++}`;
        this._disabled = false;
        this.inputElement = this._elementRef.nativeElement;
        if (formField) {
            this.inputElement.classList.add('mat-mdc-form-field-input-control');
        }
    }
    /** Register input for chip list */
    set chipGrid(value) {
        if (value) {
            this._chipGrid = value;
            this._chipGrid.registerInput(this);
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
        return this._disabled || (this._chipGrid && this._chipGrid.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /** Whether the input is empty. */
    get empty() {
        return !this.inputElement.value;
    }
    ngOnChanges() {
        this._chipGrid.stateChanges.next();
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
            // To prevent the user from accidentally deleting chips when pressing BACKSPACE continuously,
            // We focus the last chip on backspace only after the user has released the backspace button,
            // And the input is empty (see behaviour in _keyup)
            if (event.keyCode === BACKSPACE && this._focusLastChipOnBackspace) {
                this._chipGrid._focusLastChip();
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
        if (!this._chipGrid.focused) {
            this._chipGrid._blur();
        }
        this._chipGrid.stateChanges.next();
    }
    _focus() {
        this.focused = true;
        this._focusLastChipOnBackspace = this.empty;
        this._chipGrid.stateChanges.next();
    }
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    _emitChipEnd(event) {
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
        this._chipGrid.stateChanges.next();
    }
    /** Focuses the input. */
    focus() {
        this.inputElement.focus();
    }
    /** Clears the input */
    clear() {
        this.inputElement.value = '';
        this._focusLastChipOnBackspace = true;
    }
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /** Checks whether a keycode is one of the configured separators. */
    _isSeparatorKey(event) {
        return !hasModifierKey(event) && new Set(this.separatorKeyCodes).has(event.keyCode);
    }
}
MatChipInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatChipInput, deps: [{ token: i0.ElementRef }, { token: MAT_CHIPS_DEFAULT_OPTIONS }, { token: MAT_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatChipInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatChipInput, selector: "input[matChipInputFor]", inputs: { chipGrid: ["matChipInputFor", "chipGrid"], addOnBlur: ["matChipInputAddOnBlur", "addOnBlur"], separatorKeyCodes: ["matChipInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", id: "id", disabled: "disabled" }, outputs: { chipEnd: "matChipInputTokenEnd" }, host: { listeners: { "keydown": "_keydown($event)", "keyup": "_keyup($event)", "blur": "_blur()", "focus": "_focus()", "input": "_onInput()" }, properties: { "id": "id", "attr.disabled": "disabled || null", "attr.placeholder": "placeholder || null", "attr.aria-invalid": "_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-required": "_chipGrid && _chipGrid.required || null", "attr.required": "_chipGrid && _chipGrid.required || null" }, classAttribute: "mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element" }, exportAs: ["matChipInput", "matChipInputFor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatChipInput, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[matChipInputFor]',
                    exportAs: 'matChipInput, matChipInputFor',
                    host: {
                        // TODO: eventually we should remove `mat-input-element` from here since it comes from the
                        // non-MDC version of the input. It's currently being kept for backwards compatibility, because
                        // the MDC chips were landed initially with it.
                        'class': 'mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element',
                        '(keydown)': '_keydown($event)',
                        '(keyup)': '_keyup($event)',
                        '(blur)': '_blur()',
                        '(focus)': '_focus()',
                        '(input)': '_onInput()',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.placeholder]': 'placeholder || null',
                        '[attr.aria-invalid]': '_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-required]': '_chipGrid && _chipGrid.required || null',
                        '[attr.required]': '_chipGrid && _chipGrid.required || null',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_CHIPS_DEFAULT_OPTIONS]
                }] }, { type: i1.MatFormField, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_FORM_FIELD]
                }] }]; }, propDecorators: { chipGrid: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jaGlwcy9jaGlwLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEUsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBeUIseUJBQXlCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDM0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7O0FBbUJ4QyxnREFBZ0Q7QUFDaEQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCOzs7R0FHRztBQXVCSCxNQUFNLE9BQU8sWUFBWTtJQXFFdkIsWUFDWSxXQUF5QyxFQUNSLGVBQXVDLEVBQzlDLFNBQXdCO1FBRmxELGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQUNSLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQWhFcEYsc0NBQXNDO1FBQ3RDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFzQnpCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUI7Ozs7V0FJRztRQUVILHNCQUFpQixHQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFFekMsMENBQTBDO1FBRWpDLFlBQU8sR0FBb0MsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFFMUYsb0NBQW9DO1FBQzNCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBRWxDLCtCQUEr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LE1BQU07dUJBQUMsc0JBQXNCO2dCQUlyQixXQUFXO3NCQUFuQixLQUFLO2dCQUdHLEVBQUU7c0JBQVYsS0FBSztnQkFJRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QkFDS1NQQUNFLCBoYXNNb2RpZmllcktleX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZCwgTUFUX0ZPUk1fRklFTER9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHtNYXRDaGlwc0RlZmF1bHRPcHRpb25zLCBNQVRfQ0hJUFNfREVGQVVMVF9PUFRJT05TfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQge01hdENoaXBHcmlkfSBmcm9tICcuL2NoaXAtZ3JpZCc7XG5pbXBvcnQge01hdENoaXBUZXh0Q29udHJvbH0gZnJvbSAnLi9jaGlwLXRleHQtY29udHJvbCc7XG5cbi8qKiBSZXByZXNlbnRzIGFuIGlucHV0IGV2ZW50IG9uIGEgYG1hdENoaXBJbnB1dGAuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdENoaXBJbnB1dEV2ZW50IHtcbiAgLyoqXG4gICAqIFRoZSBuYXRpdmUgYDxpbnB1dD5gIGVsZW1lbnQgdGhhdCB0aGUgZXZlbnQgaXMgYmVpbmcgZmlyZWQgZm9yLlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYE1hdENoaXBJbnB1dEV2ZW50I2NoaXBJbnB1dC5pbnB1dEVsZW1lbnRgIGluc3RlYWQuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTMuMC4wIFRoaXMgcHJvcGVydHkgd2lsbCBiZSByZW1vdmVkLlxuICAgKi9cbiAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuICovXG4gIHZhbHVlOiBzdHJpbmc7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY2hpcCBpbnB1dCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICBjaGlwSW5wdXQ6IE1hdENoaXBJbnB1dDtcbn1cblxuLy8gSW5jcmVhc2luZyBpbnRlZ2VyIGZvciBnZW5lcmF0aW5nIHVuaXF1ZSBpZHMuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBhZGRzIGNoaXAtc3BlY2lmaWMgYmVoYXZpb3JzIHRvIGFuIGlucHV0IGVsZW1lbnQgaW5zaWRlIGA8bWF0LWZvcm0tZmllbGQ+YC5cbiAqIE1heSBiZSBwbGFjZWQgaW5zaWRlIG9yIG91dHNpZGUgb2YgYSBgPG1hdC1jaGlwLWdyaWQ+YC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbbWF0Q2hpcElucHV0Rm9yXScsXG4gIGV4cG9ydEFzOiAnbWF0Q2hpcElucHV0LCBtYXRDaGlwSW5wdXRGb3InLFxuICBob3N0OiB7XG4gICAgLy8gVE9ETzogZXZlbnR1YWxseSB3ZSBzaG91bGQgcmVtb3ZlIGBtYXQtaW5wdXQtZWxlbWVudGAgZnJvbSBoZXJlIHNpbmNlIGl0IGNvbWVzIGZyb20gdGhlXG4gICAgLy8gbm9uLU1EQyB2ZXJzaW9uIG9mIHRoZSBpbnB1dC4gSXQncyBjdXJyZW50bHkgYmVpbmcga2VwdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHksIGJlY2F1c2VcbiAgICAvLyB0aGUgTURDIGNoaXBzIHdlcmUgbGFuZGVkIGluaXRpYWxseSB3aXRoIGl0LlxuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtaW5wdXQgbWF0LW1kYy1pbnB1dC1lbGVtZW50IG1kYy10ZXh0LWZpZWxkX19pbnB1dCBtYXQtaW5wdXQtZWxlbWVudCcsXG4gICAgJyhrZXlkb3duKSc6ICdfa2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGtleXVwKSc6ICdfa2V5dXAoJGV2ZW50KScsXG4gICAgJyhibHVyKSc6ICdfYmx1cigpJyxcbiAgICAnKGZvY3VzKSc6ICdfZm9jdXMoKScsXG4gICAgJyhpbnB1dCknOiAnX29uSW5wdXQoKScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlciB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdfY2hpcEdyaWQgJiYgX2NoaXBHcmlkLm5nQ29udHJvbCA/IF9jaGlwR3JpZC5uZ0NvbnRyb2wuaW52YWxpZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XSc6ICdfYXJpYURlc2NyaWJlZGJ5IHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdfY2hpcEdyaWQgJiYgX2NoaXBHcmlkLnJlcXVpcmVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5yZXF1aXJlZF0nOiAnX2NoaXBHcmlkICYmIF9jaGlwR3JpZC5yZXF1aXJlZCB8fCBudWxsJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcElucHV0IGltcGxlbWVudHMgTWF0Q2hpcFRleHRDb250cm9sLCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBVc2VkIHRvIHByZXZlbnQgZm9jdXMgbW92aW5nIHRvIGNoaXBzIHdoaWxlIHVzZXIgaXMgaG9sZGluZyBiYWNrc3BhY2UgKi9cbiAgcHJpdmF0ZSBfZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlOiBib29sZWFuO1xuXG4gIC8qKiBWYWx1ZSBmb3IgYXJpYURlc2NyaWJlZGJ5IHByb3BlcnR5ICovXG4gIF9hcmlhRGVzY3JpYmVkYnk/OiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZm9jdXNlZC4gKi9cbiAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBfY2hpcEdyaWQ6IE1hdENoaXBHcmlkO1xuXG4gIC8qKiBSZWdpc3RlciBpbnB1dCBmb3IgY2hpcCBsaXN0ICovXG4gIEBJbnB1dCgnbWF0Q2hpcElucHV0Rm9yJylcbiAgc2V0IGNoaXBHcmlkKHZhbHVlOiBNYXRDaGlwR3JpZCkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fY2hpcEdyaWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2NoaXBHcmlkLnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSBjaGlwRW5kIGV2ZW50IHdpbGwgYmUgZW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBpcyBibHVycmVkLlxuICAgKi9cbiAgQElucHV0KCdtYXRDaGlwSW5wdXRBZGRPbkJsdXInKVxuICBnZXQgYWRkT25CbHVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hZGRPbkJsdXI7XG4gIH1cbiAgc2V0IGFkZE9uQmx1cih2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fYWRkT25CbHVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfYWRkT25CbHVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIGtleSBjb2RlcyB0aGF0IHdpbGwgdHJpZ2dlciBhIGNoaXBFbmQgZXZlbnQuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGBbRU5URVJdYC5cbiAgICovXG4gIEBJbnB1dCgnbWF0Q2hpcElucHV0U2VwYXJhdG9yS2V5Q29kZXMnKVxuICBzZXBhcmF0b3JLZXlDb2RlczogcmVhZG9ubHkgbnVtYmVyW10gfCBSZWFkb25seVNldDxudW1iZXI+ID1cbiAgICB0aGlzLl9kZWZhdWx0T3B0aW9ucy5zZXBhcmF0b3JLZXlDb2RlcztcblxuICAvKiogRW1pdHRlZCB3aGVuIGEgY2hpcCBpcyB0byBiZSBhZGRlZC4gKi9cbiAgQE91dHB1dCgnbWF0Q2hpcElucHV0VG9rZW5FbmQnKVxuICByZWFkb25seSBjaGlwRW5kOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcElucHV0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwSW5wdXRFdmVudD4oKTtcblxuICAvKiogVGhlIGlucHV0J3MgcGxhY2Vob2xkZXIgdGV4dC4gKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBVbmlxdWUgaWQgZm9yIHRoZSBpbnB1dC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWNoaXAtbGlzdC1pbnB1dC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLl9jaGlwR3JpZCAmJiB0aGlzLl9jaGlwR3JpZC5kaXNhYmxlZCk7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZW1wdHkuICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaW5wdXRFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCB0byB3aGljaCB0aGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZC4gKi9cbiAgcmVhZG9ubHkgaW5wdXRFbGVtZW50ITogSFRNTElucHV0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgQEluamVjdChNQVRfQ0hJUFNfREVGQVVMVF9PUFRJT05TKSBwcml2YXRlIF9kZWZhdWx0T3B0aW9uczogTWF0Q2hpcHNEZWZhdWx0T3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9GT1JNX0ZJRUxEKSBmb3JtRmllbGQ/OiBNYXRGb3JtRmllbGQsXG4gICkge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBpZiAoZm9ybUZpZWxkKSB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLWZvcm0tZmllbGQtaW5wdXQtY29udHJvbCcpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuX2NoaXBHcmlkLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoaXBFbmQuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9mb2N1c0xhc3RDaGlwT25CYWNrc3BhY2UgPSB0aGlzLmVtcHR5O1xuICB9XG5cbiAgLyoqIFV0aWxpdHkgbWV0aG9kIHRvIG1ha2UgaG9zdCBkZWZpbml0aW9uL3Rlc3RzIG1vcmUgY2xlYXIuICovXG4gIF9rZXlkb3duKGV2ZW50PzogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgLy8gVG8gcHJldmVudCB0aGUgdXNlciBmcm9tIGFjY2lkZW50YWxseSBkZWxldGluZyBjaGlwcyB3aGVuIHByZXNzaW5nIEJBQ0tTUEFDRSBjb250aW51b3VzbHksXG4gICAgICAvLyBXZSBmb2N1cyB0aGUgbGFzdCBjaGlwIG9uIGJhY2tzcGFjZSBvbmx5IGFmdGVyIHRoZSB1c2VyIGhhcyByZWxlYXNlZCB0aGUgYmFja3NwYWNlIGJ1dHRvbixcbiAgICAgIC8vIEFuZCB0aGUgaW5wdXQgaXMgZW1wdHkgKHNlZSBiZWhhdmlvdXIgaW4gX2tleXVwKVxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEJBQ0tTUEFDRSAmJiB0aGlzLl9mb2N1c0xhc3RDaGlwT25CYWNrc3BhY2UpIHtcbiAgICAgICAgdGhpcy5fY2hpcEdyaWQuX2ZvY3VzTGFzdENoaXAoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdENoaXBFbmQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgZXZlbnRzIHRvIHRoZSBrZXlib2FyZCBtYW5hZ2VyLiBBdmFpbGFibGUgaGVyZSBmb3IgdGVzdHMuXG4gICAqL1xuICBfa2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBBbGxvdyB1c2VyIHRvIG1vdmUgZm9jdXMgdG8gY2hpcHMgbmV4dCB0aW1lIGhlIHByZXNzZXMgYmFja3NwYWNlXG4gICAgaWYgKCF0aGlzLl9mb2N1c0xhc3RDaGlwT25CYWNrc3BhY2UgJiYgZXZlbnQua2V5Q29kZSA9PT0gQkFDS1NQQUNFICYmIHRoaXMuZW1wdHkpIHtcbiAgICAgIHRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSA9IHRydWU7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBibHVyIHNob3VsZCBlbWl0IHRoZSAoY2hpcEVuZCkgZXZlbnQuICovXG4gIF9ibHVyKCkge1xuICAgIGlmICh0aGlzLmFkZE9uQmx1cikge1xuICAgICAgdGhpcy5fZW1pdENoaXBFbmQoKTtcbiAgICB9XG4gICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgLy8gQmx1ciB0aGUgY2hpcCBsaXN0IGlmIGl0IGlzIG5vdCBmb2N1c2VkXG4gICAgaWYgKCF0aGlzLl9jaGlwR3JpZC5mb2N1c2VkKSB7XG4gICAgICB0aGlzLl9jaGlwR3JpZC5fYmx1cigpO1xuICAgIH1cbiAgICB0aGlzLl9jaGlwR3JpZC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgX2ZvY3VzKCkge1xuICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gdGhpcy5lbXB0eTtcbiAgICB0aGlzLl9jaGlwR3JpZC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIChjaGlwRW5kKSBldmVudCBuZWVkcyB0byBiZSBlbWl0dGVkLiAqL1xuICBfZW1pdENoaXBFbmQoZXZlbnQ/OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCFldmVudCB8fCB0aGlzLl9pc1NlcGFyYXRvcktleShldmVudCkpIHtcbiAgICAgIHRoaXMuY2hpcEVuZC5lbWl0KHtcbiAgICAgICAgaW5wdXQ6IHRoaXMuaW5wdXRFbGVtZW50LFxuICAgICAgICB2YWx1ZTogdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUsXG4gICAgICAgIGNoaXBJbnB1dDogdGhpcyxcbiAgICAgIH0pO1xuXG4gICAgICBldmVudD8ucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBfb25JbnB1dCgpIHtcbiAgICAvLyBMZXQgY2hpcCBsaXN0IGtub3cgd2hlbmV2ZXIgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgdGhpcy5fY2hpcEdyaWQuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBDbGVhcnMgdGhlIGlucHV0ICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gdHJ1ZTtcbiAgfVxuXG4gIHNldERlc2NyaWJlZEJ5SWRzKGlkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICB0aGlzLl9hcmlhRGVzY3JpYmVkYnkgPSBpZHMuam9pbignICcpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGEga2V5Y29kZSBpcyBvbmUgb2YgdGhlIGNvbmZpZ3VyZWQgc2VwYXJhdG9ycy4gKi9cbiAgcHJpdmF0ZSBfaXNTZXBhcmF0b3JLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICByZXR1cm4gIWhhc01vZGlmaWVyS2V5KGV2ZW50KSAmJiBuZXcgU2V0KHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMpLmhhcyhldmVudC5rZXlDb2RlKTtcbiAgfVxufVxuIl19