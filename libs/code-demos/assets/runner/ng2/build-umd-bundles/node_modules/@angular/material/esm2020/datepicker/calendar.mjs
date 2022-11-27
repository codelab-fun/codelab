/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Subject } from 'rxjs';
import { createMissingDateImplError } from './datepicker-errors';
import { MatDatepickerIntl } from './datepicker-intl';
import { MatMonthView } from './month-view';
import { getActiveOffset, isSameMultiYearView, MatMultiYearView, yearsPerPage, } from './multi-year-view';
import { MatYearView } from './year-view';
import { MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER, DateRange } from './date-selection-model';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-intl";
import * as i2 from "@angular/material/core";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/common";
import * as i5 from "@angular/cdk/a11y";
import * as i6 from "@angular/cdk/portal";
import * as i7 from "./month-view";
import * as i8 from "./year-view";
import * as i9 from "./multi-year-view";
let calendarHeaderId = 1;
/** Default header for MatCalendar */
export class MatCalendarHeader {
    constructor(_intl, calendar, _dateAdapter, _dateFormats, changeDetectorRef) {
        this._intl = _intl;
        this.calendar = calendar;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._id = `mat-calendar-header-${calendarHeaderId++}`;
        this._periodButtonLabelId = `${this._id}-period-label`;
        this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());
    }
    /** The display text for the current calendar view. */
    get periodButtonText() {
        if (this.calendar.currentView == 'month') {
            return this._dateAdapter
                .format(this.calendar.activeDate, this._dateFormats.display.monthYearLabel)
                .toLocaleUpperCase();
        }
        if (this.calendar.currentView == 'year') {
            return this._dateAdapter.getYearName(this.calendar.activeDate);
        }
        return this._intl.formatYearRange(...this._formatMinAndMaxYearLabels());
    }
    /** The aria description for the current calendar view. */
    get periodButtonDescription() {
        if (this.calendar.currentView == 'month') {
            return this._dateAdapter
                .format(this.calendar.activeDate, this._dateFormats.display.monthYearLabel)
                .toLocaleUpperCase();
        }
        if (this.calendar.currentView == 'year') {
            return this._dateAdapter.getYearName(this.calendar.activeDate);
        }
        // Format a label for the window of years displayed in the multi-year calendar view. Use
        // `formatYearRangeLabel` because it is TTS friendly.
        return this._intl.formatYearRangeLabel(...this._formatMinAndMaxYearLabels());
    }
    /** The `aria-label` for changing the calendar view. */
    get periodButtonLabel() {
        return this.calendar.currentView == 'month'
            ? this._intl.switchToMultiYearViewLabel
            : this._intl.switchToMonthViewLabel;
    }
    /** The label for the previous button. */
    get prevButtonLabel() {
        return {
            'month': this._intl.prevMonthLabel,
            'year': this._intl.prevYearLabel,
            'multi-year': this._intl.prevMultiYearLabel,
        }[this.calendar.currentView];
    }
    /** The label for the next button. */
    get nextButtonLabel() {
        return {
            'month': this._intl.nextMonthLabel,
            'year': this._intl.nextYearLabel,
            'multi-year': this._intl.nextMultiYearLabel,
        }[this.calendar.currentView];
    }
    /** Handles user clicks on the period label. */
    currentPeriodClicked() {
        this.calendar.currentView = this.calendar.currentView == 'month' ? 'multi-year' : 'month';
    }
    /** Handles user clicks on the previous button. */
    previousClicked() {
        this.calendar.activeDate =
            this.calendar.currentView == 'month'
                ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, -1)
                : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == 'year' ? -1 : -yearsPerPage);
    }
    /** Handles user clicks on the next button. */
    nextClicked() {
        this.calendar.activeDate =
            this.calendar.currentView == 'month'
                ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, 1)
                : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == 'year' ? 1 : yearsPerPage);
    }
    /** Whether the previous period button is enabled. */
    previousEnabled() {
        if (!this.calendar.minDate) {
            return true;
        }
        return (!this.calendar.minDate || !this._isSameView(this.calendar.activeDate, this.calendar.minDate));
    }
    /** Whether the next period button is enabled. */
    nextEnabled() {
        return (!this.calendar.maxDate || !this._isSameView(this.calendar.activeDate, this.calendar.maxDate));
    }
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    _isSameView(date1, date2) {
        if (this.calendar.currentView == 'month') {
            return (this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
                this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2));
        }
        if (this.calendar.currentView == 'year') {
            return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
        }
        // Otherwise we are in 'multi-year' view.
        return isSameMultiYearView(this._dateAdapter, date1, date2, this.calendar.minDate, this.calendar.maxDate);
    }
    /**
     * Format two individual labels for the minimum year and maximum year available in the multi-year
     * calendar view. Returns an array of two strings where the first string is the formatted label
     * for the minimum year, and the second string is the formatted label for the maximum year.
     */
    _formatMinAndMaxYearLabels() {
        // The offset from the active year to the "slot" for the starting year is the
        // *actual* first rendered year in the multi-year view, and the last year is
        // just yearsPerPage - 1 away.
        const activeYear = this._dateAdapter.getYear(this.calendar.activeDate);
        const minYearOfPage = activeYear -
            getActiveOffset(this._dateAdapter, this.calendar.activeDate, this.calendar.minDate, this.calendar.maxDate);
        const maxYearOfPage = minYearOfPage + yearsPerPage - 1;
        const minYearLabel = this._dateAdapter.getYearName(this._dateAdapter.createDate(minYearOfPage, 0, 1));
        const maxYearLabel = this._dateAdapter.getYearName(this._dateAdapter.createDate(maxYearOfPage, 0, 1));
        return [minYearLabel, maxYearLabel];
    }
}
MatCalendarHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatCalendarHeader, deps: [{ token: i1.MatDatepickerIntl }, { token: forwardRef(() => MatCalendar) }, { token: i2.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MatCalendarHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatCalendarHeader, selector: "mat-calendar-header", exportAs: ["matCalendarHeader"], ngImport: i0, template: "<div class=\"mat-calendar-header\">\n  <div class=\"mat-calendar-controls\">\n    <button mat-button type=\"button\" class=\"mat-calendar-period-button\"\n            (click)=\"currentPeriodClicked()\" [attr.aria-label]=\"periodButtonLabel\"\n            [attr.aria-describedby]=\"_periodButtonLabelId\" aria-live=\"polite\">\n      <span aria-hidden=\"true\">{{periodButtonText}}</span>\n      <svg class=\"mat-calendar-arrow\" [class.mat-calendar-invert]=\"calendar.currentView !== 'month'\"\n           viewBox=\"0 0 10 5\" focusable=\"false\" aria-hidden=\"true\">\n           <polygon points=\"0,0 5,5 10,0\"/>\n      </svg>\n    </button>\n\n    <div class=\"mat-calendar-spacer\"></div>\n\n    <ng-content></ng-content>\n\n    <button mat-icon-button type=\"button\" class=\"mat-calendar-previous-button\"\n            [disabled]=\"!previousEnabled()\" (click)=\"previousClicked()\"\n            [attr.aria-label]=\"prevButtonLabel\">\n    </button>\n\n    <button mat-icon-button type=\"button\" class=\"mat-calendar-next-button\"\n            [disabled]=\"!nextEnabled()\" (click)=\"nextClicked()\"\n            [attr.aria-label]=\"nextButtonLabel\">\n    </button>\n  </div>\n</div>\n<label [id]=\"_periodButtonLabelId\" class=\"mat-calendar-hidden-label\">{{periodButtonDescription}}</label>\n", dependencies: [{ kind: "component", type: i3.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatCalendarHeader, decorators: [{
            type: Component,
            args: [{ selector: 'mat-calendar-header', exportAs: 'matCalendarHeader', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mat-calendar-header\">\n  <div class=\"mat-calendar-controls\">\n    <button mat-button type=\"button\" class=\"mat-calendar-period-button\"\n            (click)=\"currentPeriodClicked()\" [attr.aria-label]=\"periodButtonLabel\"\n            [attr.aria-describedby]=\"_periodButtonLabelId\" aria-live=\"polite\">\n      <span aria-hidden=\"true\">{{periodButtonText}}</span>\n      <svg class=\"mat-calendar-arrow\" [class.mat-calendar-invert]=\"calendar.currentView !== 'month'\"\n           viewBox=\"0 0 10 5\" focusable=\"false\" aria-hidden=\"true\">\n           <polygon points=\"0,0 5,5 10,0\"/>\n      </svg>\n    </button>\n\n    <div class=\"mat-calendar-spacer\"></div>\n\n    <ng-content></ng-content>\n\n    <button mat-icon-button type=\"button\" class=\"mat-calendar-previous-button\"\n            [disabled]=\"!previousEnabled()\" (click)=\"previousClicked()\"\n            [attr.aria-label]=\"prevButtonLabel\">\n    </button>\n\n    <button mat-icon-button type=\"button\" class=\"mat-calendar-next-button\"\n            [disabled]=\"!nextEnabled()\" (click)=\"nextClicked()\"\n            [attr.aria-label]=\"nextButtonLabel\">\n    </button>\n  </div>\n</div>\n<label [id]=\"_periodButtonLabelId\" class=\"mat-calendar-hidden-label\">{{periodButtonDescription}}</label>\n" }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerIntl }, { type: MatCalendar, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MatCalendar)]
                }] }, { type: i2.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DATE_FORMATS]
                }] }, { type: i0.ChangeDetectorRef }]; } });
