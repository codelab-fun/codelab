/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, Optional, QueryList, ViewEncapsulation, } from '@angular/core';
import { mixinTabIndex } from '@angular/material/core';
import { merge, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { MatChip } from './chip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
/**
 * Boilerplate for applying mixins to MatChipSet.
 * @docs-private
 */
class MatChipSetBase {
    constructor(_elementRef) { }
}
const _MatChipSetMixinBase = mixinTabIndex(MatChipSetBase);
/**
 * Basic container component for the MatChip component.
 *
 * Extended by MatChipListbox and MatChipGrid for different interaction patterns.
 */
export class MatChipSet extends _MatChipSetMixinBase {
    constructor(_elementRef, _changeDetectorRef, _dir) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        /** Index of the last destroyed chip that had focus. */
        this._lastDestroyedFocusedChipIndex = null;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new Subject();
        /** Role to use if it hasn't been overwritten by the user. */
        this._defaultRole = 'presentation';
        this._disabled = false;
        this._explicitRole = null;
        /** Flat list of all the actions contained within the chips. */
        this._chipActions = new QueryList();
    }
    /** Combined stream of all of the child chips' focus events. */
    get chipFocusChanges() {
        return this._getChipStream(chip => chip._onFocus);
    }
    /** Combined stream of all of the child chips' remove events. */
    get chipDestroyedChanges() {
        return this._getChipStream(chip => chip.destroyed);
    }
    /** Whether the chip set is disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /** Whether the chip list contains chips or not. */
    get empty() {
        return this._chips.length === 0;
    }
    /** The ARIA role applied to the chip set. */
    get role() {
        if (this._explicitRole) {
            return this._explicitRole;
        }
        return this.empty ? null : this._defaultRole;
    }
    set role(value) {
        this._explicitRole = value;
    }
    /** Whether any of the chips inside of this chip-set has focus. */
    get focused() {
        return this._hasFocusedChip();
    }
    ngAfterViewInit() {
        this._setUpFocusManagement();
        this._trackChipSetChanges();
        this._trackDestroyedFocusedChip();
    }
    ngOnDestroy() {
        this._keyManager?.destroy();
        this._chipActions.destroy();
        this._destroyed.next();
        this._destroyed.complete();
    }
    /** Checks whether any of the chips is focused. */
    _hasFocusedChip() {
        return this._chips && this._chips.some(chip => chip._hasFocus());
    }
    /** Syncs the chip-set's state with the individual chips. */
    _syncChipsState() {
        if (this._chips) {
            this._chips.forEach(chip => {
                chip.disabled = this._disabled;
                chip._changeDetectorRef.markForCheck();
            });
        }
    }
    /** Dummy method for subclasses to override. Base chip set cannot be focused. */
    focus() { }
    /** Handles keyboard events on the chip set. */
    _handleKeydown(event) {
        if (this._originatesFromChip(event)) {
            this._keyManager.onKeydown(event);
        }
    }
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this._chips.length;
    }
    /**
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    _allowFocusEscape() {
        const previousTabIndex = this.tabIndex;
        if (this.tabIndex !== -1) {
            this.tabIndex = -1;
            setTimeout(() => {
                this.tabIndex = previousTabIndex;
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    /**
     * Gets a stream of events from all the chips within the set.
     * The stream will automatically incorporate any newly-added chips.
     */
    _getChipStream(mappingFunction) {
        return this._chips.changes.pipe(startWith(null), switchMap(() => merge(...this._chips.map(mappingFunction))));
    }
    /** Checks whether an event comes from inside a chip element. */
    _originatesFromChip(event) {
        let currentElement = event.target;
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            // Null check the classList, because IE and Edge don't support it on all elements.
            if (currentElement.classList && currentElement.classList.contains('mdc-evolution-chip')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }
    /** Sets up the chip set's focus management logic. */
    _setUpFocusManagement() {
        // Create a flat `QueryList` containing the actions of all of the chips.
        // This allows us to navigate both within the chip and move to the next/previous
        // one using the existing `ListKeyManager`.
        this._chips.changes.pipe(startWith(this._chips)).subscribe((chips) => {
            const actions = [];
            chips.forEach(chip => chip._getActions().forEach(action => actions.push(action)));
            this._chipActions.reset(actions);
            this._chipActions.notifyOnChanges();
        });
        this._keyManager = new FocusKeyManager(this._chipActions)
            .withVerticalOrientation()
            .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr')
            .withHomeAndEnd()
            .skipPredicate(action => this._skipPredicate(action));
        // Keep the manager active index in sync so that navigation picks
        // up from the current chip if the user clicks into the list directly.
        this.chipFocusChanges.pipe(takeUntil(this._destroyed)).subscribe(({ chip }) => {
            const action = chip._getSourceAction(document.activeElement);
            if (action) {
                this._keyManager.updateActiveItem(action);
            }
        });
        this._dir?.change
            .pipe(takeUntil(this._destroyed))
            .subscribe(direction => this._keyManager.withHorizontalOrientation(direction));
    }
    /**
     * Determines if key manager should avoid putting a given chip action in the tab index. Skip
     * non-interactive and disabled actions since the user can't do anything with them.
     */
    _skipPredicate(action) {
        // Skip chips that the user cannot interact with. `mat-chip-set` does not permit focusing disabled
        // chips.
        return !action.isInteractive || action.disabled;
    }
    /** Listens to changes in the chip set and syncs up the state of the individual chips. */
    _trackChipSetChanges() {
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            if (this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then(() => this._syncChipsState());
            }
            this._redirectDestroyedChipFocus();
        });
    }
    /** Starts tracking the destroyed chips in order to capture the focused one. */
    _trackDestroyedFocusedChip() {
        this.chipDestroyedChanges.pipe(takeUntil(this._destroyed)).subscribe((event) => {
            const chipArray = this._chips.toArray();
            const chipIndex = chipArray.indexOf(event.chip);
            // If the focused chip is destroyed, save its index so that we can move focus to the next
            // chip. We only save the index here, rather than move the focus immediately, because we want
            // to wait until the chip is removed from the chip list before focusing the next one. This
            // allows us to keep focus on the same index if the chip gets swapped out.
            if (this._isValidIndex(chipIndex) && event.chip._hasFocus()) {
                this._lastDestroyedFocusedChipIndex = chipIndex;
            }
        });
    }
    /**
     * Finds the next appropriate chip to move focus to,
     * if the currently-focused chip is destroyed.
     */
    _redirectDestroyedChipFocus() {
        if (this._lastDestroyedFocusedChipIndex == null) {
            return;
        }
        if (this._chips.length) {
            const newIndex = Math.min(this._lastDestroyedFocusedChipIndex, this._chips.length - 1);
            const chipToFocus = this._chips.toArray()[newIndex];
            if (chipToFocus.disabled) {
                // If we're down to one disabled chip, move focus back to the set.
                if (this._chips.length === 1) {
                    this.focus();
                }
                else {
                    this._keyManager.setPreviousItemActive();
                }
            }
            else {
                chipToFocus.focus();
            }
        }
        else {
            this.focus();
        }
        this._lastDestroyedFocusedChipIndex = null;
    }
}
MatChipSet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatChipSet, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatChipSet.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatChipSet, selector: "mat-chip-set", inputs: { disabled: "disabled", role: "role" }, host: { listeners: { "keydown": "_handleKeydown($event)" }, properties: { "attr.role": "role" }, classAttribute: "mat-mdc-chip-set mdc-evolution-chip-set" }, queries: [{ propertyName: "_chips", predicate: MatChip, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, isInline: true, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatChipSet, decorators: [{
            type: Component,
            args: [{ selector: 'mat-chip-set', template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, host: {
                        'class': 'mat-mdc-chip-set mdc-evolution-chip-set',
                        '(keydown)': '_handleKeydown($event)',
                        '[attr.role]': 'role',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { disabled: [{
                type: Input
            }], role: [{
                type: Input
            }], _chips: [{
                type: ContentChildren,
                args: [MatChip, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY2hpcHMvY2hpcC1zZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixLQUFLLEVBRUwsUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxLQUFLLEVBQWMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxRQUFRLENBQUM7OztBQUc3Qzs7O0dBR0c7QUFDSCxNQUFlLGNBQWM7SUFFM0IsWUFBWSxXQUF1QixJQUFHLENBQUM7Q0FDeEM7QUFDRCxNQUFNLG9CQUFvQixHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUUzRDs7OztHQUlHO0FBaUJILE1BQU0sT0FBTyxVQUNYLFNBQVEsb0JBQW9CO0lBd0U1QixZQUNZLFdBQW9DLEVBQ3BDLGtCQUFxQyxFQUMzQixJQUFvQjtRQUV4QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFKVCxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUMzQixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQXhFMUMsdURBQXVEO1FBQy9DLG1DQUE4QixHQUFrQixJQUFJLENBQUM7UUFLN0QsZ0VBQWdFO1FBQ3RELGVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRTNDLDZEQUE2RDtRQUNuRCxpQkFBWSxHQUFHLGNBQWMsQ0FBQztRQXFCOUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQW9CN0Isa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBZTVDLCtEQUErRDtRQUMvRCxpQkFBWSxHQUFHLElBQUksU0FBUyxFQUFpQixDQUFDO0lBUTlDLENBQUM7SUEvREQsK0RBQStEO0lBQy9ELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsZ0VBQWdFO0lBQ2hFLElBQUksb0JBQW9CO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBbUI7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUdELG1EQUFtRDtJQUNuRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLElBQ0ksSUFBSTtRQUNOLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDM0I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMvQyxDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBb0I7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUdELGtFQUFrRTtJQUNsRSxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBcUJELGVBQWU7UUFDYixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGtEQUFrRDtJQUN4QyxlQUFlO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCw0REFBNEQ7SUFDbEQsZUFBZTtRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxnRkFBZ0Y7SUFDaEYsS0FBSyxLQUFJLENBQUM7SUFFViwrQ0FBK0M7SUFDL0MsY0FBYyxDQUFDLEtBQW9CO1FBQ2pDLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sYUFBYSxDQUFDLEtBQWE7UUFDbkMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLGlCQUFpQjtRQUN6QixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFbkIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDO2dCQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDTyxjQUFjLENBQ3RCLGVBQTJDO1FBRTNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM3QixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQ2YsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFJLElBQUksQ0FBQyxNQUF1QixDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQzlFLENBQUM7SUFDSixDQUFDO0lBRUQsZ0VBQWdFO0lBQ3RELG1CQUFtQixDQUFDLEtBQVk7UUFDeEMsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLE1BQTRCLENBQUM7UUFFeEQsT0FBTyxjQUFjLElBQUksY0FBYyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFO1lBQzFFLGtGQUFrRjtZQUNsRixJQUFJLGNBQWMsQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDdkYsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELGNBQWMsR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQscURBQXFEO0lBQzdDLHFCQUFxQjtRQUMzQix3RUFBd0U7UUFDeEUsZ0ZBQWdGO1FBQ2hGLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtZQUN2RixNQUFNLE9BQU8sR0FBb0IsRUFBRSxDQUFDO1lBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUN0RCx1QkFBdUIsRUFBRTthQUN6Qix5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQzlELGNBQWMsRUFBRTthQUNoQixhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFeEQsaUVBQWlFO1FBQ2pFLHNFQUFzRTtRQUN0RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUU7WUFDMUUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxhQUF3QixDQUFDLENBQUM7WUFFeEUsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNO2FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRDs7O09BR0c7SUFDTyxjQUFjLENBQUMsTUFBcUI7UUFDNUMsa0dBQWtHO1FBQ2xHLFNBQVM7UUFDVCxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xELENBQUM7SUFFRCx5RkFBeUY7SUFDakYsb0JBQW9CO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDbkYsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixnREFBZ0Q7Z0JBQ2hELGlEQUFpRDtnQkFDakQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzthQUN0RDtZQUVELElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELCtFQUErRTtJQUN2RSwwQkFBMEI7UUFDaEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBbUIsRUFBRSxFQUFFO1lBQzNGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEMsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFaEQseUZBQXlGO1lBQ3pGLDZGQUE2RjtZQUM3RiwwRkFBMEY7WUFDMUYsMEVBQTBFO1lBQzFFLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUMzRCxJQUFJLENBQUMsOEJBQThCLEdBQUcsU0FBUyxDQUFDO2FBQ2pEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssMkJBQTJCO1FBQ2pDLElBQUksSUFBSSxDQUFDLDhCQUE4QixJQUFJLElBQUksRUFBRTtZQUMvQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3RCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFcEQsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUN4QixrRUFBa0U7Z0JBQ2xFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2Q7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2lCQUMxQzthQUNGO2lCQUFNO2dCQUNMLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNyQjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtRQUVELElBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUM7SUFDN0MsQ0FBQzs7NEdBbFJVLFVBQVU7Z0dBQVYsVUFBVSx5UkErREosT0FBTyx1RUE3RWQ7Ozs7R0FJVDtnR0FVVSxVQUFVO2tCQWhCdEIsU0FBUzsrQkFDRSxjQUFjLFlBQ2Q7Ozs7R0FJVCxRQUVLO3dCQUNKLE9BQU8sRUFBRSx5Q0FBeUM7d0JBQ2xELFdBQVcsRUFBRSx3QkFBd0I7d0JBQ3JDLGFBQWEsRUFBRSxNQUFNO3FCQUN0QixpQkFDYyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzswQkE4RTVDLFFBQVE7NENBaERQLFFBQVE7c0JBRFgsS0FBSztnQkFpQkYsSUFBSTtzQkFEUCxLQUFLO2dCQXlCTixNQUFNO3NCQUxMLGVBQWU7dUJBQUMsT0FBTyxFQUFFO3dCQUN4Qix1RUFBdUU7d0JBQ3ZFLDhDQUE4Qzt3QkFDOUMsV0FBVyxFQUFFLElBQUk7cUJBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Rm9jdXNLZXlNYW5hZ2VyfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIYXNUYWJJbmRleCwgbWl4aW5UYWJJbmRleH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge21lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRDaGlwLCBNYXRDaGlwRXZlbnR9IGZyb20gJy4vY2hpcCc7XG5pbXBvcnQge01hdENoaXBBY3Rpb259IGZyb20gJy4vY2hpcC1hY3Rpb24nO1xuXG4vKipcbiAqIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcFNldC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuYWJzdHJhY3QgY2xhc3MgTWF0Q2hpcFNldEJhc2Uge1xuICBhYnN0cmFjdCBkaXNhYmxlZDogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5jb25zdCBfTWF0Q2hpcFNldE1peGluQmFzZSA9IG1peGluVGFiSW5kZXgoTWF0Q2hpcFNldEJhc2UpO1xuXG4vKipcbiAqIEJhc2ljIGNvbnRhaW5lciBjb21wb25lbnQgZm9yIHRoZSBNYXRDaGlwIGNvbXBvbmVudC5cbiAqXG4gKiBFeHRlbmRlZCBieSBNYXRDaGlwTGlzdGJveCBhbmQgTWF0Q2hpcEdyaWQgZm9yIGRpZmZlcmVudCBpbnRlcmFjdGlvbiBwYXR0ZXJucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtc2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cIm1kYy1ldm9sdXRpb24tY2hpcC1zZXRfX2NoaXBzXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJ2NoaXAtc2V0LmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2hpcC1zZXQgbWRjLWV2b2x1dGlvbi1jaGlwLXNldCcsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnW2F0dHIucm9sZV0nOiAncm9sZScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwU2V0XG4gIGV4dGVuZHMgX01hdENoaXBTZXRNaXhpbkJhc2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBIYXNUYWJJbmRleCwgT25EZXN0cm95XG57XG4gIC8qKiBJbmRleCBvZiB0aGUgbGFzdCBkZXN0cm95ZWQgY2hpcCB0aGF0IGhhZCBmb2N1cy4gKi9cbiAgcHJpdmF0ZSBfbGFzdERlc3Ryb3llZEZvY3VzZWRDaGlwSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBVc2VkIHRvIG1hbmFnZSBmb2N1cyB3aXRoaW4gdGhlIGNoaXAgbGlzdC4gKi9cbiAgcHJvdGVjdGVkIF9rZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8TWF0Q2hpcEFjdGlvbj47XG5cbiAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICBwcm90ZWN0ZWQgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIFJvbGUgdG8gdXNlIGlmIGl0IGhhc24ndCBiZWVuIG92ZXJ3cml0dGVuIGJ5IHRoZSB1c2VyLiAqL1xuICBwcm90ZWN0ZWQgX2RlZmF1bHRSb2xlID0gJ3ByZXNlbnRhdGlvbic7XG5cbiAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIGNoaXBzJyBmb2N1cyBldmVudHMuICovXG4gIGdldCBjaGlwRm9jdXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWF0Q2hpcEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENoaXBTdHJlYW0oY2hpcCA9PiBjaGlwLl9vbkZvY3VzKTtcbiAgfVxuXG4gIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBjaGlwcycgcmVtb3ZlIGV2ZW50cy4gKi9cbiAgZ2V0IGNoaXBEZXN0cm95ZWRDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWF0Q2hpcEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENoaXBTdHJlYW0oY2hpcCA9PiBjaGlwLmRlc3Ryb3llZCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBzZXQgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fc3luY0NoaXBzU3RhdGUoKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgbGlzdCBjb250YWlucyBjaGlwcyBvciBub3QuICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpcHMubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgLyoqIFRoZSBBUklBIHJvbGUgYXBwbGllZCB0byB0aGUgY2hpcCBzZXQuICovXG4gIEBJbnB1dCgpXG4gIGdldCByb2xlKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICh0aGlzLl9leHBsaWNpdFJvbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9leHBsaWNpdFJvbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZW1wdHkgPyBudWxsIDogdGhpcy5fZGVmYXVsdFJvbGU7XG4gIH1cblxuICBzZXQgcm9sZSh2YWx1ZTogc3RyaW5nIHwgbnVsbCkge1xuICAgIHRoaXMuX2V4cGxpY2l0Um9sZSA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2V4cGxpY2l0Um9sZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFdoZXRoZXIgYW55IG9mIHRoZSBjaGlwcyBpbnNpZGUgb2YgdGhpcyBjaGlwLXNldCBoYXMgZm9jdXMuICovXG4gIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNGb2N1c2VkQ2hpcCgpO1xuICB9XG5cbiAgLyoqIFRoZSBjaGlwcyB0aGF0IGFyZSBwYXJ0IG9mIHRoaXMgY2hpcCBzZXQuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0Q2hpcCwge1xuICAgIC8vIFdlIG5lZWQgdG8gdXNlIGBkZXNjZW5kYW50czogdHJ1ZWAsIGJlY2F1c2UgSXZ5IHdpbGwgbm8gbG9uZ2VyIG1hdGNoXG4gICAgLy8gaW5kaXJlY3QgZGVzY2VuZGFudHMgaWYgaXQncyBsZWZ0IGFzIGZhbHNlLlxuICAgIGRlc2NlbmRhbnRzOiB0cnVlLFxuICB9KVxuICBfY2hpcHM6IFF1ZXJ5TGlzdDxNYXRDaGlwPjtcblxuICAvKiogRmxhdCBsaXN0IG9mIGFsbCB0aGUgYWN0aW9ucyBjb250YWluZWQgd2l0aGluIHRoZSBjaGlwcy4gKi9cbiAgX2NoaXBBY3Rpb25zID0gbmV3IFF1ZXJ5TGlzdDxNYXRDaGlwQWN0aW9uPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX3NldFVwRm9jdXNNYW5hZ2VtZW50KCk7XG4gICAgdGhpcy5fdHJhY2tDaGlwU2V0Q2hhbmdlcygpO1xuICAgIHRoaXMuX3RyYWNrRGVzdHJveWVkRm9jdXNlZENoaXAoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXI/LmRlc3Ryb3koKTtcbiAgICB0aGlzLl9jaGlwQWN0aW9ucy5kZXN0cm95KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgb2YgdGhlIGNoaXBzIGlzIGZvY3VzZWQuICovXG4gIHByb3RlY3RlZCBfaGFzRm9jdXNlZENoaXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaXBzICYmIHRoaXMuX2NoaXBzLnNvbWUoY2hpcCA9PiBjaGlwLl9oYXNGb2N1cygpKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgY2hpcC1zZXQncyBzdGF0ZSB3aXRoIHRoZSBpbmRpdmlkdWFsIGNoaXBzLiAqL1xuICBwcm90ZWN0ZWQgX3N5bmNDaGlwc1N0YXRlKCkge1xuICAgIGlmICh0aGlzLl9jaGlwcykge1xuICAgICAgdGhpcy5fY2hpcHMuZm9yRWFjaChjaGlwID0+IHtcbiAgICAgICAgY2hpcC5kaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkO1xuICAgICAgICBjaGlwLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEdW1teSBtZXRob2QgZm9yIHN1YmNsYXNzZXMgdG8gb3ZlcnJpZGUuIEJhc2UgY2hpcCBzZXQgY2Fubm90IGJlIGZvY3VzZWQuICovXG4gIGZvY3VzKCkge31cblxuICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgb24gdGhlIGNoaXAgc2V0LiAqL1xuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLl9vcmlnaW5hdGVzRnJvbUNoaXAoZXZlbnQpKSB7XG4gICAgICB0aGlzLl9rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgdG8gZW5zdXJlIGFsbCBpbmRleGVzIGFyZSB2YWxpZC5cbiAgICpcbiAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbmRleCBpcyB2YWxpZCBmb3Igb3VyIGxpc3Qgb2YgY2hpcHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2lzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLl9jaGlwcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgYHRhYmluZGV4YCBmcm9tIHRoZSBjaGlwIGdyaWQgYW5kIHJlc2V0cyBpdCBiYWNrIGFmdGVyd2FyZHMsIGFsbG93aW5nIHRoZVxuICAgKiB1c2VyIHRvIHRhYiBvdXQgb2YgaXQuIFRoaXMgcHJldmVudHMgdGhlIGdyaWQgZnJvbSBjYXB0dXJpbmcgZm9jdXMgYW5kIHJlZGlyZWN0aW5nXG4gICAqIGl0IGJhY2sgdG8gdGhlIGZpcnN0IGNoaXAsIGNyZWF0aW5nIGEgZm9jdXMgdHJhcCwgaWYgaXQgdXNlciB0cmllcyB0byB0YWIgYXdheS5cbiAgICovXG4gIHByb3RlY3RlZCBfYWxsb3dGb2N1c0VzY2FwZSgpIHtcbiAgICBjb25zdCBwcmV2aW91c1RhYkluZGV4ID0gdGhpcy50YWJJbmRleDtcblxuICAgIGlmICh0aGlzLnRhYkluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy50YWJJbmRleCA9IC0xO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IHByZXZpb3VzVGFiSW5kZXg7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBzdHJlYW0gb2YgZXZlbnRzIGZyb20gYWxsIHRoZSBjaGlwcyB3aXRoaW4gdGhlIHNldC5cbiAgICogVGhlIHN0cmVhbSB3aWxsIGF1dG9tYXRpY2FsbHkgaW5jb3Jwb3JhdGUgYW55IG5ld2x5LWFkZGVkIGNoaXBzLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRDaGlwU3RyZWFtPFQsIEMgZXh0ZW5kcyBNYXRDaGlwID0gTWF0Q2hpcD4oXG4gICAgbWFwcGluZ0Z1bmN0aW9uOiAoY2hpcDogQykgPT4gT2JzZXJ2YWJsZTxUPixcbiAgKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaXBzLmNoYW5nZXMucGlwZShcbiAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiBtZXJnZSguLi4odGhpcy5fY2hpcHMgYXMgUXVlcnlMaXN0PEM+KS5tYXAobWFwcGluZ0Z1bmN0aW9uKSkpLFxuICAgICk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgYW4gZXZlbnQgY29tZXMgZnJvbSBpbnNpZGUgYSBjaGlwIGVsZW1lbnQuICovXG4gIHByb3RlY3RlZCBfb3JpZ2luYXRlc0Zyb21DaGlwKGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICB3aGlsZSAoY3VycmVudEVsZW1lbnQgJiYgY3VycmVudEVsZW1lbnQgIT09IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgLy8gTnVsbCBjaGVjayB0aGUgY2xhc3NMaXN0LCBiZWNhdXNlIElFIGFuZCBFZGdlIGRvbid0IHN1cHBvcnQgaXQgb24gYWxsIGVsZW1lbnRzLlxuICAgICAgaWYgKGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdCAmJiBjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21kYy1ldm9sdXRpb24tY2hpcCcpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogU2V0cyB1cCB0aGUgY2hpcCBzZXQncyBmb2N1cyBtYW5hZ2VtZW50IGxvZ2ljLiAqL1xuICBwcml2YXRlIF9zZXRVcEZvY3VzTWFuYWdlbWVudCgpIHtcbiAgICAvLyBDcmVhdGUgYSBmbGF0IGBRdWVyeUxpc3RgIGNvbnRhaW5pbmcgdGhlIGFjdGlvbnMgb2YgYWxsIG9mIHRoZSBjaGlwcy5cbiAgICAvLyBUaGlzIGFsbG93cyB1cyB0byBuYXZpZ2F0ZSBib3RoIHdpdGhpbiB0aGUgY2hpcCBhbmQgbW92ZSB0byB0aGUgbmV4dC9wcmV2aW91c1xuICAgIC8vIG9uZSB1c2luZyB0aGUgZXhpc3RpbmcgYExpc3RLZXlNYW5hZ2VyYC5cbiAgICB0aGlzLl9jaGlwcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKHRoaXMuX2NoaXBzKSkuc3Vic2NyaWJlKChjaGlwczogUXVlcnlMaXN0PE1hdENoaXA+KSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb25zOiBNYXRDaGlwQWN0aW9uW10gPSBbXTtcbiAgICAgIGNoaXBzLmZvckVhY2goY2hpcCA9PiBjaGlwLl9nZXRBY3Rpb25zKCkuZm9yRWFjaChhY3Rpb24gPT4gYWN0aW9ucy5wdXNoKGFjdGlvbikpKTtcbiAgICAgIHRoaXMuX2NoaXBBY3Rpb25zLnJlc2V0KGFjdGlvbnMpO1xuICAgICAgdGhpcy5fY2hpcEFjdGlvbnMubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcih0aGlzLl9jaGlwQWN0aW9ucylcbiAgICAgIC53aXRoVmVydGljYWxPcmllbnRhdGlvbigpXG4gICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJylcbiAgICAgIC53aXRoSG9tZUFuZEVuZCgpXG4gICAgICAuc2tpcFByZWRpY2F0ZShhY3Rpb24gPT4gdGhpcy5fc2tpcFByZWRpY2F0ZShhY3Rpb24pKTtcblxuICAgIC8vIEtlZXAgdGhlIG1hbmFnZXIgYWN0aXZlIGluZGV4IGluIHN5bmMgc28gdGhhdCBuYXZpZ2F0aW9uIHBpY2tzXG4gICAgLy8gdXAgZnJvbSB0aGUgY3VycmVudCBjaGlwIGlmIHRoZSB1c2VyIGNsaWNrcyBpbnRvIHRoZSBsaXN0IGRpcmVjdGx5LlxuICAgIHRoaXMuY2hpcEZvY3VzQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKHtjaGlwfSkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uID0gY2hpcC5fZ2V0U291cmNlQWN0aW9uKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgRWxlbWVudCk7XG5cbiAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKGFjdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kaXI/LmNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKGRpcmVjdGlvbiA9PiB0aGlzLl9rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oZGlyZWN0aW9uKSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiBrZXkgbWFuYWdlciBzaG91bGQgYXZvaWQgcHV0dGluZyBhIGdpdmVuIGNoaXAgYWN0aW9uIGluIHRoZSB0YWIgaW5kZXguIFNraXBcbiAgICogbm9uLWludGVyYWN0aXZlIGFuZCBkaXNhYmxlZCBhY3Rpb25zIHNpbmNlIHRoZSB1c2VyIGNhbid0IGRvIGFueXRoaW5nIHdpdGggdGhlbS5cbiAgICovXG4gIHByb3RlY3RlZCBfc2tpcFByZWRpY2F0ZShhY3Rpb246IE1hdENoaXBBY3Rpb24pOiBib29sZWFuIHtcbiAgICAvLyBTa2lwIGNoaXBzIHRoYXQgdGhlIHVzZXIgY2Fubm90IGludGVyYWN0IHdpdGguIGBtYXQtY2hpcC1zZXRgIGRvZXMgbm90IHBlcm1pdCBmb2N1c2luZyBkaXNhYmxlZFxuICAgIC8vIGNoaXBzLlxuICAgIHJldHVybiAhYWN0aW9uLmlzSW50ZXJhY3RpdmUgfHwgYWN0aW9uLmRpc2FibGVkO1xuICB9XG5cbiAgLyoqIExpc3RlbnMgdG8gY2hhbmdlcyBpbiB0aGUgY2hpcCBzZXQgYW5kIHN5bmNzIHVwIHRoZSBzdGF0ZSBvZiB0aGUgaW5kaXZpZHVhbCBjaGlwcy4gKi9cbiAgcHJpdmF0ZSBfdHJhY2tDaGlwU2V0Q2hhbmdlcygpIHtcbiAgICB0aGlzLl9jaGlwcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpLCB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIC8vIFNpbmNlIHRoaXMgaGFwcGVucyBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlblxuICAgICAgICAvLyBjaGVja2VkLCB3ZSBuZWVkIHRvIGRlZmVyIGl0IHRvIHRoZSBuZXh0IHRpY2suXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5fc3luY0NoaXBzU3RhdGUoKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3JlZGlyZWN0RGVzdHJveWVkQ2hpcEZvY3VzKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU3RhcnRzIHRyYWNraW5nIHRoZSBkZXN0cm95ZWQgY2hpcHMgaW4gb3JkZXIgdG8gY2FwdHVyZSB0aGUgZm9jdXNlZCBvbmUuICovXG4gIHByaXZhdGUgX3RyYWNrRGVzdHJveWVkRm9jdXNlZENoaXAoKSB7XG4gICAgdGhpcy5jaGlwRGVzdHJveWVkQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKGV2ZW50OiBNYXRDaGlwRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNoaXBBcnJheSA9IHRoaXMuX2NoaXBzLnRvQXJyYXkoKTtcbiAgICAgIGNvbnN0IGNoaXBJbmRleCA9IGNoaXBBcnJheS5pbmRleE9mKGV2ZW50LmNoaXApO1xuXG4gICAgICAvLyBJZiB0aGUgZm9jdXNlZCBjaGlwIGlzIGRlc3Ryb3llZCwgc2F2ZSBpdHMgaW5kZXggc28gdGhhdCB3ZSBjYW4gbW92ZSBmb2N1cyB0byB0aGUgbmV4dFxuICAgICAgLy8gY2hpcC4gV2Ugb25seSBzYXZlIHRoZSBpbmRleCBoZXJlLCByYXRoZXIgdGhhbiBtb3ZlIHRoZSBmb2N1cyBpbW1lZGlhdGVseSwgYmVjYXVzZSB3ZSB3YW50XG4gICAgICAvLyB0byB3YWl0IHVudGlsIHRoZSBjaGlwIGlzIHJlbW92ZWQgZnJvbSB0aGUgY2hpcCBsaXN0IGJlZm9yZSBmb2N1c2luZyB0aGUgbmV4dCBvbmUuIFRoaXNcbiAgICAgIC8vIGFsbG93cyB1cyB0byBrZWVwIGZvY3VzIG9uIHRoZSBzYW1lIGluZGV4IGlmIHRoZSBjaGlwIGdldHMgc3dhcHBlZCBvdXQuXG4gICAgICBpZiAodGhpcy5faXNWYWxpZEluZGV4KGNoaXBJbmRleCkgJiYgZXZlbnQuY2hpcC5faGFzRm9jdXMoKSkge1xuICAgICAgICB0aGlzLl9sYXN0RGVzdHJveWVkRm9jdXNlZENoaXBJbmRleCA9IGNoaXBJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyB0aGUgbmV4dCBhcHByb3ByaWF0ZSBjaGlwIHRvIG1vdmUgZm9jdXMgdG8sXG4gICAqIGlmIHRoZSBjdXJyZW50bHktZm9jdXNlZCBjaGlwIGlzIGRlc3Ryb3llZC5cbiAgICovXG4gIHByaXZhdGUgX3JlZGlyZWN0RGVzdHJveWVkQ2hpcEZvY3VzKCkge1xuICAgIGlmICh0aGlzLl9sYXN0RGVzdHJveWVkRm9jdXNlZENoaXBJbmRleCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NoaXBzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbmV3SW5kZXggPSBNYXRoLm1pbih0aGlzLl9sYXN0RGVzdHJveWVkRm9jdXNlZENoaXBJbmRleCwgdGhpcy5fY2hpcHMubGVuZ3RoIC0gMSk7XG4gICAgICBjb25zdCBjaGlwVG9Gb2N1cyA9IHRoaXMuX2NoaXBzLnRvQXJyYXkoKVtuZXdJbmRleF07XG5cbiAgICAgIGlmIChjaGlwVG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgICAgICAvLyBJZiB3ZSdyZSBkb3duIHRvIG9uZSBkaXNhYmxlZCBjaGlwLCBtb3ZlIGZvY3VzIGJhY2sgdG8gdGhlIHNldC5cbiAgICAgICAgaWYgKHRoaXMuX2NoaXBzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGlwVG9Gb2N1cy5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbGFzdERlc3Ryb3llZEZvY3VzZWRDaGlwSW5kZXggPSBudWxsO1xuICB9XG59XG4iXX0=