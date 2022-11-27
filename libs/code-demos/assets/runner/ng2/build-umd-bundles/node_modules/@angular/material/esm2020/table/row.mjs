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
 */
export class MatHeaderRowDef extends CdkHeaderRowDef {
}
MatHeaderRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatHeaderRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatHeaderRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: { columns: ["matHeaderRowDef", "columns"], sticky: ["matHeaderRowDefSticky", "sticky"] }, providers: [{ provide: CdkHeaderRowDef, useExisting: MatHeaderRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatHeaderRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matHeaderRowDef]',
                    providers: [{ provide: CdkHeaderRowDef, useExisting: MatHeaderRowDef }],
                    inputs: ['columns: matHeaderRowDef', 'sticky: matHeaderRowDefSticky'],
                }]
        }] });
/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
export class MatFooterRowDef extends CdkFooterRowDef {
}
MatFooterRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFooterRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatFooterRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatFooterRowDef, selector: "[matFooterRowDef]", inputs: { columns: ["matFooterRowDef", "columns"], sticky: ["matFooterRowDefSticky", "sticky"] }, providers: [{ provide: CdkFooterRowDef, useExisting: MatFooterRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFooterRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matFooterRowDef]',
                    providers: [{ provide: CdkFooterRowDef, useExisting: MatFooterRowDef }],
                    inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
                }]
        }] });
/**
 * Data row definition for the mat-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
export class MatRowDef extends CdkRowDef {
}
MatRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatRowDef, selector: "[matRowDef]", inputs: { columns: ["matRowDefColumns", "columns"], when: ["matRowDefWhen", "when"] }, providers: [{ provide: CdkRowDef, useExisting: MatRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matRowDef]',
                    providers: [{ provide: CdkRowDef, useExisting: MatRowDef }],
                    inputs: ['columns: matRowDefColumns', 'when: matRowDefWhen'],
                }]
        }] });
/** Footer template container that contains the cell outlet. Adds the right class and role. */
export class MatHeaderRow extends CdkHeaderRow {
}
MatHeaderRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatHeaderRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatHeaderRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", host: { attributes: { "role": "row" }, classAttribute: "mat-mdc-header-row mdc-data-table__header-row" }, providers: [{ provide: CdkHeaderRow, useExisting: MatHeaderRow }], exportAs: ["matHeaderRow"], usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, dependencies: [{ kind: "directive", type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatHeaderRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-header-row, tr[mat-header-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-header-row mdc-data-table__header-row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matHeaderRow',
                    providers: [{ provide: CdkHeaderRow, useExisting: MatHeaderRow }],
                }]
        }] });
/** Footer template container that contains the cell outlet. Adds the right class and role. */
export class MatFooterRow extends CdkFooterRow {
}
MatFooterRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFooterRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatFooterRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatFooterRow, selector: "mat-footer-row, tr[mat-footer-row]", host: { attributes: { "role": "row" }, classAttribute: "mat-mdc-footer-row mdc-data-table__row" }, providers: [{ provide: CdkFooterRow, useExisting: MatFooterRow }], exportAs: ["matFooterRow"], usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, dependencies: [{ kind: "directive", type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFooterRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-footer-row, tr[mat-footer-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-footer-row mdc-data-table__row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matFooterRow',
                    providers: [{ provide: CdkFooterRow, useExisting: MatFooterRow }],
                }]
        }] });
/** Data row template container that contains the cell outlet. Adds the right class and role. */
export class MatRow extends CdkRow {
}
MatRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatRow, selector: "mat-row, tr[mat-row]", host: { attributes: { "role": "row" }, classAttribute: "mat-mdc-row mdc-data-table__row" }, providers: [{ provide: CdkRow, useExisting: MatRow }], exportAs: ["matRow"], usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, dependencies: [{ kind: "directive", type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-row, tr[mat-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'mat-mdc-row mdc-data-table__row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matRow',
                    providers: [{ provide: CdkRow, useExisting: MatRow }],
                }]
        }] });
