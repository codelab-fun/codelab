/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf } from '@angular/core';
import { MatLegacyDialogContainer } from './dialog-container';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { _MatDialogBase } from '@angular/material/dialog';
import { MatLegacyDialogRef } from './dialog-ref';
import { MatLegacyDialogConfig } from './dialog-config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/common";
import * as i3 from "./dialog-config";
/**
 * Injection token that can be used to access the data that was passed in to a dialog.
 * @deprecated Use `MAT_DIALOG_DATA` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const MAT_LEGACY_DIALOG_DATA = new InjectionToken('MatDialogData');
/**
 * Injection token that can be used to specify default dialog options.
 * @deprecated Use `MAT_DIALOG_DEFAULT_OPTIONS` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const MAT_LEGACY_DIALOG_DEFAULT_OPTIONS = new InjectionToken('mat-dialog-default-options');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 * @deprecated Use `MAT_DIALOG_SCROLL_STRATEGY` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const MAT_LEGACY_DIALOG_SCROLL_STRATEGY = new InjectionToken('mat-dialog-scroll-strategy');
/**
 * @docs-private
 * @deprecated Use `MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export function MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
/**
 * @docs-private
 * @deprecated Use `MAT_DIALOG_SCROLL_STRATEGY_PROVIDER` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: MAT_LEGACY_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/**
 * Service to open Material Design modal dialogs.
 * @deprecated Use `MatDialog` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyDialog extends _MatDialogBase {
    constructor(overlay, injector, 
    /**
     * @deprecated `_location` parameter to be removed.
     * @breaking-change 10.0.0
     */
    _location, defaultOptions, scrollStrategy, parentDialog, 
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 15.0.0
     */
    overlayContainer, 
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 14.0.0
     */
    animationMode) {
        super(overlay, injector, defaultOptions, parentDialog, overlayContainer, scrollStrategy, MatLegacyDialogRef, MatLegacyDialogContainer, MAT_LEGACY_DIALOG_DATA, animationMode);
        this.dialogConfigClass = MatLegacyDialogConfig;
    }
}
MatLegacyDialog.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialog, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: i2.Location, optional: true }, { token: MAT_LEGACY_DIALOG_DEFAULT_OPTIONS, optional: true }, { token: MAT_LEGACY_DIALOG_SCROLL_STRATEGY }, { token: MatLegacyDialog, optional: true, skipSelf: true }, { token: i1.OverlayContainer }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
MatLegacyDialog.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialog });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialog, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: i2.Location, decorators: [{
                    type: Optional
                }] }, { type: i3.MatLegacyDialogConfig, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_LEGACY_DIALOG_DEFAULT_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_LEGACY_DIALOG_SCROLL_STRATEGY]
                }] }, { type: MatLegacyDialog, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i1.OverlayContainer }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1kaWFsb2cvZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQWlCLE1BQU0sc0JBQXNCLENBQUM7QUFDL0UsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUV0RDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxjQUFjLENBQU0sZUFBZSxDQUFDLENBQUM7QUFFL0U7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUFHLElBQUksY0FBYyxDQUNqRSw0QkFBNEIsQ0FDN0IsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBRyxJQUFJLGNBQWMsQ0FDakUsNEJBQTRCLENBQzdCLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtEQUFrRCxDQUNoRSxPQUFnQjtJQUVoQixPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNoRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLDBDQUEwQyxHQUFHO0lBQ3hELE9BQU8sRUFBRSxpQ0FBaUM7SUFDMUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2YsVUFBVSxFQUFFLGtEQUFrRDtDQUMvRCxDQUFDO0FBRUY7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxlQUFnQixTQUFRLGNBQXdDO0lBRzNFLFlBQ0UsT0FBZ0IsRUFDaEIsUUFBa0I7SUFDbEI7OztPQUdHO0lBQ1MsU0FBbUIsRUFDd0IsY0FBcUMsRUFDakQsY0FBbUIsRUFDdEMsWUFBNkI7SUFDckQ7OztPQUdHO0lBQ0gsZ0JBQWtDO0lBQ2xDOzs7T0FHRztJQUdILGFBQXNEO1FBRXRELEtBQUssQ0FDSCxPQUFPLEVBQ1AsUUFBUSxFQUNSLGNBQWMsRUFDZCxZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsd0JBQXdCLEVBQ3hCLHNCQUFzQixFQUN0QixhQUFhLENBQ2QsQ0FBQztRQXJDZSxzQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQztJQXNDN0QsQ0FBQzs7aUhBdkNVLGVBQWUseUdBV0osaUNBQWlDLDZCQUM3QyxpQ0FBaUMseUdBWWpDLHFCQUFxQjtxSEF4QnBCLGVBQWU7Z0dBQWYsZUFBZTtrQkFEM0IsVUFBVTs7MEJBV04sUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxpQ0FBaUM7OzBCQUNwRCxNQUFNOzJCQUFDLGlDQUFpQzs7MEJBQ3hDLFFBQVE7OzBCQUFJLFFBQVE7OzBCQVVwQixRQUFROzswQkFDUixNQUFNOzJCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge092ZXJsYXksIE92ZXJsYXlDb250YWluZXIsIFNjcm9sbFN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0TGVnYWN5RGlhbG9nQ29udGFpbmVyfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXInO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge19NYXREaWFsb2dCYXNlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtNYXRMZWdhY3lEaWFsb2dSZWZ9IGZyb20gJy4vZGlhbG9nLXJlZic7XG5pbXBvcnQge01hdExlZ2FjeURpYWxvZ0NvbmZpZ30gZnJvbSAnLi9kaWFsb2ctY29uZmlnJztcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgdGhlIGRhdGEgdGhhdCB3YXMgcGFzc2VkIGluIHRvIGEgZGlhbG9nLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNQVRfRElBTE9HX0RBVEFgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2RpYWxvZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY29uc3QgTUFUX0xFR0FDWV9ESUFMT0dfREFUQSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdNYXREaWFsb2dEYXRhJyk7XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBkZWZhdWx0IGRpYWxvZyBvcHRpb25zLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OU2AgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfTEVHQUNZX0RJQUxPR19ERUZBVUxUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0TGVnYWN5RGlhbG9nQ29uZmlnPihcbiAgJ21hdC1kaWFsb2ctZGVmYXVsdC1vcHRpb25zJyxcbik7XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkaWFsb2cgaXMgb3Blbi5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTUFUX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2RpYWxvZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5leHBvcnQgY29uc3QgTUFUX0xFR0FDWV9ESUFMT0dfU0NST0xMX1NUUkFURUdZID0gbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PihcbiAgJ21hdC1kaWFsb2ctc2Nyb2xsLXN0cmF0ZWd5Jyxcbik7XG5cbi8qKlxuICogQGRvY3MtcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWQgVXNlIGBNQVRfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2dgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BVF9MRUdBQ1lfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZKFxuICBvdmVybGF5OiBPdmVybGF5LFxuKTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCk7XG59XG5cbi8qKlxuICogQGRvY3MtcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWQgVXNlIGBNQVRfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfTEVHQUNZX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IE1BVF9MRUdBQ1lfRElBTE9HX1NDUk9MTF9TVFJBVEVHWSxcbiAgZGVwczogW092ZXJsYXldLFxuICB1c2VGYWN0b3J5OiBNQVRfTEVHQUNZX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWSxcbn07XG5cbi8qKlxuICogU2VydmljZSB0byBvcGVuIE1hdGVyaWFsIERlc2lnbiBtb2RhbCBkaWFsb2dzLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXREaWFsb2dgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2RpYWxvZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5RGlhbG9nIGV4dGVuZHMgX01hdERpYWxvZ0Jhc2U8TWF0TGVnYWN5RGlhbG9nQ29udGFpbmVyPiB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBkaWFsb2dDb25maWdDbGFzcyA9IE1hdExlZ2FjeURpYWxvZ0NvbmZpZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBgX2xvY2F0aW9uYCBwYXJhbWV0ZXIgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMFxuICAgICAqL1xuICAgIEBPcHRpb25hbCgpIF9sb2NhdGlvbjogTG9jYXRpb24sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfTEVHQUNZX0RJQUxPR19ERUZBVUxUX09QVElPTlMpIGRlZmF1bHRPcHRpb25zOiBNYXRMZWdhY3lEaWFsb2dDb25maWcsXG4gICAgQEluamVjdChNQVRfTEVHQUNZX0RJQUxPR19TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50RGlhbG9nOiBNYXRMZWdhY3lEaWFsb2csXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgTm8gbG9uZ2VyIHVzZWQuIFRvIGJlIHJlbW92ZWQuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSAxNS4wLjBcbiAgICAgKi9cbiAgICBvdmVybGF5Q29udGFpbmVyOiBPdmVybGF5Q29udGFpbmVyLFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIE5vIGxvbmdlciB1c2VkLiBUbyBiZSByZW1vdmVkLlxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTQuMC4wXG4gICAgICovXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSlcbiAgICBhbmltYXRpb25Nb2RlPzogJ05vb3BBbmltYXRpb25zJyB8ICdCcm93c2VyQW5pbWF0aW9ucycsXG4gICkge1xuICAgIHN1cGVyKFxuICAgICAgb3ZlcmxheSxcbiAgICAgIGluamVjdG9yLFxuICAgICAgZGVmYXVsdE9wdGlvbnMsXG4gICAgICBwYXJlbnREaWFsb2csXG4gICAgICBvdmVybGF5Q29udGFpbmVyLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICBNYXRMZWdhY3lEaWFsb2dSZWYsXG4gICAgICBNYXRMZWdhY3lEaWFsb2dDb250YWluZXIsXG4gICAgICBNQVRfTEVHQUNZX0RJQUxPR19EQVRBLFxuICAgICAgYW5pbWF0aW9uTW9kZSxcbiAgICApO1xuICB9XG59XG4iXX0=