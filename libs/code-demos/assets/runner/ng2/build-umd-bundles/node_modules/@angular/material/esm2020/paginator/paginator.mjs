/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, EventEmitter, Inject, InjectionToken, Input, Optional, Output, ViewEncapsulation, } from '@angular/core';
import { mixinDisabled, mixinInitialized, } from '@angular/material/core';
import { coerceBooleanProperty, coerceNumberProperty, } from '@angular/cdk/coercion';
import { MatPaginatorIntl } from './paginator-intl';
import * as i0 from "@angular/core";
import * as i1 from "./paginator-intl";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/select";
import * as i6 from "@angular/material/core";
import * as i7 from "@angular/material/tooltip";
/** The default page size if there is no page size and there are no provided page size options. */
const DEFAULT_PAGE_SIZE = 50;
/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
export class PageEvent {
}
/** Injection token that can be used to provide the default options for the paginator module. */
export const MAT_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken('MAT_PAGINATOR_DEFAULT_OPTIONS');
// Boilerplate for applying mixins to _MatPaginatorBase.
/** @docs-private */
const _MatPaginatorMixinBase = mixinDisabled(mixinInitialized(class {
}));
/**
 * Base class with all of the `MatPaginator` functionality.
 * @docs-private
 */
export class _MatPaginatorBase extends _MatPaginatorMixinBase {
    constructor(_intl, _changeDetectorRef, defaults) {
        super();
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._pageIndex = 0;
        this._length = 0;
        this._pageSizeOptions = [];
        this._hidePageSize = false;
        this._showFirstLastButtons = false;
        /** Used to configure the underlying `MatSelect` inside the paginator. */
        this.selectConfig = {};
        /** Event emitted when the paginator changes the page size or page index. */
        this.page = new EventEmitter();
        this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
        if (defaults) {
            const { pageSize, pageSizeOptions, hidePageSize, showFirstLastButtons } = defaults;
            if (pageSize != null) {
                this._pageSize = pageSize;
            }
            if (pageSizeOptions != null) {
                this._pageSizeOptions = pageSizeOptions;
            }
            if (hidePageSize != null) {
                this._hidePageSize = hidePageSize;
            }
            if (showFirstLastButtons != null) {
                this._showFirstLastButtons = showFirstLastButtons;
            }
        }
    }
    /** The zero-based page index of the displayed list of items. Defaulted to 0. */
    get pageIndex() {
        return this._pageIndex;
    }
    set pageIndex(value) {
        this._pageIndex = Math.max(coerceNumberProperty(value), 0);
        this._changeDetectorRef.markForCheck();
    }
    /** The length of the total number of items that are being paginated. Defaulted to 0. */
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = coerceNumberProperty(value);
        this._changeDetectorRef.markForCheck();
    }
    /** Number of items to display on a page. By default set to 50. */
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._pageSize = Math.max(coerceNumberProperty(value), 0);
        this._updateDisplayedPageSizeOptions();
    }
    /** The set of provided page size options to display to the user. */
    get pageSizeOptions() {
        return this._pageSizeOptions;
    }
    set pageSizeOptions(value) {
        this._pageSizeOptions = (value || []).map(p => coerceNumberProperty(p));
        this._updateDisplayedPageSizeOptions();
    }
    /** Whether to hide the page size selection UI from the user. */
    get hidePageSize() {
        return this._hidePageSize;
    }
    set hidePageSize(value) {
        this._hidePageSize = coerceBooleanProperty(value);
    }
    /** Whether to show the first/last buttons UI to the user. */
    get showFirstLastButtons() {
        return this._showFirstLastButtons;
    }
    set showFirstLastButtons(value) {
        this._showFirstLastButtons = coerceBooleanProperty(value);
    }
    ngOnInit() {
        this._initialized = true;
        this._updateDisplayedPageSizeOptions();
        this._markInitialized();
    }
    ngOnDestroy() {
        this._intlChanges.unsubscribe();
    }
    /** Advances to the next page if it exists. */
    nextPage() {
        if (!this.hasNextPage()) {
            return;
        }
        const previousPageIndex = this.pageIndex;
        this.pageIndex = this.pageIndex + 1;
        this._emitPageEvent(previousPageIndex);
    }
    /** Move back to the previous page if it exists. */
    previousPage() {
        if (!this.hasPreviousPage()) {
            return;
        }
        const previousPageIndex = this.pageIndex;
        this.pageIndex = this.pageIndex - 1;
        this._emitPageEvent(previousPageIndex);
    }
    /** Move to the first page if not already there. */
    firstPage() {
        // hasPreviousPage being false implies at the start
        if (!this.hasPreviousPage()) {
            return;
        }
        const previousPageIndex = this.pageIndex;
        this.pageIndex = 0;
        this._emitPageEvent(previousPageIndex);
    }
    /** Move to the last page if not already there. */
    lastPage() {
        // hasNextPage being false implies at the end
        if (!this.hasNextPage()) {
            return;
        }
        const previousPageIndex = this.pageIndex;
        this.pageIndex = this.getNumberOfPages() - 1;
        this._emitPageEvent(previousPageIndex);
    }
    /** Whether there is a previous page. */
    hasPreviousPage() {
        return this.pageIndex >= 1 && this.pageSize != 0;
    }
    /** Whether there is a next page. */
    hasNextPage() {
        const maxPageIndex = this.getNumberOfPages() - 1;
        return this.pageIndex < maxPageIndex && this.pageSize != 0;
    }
    /** Calculate the number of pages */
    getNumberOfPages() {
        if (!this.pageSize) {
            return 0;
        }
        return Math.ceil(this.length / this.pageSize);
    }
    /**
     * Changes the page size so that the first item displayed on the page will still be
     * displayed using the new page size.
     *
     * For example, if the page size is 10 and on the second page (items indexed 10-19) then
     * switching so that the page size is 5 will set the third page as the current page so
     * that the 10th item will still be displayed.
     */
    _changePageSize(pageSize) {
        // Current page needs to be updated to reflect the new page size. Navigate to the page
        // containing the previous page's first item.
        const startIndex = this.pageIndex * this.pageSize;
        const previousPageIndex = this.pageIndex;
        this.pageIndex = Math.floor(startIndex / pageSize) || 0;
        this.pageSize = pageSize;
        this._emitPageEvent(previousPageIndex);
    }
    /** Checks whether the buttons for going forwards should be disabled. */
    _nextButtonsDisabled() {
        return this.disabled || !this.hasNextPage();
    }
    /** Checks whether the buttons for going backwards should be disabled. */
    _previousButtonsDisabled() {
        return this.disabled || !this.hasPreviousPage();
    }
    /**
     * Updates the list of page size options to display to the user. Includes making sure that
     * the page size is an option and that the list is sorted.
     */
    _updateDisplayedPageSizeOptions() {
        if (!this._initialized) {
            return;
        }
        // If no page size is provided, use the first page size option or the default page size.
        if (!this.pageSize) {
            this._pageSize =
                this.pageSizeOptions.length != 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
        }
        this._displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this._displayedPageSizeOptions.push(this.pageSize);
        }
        // Sort the numbers using a number-specific sort function.
        this._displayedPageSizeOptions.sort((a, b) => a - b);
        this._changeDetectorRef.markForCheck();
    }
    /** Emits an event notifying that a change of the paginator's properties has been triggered. */
    _emitPageEvent(previousPageIndex) {
        this.page.emit({
            previousPageIndex,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length,
        });
    }
}
_MatPaginatorBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatPaginatorBase, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
_MatPaginatorBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _MatPaginatorBase, inputs: { color: "color", pageIndex: "pageIndex", length: "length", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions", hidePageSize: "hidePageSize", showFirstLastButtons: "showFirstLastButtons", selectConfig: "selectConfig" }, outputs: { page: "page" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatPaginatorBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.MatPaginatorIntl }, { type: i0.ChangeDetectorRef }, { type: undefined }]; }, propDecorators: { color: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], length: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], hidePageSize: [{
                type: Input
            }], showFirstLastButtons: [{
                type: Input
            }], selectConfig: [{
                type: Input
            }], page: [{
                type: Output
            }] } });
