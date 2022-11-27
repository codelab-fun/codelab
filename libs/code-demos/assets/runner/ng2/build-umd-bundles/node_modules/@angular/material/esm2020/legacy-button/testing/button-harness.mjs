/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ContentContainerComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/**
 * Harness for interacting with a standard mat-button in tests.
 * @deprecated Use `MatButtonHarness` from `@angular/material/button/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyButtonHarness extends ContentContainerComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a button harness that meets
     * certain criteria.
     * @param options Options for filtering which button instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyButtonHarness, options)
            .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
            .addOption('variant', options.variant, (harness, variant) => HarnessPredicate.stringMatches(harness.getVariant(), variant));
    }
    async click(...args) {
        return (await this.host()).click(...args);
    }
    /** Whether the button is disabled. */
    async isDisabled() {
        const disabled = (await this.host()).getAttribute('disabled');
        return coerceBooleanProperty(await disabled);
    }
    /** Gets the button's label text. */
    async getText() {
        return (await this.host()).text();
    }
    /** Focuses the button. */
    async focus() {
        return (await this.host()).focus();
    }
    /** Blurs the button. */
    async blur() {
        return (await this.host()).blur();
    }
    /** Whether the button is focused. */
    async isFocused() {
        return (await this.host()).isFocused();
    }
    /** Gets the variant of the button. */
    async getVariant() {
        const host = await this.host();
        if ((await host.getAttribute('mat-raised-button')) != null) {
            return 'raised';
        }
        else if ((await host.getAttribute('mat-flat-button')) != null) {
            return 'flat';
        }
        else if ((await host.getAttribute('mat-icon-button')) != null) {
            return 'icon';
        }
        else if ((await host.getAttribute('mat-stroked-button')) != null) {
            return 'stroked';
        }
        else if ((await host.getAttribute('mat-fab')) != null) {
            return 'fab';
        }
        else if ((await host.getAttribute('mat-mini-fab')) != null) {
            return 'mini-fab';
        }
        return 'basic';
    }
}
// TODO(jelbourn) use a single class, like `.mat-button-base`
/** The selector for the host element of a button instance. */
MatLegacyButtonHarness.hostSelector = `[mat-button], [mat-raised-button], [mat-flat-button], [mat-icon-button],
                         [mat-stroked-button], [mat-fab], [mat-mini-fab]`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LWJ1dHRvbi90ZXN0aW5nL2J1dHRvbi1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQ0FBZ0MsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3hGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRzVEOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZ0NBQWdDO0lBTTFFOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFnQyxFQUFFO1FBQzVDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUM7YUFDekQsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQ2pELGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQ3hEO2FBQ0EsU0FBUyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQzFELGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQzlELENBQUM7SUFDTixDQUFDO0lBWUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQXdDO1FBQ3JELE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFJLElBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxzQ0FBc0M7SUFDdEMsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlELE9BQU8scUJBQXFCLENBQUMsTUFBTSxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLEtBQUssQ0FBQyxPQUFPO1FBQ1gsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELDBCQUEwQjtJQUMxQixLQUFLLENBQUMsS0FBSztRQUNULE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCx3QkFBd0I7SUFDeEIsS0FBSyxDQUFDLElBQUk7UUFDUixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLEtBQUssQ0FBQyxTQUFTO1FBQ2IsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELHNDQUFzQztJQUN0QyxLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRS9CLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUMxRCxPQUFPLFFBQVEsQ0FBQztTQUNqQjthQUFNLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUMvRCxPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQy9ELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDbEUsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3ZELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQzVELE9BQU8sVUFBVSxDQUFDO1NBQ25CO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7QUFoRkQsNkRBQTZEO0FBQzdELDhEQUE4RDtBQUN2RCxtQ0FBWSxHQUFHO3lFQUNpRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29udGVudENvbnRhaW5lckNvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtCdXR0b25IYXJuZXNzRmlsdGVycywgQnV0dG9uVmFyaWFudH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uL3Rlc3RpbmcnO1xuXG4vKipcbiAqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBzdGFuZGFyZCBtYXQtYnV0dG9uIGluIHRlc3RzLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRCdXR0b25IYXJuZXNzYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9idXR0b24vdGVzdGluZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5QnV0dG9uSGFybmVzcyBleHRlbmRzIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzIHtcbiAgLy8gVE9ETyhqZWxib3VybikgdXNlIGEgc2luZ2xlIGNsYXNzLCBsaWtlIGAubWF0LWJ1dHRvbi1iYXNlYFxuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYnV0dG9uIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gYFttYXQtYnV0dG9uXSwgW21hdC1yYWlzZWQtYnV0dG9uXSwgW21hdC1mbGF0LWJ1dHRvbl0sIFttYXQtaWNvbi1idXR0b25dLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFttYXQtc3Ryb2tlZC1idXR0b25dLCBbbWF0LWZhYl0sIFttYXQtbWluaS1mYWJdYDtcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBidXR0b24gaGFybmVzcyB0aGF0IG1lZXRzXG4gICAqIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBidXR0b24gaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogQnV0dG9uSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0TGVnYWN5QnV0dG9uSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRMZWdhY3lCdXR0b25IYXJuZXNzLCBvcHRpb25zKVxuICAgICAgLmFkZE9wdGlvbigndGV4dCcsIG9wdGlvbnMudGV4dCwgKGhhcm5lc3MsIHRleHQpID0+XG4gICAgICAgIEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFRleHQoKSwgdGV4dCksXG4gICAgICApXG4gICAgICAuYWRkT3B0aW9uKCd2YXJpYW50Jywgb3B0aW9ucy52YXJpYW50LCAoaGFybmVzcywgdmFyaWFudCkgPT5cbiAgICAgICAgSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VmFyaWFudCgpLCB2YXJpYW50KSxcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2xpY2tzIHRoZSBidXR0b24gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIHJlbGF0aXZlIHRvIGl0cyB0b3AtbGVmdC5cbiAgICogQHBhcmFtIHJlbGF0aXZlWCBUaGUgcmVsYXRpdmUgeCBwb3NpdGlvbiBvZiB0aGUgY2xpY2suXG4gICAqIEBwYXJhbSByZWxhdGl2ZVkgVGhlIHJlbGF0aXZlIHkgcG9zaXRpb24gb2YgdGhlIGNsaWNrLlxuICAgKi9cbiAgY2xpY2socmVsYXRpdmVYOiBudW1iZXIsIHJlbGF0aXZlWTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPjtcbiAgLyoqIENsaWNrcyB0aGUgYnV0dG9uIGF0IGl0cyBjZW50ZXIuICovXG4gIGNsaWNrKGxvY2F0aW9uOiAnY2VudGVyJyk6IFByb21pc2U8dm9pZD47XG4gIC8qKiBDbGlja3MgdGhlIGJ1dHRvbi4gKi9cbiAgY2xpY2soKTogUHJvbWlzZTx2b2lkPjtcbiAgYXN5bmMgY2xpY2soLi4uYXJnczogW10gfCBbJ2NlbnRlciddIHwgW251bWJlciwgbnVtYmVyXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmNsaWNrKC4uLihhcmdzIGFzIFtdKSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgYnV0dG9uJ3MgbGFiZWwgdGV4dC4gKi9cbiAgYXN5bmMgZ2V0VGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBidXR0b24uICovXG4gIGFzeW5jIGZvY3VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmZvY3VzKCk7XG4gIH1cblxuICAvKiogQmx1cnMgdGhlIGJ1dHRvbi4gKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgYnV0dG9uIGlzIGZvY3VzZWQuICovXG4gIGFzeW5jIGlzRm9jdXNlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5pc0ZvY3VzZWQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB2YXJpYW50IG9mIHRoZSBidXR0b24uICovXG4gIGFzeW5jIGdldFZhcmlhbnQoKTogUHJvbWlzZTxCdXR0b25WYXJpYW50PiB7XG4gICAgY29uc3QgaG9zdCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuXG4gICAgaWYgKChhd2FpdCBob3N0LmdldEF0dHJpYnV0ZSgnbWF0LXJhaXNlZC1idXR0b24nKSkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuICdyYWlzZWQnO1xuICAgIH0gZWxzZSBpZiAoKGF3YWl0IGhvc3QuZ2V0QXR0cmlidXRlKCdtYXQtZmxhdC1idXR0b24nKSkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuICdmbGF0JztcbiAgICB9IGVsc2UgaWYgKChhd2FpdCBob3N0LmdldEF0dHJpYnV0ZSgnbWF0LWljb24tYnV0dG9uJykpICE9IG51bGwpIHtcbiAgICAgIHJldHVybiAnaWNvbic7XG4gICAgfSBlbHNlIGlmICgoYXdhaXQgaG9zdC5nZXRBdHRyaWJ1dGUoJ21hdC1zdHJva2VkLWJ1dHRvbicpKSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gJ3N0cm9rZWQnO1xuICAgIH0gZWxzZSBpZiAoKGF3YWl0IGhvc3QuZ2V0QXR0cmlidXRlKCdtYXQtZmFiJykpICE9IG51bGwpIHtcbiAgICAgIHJldHVybiAnZmFiJztcbiAgICB9IGVsc2UgaWYgKChhd2FpdCBob3N0LmdldEF0dHJpYnV0ZSgnbWF0LW1pbmktZmFiJykpICE9IG51bGwpIHtcbiAgICAgIHJldHVybiAnbWluaS1mYWInO1xuICAgIH1cblxuICAgIHJldHVybiAnYmFzaWMnO1xuICB9XG59XG4iXX0=