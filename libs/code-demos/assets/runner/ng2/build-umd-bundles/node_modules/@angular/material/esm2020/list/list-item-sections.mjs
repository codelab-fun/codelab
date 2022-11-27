/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Inject, Optional } from '@angular/core';
import { LIST_OPTION } from './list-option-types';
import * as i0 from "@angular/core";
/**
 * Directive capturing the title of a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content for the title never wraps. There can only be a single title per list item.
 */
export class MatListItemTitle {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
MatListItemTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemTitle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatListItemTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatListItemTitle, selector: "[matListItemTitle]", host: { classAttribute: "mat-mdc-list-item-title mdc-list-item__primary-text" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemTitle]',
                    host: { 'class': 'mat-mdc-list-item-title mdc-list-item__primary-text' },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
/**
 * Directive capturing a line in a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content inside a line never wraps. There can be at maximum two lines per list item.
 */
export class MatListItemLine {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
MatListItemLine.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemLine, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatListItemLine.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatListItemLine, selector: "[matListItemLine]", host: { classAttribute: "mat-mdc-list-item-line mdc-list-item__secondary-text" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemLine, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemLine]',
                    host: { 'class': 'mat-mdc-list-item-line mdc-list-item__secondary-text' },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
/**
 * Directive matching an optional meta section for list items.
 *
 * List items can reserve space at the end of an item to display a control,
 * button or additional text content.
 */
export class MatListItemMeta {
}
MatListItemMeta.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemMeta, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListItemMeta.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatListItemMeta, selector: "[matListItemMeta]", host: { classAttribute: "mat-mdc-list-item-meta mdc-list-item__end" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemMeta, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemMeta]',
                    host: { 'class': 'mat-mdc-list-item-meta mdc-list-item__end' },
                }]
        }] });
/**
 * @docs-private
 *
 * MDC uses the very intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end`
 * to position content such as icons or checkboxes that comes either before or after the text
 * content respectively. This directive detects the placement of the checkbox and applies the
 * correct MDC class to position the icon/avatar on the opposite side.
 */
export class _MatListItemGraphicBase {
    constructor(_listOption) {
        this._listOption = _listOption;
    }
    _isAlignedAtStart() {
        // By default, in all list items the graphic is aligned at start. In list options,
        // the graphic is only aligned at start if the checkbox is at the end.
        return !this._listOption || this._listOption?._getCheckboxPosition() === 'after';
    }
}
_MatListItemGraphicBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatListItemGraphicBase, deps: [{ token: LIST_OPTION, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
_MatListItemGraphicBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _MatListItemGraphicBase, host: { properties: { "class.mdc-list-item__start": "_isAlignedAtStart()", "class.mdc-list-item__end": "!_isAlignedAtStart()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatListItemGraphicBase, decorators: [{
            type: Directive,
            args: [{
                    host: {
                        // MDC uses intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end`
                        // to position content such as icons or checkboxes that comes either before or after the text
                        // content respectively. This directive detects the placement of the checkbox and applies the
                        // correct MDC class to position the icon/avatar on the opposite side.
                        '[class.mdc-list-item__start]': '_isAlignedAtStart()',
                        '[class.mdc-list-item__end]': '!_isAlignedAtStart()',
                    },
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LIST_OPTION]
                }] }]; } });
/**
 * Directive matching an optional avatar within a list item.
 *
 * List items can reserve space at the beginning of an item to display an avatar.
 */
export class MatListItemAvatar extends _MatListItemGraphicBase {
}
MatListItemAvatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemAvatar, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatListItemAvatar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatListItemAvatar, selector: "[matListItemAvatar]", host: { classAttribute: "mat-mdc-list-item-avatar" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemAvatar, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemAvatar]',
                    host: { 'class': 'mat-mdc-list-item-avatar' },
                }]
        }] });
/**
 * Directive matching an optional icon within a list item.
 *
 * List items can reserve space at the beginning of an item to display an icon.
 */
