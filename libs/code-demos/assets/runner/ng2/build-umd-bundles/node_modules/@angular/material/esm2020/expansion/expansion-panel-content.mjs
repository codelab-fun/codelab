/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, TemplateRef, Inject, Optional } from '@angular/core';
import { MAT_EXPANSION_PANEL } from './expansion-panel-base';
import * as i0 from "@angular/core";
/**
 * Expansion panel content that will be rendered lazily
 * after the panel is opened for the first time.
 */
export class MatExpansionPanelContent {
    constructor(_template, _expansionPanel) {
        this._template = _template;
        this._expansionPanel = _expansionPanel;
    }
}
MatExpansionPanelContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatExpansionPanelContent, deps: [{ token: i0.TemplateRef }, { token: MAT_EXPANSION_PANEL, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatExpansionPanelContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatExpansionPanelContent, selector: "ng-template[matExpansionPanelContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatExpansionPanelContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[matExpansionPanelContent]',
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_EXPANSION_PANEL]
                }, {
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLWNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZXhwYW5zaW9uL2V4cGFuc2lvbi1wYW5lbC1jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFDLG1CQUFtQixFQUF3QixNQUFNLHdCQUF3QixDQUFDOztBQUVsRjs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQ1MsU0FBMkIsRUFDYyxlQUF1QztRQURoRixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUNjLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtJQUN0RixDQUFDOzswSEFKTyx3QkFBd0IsNkNBR3pCLG1CQUFtQjs4R0FIbEIsd0JBQXdCO2dHQUF4Qix3QkFBd0I7a0JBSHBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztpQkFDbEQ7OzBCQUlJLE1BQU07MkJBQUMsbUJBQW1COzswQkFBRyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgSW5qZWN0LCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01BVF9FWFBBTlNJT05fUEFORUwsIE1hdEV4cGFuc2lvblBhbmVsQmFzZX0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwtYmFzZSc7XG5cbi8qKlxuICogRXhwYW5zaW9uIHBhbmVsIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHJlbmRlcmVkIGxhemlseVxuICogYWZ0ZXIgdGhlIHBhbmVsIGlzIG9wZW5lZCBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21hdEV4cGFuc2lvblBhbmVsQ29udGVudF0nLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFeHBhbnNpb25QYW5lbENvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX3RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIEBJbmplY3QoTUFUX0VYUEFOU0lPTl9QQU5FTCkgQE9wdGlvbmFsKCkgcHVibGljIF9leHBhbnNpb25QYW5lbD86IE1hdEV4cGFuc2lvblBhbmVsQmFzZSxcbiAgKSB7fVxufVxuIl19