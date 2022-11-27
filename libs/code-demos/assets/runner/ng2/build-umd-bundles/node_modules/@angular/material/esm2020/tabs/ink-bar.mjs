/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { InjectionToken } from '@angular/core';
/** Class that is applied when a tab indicator is active. */
const ACTIVE_CLASS = 'mdc-tab-indicator--active';
/** Class that is applied when the tab indicator should not transition. */
const NO_TRANSITION_CLASS = 'mdc-tab-indicator--no-transition';
/**
 * Abstraction around the MDC tab indicator that acts as the tab header's ink bar.
 * @docs-private
 */
export class MatInkBar {
    constructor(_items) {
        this._items = _items;
    }
    /** Hides the ink bar. */
    hide() {
        this._items.forEach(item => item.deactivateInkBar());
    }
    /** Aligns the ink bar to a DOM node. */
    alignToElement(element) {
        const correspondingItem = this._items.find(item => item.elementRef.nativeElement === element);
        const currentItem = this._currentItem;
        currentItem?.deactivateInkBar();
        if (correspondingItem) {
            const clientRect = currentItem?.elementRef.nativeElement.getBoundingClientRect?.();
            // The ink bar won't animate unless we give it the `ClientRect` of the previous item.
            correspondingItem.activateInkBar(clientRect);
            this._currentItem = correspondingItem;
        }
    }
}
/**
 * Mixin that can be used to apply the `MatInkBarItem` behavior to a class.
 * Base on MDC's `MDCSlidingTabIndicatorFoundation`:
 * https://github.com/material-components/material-components-web/blob/c0a11ef0d000a098fd0c372be8f12d6a99302855/packages/mdc-tab-indicator/sliding-foundation.ts
 * @docs-private
 */
export function mixinInkBarItem(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this._fitToContent = false;
        }
        /** Whether the ink bar should fit to the entire tab or just its content. */
        get fitInkBarToContent() {
            return this._fitToContent;
        }
        set fitInkBarToContent(v) {
            const newValue = coerceBooleanProperty(v);
            if (this._fitToContent !== newValue) {
                this._fitToContent = newValue;
                if (this._inkBarElement) {
                    this._appendInkBarElement();
                }
            }
        }
        /** Aligns the ink bar to the current item. */
        activateInkBar(previousIndicatorClientRect) {
            const element = this.elementRef.nativeElement;
            // Early exit if no indicator is present to handle cases where an indicator
            // may be activated without a prior indicator state
            if (!previousIndicatorClientRect ||
                !element.getBoundingClientRect ||
                !this._inkBarContentElement) {
                element.classList.add(ACTIVE_CLASS);
                return;
            }
            // This animation uses the FLIP approach. You can read more about it at the link below:
            // https://aerotwist.com/blog/flip-your-animations/
            // Calculate the dimensions based on the dimensions of the previous indicator
            const currentClientRect = element.getBoundingClientRect();
            const widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
            const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
            element.classList.add(NO_TRANSITION_CLASS);
            this._inkBarContentElement.style.setProperty('transform', `translateX(${xPosition}px) scaleX(${widthDelta})`);
            // Force repaint before updating classes and transform to ensure the transform properly takes effect
            element.getBoundingClientRect();
            element.classList.remove(NO_TRANSITION_CLASS);
            element.classList.add(ACTIVE_CLASS);
            this._inkBarContentElement.style.setProperty('transform', '');
        }
        /** Removes the ink bar from the current item. */
        deactivateInkBar() {
            this.elementRef.nativeElement.classList.remove(ACTIVE_CLASS);
        }
        /** Initializes the foundation. */
        ngOnInit() {
            this._createInkBarElement();
        }
        /** Destroys the foundation. */
        ngOnDestroy() {
            this._inkBarElement?.remove();
            this._inkBarElement = this._inkBarContentElement = null;
        }
        /** Creates and appends the ink bar element. */
        _createInkBarElement() {
            const documentNode = this.elementRef.nativeElement.ownerDocument || document;
            this._inkBarElement = documentNode.createElement('span');
            this._inkBarContentElement = documentNode.createElement('span');
            this._inkBarElement.className = 'mdc-tab-indicator';
            this._inkBarContentElement.className =
                'mdc-tab-indicator__content mdc-tab-indicator__content--underline';
            this._inkBarElement.appendChild(this._inkBarContentElement);
            this._appendInkBarElement();
        }
        /**
         * Appends the ink bar to the tab host element or content, depending on whether
         * the ink bar should fit to content.
         */
        _appendInkBarElement() {
            if (!this._inkBarElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('Ink bar element has not been created and cannot be appended');
            }
            const parentElement = this._fitToContent
                ? this.elementRef.nativeElement.querySelector('.mdc-tab__content')
                : this.elementRef.nativeElement;
            if (!parentElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('Missing element to host the ink bar');
            }
            parentElement.appendChild(this._inkBarElement);
        }
    };
}
/**
 * The default positioner function for the MatInkBar.
 * @docs-private
 */
