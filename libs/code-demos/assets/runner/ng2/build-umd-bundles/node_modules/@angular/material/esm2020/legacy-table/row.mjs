/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CDK_ROW_TEMPLATE, CdkFooterRow, CdkFooterRowDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CdkNoDataRow, } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 * @deprecated Use `MatHeaderRowDef` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyHeaderRowDef extends CdkHeaderRowDef {
}
MatLegacyHeaderRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHeaderRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyHeaderRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyHeaderRowDef, selector: "[matHeaderRowDef]", inputs: { columns: ["matHeaderRowDef", "columns"], sticky: ["matHeaderRowDefSticky", "sticky"] }, providers: [{ provide: CdkHeaderRowDef, useExisting: MatLegacyHeaderRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHeaderRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matHeaderRowDef]',
                    providers: [{ provide: CdkHeaderRowDef, useExisting: MatLegacyHeaderRowDef }],
                    inputs: ['columns: matHeaderRowDef', 'sticky: matHeaderRowDefSticky'],
                }]
        }] });
/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 * @deprecated Use `MatFooterRowDef` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyFooterRowDef extends CdkFooterRowDef {
}
MatLegacyFooterRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFooterRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyFooterRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyFooterRowDef, selector: "[matFooterRowDef]", inputs: { columns: ["matFooterRowDef", "columns"], sticky: ["matFooterRowDefSticky", "sticky"] }, providers: [{ provide: CdkFooterRowDef, useExisting: MatLegacyFooterRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFooterRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matFooterRowDef]',
                    providers: [{ provide: CdkFooterRowDef, useExisting: MatLegacyFooterRowDef }],
                    inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
                }]
        }] });
