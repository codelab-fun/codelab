/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input } from '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkHeaderCell, CdkHeaderCellDef, } from '@angular/cdk/table';
import * as i0 from "@angular/core";
/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 * @deprecated Use `MatCellDef` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCellDef extends CdkCellDef {
}
MatLegacyCellDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCellDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCellDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCellDef, selector: "[matCellDef]", providers: [{ provide: CdkCellDef, useExisting: MatLegacyCellDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCellDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matCellDef]',
                    providers: [{ provide: CdkCellDef, useExisting: MatLegacyCellDef }],
                }]
        }] });
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 * @deprecated Use `MatHeaderCellDef` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyHeaderCellDef extends CdkHeaderCellDef {
}
MatLegacyHeaderCellDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHeaderCellDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyHeaderCellDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyHeaderCellDef, selector: "[matHeaderCellDef]", providers: [{ provide: CdkHeaderCellDef, useExisting: MatLegacyHeaderCellDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHeaderCellDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matHeaderCellDef]',
                    providers: [{ provide: CdkHeaderCellDef, useExisting: MatLegacyHeaderCellDef }],
                }]
        }] });
/**
 * Footer cell definition for the mat-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 * @deprecated Use `MatFooterCellDef` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyFooterCellDef extends CdkFooterCellDef {
}
MatLegacyFooterCellDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFooterCellDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyFooterCellDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyFooterCellDef, selector: "[matFooterCellDef]", providers: [{ provide: CdkFooterCellDef, useExisting: MatLegacyFooterCellDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFooterCellDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matFooterCellDef]',
                    providers: [{ provide: CdkFooterCellDef, useExisting: MatLegacyFooterCellDef }],
                }]
        }] });
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 * @deprecated Use `MatColumnDef` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyColumnDef extends CdkColumnDef {
    /** Unique name for this column. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._setNameInput(name);
    }
    /**
     * Add "mat-column-" prefix in addition to "cdk-column-" prefix.
     * In the future, this will only add "mat-column-" and columnCssClassName
     * will change from type string[] to string.
     * @docs-private
     */
    _updateColumnCssClassName() {
        super._updateColumnCssClassName();
        this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`);
    }
}
MatLegacyColumnDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyColumnDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyColumnDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyColumnDef, selector: "[matColumnDef]", inputs: { sticky: "sticky", name: ["matColumnDef", "name"] }, providers: [
        { provide: CdkColumnDef, useExisting: MatLegacyColumnDef },
        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: MatLegacyColumnDef },
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyColumnDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matColumnDef]',
                    inputs: ['sticky'],
                    providers: [
                        { provide: CdkColumnDef, useExisting: MatLegacyColumnDef },
                        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: MatLegacyColumnDef },
                    ],
                }]
        }], propDecorators: { name: [{
                type: Input,
                args: ['matColumnDef']
            }] } });
/**
 * Header cell template container that adds the right classes and role.
 * @deprecated Use `MatHeaderCell` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyHeaderCell extends CdkHeaderCell {
}
MatLegacyHeaderCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHeaderCell, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyHeaderCell.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyHeaderCell, selector: "mat-header-cell, th[mat-header-cell]", host: { attributes: { "role": "columnheader" }, classAttribute: "mat-header-cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHeaderCell, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-header-cell, th[mat-header-cell]',
                    host: {
                        'class': 'mat-header-cell',
                        'role': 'columnheader',
                    },
                }]
        }] });
/**
 * Footer cell template container that adds the right classes and role.
 * @deprecated Use `MatFooterCell` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyFooterCell extends CdkFooterCell {
}
MatLegacyFooterCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFooterCell, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyFooterCell.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyFooterCell, selector: "mat-footer-cell, td[mat-footer-cell]", host: { attributes: { "role": "gridcell" }, classAttribute: "mat-footer-cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFooterCell, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-footer-cell, td[mat-footer-cell]',
                    host: {
                        'class': 'mat-footer-cell',
                        'role': 'gridcell',
                    },
                }]
        }] });
/**
 * Cell template container that adds the right classes and role.
 * @deprecated Use `MatCell` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCell extends CdkCell {
}
MatLegacyCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCell, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCell.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCell, selector: "mat-cell, td[mat-cell]", host: { attributes: { "role": "gridcell" }, classAttribute: "mat-cell" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCell, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-cell, td[mat-cell]',
                    host: {
                        'class': 'mat-cell',
                        'role': 'gridcell',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktdGFibGUvY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDVixZQUFZLEVBQ1osYUFBYSxFQUNiLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZ0JBQWdCLEdBQ2pCLE1BQU0sb0JBQW9CLENBQUM7O0FBRTVCOzs7OztHQUtHO0FBS0gsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFVBQVU7O2tIQUFuQyxnQkFBZ0I7c0dBQWhCLGdCQUFnQix1Q0FGaEIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLENBQUM7Z0dBRXRELGdCQUFnQjtrQkFKNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsa0JBQWtCLEVBQUMsQ0FBQztpQkFDbEU7O0FBR0Q7Ozs7O0dBS0c7QUFLSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZ0JBQWdCOzt3SEFBL0Msc0JBQXNCOzRHQUF0QixzQkFBc0IsNkNBRnRCLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLHNCQUFzQixFQUFDLENBQUM7Z0dBRWxFLHNCQUFzQjtrQkFKbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLHdCQUF3QixFQUFDLENBQUM7aUJBQzlFOztBQUdEOzs7OztHQUtHO0FBS0gsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGdCQUFnQjs7d0hBQS9DLHNCQUFzQjs0R0FBdEIsc0JBQXNCLDZDQUZ0QixDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBQyxDQUFDO2dHQUVsRSxzQkFBc0I7a0JBSmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyx3QkFBd0IsRUFBQyxDQUFDO2lCQUM5RTs7QUFHRDs7Ozs7R0FLRztBQVNILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxZQUFZO0lBQ2xELG1DQUFtQztJQUNuQyxJQUNhLElBQUk7UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQWEsSUFBSSxDQUFDLElBQVk7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDZ0IseUJBQXlCO1FBQzFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxtQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7O29IQW5CVSxrQkFBa0I7d0dBQWxCLGtCQUFrQix1R0FMbEI7UUFDVCxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFDO1FBQ3hELEVBQUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBQztLQUN6RTtnR0FFVSxrQkFBa0I7a0JBUjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNsQixTQUFTLEVBQUU7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsb0JBQW9CLEVBQUM7d0JBQ3hELEVBQUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFdBQVcsb0JBQW9CLEVBQUM7cUJBQ3pFO2lCQUNGOzhCQUljLElBQUk7c0JBRGhCLEtBQUs7dUJBQUMsY0FBYzs7QUFvQnZCOzs7O0dBSUc7QUFRSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsYUFBYTs7cUhBQXpDLG1CQUFtQjt5R0FBbkIsbUJBQW1CO2dHQUFuQixtQkFBbUI7a0JBUC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLE1BQU0sRUFBRSxjQUFjO3FCQUN2QjtpQkFDRjs7QUFHRDs7OztHQUlHO0FBUUgsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGFBQWE7O3FIQUF6QyxtQkFBbUI7eUdBQW5CLG1CQUFtQjtnR0FBbkIsbUJBQW1CO2tCQVAvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixNQUFNLEVBQUUsVUFBVTtxQkFDbkI7aUJBQ0Y7O0FBR0Q7Ozs7R0FJRztBQVFILE1BQU0sT0FBTyxhQUFjLFNBQVEsT0FBTzs7K0dBQTdCLGFBQWE7bUdBQWIsYUFBYTtnR0FBYixhQUFhO2tCQVB6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsVUFBVTt3QkFDbkIsTUFBTSxFQUFFLFVBQVU7cUJBQ25CO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDZGtDZWxsLFxuICBDZGtDZWxsRGVmLFxuICBDZGtDb2x1bW5EZWYsXG4gIENka0Zvb3RlckNlbGwsXG4gIENka0Zvb3RlckNlbGxEZWYsXG4gIENka0hlYWRlckNlbGwsXG4gIENka0hlYWRlckNlbGxEZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbi8qKlxuICogQ2VsbCBkZWZpbml0aW9uIGZvciB0aGUgbWF0LXRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIHRlbXBsYXRlIG9mIGEgY29sdW1uJ3MgZGF0YSByb3cgY2VsbCBhcyB3ZWxsIGFzIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2VsbERlZmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdENlbGxEZWZdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0NlbGxEZWYsIHVzZUV4aXN0aW5nOiBNYXRMZWdhY3lDZWxsRGVmfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUNlbGxEZWYgZXh0ZW5kcyBDZGtDZWxsRGVmIHt9XG5cbi8qKlxuICogSGVhZGVyIGNlbGwgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGhlYWRlciBjZWxsIGFuZCBhcyB3ZWxsIGFzIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0SGVhZGVyQ2VsbERlZmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdEhlYWRlckNlbGxEZWZdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0hlYWRlckNlbGxEZWYsIHVzZUV4aXN0aW5nOiBNYXRMZWdhY3lIZWFkZXJDZWxsRGVmfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUhlYWRlckNlbGxEZWYgZXh0ZW5kcyBDZGtIZWFkZXJDZWxsRGVmIHt9XG5cbi8qKlxuICogRm9vdGVyIGNlbGwgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGZvb3RlciBjZWxsIGFuZCBhcyB3ZWxsIGFzIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Rm9vdGVyQ2VsbERlZmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdEZvb3RlckNlbGxEZWZdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka0Zvb3RlckNlbGxEZWYsIHVzZUV4aXN0aW5nOiBNYXRMZWdhY3lGb290ZXJDZWxsRGVmfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUZvb3RlckNlbGxEZWYgZXh0ZW5kcyBDZGtGb290ZXJDZWxsRGVmIHt9XG5cbi8qKlxuICogQ29sdW1uIGRlZmluaXRpb24gZm9yIHRoZSBtYXQtdGFibGUuXG4gKiBEZWZpbmVzIGEgc2V0IG9mIGNlbGxzIGF2YWlsYWJsZSBmb3IgYSB0YWJsZSBjb2x1bW4uXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdENvbHVtbkRlZmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdENvbHVtbkRlZl0nLFxuICBpbnB1dHM6IFsnc3RpY2t5J10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBDZGtDb2x1bW5EZWYsIHVzZUV4aXN0aW5nOiBNYXRMZWdhY3lDb2x1bW5EZWZ9LFxuICAgIHtwcm92aWRlOiAnTUFUX1NPUlRfSEVBREVSX0NPTFVNTl9ERUYnLCB1c2VFeGlzdGluZzogTWF0TGVnYWN5Q29sdW1uRGVmfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Q29sdW1uRGVmIGV4dGVuZHMgQ2RrQ29sdW1uRGVmIHtcbiAgLyoqIFVuaXF1ZSBuYW1lIGZvciB0aGlzIGNvbHVtbi4gKi9cbiAgQElucHV0KCdtYXRDb2x1bW5EZWYnKVxuICBvdmVycmlkZSBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIG92ZXJyaWRlIHNldCBuYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3NldE5hbWVJbnB1dChuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgXCJtYXQtY29sdW1uLVwiIHByZWZpeCBpbiBhZGRpdGlvbiB0byBcImNkay1jb2x1bW4tXCIgcHJlZml4LlxuICAgKiBJbiB0aGUgZnV0dXJlLCB0aGlzIHdpbGwgb25seSBhZGQgXCJtYXQtY29sdW1uLVwiIGFuZCBjb2x1bW5Dc3NDbGFzc05hbWVcbiAgICogd2lsbCBjaGFuZ2UgZnJvbSB0eXBlIHN0cmluZ1tdIHRvIHN0cmluZy5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF91cGRhdGVDb2x1bW5Dc3NDbGFzc05hbWUoKSB7XG4gICAgc3VwZXIuX3VwZGF0ZUNvbHVtbkNzc0NsYXNzTmFtZSgpO1xuICAgIHRoaXMuX2NvbHVtbkNzc0NsYXNzTmFtZSEucHVzaChgbWF0LWNvbHVtbi0ke3RoaXMuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gIH1cbn1cblxuLyoqXG4gKiBIZWFkZXIgY2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRIZWFkZXJDZWxsYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC90YWJsZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtaGVhZGVyLWNlbGwsIHRoW21hdC1oZWFkZXItY2VsbF0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1oZWFkZXItY2VsbCcsXG4gICAgJ3JvbGUnOiAnY29sdW1uaGVhZGVyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5SGVhZGVyQ2VsbCBleHRlbmRzIENka0hlYWRlckNlbGwge31cblxuLyoqXG4gKiBGb290ZXIgY2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRGb290ZXJDZWxsYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC90YWJsZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtZm9vdGVyLWNlbGwsIHRkW21hdC1mb290ZXItY2VsbF0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1mb290ZXItY2VsbCcsXG4gICAgJ3JvbGUnOiAnZ3JpZGNlbGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lGb290ZXJDZWxsIGV4dGVuZHMgQ2RrRm9vdGVyQ2VsbCB7fVxuXG4vKipcbiAqIENlbGwgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgYWRkcyB0aGUgcmlnaHQgY2xhc3NlcyBhbmQgcm9sZS5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2VsbGAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNlbGwsIHRkW21hdC1jZWxsXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWNlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Q2VsbCBleHRlbmRzIENka0NlbGwge31cbiJdfQ==