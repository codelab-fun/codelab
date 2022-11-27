/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { ANIMATION_MODULE_TYPE, Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf, Type, } from '@angular/core';
import { MatDialogConfig } from './dialog-config';
import { MatDialogContainer } from './dialog-container';
import { MatDialogRef } from './dialog-ref';
import { defer, Subject } from 'rxjs';
import { Dialog, DialogConfig } from '@angular/cdk/dialog';
import { startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/common";
import * as i3 from "./dialog-config";
/** Injection token that can be used to access the data that was passed in to a dialog. */
export const MAT_DIALOG_DATA = new InjectionToken('MatMdcDialogData');
/** Injection token that can be used to specify default dialog options. */
export const MAT_DIALOG_DEFAULT_OPTIONS = new InjectionToken('mat-mdc-dialog-default-options');
/** Injection token that determines the scroll handling while the dialog is open. */
export const MAT_DIALOG_SCROLL_STRATEGY = new InjectionToken('mat-mdc-dialog-scroll-strategy');
/** @docs-private */
export function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
/** @docs-private */
export const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: MAT_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/** @docs-private */
export function MAT_DIALOG_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
// Counter for unique dialog ids.
let uniqueId = 0;
/**
 * Base class for dialog services. The base dialog service allows
 * for arbitrary dialog refs and dialog container components.
 */
export class _MatDialogBase {
    constructor(_overlay, injector, _defaultOptions, _parentDialog, 
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 15.0.0
     */
    _overlayContainer, scrollStrategy, _dialogRefConstructor, _dialogContainerType, _dialogDataToken, 
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 14.0.0
     */
    _animationMode) {
        this._overlay = _overlay;
        this._defaultOptions = _defaultOptions;
        this._parentDialog = _parentDialog;
        this._dialogRefConstructor = _dialogRefConstructor;
        this._dialogContainerType = _dialogContainerType;
        this._dialogDataToken = _dialogDataToken;
        this._openDialogsAtThisLevel = [];
        this._afterAllClosedAtThisLevel = new Subject();
        this._afterOpenedAtThisLevel = new Subject();
        this._idPrefix = 'mat-dialog-';
        this.dialogConfigClass = MatDialogConfig;
        /**
         * Stream that emits when all open dialog have finished closing.
         * Will emit on subscribe if there are no open dialogs to begin with.
         */
        this.afterAllClosed = defer(() => this.openDialogs.length
            ? this._getAfterAllClosed()
            : this._getAfterAllClosed().pipe(startWith(undefined)));
        this._scrollStrategy = scrollStrategy;
        this._dialog = injector.get(Dialog);
    }
    /** Keeps track of the currently-open dialogs. */
    get openDialogs() {
        return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
    }
    /** Stream that emits when a dialog has been opened. */
    get afterOpened() {
        return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
    }
    _getAfterAllClosed() {
        const parent = this._parentDialog;
        return parent ? parent._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
    }
    open(componentOrTemplateRef, config) {
        let dialogRef;
        config = { ...(this._defaultOptions || new MatDialogConfig()), ...config };
        config.id = config.id || `${this._idPrefix}${uniqueId++}`;
        config.scrollStrategy = config.scrollStrategy || this._scrollStrategy();
        const cdkRef = this._dialog.open(componentOrTemplateRef, {
            ...config,
            positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
            // Disable closing since we need to sync it up to the animation ourselves.
            disableClose: true,
            // Disable closing on destroy, because this service cleans up its open dialogs as well.
            // We want to do the cleanup here, rather than the CDK service, because the CDK destroys
            // the dialogs immediately whereas we want it to wait for the animations to finish.
            closeOnDestroy: false,
            container: {
                type: this._dialogContainerType,
                providers: () => [
                    // Provide our config as the CDK config as well since it has the same interface as the
                    // CDK one, but it contains the actual values passed in by the user for things like
                    // `disableClose` which we disable for the CDK dialog since we handle it ourselves.
                    { provide: this.dialogConfigClass, useValue: config },
                    { provide: DialogConfig, useValue: config },
                ],
            },
            templateContext: () => ({ dialogRef }),
            providers: (ref, cdkConfig, dialogContainer) => {
                dialogRef = new this._dialogRefConstructor(ref, config, dialogContainer);
                dialogRef.updatePosition(config?.position);
                return [
                    { provide: this._dialogContainerType, useValue: dialogContainer },
                    { provide: this._dialogDataToken, useValue: cdkConfig.data },
                    { provide: this._dialogRefConstructor, useValue: dialogRef },
                ];
            },
        });
        // This can't be assigned in the `providers` callback, because
        // the instance hasn't been assigned to the CDK ref yet.
        dialogRef.componentInstance = cdkRef.componentInstance;
        this.openDialogs.push(dialogRef);
        this.afterOpened.next(dialogRef);
        dialogRef.afterClosed().subscribe(() => {
            const index = this.openDialogs.indexOf(dialogRef);
            if (index > -1) {
                this.openDialogs.splice(index, 1);
                if (!this.openDialogs.length) {
                    this._getAfterAllClosed().next();
                }
            }
        });
        return dialogRef;
    }
    /**
     * Closes all of the currently-open dialogs.
     */
    closeAll() {
        this._closeDialogs(this.openDialogs);
    }
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    getDialogById(id) {
        return this.openDialogs.find(dialog => dialog.id === id);
    }
    ngOnDestroy() {
        // Only close the dialogs at this level on destroy
        // since the parent service may still be active.
        this._closeDialogs(this._openDialogsAtThisLevel);
        this._afterAllClosedAtThisLevel.complete();
        this._afterOpenedAtThisLevel.complete();
    }
    _closeDialogs(dialogs) {
        let i = dialogs.length;
        while (i--) {
            dialogs[i].close();
        }
    }
}
_MatDialogBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatDialogBase, deps: "invalid", target: i0.ɵɵFactoryTarget.Injectable });
_MatDialogBase.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatDialogBase });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatDialogBase, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: undefined }, { type: undefined }, { type: i1.OverlayContainer }, { type: undefined }, { type: i0.Type }, { type: i0.Type }, { type: i0.InjectionToken }, { type: undefined }]; } });
/**
 * Service to open Material Design modal dialogs.
 */
