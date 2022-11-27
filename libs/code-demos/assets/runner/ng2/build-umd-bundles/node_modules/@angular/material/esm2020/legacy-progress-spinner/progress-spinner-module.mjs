/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatLegacyProgressSpinner } from './progress-spinner';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatProgressSpinnerModule` from `@angular/material/progress-spinner` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyProgressSpinnerModule {
}
MatLegacyProgressSpinnerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyProgressSpinnerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyProgressSpinnerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyProgressSpinnerModule, declarations: [MatLegacyProgressSpinner], imports: [MatCommonModule, CommonModule], exports: [MatLegacyProgressSpinner, MatCommonModule] });
MatLegacyProgressSpinnerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyProgressSpinnerModule, imports: [MatCommonModule, CommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyProgressSpinnerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule],
                    exports: [MatLegacyProgressSpinner, MatCommonModule],
                    declarations: [MatLegacyProgressSpinner],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXByb2dyZXNzLXNwaW5uZXIvcHJvZ3Jlc3Mtc3Bpbm5lci1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQUU1RDs7O0dBR0c7QUFNSCxNQUFNLE9BQU8sOEJBQThCOztnSUFBOUIsOEJBQThCO2lJQUE5Qiw4QkFBOEIsaUJBRjFCLHdCQUF3QixhQUY3QixlQUFlLEVBQUUsWUFBWSxhQUM3Qix3QkFBd0IsRUFBRSxlQUFlO2lJQUd4Qyw4QkFBOEIsWUFKL0IsZUFBZSxFQUFFLFlBQVksRUFDSCxlQUFlO2dHQUd4Qyw4QkFBOEI7a0JBTDFDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztvQkFDeEMsT0FBTyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsZUFBZSxDQUFDO29CQUNwRCxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDekMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdExlZ2FjeVByb2dyZXNzU3Bpbm5lcn0gZnJvbSAnLi9wcm9ncmVzcy1zcGlubmVyJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZWAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3Mtc3Bpbm5lcmAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0TGVnYWN5UHJvZ3Jlc3NTcGlubmVyLCBNYXRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRMZWdhY3lQcm9ncmVzc1NwaW5uZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lQcm9ncmVzc1NwaW5uZXJNb2R1bGUge31cbiJdfQ==