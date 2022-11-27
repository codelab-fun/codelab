/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ContentContainerComponentHarness, HarnessPredicate, TestKey, } from '@angular/cdk/testing';
import { MatChipAvatarHarness } from './chip-avatar-harness';
import { MatChipRemoveHarness } from './chip-remove-harness';
/** Harness for interacting with a mat-chip in tests. */
export class MatChipHarness extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._primaryAction = this.locatorFor('.mdc-evolution-chip__action--primary');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     * @param options Options for narrowing the search.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('text', options.text, (harness, label) => {
            return HarnessPredicate.stringMatches(harness.getText(), label);
        });
    }
    /** Gets a promise for the text content the option. */
    async getText() {
        return (await this.host()).text({
            exclude: '.mat-mdc-chip-avatar, .mat-mdc-chip-trailing-icon, .mat-icon',
        });
    }
    /** Whether the chip is disabled. */
    async isDisabled() {
        return (await this.host()).hasClass('mat-mdc-chip-disabled');
    }
    /** Delete a chip from the set. */
    async remove() {
        const hostEl = await this.host();
        await hostEl.sendKeys(TestKey.DELETE);
    }
    /**
     * Gets the remove button inside of a chip.
     * @param filter Optionally filters which chips are included.
     */
    async getRemoveButton(filter = {}) {
        return this.locatorFor(MatChipRemoveHarness.with(filter))();
    }
    /**
     * Gets the avatar inside a chip.
     * @param filter Optionally filters which avatars are included.
     */
    async getAvatar(filter = {}) {
        return this.locatorForOptional(MatChipAvatarHarness.with(filter))();
    }
}
MatChipHarness.hostSelector = '.mat-mdc-basic-chip, .mat-mdc-chip';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2NoaXBzL3Rlc3RpbmcvY2hpcC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFFTCxnQ0FBZ0MsRUFDaEMsZ0JBQWdCLEVBQ2hCLE9BQU8sR0FDUixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBTTNELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTNELHdEQUF3RDtBQUN4RCxNQUFNLE9BQU8sY0FBZSxTQUFRLGdDQUFnQztJQUFwRTs7UUFDWSxtQkFBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQW1EckYsQ0FBQztJQS9DQzs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FFVCxVQUE4QixFQUFFO1FBRWhDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzVGLE9BQU8sZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDOUIsT0FBTyxFQUFFLDhEQUE4RDtTQUN4RSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLEtBQUssQ0FBQyxVQUFVO1FBQ2QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELGtDQUFrQztJQUNsQyxLQUFLLENBQUMsTUFBTTtRQUNWLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBbUMsRUFBRTtRQUN6RCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFtQyxFQUFFO1FBQ25ELE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEUsQ0FBQzs7QUFoRE0sMkJBQVksR0FBRyxvQ0FBb0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBUZXN0S2V5LFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge01hdENoaXBBdmF0YXJIYXJuZXNzfSBmcm9tICcuL2NoaXAtYXZhdGFyLWhhcm5lc3MnO1xuaW1wb3J0IHtcbiAgQ2hpcEF2YXRhckhhcm5lc3NGaWx0ZXJzLFxuICBDaGlwSGFybmVzc0ZpbHRlcnMsXG4gIENoaXBSZW1vdmVIYXJuZXNzRmlsdGVycyxcbn0gZnJvbSAnLi9jaGlwLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdENoaXBSZW1vdmVIYXJuZXNzfSBmcm9tICcuL2NoaXAtcmVtb3ZlLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIG1hdC1jaGlwIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBIYXJuZXNzIGV4dGVuZHMgQ29udGVudENvbnRhaW5lckNvbXBvbmVudEhhcm5lc3Mge1xuICBwcm90ZWN0ZWQgX3ByaW1hcnlBY3Rpb24gPSB0aGlzLmxvY2F0b3JGb3IoJy5tZGMtZXZvbHV0aW9uLWNoaXBfX2FjdGlvbi0tcHJpbWFyeScpO1xuXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtYmFzaWMtY2hpcCwgLm1hdC1tZGMtY2hpcCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hpcCB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoPFQgZXh0ZW5kcyBNYXRDaGlwSGFybmVzcz4oXG4gICAgdGhpczogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFQ+LFxuICAgIG9wdGlvbnM6IENoaXBIYXJuZXNzRmlsdGVycyA9IHt9LFxuICApOiBIYXJuZXNzUHJlZGljYXRlPFQ+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUodGhpcywgb3B0aW9ucykuYWRkT3B0aW9uKCd0ZXh0Jywgb3B0aW9ucy50ZXh0LCAoaGFybmVzcywgbGFiZWwpID0+IHtcbiAgICAgIHJldHVybiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUZXh0KCksIGxhYmVsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgcHJvbWlzZSBmb3IgdGhlIHRleHQgY29udGVudCB0aGUgb3B0aW9uLiAqL1xuICBhc3luYyBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCh7XG4gICAgICBleGNsdWRlOiAnLm1hdC1tZGMtY2hpcC1hdmF0YXIsIC5tYXQtbWRjLWNoaXAtdHJhaWxpbmctaWNvbiwgLm1hdC1pY29uJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtYXQtbWRjLWNoaXAtZGlzYWJsZWQnKTtcbiAgfVxuXG4gIC8qKiBEZWxldGUgYSBjaGlwIGZyb20gdGhlIHNldC4gKi9cbiAgYXN5bmMgcmVtb3ZlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGhvc3RFbCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGF3YWl0IGhvc3RFbC5zZW5kS2V5cyhUZXN0S2V5LkRFTEVURSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcmVtb3ZlIGJ1dHRvbiBpbnNpZGUgb2YgYSBjaGlwLlxuICAgKiBAcGFyYW0gZmlsdGVyIE9wdGlvbmFsbHkgZmlsdGVycyB3aGljaCBjaGlwcyBhcmUgaW5jbHVkZWQuXG4gICAqL1xuICBhc3luYyBnZXRSZW1vdmVCdXR0b24oZmlsdGVyOiBDaGlwUmVtb3ZlSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0Q2hpcFJlbW92ZUhhcm5lc3M+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yKE1hdENoaXBSZW1vdmVIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBhdmF0YXIgaW5zaWRlIGEgY2hpcC5cbiAgICogQHBhcmFtIGZpbHRlciBPcHRpb25hbGx5IGZpbHRlcnMgd2hpY2ggYXZhdGFycyBhcmUgaW5jbHVkZWQuXG4gICAqL1xuICBhc3luYyBnZXRBdmF0YXIoZmlsdGVyOiBDaGlwQXZhdGFySGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0Q2hpcEF2YXRhckhhcm5lc3MgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdENoaXBBdmF0YXJIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxufVxuIl19