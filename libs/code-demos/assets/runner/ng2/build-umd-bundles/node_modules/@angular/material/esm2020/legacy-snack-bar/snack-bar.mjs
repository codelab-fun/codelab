/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Overlay } from '@angular/cdk/overlay';
import { Inject, Injectable, Injector, Optional, SkipSelf } from '@angular/core';
import { LegacySimpleSnackBar } from './simple-snack-bar';
import { _MatSnackBarBase, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, } from '@angular/material/snack-bar';
import { MatLegacySnackBarContainer } from './snack-bar-container';
import { MatLegacySnackBarModule } from './snack-bar-module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/cdk/layout";
import * as i4 from "@angular/material/snack-bar";
/**
 * Service to dispatch Material Design snack bar messages.
 * @deprecated Use `MatSnackBar` from `@angular/material/snack-bar` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacySnackBar extends _MatSnackBarBase {
    constructor(overlay, live, injector, breakpointObserver, parentSnackBar, defaultConfig) {
        super(overlay, live, injector, breakpointObserver, parentSnackBar, defaultConfig);
        this.simpleSnackBarComponent = LegacySimpleSnackBar;
        this.snackBarContainerComponent = MatLegacySnackBarContainer;
        this.handsetCssClass = 'mat-snack-bar-handset';
    }
}
MatLegacySnackBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySnackBar, deps: [{ token: i1.Overlay }, { token: i2.LiveAnnouncer }, { token: i0.Injector }, { token: i3.BreakpointObserver }, { token: MatLegacySnackBar, optional: true, skipSelf: true }, { token: MAT_SNACK_BAR_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Injectable });
MatLegacySnackBar.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySnackBar, providedIn: MatLegacySnackBarModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySnackBar, decorators: [{
            type: Injectable,
            args: [{ providedIn: MatLegacySnackBarModule }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i2.LiveAnnouncer }, { type: i0.Injector }, { type: i3.BreakpointObserver }, { type: MatLegacySnackBar, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i4.MatSnackBarConfig, decorators: [{
                    type: Inject,
                    args: [MAT_SNACK_BAR_DEFAULT_OPTIONS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1zbmFjay1iYXIvc25hY2stYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUNMLGdCQUFnQixFQUNoQiw2QkFBNkIsRUFDN0IsaUJBQWlCLEdBQ2xCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQUUzRDs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGdCQUFnQjtJQUtyRCxZQUNFLE9BQWdCLEVBQ2hCLElBQW1CLEVBQ25CLFFBQWtCLEVBQ2xCLGtCQUFzQyxFQUNkLGNBQWlDLEVBQ2xCLGFBQWdDO1FBRXZFLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFaMUUsNEJBQXVCLEdBQUcsb0JBQW9CLENBQUM7UUFDL0MsK0JBQTBCLEdBQUcsMEJBQTBCLENBQUM7UUFDeEQsb0JBQWUsR0FBRyx1QkFBdUIsQ0FBQztJQVdwRCxDQUFDOzttSEFkVSxpQkFBaUIsOExBV2xCLDZCQUE2Qjt1SEFYNUIsaUJBQWlCLGNBREwsdUJBQXVCO2dHQUNuQyxpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsdUJBQXVCLEVBQUM7OzBCQVc1QyxRQUFROzswQkFBSSxRQUFROzswQkFDcEIsTUFBTTsyQkFBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMaXZlQW5ub3VuY2VyfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0JyZWFrcG9pbnRPYnNlcnZlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQge092ZXJsYXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TGVnYWN5U2ltcGxlU25hY2tCYXJ9IGZyb20gJy4vc2ltcGxlLXNuYWNrLWJhcic7XG5pbXBvcnQge1xuICBfTWF0U25hY2tCYXJCYXNlLFxuICBNQVRfU05BQ0tfQkFSX0RFRkFVTFRfT1BUSU9OUyxcbiAgTWF0U25hY2tCYXJDb25maWcsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQge01hdExlZ2FjeVNuYWNrQmFyQ29udGFpbmVyfSBmcm9tICcuL3NuYWNrLWJhci1jb250YWluZXInO1xuaW1wb3J0IHtNYXRMZWdhY3lTbmFja0Jhck1vZHVsZX0gZnJvbSAnLi9zbmFjay1iYXItbW9kdWxlJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGRpc3BhdGNoIE1hdGVyaWFsIERlc2lnbiBzbmFjayBiYXIgbWVzc2FnZXMuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFNuYWNrQmFyYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXJgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46IE1hdExlZ2FjeVNuYWNrQmFyTW9kdWxlfSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lTbmFja0JhciBleHRlbmRzIF9NYXRTbmFja0JhckJhc2Uge1xuICBwcm90ZWN0ZWQgc2ltcGxlU25hY2tCYXJDb21wb25lbnQgPSBMZWdhY3lTaW1wbGVTbmFja0JhcjtcbiAgcHJvdGVjdGVkIHNuYWNrQmFyQ29udGFpbmVyQ29tcG9uZW50ID0gTWF0TGVnYWN5U25hY2tCYXJDb250YWluZXI7XG4gIHByb3RlY3RlZCBoYW5kc2V0Q3NzQ2xhc3MgPSAnbWF0LXNuYWNrLWJhci1oYW5kc2V0JztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgIGxpdmU6IExpdmVBbm5vdW5jZXIsXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyLFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudFNuYWNrQmFyOiBNYXRMZWdhY3lTbmFja0JhcixcbiAgICBASW5qZWN0KE1BVF9TTkFDS19CQVJfREVGQVVMVF9PUFRJT05TKSBkZWZhdWx0Q29uZmlnOiBNYXRTbmFja0JhckNvbmZpZyxcbiAgKSB7XG4gICAgc3VwZXIob3ZlcmxheSwgbGl2ZSwgaW5qZWN0b3IsIGJyZWFrcG9pbnRPYnNlcnZlciwgcGFyZW50U25hY2tCYXIsIGRlZmF1bHRDb25maWcpO1xuICB9XG59XG4iXX0=