export function _MAT_INK_BAR_POSITIONER_FACTORY() {
    const method = (element) => ({
        left: element ? (element.offsetLeft || 0) + 'px' : '0',
        width: element ? (element.offsetWidth || 0) + 'px' : '0',
    });
    return method;
}
/** Injection token for the MatInkBar's Positioner. */
export const _MAT_INK_BAR_POSITIONER = new InjectionToken('MatInkBarPositioner', {
    providedIn: 'root',
    factory: _MAT_INK_BAR_POSITIONER_FACTORY,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5rLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC90YWJzL2luay1iYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFhLGNBQWMsRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFhdkYsNERBQTREO0FBQzVELE1BQU0sWUFBWSxHQUFHLDJCQUEyQixDQUFDO0FBRWpELDBFQUEwRTtBQUMxRSxNQUFNLG1CQUFtQixHQUFHLGtDQUFrQyxDQUFDO0FBRS9EOzs7R0FHRztBQUNILE1BQU0sT0FBTyxTQUFTO0lBSXBCLFlBQW9CLE1BQWdDO1FBQWhDLFdBQU0sR0FBTixNQUFNLENBQTBCO0lBQUcsQ0FBQztJQUV4RCx5QkFBeUI7SUFDekIsSUFBSTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLGNBQWMsQ0FBQyxPQUFvQjtRQUNqQyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLENBQUM7UUFDOUYsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUV0QyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztRQUVoQyxJQUFJLGlCQUFpQixFQUFFO1lBQ3JCLE1BQU0sVUFBVSxHQUFHLFdBQVcsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQztZQUVuRixxRkFBcUY7WUFDckYsaUJBQWlCLENBQUMsY0FBYyxDQUFD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RyxDQUFDLE9BQW9CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRztRQUN0RCxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO0tBQ3pELENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxzREFBc0Q7QUFDdEQsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxjQUFjLENBQ3ZELHFCQUFxQixFQUNyQjtJQUNFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSwrQkFBK0I7Q0FDekMsQ0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0VsZW1lbnRSZWYsIEluamVjdGlvblRva2VuLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBJdGVtIGluc2lkZSBhIHRhYiBoZWFkZXIgcmVsYXRpdmUgdG8gd2hpY2ggdGhlIGluayBiYXIgY2FuIGJlIGFsaWduZWQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0SW5rQmFySXRlbSBleHRlbmRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIGFjdGl2YXRlSW5rQmFyKHByZXZpb3VzSW5kaWNhdG9yQ2xpZW50UmVjdD86IENsaWVudFJlY3QpOiB2b2lkO1xuICBkZWFjdGl2YXRlSW5rQmFyKCk6IHZvaWQ7XG4gIGZpdElua0JhclRvQ29udGVudDogYm9vbGVhbjtcbn1cblxuLyoqIENsYXNzIHRoYXQgaXMgYXBwbGllZCB3aGVuIGEgdGFiIGluZGljYXRvciBpcyBhY3RpdmUuICovXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSAnbWRjLXRhYi1pbmRpY2F0b3ItLWFjdGl2ZSc7XG5cbi8qKiBDbGFzcyB0aGF0IGlzIGFwcGxpZWQgd2hlbiB0aGUgdGFiIGluZGljYXRvciBzaG91bGQgbm90IHRyYW5zaXRpb24uICovXG5jb25zdCBOT19UUkFOU0lUSU9OX0NMQVNTID0gJ21kYy10YWItaW5kaWNhdG9yLS1uby10cmFuc2l0aW9uJztcblxuLyoqXG4gKiBBYnN0cmFjdGlvbiBhcm91bmQgdGhlIE1EQyB0YWIgaW5kaWNhdG9yIHRoYXQgYWN0cyBhcyB0aGUgdGFiIGhlYWRlcidzIGluayBiYXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRJbmtCYXIge1xuICAvKiogSXRlbSB0byB3aGljaCB0aGUgaW5rIGJhciBpcyBhbGlnbmVkIGN1cnJlbnRseS4gKi9cbiAgcHJpdmF0ZSBfY3VycmVudEl0ZW06IE1hdElua0Jhckl0ZW0gfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaXRlbXM6IFF1ZXJ5TGlzdDxNYXRJbmtCYXJJdGVtPikge31cblxuICAvKiogSGlkZXMgdGhlIGluayBiYXIuICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uZGVhY3RpdmF0ZUlua0JhcigpKTtcbiAgfVxuXG4gIC8qKiBBbGlnbnMgdGhlIGluayBiYXIgdG8gYSBET00gbm9kZS4gKi9cbiAgYWxpZ25Ub0VsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBjb3JyZXNwb25kaW5nSXRlbSA9IHRoaXMuX2l0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA9PT0gZWxlbWVudCk7XG4gICAgY29uc3QgY3VycmVudEl0ZW0gPSB0aGlzLl9jdXJyZW50SXRlbTtcblxuICAgIGN1cnJlbnRJdGVtPy5kZWFjdGl2YXRlSW5rQmFyKCk7XG5cbiAgICBpZiAoY29ycmVzcG9uZGluZ0l0ZW0pIHtcbiAgICAgIGNvbnN0IGNsaWVudFJlY3QgPSBjdXJyZW50SXRlbT8uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdD8uKCk7XG5cbiAgICAgIC8vIFRoZSBpbmsgYmFyIHdvbid0IGFuaW1hdGUgdW5sZXNzIHdlIGdpdmUgaXQgdGhlIGBDbGllbnRSZWN0YCBvZiB0aGUgcHJldmlvdXMgaXRlbS5cbiAgICAgIGNvcnJlc3BvbmRpbmdJdGVtLmFjdGl2YXRlSW5rQmFyKGNsaWVudFJlY3QpO1xuICAgICAgdGhpcy5fY3VycmVudEl0ZW0gPSBjb3JyZXNwb25kaW5nSXRlbTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBNaXhpbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFwcGx5IHRoZSBgTWF0SW5rQmFySXRlbWAgYmVoYXZpb3IgdG8gYSBjbGFzcy5cbiAqIEJhc2Ugb24gTURDJ3MgYE1EQ1NsaWRpbmdUYWJJbmRpY2F0b3JGb3VuZGF0aW9uYDpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvYzBhMTFlZjBkMDAwYTA5OGZkMGMzNzJiZThmMTJkNmE5OTMwMjg1NS9wYWNrYWdlcy9tZGMtdGFiLWluZGljYXRvci9zbGlkaW5nLWZvdW5kYXRpb24udHNcbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluSW5rQmFySXRlbTxcbiAgVCBleHRlbmRzIG5ldyAoLi4uYXJnczogYW55W10pID0+IHtlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pn0sXG4+KGJhc2U6IFQpOiBUICYgKG5ldyAoLi4uYXJnczogYW55W10pID0+IE1hdElua0Jhckl0ZW0pIHtcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lua0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBwcml2YXRlIF9pbmtCYXJDb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIHByaXZhdGUgX2ZpdFRvQ29udGVudCA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGluayBiYXIgc2hvdWxkIGZpdCB0byB0aGUgZW50aXJlIHRhYiBvciBqdXN0IGl0cyBjb250ZW50LiAqL1xuICAgIGdldCBmaXRJbmtCYXJUb0NvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5fZml0VG9Db250ZW50O1xuICAgIH1cbiAgICBzZXQgZml0SW5rQmFyVG9Db250ZW50KHY6IEJvb2xlYW5JbnB1dCkge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG5cbiAgICAgIGlmICh0aGlzLl9maXRUb0NvbnRlbnQgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2ZpdFRvQ29udGVudCA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLl9pbmtCYXJFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5fYXBwZW5kSW5rQmFyRWxlbWVudCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEFsaWducyB0aGUgaW5rIGJhciB0byB0aGUgY3VycmVudCBpdGVtLiAqL1xuICAgIGFjdGl2YXRlSW5rQmFyKHByZXZpb3VzSW5kaWNhdG9yQ2xpZW50UmVjdD86IENsaWVudFJlY3QpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgLy8gRWFybHkgZXhpdCBpZiBubyBpbmRpY2F0b3IgaXMgcHJlc2VudCB0byBoYW5kbGUgY2FzZXMgd2hlcmUgYW4gaW5kaWNhdG9yXG4gICAgICAvLyBtYXkgYmUgYWN0aXZhdGVkIHdpdGhvdXQgYSBwcmlvciBpbmRpY2F0b3Igc3RhdGVcbiAgICAgIGlmIChcbiAgICAgICAgIXByZXZpb3VzSW5kaWNhdG9yQ2xpZW50UmVjdCB8fFxuICAgICAgICAhZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgfHxcbiAgICAgICAgIXRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50XG4gICAgICApIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKEFDVElWRV9DTEFTUyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhpcyBhbmltYXRpb24gdXNlcyB0aGUgRkxJUCBhcHByb2FjaC4gWW91IGNhbiByZWFkIG1vcmUgYWJvdXQgaXQgYXQgdGhlIGxpbmsgYmVsb3c6XG4gICAgICAvLyBodHRwczovL2Flcm90d2lzdC5jb20vYmxvZy9mbGlwLXlvdXItYW5pbWF0aW9ucy9cblxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkaW1lbnNpb25zIGJhc2VkIG9uIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBwcmV2aW91cyBpbmRpY2F0b3JcbiAgICAgIGNvbnN0IGN1cnJlbnRDbGllbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHdpZHRoRGVsdGEgPSBwcmV2aW91c0luZGljYXRvckNsaWVudFJlY3Qud2lkdGggLyBjdXJyZW50Q2xpZW50UmVjdC53aWR0aDtcbiAgICAgIGNvbnN0IHhQb3NpdGlvbiA9IHByZXZpb3VzSW5kaWNhdG9yQ2xpZW50UmVjdC5sZWZ0IC0gY3VycmVudENsaWVudFJlY3QubGVmdDtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChOT19UUkFOU0lUSU9OX0NMQVNTKTtcbiAgICAgIHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgYHRyYW5zbGF0ZVgoJHt4UG9zaXRpb259cHgpIHNjYWxlWCgke3dpZHRoRGVsdGF9KWAsXG4gICAgICApO1xuXG4gICAgICAvLyBGb3JjZSByZXBhaW50IGJlZm9yZSB1cGRhdGluZyBjbGFzc2VzIGFuZCB0cmFuc2Zvcm0gdG8gZW5zdXJlIHRoZSB0cmFuc2Zvcm0gcHJvcGVybHkgdGFrZXMgZWZmZWN0XG4gICAgICBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoTk9fVFJBTlNJVElPTl9DTEFTUyk7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoQUNUSVZFX0NMQVNTKTtcbiAgICAgIHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqIFJlbW92ZXMgdGhlIGluayBiYXIgZnJvbSB0aGUgY3VycmVudCBpdGVtLiAqL1xuICAgIGRlYWN0aXZhdGVJbmtCYXIoKSB7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKEFDVElWRV9DTEFTUyk7XG4gICAgfVxuXG4gICAgLyoqIEluaXRpYWxpemVzIHRoZSBmb3VuZGF0aW9uLiAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgdGhpcy5fY3JlYXRlSW5rQmFyRWxlbWVudCgpO1xuICAgIH1cblxuICAgIC8qKiBEZXN0cm95cyB0aGUgZm91bmRhdGlvbi4gKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgIHRoaXMuX2lua0JhckVsZW1lbnQ/LnJlbW92ZSgpO1xuICAgICAgdGhpcy5faW5rQmFyRWxlbWVudCA9IHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50ID0gbnVsbCE7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZXMgYW5kIGFwcGVuZHMgdGhlIGluayBiYXIgZWxlbWVudC4gKi9cbiAgICBwcml2YXRlIF9jcmVhdGVJbmtCYXJFbGVtZW50KCkge1xuICAgICAgY29uc3QgZG9jdW1lbnROb2RlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgIHRoaXMuX2lua0JhckVsZW1lbnQgPSBkb2N1bWVudE5vZGUuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQgPSBkb2N1bWVudE5vZGUuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICB0aGlzLl9pbmtCYXJFbGVtZW50LmNsYXNzTmFtZSA9ICdtZGMtdGFiLWluZGljYXRvcic7XG4gICAgICB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudC5jbGFzc05hbWUgPVxuICAgICAgICAnbWRjLXRhYi1pbmRpY2F0b3JfX2NvbnRlbnQgbWRjLXRhYi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZSc7XG5cbiAgICAgIHRoaXMuX2lua0JhckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQpO1xuICAgICAgdGhpcy5fYXBwZW5kSW5rQmFyRWxlbWVudCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgdGhlIGluayBiYXIgdG8gdGhlIHRhYiBob3N0IGVsZW1lbnQgb3IgY29udGVudCwgZGVwZW5kaW5nIG9uIHdoZXRoZXJcbiAgICAgKiB0aGUgaW5rIGJhciBzaG91bGQgZml0IHRvIGNvbnRlbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfYXBwZW5kSW5rQmFyRWxlbWVudCgpIHtcbiAgICAgIGlmICghdGhpcy5faW5rQmFyRWxlbWVudCAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignSW5rIGJhciBlbGVtZW50IGhhcyBub3QgYmVlbiBjcmVhdGVkIGFuZCBjYW5ub3QgYmUgYXBwZW5kZWQnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMuX2ZpdFRvQ29udGVudFxuICAgICAgICA/IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtdGFiX19jb250ZW50JylcbiAgICAgICAgOiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgaWYgKCFwYXJlbnRFbGVtZW50ICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdNaXNzaW5nIGVsZW1lbnQgdG8gaG9zdCB0aGUgaW5rIGJhcicpO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnRFbGVtZW50IS5hcHBlbmRDaGlsZCh0aGlzLl9pbmtCYXJFbGVtZW50ISk7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYSBhIE1hdElua0JhciBwb3NpdGlvbmVyIG1ldGhvZCwgZGVmaW5pbmcgdGhlIHBvc2l0aW9uaW5nIGFuZCB3aWR0aCBvZiB0aGUgaW5rXG4gKiBiYXIgaW4gYSBzZXQgb2YgdGFicy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBfTWF0SW5rQmFyUG9zaXRpb25lciB7XG4gIChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHtsZWZ0OiBzdHJpbmc7IHdpZHRoOiBzdHJpbmd9O1xufVxuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHBvc2l0aW9uZXIgZnVuY3Rpb24gZm9yIHRoZSBNYXRJbmtCYXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfTUFUX0lOS19CQVJfUE9TSVRJT05FUl9GQUNUT1JZKCk6IF9NYXRJbmtCYXJQb3NpdGlvbmVyIHtcbiAgY29uc3QgbWV0aG9kID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiAoe1xuICAgIGxlZnQ6IGVsZW1lbnQgPyAoZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDApICsgJ3B4JyA6ICcwJyxcbiAgICB3aWR0aDogZWxlbWVudCA/IChlbGVtZW50Lm9mZnNldFdpZHRoIHx8IDApICsgJ3B4JyA6ICcwJyxcbiAgfSk7XG5cbiAgcmV0dXJuIG1ldGhvZDtcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiBmb3IgdGhlIE1hdElua0JhcidzIFBvc2l0aW9uZXIuICovXG5leHBvcnQgY29uc3QgX01BVF9JTktfQkFSX1BPU0lUSU9ORVIgPSBuZXcgSW5qZWN0aW9uVG9rZW48X01hdElua0JhclBvc2l0aW9uZXI+KFxuICAnTWF0SW5rQmFyUG9zaXRpb25lcicsXG4gIHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogX01BVF9JTktfQkFSX1BPU0lUSU9ORVJfRkFDVE9SWSxcbiAgfSxcbik7XG4iXX0=