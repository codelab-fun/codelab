/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, } from '@angular/cdk/testing';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
export class _MatCheckboxHarnessBase extends ComponentHarness {
    /** Whether the checkbox is checked. */
    async isChecked() {
        const checked = (await this._input()).getProperty('checked');
        return coerceBooleanProperty(await checked);
    }
    /** Whether the checkbox is in an indeterminate state. */
    async isIndeterminate() {
        const indeterminate = (await this._input()).getProperty('indeterminate');
        return coerceBooleanProperty(await indeterminate);
    }
    /** Whether the checkbox is disabled. */
    async isDisabled() {
        const disabled = (await this._input()).getAttribute('disabled');
        return coerceBooleanProperty(await disabled);
    }
    /** Whether the checkbox is required. */
    async isRequired() {
        const required = (await this._input()).getProperty('required');
        return coerceBooleanProperty(await required);
    }
    /** Whether the checkbox is valid. */
    async isValid() {
        const invalid = (await this.host()).hasClass('ng-invalid');
        return !(await invalid);
    }
    /** Gets the checkbox's name. */
    async getName() {
        return (await this._input()).getAttribute('name');
    }
    /** Gets the checkbox's value. */
    async getValue() {
        return (await this._input()).getProperty('value');
    }
    /** Gets the checkbox's aria-label. */
    async getAriaLabel() {
        return (await this._input()).getAttribute('aria-label');
    }
    /** Gets the checkbox's aria-labelledby. */
    async getAriaLabelledby() {
        return (await this._input()).getAttribute('aria-labelledby');
    }
    /** Gets the checkbox's label text. */
    async getLabelText() {
        return (await this._label()).text();
    }
    /** Focuses the checkbox. */
    async focus() {
        return (await this._input()).focus();
    }
    /** Blurs the checkbox. */
    async blur() {
        return (await this._input()).blur();
    }
    /** Whether the checkbox is focused. */
    async isFocused() {
        return (await this._input()).isFocused();
    }
    /**
     * Puts the checkbox in a checked state by toggling it if it is currently unchecked, or doing
     * nothing if it is already checked.
     *
     * Note: This attempts to check the checkbox as a user would, by clicking it. Therefore if you
     * are using `MAT_CHECKBOX_DEFAULT_OPTIONS` to change the behavior on click, calling this method
     * might not have the expected result.
     */
    async check() {
        if (!(await this.isChecked())) {
            await this.toggle();
        }
    }
    /**
     * Puts the checkbox in an unchecked state by toggling it if it is currently checked, or doing
     * nothing if it is already unchecked.
     *
     * Note: This attempts to uncheck the checkbox as a user would, by clicking it. Therefore if you
     * are using `MAT_CHECKBOX_DEFAULT_OPTIONS` to change the behavior on click, calling this method
     * might not have the expected result.
     */
    async uncheck() {
        if (await this.isChecked()) {
            await this.toggle();
        }
    }
}
/** Harness for interacting with a MDC-based mat-checkbox in tests. */
export class MatCheckboxHarness extends _MatCheckboxHarnessBase {
    constructor() {
        super(...arguments);
        this._input = this.locatorFor('input');
        this._label = this.locatorFor('label');
        this._inputContainer = this.locatorFor('.mdc-checkbox');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a checkbox with specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a checkbox whose host element matches the given selector.
     *   - `label` finds a checkbox with specific label text.
     *   - `name` finds a checkbox with specific name.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return (new HarnessPredicate(this, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabelText(), label))
            // We want to provide a filter option for "name" because the name of the checkbox is
            // only set on the underlying input. This means that it's not possible for developers
            // to retrieve the harness of a specific checkbox with name through a CSS selector.
            .addOption('name', options.name, async (harness, name) => (await harness.getName()) === name)
            .addOption('checked', options.checked, async (harness, checked) => (await harness.isChecked()) == checked));
    }
    async toggle() {
        const elToClick = (await this.isDisabled()) ? this._inputContainer() : this._input();
        return (await elToClick).click();
    }
}
MatCheckboxHarness.hostSelector = '.mat-mdc-checkbox';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jaGVja2JveC90ZXN0aW5nL2NoZWNrYm94LWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLGdCQUFnQixFQUVoQixnQkFBZ0IsR0FFakIsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUU1RCxNQUFNLE9BQWdCLHVCQUF3QixTQUFRLGdCQUFnQjtJQUlwRSx1Q0FBdUM7SUFDdkMsS0FBSyxDQUFDLFNBQVM7UUFDYixNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFVLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8scUJBQXFCLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQseURBQXlEO0lBQ3pELEtBQUssQ0FBQyxlQUFlO1FBQ25CLE1BQU0sYUFBYSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQVMsZUFBZSxDQUFDLENBQUM7UUFDakYsT0FBTyxxQkFBcUIsQ0FBQyxNQUFNLGFBQWEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCx3Q0FBd0M7SUFDeEMsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8scUJBQXFCLENBQUMsTUFBTSxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLEtBQUssQ0FBQyxVQUFVO1FBQ2QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFN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O2FBQ2hDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUNwRCxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUM5RDtZQUNELG9GQUFvRjtZQUNwRixxRkFBcUY7WUFDckYsbUZBQW1GO2FBQ2xGLFNBQVMsQ0FDUixNQUFNLEVBQ04sT0FBTyxDQUFDLElBQUksRUFDWixLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FDNUQ7YUFDQSxTQUFTLENBQ1IsU0FBUyxFQUNULE9BQU8sQ0FBQyxPQUFPLEVBQ2YsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxPQUFPLENBQ25FLENBQ0osQ0FBQztJQUNKLENBQUM7SUFNRCxLQUFLLENBQUMsTUFBTTtRQUNWLE1BQU0sU0FBUyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckYsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7QUExQ00sK0JBQVksR0FBRyxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBBc3luY0ZhY3RvcnlGbixcbiAgQ29tcG9uZW50SGFybmVzcyxcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBUZXN0RWxlbWVudCxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtDaGVja2JveEhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2NoZWNrYm94LWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIF9NYXRDaGVja2JveEhhcm5lc3NCYXNlIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfaW5wdXQ6IEFzeW5jRmFjdG9yeUZuPFRlc3RFbGVtZW50PjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9sYWJlbDogQXN5bmNGYWN0b3J5Rm48VGVzdEVsZW1lbnQ+O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBjaGVja2VkLiAqL1xuICBhc3luYyBpc0NoZWNrZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgY2hlY2tlZCA9IChhd2FpdCB0aGlzLl9pbnB1dCgpKS5nZXRQcm9wZXJ0eTxib29sZWFuPignY2hlY2tlZCcpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgY2hlY2tlZCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgaW4gYW4gaW5kZXRlcm1pbmF0ZSBzdGF0ZS4gKi9cbiAgYXN5bmMgaXNJbmRldGVybWluYXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGluZGV0ZXJtaW5hdGUgPSAoYXdhaXQgdGhpcy5faW5wdXQoKSkuZ2V0UHJvcGVydHk8c3RyaW5nPignaW5kZXRlcm1pbmF0ZScpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgaW5kZXRlcm1pbmF0ZSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSAoYXdhaXQgdGhpcy5faW5wdXQoKSkuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgZGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIHJlcXVpcmVkLiAqL1xuICBhc3luYyBpc1JlcXVpcmVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlcXVpcmVkID0gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldFByb3BlcnR5PGJvb2xlYW4+KCdyZXF1aXJlZCcpO1xuICAgIHJldHVybiBjb2VyY2VCb29sZWFuUHJvcGVydHkoYXdhaXQgcmVxdWlyZWQpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIHZhbGlkLiAqL1xuICBhc3luYyBpc1ZhbGlkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGludmFsaWQgPSAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCduZy1pbnZhbGlkJyk7XG4gICAgcmV0dXJuICEoYXdhaXQgaW52YWxpZCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY2hlY2tib3gncyBuYW1lLiAqL1xuICBhc3luYyBnZXROYW1lKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5faW5wdXQoKSkuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY2hlY2tib3gncyB2YWx1ZS4gKi9cbiAgYXN5bmMgZ2V0VmFsdWUoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5nZXRQcm9wZXJ0eTxzdHJpbmcgfCBudWxsPigndmFsdWUnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBjaGVja2JveCdzIGFyaWEtbGFiZWwuICovXG4gIGFzeW5jIGdldEFyaWFMYWJlbCgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGNoZWNrYm94J3MgYXJpYS1sYWJlbGxlZGJ5LiAqL1xuICBhc3luYyBnZXRBcmlhTGFiZWxsZWRieSgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5Jyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY2hlY2tib3gncyBsYWJlbCB0ZXh0LiAqL1xuICBhc3luYyBnZXRMYWJlbFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2xhYmVsKCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBjaGVja2JveC4gKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEJsdXJzIHRoZSBjaGVja2JveC4gKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2lucHV0KCkpLmJsdXIoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBmb2N1c2VkLiAqL1xuICBhc3luYyBpc0ZvY3VzZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9pbnB1dCgpKS5pc0ZvY3VzZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSBjaGVja2JveC5cbiAgICpcbiAgICogTm90ZTogVGhpcyBhdHRlbXB0cyB0byB0b2dnbGUgdGhlIGNoZWNrYm94IGFzIGEgdXNlciB3b3VsZCwgYnkgY2xpY2tpbmcgaXQuIFRoZXJlZm9yZSBpZiB5b3VcbiAgICogYXJlIHVzaW5nIGBNQVRfQ0hFQ0tCT1hfREVGQVVMVF9PUFRJT05TYCB0byBjaGFuZ2UgdGhlIGJlaGF2aW9yIG9uIGNsaWNrLCBjYWxsaW5nIHRoaXMgbWV0aG9kXG4gICAqIG1pZ2h0IG5vdCBoYXZlIHRoZSBleHBlY3RlZCByZXN1bHQuXG4gICAqL1xuICBhYnN0cmFjdCB0b2dnbGUoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUHV0cyB0aGUgY2hlY2tib3ggaW4gYSBjaGVja2VkIHN0YXRlIGJ5IHRvZ2dsaW5nIGl0IGlmIGl0IGlzIGN1cnJlbnRseSB1bmNoZWNrZWQsIG9yIGRvaW5nXG4gICAqIG5vdGhpbmcgaWYgaXQgaXMgYWxyZWFkeSBjaGVja2VkLlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGF0dGVtcHRzIHRvIGNoZWNrIHRoZSBjaGVja2JveCBhcyBhIHVzZXIgd291bGQsIGJ5IGNsaWNraW5nIGl0LiBUaGVyZWZvcmUgaWYgeW91XG4gICAqIGFyZSB1c2luZyBgTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OU2AgdG8gY2hhbmdlIHRoZSBiZWhhdmlvciBvbiBjbGljaywgY2FsbGluZyB0aGlzIG1ldGhvZFxuICAgKiBtaWdodCBub3QgaGF2ZSB0aGUgZXhwZWN0ZWQgcmVzdWx0LlxuICAgKi9cbiAgYXN5bmMgY2hlY2soKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCEoYXdhaXQgdGhpcy5pc0NoZWNrZWQoKSkpIHtcbiAgICAgIGF3YWl0IHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1dHMgdGhlIGNoZWNrYm94IGluIGFuIHVuY2hlY2tlZCBzdGF0ZSBieSB0b2dnbGluZyBpdCBpZiBpdCBpcyBjdXJyZW50bHkgY2hlY2tlZCwgb3IgZG9pbmdcbiAgICogbm90aGluZyBpZiBpdCBpcyBhbHJlYWR5IHVuY2hlY2tlZC5cbiAgICpcbiAgICogTm90ZTogVGhpcyBhdHRlbXB0cyB0byB1bmNoZWNrIHRoZSBjaGVja2JveCBhcyBhIHVzZXIgd291bGQsIGJ5IGNsaWNraW5nIGl0LiBUaGVyZWZvcmUgaWYgeW91XG4gICAqIGFyZSB1c2luZyBgTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OU2AgdG8gY2hhbmdlIHRoZSBiZWhhdmlvciBvbiBjbGljaywgY2FsbGluZyB0aGlzIG1ldGhvZFxuICAgKiBtaWdodCBub3QgaGF2ZSB0aGUgZXhwZWN0ZWQgcmVzdWx0LlxuICAgKi9cbiAgYXN5bmMgdW5jaGVjaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoYXdhaXQgdGhpcy5pc0NoZWNrZWQoKSkge1xuICAgICAgYXdhaXQgdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBNREMtYmFzZWQgbWF0LWNoZWNrYm94IGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoZWNrYm94SGFybmVzcyBleHRlbmRzIF9NYXRDaGVja2JveEhhcm5lc3NCYXNlIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1jaGVja2JveCc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgY2hlY2tib3ggd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaDpcbiAgICogICAtIGBzZWxlY3RvcmAgZmluZHMgYSBjaGVja2JveCB3aG9zZSBob3N0IGVsZW1lbnQgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXG4gICAqICAgLSBgbGFiZWxgIGZpbmRzIGEgY2hlY2tib3ggd2l0aCBzcGVjaWZpYyBsYWJlbCB0ZXh0LlxuICAgKiAgIC0gYG5hbWVgIGZpbmRzIGEgY2hlY2tib3ggd2l0aCBzcGVjaWZpYyBuYW1lLlxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoPFQgZXh0ZW5kcyBNYXRDaGVja2JveEhhcm5lc3M+KFxuICAgIHRoaXM6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxUPixcbiAgICBvcHRpb25zOiBDaGVja2JveEhhcm5lc3NGaWx0ZXJzID0ge30sXG4gICk6IEhhcm5lc3NQcmVkaWNhdGU8VD4ge1xuICAgIHJldHVybiAoXG4gICAgICBuZXcgSGFybmVzc1ByZWRpY2F0ZSh0aGlzLCBvcHRpb25zKVxuICAgICAgICAuYWRkT3B0aW9uKCdsYWJlbCcsIG9wdGlvbnMubGFiZWwsIChoYXJuZXNzLCBsYWJlbCkgPT5cbiAgICAgICAgICBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRMYWJlbFRleHQoKSwgbGFiZWwpLFxuICAgICAgICApXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gcHJvdmlkZSBhIGZpbHRlciBvcHRpb24gZm9yIFwibmFtZVwiIGJlY2F1c2UgdGhlIG5hbWUgb2YgdGhlIGNoZWNrYm94IGlzXG4gICAgICAgIC8vIG9ubHkgc2V0IG9uIHRoZSB1bmRlcmx5aW5nIGlucHV0LiBUaGlzIG1lYW5zIHRoYXQgaXQncyBub3QgcG9zc2libGUgZm9yIGRldmVsb3BlcnNcbiAgICAgICAgLy8gdG8gcmV0cmlldmUgdGhlIGhhcm5lc3Mgb2YgYSBzcGVjaWZpYyBjaGVja2JveCB3aXRoIG5hbWUgdGhyb3VnaCBhIENTUyBzZWxlY3Rvci5cbiAgICAgICAgLmFkZE9wdGlvbihcbiAgICAgICAgICAnbmFtZScsXG4gICAgICAgICAgb3B0aW9ucy5uYW1lLFxuICAgICAgICAgIGFzeW5jIChoYXJuZXNzLCBuYW1lKSA9PiAoYXdhaXQgaGFybmVzcy5nZXROYW1lKCkpID09PSBuYW1lLFxuICAgICAgICApXG4gICAgICAgIC5hZGRPcHRpb24oXG4gICAgICAgICAgJ2NoZWNrZWQnLFxuICAgICAgICAgIG9wdGlvbnMuY2hlY2tlZCxcbiAgICAgICAgICBhc3luYyAoaGFybmVzcywgY2hlY2tlZCkgPT4gKGF3YWl0IGhhcm5lc3MuaXNDaGVja2VkKCkpID09IGNoZWNrZWQsXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbnB1dCA9IHRoaXMubG9jYXRvckZvcignaW5wdXQnKTtcbiAgcHJvdGVjdGVkIF9sYWJlbCA9IHRoaXMubG9jYXRvckZvcignbGFiZWwnKTtcbiAgcHJpdmF0ZSBfaW5wdXRDb250YWluZXIgPSB0aGlzLmxvY2F0b3JGb3IoJy5tZGMtY2hlY2tib3gnKTtcblxuICBhc3luYyB0b2dnbGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZWxUb0NsaWNrID0gKGF3YWl0IHRoaXMuaXNEaXNhYmxlZCgpKSA/IHRoaXMuX2lucHV0Q29udGFpbmVyKCkgOiB0aGlzLl9pbnB1dCgpO1xuICAgIHJldHVybiAoYXdhaXQgZWxUb0NsaWNrKS5jbGljaygpO1xuICB9XG59XG4iXX0=