/** A calendar that is used as part of the datepicker. */
export class MatCalendar {
    constructor(_intl, _dateAdapter, _dateFormats, _changeDetectorRef) {
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         */
        this._moveFocusOnNextTick = false;
        /** Whether the calendar should be started in month or year view. */
        this.startView = 'month';
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the year chosen in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits the month chosen in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emits when the current view changes.
         */
        this.viewChanged = new EventEmitter(true);
        /** Emits when any date is selected. */
        this._userSelection = new EventEmitter();
        /**
         * Emits whenever there is a state change that the header may need to respond to.
         */
        this.stateChanges = new Subject();
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this._dateFormats) {
                throw createMissingDateImplError('MAT_DATE_FORMATS');
            }
        }
        this._intlChanges = _intl.changes.subscribe(() => {
            _changeDetectorRef.markForCheck();
            this.stateChanges.next();
        });
    }
    /** A date representing the period (month or year) to start the calendar in. */
    get startAt() {
        return this._startAt;
    }
    set startAt(value) {
        this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /** The currently selected date. */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        if (value instanceof DateRange) {
            this._selected = value;
        }
        else {
            this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
        }
    }
    /** The minimum selectable date. */
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /** The maximum selectable date. */
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    get activeDate() {
        return this._clampedActiveDate;
    }
    set activeDate(value) {
        this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
        this.stateChanges.next();
        this._changeDetectorRef.markForCheck();
    }
    /** Whether the calendar is in month view. */
    get currentView() {
        return this._currentView;
    }
    set currentView(value) {
        const viewChangedResult = this._currentView !== value ? value : null;
        this._currentView = value;
        this._moveFocusOnNextTick = true;
        this._changeDetectorRef.markForCheck();
        if (viewChangedResult) {
            this.viewChanged.emit(viewChangedResult);
        }
    }
    ngAfterContentInit() {
        this._calendarHeaderPortal = new ComponentPortal(this.headerComponent || MatCalendarHeader);
        this.activeDate = this.startAt || this._dateAdapter.today();
        // Assign to the private property since we don't want to move focus on init.
        this._currentView = this.startView;
    }
    ngAfterViewChecked() {
        if (this._moveFocusOnNextTick) {
            this._moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    }
    ngOnDestroy() {
        this._intlChanges.unsubscribe();
        this.stateChanges.complete();
    }
    ngOnChanges(changes) {
        // Ignore date changes that are at a different time on the same day. This fixes issues where
        // the calendar re-renders when there is no meaningful change to [minDate] or [maxDate]
        // (#24435).
        const minDateChange = changes['minDate'] &&
            !this._dateAdapter.sameDate(changes['minDate'].previousValue, changes['minDate'].currentValue)
            ? changes['minDate']
            : undefined;
        const maxDateChange = changes['maxDate'] &&
            !this._dateAdapter.sameDate(changes['maxDate'].previousValue, changes['maxDate'].currentValue)
            ? changes['maxDate']
            : undefined;
        const change = minDateChange || maxDateChange || changes['dateFilter'];
        if (change && !change.firstChange) {
            const view = this._getCurrentViewComponent();
            if (view) {
                // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
                // passed down to the view via data bindings which won't be up-to-date when we call `_init`.
                this._changeDetectorRef.detectChanges();
                view._init();
            }
        }
        this.stateChanges.next();
    }
    /** Focuses the active date. */
    focusActiveCell() {
        this._getCurrentViewComponent()._focusActiveCell(false);
    }
    /** Updates today's date after an update of the active date */
    updateTodaysDate() {
        this._getCurrentViewComponent()._init();
    }
    /** Handles date selection in the month view. */
    _dateSelected(event) {
        const date = event.value;
        if (this.selected instanceof DateRange ||
            (date && !this._dateAdapter.sameDate(date, this.selected))) {
            this.selectedChange.emit(date);
        }
        this._userSelection.emit(event);
    }
    /** Handles year selection in the multiyear view. */
    _yearSelectedInMultiYearView(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /** Handles month selection in the year view. */
    _monthSelectedInYearView(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /** Handles year/month selection in the multi-year/year views. */
    _goToDateInView(date, view) {
        this.activeDate = date;
        this.currentView = view;
    }
    /** Returns the component instance that corresponds to the current calendar view. */
    _getCurrentViewComponent() {
        // The return type is explicitly written as a union to ensure that the Closure compiler does
        // not optimize calls to _init(). Without the explicit return type, TypeScript narrows it to
        // only the first component type. See https://github.com/angular/components/issues/22996.
        return this.monthView || this.yearView || this.multiYearView;
    }
}
MatCalendar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatCalendar, deps: [{ token: i1.MatDatepickerIntl }, { token: i2.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MatCalendar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatCalendar, selector: "mat-calendar", inputs: { headerComponent: "headerComponent", startAt: "startAt", startView: "startView", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter", dateClass: "dateClass", comparisonStart: "comparisonStart", comparisonEnd: "comparisonEnd", startDateAccessibleName: "startDateAccessibleName", endDateAccessibleName: "endDateAccessibleName" }, outputs: { selectedChange: "selectedChange", yearSelected: "yearSelected", monthSelected: "monthSelected", viewChanged: "viewChanged", _userSelection: "_userSelection" }, host: { classAttribute: "mat-calendar" }, providers: [MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER], viewQueries: [{ propertyName: "monthView", first: true, predicate: MatMonthView, descendants: true }, { propertyName: "yearView", first: true, predicate: MatYearView, descendants: true }, { propertyName: "multiYearView", first: true, predicate: MatMultiYearView, descendants: true }], exportAs: ["matCalendar"], usesOnChanges: true, ngImport: i0, template: "<ng-template [cdkPortalOutlet]=\"_calendarHeaderPortal\"></ng-template>\n\n<div class=\"mat-calendar-content\" [ngSwitch]=\"currentView\" cdkMonitorSubtreeFocus tabindex=\"-1\">\n  <mat-month-view\n      *ngSwitchCase=\"'month'\"\n      [(activeDate)]=\"activeDate\"\n      [selected]=\"selected\"\n      [dateFilter]=\"dateFilter\"\n      [maxDate]=\"maxDate\"\n      [minDate]=\"minDate\"\n      [dateClass]=\"dateClass\"\n      [comparisonStart]=\"comparisonStart\"\n      [comparisonEnd]=\"comparisonEnd\"\n      [startDateAccessibleName]=\"startDateAccessibleName\"\n      [endDateAccessibleName]=\"endDateAccessibleName\"\n      (_userSelection)=\"_dateSelected($event)\">\n  </mat-month-view>\n\n  <mat-year-view\n      *ngSwitchCase=\"'year'\"\n      [(activeDate)]=\"activeDate\"\n      [selected]=\"selected\"\n      [dateFilter]=\"dateFilter\"\n      [maxDate]=\"maxDate\"\n      [minDate]=\"minDate\"\n      [dateClass]=\"dateClass\"\n      (monthSelected)=\"_monthSelectedInYearView($event)\"\n      (selectedChange)=\"_goToDateInView($event, 'month')\">\n  </mat-year-view>\n\n  <mat-multi-year-view\n      *ngSwitchCase=\"'multi-year'\"\n      [(activeDate)]=\"activeDate\"\n      [selected]=\"selected\"\n      [dateFilter]=\"dateFilter\"\n      [maxDate]=\"maxDate\"\n      [minDate]=\"minDate\"\n      [dateClass]=\"dateClass\"\n      (yearSelected)=\"_yearSelectedInMultiYearView($event)\"\n      (selectedChange)=\"_goToDateInView($event, 'year')\">\n  </mat-multi-year-view>\n</div>\n", styles: [".mat-calendar{display:block}.mat-calendar-header{padding:8px 8px 0 8px}.mat-calendar-content{padding:0 8px 8px 8px;outline:none}.mat-calendar-controls{display:flex;align-items:center;margin:5% calc(4.7142857143% - 16px)}.mat-calendar-spacer{flex:1 1 auto}.mat-calendar-period-button{min-width:0;margin:0 8px}.mat-calendar-arrow{display:inline-block;width:10px;height:5px;margin:0 0 0 5px;vertical-align:middle}.mat-calendar-arrow.mat-calendar-invert{transform:rotate(180deg)}[dir=rtl] .mat-calendar-arrow{margin:0 5px 0 0}.cdk-high-contrast-active .mat-calendar-arrow{fill:CanvasText}.mat-calendar-previous-button,.mat-calendar-next-button{position:relative}.mat-calendar-previous-button::after,.mat-calendar-next-button::after{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";margin:15.5px;border:0 solid currentColor;border-top-width:2px}[dir=rtl] .mat-calendar-previous-button,[dir=rtl] .mat-calendar-next-button{transform:rotate(180deg)}.mat-calendar-previous-button::after{border-left-width:2px;transform:translateX(2px) rotate(-45deg)}.mat-calendar-next-button::after{border-right-width:2px;transform:translateX(-2px) rotate(45deg)}.mat-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mat-calendar-table-header th{text-align:center;padding:0 0 8px 0}.mat-calendar-table-header-divider{position:relative;height:1px}.mat-calendar-table-header-divider::after{content:\"\";position:absolute;top:0;left:-8px;right:-8px;height:1px}.mat-calendar-body-cell-content::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1)}.mat-calendar-body-cell:focus .mat-focus-indicator::before{content:\"\"}.mat-calendar-hidden-label{display:none}"], dependencies: [{ kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i5.CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"], exportAs: ["cdkMonitorFocus"] }, { kind: "directive", type: i6.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { kind: "component", type: i7.MatMonthView, selector: "mat-month-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter", "dateClass", "comparisonStart", "comparisonEnd", "startDateAccessibleName", "endDateAccessibleName"], outputs: ["selectedChange", "_userSelection", "activeDateChange"], exportAs: ["matMonthView"] }, { kind: "component", type: i8.MatYearView, selector: "mat-year-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter", "dateClass"], outputs: ["selectedChange", "monthSelected", "activeDateChange"], exportAs: ["matYearView"] }, { kind: "component", type: i9.MatMultiYearView, selector: "mat-multi-year-view", inputs: ["activeDate", "selected", "minDate", "maxDate", "dateFilter", "dateClass"], outputs: ["selectedChange", "yearSelected", "activeDateChange"], exportAs: ["matMultiYearView"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatCalendar, decorators: [{
            type: Component,
            args: [{ selector: 'mat-calendar', host: {
                        'class': 'mat-calendar',
                    }, exportAs: 'matCalendar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER], template: "<ng-template [cdkPortalOutlet]=\"_calendarHeaderPortal\"></ng-template>\n\n<div class=\"mat-calendar-content\" [ngSwitch]=\"currentView\" cdkMonitorSubtreeFocus tabindex=\"-1\">\n  <mat-month-view\n      *ngSwitchCase=\"'month'\"\n      [(activeDate)]=\"activeDate\"\n      [selected]=\"selected\"\n      [dateFilter]=\"dateFilter\"\n      [maxDate]=\"maxDate\"\n      [minDate]=\"minDate\"\n      [dateClass]=\"dateClass\"\n      [comparisonStart]=\"comparisonStart\"\n      [comparisonEnd]=\"comparisonEnd\"\n      [startDateAccessibleName]=\"startDateAccessibleName\"\n      [endDateAccessibleName]=\"endDateAccessibleName\"\n      (_userSelection)=\"_dateSelected($event)\">\n  </mat-month-view>\n\n  <mat-year-view\n      *ngSwitchCase=\"'year'\"\n      [(activeDate)]=\"activeDate\"\n      [selected]=\"selected\"\n      [dateFilter]=\"dateFilter\"\n      [maxDate]=\"maxDate\"\n      [minDate]=\"minDate\"\n      [dateClass]=\"dateClass\"\n      (monthSelected)=\"_monthSelectedInYearView($event)\"\n      (selectedChange)=\"_goToDateInView($event, 'month')\">\n  </mat-year-view>\n\n  <mat-multi-year-view\n      *ngSwitchCase=\"'multi-year'\"\n      [(activeDate)]=\"activeDate\"\n      [selected]=\"selected\"\n      [dateFilter]=\"dateFilter\"\n      [maxDate]=\"maxDate\"\n      [minDate]=\"minDate\"\n      [dateClass]=\"dateClass\"\n      (yearSelected)=\"_yearSelectedInMultiYearView($event)\"\n      (selectedChange)=\"_goToDateInView($event, 'year')\">\n  </mat-multi-year-view>\n</div>\n", styles: [".mat-calendar{display:block}.mat-calendar-header{padding:8px 8px 0 8px}.mat-calendar-content{padding:0 8px 8px 8px;outline:none}.mat-calendar-controls{display:flex;align-items:center;margin:5% calc(4.7142857143% - 16px)}.mat-calendar-spacer{flex:1 1 auto}.mat-calendar-period-button{min-width:0;margin:0 8px}.mat-calendar-arrow{display:inline-block;width:10px;height:5px;margin:0 0 0 5px;vertical-align:middle}.mat-calendar-arrow.mat-calendar-invert{transform:rotate(180deg)}[dir=rtl] .mat-calendar-arrow{margin:0 5px 0 0}.cdk-high-contrast-active .mat-calendar-arrow{fill:CanvasText}.mat-calendar-previous-button,.mat-calendar-next-button{position:relative}.mat-calendar-previous-button::after,.mat-calendar-next-button::after{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";margin:15.5px;border:0 solid currentColor;border-top-width:2px}[dir=rtl] .mat-calendar-previous-button,[dir=rtl] .mat-calendar-next-button{transform:rotate(180deg)}.mat-calendar-previous-button::after{border-left-width:2px;transform:translateX(2px) rotate(-45deg)}.mat-calendar-next-button::after{border-right-width:2px;transform:translateX(-2px) rotate(45deg)}.mat-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mat-calendar-table-header th{text-align:center;padding:0 0 8px 0}.mat-calendar-table-header-divider{position:relative;height:1px}.mat-calendar-table-header-divider::after{content:\"\";position:absolute;top:0;left:-8px;right:-8px;height:1px}.mat-calendar-body-cell-content::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1)}.mat-calendar-body-cell:focus .mat-focus-indicator::before{content:\"\"}.mat-calendar-hidden-label{display:none}"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerIntl }, { type: i2.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DATE_FORMATS]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { headerComponent: [{
                type: Input
            }], startAt: [{
                type: Input
            }], startView: [{
                type: Input
            }], selected: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], dateFilter: [{
                type: Input
            }], dateClass: [{
                type: Input
            }], comparisonStart: [{
                type: Input
            }], comparisonEnd: [{
                type: Input
            }], startDateAccessibleName: [{
                type: Input
            }], endDateAccessibleName: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], yearSelected: [{
                type: Output
            }], monthSelected: [{
                type: Output
            }], viewChanged: [{
                type: Output
            }], _userSelection: [{
                type: Output
            }], monthView: [{
                type: ViewChild,
                args: [MatMonthView]
            }], yearView: [{
                type: ViewChild,
                args: [MatYearView]
            }], multiYearView: [{
                type: ViewChild,
                args: [MatMultiYearView]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZGF0ZXBpY2tlci9jYWxlbmRhci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9kYXRlcGlja2VyL2NhbGVuZGFyLWhlYWRlci5odG1sIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2RhdGVwaWNrZXIvY2FsZW5kYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUF3QixNQUFNLHFCQUFxQixDQUFDO0FBQzNFLE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFHTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQWlCLE1BQU0sd0JBQXdCLENBQUM7QUFDckYsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFDTCxlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixZQUFZLEdBQ2IsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyx3Q0FBd0MsRUFBRSxTQUFTLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFFM0YsSUFBSSxnQkFB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O3FCQUN4QixZQUNTLGFBQWEsaUJBQ1IsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxhQUNwQyxDQUFDLHdDQUF3QyxDQUFDOzswQkEwSmxELFFBQVE7OzBCQUNSLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZ0JBQWdCOzRFQXZKN0IsZUFBZTtzQkFBdkIsS0FBSztnQkFnQkYsT0FBTztzQkFEVixLQUFLO2dCQVVHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBSUYsUUFBUTtzQkFEWCxLQUFLO2dCQWVGLE9BQU87c0JBRFYsS0FBSztnQkFXRixPQUFPO3NCQURWLEtBQUs7Z0JBVUcsVUFBVTtzQkFBbEIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR0csYUFBYTtzQkFBckIsS0FBSztnQkFHRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBR0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUdhLGNBQWM7c0JBQWhDLE1BQU07Z0JBTVksWUFBWTtzQkFBOUIsTUFBTTtnQkFNWSxhQUFhO3NCQUEvQixNQUFNO2dCQUtZLFdBQVc7c0JBQTdCLE1BQU07Z0JBS1ksY0FBYztzQkFBaEMsTUFBTTtnQkFJa0IsU0FBUztzQkFBakMsU0FBUzt1QkFBQyxZQUFZO2dCQUdDLFFBQVE7c0JBQS9CLFNBQVM7dUJBQUMsV0FBVztnQkFHTyxhQUFhO3NCQUF6QyxTQUFTO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudFBvcnRhbCwgQ29tcG9uZW50VHlwZSwgUG9ydGFsfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRlQWRhcHRlciwgTUFUX0RBVEVfRk9STUFUUywgTWF0RGF0ZUZvcm1hdHN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtNYXRDYWxlbmRhclVzZXJFdmVudCwgTWF0Q2FsZW5kYXJDZWxsQ2xhc3NGdW5jdGlvbn0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcbmltcG9ydCB7Y3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3J9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xuaW1wb3J0IHtNYXREYXRlcGlja2VySW50bH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuaW1wb3J0IHtNYXRNb250aFZpZXd9IGZyb20gJy4vbW9udGgtdmlldyc7XG5pbXBvcnQge1xuICBnZXRBY3RpdmVPZmZzZXQsXG4gIGlzU2FtZU11bHRpWWVhclZpZXcsXG4gIE1hdE11bHRpWWVhclZpZXcsXG4gIHllYXJzUGVyUGFnZSxcbn0gZnJvbSAnLi9tdWx0aS15ZWFyLXZpZXcnO1xuaW1wb3J0IHtNYXRZZWFyVmlld30gZnJvbSAnLi95ZWFyLXZpZXcnO1xuaW1wb3J0IHtNQVRfU0lOR0xFX0RBVEVfU0VMRUNUSU9OX01PREVMX1BST1ZJREVSLCBEYXRlUmFuZ2V9IGZyb20gJy4vZGF0ZS1zZWxlY3Rpb24tbW9kZWwnO1xuXG5sZXQgY2FsZW5kYXJIZWFkZXJJZCA9IDE7XG5cbi8qKlxuICogUG9zc2libGUgdmlld3MgZm9yIHRoZSBjYWxlbmRhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IHR5cGUgTWF0Q2FsZW5kYXJWaWV3ID0gJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFyJztcblxuLyoqIERlZmF1bHQgaGVhZGVyIGZvciBNYXRDYWxlbmRhciAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhbGVuZGFyLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXItaGVhZGVyLmh0bWwnLFxuICBleHBvcnRBczogJ21hdENhbGVuZGFySGVhZGVyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhbGVuZGFySGVhZGVyPEQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfaW50bDogTWF0RGF0ZXBpY2tlckludGwsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdENhbGVuZGFyKSkgcHVibGljIGNhbGVuZGFyOiBNYXRDYWxlbmRhcjxEPixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURV9GT1JNQVRTKSBwcml2YXRlIF9kYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHMsXG4gICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICB0aGlzLmNhbGVuZGFyLnN0YXRlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICB9XG5cbiAgLyoqIFRoZSBkaXNwbGF5IHRleHQgZm9yIHRoZSBjdXJyZW50IGNhbGVuZGFyIHZpZXcuICovXG4gIGdldCBwZXJpb2RCdXR0b25UZXh0KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ21vbnRoJykge1xuICAgICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyXG4gICAgICAgIC5mb3JtYXQodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckxhYmVsKVxuICAgICAgICAudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ3llYXInKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5faW50bC5mb3JtYXRZZWFyUmFuZ2UoLi4udGhpcy5fZm9ybWF0TWluQW5kTWF4WWVhckxhYmVscygpKTtcbiAgfVxuXG4gIC8qKiBUaGUgYXJpYSBkZXNjcmlwdGlvbiBmb3IgdGhlIGN1cnJlbnQgY2FsZW5kYXIgdmlldy4gKi9cbiAgZ2V0IHBlcmlvZEJ1dHRvbkRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ21vbnRoJykge1xuICAgICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyXG4gICAgICAgIC5mb3JtYXQodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckxhYmVsKVxuICAgICAgICAudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ3llYXInKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlKTtcbiAgICB9XG5cbiAgICAvLyBGb3JtYXQgYSBsYWJlbCBmb3IgdGhlIHdpbmRvdyBvZiB5ZWFycyBkaXNwbGF5ZWQgaW4gdGhlIG11bHRpLXllYXIgY2FsZW5kYXIgdmlldy4gVXNlXG4gICAgLy8gYGZvcm1hdFllYXJSYW5nZUxhYmVsYCBiZWNhdXNlIGl0IGlzIFRUUyBmcmllbmRseS5cbiAgICByZXR1cm4gdGhpcy5faW50bC5mb3JtYXRZZWFyUmFuZ2VMYWJlbCguLi50aGlzLl9mb3JtYXRNaW5BbmRNYXhZZWFyTGFiZWxzKCkpO1xuICB9XG5cbiAgLyoqIFRoZSBgYXJpYS1sYWJlbGAgZm9yIGNoYW5naW5nIHRoZSBjYWxlbmRhciB2aWV3LiAqL1xuICBnZXQgcGVyaW9kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PSAnbW9udGgnXG4gICAgICA/IHRoaXMuX2ludGwuc3dpdGNoVG9NdWx0aVllYXJWaWV3TGFiZWxcbiAgICAgIDogdGhpcy5faW50bC5zd2l0Y2hUb01vbnRoVmlld0xhYmVsO1xuICB9XG5cbiAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIGJ1dHRvbi4gKi9cbiAgZ2V0IHByZXZCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB7XG4gICAgICAnbW9udGgnOiB0aGlzLl9pbnRsLnByZXZNb250aExhYmVsLFxuICAgICAgJ3llYXInOiB0aGlzLl9pbnRsLnByZXZZZWFyTGFiZWwsXG4gICAgICAnbXVsdGkteWVhcic6IHRoaXMuX2ludGwucHJldk11bHRpWWVhckxhYmVsLFxuICAgIH1bdGhpcy5jYWxlbmRhci5jdXJyZW50Vmlld107XG4gIH1cblxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgbmV4dCBidXR0b24uICovXG4gIGdldCBuZXh0QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ21vbnRoJzogdGhpcy5faW50bC5uZXh0TW9udGhMYWJlbCxcbiAgICAgICd5ZWFyJzogdGhpcy5faW50bC5uZXh0WWVhckxhYmVsLFxuICAgICAgJ211bHRpLXllYXInOiB0aGlzLl9pbnRsLm5leHRNdWx0aVllYXJMYWJlbCxcbiAgICB9W3RoaXMuY2FsZW5kYXIuY3VycmVudFZpZXddO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIHBlcmlvZCBsYWJlbC4gKi9cbiAgY3VycmVudFBlcmlvZENsaWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9IHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ21vbnRoJyA/ICdtdWx0aS15ZWFyJyA6ICdtb250aCc7XG4gIH1cblxuICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcHJldmlvdXMgYnV0dG9uLiAqL1xuICBwcmV2aW91c0NsaWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlID1cbiAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ21vbnRoJ1xuICAgICAgICA/IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSwgLTEpXG4gICAgICAgIDogdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSxcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ3llYXInID8gLTEgOiAteWVhcnNQZXJQYWdlLFxuICAgICAgICAgICk7XG4gIH1cblxuICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgbmV4dCBidXR0b24uICovXG4gIG5leHRDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSA9XG4gICAgICB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09ICdtb250aCdcbiAgICAgICAgPyB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIDEpXG4gICAgICAgIDogdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSxcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ3llYXInID8gMSA6IHllYXJzUGVyUGFnZSxcbiAgICAgICAgICApO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHByZXZpb3VzIHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cbiAgcHJldmlvdXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5jYWxlbmRhci5taW5EYXRlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICF0aGlzLmNhbGVuZGFyLm1pbkRhdGUgfHwgIXRoaXMuX2lzU2FtZVZpZXcodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCB0aGlzLmNhbGVuZGFyLm1pbkRhdGUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBuZXh0IHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cbiAgbmV4dEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICF0aGlzLmNhbGVuZGFyLm1heERhdGUgfHwgIXRoaXMuX2lzU2FtZVZpZXcodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCB0aGlzLmNhbGVuZGFyLm1heERhdGUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgcmVwcmVzZW50IHRoZSBzYW1lIHZpZXcgaW4gdGhlIGN1cnJlbnQgdmlldyBtb2RlIChtb250aCBvciB5ZWFyKS4gKi9cbiAgcHJpdmF0ZSBfaXNTYW1lVmlldyhkYXRlMTogRCwgZGF0ZTI6IEQpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUyKSAmJlxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aChkYXRlMSkgPT0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZTIpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PSAneWVhcicpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUyKTtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlIHdlIGFyZSBpbiAnbXVsdGkteWVhcicgdmlldy5cbiAgICByZXR1cm4gaXNTYW1lTXVsdGlZZWFyVmlldyhcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLFxuICAgICAgZGF0ZTEsXG4gICAgICBkYXRlMixcbiAgICAgIHRoaXMuY2FsZW5kYXIubWluRGF0ZSxcbiAgICAgIHRoaXMuY2FsZW5kYXIubWF4RGF0ZSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCB0d28gaW5kaXZpZHVhbCBsYWJlbHMgZm9yIHRoZSBtaW5pbXVtIHllYXIgYW5kIG1heGltdW0geWVhciBhdmFpbGFibGUgaW4gdGhlIG11bHRpLXllYXJcbiAgICogY2FsZW5kYXIgdmlldy4gUmV0dXJucyBhbiBhcnJheSBvZiB0d28gc3RyaW5ncyB3aGVyZSB0aGUgZmlyc3Qgc3RyaW5nIGlzIHRoZSBmb3JtYXR0ZWQgbGFiZWxcbiAgICogZm9yIHRoZSBtaW5pbXVtIHllYXIsIGFuZCB0aGUgc2Vjb25kIHN0cmluZyBpcyB0aGUgZm9ybWF0dGVkIGxhYmVsIGZvciB0aGUgbWF4aW11bSB5ZWFyLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9ybWF0TWluQW5kTWF4WWVhckxhYmVscygpOiBbbWluWWVhckxhYmVsOiBzdHJpbmcsIG1heFllYXJMYWJlbDogc3RyaW5nXSB7XG4gICAgLy8gVGhlIG9mZnNldCBmcm9tIHRoZSBhY3RpdmUgeWVhciB0byB0aGUgXCJzbG90XCIgZm9yIHRoZSBzdGFydGluZyB5ZWFyIGlzIHRoZVxuICAgIC8vICphY3R1YWwqIGZpcnN0IHJlbmRlcmVkIHllYXIgaW4gdGhlIG11bHRpLXllYXIgdmlldywgYW5kIHRoZSBsYXN0IHllYXIgaXNcbiAgICAvLyBqdXN0IHllYXJzUGVyUGFnZSAtIDEgYXdheS5cbiAgICBjb25zdCBhY3RpdmVZZWFyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUpO1xuICAgIGNvbnN0IG1pblllYXJPZlBhZ2UgPVxuICAgICAgYWN0aXZlWWVhciAtXG4gICAgICBnZXRBY3RpdmVPZmZzZXQoXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLFxuICAgICAgICB0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsXG4gICAgICAgIHRoaXMuY2FsZW5kYXIubWluRGF0ZSxcbiAgICAgICAgdGhpcy5jYWxlbmRhci5tYXhEYXRlLFxuICAgICAgKTtcbiAgICBjb25zdCBtYXhZZWFyT2ZQYWdlID0gbWluWWVhck9mUGFnZSArIHllYXJzUGVyUGFnZSAtIDE7XG4gICAgY29uc3QgbWluWWVhckxhYmVsID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUoXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKG1pblllYXJPZlBhZ2UsIDAsIDEpLFxuICAgICk7XG4gICAgY29uc3QgbWF4WWVhckxhYmVsID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUoXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKG1heFllYXJPZlBhZ2UsIDAsIDEpLFxuICAgICk7XG5cbiAgICByZXR1cm4gW21pblllYXJMYWJlbCwgbWF4WWVhckxhYmVsXTtcbiAgfVxuXG4gIHByaXZhdGUgX2lkID0gYG1hdC1jYWxlbmRhci1oZWFkZXItJHtjYWxlbmRhckhlYWRlcklkKyt9YDtcblxuICBfcGVyaW9kQnV0dG9uTGFiZWxJZCA9IGAke3RoaXMuX2lkfS1wZXJpb2QtbGFiZWxgO1xufVxuXG4vKiogQSBjYWxlbmRhciB0aGF0IGlzIHVzZWQgYXMgcGFydCBvZiB0aGUgZGF0ZXBpY2tlci4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYWxlbmRhcicsXG4gIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjYWxlbmRhci5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtY2FsZW5kYXInLFxuICB9LFxuICBleHBvcnRBczogJ21hdENhbGVuZGFyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW01BVF9TSU5HTEVfREFURV9TRUxFQ1RJT05fTU9ERUxfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYWxlbmRhcjxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyoqIEFuIGlucHV0IGluZGljYXRpbmcgdGhlIHR5cGUgb2YgdGhlIGhlYWRlciBjb21wb25lbnQsIGlmIHNldC4gKi9cbiAgQElucHV0KCkgaGVhZGVyQ29tcG9uZW50OiBDb21wb25lbnRUeXBlPGFueT47XG5cbiAgLyoqIEEgcG9ydGFsIGNvbnRhaW5pbmcgdGhlIGhlYWRlciBjb21wb25lbnQgdHlwZSBmb3IgdGhpcyBjYWxlbmRhci4gKi9cbiAgX2NhbGVuZGFySGVhZGVyUG9ydGFsOiBQb3J0YWw8YW55PjtcblxuICBwcml2YXRlIF9pbnRsQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBVc2VkIGZvciBzY2hlZHVsaW5nIHRoYXQgZm9jdXMgc2hvdWxkIGJlIG1vdmVkIHRvIHRoZSBhY3RpdmUgY2VsbCBvbiB0aGUgbmV4dCB0aWNrLlxuICAgKiBXZSBuZWVkIHRvIHNjaGVkdWxlIGl0LCByYXRoZXIgdGhhbiBkbyBpdCBpbW1lZGlhdGVseSwgYmVjYXVzZSB3ZSBoYXZlIHRvIHdhaXRcbiAgICogZm9yIEFuZ3VsYXIgdG8gcmUtZXZhbHVhdGUgdGhlIHZpZXcgY2hpbGRyZW4uXG4gICAqL1xuICBwcml2YXRlIF9tb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XG5cbiAgLyoqIEEgZGF0ZSByZXByZXNlbnRpbmcgdGhlIHBlcmlvZCAobW9udGggb3IgeWVhcikgdG8gc3RhcnQgdGhlIGNhbGVuZGFyIGluLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc3RhcnRBdCgpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQ7XG4gIH1cbiAgc2V0IHN0YXJ0QXQodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgdGhpcy5fc3RhcnRBdCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICB9XG4gIHByaXZhdGUgX3N0YXJ0QXQ6IEQgfCBudWxsO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBzaG91bGQgYmUgc3RhcnRlZCBpbiBtb250aCBvciB5ZWFyIHZpZXcuICovXG4gIEBJbnB1dCgpIHN0YXJ0VmlldzogTWF0Q2FsZW5kYXJWaWV3ID0gJ21vbnRoJztcblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogRGF0ZVJhbmdlPEQ+IHwgRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IERhdGVSYW5nZTxEPiB8IEQgfCBudWxsKSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZVJhbmdlKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9zZWxlY3RlZDogRGF0ZVJhbmdlPEQ+IHwgRCB8IG51bGw7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICB9XG4gIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgfVxuICBwcml2YXRlIF9taW5EYXRlOiBEIHwgbnVsbDtcblxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gIH1cbiAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICB9XG4gIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xuXG4gIC8qKiBGdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cbiAgQElucHV0KCkgZGF0ZUZpbHRlcjogKGRhdGU6IEQpID0+IGJvb2xlYW47XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIGN1c3RvbSBDU1MgY2xhc3NlcyB0byBkYXRlcy4gKi9cbiAgQElucHV0KCkgZGF0ZUNsYXNzOiBNYXRDYWxlbmRhckNlbGxDbGFzc0Z1bmN0aW9uPEQ+O1xuXG4gIC8qKiBTdGFydCBvZiB0aGUgY29tcGFyaXNvbiByYW5nZS4gKi9cbiAgQElucHV0KCkgY29tcGFyaXNvblN0YXJ0OiBEIHwgbnVsbDtcblxuICAvKiogRW5kIG9mIHRoZSBjb21wYXJpc29uIHJhbmdlLiAqL1xuICBASW5wdXQoKSBjb21wYXJpc29uRW5kOiBEIHwgbnVsbDtcblxuICAvKiogQVJJQSBBY2Nlc3NpYmxlIG5hbWUgb2YgdGhlIGA8aW5wdXQgbWF0U3RhcnREYXRlLz5gICovXG4gIEBJbnB1dCgpIHN0YXJ0RGF0ZUFjY2Vzc2libGVOYW1lOiBzdHJpbmcgfCBudWxsO1xuXG4gIC8qKiBBUklBIEFjY2Vzc2libGUgbmFtZSBvZiB0aGUgYDxpbnB1dCBtYXRFbmREYXRlLz5gICovXG4gIEBJbnB1dCgpIGVuZERhdGVBY2Nlc3NpYmxlTmFtZTogc3RyaW5nIHwgbnVsbDtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RCB8IG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4oKTtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIHllYXIgY2hvc2VuIGluIG11bHRpeWVhciB2aWV3LlxuICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgeWVhclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBtb250aCBjaG9zZW4gaW4geWVhciB2aWV3LlxuICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSBjdXJyZW50IHZpZXcgY2hhbmdlcy5cbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB2aWV3Q2hhbmdlZDogRXZlbnRFbWl0dGVyPE1hdENhbGVuZGFyVmlldz4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENhbGVuZGFyVmlldz4oXG4gICAgdHJ1ZSxcbiAgKTtcblxuICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IF91c2VyU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8TWF0Q2FsZW5kYXJVc2VyRXZlbnQ8RCB8IG51bGw+PiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxNYXRDYWxlbmRhclVzZXJFdmVudDxEIHwgbnVsbD4+KCk7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBtb250aCB2aWV3IGNvbXBvbmVudC4gKi9cbiAgQFZpZXdDaGlsZChNYXRNb250aFZpZXcpIG1vbnRoVmlldzogTWF0TW9udGhWaWV3PEQ+O1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgeWVhciB2aWV3IGNvbXBvbmVudC4gKi9cbiAgQFZpZXdDaGlsZChNYXRZZWFyVmlldykgeWVhclZpZXc6IE1hdFllYXJWaWV3PEQ+O1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgbXVsdGkteWVhciB2aWV3IGNvbXBvbmVudC4gKi9cbiAgQFZpZXdDaGlsZChNYXRNdWx0aVllYXJWaWV3KSBtdWx0aVllYXJWaWV3OiBNYXRNdWx0aVllYXJWaWV3PEQ+O1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBhY3RpdmUgZGF0ZS4gVGhpcyBkZXRlcm1pbmVzIHdoaWNoIHRpbWUgcGVyaW9kIGlzIHNob3duIGFuZCB3aGljaCBkYXRlIGlzXG4gICAqIGhpZ2hsaWdodGVkIHdoZW4gdXNpbmcga2V5Ym9hcmQgbmF2aWdhdGlvbi5cbiAgICovXG4gIGdldCBhY3RpdmVEYXRlKCk6IEQge1xuICAgIHJldHVybiB0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZTtcbiAgfVxuICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xuICAgIHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKHZhbHVlLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIHByaXZhdGUgX2NsYW1wZWRBY3RpdmVEYXRlOiBEO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBpbiBtb250aCB2aWV3LiAqL1xuICBnZXQgY3VycmVudFZpZXcoKTogTWF0Q2FsZW5kYXJWaWV3IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpZXc7XG4gIH1cbiAgc2V0IGN1cnJlbnRWaWV3KHZhbHVlOiBNYXRDYWxlbmRhclZpZXcpIHtcbiAgICBjb25zdCB2aWV3Q2hhbmdlZFJlc3VsdCA9IHRoaXMuX2N1cnJlbnRWaWV3ICE9PSB2YWx1ZSA/IHZhbHVlIDogbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50VmlldyA9IHZhbHVlO1xuICAgIHRoaXMuX21vdmVGb2N1c09uTmV4dFRpY2sgPSB0cnVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIGlmICh2aWV3Q2hhbmdlZFJlc3VsdCkge1xuICAgICAgdGhpcy52aWV3Q2hhbmdlZC5lbWl0KHZpZXdDaGFuZ2VkUmVzdWx0KTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfY3VycmVudFZpZXc6IE1hdENhbGVuZGFyVmlldztcblxuICAvKipcbiAgICogRW1pdHMgd2hlbmV2ZXIgdGhlcmUgaXMgYSBzdGF0ZSBjaGFuZ2UgdGhhdCB0aGUgaGVhZGVyIG1heSBuZWVkIHRvIHJlc3BvbmQgdG8uXG4gICAqL1xuICByZWFkb25seSBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIF9pbnRsOiBNYXREYXRlcGlja2VySW50bCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURV9GT1JNQVRTKSBwcml2YXRlIF9kYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHMsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQVRfREFURV9GT1JNQVRTJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5faW50bENoYW5nZXMgPSBfaW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBfY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fY2FsZW5kYXJIZWFkZXJQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKHRoaXMuaGVhZGVyQ29tcG9uZW50IHx8IE1hdENhbGVuZGFySGVhZGVyKTtcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLnN0YXJ0QXQgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIudG9kYXkoKTtcblxuICAgIC8vIEFzc2lnbiB0byB0aGUgcHJpdmF0ZSBwcm9wZXJ0eSBzaW5jZSB3ZSBkb24ndCB3YW50IHRvIG1vdmUgZm9jdXMgb24gaW5pdC5cbiAgICB0aGlzLl9jdXJyZW50VmlldyA9IHRoaXMuc3RhcnRWaWV3O1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLl9tb3ZlRm9jdXNPbk5leHRUaWNrKSB7XG4gICAgICB0aGlzLl9tb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XG4gICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ludGxDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBJZ25vcmUgZGF0ZSBjaGFuZ2VzIHRoYXQgYXJlIGF0IGEgZGlmZmVyZW50IHRpbWUgb24gdGhlIHNhbWUgZGF5LiBUaGlzIGZpeGVzIGlzc3VlcyB3aGVyZVxuICAgIC8vIHRoZSBjYWxlbmRhciByZS1yZW5kZXJzIHdoZW4gdGhlcmUgaXMgbm8gbWVhbmluZ2Z1bCBjaGFuZ2UgdG8gW21pbkRhdGVdIG9yIFttYXhEYXRlXVxuICAgIC8vICgjMjQ0MzUpLlxuICAgIGNvbnN0IG1pbkRhdGVDaGFuZ2U6IFNpbXBsZUNoYW5nZSB8IHVuZGVmaW5lZCA9XG4gICAgICBjaGFuZ2VzWydtaW5EYXRlJ10gJiZcbiAgICAgICF0aGlzLl9kYXRlQWRhcHRlci5zYW1lRGF0ZShjaGFuZ2VzWydtaW5EYXRlJ10ucHJldmlvdXNWYWx1ZSwgY2hhbmdlc1snbWluRGF0ZSddLmN1cnJlbnRWYWx1ZSlcbiAgICAgICAgPyBjaGFuZ2VzWydtaW5EYXRlJ11cbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbWF4RGF0ZUNoYW5nZTogU2ltcGxlQ2hhbmdlIHwgdW5kZWZpbmVkID1cbiAgICAgIGNoYW5nZXNbJ21heERhdGUnXSAmJlxuICAgICAgIXRoaXMuX2RhdGVBZGFwdGVyLnNhbWVEYXRlKGNoYW5nZXNbJ21heERhdGUnXS5wcmV2aW91c1ZhbHVlLCBjaGFuZ2VzWydtYXhEYXRlJ10uY3VycmVudFZhbHVlKVxuICAgICAgICA/IGNoYW5nZXNbJ21heERhdGUnXVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGNoYW5nZSA9IG1pbkRhdGVDaGFuZ2UgfHwgbWF4RGF0ZUNoYW5nZSB8fCBjaGFuZ2VzWydkYXRlRmlsdGVyJ107XG5cbiAgICBpZiAoY2hhbmdlICYmICFjaGFuZ2UuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpO1xuXG4gICAgICBpZiAodmlldykge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIGBkZXRlY3RDaGFuZ2VzYCBtYW51YWxseSBoZXJlLCBiZWNhdXNlIHRoZSBgbWluRGF0ZWAsIGBtYXhEYXRlYCBldGMuIGFyZVxuICAgICAgICAvLyBwYXNzZWQgZG93biB0byB0aGUgdmlldyB2aWEgZGF0YSBiaW5kaW5ncyB3aGljaCB3b24ndCBiZSB1cC10by1kYXRlIHdoZW4gd2UgY2FsbCBgX2luaXRgLlxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHZpZXcuX2luaXQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgYWN0aXZlIGRhdGUuICovXG4gIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICB0aGlzLl9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpLl9mb2N1c0FjdGl2ZUNlbGwoZmFsc2UpO1xuICB9XG5cbiAgLyoqIFVwZGF0ZXMgdG9kYXkncyBkYXRlIGFmdGVyIGFuIHVwZGF0ZSBvZiB0aGUgYWN0aXZlIGRhdGUgKi9cbiAgdXBkYXRlVG9kYXlzRGF0ZSgpIHtcbiAgICB0aGlzLl9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpLl9pbml0KCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBkYXRlIHNlbGVjdGlvbiBpbiB0aGUgbW9udGggdmlldy4gKi9cbiAgX2RhdGVTZWxlY3RlZChldmVudDogTWF0Q2FsZW5kYXJVc2VyRXZlbnQ8RCB8IG51bGw+KTogdm9pZCB7XG4gICAgY29uc3QgZGF0ZSA9IGV2ZW50LnZhbHVlO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5zZWxlY3RlZCBpbnN0YW5jZW9mIERhdGVSYW5nZSB8fFxuICAgICAgKGRhdGUgJiYgIXRoaXMuX2RhdGVBZGFwdGVyLnNhbWVEYXRlKGRhdGUsIHRoaXMuc2VsZWN0ZWQpKVxuICAgICkge1xuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KGRhdGUpO1xuICAgIH1cblxuICAgIHRoaXMuX3VzZXJTZWxlY3Rpb24uZW1pdChldmVudCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyB5ZWFyIHNlbGVjdGlvbiBpbiB0aGUgbXVsdGl5ZWFyIHZpZXcuICovXG4gIF95ZWFyU2VsZWN0ZWRJbk11bHRpWWVhclZpZXcobm9ybWFsaXplZFllYXI6IEQpIHtcbiAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRZZWFyKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIG1vbnRoIHNlbGVjdGlvbiBpbiB0aGUgeWVhciB2aWV3LiAqL1xuICBfbW9udGhTZWxlY3RlZEluWWVhclZpZXcobm9ybWFsaXplZE1vbnRoOiBEKSB7XG4gICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIHllYXIvbW9udGggc2VsZWN0aW9uIGluIHRoZSBtdWx0aS15ZWFyL3llYXIgdmlld3MuICovXG4gIF9nb1RvRGF0ZUluVmlldyhkYXRlOiBELCB2aWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXInKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVEYXRlID0gZGF0ZTtcbiAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdmlldztcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgY3VycmVudCBjYWxlbmRhciB2aWV3LiAqL1xuICBwcml2YXRlIF9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpOiBNYXRNb250aFZpZXc8RD4gfCBNYXRZZWFyVmlldzxEPiB8IE1hdE11bHRpWWVhclZpZXc8RD4ge1xuICAgIC8vIFRoZSByZXR1cm4gdHlwZSBpcyBleHBsaWNpdGx5IHdyaXR0ZW4gYXMgYSB1bmlvbiB0byBlbnN1cmUgdGhhdCB0aGUgQ2xvc3VyZSBjb21waWxlciBkb2VzXG4gICAgLy8gbm90IG9wdGltaXplIGNhbGxzIHRvIF9pbml0KCkuIFdpdGhvdXQgdGhlIGV4cGxpY2l0IHJldHVybiB0eXBlLCBUeXBlU2NyaXB0IG5hcnJvd3MgaXQgdG9cbiAgICAvLyBvbmx5IHRoZSBmaXJzdCBjb21wb25lbnQgdHlwZS4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzIyOTk2LlxuICAgIHJldHVybiB0aGlzLm1vbnRoVmlldyB8fCB0aGlzLnllYXJWaWV3IHx8IHRoaXMubXVsdGlZZWFyVmlldztcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1hdC1jYWxlbmRhci1oZWFkZXJcIj5cbiAgPGRpdiBjbGFzcz1cIm1hdC1jYWxlbmRhci1jb250cm9sc1wiPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtYXQtY2FsZW5kYXItcGVyaW9kLWJ1dHRvblwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY3VycmVudFBlcmlvZENsaWNrZWQoKVwiIFthdHRyLmFyaWEtbGFiZWxdPVwicGVyaW9kQnV0dG9uTGFiZWxcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJfcGVyaW9kQnV0dG9uTGFiZWxJZFwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPlxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3twZXJpb2RCdXR0b25UZXh0fX08L3NwYW4+XG4gICAgICA8c3ZnIGNsYXNzPVwibWF0LWNhbGVuZGFyLWFycm93XCIgW2NsYXNzLm1hdC1jYWxlbmRhci1pbnZlcnRdPVwiY2FsZW5kYXIuY3VycmVudFZpZXcgIT09ICdtb250aCdcIlxuICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDEwIDVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCIwLDAgNSw1IDEwLDBcIi8+XG4gICAgICA8L3N2Zz5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYXQtY2FsZW5kYXItc3BhY2VyXCI+PC9kaXY+XG5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtYXQtY2FsZW5kYXItcHJldmlvdXMtYnV0dG9uXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhcHJldmlvdXNFbmFibGVkKClcIiAoY2xpY2spPVwicHJldmlvdXNDbGlja2VkKClcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJwcmV2QnV0dG9uTGFiZWxcIj5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1hdC1jYWxlbmRhci1uZXh0LWJ1dHRvblwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIW5leHRFbmFibGVkKClcIiAoY2xpY2spPVwibmV4dENsaWNrZWQoKVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5leHRCdXR0b25MYWJlbFwiPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuPGxhYmVsIFtpZF09XCJfcGVyaW9kQnV0dG9uTGFiZWxJZFwiIGNsYXNzPVwibWF0LWNhbGVuZGFyLWhpZGRlbi1sYWJlbFwiPnt7cGVyaW9kQnV0dG9uRGVzY3JpcHRpb259fTwvbGFiZWw+XG4iLCI8bmctdGVtcGxhdGUgW2Nka1BvcnRhbE91dGxldF09XCJfY2FsZW5kYXJIZWFkZXJQb3J0YWxcIj48L25nLXRlbXBsYXRlPlxuXG48ZGl2IGNsYXNzPVwibWF0LWNhbGVuZGFyLWNvbnRlbnRcIiBbbmdTd2l0Y2hdPVwiY3VycmVudFZpZXdcIiBjZGtNb25pdG9yU3VidHJlZUZvY3VzIHRhYmluZGV4PVwiLTFcIj5cbiAgPG1hdC1tb250aC12aWV3XG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiJ21vbnRoJ1wiXG4gICAgICBbKGFjdGl2ZURhdGUpXT1cImFjdGl2ZURhdGVcIlxuICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgIFtkYXRlRmlsdGVyXT1cImRhdGVGaWx0ZXJcIlxuICAgICAgW21heERhdGVdPVwibWF4RGF0ZVwiXG4gICAgICBbbWluRGF0ZV09XCJtaW5EYXRlXCJcbiAgICAgIFtkYXRlQ2xhc3NdPVwiZGF0ZUNsYXNzXCJcbiAgICAgIFtjb21wYXJpc29uU3RhcnRdPVwiY29tcGFyaXNvblN0YXJ0XCJcbiAgICAgIFtjb21wYXJpc29uRW5kXT1cImNvbXBhcmlzb25FbmRcIlxuICAgICAgW3N0YXJ0RGF0ZUFjY2Vzc2libGVOYW1lXT1cInN0YXJ0RGF0ZUFjY2Vzc2libGVOYW1lXCJcbiAgICAgIFtlbmREYXRlQWNjZXNzaWJsZU5hbWVdPVwiZW5kRGF0ZUFjY2Vzc2libGVOYW1lXCJcbiAgICAgIChfdXNlclNlbGVjdGlvbik9XCJfZGF0ZVNlbGVjdGVkKCRldmVudClcIj5cbiAgPC9tYXQtbW9udGgtdmlldz5cblxuICA8bWF0LXllYXItdmlld1xuICAgICAgKm5nU3dpdGNoQ2FzZT1cIid5ZWFyJ1wiXG4gICAgICBbKGFjdGl2ZURhdGUpXT1cImFjdGl2ZURhdGVcIlxuICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgIFtkYXRlRmlsdGVyXT1cImRhdGVGaWx0ZXJcIlxuICAgICAgW21heERhdGVdPVwibWF4RGF0ZVwiXG4gICAgICBbbWluRGF0ZV09XCJtaW5EYXRlXCJcbiAgICAgIFtkYXRlQ2xhc3NdPVwiZGF0ZUNsYXNzXCJcbiAgICAgIChtb250aFNlbGVjdGVkKT1cIl9tb250aFNlbGVjdGVkSW5ZZWFyVmlldygkZXZlbnQpXCJcbiAgICAgIChzZWxlY3RlZENoYW5nZSk9XCJfZ29Ub0RhdGVJblZpZXcoJGV2ZW50LCAnbW9udGgnKVwiPlxuICA8L21hdC15ZWFyLXZpZXc+XG5cbiAgPG1hdC1tdWx0aS15ZWFyLXZpZXdcbiAgICAgICpuZ1N3aXRjaENhc2U9XCInbXVsdGkteWVhcidcIlxuICAgICAgWyhhY3RpdmVEYXRlKV09XCJhY3RpdmVEYXRlXCJcbiAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICBbZGF0ZUZpbHRlcl09XCJkYXRlRmlsdGVyXCJcbiAgICAgIFttYXhEYXRlXT1cIm1heERhdGVcIlxuICAgICAgW21pbkRhdGVdPVwibWluRGF0ZVwiXG4gICAgICBbZGF0ZUNsYXNzXT1cImRhdGVDbGFzc1wiXG4gICAgICAoeWVhclNlbGVjdGVkKT1cIl95ZWFyU2VsZWN0ZWRJbk11bHRpWWVhclZpZXcoJGV2ZW50KVwiXG4gICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwiX2dvVG9EYXRlSW5WaWV3KCRldmVudCwgJ3llYXInKVwiPlxuICA8L21hdC1tdWx0aS15ZWFyLXZpZXc+XG48L2Rpdj5cbiJdfQ==