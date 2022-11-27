/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Optional, SkipSelf, InjectionToken, Inject, Injector, } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetConfig } from './bottom-sheet-config';
import { MatBottomSheetContainer } from './bottom-sheet-container';
import { MatBottomSheetModule } from './bottom-sheet-module';
import { MatBottomSheetRef } from './bottom-sheet-ref';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./bottom-sheet-config";
/** Injection token that can be used to specify default bottom sheet options. */
export const MAT_BOTTOM_SHEET_DEFAULT_OPTIONS = new InjectionToken('mat-bottom-sheet-default-options');
/**
 * Service to trigger Material Design bottom sheets.
 */
export class MatBottomSheet {
    constructor(_overlay, injector, _parentBottomSheet, _defaultOptions) {
        this._overlay = _overlay;
        this._parentBottomSheet = _parentBottomSheet;
        this._defaultOptions = _defaultOptions;
        this._bottomSheetRefAtThisLevel = null;
        this._dialog = injector.get(Dialog);
    }
    /** Reference to the currently opened bottom sheet. */
    get _openedBottomSheetRef() {
        const parent = this._parentBottomSheet;
        return parent ? parent._openedBottomSheetRef : this._bottomSheetRefAtThisLevel;
    }
    set _openedBottomSheetRef(value) {
        if (this._parentBottomSheet) {
            this._parentBottomSheet._openedBottomSheetRef = value;
        }
        else {
            this._bottomSheetRefAtThisLevel = value;
        }
    }
    open(componentOrTemplateRef, config) {
        const _config = { ...(this._defaultOptions || new MatBottomSheetConfig()), ...config };
        let ref;
        this._dialog.open(componentOrTemplateRef, {
            ..._config,
            // Disable closing since we need to sync it up to the animation ourselves.
            disableClose: true,
            maxWidth: '100%',
            container: MatBottomSheetContainer,
            scrollStrategy: _config.scrollStrategy || this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position().global().centerHorizontally().bottom('0'),
            templateContext: () => ({ bottomSheetRef: ref }),
            providers: (cdkRef, _cdkConfig, container) => {
                ref = new MatBottomSheetRef(cdkRef, _config, container);
                return [
                    { provide: MatBottomSheetRef, useValue: ref },
                    { provide: MAT_BOTTOM_SHEET_DATA, useValue: _config.data },
                ];
            },
        });
        // When the bottom sheet is dismissed, clear the reference to it.
        ref.afterDismissed().subscribe(() => {
            // Clear the bottom sheet ref if it hasn't already been replaced by a newer one.
            if (this._openedBottomSheetRef === ref) {
                this._openedBottomSheetRef = null;
            }
        });
        if (this._openedBottomSheetRef) {
            // If a bottom sheet is already in view, dismiss it and enter the
            // new bottom sheet after exit animation is complete.
            this._openedBottomSheetRef.afterDismissed().subscribe(() => ref.containerInstance?.enter());
            this._openedBottomSheetRef.dismiss();
        }
        else {
            // If no bottom sheet is in view, enter the new bottom sheet.
            ref.containerInstance.enter();
        }
        this._openedBottomSheetRef = ref;
        return ref;
    }
    /**
     * Dismisses the currently-visible bottom sheet.
     * @param result Data to pass to the bottom sheet instance.
     */
    dismiss(result) {
        if (this._openedBottomSheetRef) {
            this._openedBottomSheetRef.dismiss(result);
        }
    }
    ngOnDestroy() {
        if (this._bottomSheetRefAtThisLevel) {
            this._bottomSheetRefAtThisLevel.dismiss();
        }
    }
}
MatBottomSheet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatBottomSheet, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: MatBottomSheet, optional: true, skipSelf: true }, { token: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
MatBottomSheet.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatBottomSheet, providedIn: MatBottomSheetModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatBottomSheet, decorators: [{
            type: Injectable,
            args: [{ providedIn: MatBottomSheetModule }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: MatBottomSheet, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i2.MatBottomSheetConfig, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_BOTTOM_SHEET_DEFAULT_OPTIONS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLXNoZWV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2JvdHRvbS1zaGVldC9ib3R0b20tc2hlZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU3QyxPQUFPLEVBQ0wsVUFBVSxFQUNWLFFBQVEsRUFDUixRQUFRLEVBRVIsY0FBYyxFQUNkLE1BQU0sRUFFTixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFFckQsZ0ZBQWdGO0FBQ2hGLE1BQU0sQ0FBQyxNQUFNLGdDQUFnQyxHQUFHLElBQUksY0FBYyxDQUNoRSxrQ0FBa0MsQ0FDbkMsQ0FBQztBQUVGOztHQUVHO0FBRUgsTUFBTSxPQUFPLGNBQWM7SUFrQnpCLFlBQ1UsUUFBaUIsRUFDekIsUUFBa0IsRUFDYyxrQkFBa0MsRUFHMUQsZUFBc0M7UUFMdEMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUVPLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBZ0I7UUFHMUQsb0JBQWUsR0FBZixlQUFlLENBQXVCO1FBdkJ4QywrQkFBMEIsR0FBa0MsSUFBSSxDQUFDO1FBeUJ2RSxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQXZCRCxzREFB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Q0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLDBCQUEwQixFQUFFO1lBQ25DLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQztJQUNILENBQUM7O2dIQWhIVSxjQUFjLDRIQXVCZixnQ0FBZ0M7b0hBdkIvQixjQUFjLGNBREYsb0JBQW9CO2dHQUNoQyxjQUFjO2tCQUQxQixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLG9CQUFvQixFQUFDOzswQkFzQnpDLFFBQVE7OzBCQUFJLFFBQVE7OzBCQUNwQixRQUFROzswQkFDUixNQUFNOzJCQUFDLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpYWxvZ30gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5pbXBvcnQge092ZXJsYXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7Q29tcG9uZW50VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG4gIFRlbXBsYXRlUmVmLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIEluamVjdG9yLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TUFUX0JPVFRPTV9TSEVFVF9EQVRBLCBNYXRCb3R0b21TaGVldENvbmZpZ30gZnJvbSAnLi9ib3R0b20tc2hlZXQtY29uZmlnJztcbmltcG9ydCB7TWF0Qm90dG9tU2hlZXRDb250YWluZXJ9IGZyb20gJy4vYm90dG9tLXNoZWV0LWNvbnRhaW5lcic7XG5pbXBvcnQge01hdEJvdHRvbVNoZWV0TW9kdWxlfSBmcm9tICcuL2JvdHRvbS1zaGVldC1tb2R1bGUnO1xuaW1wb3J0IHtNYXRCb3R0b21TaGVldFJlZn0gZnJvbSAnLi9ib3R0b20tc2hlZXQtcmVmJztcblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgZGVmYXVsdCBib3R0b20gc2hlZXQgb3B0aW9ucy4gKi9cbmV4cG9ydCBjb25zdCBNQVRfQk9UVE9NX1NIRUVUX0RFRkFVTFRfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRCb3R0b21TaGVldENvbmZpZz4oXG4gICdtYXQtYm90dG9tLXNoZWV0LWRlZmF1bHQtb3B0aW9ucycsXG4pO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gdHJpZ2dlciBNYXRlcmlhbCBEZXNpZ24gYm90dG9tIHNoZWV0cy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46IE1hdEJvdHRvbVNoZWV0TW9kdWxlfSlcbmV4cG9ydCBjbGFzcyBNYXRCb3R0b21TaGVldCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2JvdHRvbVNoZWV0UmVmQXRUaGlzTGV2ZWw6IE1hdEJvdHRvbVNoZWV0UmVmPGFueT4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfZGlhbG9nOiBEaWFsb2c7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5IG9wZW5lZCBib3R0b20gc2hlZXQuICovXG4gIGdldCBfb3BlbmVkQm90dG9tU2hlZXRSZWYoKTogTWF0Qm90dG9tU2hlZXRSZWY8YW55PiB8IG51bGwge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuX3BhcmVudEJvdHRvbVNoZWV0O1xuICAgIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuX29wZW5lZEJvdHRvbVNoZWV0UmVmIDogdGhpcy5fYm90dG9tU2hlZXRSZWZBdFRoaXNMZXZlbDtcbiAgfVxuXG4gIHNldCBfb3BlbmVkQm90dG9tU2hlZXRSZWYodmFsdWU6IE1hdEJvdHRvbVNoZWV0UmVmPGFueT4gfCBudWxsKSB7XG4gICAgaWYgKHRoaXMuX3BhcmVudEJvdHRvbVNoZWV0KSB7XG4gICAgICB0aGlzLl9wYXJlbnRCb3R0b21TaGVldC5fb3BlbmVkQm90dG9tU2hlZXRSZWYgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYm90dG9tU2hlZXRSZWZBdFRoaXNMZXZlbCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHByaXZhdGUgX3BhcmVudEJvdHRvbVNoZWV0OiBNYXRCb3R0b21TaGVldCxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTUFUX0JPVFRPTV9TSEVFVF9ERUZBVUxUX09QVElPTlMpXG4gICAgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM/OiBNYXRCb3R0b21TaGVldENvbmZpZyxcbiAgKSB7XG4gICAgdGhpcy5fZGlhbG9nID0gaW5qZWN0b3IuZ2V0KERpYWxvZyk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYSBib3R0b20gc2hlZXQgY29udGFpbmluZyB0aGUgZ2l2ZW4gY29tcG9uZW50LlxuICAgKiBAcGFyYW0gY29tcG9uZW50IFR5cGUgb2YgdGhlIGNvbXBvbmVudCB0byBsb2FkIGludG8gdGhlIGJvdHRvbSBzaGVldC5cbiAgICogQHBhcmFtIGNvbmZpZyBFeHRyYSBjb25maWd1cmF0aW9uIG9wdGlvbnMuXG4gICAqIEByZXR1cm5zIFJlZmVyZW5jZSB0byB0aGUgbmV3bHktb3BlbmVkIGJvdHRvbSBzaGVldC5cbiAgICovXG4gIG9wZW48VCwgRCA9IGFueSwgUiA9IGFueT4oXG4gICAgY29tcG9uZW50OiBDb21wb25lbnRUeXBlPFQ+LFxuICAgIGNvbmZpZz86IE1hdEJvdHRvbVNoZWV0Q29uZmlnPEQ+LFxuICApOiBNYXRCb3R0b21TaGVldFJlZjxULCBSPjtcblxuICAvKipcbiAgICogT3BlbnMgYSBib3R0b20gc2hlZXQgY29udGFpbmluZyB0aGUgZ2l2ZW4gdGVtcGxhdGUuXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZSBUZW1wbGF0ZVJlZiB0byBpbnN0YW50aWF0ZSBhcyB0aGUgYm90dG9tIHNoZWV0IGNvbnRlbnQuXG4gICAqIEBwYXJhbSBjb25maWcgRXh0cmEgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICAgKiBAcmV0dXJucyBSZWZlcmVuY2UgdG8gdGhlIG5ld2x5LW9wZW5lZCBib3R0b20gc2hlZXQuXG4gICAqL1xuICBvcGVuPFQsIEQgPSBhbnksIFIgPSBhbnk+KFxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxUPixcbiAgICBjb25maWc/OiBNYXRCb3R0b21TaGVldENvbmZpZzxEPixcbiAgKTogTWF0Qm90dG9tU2hlZXRSZWY8VCwgUj47XG5cbiAgb3BlbjxULCBEID0gYW55LCBSID0gYW55PihcbiAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgY29uZmlnPzogTWF0Qm90dG9tU2hlZXRDb25maWc8RD4sXG4gICk6IE1hdEJvdHRvbVNoZWV0UmVmPFQsIFI+IHtcbiAgICBjb25zdCBfY29uZmlnID0gey4uLih0aGlzLl9kZWZhdWx0T3B0aW9ucyB8fCBuZXcgTWF0Qm90dG9tU2hlZXRDb25maWcoKSksIC4uLmNvbmZpZ307XG4gICAgbGV0IHJlZjogTWF0Qm90dG9tU2hlZXRSZWY8VCwgUj47XG5cbiAgICB0aGlzLl9kaWFsb2cub3BlbjxSLCBELCBUPihjb21wb25lbnRPclRlbXBsYXRlUmVmLCB7XG4gICAgICAuLi5fY29uZmlnLFxuICAgICAgLy8gRGlzYWJsZSBjbG9zaW5nIHNpbmNlIHdlIG5lZWQgdG8gc3luYyBpdCB1cCB0byB0aGUgYW5pbWF0aW9uIG91cnNlbHZlcy5cbiAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICBjb250YWluZXI6IE1hdEJvdHRvbVNoZWV0Q29udGFpbmVyLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IF9jb25maWcuc2Nyb2xsU3RyYXRlZ3kgfHwgdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCksXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKCkuY2VudGVySG9yaXpvbnRhbGx5KCkuYm90dG9tKCcwJyksXG4gICAgICB0ZW1wbGF0ZUNvbnRleHQ6ICgpID0+ICh7Ym90dG9tU2hlZXRSZWY6IHJlZn0pLFxuICAgICAgcHJvdmlkZXJzOiAoY2RrUmVmLCBfY2RrQ29uZmlnLCBjb250YWluZXIpID0+IHtcbiAgICAgICAgcmVmID0gbmV3IE1hdEJvdHRvbVNoZWV0UmVmKGNka1JlZiwgX2NvbmZpZywgY29udGFpbmVyIGFzIE1hdEJvdHRvbVNoZWV0Q29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICB7cHJvdmlkZTogTWF0Qm90dG9tU2hlZXRSZWYsIHVzZVZhbHVlOiByZWZ9LFxuICAgICAgICAgIHtwcm92aWRlOiBNQVRfQk9UVE9NX1NIRUVUX0RBVEEsIHVzZVZhbHVlOiBfY29uZmlnLmRhdGF9LFxuICAgICAgICBdO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gdGhlIGJvdHRvbSBzaGVldCBpcyBkaXNtaXNzZWQsIGNsZWFyIHRoZSByZWZlcmVuY2UgdG8gaXQuXG4gICAgcmVmIS5hZnRlckRpc21pc3NlZCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBDbGVhciB0aGUgYm90dG9tIHNoZWV0IHJlZiBpZiBpdCBoYXNuJ3QgYWxyZWFkeSBiZWVuIHJlcGxhY2VkIGJ5IGEgbmV3ZXIgb25lLlxuICAgICAgaWYgKHRoaXMuX29wZW5lZEJvdHRvbVNoZWV0UmVmID09PSByZWYpIHtcbiAgICAgICAgdGhpcy5fb3BlbmVkQm90dG9tU2hlZXRSZWYgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuX29wZW5lZEJvdHRvbVNoZWV0UmVmKSB7XG4gICAgICAvLyBJZiBhIGJvdHRvbSBzaGVldCBpcyBhbHJlYWR5IGluIHZpZXcsIGRpc21pc3MgaXQgYW5kIGVudGVyIHRoZVxuICAgICAgLy8gbmV3IGJvdHRvbSBzaGVldCBhZnRlciBleGl0IGFuaW1hdGlvbiBpcyBjb21wbGV0ZS5cbiAgICAgIHRoaXMuX29wZW5lZEJvdHRvbVNoZWV0UmVmLmFmdGVyRGlzbWlzc2VkKCkuc3Vic2NyaWJlKCgpID0+IHJlZi5jb250YWluZXJJbnN0YW5jZT8uZW50ZXIoKSk7XG4gICAgICB0aGlzLl9vcGVuZWRCb3R0b21TaGVldFJlZi5kaXNtaXNzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIG5vIGJvdHRvbSBzaGVldCBpcyBpbiB2aWV3LCBlbnRlciB0aGUgbmV3IGJvdHRvbSBzaGVldC5cbiAgICAgIHJlZiEuY29udGFpbmVySW5zdGFuY2UuZW50ZXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vcGVuZWRCb3R0b21TaGVldFJlZiA9IHJlZiE7XG4gICAgcmV0dXJuIHJlZiE7XG4gIH1cblxuICAvKipcbiAgICogRGlzbWlzc2VzIHRoZSBjdXJyZW50bHktdmlzaWJsZSBib3R0b20gc2hlZXQuXG4gICAqIEBwYXJhbSByZXN1bHQgRGF0YSB0byBwYXNzIHRvIHRoZSBib3R0b20gc2hlZXQgaW5zdGFuY2UuXG4gICAqL1xuICBkaXNtaXNzPFIgPSBhbnk+KHJlc3VsdD86IFIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3BlbmVkQm90dG9tU2hlZXRSZWYpIHtcbiAgICAgIHRoaXMuX29wZW5lZEJvdHRvbVNoZWV0UmVmLmRpc21pc3MocmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fYm90dG9tU2hlZXRSZWZBdFRoaXNMZXZlbCkge1xuICAgICAgdGhpcy5fYm90dG9tU2hlZXRSZWZBdFRoaXNMZXZlbC5kaXNtaXNzKCk7XG4gICAgfVxuICB9XG59XG4iXX0=