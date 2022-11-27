/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, parallel, } from '@angular/cdk/testing';
import { MatTabLinkHarness } from './tab-link-harness';
import { MatTabNavPanelHarness } from './tab-nav-panel-harness';
/** Harness for interacting with an MDC-based mat-tab-nav-bar in tests. */
export class MatTabNavBarHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tab nav bar with specific
     * attributes.
     * @param options Options for filtering which tab nav bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
    /**
     * Gets the list of links in the nav bar.
     * @param filter Optionally filters which links are included.
     */
    async getLinks(filter = {}) {
        return this.locatorForAll(MatTabLinkHarness.with(filter))();
    }
    /** Gets the active link in the nav bar. */
    async getActiveLink() {
        const links = await this.getLinks();
        const isActive = await parallel(() => links.map(t => t.isActive()));
        for (let i = 0; i < links.length; i++) {
            if (isActive[i]) {
                return links[i];
            }
        }
        throw new Error('No active link could be found.');
    }
    /**
     * Clicks a link inside the nav bar.
     * @param filter An optional filter to apply to the child link. The first link matching the filter
     *     will be clicked.
     */
    async clickLink(filter = {}) {
        const tabs = await this.getLinks(filter);
        if (!tabs.length) {
            throw Error(`Cannot find mat-tab-link matching filter ${JSON.stringify(filter)}`);
        }
        await tabs[0].click();
    }
    /** Gets the panel associated with the nav bar. */
    async getPanel() {
        const link = await this.getActiveLink();
        const host = await link.host();
        const panelId = await host.getAttribute('aria-controls');
        if (!panelId) {
            throw Error('No panel is controlled by the nav bar.');
        }
        const filter = { selector: `#${panelId}` };
        return await this.documentRootLocatorFactory().locatorFor(MatTabNavPanelHarness.with(filter))();
    }
}
/** The selector for the host element of a `MatTabNavBar` instance. */
MatTabNavBarHarness.hostSelector = '.mat-mdc-tab-nav-bar';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXItaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC90YWJzL3Rlc3RpbmcvdGFiLW5hdi1iYXItaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBRWhCLGdCQUFnQixFQUNoQixRQUFRLEdBQ1QsTUFBTSxzQkFBc0IsQ0FBQztBQU05QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCwwRUFBMEU7QUFDMUUsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBRVQsVUFBbUMsRUFBRTtRQUVyQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQWdDLEVBQUU7UUFDL0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUQsQ0FBQztJQUVELDJDQUEyQztJQUMzQyxLQUFLLENBQUMsYUFBYTtRQUNqQixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQyxNQUFNLFFBQVEsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQjtTQUNGO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFnQyxFQUFFO1FBQ2hELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLEtBQUssQ0FBQyw0Q0FBNEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkY7UUFDRCxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELEtBQUssQ0FBQyxRQUFRO1FBQ1osTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsTUFBTSxNQUFNLEdBQThCLEVBQUMsUUFBUSxFQUFFLElBQUksT0FBTyxFQUFFLEVBQUMsQ0FBQztRQUNwRSxPQUFPLE1BQU0sSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEcsQ0FBQzs7QUE1REQsc0VBQXNFO0FBQy9ELGdDQUFZLEdBQUcsc0JBQXNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50SGFybmVzcyxcbiAgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBwYXJhbGxlbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtcbiAgVGFiTmF2QmFySGFybmVzc0ZpbHRlcnMsXG4gIFRhYk5hdlBhbmVsSGFybmVzc0ZpbHRlcnMsXG4gIFRhYkxpbmtIYXJuZXNzRmlsdGVycyxcbn0gZnJvbSAnLi90YWItaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0VGFiTGlua0hhcm5lc3N9IGZyb20gJy4vdGFiLWxpbmstaGFybmVzcyc7XG5pbXBvcnQge01hdFRhYk5hdlBhbmVsSGFybmVzc30gZnJvbSAnLi90YWItbmF2LXBhbmVsLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgbWF0LXRhYi1uYXYtYmFyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFRhYk5hdkJhckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRUYWJOYXZCYXJgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXRhYi1uYXYtYmFyJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSB0YWIgbmF2IGJhciB3aXRoIHNwZWNpZmljXG4gICAqIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCB0YWIgbmF2IGJhciBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aDxUIGV4dGVuZHMgTWF0VGFiTmF2QmFySGFybmVzcz4oXG4gICAgdGhpczogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFQ+LFxuICAgIG9wdGlvbnM6IFRhYk5hdkJhckhhcm5lc3NGaWx0ZXJzID0ge30sXG4gICk6IEhhcm5lc3NQcmVkaWNhdGU8VD4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsaXN0IG9mIGxpbmtzIGluIHRoZSBuYXYgYmFyLlxuICAgKiBAcGFyYW0gZmlsdGVyIE9wdGlvbmFsbHkgZmlsdGVycyB3aGljaCBsaW5rcyBhcmUgaW5jbHVkZWQuXG4gICAqL1xuICBhc3luYyBnZXRMaW5rcyhmaWx0ZXI6IFRhYkxpbmtIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRUYWJMaW5rSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbChNYXRUYWJMaW5rSGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgYWN0aXZlIGxpbmsgaW4gdGhlIG5hdiBiYXIuICovXG4gIGFzeW5jIGdldEFjdGl2ZUxpbmsoKTogUHJvbWlzZTxNYXRUYWJMaW5rSGFybmVzcz4ge1xuICAgIGNvbnN0IGxpbmtzID0gYXdhaXQgdGhpcy5nZXRMaW5rcygpO1xuICAgIGNvbnN0IGlzQWN0aXZlID0gYXdhaXQgcGFyYWxsZWwoKCkgPT4gbGlua3MubWFwKHQgPT4gdC5pc0FjdGl2ZSgpKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzQWN0aXZlW2ldKSB7XG4gICAgICAgIHJldHVybiBsaW5rc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RpdmUgbGluayBjb3VsZCBiZSBmb3VuZC4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGlja3MgYSBsaW5rIGluc2lkZSB0aGUgbmF2IGJhci5cbiAgICogQHBhcmFtIGZpbHRlciBBbiBvcHRpb25hbCBmaWx0ZXIgdG8gYXBwbHkgdG8gdGhlIGNoaWxkIGxpbmsuIFRoZSBmaXJzdCBsaW5rIG1hdGNoaW5nIHRoZSBmaWx0ZXJcbiAgICogICAgIHdpbGwgYmUgY2xpY2tlZC5cbiAgICovXG4gIGFzeW5jIGNsaWNrTGluayhmaWx0ZXI6IFRhYkxpbmtIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdGFicyA9IGF3YWl0IHRoaXMuZ2V0TGlua3MoZmlsdGVyKTtcbiAgICBpZiAoIXRhYnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgbWF0LXRhYi1saW5rIG1hdGNoaW5nIGZpbHRlciAke0pTT04uc3RyaW5naWZ5KGZpbHRlcil9YCk7XG4gICAgfVxuICAgIGF3YWl0IHRhYnNbMF0uY2xpY2soKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBwYW5lbCBhc3NvY2lhdGVkIHdpdGggdGhlIG5hdiBiYXIuICovXG4gIGFzeW5jIGdldFBhbmVsKCk6IFByb21pc2U8TWF0VGFiTmF2UGFuZWxIYXJuZXNzPiB7XG4gICAgY29uc3QgbGluayA9IGF3YWl0IHRoaXMuZ2V0QWN0aXZlTGluaygpO1xuICAgIGNvbnN0IGhvc3QgPSBhd2FpdCBsaW5rLmhvc3QoKTtcbiAgICBjb25zdCBwYW5lbElkID0gYXdhaXQgaG9zdC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICBpZiAoIXBhbmVsSWQpIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBwYW5lbCBpcyBjb250cm9sbGVkIGJ5IHRoZSBuYXYgYmFyLicpO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbHRlcjogVGFiTmF2UGFuZWxIYXJuZXNzRmlsdGVycyA9IHtzZWxlY3RvcjogYCMke3BhbmVsSWR9YH07XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9jdW1lbnRSb290TG9jYXRvckZhY3RvcnkoKS5sb2NhdG9yRm9yKE1hdFRhYk5hdlBhbmVsSGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cbn1cbiJdfQ==