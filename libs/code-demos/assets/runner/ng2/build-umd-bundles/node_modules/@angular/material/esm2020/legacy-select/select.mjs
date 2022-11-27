import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Directive, QueryList, ViewEncapsulation, } from '@angular/core';
import { _countGroupLabelsBeforeLegacyOption, _getLegacyOptionScrollPosition, MAT_LEGACY_OPTGROUP, MAT_LEGACY_OPTION_PARENT_COMPONENT, MatLegacyOption, } from '@angular/material/legacy-core';
import { MAT_SELECT_TRIGGER, _MatSelectBase } from '@angular/material/select';
import { MatLegacyFormFieldControl } from '@angular/material/legacy-form-field';
import { take, takeUntil } from 'rxjs/operators';
import { matLegacySelectAnimations } from './select-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/**
 * The max height of the select's overlay panel.
 * @deprecated Use `SELECT_PANEL_MAX_HEIGHT` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const SELECT_PANEL_MAX_HEIGHT = 256;
/**
 * The panel's padding on the x-axis.
 * @deprecated Use `SELECT_PANEL_PADDING_X` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const SELECT_PANEL_PADDING_X = 16;
/**
 * The panel's x axis padding if it is indented (e.g. there is an option group).
 * @deprecated Use `SELECT_PANEL_INDENT_PADDING_X` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/**
 * The height of the select items in `em` units.
 * @deprecated Use `SELECT_ITEM_HEIGHT_EM` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const SELECT_ITEM_HEIGHT_EM = 3;
// TODO(josephperrott): Revert to a constant after 2018 spec updates are fully merged.
/**
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * Calculated as:
 * (SELECT_PANEL_PADDING_X * 1.5) + 16 = 40
 * The padding is multiplied by 1.5 because the checkbox's margin is half the padding.
 * The checkbox width is 16px.
 *
 * @deprecated Use `SELECT_MULTIPLE_PANEL_PADDING_X` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.5 + 16;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 * @deprecated Use `SELECT_PANEL_VIEWPORT_PADDING` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const SELECT_PANEL_VIEWPORT_PADDING = 8;
/**
 * Change event object that is emitted when the select value has changed.
 * @deprecated Use `MatSelectChange` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacySelectChange {
    constructor(
    /** Reference to the select that emitted the change event. */
    source, 
    /** Current value of the select that emitted the event. */
    value) {
        this.source = source;
        this.value = value;
    }
}
/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 * @deprecated Use `MatSelectTrigger` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacySelectTrigger {
}
MatLegacySelectTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelectTrigger, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacySelectTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacySelectTrigger, selector: "mat-select-trigger", providers: [{ provide: MAT_SELECT_TRIGGER, useExisting: MatLegacySelectTrigger }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelectTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-select-trigger',
                    providers: [{ provide: MAT_SELECT_TRIGGER, useExisting: MatLegacySelectTrigger }],
                }]
        }] });
