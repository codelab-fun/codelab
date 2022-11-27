/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ContentContainerComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
export class _MatSnackBarHarnessBase extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._snackBarLiveRegion = this.locatorFor('[aria-live]');
    }
    /**
     * Gets the role of the snack-bar. The role of a snack-bar is determined based
     * on the ARIA politeness specified in the snack-bar config.
     * @deprecated Use `getAriaLive` instead.
     * @breaking-change 13.0.0
     */
    async getRole() {
        return (await this.host()).getAttribute('role');
    }
    /**
     * Gets the aria-live of the snack-bar's live region. The aria-live of a snack-bar is
     * determined based on the ARIA politeness specified in the snack-bar config.
     */
    async getAriaLive() {
        return (await this._snackBarLiveRegion()).getAttribute('aria-live');
    }
    /**
     * Whether the snack-bar has an action. Method cannot be used for snack-bar's with custom content.
     */
    async hasAction() {
        await this._assertContentAnnotated();
        return (await this._getActionButton()) !== null;
    }
    /**
     * Gets the description of the snack-bar. Method cannot be used for snack-bar's without action or
     * with custom content.
     */
    async getActionDescription() {
        await this._assertHasAction();
        return (await this._getActionButton()).text();
    }
    /**
     * Dismisses the snack-bar by clicking the action button. Method cannot be used for snack-bar's
     * without action or with custom content.
     */
    async dismissWithAction() {
        await this._assertHasAction();
        await (await this._getActionButton()).click();
    }
    /**
     * Gets the message of the snack-bar. Method cannot be used for snack-bar's with custom content.
     */
    async getMessage() {
        await this._assertContentAnnotated();
        return (await this.locatorFor(this._messageSelector)()).text();
    }
    /** Gets whether the snack-bar has been dismissed. */
    async isDismissed() {
        // We consider the snackbar dismissed if it's not in the DOM. We can assert that the
        // element isn't in the DOM by seeing that its width and height are zero.
        const host = await this.host();
        const [exit, dimensions] = await parallel(() => [
            // The snackbar container is marked with the "exit" attribute after it has been dismissed
            // but before the animation has finished (after which it's removed from the DOM).
            host.getAttribute('mat-exit'),
            host.getDimensions(),
        ]);
        return exit != null || (!!dimensions && dimensions.height === 0 && dimensions.width === 0);
    }
    /**
     * Asserts that the current snack-bar has an action defined. Otherwise the
     * promise will reject.
     */
    async _assertHasAction() {
        await this._assertContentAnnotated();
        if (!(await this.hasAction())) {
            throw Error('Method cannot be used for a snack-bar without an action.');
        }
    }
    /** Gets the simple snack bar action button. */
    async _getActionButton() {
        return this.locatorForOptional(this._actionButtonSelector)();
    }
}
/** Harness for interacting with an MDC-based mat-snack-bar in tests. */
export class MatSnackBarHarness extends _MatSnackBarHarnessBase {
    constructor() {
        super(...arguments);
        this._messageSelector = '.mdc-snackbar__label';
        this._actionButtonSelector = '.mat-mdc-snack-bar-action';
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSnackBarHarness` that meets
     * certain criteria.
     * @param options Options for filtering which snack bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSnackBarHarness, options);
    }
    /**
     * Asserts that the current snack-bar has annotated content. Promise reject
     * if content is not annotated.
     */
    async _assertContentAnnotated() { }
}
// Developers can provide a custom component or template for the
// snackbar. The canonical snack-bar parent is the "MatSnackBarContainer".
/** The selector for the host element of a `MatSnackBar` instance. */
MatSnackBarHarness.hostSelector = '.mat-mdc-snack-bar-container:not([mat-exit])';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc25hY2stYmFyL3Rlc3Rpbmcvc25hY2stYmFyLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdDQUFnQyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBSWxHLE1BQU0sT0FBZ0IsdUJBQXdCLFNBQVEsZ0NBQXdDO0lBQTlGOztRQUlVLHdCQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUE2Ri9ELENBQUM7SUEzRkM7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsT0FBTztRQUNYLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQXVDLENBQUM7SUFDeEYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxXQUFXO1FBQ2YsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQ3BELFdBQVcsQ0FDbUIsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsU0FBUztRQUNiLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDckMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxvQkFBb0I7UUFDeEIsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsaUJBQWlCO1FBQ3JCLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUIsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDckMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakUsQ0FBQztJQUVELHFEQUFxRDtJQUNyRCxLQUFLLENBQUMsV0FBVztRQUNmLG9GQUFvRjtRQUNwRix5RUFBeUU7UUFFekUsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM5Qyx5RkFBeUY7WUFDekYsaUZBQWlGO1lBQ2pGLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUU7U0FDckIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFRRDs7O09BR0c7SUFDTyxLQUFLLENBQUMsZ0JBQWdCO1FBQzlCLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRTtZQUM3QixNQUFNLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1NBQ3pFO0lBQ0gsQ0FBQztJQUVELCtDQUErQztJQUN2QyxLQUFLLENBQUMsZ0JBQWdCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUM7SUFDL0QsQ0FBQztDQUNGO0FBRUQsd0VBQXdFO0FBQ3hFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSx1QkFBdUI7SUFBL0Q7O1FBS3FCLHFCQUFnQixHQUFHLHNCQUFzQixDQUFDO1FBQzFDLDBCQUFxQixHQUFHLDJCQUEyQixDQUFDO0lBaUJ6RSxDQUFDO0lBZkM7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQWtDLEVBQUU7UUFDOUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7O09BR0c7SUFDZ0IsS0FBSyxDQUFDLHVCQUF1QixLQUFJLENBQUM7O0FBckJyRCxnRUFBZ0U7QUFDaEUsMEVBQTBFO0FBQzFFLHFFQUFxRTtBQUM5RCwrQkFBWSxHQUFHLDhDQUE4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29udGVudENvbnRhaW5lckNvbXBvbmVudEhhcm5lc3MsIEhhcm5lc3NQcmVkaWNhdGUsIHBhcmFsbGVsfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0FyaWFMaXZlUG9saXRlbmVzc30gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtTbmFja0Jhckhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL3NuYWNrLWJhci1oYXJuZXNzLWZpbHRlcnMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgX01hdFNuYWNrQmFySGFybmVzc0Jhc2UgZXh0ZW5kcyBDb250ZW50Q29udGFpbmVyQ29tcG9uZW50SGFybmVzczxzdHJpbmc+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9tZXNzYWdlU2VsZWN0b3I6IHN0cmluZztcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9hY3Rpb25CdXR0b25TZWxlY3Rvcjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3NuYWNrQmFyTGl2ZVJlZ2lvbiA9IHRoaXMubG9jYXRvckZvcignW2FyaWEtbGl2ZV0nKTtcblxuICAvKipcbiAgICogR2V0cyB0aGUgcm9sZSBvZiB0aGUgc25hY2stYmFyLiBUaGUgcm9sZSBvZiBhIHNuYWNrLWJhciBpcyBkZXRlcm1pbmVkIGJhc2VkXG4gICAqIG9uIHRoZSBBUklBIHBvbGl0ZW5lc3Mgc3BlY2lmaWVkIGluIHRoZSBzbmFjay1iYXIgY29uZmlnLlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYGdldEFyaWFMaXZlYCBpbnN0ZWFkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMFxuICAgKi9cbiAgYXN5bmMgZ2V0Um9sZSgpOiBQcm9taXNlPCdhbGVydCcgfCAnc3RhdHVzJyB8IG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSBhcyBQcm9taXNlPCdhbGVydCcgfCAnc3RhdHVzJyB8IG51bGw+O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGFyaWEtbGl2ZSBvZiB0aGUgc25hY2stYmFyJ3MgbGl2ZSByZWdpb24uIFRoZSBhcmlhLWxpdmUgb2YgYSBzbmFjay1iYXIgaXNcbiAgICogZGV0ZXJtaW5lZCBiYXNlZCBvbiB0aGUgQVJJQSBwb2xpdGVuZXNzIHNwZWNpZmllZCBpbiB0aGUgc25hY2stYmFyIGNvbmZpZy5cbiAgICovXG4gIGFzeW5jIGdldEFyaWFMaXZlKCk6IFByb21pc2U8QXJpYUxpdmVQb2xpdGVuZXNzPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9zbmFja0JhckxpdmVSZWdpb24oKSkuZ2V0QXR0cmlidXRlKFxuICAgICAgJ2FyaWEtbGl2ZScsXG4gICAgKSBhcyBQcm9taXNlPEFyaWFMaXZlUG9saXRlbmVzcz47XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgc25hY2stYmFyIGhhcyBhbiBhY3Rpb24uIE1ldGhvZCBjYW5ub3QgYmUgdXNlZCBmb3Igc25hY2stYmFyJ3Mgd2l0aCBjdXN0b20gY29udGVudC5cbiAgICovXG4gIGFzeW5jIGhhc0FjdGlvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBhd2FpdCB0aGlzLl9hc3NlcnRDb250ZW50QW5ub3RhdGVkKCk7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9nZXRBY3Rpb25CdXR0b24oKSkgIT09IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIHNuYWNrLWJhci4gTWV0aG9kIGNhbm5vdCBiZSB1c2VkIGZvciBzbmFjay1iYXIncyB3aXRob3V0IGFjdGlvbiBvclxuICAgKiB3aXRoIGN1c3RvbSBjb250ZW50LlxuICAgKi9cbiAgYXN5bmMgZ2V0QWN0aW9uRGVzY3JpcHRpb24oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBhd2FpdCB0aGlzLl9hc3NlcnRIYXNBY3Rpb24oKTtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX2dldEFjdGlvbkJ1dHRvbigpKSEudGV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc21pc3NlcyB0aGUgc25hY2stYmFyIGJ5IGNsaWNraW5nIHRoZSBhY3Rpb24gYnV0dG9uLiBNZXRob2QgY2Fubm90IGJlIHVzZWQgZm9yIHNuYWNrLWJhcidzXG4gICAqIHdpdGhvdXQgYWN0aW9uIG9yIHdpdGggY3VzdG9tIGNvbnRlbnQuXG4gICAqL1xuICBhc3luYyBkaXNtaXNzV2l0aEFjdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl9hc3NlcnRIYXNBY3Rpb24oKTtcbiAgICBhd2FpdCAoYXdhaXQgdGhpcy5fZ2V0QWN0aW9uQnV0dG9uKCkpIS5jbGljaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1lc3NhZ2Ugb2YgdGhlIHNuYWNrLWJhci4gTWV0aG9kIGNhbm5vdCBiZSB1c2VkIGZvciBzbmFjay1iYXIncyB3aXRoIGN1c3RvbSBjb250ZW50LlxuICAgKi9cbiAgYXN5bmMgZ2V0TWVzc2FnZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHRoaXMuX2Fzc2VydENvbnRlbnRBbm5vdGF0ZWQoKTtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMubG9jYXRvckZvcih0aGlzLl9tZXNzYWdlU2VsZWN0b3IpKCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIHNuYWNrLWJhciBoYXMgYmVlbiBkaXNtaXNzZWQuICovXG4gIGFzeW5jIGlzRGlzbWlzc2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIC8vIFdlIGNvbnNpZGVyIHRoZSBzbmFja2JhciBkaXNtaXNzZWQgaWYgaXQncyBub3QgaW4gdGhlIERPTS4gV2UgY2FuIGFzc2VydCB0aGF0IHRoZVxuICAgIC8vIGVsZW1lbnQgaXNuJ3QgaW4gdGhlIERPTSBieSBzZWVpbmcgdGhhdCBpdHMgd2lkdGggYW5kIGhlaWdodCBhcmUgemVyby5cblxuICAgIGNvbnN0IGhvc3QgPSBhd2FpdCB0aGlzLmhvc3QoKTtcbiAgICBjb25zdCBbZXhpdCwgZGltZW5zaW9uc10gPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbXG4gICAgICAvLyBUaGUgc25hY2tiYXIgY29udGFpbmVyIGlzIG1hcmtlZCB3aXRoIHRoZSBcImV4aXRcIiBhdHRyaWJ1dGUgYWZ0ZXIgaXQgaGFzIGJlZW4gZGlzbWlzc2VkXG4gICAgICAvLyBidXQgYmVmb3JlIHRoZSBhbmltYXRpb24gaGFzIGZpbmlzaGVkIChhZnRlciB3aGljaCBpdCdzIHJlbW92ZWQgZnJvbSB0aGUgRE9NKS5cbiAgICAgIGhvc3QuZ2V0QXR0cmlidXRlKCdtYXQtZXhpdCcpLFxuICAgICAgaG9zdC5nZXREaW1lbnNpb25zKCksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gZXhpdCAhPSBudWxsIHx8ICghIWRpbWVuc2lvbnMgJiYgZGltZW5zaW9ucy5oZWlnaHQgPT09IDAgJiYgZGltZW5zaW9ucy53aWR0aCA9PT0gMCk7XG4gIH1cblxuICAvKipcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSBjdXJyZW50IHNuYWNrLWJhciBoYXMgYW5ub3RhdGVkIGNvbnRlbnQuIFByb21pc2UgcmVqZWN0XG4gICAqIGlmIGNvbnRlbnQgaXMgbm90IGFubm90YXRlZC5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfYXNzZXJ0Q29udGVudEFubm90YXRlZCgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIGN1cnJlbnQgc25hY2stYmFyIGhhcyBhbiBhY3Rpb24gZGVmaW5lZC4gT3RoZXJ3aXNlIHRoZVxuICAgKiBwcm9taXNlIHdpbGwgcmVqZWN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIF9hc3NlcnRIYXNBY3Rpb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5fYXNzZXJ0Q29udGVudEFubm90YXRlZCgpO1xuICAgIGlmICghKGF3YWl0IHRoaXMuaGFzQWN0aW9uKCkpKSB7XG4gICAgICB0aHJvdyBFcnJvcignTWV0aG9kIGNhbm5vdCBiZSB1c2VkIGZvciBhIHNuYWNrLWJhciB3aXRob3V0IGFuIGFjdGlvbi4nKTtcbiAgICB9XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2ltcGxlIHNuYWNrIGJhciBhY3Rpb24gYnV0dG9uLiAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXRBY3Rpb25CdXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvck9wdGlvbmFsKHRoaXMuX2FjdGlvbkJ1dHRvblNlbGVjdG9yKSgpO1xuICB9XG59XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtc25hY2stYmFyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNuYWNrQmFySGFybmVzcyBleHRlbmRzIF9NYXRTbmFja0Jhckhhcm5lc3NCYXNlIHtcbiAgLy8gRGV2ZWxvcGVycyBjYW4gcHJvdmlkZSBhIGN1c3RvbSBjb21wb25lbnQgb3IgdGVtcGxhdGUgZm9yIHRoZVxuICAvLyBzbmFja2Jhci4gVGhlIGNhbm9uaWNhbCBzbmFjay1iYXIgcGFyZW50IGlzIHRoZSBcIk1hdFNuYWNrQmFyQ29udGFpbmVyXCIuXG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0U25hY2tCYXJgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXNuYWNrLWJhci1jb250YWluZXI6bm90KFttYXQtZXhpdF0pJztcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9tZXNzYWdlU2VsZWN0b3IgPSAnLm1kYy1zbmFja2Jhcl9fbGFiZWwnO1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2FjdGlvbkJ1dHRvblNlbGVjdG9yID0gJy5tYXQtbWRjLXNuYWNrLWJhci1hY3Rpb24nO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGBNYXRTbmFja0Jhckhhcm5lc3NgIHRoYXQgbWVldHNcbiAgICogY2VydGFpbiBjcml0ZXJpYS5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgZmlsdGVyaW5nIHdoaWNoIHNuYWNrIGJhciBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBTbmFja0Jhckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFNuYWNrQmFySGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRTbmFja0Jhckhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgY3VycmVudCBzbmFjay1iYXIgaGFzIGFubm90YXRlZCBjb250ZW50LiBQcm9taXNlIHJlamVjdFxuICAgKiBpZiBjb250ZW50IGlzIG5vdCBhbm5vdGF0ZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2Fzc2VydENvbnRlbnRBbm5vdGF0ZWQoKSB7fVxufVxuIl19