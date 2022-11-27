/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Optional, ViewEncapsulation, } from '@angular/core';
import { mixinDisabled } from '@angular/material/core';
import { merge } from 'rxjs';
import { MAT_SORT_DEFAULT_OPTIONS, MatSort, } from './sort';
import { matSortAnimations } from './sort-animations';
import { getSortHeaderNotContainedWithinSortError } from './sort-errors';
import { MatSortHeaderIntl } from './sort-header-intl';
import * as i0 from "@angular/core";
import * as i1 from "./sort-header-intl";
import * as i2 from "./sort";
import * as i3 from "@angular/cdk/a11y";
import * as i4 from "@angular/common";
// Boilerplate for applying mixins to the sort header.
/** @docs-private */
const _MatSortHeaderBase = mixinDisabled(class {
});
/**
 * Applies sorting behavior (click to change sort) and styles to an element, including an
 * arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent MatSort directive.
 *
 * If used on header cells in a CdkTable, it will automatically default its id from its containing
 * column definition.
 */
export class MatSortHeader extends _MatSortHeaderBase {
    constructor(
    /**
     * @deprecated `_intl` parameter isn't being used anymore and it'll be removed.
     * @breaking-change 13.0.0
     */
    _intl, _changeDetectorRef, 
    // `MatSort` is not optionally injected, but just asserted manually w/ better error.
    // tslint:disable-next-line: lightweight-tokens
    _sort, _columnDef, _focusMonitor, _elementRef, 
    /** @breaking-change 14.0.0 _ariaDescriber will be required. */
    _ariaDescriber, defaultOptions) {
        // Note that we use a string token for the `_columnDef`, because the value is provided both by
        // `material/table` and `cdk/table` and we can't have the CDK depending on Material,
        // and we want to avoid having the sort header depending on the CDK table because
        // of this single reference.
        super();
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._sort = _sort;
        this._columnDef = _columnDef;
        this._focusMonitor = _focusMonitor;
        this._elementRef = _elementRef;
        this._ariaDescriber = _ariaDescriber;
        /**
         * Flag set to true when the indicator should be displayed while the sort is not active. Used to
         * provide an affordance that the header is sortable by showing on focus and hover.
         */
        this._showIndicatorHint = false;
        /**
         * The view transition state of the arrow (translation/ opacity) - indicates its `from` and `to`
         * position through the animation. If animations are currently disabled, the fromState is removed
         * so that there is no animation displayed.
         */
        this._viewState = {};
        /** The direction the arrow should be facing according to the current state. */
        this._arrowDirection = '';
        /**
         * Whether the view state animation should show the transition between the `from` and `to` states.
         */
        this._disableViewStateAnimation = false;
        /** Sets the position of the arrow that displays when sorted. */
        this.arrowPosition = 'after';
        // Default the action description to "Sort" because it's better than nothing.
        // Without a description, the button's label comes from the sort header text content,
        // which doesn't give any indication that it performs a sorting operation.
        this._sortActionDescription = 'Sort';
        if (!_sort && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getSortHeaderNotContainedWithinSortError();
        }
        if (defaultOptions?.arrowPosition) {
            this.arrowPosition = defaultOptions?.arrowPosition;
        }
        this._handleStateChanges();
    }
    /**
     * Description applied to MatSortHeader's button element with aria-describedby. This text should
     * describe the action that will occur when the user clicks the sort header.
     */
    get sortActionDescription() {
        return this._sortActionDescription;
    }
    set sortActionDescription(value) {
        this._updateSortActionDescription(value);
    }
    /** Overrides the disable clear value of the containing MatSort for this MatSortable. */
    get disableClear() {
        return this._disableClear;
    }
    set disableClear(v) {
        this._disableClear = coerceBooleanProperty(v);
    }
    ngOnInit() {
        if (!this.id && this._columnDef) {
            this.id = this._columnDef.name;
        }
        // Initialize the direction of the arrow and set the view state to be immediately that state.
        this._updateArrowDirection();
        this._setAnimationTransitionState({
            toState: this._isSorted() ? 'active' : this._arrowDirection,
        });
        this._sort.register(this);
        this._sortButton = this._elementRef.nativeElement.querySelector('.mat-sort-header-container');
        this._updateSortActionDescription(this._sortActionDescription);
    }
    ngAfterViewInit() {
        // We use the focus monitor because we also want to style
        // things differently based on the focus origin.
        this._focusMonitor.monitor(this._elementRef, true).subscribe(origin => {
            const newState = !!origin;
            if (newState !== this._showIndicatorHint) {
                this._setIndicatorHintVisible(newState);
                this._changeDetectorRef.markForCheck();
            }
        });
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
        this._sort.deregister(this);
        this._rerenderSubscription.unsubscribe();
    }
    /**
     * Sets the "hint" state such that the arrow will be semi-transparently displayed as a hint to the
     * user showing what the active sort will become. If set to false, the arrow will fade away.
     */
    _setIndicatorHintVisible(visible) {
        // No-op if the sort header is disabled - should not make the hint visible.
        if (this._isDisabled() && visible) {
            return;
        }
        this._showIndicatorHint = visible;
        if (!this._isSorted()) {
            this._updateArrowDirection();
            if (this._showIndicatorHint) {
                this._setAnimationTransitionState({ fromState: this._arrowDirection, toState: 'hint' });
            }
            else {
                this._setAnimationTransitionState({ fromState: 'hint', toState: this._arrowDirection });
            }
        }
    }
    /**
     * Sets the animation transition view state for the arrow's position and opacity. If the
     * `disableViewStateAnimation` flag is set to true, the `fromState` will be ignored so that
     * no animation appears.
     */
    _setAnimationTransitionState(viewState) {
        this._viewState = viewState || {};
        // If the animation for arrow position state (opacity/translation) should be disabled,
        // remove the fromState so that it jumps right to the toState.
        if (this._disableViewStateAnimation) {
            this._viewState = { toState: viewState.toState };
        }
    }
    /** Triggers the sort on this sort header and removes the indicator hint. */
    _toggleOnInteraction() {
        this._sort.sort(this);
        // Do not show the animation if the header was already shown in the right position.
        if (this._viewState.toState === 'hint' || this._viewState.toState === 'active') {
            this._disableViewStateAnimation = true;
        }
    }
    _handleClick() {
        if (!this._isDisabled()) {
            this._sort.sort(this);
        }
    }
    _handleKeydown(event) {
        if (!this._isDisabled() && (event.keyCode === SPACE || event.keyCode === ENTER)) {
            event.preventDefault();
            this._toggleOnInteraction();
        }
    }
    /** Whether this MatSortHeader is currently sorted in either ascending or descending order. */
    _isSorted() {
        return (this._sort.active == this.id &&
            (this._sort.direction === 'asc' || this._sort.direction === 'desc'));
    }
    /** Returns the animation state for the arrow direction (indicator and pointers). */
    _getArrowDirectionState() {
        return `${this._isSorted() ? 'active-' : ''}${this._arrowDirection}`;
    }
    /** Returns the arrow position state (opacity, translation). */
    _getArrowViewState() {
        const fromState = this._viewState.fromState;
        return (fromState ? `${fromState}-to-` : '') + this._viewState.toState;
    }
    /**
     * Updates the direction the arrow should be pointing. If it is not sorted, the arrow should be
     * facing the start direction. Otherwise if it is sorted, the arrow should point in the currently
     * active sorted direction. The reason this is updated through a function is because the direction
     * should only be changed at specific times - when deactivated but the hint is displayed and when
     * the sort is active and the direction changes. Otherwise the arrow's direction should linger
     * in cases such as the sort becoming deactivated but we want to animate the arrow away while
     * preserving its direction, even though the next sort direction is actually different and should
     * only be changed once the arrow displays again (hint or activation).
     */
    _updateArrowDirection() {
        this._arrowDirection = this._isSorted() ? this._sort.direction : this.start || this._sort.start;
    }
    _isDisabled() {
        return this._sort.disabled || this.disabled;
    }
    /**
     * Gets the aria-sort attribute that should be applied to this sort header. If this header
     * is not sorted, returns null so that the attribute is removed from the host element. Aria spec
     * says that the aria-sort property should only be present on one header at a time, so removing
     * ensures this is true.
     */
    _getAriaSortAttribute() {
        if (!this._isSorted()) {
            return 'none';
        }
        return this._sort.direction == 'asc' ? 'ascending' : 'descending';
    }
    /** Whether the arrow inside the sort header should be rendered. */
    _renderArrow() {
        return !this._isDisabled() || this._isSorted();
    }
    _updateSortActionDescription(newDescription) {
        // We use AriaDescriber for the sort button instead of setting an `aria-label` because some
        // screen readers (notably VoiceOver) will read both the column header *and* the button's label
        // for every *cell* in the table, creating a lot of unnecessary noise.
        // If _sortButton is undefined, the component hasn't been initialized yet so there's
        // nothing to update in the DOM.
        if (this._sortButton) {
            // removeDescription will no-op if there is no existing message.
            // TODO(jelbourn): remove optional chaining when AriaDescriber is required.
            this._ariaDescriber?.removeDescription(this._sortButton, this._sortActionDescription);
            this._ariaDescriber?.describe(this._sortButton, newDescription);
        }
        this._sortActionDescription = newDescription;
    }
    /** Handles changes in the sorting state. */
    _handleStateChanges() {
        this._rerenderSubscription = merge(this._sort.sortChange, this._sort._stateChanges, this._intl.changes).subscribe(() => {
            if (this._isSorted()) {
                this._updateArrowDirection();
                // Do not show the animation if the header was already shown in the right position.
                if (this._viewState.toState === 'hint' || this._viewState.toState === 'active') {
                    this._disableViewStateAnimation = true;
                }
                this._setAnimationTransitionState({ fromState: this._arrowDirection, toState: 'active' });
                this._showIndicatorHint = false;
            }
            // If this header was recently active and now no longer sorted, animate away the arrow.
            if (!this._isSorted() && this._viewState && this._viewState.toState === 'active') {
                this._disableViewStateAnimation = false;
                this._setAnimationTransitionState({ fromState: 'active', toState: this._arrowDirection });
            }
            this._changeDetectorRef.markForCheck();
        });
    }
}
MatSortHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSortHeader, deps: [{ token: i1.MatSortHeaderIntl }, { token: i0.ChangeDetectorRef }, { token: i2.MatSort, optional: true }, { token: 'MAT_SORT_HEADER_COLUMN_DEF', optional: true }, { token: i3.FocusMonitor }, { token: i0.ElementRef }, { token: i3.AriaDescriber, optional: true }, { token: MAT_SORT_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatSortHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatSortHeader, selector: "[mat-sort-header]", inputs: { disabled: "disabled", id: ["mat-sort-header", "id"], arrowPosition: "arrowPosition", start: "start", sortActionDescription: "sortActionDescription", disableClear: "disableClear" }, host: { listeners: { "click": "_handleClick()", "keydown": "_handleKeydown($event)", "mouseenter": "_setIndicatorHintVisible(true)", "mouseleave": "_setIndicatorHintVisible(false)" }, properties: { "attr.aria-sort": "_getAriaSortAttribute()", "class.mat-sort-header-disabled": "_isDisabled()" }, classAttribute: "mat-sort-header" }, exportAs: ["matSortHeader"], usesInheritance: true, ngImport: i0, template: "<!--\n  We set the `tabindex` on an element inside the table header, rather than the header itself,\n  because of a bug in NVDA where having a `tabindex` on a `th` breaks keyboard navigation in the\n  table (see https://github.com/nvaccess/nvda/issues/7718). This allows for the header to both\n  be focusable, and have screen readers read out its `aria-sort` state. We prefer this approach\n  over having a button with an `aria-label` inside the header, because the button's `aria-label`\n  will be read out as the user is navigating the table's cell (see #13012).\n\n  The approach is based off of: https://dequeuniversity.com/library/aria/tables/sf-sortable-grid\n-->\n<div class=\"mat-sort-header-container mat-focus-indicator\"\n     [class.mat-sort-header-sorted]=\"_isSorted()\"\n     [class.mat-sort-header-position-before]=\"arrowPosition === 'before'\"\n     [attr.tabindex]=\"_isDisabled() ? null : 0\"\n     [attr.role]=\"_isDisabled() ? null : 'button'\">\n\n  <!--\n    TODO(crisbeto): this div isn't strictly necessary, but we have to keep it due to a large\n    number of screenshot diff failures. It should be removed eventually. Note that the difference\n    isn't visible with a shorter header, but once it breaks up into multiple lines, this element\n    causes it to be center-aligned, whereas removing it will keep the text to the left.\n  -->\n  <div class=\"mat-sort-header-content\">\n    <ng-content></ng-content>\n  </div>\n\n  <!-- Disable animations while a current animation is running -->\n  <div class=\"mat-sort-header-arrow\"\n       *ngIf=\"_renderArrow()\"\n       [@arrowOpacity]=\"_getArrowViewState()\"\n       [@arrowPosition]=\"_getArrowViewState()\"\n       [@allowChildren]=\"_getArrowDirectionState()\"\n       (@arrowPosition.start)=\"_disableViewStateAnimation = true\"\n       (@arrowPosition.done)=\"_disableViewStateAnimation = false\">\n    <div class=\"mat-sort-header-stem\"></div>\n    <div class=\"mat-sort-header-indicator\" [@indicator]=\"_getArrowDirectionState()\">\n      <div class=\"mat-sort-header-pointer-left\" [@leftPointer]=\"_getArrowDirectionState()\"></div>\n      <div class=\"mat-sort-header-pointer-right\" [@rightPointer]=\"_getArrowDirectionState()\"></div>\n      <div class=\"mat-sort-header-pointer-middle\"></div>\n    </div>\n  </div>\n</div>\n", styles: [".mat-sort-header-container{display:flex;cursor:pointer;align-items:center;letter-spacing:normal;outline:0}[mat-sort-header].cdk-keyboard-focused .mat-sort-header-container,[mat-sort-header].cdk-program-focused .mat-sort-header-container{border-bottom:solid 1px currentColor}.mat-sort-header-disabled .mat-sort-header-container{cursor:default}.mat-sort-header-container::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-sort-header-content{text-align:center;display:flex;align-items:center}.mat-sort-header-position-before{flex-direction:row-reverse}.mat-sort-header-arrow{height:12px;width:12px;min-width:12px;position:relative;display:flex;opacity:0}.mat-sort-header-arrow,[dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow{margin:0 0 0 6px}.mat-sort-header-position-before .mat-sort-header-arrow,[dir=rtl] .mat-sort-header-arrow{margin:0 6px 0 0}.mat-sort-header-stem{background:currentColor;height:10px;width:2px;margin:auto;display:flex;align-items:center}.cdk-high-contrast-active .mat-sort-header-stem{width:0;border-left:solid 2px}.mat-sort-header-indicator{width:100%;height:2px;display:flex;align-items:center;position:absolute;top:0;left:0}.mat-sort-header-pointer-middle{margin:auto;height:2px;width:2px;background:currentColor;transform:rotate(45deg)}.cdk-high-contrast-active .mat-sort-header-pointer-middle{width:0;height:0;border-top:solid 2px;border-left:solid 2px}.mat-sort-header-pointer-left,.mat-sort-header-pointer-right{background:currentColor;width:6px;height:2px;position:absolute;top:0}.cdk-high-contrast-active .mat-sort-header-pointer-left,.cdk-high-contrast-active .mat-sort-header-pointer-right{width:0;height:0;border-left:solid 6px;border-top:solid 2px}.mat-sort-header-pointer-left{transform-origin:right;left:0}.mat-sort-header-pointer-right{transform-origin:left;right:0}"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        matSortAnimations.indicator,
        matSortAnimations.leftPointer,
        matSortAnimations.rightPointer,
        matSortAnimations.arrowOpacity,
        matSortAnimations.arrowPosition,
        matSortAnimations.allowChildren,
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSortHeader, decorators: [{
            type: Component,
            args: [{ selector: '[mat-sort-header]', exportAs: 'matSortHeader', host: {
                        'class': 'mat-sort-header',
                        '(click)': '_handleClick()',
                        '(keydown)': '_handleKeydown($event)',
                        '(mouseenter)': '_setIndicatorHintVisible(true)',
                        '(mouseleave)': '_setIndicatorHintVisible(false)',
                        '[attr.aria-sort]': '_getAriaSortAttribute()',
                        '[class.mat-sort-header-disabled]': '_isDisabled()',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['disabled'], animations: [
                        matSortAnimations.indicator,
                        matSortAnimations.leftPointer,
                        matSortAnimations.rightPointer,
                        matSortAnimations.arrowOpacity,
                        matSortAnimations.arrowPosition,
                        matSortAnimations.allowChildren,
                    ], template: "<!--\n  We set the `tabindex` on an element inside the table header, rather than the header itself,\n  because of a bug in NVDA where having a `tabindex` on a `th` breaks keyboard navigation in the\n  table (see https://github.com/nvaccess/nvda/issues/7718). This allows for the header to both\n  be focusable, and have screen readers read out its `aria-sort` state. We prefer this approach\n  over having a button with an `aria-label` inside the header, because the button's `aria-label`\n  will be read out as the user is navigating the table's cell (see #13012).\n\n  The approach is based off of: https://dequeuniversity.com/library/aria/tables/sf-sortable-grid\n-->\n<div class=\"mat-sort-header-container mat-focus-indicator\"\n     [class.mat-sort-header-sorted]=\"_isSorted()\"\n     [class.mat-sort-header-position-before]=\"arrowPosition === 'before'\"\n     [attr.tabindex]=\"_isDisabled() ? null : 0\"\n     [attr.role]=\"_isDisabled() ? null : 'button'\">\n\n  <!--\n    TODO(crisbeto): this div isn't strictly necessary, but we have to keep it due to a large\n    number of screenshot diff failures. It should be removed eventually. Note that the difference\n    isn't visible with a shorter header, but once it breaks up into multiple lines, this element\n    causes it to be center-aligned, whereas removing it will keep the text to the left.\n  -->\n  <div class=\"mat-sort-header-content\">\n    <ng-content></ng-content>\n  </div>\n\n  <!-- Disable animations while a current animation is running -->\n  <div class=\"mat-sort-header-arrow\"\n       *ngIf=\"_renderArrow()\"\n       [@arrowOpacity]=\"_getArrowViewState()\"\n       [@arrowPosition]=\"_getArrowViewState()\"\n       [@allowChildren]=\"_getArrowDirectionState()\"\n       (@arrowPosition.start)=\"_disableViewStateAnimation = true\"\n       (@arrowPosition.done)=\"_disableViewStateAnimation = false\">\n    <div class=\"mat-sort-header-stem\"></div>\n    <div class=\"mat-sort-header-indicator\" [@indicator]=\"_getArrowDirectionState()\">\n      <div class=\"mat-sort-header-pointer-left\" [@leftPointer]=\"_getArrowDirectionState()\"></div>\n      <div class=\"mat-sort-header-pointer-right\" [@rightPointer]=\"_getArrowDirectionState()\"></div>\n      <div class=\"mat-sort-header-pointer-middle\"></div>\n    </div>\n  </div>\n</div>\n", styles: [".mat-sort-header-container{display:flex;cursor:pointer;align-items:center;letter-spacing:normal;outline:0}[mat-sort-header].cdk-keyboard-focused .mat-sort-header-container,[mat-sort-header].cdk-program-focused .mat-sort-header-container{border-bottom:solid 1px currentColor}.mat-sort-header-disabled .mat-sort-header-container{cursor:default}.mat-sort-header-container::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-sort-header-content{text-align:center;display:flex;align-items:center}.mat-sort-header-position-before{flex-direction:row-reverse}.mat-sort-header-arrow{height:12px;width:12px;min-width:12px;position:relative;display:flex;opacity:0}.mat-sort-header-arrow,[dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow{margin:0 0 0 6px}.mat-sort-header-position-before .mat-sort-header-arrow,[dir=rtl] .mat-sort-header-arrow{margin:0 6px 0 0}.mat-sort-header-stem{background:currentColor;height:10px;width:2px;margin:auto;display:flex;align-items:center}.cdk-high-contrast-active .mat-sort-header-stem{width:0;border-left:solid 2px}.mat-sort-header-indicator{width:100%;height:2px;display:flex;align-items:center;position:absolute;top:0;left:0}.mat-sort-header-pointer-middle{margin:auto;height:2px;width:2px;background:currentColor;transform:rotate(45deg)}.cdk-high-contrast-active .mat-sort-header-pointer-middle{width:0;height:0;border-top:solid 2px;border-left:solid 2px}.mat-sort-header-pointer-left,.mat-sort-header-pointer-right{background:currentColor;width:6px;height:2px;position:absolute;top:0}.cdk-high-contrast-active .mat-sort-header-pointer-left,.cdk-high-contrast-active .mat-sort-header-pointer-right{width:0;height:0;border-left:solid 6px;border-top:solid 2px}.mat-sort-header-pointer-left{transform-origin:right;left:0}.mat-sort-header-pointer-right{transform-origin:left;right:0}"] }]
        }], ctorParameters: function () { return [{ type: i1.MatSortHeaderIntl }, { type: i0.ChangeDetectorRef }, { type: i2.MatSort, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['MAT_SORT_HEADER_COLUMN_DEF']
                }, {
                    type: Optional
                }] }, { type: i3.FocusMonitor }, { type: i0.ElementRef }, { type: i3.AriaDescriber, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_SORT_DEFAULT_OPTIONS]
                }] }]; }, propDecorators: { id: [{
                type: Input,
                args: ['mat-sort-header']
            }], arrowPosition: [{
                type: Input
            }], start: [{
                type: Input
            }], sortActionDescription: [{
                type: Input
            }], disableClear: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1oZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc29ydC9zb3J0LWhlYWRlci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zb3J0L3NvcnQtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFnQixZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRSxPQUFPLEVBQUMsS0FBSyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsT0FBTyxHQUlSLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE9BQU8sRUFBQyx3Q0FBd0MsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBRXJELHNEQUFzRDtBQUN0RCxvQkFBb0I7QUFDcEIsTUFBTSxrQkFBa0IsR0FBRyxhQUFhLENBQUM7Q0FBUSxDQUFDLENBQUM7QUEyQm5EOzs7Ozs7OztHQVFHO0FBMkJILE1BQU0sT0FBTyxhQUNYLFNBQVEsa0JBQWtCO0lBc0UxQjtJQUNFOzs7T0FHRztJQUNJLEtB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LE1BQU0sVUFDdkMsQ0FBQyxVQUFVLENBQUMsY0FDUjt3QkFDVixpQkFBaUIsQ0FBQyxTQUFTO3dCQUMzQixpQkFBaUIsQ0FBQyxXQUFXO3dCQUM3QixpQkFBaUIsQ0FBQyxZQUFZO3dCQUM5QixpQkFBaUIsQ0FBQyxZQUFZO3dCQUM5QixpQkFBaUIsQ0FBQyxhQUFhO3dCQUMvQixpQkFBaUIsQ0FBQyxhQUFhO3FCQUNoQzs7MEJBa0ZFLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsNEJBQTRCOzswQkFDbkMsUUFBUTs7MEJBS1IsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyx3QkFBd0I7NENBcERSLEVBQUU7c0JBQTNCLEtBQUs7dUJBQUMsaUJBQWlCO2dCQUdmLGFBQWE7c0JBQXJCLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQU9GLHFCQUFxQjtzQkFEeEIsS0FBSztnQkFjRixZQUFZO3NCQURmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcmlhRGVzY3JpYmVyLCBGb2N1c01vbml0b3J9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0VOVEVSLCBTUEFDRX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FuRGlzYWJsZSwgbWl4aW5EaXNhYmxlZH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge21lcmdlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgTUFUX1NPUlRfREVGQVVMVF9PUFRJT05TLFxuICBNYXRTb3J0LFxuICBNYXRTb3J0YWJsZSxcbiAgTWF0U29ydERlZmF1bHRPcHRpb25zLFxuICBTb3J0SGVhZGVyQXJyb3dQb3NpdGlvbixcbn0gZnJvbSAnLi9zb3J0JztcbmltcG9ydCB7bWF0U29ydEFuaW1hdGlvbnN9IGZyb20gJy4vc29ydC1hbmltYXRpb25zJztcbmltcG9ydCB7U29ydERpcmVjdGlvbn0gZnJvbSAnLi9zb3J0LWRpcmVjdGlvbic7XG5pbXBvcnQge2dldFNvcnRIZWFkZXJOb3RDb250YWluZWRXaXRoaW5Tb3J0RXJyb3J9IGZyb20gJy4vc29ydC1lcnJvcnMnO1xuaW1wb3J0IHtNYXRTb3J0SGVhZGVySW50bH0gZnJvbSAnLi9zb3J0LWhlYWRlci1pbnRsJztcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byB0aGUgc29ydCBoZWFkZXIuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY29uc3QgX01hdFNvcnRIZWFkZXJCYXNlID0gbWl4aW5EaXNhYmxlZChjbGFzcyB7fSk7XG5cbi8qKlxuICogVmFsaWQgcG9zaXRpb25zIGZvciB0aGUgYXJyb3cgdG8gYmUgaW4gZm9yIGl0cyBvcGFjaXR5IGFuZCB0cmFuc2xhdGlvbi4gSWYgdGhlIHN0YXRlIGlzIGFcbiAqIHNvcnQgZGlyZWN0aW9uLCB0aGUgcG9zaXRpb24gb2YgdGhlIGFycm93IHdpbGwgYmUgYWJvdmUvYmVsb3cgYW5kIG9wYWNpdHkgMC4gSWYgdGhlIHN0YXRlIGlzXG4gKiBoaW50LCB0aGUgYXJyb3cgd2lsbCBiZSBpbiB0aGUgY2VudGVyIHdpdGggYSBzbGlnaHQgb3BhY2l0eS4gQWN0aXZlIHN0YXRlIG1lYW5zIHRoZSBhcnJvdyB3aWxsXG4gKiBiZSBmdWxseSBvcGFxdWUgaW4gdGhlIGNlbnRlci5cbiAqXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCB0eXBlIEFycm93Vmlld1N0YXRlID0gU29ydERpcmVjdGlvbiB8ICdoaW50JyB8ICdhY3RpdmUnO1xuXG4vKipcbiAqIFN0YXRlcyBkZXNjcmliaW5nIHRoZSBhcnJvdydzIGFuaW1hdGVkIHBvc2l0aW9uIChhbmltYXRpbmcgZnJvbVN0YXRlIHRvIHRvU3RhdGUpLlxuICogSWYgdGhlIGZyb21TdGF0ZSBpcyBub3QgZGVmaW5lZCwgdGhlcmUgd2lsbCBiZSBubyBhbmltYXRlZCB0cmFuc2l0aW9uIHRvIHRoZSB0b1N0YXRlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFycm93Vmlld1N0YXRlVHJhbnNpdGlvbiB7XG4gIGZyb21TdGF0ZT86IEFycm93Vmlld1N0YXRlO1xuICB0b1N0YXRlPzogQXJyb3dWaWV3U3RhdGU7XG59XG5cbi8qKiBDb2x1bW4gZGVmaW5pdGlvbiBhc3NvY2lhdGVkIHdpdGggYSBgTWF0U29ydEhlYWRlcmAuICovXG5pbnRlcmZhY2UgTWF0U29ydEhlYWRlckNvbHVtbkRlZiB7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBcHBsaWVzIHNvcnRpbmcgYmVoYXZpb3IgKGNsaWNrIHRvIGNoYW5nZSBzb3J0KSBhbmQgc3R5bGVzIHRvIGFuIGVsZW1lbnQsIGluY2x1ZGluZyBhblxuICogYXJyb3cgdG8gZGlzcGxheSB0aGUgY3VycmVudCBzb3J0IGRpcmVjdGlvbi5cbiAqXG4gKiBNdXN0IGJlIHByb3ZpZGVkIHdpdGggYW4gaWQgYW5kIGNvbnRhaW5lZCB3aXRoaW4gYSBwYXJlbnQgTWF0U29ydCBkaXJlY3RpdmUuXG4gKlxuICogSWYgdXNlZCBvbiBoZWFkZXIgY2VsbHMgaW4gYSBDZGtUYWJsZSwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGRlZmF1bHQgaXRzIGlkIGZyb20gaXRzIGNvbnRhaW5pbmdcbiAqIGNvbHVtbiBkZWZpbml0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbWF0LXNvcnQtaGVhZGVyXScsXG4gIGV4cG9ydEFzOiAnbWF0U29ydEhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnc29ydC1oZWFkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzb3J0LWhlYWRlci5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtc29ydC1oZWFkZXInLFxuICAgICcoY2xpY2spJzogJ19oYW5kbGVDbGljaygpJyxcbiAgICAnKGtleWRvd24pJzogJ19oYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICcobW91c2VlbnRlciknOiAnX3NldEluZGljYXRvckhpbnRWaXNpYmxlKHRydWUpJyxcbiAgICAnKG1vdXNlbGVhdmUpJzogJ19zZXRJbmRpY2F0b3JIaW50VmlzaWJsZShmYWxzZSknLFxuICAgICdbYXR0ci5hcmlhLXNvcnRdJzogJ19nZXRBcmlhU29ydEF0dHJpYnV0ZSgpJyxcbiAgICAnW2NsYXNzLm1hdC1zb3J0LWhlYWRlci1kaXNhYmxlZF0nOiAnX2lzRGlzYWJsZWQoKScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIG1hdFNvcnRBbmltYXRpb25zLmluZGljYXRvcixcbiAgICBtYXRTb3J0QW5pbWF0aW9ucy5sZWZ0UG9pbnRlcixcbiAgICBtYXRTb3J0QW5pbWF0aW9ucy5yaWdodFBvaW50ZXIsXG4gICAgbWF0U29ydEFuaW1hdGlvbnMuYXJyb3dPcGFjaXR5LFxuICAgIG1hdFNvcnRBbmltYXRpb25zLmFycm93UG9zaXRpb24sXG4gICAgbWF0U29ydEFuaW1hdGlvbnMuYWxsb3dDaGlsZHJlbixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U29ydEhlYWRlclxuICBleHRlbmRzIF9NYXRTb3J0SGVhZGVyQmFzZVxuICBpbXBsZW1lbnRzIENhbkRpc2FibGUsIE1hdFNvcnRhYmxlLCBPbkRlc3Ryb3ksIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdFxue1xuICBwcml2YXRlIF9yZXJlbmRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgZWxlbWVudCB3aXRoIHJvbGU9XCJidXR0b25cIiBpbnNpZGUgdGhpcyBjb21wb25lbnQncyB2aWV3LiBXZSBuZWVkIHRoaXNcbiAgICogaW4gb3JkZXIgdG8gYXBwbHkgYSBkZXNjcmlwdGlvbiB3aXRoIEFyaWFEZXNjcmliZXIuXG4gICAqL1xuICBwcml2YXRlIF9zb3J0QnV0dG9uOiBIVE1MRWxlbWVudDtcblxuICAvKipcbiAgICogRmxhZyBzZXQgdG8gdHJ1ZSB3aGVuIHRoZSBpbmRpY2F0b3Igc2hvdWxkIGJlIGRpc3BsYXllZCB3aGlsZSB0aGUgc29ydCBpcyBub3QgYWN0aXZlLiBVc2VkIHRvXG4gICAqIHByb3ZpZGUgYW4gYWZmb3JkYW5jZSB0aGF0IHRoZSBoZWFkZXIgaXMgc29ydGFibGUgYnkgc2hvd2luZyBvbiBmb2N1cyBhbmQgaG92ZXIuXG4gICAqL1xuICBfc2hvd0luZGljYXRvckhpbnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHZpZXcgdHJhbnNpdGlvbiBzdGF0ZSBvZiB0aGUgYXJyb3cgKHRyYW5zbGF0aW9uLyBvcGFjaXR5KSAtIGluZGljYXRlcyBpdHMgYGZyb21gIGFuZCBgdG9gXG4gICAqIHBvc2l0aW9uIHRocm91Z2ggdGhlIGFuaW1hdGlvbi4gSWYgYW5pbWF0aW9ucyBhcmUgY3VycmVudGx5IGRpc2FibGVkLCB0aGUgZnJvbVN0YXRlIGlzIHJlbW92ZWRcbiAgICogc28gdGhhdCB0aGVyZSBpcyBubyBhbmltYXRpb24gZGlzcGxheWVkLlxuICAgKi9cbiAgX3ZpZXdTdGF0ZTogQXJyb3dWaWV3U3RhdGVUcmFuc2l0aW9uID0ge307XG5cbiAgLyoqIFRoZSBkaXJlY3Rpb24gdGhlIGFycm93IHNob3VsZCBiZSBmYWNpbmcgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHN0YXRlLiAqL1xuICBfYXJyb3dEaXJlY3Rpb246IFNvcnREaXJlY3Rpb24gPSAnJztcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgdmlldyBzdGF0ZSBhbmltYXRpb24gc2hvdWxkIHNob3cgdGhlIHRyYW5zaXRpb24gYmV0d2VlbiB0aGUgYGZyb21gIGFuZCBgdG9gIHN0YXRlcy5cbiAgICovXG4gIF9kaXNhYmxlVmlld1N0YXRlQW5pbWF0aW9uID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIElEIG9mIHRoaXMgc29ydCBoZWFkZXIuIElmIHVzZWQgd2l0aGluIHRoZSBjb250ZXh0IG9mIGEgQ2RrQ29sdW1uRGVmLCB0aGlzIHdpbGwgZGVmYXVsdCB0b1xuICAgKiB0aGUgY29sdW1uJ3MgbmFtZS5cbiAgICovXG4gIEBJbnB1dCgnbWF0LXNvcnQtaGVhZGVyJykgaWQ6IHN0cmluZztcblxuICAvKiogU2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGFycm93IHRoYXQgZGlzcGxheXMgd2hlbiBzb3J0ZWQuICovXG4gIEBJbnB1dCgpIGFycm93UG9zaXRpb246IFNvcnRIZWFkZXJBcnJvd1Bvc2l0aW9uID0gJ2FmdGVyJztcblxuICAvKiogT3ZlcnJpZGVzIHRoZSBzb3J0IHN0YXJ0IHZhbHVlIG9mIHRoZSBjb250YWluaW5nIE1hdFNvcnQgZm9yIHRoaXMgTWF0U29ydGFibGUuICovXG4gIEBJbnB1dCgpIHN0YXJ0OiBTb3J0RGlyZWN0aW9uO1xuXG4gIC8qKlxuICAgKiBEZXNjcmlwdGlvbiBhcHBsaWVkIHRvIE1hdFNvcnRIZWFkZXIncyBidXR0b24gZWxlbWVudCB3aXRoIGFyaWEtZGVzY3JpYmVkYnkuIFRoaXMgdGV4dCBzaG91bGRcbiAgICogZGVzY3JpYmUgdGhlIGFjdGlvbiB0aGF0IHdpbGwgb2NjdXIgd2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIHNvcnQgaGVhZGVyLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHNvcnRBY3Rpb25EZXNjcmlwdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zb3J0QWN0aW9uRGVzY3JpcHRpb247XG4gIH1cbiAgc2V0IHNvcnRBY3Rpb25EZXNjcmlwdGlvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdXBkYXRlU29ydEFjdGlvbkRlc2NyaXB0aW9uKHZhbHVlKTtcbiAgfVxuICAvLyBEZWZhdWx0IHRoZSBhY3Rpb24gZGVzY3JpcHRpb24gdG8gXCJTb3J0XCIgYmVjYXVzZSBpdCdzIGJldHRlciB0aGFuIG5vdGhpbmcuXG4gIC8vIFdpdGhvdXQgYSBkZXNjcmlwdGlvbiwgdGhlIGJ1dHRvbidzIGxhYmVsIGNvbWVzIGZyb20gdGhlIHNvcnQgaGVhZGVyIHRleHQgY29udGVudCxcbiAgLy8gd2hpY2ggZG9lc24ndCBnaXZlIGFueSBpbmRpY2F0aW9uIHRoYXQgaXQgcGVyZm9ybXMgYSBzb3J0aW5nIG9wZXJhdGlvbi5cbiAgcHJpdmF0ZSBfc29ydEFjdGlvbkRlc2NyaXB0aW9uOiBzdHJpbmcgPSAnU29ydCc7XG5cbiAgLyoqIE92ZXJyaWRlcyB0aGUgZGlzYWJsZSBjbGVhciB2YWx1ZSBvZiB0aGUgY29udGFpbmluZyBNYXRTb3J0IGZvciB0aGlzIE1hdFNvcnRhYmxlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZUNsZWFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlQ2xlYXI7XG4gIH1cbiAgc2V0IGRpc2FibGVDbGVhcih2OiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9kaXNhYmxlQ2xlYXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZUNsZWFyOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIGBfaW50bGAgcGFyYW1ldGVyIGlzbid0IGJlaW5nIHVzZWQgYW55bW9yZSBhbmQgaXQnbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMFxuICAgICAqL1xuICAgIHB1YmxpYyBfaW50bDogTWF0U29ydEhlYWRlckludGwsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIC8vIGBNYXRTb3J0YCBpcyBub3Qgb3B0aW9uYWxseSBpbmplY3RlZCwgYnV0IGp1c3QgYXNzZXJ0ZWQgbWFudWFsbHkgdy8gYmV0dGVyIGVycm9yLlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbGlnaHR3ZWlnaHQtdG9rZW5zXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9zb3J0OiBNYXRTb3J0LFxuICAgIEBJbmplY3QoJ01BVF9TT1JUX0hFQURFUl9DT0xVTU5fREVGJylcbiAgICBAT3B0aW9uYWwoKVxuICAgIHB1YmxpYyBfY29sdW1uRGVmOiBNYXRTb3J0SGVhZGVyQ29sdW1uRGVmLFxuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIC8qKiBAYnJlYWtpbmctY2hhbmdlIDE0LjAuMCBfYXJpYURlc2NyaWJlciB3aWxsIGJlIHJlcXVpcmVkLiAqL1xuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2FyaWFEZXNjcmliZXI/OiBBcmlhRGVzY3JpYmVyIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTUFUX1NPUlRfREVGQVVMVF9PUFRJT05TKVxuICAgIGRlZmF1bHRPcHRpb25zPzogTWF0U29ydERlZmF1bHRPcHRpb25zLFxuICApIHtcbiAgICAvLyBOb3RlIHRoYXQgd2UgdXNlIGEgc3RyaW5nIHRva2VuIGZvciB0aGUgYF9jb2x1bW5EZWZgLCBiZWNhdXNlIHRoZSB2YWx1ZSBpcyBwcm92aWRlZCBib3RoIGJ5XG4gICAgLy8gYG1hdGVyaWFsL3RhYmxlYCBhbmQgYGNkay90YWJsZWAgYW5kIHdlIGNhbid0IGhhdmUgdGhlIENESyBkZXBlbmRpbmcgb24gTWF0ZXJpYWwsXG4gICAgLy8gYW5kIHdlIHdhbnQgdG8gYXZvaWQgaGF2aW5nIHRoZSBzb3J0IGhlYWRlciBkZXBlbmRpbmcgb24gdGhlIENESyB0YWJsZSBiZWNhdXNlXG4gICAgLy8gb2YgdGhpcyBzaW5nbGUgcmVmZXJlbmNlLlxuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoIV9zb3J0ICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBnZXRTb3J0SGVhZGVyTm90Q29udGFpbmVkV2l0aGluU29ydEVycm9yKCk7XG4gICAgfVxuXG4gICAgaWYgKGRlZmF1bHRPcHRpb25zPy5hcnJvd1Bvc2l0aW9uKSB7XG4gICAgICB0aGlzLmFycm93UG9zaXRpb24gPSBkZWZhdWx0T3B0aW9ucz8uYXJyb3dQb3NpdGlvbjtcbiAgICB9XG5cbiAgICB0aGlzLl9oYW5kbGVTdGF0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5pZCAmJiB0aGlzLl9jb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLl9jb2x1bW5EZWYubmFtZTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGFycm93IGFuZCBzZXQgdGhlIHZpZXcgc3RhdGUgdG8gYmUgaW1tZWRpYXRlbHkgdGhhdCBzdGF0ZS5cbiAgICB0aGlzLl91cGRhdGVBcnJvd0RpcmVjdGlvbigpO1xuICAgIHRoaXMuX3NldEFuaW1hdGlvblRyYW5zaXRpb25TdGF0ZSh7XG4gICAgICB0b1N0YXRlOiB0aGlzLl9pc1NvcnRlZCgpID8gJ2FjdGl2ZScgOiB0aGlzLl9hcnJvd0RpcmVjdGlvbixcbiAgICB9KTtcblxuICAgIHRoaXMuX3NvcnQucmVnaXN0ZXIodGhpcyk7XG5cbiAgICB0aGlzLl9zb3J0QnV0dG9uID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXQtc29ydC1oZWFkZXItY29udGFpbmVyJykhO1xuICAgIHRoaXMuX3VwZGF0ZVNvcnRBY3Rpb25EZXNjcmlwdGlvbih0aGlzLl9zb3J0QWN0aW9uRGVzY3JpcHRpb24pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIFdlIHVzZSB0aGUgZm9jdXMgbW9uaXRvciBiZWNhdXNlIHdlIGFsc28gd2FudCB0byBzdHlsZVxuICAgIC8vIHRoaW5ncyBkaWZmZXJlbnRseSBiYXNlZCBvbiB0aGUgZm9jdXMgb3JpZ2luLlxuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYsIHRydWUpLnN1YnNjcmliZShvcmlnaW4gPT4ge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSAhIW9yaWdpbjtcbiAgICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5fc2hvd0luZGljYXRvckhpbnQpIHtcbiAgICAgICAgdGhpcy5fc2V0SW5kaWNhdG9ySGludFZpc2libGUobmV3U3RhdGUpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmKTtcbiAgICB0aGlzLl9zb3J0LmRlcmVnaXN0ZXIodGhpcyk7XG4gICAgdGhpcy5fcmVyZW5kZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBcImhpbnRcIiBzdGF0ZSBzdWNoIHRoYXQgdGhlIGFycm93IHdpbGwgYmUgc2VtaS10cmFuc3BhcmVudGx5IGRpc3BsYXllZCBhcyBhIGhpbnQgdG8gdGhlXG4gICAqIHVzZXIgc2hvd2luZyB3aGF0IHRoZSBhY3RpdmUgc29ydCB3aWxsIGJlY29tZS4gSWYgc2V0IHRvIGZhbHNlLCB0aGUgYXJyb3cgd2lsbCBmYWRlIGF3YXkuXG4gICAqL1xuICBfc2V0SW5kaWNhdG9ySGludFZpc2libGUodmlzaWJsZTogYm9vbGVhbikge1xuICAgIC8vIE5vLW9wIGlmIHRoZSBzb3J0IGhlYWRlciBpcyBkaXNhYmxlZCAtIHNob3VsZCBub3QgbWFrZSB0aGUgaGludCB2aXNpYmxlLlxuICAgIGlmICh0aGlzLl9pc0Rpc2FibGVkKCkgJiYgdmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3Nob3dJbmRpY2F0b3JIaW50ID0gdmlzaWJsZTtcblxuICAgIGlmICghdGhpcy5faXNTb3J0ZWQoKSkge1xuICAgICAgdGhpcy5fdXBkYXRlQXJyb3dEaXJlY3Rpb24oKTtcbiAgICAgIGlmICh0aGlzLl9zaG93SW5kaWNhdG9ySGludCkge1xuICAgICAgICB0aGlzLl9zZXRBbmltYXRpb25UcmFuc2l0aW9uU3RhdGUoe2Zyb21TdGF0ZTogdGhpcy5fYXJyb3dEaXJlY3Rpb24sIHRvU3RhdGU6ICdoaW50J30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0QW5pbWF0aW9uVHJhbnNpdGlvblN0YXRlKHtmcm9tU3RhdGU6ICdoaW50JywgdG9TdGF0ZTogdGhpcy5fYXJyb3dEaXJlY3Rpb259KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYW5pbWF0aW9uIHRyYW5zaXRpb24gdmlldyBzdGF0ZSBmb3IgdGhlIGFycm93J3MgcG9zaXRpb24gYW5kIG9wYWNpdHkuIElmIHRoZVxuICAgKiBgZGlzYWJsZVZpZXdTdGF0ZUFuaW1hdGlvbmAgZmxhZyBpcyBzZXQgdG8gdHJ1ZSwgdGhlIGBmcm9tU3RhdGVgIHdpbGwgYmUgaWdub3JlZCBzbyB0aGF0XG4gICAqIG5vIGFuaW1hdGlvbiBhcHBlYXJzLlxuICAgKi9cbiAgX3NldEFuaW1hdGlvblRyYW5zaXRpb25TdGF0ZSh2aWV3U3RhdGU6IEFycm93Vmlld1N0YXRlVHJhbnNpdGlvbikge1xuICAgIHRoaXMuX3ZpZXdTdGF0ZSA9IHZpZXdTdGF0ZSB8fCB7fTtcblxuICAgIC8vIElmIHRoZSBhbmltYXRpb24gZm9yIGFycm93IHBvc2l0aW9uIHN0YXRlIChvcGFjaXR5L3RyYW5zbGF0aW9uKSBzaG91bGQgYmUgZGlzYWJsZWQsXG4gICAgLy8gcmVtb3ZlIHRoZSBmcm9tU3RhdGUgc28gdGhhdCBpdCBqdW1wcyByaWdodCB0byB0aGUgdG9TdGF0ZS5cbiAgICBpZiAodGhpcy5fZGlzYWJsZVZpZXdTdGF0ZUFuaW1hdGlvbikge1xuICAgICAgdGhpcy5fdmlld1N0YXRlID0ge3RvU3RhdGU6IHZpZXdTdGF0ZS50b1N0YXRlfTtcbiAgICB9XG4gIH1cblxuICAvKiogVHJpZ2dlcnMgdGhlIHNvcnQgb24gdGhpcyBzb3J0IGhlYWRlciBhbmQgcmVtb3ZlcyB0aGUgaW5kaWNhdG9yIGhpbnQuICovXG4gIF90b2dnbGVPbkludGVyYWN0aW9uKCkge1xuICAgIHRoaXMuX3NvcnQuc29ydCh0aGlzKTtcblxuICAgIC8vIERvIG5vdCBzaG93IHRoZSBhbmltYXRpb24gaWYgdGhlIGhlYWRlciB3YXMgYWxyZWFkeSBzaG93biBpbiB0aGUgcmlnaHQgcG9zaXRpb24uXG4gICAgaWYgKHRoaXMuX3ZpZXdTdGF0ZS50b1N0YXRlID09PSAnaGludCcgfHwgdGhpcy5fdmlld1N0YXRlLnRvU3RhdGUgPT09ICdhY3RpdmUnKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlVmlld1N0YXRlQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlQ2xpY2soKSB7XG4gICAgaWYgKCF0aGlzLl9pc0Rpc2FibGVkKCkpIHtcbiAgICAgIHRoaXMuX3NvcnQuc29ydCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICghdGhpcy5faXNEaXNhYmxlZCgpICYmIChldmVudC5rZXlDb2RlID09PSBTUEFDRSB8fCBldmVudC5rZXlDb2RlID09PSBFTlRFUikpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl90b2dnbGVPbkludGVyYWN0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBNYXRTb3J0SGVhZGVyIGlzIGN1cnJlbnRseSBzb3J0ZWQgaW4gZWl0aGVyIGFzY2VuZGluZyBvciBkZXNjZW5kaW5nIG9yZGVyLiAqL1xuICBfaXNTb3J0ZWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuX3NvcnQuYWN0aXZlID09IHRoaXMuaWQgJiZcbiAgICAgICh0aGlzLl9zb3J0LmRpcmVjdGlvbiA9PT0gJ2FzYycgfHwgdGhpcy5fc29ydC5kaXJlY3Rpb24gPT09ICdkZXNjJylcbiAgICApO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGFuaW1hdGlvbiBzdGF0ZSBmb3IgdGhlIGFycm93IGRpcmVjdGlvbiAoaW5kaWNhdG9yIGFuZCBwb2ludGVycykuICovXG4gIF9nZXRBcnJvd0RpcmVjdGlvblN0YXRlKCkge1xuICAgIHJldHVybiBgJHt0aGlzLl9pc1NvcnRlZCgpID8gJ2FjdGl2ZS0nIDogJyd9JHt0aGlzLl9hcnJvd0RpcmVjdGlvbn1gO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGFycm93IHBvc2l0aW9uIHN0YXRlIChvcGFjaXR5LCB0cmFuc2xhdGlvbikuICovXG4gIF9nZXRBcnJvd1ZpZXdTdGF0ZSgpIHtcbiAgICBjb25zdCBmcm9tU3RhdGUgPSB0aGlzLl92aWV3U3RhdGUuZnJvbVN0YXRlO1xuICAgIHJldHVybiAoZnJvbVN0YXRlID8gYCR7ZnJvbVN0YXRlfS10by1gIDogJycpICsgdGhpcy5fdmlld1N0YXRlLnRvU3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZGlyZWN0aW9uIHRoZSBhcnJvdyBzaG91bGQgYmUgcG9pbnRpbmcuIElmIGl0IGlzIG5vdCBzb3J0ZWQsIHRoZSBhcnJvdyBzaG91bGQgYmVcbiAgICogZmFjaW5nIHRoZSBzdGFydCBkaXJlY3Rpb24uIE90aGVyd2lzZSBpZiBpdCBpcyBzb3J0ZWQsIHRoZSBhcnJvdyBzaG91bGQgcG9pbnQgaW4gdGhlIGN1cnJlbnRseVxuICAgKiBhY3RpdmUgc29ydGVkIGRpcmVjdGlvbi4gVGhlIHJlYXNvbiB0aGlzIGlzIHVwZGF0ZWQgdGhyb3VnaCBhIGZ1bmN0aW9uIGlzIGJlY2F1c2UgdGhlIGRpcmVjdGlvblxuICAgKiBzaG91bGQgb25seSBiZSBjaGFuZ2VkIGF0IHNwZWNpZmljIHRpbWVzIC0gd2hlbiBkZWFjdGl2YXRlZCBidXQgdGhlIGhpbnQgaXMgZGlzcGxheWVkIGFuZCB3aGVuXG4gICAqIHRoZSBzb3J0IGlzIGFjdGl2ZSBhbmQgdGhlIGRpcmVjdGlvbiBjaGFuZ2VzLiBPdGhlcndpc2UgdGhlIGFycm93J3MgZGlyZWN0aW9uIHNob3VsZCBsaW5nZXJcbiAgICogaW4gY2FzZXMgc3VjaCBhcyB0aGUgc29ydCBiZWNvbWluZyBkZWFjdGl2YXRlZCBidXQgd2Ugd2FudCB0byBhbmltYXRlIHRoZSBhcnJvdyBhd2F5IHdoaWxlXG4gICAqIHByZXNlcnZpbmcgaXRzIGRpcmVjdGlvbiwgZXZlbiB0aG91Z2ggdGhlIG5leHQgc29ydCBkaXJlY3Rpb24gaXMgYWN0dWFsbHkgZGlmZmVyZW50IGFuZCBzaG91bGRcbiAgICogb25seSBiZSBjaGFuZ2VkIG9uY2UgdGhlIGFycm93IGRpc3BsYXlzIGFnYWluIChoaW50IG9yIGFjdGl2YXRpb24pLlxuICAgKi9cbiAgX3VwZGF0ZUFycm93RGlyZWN0aW9uKCkge1xuICAgIHRoaXMuX2Fycm93RGlyZWN0aW9uID0gdGhpcy5faXNTb3J0ZWQoKSA/IHRoaXMuX3NvcnQuZGlyZWN0aW9uIDogdGhpcy5zdGFydCB8fCB0aGlzLl9zb3J0LnN0YXJ0O1xuICB9XG5cbiAgX2lzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnQuZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBhcmlhLXNvcnQgYXR0cmlidXRlIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhpcyBzb3J0IGhlYWRlci4gSWYgdGhpcyBoZWFkZXJcbiAgICogaXMgbm90IHNvcnRlZCwgcmV0dXJucyBudWxsIHNvIHRoYXQgdGhlIGF0dHJpYnV0ZSBpcyByZW1vdmVkIGZyb20gdGhlIGhvc3QgZWxlbWVudC4gQXJpYSBzcGVjXG4gICAqIHNheXMgdGhhdCB0aGUgYXJpYS1zb3J0IHByb3BlcnR5IHNob3VsZCBvbmx5IGJlIHByZXNlbnQgb24gb25lIGhlYWRlciBhdCBhIHRpbWUsIHNvIHJlbW92aW5nXG4gICAqIGVuc3VyZXMgdGhpcyBpcyB0cnVlLlxuICAgKi9cbiAgX2dldEFyaWFTb3J0QXR0cmlidXRlKCkge1xuICAgIGlmICghdGhpcy5faXNTb3J0ZWQoKSkge1xuICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc29ydC5kaXJlY3Rpb24gPT0gJ2FzYycgPyAnYXNjZW5kaW5nJyA6ICdkZXNjZW5kaW5nJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBhcnJvdyBpbnNpZGUgdGhlIHNvcnQgaGVhZGVyIHNob3VsZCBiZSByZW5kZXJlZC4gKi9cbiAgX3JlbmRlckFycm93KCkge1xuICAgIHJldHVybiAhdGhpcy5faXNEaXNhYmxlZCgpIHx8IHRoaXMuX2lzU29ydGVkKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTb3J0QWN0aW9uRGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIC8vIFdlIHVzZSBBcmlhRGVzY3JpYmVyIGZvciB0aGUgc29ydCBidXR0b24gaW5zdGVhZCBvZiBzZXR0aW5nIGFuIGBhcmlhLWxhYmVsYCBiZWNhdXNlIHNvbWVcbiAgICAvLyBzY3JlZW4gcmVhZGVycyAobm90YWJseSBWb2ljZU92ZXIpIHdpbGwgcmVhZCBib3RoIHRoZSBjb2x1bW4gaGVhZGVyICphbmQqIHRoZSBidXR0b24ncyBsYWJlbFxuICAgIC8vIGZvciBldmVyeSAqY2VsbCogaW4gdGhlIHRhYmxlLCBjcmVhdGluZyBhIGxvdCBvZiB1bm5lY2Vzc2FyeSBub2lzZS5cblxuICAgIC8vIElmIF9zb3J0QnV0dG9uIGlzIHVuZGVmaW5lZCwgdGhlIGNvbXBvbmVudCBoYXNuJ3QgYmVlbiBpbml0aWFsaXplZCB5ZXQgc28gdGhlcmUnc1xuICAgIC8vIG5vdGhpbmcgdG8gdXBkYXRlIGluIHRoZSBET00uXG4gICAgaWYgKHRoaXMuX3NvcnRCdXR0b24pIHtcbiAgICAgIC8vIHJlbW92ZURlc2NyaXB0aW9uIHdpbGwgbm8tb3AgaWYgdGhlcmUgaXMgbm8gZXhpc3RpbmcgbWVzc2FnZS5cbiAgICAgIC8vIFRPRE8oamVsYm91cm4pOiByZW1vdmUgb3B0aW9uYWwgY2hhaW5pbmcgd2hlbiBBcmlhRGVzY3JpYmVyIGlzIHJlcXVpcmVkLlxuICAgICAgdGhpcy5fYXJpYURlc2NyaWJlcj8ucmVtb3ZlRGVzY3JpcHRpb24odGhpcy5fc29ydEJ1dHRvbiwgdGhpcy5fc29ydEFjdGlvbkRlc2NyaXB0aW9uKTtcbiAgICAgIHRoaXMuX2FyaWFEZXNjcmliZXI/LmRlc2NyaWJlKHRoaXMuX3NvcnRCdXR0b24sIG5ld0Rlc2NyaXB0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zb3J0QWN0aW9uRGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGNoYW5nZXMgaW4gdGhlIHNvcnRpbmcgc3RhdGUuICovXG4gIHByaXZhdGUgX2hhbmRsZVN0YXRlQ2hhbmdlcygpIHtcbiAgICB0aGlzLl9yZXJlbmRlclN1YnNjcmlwdGlvbiA9IG1lcmdlKFxuICAgICAgdGhpcy5fc29ydC5zb3J0Q2hhbmdlLFxuICAgICAgdGhpcy5fc29ydC5fc3RhdGVDaGFuZ2VzLFxuICAgICAgdGhpcy5faW50bC5jaGFuZ2VzLFxuICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc1NvcnRlZCgpKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFycm93RGlyZWN0aW9uKCk7XG5cbiAgICAgICAgLy8gRG8gbm90IHNob3cgdGhlIGFuaW1hdGlvbiBpZiB0aGUgaGVhZGVyIHdhcyBhbHJlYWR5IHNob3duIGluIHRoZSByaWdodCBwb3NpdGlvbi5cbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdTdGF0ZS50b1N0YXRlID09PSAnaGludCcgfHwgdGhpcy5fdmlld1N0YXRlLnRvU3RhdGUgPT09ICdhY3RpdmUnKSB7XG4gICAgICAgICAgdGhpcy5fZGlzYWJsZVZpZXdTdGF0ZUFuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXRBbmltYXRpb25UcmFuc2l0aW9uU3RhdGUoe2Zyb21TdGF0ZTogdGhpcy5fYXJyb3dEaXJlY3Rpb24sIHRvU3RhdGU6ICdhY3RpdmUnfSk7XG4gICAgICAgIHRoaXMuX3Nob3dJbmRpY2F0b3JIaW50ID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoaXMgaGVhZGVyIHdhcyByZWNlbnRseSBhY3RpdmUgYW5kIG5vdyBubyBsb25nZXIgc29ydGVkLCBhbmltYXRlIGF3YXkgdGhlIGFycm93LlxuICAgICAgaWYgKCF0aGlzLl9pc1NvcnRlZCgpICYmIHRoaXMuX3ZpZXdTdGF0ZSAmJiB0aGlzLl92aWV3U3RhdGUudG9TdGF0ZSA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZVZpZXdTdGF0ZUFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zZXRBbmltYXRpb25UcmFuc2l0aW9uU3RhdGUoe2Zyb21TdGF0ZTogJ2FjdGl2ZScsIHRvU3RhdGU6IHRoaXMuX2Fycm93RGlyZWN0aW9ufSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG59XG4iLCI8IS0tXG4gIFdlIHNldCB0aGUgYHRhYmluZGV4YCBvbiBhbiBlbGVtZW50IGluc2lkZSB0aGUgdGFibGUgaGVhZGVyLCByYXRoZXIgdGhhbiB0aGUgaGVhZGVyIGl0c2VsZixcbiAgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBOVkRBIHdoZXJlIGhhdmluZyBhIGB0YWJpbmRleGAgb24gYSBgdGhgIGJyZWFrcyBrZXlib2FyZCBuYXZpZ2F0aW9uIGluIHRoZVxuICB0YWJsZSAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9udmFjY2Vzcy9udmRhL2lzc3Vlcy83NzE4KS4gVGhpcyBhbGxvd3MgZm9yIHRoZSBoZWFkZXIgdG8gYm90aFxuICBiZSBmb2N1c2FibGUsIGFuZCBoYXZlIHNjcmVlbiByZWFkZXJzIHJlYWQgb3V0IGl0cyBgYXJpYS1zb3J0YCBzdGF0ZS4gV2UgcHJlZmVyIHRoaXMgYXBwcm9hY2hcbiAgb3ZlciBoYXZpbmcgYSBidXR0b24gd2l0aCBhbiBgYXJpYS1sYWJlbGAgaW5zaWRlIHRoZSBoZWFkZXIsIGJlY2F1c2UgdGhlIGJ1dHRvbidzIGBhcmlhLWxhYmVsYFxuICB3aWxsIGJlIHJlYWQgb3V0IGFzIHRoZSB1c2VyIGlzIG5hdmlnYXRpbmcgdGhlIHRhYmxlJ3MgY2VsbCAoc2VlICMxMzAxMikuXG5cbiAgVGhlIGFwcHJvYWNoIGlzIGJhc2VkIG9mZiBvZjogaHR0cHM6Ly9kZXF1ZXVuaXZlcnNpdHkuY29tL2xpYnJhcnkvYXJpYS90YWJsZXMvc2Ytc29ydGFibGUtZ3JpZFxuLS0+XG48ZGl2IGNsYXNzPVwibWF0LXNvcnQtaGVhZGVyLWNvbnRhaW5lciBtYXQtZm9jdXMtaW5kaWNhdG9yXCJcbiAgICAgW2NsYXNzLm1hdC1zb3J0LWhlYWRlci1zb3J0ZWRdPVwiX2lzU29ydGVkKClcIlxuICAgICBbY2xhc3MubWF0LXNvcnQtaGVhZGVyLXBvc2l0aW9uLWJlZm9yZV09XCJhcnJvd1Bvc2l0aW9uID09PSAnYmVmb3JlJ1wiXG4gICAgIFthdHRyLnRhYmluZGV4XT1cIl9pc0Rpc2FibGVkKCkgPyBudWxsIDogMFwiXG4gICAgIFthdHRyLnJvbGVdPVwiX2lzRGlzYWJsZWQoKSA/IG51bGwgOiAnYnV0dG9uJ1wiPlxuXG4gIDwhLS1cbiAgICBUT0RPKGNyaXNiZXRvKTogdGhpcyBkaXYgaXNuJ3Qgc3RyaWN0bHkgbmVjZXNzYXJ5LCBidXQgd2UgaGF2ZSB0byBrZWVwIGl0IGR1ZSB0byBhIGxhcmdlXG4gICAgbnVtYmVyIG9mIHNjcmVlbnNob3QgZGlmZiBmYWlsdXJlcy4gSXQgc2hvdWxkIGJlIHJlbW92ZWQgZXZlbnR1YWxseS4gTm90ZSB0aGF0IHRoZSBkaWZmZXJlbmNlXG4gICAgaXNuJ3QgdmlzaWJsZSB3aXRoIGEgc2hvcnRlciBoZWFkZXIsIGJ1dCBvbmNlIGl0IGJyZWFrcyB1cCBpbnRvIG11bHRpcGxlIGxpbmVzLCB0aGlzIGVsZW1lbnRcbiAgICBjYXVzZXMgaXQgdG8gYmUgY2VudGVyLWFsaWduZWQsIHdoZXJlYXMgcmVtb3ZpbmcgaXQgd2lsbCBrZWVwIHRoZSB0ZXh0IHRvIHRoZSBsZWZ0LlxuICAtLT5cbiAgPGRpdiBjbGFzcz1cIm1hdC1zb3J0LWhlYWRlci1jb250ZW50XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cblxuICA8IS0tIERpc2FibGUgYW5pbWF0aW9ucyB3aGlsZSBhIGN1cnJlbnQgYW5pbWF0aW9uIGlzIHJ1bm5pbmcgLS0+XG4gIDxkaXYgY2xhc3M9XCJtYXQtc29ydC1oZWFkZXItYXJyb3dcIlxuICAgICAgICpuZ0lmPVwiX3JlbmRlckFycm93KClcIlxuICAgICAgIFtAYXJyb3dPcGFjaXR5XT1cIl9nZXRBcnJvd1ZpZXdTdGF0ZSgpXCJcbiAgICAgICBbQGFycm93UG9zaXRpb25dPVwiX2dldEFycm93Vmlld1N0YXRlKClcIlxuICAgICAgIFtAYWxsb3dDaGlsZHJlbl09XCJfZ2V0QXJyb3dEaXJlY3Rpb25TdGF0ZSgpXCJcbiAgICAgICAoQGFycm93UG9zaXRpb24uc3RhcnQpPVwiX2Rpc2FibGVWaWV3U3RhdGVBbmltYXRpb24gPSB0cnVlXCJcbiAgICAgICAoQGFycm93UG9zaXRpb24uZG9uZSk9XCJfZGlzYWJsZVZpZXdTdGF0ZUFuaW1hdGlvbiA9IGZhbHNlXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1hdC1zb3J0LWhlYWRlci1zdGVtXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1hdC1zb3J0LWhlYWRlci1pbmRpY2F0b3JcIiBbQGluZGljYXRvcl09XCJfZ2V0QXJyb3dEaXJlY3Rpb25TdGF0ZSgpXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWF0LXNvcnQtaGVhZGVyLXBvaW50ZXItbGVmdFwiIFtAbGVmdFBvaW50ZXJdPVwiX2dldEFycm93RGlyZWN0aW9uU3RhdGUoKVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1hdC1zb3J0LWhlYWRlci1wb2ludGVyLXJpZ2h0XCIgW0ByaWdodFBvaW50ZXJdPVwiX2dldEFycm93RGlyZWN0aW9uU3RhdGUoKVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1hdC1zb3J0LWhlYWRlci1wb2ludGVyLW1pZGRsZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19