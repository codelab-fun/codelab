/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_PAGINATOR_INTL_PROVIDER } from './paginator-intl';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator } from './paginator';
import * as i0 from "@angular/core";
export class MatPaginatorModule {
}
MatPaginatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatPaginatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatPaginatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatPaginatorModule, declarations: [MatPaginator], imports: [CommonModule, MatButtonModule, MatSelectModule, MatTooltipModule], exports: [MatPaginator] });
MatPaginatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatPaginatorModule, providers: [MAT_PAGINATOR_INTL_PROVIDER], imports: [CommonModule, MatButtonModule, MatSelectModule, MatTooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatPaginatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatButtonModule, MatSelectModule, MatTooltipModule],
                    exports: [MatPaginator],
                    declarations: [MatPaginator],
                    providers: [MAT_PAGINATOR_INTL_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3BhZ2luYXRvci9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDOztBQVF6QyxNQUFNLE9BQU8sa0JBQWtCOztvSEFBbEIsa0JBQWtCO3FIQUFsQixrQkFBa0IsaUJBSGQsWUFBWSxhQUZqQixZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsYUFDaEUsWUFBWTtxSEFJWCxrQkFBa0IsYUFGbEIsQ0FBQywyQkFBMkIsQ0FBQyxZQUg5QixZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0I7Z0dBSy9ELGtCQUFrQjtrQkFOOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDM0UsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQzVCLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2lCQUN6QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNQVRfUEFHSU5BVE9SX0lOVExfUFJPVklERVJ9IGZyb20gJy4vcGFnaW5hdG9yLWludGwnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0VG9vbHRpcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQge01hdFBhZ2luYXRvcn0gZnJvbSAnLi9wYWdpbmF0b3InO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRQYWdpbmF0b3JdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRQYWdpbmF0b3JdLFxuICBwcm92aWRlcnM6IFtNQVRfUEFHSU5BVE9SX0lOVExfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQYWdpbmF0b3JNb2R1bGUge31cbiJdfQ==