/** Row that can be used to display a message when no data is shown in the table. */
export class MatNoDataRow extends CdkNoDataRow {
    constructor() {
        super(...arguments);
        this._contentClassName = 'mat-mdc-no-data-row';
    }
}
MatNoDataRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatNoDataRow, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatNoDataRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatNoDataRow, selector: "ng-template[matNoDataRow]", providers: [{ provide: CdkNoDataRow, useExisting: MatNoDataRow }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatNoDataRow, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[matNoDataRow]',
                    providers: [{ provide: CdkNoDataRow, useExisting: MatNoDataRow }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3RhYmxlL3Jvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixlQUFlLEVBQ2YsWUFBWSxFQUNaLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFFL0Y7OztHQUdHO0FBTUgsTUFBTSxPQUFPLGVBQWdCLFNBQVEsZUFBZTs7aUhBQXZDLGVBQWU7cUdBQWYsZUFBZSw4SUFIZixDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFDLENBQUM7Z0dBRzFELGVBQWU7a0JBTDNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsaUJBQWlCLEVBQUMsQ0FBQztvQkFDckUsTUFBTSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsK0JBQStCLENBQUM7aUJBQ3RFOztBQUdEOzs7R0FHRztBQU1ILE1BQU0sT0FBTyxlQUFnQixTQUFRLGVBQWU7O2lIQUF2QyxlQUFlO3FHQUFmLGVBQWUsOElBSGYsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQyxDQUFDO2dHQUcxRCxlQUFlO2tCQUwzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLGlCQUFpQixFQUFDLENBQUM7b0JBQ3JFLE1BQU0sRUFBRSxDQUFDLDBCQUEwQixFQUFFLCtCQUErQixDQUFDO2lCQUN0RTs7QUFHRDs7OztHQUlHO0FBTUgsTUFBTSxPQUFPLFNBQWEsU0FBUSxTQUFZOzsyR0FBakMsU0FBUzsrRkFBVCxTQUFTLDZIQUhULENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsQ0FBQztnR0FHOUMsU0FBUztrQkFMckIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsV0FBVyxFQUFDLENBQUM7b0JBQ3pELE1BQU0sRUFBRSxDQUFDLDJCQUEyQixFQUFFLHFCQUFxQixDQUFDO2lCQUM3RDs7QUFHRCw4RkFBOEY7QUFlOUYsTUFBTSxPQUFPLFlBQWEsU0FBUSxZQUFZOzs4R0FBakMsWUFBWTtrR0FBWixZQUFZLHVLQUZaLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsQ0FBQztnR0FFcEQsWUFBWTtrQkFkeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0NBQW9DO29CQUM5QyxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLCtDQUErQzt3QkFDeEQsTUFBTSxFQUFFLEtBQUs7cUJBQ2Q7b0JBQ0QsK0ZBQStGO29CQUMvRiwrQ0FBK0M7b0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO29CQUNoRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLGNBQWMsRUFBQyxDQUFDO2lCQUNoRTs7QUFHRCw4RkFBOEY7QUFlOUYsTUFBTSxPQUFPLFlBQWEsU0FBUSxZQUFZOzs4R0FBakMsWUFBWTtrR0FBWixZQUFZLGdLQUZaLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsQ0FBQztnR0FFcEQsWUFBWTtrQkFkeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0NBQW9DO29CQUM5QyxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLHdDQUF3Qzt3QkFDakQsTUFBTSxFQUFFLEtBQUs7cUJBQ2Q7b0JBQ0QsK0ZBQStGO29CQUMvRiwrQ0FBK0M7b0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO29CQUNoRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLGNBQWMsRUFBQyxDQUFDO2lCQUNoRTs7QUFHRCxnR0FBZ0c7QUFlaEcsTUFBTSxPQUFPLE1BQU8sU0FBUSxNQUFNOzt3R0FBckIsTUFBTTs0RkFBTixNQUFNLDJJQUZOLENBQUMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUMsQ0FBQztnR0FFeEMsTUFBTTtrQkFkbEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLGlDQUFpQzt3QkFDMUMsTUFBTSxFQUFFLEtBQUs7cUJBQ2Q7b0JBQ0QsK0ZBQStGO29CQUMvRiwrQ0FBK0M7b0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO29CQUNoRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLFFBQVEsRUFBQyxDQUFDO2lCQUNwRDs7QUFHRCxvRkFBb0Y7QUFLcEYsTUFBTSxPQUFPLFlBQWEsU0FBUSxZQUFZO0lBSjlDOztRQUtXLHNCQUFpQixHQUFHLHFCQUFxQixDQUFDO0tBQ3BEOzs4R0FGWSxZQUFZO2tHQUFaLFlBQVksb0RBRlosQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBQyxDQUFDO2dHQUVwRCxZQUFZO2tCQUp4QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLGNBQWMsRUFBQyxDQUFDO2lCQUNoRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDREtfUk9XX1RFTVBMQVRFLFxuICBDZGtGb290ZXJSb3csXG4gIENka0Zvb3RlclJvd0RlZixcbiAgQ2RrSGVhZGVyUm93LFxuICBDZGtIZWFkZXJSb3dEZWYsXG4gIENka1JvdyxcbiAgQ2RrUm93RGVmLFxuICBDZGtOb0RhdGFSb3csXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIERpcmVjdGl2ZSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEhlYWRlciByb3cgZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIENhcHR1cmVzIHRoZSBoZWFkZXIgcm93J3MgdGVtcGxhdGUgYW5kIG90aGVyIGhlYWRlciBwcm9wZXJ0aWVzIHN1Y2ggYXMgdGhlIGNvbHVtbnMgdG8gZGlzcGxheS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdEhlYWRlclJvd0RlZl0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQ2RrSGVhZGVyUm93RGVmLCB1c2VFeGlzdGluZzogTWF0SGVhZGVyUm93RGVmfV0sXG4gIGlucHV0czogWydjb2x1bW5zOiBtYXRIZWFkZXJSb3dEZWYnLCAnc3RpY2t5OiBtYXRIZWFkZXJSb3dEZWZTdGlja3knXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyUm93RGVmIGV4dGVuZHMgQ2RrSGVhZGVyUm93RGVmIHt9XG5cbi8qKlxuICogRm9vdGVyIHJvdyBkZWZpbml0aW9uIGZvciB0aGUgbWF0LXRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIGZvb3RlciByb3cncyB0ZW1wbGF0ZSBhbmQgb3RoZXIgZm9vdGVyIHByb3BlcnRpZXMgc3VjaCBhcyB0aGUgY29sdW1ucyB0byBkaXNwbGF5LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Rm9vdGVyUm93RGVmXScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtGb290ZXJSb3dEZWYsIHVzZUV4aXN0aW5nOiBNYXRGb290ZXJSb3dEZWZ9XSxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IG1hdEZvb3RlclJvd0RlZicsICdzdGlja3k6IG1hdEZvb3RlclJvd0RlZlN0aWNreSddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb290ZXJSb3dEZWYgZXh0ZW5kcyBDZGtGb290ZXJSb3dEZWYge31cblxuLyoqXG4gKiBEYXRhIHJvdyBkZWZpbml0aW9uIGZvciB0aGUgbWF0LXRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIGRhdGEgcm93J3MgdGVtcGxhdGUgYW5kIG90aGVyIHByb3BlcnRpZXMgc3VjaCBhcyB0aGUgY29sdW1ucyB0byBkaXNwbGF5IGFuZFxuICogYSB3aGVuIHByZWRpY2F0ZSB0aGF0IGRlc2NyaWJlcyB3aGVuIHRoaXMgcm93IHNob3VsZCBiZSB1c2VkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Um93RGVmXScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtSb3dEZWYsIHVzZUV4aXN0aW5nOiBNYXRSb3dEZWZ9XSxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IG1hdFJvd0RlZkNvbHVtbnMnLCAnd2hlbjogbWF0Um93RGVmV2hlbiddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSb3dEZWY8VD4gZXh0ZW5kcyBDZGtSb3dEZWY8VD4ge31cblxuLyoqIEZvb3RlciB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBjb250YWlucyB0aGUgY2VsbCBvdXRsZXQuIEFkZHMgdGhlIHJpZ2h0IGNsYXNzIGFuZCByb2xlLiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWhlYWRlci1yb3csIHRyW21hdC1oZWFkZXItcm93XScsXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtaGVhZGVyLXJvdyBtZGMtZGF0YS10YWJsZV9faGVhZGVyLXJvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21hdEhlYWRlclJvdycsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtIZWFkZXJSb3csIHVzZUV4aXN0aW5nOiBNYXRIZWFkZXJSb3d9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyUm93IGV4dGVuZHMgQ2RrSGVhZGVyUm93IHt9XG5cbi8qKiBGb290ZXIgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1mb290ZXItcm93LCB0clttYXQtZm9vdGVyLXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWZvb3Rlci1yb3cgbWRjLWRhdGEtdGFibGVfX3JvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21hdEZvb3RlclJvdycsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDZGtGb290ZXJSb3csIHVzZUV4aXN0aW5nOiBNYXRGb290ZXJSb3d9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9vdGVyUm93IGV4dGVuZHMgQ2RrRm9vdGVyUm93IHt9XG5cbi8qKiBEYXRhIHJvdyB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBjb250YWlucyB0aGUgY2VsbCBvdXRsZXQuIEFkZHMgdGhlIHJpZ2h0IGNsYXNzIGFuZCByb2xlLiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXJvdywgdHJbbWF0LXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXJvdyBtZGMtZGF0YS10YWJsZV9fcm93JyxcbiAgICAncm9sZSc6ICdyb3cnLFxuICB9LFxuICAvLyBTZWUgbm90ZSBvbiBDZGtUYWJsZSBmb3IgZXhwbGFuYXRpb24gb24gd2h5IHRoaXMgdXNlcyB0aGUgZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0aW9uIHN0cmF0ZWd5LlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWF0Um93JyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka1JvdywgdXNlRXhpc3Rpbmc6IE1hdFJvd31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSb3cgZXh0ZW5kcyBDZGtSb3cge31cblxuLyoqIFJvdyB0aGF0IGNhbiBiZSB1c2VkIHRvIGRpc3BsYXkgYSBtZXNzYWdlIHdoZW4gbm8gZGF0YSBpcyBzaG93biBpbiB0aGUgdGFibGUuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttYXROb0RhdGFSb3ddJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IENka05vRGF0YVJvdywgdXNlRXhpc3Rpbmc6IE1hdE5vRGF0YVJvd31dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXROb0RhdGFSb3cgZXh0ZW5kcyBDZGtOb0RhdGFSb3cge1xuICBvdmVycmlkZSBfY29udGVudENsYXNzTmFtZSA9ICdtYXQtbWRjLW5vLWRhdGEtcm93Jztcbn1cbiJdfQ==