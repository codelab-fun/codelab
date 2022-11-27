/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatRecycleRows, MatTable } from './table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCell, MatCellDef, MatColumnDef, MatFooterCell, MatFooterCellDef, MatHeaderCell, MatHeaderCellDef, } from './cell';
import { MatFooterRow, MatFooterRowDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatNoDataRow, } from './row';
import { MatTextColumn } from './text-column';
import * as i0 from "@angular/core";
const EXPORTED_DECLARATIONS = [
    // Table
    MatTable,
    MatRecycleRows,
    // Template defs
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatFooterCellDef,
    MatFooterRowDef,
    // Cell directives
    MatHeaderCell,
    MatCell,
    MatFooterCell,
    // Row directives
    MatHeaderRow,
    MatRow,
    MatFooterRow,
    MatNoDataRow,
    MatTextColumn,
];
export class MatTableModule {
}
MatTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTableModule, declarations: [
        // Table
        MatTable,
        MatRecycleRows,
        // Template defs
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatColumnDef,
        MatCellDef,
        MatRowDef,
        MatFooterCellDef,
        MatFooterRowDef,
        // Cell directives
        MatHeaderCell,
        MatCell,
        MatFooterCell,
        // Row directives
        MatHeaderRow,
        MatRow,
        MatFooterRow,
        MatNoDataRow,
        MatTextColumn], imports: [MatCommonModule, CdkTableModule], exports: [MatCommonModule, 
        // Table
        MatTable,
        MatRecycleRows,
        // Template defs
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatColumnDef,
        MatCellDef,
        MatRowDef,
        MatFooterCellDef,
        MatFooterRowDef,
        // Cell directives
        MatHeaderCell,
        MatCell,
        MatFooterCell,
        // Row directives
        MatHeaderRow,
        MatRow,
        MatFooterRow,
        MatNoDataRow,
        MatTextColumn] });
MatTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTableModule, imports: [MatCommonModule, CdkTableModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CdkTableModule],
                    exports: [MatCommonModule, EXPORTED_DECLARATIONS],
                    declarations: EXPORTED_DECLARATIONS,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3RhYmxlL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsY0FBYyxFQUFFLFFBQVEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNqRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1YsWUFBWSxFQUNaLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGdCQUFnQixHQUNqQixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQ0wsWUFBWSxFQUNaLGVBQWUsRUFDZixZQUFZLEVBQ1osZUFBZSxFQUNmLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0sT0FBTyxDQUFDO0FBQ2YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFNUMsTUFBTSxxQkFBcUIsR0FBRztJQUM1QixRQUFRO0lBQ1IsUUFBUTtJQUNSLGNBQWM7SUFFZCxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixZQUFZO0lBQ1osVUFBVTtJQUNWLFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsZUFBZTtJQUVmLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsT0FBTztJQUNQLGFBQWE7SUFFYixpQkFBaUI7SUFDakIsWUFBWTtJQUNaLE1BQU07SUFDTixZQUFZO0lBQ1osWUFBWTtJQUVaLGFBQWE7Q0FDZCxDQUFDO0FBT0YsTUFBTSxPQUFPLGNBQWM7O2dIQUFkLGNBQWM7aUhBQWQsY0FBYztRQWhDekIsUUFBUTtRQUNSLFFBQVE7UUFDUixjQUFjO1FBRWQsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsWUFBWTtRQUNaLFVBQVU7UUFDVixTQUFTO1FBQ1QsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFFZixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLE9BQU87UUFDUCxhQUFhO1FBRWIsaUJBQWlCO1FBQ2pCLFlBQVk7UUFDWixNQUFNO1FBQ04sWUFBWTtRQUNaLFlBQVk7UUFFWixhQUFhLGFBSUgsZUFBZSxFQUFFLGNBQWMsYUFDL0IsZUFBZTtRQTdCekIsUUFBUTtRQUNSLFFBQVE7UUFDUixjQUFjO1FBRWQsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsWUFBWTtRQUNaLFVBQVU7UUFDVixTQUFTO1FBQ1QsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFFZixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLE9BQU87UUFDUCxhQUFhO1FBRWIsaUJBQWlCO1FBQ2pCLFlBQVk7UUFDWixNQUFNO1FBQ04sWUFBWTtRQUNaLFlBQVk7UUFFWixhQUFhO2lIQVFGLGNBQWMsWUFKZixlQUFlLEVBQUUsY0FBYyxFQUMvQixlQUFlO2dHQUdkLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQztvQkFDMUMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLHFCQUFxQixDQUFDO29CQUNqRCxZQUFZLEVBQUUscUJBQXFCO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0UmVjeWNsZVJvd3MsIE1hdFRhYmxlfSBmcm9tICcuL3RhYmxlJztcbmltcG9ydCB7Q2RrVGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBNYXRDZWxsLFxuICBNYXRDZWxsRGVmLFxuICBNYXRDb2x1bW5EZWYsXG4gIE1hdEZvb3RlckNlbGwsXG4gIE1hdEZvb3RlckNlbGxEZWYsXG4gIE1hdEhlYWRlckNlbGwsXG4gIE1hdEhlYWRlckNlbGxEZWYsXG59IGZyb20gJy4vY2VsbCc7XG5pbXBvcnQge1xuICBNYXRGb290ZXJSb3csXG4gIE1hdEZvb3RlclJvd0RlZixcbiAgTWF0SGVhZGVyUm93LFxuICBNYXRIZWFkZXJSb3dEZWYsXG4gIE1hdFJvdyxcbiAgTWF0Um93RGVmLFxuICBNYXROb0RhdGFSb3csXG59IGZyb20gJy4vcm93JztcbmltcG9ydCB7TWF0VGV4dENvbHVtbn0gZnJvbSAnLi90ZXh0LWNvbHVtbic7XG5cbmNvbnN0IEVYUE9SVEVEX0RFQ0xBUkFUSU9OUyA9IFtcbiAgLy8gVGFibGVcbiAgTWF0VGFibGUsXG4gIE1hdFJlY3ljbGVSb3dzLFxuXG4gIC8vIFRlbXBsYXRlIGRlZnNcbiAgTWF0SGVhZGVyQ2VsbERlZixcbiAgTWF0SGVhZGVyUm93RGVmLFxuICBNYXRDb2x1bW5EZWYsXG4gIE1hdENlbGxEZWYsXG4gIE1hdFJvd0RlZixcbiAgTWF0Rm9vdGVyQ2VsbERlZixcbiAgTWF0Rm9vdGVyUm93RGVmLFxuXG4gIC8vIENlbGwgZGlyZWN0aXZlc1xuICBNYXRIZWFkZXJDZWxsLFxuICBNYXRDZWxsLFxuICBNYXRGb290ZXJDZWxsLFxuXG4gIC8vIFJvdyBkaXJlY3RpdmVzXG4gIE1hdEhlYWRlclJvdyxcbiAgTWF0Um93LFxuICBNYXRGb290ZXJSb3csXG4gIE1hdE5vRGF0YVJvdyxcblxuICBNYXRUZXh0Q29sdW1uLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ2RrVGFibGVNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBFWFBPUlRFRF9ERUNMQVJBVElPTlNdLFxuICBkZWNsYXJhdGlvbnM6IEVYUE9SVEVEX0RFQ0xBUkFUSU9OUyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFibGVNb2R1bGUge31cbiJdfQ==