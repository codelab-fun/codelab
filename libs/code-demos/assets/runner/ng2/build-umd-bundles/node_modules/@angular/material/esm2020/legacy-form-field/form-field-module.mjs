/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatLegacyError } from './error';
import { MatLegacyFormField } from './form-field';
import { MatLegacyHint } from './hint';
import { MatLegacyLabel } from './label';
import { MatLegacyPlaceholder } from './placeholder';
import { MatLegacyPrefix } from './prefix';
import { MatLegacySuffix } from './suffix';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatFormFieldModule` from `@angular/material/form-field` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyFormFieldModule {
}
MatLegacyFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFormFieldModule, declarations: [MatLegacyError,
        MatLegacyFormField,
        MatLegacyHint,
        MatLegacyLabel,
        MatLegacyPlaceholder,
        MatLegacyPrefix,
        MatLegacySuffix], imports: [CommonModule, MatCommonModule, ObserversModule], exports: [MatCommonModule,
        MatLegacyError,
        MatLegacyFormField,
        MatLegacyHint,
        MatLegacyLabel,
        MatLegacyPlaceholder,
        MatLegacyPrefix,
        MatLegacySuffix] });
MatLegacyFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFormFieldModule, imports: [CommonModule, MatCommonModule, ObserversModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MatLegacyError,
                        MatLegacyFormField,
                        MatLegacyHint,
                        MatLegacyLabel,
                        MatLegacyPlaceholder,
                        MatLegacyPrefix,
                        MatLegacySuffix,
                    ],
                    imports: [CommonModule, MatCommonModule, ObserversModule],
                    exports: [
                        MatCommonModule,
                        MatLegacyError,
                        MatLegacyFormField,
                        MatLegacyHint,
                        MatLegacyLabel,
                        MatLegacyPlaceholder,
                        MatLegacyPrefix,
                        MatLegacySuffix,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LWZvcm0tZmllbGQvZm9ybS1maWVsZC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNoRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDdkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDekMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7QUFFekM7OztHQUdHO0FBdUJILE1BQU0sT0FBTyx3QkFBd0I7OzBIQUF4Qix3QkFBd0I7MkhBQXhCLHdCQUF3QixpQkFwQmpDLGNBQWM7UUFDZCxrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIsZUFBZTtRQUNmLGVBQWUsYUFFUCxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsYUFFdEQsZUFBZTtRQUNmLGNBQWM7UUFDZCxrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIsZUFBZTtRQUNmLGVBQWU7MkhBR04sd0JBQXdCLFlBWnpCLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUV0RCxlQUFlO2dHQVVOLHdCQUF3QjtrQkF0QnBDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGNBQWM7d0JBQ2Qsa0JBQWtCO3dCQUNsQixhQUFhO3dCQUNiLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixlQUFlO3dCQUNmLGVBQWU7cUJBQ2hCO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUN6RCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixjQUFjO3dCQUNkLG9CQUFvQjt3QkFDcEIsZUFBZTt3QkFDZixlQUFlO3FCQUNoQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge09ic2VydmVyc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRMZWdhY3lFcnJvcn0gZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQge01hdExlZ2FjeUZvcm1GaWVsZH0gZnJvbSAnLi9mb3JtLWZpZWxkJztcbmltcG9ydCB7TWF0TGVnYWN5SGludH0gZnJvbSAnLi9oaW50JztcbmltcG9ydCB7TWF0TGVnYWN5TGFiZWx9IGZyb20gJy4vbGFiZWwnO1xuaW1wb3J0IHtNYXRMZWdhY3lQbGFjZWhvbGRlcn0gZnJvbSAnLi9wbGFjZWhvbGRlcic7XG5pbXBvcnQge01hdExlZ2FjeVByZWZpeH0gZnJvbSAnLi9wcmVmaXgnO1xuaW1wb3J0IHtNYXRMZWdhY3lTdWZmaXh9IGZyb20gJy4vc3VmZml4JztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdEZvcm1GaWVsZE1vZHVsZWAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRMZWdhY3lFcnJvcixcbiAgICBNYXRMZWdhY3lGb3JtRmllbGQsXG4gICAgTWF0TGVnYWN5SGludCxcbiAgICBNYXRMZWdhY3lMYWJlbCxcbiAgICBNYXRMZWdhY3lQbGFjZWhvbGRlcixcbiAgICBNYXRMZWdhY3lQcmVmaXgsXG4gICAgTWF0TGVnYWN5U3VmZml4LFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRDb21tb25Nb2R1bGUsIE9ic2VydmVyc01vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgTWF0TGVnYWN5RXJyb3IsXG4gICAgTWF0TGVnYWN5Rm9ybUZpZWxkLFxuICAgIE1hdExlZ2FjeUhpbnQsXG4gICAgTWF0TGVnYWN5TGFiZWwsXG4gICAgTWF0TGVnYWN5UGxhY2Vob2xkZXIsXG4gICAgTWF0TGVnYWN5UHJlZml4LFxuICAgIE1hdExlZ2FjeVN1ZmZpeCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Rm9ybUZpZWxkTW9kdWxlIHt9XG4iXX0=