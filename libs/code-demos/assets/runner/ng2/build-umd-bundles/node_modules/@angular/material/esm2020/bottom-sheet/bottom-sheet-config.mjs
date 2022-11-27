/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/** Injection token that can be used to access the data that was passed in to a bottom sheet. */
export const MAT_BOTTOM_SHEET_DATA = new InjectionToken('MatBottomSheetData');
/**
 * Configuration used when opening a bottom sheet.
 */
export class MatBottomSheetConfig {
    constructor() {
        /** Data being injected into the child component. */
        this.data = null;
        /** Whether the bottom sheet has a backdrop. */
        this.hasBackdrop = true;
        /** Whether the user can use escape or clicking outside to close the bottom sheet. */
        this.disableClose = false;
        /** Aria label to assign to the bottom sheet element. */
        this.ariaLabel = null;
        /** Whether this is a modal bottom sheet. Used to set the `aria-modal` attribute. */
        this.ariaModal = true;
        /**
         * Whether the bottom sheet should close when the user goes backwards/forwards in history.
         * Note that this usually doesn't include clicking on links (unless the user is using
         * the `HashLocationStrategy`).
         */
        this.closeOnNavigation = true;
        // Note that this is set to 'dialog' by default, because while the a11y recommendations
        // are to focus the first focusable element, doing so prevents screen readers from reading out the
        // rest of the bottom sheet content.
        /**
         * Where the bottom sheet should focus on open.
         * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or
         * AutoFocusTarget instead.
         */
        this.autoFocus = 'dialog';
        /**
         * Whether the bottom sheet should restore focus to the
         * previously-focused element, after it's closed.
         */
        this.restoreFocus = true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLXNoZWV0LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9ib3R0b20tc2hlZXQvYm90dG9tLXNoZWV0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxPQUFPLEVBQUMsY0FBYyxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUsvRCxnR0FBZ0c7QUFDaEcsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQU0sb0JBQW9CLENBQUMsQ0FBQztBQUVuRjs7R0FFRztBQUNILE1BQU0sT0FBTyxvQkFBb0I7SUFBakM7UUFVRSxvREFBb0Q7UUFDcEQsU0FBSSxHQUFjLElBQUksQ0FBQztRQUV2QiwrQ0FBK0M7UUFDL0MsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFLN0IscUZBQXFGO1FBQ3JGLGlCQUFZLEdBQWEsS0FBSyxDQUFDO1FBRS9CLHdEQUF3RDtRQUN4RCxjQUFTLEdBQW1CLElBQUksQ0FBQztRQUVqQyxvRkFBb0Y7UUFDcEYsY0FBUyxHQUFhLElBQUksQ0FBQztRQUUzQjs7OztXQUlHO1FBQ0gsc0JBQWlCLEdBQWEsSUFBSSxDQUFDO1FBRW5DLHVGQUF1RjtRQUN2RixrR0FBa0c7UUFDbEcsb0NBQW9DO1FBQ3BDOzs7O1dBSUc7UUFDSCxjQUFTLEdBQXdDLFFBQVEsQ0FBQztRQUUxRDs7O1dBR0c7UUFDSCxpQkFBWSxHQUFhLElBQUksQ0FBQztJQUloQyxDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7U2Nyb2xsU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW4sIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogT3B0aW9ucyBmb3Igd2hlcmUgdG8gc2V0IGZvY3VzIHRvIGF1dG9tYXRpY2FsbHkgb24gZGlhbG9nIG9wZW4gKi9cbmV4cG9ydCB0eXBlIEF1dG9Gb2N1c1RhcmdldCA9ICdkaWFsb2cnIHwgJ2ZpcnN0LXRhYmJhYmxlJyB8ICdmaXJzdC1oZWFkaW5nJztcblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFjY2VzcyB0aGUgZGF0YSB0aGF0IHdhcyBwYXNzZWQgaW4gdG8gYSBib3R0b20gc2hlZXQuICovXG5leHBvcnQgY29uc3QgTUFUX0JPVFRPTV9TSEVFVF9EQVRBID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ01hdEJvdHRvbVNoZWV0RGF0YScpO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gdXNlZCB3aGVuIG9wZW5pbmcgYSBib3R0b20gc2hlZXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRCb3R0b21TaGVldENvbmZpZzxEID0gYW55PiB7XG4gIC8qKiBUaGUgdmlldyBjb250YWluZXIgdG8gcGxhY2UgdGhlIG92ZXJsYXkgZm9yIHRoZSBib3R0b20gc2hlZXQgaW50by4gKi9cbiAgdmlld0NvbnRhaW5lclJlZj86IFZpZXdDb250YWluZXJSZWY7XG5cbiAgLyoqIEV4dHJhIENTUyBjbGFzc2VzIHRvIGJlIGFkZGVkIHRvIHRoZSBib3R0b20gc2hlZXQgY29udGFpbmVyLiAqL1xuICBwYW5lbENsYXNzPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLyoqIFRleHQgbGF5b3V0IGRpcmVjdGlvbiBmb3IgdGhlIGJvdHRvbSBzaGVldC4gKi9cbiAgZGlyZWN0aW9uPzogRGlyZWN0aW9uO1xuXG4gIC8qKiBEYXRhIGJlaW5nIGluamVjdGVkIGludG8gdGhlIGNoaWxkIGNvbXBvbmVudC4gKi9cbiAgZGF0YT86IEQgfCBudWxsID0gbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgYm90dG9tIHNoZWV0IGhhcyBhIGJhY2tkcm9wLiAqL1xuICBoYXNCYWNrZHJvcD86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBiYWNrZHJvcC4gKi9cbiAgYmFja2Ryb3BDbGFzcz86IHN0cmluZztcblxuICAvKiogV2hldGhlciB0aGUgdXNlciBjYW4gdXNlIGVzY2FwZSBvciBjbGlja2luZyBvdXRzaWRlIHRvIGNsb3NlIHRoZSBib3R0b20gc2hlZXQuICovXG4gIGRpc2FibGVDbG9zZT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogQXJpYSBsYWJlbCB0byBhc3NpZ24gdG8gdGhlIGJvdHRvbSBzaGVldCBlbGVtZW50LiAqL1xuICBhcmlhTGFiZWw/OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogV2hldGhlciB0aGlzIGlzIGEgbW9kYWwgYm90dG9tIHNoZWV0LiBVc2VkIHRvIHNldCB0aGUgYGFyaWEtbW9kYWxgIGF0dHJpYnV0ZS4gKi9cbiAgYXJpYU1vZGFsPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGJvdHRvbSBzaGVldCBzaG91bGQgY2xvc2Ugd2hlbiB0aGUgdXNlciBnb2VzIGJhY2t3YXJkcy9mb3J3YXJkcyBpbiBoaXN0b3J5LlxuICAgKiBOb3RlIHRoYXQgdGhpcyB1c3VhbGx5IGRvZXNuJ3QgaW5jbHVkZSBjbGlja2luZyBvbiBsaW5rcyAodW5sZXNzIHRoZSB1c2VyIGlzIHVzaW5nXG4gICAqIHRoZSBgSGFzaExvY2F0aW9uU3RyYXRlZ3lgKS5cbiAgICovXG4gIGNsb3NlT25OYXZpZ2F0aW9uPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgLy8gTm90ZSB0aGF0IHRoaXMgaXMgc2V0IHRvICdkaWFsb2cnIGJ5IGRlZmF1bHQsIGJlY2F1c2Ugd2hpbGUgdGhlIGExMXkgcmVjb21tZW5kYXRpb25zXG4gIC8vIGFyZSB0byBmb2N1cyB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQsIGRvaW5nIHNvIHByZXZlbnRzIHNjcmVlbiByZWFkZXJzIGZyb20gcmVhZGluZyBvdXQgdGhlXG4gIC8vIHJlc3Qgb2YgdGhlIGJvdHRvbSBzaGVldCBjb250ZW50LlxuICAvKipcbiAgICogV2hlcmUgdGhlIGJvdHRvbSBzaGVldCBzaG91bGQgZm9jdXMgb24gb3Blbi5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxNC4wLjAgUmVtb3ZlIGJvb2xlYW4gb3B0aW9uIGZyb20gYXV0b0ZvY3VzLiBVc2Ugc3RyaW5nIG9yXG4gICAqIEF1dG9Gb2N1c1RhcmdldCBpbnN0ZWFkLlxuICAgKi9cbiAgYXV0b0ZvY3VzPzogQXV0b0ZvY3VzVGFyZ2V0IHwgc3RyaW5nIHwgYm9vbGVhbiA9ICdkaWFsb2cnO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBib3R0b20gc2hlZXQgc2hvdWxkIHJlc3RvcmUgZm9jdXMgdG8gdGhlXG4gICAqIHByZXZpb3VzbHktZm9jdXNlZCBlbGVtZW50LCBhZnRlciBpdCdzIGNsb3NlZC5cbiAgICovXG4gIHJlc3RvcmVGb2N1cz86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTY3JvbGwgc3RyYXRlZ3kgdG8gYmUgdXNlZCBmb3IgdGhlIGJvdHRvbSBzaGVldC4gKi9cbiAgc2Nyb2xsU3RyYXRlZ3k/OiBTY3JvbGxTdHJhdGVneTtcbn1cbiJdfQ==