/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatLegacyOptionModule } from '@angular/material/legacy-core';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { MatLegacySelect, MatLegacySelectTrigger } from './select';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatSelectModule` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacySelectModule {
}
MatLegacySelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacySelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelectModule, declarations: [MatLegacySelect, MatLegacySelectTrigger], imports: [CommonModule, OverlayModule, MatLegacyOptionModule, MatCommonModule], exports: [CdkScrollableModule,
        MatLegacyFormFieldModule,
        MatLegacySelect,
        MatLegacySelectTrigger,
        MatLegacyOptionModule,
        MatCommonModule] });
MatLegacySelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelectModule, providers: [MAT_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [CommonModule, OverlayModule, MatLegacyOptionModule, MatCommonModule, CdkScrollableModule,
        MatLegacyFormFieldModule,
        MatLegacyOptionModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, MatLegacyOptionModule, MatCommonModule],
                    exports: [
                        CdkScrollableModule,
                        MatLegacyFormFieldModule,
                        MatLegacySelect,
                        MatLegacySelectTrigger,
                        MatLegacyOptionModule,
                        MatCommonModule,
                    ],
                    declarations: [MatLegacySelect, MatLegacySelectTrigger],
                    providers: [MAT_SELECT_SCROLL_STRATEGY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktc2VsZWN0L3NlbGVjdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsZUFBZSxFQUFFLHNCQUFzQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUVqRTs7O0dBR0c7QUFjSCxNQUFNLE9BQU8scUJBQXFCOzt1SEFBckIscUJBQXFCO3dIQUFyQixxQkFBcUIsaUJBSGpCLGVBQWUsRUFBRSxzQkFBc0IsYUFUNUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxlQUFlLGFBRTNFLG1CQUFtQjtRQUNuQix3QkFBd0I7UUFDeEIsZUFBZTtRQUNmLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsZUFBZTt3SEFLTixxQkFBcUIsYUFGckIsQ0FBQyxtQ0FBbUMsQ0FBQyxZQVZ0QyxZQUFZLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLGVBQWUsRUFFM0UsbUJBQW1CO1FBQ25CLHdCQUF3QjtRQUd4QixxQkFBcUI7UUFDckIsZUFBZTtnR0FLTixxQkFBcUI7a0JBYmpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxlQUFlLENBQUM7b0JBQzlFLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLHdCQUF3Qjt3QkFDeEIsZUFBZTt3QkFDZixzQkFBc0I7d0JBQ3RCLHFCQUFxQjt3QkFDckIsZUFBZTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLHNCQUFzQixDQUFDO29CQUN2RCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDakQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRMZWdhY3lPcHRpb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1jb3JlJztcbmltcG9ydCB7TWF0TGVnYWN5Rm9ybUZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktZm9ybS1maWVsZCc7XG5pbXBvcnQge0Nka1Njcm9sbGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtNQVRfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0TGVnYWN5U2VsZWN0LCBNYXRMZWdhY3lTZWxlY3RUcmlnZ2VyfSBmcm9tICcuL3NlbGVjdCc7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRTZWxlY3RNb2R1bGVgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3NlbGVjdGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBNYXRMZWdhY3lPcHRpb25Nb2R1bGUsIE1hdENvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBDZGtTY3JvbGxhYmxlTW9kdWxlLFxuICAgIE1hdExlZ2FjeUZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRMZWdhY3lTZWxlY3QsXG4gICAgTWF0TGVnYWN5U2VsZWN0VHJpZ2dlcixcbiAgICBNYXRMZWdhY3lPcHRpb25Nb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRMZWdhY3lTZWxlY3QsIE1hdExlZ2FjeVNlbGVjdFRyaWdnZXJdLFxuICBwcm92aWRlcnM6IFtNQVRfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVNlbGVjdE1vZHVsZSB7fVxuIl19