/**
 * Data row definition for the mat-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 * @deprecated Use `MatRowDef` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyRowDef extends CdkRowDef {
}
MatLegacyRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyRowDef, selector: "[matRowDef]", inputs: { columns: ["matRowDefColumns", "columns"], when: ["matRowDefWhen", "when"] }, providers: [{ provide: CdkRowDef, useExisting: MatLegacyRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowDef]',
                    providers: [{ provide: CdkRowDef, useExisting: MatLegacyRowDef }],
                    inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
                }]
        }] });
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 * @deprecated Use `MatHeaderRow` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyHeaderRow extends CdkHeaderRow {
}
MatLegacyHeaderRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHeaderRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatLegacyHeaderRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyHeaderRow, selector: "mat-header-row, tr[mat-header-row]", host: { attributes: { "role": "row" }, classAttribute: "mat-header-row" }, providers: [{ provide: CdkHeaderRow, useExisting: MatLegacyHeaderRow }], exportAs: ["matHeaderRow"], usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, dependencies: [{ kind: "directive", type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHeaderRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-header-row, tr[mat-header-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-header-row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matHeaderRow',
                    providers: [{ provide: CdkHeaderRow, useExisting: MatLegacyHeaderRow }],
                }]
        }] });
/**
 * Footer template container that contains the cell outlet. Adds the right class and role.
 * @deprecated Use `MatFooterRow` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyFooterRow extends CdkFooterRow {
}
MatLegacyFooterRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFooterRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatLegacyFooterRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyFooterRow, selector: "mat-footer-row, tr[mat-footer-row]", host: { attributes: { "role": "row" }, classAttribute: "mat-footer-row" }, providers: [{ provide: CdkFooterRow, useExisting: MatLegacyFooterRow }], exportAs: ["matFooterRow"], usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, dependencies: [{ kind: "directive", type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFooterRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-footer-row, tr[mat-footer-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-footer-row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matFooterRow',
                    providers: [{ provide: CdkFooterRow, useExisting: MatLegacyFooterRow }],
                }]
        }] });
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 * @deprecated Use `MatRow` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyRow extends CdkRow {
}
MatLegacyRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatLegacyRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyRow, selector: "mat-row, tr[mat-row]", host: { attributes: { "role": "row" }, classAttribute: "mat-row" }, providers: [{ provide: CdkRow, useExisting: MatLegacyRow }], exportAs: ["matRow"], usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, dependencies: [{ kind: "directive", type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-row, tr[mat-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matRow',
                    providers: [{ provide: CdkRow, useExisting: MatLegacyRow }],
                }]
        }] });
/**
 * Row that can be used to display a message when no data is shown in the table.
 * @deprecated Use `MatNoDataRow` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyNoDataRow extends CdkNoDataRow {
    constructor() {
        super(...arguments);
        this._contentClassName = 'mat-no-data-row';
    }
}
MatLegacyNoDataRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyNoDataRow, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyNoDataRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyNoDataRow, selector: "ng-template[matNoDataRow]", providers: [{ provide: CdkNoDataRow, useExisting: MatLegacyNoDataRow }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyNoDataRow, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[matNoDataRow]',
                    providers: [{ provide: CdkNoDataRow, useExisting: MatLegacyNoDataRow }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS10YWJsZS9yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osZUFBZSxFQUNmLFlBQVksRUFDWixlQUFlLEVBQ2YsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7O0FBRS9GOzs7OztHQUtHO0FBTUgsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGVBQWU7O3VIQUE3QyxxQkFBcUI7MkdBQXJCLHFCQUFxQiw4SUFIckIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFDLENBQUM7Z0dBR2hFLHFCQUFxQjtrQkFMakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyx1QkFBdUIsRUFBQyxDQUFDO29CQUMzRSxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSwrQkFBK0IsQ0FBQztpQkFDdEU7O0FBR0Q7Ozs7O0dBS0c7QUFNSCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsZUFBZTs7dUhBQTdDLHFCQUFxQjsyR0FBckIscUJBQXFCLDhJQUhyQixDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUMsQ0FBQztnR0FHaEUscUJBQXFCO2tCQUxqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxX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O0FBR0Q7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxZQUFZO0lBSnBEOztRQUtXLHNCQUFpQixHQUFHLGlCQUFpQixDQUFDO0tBQ2hEOztvSEFGWSxrQkFBa0I7d0dBQWxCLGtCQUFrQixvREFGbEIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFDLENBQUM7Z0dBRTFELGtCQUFrQjtrQkFKOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxvQkFBb0IsRUFBQyxDQUFDO2lCQUN0RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDREtfUk9XX1RFTVBMQVRFLFxuICBDZGtGb290ZXJSb3csXG4gIENka0Zvb3RlclJvd0RlZixcbiAgQ2RrSGVhZGVyUm93LFxuICBDZGtIZWFkZXJSb3dEZWYsXG4gIENka1JvdyxcbiAgQ2RrUm93RGVmLFxuICBDZGtOb0RhdGFSb3csXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIERpcmVjdGl2ZSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEhlYWRlciByb3cgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSBoZWFkZXIgcm93J3MgdGVtcGxhdGUgYW5kIG90aGVyIGhlYWRlciBwcm9wZXJ0aWVzIHN1Y2ggYXMgdGhlIGNvbHVtbnMgdG8gZGlzcGxheS5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0SGVhZGVyUm93RGVmYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC90YWJsZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0SGVhZGVyUm93RGVmXScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtIZWFkZXJSb3dEZWYsIHVzZUV4aXN0aW5nOiBNYXRMZWdhY3lIZWFkZXJSb3dEZWZ9XSxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IG1hdEhlYWRlclJvd0RlZicsICdzdGlja3k6IG1hdEhlYWRlclJvd0RlZlN0aWNreSddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lIZWFkZXJSb3dEZWYgZXh0ZW5kcyBDZGtIZWFkZXJSb3dEZWYge31cblxuLyoqXG4gKiBGb290ZXIgcm93IGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgZm9vdGVyIHJvdydzIHRlbXBsYXRlIGFuZCBvdGhlciBmb290ZXIgcHJvcGVydGllcyBzdWNoIGFzIHRoZSBjb2x1bW5zIHRvIGRpc3BsYXkuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdEZvb3RlclJvd0RlZmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdEZvb3RlclJvd0RlZl0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrRm9vdGVyUm93RGVmLCB1c2VFeGlzdGluZzogTWF0TGVnYWN5Rm9vdGVyUm93RGVmfV0sXG4gIGlucHV0czogWydjb2x1bW5zOiBtYXRGb290ZXJSb3dEZWYnLCAnc3RpY2t5OiBtYXRGb290ZXJSb3dEZWZTdGlja3knXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Rm9vdGVyUm93RGVmIGV4dGVuZHMgQ2RrRm9vdGVyUm93RGVmIHt9XG5cbi8qKlxuICogRGF0YSByb3cgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSBkYXRhIHJvdydzIHRlbXBsYXRlIGFuZCBvdGhlciBwcm9wZXJ0aWVzIHN1Y2ggYXMgdGhlIGNvbHVtbnMgdG8gZGlzcGxheSBhbmRcbiAqIGEgd2hlbiBwcmVkaWNhdGUgdGhhdCBkZXNjcmliZXMgd2hlbiB0aGlzIHJvdyBzaG91bGQgYmUgdXNlZC5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Um93RGVmYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC90YWJsZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Um93RGVmXScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtSb3dEZWYsIHVzZUV4aXN0aW5nOiBNYXRMZWdhY3lSb3dEZWZ9XSxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IG1hdFJvd0RlZkNvbHVtbnMnLCAnd2hlbjogbWF0Um93RGVmV2hlbiddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lSb3dEZWY8VD4gZXh0ZW5kcyBDZGtSb3dEZWY8VD4ge31cblxuLyoqXG4gKiBIZWFkZXIgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0SGVhZGVyUm93YCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC90YWJsZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtaGVhZGVyLXJvdywgdHJbbWF0LWhlYWRlci1yb3ddJyxcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWhlYWRlci1yb3cnLFxuICAgICdyb2xlJzogJ3JvdycsXG4gIH0sXG4gIC8vIFNlZSBub3RlIG9uIENka1RhYmxlIGZvciBleHBsYW5hdGlvbiBvbiB3aHkgdGhpcyB1c2VzIHRoZSBkZWZhdWx0IGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtYXRIZWFkZXJSb3cnLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrSGVhZGVyUm93LCB1c2VFeGlzdGluZzogTWF0TGVnYWN5SGVhZGVyUm93fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUhlYWRlclJvdyBleHRlbmRzIENka0hlYWRlclJvdyB7fVxuXG4vKipcbiAqIEZvb3RlciB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBjb250YWlucyB0aGUgY2VsbCBvdXRsZXQuIEFkZHMgdGhlIHJpZ2h0IGNsYXNzIGFuZCByb2xlLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRGb290ZXJSb3dgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3RhYmxlYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1mb290ZXItcm93LCB0clttYXQtZm9vdGVyLXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtZm9vdGVyLXJvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21hdEZvb3RlclJvdycsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtGb290ZXJSb3csIHVzZUV4aXN0aW5nOiBNYXRMZWdhY3lGb290ZXJSb3d9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Rm9vdGVyUm93IGV4dGVuZHMgQ2RrRm9vdGVyUm93IHt9XG5cbi8qKlxuICogRGF0YSByb3cgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Um93YCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC90YWJsZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcm93LCB0clttYXQtcm93XScsXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1yb3cnLFxuICAgICdyb2xlJzogJ3JvdycsXG4gIH0sXG4gIC8vIFNlZSBub3RlIG9uIENka1RhYmxlIGZvciBleHBsYW5hdGlvbiBvbiB3aHkgdGhpcyB1c2VzIHRoZSBkZWZhdWx0IGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtYXRSb3cnLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrUm93LCB1c2VFeGlzdGluZzogTWF0TGVnYWN5Um93fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVJvdyBleHRlbmRzIENka1JvdyB7fVxuXG4vKipcbiAqIFJvdyB0aGF0IGNhbiBiZSB1c2VkIHRvIGRpc3BsYXkgYSBtZXNzYWdlIHdoZW4gbm8gZGF0YSBpcyBzaG93biBpbiB0aGUgdGFibGUuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdE5vRGF0YVJvd2AgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbWF0Tm9EYXRhUm93XScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtOb0RhdGFSb3csIHVzZUV4aXN0aW5nOiBNYXRMZWdhY3lOb0RhdGFSb3d9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Tm9EYXRhUm93IGV4dGVuZHMgQ2RrTm9EYXRhUm93IHtcbiAgb3ZlcnJpZGUgX2NvbnRlbnRDbGFzc05hbWUgPSAnbWF0LW5vLWRhdGEtcm93Jztcbn1cbiJdfQ==