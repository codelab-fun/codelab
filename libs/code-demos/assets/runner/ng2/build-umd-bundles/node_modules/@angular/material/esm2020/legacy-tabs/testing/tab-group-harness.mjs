/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatLegacyTabHarness } from './tab-harness';
/**
 * Harness for interacting with a standard mat-tab-group in tests.
 * @deprecated Use `MatTabGroupHarness` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabGroupHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabGroupHarness` that meets
     * certain criteria.
     * @param options Options for filtering which tab group instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyTabGroupHarness, options).addOption('selectedTabLabel', options.selectedTabLabel, async (harness, label) => {
            const selectedTab = await harness.getSelectedTab();
            return HarnessPredicate.stringMatches(await selectedTab.getLabel(), label);
        });
    }
    /**
     * Gets the list of tabs in the tab group.
     * @param filter Optionally filters which tabs are included.
     */
    async getTabs(filter = {}) {
        return this.locatorForAll(MatLegacyTabHarness.with(filter))();
    }
    /** Gets the selected tab of the tab group. */
    async getSelectedTab() {
        const tabs = await this.getTabs();
        const isSelected = await parallel(() => tabs.map(t => t.isSelected()));
        for (let i = 0; i < tabs.length; i++) {
            if (isSelected[i]) {
                return tabs[i];
            }
        }
        throw new Error('No selected tab could be found.');
    }
    /**
     * Selects a tab in this tab group.
     * @param filter An optional filter to apply to the child tabs. The first tab matching the filter
     *     will be selected.
     */
    async selectTab(filter = {}) {
        const tabs = await this.getTabs(filter);
        if (!tabs.length) {
            throw Error(`Cannot find mat-tab matching filter ${JSON.stringify(filter)}`);
        }
        await tabs[0].select();
    }
}
/** The selector for the host element of a `MatTabGroup` instance. */
MatLegacyTabGroupHarness.hostSelector = '.mat-tab-group';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXRhYnMvdGVzdGluZy90YWItZ3JvdXAtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFbEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWxEOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsZ0JBQWdCO0lBSTVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FDVCxVQUF3QyxFQUFFO1FBRTFDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQ3RFLGtCQUFrQixFQUNsQixPQUFPLENBQUMsZ0JBQWdCLEVBQ3hCLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkQsT0FBTyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0UsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFrQyxFQUFFO1FBQ2hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hFLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsS0FBSyxDQUFDLGNBQWM7UUFDbEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hCO1NBQ0Y7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQWtDLEVBQUU7UUFDbEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sS0FBSyxDQUFDLHVDQUF1QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5RTtRQUNELE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7O0FBckRELHFFQUFxRTtBQUM5RCxxQ0FBWSxHQUFHLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZSwgcGFyYWxsZWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7TGVnYWN5VGFiR3JvdXBIYXJuZXNzRmlsdGVycywgTGVnYWN5VGFiSGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vdGFiLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQge01hdExlZ2FjeVRhYkhhcm5lc3N9IGZyb20gJy4vdGFiLWhhcm5lc3MnO1xuXG4vKipcbiAqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBzdGFuZGFyZCBtYXQtdGFiLWdyb3VwIGluIHRlc3RzLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRUYWJHcm91cEhhcm5lc3NgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3RhYnMvdGVzdGluZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5VGFiR3JvdXBIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0VGFiR3JvdXBgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtdGFiLWdyb3VwJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0VGFiR3JvdXBIYXJuZXNzYCB0aGF0IG1lZXRzXG4gICAqIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCB0YWIgZ3JvdXAgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgoXG4gICAgb3B0aW9uczogTGVnYWN5VGFiR3JvdXBIYXJuZXNzRmlsdGVycyA9IHt9LFxuICApOiBIYXJuZXNzUHJlZGljYXRlPE1hdExlZ2FjeVRhYkdyb3VwSGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRMZWdhY3lUYWJHcm91cEhhcm5lc3MsIG9wdGlvbnMpLmFkZE9wdGlvbihcbiAgICAgICdzZWxlY3RlZFRhYkxhYmVsJyxcbiAgICAgIG9wdGlvbnMuc2VsZWN0ZWRUYWJMYWJlbCxcbiAgICAgIGFzeW5jIChoYXJuZXNzLCBsYWJlbCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRhYiA9IGF3YWl0IGhhcm5lc3MuZ2V0U2VsZWN0ZWRUYWIoKTtcbiAgICAgICAgcmV0dXJuIEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhhd2FpdCBzZWxlY3RlZFRhYi5nZXRMYWJlbCgpLCBsYWJlbCk7XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbGlzdCBvZiB0YWJzIGluIHRoZSB0YWIgZ3JvdXAuXG4gICAqIEBwYXJhbSBmaWx0ZXIgT3B0aW9uYWxseSBmaWx0ZXJzIHdoaWNoIHRhYnMgYXJlIGluY2x1ZGVkLlxuICAgKi9cbiAgYXN5bmMgZ2V0VGFicyhmaWx0ZXI6IExlZ2FjeVRhYkhhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPE1hdExlZ2FjeVRhYkhhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0TGVnYWN5VGFiSGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2VsZWN0ZWQgdGFiIG9mIHRoZSB0YWIgZ3JvdXAuICovXG4gIGFzeW5jIGdldFNlbGVjdGVkVGFiKCk6IFByb21pc2U8TWF0TGVnYWN5VGFiSGFybmVzcz4ge1xuICAgIGNvbnN0IHRhYnMgPSBhd2FpdCB0aGlzLmdldFRhYnMoKTtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gYXdhaXQgcGFyYWxsZWwoKCkgPT4gdGFicy5tYXAodCA9PiB0LmlzU2VsZWN0ZWQoKSkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzU2VsZWN0ZWRbaV0pIHtcbiAgICAgICAgcmV0dXJuIHRhYnNbaV07XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignTm8gc2VsZWN0ZWQgdGFiIGNvdWxkIGJlIGZvdW5kLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0YWIgaW4gdGhpcyB0YWIgZ3JvdXAuXG4gICAqIEBwYXJhbSBmaWx0ZXIgQW4gb3B0aW9uYWwgZmlsdGVyIHRvIGFwcGx5IHRvIHRoZSBjaGlsZCB0YWJzLiBUaGUgZmlyc3QgdGFiIG1hdGNoaW5nIHRoZSBmaWx0ZXJcbiAgICogICAgIHdpbGwgYmUgc2VsZWN0ZWQuXG4gICAqL1xuICBhc3luYyBzZWxlY3RUYWIoZmlsdGVyOiBMZWdhY3lUYWJIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdGFicyA9IGF3YWl0IHRoaXMuZ2V0VGFicyhmaWx0ZXIpO1xuICAgIGlmICghdGFicy5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBtYXQtdGFiIG1hdGNoaW5nIGZpbHRlciAke0pTT04uc3RyaW5naWZ5KGZpbHRlcil9YCk7XG4gICAgfVxuICAgIGF3YWl0IHRhYnNbMF0uc2VsZWN0KCk7XG4gIH1cbn1cbiJdfQ==