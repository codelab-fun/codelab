/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatLegacyRecycleRows, MatLegacyTable } from './table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatLegacyCell, MatLegacyCellDef, MatLegacyColumnDef, MatLegacyFooterCell, MatLegacyFooterCellDef, MatLegacyHeaderCell, MatLegacyHeaderCellDef, } from './cell';
import { MatLegacyFooterRow, MatLegacyFooterRowDef, MatLegacyHeaderRow, MatLegacyHeaderRowDef, MatLegacyRow, MatLegacyRowDef, MatLegacyNoDataRow, } from './row';
import { MatLegacyTextColumn } from './text-column';
import { MatCommonModule } from '@angular/material/core';
import * as i0 from "@angular/core";
const EXPORTED_DECLARATIONS = [
    // Table
    MatLegacyTable,
    MatLegacyRecycleRows,
    // Template defs
    MatLegacyHeaderCellDef,
    MatLegacyHeaderRowDef,
    MatLegacyColumnDef,
    MatLegacyCellDef,
    MatLegacyRowDef,
    MatLegacyFooterCellDef,
    MatLegacyFooterRowDef,
    // Cell directives
    MatLegacyHeaderCell,
    MatLegacyCell,
    MatLegacyFooterCell,
    // Row directives
    MatLegacyHeaderRow,
    MatLegacyRow,
    MatLegacyFooterRow,
    MatLegacyNoDataRow,
    MatLegacyTextColumn,
];
/**
 * @deprecated Use `MatTableModule` from `@angular/material/table` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTableModule {
}
MatLegacyTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTableModule, declarations: [
        // Table
        MatLegacyTable,
        MatLegacyRecycleRows,
        // Template defs
        MatLegacyHeaderCellDef,
        MatLegacyHeaderRowDef,
        MatLegacyColumnDef,
        MatLegacyCellDef,
        MatLegacyRowDef,
        MatLegacyFooterCellDef,
        MatLegacyFooterRowDef,
        // Cell directives
        MatLegacyHeaderCell,
        MatLegacyCell,
        MatLegacyFooterCell,
        // Row directives
        MatLegacyHeaderRow,
        MatLegacyRow,
        MatLegacyFooterRow,
        MatLegacyNoDataRow,
        MatLegacyTextColumn], imports: [CdkTableModule, MatCommonModule], exports: [MatCommonModule, 
        // Table
        MatLegacyTable,
        MatLegacyRecycleRows,
        // Template defs
        MatLegacyHeaderCellDef,
        MatLegacyHeaderRowDef,
        MatLegacyColumnDef,
        MatLegacyCellDef,
        MatLegacyRowDef,
        MatLegacyFooterCellDef,
        MatLegacyFooterRowDef,
        // Cell directives
        MatLegacyHeaderCell,
        MatLegacyCell,
        MatLegacyFooterCell,
        // Row directives
        MatLegacyHeaderRow,
        MatLegacyRow,
        MatLegacyFooterRow,
        MatLegacyNoDataRow,
        MatLegacyTextColumn] });
MatLegacyTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTableModule, imports: [CdkTableModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdkTableModule, MatCommonModule],
                    exports: [MatCommonModule, EXPORTED_DECLARATIONS],
                    declarations: EXPORTED_DECLARATIONS,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS10YWJsZS90YWJsZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsY0FBYyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN0QixtQkFBbUIsRUFDbkIsc0JBQXNCLEdBQ3ZCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsWUFBWSxFQUNaLGVBQWUsRUFDZixrQkFBa0IsR0FDbkIsTUFBTSxPQUFPLENBQUM7QUFDZixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDOztBQUV2RCxNQUFNLHFCQUFxQixHQUFHO0lBQzVCLFFBQVE7SUFDUixjQUFjO0lBQ2Qsb0JBQW9CO0lBRXBCLGdCQUFnQjtJQUNoQixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLHNCQUFzQjtJQUN0QixxQkFBcUI7SUFFckIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsbUJBQW1CO0lBRW5CLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFFbEIsbUJBQW1CO0NBQ3BCLENBQUM7QUFFRjs7O0dBR0c7QUFNSCxNQUFNLE9BQU8sb0JBQW9COztzSEFBcEIsb0JBQW9CO3VIQUFwQixvQkFBb0I7UUFwQy9CLFFBQVE7UUFDUixjQUFjO1FBQ2Qsb0JBQW9CO1FBRXBCLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFFckIsa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixhQUFhO1FBQ2IsbUJBQW1CO1FBRW5CLGlCQUFpQjtRQUNqQixrQkFBa0I7UUFDbEIsWUFBWTtRQUNaLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFFbEIsbUJBQW1CLGFBUVQsY0FBYyxFQUFFLGVBQWUsYUFDL0IsZUFBZTtRQWpDekIsUUFBUTtRQUNSLGNBQWM7UUFDZCxvQkFBb0I7UUFFcEIsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2Ysc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUVyQixrQkFBa0I7UUFDbEIsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixtQkFBbUI7UUFFbkIsaUJBQWlCO1FBQ2pCLGtCQUFrQjtRQUNsQixZQUFZO1FBQ1osa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUVsQixtQkFBbUI7dUhBWVIsb0JBQW9CLFlBSnJCLGNBQWMsRUFBRSxlQUFlLEVBQy9CLGVBQWU7Z0dBR2Qsb0JBQW9CO2tCQUxoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUM7b0JBQzFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxxQkFBcUIsQ0FBQztvQkFDakQsWUFBWSxFQUFFLHFCQUFxQjtpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdExlZ2FjeVJlY3ljbGVSb3dzLCBNYXRMZWdhY3lUYWJsZX0gZnJvbSAnLi90YWJsZSc7XG5pbXBvcnQge0Nka1RhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtcbiAgTWF0TGVnYWN5Q2VsbCxcbiAgTWF0TGVnYWN5Q2VsbERlZixcbiAgTWF0TGVnYWN5Q29sdW1uRGVmLFxuICBNYXRMZWdhY3lGb290ZXJDZWxsLFxuICBNYXRMZWdhY3lGb290ZXJDZWxsRGVmLFxuICBNYXRMZWdhY3lIZWFkZXJDZWxsLFxuICBNYXRMZWdhY3lIZWFkZXJDZWxsRGVmLFxufSBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHtcbiAgTWF0TGVnYWN5Rm9vdGVyUm93LFxuICBNYXRMZWdhY3lGb290ZXJSb3dEZWYsXG4gIE1hdExlZ2FjeUhlYWRlclJvdyxcbiAgTWF0TGVnYWN5SGVhZGVyUm93RGVmLFxuICBNYXRMZWdhY3lSb3csXG4gIE1hdExlZ2FjeVJvd0RlZixcbiAgTWF0TGVnYWN5Tm9EYXRhUm93LFxufSBmcm9tICcuL3Jvdyc7XG5pbXBvcnQge01hdExlZ2FjeVRleHRDb2x1bW59IGZyb20gJy4vdGV4dC1jb2x1bW4nO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG5jb25zdCBFWFBPUlRFRF9ERUNMQVJBVElPTlMgPSBbXG4gIC8vIFRhYmxlXG4gIE1hdExlZ2FjeVRhYmxlLFxuICBNYXRMZWdhY3lSZWN5Y2xlUm93cyxcblxuICAvLyBUZW1wbGF0ZSBkZWZzXG4gIE1hdExlZ2FjeUhlYWRlckNlbGxEZWYsXG4gIE1hdExlZ2FjeUhlYWRlclJvd0RlZixcbiAgTWF0TGVnYWN5Q29sdW1uRGVmLFxuICBNYXRMZWdhY3lDZWxsRGVmLFxuICBNYXRMZWdhY3lSb3dEZWYsXG4gIE1hdExlZ2FjeUZvb3RlckNlbGxEZWYsXG4gIE1hdExlZ2FjeUZvb3RlclJvd0RlZixcblxuICAvLyBDZWxsIGRpcmVjdGl2ZXNcbiAgTWF0TGVnYWN5SGVhZGVyQ2VsbCxcbiAgTWF0TGVnYWN5Q2VsbCxcbiAgTWF0TGVnYWN5Rm9vdGVyQ2VsbCxcblxuICAvLyBSb3cgZGlyZWN0aXZlc1xuICBNYXRMZWdhY3lIZWFkZXJSb3csXG4gIE1hdExlZ2FjeVJvdyxcbiAgTWF0TGVnYWN5Rm9vdGVyUm93LFxuICBNYXRMZWdhY3lOb0RhdGFSb3csXG5cbiAgTWF0TGVnYWN5VGV4dENvbHVtbixcbl07XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRUYWJsZU1vZHVsZWAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0Nka1RhYmxlTW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBFWFBPUlRFRF9ERUNMQVJBVElPTlNdLFxuICBkZWNsYXJhdGlvbnM6IEVYUE9SVEVEX0RFQ0xBUkFUSU9OUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5VGFibGVNb2R1bGUge31cbiJdfQ==