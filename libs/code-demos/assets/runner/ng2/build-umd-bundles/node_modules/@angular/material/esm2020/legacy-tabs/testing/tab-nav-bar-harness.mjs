/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatLegacyTabLinkHarness } from './tab-link-harness';
import { MatLegacyTabNavPanelHarness } from './tab-nav-panel-harness';
/**
 * Harness for interacting with a standard mat-tab-nav-bar in tests.
 * @deprecated Use `MatTabNavBarHarness` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabNavBarHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabNavBar` that meets
     * certain criteria.
     * @param options Options for filtering which tab nav bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyTabNavBarHarness, options);
    }
    /**
     * Gets the list of links in the nav bar.
     * @param filter Optionally filters which links are included.
     */
    async getLinks(filter = {}) {
        return this.locatorForAll(MatLegacyTabLinkHarness.with(filter))();
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
        return await this.documentRootLocatorFactory().locatorFor(MatLegacyTabNavPanelHarness.with(filter))();
    }
}
/** The selector for the host element of a `MatTabNavBar` instance. */
MatLegacyTabNavBarHarness.hostSelector = '.mat-tab-nav-bar';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXItaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktdGFicy90ZXN0aW5nL3RhYi1uYXYtYmFyLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBTWxGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzNELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXBFOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsZ0JBQWdCO0lBSTdEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FDVCxVQUF5QyxFQUFFO1FBRTNDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyx5QkFBeUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFzQyxFQUFFO1FBQ3JELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3BFLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsS0FBSyxDQUFDLGFBQWE7UUFDakIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakI7U0FDRjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBc0MsRUFBRTtRQUN0RCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsTUFBTSxLQUFLLENBQUMsNENBQTRDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25GO1FBQ0QsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELGtEQUFrRDtJQUNsRCxLQUFLLENBQUMsUUFBUTtRQUNaLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztTQUN2RDtRQUVELE1BQU0sTUFBTSxHQUFvQyxFQUFDLFFBQVEsRUFBRSxJQUFJLE9BQU8sRUFBRSxFQUFDLENBQUM7UUFDMUUsT0FBTyxNQUFNLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLFVBQVUsQ0FDdkQsMkJBQTJCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUN6QyxFQUFFLENBQUM7SUFDTixDQUFDOztBQTdERCxzRUFBc0U7QUFDL0Qsc0NBQVksR0FBRyxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1xuICBMZWdhY3lUYWJOYXZCYXJIYXJuZXNzRmlsdGVycyxcbiAgTGVnYWN5VGFiTmF2UGFuZWxIYXJuZXNzRmlsdGVycyxcbiAgTGVnYWN5VGFiTGlua0hhcm5lc3NGaWx0ZXJzLFxufSBmcm9tICcuL3RhYi1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRMZWdhY3lUYWJMaW5rSGFybmVzc30gZnJvbSAnLi90YWItbGluay1oYXJuZXNzJztcbmltcG9ydCB7TWF0TGVnYWN5VGFiTmF2UGFuZWxIYXJuZXNzfSBmcm9tICcuL3RhYi1uYXYtcGFuZWwtaGFybmVzcyc7XG5cbi8qKlxuICogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIHN0YW5kYXJkIG1hdC10YWItbmF2LWJhciBpbiB0ZXN0cy5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0VGFiTmF2QmFySGFybmVzc2AgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicy90ZXN0aW5nYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lUYWJOYXZCYXJIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0VGFiTmF2QmFyYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LXRhYi1uYXYtYmFyJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBgTWF0VGFiTmF2QmFyYCB0aGF0IG1lZXRzXG4gICAqIGNlcnRhaW4gY3JpdGVyaWEuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCB0YWIgbmF2IGJhciBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChcbiAgICBvcHRpb25zOiBMZWdhY3lUYWJOYXZCYXJIYXJuZXNzRmlsdGVycyA9IHt9LFxuICApOiBIYXJuZXNzUHJlZGljYXRlPE1hdExlZ2FjeVRhYk5hdkJhckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0TGVnYWN5VGFiTmF2QmFySGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbGlzdCBvZiBsaW5rcyBpbiB0aGUgbmF2IGJhci5cbiAgICogQHBhcmFtIGZpbHRlciBPcHRpb25hbGx5IGZpbHRlcnMgd2hpY2ggbGlua3MgYXJlIGluY2x1ZGVkLlxuICAgKi9cbiAgYXN5bmMgZ2V0TGlua3MoZmlsdGVyOiBMZWdhY3lUYWJMaW5rSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8TWF0TGVnYWN5VGFiTGlua0hhcm5lc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoTWF0TGVnYWN5VGFiTGlua0hhcm5lc3Mud2l0aChmaWx0ZXIpKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGFjdGl2ZSBsaW5rIGluIHRoZSBuYXYgYmFyLiAqL1xuICBhc3luYyBnZXRBY3RpdmVMaW5rKCk6IFByb21pc2U8TWF0TGVnYWN5VGFiTGlua0hhcm5lc3M+IHtcbiAgICBjb25zdCBsaW5rcyA9IGF3YWl0IHRoaXMuZ2V0TGlua3MoKTtcbiAgICBjb25zdCBpc0FjdGl2ZSA9IGF3YWl0IHBhcmFsbGVsKCgpID0+IGxpbmtzLm1hcCh0ID0+IHQuaXNBY3RpdmUoKSkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc0FjdGl2ZVtpXSkge1xuICAgICAgICByZXR1cm4gbGlua3NbaV07XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIGxpbmsgY291bGQgYmUgZm91bmQuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2xpY2tzIGEgbGluayBpbnNpZGUgdGhlIG5hdiBiYXIuXG4gICAqIEBwYXJhbSBmaWx0ZXIgQW4gb3B0aW9uYWwgZmlsdGVyIHRvIGFwcGx5IHRvIHRoZSBjaGlsZCBsaW5rLiBUaGUgZmlyc3QgbGluayBtYXRjaGluZyB0aGUgZmlsdGVyXG4gICAqICAgICB3aWxsIGJlIGNsaWNrZWQuXG4gICAqL1xuICBhc3luYyBjbGlja0xpbmsoZmlsdGVyOiBMZWdhY3lUYWJMaW5rSGFybmVzc0ZpbHRlcnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRhYnMgPSBhd2FpdCB0aGlzLmdldExpbmtzKGZpbHRlcik7XG4gICAgaWYgKCF0YWJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBmaW5kIG1hdC10YWItbGluayBtYXRjaGluZyBmaWx0ZXIgJHtKU09OLnN0cmluZ2lmeShmaWx0ZXIpfWApO1xuICAgIH1cbiAgICBhd2FpdCB0YWJzWzBdLmNsaWNrKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgcGFuZWwgYXNzb2NpYXRlZCB3aXRoIHRoZSBuYXYgYmFyLiAqL1xuICBhc3luYyBnZXRQYW5lbCgpOiBQcm9taXNlPE1hdExlZ2FjeVRhYk5hdlBhbmVsSGFybmVzcz4ge1xuICAgIGNvbnN0IGxpbmsgPSBhd2FpdCB0aGlzLmdldEFjdGl2ZUxpbmsoKTtcbiAgICBjb25zdCBob3N0ID0gYXdhaXQgbGluay5ob3N0KCk7XG4gICAgY29uc3QgcGFuZWxJZCA9IGF3YWl0IGhvc3QuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgaWYgKCFwYW5lbElkKSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gcGFuZWwgaXMgY29udHJvbGxlZCBieSB0aGUgbmF2IGJhci4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWx0ZXI6IExlZ2FjeVRhYk5hdlBhbmVsSGFybmVzc0ZpbHRlcnMgPSB7c2VsZWN0b3I6IGAjJHtwYW5lbElkfWB9O1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvY3VtZW50Um9vdExvY2F0b3JGYWN0b3J5KCkubG9jYXRvckZvcihcbiAgICAgIE1hdExlZ2FjeVRhYk5hdlBhbmVsSGFybmVzcy53aXRoKGZpbHRlciksXG4gICAgKSgpO1xuICB9XG59XG4iXX0=