export class MatListItemIcon extends _MatListItemGraphicBase {
}
MatListItemIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemIcon, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatListItemIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatListItemIcon, selector: "[matListItemIcon]", host: { classAttribute: "mat-mdc-list-item-icon" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatListItemIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemIcon]',
                    host: { 'class': 'mat-mdc-list-item-icon' },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLXNlY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xpc3QvbGlzdC1pdGVtLXNlY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFdBQVcsRUFBYSxNQUFNLHFCQUFxQixDQUFDOztBQUU1RDs7Ozs7R0FLRztBQUtILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBbUIsV0FBb0M7UUFBcEMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO0lBQUcsQ0FBQzs7a0hBRGhELGdCQUFnQjtzR0FBaEIsZ0JBQWdCO2dHQUFoQixnQkFBZ0I7a0JBSjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLHFEQUFxRCxFQUFDO2lCQUN2RTs7QUFLRDs7Ozs7R0FLRztBQUtILE1BQU0sT0FBTyxlQUFlO0lBQzFCLFlBQW1CLFdBQW9DO1FBQXBDLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtJQUFHLENBQUM7O2lIQURoRCxlQUFlO3FHQUFmLGVBQWU7Z0dBQWYsZUFBZTtrQkFKM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsc0RBQXNELEVBQUM7aUJBQ3hFOztBQUtEOzs7OztHQUtHO0FBS0gsTUFBTSxPQUFPLGVBQWU7O2lIQUFmLGVBQWU7cUdBQWYsZUFBZTtnR0FBZixlQUFlO2tCQUozQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSwyQ0FBMkMsRUFBQztpQkFDN0Q7O0FBR0Q7Ozs7Ozs7R0FPRztBQVdILE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBb0QsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0lBRS9FLGlCQUFpQjtRQUNmLGtGQUFrRjtRQUNsRixzRUFBc0U7UUFDdEUsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxLQUFLLE9BQU8sQ0FBQztJQUNuRixDQUFDOzt5SEFQVSx1QkFBdUIsa0JBQ0YsV0FBVzs2R0FEaEMsdUJBQXVCO2dHQUF2Qix1QkFBdUI7a0JBVm5DLFNBQVM7bUJBQUM7b0JBQ1QsSUFBSSxFQUFFO3dCQUNKLHVGQUF1Rjt3QkFDdkYsNkZBQTZGO3dCQUM3Riw2RkFBNkY7d0JBQzdGLHNFQUFzRTt3QkFDdEUsOEJBQThCLEVBQUUscUJBQXFCO3dCQUNyRCw0QkFBNEIsRUFBRSxzQkFBc0I7cUJBQ3JEO2lCQUNGOzswQkFFYyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFdBQVc7O0FBUzdDOzs7O0dBSUc7QUFLSCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsdUJBQXVCOzttSEFBakQsaUJBQWlCO3VHQUFqQixpQkFBaUI7Z0dBQWpCLGlCQUFpQjtrQkFKN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUM7aUJBQzVDOztBQUdEOzs7O0dBSUc7QUFLSCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSx1QkFBdUI7O2lIQUEvQyxlQUFlO3FHQUFmLGVBQWU7Z0dBQWYsZUFBZTtrQkFKM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUM7aUJBQzFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TElTVF9PUFRJT04sIExpc3RPcHRpb259IGZyb20gJy4vbGlzdC1vcHRpb24tdHlwZXMnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBjYXB0dXJpbmcgdGhlIHRpdGxlIG9mIGEgbGlzdCBpdGVtLiBBIGxpc3QgaXRlbSB1c3VhbGx5IGNvbnNpc3RzIG9mIGFcbiAqIHRpdGxlIGFuZCBvcHRpb25hbCBzZWNvbmRhcnkgb3IgdGVydGlhcnkgbGluZXMuXG4gKlxuICogVGV4dCBjb250ZW50IGZvciB0aGUgdGl0bGUgbmV2ZXIgd3JhcHMuIFRoZXJlIGNhbiBvbmx5IGJlIGEgc2luZ2xlIHRpdGxlIHBlciBsaXN0IGl0ZW0uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRMaXN0SXRlbVRpdGxlXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWl0ZW0tdGl0bGUgbWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0J30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RJdGVtVGl0bGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxufVxuXG4vKipcbiAqIERpcmVjdGl2ZSBjYXB0dXJpbmcgYSBsaW5lIGluIGEgbGlzdCBpdGVtLiBBIGxpc3QgaXRlbSB1c3VhbGx5IGNvbnNpc3RzIG9mIGFcbiAqIHRpdGxlIGFuZCBvcHRpb25hbCBzZWNvbmRhcnkgb3IgdGVydGlhcnkgbGluZXMuXG4gKlxuICogVGV4dCBjb250ZW50IGluc2lkZSBhIGxpbmUgbmV2ZXIgd3JhcHMuIFRoZXJlIGNhbiBiZSBhdCBtYXhpbXVtIHR3byBsaW5lcyBwZXIgbGlzdCBpdGVtLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0TGlzdEl0ZW1MaW5lXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWl0ZW0tbGluZSBtZGMtbGlzdC1pdGVtX19zZWNvbmRhcnktdGV4dCd9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0SXRlbUxpbmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxufVxuXG4vKipcbiAqIERpcmVjdGl2ZSBtYXRjaGluZyBhbiBvcHRpb25hbCBtZXRhIHNlY3Rpb24gZm9yIGxpc3QgaXRlbXMuXG4gKlxuICogTGlzdCBpdGVtcyBjYW4gcmVzZXJ2ZSBzcGFjZSBhdCB0aGUgZW5kIG9mIGFuIGl0ZW0gdG8gZGlzcGxheSBhIGNvbnRyb2wsXG4gKiBidXR0b24gb3IgYWRkaXRpb25hbCB0ZXh0IGNvbnRlbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRMaXN0SXRlbU1ldGFdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWxpc3QtaXRlbS1tZXRhIG1kYy1saXN0LWl0ZW1fX2VuZCd9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0SXRlbU1ldGEge31cblxuLyoqXG4gKiBAZG9jcy1wcml2YXRlXG4gKlxuICogTURDIHVzZXMgdGhlIHZlcnkgaW50dWl0aXZlbHkgbmFtZWQgY2xhc3NlcyBgLm1kYy1saXN0LWl0ZW1fX3N0YXJ0YCBhbmQgYC5tYXQtbGlzdC1pdGVtX19lbmRgXG4gKiB0byBwb3NpdGlvbiBjb250ZW50IHN1Y2ggYXMgaWNvbnMgb3IgY2hlY2tib3hlcyB0aGF0IGNvbWVzIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlIHRleHRcbiAqIGNvbnRlbnQgcmVzcGVjdGl2ZWx5LiBUaGlzIGRpcmVjdGl2ZSBkZXRlY3RzIHRoZSBwbGFjZW1lbnQgb2YgdGhlIGNoZWNrYm94IGFuZCBhcHBsaWVzIHRoZVxuICogY29ycmVjdCBNREMgY2xhc3MgdG8gcG9zaXRpb24gdGhlIGljb24vYXZhdGFyIG9uIHRoZSBvcHBvc2l0ZSBzaWRlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgaG9zdDoge1xuICAgIC8vIE1EQyB1c2VzIGludHVpdGl2ZWx5IG5hbWVkIGNsYXNzZXMgYC5tZGMtbGlzdC1pdGVtX19zdGFydGAgYW5kIGAubWF0LWxpc3QtaXRlbV9fZW5kYFxuICAgIC8vIHRvIHBvc2l0aW9uIGNvbnRlbnQgc3VjaCBhcyBpY29ucyBvciBjaGVja2JveGVzIHRoYXQgY29tZXMgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgdGV4dFxuICAgIC8vIGNvbnRlbnQgcmVzcGVjdGl2ZWx5LiBUaGlzIGRpcmVjdGl2ZSBkZXRlY3RzIHRoZSBwbGFjZW1lbnQgb2YgdGhlIGNoZWNrYm94IGFuZCBhcHBsaWVzIHRoZVxuICAgIC8vIGNvcnJlY3QgTURDIGNsYXNzIHRvIHBvc2l0aW9uIHRoZSBpY29uL2F2YXRhciBvbiB0aGUgb3Bwb3NpdGUgc2lkZS5cbiAgICAnW2NsYXNzLm1kYy1saXN0LWl0ZW1fX3N0YXJ0XSc6ICdfaXNBbGlnbmVkQXRTdGFydCgpJyxcbiAgICAnW2NsYXNzLm1kYy1saXN0LWl0ZW1fX2VuZF0nOiAnIV9pc0FsaWduZWRBdFN0YXJ0KCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBfTWF0TGlzdEl0ZW1HcmFwaGljQmFzZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTElTVF9PUFRJT04pIHB1YmxpYyBfbGlzdE9wdGlvbjogTGlzdE9wdGlvbikge31cblxuICBfaXNBbGlnbmVkQXRTdGFydCgpIHtcbiAgICAvLyBCeSBkZWZhdWx0LCBpbiBhbGwgbGlzdCBpdGVtcyB0aGUgZ3JhcGhpYyBpcyBhbGlnbmVkIGF0IHN0YXJ0LiBJbiBsaXN0IG9wdGlvbnMsXG4gICAgLy8gdGhlIGdyYXBoaWMgaXMgb25seSBhbGlnbmVkIGF0IHN0YXJ0IGlmIHRoZSBjaGVja2JveCBpcyBhdCB0aGUgZW5kLlxuICAgIHJldHVybiAhdGhpcy5fbGlzdE9wdGlvbiB8fCB0aGlzLl9saXN0T3B0aW9uPy5fZ2V0Q2hlY2tib3hQb3NpdGlvbigpID09PSAnYWZ0ZXInO1xuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIG1hdGNoaW5nIGFuIG9wdGlvbmFsIGF2YXRhciB3aXRoaW4gYSBsaXN0IGl0ZW0uXG4gKlxuICogTGlzdCBpdGVtcyBjYW4gcmVzZXJ2ZSBzcGFjZSBhdCB0aGUgYmVnaW5uaW5nIG9mIGFuIGl0ZW0gdG8gZGlzcGxheSBhbiBhdmF0YXIuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRMaXN0SXRlbUF2YXRhcl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtbGlzdC1pdGVtLWF2YXRhcid9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0SXRlbUF2YXRhciBleHRlbmRzIF9NYXRMaXN0SXRlbUdyYXBoaWNCYXNlIHt9XG5cbi8qKlxuICogRGlyZWN0aXZlIG1hdGNoaW5nIGFuIG9wdGlvbmFsIGljb24gd2l0aGluIGEgbGlzdCBpdGVtLlxuICpcbiAqIExpc3QgaXRlbXMgY2FuIHJlc2VydmUgc3BhY2UgYXQgdGhlIGJlZ2lubmluZyBvZiBhbiBpdGVtIHRvIGRpc3BsYXkgYW4gaWNvbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdExpc3RJdGVtSWNvbl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtbGlzdC1pdGVtLWljb24nfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdEl0ZW1JY29uIGV4dGVuZHMgX01hdExpc3RJdGVtR3JhcGhpY0Jhc2Uge31cbiJdfQ==