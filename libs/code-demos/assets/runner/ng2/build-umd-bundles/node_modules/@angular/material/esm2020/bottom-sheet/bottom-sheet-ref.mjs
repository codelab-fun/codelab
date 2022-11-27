/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { merge, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 */
export class MatBottomSheetRef {
    constructor(_ref, config, containerInstance) {
        this._ref = _ref;
        /** Subject for notifying the user that the bottom sheet has opened and appeared. */
        this._afterOpened = new Subject();
        this.containerInstance = containerInstance;
        this.disableClose = config.disableClose;
        // Emit when opening animation completes
        containerInstance._animationStateChanged
            .pipe(filter(event => event.phaseName === 'done' && event.toState === 'visible'), take(1))
            .subscribe(() => {
            this._afterOpened.next();
            this._afterOpened.complete();
        });
        // Dispose overlay when closing animation is complete
        containerInstance._animationStateChanged
            .pipe(filter(event => event.phaseName === 'done' && event.toState === 'hidden'), take(1))
            .subscribe(() => {
            clearTimeout(this._closeFallbackTimeout);
            this._ref.close(this._result);
        });
        _ref.overlayRef.detachments().subscribe(() => {
            this._ref.close(this._result);
        });
        merge(this.backdropClick(), this.keydownEvents().pipe(filter(event => event.keyCode === ESCAPE))).subscribe(event => {
            if (!this.disableClose &&
                (event.type !== 'keydown' || !hasModifierKey(event))) {
                event.preventDefault();
                this.dismiss();
            }
        });
    }
    /** Instance of the component making up the content of the bottom sheet. */
    get instance() {
        return this._ref.componentInstance;
    }
    /**
     * Dismisses the bottom sheet.
     * @param result Data to be passed back to the bottom sheet opener.
     */
    dismiss(result) {
        if (!this.containerInstance) {
            return;
        }
        // Transition the backdrop in parallel to the bottom sheet.
        this.containerInstance._animationStateChanged
            .pipe(filter(event => event.phaseName === 'start'), take(1))
            .subscribe(event => {
            // The logic that disposes of the overlay depends on the exit animation completing, however
            // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
            // timeout which will clean everything up if the animation hasn't fired within the specified
            // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
            // vast majority of cases the timeout will have been cleared before it has fired.
            this._closeFallbackTimeout = setTimeout(() => {
                this._ref.close(this._result);
            }, event.totalTime + 100);
            this._ref.overlayRef.detachBackdrop();
        });
        this._result = result;
        this.containerInstance.exit();
        this.containerInstance = null;
    }
    /** Gets an observable that is notified when the bottom sheet is finished closing. */
    afterDismissed() {
        return this._ref.closed;
    }
    /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
    afterOpened() {
        return this._afterOpened;
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    backdropClick() {
        return this._ref.backdropClick;
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    keydownEvents() {
        return this._ref.keydownEvents;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLXNoZWV0LXJlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9ib3R0b20tc2hlZXQvYm90dG9tLXNoZWV0LXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQUMsTUFBTSxFQUFFLGNBQWMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBQyxLQUFLLEVBQWMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJNUM7O0dBRUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBd0I1QixZQUNVLElBQXFCLEVBQzdCLE1BQTRCLEVBQzVCLGlCQUEwQztRQUZsQyxTQUFJLEdBQUosSUFBSSxDQUFpQjtRQVYvQixvRkFBb0Y7UUFDbkUsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBYWxELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFFeEMsd0NBQXdDO1FBQ3hDLGlCQUFpQixDQUFDLHNCQUFzQjthQUNyQyxJQUFJLENBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsRUFDMUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVMLHFEQUFxRDtRQUNyRCxpQkFBaUIsQ0FB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SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDakMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9jZGsvZGlhbG9nJztcbmltcG9ydCB7RVNDQVBFLCBoYXNNb2RpZmllcktleX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7bWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIHRha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0Qm90dG9tU2hlZXRDb25maWd9IGZyb20gJy4vYm90dG9tLXNoZWV0LWNvbmZpZyc7XG5pbXBvcnQge01hdEJvdHRvbVNoZWV0Q29udGFpbmVyfSBmcm9tICcuL2JvdHRvbS1zaGVldC1jb250YWluZXInO1xuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhIGJvdHRvbSBzaGVldCBkaXNwYXRjaGVkIGZyb20gdGhlIGJvdHRvbSBzaGVldCBzZXJ2aWNlLlxuICovXG5leHBvcnQgY2xhc3MgTWF0Qm90dG9tU2hlZXRSZWY8VCA9IGFueSwgUiA9IGFueT4ge1xuICAvKiogSW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBtYWtpbmcgdXAgdGhlIGNvbnRlbnQgb2YgdGhlIGJvdHRvbSBzaGVldC4gKi9cbiAgZ2V0IGluc3RhbmNlKCk6IFQge1xuICAgIHJldHVybiB0aGlzLl9yZWYuY29tcG9uZW50SW5zdGFuY2UhO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQgaW50byB3aGljaCB0aGUgYm90dG9tIHNoZWV0IGNvbnRlbnQgaXMgcHJvamVjdGVkLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBjb250YWluZXJJbnN0YW5jZTogTWF0Qm90dG9tU2hlZXRDb250YWluZXI7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgaXMgYWxsb3dlZCB0byBjbG9zZSB0aGUgYm90dG9tIHNoZWV0LiAqL1xuICBkaXNhYmxlQ2xvc2U6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGUgdXNlciB0aGF0IHRoZSBib3R0b20gc2hlZXQgaGFzIG9wZW5lZCBhbmQgYXBwZWFyZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2FmdGVyT3BlbmVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogUmVzdWx0IHRvIGJlIHBhc3NlZCBkb3duIHRvIHRoZSBgYWZ0ZXJEaXNtaXNzZWRgIHN0cmVhbS4gKi9cbiAgcHJpdmF0ZSBfcmVzdWx0OiBSIHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBIYW5kbGUgdG8gdGhlIHRpbWVvdXQgdGhhdCdzIHJ1bm5pbmcgYXMgYSBmYWxsYmFjayBpbiBjYXNlIHRoZSBleGl0IGFuaW1hdGlvbiBkb2Vzbid0IGZpcmUuICovXG4gIHByaXZhdGUgX2Nsb3NlRmFsbGJhY2tUaW1lb3V0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVmOiBEaWFsb2dSZWY8UiwgVD4sXG4gICAgY29uZmlnOiBNYXRCb3R0b21TaGVldENvbmZpZyxcbiAgICBjb250YWluZXJJbnN0YW5jZTogTWF0Qm90dG9tU2hlZXRDb250YWluZXIsXG4gICkge1xuICAgIHRoaXMuY29udGFpbmVySW5zdGFuY2UgPSBjb250YWluZXJJbnN0YW5jZTtcbiAgICB0aGlzLmRpc2FibGVDbG9zZSA9IGNvbmZpZy5kaXNhYmxlQ2xvc2U7XG5cbiAgICAvLyBFbWl0IHdoZW4gb3BlbmluZyBhbmltYXRpb24gY29tcGxldGVzXG4gICAgY29udGFpbmVySW5zdGFuY2UuX2FuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAndmlzaWJsZScpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2FmdGVyT3BlbmVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJPcGVuZWQuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuXG4gICAgLy8gRGlzcG9zZSBvdmVybGF5IHdoZW4gY2xvc2luZyBhbmltYXRpb24gaXMgY29tcGxldGVcbiAgICBjb250YWluZXJJbnN0YW5jZS5fYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09ICdoaWRkZW4nKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fY2xvc2VGYWxsYmFja1RpbWVvdXQpO1xuICAgICAgICB0aGlzLl9yZWYuY2xvc2UodGhpcy5fcmVzdWx0KTtcbiAgICAgIH0pO1xuXG4gICAgX3JlZi5vdmVybGF5UmVmLmRldGFjaG1lbnRzKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3JlZi5jbG9zZSh0aGlzLl9yZXN1bHQpO1xuICAgIH0pO1xuXG4gICAgbWVyZ2UoXG4gICAgICB0aGlzLmJhY2tkcm9wQ2xpY2soKSxcbiAgICAgIHRoaXMua2V5ZG93bkV2ZW50cygpLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSkpLFxuICAgICkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMuZGlzYWJsZUNsb3NlICYmXG4gICAgICAgIChldmVudC50eXBlICE9PSAna2V5ZG93bicgfHwgIWhhc01vZGlmaWVyS2V5KGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpKVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZGlzbWlzcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc21pc3NlcyB0aGUgYm90dG9tIHNoZWV0LlxuICAgKiBAcGFyYW0gcmVzdWx0IERhdGEgdG8gYmUgcGFzc2VkIGJhY2sgdG8gdGhlIGJvdHRvbSBzaGVldCBvcGVuZXIuXG4gICAqL1xuICBkaXNtaXNzKHJlc3VsdD86IFIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVySW5zdGFuY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2l0aW9uIHRoZSBiYWNrZHJvcCBpbiBwYXJhbGxlbCB0byB0aGUgYm90dG9tIHNoZWV0LlxuICAgIHRoaXMuY29udGFpbmVySW5zdGFuY2UuX2FuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudC5waGFzZU5hbWUgPT09ICdzdGFydCcpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIC8vIFRoZSBsb2dpYyB0aGF0IGRpc3Bvc2VzIG9mIHRoZSBvdmVybGF5IGRlcGVuZHMgb24gdGhlIGV4aXQgYW5pbWF0aW9uIGNvbXBsZXRpbmcsIGhvd2V2ZXJcbiAgICAgICAgLy8gaXQgaXNuJ3QgZ3VhcmFudGVlZCBpZiB0aGUgcGFyZW50IHZpZXcgaXMgZGVzdHJveWVkIHdoaWxlIGl0J3MgcnVubmluZy4gQWRkIGEgZmFsbGJhY2tcbiAgICAgICAgLy8gdGltZW91dCB3aGljaCB3aWxsIGNsZWFuIGV2ZXJ5dGhpbmcgdXAgaWYgdGhlIGFuaW1hdGlvbiBoYXNuJ3QgZmlyZWQgd2l0aGluIHRoZSBzcGVjaWZpZWRcbiAgICAgICAgLy8gYW1vdW50IG9mIHRpbWUgcGx1cyAxMDBtcy4gV2UgZG9uJ3QgbmVlZCB0byBydW4gdGhpcyBvdXRzaWRlIHRoZSBOZ1pvbmUsIGJlY2F1c2UgZm9yIHRoZVxuICAgICAgICAvLyB2YXN0IG1ham9yaXR5IG9mIGNhc2VzIHRoZSB0aW1lb3V0IHdpbGwgaGF2ZSBiZWVuIGNsZWFyZWQgYmVmb3JlIGl0IGhhcyBmaXJlZC5cbiAgICAgICAgdGhpcy5fY2xvc2VGYWxsYmFja1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9yZWYuY2xvc2UodGhpcy5fcmVzdWx0KTtcbiAgICAgICAgfSwgZXZlbnQudG90YWxUaW1lICsgMTAwKTtcblxuICAgICAgICB0aGlzLl9yZWYub3ZlcmxheVJlZi5kZXRhY2hCYWNrZHJvcCgpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9yZXN1bHQgPSByZXN1bHQ7XG4gICAgdGhpcy5jb250YWluZXJJbnN0YW5jZS5leGl0KCk7XG4gICAgdGhpcy5jb250YWluZXJJbnN0YW5jZSA9IG51bGwhO1xuICB9XG5cbiAgLyoqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGlzIG5vdGlmaWVkIHdoZW4gdGhlIGJvdHRvbSBzaGVldCBpcyBmaW5pc2hlZCBjbG9zaW5nLiAqL1xuICBhZnRlckRpc21pc3NlZCgpOiBPYnNlcnZhYmxlPFIgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVmLmNsb3NlZDtcbiAgfVxuXG4gIC8qKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBpcyBub3RpZmllZCB3aGVuIHRoZSBib3R0b20gc2hlZXQgaGFzIG9wZW5lZCBhbmQgYXBwZWFyZWQuICovXG4gIGFmdGVyT3BlbmVkKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9hZnRlck9wZW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyB3aGVuIHRoZSBvdmVybGF5J3MgYmFja2Ryb3AgaGFzIGJlZW4gY2xpY2tlZC5cbiAgICovXG4gIGJhY2tkcm9wQ2xpY2soKTogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZi5iYWNrZHJvcENsaWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4ga2V5ZG93biBldmVudHMgYXJlIHRhcmdldGVkIG9uIHRoZSBvdmVybGF5LlxuICAgKi9cbiAga2V5ZG93bkV2ZW50cygpOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVmLmtleWRvd25FdmVudHM7XG4gIH1cbn1cbiJdfQ==