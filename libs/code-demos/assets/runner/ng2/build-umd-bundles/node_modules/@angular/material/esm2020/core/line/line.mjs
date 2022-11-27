/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule, Directive } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { MatCommonModule } from '../common-behaviors/common-module';
import * as i0 from "@angular/core";
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(MatLine) query, then
 * counted by checking the query list's length.
 */
export class MatLine {
}
MatLine.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLine, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLine.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLine, selector: "[mat-line], [matLine]", host: { classAttribute: "mat-line" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLine, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-line], [matLine]',
                    host: { 'class': 'mat-line' },
                }]
        }] });
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
export function setLines(lines, element, prefix = 'mat') {
    // Note: doesn't need to unsubscribe, because `changes`
    // gets completed by Angular when the view is destroyed.
    lines.changes.pipe(startWith(lines)).subscribe(({ length }) => {
        setClass(element, `${prefix}-2-line`, false);
        setClass(element, `${prefix}-3-line`, false);
        setClass(element, `${prefix}-multi-line`, false);
        if (length === 2 || length === 3) {
            setClass(element, `${prefix}-${length}-line`, true);
        }
        else if (length > 3) {
            setClass(element, `${prefix}-multi-line`, true);
        }
    });
}
/** Adds or removes a class from an element. */
function setClass(element, className, isAdd) {
    element.nativeElement.classList.toggle(className, isAdd);
}
export class MatLineModule {
}
MatLineModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLineModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLineModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLineModule, declarations: [MatLine], imports: [MatCommonModule], exports: [MatLine, MatCommonModule] });
MatLineModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLineModule, imports: [MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLineModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule],
                    exports: [MatLine, MatCommonModule],
                    declarations: [MatLine],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jb3JlL2xpbmUvbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFFbEU7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyxPQUFPOzt5R0FBUCxPQUFPOzZGQUFQLE9BQU87Z0dBQVAsT0FBTztrQkFKbkIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDO2lCQUM1Qjs7QUFHRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsUUFBUSxDQUN0QixLQUF5QixFQUN6QixPQUFnQyxFQUNoQyxNQUFNLEdBQUcsS0FBSztJQUVkLHVEQUF1RDtJQUN2RCx3REFBd0Q7SUFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFFO1FBQzFELFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWpELElBQUksTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLElBQUksTUFBTSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckQ7YUFBTSxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckIsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsK0NBQStDO0FBQy9DLFNBQVMsUUFBUSxDQUFDLE9BQWdDLEVBQUUsU0FBaUIsRUFBRSxLQUFjO0lBQ25GLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQU9ELE1BQU0sT0FBTyxhQUFhOzsrR0FBYixhQUFhO2dIQUFiLGFBQWEsaUJBcENiLE9BQU8sYUFnQ1IsZUFBZSxhQWhDZCxPQUFPLEVBaUNDLGVBQWU7Z0hBR3ZCLGFBQWEsWUFKZCxlQUFlLEVBQ04sZUFBZTtnR0FHdkIsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUM7b0JBQ25DLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZSwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBRdWVyeUxpc3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICcuLi9jb21tb24tYmVoYXZpb3JzL2NvbW1vbi1tb2R1bGUnO1xuXG4vKipcbiAqIFNoYXJlZCBkaXJlY3RpdmUgdG8gY291bnQgbGluZXMgaW5zaWRlIGEgdGV4dCBhcmVhLCBzdWNoIGFzIGEgbGlzdCBpdGVtLlxuICogTGluZSBlbGVtZW50cyBjYW4gYmUgZXh0cmFjdGVkIHdpdGggYSBAQ29udGVudENoaWxkcmVuKE1hdExpbmUpIHF1ZXJ5LCB0aGVuXG4gKiBjb3VudGVkIGJ5IGNoZWNraW5nIHRoZSBxdWVyeSBsaXN0J3MgbGVuZ3RoLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWxpbmVdLCBbbWF0TGluZV0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1saW5lJ30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpbmUge31cblxuLyoqXG4gKiBIZWxwZXIgdGhhdCB0YWtlcyBhIHF1ZXJ5IGxpc3Qgb2YgbGluZXMgYW5kIHNldHMgdGhlIGNvcnJlY3QgY2xhc3Mgb24gdGhlIGhvc3QuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRMaW5lcyhcbiAgbGluZXM6IFF1ZXJ5TGlzdDx1bmtub3duPixcbiAgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gIHByZWZpeCA9ICdtYXQnLFxuKSB7XG4gIC8vIE5vdGU6IGRvZXNuJ3QgbmVlZCB0byB1bnN1YnNjcmliZSwgYmVjYXVzZSBgY2hhbmdlc2BcbiAgLy8gZ2V0cyBjb21wbGV0ZWQgYnkgQW5ndWxhciB3aGVuIHRoZSB2aWV3IGlzIGRlc3Ryb3llZC5cbiAgbGluZXMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aChsaW5lcykpLnN1YnNjcmliZSgoe2xlbmd0aH0pID0+IHtcbiAgICBzZXRDbGFzcyhlbGVtZW50LCBgJHtwcmVmaXh9LTItbGluZWAsIGZhbHNlKTtcbiAgICBzZXRDbGFzcyhlbGVtZW50LCBgJHtwcmVmaXh9LTMtbGluZWAsIGZhbHNlKTtcbiAgICBzZXRDbGFzcyhlbGVtZW50LCBgJHtwcmVmaXh9LW11bHRpLWxpbmVgLCBmYWxzZSk7XG5cbiAgICBpZiAobGVuZ3RoID09PSAyIHx8IGxlbmd0aCA9PT0gMykge1xuICAgICAgc2V0Q2xhc3MoZWxlbWVudCwgYCR7cHJlZml4fS0ke2xlbmd0aH0tbGluZWAsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAobGVuZ3RoID4gMykge1xuICAgICAgc2V0Q2xhc3MoZWxlbWVudCwgYCR7cHJlZml4fS1tdWx0aS1saW5lYCwgdHJ1ZSk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqIEFkZHMgb3IgcmVtb3ZlcyBhIGNsYXNzIGZyb20gYW4gZWxlbWVudC4gKi9cbmZ1bmN0aW9uIHNldENsYXNzKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lLCBpc0FkZCk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0TGluZSwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0TGluZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpbmVNb2R1bGUge31cbiJdfQ==