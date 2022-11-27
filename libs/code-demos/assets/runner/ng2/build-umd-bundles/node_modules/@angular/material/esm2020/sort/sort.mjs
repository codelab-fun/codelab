/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, EventEmitter, Inject, InjectionToken, Input, Optional, Output, } from '@angular/core';
import { mixinDisabled, mixinInitialized } from '@angular/material/core';
import { Subject } from 'rxjs';
import { getSortDuplicateSortableIdError, getSortHeaderMissingIdError, getSortInvalidDirectionError, } from './sort-errors';
import * as i0 from "@angular/core";
/** Injection token to be used to override the default options for `mat-sort`. */
export const MAT_SORT_DEFAULT_OPTIONS = new InjectionToken('MAT_SORT_DEFAULT_OPTIONS');
// Boilerplate for applying mixins to MatSort.
/** @docs-private */
const _MatSortBase = mixinInitialized(mixinDisabled(class {
}));
/** Container for MatSortables to manage the sort state and provide default sort parameters. */
export class MatSort extends _MatSortBase {
    constructor(_defaultOptions) {
        super();
        this._defaultOptions = _defaultOptions;
        /** Collection of all registered sortables that this directive manages. */
        this.sortables = new Map();
        /** Used to notify any child components listening to state changes. */
        this._stateChanges = new Subject();
        /**
         * The direction to set when an MatSortable is initially sorted.
         * May be overridden by the MatSortable's sort start.
         */
        this.start = 'asc';
        this._direction = '';
        /** Event emitted when the user changes either the active sort or sort direction. */
        this.sortChange = new EventEmitter();
    }
    /** The sort direction of the currently active MatSortable. */
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        if (direction &&
            direction !== 'asc' &&
            direction !== 'desc' &&
            (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getSortInvalidDirectionError(direction);
        }
        this._direction = direction;
    }
    /**
     * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
     * May be overridden by the MatSortable's disable clear input.
     */
    get disableClear() {
        return this._disableClear;
    }
    set disableClear(v) {
        this._disableClear = coerceBooleanProperty(v);
    }
    /**
     * Register function to be used by the contained MatSortables. Adds the MatSortable to the
     * collection of MatSortables.
     */
    register(sortable) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!sortable.id) {
                throw getSortHeaderMissingIdError();
            }
            if (this.sortables.has(sortable.id)) {
                throw getSortDuplicateSortableIdError(sortable.id);
            }
        }
        this.sortables.set(sortable.id, sortable);
    }
    /**
     * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
     * collection of contained MatSortables.
     */
    deregister(sortable) {
        this.sortables.delete(sortable.id);
    }
    /** Sets the active sort id and determines the new sort direction. */
    sort(sortable) {
        if (this.active != sortable.id) {
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
        }
        else {
            this.direction = this.getNextSortDirection(sortable);
        }
        this.sortChange.emit({ active: this.active, direction: this.direction });
    }
    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    getNextSortDirection(sortable) {
        if (!sortable) {
            return '';
        }
        // Get the sort direction cycle with the potential sortable overrides.
        const disableClear = sortable?.disableClear ?? this.disableClear ?? !!this._defaultOptions?.disableClear;
        let sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);
        // Get and return the next direction in the cycle
        let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    }
    ngOnInit() {
        this._markInitialized();
    }
    ngOnChanges() {
        this._stateChanges.next();
    }
    ngOnDestroy() {
        this._stateChanges.complete();
    }
}
MatSort.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSort, deps: [{ token: MAT_SORT_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatSort.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatSort, selector: "[matSort]", inputs: { disabled: ["matSortDisabled", "disabled"], active: ["matSortActive", "active"], start: ["matSortStart", "start"], direction: ["matSortDirection", "direction"], disableClear: ["matSortDisableClear", "disableClear"] }, outputs: { sortChange: "matSortChange" }, host: { classAttribute: "mat-sort" }, exportAs: ["matSort"], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSort, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSort]',
                    exportAs: 'matSort',
                    host: { 'class': 'mat-sort' },
                    inputs: ['disabled: matSortDisabled'],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_SORT_DEFAULT_OPTIONS]
                }] }]; }, propDecorators: { active: [{
                type: Input,
                args: ['matSortActive']
            }], start: [{
                type: Input,
                args: ['matSortStart']
            }], direction: [{
                type: Input,
                args: ['matSortDirection']
            }], disableClear: [{
                type: Input,
                args: ['matSortDisableClear']
            }], sortChange: [{
                type: Output,
                args: ['matSortChange']
            }] } });
