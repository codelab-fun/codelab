/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Internal directive that maintains a MDC floating label. This directive does not
 * use the `MDCFloatingLabelFoundation` class, as it is not worth the size cost of
 * including it just to measure the label width and toggle some classes.
 *
 * The use of a directive allows us to conditionally render a floating label in the
 * template without having to manually manage instantiation and destruction of the
 * floating label component based on.
 *
 * The component is responsible for setting up the floating label styles, measuring label
 * width for the outline notch, and providing inputs that can be used to toggle the
 * label's floating or required state.
 */
export class MatFormFieldFloatingLabel {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        /** Whether the label is floating. */
        this.floating = false;
    }
    /** Gets the width of the label. Used for the outline notch. */
    getWidth() {
        return estimateScrollWidth(this._elementRef.nativeElement);
    }
    /** Gets the HTML element for the floating label. */
    get element() {
        return this._elementRef.nativeElement;
    }
}
MatFormFieldFloatingLabel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldFloatingLabel, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatFormFieldFloatingLabel.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatFormFieldFloatingLabel, selector: "label[matFormFieldFloatingLabel]", inputs: { floating: "floating" }, host: { properties: { "class.mdc-floating-label--float-above": "floating" }, classAttribute: "mdc-floating-label mat-mdc-floating-label" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldFloatingLabel, decorators: [{
            type: Directive,
            args: [{
                    selector: 'label[matFormFieldFloatingLabel]',
                    host: {
                        'class': 'mdc-floating-label mat-mdc-floating-label',
                        '[class.mdc-floating-label--float-above]': 'floating',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { floating: [{
                type: Input
            }] } });
/**
 * Estimates the scroll width of an element.
 * via https://github.com/material-components/material-components-web/blob/c0a11ef0d000a098fd0c372be8f12d6a99302855/packages/mdc-dom/ponyfill.ts
 */
function estimateScrollWidth(element) {
    // Check the offsetParent. If the element inherits display: none from any
    // parent, the offsetParent property will be null (see
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
    // This check ensures we only clone the node when necessary.
    const htmlEl = element;
    if (htmlEl.offsetParent !== null) {
        return htmlEl.scrollWidth;
    }
    const clone = htmlEl.cloneNode(true);
    clone.style.setProperty('position', 'absolute');
    clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
    document.documentElement.appendChild(clone);
    const scrollWidth = clone.scrollWidth;
    clone.remove();
    return scrollWidth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1maWVsZC9kaXJlY3RpdmVzL2Zsb2F0aW5nLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFM0Q7Ozs7Ozs7Ozs7OztHQVlHO0FBUUgsTUFBTSxPQUFPLHlCQUF5QjtJQUlwQyxZQUFvQixXQUFvQztRQUFwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFIeEQscUNBQXFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFFd0IsQ0FBQztJQUU1RCwrREFBK0Q7SUFDL0QsUUFBUTtRQUNOLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQzs7MkhBZFUseUJBQXlCOytHQUF6Qix5QkFBeUI7Z0dBQXpCLHlCQUF5QjtrQkFQckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0NBQWtDO29CQUM1QyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLDJDQUEyQzt3QkFDcEQseUNBQXlDLEVBQUUsVUFBVTtxQkFDdEQ7aUJBQ0Y7aUdBR1UsUUFBUTtzQkFBaEIsS0FBSzs7QUFlUjs7O0dBR0c7QUFDSCxTQUFTLG1CQUFtQixDQUFDLE9BQW9CO0lBQy9DLHlFQUF5RTtJQUN6RSxzREFBc0Q7SUFDdEQsOEVBQThFO0lBQzlFLDREQUE0RDtJQUM1RCxNQUFNLE1BQU0sR0FBRyxPQUFzQixDQUFDO0lBQ3RDLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7UUFDaEMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQzNCO0lBRUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWdCLENBQUM7SUFDcEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3BFLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEludGVybmFsIGRpcmVjdGl2ZSB0aGF0IG1haW50YWlucyBhIE1EQyBmbG9hdGluZyBsYWJlbC4gVGhpcyBkaXJlY3RpdmUgZG9lcyBub3RcbiAqIHVzZSB0aGUgYE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uYCBjbGFzcywgYXMgaXQgaXMgbm90IHdvcnRoIHRoZSBzaXplIGNvc3Qgb2ZcbiAqIGluY2x1ZGluZyBpdCBqdXN0IHRvIG1lYXN1cmUgdGhlIGxhYmVsIHdpZHRoIGFuZCB0b2dnbGUgc29tZSBjbGFzc2VzLlxuICpcbiAqIFRoZSB1c2Ugb2YgYSBkaXJlY3RpdmUgYWxsb3dzIHVzIHRvIGNvbmRpdGlvbmFsbHkgcmVuZGVyIGEgZmxvYXRpbmcgbGFiZWwgaW4gdGhlXG4gKiB0ZW1wbGF0ZSB3aXRob3V0IGhhdmluZyB0byBtYW51YWxseSBtYW5hZ2UgaW5zdGFudGlhdGlvbiBhbmQgZGVzdHJ1Y3Rpb24gb2YgdGhlXG4gKiBmbG9hdGluZyBsYWJlbCBjb21wb25lbnQgYmFzZWQgb24uXG4gKlxuICogVGhlIGNvbXBvbmVudCBpcyByZXNwb25zaWJsZSBmb3Igc2V0dGluZyB1cCB0aGUgZmxvYXRpbmcgbGFiZWwgc3R5bGVzLCBtZWFzdXJpbmcgbGFiZWxcbiAqIHdpZHRoIGZvciB0aGUgb3V0bGluZSBub3RjaCwgYW5kIHByb3ZpZGluZyBpbnB1dHMgdGhhdCBjYW4gYmUgdXNlZCB0byB0b2dnbGUgdGhlXG4gKiBsYWJlbCdzIGZsb2F0aW5nIG9yIHJlcXVpcmVkIHN0YXRlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdsYWJlbFttYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLWZsb2F0aW5nLWxhYmVsIG1hdC1tZGMtZmxvYXRpbmctbGFiZWwnLFxuICAgICdbY2xhc3MubWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZV0nOiAnZmxvYXRpbmcnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsIHtcbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIGlzIGZsb2F0aW5nLiAqL1xuICBASW5wdXQoKSBmbG9hdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuXG4gIC8qKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgbGFiZWwuIFVzZWQgZm9yIHRoZSBvdXRsaW5lIG5vdGNoLiAqL1xuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiBlc3RpbWF0ZVNjcm9sbFdpZHRoKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgSFRNTCBlbGVtZW50IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwuICovXG4gIGdldCBlbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cbi8qKlxuICogRXN0aW1hdGVzIHRoZSBzY3JvbGwgd2lkdGggb2YgYW4gZWxlbWVudC5cbiAqIHZpYSBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL2MwYTExZWYwZDAwMGEwOThmZDBjMzcyYmU4ZjEyZDZhOTkzMDI4NTUvcGFja2FnZXMvbWRjLWRvbS9wb255ZmlsbC50c1xuICovXG5mdW5jdGlvbiBlc3RpbWF0ZVNjcm9sbFdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgLy8gQ2hlY2sgdGhlIG9mZnNldFBhcmVudC4gSWYgdGhlIGVsZW1lbnQgaW5oZXJpdHMgZGlzcGxheTogbm9uZSBmcm9tIGFueVxuICAvLyBwYXJlbnQsIHRoZSBvZmZzZXRQYXJlbnQgcHJvcGVydHkgd2lsbCBiZSBudWxsIChzZWVcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxFbGVtZW50L29mZnNldFBhcmVudCkuXG4gIC8vIFRoaXMgY2hlY2sgZW5zdXJlcyB3ZSBvbmx5IGNsb25lIHRoZSBub2RlIHdoZW4gbmVjZXNzYXJ5LlxuICBjb25zdCBodG1sRWwgPSBlbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICBpZiAoaHRtbEVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBodG1sRWwuc2Nyb2xsV2lkdGg7XG4gIH1cblxuICBjb25zdCBjbG9uZSA9IGh0bWxFbC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnQ7XG4gIGNsb25lLnN0eWxlLnNldFByb3BlcnR5KCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICBjbG9uZS5zdHlsZS5zZXRQcm9wZXJ0eSgndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgtOTk5OXB4LCAtOTk5OXB4KScpO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICBjb25zdCBzY3JvbGxXaWR0aCA9IGNsb25lLnNjcm9sbFdpZHRoO1xuICBjbG9uZS5yZW1vdmUoKTtcbiAgcmV0dXJuIHNjcm9sbFdpZHRoO1xufVxuIl19