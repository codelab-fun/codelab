/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Subject } from 'rxjs';
/** Maximum amount of milliseconds that can be passed into setTimeout. */
const MAX_TIMEOUT = Math.pow(2, 31) - 1;
/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
export class MatSnackBarRef {
    constructor(containerInstance, _overlayRef) {
        this._overlayRef = _overlayRef;
        /** Subject for notifying the user that the snack bar has been dismissed. */
        this._afterDismissed = new Subject();
        /** Subject for notifying the user that the snack bar has opened and appeared. */
        this._afterOpened = new Subject();
        /** Subject for notifying the user that the snack bar action was called. */
        this._onAction = new Subject();
        /** Whether the snack bar was dismissed using the action button. */
        this._dismissedByAction = false;
        this.containerInstance = containerInstance;
        containerInstance._onExit.subscribe(() => this._finishDismiss());
    }
    /** Dismisses the snack bar. */
    dismiss() {
        if (!this._afterDismissed.closed) {
            this.containerInstance.exit();
        }
        clearTimeout(this._durationTimeoutId);
    }
    /** Marks the snackbar action clicked. */
    dismissWithAction() {
        if (!this._onAction.closed) {
            this._dismissedByAction = true;
            this._onAction.next();
            this._onAction.complete();
            this.dismiss();
        }
        clearTimeout(this._durationTimeoutId);
    }
    /**
     * Marks the snackbar action clicked.
     * @deprecated Use `dismissWithAction` instead.
     * @breaking-change 8.0.0
     */
    closeWithAction() {
        this.dismissWithAction();
    }
    /** Dismisses the snack bar after some duration */
    _dismissAfter(duration) {
        // Note that we need to cap the duration to the maximum value for setTimeout, because
        // it'll revert to 1 if somebody passes in something greater (e.g. `Infinity`). See #17234.
        this._durationTimeoutId = setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
    }
    /** Marks the snackbar as opened */
    _open() {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    }
    /** Cleans up the DOM after closing. */
    _finishDismiss() {
        this._overlayRef.dispose();
        if (!this._onAction.closed) {
            this._onAction.complete();
        }
        this._afterDismissed.next({ dismissedByAction: this._dismissedByAction });
        this._afterDismissed.complete();
        this._dismissedByAction = false;
    }
    /** Gets an observable that is notified when the snack bar is finished closing. */
    afterDismissed() {
        return this._afterDismissed;
    }
    /** Gets an observable that is notified when the snack bar has opened and appeared. */
    afterOpened() {
        return this.containerInstance._onEnter;
    }
    /** Gets an observable that is notified when the snack bar action is called. */
    onAction() {
        return this._onAction;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLXJlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zbmFjay1iYXIvc25hY2stYmFyLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBU3pDLHlFQUF5RTtBQUN6RSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFeEM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQTRCekIsWUFBWSxpQkFBNEMsRUFBVSxXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQWxCekYsNEVBQTRFO1FBQzNELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFFckUsaUZBQWlGO1FBQ2hFLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUVwRCwyRUFBMkU7UUFDMUQsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFRakQsbUVBQW1FO1FBQzNELHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUdqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsK0JBQStCO0lBQy9CLE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9CO1FBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx5Q0FBeUM7SUFDekMsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQzFCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtRQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGVBQWU7UUFDYixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELGFBQWEsQ0FBQyxRQUFnQjtRQUM1QixxRkFBcUY7UUFDckYsMkZBQTJGO1FBQzNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCx1Q0FBdUM7SUFDL0IsY0FBYztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELHNGQUFzRjtJQUN0RixXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO0lBQ3pDLENBQUM7SUFFRCwrRUFBK0U7SUFDL0UsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPdmVybGF5UmVmfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtfTWF0U25hY2tCYXJDb250YWluZXJCYXNlfSBmcm9tICcuL3NuYWNrLWJhci1jb250YWluZXInO1xuXG4vKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gYSBzbmFjayBiYXIgaXMgZGlzbWlzc2VkLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRTbmFja0JhckRpc21pc3Mge1xuICAvKiogV2hldGhlciB0aGUgc25hY2sgYmFyIHdhcyBkaXNtaXNzZWQgdXNpbmcgdGhlIGFjdGlvbiBidXR0b24uICovXG4gIGRpc21pc3NlZEJ5QWN0aW9uOiBib29sZWFuO1xufVxuXG4vKiogTWF4aW11bSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRoYXQgY2FuIGJlIHBhc3NlZCBpbnRvIHNldFRpbWVvdXQuICovXG5jb25zdCBNQVhfVElNRU9VVCA9IE1hdGgucG93KDIsIDMxKSAtIDE7XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGEgc25hY2sgYmFyIGRpc3BhdGNoZWQgZnJvbSB0aGUgc25hY2sgYmFyIHNlcnZpY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhclJlZjxUPiB7XG4gIC8qKiBUaGUgaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBtYWtpbmcgdXAgdGhlIGNvbnRlbnQgb2YgdGhlIHNuYWNrIGJhci4gKi9cbiAgaW5zdGFuY2U6IFQ7XG5cbiAgLyoqXG4gICAqIFRoZSBpbnN0YW5jZSBvZiB0aGUgY29tcG9uZW50IG1ha2luZyB1cCB0aGUgY29udGVudCBvZiB0aGUgc25hY2sgYmFyLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBjb250YWluZXJJbnN0YW5jZTogX01hdFNuYWNrQmFyQ29udGFpbmVyQmFzZTtcblxuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoZSB1c2VyIHRoYXQgdGhlIHNuYWNrIGJhciBoYXMgYmVlbiBkaXNtaXNzZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2FmdGVyRGlzbWlzc2VkID0gbmV3IFN1YmplY3Q8TWF0U25hY2tCYXJEaXNtaXNzPigpO1xuXG4gIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhlIHVzZXIgdGhhdCB0aGUgc25hY2sgYmFyIGhhcyBvcGVuZWQgYW5kIGFwcGVhcmVkLiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9hZnRlck9wZW5lZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGUgdXNlciB0aGF0IHRoZSBzbmFjayBiYXIgYWN0aW9uIHdhcyBjYWxsZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29uQWN0aW9uID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKipcbiAgICogVGltZW91dCBJRCBmb3IgdGhlIGR1cmF0aW9uIHNldFRpbWVvdXQgY2FsbC4gVXNlZCB0byBjbGVhciB0aGUgdGltZW91dCBpZiB0aGUgc25hY2tiYXIgaXNcbiAgICogZGlzbWlzc2VkIGJlZm9yZSB0aGUgZHVyYXRpb24gcGFzc2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfZHVyYXRpb25UaW1lb3V0SWQ6IG51bWJlcjtcblxuICAvKiogV2hldGhlciB0aGUgc25hY2sgYmFyIHdhcyBkaXNtaXNzZWQgdXNpbmcgdGhlIGFjdGlvbiBidXR0b24uICovXG4gIHByaXZhdGUgX2Rpc21pc3NlZEJ5QWN0aW9uID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoY29udGFpbmVySW5zdGFuY2U6IF9NYXRTbmFja0JhckNvbnRhaW5lckJhc2UsIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYpIHtcbiAgICB0aGlzLmNvbnRhaW5lckluc3RhbmNlID0gY29udGFpbmVySW5zdGFuY2U7XG4gICAgY29udGFpbmVySW5zdGFuY2UuX29uRXhpdC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fZmluaXNoRGlzbWlzcygpKTtcbiAgfVxuXG4gIC8qKiBEaXNtaXNzZXMgdGhlIHNuYWNrIGJhci4gKi9cbiAgZGlzbWlzcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2FmdGVyRGlzbWlzc2VkLmNsb3NlZCkge1xuICAgICAgdGhpcy5jb250YWluZXJJbnN0YW5jZS5leGl0KCk7XG4gICAgfVxuICAgIGNsZWFyVGltZW91dCh0aGlzLl9kdXJhdGlvblRpbWVvdXRJZCk7XG4gIH1cblxuICAvKiogTWFya3MgdGhlIHNuYWNrYmFyIGFjdGlvbiBjbGlja2VkLiAqL1xuICBkaXNtaXNzV2l0aEFjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX29uQWN0aW9uLmNsb3NlZCkge1xuICAgICAgdGhpcy5fZGlzbWlzc2VkQnlBY3Rpb24gPSB0cnVlO1xuICAgICAgdGhpcy5fb25BY3Rpb24ubmV4dCgpO1xuICAgICAgdGhpcy5fb25BY3Rpb24uY29tcGxldGUoKTtcbiAgICAgIHRoaXMuZGlzbWlzcygpO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5fZHVyYXRpb25UaW1lb3V0SWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIHRoZSBzbmFja2JhciBhY3Rpb24gY2xpY2tlZC5cbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBkaXNtaXNzV2l0aEFjdGlvbmAgaW5zdGVhZC5cbiAgICogQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuICAgKi9cbiAgY2xvc2VXaXRoQWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzbWlzc1dpdGhBY3Rpb24oKTtcbiAgfVxuXG4gIC8qKiBEaXNtaXNzZXMgdGhlIHNuYWNrIGJhciBhZnRlciBzb21lIGR1cmF0aW9uICovXG4gIF9kaXNtaXNzQWZ0ZXIoZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBuZWVkIHRvIGNhcCB0aGUgZHVyYXRpb24gdG8gdGhlIG1heGltdW0gdmFsdWUgZm9yIHNldFRpbWVvdXQsIGJlY2F1c2VcbiAgICAvLyBpdCdsbCByZXZlcnQgdG8gMSBpZiBzb21lYm9keSBwYXNzZXMgaW4gc29tZXRoaW5nIGdyZWF0ZXIgKGUuZy4gYEluZmluaXR5YCkuIFNlZSAjMTcyMzQuXG4gICAgdGhpcy5fZHVyYXRpb25UaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzbWlzcygpLCBNYXRoLm1pbihkdXJhdGlvbiwgTUFYX1RJTUVPVVQpKTtcbiAgfVxuXG4gIC8qKiBNYXJrcyB0aGUgc25hY2tiYXIgYXMgb3BlbmVkICovXG4gIF9vcGVuKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fYWZ0ZXJPcGVuZWQuY2xvc2VkKSB7XG4gICAgICB0aGlzLl9hZnRlck9wZW5lZC5uZXh0KCk7XG4gICAgICB0aGlzLl9hZnRlck9wZW5lZC5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDbGVhbnMgdXAgdGhlIERPTSBhZnRlciBjbG9zaW5nLiAqL1xuICBwcml2YXRlIF9maW5pc2hEaXNtaXNzKCk6IHZvaWQge1xuICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuXG4gICAgaWYgKCF0aGlzLl9vbkFjdGlvbi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX29uQWN0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYWZ0ZXJEaXNtaXNzZWQubmV4dCh7ZGlzbWlzc2VkQnlBY3Rpb246IHRoaXMuX2Rpc21pc3NlZEJ5QWN0aW9ufSk7XG4gICAgdGhpcy5fYWZ0ZXJEaXNtaXNzZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9kaXNtaXNzZWRCeUFjdGlvbiA9IGZhbHNlO1xuICB9XG5cbiAgLyoqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGlzIG5vdGlmaWVkIHdoZW4gdGhlIHNuYWNrIGJhciBpcyBmaW5pc2hlZCBjbG9zaW5nLiAqL1xuICBhZnRlckRpc21pc3NlZCgpOiBPYnNlcnZhYmxlPE1hdFNuYWNrQmFyRGlzbWlzcz4ge1xuICAgIHJldHVybiB0aGlzLl9hZnRlckRpc21pc3NlZDtcbiAgfVxuXG4gIC8qKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBpcyBub3RpZmllZCB3aGVuIHRoZSBzbmFjayBiYXIgaGFzIG9wZW5lZCBhbmQgYXBwZWFyZWQuICovXG4gIGFmdGVyT3BlbmVkKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lckluc3RhbmNlLl9vbkVudGVyO1xuICB9XG5cbiAgLyoqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGlzIG5vdGlmaWVkIHdoZW4gdGhlIHNuYWNrIGJhciBhY3Rpb24gaXMgY2FsbGVkLiAqL1xuICBvbkFjdGlvbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb25BY3Rpb247XG4gIH1cbn1cbiJdfQ==