/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * A directive that makes a span editable and exposes functions to modify and retrieve the
 * element's contents.
 */
export class MatChipEditInput {
    constructor(_elementRef, _document) {
        this._elementRef = _elementRef;
        this._document = _document;
    }
    initialize(initialValue) {
        this.getNativeElement().focus();
        this.setValue(initialValue);
    }
    getNativeElement() {
        return this._elementRef.nativeElement;
    }
    setValue(value) {
        this.getNativeElement().textContent = value;
        this._moveCursorToEndOfInput();
    }
    getValue() {
        return this.getNativeElement().textContent || '';
    }
    _moveCursorToEndOfInput() {
        const range = this._document.createRange();
        range.selectNodeContents(this.getNativeElement());
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
MatChipEditInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatChipEditInput, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatChipEditInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatChipEditInput, selector: "span[matChipEditInput]", host: { attributes: { "role": "textbox", "tabindex": "-1", "contenteditable": "true" }, classAttribute: "mat-chip-edit-input" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatChipEditInput, decorators: [{
            type: Directive,
            args: [{
                    selector: 'span[matChipEditInput]',
                    host: {
                        'class': 'mat-chip-edit-input',
                        'role': 'textbox',
                        'tabindex': '-1',
                        'contenteditable': 'true',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1lZGl0LWlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2NoaXBzL2NoaXAtZWRpdC1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUV6Qzs7O0dBR0c7QUFVSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQ21CLFdBQXVCLEVBQ0wsU0FBYztRQURoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUNMLGNBQVMsR0FBVCxTQUFTLENBQUs7SUFDaEQsQ0FBQztJQUVKLFVBQVUsQ0FBQyxZQUFvQjtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFTyx1QkFBdUI7UUFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNsRCxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUcsQ0FBQztRQUNuQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDOztrSEEvQlUsZ0JBQWdCLDRDQUdqQixRQUFRO3NHQUhQLGdCQUFnQjtnR0FBaEIsZ0JBQWdCO2tCQVQ1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUscUJBQXFCO3dCQUM5QixNQUFNLEVBQUUsU0FBUzt3QkFDakIsVUFBVSxFQUFFLElBQUk7d0JBQ2hCLGlCQUFpQixFQUFFLE1BQU07cUJBQzFCO2lCQUNGOzswQkFJSSxNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbWFrZXMgYSBzcGFuIGVkaXRhYmxlIGFuZCBleHBvc2VzIGZ1bmN0aW9ucyB0byBtb2RpZnkgYW5kIHJldHJpZXZlIHRoZVxuICogZWxlbWVudCdzIGNvbnRlbnRzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdzcGFuW21hdENoaXBFZGl0SW5wdXRdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtY2hpcC1lZGl0LWlucHV0JyxcbiAgICAncm9sZSc6ICd0ZXh0Ym94JyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICdjb250ZW50ZWRpdGFibGUnOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBFZGl0SW5wdXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgX2RvY3VtZW50OiBhbnksXG4gICkge31cblxuICBpbml0aWFsaXplKGluaXRpYWxWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5nZXROYXRpdmVFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB0aGlzLnNldFZhbHVlKGluaXRpYWxWYWx1ZSk7XG4gIH1cblxuICBnZXROYXRpdmVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuZ2V0TmF0aXZlRWxlbWVudCgpLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgdGhpcy5fbW92ZUN1cnNvclRvRW5kT2ZJbnB1dCgpO1xuICB9XG5cbiAgZ2V0VmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVFbGVtZW50KCkudGV4dENvbnRlbnQgfHwgJyc7XG4gIH1cblxuICBwcml2YXRlIF9tb3ZlQ3Vyc29yVG9FbmRPZklucHV0KCkge1xuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGhpcy5nZXROYXRpdmVFbGVtZW50KCkpO1xuICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkhO1xuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICB9XG59XG4iXX0=