export class MatDialog extends _MatDialogBase {
    constructor(overlay, injector, 
    /**
     * @deprecated `_location` parameter to be removed.
     * @breaking-change 10.0.0
     */
    location, defaultOptions, scrollStrategy, parentDialog, 
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
        super(overlay, injector, defaultOptions, parentDialog, overlayContainer, scrollStrategy, MatDialogRef, MatDialogContainer, MAT_DIALOG_DATA, animationMode);
        this._idPrefix = 'mat-mdc-dialog-';
    }
}
MatDialog.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialog, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: i2.Location, optional: true }, { token: MAT_DIALOG_DEFAULT_OPTIONS, optional: true }, { token: MAT_DIALOG_SCROLL_STRATEGY }, { token: MatDialog, optional: true, skipSelf: true }, { token: i1.OverlayContainer }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
MatDialog.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialog });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialog, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: i2.Location, decorators: [{
                    type: Optional
                }] }, { type: i3.MatDialogConfig, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DIALOG_DEFAULT_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_SCROLL_STRATEGY]
                }] }, { type: MatDialog, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i1.OverlayContainer }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2RpYWxvZy9kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFnQixPQUFPLEVBQUUsZ0JBQWdCLEVBQWlCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUYsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsUUFBUSxFQUVSLFFBQVEsRUFDUixRQUFRLEVBRVIsSUFBSSxHQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQTBCLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDL0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsS0FBSyxFQUFjLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFFekMsMEZBQTBGO0FBQzFGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBTSxrQkFBa0IsQ0FBQyxDQUFDO0FBRTNFLDBFQUEwRTtBQUMxRSxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLGNBQWMsQ0FDMUQsZ0NBQWdDLENBQ2pDLENBQUM7QUFFRixvRkFBb0Y7QUFDcEYsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBQzFELGdDQUFnQyxDQUNqQyxDQUFDO0FBRUYsb0JBQW9CO0FBQ3BCLE1BQU0s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Q3JDLENBQUM7OzJHQXZDVSxTQUFTLHlHQVNFLDBCQUEwQiw2QkFDdEMsMEJBQTBCLG1HQVkxQixxQkFBcUI7K0dBdEJwQixTQUFTO2dHQUFULFNBQVM7a0JBRHJCLFVBQVU7OzBCQVNOLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsMEJBQTBCOzswQkFDN0MsTUFBTTsyQkFBQywwQkFBMEI7OzBCQUNqQyxRQUFROzswQkFBSSxRQUFROzswQkFVcEIsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRUeXBlLCBPdmVybGF5LCBPdmVybGF5Q29udGFpbmVyLCBTY3JvbGxTdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFOSU1BVElPTl9NT0RVTEVfVFlQRSxcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ0NvbmZpZ30gZnJvbSAnLi9kaWFsb2ctY29uZmlnJztcbmltcG9ydCB7X01hdERpYWxvZ0NvbnRhaW5lckJhc2UsIE1hdERpYWxvZ0NvbnRhaW5lcn0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICcuL2RpYWxvZy1yZWYnO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RpYWxvZywgRGlhbG9nQ29uZmlnfSBmcm9tICdAYW5ndWxhci9jZGsvZGlhbG9nJztcbmltcG9ydCB7c3RhcnRXaXRofSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgdGhlIGRhdGEgdGhhdCB3YXMgcGFzc2VkIGluIHRvIGEgZGlhbG9nLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9ESUFMT0dfREFUQSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdNYXRNZGNEaWFsb2dEYXRhJyk7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGRlZmF1bHQgZGlhbG9nIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0RGlhbG9nQ29uZmlnPihcbiAgJ21hdC1tZGMtZGlhbG9nLWRlZmF1bHQtb3B0aW9ucycsXG4pO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkaWFsb2cgaXMgb3Blbi4gKi9cbmV4cG9ydCBjb25zdCBNQVRfRElBTE9HX1NDUk9MTF9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oXG4gICdtYXQtbWRjLWRpYWxvZy1zY3JvbGwtc3RyYXRlZ3knLFxuKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZKFxuICBvdmVybGF5OiBPdmVybGF5LFxuKTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUFUX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IE1BVF9ESUFMT0dfU0NST0xMX1NUUkFURUdZLFxuICBkZXBzOiBbT3ZlcmxheV0sXG4gIHVzZUZhY3Rvcnk6IE1BVF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUlksXG59O1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BVF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUlkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpO1xufVxuXG4vLyBDb3VudGVyIGZvciB1bmlxdWUgZGlhbG9nIGlkcy5cbmxldCB1bmlxdWVJZCA9IDA7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgZGlhbG9nIHNlcnZpY2VzLiBUaGUgYmFzZSBkaWFsb2cgc2VydmljZSBhbGxvd3NcbiAqIGZvciBhcmJpdHJhcnkgZGlhbG9nIHJlZnMgYW5kIGRpYWxvZyBjb250YWluZXIgY29tcG9uZW50cy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIF9NYXREaWFsb2dCYXNlPEMgZXh0ZW5kcyBfTWF0RGlhbG9nQ29udGFpbmVyQmFzZT4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IF9vcGVuRGlhbG9nc0F0VGhpc0xldmVsOiBNYXREaWFsb2dSZWY8YW55PltdID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgX2FmdGVyQWxsQ2xvc2VkQXRUaGlzTGV2ZWwgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hZnRlck9wZW5lZEF0VGhpc0xldmVsID0gbmV3IFN1YmplY3Q8TWF0RGlhbG9nUmVmPGFueT4+KCk7XG4gIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5OiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcbiAgcHJvdGVjdGVkIF9pZFByZWZpeCA9ICdtYXQtZGlhbG9nLSc7XG4gIHByaXZhdGUgX2RpYWxvZzogRGlhbG9nO1xuICBwcm90ZWN0ZWQgZGlhbG9nQ29uZmlnQ2xhc3MgPSBNYXREaWFsb2dDb25maWc7XG5cbiAgLyoqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50bHktb3BlbiBkaWFsb2dzLiAqL1xuICBnZXQgb3BlbkRpYWxvZ3MoKTogTWF0RGlhbG9nUmVmPGFueT5bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudERpYWxvZyA/IHRoaXMuX3BhcmVudERpYWxvZy5vcGVuRGlhbG9ncyA6IHRoaXMuX29wZW5EaWFsb2dzQXRUaGlzTGV2ZWw7XG4gIH1cblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhIGRpYWxvZyBoYXMgYmVlbiBvcGVuZWQuICovXG4gIGdldCBhZnRlck9wZW5lZCgpOiBTdWJqZWN0PE1hdERpYWxvZ1JlZjxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudERpYWxvZyA/IHRoaXMuX3BhcmVudERpYWxvZy5hZnRlck9wZW5lZCA6IHRoaXMuX2FmdGVyT3BlbmVkQXRUaGlzTGV2ZWw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRBZnRlckFsbENsb3NlZCgpOiBTdWJqZWN0PHZvaWQ+IHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLl9wYXJlbnREaWFsb2c7XG4gICAgcmV0dXJuIHBhcmVudCA/IHBhcmVudC5fZ2V0QWZ0ZXJBbGxDbG9zZWQoKSA6IHRoaXMuX2FmdGVyQWxsQ2xvc2VkQXRUaGlzTGV2ZWw7XG4gIH1cblxuICAvKipcbiAgICogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhbGwgb3BlbiBkaWFsb2cgaGF2ZSBmaW5pc2hlZCBjbG9zaW5nLlxuICAgKiBXaWxsIGVtaXQgb24gc3Vic2NyaWJlIGlmIHRoZXJlIGFyZSBubyBvcGVuIGRpYWxvZ3MgdG8gYmVnaW4gd2l0aC5cbiAgICovXG4gIHJlYWRvbmx5IGFmdGVyQWxsQ2xvc2VkOiBPYnNlcnZhYmxlPHZvaWQ+ID0gZGVmZXIoKCkgPT5cbiAgICB0aGlzLm9wZW5EaWFsb2dzLmxlbmd0aFxuICAgICAgPyB0aGlzLl9nZXRBZnRlckFsbENsb3NlZCgpXG4gICAgICA6IHRoaXMuX2dldEFmdGVyQWxsQ2xvc2VkKCkucGlwZShzdGFydFdpdGgodW5kZWZpbmVkKSksXG4gICkgYXMgT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBNYXREaWFsb2dDb25maWcgfCB1bmRlZmluZWQsXG4gICAgcHJpdmF0ZSBfcGFyZW50RGlhbG9nOiBfTWF0RGlhbG9nQmFzZTxDPiB8IHVuZGVmaW5lZCxcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBObyBsb25nZXIgdXNlZC4gVG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDE1LjAuMFxuICAgICAqL1xuICAgIF9vdmVybGF5Q29udGFpbmVyOiBPdmVybGF5Q29udGFpbmVyLFxuICAgIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgcHJpdmF0ZSBfZGlhbG9nUmVmQ29uc3RydWN0b3I6IFR5cGU8TWF0RGlhbG9nUmVmPGFueT4+LFxuICAgIHByaXZhdGUgX2RpYWxvZ0NvbnRhaW5lclR5cGU6IFR5cGU8Qz4sXG4gICAgcHJpdmF0ZSBfZGlhbG9nRGF0YVRva2VuOiBJbmplY3Rpb25Ub2tlbjxhbnk+LFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIE5vIGxvbmdlciB1c2VkLiBUbyBiZSByZW1vdmVkLlxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTQuMC4wXG4gICAgICovXG4gICAgX2FuaW1hdGlvbk1vZGU/OiAnTm9vcEFuaW1hdGlvbnMnIHwgJ0Jyb3dzZXJBbmltYXRpb25zJyxcbiAgKSB7XG4gICAgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kgPSBzY3JvbGxTdHJhdGVneTtcbiAgICB0aGlzLl9kaWFsb2cgPSBpbmplY3Rvci5nZXQoRGlhbG9nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhIG1vZGFsIGRpYWxvZyBjb250YWluaW5nIHRoZSBnaXZlbiBjb21wb25lbnQuXG4gICAqIEBwYXJhbSBjb21wb25lbnQgVHlwZSBvZiB0aGUgY29tcG9uZW50IHRvIGxvYWQgaW50byB0aGUgZGlhbG9nLlxuICAgKiBAcGFyYW0gY29uZmlnIEV4dHJhIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAgICogQHJldHVybnMgUmVmZXJlbmNlIHRvIHRoZSBuZXdseS1vcGVuZWQgZGlhbG9nLlxuICAgKi9cbiAgb3BlbjxULCBEID0gYW55LCBSID0gYW55PihcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8VD4sXG4gICAgY29uZmlnPzogTWF0RGlhbG9nQ29uZmlnPEQ+LFxuICApOiBNYXREaWFsb2dSZWY8VCwgUj47XG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgbW9kYWwgZGlhbG9nIGNvbnRhaW5pbmcgdGhlIGdpdmVuIHRlbXBsYXRlLlxuICAgKiBAcGFyYW0gdGVtcGxhdGUgVGVtcGxhdGVSZWYgdG8gaW5zdGFudGlhdGUgYXMgdGhlIGRpYWxvZyBjb250ZW50LlxuICAgKiBAcGFyYW0gY29uZmlnIEV4dHJhIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAgICogQHJldHVybnMgUmVmZXJlbmNlIHRvIHRoZSBuZXdseS1vcGVuZWQgZGlhbG9nLlxuICAgKi9cbiAgb3BlbjxULCBEID0gYW55LCBSID0gYW55PihcbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8VD4sXG4gICAgY29uZmlnPzogTWF0RGlhbG9nQ29uZmlnPEQ+LFxuICApOiBNYXREaWFsb2dSZWY8VCwgUj47XG5cbiAgb3BlbjxULCBEID0gYW55LCBSID0gYW55PihcbiAgICB0ZW1wbGF0ZTogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgIGNvbmZpZz86IE1hdERpYWxvZ0NvbmZpZzxEPixcbiAgKTogTWF0RGlhbG9nUmVmPFQsIFI+O1xuXG4gIG9wZW48VCwgRCA9IGFueSwgUiA9IGFueT4oXG4gICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgIGNvbmZpZz86IE1hdERpYWxvZ0NvbmZpZzxEPixcbiAgKTogTWF0RGlhbG9nUmVmPFQsIFI+IHtcbiAgICBsZXQgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VCwgUj47XG4gICAgY29uZmlnID0gey4uLih0aGlzLl9kZWZhdWx0T3B0aW9ucyB8fCBuZXcgTWF0RGlhbG9nQ29uZmlnKCkpLCAuLi5jb25maWd9O1xuICAgIGNvbmZpZy5pZCA9IGNvbmZpZy5pZCB8fCBgJHt0aGlzLl9pZFByZWZpeH0ke3VuaXF1ZUlkKyt9YDtcbiAgICBjb25maWcuc2Nyb2xsU3RyYXRlZ3kgPSBjb25maWcuc2Nyb2xsU3RyYXRlZ3kgfHwgdGhpcy5fc2Nyb2xsU3RyYXRlZ3koKTtcblxuICAgIGNvbnN0IGNka1JlZiA9IHRoaXMuX2RpYWxvZy5vcGVuPFIsIEQsIFQ+KGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIHtcbiAgICAgIC4uLmNvbmZpZyxcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKS5jZW50ZXJIb3Jpem9udGFsbHkoKS5jZW50ZXJWZXJ0aWNhbGx5KCksXG4gICAgICAvLyBEaXNhYmxlIGNsb3Npbmcgc2luY2Ugd2UgbmVlZCB0byBzeW5jIGl0IHVwIHRvIHRoZSBhbmltYXRpb24gb3Vyc2VsdmVzLlxuICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlLFxuICAgICAgLy8gRGlzYWJsZSBjbG9zaW5nIG9uIGRlc3Ryb3ksIGJlY2F1c2UgdGhpcyBzZXJ2aWNlIGNsZWFucyB1cCBpdHMgb3BlbiBkaWFsb2dzIGFzIHdlbGwuXG4gICAgICAvLyBXZSB3YW50IHRvIGRvIHRoZSBjbGVhbnVwIGhlcmUsIHJhdGhlciB0aGFuIHRoZSBDREsgc2VydmljZSwgYmVjYXVzZSB0aGUgQ0RLIGRlc3Ryb3lzXG4gICAgICAvLyB0aGUgZGlhbG9ncyBpbW1lZGlhdGVseSB3aGVyZWFzIHdlIHdhbnQgaXQgdG8gd2FpdCBmb3IgdGhlIGFuaW1hdGlvbnMgdG8gZmluaXNoLlxuICAgICAgY2xvc2VPbkRlc3Ryb3k6IGZhbHNlLFxuICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgIHR5cGU6IHRoaXMuX2RpYWxvZ0NvbnRhaW5lclR5cGUsXG4gICAgICAgIHByb3ZpZGVyczogKCkgPT4gW1xuICAgICAgICAgIC8vIFByb3ZpZGUgb3VyIGNvbmZpZyBhcyB0aGUgQ0RLIGNvbmZpZyBhcyB3ZWxsIHNpbmNlIGl0IGhhcyB0aGUgc2FtZSBpbnRlcmZhY2UgYXMgdGhlXG4gICAgICAgICAgLy8gQ0RLIG9uZSwgYnV0IGl0IGNvbnRhaW5zIHRoZSBhY3R1YWwgdmFsdWVzIHBhc3NlZCBpbiBieSB0aGUgdXNlciBmb3IgdGhpbmdzIGxpa2VcbiAgICAgICAgICAvLyBgZGlzYWJsZUNsb3NlYCB3aGljaCB3ZSBkaXNhYmxlIGZvciB0aGUgQ0RLIGRpYWxvZyBzaW5jZSB3ZSBoYW5kbGUgaXQgb3Vyc2VsdmVzLlxuICAgICAgICAgIHtwcm92aWRlOiB0aGlzLmRpYWxvZ0NvbmZpZ0NsYXNzLCB1c2VWYWx1ZTogY29uZmlnfSxcbiAgICAgICAgICB7cHJvdmlkZTogRGlhbG9nQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZUNvbnRleHQ6ICgpID0+ICh7ZGlhbG9nUmVmfSksXG4gICAgICBwcm92aWRlcnM6IChyZWYsIGNka0NvbmZpZywgZGlhbG9nQ29udGFpbmVyKSA9PiB7XG4gICAgICAgIGRpYWxvZ1JlZiA9IG5ldyB0aGlzLl9kaWFsb2dSZWZDb25zdHJ1Y3RvcihyZWYsIGNvbmZpZywgZGlhbG9nQ29udGFpbmVyKTtcbiAgICAgICAgZGlhbG9nUmVmLnVwZGF0ZVBvc2l0aW9uKGNvbmZpZz8ucG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHtwcm92aWRlOiB0aGlzLl9kaWFsb2dDb250YWluZXJUeXBlLCB1c2VWYWx1ZTogZGlhbG9nQ29udGFpbmVyfSxcbiAgICAgICAgICB7cHJvdmlkZTogdGhpcy5fZGlhbG9nRGF0YVRva2VuLCB1c2VWYWx1ZTogY2RrQ29uZmlnLmRhdGF9LFxuICAgICAgICAgIHtwcm92aWRlOiB0aGlzLl9kaWFsb2dSZWZDb25zdHJ1Y3RvciwgdXNlVmFsdWU6IGRpYWxvZ1JlZn0sXG4gICAgICAgIF07XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gVGhpcyBjYW4ndCBiZSBhc3NpZ25lZCBpbiB0aGUgYHByb3ZpZGVyc2AgY2FsbGJhY2ssIGJlY2F1c2VcbiAgICAvLyB0aGUgaW5zdGFuY2UgaGFzbid0IGJlZW4gYXNzaWduZWQgdG8gdGhlIENESyByZWYgeWV0LlxuICAgIGRpYWxvZ1JlZiEuY29tcG9uZW50SW5zdGFuY2UgPSBjZGtSZWYuY29tcG9uZW50SW5zdGFuY2UhO1xuXG4gICAgdGhpcy5vcGVuRGlhbG9ncy5wdXNoKGRpYWxvZ1JlZiEpO1xuICAgIHRoaXMuYWZ0ZXJPcGVuZWQubmV4dChkaWFsb2dSZWYhKTtcblxuICAgIGRpYWxvZ1JlZiEuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm9wZW5EaWFsb2dzLmluZGV4T2YoZGlhbG9nUmVmKTtcblxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9ncy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgIGlmICghdGhpcy5vcGVuRGlhbG9ncy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLl9nZXRBZnRlckFsbENsb3NlZCgpLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZiE7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGFsbCBvZiB0aGUgY3VycmVudGx5LW9wZW4gZGlhbG9ncy5cbiAgICovXG4gIGNsb3NlQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuX2Nsb3NlRGlhbG9ncyh0aGlzLm9wZW5EaWFsb2dzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbiBvcGVuIGRpYWxvZyBieSBpdHMgaWQuXG4gICAqIEBwYXJhbSBpZCBJRCB0byB1c2Ugd2hlbiBsb29raW5nIHVwIHRoZSBkaWFsb2cuXG4gICAqL1xuICBnZXREaWFsb2dCeUlkKGlkOiBzdHJpbmcpOiBNYXREaWFsb2dSZWY8YW55PiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMub3BlbkRpYWxvZ3MuZmluZChkaWFsb2cgPT4gZGlhbG9nLmlkID09PSBpZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvLyBPbmx5IGNsb3NlIHRoZSBkaWFsb2dzIGF0IHRoaXMgbGV2ZWwgb24gZGVzdHJveVxuICAgIC8vIHNpbmNlIHRoZSBwYXJlbnQgc2VydmljZSBtYXkgc3RpbGwgYmUgYWN0aXZlLlxuICAgIHRoaXMuX2Nsb3NlRGlhbG9ncyh0aGlzLl9vcGVuRGlhbG9nc0F0VGhpc0xldmVsKTtcbiAgICB0aGlzLl9hZnRlckFsbENsb3NlZEF0VGhpc0xldmVsLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fYWZ0ZXJPcGVuZWRBdFRoaXNMZXZlbC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2xvc2VEaWFsb2dzKGRpYWxvZ3M6IE1hdERpYWxvZ1JlZjxhbnk+W10pIHtcbiAgICBsZXQgaSA9IGRpYWxvZ3MubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgZGlhbG9nc1tpXS5jbG9zZSgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFNlcnZpY2UgdG8gb3BlbiBNYXRlcmlhbCBEZXNpZ24gbW9kYWwgZGlhbG9ncy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hdERpYWxvZyBleHRlbmRzIF9NYXREaWFsb2dCYXNlPE1hdERpYWxvZ0NvbnRhaW5lcj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBgX2xvY2F0aW9uYCBwYXJhbWV0ZXIgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDEwLjAuMFxuICAgICAqL1xuICAgIEBPcHRpb25hbCgpIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9ESUFMT0dfREVGQVVMVF9PUFRJT05TKSBkZWZhdWx0T3B0aW9uczogTWF0RGlhbG9nQ29uZmlnLFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50RGlhbG9nOiBNYXREaWFsb2csXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgTm8gbG9uZ2VyIHVzZWQuIFRvIGJlIHJlbW92ZWQuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSAxNS4wLjBcbiAgICAgKi9cbiAgICBvdmVybGF5Q29udGFpbmVyOiBPdmVybGF5Q29udGFpbmVyLFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIE5vIGxvbmdlciB1c2VkLiBUbyBiZSByZW1vdmVkLlxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTQuMC4wXG4gICAgICovXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSlcbiAgICBhbmltYXRpb25Nb2RlPzogJ05vb3BBbmltYXRpb25zJyB8ICdCcm93c2VyQW5pbWF0aW9ucycsXG4gICkge1xuICAgIHN1cGVyKFxuICAgICAgb3ZlcmxheSxcbiAgICAgIGluamVjdG9yLFxuICAgICAgZGVmYXVsdE9wdGlvbnMsXG4gICAgICBwYXJlbnREaWFsb2csXG4gICAgICBvdmVybGF5Q29udGFpbmVyLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICBNYXREaWFsb2dSZWYsXG4gICAgICBNYXREaWFsb2dDb250YWluZXIsXG4gICAgICBNQVRfRElBTE9HX0RBVEEsXG4gICAgICBhbmltYXRpb25Nb2RlLFxuICAgICk7XG5cbiAgICB0aGlzLl9pZFByZWZpeCA9ICdtYXQtbWRjLWRpYWxvZy0nO1xuICB9XG59XG4iXX0=