/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start, disableClear) {
    let sortOrder = ['asc', 'desc'];
    if (start == 'desc') {
        sortOrder.reverse();
    }
    if (!disableClear) {
        sortOrder.push('');
    }
    return sortOrder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zb3J0L3NvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQTZCLGFBQWEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25HLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUNMLCtCQUErQixFQUMvQiwyQkFBMkIsRUFDM0IsNEJBQTRCLEdBQzdCLE1BQU0sZUFBZSxDQUFDOztBQWtDdkIsaUZBQWlGO0FBQ2pGLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLElBQUksY0FBYyxDQUN4RCwwQkFBMEIsQ0FDM0IsQ0FBQztBQUVGLDhDQUE4QztBQUM5QyxvQkFBb0I7QUFDcEIsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0NBQVEsQ0FBQyxDQUFDLENBQUM7QUFFL0QsK0ZBQStGO0FBTy9GLE1BQU0sT0FBTyxPQUNYLFNBQVEsWUFBWTtJQW9EcEIsWUFHVSxlQUF1QztRQUUvQyxLQUFLLEVBQUUsQ0FBQztRQUZBLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQXBEakQsMEVBQTBFO1FBQzFFLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBdUIsQ0FBQztRQUUzQyxzRUFBc0U7UUFDN0Qsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBSzdDOzs7V0FHRztRQUNvQixVQUFLLEdBQWtCLEtBQUssQ0FBQztRQWtCNUMsZUFBVSxHQUFrQixFQUFFLENB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WUFBWSxFQUFFO1FBQ2pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDcEI7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYW5EaXNhYmxlLCBIYXNJbml0aWFsaXplZCwgbWl4aW5EaXNhYmxlZCwgbWl4aW5Jbml0aWFsaXplZH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtTb3J0RGlyZWN0aW9ufSBmcm9tICcuL3NvcnQtZGlyZWN0aW9uJztcbmltcG9ydCB7XG4gIGdldFNvcnREdXBsaWNhdGVTb3J0YWJsZUlkRXJyb3IsXG4gIGdldFNvcnRIZWFkZXJNaXNzaW5nSWRFcnJvcixcbiAgZ2V0U29ydEludmFsaWREaXJlY3Rpb25FcnJvcixcbn0gZnJvbSAnLi9zb3J0LWVycm9ycyc7XG5cbi8qKiBQb3NpdGlvbiBvZiB0aGUgYXJyb3cgdGhhdCBkaXNwbGF5cyB3aGVuIHNvcnRlZC4gKi9cbmV4cG9ydCB0eXBlIFNvcnRIZWFkZXJBcnJvd1Bvc2l0aW9uID0gJ2JlZm9yZScgfCAnYWZ0ZXInO1xuXG4vKiogSW50ZXJmYWNlIGZvciBhIGRpcmVjdGl2ZSB0aGF0IGhvbGRzIHNvcnRpbmcgc3RhdGUgY29uc3VtZWQgYnkgYE1hdFNvcnRIZWFkZXJgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRTb3J0YWJsZSB7XG4gIC8qKiBUaGUgaWQgb2YgdGhlIGNvbHVtbiBiZWluZyBzb3J0ZWQuICovXG4gIGlkOiBzdHJpbmc7XG5cbiAgLyoqIFN0YXJ0aW5nIHNvcnQgZGlyZWN0aW9uLiAqL1xuICBzdGFydDogU29ydERpcmVjdGlvbjtcblxuICAvKiogV2hldGhlciB0byBkaXNhYmxlIGNsZWFyaW5nIHRoZSBzb3J0aW5nIHN0YXRlLiAqL1xuICBkaXNhYmxlQ2xlYXI6IGJvb2xlYW47XG59XG5cbi8qKiBUaGUgY3VycmVudCBzb3J0IHN0YXRlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBTb3J0IHtcbiAgLyoqIFRoZSBpZCBvZiB0aGUgY29sdW1uIGJlaW5nIHNvcnRlZC4gKi9cbiAgYWN0aXZlOiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBzb3J0IGRpcmVjdGlvbi4gKi9cbiAgZGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uO1xufVxuXG4vKiogRGVmYXVsdCBvcHRpb25zIGZvciBgbWF0LXNvcnRgLiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0U29ydERlZmF1bHRPcHRpb25zIHtcbiAgLyoqIFdoZXRoZXIgdG8gZGlzYWJsZSBjbGVhcmluZyB0aGUgc29ydGluZyBzdGF0ZS4gKi9cbiAgZGlzYWJsZUNsZWFyPzogYm9vbGVhbjtcbiAgLyoqIFBvc2l0aW9uIG9mIHRoZSBhcnJvdyB0aGF0IGRpc3BsYXlzIHdoZW4gc29ydGVkLiAqL1xuICBhcnJvd1Bvc2l0aW9uPzogU29ydEhlYWRlckFycm93UG9zaXRpb247XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdG8gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBgbWF0LXNvcnRgLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9TT1JUX0RFRkFVTFRfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRTb3J0RGVmYXVsdE9wdGlvbnM+KFxuICAnTUFUX1NPUlRfREVGQVVMVF9PUFRJT05TJyxcbik7XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0U29ydC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jb25zdCBfTWF0U29ydEJhc2UgPSBtaXhpbkluaXRpYWxpemVkKG1peGluRGlzYWJsZWQoY2xhc3Mge30pKTtcblxuLyoqIENvbnRhaW5lciBmb3IgTWF0U29ydGFibGVzIHRvIG1hbmFnZSB0aGUgc29ydCBzdGF0ZSBhbmQgcHJvdmlkZSBkZWZhdWx0IHNvcnQgcGFyYW1ldGVycy4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRTb3J0XScsXG4gIGV4cG9ydEFzOiAnbWF0U29ydCcsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LXNvcnQnfSxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkOiBtYXRTb3J0RGlzYWJsZWQnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U29ydFxuICBleHRlbmRzIF9NYXRTb3J0QmFzZVxuICBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEhhc0luaXRpYWxpemVkLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0XG57XG4gIC8qKiBDb2xsZWN0aW9uIG9mIGFsbCByZWdpc3RlcmVkIHNvcnRhYmxlcyB0aGF0IHRoaXMgZGlyZWN0aXZlIG1hbmFnZXMuICovXG4gIHNvcnRhYmxlcyA9IG5ldyBNYXA8c3RyaW5nLCBNYXRTb3J0YWJsZT4oKTtcblxuICAvKiogVXNlZCB0byBub3RpZnkgYW55IGNoaWxkIGNvbXBvbmVudHMgbGlzdGVuaW5nIHRvIHN0YXRlIGNoYW5nZXMuICovXG4gIHJlYWRvbmx5IF9zdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKiBUaGUgaWQgb2YgdGhlIG1vc3QgcmVjZW50bHkgc29ydGVkIE1hdFNvcnRhYmxlLiAqL1xuICBASW5wdXQoJ21hdFNvcnRBY3RpdmUnKSBhY3RpdmU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGRpcmVjdGlvbiB0byBzZXQgd2hlbiBhbiBNYXRTb3J0YWJsZSBpcyBpbml0aWFsbHkgc29ydGVkLlxuICAgKiBNYXkgYmUgb3ZlcnJpZGRlbiBieSB0aGUgTWF0U29ydGFibGUncyBzb3J0IHN0YXJ0LlxuICAgKi9cbiAgQElucHV0KCdtYXRTb3J0U3RhcnQnKSBzdGFydDogU29ydERpcmVjdGlvbiA9ICdhc2MnO1xuXG4gIC8qKiBUaGUgc29ydCBkaXJlY3Rpb24gb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgTWF0U29ydGFibGUuICovXG4gIEBJbnB1dCgnbWF0U29ydERpcmVjdGlvbicpXG4gIGdldCBkaXJlY3Rpb24oKTogU29ydERpcmVjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgfVxuICBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogU29ydERpcmVjdGlvbikge1xuICAgIGlmIChcbiAgICAgIGRpcmVjdGlvbiAmJlxuICAgICAgZGlyZWN0aW9uICE9PSAnYXNjJyAmJlxuICAgICAgZGlyZWN0aW9uICE9PSAnZGVzYycgJiZcbiAgICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpXG4gICAgKSB7XG4gICAgICB0aHJvdyBnZXRTb3J0SW52YWxpZERpcmVjdGlvbkVycm9yKGRpcmVjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxuICBwcml2YXRlIF9kaXJlY3Rpb246IFNvcnREaXJlY3Rpb24gPSAnJztcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNhYmxlIHRoZSB1c2VyIGZyb20gY2xlYXJpbmcgdGhlIHNvcnQgYnkgZmluaXNoaW5nIHRoZSBzb3J0IGRpcmVjdGlvbiBjeWNsZS5cbiAgICogTWF5IGJlIG92ZXJyaWRkZW4gYnkgdGhlIE1hdFNvcnRhYmxlJ3MgZGlzYWJsZSBjbGVhciBpbnB1dC5cbiAgICovXG4gIEBJbnB1dCgnbWF0U29ydERpc2FibGVDbGVhcicpXG4gIGdldCBkaXNhYmxlQ2xlYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVDbGVhcjtcbiAgfVxuICBzZXQgZGlzYWJsZUNsZWFyKHY6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2Rpc2FibGVDbGVhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlQ2xlYXI6IGJvb2xlYW47XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjaGFuZ2VzIGVpdGhlciB0aGUgYWN0aXZlIHNvcnQgb3Igc29ydCBkaXJlY3Rpb24uICovXG4gIEBPdXRwdXQoJ21hdFNvcnRDaGFuZ2UnKSByZWFkb25seSBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNvcnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE1BVF9TT1JUX0RFRkFVTFRfT1BUSU9OUylcbiAgICBwcml2YXRlIF9kZWZhdWx0T3B0aW9ucz86IE1hdFNvcnREZWZhdWx0T3B0aW9ucyxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBmdW5jdGlvbiB0byBiZSB1c2VkIGJ5IHRoZSBjb250YWluZWQgTWF0U29ydGFibGVzLiBBZGRzIHRoZSBNYXRTb3J0YWJsZSB0byB0aGVcbiAgICogY29sbGVjdGlvbiBvZiBNYXRTb3J0YWJsZXMuXG4gICAqL1xuICByZWdpc3Rlcihzb3J0YWJsZTogTWF0U29ydGFibGUpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICBpZiAoIXNvcnRhYmxlLmlkKSB7XG4gICAgICAgIHRocm93IGdldFNvcnRIZWFkZXJNaXNzaW5nSWRFcnJvcigpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zb3J0YWJsZXMuaGFzKHNvcnRhYmxlLmlkKSkge1xuICAgICAgICB0aHJvdyBnZXRTb3J0RHVwbGljYXRlU29ydGFibGVJZEVycm9yKHNvcnRhYmxlLmlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNvcnRhYmxlcy5zZXQoc29ydGFibGUuaWQsIHNvcnRhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVyIGZ1bmN0aW9uIHRvIGJlIHVzZWQgYnkgdGhlIGNvbnRhaW5lZCBNYXRTb3J0YWJsZXMuIFJlbW92ZXMgdGhlIE1hdFNvcnRhYmxlIGZyb20gdGhlXG4gICAqIGNvbGxlY3Rpb24gb2YgY29udGFpbmVkIE1hdFNvcnRhYmxlcy5cbiAgICovXG4gIGRlcmVnaXN0ZXIoc29ydGFibGU6IE1hdFNvcnRhYmxlKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0YWJsZXMuZGVsZXRlKHNvcnRhYmxlLmlkKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBhY3RpdmUgc29ydCBpZCBhbmQgZGV0ZXJtaW5lcyB0aGUgbmV3IHNvcnQgZGlyZWN0aW9uLiAqL1xuICBzb3J0KHNvcnRhYmxlOiBNYXRTb3J0YWJsZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2ZSAhPSBzb3J0YWJsZS5pZCkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBzb3J0YWJsZS5pZDtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gc29ydGFibGUuc3RhcnQgPyBzb3J0YWJsZS5zdGFydCA6IHRoaXMuc3RhcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5nZXROZXh0U29ydERpcmVjdGlvbihzb3J0YWJsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zb3J0Q2hhbmdlLmVtaXQoe2FjdGl2ZTogdGhpcy5hY3RpdmUsIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb259KTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBuZXh0IHNvcnQgZGlyZWN0aW9uIG9mIHRoZSBhY3RpdmUgc29ydGFibGUsIGNoZWNraW5nIGZvciBwb3RlbnRpYWwgb3ZlcnJpZGVzLiAqL1xuICBnZXROZXh0U29ydERpcmVjdGlvbihzb3J0YWJsZTogTWF0U29ydGFibGUpOiBTb3J0RGlyZWN0aW9uIHtcbiAgICBpZiAoIXNvcnRhYmxlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBzb3J0IGRpcmVjdGlvbiBjeWNsZSB3aXRoIHRoZSBwb3RlbnRpYWwgc29ydGFibGUgb3ZlcnJpZGVzLlxuICAgIGNvbnN0IGRpc2FibGVDbGVhciA9XG4gICAgICBzb3J0YWJsZT8uZGlzYWJsZUNsZWFyID8/IHRoaXMuZGlzYWJsZUNsZWFyID8/ICEhdGhpcy5fZGVmYXVsdE9wdGlvbnM/LmRpc2FibGVDbGVhcjtcbiAgICBsZXQgc29ydERpcmVjdGlvbkN5Y2xlID0gZ2V0U29ydERpcmVjdGlvbkN5Y2xlKHNvcnRhYmxlLnN0YXJ0IHx8IHRoaXMuc3RhcnQsIGRpc2FibGVDbGVhcik7XG5cbiAgICAvLyBHZXQgYW5kIHJldHVybiB0aGUgbmV4dCBkaXJlY3Rpb24gaW4gdGhlIGN5Y2xlXG4gICAgbGV0IG5leHREaXJlY3Rpb25JbmRleCA9IHNvcnREaXJlY3Rpb25DeWNsZS5pbmRleE9mKHRoaXMuZGlyZWN0aW9uKSArIDE7XG4gICAgaWYgKG5leHREaXJlY3Rpb25JbmRleCA+PSBzb3J0RGlyZWN0aW9uQ3ljbGUubGVuZ3RoKSB7XG4gICAgICBuZXh0RGlyZWN0aW9uSW5kZXggPSAwO1xuICAgIH1cbiAgICByZXR1cm4gc29ydERpcmVjdGlvbkN5Y2xlW25leHREaXJlY3Rpb25JbmRleF07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9tYXJrSW5pdGlhbGl6ZWQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgfVxufVxuXG4vKiogUmV0dXJucyB0aGUgc29ydCBkaXJlY3Rpb24gY3ljbGUgdG8gdXNlIGdpdmVuIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzIG9mIG9yZGVyIGFuZCBjbGVhci4gKi9cbmZ1bmN0aW9uIGdldFNvcnREaXJlY3Rpb25DeWNsZShzdGFydDogU29ydERpcmVjdGlvbiwgZGlzYWJsZUNsZWFyOiBib29sZWFuKTogU29ydERpcmVjdGlvbltdIHtcbiAgbGV0IHNvcnRPcmRlcjogU29ydERpcmVjdGlvbltdID0gWydhc2MnLCAnZGVzYyddO1xuICBpZiAoc3RhcnQgPT0gJ2Rlc2MnKSB7XG4gICAgc29ydE9yZGVyLnJldmVyc2UoKTtcbiAgfVxuICBpZiAoIWRpc2FibGVDbGVhcikge1xuICAgIHNvcnRPcmRlci5wdXNoKCcnKTtcbiAgfVxuXG4gIHJldHVybiBzb3J0T3JkZXI7XG59XG4iXX0=