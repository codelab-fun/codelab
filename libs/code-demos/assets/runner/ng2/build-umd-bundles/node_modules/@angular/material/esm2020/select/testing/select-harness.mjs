/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate, parallel, } from '@angular/cdk/testing';
import { MatOptionHarness, MatOptgroupHarness, } from '@angular/material/core/testing';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';
export class _MatSelectHarnessBase extends MatFormFieldControlHarness {
    constructor() {
        super(...arguments);
        this._documentRootLocator = this.documentRootLocatorFactory();
        this._backdrop = this._documentRootLocator.locatorFor('.cdk-overlay-backdrop');
    }
    /** Gets a boolean promise indicating if the select is disabled. */
    async isDisabled() {
        return (await this.host()).hasClass(`${this._prefix}-select-disabled`);
    }
    /** Gets a boolean promise indicating if the select is valid. */
    async isValid() {
        return !(await (await this.host()).hasClass('ng-invalid'));
    }
    /** Gets a boolean promise indicating if the select is required. */
    async isRequired() {
        return (await this.host()).hasClass(`${this._prefix}-select-required`);
    }
    /** Gets a boolean promise indicating if the select is empty (no value is selected). */
    async isEmpty() {
        return (await this.host()).hasClass(`${this._prefix}-select-empty`);
    }
    /** Gets a boolean promise indicating if the select is in multi-selection mode. */
    async isMultiple() {
        return (await this.host()).hasClass(`${this._prefix}-select-multiple`);
    }
    /** Gets a promise for the select's value text. */
    async getValueText() {
        const value = await this.locatorFor(`.${this._prefix}-select-value`)();
        return value.text();
    }
    /** Focuses the select and returns a void promise that indicates when the action is complete. */
    async focus() {
        return (await this.host()).focus();
    }
    /** Blurs the select and returns a void promise that indicates when the action is complete. */
    async blur() {
        return (await this.host()).blur();
    }
    /** Whether the select is focused. */
    async isFocused() {
        return (await this.host()).isFocused();
    }
    /** Gets the options inside the select panel. */
    async getOptions(filter) {
        return this._documentRootLocator.locatorForAll(this._optionClass.with({
            ...(filter || {}),
            ancestor: await this._getPanelSelector(),
        }))();
    }
    /** Gets the groups of options inside the panel. */
    async getOptionGroups(filter) {
        return this._documentRootLocator.locatorForAll(this._optionGroupClass.with({
            ...(filter || {}),
            ancestor: await this._getPanelSelector(),
        }))();
    }
    /** Gets whether the select is open. */
    async isOpen() {
        return !!(await this._documentRootLocator.locatorForOptional(await this._getPanelSelector())());
    }
    /** Opens the select's panel. */
    async open() {
        if (!(await this.isOpen())) {
            const trigger = await this.locatorFor(`.${this._prefix}-select-trigger`)();
            return trigger.click();
        }
    }
    /**
     * Clicks the options that match the passed-in filter. If the select is in multi-selection
     * mode all options will be clicked, otherwise the harness will pick the first matching option.
     */
    async clickOptions(filter) {
        await this.open();
        const [isMultiple, options] = await parallel(() => [
            this.isMultiple(),
            this.getOptions(filter),
        ]);
        if (options.length === 0) {
            throw Error('Select does not have options matching the specified filter');
        }
        if (isMultiple) {
            await parallel(() => options.map(option => option.click()));
        }
        else {
            await options[0].click();
        }
    }
    /** Closes the select's panel. */
    async close() {
        if (await this.isOpen()) {
            // This is the most consistent way that works both in both single and multi-select modes,
            // but it assumes that only one overlay is open at a time. We should be able to make it
            // a bit more precise after #16645 where we can dispatch an ESCAPE press to the host instead.
            return (await this._backdrop()).click();
        }
    }
    /** Gets the selector that should be used to find this select's panel. */
    async _getPanelSelector() {
        const id = await (await this.host()).getAttribute('id');
        return `#${id}-panel`;
    }
}
/** Harness for interacting with an MDC-based mat-select in tests. */
export class MatSelectHarness extends _MatSelectHarnessBase {
    constructor() {
        super(...arguments);
        this._prefix = 'mat-mdc';
        this._optionClass = MatOptionHarness;
        this._optionGroupClass = MatOptgroupHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a select with specific attributes.
     * @param options Options for filtering which select instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
MatSelectHarness.hostSelector = '.mat-mdc-select';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2VsZWN0L3Rlc3Rpbmcvc2VsZWN0LWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUlMLGdCQUFnQixFQUNoQixRQUFRLEdBQ1QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGtCQUFrQixHQUduQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBR3hGLE1BQU0sT0FBZ0IscUJBV3BCLFNBQVEsMEJBQTBCO0lBWHBDOztRQWVVLHlCQUFvQixHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ3pELGNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUF1SHBGLENBQUM7SUFySEMsbUVBQW1FO0lBQ25FLEtBQUssQ0FBQyxVQUFVO1FBQ2QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sa0JBQWtCLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsZ0VBQWdFO0lBQ2hFLEtBQUssQ0FBQyxPQUFPO1FBQ1gsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELG1FQUFtRTtJQUNuRSxLQUFLLENBQUMsVUFBVTtRQUNkLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLGtCQUFrQixD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TUFBTSxDQUFDLElBQUksQ0FFVCxVQUFnQyxFQUFFO1FBRWxDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7QUFmTSw2QkFBWSxHQUFHLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEJhc2VIYXJuZXNzRmlsdGVycyxcbiAgQ29tcG9uZW50SGFybmVzcyxcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBwYXJhbGxlbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtcbiAgTWF0T3B0aW9uSGFybmVzcyxcbiAgTWF0T3B0Z3JvdXBIYXJuZXNzLFxuICBPcHRpb25IYXJuZXNzRmlsdGVycyxcbiAgT3B0Z3JvdXBIYXJuZXNzRmlsdGVycyxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkQ29udHJvbEhhcm5lc3N9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvdGVzdGluZy9jb250cm9sJztcbmltcG9ydCB7U2VsZWN0SGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vc2VsZWN0LWhhcm5lc3MtZmlsdGVycyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBfTWF0U2VsZWN0SGFybmVzc0Jhc2U8XG4gIE9wdGlvblR5cGUgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8T3B0aW9uPiAmIHtcbiAgICB3aXRoOiAob3B0aW9ucz86IE9wdGlvbkZpbHRlcnMpID0+IEhhcm5lc3NQcmVkaWNhdGU8T3B0aW9uPjtcbiAgfSxcbiAgT3B0aW9uIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyAmIHtjbGljaygpOiBQcm9taXNlPHZvaWQ+fSxcbiAgT3B0aW9uRmlsdGVycyBleHRlbmRzIEJhc2VIYXJuZXNzRmlsdGVycyxcbiAgT3B0aW9uR3JvdXBUeXBlIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPE9wdGlvbkdyb3VwPiAmIHtcbiAgICB3aXRoOiAob3B0aW9ucz86IE9wdGlvbkdyb3VwRmlsdGVycykgPT4gSGFybmVzc1ByZWRpY2F0ZTxPcHRpb25Hcm91cD47XG4gIH0sXG4gIE9wdGlvbkdyb3VwIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyxcbiAgT3B0aW9uR3JvdXBGaWx0ZXJzIGV4dGVuZHMgQmFzZUhhcm5lc3NGaWx0ZXJzLFxuPiBleHRlbmRzIE1hdEZvcm1GaWVsZENvbnRyb2xIYXJuZXNzIHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9wcmVmaXg6IHN0cmluZztcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9vcHRpb25DbGFzczogT3B0aW9uVHlwZTtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9vcHRpb25Hcm91cENsYXNzOiBPcHRpb25Hcm91cFR5cGU7XG4gIHByaXZhdGUgX2RvY3VtZW50Um9vdExvY2F0b3IgPSB0aGlzLmRvY3VtZW50Um9vdExvY2F0b3JGYWN0b3J5KCk7XG4gIHByaXZhdGUgX2JhY2tkcm9wID0gdGhpcy5fZG9jdW1lbnRSb290TG9jYXRvci5sb2NhdG9yRm9yKCcuY2RrLW92ZXJsYXktYmFja2Ryb3AnKTtcblxuICAvKiogR2V0cyBhIGJvb2xlYW4gcHJvbWlzZSBpbmRpY2F0aW5nIGlmIHRoZSBzZWxlY3QgaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoYCR7dGhpcy5fcHJlZml4fS1zZWxlY3QtZGlzYWJsZWRgKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgYm9vbGVhbiBwcm9taXNlIGluZGljYXRpbmcgaWYgdGhlIHNlbGVjdCBpcyB2YWxpZC4gKi9cbiAgYXN5bmMgaXNWYWxpZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gIShhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy1pbnZhbGlkJykpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBib29sZWFuIHByb21pc2UgaW5kaWNhdGluZyBpZiB0aGUgc2VsZWN0IGlzIHJlcXVpcmVkLiAqL1xuICBhc3luYyBpc1JlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKGAke3RoaXMuX3ByZWZpeH0tc2VsZWN0LXJlcXVpcmVkYCk7XG4gIH1cblxuICAvKiogR2V0cyBhIGJvb2xlYW4gcHJvbWlzZSBpbmRpY2F0aW5nIGlmIHRoZSBzZWxlY3QgaXMgZW1wdHkgKG5vIHZhbHVlIGlzIHNlbGVjdGVkKS4gKi9cbiAgYXN5bmMgaXNFbXB0eSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcyhgJHt0aGlzLl9wcmVmaXh9LXNlbGVjdC1lbXB0eWApO1xuICB9XG5cbiAgLyoqIEdldHMgYSBib29sZWFuIHByb21pc2UgaW5kaWNhdGluZyBpZiB0aGUgc2VsZWN0IGlzIGluIG11bHRpLXNlbGVjdGlvbiBtb2RlLiAqL1xuICBhc3luYyBpc011bHRpcGxlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKGAke3RoaXMuX3ByZWZpeH0tc2VsZWN0LW11bHRpcGxlYCk7XG4gIH1cblxuICAvKiogR2V0cyBhIHByb21pc2UgZm9yIHRoZSBzZWxlY3QncyB2YWx1ZSB0ZXh0LiAqL1xuICBhc3luYyBnZXRWYWx1ZVRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IHRoaXMubG9jYXRvckZvcihgLiR7dGhpcy5fcHJlZml4fS1zZWxlY3QtdmFsdWVgKSgpO1xuICAgIHJldHVybiB2YWx1ZS50ZXh0KCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgc2VsZWN0IGFuZCByZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlIGFjdGlvbiBpcyBjb21wbGV0ZS4gKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBCbHVycyB0aGUgc2VsZWN0IGFuZCByZXR1cm5zIGEgdm9pZCBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlIGFjdGlvbiBpcyBjb21wbGV0ZS4gKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgc2VsZWN0IGlzIGZvY3VzZWQuICovXG4gIGFzeW5jIGlzRm9jdXNlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5pc0ZvY3VzZWQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBvcHRpb25zIGluc2lkZSB0aGUgc2VsZWN0IHBhbmVsLiAqL1xuICBhc3luYyBnZXRPcHRpb25zKGZpbHRlcj86IE9taXQ8T3B0aW9uRmlsdGVycywgJ2FuY2VzdG9yJz4pOiBQcm9taXNlPE9wdGlvbltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RvY3VtZW50Um9vdExvY2F0b3IubG9jYXRvckZvckFsbChcbiAgICAgIHRoaXMuX29wdGlvbkNsYXNzLndpdGgoe1xuICAgICAgICAuLi4oZmlsdGVyIHx8IHt9KSxcbiAgICAgICAgYW5jZXN0b3I6IGF3YWl0IHRoaXMuX2dldFBhbmVsU2VsZWN0b3IoKSxcbiAgICAgIH0gYXMgT3B0aW9uRmlsdGVycyksXG4gICAgKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGdyb3VwcyBvZiBvcHRpb25zIGluc2lkZSB0aGUgcGFuZWwuICovXG4gIGFzeW5jIGdldE9wdGlvbkdyb3VwcyhmaWx0ZXI/OiBPbWl0PE9wdGlvbkdyb3VwRmlsdGVycywgJ2FuY2VzdG9yJz4pOiBQcm9taXNlPE9wdGlvbkdyb3VwW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnRSb290TG9jYXRvci5sb2NhdG9yRm9yQWxsKFxuICAgICAgdGhpcy5fb3B0aW9uR3JvdXBDbGFzcy53aXRoKHtcbiAgICAgICAgLi4uKGZpbHRlciB8fCB7fSksXG4gICAgICAgIGFuY2VzdG9yOiBhd2FpdCB0aGlzLl9nZXRQYW5lbFNlbGVjdG9yKCksXG4gICAgICB9IGFzIE9wdGlvbkdyb3VwRmlsdGVycyksXG4gICAgKSgpIGFzIFByb21pc2U8T3B0aW9uR3JvdXBbXT47XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBzZWxlY3QgaXMgb3Blbi4gKi9cbiAgYXN5bmMgaXNPcGVuKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhIShhd2FpdCB0aGlzLl9kb2N1bWVudFJvb3RMb2NhdG9yLmxvY2F0b3JGb3JPcHRpb25hbChhd2FpdCB0aGlzLl9nZXRQYW5lbFNlbGVjdG9yKCkpKCkpO1xuICB9XG5cbiAgLyoqIE9wZW5zIHRoZSBzZWxlY3QncyBwYW5lbC4gKi9cbiAgYXN5bmMgb3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIShhd2FpdCB0aGlzLmlzT3BlbigpKSkge1xuICAgICAgY29uc3QgdHJpZ2dlciA9IGF3YWl0IHRoaXMubG9jYXRvckZvcihgLiR7dGhpcy5fcHJlZml4fS1zZWxlY3QtdHJpZ2dlcmApKCk7XG4gICAgICByZXR1cm4gdHJpZ2dlci5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGlja3MgdGhlIG9wdGlvbnMgdGhhdCBtYXRjaCB0aGUgcGFzc2VkLWluIGZpbHRlci4gSWYgdGhlIHNlbGVjdCBpcyBpbiBtdWx0aS1zZWxlY3Rpb25cbiAgICogbW9kZSBhbGwgb3B0aW9ucyB3aWxsIGJlIGNsaWNrZWQsIG90aGVyd2lzZSB0aGUgaGFybmVzcyB3aWxsIHBpY2sgdGhlIGZpcnN0IG1hdGNoaW5nIG9wdGlvbi5cbiAgICovXG4gIGFzeW5jIGNsaWNrT3B0aW9ucyhmaWx0ZXI/OiBPcHRpb25GaWx0ZXJzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5vcGVuKCk7XG5cbiAgICBjb25zdCBbaXNNdWx0aXBsZSwgb3B0aW9uc10gPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbXG4gICAgICB0aGlzLmlzTXVsdGlwbGUoKSxcbiAgICAgIHRoaXMuZ2V0T3B0aW9ucyhmaWx0ZXIpLFxuICAgIF0pO1xuXG4gICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcignU2VsZWN0IGRvZXMgbm90IGhhdmUgb3B0aW9ucyBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIGZpbHRlcicpO1xuICAgIH1cblxuICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICBhd2FpdCBwYXJhbGxlbCgoKSA9PiBvcHRpb25zLm1hcChvcHRpb24gPT4gb3B0aW9uLmNsaWNrKCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgb3B0aW9uc1swXS5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDbG9zZXMgdGhlIHNlbGVjdCdzIHBhbmVsLiAqL1xuICBhc3luYyBjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoYXdhaXQgdGhpcy5pc09wZW4oKSkge1xuICAgICAgLy8gVGhpcyBpcyB0aGUgbW9zdCBjb25zaXN0ZW50IHdheSB0aGF0IHdvcmtzIGJvdGggaW4gYm90aCBzaW5nbGUgYW5kIG11bHRpLXNlbGVjdCBtb2RlcyxcbiAgICAgIC8vIGJ1dCBpdCBhc3N1bWVzIHRoYXQgb25seSBvbmUgb3ZlcmxheSBpcyBvcGVuIGF0IGEgdGltZS4gV2Ugc2hvdWxkIGJlIGFibGUgdG8gbWFrZSBpdFxuICAgICAgLy8gYSBiaXQgbW9yZSBwcmVjaXNlIGFmdGVyICMxNjY0NSB3aGVyZSB3ZSBjYW4gZGlzcGF0Y2ggYW4gRVNDQVBFIHByZXNzIHRvIHRoZSBob3N0IGluc3RlYWQuXG4gICAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2JhY2tkcm9wKCkpLmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldHMgdGhlIHNlbGVjdG9yIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gZmluZCB0aGlzIHNlbGVjdCdzIHBhbmVsLiAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXRQYW5lbFNlbGVjdG9yKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgaWQgPSBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICByZXR1cm4gYCMke2lkfS1wYW5lbGA7XG4gIH1cbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYW4gTURDLWJhc2VkIG1hdC1zZWxlY3QgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0SGFybmVzcyBleHRlbmRzIF9NYXRTZWxlY3RIYXJuZXNzQmFzZTxcbiAgdHlwZW9mIE1hdE9wdGlvbkhhcm5lc3MsXG4gIE1hdE9wdGlvbkhhcm5lc3MsXG4gIE9wdGlvbkhhcm5lc3NGaWx0ZXJzLFxuICB0eXBlb2YgTWF0T3B0Z3JvdXBIYXJuZXNzLFxuICBNYXRPcHRncm91cEhhcm5lc3MsXG4gIE9wdGdyb3VwSGFybmVzc0ZpbHRlcnNcbj4ge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXNlbGVjdCc7XG4gIHByb3RlY3RlZCBfcHJlZml4ID0gJ21hdC1tZGMnO1xuICBwcm90ZWN0ZWQgX29wdGlvbkNsYXNzID0gTWF0T3B0aW9uSGFybmVzcztcbiAgcHJvdGVjdGVkIF9vcHRpb25Hcm91cENsYXNzID0gTWF0T3B0Z3JvdXBIYXJuZXNzO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIHNlbGVjdCB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBzZWxlY3QgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIE1hdFNlbGVjdEhhcm5lc3M+KFxuICAgIHRoaXM6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxUPixcbiAgICBvcHRpb25zOiBTZWxlY3RIYXJuZXNzRmlsdGVycyA9IHt9LFxuICApOiBIYXJuZXNzUHJlZGljYXRlPFQ+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUodGhpcywgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==