/**
 * @deprecated Use `MatSelect` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacySelect extends _MatSelectBase {
    constructor() {
        super(...arguments);
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        this._scrollTop = 0;
        /** The cached font-size of the trigger element. */
        this._triggerFontSize = 0;
        /** The value of the select panel's transform-origin property. */
        this._transformOrigin = 'top';
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this._offsetY = 0;
        this._positions = [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
    }
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    _calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll) {
        const itemHeight = this._getItemHeight();
        const optionOffsetFromScrollTop = itemHeight * selectedIndex;
        const halfOptionHeight = itemHeight / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
    }
    ngOnInit() {
        super.ngOnInit();
        this._viewportRuler
            .change()
            .pipe(takeUntil(this._destroy))
            .subscribe(() => {
            if (this.panelOpen) {
                this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
                this._changeDetectorRef.markForCheck();
            }
        });
    }
    open() {
        if (super._canOpen()) {
            super.open();
            this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
            // Note: The computed font-size will be a string pixel value (e.g. "16px").
            // `parseInt` ignores the trailing 'px' and converts this to a number.
            this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement).fontSize || '0');
            this._calculateOverlayPosition();
            // Set the font size on the panel element once it exists.
            this._ngZone.onStable.pipe(take(1)).subscribe(() => {
                if (this._triggerFontSize &&
                    this._overlayDir.overlayRef &&
                    this._overlayDir.overlayRef.overlayElement) {
                    this._overlayDir.overlayRef.overlayElement.style.fontSize = `${this._triggerFontSize}px`;
                }
            });
        }
    }
    /** Scrolls the active option into view. */
    _scrollOptionIntoView(index) {
        const labelCount = _countGroupLabelsBeforeLegacyOption(index, this.options, this.optionGroups);
        const itemHeight = this._getItemHeight();
        if (index === 0 && labelCount === 1) {
            // If we've got one group label before the option and we're at the top option,
            // scroll the list to the top. This is better UX than scrolling the list to the
            // top of the option, because it allows the user to read the top group's label.
            this.panel.nativeElement.scrollTop = 0;
        }
        else {
            this.panel.nativeElement.scrollTop = _getLegacyOptionScrollPosition((index + labelCount) * itemHeight, itemHeight, this.panel.nativeElement.scrollTop, SELECT_PANEL_MAX_HEIGHT);
        }
    }
    _positioningSettled() {
        this._calculateOverlayOffsetX();
        this.panel.nativeElement.scrollTop = this._scrollTop;
    }
    _panelDoneAnimating(isOpen) {
        if (this.panelOpen) {
            this._scrollTop = 0;
        }
        else {
            this._overlayDir.offsetX = 0;
            this._changeDetectorRef.markForCheck();
        }
        super._panelDoneAnimating(isOpen);
    }
    _getChangeEvent(value) {
        return new MatLegacySelectChange(this, value);
    }
    _getOverlayMinWidth() {
        return this._triggerRect?.width;
    }
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    _calculateOverlayOffsetX() {
        const overlayRect = this._overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        const viewportSize = this._viewportRuler.getViewportSize();
        const isRtl = this._isRtl();
        const paddingWidth = this.multiple
            ? SELECT_MULTIPLE_PANEL_PADDING_X + SELECT_PANEL_PADDING_X
            : SELECT_PANEL_PADDING_X * 2;
        let offsetX;
        // Adjust the offset, depending on the option padding.
        if (this.multiple) {
            offsetX = SELECT_MULTIPLE_PANEL_PADDING_X;
        }
        else if (this.disableOptionCentering) {
            offsetX = SELECT_PANEL_PADDING_X;
        }
        else {
            let selected = this._selectionModel.selected[0] || this.options.first;
            offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        }
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine how much the select overflows on each side.
        const leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        const rightOverflow = overlayRect.right + offsetX - viewportSize.width + (isRtl ? 0 : paddingWidth);
        // If the element overflows on either side, reduce the offset to allow it to fit.
        if (leftOverflow > 0) {
            offsetX += leftOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        else if (rightOverflow > 0) {
            offsetX -= rightOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors. Round the value to avoid
        // blurry content in some browsers.
        this._overlayDir.offsetX = Math.round(offsetX);
        this._overlayDir.overlayRef.updatePosition();
    }
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    _calculateOverlayOffsetY(selectedIndex, scrollBuffer, maxScroll) {
        const itemHeight = this._getItemHeight();
        const optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        const maxOptionsDisplayed = Math.floor(SELECT_PANEL_MAX_HEIGHT / itemHeight);
        let optionOffsetFromPanelTop;
        // Disable offset if requested by user by returning 0 as value to offset
        if (this.disableOptionCentering) {
            return 0;
        }
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * itemHeight;
        }
        else if (this._scrollTop === maxScroll) {
            const firstDisplayedIndex = this._getItemCount() - maxOptionsDisplayed;
            const selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // The first item is partially out of the viewport. Therefore we need to calculate what
            // portion of it is shown in the viewport and account for it in our offset.
            let partialItemHeight = itemHeight - ((this._getItemCount() * itemHeight - SELECT_PANEL_MAX_HEIGHT) % itemHeight);
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop = selectedDisplayIndex * itemHeight + partialItemHeight;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - itemHeight / 2;
        }
        // The final offset is the option's offset from the top, adjusted for the height difference,
        // multiplied by -1 to ensure that the overlay moves in the correct direction up the page.
        // The value is rounded to prevent some browsers from blurring the content.
        return Math.round(optionOffsetFromPanelTop * -1 - optionHeightAdjustment);
    }
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    _checkOverlayWithinViewport(maxScroll) {
        const itemHeight = this._getItemHeight();
        const viewportSize = this._viewportRuler.getViewportSize();
        const topSpaceAvailable = this._triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        const bottomSpaceAvailable = viewportSize.height - this._triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        const panelHeightTop = Math.abs(this._offsetY);
        const totalPanelHeight = Math.min(this._getItemCount() * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        const panelHeightBottom = totalPanelHeight - panelHeightTop - this._triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    }
    /** Adjusts the overlay panel up to fit in the viewport. */
    _adjustPanelUp(panelHeightBottom, bottomSpaceAvailable) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        const distanceBelowViewport = Math.round(panelHeightBottom - bottomSpaceAvailable);
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = `50% bottom 0px`;
        }
    }
    /** Adjusts the overlay panel down to fit in the viewport. */
    _adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        const distanceAboveViewport = Math.round(panelHeightTop - topSpaceAvailable);
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = `50% top 0px`;
            return;
        }
    }
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    _calculateOverlayPosition() {
        const itemHeight = this._getItemHeight();
        const items = this._getItemCount();
        const panelHeight = Math.min(items * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        const scrollContainerHeight = items * itemHeight;
        // The farthest the panel can be scrolled before it hits the bottom
        const maxScroll = scrollContainerHeight - panelHeight;
        // If no value is selected we open the popup to the first item.
        let selectedOptionOffset;
        if (this.empty) {
            selectedOptionOffset = 0;
        }
        else {
            selectedOptionOffset = Math.max(this.options.toArray().indexOf(this._selectionModel.selected[0]), 0);
        }
        selectedOptionOffset += _countGroupLabelsBeforeLegacyOption(selectedOptionOffset, this.options, this.optionGroups);
        // We must maintain a scroll buffer so the selected option will be scrolled to the
        // center of the overlay panel rather than the top.
        const scrollBuffer = panelHeight / 2;
        this._scrollTop = this._calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
        this._offsetY = this._calculateOverlayOffsetY(selectedOptionOffset, scrollBuffer, maxScroll);
        this._checkOverlayWithinViewport(maxScroll);
    }
    /** Sets the transform origin point based on the selected option. */
    _getOriginBasedOnOption() {
        const itemHeight = this._getItemHeight();
        const optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        const originY = Math.abs(this._offsetY) - optionHeightAdjustment + itemHeight / 2;
        return `50% ${originY}px 0px`;
    }
    /** Calculates the height of the select's options. */
    _getItemHeight() {
        return this._triggerFontSize * SELECT_ITEM_HEIGHT_EM;
    }
    /** Calculates the amount of items in the select. This includes options and group labels. */
    _getItemCount() {
        return this.options.length + this.optionGroups.length;
    }
}
MatLegacySelect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelect, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatLegacySelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacySelect, selector: "mat-select", inputs: { disabled: "disabled", disableRipple: "disableRipple", tabIndex: "tabIndex" }, host: { attributes: { "role": "combobox", "aria-autocomplete": "none", "aria-haspopup": "true" }, listeners: { "keydown": "_handleKeydown($event)", "focus": "_onFocus()", "blur": "_onBlur()" }, properties: { "attr.id": "id", "attr.tabindex": "tabIndex", "attr.aria-controls": "panelOpen ? id + \"-panel\" : null", "attr.aria-expanded": "panelOpen", "attr.aria-label": "ariaLabel || null", "attr.aria-required": "required.toString()", "attr.aria-disabled": "disabled.toString()", "attr.aria-invalid": "errorState", "attr.aria-activedescendant": "_getAriaActiveDescendant()", "class.mat-select-disabled": "disabled", "class.mat-select-invalid": "errorState", "class.mat-select-required": "required", "class.mat-select-empty": "empty", "class.mat-select-multiple": "multiple" }, classAttribute: "mat-select" }, providers: [
        { provide: MatLegacyFormFieldControl, useExisting: MatLegacySelect },
        { provide: MAT_LEGACY_OPTION_PARENT_COMPONENT, useExisting: MatLegacySelect },
    ], queries: [{ propertyName: "customTrigger", first: true, predicate: MAT_SELECT_TRIGGER, descendants: true }, { propertyName: "options", predicate: MatLegacyOption, descendants: true }, { propertyName: "optionGroups", predicate: MAT_LEGACY_OPTGROUP, descendants: true }], exportAs: ["matSelect"], usesInheritance: true, ngImport: i0, template: "<!--\n Note that the select trigger element specifies `aria-owns` pointing to the listbox overlay.\n While aria-owns is not required for the ARIA 1.2 `role=\"combobox\"` interaction pattern,\n it fixes an issue with VoiceOver when the select appears inside of an `aria-model=\"true\"`\n element (e.g. a dialog). Without this `aria-owns`, the `aria-modal` on a dialog prevents\n VoiceOver from \"seeing\" the select's listbox overlay for aria-activedescendant.\n Using `aria-owns` re-parents the select overlay so that it works again.\n See https://github.com/angular/components/issues/20694\n-->\n<div cdk-overlay-origin\n     [attr.aria-owns]=\"panelOpen ? id + '-panel' : null\"\n     class=\"mat-select-trigger\"\n     (click)=\"toggle()\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n  <div class=\"mat-select-value\" [ngSwitch]=\"empty\" [attr.id]=\"_valueId\">\n    <span class=\"mat-select-placeholder mat-select-min-line\" *ngSwitchCase=\"true\">{{placeholder}}</span>\n    <span class=\"mat-select-value-text\" *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n      <span class=\"mat-select-min-line\" *ngSwitchDefault>{{triggerValue}}</span>\n      <ng-content select=\"mat-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n    </span>\n  </div>\n\n  <div class=\"mat-select-arrow-wrapper\"><div class=\"mat-select-arrow\"></div></div>\n</div>\n\n<ng-template\n  cdk-connected-overlay\n  cdkConnectedOverlayLockPosition\n  cdkConnectedOverlayHasBackdrop\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  [cdkConnectedOverlayPanelClass]=\"_overlayPanelClass\"\n  [cdkConnectedOverlayScrollStrategy]=\"_scrollStrategy\"\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayOpen]=\"panelOpen\"\n  [cdkConnectedOverlayPositions]=\"_positions\"\n  [cdkConnectedOverlayMinWidth]=\"_getOverlayMinWidth()\"\n  [cdkConnectedOverlayOffsetY]=\"_offsetY\"\n  (backdropClick)=\"close()\"\n  (attach)=\"_onAttached()\"\n  (detach)=\"close()\">\n  <div class=\"mat-select-panel-wrap\" [@transformPanelWrap]>\n    <div\n      #panel\n      role=\"listbox\"\n      tabindex=\"-1\"\n      class=\"mat-select-panel {{ _getPanelTheme() }}\"\n      [attr.id]=\"id + '-panel'\"\n      [attr.aria-multiselectable]=\"multiple\"\n      [attr.aria-label]=\"ariaLabel || null\"\n      [attr.aria-labelledby]=\"_getPanelAriaLabelledby()\"\n      [ngClass]=\"panelClass\"\n      [@transformPanel]=\"multiple ? 'showing-multiple' : 'showing'\"\n      (@transformPanel.done)=\"_panelDoneAnimatingStream.next($event.toState)\"\n      [style.transformOrigin]=\"_transformOrigin\"\n      [style.font-size.px]=\"_triggerFontSize\"\n      (keydown)=\"_handleKeydown($event)\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</ng-template>\n", styles: [".mat-select{display:inline-block;width:100%;outline:none}.mat-select-trigger{display:inline-flex;align-items:center;cursor:pointer;position:relative;box-sizing:border-box;width:100%}.mat-select-disabled .mat-select-trigger{-webkit-user-select:none;user-select:none;cursor:default}.mat-select-value{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-select-arrow-wrapper{height:16px;flex-shrink:0;display:inline-flex;align-items:center}.mat-form-field-appearance-fill .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-outline .mat-select-arrow-wrapper{transform:translateY(-25%)}.mat-form-field-appearance-standard.mat-form-field-has-label .mat-select:not(.mat-select-empty) .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:none}.mat-select-arrow{width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;margin:0 4px}.mat-form-field.mat-focused .mat-select-arrow{transform:translateX(0)}.mat-select-panel-wrap{flex-basis:100%}.mat-select-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%;border-radius:4px;outline:0}.cdk-high-contrast-active .mat-select-panel{outline:solid 1px}.mat-select-panel .mat-optgroup-label,.mat-select-panel .mat-option{font-size:inherit;line-height:3em;height:3em}.mat-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-form-field-flex{cursor:pointer}.mat-form-field-type-mat-select .mat-form-field-label{width:calc(100% - 18px)}.mat-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable .mat-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-select-placeholder{color:rgba(0,0,0,0);-webkit-text-fill-color:rgba(0,0,0,0);transition:none;display:block}.mat-select-min-line:empty::before{content:\" \";white-space:pre;width:1px;display:inline-block;visibility:hidden}"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], animations: [
        matLegacySelectAnimations.transformPanelWrap,
        matLegacySelectAnimations.transformPanel,
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelect, decorators: [{
            type: Component,
            args: [{ selector: 'mat-select', exportAs: 'matSelect', inputs: ['disabled', 'disableRipple', 'tabIndex'], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'role': 'combobox',
                        'aria-autocomplete': 'none',
                        // TODO(crisbeto): the value for aria-haspopup should be `listbox`, but currently it's difficult
                        // to sync into Google, because of an outdated automated a11y check which flags it as an invalid
                        // value. At some point we should try to switch it back to being `listbox`.
                        'aria-haspopup': 'true',
                        'class': 'mat-select',
                        '[attr.id]': 'id',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.aria-controls]': 'panelOpen ? id + "-panel" : null',
                        '[attr.aria-expanded]': 'panelOpen',
                        '[attr.aria-label]': 'ariaLabel || null',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
                        '[class.mat-select-disabled]': 'disabled',
                        '[class.mat-select-invalid]': 'errorState',
                        '[class.mat-select-required]': 'required',
                        '[class.mat-select-empty]': 'empty',
                        '[class.mat-select-multiple]': 'multiple',
                        '(keydown)': '_handleKeydown($event)',
                        '(focus)': '_onFocus()',
                        '(blur)': '_onBlur()',
                    }, animations: [
                        matLegacySelectAnimations.transformPanelWrap,
                        matLegacySelectAnimations.transformPanel,
                    ], providers: [
                        { provide: MatLegacyFormFieldControl, useExisting: MatLegacySelect },
                        { provide: MAT_LEGACY_OPTION_PARENT_COMPONENT, useExisting: MatLegacySelect },
                    ], template: "<!--\n Note that the select trigger element specifies `aria-owns` pointing to the listbox overlay.\n While aria-owns is not required for the ARIA 1.2 `role=\"combobox\"` interaction pattern,\n it fixes an issue with VoiceOver when the select appears inside of an `aria-model=\"true\"`\n element (e.g. a dialog). Without this `aria-owns`, the `aria-modal` on a dialog prevents\n VoiceOver from \"seeing\" the select's listbox overlay for aria-activedescendant.\n Using `aria-owns` re-parents the select overlay so that it works again.\n See https://github.com/angular/components/issues/20694\n-->\n<div cdk-overlay-origin\n     [attr.aria-owns]=\"panelOpen ? id + '-panel' : null\"\n     class=\"mat-select-trigger\"\n     (click)=\"toggle()\"\n     #origin=\"cdkOverlayOrigin\"\n     #trigger>\n  <div class=\"mat-select-value\" [ngSwitch]=\"empty\" [attr.id]=\"_valueId\">\n    <span class=\"mat-select-placeholder mat-select-min-line\" *ngSwitchCase=\"true\">{{placeholder}}</span>\n    <span class=\"mat-select-value-text\" *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n      <span class=\"mat-select-min-line\" *ngSwitchDefault>{{triggerValue}}</span>\n      <ng-content select=\"mat-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n    </span>\n  </div>\n\n  <div class=\"mat-select-arrow-wrapper\"><div class=\"mat-select-arrow\"></div></div>\n</div>\n\n<ng-template\n  cdk-connected-overlay\n  cdkConnectedOverlayLockPosition\n  cdkConnectedOverlayHasBackdrop\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  [cdkConnectedOverlayPanelClass]=\"_overlayPanelClass\"\n  [cdkConnectedOverlayScrollStrategy]=\"_scrollStrategy\"\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayOpen]=\"panelOpen\"\n  [cdkConnectedOverlayPositions]=\"_positions\"\n  [cdkConnectedOverlayMinWidth]=\"_getOverlayMinWidth()\"\n  [cdkConnectedOverlayOffsetY]=\"_offsetY\"\n  (backdropClick)=\"close()\"\n  (attach)=\"_onAttached()\"\n  (detach)=\"close()\">\n  <div class=\"mat-select-panel-wrap\" [@transformPanelWrap]>\n    <div\n      #panel\n      role=\"listbox\"\n      tabindex=\"-1\"\n      class=\"mat-select-panel {{ _getPanelTheme() }}\"\n      [attr.id]=\"id + '-panel'\"\n      [attr.aria-multiselectable]=\"multiple\"\n      [attr.aria-label]=\"ariaLabel || null\"\n      [attr.aria-labelledby]=\"_getPanelAriaLabelledby()\"\n      [ngClass]=\"panelClass\"\n      [@transformPanel]=\"multiple ? 'showing-multiple' : 'showing'\"\n      (@transformPanel.done)=\"_panelDoneAnimatingStream.next($event.toState)\"\n      [style.transformOrigin]=\"_transformOrigin\"\n      [style.font-size.px]=\"_triggerFontSize\"\n      (keydown)=\"_handleKeydown($event)\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</ng-template>\n", styles: [".mat-select{display:inline-block;width:100%;outline:none}.mat-select-trigger{display:inline-flex;align-items:center;cursor:pointer;position:relative;box-sizing:border-box;width:100%}.mat-select-disabled .mat-select-trigger{-webkit-user-select:none;user-select:none;cursor:default}.mat-select-value{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-select-arrow-wrapper{height:16px;flex-shrink:0;display:inline-flex;align-items:center}.mat-form-field-appearance-fill .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-outline .mat-select-arrow-wrapper{transform:translateY(-25%)}.mat-form-field-appearance-standard.mat-form-field-has-label .mat-select:not(.mat-select-empty) .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:none}.mat-select-arrow{width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;margin:0 4px}.mat-form-field.mat-focused .mat-select-arrow{transform:translateX(0)}.mat-select-panel-wrap{flex-basis:100%}.mat-select-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%;border-radius:4px;outline:0}.cdk-high-contrast-active .mat-select-panel{outline:solid 1px}.mat-select-panel .mat-optgroup-label,.mat-select-panel .mat-option{font-size:inherit;line-height:3em;height:3em}.mat-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-form-field-flex{cursor:pointer}.mat-form-field-type-mat-select .mat-form-field-label{width:calc(100% - 18px)}.mat-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable .mat-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-select-placeholder{color:rgba(0,0,0,0);-webkit-text-fill-color:rgba(0,0,0,0);transition:none;display:block}.mat-select-min-line:empty::before{content:\" \";white-space:pre;width:1px;display:inline-block;visibility:hidden}"] }]
        }], propDecorators: { options: [{
                type: ContentChildren,
                args: [MatLegacyOption, { descendants: true }]
            }], optionGroups: [{
                type: ContentChildren,
                args: [MAT_LEGACY_OPTGROUP, { descendants: true }]
            }], customTrigger: [{
                type: ContentChild,
                args: [MAT_SELECT_TRIGGER]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1zZWxlY3Qvc2VsZWN0LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1zZWxlY3Qvc2VsZWN0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBRVQsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsbUNBQW1DLEVBQ25DLDhCQUE4QixFQUM5QixtQkFBbUIsRUFDbkIsa0NBQWtDLEVBQ2xDLGVBQWUsR0FFaEIsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDNUUsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDOUUsT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUU5RDs7OztHQUlHO0FBRUg7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUUzQzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0FBRXpDOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBRyxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFFeEU7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLENBQUMsQ0FBQztBQUV2QyxzRkFBc0Y7QUFDdEY7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMs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QixFQUFFLFVBQVU7d0JBQ3pDLFdBQVcsRUFBRSx3QkFBd0I7d0JBQ3JDLFNBQVMsRUFBRSxZQUFZO3dCQUN2QixRQUFRLEVBQUUsV0FBVztxQkFDdEIsY0FDVzt3QkFDVix5QkFBeUIsQ0FBQyxrQkFBa0I7d0JBQzVDLHlCQUF5QixDQUFDLGNBQWM7cUJBQ3pDLGFBQ1U7d0JBQ1QsRUFBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsV0FBVyxpQkFBaUIsRUFBQzt3QkFDbEUsRUFBQyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsV0FBVyxpQkFBaUIsRUFBQztxQkFDNUU7OEJBc0JzRCxPQUFPO3NCQUE3RCxlQUFlO3VCQUFDLGVBQWUsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7Z0JBR3JELFlBQVk7c0JBRFgsZUFBZTt1QkFBQyxtQkFBbUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7Z0JBR3ZCLGFBQWE7c0JBQTlDLFlBQVk7dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29ubmVjdGVkUG9zaXRpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBfY291bnRHcm91cExhYmVsc0JlZm9yZUxlZ2FjeU9wdGlvbixcbiAgX2dldExlZ2FjeU9wdGlvblNjcm9sbFBvc2l0aW9uLFxuICBNQVRfTEVHQUNZX09QVEdST1VQLFxuICBNQVRfTEVHQUNZX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICBNYXRMZWdhY3lPcHRpb24sXG4gIE1hdExlZ2FjeU9wdGdyb3VwLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktY29yZSc7XG5pbXBvcnQge01BVF9TRUxFQ1RfVFJJR0dFUiwgX01hdFNlbGVjdEJhc2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQge01hdExlZ2FjeUZvcm1GaWVsZENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1mb3JtLWZpZWxkJztcbmltcG9ydCB7dGFrZSwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge21hdExlZ2FjeVNlbGVjdEFuaW1hdGlvbnN9IGZyb20gJy4vc2VsZWN0LWFuaW1hdGlvbnMnO1xuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgc3R5bGUgY29uc3RhbnRzIGFyZSBuZWNlc3NhcnkgdG8gc2F2ZSBoZXJlIGluIG9yZGVyXG4gKiB0byBwcm9wZXJseSBjYWxjdWxhdGUgdGhlIGFsaWdubWVudCBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uIG92ZXJcbiAqIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gKi9cblxuLyoqXG4gKiBUaGUgbWF4IGhlaWdodCBvZiB0aGUgc2VsZWN0J3Mgb3ZlcmxheSBwYW5lbC5cbiAqIEBkZXByZWNhdGVkIFVzZSBgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFRgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3NlbGVjdGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgPSAyNTY7XG5cbi8qKlxuICogVGhlIHBhbmVsJ3MgcGFkZGluZyBvbiB0aGUgeC1heGlzLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBTRUxFQ1RfUEFORUxfUEFERElOR19YYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3RgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggPSAxNjtcblxuLyoqXG4gKiBUaGUgcGFuZWwncyB4IGF4aXMgcGFkZGluZyBpZiBpdCBpcyBpbmRlbnRlZCAoZS5nLiB0aGVyZSBpcyBhbiBvcHRpb24gZ3JvdXApLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWGAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0YCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWCA9IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAyO1xuXG4vKipcbiAqIFRoZSBoZWlnaHQgb2YgdGhlIHNlbGVjdCBpdGVtcyBpbiBgZW1gIHVuaXRzLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBTRUxFQ1RfSVRFTV9IRUlHSFRfRU1gIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3NlbGVjdGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY29uc3QgU0VMRUNUX0lURU1fSEVJR0hUX0VNID0gMztcblxuLy8gVE9ETyhqb3NlcGhwZXJyb3R0KTogUmV2ZXJ0IHRvIGEgY29uc3RhbnQgYWZ0ZXIgMjAxOCBzcGVjIHVwZGF0ZXMgYXJlIGZ1bGx5IG1lcmdlZC5cbi8qKlxuICogRGlzdGFuY2UgYmV0d2VlbiB0aGUgcGFuZWwgZWRnZSBhbmQgdGhlIG9wdGlvbiB0ZXh0IGluXG4gKiBtdWx0aS1zZWxlY3Rpb24gbW9kZS5cbiAqXG4gKiBDYWxjdWxhdGVkIGFzOlxuICogKFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAxLjUpICsgMTYgPSA0MFxuICogVGhlIHBhZGRpbmcgaXMgbXVsdGlwbGllZCBieSAxLjUgYmVjYXVzZSB0aGUgY2hlY2tib3gncyBtYXJnaW4gaXMgaGFsZiB0aGUgcGFkZGluZy5cbiAqIFRoZSBjaGVja2JveCB3aWR0aCBpcyAxNnB4LlxuICpcbiAqIEBkZXByZWNhdGVkIFVzZSBgU0VMRUNUX01VTFRJUExFX1BBTkVMX1BBRERJTkdfWGAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0YCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfTVVMVElQTEVfUEFORUxfUEFERElOR19YID0gU0VMRUNUX1BBTkVMX1BBRERJTkdfWCAqIDEuNSArIDE2O1xuXG4vKipcbiAqIFRoZSBzZWxlY3QgcGFuZWwgd2lsbCBvbmx5IFwiZml0XCIgaW5zaWRlIHRoZSB2aWV3cG9ydCBpZiBpdCBpcyBwb3NpdGlvbmVkIGF0XG4gKiB0aGlzIHZhbHVlIG9yIG1vcmUgYXdheSBmcm9tIHRoZSB2aWV3cG9ydCBib3VuZGFyeS5cbiAqIEBkZXByZWNhdGVkIFVzZSBgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkdgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3NlbGVjdGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkcgPSA4O1xuXG4vKipcbiAqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCB2YWx1ZSBoYXMgY2hhbmdlZC5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0U2VsZWN0Q2hhbmdlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3RgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVNlbGVjdENoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlbGVjdCB0aGF0IGVtaXR0ZWQgdGhlIGNoYW5nZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBNYXRMZWdhY3lTZWxlY3QsXG4gICAgLyoqIEN1cnJlbnQgdmFsdWUgb2YgdGhlIHNlbGVjdCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyB2YWx1ZTogYW55LFxuICApIHt9XG59XG5cbi8qKlxuICogQWxsb3dzIHRoZSB1c2VyIHRvIGN1c3RvbWl6ZSB0aGUgdHJpZ2dlciB0aGF0IGlzIGRpc3BsYXllZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGEgdmFsdWUuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFNlbGVjdFRyaWdnZXJgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3NlbGVjdGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtc2VsZWN0LXRyaWdnZXInLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX1NFTEVDVF9UUklHR0VSLCB1c2VFeGlzdGluZzogTWF0TGVnYWN5U2VsZWN0VHJpZ2dlcn1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lTZWxlY3RUcmlnZ2VyIHt9XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRTZWxlY3RgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3NlbGVjdGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2VsZWN0JyxcbiAgZXhwb3J0QXM6ICdtYXRTZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NlbGVjdC5jc3MnXSxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ2Rpc2FibGVSaXBwbGUnLCAndGFiSW5kZXgnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdjb21ib2JveCcsXG4gICAgJ2FyaWEtYXV0b2NvbXBsZXRlJzogJ25vbmUnLFxuICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB0aGUgdmFsdWUgZm9yIGFyaWEtaGFzcG9wdXAgc2hvdWxkIGJlIGBsaXN0Ym94YCwgYnV0IGN1cnJlbnRseSBpdCdzIGRpZmZpY3VsdFxuICAgIC8vIHRvIHN5bmMgaW50byBHb29nbGUsIGJlY2F1c2Ugb2YgYW4gb3V0ZGF0ZWQgYXV0b21hdGVkIGExMXkgY2hlY2sgd2hpY2ggZmxhZ3MgaXQgYXMgYW4gaW52YWxpZFxuICAgIC8vIHZhbHVlLiBBdCBzb21lIHBvaW50IHdlIHNob3VsZCB0cnkgdG8gc3dpdGNoIGl0IGJhY2sgdG8gYmVpbmcgYGxpc3Rib3hgLlxuICAgICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLFxuICAgICdjbGFzcyc6ICdtYXQtc2VsZWN0JyxcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAncGFuZWxPcGVuID8gaWQgKyBcIi1wYW5lbFwiIDogbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ3BhbmVsT3BlbicsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ2FyaWFMYWJlbCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1yZXF1aXJlZF0nOiAncmVxdWlyZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICdbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdJzogJ19nZXRBcmlhQWN0aXZlRGVzY2VuZGFudCgpJyxcbiAgICAnW2NsYXNzLm1hdC1zZWxlY3QtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1zZWxlY3QtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgJ1tjbGFzcy5tYXQtc2VsZWN0LXJlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgJ1tjbGFzcy5tYXQtc2VsZWN0LWVtcHR5XSc6ICdlbXB0eScsXG4gICAgJ1tjbGFzcy5tYXQtc2VsZWN0LW11bHRpcGxlXSc6ICdtdWx0aXBsZScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGZvY3VzKSc6ICdfb25Gb2N1cygpJyxcbiAgICAnKGJsdXIpJzogJ19vbkJsdXIoKScsXG4gIH0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICBtYXRMZWdhY3lTZWxlY3RBbmltYXRpb25zLnRyYW5zZm9ybVBhbmVsV3JhcCxcbiAgICBtYXRMZWdhY3lTZWxlY3RBbmltYXRpb25zLnRyYW5zZm9ybVBhbmVsLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTWF0TGVnYWN5Rm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1hdExlZ2FjeVNlbGVjdH0sXG4gICAge3Byb3ZpZGU6IE1BVF9MRUdBQ1lfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBNYXRMZWdhY3lTZWxlY3R9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lTZWxlY3QgZXh0ZW5kcyBfTWF0U2VsZWN0QmFzZTxNYXRMZWdhY3lTZWxlY3RDaGFuZ2U+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqIFRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgcGFuZWwsIGNhbGN1bGF0ZWQgdG8gY2VudGVyIHRoZSBzZWxlY3RlZCBvcHRpb24uICovXG4gIHByaXZhdGUgX3Njcm9sbFRvcCA9IDA7XG5cbiAgLyoqIFRoZSBsYXN0IG1lYXN1cmVkIHZhbHVlIGZvciB0aGUgdHJpZ2dlcidzIGNsaWVudCBib3VuZGluZyByZWN0LiAqL1xuICBwcml2YXRlIF90cmlnZ2VyUmVjdDogQ2xpZW50UmVjdDtcblxuICAvKiogVGhlIGNhY2hlZCBmb250LXNpemUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgX3RyaWdnZXJGb250U2l6ZSA9IDA7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IHBhbmVsJ3MgdHJhbnNmb3JtLW9yaWdpbiBwcm9wZXJ0eS4gKi9cbiAgX3RyYW5zZm9ybU9yaWdpbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgLyoqXG4gICAqIFRoZSB5LW9mZnNldCBvZiB0aGUgb3ZlcmxheSBwYW5lbCBpbiByZWxhdGlvbiB0byB0aGUgdHJpZ2dlcidzIHRvcCBzdGFydCBjb3JuZXIuXG4gICAqIFRoaXMgbXVzdCBiZSBhZGp1c3RlZCB0byBhbGlnbiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRleHQgb3ZlciB0aGUgdHJpZ2dlciB0ZXh0LlxuICAgKiB3aGVuIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gdGhlIHktcG9zaXRpb24gb2YgdGhlIHNlbGVjdGVkIG9wdGlvbi5cbiAgICovXG4gIF9vZmZzZXRZID0gMDtcblxuICBAQ29udGVudENoaWxkcmVuKE1hdExlZ2FjeU9wdGlvbiwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgb3B0aW9uczogUXVlcnlMaXN0PE1hdExlZ2FjeU9wdGlvbj47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNQVRfTEVHQUNZX09QVEdST1VQLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxNYXRMZWdhY3lPcHRncm91cD47XG5cbiAgQENvbnRlbnRDaGlsZChNQVRfU0VMRUNUX1RSSUdHRVIpIGN1c3RvbVRyaWdnZXI6IE1hdExlZ2FjeVNlbGVjdFRyaWdnZXI7XG5cbiAgX3Bvc2l0aW9uczogQ29ubmVjdGVkUG9zaXRpb25bXSA9IFtcbiAgICB7XG4gICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxuICAgIH0sXG4gIF07XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgc2VsZWN0J3Mgb3ZlcmxheSBwYW5lbC5cbiAgICpcbiAgICogQXR0ZW1wdHMgdG8gY2VudGVyIHRoZSBzZWxlY3RlZCBvcHRpb24gaW4gdGhlIHBhbmVsLiBJZiB0aGUgb3B0aW9uIGlzXG4gICAqIHRvbyBoaWdoIG9yIHRvbyBsb3cgaW4gdGhlIHBhbmVsIHRvIGJlIHNjcm9sbGVkIHRvIHRoZSBjZW50ZXIsIGl0IGNsYW1wcyB0aGVcbiAgICogc2Nyb2xsIHBvc2l0aW9uIHRvIHRoZSBtaW4gb3IgbWF4IHNjcm9sbCBwb3NpdGlvbnMgcmVzcGVjdGl2ZWx5LlxuICAgKi9cbiAgX2NhbGN1bGF0ZU92ZXJsYXlTY3JvbGwoc2VsZWN0ZWRJbmRleDogbnVtYmVyLCBzY3JvbGxCdWZmZXI6IG51bWJlciwgbWF4U2Nyb2xsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSB0aGlzLl9nZXRJdGVtSGVpZ2h0KCk7XG4gICAgY29uc3Qgb3B0aW9uT2Zmc2V0RnJvbVNjcm9sbFRvcCA9IGl0ZW1IZWlnaHQgKiBzZWxlY3RlZEluZGV4O1xuICAgIGNvbnN0IGhhbGZPcHRpb25IZWlnaHQgPSBpdGVtSGVpZ2h0IC8gMjtcblxuICAgIC8vIFN0YXJ0cyBhdCB0aGUgb3B0aW9uT2Zmc2V0RnJvbVNjcm9sbFRvcCwgd2hpY2ggc2Nyb2xscyB0aGUgb3B0aW9uIHRvIHRoZSB0b3Agb2YgdGhlXG4gICAgLy8gc2Nyb2xsIGNvbnRhaW5lciwgdGhlbiBzdWJ0cmFjdHMgdGhlIHNjcm9sbCBidWZmZXIgdG8gc2Nyb2xsIHRoZSBvcHRpb24gZG93biB0b1xuICAgIC8vIHRoZSBjZW50ZXIgb2YgdGhlIG92ZXJsYXkgcGFuZWwuIEhhbGYgdGhlIG9wdGlvbiBoZWlnaHQgbXVzdCBiZSByZS1hZGRlZCB0byB0aGVcbiAgICAvLyBzY3JvbGxUb3Agc28gdGhlIG9wdGlvbiBpcyBjZW50ZXJlZCBiYXNlZCBvbiBpdHMgbWlkZGxlLCBub3QgaXRzIHRvcCBlZGdlLlxuICAgIGNvbnN0IG9wdGltYWxTY3JvbGxQb3NpdGlvbiA9IG9wdGlvbk9mZnNldEZyb21TY3JvbGxUb3AgLSBzY3JvbGxCdWZmZXIgKyBoYWxmT3B0aW9uSGVpZ2h0O1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCgwLCBvcHRpbWFsU2Nyb2xsUG9zaXRpb24pLCBtYXhTY3JvbGwpO1xuICB9XG5cbiAgb3ZlcnJpZGUgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLl92aWV3cG9ydFJ1bGVyXG4gICAgICAuY2hhbmdlKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICB0aGlzLl90cmlnZ2VyUmVjdCA9IHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG92ZXJyaWRlIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKHN1cGVyLl9jYW5PcGVuKCkpIHtcbiAgICAgIHN1cGVyLm9wZW4oKTtcbiAgICAgIHRoaXMuX3RyaWdnZXJSZWN0ID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tcHV0ZWQgZm9udC1zaXplIHdpbGwgYmUgYSBzdHJpbmcgcGl4ZWwgdmFsdWUgKGUuZy4gXCIxNnB4XCIpLlxuICAgICAgLy8gYHBhcnNlSW50YCBpZ25vcmVzIHRoZSB0cmFpbGluZyAncHgnIGFuZCBjb252ZXJ0cyB0aGlzIHRvIGEgbnVtYmVyLlxuICAgICAgdGhpcy5fdHJpZ2dlckZvbnRTaXplID0gcGFyc2VJbnQoXG4gICAgICAgIGdldENvbXB1dGVkU3R5bGUodGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQpLmZvbnRTaXplIHx8ICcwJyxcbiAgICAgICk7XG4gICAgICB0aGlzLl9jYWxjdWxhdGVPdmVybGF5UG9zaXRpb24oKTtcblxuICAgICAgLy8gU2V0IHRoZSBmb250IHNpemUgb24gdGhlIHBhbmVsIGVsZW1lbnQgb25jZSBpdCBleGlzdHMuXG4gICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5fdHJpZ2dlckZvbnRTaXplICYmXG4gICAgICAgICAgdGhpcy5fb3ZlcmxheURpci5vdmVybGF5UmVmICYmXG4gICAgICAgICAgdGhpcy5fb3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50XG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuX292ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IGAke3RoaXMuX3RyaWdnZXJGb250U2l6ZX1weGA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTY3JvbGxzIHRoZSBhY3RpdmUgb3B0aW9uIGludG8gdmlldy4gKi9cbiAgcHJvdGVjdGVkIF9zY3JvbGxPcHRpb25JbnRvVmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGFiZWxDb3VudCA9IF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlTGVnYWN5T3B0aW9uKGluZGV4LCB0aGlzLm9wdGlvbnMsIHRoaXMub3B0aW9uR3JvdXBzKTtcbiAgICBjb25zdCBpdGVtSGVpZ2h0ID0gdGhpcy5fZ2V0SXRlbUhlaWdodCgpO1xuXG4gICAgaWYgKGluZGV4ID09PSAwICYmIGxhYmVsQ291bnQgPT09IDEpIHtcbiAgICAgIC8vIElmIHdlJ3ZlIGdvdCBvbmUgZ3JvdXAgbGFiZWwgYmVmb3JlIHRoZSBvcHRpb24gYW5kIHdlJ3JlIGF0IHRoZSB0b3Agb3B0aW9uLFxuICAgICAgLy8gc2Nyb2xsIHRoZSBsaXN0IHRvIHRoZSB0b3AuIFRoaXMgaXMgYmV0dGVyIFVYIHRoYW4gc2Nyb2xsaW5nIHRoZSBsaXN0IHRvIHRoZVxuICAgICAgLy8gdG9wIG9mIHRoZSBvcHRpb24sIGJlY2F1c2UgaXQgYWxsb3dzIHRoZSB1c2VyIHRvIHJlYWQgdGhlIHRvcCBncm91cCdzIGxhYmVsLlxuICAgICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBfZ2V0TGVnYWN5T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgIChpbmRleCArIGxhYmVsQ291bnQpICogaXRlbUhlaWdodCxcbiAgICAgICAgaXRlbUhlaWdodCxcbiAgICAgICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcG9zaXRpb25pbmdTZXR0bGVkKCkge1xuICAgIHRoaXMuX2NhbGN1bGF0ZU92ZXJsYXlPZmZzZXRYKCk7XG4gICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuX3Njcm9sbFRvcDtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfcGFuZWxEb25lQW5pbWF0aW5nKGlzT3BlbjogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5fc2Nyb2xsVG9wID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fb3ZlcmxheURpci5vZmZzZXRYID0gMDtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHN1cGVyLl9wYW5lbERvbmVBbmltYXRpbmcoaXNPcGVuKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0Q2hhbmdlRXZlbnQodmFsdWU6IGFueSkge1xuICAgIHJldHVybiBuZXcgTWF0TGVnYWN5U2VsZWN0Q2hhbmdlKHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0T3ZlcmxheU1pbldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJSZWN0Py53aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB4LW9mZnNldCBvZiB0aGUgb3ZlcmxheSBwYW5lbCBpbiByZWxhdGlvbiB0byB0aGUgdHJpZ2dlcidzIHRvcCBzdGFydCBjb3JuZXIuXG4gICAqIFRoaXMgbXVzdCBiZSBhZGp1c3RlZCB0byBhbGlnbiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRleHQgb3ZlciB0aGUgdHJpZ2dlciB0ZXh0IHdoZW5cbiAgICogdGhlIHBhbmVsIG9wZW5zLiBXaWxsIGNoYW5nZSBiYXNlZCBvbiBMVFIgb3IgUlRMIHRleHQgZGlyZWN0aW9uLiBOb3RlIHRoYXQgdGhlIG9mZnNldFxuICAgKiBjYW4ndCBiZSBjYWxjdWxhdGVkIHVudGlsIHRoZSBwYW5lbCBoYXMgYmVlbiBhdHRhY2hlZCwgYmVjYXVzZSB3ZSBuZWVkIHRvIGtub3cgdGhlXG4gICAqIGNvbnRlbnQgd2lkdGggaW4gb3JkZXIgdG8gY29uc3RyYWluIHRoZSBwYW5lbCB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAgKi9cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlT3ZlcmxheU9mZnNldFgoKTogdm9pZCB7XG4gICAgY29uc3Qgb3ZlcmxheVJlY3QgPSB0aGlzLl9vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgdmlld3BvcnRTaXplID0gdGhpcy5fdmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFNpemUoKTtcbiAgICBjb25zdCBpc1J0bCA9IHRoaXMuX2lzUnRsKCk7XG4gICAgY29uc3QgcGFkZGluZ1dpZHRoID0gdGhpcy5tdWx0aXBsZVxuICAgICAgPyBTRUxFQ1RfTVVMVElQTEVfUEFORUxfUEFERElOR19YICsgU0VMRUNUX1BBTkVMX1BBRERJTkdfWFxuICAgICAgOiBTRUxFQ1RfUEFORUxfUEFERElOR19YICogMjtcbiAgICBsZXQgb2Zmc2V0WDogbnVtYmVyO1xuXG4gICAgLy8gQWRqdXN0IHRoZSBvZmZzZXQsIGRlcGVuZGluZyBvbiB0aGUgb3B0aW9uIHBhZGRpbmcuXG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIG9mZnNldFggPSBTRUxFQ1RfTVVMVElQTEVfUEFORUxfUEFERElOR19YO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kaXNhYmxlT3B0aW9uQ2VudGVyaW5nKSB7XG4gICAgICBvZmZzZXRYID0gU0VMRUNUX1BBTkVMX1BBRERJTkdfWDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0gfHwgdGhpcy5vcHRpb25zLmZpcnN0O1xuICAgICAgb2Zmc2V0WCA9IHNlbGVjdGVkICYmIHNlbGVjdGVkLmdyb3VwID8gU0VMRUNUX1BBTkVMX0lOREVOVF9QQURESU5HX1ggOiBTRUxFQ1RfUEFORUxfUEFERElOR19YO1xuICAgIH1cblxuICAgIC8vIEludmVydCB0aGUgb2Zmc2V0IGluIExUUi5cbiAgICBpZiAoIWlzUnRsKSB7XG4gICAgICBvZmZzZXRYICo9IC0xO1xuICAgIH1cblxuICAgIC8vIERldGVybWluZSBob3cgbXVjaCB0aGUgc2VsZWN0IG92ZXJmbG93cyBvbiBlYWNoIHNpZGUuXG4gICAgY29uc3QgbGVmdE92ZXJmbG93ID0gMCAtIChvdmVybGF5UmVjdC5sZWZ0ICsgb2Zmc2V0WCAtIChpc1J0bCA/IHBhZGRpbmdXaWR0aCA6IDApKTtcbiAgICBjb25zdCByaWdodE92ZXJmbG93ID1cbiAgICAgIG92ZXJsYXlSZWN0LnJpZ2h0ICsgb2Zmc2V0WCAtIHZpZXdwb3J0U2l6ZS53aWR0aCArIChpc1J0bCA/IDAgOiBwYWRkaW5nV2lkdGgpO1xuXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgb3ZlcmZsb3dzIG9uIGVpdGhlciBzaWRlLCByZWR1Y2UgdGhlIG9mZnNldCB0byBhbGxvdyBpdCB0byBmaXQuXG4gICAgaWYgKGxlZnRPdmVyZmxvdyA+IDApIHtcbiAgICAgIG9mZnNldFggKz0gbGVmdE92ZXJmbG93ICsgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG4gICAgfSBlbHNlIGlmIChyaWdodE92ZXJmbG93ID4gMCkge1xuICAgICAgb2Zmc2V0WCAtPSByaWdodE92ZXJmbG93ICsgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBvZmZzZXQgZGlyZWN0bHkgaW4gb3JkZXIgdG8gYXZvaWQgaGF2aW5nIHRvIGdvIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbiBhbmRcbiAgICAvLyBwb3RlbnRpYWxseSB0cmlnZ2VyaW5nIFwiY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycy4gUm91bmQgdGhlIHZhbHVlIHRvIGF2b2lkXG4gICAgLy8gYmx1cnJ5IGNvbnRlbnQgaW4gc29tZSBicm93c2Vycy5cbiAgICB0aGlzLl9vdmVybGF5RGlyLm9mZnNldFggPSBNYXRoLnJvdW5kKG9mZnNldFgpO1xuICAgIHRoaXMuX292ZXJsYXlEaXIub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHktb2Zmc2V0IG9mIHRoZSBzZWxlY3QncyBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZVxuICAgKiB0b3Agc3RhcnQgY29ybmVyIG9mIHRoZSB0cmlnZ2VyLiBJdCBoYXMgdG8gYmUgYWRqdXN0ZWQgaW4gb3JkZXIgZm9yIHRoZVxuICAgKiBzZWxlY3RlZCBvcHRpb24gdG8gYmUgYWxpZ25lZCBvdmVyIHRoZSB0cmlnZ2VyIHdoZW4gdGhlIHBhbmVsIG9wZW5zLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlT3ZlcmxheU9mZnNldFkoXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyLFxuICAgIHNjcm9sbEJ1ZmZlcjogbnVtYmVyLFxuICAgIG1heFNjcm9sbDogbnVtYmVyLFxuICApOiBudW1iZXIge1xuICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSB0aGlzLl9nZXRJdGVtSGVpZ2h0KCk7XG4gICAgY29uc3Qgb3B0aW9uSGVpZ2h0QWRqdXN0bWVudCA9IChpdGVtSGVpZ2h0IC0gdGhpcy5fdHJpZ2dlclJlY3QuaGVpZ2h0KSAvIDI7XG4gICAgY29uc3QgbWF4T3B0aW9uc0Rpc3BsYXllZCA9IE1hdGguZmxvb3IoU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgLyBpdGVtSGVpZ2h0KTtcbiAgICBsZXQgb3B0aW9uT2Zmc2V0RnJvbVBhbmVsVG9wOiBudW1iZXI7XG5cbiAgICAvLyBEaXNhYmxlIG9mZnNldCBpZiByZXF1ZXN0ZWQgYnkgdXNlciBieSByZXR1cm5pbmcgMCBhcyB2YWx1ZSB0byBvZmZzZXRcbiAgICBpZiAodGhpcy5kaXNhYmxlT3B0aW9uQ2VudGVyaW5nKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc2Nyb2xsVG9wID09PSAwKSB7XG4gICAgICBvcHRpb25PZmZzZXRGcm9tUGFuZWxUb3AgPSBzZWxlY3RlZEluZGV4ICogaXRlbUhlaWdodDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3Njcm9sbFRvcCA9PT0gbWF4U2Nyb2xsKSB7XG4gICAgICBjb25zdCBmaXJzdERpc3BsYXllZEluZGV4ID0gdGhpcy5fZ2V0SXRlbUNvdW50KCkgLSBtYXhPcHRpb25zRGlzcGxheWVkO1xuICAgICAgY29uc3Qgc2VsZWN0ZWREaXNwbGF5SW5kZXggPSBzZWxlY3RlZEluZGV4IC0gZmlyc3REaXNwbGF5ZWRJbmRleDtcblxuICAgICAgLy8gVGhlIGZpcnN0IGl0ZW0gaXMgcGFydGlhbGx5IG91dCBvZiB0aGUgdmlld3BvcnQuIFRoZXJlZm9yZSB3ZSBuZWVkIHRvIGNhbGN1bGF0ZSB3aGF0XG4gICAgICAvLyBwb3J0aW9uIG9mIGl0IGlzIHNob3duIGluIHRoZSB2aWV3cG9ydCBhbmQgYWNjb3VudCBmb3IgaXQgaW4gb3VyIG9mZnNldC5cbiAgICAgIGxldCBwYXJ0aWFsSXRlbUhlaWdodCA9XG4gICAgICAgIGl0ZW1IZWlnaHQgLSAoKHRoaXMuX2dldEl0ZW1Db3VudCgpICogaXRlbUhlaWdodCAtIFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUKSAlIGl0ZW1IZWlnaHQpO1xuXG4gICAgICAvLyBCZWNhdXNlIHRoZSBwYW5lbCBoZWlnaHQgaXMgbG9uZ2VyIHRoYW4gdGhlIGhlaWdodCBvZiB0aGUgb3B0aW9ucyBhbG9uZSxcbiAgICAgIC8vIHRoZXJlIGlzIGFsd2F5cyBleHRyYSBwYWRkaW5nIGF0IHRoZSB0b3Agb3IgYm90dG9tIG9mIHRoZSBwYW5lbC4gV2hlblxuICAgICAgLy8gc2Nyb2xsZWQgdG8gdGhlIHZlcnkgYm90dG9tLCB0aGlzIHBhZGRpbmcgaXMgYXQgdGhlIHRvcCBvZiB0aGUgcGFuZWwgYW5kXG4gICAgICAvLyBtdXN0IGJlIGFkZGVkIHRvIHRoZSBvZmZzZXQuXG4gICAgICBvcHRpb25PZmZzZXRGcm9tUGFuZWxUb3AgPSBzZWxlY3RlZERpc3BsYXlJbmRleCAqIGl0ZW1IZWlnaHQgKyBwYXJ0aWFsSXRlbUhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgdGhlIG9wdGlvbiB3YXMgc2Nyb2xsZWQgdG8gdGhlIG1pZGRsZSBvZiB0aGUgcGFuZWwgdXNpbmcgYSBzY3JvbGwgYnVmZmVyLFxuICAgICAgLy8gaXRzIG9mZnNldCB3aWxsIGJlIHRoZSBzY3JvbGwgYnVmZmVyIG1pbnVzIHRoZSBoYWxmIGhlaWdodCB0aGF0IHdhcyBhZGRlZCB0b1xuICAgICAgLy8gY2VudGVyIGl0LlxuICAgICAgb3B0aW9uT2Zmc2V0RnJvbVBhbmVsVG9wID0gc2Nyb2xsQnVmZmVyIC0gaXRlbUhlaWdodCAvIDI7XG4gICAgfVxuXG4gICAgLy8gVGhlIGZpbmFsIG9mZnNldCBpcyB0aGUgb3B0aW9uJ3Mgb2Zmc2V0IGZyb20gdGhlIHRvcCwgYWRqdXN0ZWQgZm9yIHRoZSBoZWlnaHQgZGlmZmVyZW5jZSxcbiAgICAvLyBtdWx0aXBsaWVkIGJ5IC0xIHRvIGVuc3VyZSB0aGF0IHRoZSBvdmVybGF5IG1vdmVzIGluIHRoZSBjb3JyZWN0IGRpcmVjdGlvbiB1cCB0aGUgcGFnZS5cbiAgICAvLyBUaGUgdmFsdWUgaXMgcm91bmRlZCB0byBwcmV2ZW50IHNvbWUgYnJvd3NlcnMgZnJvbSBibHVycmluZyB0aGUgY29udGVudC5cbiAgICByZXR1cm4gTWF0aC5yb3VuZChvcHRpb25PZmZzZXRGcm9tUGFuZWxUb3AgKiAtMSAtIG9wdGlvbkhlaWdodEFkanVzdG1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGF0IHRoZSBhdHRlbXB0ZWQgb3ZlcmxheSBwb3NpdGlvbiB3aWxsIGZpdCB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAgKiBJZiBpdCB3aWxsIG5vdCBmaXQsIHRyaWVzIHRvIGFkanVzdCB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFuZCB0aGUgYXNzb2NpYXRlZFxuICAgKiB5LW9mZnNldCBzbyB0aGUgcGFuZWwgY2FuIG9wZW4gZnVsbHkgb24tc2NyZWVuLiBJZiBpdCBzdGlsbCB3b24ndCBmaXQsXG4gICAqIHNldHMgdGhlIG9mZnNldCBiYWNrIHRvIDAgdG8gYWxsb3cgdGhlIGZhbGxiYWNrIHBvc2l0aW9uIHRvIHRha2Ugb3Zlci5cbiAgICovXG4gIHByaXZhdGUgX2NoZWNrT3ZlcmxheVdpdGhpblZpZXdwb3J0KG1heFNjcm9sbDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgaXRlbUhlaWdodCA9IHRoaXMuX2dldEl0ZW1IZWlnaHQoKTtcbiAgICBjb25zdCB2aWV3cG9ydFNpemUgPSB0aGlzLl92aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0U2l6ZSgpO1xuXG4gICAgY29uc3QgdG9wU3BhY2VBdmFpbGFibGUgPSB0aGlzLl90cmlnZ2VyUmVjdC50b3AgLSBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcbiAgICBjb25zdCBib3R0b21TcGFjZUF2YWlsYWJsZSA9XG4gICAgICB2aWV3cG9ydFNpemUuaGVpZ2h0IC0gdGhpcy5fdHJpZ2dlclJlY3QuYm90dG9tIC0gU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG5cbiAgICBjb25zdCBwYW5lbEhlaWdodFRvcCA9IE1hdGguYWJzKHRoaXMuX29mZnNldFkpO1xuICAgIGNvbnN0IHRvdGFsUGFuZWxIZWlnaHQgPSBNYXRoLm1pbih0aGlzLl9nZXRJdGVtQ291bnQoKSAqIGl0ZW1IZWlnaHQsIFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUKTtcbiAgICBjb25zdCBwYW5lbEhlaWdodEJvdHRvbSA9IHRvdGFsUGFuZWxIZWlnaHQgLSBwYW5lbEhlaWdodFRvcCAtIHRoaXMuX3RyaWdnZXJSZWN0LmhlaWdodDtcblxuICAgIGlmIChwYW5lbEhlaWdodEJvdHRvbSA+IGJvdHRvbVNwYWNlQXZhaWxhYmxlKSB7XG4gICAgICB0aGlzLl9hZGp1c3RQYW5lbFVwKHBhbmVsSGVpZ2h0Qm90dG9tLCBib3R0b21TcGFjZUF2YWlsYWJsZSk7XG4gICAgfSBlbHNlIGlmIChwYW5lbEhlaWdodFRvcCA+IHRvcFNwYWNlQXZhaWxhYmxlKSB7XG4gICAgICB0aGlzLl9hZGp1c3RQYW5lbERvd24ocGFuZWxIZWlnaHRUb3AsIHRvcFNwYWNlQXZhaWxhYmxlLCBtYXhTY3JvbGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1PcmlnaW4gPSB0aGlzLl9nZXRPcmlnaW5CYXNlZE9uT3B0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEFkanVzdHMgdGhlIG92ZXJsYXkgcGFuZWwgdXAgdG8gZml0IGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgcHJpdmF0ZSBfYWRqdXN0UGFuZWxVcChwYW5lbEhlaWdodEJvdHRvbTogbnVtYmVyLCBib3R0b21TcGFjZUF2YWlsYWJsZTogbnVtYmVyKSB7XG4gICAgLy8gQnJvd3NlcnMgaWdub3JlIGZyYWN0aW9uYWwgc2Nyb2xsIG9mZnNldHMsIHNvIHdlIG5lZWQgdG8gcm91bmQuXG4gICAgY29uc3QgZGlzdGFuY2VCZWxvd1ZpZXdwb3J0ID0gTWF0aC5yb3VuZChwYW5lbEhlaWdodEJvdHRvbSAtIGJvdHRvbVNwYWNlQXZhaWxhYmxlKTtcblxuICAgIC8vIFNjcm9sbHMgdGhlIHBhbmVsIHVwIGJ5IHRoZSBkaXN0YW5jZSBpdCB3YXMgZXh0ZW5kaW5nIHBhc3QgdGhlIGJvdW5kYXJ5LCB0aGVuXG4gICAgLy8gYWRqdXN0cyB0aGUgb2Zmc2V0IGJ5IHRoYXQgYW1vdW50IHRvIG1vdmUgdGhlIHBhbmVsIHVwIGludG8gdGhlIHZpZXdwb3J0LlxuICAgIHRoaXMuX3Njcm9sbFRvcCAtPSBkaXN0YW5jZUJlbG93Vmlld3BvcnQ7XG4gICAgdGhpcy5fb2Zmc2V0WSAtPSBkaXN0YW5jZUJlbG93Vmlld3BvcnQ7XG4gICAgdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gdGhpcy5fZ2V0T3JpZ2luQmFzZWRPbk9wdGlvbigpO1xuXG4gICAgLy8gSWYgdGhlIHBhbmVsIGlzIHNjcm9sbGVkIHRvIHRoZSB2ZXJ5IHRvcCwgaXQgd29uJ3QgYmUgYWJsZSB0byBmaXQgdGhlIHBhbmVsXG4gICAgLy8gYnkgc2Nyb2xsaW5nLCBzbyBzZXQgdGhlIG9mZnNldCB0byAwIHRvIGFsbG93IHRoZSBmYWxsYmFjayBwb3NpdGlvbiB0byB0YWtlXG4gICAgLy8gZWZmZWN0LlxuICAgIGlmICh0aGlzLl9zY3JvbGxUb3AgPD0gMCkge1xuICAgICAgdGhpcy5fc2Nyb2xsVG9wID0gMDtcbiAgICAgIHRoaXMuX29mZnNldFkgPSAwO1xuICAgICAgdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gYDUwJSBib3R0b20gMHB4YDtcbiAgICB9XG4gIH1cblxuICAvKiogQWRqdXN0cyB0aGUgb3ZlcmxheSBwYW5lbCBkb3duIHRvIGZpdCBpbiB0aGUgdmlld3BvcnQuICovXG4gIHByaXZhdGUgX2FkanVzdFBhbmVsRG93bihwYW5lbEhlaWdodFRvcDogbnVtYmVyLCB0b3BTcGFjZUF2YWlsYWJsZTogbnVtYmVyLCBtYXhTY3JvbGw6IG51bWJlcikge1xuICAgIC8vIEJyb3dzZXJzIGlnbm9yZSBmcmFjdGlvbmFsIHNjcm9sbCBvZmZzZXRzLCBzbyB3ZSBuZWVkIHRvIHJvdW5kLlxuICAgIGNvbnN0IGRpc3RhbmNlQWJvdmVWaWV3cG9ydCA9IE1hdGgucm91bmQocGFuZWxIZWlnaHRUb3AgLSB0b3BTcGFjZUF2YWlsYWJsZSk7XG5cbiAgICAvLyBTY3JvbGxzIHRoZSBwYW5lbCBkb3duIGJ5IHRoZSBkaXN0YW5jZSBpdCB3YXMgZXh0ZW5kaW5nIHBhc3QgdGhlIGJvdW5kYXJ5LCB0aGVuXG4gICAgLy8gYWRqdXN0cyB0aGUgb2Zmc2V0IGJ5IHRoYXQgYW1vdW50IHRvIG1vdmUgdGhlIHBhbmVsIGRvd24gaW50byB0aGUgdmlld3BvcnQuXG4gICAgdGhpcy5fc2Nyb2xsVG9wICs9IGRpc3RhbmNlQWJvdmVWaWV3cG9ydDtcbiAgICB0aGlzLl9vZmZzZXRZICs9IGRpc3RhbmNlQWJvdmVWaWV3cG9ydDtcbiAgICB0aGlzLl90cmFuc2Zvcm1PcmlnaW4gPSB0aGlzLl9nZXRPcmlnaW5CYXNlZE9uT3B0aW9uKCk7XG5cbiAgICAvLyBJZiB0aGUgcGFuZWwgaXMgc2Nyb2xsZWQgdG8gdGhlIHZlcnkgYm90dG9tLCBpdCB3b24ndCBiZSBhYmxlIHRvIGZpdCB0aGVcbiAgICAvLyBwYW5lbCBieSBzY3JvbGxpbmcsIHNvIHNldCB0aGUgb2Zmc2V0IHRvIDAgdG8gYWxsb3cgdGhlIGZhbGxiYWNrIHBvc2l0aW9uXG4gICAgLy8gdG8gdGFrZSBlZmZlY3QuXG4gICAgaWYgKHRoaXMuX3Njcm9sbFRvcCA+PSBtYXhTY3JvbGwpIHtcbiAgICAgIHRoaXMuX3Njcm9sbFRvcCA9IG1heFNjcm9sbDtcbiAgICAgIHRoaXMuX29mZnNldFkgPSAwO1xuICAgICAgdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gYDUwJSB0b3AgMHB4YDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFuZCB4LSBhbmQgeS1vZmZzZXRzIG9mIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVPdmVybGF5UG9zaXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgaXRlbUhlaWdodCA9IHRoaXMuX2dldEl0ZW1IZWlnaHQoKTtcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuX2dldEl0ZW1Db3VudCgpO1xuICAgIGNvbnN0IHBhbmVsSGVpZ2h0ID0gTWF0aC5taW4oaXRlbXMgKiBpdGVtSGVpZ2h0LCBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCk7XG4gICAgY29uc3Qgc2Nyb2xsQ29udGFpbmVySGVpZ2h0ID0gaXRlbXMgKiBpdGVtSGVpZ2h0O1xuXG4gICAgLy8gVGhlIGZhcnRoZXN0IHRoZSBwYW5lbCBjYW4gYmUgc2Nyb2xsZWQgYmVmb3JlIGl0IGhpdHMgdGhlIGJvdHRvbVxuICAgIGNvbnN0IG1heFNjcm9sbCA9IHNjcm9sbENvbnRhaW5lckhlaWdodCAtIHBhbmVsSGVpZ2h0O1xuXG4gICAgLy8gSWYgbm8gdmFsdWUgaXMgc2VsZWN0ZWQgd2Ugb3BlbiB0aGUgcG9wdXAgdG8gdGhlIGZpcnN0IGl0ZW0uXG4gICAgbGV0IHNlbGVjdGVkT3B0aW9uT2Zmc2V0OiBudW1iZXI7XG5cbiAgICBpZiAodGhpcy5lbXB0eSkge1xuICAgICAgc2VsZWN0ZWRPcHRpb25PZmZzZXQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RlZE9wdGlvbk9mZnNldCA9IE1hdGgubWF4KFxuICAgICAgICB0aGlzLm9wdGlvbnMudG9BcnJheSgpLmluZGV4T2YodGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0pLFxuICAgICAgICAwLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBzZWxlY3RlZE9wdGlvbk9mZnNldCArPSBfY291bnRHcm91cExhYmVsc0JlZm9yZUxlZ2FjeU9wdGlvbihcbiAgICAgIHNlbGVjdGVkT3B0aW9uT2Zmc2V0LFxuICAgICAgdGhpcy5vcHRpb25zLFxuICAgICAgdGhpcy5vcHRpb25Hcm91cHMsXG4gICAgKTtcblxuICAgIC8vIFdlIG11c3QgbWFpbnRhaW4gYSBzY3JvbGwgYnVmZmVyIHNvIHRoZSBzZWxlY3RlZCBvcHRpb24gd2lsbCBiZSBzY3JvbGxlZCB0byB0aGVcbiAgICAvLyBjZW50ZXIgb2YgdGhlIG92ZXJsYXkgcGFuZWwgcmF0aGVyIHRoYW4gdGhlIHRvcC5cbiAgICBjb25zdCBzY3JvbGxCdWZmZXIgPSBwYW5lbEhlaWdodCAvIDI7XG4gICAgdGhpcy5fc2Nyb2xsVG9wID0gdGhpcy5fY2FsY3VsYXRlT3ZlcmxheVNjcm9sbChzZWxlY3RlZE9wdGlvbk9mZnNldCwgc2Nyb2xsQnVmZmVyLCBtYXhTY3JvbGwpO1xuICAgIHRoaXMuX29mZnNldFkgPSB0aGlzLl9jYWxjdWxhdGVPdmVybGF5T2Zmc2V0WShzZWxlY3RlZE9wdGlvbk9mZnNldCwgc2Nyb2xsQnVmZmVyLCBtYXhTY3JvbGwpO1xuXG4gICAgdGhpcy5fY2hlY2tPdmVybGF5V2l0aGluVmlld3BvcnQobWF4U2Nyb2xsKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSB0cmFuc2Zvcm0gb3JpZ2luIHBvaW50IGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBvcHRpb24uICovXG4gIHByaXZhdGUgX2dldE9yaWdpbkJhc2VkT25PcHRpb24oKTogc3RyaW5nIHtcbiAgICBjb25zdCBpdGVtSGVpZ2h0ID0gdGhpcy5fZ2V0SXRlbUhlaWdodCgpO1xuICAgIGNvbnN0IG9wdGlvbkhlaWdodEFkanVzdG1lbnQgPSAoaXRlbUhlaWdodCAtIHRoaXMuX3RyaWdnZXJSZWN0LmhlaWdodCkgLyAyO1xuICAgIGNvbnN0IG9yaWdpblkgPSBNYXRoLmFicyh0aGlzLl9vZmZzZXRZKSAtIG9wdGlvbkhlaWdodEFkanVzdG1lbnQgKyBpdGVtSGVpZ2h0IC8gMjtcbiAgICByZXR1cm4gYDUwJSAke29yaWdpbll9cHggMHB4YDtcbiAgfVxuXG4gIC8qKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIHNlbGVjdCdzIG9wdGlvbnMuICovXG4gIHByaXZhdGUgX2dldEl0ZW1IZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlckZvbnRTaXplICogU0VMRUNUX0lURU1fSEVJR0hUX0VNO1xuICB9XG5cbiAgLyoqIENhbGN1bGF0ZXMgdGhlIGFtb3VudCBvZiBpdGVtcyBpbiB0aGUgc2VsZWN0LiBUaGlzIGluY2x1ZGVzIG9wdGlvbnMgYW5kIGdyb3VwIGxhYmVscy4gKi9cbiAgcHJpdmF0ZSBfZ2V0SXRlbUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5sZW5ndGggKyB0aGlzLm9wdGlvbkdyb3Vwcy5sZW5ndGg7XG4gIH1cbn1cbiIsIjwhLS1cbiBOb3RlIHRoYXQgdGhlIHNlbGVjdCB0cmlnZ2VyIGVsZW1lbnQgc3BlY2lmaWVzIGBhcmlhLW93bnNgIHBvaW50aW5nIHRvIHRoZSBsaXN0Ym94IG92ZXJsYXkuXG4gV2hpbGUgYXJpYS1vd25zIGlzIG5vdCByZXF1aXJlZCBmb3IgdGhlIEFSSUEgMS4yIGByb2xlPVwiY29tYm9ib3hcImAgaW50ZXJhY3Rpb24gcGF0dGVybixcbiBpdCBmaXhlcyBhbiBpc3N1ZSB3aXRoIFZvaWNlT3ZlciB3aGVuIHRoZSBzZWxlY3QgYXBwZWFycyBpbnNpZGUgb2YgYW4gYGFyaWEtbW9kZWw9XCJ0cnVlXCJgXG4gZWxlbWVudCAoZS5nLiBhIGRpYWxvZykuIFdpdGhvdXQgdGhpcyBgYXJpYS1vd25zYCwgdGhlIGBhcmlhLW1vZGFsYCBvbiBhIGRpYWxvZyBwcmV2ZW50c1xuIFZvaWNlT3ZlciBmcm9tIFwic2VlaW5nXCIgdGhlIHNlbGVjdCdzIGxpc3Rib3ggb3ZlcmxheSBmb3IgYXJpYS1hY3RpdmVkZXNjZW5kYW50LlxuIFVzaW5nIGBhcmlhLW93bnNgIHJlLXBhcmVudHMgdGhlIHNlbGVjdCBvdmVybGF5IHNvIHRoYXQgaXQgd29ya3MgYWdhaW4uXG4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzIwNjk0XG4tLT5cbjxkaXYgY2RrLW92ZXJsYXktb3JpZ2luXG4gICAgIFthdHRyLmFyaWEtb3duc109XCJwYW5lbE9wZW4gPyBpZCArICctcGFuZWwnIDogbnVsbFwiXG4gICAgIGNsYXNzPVwibWF0LXNlbGVjdC10cmlnZ2VyXCJcbiAgICAgKGNsaWNrKT1cInRvZ2dsZSgpXCJcbiAgICAgI29yaWdpbj1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgICAjdHJpZ2dlcj5cbiAgPGRpdiBjbGFzcz1cIm1hdC1zZWxlY3QtdmFsdWVcIiBbbmdTd2l0Y2hdPVwiZW1wdHlcIiBbYXR0ci5pZF09XCJfdmFsdWVJZFwiPlxuICAgIDxzcGFuIGNsYXNzPVwibWF0LXNlbGVjdC1wbGFjZWhvbGRlciBtYXQtc2VsZWN0LW1pbi1saW5lXCIgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj57e3BsYWNlaG9sZGVyfX08L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJtYXQtc2VsZWN0LXZhbHVlLXRleHRcIiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIiBbbmdTd2l0Y2hdPVwiISFjdXN0b21UcmlnZ2VyXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1hdC1zZWxlY3QtbWluLWxpbmVcIiAqbmdTd2l0Y2hEZWZhdWx0Pnt7dHJpZ2dlclZhbHVlfX08L3NwYW4+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtYXQtc2VsZWN0LXRyaWdnZXJcIiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJtYXQtc2VsZWN0LWFycm93LXdyYXBwZXJcIj48ZGl2IGNsYXNzPVwibWF0LXNlbGVjdC1hcnJvd1wiPjwvZGl2PjwvZGl2PlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZVxuICBjZGstY29ubmVjdGVkLW92ZXJsYXlcbiAgY2RrQ29ubmVjdGVkT3ZlcmxheUxvY2tQb3NpdGlvblxuICBjZGtDb25uZWN0ZWRPdmVybGF5SGFzQmFja2Ryb3BcbiAgY2RrQ29ubmVjdGVkT3ZlcmxheUJhY2tkcm9wQ2xhc3M9XCJjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcFwiXG4gIFtjZGtDb25uZWN0ZWRPdmVybGF5UGFuZWxDbGFzc109XCJfb3ZlcmxheVBhbmVsQ2xhc3NcIlxuICBbY2RrQ29ubmVjdGVkT3ZlcmxheVNjcm9sbFN0cmF0ZWd5XT1cIl9zY3JvbGxTdHJhdGVneVwiXG4gIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cIm9yaWdpblwiXG4gIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJwYW5lbE9wZW5cIlxuICBbY2RrQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uc109XCJfcG9zaXRpb25zXCJcbiAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlNaW5XaWR0aF09XCJfZ2V0T3ZlcmxheU1pbldpZHRoKClcIlxuICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9mZnNldFldPVwiX29mZnNldFlcIlxuICAoYmFja2Ryb3BDbGljayk9XCJjbG9zZSgpXCJcbiAgKGF0dGFjaCk9XCJfb25BdHRhY2hlZCgpXCJcbiAgKGRldGFjaCk9XCJjbG9zZSgpXCI+XG4gIDxkaXYgY2xhc3M9XCJtYXQtc2VsZWN0LXBhbmVsLXdyYXBcIiBbQHRyYW5zZm9ybVBhbmVsV3JhcF0+XG4gICAgPGRpdlxuICAgICAgI3BhbmVsXG4gICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgIGNsYXNzPVwibWF0LXNlbGVjdC1wYW5lbCB7eyBfZ2V0UGFuZWxUaGVtZSgpIH19XCJcbiAgICAgIFthdHRyLmlkXT1cImlkICsgJy1wYW5lbCdcIlxuICAgICAgW2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGVdPVwibXVsdGlwbGVcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWwgfHwgbnVsbFwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiX2dldFBhbmVsQXJpYUxhYmVsbGVkYnkoKVwiXG4gICAgICBbbmdDbGFzc109XCJwYW5lbENsYXNzXCJcbiAgICAgIFtAdHJhbnNmb3JtUGFuZWxdPVwibXVsdGlwbGUgPyAnc2hvd2luZy1tdWx0aXBsZScgOiAnc2hvd2luZydcIlxuICAgICAgKEB0cmFuc2Zvcm1QYW5lbC5kb25lKT1cIl9wYW5lbERvbmVBbmltYXRpbmdTdHJlYW0ubmV4dCgkZXZlbnQudG9TdGF0ZSlcIlxuICAgICAgW3N0eWxlLnRyYW5zZm9ybU9yaWdpbl09XCJfdHJhbnNmb3JtT3JpZ2luXCJcbiAgICAgIFtzdHlsZS5mb250LXNpemUucHhdPVwiX3RyaWdnZXJGb250U2l6ZVwiXG4gICAgICAoa2V5ZG93bik9XCJfaGFuZGxlS2V5ZG93bigkZXZlbnQpXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==