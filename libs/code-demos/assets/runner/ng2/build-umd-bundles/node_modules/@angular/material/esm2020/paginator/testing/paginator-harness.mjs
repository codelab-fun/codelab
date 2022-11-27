/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, } from '@angular/cdk/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { coerceNumberProperty } from '@angular/cdk/coercion';
export class _MatPaginatorHarnessBase extends ComponentHarness {
    /** Goes to the next page in the paginator. */
    async goToNextPage() {
        return (await this._nextButton()).click();
    }
    /** Returns whether or not the next page button is disabled. */
    async isNextPageDisabled() {
        const disabledValue = await (await this._nextButton()).getAttribute('disabled');
        return disabledValue == 'true';
    }
    /* Returns whether or not the previous page button is disabled. */
    async isPreviousPageDisabled() {
        const disabledValue = await (await this._previousButton()).getAttribute('disabled');
        return disabledValue == 'true';
    }
    /** Goes to the previous page in the paginator. */
    async goToPreviousPage() {
        return (await this._previousButton()).click();
    }
    /** Goes to the first page in the paginator. */
    async goToFirstPage() {
        const button = await this._firstPageButton();
        // The first page button isn't enabled by default so we need to check for it.
        if (!button) {
            throw Error('Could not find first page button inside paginator. ' +
                'Make sure that `showFirstLastButtons` is enabled.');
        }
        return button.click();
    }
    /** Goes to the last page in the paginator. */
    async goToLastPage() {
        const button = await this._lastPageButton();
        // The last page button isn't enabled by default so we need to check for it.
        if (!button) {
            throw Error('Could not find last page button inside paginator. ' +
                'Make sure that `showFirstLastButtons` is enabled.');
        }
        return button.click();
    }
    /**
     * Sets the page size of the paginator.
     * @param size Page size that should be select.
     */
    async setPageSize(size) {
        const select = await this._select();
        // The select is only available if the `pageSizeOptions` are
        // set to an array with more than one item.
        if (!select) {
            throw Error('Cannot find page size selector in paginator. ' +
                'Make sure that the `pageSizeOptions` have been configured.');
        }
        return select.clickOptions({ text: `${size}` });
    }
    /** Gets the page size of the paginator. */
    async getPageSize() {
        const select = await this._select();
        const value = select ? select.getValueText() : (await this._pageSizeFallback()).text();
        return coerceNumberProperty(await value);
    }
    /** Gets the text of the range label of the paginator. */
    async getRangeLabel() {
        return (await this._rangeLabel()).text();
    }
}
/** Harness for interacting with an MDC-based mat-paginator in tests. */
export class MatPaginatorHarness extends _MatPaginatorHarnessBase {
    constructor() {
        super(...arguments);
        this._nextButton = this.locatorFor('.mat-mdc-paginator-navigation-next');
        this._previousButton = this.locatorFor('.mat-mdc-paginator-navigation-previous');
        this._firstPageButton = this.locatorForOptional('.mat-mdc-paginator-navigation-first');
        this._lastPageButton = this.locatorForOptional('.mat-mdc-paginator-navigation-last');
        this._select = this.locatorForOptional(MatSelectHarness.with({
            ancestor: '.mat-mdc-paginator-page-size',
        }));
        this._pageSizeFallback = this.locatorFor('.mat-mdc-paginator-page-size-value');
        this._rangeLabel = this.locatorFor('.mat-mdc-paginator-range-label');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a paginator with specific attributes.
     * @param options Options for filtering which paginator instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** Selector used to find paginator instances. */
MatPaginatorHarness.hostSelector = '.mat-mdc-paginator';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcGFnaW5hdG9yL3Rlc3RpbmcvcGFnaW5hdG9yLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLGdCQUFnQixFQUVoQixnQkFBZ0IsR0FFakIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUczRCxNQUFNLE9BQWdCLHdCQUF5QixTQUFRLGdCQUFnQjtJQWVyRSw4Q0FBOEM7SUFDOUMsS0FBSyxDQUFDLFlBQVk7UUFDaEIsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELCtEQUErRDtJQUMvRCxLQUFLLENBQUMsa0JBQWtCO1FBQ3RCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRixPQUFPLGFBQWEsSUFBSSxNQUFNLENBQUM7SUFDakMsQ0FBQztJQUVELGtFQUFrRTtJQUNsRSxLQUFLLENBQUMsc0JBQXNCO1FBQzFCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRixPQUFPLGFBQWEsSUFBSSxNQUFNLENBQUM7SUFDakMsQ0FBQztJQUVELGtEQUFrRDtJQUNsRCxLQUFLLENBQUMsZ0JBQWdCO1FBQ3BCLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFD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b0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBBc3luY0ZhY3RvcnlGbixcbiAgQ29tcG9uZW50SGFybmVzcyxcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBUZXN0RWxlbWVudCxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtNYXRTZWxlY3RIYXJuZXNzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QvdGVzdGluZyc7XG5pbXBvcnQge2NvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtQYWdpbmF0b3JIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9wYWdpbmF0b3ItaGFybmVzcy1maWx0ZXJzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIF9NYXRQYWdpbmF0b3JIYXJuZXNzQmFzZSBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX25leHRCdXR0b246IEFzeW5jRmFjdG9yeUZuPFRlc3RFbGVtZW50PjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9wcmV2aW91c0J1dHRvbjogQXN5bmNGYWN0b3J5Rm48VGVzdEVsZW1lbnQ+O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2ZpcnN0UGFnZUJ1dHRvbjogQXN5bmNGYWN0b3J5Rm48VGVzdEVsZW1lbnQgfCBudWxsPjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9sYXN0UGFnZUJ1dHRvbjogQXN5bmNGYWN0b3J5Rm48VGVzdEVsZW1lbnQgfCBudWxsPjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9zZWxlY3Q6IEFzeW5jRmFjdG9yeUZuPFxuICAgIHwgKENvbXBvbmVudEhhcm5lc3MgJiB7XG4gICAgICAgIGdldFZhbHVlVGV4dCgpOiBQcm9taXNlPHN0cmluZz47XG4gICAgICAgIGNsaWNrT3B0aW9ucyguLi5maWx0ZXJzOiB1bmtub3duW10pOiBQcm9taXNlPHZvaWQ+O1xuICAgICAgfSlcbiAgICB8IG51bGxcbiAgPjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9wYWdlU2l6ZUZhbGxiYWNrOiBBc3luY0ZhY3RvcnlGbjxUZXN0RWxlbWVudD47XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfcmFuZ2VMYWJlbDogQXN5bmNGYWN0b3J5Rm48VGVzdEVsZW1lbnQ+O1xuXG4gIC8qKiBHb2VzIHRvIHRoZSBuZXh0IHBhZ2UgaW4gdGhlIHBhZ2luYXRvci4gKi9cbiAgYXN5bmMgZ29Ub05leHRQYWdlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fbmV4dEJ1dHRvbigpKS5jbGljaygpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG5leHQgcGFnZSBidXR0b24gaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzTmV4dFBhZ2VEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBkaXNhYmxlZFZhbHVlID0gYXdhaXQgKGF3YWl0IHRoaXMuX25leHRCdXR0b24oKSkuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIHJldHVybiBkaXNhYmxlZFZhbHVlID09ICd0cnVlJztcbiAgfVxuXG4gIC8qIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHByZXZpb3VzIHBhZ2UgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc1ByZXZpb3VzUGFnZURpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGRpc2FibGVkVmFsdWUgPSBhd2FpdCAoYXdhaXQgdGhpcy5fcHJldmlvdXNCdXR0b24oKSkuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIHJldHVybiBkaXNhYmxlZFZhbHVlID09ICd0cnVlJztcbiAgfVxuXG4gIC8qKiBHb2VzIHRvIHRoZSBwcmV2aW91cyBwYWdlIGluIHRoZSBwYWdpbmF0b3IuICovXG4gIGFzeW5jIGdvVG9QcmV2aW91c1BhZ2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9wcmV2aW91c0J1dHRvbigpKS5jbGljaygpO1xuICB9XG5cbiAgLyoqIEdvZXMgdG8gdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIHBhZ2luYXRvci4gKi9cbiAgYXN5bmMgZ29Ub0ZpcnN0UGFnZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBidXR0b24gPSBhd2FpdCB0aGlzLl9maXJzdFBhZ2VCdXR0b24oKTtcblxuICAgIC8vIFRoZSBmaXJzdCBwYWdlIGJ1dHRvbiBpc24ndCBlbmFibGVkIGJ5IGRlZmF1bHQgc28gd2UgbmVlZCB0byBjaGVjayBmb3IgaXQuXG4gICAgaWYgKCFidXR0b24pIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAnQ291bGQgbm90IGZpbmQgZmlyc3QgcGFnZSBidXR0b24gaW5zaWRlIHBhZ2luYXRvci4gJyArXG4gICAgICAgICAgJ01ha2Ugc3VyZSB0aGF0IGBzaG93Rmlyc3RMYXN0QnV0dG9uc2AgaXMgZW5hYmxlZC4nLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnV0dG9uLmNsaWNrKCk7XG4gIH1cblxuICAvKiogR29lcyB0byB0aGUgbGFzdCBwYWdlIGluIHRoZSBwYWdpbmF0b3IuICovXG4gIGFzeW5jIGdvVG9MYXN0UGFnZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBidXR0b24gPSBhd2FpdCB0aGlzLl9sYXN0UGFnZUJ1dHRvbigpO1xuXG4gICAgLy8gVGhlIGxhc3QgcGFnZSBidXR0b24gaXNuJ3QgZW5hYmxlZCBieSBkZWZhdWx0IHNvIHdlIG5lZWQgdG8gY2hlY2sgZm9yIGl0LlxuICAgIGlmICghYnV0dG9uKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgJ0NvdWxkIG5vdCBmaW5kIGxhc3QgcGFnZSBidXR0b24gaW5zaWRlIHBhZ2luYXRvci4gJyArXG4gICAgICAgICAgJ01ha2Ugc3VyZSB0aGF0IGBzaG93Rmlyc3RMYXN0QnV0dG9uc2AgaXMgZW5hYmxlZC4nLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnV0dG9uLmNsaWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFnZSBzaXplIG9mIHRoZSBwYWdpbmF0b3IuXG4gICAqIEBwYXJhbSBzaXplIFBhZ2Ugc2l6ZSB0aGF0IHNob3VsZCBiZSBzZWxlY3QuXG4gICAqL1xuICBhc3luYyBzZXRQYWdlU2l6ZShzaXplOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzZWxlY3QgPSBhd2FpdCB0aGlzLl9zZWxlY3QoKTtcblxuICAgIC8vIFRoZSBzZWxlY3QgaXMgb25seSBhdmFpbGFibGUgaWYgdGhlIGBwYWdlU2l6ZU9wdGlvbnNgIGFyZVxuICAgIC8vIHNldCB0byBhbiBhcnJheSB3aXRoIG1vcmUgdGhhbiBvbmUgaXRlbS5cbiAgICBpZiAoIXNlbGVjdCkge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICdDYW5ub3QgZmluZCBwYWdlIHNpemUgc2VsZWN0b3IgaW4gcGFnaW5hdG9yLiAnICtcbiAgICAgICAgICAnTWFrZSBzdXJlIHRoYXQgdGhlIGBwYWdlU2l6ZU9wdGlvbnNgIGhhdmUgYmVlbiBjb25maWd1cmVkLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3QuY2xpY2tPcHRpb25zKHt0ZXh0OiBgJHtzaXplfWB9KTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBwYWdlIHNpemUgb2YgdGhlIHBhZ2luYXRvci4gKi9cbiAgYXN5bmMgZ2V0UGFnZVNpemUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBzZWxlY3QgPSBhd2FpdCB0aGlzLl9zZWxlY3QoKTtcbiAgICBjb25zdCB2YWx1ZSA9IHNlbGVjdCA/IHNlbGVjdC5nZXRWYWx1ZVRleHQoKSA6IChhd2FpdCB0aGlzLl9wYWdlU2l6ZUZhbGxiYWNrKCkpLnRleHQoKTtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkoYXdhaXQgdmFsdWUpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRleHQgb2YgdGhlIHJhbmdlIGxhYmVsIG9mIHRoZSBwYWdpbmF0b3IuICovXG4gIGFzeW5jIGdldFJhbmdlTGFiZWwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3JhbmdlTGFiZWwoKSkudGV4dCgpO1xuICB9XG59XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtcGFnaW5hdG9yIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFBhZ2luYXRvckhhcm5lc3MgZXh0ZW5kcyBfTWF0UGFnaW5hdG9ySGFybmVzc0Jhc2Uge1xuICAvKiogU2VsZWN0b3IgdXNlZCB0byBmaW5kIHBhZ2luYXRvciBpbnN0YW5jZXMuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtcGFnaW5hdG9yJztcbiAgcHJvdGVjdGVkIF9uZXh0QnV0dG9uID0gdGhpcy5sb2NhdG9yRm9yKCcubWF0LW1kYy1wYWdpbmF0b3ItbmF2aWdhdGlvbi1uZXh0Jyk7XG4gIHByb3RlY3RlZCBfcHJldmlvdXNCdXR0b24gPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLXBhZ2luYXRvci1uYXZpZ2F0aW9uLXByZXZpb3VzJyk7XG4gIHByb3RlY3RlZCBfZmlyc3RQYWdlQnV0dG9uID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tYXQtbWRjLXBhZ2luYXRvci1uYXZpZ2F0aW9uLWZpcnN0Jyk7XG4gIHByb3RlY3RlZCBfbGFzdFBhZ2VCdXR0b24gPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtcGFnaW5hdG9yLW5hdmlnYXRpb24tbGFzdCcpO1xuICBwcm90ZWN0ZWQgX3NlbGVjdCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKFxuICAgIE1hdFNlbGVjdEhhcm5lc3Mud2l0aCh7XG4gICAgICBhbmNlc3RvcjogJy5tYXQtbWRjLXBhZ2luYXRvci1wYWdlLXNpemUnLFxuICAgIH0pLFxuICApO1xuICBwcm90ZWN0ZWQgX3BhZ2VTaXplRmFsbGJhY2sgPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLXBhZ2luYXRvci1wYWdlLXNpemUtdmFsdWUnKTtcbiAgcHJvdGVjdGVkIF9yYW5nZUxhYmVsID0gdGhpcy5sb2NhdG9yRm9yKCcubWF0LW1kYy1wYWdpbmF0b3ItcmFuZ2UtbGFiZWwnKTtcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBwYWdpbmF0b3Igd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggcGFnaW5hdG9yIGluc3RhbmNlcyBhcmUgY29uc2lkZXJlZCBhIG1hdGNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoPFQgZXh0ZW5kcyBNYXRQYWdpbmF0b3JIYXJuZXNzPihcbiAgICB0aGlzOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4sXG4gICAgb3B0aW9uczogUGFnaW5hdG9ySGFybmVzc0ZpbHRlcnMgPSB7fSxcbiAgKTogSGFybmVzc1ByZWRpY2F0ZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKHRoaXMsIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=