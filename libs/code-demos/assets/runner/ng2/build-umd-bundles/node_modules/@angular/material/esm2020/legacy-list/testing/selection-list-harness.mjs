/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatLegacyListHarnessBase } from './list-harness-base';
import { getListItemPredicate, MatLegacyListItemHarnessBase } from './list-item-harness-base';
/**
 * Harness for interacting with a standard mat-selection-list in tests.
 * @deprecated Use `MatSelectionListHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacySelectionListHarness extends MatLegacyListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatLegacyListOptionHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSelectionListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which selection list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacySelectionListHarness, options);
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
        const matches = await parallel(() => {
            return filters.map(filter => this.locatorForAll(MatLegacyListOptionHarness.with(filter))());
        });
        return matches.reduce((result, current) => [...result, ...current], []);
    }
}
/** The selector for the host element of a `MatSelectionList` instance. */
MatLegacySelectionListHarness.hostSelector = '.mat-selection-list';
/**
 * Harness for interacting with a list option.
 * @deprecated Use `MatListOptionHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyListOptionHarness extends MatLegacyListItemHarnessBase {
    constructor() {
        super(...arguments);
        this._itemContent = this.locatorFor('.mat-list-item-content');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatListOptionHarness` that
     * meets certain criteria.
     * @param options Options for filtering which list option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(MatLegacyListOptionHarness, options).addOption('is selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected);
    }
    /** Gets the position of the checkbox relative to the list option content. */
    async getCheckboxPosition() {
        return (await (await this._itemContent()).hasClass('mat-list-item-content-reverse'))
            ? 'after'
            : 'before';
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
     * Puts the list option in a checked state by toggling it if it is currently unchecked, or doing
     * nothing if it is already checked.
     */
    async select() {
        if (!(await this.isSelected())) {
            return this.toggle();
        }
    }
    /**
     * Puts the list option in an unchecked state by toggling it if it is currently checked, or doing
     * nothing if it is already unchecked.
     */
    async deselect() {
        if (await this.isSelected()) {
            return this.toggle();
        }
    }
}
/** The selector for the host element of a `MatListOption` instance. */
MatLegacyListOptionHarness.hostSelector = '.mat-list-option';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWxpc3QtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktbGlzdC90ZXN0aW5nL3NlbGVjdGlvbi1saXN0LWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRWhFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBTTdELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSw0QkFBNEIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTVGOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsd0JBSWxEO0lBSkQ7O1FBb0JXLGlCQUFZLEdBQUcsMEJBQTBCLENBQUM7SUFxQ3JELENBQUM7SUFqREM7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUNULFVBQTZDLEVBQUU7UUFFL0MsT0FBTyxJQUFJLGdCQUFnQixDQUFDLDZCQUE2QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFJRCw4Q0FBOEM7SUFDOUMsS0FBSyxDQUFDLFVBQVU7UUFDZCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDO0lBQzlFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBeUM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENB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Q0FBQyxNQUFNO1FBQ1YsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNO1FBQ1YsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUTtRQUNaLElBQUksTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDOztBQXZFRCx1RUFBdUU7QUFDaEUsdUNBQVksR0FBRyxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0hhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge01hdExlZ2FjeUxpc3RPcHRpb25DaGVja2JveFBvc2l0aW9ufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktbGlzdCc7XG5pbXBvcnQge01hdExlZ2FjeUxpc3RIYXJuZXNzQmFzZX0gZnJvbSAnLi9saXN0LWhhcm5lc3MtYmFzZSc7XG5pbXBvcnQge1xuICBMZWdhY3lMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzLFxuICBMZWdhY3lMaXN0T3B0aW9uSGFybmVzc0ZpbHRlcnMsXG4gIExlZ2FjeVNlbGVjdGlvbkxpc3RIYXJuZXNzRmlsdGVycyxcbn0gZnJvbSAnLi9saXN0LWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge2dldExpc3RJdGVtUHJlZGljYXRlLCBNYXRMZWdhY3lMaXN0SXRlbUhhcm5lc3NCYXNlfSBmcm9tICcuL2xpc3QtaXRlbS1oYXJuZXNzLWJhc2UnO1xuXG4vKipcbiAqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBzdGFuZGFyZCBtYXQtc2VsZWN0aW9uLWxpc3QgaW4gdGVzdHMuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFNlbGVjdGlvbkxpc3RIYXJuZXNzYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9saXN0L3Rlc3RpbmdgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVNlbGVjdGlvbkxpc3RIYXJuZXNzIGV4dGVuZHMgTWF0TGVnYWN5TGlzdEhhcm5lc3NCYXNlPFxuICB0eXBlb2YgTWF0TGVnYWN5TGlzdE9wdGlvbkhhcm5lc3MsXG4gIE1hdExlZ2FjeUxpc3RPcHRpb25IYXJuZXNzLFxuICBMZWdhY3lMaXN0T3B0aW9uSGFybmVzc0ZpbHRlcnNcbj4ge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdFNlbGVjdGlvbkxpc3RgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtc2VsZWN0aW9uLWxpc3QnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRTZWxlY3Rpb25MaXN0SGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggc2VsZWN0aW9uIGxpc3QgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgoXG4gICAgb3B0aW9uczogTGVnYWN5U2VsZWN0aW9uTGlzdEhhcm5lc3NGaWx0ZXJzID0ge30sXG4gICk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0TGVnYWN5U2VsZWN0aW9uTGlzdEhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0TGVnYWN5U2VsZWN0aW9uTGlzdEhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgb3ZlcnJpZGUgX2l0ZW1IYXJuZXNzID0gTWF0TGVnYWN5TGlzdE9wdGlvbkhhcm5lc3M7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNlbGVjdGlvbiBsaXN0IGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKSkgPT09ICd0cnVlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGFsbCBpdGVtcyBtYXRjaGluZyBhbnkgb2YgdGhlIGdpdmVuIGZpbHRlcnMuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIEZpbHRlcnMgdGhhdCBzcGVjaWZ5IHdoaWNoIGl0ZW1zIHNob3VsZCBiZSBzZWxlY3RlZC5cbiAgICovXG4gIGFzeW5jIHNlbGVjdEl0ZW1zKC4uLmZpbHRlcnM6IExlZ2FjeUxpc3RPcHRpb25IYXJuZXNzRmlsdGVyc1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLl9nZXRJdGVtcyhmaWx0ZXJzKTtcbiAgICBhd2FpdCBwYXJhbGxlbCgoKSA9PiBpdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnNlbGVjdCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFsbCBpdGVtcyBtYXRjaGluZyBhbnkgb2YgdGhlIGdpdmVuIGZpbHRlcnMuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIEZpbHRlcnMgdGhhdCBzcGVjaWZ5IHdoaWNoIGl0ZW1zIHNob3VsZCBiZSBkZXNlbGVjdGVkLlxuICAgKi9cbiAgYXN5bmMgZGVzZWxlY3RJdGVtcyguLi5maWx0ZXJzOiBMZWdhY3lMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpdGVtcyA9IGF3YWl0IHRoaXMuX2dldEl0ZW1zKGZpbHRlcnMpO1xuICAgIGF3YWl0IHBhcmFsbGVsKCgpID0+IGl0ZW1zLm1hcChpdGVtID0+IGl0ZW0uZGVzZWxlY3QoKSkpO1xuICB9XG5cbiAgLyoqIEdldHMgYWxsIGl0ZW1zIG1hdGNoaW5nIHRoZSBnaXZlbiBsaXN0IG9mIGZpbHRlcnMuICovXG4gIHByaXZhdGUgYXN5bmMgX2dldEl0ZW1zKFxuICAgIGZpbHRlcnM6IExlZ2FjeUxpc3RPcHRpb25IYXJuZXNzRmlsdGVyc1tdLFxuICApOiBQcm9taXNlPE1hdExlZ2FjeUxpc3RPcHRpb25IYXJuZXNzW10+IHtcbiAgICBpZiAoIWZpbHRlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcygpO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaGVzID0gYXdhaXQgcGFyYWxsZWwoKCkgPT4ge1xuICAgICAgcmV0dXJuIGZpbHRlcnMubWFwKGZpbHRlciA9PiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0TGVnYWN5TGlzdE9wdGlvbkhhcm5lc3Mud2l0aChmaWx0ZXIpKSgpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2hlcy5yZWR1Y2UoKHJlc3VsdCwgY3VycmVudCkgPT4gWy4uLnJlc3VsdCwgLi4uY3VycmVudF0sIFtdKTtcbiAgfVxufVxuXG4vKipcbiAqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBsaXN0IG9wdGlvbi5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0TGlzdE9wdGlvbkhhcm5lc3NgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2xpc3QvdGVzdGluZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5TGlzdE9wdGlvbkhhcm5lc3MgZXh0ZW5kcyBNYXRMZWdhY3lMaXN0SXRlbUhhcm5lc3NCYXNlIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRMaXN0T3B0aW9uYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LWxpc3Qtb3B0aW9uJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0TGlzdE9wdGlvbkhhcm5lc3NgIHRoYXRcbiAgICogbWVldHMgY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIGxpc3Qgb3B0aW9uIGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKFxuICAgIG9wdGlvbnM6IExlZ2FjeUxpc3RPcHRpb25IYXJuZXNzRmlsdGVycyA9IHt9LFxuICApOiBIYXJuZXNzUHJlZGljYXRlPE1hdExlZ2FjeUxpc3RPcHRpb25IYXJuZXNzPiB7XG4gICAgcmV0dXJuIGdldExpc3RJdGVtUHJlZGljYXRlKE1hdExlZ2FjeUxpc3RPcHRpb25IYXJuZXNzLCBvcHRpb25zKS5hZGRPcHRpb24oXG4gICAgICAnaXMgc2VsZWN0ZWQnLFxuICAgICAgb3B0aW9ucy5zZWxlY3RlZCxcbiAgICAgIGFzeW5jIChoYXJuZXNzLCBzZWxlY3RlZCkgPT4gKGF3YWl0IGhhcm5lc3MuaXNTZWxlY3RlZCgpKSA9PT0gc2VsZWN0ZWQsXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2l0ZW1Db250ZW50ID0gdGhpcy5sb2NhdG9yRm9yKCcubWF0LWxpc3QtaXRlbS1jb250ZW50Jyk7XG5cbiAgLyoqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjaGVja2JveCByZWxhdGl2ZSB0byB0aGUgbGlzdCBvcHRpb24gY29udGVudC4gKi9cbiAgYXN5bmMgZ2V0Q2hlY2tib3hQb3NpdGlvbigpOiBQcm9taXNlPE1hdExlZ2FjeUxpc3RPcHRpb25DaGVja2JveFBvc2l0aW9uPiB7XG4gICAgcmV0dXJuIChhd2FpdCAoYXdhaXQgdGhpcy5faXRlbUNvbnRlbnQoKSkuaGFzQ2xhc3MoJ21hdC1saXN0LWl0ZW0tY29udGVudC1yZXZlcnNlJykpXG4gICAgICA/ICdhZnRlcidcbiAgICAgIDogJ2JlZm9yZSc7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGlzdCBvcHRpb24gaXMgc2VsZWN0ZWQuICovXG4gIGFzeW5jIGlzU2VsZWN0ZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpKSA9PT0gJ3RydWUnO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGxpc3Qgb3B0aW9uLiAqL1xuICBhc3luYyBmb2N1cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBsaXN0IG9wdGlvbi4gKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGlzdCBvcHRpb24gaXMgZm9jdXNlZC4gKi9cbiAgYXN5bmMgaXNGb2N1c2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmlzRm9jdXNlZCgpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICBhc3luYyB0b2dnbGUoKSB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuY2xpY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXRzIHRoZSBsaXN0IG9wdGlvbiBpbiBhIGNoZWNrZWQgc3RhdGUgYnkgdG9nZ2xpbmcgaXQgaWYgaXQgaXMgY3VycmVudGx5IHVuY2hlY2tlZCwgb3IgZG9pbmdcbiAgICogbm90aGluZyBpZiBpdCBpcyBhbHJlYWR5IGNoZWNrZWQuXG4gICAqL1xuICBhc3luYyBzZWxlY3QoKSB7XG4gICAgaWYgKCEoYXdhaXQgdGhpcy5pc1NlbGVjdGVkKCkpKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHV0cyB0aGUgbGlzdCBvcHRpb24gaW4gYW4gdW5jaGVja2VkIHN0YXRlIGJ5IHRvZ2dsaW5nIGl0IGlmIGl0IGlzIGN1cnJlbnRseSBjaGVja2VkLCBvciBkb2luZ1xuICAgKiBub3RoaW5nIGlmIGl0IGlzIGFscmVhZHkgdW5jaGVja2VkLlxuICAgKi9cbiAgYXN5bmMgZGVzZWxlY3QoKSB7XG4gICAgaWYgKGF3YWl0IHRoaXMuaXNTZWxlY3RlZCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==