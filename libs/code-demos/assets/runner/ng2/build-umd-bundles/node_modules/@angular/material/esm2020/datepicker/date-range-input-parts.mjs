/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Optional, inject, InjectionToken, Inject, Injector, } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgForm, FormGroupDirective, NgControl, Validators, } from '@angular/forms';
import { mixinErrorState, MAT_DATE_FORMATS, DateAdapter, ErrorStateMatcher, } from '@angular/material/core';
import { Directionality } from '@angular/cdk/bidi';
import { BACKSPACE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { MatDatepickerInputBase } from './datepicker-input-base';
import { DateRange } from './date-selection-model';
import { _computeAriaAccessibleName } from './aria-accessible-name';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/core";
import * as i2 from "@angular/forms";
/**
 * Used to provide the date range input wrapper component
 * to the parts without circular dependencies.
 */
export const MAT_DATE_RANGE_INPUT_PARENT = new InjectionToken('MAT_DATE_RANGE_INPUT_PARENT');
/**
 * Base class for the individual inputs that can be projected inside a `mat-date-range-input`.
 */
class MatDateRangeInputPartBase extends MatDatepickerInputBase {
    constructor(_rangeInput, _elementRef, _defaultErrorStateMatcher, _injector, _parentForm, _parentFormGroup, dateAdapter, dateFormats) {
        super(_elementRef, dateAdapter, dateFormats);
        this._rangeInput = _rangeInput;
        this._elementRef = _elementRef;
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._injector = _injector;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this._dir = inject(Directionality, { optional: true });
    }
    ngOnInit() {
        // We need the date input to provide itself as a `ControlValueAccessor` and a `Validator`, while
        // injecting its `NgControl` so that the error state is handled correctly. This introduces a
        // circular dependency, because both `ControlValueAccessor` and `Validator` depend on the input
        // itself. Usually we can work around it for the CVA, but there's no API to do it for the
        // validator. We work around it here by injecting the `NgControl` in `ngOnInit`, after
        // everything has been resolved.
        // tslint:disable-next-line:no-bitwise
        const ngControl = this._injector.get(NgControl, null, { optional: true, self: true });
        if (ngControl) {
            this.ngControl = ngControl;
        }
    }
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }
    /** Gets whether the input is empty. */
    isEmpty() {
        return this._elementRef.nativeElement.value.length === 0;
    }
    /** Gets the placeholder of the input. */
    _getPlaceholder() {
        return this._elementRef.nativeElement.placeholder;
    }
    /** Focuses the input. */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /** Handles `input` events on the input element. */
    _onInput(value) {
        super._onInput(value);
        this._rangeInput._handleChildValueChange();
    }
    /** Opens the datepicker associated with the input. */
    _openPopup() {
        this._rangeInput._openDatepicker();
    }
    /** Gets the minimum date from the range input. */
    _getMinDate() {
        return this._rangeInput.min;
    }
    /** Gets the maximum date from the range input. */
    _getMaxDate() {
        return this._rangeInput.max;
    }
    /** Gets the date filter function from the range input. */
    _getDateFilter() {
        return this._rangeInput.dateFilter;
    }
    _parentDisabled() {
        return this._rangeInput._groupDisabled;
    }
    _shouldHandleChangeEvent({ source }) {
        return source !== this._rangeInput._startInput && source !== this._rangeInput._endInput;
    }
    _assignValueProgrammatically(value) {
        super._assignValueProgrammatically(value);
        const opposite = (this === this._rangeInput._startInput
            ? this._rangeInput._endInput
            : this._rangeInput._startInput);
        opposite?._validatorOnChange();
    }
    /** return the ARIA accessible name of the input element */
    _getAccessibleName() {
        return _computeAriaAccessibleName(this._elementRef.nativeElement);
    }
}
MatDateRangeInputPartBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDateRangeInputPartBase, deps: [{ token: MAT_DATE_RANGE_INPUT_PARENT }, { token: i0.ElementRef }, { token: i1.ErrorStateMatcher }, { token: i0.Injector }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i1.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatDateRangeInputPartBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDateRangeInputPartBase, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDateRangeInputPartBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DATE_RANGE_INPUT_PARENT]
                }] }, { type: i0.ElementRef }, { type: i1.ErrorStateMatcher }, { type: i0.Injector }, { type: i2.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i1.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DATE_FORMATS]
                }] }]; } });
const _MatDateRangeInputBase = mixinErrorState(MatDateRangeInputPartBase);
/** Input for entering the start date in a `mat-date-range-input`. */
export class MatStartDate extends _MatDateRangeInputBase {
    constructor(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup, dateAdapter, dateFormats) {
        super(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup, dateAdapter, dateFormats);
        /** Validator that checks that the start date isn't after the end date. */
        this._startValidator = (control) => {
            const start = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            const end = this._model ? this._model.selection.end : null;
            return !start || !end || this._dateAdapter.compareDate(start, end) <= 0
                ? null
                : { 'matStartDateInvalid': { 'end': end, 'actual': start } };
        };
        this._validator = Validators.compose([...super._getValidators(), this._startValidator]);
    }
    _getValueFromModel(modelValue) {
        return modelValue.start;
    }
    _shouldHandleChangeEvent(change) {
        if (!super._shouldHandleChangeEvent(change)) {
            return false;
        }
        else {
            return !change.oldValue?.start
                ? !!change.selection.start
                : !change.selection.start ||
                    !!this._dateAdapter.compareDate(change.oldValue.start, change.selection.start);
        }
    }
    _assignValueToModel(value) {
        if (this._model) {
            const range = new DateRange(value, this._model.selection.end);
            this._model.updateSelection(range, this);
        }
    }
    _formatValue(value) {
        super._formatValue(value);
        // Any time the input value is reformatted we need to tell the parent.
        this._rangeInput._handleChildValueChange();
    }
    /** Gets the value that should be used when mirroring the input's size. */
    getMirrorValue() {
        const element = this._elementRef.nativeElement;
        const value = element.value;
        return value.length > 0 ? value : element.placeholder;
    }
    _onKeydown(event) {
        const endInput = this._rangeInput._endInput;
        const element = this._elementRef.nativeElement;
        const isLtr = this._dir?.value !== 'rtl';
        // If the user hits RIGHT (LTR) when at the end of the input (and no
        // selection), move the cursor to the start of the end input.
        if (((event.keyCode === RIGHT_ARROW && isLtr) || (event.keyCode === LEFT_ARROW && !isLtr)) &&
            element.selectionStart === element.value.length &&
            element.selectionEnd === element.value.length) {
            event.preventDefault();
            endInput._elementRef.nativeElement.setSelectionRange(0, 0);
            endInput.focus();
        }
        else {
            super._onKeydown(event);
        }
    }
}
MatStartDate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatStartDate, deps: [{ token: MAT_DATE_RANGE_INPUT_PARENT }, { token: i0.ElementRef }, { token: i1.ErrorStateMatcher }, { token: i0.Injector }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i1.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatStartDate.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatStartDate, selector: "input[matStartDate]", inputs: { errorStateMatcher: "errorStateMatcher" }, outputs: { dateChange: "dateChange", dateInput: "dateInput" }, host: { attributes: { "type": "text" }, listeners: { "input": "_onInput($event.target.value)", "change": "_onChange()", "keydown": "_onKeydown($event)", "blur": "_onBlur()" }, properties: { "disabled": "disabled", "attr.aria-haspopup": "_rangeInput.rangePicker ? \"dialog\" : null", "attr.aria-owns": "(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null", "attr.min": "_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null", "attr.max": "_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null" }, classAttribute: "mat-start-date mat-date-range-input-inner" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: MatStartDate, multi: true },
        { provide: NG_VALIDATORS, useExisting: MatStartDate, multi: true },
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatStartDate, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[matStartDate]',
                    host: {
                        'class': 'mat-start-date mat-date-range-input-inner',
                        '[disabled]': 'disabled',
                        '(input)': '_onInput($event.target.value)',
                        '(change)': '_onChange()',
                        '(keydown)': '_onKeydown($event)',
                        '[attr.aria-haspopup]': '_rangeInput.rangePicker ? "dialog" : null',
                        '[attr.aria-owns]': '(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null',
                        '[attr.min]': '_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null',
                        '[attr.max]': '_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null',
                        '(blur)': '_onBlur()',
                        'type': 'text',
                    },
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: MatStartDate, multi: true },
                        { provide: NG_VALIDATORS, useExisting: MatStartDate, multi: true },
                    ],
                    // These need to be specified explicitly, because some tooling doesn't
                    // seem to pick them up from the base class. See #20932.
                    outputs: ['dateChange', 'dateInput'],
                    inputs: ['errorStateMatcher'],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DATE_RANGE_INPUT_PARENT]
                }] }, { type: i0.ElementRef }, { type: i1.ErrorStateMatcher }, { type: i0.Injector }, { type: i2.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i1.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DATE_FORMATS]
                }] }]; } });
