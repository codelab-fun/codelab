/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatSortHeader } from './sort-header';
import { MatSort } from './sort';
import { MAT_SORT_HEADER_INTL_PROVIDER } from './sort-header-intl';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import * as i0 from "@angular/core";
export class MatSortModule {
}
MatSortModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSortModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSortModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSortModule, declarations: [MatSort, MatSortHeader], imports: [CommonModule, MatCommonModule], exports: [MatSort, MatSortHeader] });
MatSortModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSortModule, providers: [MAT_SORT_HEADER_INTL_PROVIDER], imports: [CommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSortModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatCommonModule],
                    exports: [MatSort, MatSortHeader],
                    declarations: [MatSort, MatSortHeader],
                    providers: [MAT_SORT_HEADER_INTL_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc29ydC9zb3J0LW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDOztBQVF2RCxNQUFNLE9BQU8sYUFBYTs7K0dBQWIsYUFBYTtnSEFBYixhQUFhLGlCQUhULE9BQU8sRUFBRSxhQUFhLGFBRjNCLFlBQVksRUFBRSxlQUFlLGFBQzdCLE9BQU8sRUFBRSxhQUFhO2dIQUlyQixhQUFhLGFBRmIsQ0FBQyw2QkFBNkIsQ0FBQyxZQUhoQyxZQUFZLEVBQUUsZUFBZTtnR0FLNUIsYUFBYTtrQkFOekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO29CQUNqQyxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO29CQUN0QyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztpQkFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFNvcnRIZWFkZXJ9IGZyb20gJy4vc29ydC1oZWFkZXInO1xuaW1wb3J0IHtNYXRTb3J0fSBmcm9tICcuL3NvcnQnO1xuaW1wb3J0IHtNQVRfU09SVF9IRUFERVJfSU5UTF9QUk9WSURFUn0gZnJvbSAnLi9zb3J0LWhlYWRlci1pbnRsJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0U29ydCwgTWF0U29ydEhlYWRlcl0sXG4gIGRlY2xhcmF0aW9uczogW01hdFNvcnQsIE1hdFNvcnRIZWFkZXJdLFxuICBwcm92aWRlcnM6IFtNQVRfU09SVF9IRUFERVJfSU5UTF9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNvcnRNb2R1bGUge31cbiJdfQ==