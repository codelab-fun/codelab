/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ContentContainerComponentHarness, HarnessPredicate, TestKey, } from '@angular/cdk/testing';
/** Base class for the `MatDialogHarness` implementation. */
export class _MatDialogHarnessBase
// @breaking-change 14.0.0 change generic type to MatDialogSection.
 extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._title = this.locatorForOptional(".mat-mdc-dialog-title" /* MatDialogSection.TITLE */);
        this._content = this.locatorForOptional(".mat-mdc-dialog-content" /* MatDialogSection.CONTENT */);
        this._actions = this.locatorForOptional(".mat-mdc-dialog-actions" /* MatDialogSection.ACTIONS */);
    }
    /** Gets the id of the dialog. */
    async getId() {
        const id = await (await this.host()).getAttribute('id');
        // In case no id has been specified, the "id" property always returns
        // an empty string. To make this method more explicit, we return null.
        return id !== '' ? id : null;
    }
    /** Gets the role of the dialog. */
    async getRole() {
        return (await this.host()).getAttribute('role');
    }
    /** Gets the value of the dialog's "aria-label" attribute. */
    async getAriaLabel() {
        return (await this.host()).getAttribute('aria-label');
    }
    /** Gets the value of the dialog's "aria-labelledby" attribute. */
    async getAriaLabelledby() {
        return (await this.host()).getAttribute('aria-labelledby');
    }
    /** Gets the value of the dialog's "aria-describedby" attribute. */
    async getAriaDescribedby() {
        return (await this.host()).getAttribute('aria-describedby');
    }
    /**
     * Closes the dialog by pressing escape.
     *
     * Note: this method does nothing if `disableClose` has been set to `true` for the dialog.
     */
    async close() {
        await (await this.host()).sendKeys(TestKey.ESCAPE);
    }
    /** Gets te dialog's text. */
    async getText() {
        return (await this.host()).text();
    }
    /** Gets the dialog's title text. This only works if the dialog is using mat-dialog-title. */
    async getTitleText() {
        return (await this._title())?.text() ?? '';
    }
    /** Gets the dialog's content text. This only works if the dialog is using mat-dialog-content. */
    async getContentText() {
        return (await this._content())?.text() ?? '';
    }
    /** Gets the dialog's actions text. This only works if the dialog is using mat-dialog-actions. */
    async getActionsText() {
        return (await this._actions())?.text() ?? '';
    }
}
/** Harness for interacting with a standard `MatDialog` in tests. */
export class MatDialogHarness extends _MatDialogHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a dialog with specific attributes.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** The selector for the host element of a `MatDialog` instance. */
MatDialogHarness.hostSelector = '.mat-mdc-dialog-container';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZGlhbG9nL3Rlc3RpbmcvZGlhbG9nLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLGdDQUFnQyxFQUNoQyxnQkFBZ0IsRUFDaEIsT0FBTyxHQUNSLE1BQU0sc0JBQXNCLENBQUM7QUFXOUIsNERBQTREO0FBQzVELE1BQU0sT0FBTyxxQkFBcUI7QUFDaEMsbUVBQW1FO0FBQ25FLFNBQVEsZ0NBQTJEO0lBRnJFOztRQUlZLFdBQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLHNEQUF3QixDQUFDO1FBQ3pELGFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLDBEQUEwQixDQUFDO1FBQzdELGFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLDBEQUEwQixDQUFDO0lBMER6RSxDQUFDO0lBeERDLGlDQUFpQztJQUNqQyxLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxxRUFBcUU7UUFDckUsc0VBQXNFO1FBQ3RFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxLQUFLLENBQUMsT0FBTztRQUNYLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQStCLENBQUM7SUFDaEYsQ0FBQztJQUVELDZEQUE2RDtJQUM3RCxLQUFLLENBQUMsWUFBWTtRQUNoQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELGtFQUFrRTtJQUNsRSxLQUFLLENBQUMsaUJBQWlCO1FBQ3JCLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtRUFBbUU7SUFDbkUsS0FBSyxDQUFDLGtCQUFrQjtRQUN0QixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsNkJBQTZCO0lBQzdCLEtBQUssQ0FBQyxPQUFPO1FBQ1gsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELDZGQUE2RjtJQUM3RixLQUFLLENBQUMsWUFBWTtRQUNoQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELGlHQUFpRztJQUNqRyxLQUFLLENBQUMsY0FBYztRQUNsQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELGlHQUFpRztJQUNqRyxLQUFLLENBQUMsY0FBYztRQUNsQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDL0MsQ0FBQztDQUNGO0FBRUQsb0VBQW9FO0FBQ3BFLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxxQkFBcUI7SUFJekQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBRVQsVUFBZ0MsRUFBRTtRQUVsQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7O0FBYkQsbUVBQW1FO0FBQzVELDZCQUFZLEdBQUcsMkJBQTJCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxuICBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzcyxcbiAgSGFybmVzc1ByZWRpY2F0ZSxcbiAgVGVzdEtleSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtEaWFsb2dIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9kaWFsb2ctaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7RGlhbG9nUm9sZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuLyoqIFNlbGVjdG9ycyBmb3IgZGlmZmVyZW50IHNlY3Rpb25zIG9mIHRoZSBtYXQtZGlhbG9nIHRoYXQgY2FuIGNvbnRhaW4gdXNlciBjb250ZW50LiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTWF0RGlhbG9nU2VjdGlvbiB7XG4gIFRJVExFID0gJy5tYXQtbWRjLWRpYWxvZy10aXRsZScsXG4gIENPTlRFTlQgPSAnLm1hdC1tZGMtZGlhbG9nLWNvbnRlbnQnLFxuICBBQ1RJT05TID0gJy5tYXQtbWRjLWRpYWxvZy1hY3Rpb25zJyxcbn1cblxuLyoqIEJhc2UgY2xhc3MgZm9yIHRoZSBgTWF0RGlhbG9nSGFybmVzc2AgaW1wbGVtZW50YXRpb24uICovXG5leHBvcnQgY2xhc3MgX01hdERpYWxvZ0hhcm5lc3NCYXNlXG4gIC8vIEBicmVha2luZy1jaGFuZ2UgMTQuMC4wIGNoYW5nZSBnZW5lcmljIHR5cGUgdG8gTWF0RGlhbG9nU2VjdGlvbi5cbiAgZXh0ZW5kcyBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzczxNYXREaWFsb2dTZWN0aW9uIHwgc3RyaW5nPlxue1xuICBwcm90ZWN0ZWQgX3RpdGxlID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoTWF0RGlhbG9nU2VjdGlvbi5USVRMRSk7XG4gIHByb3RlY3RlZCBfY29udGVudCA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdERpYWxvZ1NlY3Rpb24uQ09OVEVOVCk7XG4gIHByb3RlY3RlZCBfYWN0aW9ucyA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKE1hdERpYWxvZ1NlY3Rpb24uQUNUSU9OUyk7XG5cbiAgLyoqIEdldHMgdGhlIGlkIG9mIHRoZSBkaWFsb2cuICovXG4gIGFzeW5jIGdldElkKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIGNvbnN0IGlkID0gYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgLy8gSW4gY2FzZSBubyBpZCBoYXMgYmVlbiBzcGVjaWZpZWQsIHRoZSBcImlkXCIgcHJvcGVydHkgYWx3YXlzIHJldHVybnNcbiAgICAvLyBhbiBlbXB0eSBzdHJpbmcuIFRvIG1ha2UgdGhpcyBtZXRob2QgbW9yZSBleHBsaWNpdCwgd2UgcmV0dXJuIG51bGwuXG4gICAgcmV0dXJuIGlkICE9PSAnJyA/IGlkIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSByb2xlIG9mIHRoZSBkaWFsb2cuICovXG4gIGFzeW5jIGdldFJvbGUoKTogUHJvbWlzZTxEaWFsb2dSb2xlIHwgbnVsbD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgncm9sZScpIGFzIFByb21pc2U8RGlhbG9nUm9sZSB8IG51bGw+O1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIG9mIHRoZSBkaWFsb2cncyBcImFyaWEtbGFiZWxcIiBhdHRyaWJ1dGUuICovXG4gIGFzeW5jIGdldEFyaWFMYWJlbCgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZGlhbG9nJ3MgXCJhcmlhLWxhYmVsbGVkYnlcIiBhdHRyaWJ1dGUuICovXG4gIGFzeW5jIGdldEFyaWFMYWJlbGxlZGJ5KCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5Jyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIGRpYWxvZydzIFwiYXJpYS1kZXNjcmliZWRieVwiIGF0dHJpYnV0ZS4gKi9cbiAgYXN5bmMgZ2V0QXJpYURlc2NyaWJlZGJ5KCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgZGlhbG9nIGJ5IHByZXNzaW5nIGVzY2FwZS5cbiAgICpcbiAgICogTm90ZTogdGhpcyBtZXRob2QgZG9lcyBub3RoaW5nIGlmIGBkaXNhYmxlQ2xvc2VgIGhhcyBiZWVuIHNldCB0byBgdHJ1ZWAgZm9yIHRoZSBkaWFsb2cuXG4gICAqL1xuICBhc3luYyBjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLnNlbmRLZXlzKFRlc3RLZXkuRVNDQVBFKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRlIGRpYWxvZydzIHRleHQuICovXG4gIGFzeW5jIGdldFRleHQoKSB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGRpYWxvZydzIHRpdGxlIHRleHQuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgZGlhbG9nIGlzIHVzaW5nIG1hdC1kaWFsb2ctdGl0bGUuICovXG4gIGFzeW5jIGdldFRpdGxlVGV4dCgpIHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3RpdGxlKCkpPy50ZXh0KCkgPz8gJyc7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgZGlhbG9nJ3MgY29udGVudCB0ZXh0LiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGRpYWxvZyBpcyB1c2luZyBtYXQtZGlhbG9nLWNvbnRlbnQuICovXG4gIGFzeW5jIGdldENvbnRlbnRUZXh0KCkge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fY29udGVudCgpKT8udGV4dCgpID8/ICcnO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGRpYWxvZydzIGFjdGlvbnMgdGV4dC4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBkaWFsb2cgaXMgdXNpbmcgbWF0LWRpYWxvZy1hY3Rpb25zLiAqL1xuICBhc3luYyBnZXRBY3Rpb25zVGV4dCgpIHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2FjdGlvbnMoKSk/LnRleHQoKSA/PyAnJztcbiAgfVxufVxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIHN0YW5kYXJkIGBNYXREaWFsb2dgIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdERpYWxvZ0hhcm5lc3MgZXh0ZW5kcyBfTWF0RGlhbG9nSGFybmVzc0Jhc2Uge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdERpYWxvZ2AgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtZGlhbG9nLWNvbnRhaW5lcic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgZGlhbG9nIHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIGRpYWxvZyBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aDxUIGV4dGVuZHMgTWF0RGlhbG9nSGFybmVzcz4oXG4gICAgdGhpczogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFQ+LFxuICAgIG9wdGlvbnM6IERpYWxvZ0hhcm5lc3NGaWx0ZXJzID0ge30sXG4gICk6IEhhcm5lc3NQcmVkaWNhdGU8VD4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZSh0aGlzLCBvcHRpb25zKTtcbiAgfVxufVxuIl19