let nextUniqueId = 0;
/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
export class MatPaginator extends _MatPaginatorBase {
    constructor(intl, changeDetectorRef, defaults) {
        super(intl, changeDetectorRef, defaults);
        /** ID for the DOM node containing the paginator's items per page label. */
        this._pageSizeLabelId = `mat-paginator-page-size-label-${nextUniqueId++}`;
        this._formFieldAppearance = defaults?.formFieldAppearance || 'outline';
    }
}
MatPaginator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatPaginator, deps: [{ token: i1.MatPaginatorIntl }, { token: i0.ChangeDetectorRef }, { token: MAT_PAGINATOR_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatPaginator.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatPaginator, selector: "mat-paginator", inputs: { disabled: "disabled" }, host: { attributes: { "role": "group" }, classAttribute: "mat-mdc-paginator" }, exportAs: ["matPaginator"], usesInheritance: true, ngImport: i0, template: "<div class=\"mat-mdc-paginator-outer-container\">\n  <div class=\"mat-mdc-paginator-container\">\n    <div class=\"mat-mdc-paginator-page-size\" *ngIf=\"!hidePageSize\">\n      <div class=\"mat-mdc-paginator-page-size-label\" id=\"{{_pageSizeLabelId}}\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field\n        *ngIf=\"_displayedPageSizeOptions.length > 1\"\n        [appearance]=\"_formFieldAppearance!\"\n        [color]=\"color\"\n        class=\"mat-mdc-paginator-page-size-select\">\n        <mat-select\n          [value]=\"pageSize\"\n          [disabled]=\"disabled\"\n          [aria-labelledby]=\"_pageSizeLabelId\"\n          [panelClass]=\"selectConfig.panelClass || ''\"\n          [disableOptionCentering]=\"selectConfig.disableOptionCentering\"\n          (selectionChange)=\"_changePageSize($event.value)\">\n          <mat-option *ngFor=\"let pageSizeOption of _displayedPageSizeOptions\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <div\n        class=\"mat-mdc-paginator-page-size-value\"\n        *ngIf=\"_displayedPageSizeOptions.length <= 1\">{{pageSize}}</div>\n    </div>\n\n    <div class=\"mat-mdc-paginator-range-actions\">\n      <div class=\"mat-mdc-paginator-range-label\" aria-live=\"polite\">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-first\"\n              (click)=\"firstPage()\"\n              [attr.aria-label]=\"_intl.firstPageLabel\"\n              [matTooltip]=\"_intl.firstPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-previous\"\n              (click)=\"previousPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-next\"\n              (click)=\"nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-last\"\n              (click)=\"lastPage()\"\n              [attr.aria-label]=\"_intl.lastPageLabel\"\n              [matTooltip]=\"_intl.lastPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".mat-mdc-paginator{display:block}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:84px}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon,.cdk-high-contrast-active .mat-mdc-paginator-icon{fill:currentColor;fill:CanvasText}.cdk-high-contrast-active .mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "component", type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "component", type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: i7.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatPaginator, decorators: [{
            type: Component,
            args: [{ selector: 'mat-paginator', exportAs: 'matPaginator', inputs: ['disabled'], host: {
                        'class': 'mat-mdc-paginator',
                        'role': 'group',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mat-mdc-paginator-outer-container\">\n  <div class=\"mat-mdc-paginator-container\">\n    <div class=\"mat-mdc-paginator-page-size\" *ngIf=\"!hidePageSize\">\n      <div class=\"mat-mdc-paginator-page-size-label\" id=\"{{_pageSizeLabelId}}\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field\n        *ngIf=\"_displayedPageSizeOptions.length > 1\"\n        [appearance]=\"_formFieldAppearance!\"\n        [color]=\"color\"\n        class=\"mat-mdc-paginator-page-size-select\">\n        <mat-select\n          [value]=\"pageSize\"\n          [disabled]=\"disabled\"\n          [aria-labelledby]=\"_pageSizeLabelId\"\n          [panelClass]=\"selectConfig.panelClass || ''\"\n          [disableOptionCentering]=\"selectConfig.disableOptionCentering\"\n          (selectionChange)=\"_changePageSize($event.value)\">\n          <mat-option *ngFor=\"let pageSizeOption of _displayedPageSizeOptions\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <div\n        class=\"mat-mdc-paginator-page-size-value\"\n        *ngIf=\"_displayedPageSizeOptions.length <= 1\">{{pageSize}}</div>\n    </div>\n\n    <div class=\"mat-mdc-paginator-range-actions\">\n      <div class=\"mat-mdc-paginator-range-label\" aria-live=\"polite\">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-first\"\n              (click)=\"firstPage()\"\n              [attr.aria-label]=\"_intl.firstPageLabel\"\n              [matTooltip]=\"_intl.firstPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-previous\"\n              (click)=\"previousPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-next\"\n              (click)=\"nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-last\"\n              (click)=\"lastPage()\"\n              [attr.aria-label]=\"_intl.lastPageLabel\"\n              [matTooltip]=\"_intl.lastPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".mat-mdc-paginator{display:block}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:84px}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon,.cdk-high-contrast-active .mat-mdc-paginator-icon{fill:currentColor;fill:CanvasText}.cdk-high-contrast-active .mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}"] }]
        }], ctorParameters: function () { return [{ type: i1.MatPaginatorIntl }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_PAGINATOR_DEFAULT_OPTIONS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3BhZ2luYXRvci9wYWdpbmF0b3IudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcGFnaW5hdG9yL3BhZ2luYXRvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFHTCxhQUFhLEVBQ2IsZ0JBQWdCLEdBRWpCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsR0FFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7O0FBRWxELGtHQUFrRztBQUNsRyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQVc3Qjs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sU0FBUztDQWVyQjtBQXdCRCxnR0FBZ0c7QUFDaEcsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQUcsSUFBSSxjQUFjLENBQzdELCtCQUErQixDQUNoQyxDQUFDO0FBRUYsd0RBQXdEO0FBQ3hELG9CQUFvQjtBQUNwQixNQUFNLHNCQUFzQixHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztDQUFRLENBQUMsQ0FBQyxDQUFDO0FBRXpFOzs7R0FHRztBQUVILE1BQU0sT0FBZ0IsaUJBUXBCLFNBQVEsc0JBQXNCO0lBa0Y5QixZQUNTLEtBQXVCLEVBQ3RCLGtCQUFxQyxFQUM3QyxRQUFZO1FBRVosS0FBSyxFQUFFLENBQUM7UUFK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aUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFSM0MsMkVBQTJFO1FBQ2xFLHFCQUFnQixHQUFHLGlDQUFpQyxZQUFZLEVBQUUsRUFBRSxDQUFDO1FBUTVFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLEVBQUUsbUJBQW1CLElBQUksU0FBUyxDQUFDO0lBQ3pFLENBQUM7OzhHQWRVLFlBQVksbUZBVUQsNkJBQTZCO2tHQVZ4QyxZQUFZLDBOQ3RZekIsaytIQXdGQTtnR0Q4U2EsWUFBWTtrQkFieEIsU0FBUzsrQkFDRSxlQUFlLFlBQ2YsY0FBYyxVQUdoQixDQUFDLFVBQVUsQ0FBQyxRQUNkO3dCQUNKLE9BQU8sRUFBRSxtQkFBbUI7d0JBQzVCLE1BQU0sRUFBRSxPQUFPO3FCQUNoQixtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBWWxDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZEFwcGVhcmFuY2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZSxcbiAgSGFzSW5pdGlhbGl6ZWQsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluSW5pdGlhbGl6ZWQsXG4gIFRoZW1lUGFsZXR0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBCb29sZWFuSW5wdXQsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgY29lcmNlTnVtYmVyUHJvcGVydHksXG4gIE51bWJlcklucHV0LFxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtNYXRQYWdpbmF0b3JJbnRsfSBmcm9tICcuL3BhZ2luYXRvci1pbnRsJztcblxuLyoqIFRoZSBkZWZhdWx0IHBhZ2Ugc2l6ZSBpZiB0aGVyZSBpcyBubyBwYWdlIHNpemUgYW5kIHRoZXJlIGFyZSBubyBwcm92aWRlZCBwYWdlIHNpemUgb3B0aW9ucy4gKi9cbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gNTA7XG5cbi8qKiBPYmplY3QgdGhhdCBjYW4gdXNlZCB0byBjb25maWd1cmUgdGhlIHVuZGVybHlpbmcgYE1hdFNlbGVjdGAgaW5zaWRlIGEgYE1hdFBhZ2luYXRvcmAuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFBhZ2luYXRvclNlbGVjdENvbmZpZyB7XG4gIC8qKiBXaGV0aGVyIHRvIGNlbnRlciB0aGUgYWN0aXZlIG9wdGlvbiBvdmVyIHRoZSB0cmlnZ2VyLiAqL1xuICBkaXNhYmxlT3B0aW9uQ2VudGVyaW5nPzogYm9vbGVhbjtcblxuICAvKiogQ2xhc3NlcyB0byBiZSBwYXNzZWQgdG8gdGhlIHNlbGVjdCBwYW5lbC4gKi9cbiAgcGFuZWxDbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7W2tleTogc3RyaW5nXTogYW55fTtcbn1cblxuLyoqXG4gKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYVxuICogZGlmZmVyZW50IHBhZ2Ugc2l6ZSBvciBuYXZpZ2F0ZXMgdG8gYW5vdGhlciBwYWdlLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZUV2ZW50IHtcbiAgLyoqIFRoZSBjdXJyZW50IHBhZ2UgaW5kZXguICovXG4gIHBhZ2VJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgcGFnZSB0aGF0IHdhcyBzZWxlY3RlZCBwcmV2aW91c2x5LlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDguMC4wIFRvIGJlIG1hZGUgaW50byBhIHJlcXVpcmVkIHByb3BlcnR5LlxuICAgKi9cbiAgcHJldmlvdXNQYWdlSW5kZXg/OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBjdXJyZW50IHBhZ2Ugc2l6ZS4gKi9cbiAgcGFnZVNpemU6IG51bWJlcjtcblxuICAvKiogVGhlIGN1cnJlbnQgdG90YWwgbnVtYmVyIG9mIGl0ZW1zIGJlaW5nIHBhZ2VkLiAqL1xuICBsZW5ndGg6IG51bWJlcjtcbn1cblxuLy8gTm90ZSB0aGF0IHdoaWxlIGBNYXRQYWdpbmF0b3JEZWZhdWx0T3B0aW9uc2AgYW5kIGBNQVRfUEFHSU5BVE9SX0RFRkFVTFRfT1BUSU9OU2AgYXJlIGlkZW50aWNhbFxuLy8gYmV0d2VlbiB0aGUgTURDIGFuZCBub24tTURDIHZlcnNpb25zLCB3ZSBoYXZlIHRvIGR1cGxpY2F0ZSB0aGVtLCBiZWNhdXNlIHRoZSB0eXBlIG9mXG4vLyBgZm9ybUZpZWxkQXBwZWFyYW5jZWAgaXMgbmFycm93ZXIgaW4gdGhlIE1EQyB2ZXJzaW9uLlxuXG4vKiogT2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBwYWdpbmF0b3IgbW9kdWxlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRQYWdpbmF0b3JEZWZhdWx0T3B0aW9ucyB7XG4gIC8qKiBOdW1iZXIgb2YgaXRlbXMgdG8gZGlzcGxheSBvbiBhIHBhZ2UuIEJ5IGRlZmF1bHQgc2V0IHRvIDUwLiAqL1xuICBwYWdlU2l6ZT86IG51bWJlcjtcblxuICAvKiogVGhlIHNldCBvZiBwcm92aWRlZCBwYWdlIHNpemUgb3B0aW9ucyB0byBkaXNwbGF5IHRvIHRoZSB1c2VyLiAqL1xuICBwYWdlU2l6ZU9wdGlvbnM/OiBudW1iZXJbXTtcblxuICAvKiogV2hldGhlciB0byBoaWRlIHRoZSBwYWdlIHNpemUgc2VsZWN0aW9uIFVJIGZyb20gdGhlIHVzZXIuICovXG4gIGhpZGVQYWdlU2l6ZT86IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyB0aGUgZmlyc3QvbGFzdCBidXR0b25zIFVJIHRvIHRoZSB1c2VyLiAqL1xuICBzaG93Rmlyc3RMYXN0QnV0dG9ucz86IGJvb2xlYW47XG5cbiAgLyoqIFRoZSBkZWZhdWx0IGZvcm0tZmllbGQgYXBwZWFyYW5jZSB0byBhcHBseSB0byB0aGUgcGFnZSBzaXplIG9wdGlvbnMgc2VsZWN0b3IuICovXG4gIGZvcm1GaWVsZEFwcGVhcmFuY2U/OiBNYXRGb3JtRmllbGRBcHBlYXJhbmNlO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciB0aGUgcGFnaW5hdG9yIG1vZHVsZS4gKi9cbmV4cG9ydCBjb25zdCBNQVRfUEFHSU5BVE9SX0RFRkFVTFRfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRQYWdpbmF0b3JEZWZhdWx0T3B0aW9ucz4oXG4gICdNQVRfUEFHSU5BVE9SX0RFRkFVTFRfT1BUSU9OUycsXG4pO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIF9NYXRQYWdpbmF0b3JCYXNlLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmNvbnN0IF9NYXRQYWdpbmF0b3JNaXhpbkJhc2UgPSBtaXhpbkRpc2FibGVkKG1peGluSW5pdGlhbGl6ZWQoY2xhc3Mge30pKTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIHdpdGggYWxsIG9mIHRoZSBgTWF0UGFnaW5hdG9yYCBmdW5jdGlvbmFsaXR5LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBfTWF0UGFnaW5hdG9yQmFzZTxcbiAgICBPIGV4dGVuZHMge1xuICAgICAgcGFnZVNpemU/OiBudW1iZXI7XG4gICAgICBwYWdlU2l6ZU9wdGlvbnM/OiBudW1iZXJbXTtcbiAgICAgIGhpZGVQYWdlU2l6ZT86IGJvb2xlYW47XG4gICAgICBzaG93Rmlyc3RMYXN0QnV0dG9ucz86IGJvb2xlYW47XG4gICAgfSxcbiAgPlxuICBleHRlbmRzIF9NYXRQYWdpbmF0b3JNaXhpbkJhc2VcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ2FuRGlzYWJsZSwgSGFzSW5pdGlhbGl6ZWRcbntcbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2ludGxDaGFuZ2VzOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqIFRoZW1lIGNvbG9yIHRvIGJlIHVzZWQgZm9yIHRoZSB1bmRlcmx5aW5nIGZvcm0gY29udHJvbHMuICovXG4gIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGU7XG5cbiAgLyoqIFRoZSB6ZXJvLWJhc2VkIHBhZ2UgaW5kZXggb2YgdGhlIGRpc3BsYXllZCBsaXN0IG9mIGl0ZW1zLiBEZWZhdWx0ZWQgdG8gMC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHBhZ2VJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wYWdlSW5kZXg7XG4gIH1cbiAgc2V0IHBhZ2VJbmRleCh2YWx1ZTogTnVtYmVySW5wdXQpIHtcbiAgICB0aGlzLl9wYWdlSW5kZXggPSBNYXRoLm1heChjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSksIDApO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIHByaXZhdGUgX3BhZ2VJbmRleCA9IDA7XG5cbiAgLyoqIFRoZSBsZW5ndGggb2YgdGhlIHRvdGFsIG51bWJlciBvZiBpdGVtcyB0aGF0IGFyZSBiZWluZyBwYWdpbmF0ZWQuIERlZmF1bHRlZCB0byAwLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcbiAgfVxuICBzZXQgbGVuZ3RoKHZhbHVlOiBOdW1iZXJJbnB1dCkge1xuICAgIHRoaXMuX2xlbmd0aCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBwcml2YXRlIF9sZW5ndGggPSAwO1xuXG4gIC8qKiBOdW1iZXIgb2YgaXRlbXMgdG8gZGlzcGxheSBvbiBhIHBhZ2UuIEJ5IGRlZmF1bHQgc2V0IHRvIDUwLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XG4gIH1cbiAgc2V0IHBhZ2VTaXplKHZhbHVlOiBOdW1iZXJJbnB1dCkge1xuICAgIHRoaXMuX3BhZ2VTaXplID0gTWF0aC5tYXgoY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpLCAwKTtcbiAgICB0aGlzLl91cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTtcbiAgfVxuICBwcml2YXRlIF9wYWdlU2l6ZTogbnVtYmVyO1xuXG4gIC8qKiBUaGUgc2V0IG9mIHByb3ZpZGVkIHBhZ2Ugc2l6ZSBvcHRpb25zIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXIuICovXG4gIEBJbnB1dCgpXG4gIGdldCBwYWdlU2l6ZU9wdGlvbnMoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLl9wYWdlU2l6ZU9wdGlvbnM7XG4gIH1cbiAgc2V0IHBhZ2VTaXplT3B0aW9ucyh2YWx1ZTogbnVtYmVyW10gfCByZWFkb25seSBudW1iZXJbXSkge1xuICAgIHRoaXMuX3BhZ2VTaXplT3B0aW9ucyA9ICh2YWx1ZSB8fCBbXSkubWFwKHAgPT4gY29lcmNlTnVtYmVyUHJvcGVydHkocCkpO1xuICAgIHRoaXMuX3VwZGF0ZURpc3BsYXllZFBhZ2VTaXplT3B0aW9ucygpO1xuICB9XG4gIHByaXZhdGUgX3BhZ2VTaXplT3B0aW9uczogbnVtYmVyW10gPSBbXTtcblxuICAvKiogV2hldGhlciB0byBoaWRlIHRoZSBwYWdlIHNpemUgc2VsZWN0aW9uIFVJIGZyb20gdGhlIHVzZXIuICovXG4gIEBJbnB1dCgpXG4gIGdldCBoaWRlUGFnZVNpemUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVQYWdlU2l6ZTtcbiAgfVxuICBzZXQgaGlkZVBhZ2VTaXplKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9oaWRlUGFnZVNpemUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2hpZGVQYWdlU2l6ZSA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgdGhlIGZpcnN0L2xhc3QgYnV0dG9ucyBVSSB0byB0aGUgdXNlci4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNob3dGaXJzdExhc3RCdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zaG93Rmlyc3RMYXN0QnV0dG9ucztcbiAgfVxuICBzZXQgc2hvd0ZpcnN0TGFzdEJ1dHRvbnModmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX3Nob3dGaXJzdExhc3RCdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9zaG93Rmlyc3RMYXN0QnV0dG9ucyA9IGZhbHNlO1xuXG4gIC8qKiBVc2VkIHRvIGNvbmZpZ3VyZSB0aGUgdW5kZXJseWluZyBgTWF0U2VsZWN0YCBpbnNpZGUgdGhlIHBhZ2luYXRvci4gKi9cbiAgQElucHV0KCkgc2VsZWN0Q29uZmlnOiBNYXRQYWdpbmF0b3JTZWxlY3RDb25maWcgPSB7fTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwYWdpbmF0b3IgY2hhbmdlcyB0aGUgcGFnZSBzaXplIG9yIHBhZ2UgaW5kZXguICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBwYWdlOiBFdmVudEVtaXR0ZXI8UGFnZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnZUV2ZW50PigpO1xuXG4gIC8qKiBEaXNwbGF5ZWQgc2V0IG9mIHBhZ2Ugc2l6ZSBvcHRpb25zLiBXaWxsIGJlIHNvcnRlZCBhbmQgaW5jbHVkZSBjdXJyZW50IHBhZ2Ugc2l6ZS4gKi9cbiAgX2Rpc3BsYXllZFBhZ2VTaXplT3B0aW9uczogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9pbnRsOiBNYXRQYWdpbmF0b3JJbnRsLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBkZWZhdWx0cz86IE8sXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faW50bENoYW5nZXMgPSBfaW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG5cbiAgICBpZiAoZGVmYXVsdHMpIHtcbiAgICAgIGNvbnN0IHtwYWdlU2l6ZSwgcGFnZVNpemVPcHRpb25zLCBoaWRlUGFnZVNpemUsIHNob3dGaXJzdExhc3RCdXR0b25zfSA9IGRlZmF1bHRzO1xuXG4gICAgICBpZiAocGFnZVNpemUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFnZVNpemVPcHRpb25zICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcGFnZVNpemVPcHRpb25zID0gcGFnZVNpemVPcHRpb25zO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGlkZVBhZ2VTaXplICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5faGlkZVBhZ2VTaXplID0gaGlkZVBhZ2VTaXplO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hvd0ZpcnN0TGFzdEJ1dHRvbnMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9zaG93Rmlyc3RMYXN0QnV0dG9ucyA9IHNob3dGaXJzdExhc3RCdXR0b25zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl91cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTtcbiAgICB0aGlzLl9tYXJrSW5pdGlhbGl6ZWQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ludGxDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKiogQWR2YW5jZXMgdG8gdGhlIG5leHQgcGFnZSBpZiBpdCBleGlzdHMuICovXG4gIG5leHRQYWdlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNOZXh0UGFnZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSB0aGlzLnBhZ2VJbmRleDtcbiAgICB0aGlzLnBhZ2VJbmRleCA9IHRoaXMucGFnZUluZGV4ICsgMTtcbiAgICB0aGlzLl9lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKiBNb3ZlIGJhY2sgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzLiAqL1xuICBwcmV2aW91c1BhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc1ByZXZpb3VzUGFnZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSB0aGlzLnBhZ2VJbmRleDtcbiAgICB0aGlzLnBhZ2VJbmRleCA9IHRoaXMucGFnZUluZGV4IC0gMTtcbiAgICB0aGlzLl9lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKiBNb3ZlIHRvIHRoZSBmaXJzdCBwYWdlIGlmIG5vdCBhbHJlYWR5IHRoZXJlLiAqL1xuICBmaXJzdFBhZ2UoKTogdm9pZCB7XG4gICAgLy8gaGFzUHJldmlvdXNQYWdlIGJlaW5nIGZhbHNlIGltcGxpZXMgYXQgdGhlIHN0YXJ0XG4gICAgaWYgKCF0aGlzLmhhc1ByZXZpb3VzUGFnZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSB0aGlzLnBhZ2VJbmRleDtcbiAgICB0aGlzLnBhZ2VJbmRleCA9IDA7XG4gICAgdGhpcy5fZW1pdFBhZ2VFdmVudChwcmV2aW91c1BhZ2VJbmRleCk7XG4gIH1cblxuICAvKiogTW92ZSB0byB0aGUgbGFzdCBwYWdlIGlmIG5vdCBhbHJlYWR5IHRoZXJlLiAqL1xuICBsYXN0UGFnZSgpOiB2b2lkIHtcbiAgICAvLyBoYXNOZXh0UGFnZSBiZWluZyBmYWxzZSBpbXBsaWVzIGF0IHRoZSBlbmRcbiAgICBpZiAoIXRoaXMuaGFzTmV4dFBhZ2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZpb3VzUGFnZUluZGV4ID0gdGhpcy5wYWdlSW5kZXg7XG4gICAgdGhpcy5wYWdlSW5kZXggPSB0aGlzLmdldE51bWJlck9mUGFnZXMoKSAtIDE7XG4gICAgdGhpcy5fZW1pdFBhZ2VFdmVudChwcmV2aW91c1BhZ2VJbmRleCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGVyZSBpcyBhIHByZXZpb3VzIHBhZ2UuICovXG4gIGhhc1ByZXZpb3VzUGFnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlSW5kZXggPj0gMSAmJiB0aGlzLnBhZ2VTaXplICE9IDA7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGVyZSBpcyBhIG5leHQgcGFnZS4gKi9cbiAgaGFzTmV4dFBhZ2UoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbWF4UGFnZUluZGV4ID0gdGhpcy5nZXROdW1iZXJPZlBhZ2VzKCkgLSAxO1xuICAgIHJldHVybiB0aGlzLnBhZ2VJbmRleCA8IG1heFBhZ2VJbmRleCAmJiB0aGlzLnBhZ2VTaXplICE9IDA7XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlIHRoZSBudW1iZXIgb2YgcGFnZXMgKi9cbiAgZ2V0TnVtYmVyT2ZQYWdlcygpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLmxlbmd0aCAvIHRoaXMucGFnZVNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIHBhZ2Ugc2l6ZSBzbyB0aGF0IHRoZSBmaXJzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgcGFnZSB3aWxsIHN0aWxsIGJlXG4gICAqIGRpc3BsYXllZCB1c2luZyB0aGUgbmV3IHBhZ2Ugc2l6ZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGlmIHRoZSBwYWdlIHNpemUgaXMgMTAgYW5kIG9uIHRoZSBzZWNvbmQgcGFnZSAoaXRlbXMgaW5kZXhlZCAxMC0xOSkgdGhlblxuICAgKiBzd2l0Y2hpbmcgc28gdGhhdCB0aGUgcGFnZSBzaXplIGlzIDUgd2lsbCBzZXQgdGhlIHRoaXJkIHBhZ2UgYXMgdGhlIGN1cnJlbnQgcGFnZSBzb1xuICAgKiB0aGF0IHRoZSAxMHRoIGl0ZW0gd2lsbCBzdGlsbCBiZSBkaXNwbGF5ZWQuXG4gICAqL1xuICBfY2hhbmdlUGFnZVNpemUocGFnZVNpemU6IG51bWJlcikge1xuICAgIC8vIEN1cnJlbnQgcGFnZSBuZWVkcyB0byBiZSB1cGRhdGVkIHRvIHJlZmxlY3QgdGhlIG5ldyBwYWdlIHNpemUuIE5hdmlnYXRlIHRvIHRoZSBwYWdlXG4gICAgLy8gY29udGFpbmluZyB0aGUgcHJldmlvdXMgcGFnZSdzIGZpcnN0IGl0ZW0uXG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMucGFnZUluZGV4ICogdGhpcy5wYWdlU2l6ZTtcbiAgICBjb25zdCBwcmV2aW91c1BhZ2VJbmRleCA9IHRoaXMucGFnZUluZGV4O1xuXG4gICAgdGhpcy5wYWdlSW5kZXggPSBNYXRoLmZsb29yKHN0YXJ0SW5kZXggLyBwYWdlU2l6ZSkgfHwgMDtcbiAgICB0aGlzLnBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgdGhpcy5fZW1pdFBhZ2VFdmVudChwcmV2aW91c1BhZ2VJbmRleCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGJ1dHRvbnMgZm9yIGdvaW5nIGZvcndhcmRzIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgX25leHRCdXR0b25zRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuaGFzTmV4dFBhZ2UoKTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgYnV0dG9ucyBmb3IgZ29pbmcgYmFja3dhcmRzIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgX3ByZXZpb3VzQnV0dG9uc0Rpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmhhc1ByZXZpb3VzUGFnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGxpc3Qgb2YgcGFnZSBzaXplIG9wdGlvbnMgdG8gZGlzcGxheSB0byB0aGUgdXNlci4gSW5jbHVkZXMgbWFraW5nIHN1cmUgdGhhdFxuICAgKiB0aGUgcGFnZSBzaXplIGlzIGFuIG9wdGlvbiBhbmQgdGhhdCB0aGUgbGlzdCBpcyBzb3J0ZWQuXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKSB7XG4gICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIG5vIHBhZ2Ugc2l6ZSBpcyBwcm92aWRlZCwgdXNlIHRoZSBmaXJzdCBwYWdlIHNpemUgb3B0aW9uIG9yIHRoZSBkZWZhdWx0IHBhZ2Ugc2l6ZS5cbiAgICBpZiAoIXRoaXMucGFnZVNpemUpIHtcbiAgICAgIHRoaXMuX3BhZ2VTaXplID1cbiAgICAgICAgdGhpcy5wYWdlU2l6ZU9wdGlvbnMubGVuZ3RoICE9IDAgPyB0aGlzLnBhZ2VTaXplT3B0aW9uc1swXSA6IERFRkFVTFRfUEFHRV9TSVpFO1xuICAgIH1cblxuICAgIHRoaXMuX2Rpc3BsYXllZFBhZ2VTaXplT3B0aW9ucyA9IHRoaXMucGFnZVNpemVPcHRpb25zLnNsaWNlKCk7XG5cbiAgICBpZiAodGhpcy5fZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLmluZGV4T2YodGhpcy5wYWdlU2l6ZSkgPT09IC0xKSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMucHVzaCh0aGlzLnBhZ2VTaXplKTtcbiAgICB9XG5cbiAgICAvLyBTb3J0IHRoZSBudW1iZXJzIHVzaW5nIGEgbnVtYmVyLXNwZWNpZmljIHNvcnQgZnVuY3Rpb24uXG4gICAgdGhpcy5fZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBFbWl0cyBhbiBldmVudCBub3RpZnlpbmcgdGhhdCBhIGNoYW5nZSBvZiB0aGUgcGFnaW5hdG9yJ3MgcHJvcGVydGllcyBoYXMgYmVlbiB0cmlnZ2VyZWQuICovXG4gIHByaXZhdGUgX2VtaXRQYWdlRXZlbnQocHJldmlvdXNQYWdlSW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMucGFnZS5lbWl0KHtcbiAgICAgIHByZXZpb3VzUGFnZUluZGV4LFxuICAgICAgcGFnZUluZGV4OiB0aGlzLnBhZ2VJbmRleCxcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgbGVuZ3RoOiB0aGlzLmxlbmd0aCxcbiAgICB9KTtcbiAgfVxufVxuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqXG4gKiBDb21wb25lbnQgdG8gcHJvdmlkZSBuYXZpZ2F0aW9uIGJldHdlZW4gcGFnZWQgaW5mb3JtYXRpb24uIERpc3BsYXlzIHRoZSBzaXplIG9mIHRoZSBjdXJyZW50XG4gKiBwYWdlLCB1c2VyLXNlbGVjdGFibGUgb3B0aW9ucyB0byBjaGFuZ2UgdGhhdCBzaXplLCB3aGF0IGl0ZW1zIGFyZSBiZWluZyBzaG93biwgYW5kXG4gKiBuYXZpZ2F0aW9uYWwgYnV0dG9uIHRvIGdvIHRvIHRoZSBwcmV2aW91cyBvciBuZXh0IHBhZ2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1wYWdpbmF0b3InLFxuICBleHBvcnRBczogJ21hdFBhZ2luYXRvcicsXG4gIHRlbXBsYXRlVXJsOiAncGFnaW5hdG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnaW5hdG9yLmNzcyddLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXBhZ2luYXRvcicsXG4gICAgJ3JvbGUnOiAnZ3JvdXAnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UGFnaW5hdG9yIGV4dGVuZHMgX01hdFBhZ2luYXRvckJhc2U8TWF0UGFnaW5hdG9yRGVmYXVsdE9wdGlvbnM+IHtcbiAgLyoqIElmIHNldCwgc3R5bGVzIHRoZSBcInBhZ2Ugc2l6ZVwiIGZvcm0gZmllbGQgd2l0aCB0aGUgZGVzaWduYXRlZCBzdHlsZS4gKi9cbiAgX2Zvcm1GaWVsZEFwcGVhcmFuY2U/OiBNYXRGb3JtRmllbGRBcHBlYXJhbmNlO1xuXG4gIC8qKiBJRCBmb3IgdGhlIERPTSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhZ2luYXRvcidzIGl0ZW1zIHBlciBwYWdlIGxhYmVsLiAqL1xuICByZWFkb25seSBfcGFnZVNpemVMYWJlbElkID0gYG1hdC1wYWdpbmF0b3ItcGFnZS1zaXplLWxhYmVsLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpbnRsOiBNYXRQYWdpbmF0b3JJbnRsLFxuICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9QQUdJTkFUT1JfREVGQVVMVF9PUFRJT05TKSBkZWZhdWx0cz86IE1hdFBhZ2luYXRvckRlZmF1bHRPcHRpb25zLFxuICApIHtcbiAgICBzdXBlcihpbnRsLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGVmYXVsdHMpO1xuICAgIHRoaXMuX2Zvcm1GaWVsZEFwcGVhcmFuY2UgPSBkZWZhdWx0cz8uZm9ybUZpZWxkQXBwZWFyYW5jZSB8fCAnb3V0bGluZSc7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1vdXRlci1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLWNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1wYWdlLXNpemVcIiAqbmdJZj1cIiFoaWRlUGFnZVNpemVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1wYWdlLXNpemUtbGFiZWxcIiBpZD1cInt7X3BhZ2VTaXplTGFiZWxJZH19XCI+XG4gICAgICAgIHt7X2ludGwuaXRlbXNQZXJQYWdlTGFiZWx9fVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxtYXQtZm9ybS1maWVsZFxuICAgICAgICAqbmdJZj1cIl9kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMubGVuZ3RoID4gMVwiXG4gICAgICAgIFthcHBlYXJhbmNlXT1cIl9mb3JtRmllbGRBcHBlYXJhbmNlIVwiXG4gICAgICAgIFtjb2xvcl09XCJjb2xvclwiXG4gICAgICAgIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItcGFnZS1zaXplLXNlbGVjdFwiPlxuICAgICAgICA8bWF0LXNlbGVjdFxuICAgICAgICAgIFt2YWx1ZV09XCJwYWdlU2l6ZVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICBbYXJpYS1sYWJlbGxlZGJ5XT1cIl9wYWdlU2l6ZUxhYmVsSWRcIlxuICAgICAgICAgIFtwYW5lbENsYXNzXT1cInNlbGVjdENvbmZpZy5wYW5lbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICBbZGlzYWJsZU9wdGlvbkNlbnRlcmluZ109XCJzZWxlY3RDb25maWcuZGlzYWJsZU9wdGlvbkNlbnRlcmluZ1wiXG4gICAgICAgICAgKHNlbGVjdGlvbkNoYW5nZSk9XCJfY2hhbmdlUGFnZVNpemUoJGV2ZW50LnZhbHVlKVwiPlxuICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBwYWdlU2l6ZU9wdGlvbiBvZiBfZGlzcGxheWVkUGFnZVNpemVPcHRpb25zXCIgW3ZhbHVlXT1cInBhZ2VTaXplT3B0aW9uXCI+XG4gICAgICAgICAgICB7e3BhZ2VTaXplT3B0aW9ufX1cbiAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1wYWdlLXNpemUtdmFsdWVcIlxuICAgICAgICAqbmdJZj1cIl9kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMubGVuZ3RoIDw9IDFcIj57e3BhZ2VTaXplfX08L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1yYW5nZS1hY3Rpb25zXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItcmFuZ2UtbGFiZWxcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgICAgICAge3tfaW50bC5nZXRSYW5nZUxhYmVsKHBhZ2VJbmRleCwgcGFnZVNpemUsIGxlbmd0aCl9fVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLW5hdmlnYXRpb24tZmlyc3RcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwiZmlyc3RQYWdlKClcIlxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIl9pbnRsLmZpcnN0UGFnZUxhYmVsXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiX2ludGwuZmlyc3RQYWdlTGFiZWxcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcERpc2FibGVkXT1cIl9wcmV2aW91c0J1dHRvbnNEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9wcmV2aW91c0J1dHRvbnNEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJzaG93Rmlyc3RMYXN0QnV0dG9uc1wiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItaWNvblwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmb2N1c2FibGU9XCJmYWxzZVwiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTguNDEgMTYuNTlMMTMuODIgMTJsNC41OS00LjU5TDE3IDZsLTYgNiA2IDZ6TTYgNmgydjEySDZ6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItbmF2aWdhdGlvbi1wcmV2aW91c1wiXG4gICAgICAgICAgICAgIChjbGljayk9XCJwcmV2aW91c1BhZ2UoKVwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiX2ludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJfaW50bC5wcmV2aW91c1BhZ2VMYWJlbFwiXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwRGlzYWJsZWRdPVwiX3ByZXZpb3VzQnV0dG9uc0Rpc2FibGVkKClcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcFBvc2l0aW9uXT1cIidhYm92ZSdcIlxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiX3ByZXZpb3VzQnV0dG9uc0Rpc2FibGVkKClcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLWljb25cIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZm9jdXNhYmxlPVwiZmFsc2VcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTE1LjQxIDcuNDFMMTQgNmwtNiA2IDYgNiAxLjQxLTEuNDFMMTAuODMgMTJ6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItbmF2aWdhdGlvbi1uZXh0XCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm5leHRQYWdlKClcIlxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIl9pbnRsLm5leHRQYWdlTGFiZWxcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJfaW50bC5uZXh0UGFnZUxhYmVsXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBEaXNhYmxlZF09XCJfbmV4dEJ1dHRvbnNEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9uZXh0QnV0dG9uc0Rpc2FibGVkKClcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLWljb25cIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZm9jdXNhYmxlPVwiZmFsc2VcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEwIDZMOC41OSA3LjQxIDEzLjE3IDEybC00LjU4IDQuNTlMMTAgMThsNi02elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLW5hdmlnYXRpb24tbGFzdFwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJsYXN0UGFnZSgpXCJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJfaW50bC5sYXN0UGFnZUxhYmVsXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiX2ludGwubGFzdFBhZ2VMYWJlbFwiXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwRGlzYWJsZWRdPVwiX25leHRCdXR0b25zRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwUG9zaXRpb25dPVwiJ2Fib3ZlJ1wiXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJfbmV4dEJ1dHRvbnNEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJzaG93Rmlyc3RMYXN0QnV0dG9uc1wiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItaWNvblwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmb2N1c2FibGU9XCJmYWxzZVwiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNNS41OSA3LjQxTDEwLjE4IDEybC00LjU5IDQuNTlMNyAxOGw2LTYtNi02ek0xNiA2aDJ2MTJoLTJ6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19