/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyPaginator } from './paginator';
import { MAT_PAGINATOR_INTL_PROVIDER } from '@angular/material/paginator';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatPaginatorModule` from `@angular/material/paginator` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyPaginatorModule {
}
MatLegacyPaginatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyPaginatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyPaginatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyPaginatorModule, declarations: [MatLegacyPaginator], imports: [CommonModule,
        MatLegacyButtonModule,
        MatLegacySelectModule,
        MatLegacyTooltipModule,
        MatCommonModule], exports: [MatLegacyPaginator] });
MatLegacyPaginatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyPaginatorModule, providers: [MAT_PAGINATOR_INTL_PROVIDER], imports: [CommonModule,
        MatLegacyButtonModule,
        MatLegacySelectModule,
        MatLegacyTooltipModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyPaginatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        MatLegacyButtonModule,
                        MatLegacySelectModule,
                        MatLegacyTooltipModule,
                        MatCommonModule,
                    ],
                    exports: [MatLegacyPaginator],
                    declarations: [MatLegacyPaginator],
                    providers: [MAT_PAGINATOR_INTL_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktcGFnaW5hdG9yL3BhZ2luYXRvci1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUMvQyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7QUFFeEU7OztHQUdHO0FBYUgsTUFBTSxPQUFPLHdCQUF3Qjs7MEhBQXhCLHdCQUF3QjsySEFBeEIsd0JBQXdCLGlCQUhwQixrQkFBa0IsYUFQL0IsWUFBWTtRQUNaLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLGVBQWUsYUFFUCxrQkFBa0I7MkhBSWpCLHdCQUF3QixhQUZ4QixDQUFDLDJCQUEyQixDQUFDLFlBUnRDLFlBQVk7UUFDWixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0QixlQUFlO2dHQU1OLHdCQUF3QjtrQkFacEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0QixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDN0IsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQ2xDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2lCQUN6QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRMZWdhY3lCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1idXR0b24nO1xuaW1wb3J0IHtNYXRMZWdhY3lTZWxlY3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1zZWxlY3QnO1xuaW1wb3J0IHtNYXRMZWdhY3lUb29sdGlwTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktdG9vbHRpcCc7XG5pbXBvcnQge01hdExlZ2FjeVBhZ2luYXRvcn0gZnJvbSAnLi9wYWdpbmF0b3InO1xuaW1wb3J0IHtNQVRfUEFHSU5BVE9SX0lOVExfUFJPVklERVJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRQYWdpbmF0b3JNb2R1bGVgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcmAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdExlZ2FjeUJ1dHRvbk1vZHVsZSxcbiAgICBNYXRMZWdhY3lTZWxlY3RNb2R1bGUsXG4gICAgTWF0TGVnYWN5VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtNYXRMZWdhY3lQYWdpbmF0b3JdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRMZWdhY3lQYWdpbmF0b3JdLFxuICBwcm92aWRlcnM6IFtNQVRfUEFHSU5BVE9SX0lOVExfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lQYWdpbmF0b3JNb2R1bGUge31cbiJdfQ==