/** Input for entering the end date in a `mat-date-range-input`. */
export class MatEndDate extends _MatDateRangeInputBase {
    constructor(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup, dateAdapter, dateFormats) {
        super(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup, dateAdapter, dateFormats);
        /** Validator that checks that the end date isn't before the start date. */
        this._endValidator = (control) => {
            const end = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            const start = this._model ? this._model.selection.start : null;
            return !end || !start || this._dateAdapter.compareDate(end, start) >= 0
                ? null
                : { 'matEndDateInvalid': { 'start': start, 'actual': end } };
        };
        this._validator = Validators.compose([...super._getValidators(), this._endValidator]);
    }
    _getValueFromModel(modelValue) {
        return modelValue.end;
    }
    _shouldHandleChangeEvent(change) {
        if (!super._shouldHandleChangeEvent(change)) {
            return false;
        }
        else {
            return !change.oldValue?.end
                ? !!change.selection.end
                : !change.selection.end ||
                    !!this._dateAdapter.compareDate(change.oldValue.end, change.selection.end);
        }
    }
    _assignValueToModel(value) {
        if (this._model) {
            const range = new DateRange(this._model.selection.start, value);
            this._model.updateSelection(range, this);
        }
    }
    _onKeydown(event) {
        const startInput = this._rangeInput._startInput;
        const element = this._elementRef.nativeElement;
        const isLtr = this._dir?.value !== 'rtl';
        // If the user is pressing backspace on an empty end input, move focus back to the start.
        if (event.keyCode === BACKSPACE && !element.value) {
            startInput.focus();
        }
        // If the user hits LEFT (LTR) when at the start of the input (and no
        // selection), move the cursor to the end of the start input.
        else if (((event.keyCode === LEFT_ARROW && isLtr) || (event.keyCode === RIGHT_ARROW && !isLtr)) &&
            element.selectionStart === 0 &&
            element.selectionEnd === 0) {
            event.preventDefault();
            const endPosition = startInput._elementRef.nativeElement.value.length;
            startInput._elementRef.nativeElement.setSelectionRange(endPosition, endPosition);
            startInput.focus();
        }
        else {
            super._onKeydown(event);
        }
    }
}
MatEndDate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatEndDate, deps: [{ token: MAT_DATE_RANGE_INPUT_PARENT }, { token: i0.ElementRef }, { token: i1.ErrorStateMatcher }, { token: i0.Injector }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i1.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatEndDate.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatEndDate, selector: "input[matEndDate]", inputs: { errorStateMatcher: "errorStateMatcher" }, outputs: { dateChange: "dateChange", dateInput: "dateInput" }, host: { attributes: { "type": "text" }, listeners: { "input": "_onInput($event.target.value)", "change": "_onChange()", "keydown": "_onKeydown($event)", "blur": "_onBlur()" }, properties: { "disabled": "disabled", "attr.aria-haspopup": "_rangeInput.rangePicker ? \"dialog\" : null", "attr.aria-owns": "(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null", "attr.min": "_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null", "attr.max": "_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null" }, classAttribute: "mat-end-date mat-date-range-input-inner" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: MatEndDate, multi: true },
        { provide: NG_VALIDATORS, useExisting: MatEndDate, multi: true },
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatEndDate, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[matEndDate]',
                    host: {
                        'class': 'mat-end-date mat-date-range-input-inner',
                        '[disabled]': 'disabled',
                        '(input)': '_onInput($event.target.value)',
                        '(change)': '_onChange()',
                        '(keydown)': '_onKeydown($event)',
                        '[attr.aria-haspopup]': '_rangeInput.rangePicker ? "dialog" : null',
                        '[attr.aria-owns]': '(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null',
                        '[attr.min]': '_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null',
                        '[attr.max]': '_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null',
                        '(blur)': '_onBlur()',
                        'type': 'text',
                    },
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: MatEndDate, multi: true },
                        { provide: NG_VALIDATORS, useExisting: MatEndDate, multi: true },
                    ],
                    // These need to be specified explicitly, because some tooling doesn't
                    // seem to pick them up from the base class. See #20932.
                    outputs: ['dateChange', 'dateInput'],
                    inputs: ['errorStateMatcher'],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DATE_RANGE_INPUT_PARENT]
                }] }, { type: i0.ElementRef }, { type: i1.ErrorStateMatcher }, { type: i0.Injector }, { type: i2.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i1.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DATE_FORMATS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1pbnB1dC1wYXJ0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9kYXRlcGlja2VyL2RhdGUtcmFuZ2UtaW5wdXQtcGFydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixjQUFjLEVBQ2QsTUFBTSxFQUVOLFFBQVEsR0FFVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLFNBQVMsRUFFVCxVQUFVLEdBR1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBRUwsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixXQUFXLEVBRVgsaUJBQWlCLEdBQ2xCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxzQkFBc0IsRUFBZSxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBQyxTQUFTLEVBQTJCLE1BQU0sd0JBQXdCLENBQUM7QUFDM0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFtQmxFOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLElBQUksY0FBYyxDQUMzRCw2QkFBNkIsQ0FDOUIsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFDZSx5QkFDYixTQUFRLHNCQUFvQztJQWtCNUMsWUFDOEMsV0FBdUMsRUFDbkUsV0FBeUMsRUFDbEQseUJBQTRDLEVBQzNDLFNBQW1CLEVBQ1IsV0FBbUIsRUFDbkIsZ0JB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S0FBSyxFQUFFLElBQUksRUFBQztRQUNsRSxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO0tBQy9EO2dHQU1VLFVBQVU7a0JBeEJ0QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUseUNBQXlDO3dCQUNsRCxZQUFZLEVBQUUsVUFBVTt3QkFDeEIsU0FBUyxFQUFFLCtCQUErQjt3QkFDMUMsVUFBVSxFQUFFLGFBQWE7d0JBQ3pCLFdBQVcsRUFBRSxvQkFBb0I7d0JBQ2pDLHNCQUFzQixFQUFFLDJDQUEyQzt3QkFDbkUsa0JBQWtCLEVBQUUseUVBQXlFO3dCQUM3RixZQUFZLEVBQUUsOERBQThEO3dCQUM1RSxZQUFZLEVBQUUsOERBQThEO3dCQUM1RSxRQUFRLEVBQUUsV0FBVzt3QkFDckIsTUFBTSxFQUFFLE1BQU07cUJBQ2Y7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7d0JBQ2xFLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLFlBQVksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO3FCQUMvRDtvQkFDRCxzRUFBc0U7b0JBQ3RFLHdEQUF3RDtvQkFDeEQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztvQkFDcEMsTUFBTSxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQzlCOzswQkFZSSxNQUFNOzJCQUFDLDJCQUEyQjs7MEJBSWxDLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT3B0aW9uYWwsXG4gIGluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdCxcbiAgT25Jbml0LFxuICBJbmplY3RvcixcbiAgRG9DaGVjayxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgTkdfVkFMSURBVE9SUyxcbiAgTmdGb3JtLFxuICBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gIE5nQ29udHJvbCxcbiAgVmFsaWRhdG9yRm4sXG4gIFZhbGlkYXRvcnMsXG4gIEFic3RyYWN0Q29udHJvbCxcbiAgVmFsaWRhdGlvbkVycm9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQ2FuVXBkYXRlRXJyb3JTdGF0ZSxcbiAgbWl4aW5FcnJvclN0YXRlLFxuICBNQVRfREFURV9GT1JNQVRTLFxuICBEYXRlQWRhcHRlcixcbiAgTWF0RGF0ZUZvcm1hdHMsXG4gIEVycm9yU3RhdGVNYXRjaGVyLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7QkFDS1NQQUNFLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPV30gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7TWF0RGF0ZXBpY2tlcklucHV0QmFzZSwgRGF0ZUZpbHRlckZufSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQtYmFzZSc7XG5pbXBvcnQge0RhdGVSYW5nZSwgRGF0ZVNlbGVjdGlvbk1vZGVsQ2hhbmdlfSBmcm9tICcuL2RhdGUtc2VsZWN0aW9uLW1vZGVsJztcbmltcG9ydCB7X2NvbXB1dGVBcmlhQWNjZXNzaWJsZU5hbWV9IGZyb20gJy4vYXJpYS1hY2Nlc3NpYmxlLW5hbWUnO1xuXG4vKiogUGFyZW50IGNvbXBvbmVudCB0aGF0IHNob3VsZCBiZSB3cmFwcGVkIGFyb3VuZCBgTWF0U3RhcnREYXRlYCBhbmQgYE1hdEVuZERhdGVgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXREYXRlUmFuZ2VJbnB1dFBhcmVudDxEPiB7XG4gIGlkOiBzdHJpbmc7XG4gIG1pbjogRCB8IG51bGw7XG4gIG1heDogRCB8IG51bGw7XG4gIGRhdGVGaWx0ZXI6IERhdGVGaWx0ZXJGbjxEPjtcbiAgcmFuZ2VQaWNrZXI6IHtcbiAgICBvcGVuZWQ6IGJvb2xlYW47XG4gICAgaWQ6IHN0cmluZztcbiAgfTtcbiAgX3N0YXJ0SW5wdXQ6IE1hdERhdGVSYW5nZUlucHV0UGFydEJhc2U8RD47XG4gIF9lbmRJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJ0QmFzZTxEPjtcbiAgX2dyb3VwRGlzYWJsZWQ6IGJvb2xlYW47XG4gIF9oYW5kbGVDaGlsZFZhbHVlQ2hhbmdlKCk6IHZvaWQ7XG4gIF9vcGVuRGF0ZXBpY2tlcigpOiB2b2lkO1xufVxuXG4vKipcbiAqIFVzZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSByYW5nZSBpbnB1dCB3cmFwcGVyIGNvbXBvbmVudFxuICogdG8gdGhlIHBhcnRzIHdpdGhvdXQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICovXG5leHBvcnQgY29uc3QgTUFUX0RBVEVfUkFOR0VfSU5QVVRfUEFSRU5UID0gbmV3IEluamVjdGlvblRva2VuPE1hdERhdGVSYW5nZUlucHV0UGFyZW50PHVua25vd24+PihcbiAgJ01BVF9EQVRFX1JBTkdFX0lOUFVUX1BBUkVOVCcsXG4pO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIHRoZSBpbmRpdmlkdWFsIGlucHV0cyB0aGF0IGNhbiBiZSBwcm9qZWN0ZWQgaW5zaWRlIGEgYG1hdC1kYXRlLXJhbmdlLWlucHV0YC5cbiAqL1xuQERpcmVjdGl2ZSgpXG5hYnN0cmFjdCBjbGFzcyBNYXREYXRlUmFuZ2VJbnB1dFBhcnRCYXNlPEQ+XG4gIGV4dGVuZHMgTWF0RGF0ZXBpY2tlcklucHV0QmFzZTxEYXRlUmFuZ2U8RD4+XG4gIGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrXG57XG4gIC8qKlxuICAgKiBGb3JtIGNvbnRyb2wgYm91bmQgdG8gdGhpcyBpbnB1dCBwYXJ0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBuZ0NvbnRyb2w6IE5nQ29udHJvbDtcblxuICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICBhYnN0cmFjdCB1cGRhdGVFcnJvclN0YXRlKCk6IHZvaWQ7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IG92ZXJyaWRlIF92YWxpZGF0b3I6IFZhbGlkYXRvckZuIHwgbnVsbDtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IG92ZXJyaWRlIF9hc3NpZ25WYWx1ZVRvTW9kZWwodmFsdWU6IEQgfCBudWxsKTogdm9pZDtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IG92ZXJyaWRlIF9nZXRWYWx1ZUZyb21Nb2RlbChtb2RlbFZhbHVlOiBEYXRlUmFuZ2U8RD4pOiBEIHwgbnVsbDtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2RpciA9IGluamVjdChEaXJlY3Rpb25hbGl0eSwge29wdGlvbmFsOiB0cnVlfSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChNQVRfREFURV9SQU5HRV9JTlBVVF9QQVJFTlQpIHB1YmxpYyBfcmFuZ2VJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJlbnQ8RD4sXG4gICAgcHVibGljIG92ZXJyaWRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgIHB1YmxpYyBfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBAT3B0aW9uYWwoKSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURV9GT1JNQVRTKSBkYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHMsXG4gICkge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmLCBkYXRlQWRhcHRlciwgZGF0ZUZvcm1hdHMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gV2UgbmVlZCB0aGUgZGF0ZSBpbnB1dCB0byBwcm92aWRlIGl0c2VsZiBhcyBhIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAgYW5kIGEgYFZhbGlkYXRvcmAsIHdoaWxlXG4gICAgLy8gaW5qZWN0aW5nIGl0cyBgTmdDb250cm9sYCBzbyB0aGF0IHRoZSBlcnJvciBzdGF0ZSBpcyBoYW5kbGVkIGNvcnJlY3RseS4gVGhpcyBpbnRyb2R1Y2VzIGFcbiAgICAvLyBjaXJjdWxhciBkZXBlbmRlbmN5LCBiZWNhdXNlIGJvdGggYENvbnRyb2xWYWx1ZUFjY2Vzc29yYCBhbmQgYFZhbGlkYXRvcmAgZGVwZW5kIG9uIHRoZSBpbnB1dFxuICAgIC8vIGl0c2VsZi4gVXN1YWxseSB3ZSBjYW4gd29yayBhcm91bmQgaXQgZm9yIHRoZSBDVkEsIGJ1dCB0aGVyZSdzIG5vIEFQSSB0byBkbyBpdCBmb3IgdGhlXG4gICAgLy8gdmFsaWRhdG9yLiBXZSB3b3JrIGFyb3VuZCBpdCBoZXJlIGJ5IGluamVjdGluZyB0aGUgYE5nQ29udHJvbGAgaW4gYG5nT25Jbml0YCwgYWZ0ZXJcbiAgICAvLyBldmVyeXRoaW5nIGhhcyBiZWVuIHJlc29sdmVkLlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXG4gICAgY29uc3QgbmdDb250cm9sID0gdGhpcy5faW5qZWN0b3IuZ2V0KE5nQ29udHJvbCwgbnVsbCwge29wdGlvbmFsOiB0cnVlLCBzZWxmOiB0cnVlfSk7XG5cbiAgICBpZiAobmdDb250cm9sKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbCA9IG5nQ29udHJvbDtcbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIHJlLWV2YWx1YXRlIHRoaXMgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZVxuICAgICAgLy8gZXJyb3IgdHJpZ2dlcnMgdGhhdCB3ZSBjYW4ndCBzdWJzY3JpYmUgdG8gKGUuZy4gcGFyZW50IGZvcm0gc3VibWlzc2lvbnMpLiBUaGlzIG1lYW5zXG4gICAgICAvLyB0aGF0IHdoYXRldmVyIGxvZ2ljIGlzIGluIGhlcmUgaGFzIHRvIGJlIHN1cGVyIGxlYW4gb3Igd2UgcmlzayBkZXN0cm95aW5nIHRoZSBwZXJmb3JtYW5jZS5cbiAgICAgIHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGVtcHR5LiAqL1xuICBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHBsYWNlaG9sZGVyIG9mIHRoZSBpbnB1dC4gKi9cbiAgX2dldFBsYWNlaG9sZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGxhY2Vob2xkZXI7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgaW5wdXQuICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgYGlucHV0YCBldmVudHMgb24gdGhlIGlucHV0IGVsZW1lbnQuICovXG4gIG92ZXJyaWRlIF9vbklucHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBzdXBlci5fb25JbnB1dCh2YWx1ZSk7XG4gICAgdGhpcy5fcmFuZ2VJbnB1dC5faGFuZGxlQ2hpbGRWYWx1ZUNoYW5nZSgpO1xuICB9XG5cbiAgLyoqIE9wZW5zIHRoZSBkYXRlcGlja2VyIGFzc29jaWF0ZWQgd2l0aCB0aGUgaW5wdXQuICovXG4gIHByb3RlY3RlZCBfb3BlblBvcHVwKCk6IHZvaWQge1xuICAgIHRoaXMuX3JhbmdlSW5wdXQuX29wZW5EYXRlcGlja2VyKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWluaW11bSBkYXRlIGZyb20gdGhlIHJhbmdlIGlucHV0LiAqL1xuICBfZ2V0TWluRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VJbnB1dC5taW47XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWF4aW11bSBkYXRlIGZyb20gdGhlIHJhbmdlIGlucHV0LiAqL1xuICBfZ2V0TWF4RGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VJbnB1dC5tYXg7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgZGF0ZSBmaWx0ZXIgZnVuY3Rpb24gZnJvbSB0aGUgcmFuZ2UgaW5wdXQuICovXG4gIHByb3RlY3RlZCBfZ2V0RGF0ZUZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VJbnB1dC5kYXRlRmlsdGVyO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9wYXJlbnREaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VJbnB1dC5fZ3JvdXBEaXNhYmxlZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc2hvdWxkSGFuZGxlQ2hhbmdlRXZlbnQoe3NvdXJjZX06IERhdGVTZWxlY3Rpb25Nb2RlbENoYW5nZTxEYXRlUmFuZ2U8RD4+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNvdXJjZSAhPT0gdGhpcy5fcmFuZ2VJbnB1dC5fc3RhcnRJbnB1dCAmJiBzb3VyY2UgIT09IHRoaXMuX3JhbmdlSW5wdXQuX2VuZElucHV0O1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9hc3NpZ25WYWx1ZVByb2dyYW1tYXRpY2FsbHkodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgc3VwZXIuX2Fzc2lnblZhbHVlUHJvZ3JhbW1hdGljYWxseSh2YWx1ZSk7XG4gICAgY29uc3Qgb3Bwb3NpdGUgPSAoXG4gICAgICB0aGlzID09PSB0aGlzLl9yYW5nZUlucHV0Ll9zdGFydElucHV0XG4gICAgICAgID8gdGhpcy5fcmFuZ2VJbnB1dC5fZW5kSW5wdXRcbiAgICAgICAgOiB0aGlzLl9yYW5nZUlucHV0Ll9zdGFydElucHV0XG4gICAgKSBhcyBNYXREYXRlUmFuZ2VJbnB1dFBhcnRCYXNlPEQ+IHwgdW5kZWZpbmVkO1xuICAgIG9wcG9zaXRlPy5fdmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKiByZXR1cm4gdGhlIEFSSUEgYWNjZXNzaWJsZSBuYW1lIG9mIHRoZSBpbnB1dCBlbGVtZW50ICovXG4gIF9nZXRBY2Nlc3NpYmxlTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBfY29tcHV0ZUFyaWFBY2Nlc3NpYmxlTmFtZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG59XG5cbmNvbnN0IF9NYXREYXRlUmFuZ2VJbnB1dEJhc2UgPSBtaXhpbkVycm9yU3RhdGUoTWF0RGF0ZVJhbmdlSW5wdXRQYXJ0QmFzZSk7XG5cbi8qKiBJbnB1dCBmb3IgZW50ZXJpbmcgdGhlIHN0YXJ0IGRhdGUgaW4gYSBgbWF0LWRhdGUtcmFuZ2UtaW5wdXRgLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbbWF0U3RhcnREYXRlXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LXN0YXJ0LWRhdGUgbWF0LWRhdGUtcmFuZ2UtaW5wdXQtaW5uZXInLFxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnKGlucHV0KSc6ICdfb25JbnB1dCgkZXZlbnQudGFyZ2V0LnZhbHVlKScsXG4gICAgJyhjaGFuZ2UpJzogJ19vbkNoYW5nZSgpJyxcbiAgICAnKGtleWRvd24pJzogJ19vbktleWRvd24oJGV2ZW50KScsXG4gICAgJ1thdHRyLmFyaWEtaGFzcG9wdXBdJzogJ19yYW5nZUlucHV0LnJhbmdlUGlja2VyID8gXCJkaWFsb2dcIiA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLW93bnNdJzogJyhfcmFuZ2VJbnB1dC5yYW5nZVBpY2tlcj8ub3BlbmVkICYmIF9yYW5nZUlucHV0LnJhbmdlUGlja2VyLmlkKSB8fCBudWxsJyxcbiAgICAnW2F0dHIubWluXSc6ICdfZ2V0TWluRGF0ZSgpID8gX2RhdGVBZGFwdGVyLnRvSXNvODYwMShfZ2V0TWluRGF0ZSgpKSA6IG51bGwnLFxuICAgICdbYXR0ci5tYXhdJzogJ19nZXRNYXhEYXRlKCkgPyBfZGF0ZUFkYXB0ZXIudG9Jc284NjAxKF9nZXRNYXhEYXRlKCkpIDogbnVsbCcsXG4gICAgJyhibHVyKSc6ICdfb25CbHVyKCknLFxuICAgICd0eXBlJzogJ3RleHQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBNYXRTdGFydERhdGUsIG11bHRpOiB0cnVlfSxcbiAgICB7cHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IE1hdFN0YXJ0RGF0ZSwgbXVsdGk6IHRydWV9LFxuICBdLFxuICAvLyBUaGVzZSBuZWVkIHRvIGJlIHNwZWNpZmllZCBleHBsaWNpdGx5LCBiZWNhdXNlIHNvbWUgdG9vbGluZyBkb2Vzbid0XG4gIC8vIHNlZW0gdG8gcGljayB0aGVtIHVwIGZyb20gdGhlIGJhc2UgY2xhc3MuIFNlZSAjMjA5MzIuXG4gIG91dHB1dHM6IFsnZGF0ZUNoYW5nZScsICdkYXRlSW5wdXQnXSxcbiAgaW5wdXRzOiBbJ2Vycm9yU3RhdGVNYXRjaGVyJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFN0YXJ0RGF0ZTxEPiBleHRlbmRzIF9NYXREYXRlUmFuZ2VJbnB1dEJhc2U8RD4gaW1wbGVtZW50cyBDYW5VcGRhdGVFcnJvclN0YXRlIHtcbiAgLyoqIFZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSBzdGFydCBkYXRlIGlzbid0IGFmdGVyIHRoZSBlbmQgZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfc3RhcnRWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbChcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpLFxuICAgICk7XG4gICAgY29uc3QgZW5kID0gdGhpcy5fbW9kZWwgPyB0aGlzLl9tb2RlbC5zZWxlY3Rpb24uZW5kIDogbnVsbDtcbiAgICByZXR1cm4gIXN0YXJ0IHx8ICFlbmQgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUoc3RhcnQsIGVuZCkgPD0gMFxuICAgICAgPyBudWxsXG4gICAgICA6IHsnbWF0U3RhcnREYXRlSW52YWxpZCc6IHsnZW5kJzogZW5kLCAnYWN0dWFsJzogc3RhcnR9fTtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE1BVF9EQVRFX1JBTkdFX0lOUFVUX1BBUkVOVCkgcmFuZ2VJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJlbnQ8RD4sXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUykgZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzLFxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIHJhbmdlSW5wdXQsXG4gICAgICBlbGVtZW50UmVmLFxuICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgaW5qZWN0b3IsXG4gICAgICBwYXJlbnRGb3JtLFxuICAgICAgcGFyZW50Rm9ybUdyb3VwLFxuICAgICAgZGF0ZUFkYXB0ZXIsXG4gICAgICBkYXRlRm9ybWF0cyxcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIF92YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoWy4uLnN1cGVyLl9nZXRWYWxpZGF0b3JzKCksIHRoaXMuX3N0YXJ0VmFsaWRhdG9yXSk7XG5cbiAgcHJvdGVjdGVkIF9nZXRWYWx1ZUZyb21Nb2RlbChtb2RlbFZhbHVlOiBEYXRlUmFuZ2U8RD4pIHtcbiAgICByZXR1cm4gbW9kZWxWYWx1ZS5zdGFydDtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfc2hvdWxkSGFuZGxlQ2hhbmdlRXZlbnQoXG4gICAgY2hhbmdlOiBEYXRlU2VsZWN0aW9uTW9kZWxDaGFuZ2U8RGF0ZVJhbmdlPEQ+PixcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFzdXBlci5fc2hvdWxkSGFuZGxlQ2hhbmdlRXZlbnQoY2hhbmdlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gIWNoYW5nZS5vbGRWYWx1ZT8uc3RhcnRcbiAgICAgICAgPyAhIWNoYW5nZS5zZWxlY3Rpb24uc3RhcnRcbiAgICAgICAgOiAhY2hhbmdlLnNlbGVjdGlvbi5zdGFydCB8fFxuICAgICAgICAgICAgISF0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShjaGFuZ2Uub2xkVmFsdWUuc3RhcnQsIGNoYW5nZS5zZWxlY3Rpb24uc3RhcnQpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfYXNzaWduVmFsdWVUb01vZGVsKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgIGlmICh0aGlzLl9tb2RlbCkge1xuICAgICAgY29uc3QgcmFuZ2UgPSBuZXcgRGF0ZVJhbmdlKHZhbHVlLCB0aGlzLl9tb2RlbC5zZWxlY3Rpb24uZW5kKTtcbiAgICAgIHRoaXMuX21vZGVsLnVwZGF0ZVNlbGVjdGlvbihyYW5nZSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9mb3JtYXRWYWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICBzdXBlci5fZm9ybWF0VmFsdWUodmFsdWUpO1xuXG4gICAgLy8gQW55IHRpbWUgdGhlIGlucHV0IHZhbHVlIGlzIHJlZm9ybWF0dGVkIHdlIG5lZWQgdG8gdGVsbCB0aGUgcGFyZW50LlxuICAgIHRoaXMuX3JhbmdlSW5wdXQuX2hhbmRsZUNoaWxkVmFsdWVDaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB2YWx1ZSB0aGF0IHNob3VsZCBiZSB1c2VkIHdoZW4gbWlycm9yaW5nIHRoZSBpbnB1dCdzIHNpemUuICovXG4gIGdldE1pcnJvclZhbHVlKCk6IHN0cmluZyB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDAgPyB2YWx1ZSA6IGVsZW1lbnQucGxhY2Vob2xkZXI7XG4gIH1cblxuICBvdmVycmlkZSBfb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgZW5kSW5wdXQgPSB0aGlzLl9yYW5nZUlucHV0Ll9lbmRJbnB1dDtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGlzTHRyID0gdGhpcy5fZGlyPy52YWx1ZSAhPT0gJ3J0bCc7XG5cbiAgICAvLyBJZiB0aGUgdXNlciBoaXRzIFJJR0hUIChMVFIpIHdoZW4gYXQgdGhlIGVuZCBvZiB0aGUgaW5wdXQgKGFuZCBub1xuICAgIC8vIHNlbGVjdGlvbiksIG1vdmUgdGhlIGN1cnNvciB0byB0aGUgc3RhcnQgb2YgdGhlIGVuZCBpbnB1dC5cbiAgICBpZiAoXG4gICAgICAoKGV2ZW50LmtleUNvZGUgPT09IFJJR0hUX0FSUk9XICYmIGlzTHRyKSB8fCAoZXZlbnQua2V5Q29kZSA9PT0gTEVGVF9BUlJPVyAmJiAhaXNMdHIpKSAmJlxuICAgICAgZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gZWxlbWVudC52YWx1ZS5sZW5ndGggJiZcbiAgICAgIGVsZW1lbnQuc2VsZWN0aW9uRW5kID09PSBlbGVtZW50LnZhbHVlLmxlbmd0aFxuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGVuZElucHV0Ll9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMCk7XG4gICAgICBlbmRJbnB1dC5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5fb25LZXlkb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqIElucHV0IGZvciBlbnRlcmluZyB0aGUgZW5kIGRhdGUgaW4gYSBgbWF0LWRhdGUtcmFuZ2UtaW5wdXRgLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbbWF0RW5kRGF0ZV0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1lbmQtZGF0ZSBtYXQtZGF0ZS1yYW5nZS1pbnB1dC1pbm5lcicsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICcoaW5wdXQpJzogJ19vbklucHV0KCRldmVudC50YXJnZXQudmFsdWUpJyxcbiAgICAnKGNoYW5nZSknOiAnX29uQ2hhbmdlKCknLFxuICAgICcoa2V5ZG93biknOiAnX29uS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAnX3JhbmdlSW5wdXQucmFuZ2VQaWNrZXIgPyBcImRpYWxvZ1wiIDogbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnKF9yYW5nZUlucHV0LnJhbmdlUGlja2VyPy5vcGVuZWQgJiYgX3JhbmdlSW5wdXQucmFuZ2VQaWNrZXIuaWQpIHx8IG51bGwnLFxuICAgICdbYXR0ci5taW5dJzogJ19nZXRNaW5EYXRlKCkgPyBfZGF0ZUFkYXB0ZXIudG9Jc284NjAxKF9nZXRNaW5EYXRlKCkpIDogbnVsbCcsXG4gICAgJ1thdHRyLm1heF0nOiAnX2dldE1heERhdGUoKSA/IF9kYXRlQWRhcHRlci50b0lzbzg2MDEoX2dldE1heERhdGUoKSkgOiBudWxsJyxcbiAgICAnKGJsdXIpJzogJ19vbkJsdXIoKScsXG4gICAgJ3R5cGUnOiAndGV4dCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IE1hdEVuZERhdGUsIG11bHRpOiB0cnVlfSxcbiAgICB7cHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IE1hdEVuZERhdGUsIG11bHRpOiB0cnVlfSxcbiAgXSxcbiAgLy8gVGhlc2UgbmVlZCB0byBiZSBzcGVjaWZpZWQgZXhwbGljaXRseSwgYmVjYXVzZSBzb21lIHRvb2xpbmcgZG9lc24ndFxuICAvLyBzZWVtIHRvIHBpY2sgdGhlbSB1cCBmcm9tIHRoZSBiYXNlIGNsYXNzLiBTZWUgIzIwOTMyLlxuICBvdXRwdXRzOiBbJ2RhdGVDaGFuZ2UnLCAnZGF0ZUlucHV0J10sXG4gIGlucHV0czogWydlcnJvclN0YXRlTWF0Y2hlciddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFbmREYXRlPEQ+IGV4dGVuZHMgX01hdERhdGVSYW5nZUlucHV0QmFzZTxEPiBpbXBsZW1lbnRzIENhblVwZGF0ZUVycm9yU3RhdGUge1xuICAvKiogVmFsaWRhdG9yIHRoYXQgY2hlY2tzIHRoYXQgdGhlIGVuZCBkYXRlIGlzbid0IGJlZm9yZSB0aGUgc3RhcnQgZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfZW5kVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgY29uc3QgZW5kID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuX21vZGVsID8gdGhpcy5fbW9kZWwuc2VsZWN0aW9uLnN0YXJ0IDogbnVsbDtcbiAgICByZXR1cm4gIWVuZCB8fCAhc3RhcnQgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUoZW5kLCBzdGFydCkgPj0gMFxuICAgICAgPyBudWxsXG4gICAgICA6IHsnbWF0RW5kRGF0ZUludmFsaWQnOiB7J3N0YXJ0Jzogc3RhcnQsICdhY3R1YWwnOiBlbmR9fTtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE1BVF9EQVRFX1JBTkdFX0lOUFVUX1BBUkVOVCkgcmFuZ2VJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJlbnQ8RD4sXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUykgZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzLFxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIHJhbmdlSW5wdXQsXG4gICAgICBlbGVtZW50UmVmLFxuICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgaW5qZWN0b3IsXG4gICAgICBwYXJlbnRGb3JtLFxuICAgICAgcGFyZW50Rm9ybUdyb3VwLFxuICAgICAgZGF0ZUFkYXB0ZXIsXG4gICAgICBkYXRlRm9ybWF0cyxcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIF92YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoWy4uLnN1cGVyLl9nZXRWYWxpZGF0b3JzKCksIHRoaXMuX2VuZFZhbGlkYXRvcl0pO1xuXG4gIHByb3RlY3RlZCBfZ2V0VmFsdWVGcm9tTW9kZWwobW9kZWxWYWx1ZTogRGF0ZVJhbmdlPEQ+KSB7XG4gICAgcmV0dXJuIG1vZGVsVmFsdWUuZW5kO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9zaG91bGRIYW5kbGVDaGFuZ2VFdmVudChcbiAgICBjaGFuZ2U6IERhdGVTZWxlY3Rpb25Nb2RlbENoYW5nZTxEYXRlUmFuZ2U8RD4+LFxuICApOiBib29sZWFuIHtcbiAgICBpZiAoIXN1cGVyLl9zaG91bGRIYW5kbGVDaGFuZ2VFdmVudChjaGFuZ2UpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAhY2hhbmdlLm9sZFZhbHVlPy5lbmRcbiAgICAgICAgPyAhIWNoYW5nZS5zZWxlY3Rpb24uZW5kXG4gICAgICAgIDogIWNoYW5nZS5zZWxlY3Rpb24uZW5kIHx8XG4gICAgICAgICAgICAhIXRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKGNoYW5nZS5vbGRWYWx1ZS5lbmQsIGNoYW5nZS5zZWxlY3Rpb24uZW5kKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Fzc2lnblZhbHVlVG9Nb2RlbCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICBpZiAodGhpcy5fbW9kZWwpIHtcbiAgICAgIGNvbnN0IHJhbmdlID0gbmV3IERhdGVSYW5nZSh0aGlzLl9tb2RlbC5zZWxlY3Rpb24uc3RhcnQsIHZhbHVlKTtcbiAgICAgIHRoaXMuX21vZGVsLnVwZGF0ZVNlbGVjdGlvbihyYW5nZSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgb3ZlcnJpZGUgX29uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IHN0YXJ0SW5wdXQgPSB0aGlzLl9yYW5nZUlucHV0Ll9zdGFydElucHV0O1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgaXNMdHIgPSB0aGlzLl9kaXI/LnZhbHVlICE9PSAncnRsJztcblxuICAgIC8vIElmIHRoZSB1c2VyIGlzIHByZXNzaW5nIGJhY2tzcGFjZSBvbiBhbiBlbXB0eSBlbmQgaW5wdXQsIG1vdmUgZm9jdXMgYmFjayB0byB0aGUgc3RhcnQuXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEJBQ0tTUEFDRSAmJiAhZWxlbWVudC52YWx1ZSkge1xuICAgICAgc3RhcnRJbnB1dC5mb2N1cygpO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgdXNlciBoaXRzIExFRlQgKExUUikgd2hlbiBhdCB0aGUgc3RhcnQgb2YgdGhlIGlucHV0IChhbmQgbm9cbiAgICAvLyBzZWxlY3Rpb24pLCBtb3ZlIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgc3RhcnQgaW5wdXQuXG4gICAgZWxzZSBpZiAoXG4gICAgICAoKGV2ZW50LmtleUNvZGUgPT09IExFRlRfQVJST1cgJiYgaXNMdHIpIHx8IChldmVudC5rZXlDb2RlID09PSBSSUdIVF9BUlJPVyAmJiAhaXNMdHIpKSAmJlxuICAgICAgZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gMCAmJlxuICAgICAgZWxlbWVudC5zZWxlY3Rpb25FbmQgPT09IDBcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBlbmRQb3NpdGlvbiA9IHN0YXJ0SW5wdXQuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGg7XG4gICAgICBzdGFydElucHV0Ll9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZW5kUG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcbiAgICAgIHN0YXJ0SW5wdXQuZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuX29uS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=