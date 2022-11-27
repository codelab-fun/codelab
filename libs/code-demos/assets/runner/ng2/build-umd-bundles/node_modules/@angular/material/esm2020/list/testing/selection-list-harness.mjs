/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatListHarnessBase } from './list-harness-base';
import { getListItemPredicate, MatListItemHarnessBase } from './list-item-harness-base';
/** Harness for interacting with a MDC_based selection-list in tests. */
export class MatSelectionListHarness extends MatListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatListOptionHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a selection list with specific
     * attributes.
     * @param options Options for filtering which selection list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
    /** Whether the selection list is disabled. */
    async isDisabled() {
        return (await (await this.host()).getAttribute('aria-disabled')) === 'true';
    }
    /**
     * Selects all items matching any of the given filters.
     * @param filters Filters that specify which items should be selected.
     */
    async selectItems(...filters) {
        const items = await this._getItems(filters);
        await parallel(() => items.map(item => item.select()));
    }
    /**
     * Deselects all items matching any of the given filters.
     * @param filters Filters that specify which items should be deselected.
     */
    async deselectItems(...filters) {
        const items = await this._getItems(filters);
        await parallel(() => items.map(item => item.deselect()));
    }
    /** Gets all items matching the given list of filters. */
    async _getItems(filters) {
        if (!filters.length) {
            return this.getItems();
        }
        const matches = await parallel(() => filters.map(filter => this.locatorForAll(MatListOptionHarness.with(filter))()));
        return matches.reduce((result, current) => [...result, ...current], []);
    }
}
/** The selector for the host element of a `MatSelectionList` instance. */
MatSelectionListHarness.hostSelector = '.mat-mdc-selection-list';
/** Harness for interacting with a MDC-based list option. */
export class MatListOptionHarness extends MatListItemHarnessBase {
    constructor() {
        super(...arguments);
        this._beforeCheckbox = this.locatorForOptional('.mdc-list-item__start .mdc-checkbox');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a list option with specific
     * attributes.
     * @param options Options for filtering which list option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(this, options).addOption('is selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected);
    }
    /** Gets the position of the checkbox relative to the list option content. */
    async getCheckboxPosition() {
        return (await this._beforeCheckbox()) !== null ? 'before' : 'after';
    }
    /** Whether the list option is selected. */
    async isSelected() {
        return (await (await this.host()).getAttribute('aria-selected')) === 'true';
    }
    /** Focuses the list option. */
    async focus() {
        return (await this.host()).focus();
    }
    /** Blurs the list option. */
    async blur() {
        return (await this.host()).blur();
    }
    /** Whether the list option is focused. */
    async isFocused() {
        return (await this.host()).isFocused();
    }
    /** Toggles the checked state of the checkbox. */
    async toggle() {
        return (await this.host()).click();
    }
    /**
     * Puts the list option in a checked state by toggling it if it is currently
     * unchecked, or doing nothing if it is already checked.
     */
    async select() {
        if (!(await this.isSelected())) {
            return this.toggle();
        }
    }
    /**
     * Puts the list option in an unchecked state by toggling it if it is currently
     * checked, or doing nothing if it is already unchecked.
     */
    async deselect() {
        if (await this.isSelected()) {
            return this.toggle();
        }
    }
}
/** The selector for the host element of a `MatListOption` instance. */
MatListOptionHarness.hostSelector = '.mat-mdc-list-option';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWxpc3QtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9saXN0L3Rlc3Rpbmcvc2VsZWN0aW9uLWxpc3QtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQThCLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTdGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBTXZELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRXRGLHdFQUF3RTtBQUN4RSxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsa0JBSTVDO0lBSkQ7O1FBcUJXLGlCQUFZLEdBQUcsb0JBQW9CLENBQUM7SUFtQy9DLENBQUM7SUFoREM7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUVULFVBQXVDLEVBQUU7UUFFekMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBSUQsOENBQThDO0lBQzlDLEtBQUssQ0FBQyxVQUFVO1FBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQztJQUM5RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQW1DO1FBQ3RELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0s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QUFLLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE1BQU07UUFDVixJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxRQUFRO1FBQ1osSUFBSSxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7O0FBdEVELHVFQUF1RTtBQUNoRSxpQ0FBWSxHQUFHLHNCQUFzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLCBIYXJuZXNzUHJlZGljYXRlLCBwYXJhbGxlbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRMaXN0T3B0aW9uQ2hlY2tib3hQb3NpdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQge01hdExpc3RIYXJuZXNzQmFzZX0gZnJvbSAnLi9saXN0LWhhcm5lc3MtYmFzZSc7XG5pbXBvcnQge1xuICBMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzLFxuICBMaXN0T3B0aW9uSGFybmVzc0ZpbHRlcnMsXG4gIFNlbGVjdGlvbkxpc3RIYXJuZXNzRmlsdGVycyxcbn0gZnJvbSAnLi9saXN0LWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge2dldExpc3RJdGVtUHJlZGljYXRlLCBNYXRMaXN0SXRlbUhhcm5lc3NCYXNlfSBmcm9tICcuL2xpc3QtaXRlbS1oYXJuZXNzLWJhc2UnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIE1EQ19iYXNlZCBzZWxlY3Rpb24tbGlzdCBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3Rpb25MaXN0SGFybmVzcyBleHRlbmRzIE1hdExpc3RIYXJuZXNzQmFzZTxcbiAgdHlwZW9mIE1hdExpc3RPcHRpb25IYXJuZXNzLFxuICBNYXRMaXN0T3B0aW9uSGFybmVzcyxcbiAgTGlzdE9wdGlvbkhhcm5lc3NGaWx0ZXJzXG4+IHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRTZWxlY3Rpb25MaXN0YCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1zZWxlY3Rpb24tbGlzdCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgc2VsZWN0aW9uIGxpc3Qgd2l0aCBzcGVjaWZpY1xuICAgKiBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggc2VsZWN0aW9uIGxpc3QgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIE1hdFNlbGVjdGlvbkxpc3RIYXJuZXNzPihcbiAgICB0aGlzOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4sXG4gICAgb3B0aW9uczogU2VsZWN0aW9uTGlzdEhhcm5lc3NGaWx0ZXJzID0ge30sXG4gICk6IEhhcm5lc3NQcmVkaWNhdGU8VD4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIG92ZXJyaWRlIF9pdGVtSGFybmVzcyA9IE1hdExpc3RPcHRpb25IYXJuZXNzO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3Rpb24gbGlzdCBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJykpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhbGwgaXRlbXMgbWF0Y2hpbmcgYW55IG9mIHRoZSBnaXZlbiBmaWx0ZXJzLlxuICAgKiBAcGFyYW0gZmlsdGVycyBGaWx0ZXJzIHRoYXQgc3BlY2lmeSB3aGljaCBpdGVtcyBzaG91bGQgYmUgc2VsZWN0ZWQuXG4gICAqL1xuICBhc3luYyBzZWxlY3RJdGVtcyguLi5maWx0ZXJzOiBMaXN0T3B0aW9uSGFybmVzc0ZpbHRlcnNbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgdGhpcy5fZ2V0SXRlbXMoZmlsdGVycyk7XG4gICAgYXdhaXQgcGFyYWxsZWwoKCkgPT4gaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5zZWxlY3QoKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbGwgaXRlbXMgbWF0Y2hpbmcgYW55IG9mIHRoZSBnaXZlbiBmaWx0ZXJzLlxuICAgKiBAcGFyYW0gZmlsdGVycyBGaWx0ZXJzIHRoYXQgc3BlY2lmeSB3aGljaCBpdGVtcyBzaG91bGQgYmUgZGVzZWxlY3RlZC5cbiAgICovXG4gIGFzeW5jIGRlc2VsZWN0SXRlbXMoLi4uZmlsdGVyczogTGlzdEl0ZW1IYXJuZXNzRmlsdGVyc1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLl9nZXRJdGVtcyhmaWx0ZXJzKTtcbiAgICBhd2FpdCBwYXJhbGxlbCgoKSA9PiBpdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmRlc2VsZWN0KCkpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGFsbCBpdGVtcyBtYXRjaGluZyB0aGUgZ2l2ZW4gbGlzdCBvZiBmaWx0ZXJzLiAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXRJdGVtcyhmaWx0ZXJzOiBMaXN0T3B0aW9uSGFybmVzc0ZpbHRlcnNbXSk6IFByb21pc2U8TWF0TGlzdE9wdGlvbkhhcm5lc3NbXT4ge1xuICAgIGlmICghZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKCk7XG4gICAgfVxuICAgIGNvbnN0IG1hdGNoZXMgPSBhd2FpdCBwYXJhbGxlbCgoKSA9PlxuICAgICAgZmlsdGVycy5tYXAoZmlsdGVyID0+IHRoaXMubG9jYXRvckZvckFsbChNYXRMaXN0T3B0aW9uSGFybmVzcy53aXRoKGZpbHRlcikpKCkpLFxuICAgICk7XG4gICAgcmV0dXJuIG1hdGNoZXMucmVkdWNlKChyZXN1bHQsIGN1cnJlbnQpID0+IFsuLi5yZXN1bHQsIC4uLmN1cnJlbnRdLCBbXSk7XG4gIH1cbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBNREMtYmFzZWQgbGlzdCBvcHRpb24uICovXG5leHBvcnQgY2xhc3MgTWF0TGlzdE9wdGlvbkhhcm5lc3MgZXh0ZW5kcyBNYXRMaXN0SXRlbUhhcm5lc3NCYXNlIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRMaXN0T3B0aW9uYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1saXN0LW9wdGlvbic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgbGlzdCBvcHRpb24gd2l0aCBzcGVjaWZpY1xuICAgKiBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggbGlzdCBvcHRpb24gaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIE1hdExpc3RPcHRpb25IYXJuZXNzPihcbiAgICB0aGlzOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4sXG4gICAgb3B0aW9uczogTGlzdE9wdGlvbkhhcm5lc3NGaWx0ZXJzID0ge30sXG4gICk6IEhhcm5lc3NQcmVkaWNhdGU8VD4ge1xuICAgIHJldHVybiBnZXRMaXN0SXRlbVByZWRpY2F0ZSh0aGlzLCBvcHRpb25zKS5hZGRPcHRpb24oXG4gICAgICAnaXMgc2VsZWN0ZWQnLFxuICAgICAgb3B0aW9ucy5zZWxlY3RlZCxcbiAgICAgIGFzeW5jIChoYXJuZXNzLCBzZWxlY3RlZCkgPT4gKGF3YWl0IGhhcm5lc3MuaXNTZWxlY3RlZCgpKSA9PT0gc2VsZWN0ZWQsXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2JlZm9yZUNoZWNrYm94ID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tZGMtbGlzdC1pdGVtX19zdGFydCAubWRjLWNoZWNrYm94Jyk7XG5cbiAgLyoqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjaGVja2JveCByZWxhdGl2ZSB0byB0aGUgbGlzdCBvcHRpb24gY29udGVudC4gKi9cbiAgYXN5bmMgZ2V0Q2hlY2tib3hQb3NpdGlvbigpOiBQcm9taXNlPE1hdExpc3RPcHRpb25DaGVja2JveFBvc2l0aW9uPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9iZWZvcmVDaGVja2JveCgpKSAhPT0gbnVsbCA/ICdiZWZvcmUnIDogJ2FmdGVyJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0IG9wdGlvbiBpcyBzZWxlY3RlZC4gKi9cbiAgYXN5bmMgaXNTZWxlY3RlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgbGlzdCBvcHRpb24uICovXG4gIGFzeW5jIGZvY3VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmZvY3VzKCk7XG4gIH1cblxuICAvKiogQmx1cnMgdGhlIGxpc3Qgb3B0aW9uLiAqL1xuICBhc3luYyBibHVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0IG9wdGlvbiBpcyBmb2N1c2VkLiAqL1xuICBhc3luYyBpc0ZvY3VzZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaXNGb2N1c2VkKCk7XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgY2hlY2tlZCBzdGF0ZSBvZiB0aGUgY2hlY2tib3guICovXG4gIGFzeW5jIHRvZ2dsZSgpIHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5jbGljaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1dHMgdGhlIGxpc3Qgb3B0aW9uIGluIGEgY2hlY2tlZCBzdGF0ZSBieSB0b2dnbGluZyBpdCBpZiBpdCBpcyBjdXJyZW50bHlcbiAgICogdW5jaGVja2VkLCBvciBkb2luZyBub3RoaW5nIGlmIGl0IGlzIGFscmVhZHkgY2hlY2tlZC5cbiAgICovXG4gIGFzeW5jIHNlbGVjdCgpIHtcbiAgICBpZiAoIShhd2FpdCB0aGlzLmlzU2VsZWN0ZWQoKSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXRzIHRoZSBsaXN0IG9wdGlvbiBpbiBhbiB1bmNoZWNrZWQgc3RhdGUgYnkgdG9nZ2xpbmcgaXQgaWYgaXQgaXMgY3VycmVudGx5XG4gICAqIGNoZWNrZWQsIG9yIGRvaW5nIG5vdGhpbmcgaWYgaXQgaXMgYWxyZWFkeSB1bmNoZWNrZWQuXG4gICAqL1xuICBhc3luYyBkZXNlbGVjdCgpIHtcbiAgICBpZiAoYXdhaXQgdGhpcy5pc1NlbGVjdGVkKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxufVxuIl19