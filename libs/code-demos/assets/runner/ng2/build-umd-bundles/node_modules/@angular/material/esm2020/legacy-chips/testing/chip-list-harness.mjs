/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatLegacyChipHarness } from './chip-harness';
import { MatLegacyChipInputHarness } from './chip-input-harness';
/**
 * Base class for chip list harnesses.
 * @deprecated Use `class` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class _MatChipListHarnessBase extends ComponentHarness {
    /** Gets whether the chip list is disabled. */
    async isDisabled() {
        return (await (await this.host()).getAttribute('aria-disabled')) === 'true';
    }
    /** Gets whether the chip list is required. */
    async isRequired() {
        return (await (await this.host()).getAttribute('aria-required')) === 'true';
    }
    /** Gets whether the chip list is invalid. */
    async isInvalid() {
        return (await (await this.host()).getAttribute('aria-invalid')) === 'true';
    }
    /** Gets whether the chip list is in multi selection mode. */
    async isMultiple() {
        return (await (await this.host()).getAttribute('aria-multiselectable')) === 'true';
    }
    /** Gets whether the orientation of the chip list. */
    async getOrientation() {
        const orientation = await (await this.host()).getAttribute('aria-orientation');
        return orientation === 'vertical' ? 'vertical' : 'horizontal';
    }
}
/**
 * Harness for interacting with a standard chip list in tests.
 * @deprecated Use `MatChipListHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyChipListHarness extends _MatChipListHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which chip list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyChipListHarness, options);
    }
    /**
     * Gets the list of chips inside the chip list.
     * @param filter Optionally filters which chips are included.
     */
    async getChips(filter = {}) {
        return this.locatorForAll(MatLegacyChipHarness.with(filter))();
    }
    /**
     * Selects a chip inside the chip list.
     * @param filter An optional filter to apply to the child chips.
     *    All the chips matching the filter will be selected.
     * @deprecated Use `MatChipListboxHarness.selectChips` instead.
     * @breaking-change 12.0.0
     */
    async selectChips(filter = {}) {
        const chips = await this.getChips(filter);
        if (!chips.length) {
            throw Error(`Cannot find chip matching filter ${JSON.stringify(filter)}`);
        }
        await parallel(() => chips.map(chip => chip.select()));
    }
    /**
     * Gets the `MatChipInput` inside the chip list.
     * @param filter Optionally filters which chip input is included.
     */
    async getInput(filter = {}) {
        // The input isn't required to be a descendant of the chip list so we have to look it up by id.
        const inputId = await (await this.host()).getAttribute('data-mat-chip-input');
        if (!inputId) {
            throw Error(`Chip list is not associated with an input`);
        }
        return this.documentRootLocatorFactory().locatorFor(MatLegacyChipInputHarness.with({ ...filter, selector: `#${inputId}` }))();
    }
}
/** The selector for the host element of a `MatChipList` instance. */
MatLegacyChipListHarness.hostSelector = '.mat-chip-list';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1saXN0LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LWNoaXBzL3Rlc3RpbmcvY2hpcC1saXN0LWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBTy9EOzs7O0dBSUc7QUFDSCxNQUFNLE9BQWdCLHVCQUF3QixTQUFRLGdCQUFnQjtJQUNwRSw4Q0FBOEM7SUFDOUMsS0FBSyxDQUFDLFVBQVU7UUFDZCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDO0lBQzlFLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsS0FBSyxDQUFDLFVBQVU7UUFDZCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDO0lBQzlFLENBQUM7SUFFRCw2Q0FBNkM7SUFDN0MsS0FBSyxDQUFDLFNBQVM7UUFDYixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDO0lBQzdFLENBQUM7SUFFRCw2REFBNkQ7SUFDN0QsS0FBSyxDQUFDLFVBQVU7UUFDZCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUMsS0FBSyxNQUFNLENBQUM7SUFDckYsQ0FBQztJQUVELHFEQUFxRDtJQUNyRCxLQUFLLENBQUMsY0FBYztRQUNsQixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMvRSxPQUFPLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQ2hFLENBQUM7Q0FDRjtBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsdUJBQXVCO0lBSW5FOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FDVCxVQUF3QyxFQUFFO1FBRTFDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFtQyxFQUFFO1FBQ2xELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQW1DLEVBQUU7UUFDckQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE1BQU0sS0FBSyxDQUFDLG9DQUFvQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzRTtRQUNELE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQXdDLEVBQUU7UUFDdkQsK0ZBQStGO1FBQy9GLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsT0FBTyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQ2pELHlCQUF5QixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLE9BQU8sRUFBRSxFQUFDLENBQUMsQ0FDckUsRUFBRSxDQUFDO0lBQ04sQ0FBQzs7QUFyREQscUVBQXFFO0FBQzlELHFDQUFZLEdBQUcsZ0JBQWdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlLCBwYXJhbGxlbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRMZWdhY3lDaGlwSGFybmVzc30gZnJvbSAnLi9jaGlwLWhhcm5lc3MnO1xuaW1wb3J0IHtNYXRMZWdhY3lDaGlwSW5wdXRIYXJuZXNzfSBmcm9tICcuL2NoaXAtaW5wdXQtaGFybmVzcyc7XG5pbXBvcnQge1xuICBMZWdhY3lDaGlwTGlzdEhhcm5lc3NGaWx0ZXJzLFxuICBMZWdhY3lDaGlwSGFybmVzc0ZpbHRlcnMsXG4gIExlZ2FjeUNoaXBJbnB1dEhhcm5lc3NGaWx0ZXJzLFxufSBmcm9tICcuL2NoaXAtaGFybmVzcy1maWx0ZXJzJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBjaGlwIGxpc3QgaGFybmVzc2VzLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBjbGFzc2AgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMvdGVzdGluZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgX01hdENoaXBMaXN0SGFybmVzc0Jhc2UgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIEdldHMgd2hldGhlciB0aGUgY2hpcCBsaXN0IGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKSkgPT09ICd0cnVlJztcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIGNoaXAgbGlzdCBpcyByZXF1aXJlZC4gKi9cbiAgYXN5bmMgaXNSZXF1aXJlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXJlcXVpcmVkJykpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBjaGlwIGxpc3QgaXMgaW52YWxpZC4gKi9cbiAgYXN5bmMgaXNJbnZhbGlkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcpKSA9PT0gJ3RydWUnO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgY2hpcCBsaXN0IGlzIGluIG11bHRpIHNlbGVjdGlvbiBtb2RlLiAqL1xuICBhc3luYyBpc011bHRpcGxlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJykpID09PSAndHJ1ZSc7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgY2hpcCBsaXN0LiAqL1xuICBhc3luYyBnZXRPcmllbnRhdGlvbigpOiBQcm9taXNlPCdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc+IHtcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLW9yaWVudGF0aW9uJyk7XG4gICAgcmV0dXJuIG9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgfVxufVxuXG4vKipcbiAqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBzdGFuZGFyZCBjaGlwIGxpc3QgaW4gdGVzdHMuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdENoaXBMaXN0SGFybmVzc2AgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMvdGVzdGluZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Q2hpcExpc3RIYXJuZXNzIGV4dGVuZHMgX01hdENoaXBMaXN0SGFybmVzc0Jhc2Uge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdENoaXBMaXN0YCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LWNoaXAtbGlzdCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgYE1hdENoaXBMaXN0SGFybmVzc2AgdGhhdCBtZWV0c1xuICAgKiBjZXJ0YWluIGNyaXRlcmlhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggY2hpcCBsaXN0IGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKFxuICAgIG9wdGlvbnM6IExlZ2FjeUNoaXBMaXN0SGFybmVzc0ZpbHRlcnMgPSB7fSxcbiAgKTogSGFybmVzc1ByZWRpY2F0ZTxNYXRMZWdhY3lDaGlwTGlzdEhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0TGVnYWN5Q2hpcExpc3RIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsaXN0IG9mIGNoaXBzIGluc2lkZSB0aGUgY2hpcCBsaXN0LlxuICAgKiBAcGFyYW0gZmlsdGVyIE9wdGlvbmFsbHkgZmlsdGVycyB3aGljaCBjaGlwcyBhcmUgaW5jbHVkZWQuXG4gICAqL1xuICBhc3luYyBnZXRDaGlwcyhmaWx0ZXI6IExlZ2FjeUNoaXBIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRMZWdhY3lDaGlwSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbChNYXRMZWdhY3lDaGlwSGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIGNoaXAgaW5zaWRlIHRoZSBjaGlwIGxpc3QuXG4gICAqIEBwYXJhbSBmaWx0ZXIgQW4gb3B0aW9uYWwgZmlsdGVyIHRvIGFwcGx5IHRvIHRoZSBjaGlsZCBjaGlwcy5cbiAgICogICAgQWxsIHRoZSBjaGlwcyBtYXRjaGluZyB0aGUgZmlsdGVyIHdpbGwgYmUgc2VsZWN0ZWQuXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2hpcExpc3Rib3hIYXJuZXNzLnNlbGVjdENoaXBzYCBpbnN0ZWFkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEyLjAuMFxuICAgKi9cbiAgYXN5bmMgc2VsZWN0Q2hpcHMoZmlsdGVyOiBMZWdhY3lDaGlwSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNoaXBzID0gYXdhaXQgdGhpcy5nZXRDaGlwcyhmaWx0ZXIpO1xuICAgIGlmICghY2hpcHMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgY2hpcCBtYXRjaGluZyBmaWx0ZXIgJHtKU09OLnN0cmluZ2lmeShmaWx0ZXIpfWApO1xuICAgIH1cbiAgICBhd2FpdCBwYXJhbGxlbCgoKSA9PiBjaGlwcy5tYXAoY2hpcCA9PiBjaGlwLnNlbGVjdCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgYE1hdENoaXBJbnB1dGAgaW5zaWRlIHRoZSBjaGlwIGxpc3QuXG4gICAqIEBwYXJhbSBmaWx0ZXIgT3B0aW9uYWxseSBmaWx0ZXJzIHdoaWNoIGNoaXAgaW5wdXQgaXMgaW5jbHVkZWQuXG4gICAqL1xuICBhc3luYyBnZXRJbnB1dChmaWx0ZXI6IExlZ2FjeUNoaXBJbnB1dEhhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPE1hdExlZ2FjeUNoaXBJbnB1dEhhcm5lc3M+IHtcbiAgICAvLyBUaGUgaW5wdXQgaXNuJ3QgcmVxdWlyZWQgdG8gYmUgYSBkZXNjZW5kYW50IG9mIHRoZSBjaGlwIGxpc3Qgc28gd2UgaGF2ZSB0byBsb29rIGl0IHVwIGJ5IGlkLlxuICAgIGNvbnN0IGlucHV0SWQgPSBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXQtY2hpcC1pbnB1dCcpO1xuXG4gICAgaWYgKCFpbnB1dElkKSB7XG4gICAgICB0aHJvdyBFcnJvcihgQ2hpcCBsaXN0IGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggYW4gaW5wdXRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudFJvb3RMb2NhdG9yRmFjdG9yeSgpLmxvY2F0b3JGb3IoXG4gICAgICBNYXRMZWdhY3lDaGlwSW5wdXRIYXJuZXNzLndpdGgoey4uLmZpbHRlciwgc2VsZWN0b3I6IGAjJHtpbnB1dElkfWB9KSxcbiAgICApKCk7XG4gIH1cbn1cbiJdfQ==