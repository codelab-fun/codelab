/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
/** Class added when the line ripple is active. */
const ACTIVATE_CLASS = 'mdc-line-ripple--active';
/** Class added when the line ripple is being deactivated. */
const DEACTIVATING_CLASS = 'mdc-line-ripple--deactivating';
/**
 * Internal directive that creates an instance of the MDC line-ripple component. Using a
 * directive allows us to conditionally render a line-ripple in the template without having
 * to manually create and destroy the `MDCLineRipple` component whenever the condition changes.
 *
 * The directive sets up the styles for the line-ripple and provides an API for activating
 * and deactivating the line-ripple.
 */
export class MatFormFieldLineRipple {
    constructor(_elementRef, ngZone) {
        this._elementRef = _elementRef;
        this._handleTransitionEnd = (event) => {
            const classList = this._elementRef.nativeElement.classList;
            const isDeactivating = classList.contains(DEACTIVATING_CLASS);
            if (event.propertyName === 'opacity' && isDeactivating) {
                classList.remove(ACTIVATE_CLASS, DEACTIVATING_CLASS);
            }
        };
        ngZone.runOutsideAngular(() => {
            _elementRef.nativeElement.addEventListener('transitionend', this._handleTransitionEnd);
        });
    }
    activate() {
        const classList = this._elementRef.nativeElement.classList;
        classList.remove(DEACTIVATING_CLASS);
        classList.add(ACTIVATE_CLASS);
    }
    deactivate() {
        this._elementRef.nativeElement.classList.add(DEACTIVATING_CLASS);
    }
    ngOnDestroy() {
        this._elementRef.nativeElement.removeEventListener('transitionend', this._handleTransitionEnd);
    }
}
MatFormFieldLineRipple.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldLineRipple, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
MatFormFieldLineRipple.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatFormFieldLineRipple, selector: "div[matFormFieldLineRipple]", host: { classAttribute: "mdc-line-ripple" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldLineRipple, decorators: [{
            type: Directive,
            args: [{
                    selector: 'div[matFormFieldLineRipple]',
                    host: {
                        'class': 'mdc-line-ripple',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1yaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1maWVsZC9kaXJlY3RpdmVzL2xpbmUtcmlwcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBWSxNQUFNLGVBQWUsQ0FBQzs7QUFFdkUsa0RBQWtEO0FBQ2xELE1BQU0sY0FBYyxHQUFHLHlCQUF5QixDQUFDO0FBRWpELDZEQUE2RDtBQUM3RCxNQUFNLGtCQUFrQixHQUFHLCtCQUErQixDQUFDO0FBRTNEOzs7Ozs7O0dBT0c7QUFPSCxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQW9CLFdBQW9DLEVBQUUsTUFBYztRQUFwRCxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFnQmhELHlCQUFvQixHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1lBQ3hELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztZQUMzRCxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFOUQsSUFBSSxLQUFLLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBSSxjQUFjLEVBQUU7Z0JBQ3RELFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7YUFDdEQ7UUFDSCxDQUFDLENBQUM7UUF0QkEsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUM1QixXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN6RixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQzNELFNBQVMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFXRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7O3dIQTVCVSxzQkFBc0I7NEdBQXRCLHNCQUFzQjtnR0FBdEIsc0JBQXNCO2tCQU5sQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsaUJBQWlCO3FCQUMzQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgTmdab25lLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogQ2xhc3MgYWRkZWQgd2hlbiB0aGUgbGluZSByaXBwbGUgaXMgYWN0aXZlLiAqL1xuY29uc3QgQUNUSVZBVEVfQ0xBU1MgPSAnbWRjLWxpbmUtcmlwcGxlLS1hY3RpdmUnO1xuXG4vKiogQ2xhc3MgYWRkZWQgd2hlbiB0aGUgbGluZSByaXBwbGUgaXMgYmVpbmcgZGVhY3RpdmF0ZWQuICovXG5jb25zdCBERUFDVElWQVRJTkdfQ0xBU1MgPSAnbWRjLWxpbmUtcmlwcGxlLS1kZWFjdGl2YXRpbmcnO1xuXG4vKipcbiAqIEludGVybmFsIGRpcmVjdGl2ZSB0aGF0IGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIE1EQyBsaW5lLXJpcHBsZSBjb21wb25lbnQuIFVzaW5nIGFcbiAqIGRpcmVjdGl2ZSBhbGxvd3MgdXMgdG8gY29uZGl0aW9uYWxseSByZW5kZXIgYSBsaW5lLXJpcHBsZSBpbiB0aGUgdGVtcGxhdGUgd2l0aG91dCBoYXZpbmdcbiAqIHRvIG1hbnVhbGx5IGNyZWF0ZSBhbmQgZGVzdHJveSB0aGUgYE1EQ0xpbmVSaXBwbGVgIGNvbXBvbmVudCB3aGVuZXZlciB0aGUgY29uZGl0aW9uIGNoYW5nZXMuXG4gKlxuICogVGhlIGRpcmVjdGl2ZSBzZXRzIHVwIHRoZSBzdHlsZXMgZm9yIHRoZSBsaW5lLXJpcHBsZSBhbmQgcHJvdmlkZXMgYW4gQVBJIGZvciBhY3RpdmF0aW5nXG4gKiBhbmQgZGVhY3RpdmF0aW5nIHRoZSBsaW5lLXJpcHBsZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGl2W21hdEZvcm1GaWVsZExpbmVSaXBwbGVdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtbGluZS1yaXBwbGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRMaW5lUmlwcGxlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIG5nWm9uZTogTmdab25lKSB7XG4gICAgbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuX2hhbmRsZVRyYW5zaXRpb25FbmQpO1xuICAgIH0pO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICBjbGFzc0xpc3QucmVtb3ZlKERFQUNUSVZBVElOR19DTEFTUyk7XG4gICAgY2xhc3NMaXN0LmFkZChBQ1RJVkFURV9DTEFTUyk7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKERFQUNUSVZBVElOR19DTEFTUyk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVUcmFuc2l0aW9uRW5kID0gKGV2ZW50OiBUcmFuc2l0aW9uRXZlbnQpID0+IHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGNvbnN0IGlzRGVhY3RpdmF0aW5nID0gY2xhc3NMaXN0LmNvbnRhaW5zKERFQUNUSVZBVElOR19DTEFTUyk7XG5cbiAgICBpZiAoZXZlbnQucHJvcGVydHlOYW1lID09PSAnb3BhY2l0eScgJiYgaXNEZWFjdGl2YXRpbmcpIHtcbiAgICAgIGNsYXNzTGlzdC5yZW1vdmUoQUNUSVZBVEVfQ0xBU1MsIERFQUNUSVZBVElOR19DTEFTUyk7XG4gICAgfVxuICB9O1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5faGFuZGxlVHJhbnNpdGlvbkVuZCk7XG4gIH1cbn1cbiJdfQ==