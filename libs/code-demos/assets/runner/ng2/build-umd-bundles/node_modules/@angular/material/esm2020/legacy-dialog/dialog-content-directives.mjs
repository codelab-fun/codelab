/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input, Optional, ElementRef, } from '@angular/core';
import { MatLegacyDialog } from './dialog';
import { MatLegacyDialogRef } from './dialog-ref';
import { _closeDialogVia } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "./dialog-ref";
import * as i2 from "./dialog";
/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;
/**
 * Button that will close the current dialog.
 * @deprecated Use `MatDialogClose` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyDialogClose {
    constructor(
    /**
     * Reference to the containing dialog.
     * @deprecated `dialogRef` property to become private.
     * @breaking-change 13.0.0
     */
    // The dialog title directive is always used in combination with a `MatDialogRef`.
    // tslint:disable-next-line: lightweight-tokens
    dialogRef, _elementRef, _dialog) {
        this.dialogRef = dialogRef;
        this._elementRef = _elementRef;
        this._dialog = _dialog;
        /** Default to "button" to prevents accidental form submits. */
        this.type = 'button';
    }
    ngOnInit() {
        if (!this.dialogRef) {
            // When this directive is included in a dialog via TemplateRef (rather than being
            // in a Component), the DialogRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the DialogRef by
            // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
            // be resolved at constructor time.
            this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
        }
    }
    ngOnChanges(changes) {
        const proxiedChange = changes['_matDialogClose'] || changes['_matDialogCloseResult'];
        if (proxiedChange) {
            this.dialogResult = proxiedChange.currentValue;
        }
    }
    _onButtonClick(event) {
        // Determinate the focus origin using the click event, because using the FocusMonitor will
        // result in incorrect origins. Most of the time, close buttons will be auto focused in the
        // dialog, and therefore clicking the button won't result in a focus change. This means that
        // the FocusMonitor won't detect any origin change, and will always output `program`.
        _closeDialogVia(this.dialogRef, event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse', this.dialogResult);
    }
}
MatLegacyDialogClose.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogClose, deps: [{ token: i1.MatLegacyDialogRef, optional: true }, { token: i0.ElementRef }, { token: i2.MatLegacyDialog }], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyDialogClose.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: { ariaLabel: ["aria-label", "ariaLabel"], type: "type", dialogResult: ["mat-dialog-close", "dialogResult"], _matDialogClose: ["matDialogClose", "_matDialogClose"] }, host: { listeners: { "click": "_onButtonClick($event)" }, properties: { "attr.aria-label": "ariaLabel || null", "attr.type": "type" } }, exportAs: ["matDialogClose"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogClose, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-dialog-close], [matDialogClose]',
                    exportAs: 'matDialogClose',
                    host: {
                        '(click)': '_onButtonClick($event)',
                        '[attr.aria-label]': 'ariaLabel || null',
                        '[attr.type]': 'type',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.MatLegacyDialogRef, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i2.MatLegacyDialog }]; }, propDecorators: { ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], type: [{
                type: Input
            }], dialogResult: [{
                type: Input,
                args: ['mat-dialog-close']
            }], _matDialogClose: [{
                type: Input,
                args: ['matDialogClose']
            }] } });
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 * @deprecated Use `MatDialogTitle` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyDialogTitle {
    constructor(
    // The dialog title directive is always used in combination with a `MatDialogRef`.
    // tslint:disable-next-line: lightweight-tokens
    _dialogRef, _elementRef, _dialog) {
        this._dialogRef = _dialogRef;
        this._elementRef = _elementRef;
        this._dialog = _dialog;
        /** Unique id for the dialog title. If none is supplied, it will be auto-generated. */
        this.id = `mat-dialog-title-${dialogElementUid++}`;
    }
    ngOnInit() {
        if (!this._dialogRef) {
            this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
        }
        if (this._dialogRef) {
            Promise.resolve().then(() => {
                const container = this._dialogRef._containerInstance;
                if (container && !container._ariaLabelledBy) {
                    container._ariaLabelledBy = this.id;
                }
            });
        }
    }
}
MatLegacyDialogTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogTitle, deps: [{ token: i1.MatLegacyDialogRef, optional: true }, { token: i0.ElementRef }, { token: i2.MatLegacyDialog }], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyDialogTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: { id: "id" }, host: { properties: { "id": "id" }, classAttribute: "mat-dialog-title" }, exportAs: ["matDialogTitle"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-dialog-title], [matDialogTitle]',
                    exportAs: 'matDialogTitle',
                    host: {
                        'class': 'mat-dialog-title',
                        '[id]': 'id',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.MatLegacyDialogRef, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i2.MatLegacyDialog }]; }, propDecorators: { id: [{
                type: Input
            }] } });
/**
 * Scrollable content container of a dialog.
 * @deprecated Use `MatDialogContent` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyDialogContent {
}
MatLegacyDialogContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogContent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyDialogContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]", host: { classAttribute: "mat-dialog-content" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogContent, decorators: [{
            type: Directive,
            args: [{
                    selector: `[mat-dialog-content], mat-dialog-content, [matDialogContent]`,
                    host: { 'class': 'mat-dialog-content' },
                }]
        }] });
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 * @deprecated Use `MatDialogActions` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyDialogActions {
    constructor() {
        /**
         * Horizontal alignment of action buttons.
         */
        this.align = 'start';
    }
}
MatLegacyDialogActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogActions, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyDialogActions.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: { align: "align" }, host: { properties: { "class.mat-dialog-actions-align-center": "align === \"center\"", "class.mat-dialog-actions-align-end": "align === \"end\"" }, classAttribute: "mat-dialog-actions" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogActions, decorators: [{
            type: Directive,
            args: [{
                    selector: `[mat-dialog-actions], mat-dialog-actions, [matDialogActions]`,
                    host: {
                        'class': 'mat-dialog-actions',
                        '[class.mat-dialog-actions-align-center]': 'align === "center"',
                        '[class.mat-dialog-actions-align-end]': 'align === "end"',
                    },
                }]
        }], propDecorators: { align: [{
                type: Input
            }] } });
// TODO(crisbeto): this utility shouldn't be necessary anymore, because the dialog ref is provided
// both to component and template dialogs through DI. We need to keep it around, because there are
// some internal wrappers around `MatDialog` that happened to work by accident, because we had this
// fallback logic in place.
/**
 * Finds the closest MatDialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(element, openDialogs) {
    let parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mat-dialog-container')) {
        parent = parent.parentElement;
    }
    return parent ? openDialogs.find(dialog => dialog.id === parent.id) : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQtZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktZGlhbG9nL2RpYWxvZy1jb250ZW50LWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUVSLFVBQVUsR0FDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFFekQsK0RBQStEO0FBQy9ELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBRXpCOzs7O0dBSUc7QUFVSCxNQUFNLE9BQU8sb0JBQW9CO0lBWS9CO0lBQ0U7Ozs7T0FJRztJQUNILGtGQUFrRjtJQUNsRiwrQ0FBK0M7SUFDNUIsU0FBa0MsRUFDN0MsV0FBb0MsRUFDcEMsT0FBd0I7UUFGYixjQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUM3QyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDcEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFsQmxDLCtEQUErRDtRQUN0RCxTQUFJLEdBQWtDLFFBQVEsQ0FBQztJQWtCckQsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixpRkFBaUY7WUFDakYsZ0ZBQWdGO1lBQ2hGLGdGQUFnRjtZQUNoRixvRkFBb0Y7WUFDcEYsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBRSxDQUFDO1NBQ2hGO0lB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QUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUM7aUJBQ3RDOztBQUdEOzs7OztHQUtHO0FBU0gsTUFBTSxPQUFPLHNCQUFzQjtJQVJuQztRQVNFOztXQUVHO1FBQ00sVUFBSyxHQUFnQyxPQUFPLENBQUM7S0FDdkQ7O3dIQUxZLHNCQUFzQjs0R0FBdEIsc0JBQXNCO2dHQUF0QixzQkFBc0I7a0JBUmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhEQUE4RDtvQkFDeEUsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxvQkFBb0I7d0JBQzdCLHlDQUF5QyxFQUFFLG9CQUFvQjt3QkFDL0Qsc0NBQXNDLEVBQUUsaUJBQWlCO3FCQUMxRDtpQkFDRjs4QkFLVSxLQUFLO3NCQUFiLEtBQUs7O0FBR1Isa0dBQWtHO0FBQ2xHLGtHQUFrRztBQUNsRyxtR0FBbUc7QUFDbkcsMkJBQTJCO0FBQzNCOzs7O0dBSUc7QUFDSCxTQUFTLGdCQUFnQixDQUN2QixPQUFnQyxFQUNoQyxXQUFzQztJQUV0QyxJQUFJLE1BQU0sR0FBdUIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFFckUsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ25FLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO0tBQy9CO0lBRUQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE1BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzlFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFbGVtZW50UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0TGVnYWN5RGlhbG9nfSBmcm9tICcuL2RpYWxvZyc7XG5pbXBvcnQge01hdExlZ2FjeURpYWxvZ1JlZn0gZnJvbSAnLi9kaWFsb2ctcmVmJztcbmltcG9ydCB7X2Nsb3NlRGlhbG9nVmlhfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG4vKiogQ291bnRlciB1c2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRHMgZm9yIGRpYWxvZyBlbGVtZW50cy4gKi9cbmxldCBkaWFsb2dFbGVtZW50VWlkID0gMDtcblxuLyoqXG4gKiBCdXR0b24gdGhhdCB3aWxsIGNsb3NlIHRoZSBjdXJyZW50IGRpYWxvZy5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0RGlhbG9nQ2xvc2VgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2RpYWxvZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWRpYWxvZy1jbG9zZV0sIFttYXREaWFsb2dDbG9zZV0nLFxuICBleHBvcnRBczogJ21hdERpYWxvZ0Nsb3NlJyxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ19vbkJ1dHRvbkNsaWNrKCRldmVudCknLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdhcmlhTGFiZWwgfHwgbnVsbCcsXG4gICAgJ1thdHRyLnR5cGVdJzogJ3R5cGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lEaWFsb2dDbG9zZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqIFNjcmVlbiByZWFkZXIgbGFiZWwgZm9yIHRoZSBidXR0b24uICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIC8qKiBEZWZhdWx0IHRvIFwiYnV0dG9uXCIgdG8gcHJldmVudHMgYWNjaWRlbnRhbCBmb3JtIHN1Ym1pdHMuICovXG4gIEBJbnB1dCgpIHR5cGU6ICdzdWJtaXQnIHwgJ2J1dHRvbicgfCAncmVzZXQnID0gJ2J1dHRvbic7XG5cbiAgLyoqIERpYWxvZyBjbG9zZSBpbnB1dC4gKi9cbiAgQElucHV0KCdtYXQtZGlhbG9nLWNsb3NlJykgZGlhbG9nUmVzdWx0OiBhbnk7XG5cbiAgQElucHV0KCdtYXREaWFsb2dDbG9zZScpIF9tYXREaWFsb2dDbG9zZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byB0aGUgY29udGFpbmluZyBkaWFsb2cuXG4gICAgICogQGRlcHJlY2F0ZWQgYGRpYWxvZ1JlZmAgcHJvcGVydHkgdG8gYmVjb21lIHByaXZhdGUuXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjBcbiAgICAgKi9cbiAgICAvLyBUaGUgZGlhbG9nIHRpdGxlIGRpcmVjdGl2ZSBpcyBhbHdheXMgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGEgYE1hdERpYWxvZ1JlZmAuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBsaWdodHdlaWdodC10b2tlbnNcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgZGlhbG9nUmVmOiBNYXRMZWdhY3lEaWFsb2dSZWY8YW55PixcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9kaWFsb2c6IE1hdExlZ2FjeURpYWxvZyxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5kaWFsb2dSZWYpIHtcbiAgICAgIC8vIFdoZW4gdGhpcyBkaXJlY3RpdmUgaXMgaW5jbHVkZWQgaW4gYSBkaWFsb2cgdmlhIFRlbXBsYXRlUmVmIChyYXRoZXIgdGhhbiBiZWluZ1xuICAgICAgLy8gaW4gYSBDb21wb25lbnQpLCB0aGUgRGlhbG9nUmVmIGlzbid0IGF2YWlsYWJsZSB2aWEgaW5qZWN0aW9uIGJlY2F1c2UgZW1iZWRkZWRcbiAgICAgIC8vIHZpZXdzIGNhbm5vdCBiZSBnaXZlbiBhIGN1c3RvbSBpbmplY3Rvci4gSW5zdGVhZCwgd2UgbG9vayB1cCB0aGUgRGlhbG9nUmVmIGJ5XG4gICAgICAvLyBJRC4gVGhpcyBtdXN0IG9jY3VyIGluIGBvbkluaXRgLCBhcyB0aGUgSUQgYmluZGluZyBmb3IgdGhlIGRpYWxvZyBjb250YWluZXIgd29uJ3RcbiAgICAgIC8vIGJlIHJlc29sdmVkIGF0IGNvbnN0cnVjdG9yIHRpbWUuXG4gICAgICB0aGlzLmRpYWxvZ1JlZiA9IGdldENsb3Nlc3REaWFsb2codGhpcy5fZWxlbWVudFJlZiwgdGhpcy5fZGlhbG9nLm9wZW5EaWFsb2dzKSE7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHByb3hpZWRDaGFuZ2UgPSBjaGFuZ2VzWydfbWF0RGlhbG9nQ2xvc2UnXSB8fCBjaGFuZ2VzWydfbWF0RGlhbG9nQ2xvc2VSZXN1bHQnXTtcblxuICAgIGlmIChwcm94aWVkQ2hhbmdlKSB7XG4gICAgICB0aGlzLmRpYWxvZ1Jlc3VsdCA9IHByb3hpZWRDaGFuZ2UuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIF9vbkJ1dHRvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgLy8gRGV0ZXJtaW5hdGUgdGhlIGZvY3VzIG9yaWdpbiB1c2luZyB0aGUgY2xpY2sgZXZlbnQsIGJlY2F1c2UgdXNpbmcgdGhlIEZvY3VzTW9uaXRvciB3aWxsXG4gICAgLy8gcmVzdWx0IGluIGluY29ycmVjdCBvcmlnaW5zLiBNb3N0IG9mIHRoZSB0aW1lLCBjbG9zZSBidXR0b25zIHdpbGwgYmUgYXV0byBmb2N1c2VkIGluIHRoZVxuICAgIC8vIGRpYWxvZywgYW5kIHRoZXJlZm9yZSBjbGlja2luZyB0aGUgYnV0dG9uIHdvbid0IHJlc3VsdCBpbiBhIGZvY3VzIGNoYW5nZS4gVGhpcyBtZWFucyB0aGF0XG4gICAgLy8gdGhlIEZvY3VzTW9uaXRvciB3b24ndCBkZXRlY3QgYW55IG9yaWdpbiBjaGFuZ2UsIGFuZCB3aWxsIGFsd2F5cyBvdXRwdXQgYHByb2dyYW1gLlxuICAgIF9jbG9zZURpYWxvZ1ZpYShcbiAgICAgIHRoaXMuZGlhbG9nUmVmLFxuICAgICAgZXZlbnQuc2NyZWVuWCA9PT0gMCAmJiBldmVudC5zY3JlZW5ZID09PSAwID8gJ2tleWJvYXJkJyA6ICdtb3VzZScsXG4gICAgICB0aGlzLmRpYWxvZ1Jlc3VsdCxcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogVGl0bGUgb2YgYSBkaWFsb2cgZWxlbWVudC4gU3RheXMgZml4ZWQgdG8gdGhlIHRvcCBvZiB0aGUgZGlhbG9nIHdoZW4gc2Nyb2xsaW5nLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXREaWFsb2dUaXRsZWAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtZGlhbG9nLXRpdGxlXSwgW21hdERpYWxvZ1RpdGxlXScsXG4gIGV4cG9ydEFzOiAnbWF0RGlhbG9nVGl0bGUnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1kaWFsb2ctdGl0bGUnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5RGlhbG9nVGl0bGUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogVW5pcXVlIGlkIGZvciB0aGUgZGlhbG9nIHRpdGxlLiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1hdC1kaWFsb2ctdGl0bGUtJHtkaWFsb2dFbGVtZW50VWlkKyt9YDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyBUaGUgZGlhbG9nIHRpdGxlIGRpcmVjdGl2ZSBpcyBhbHdheXMgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGEgYE1hdERpYWxvZ1JlZmAuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBsaWdodHdlaWdodC10b2tlbnNcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaWFsb2dSZWY6IE1hdExlZ2FjeURpYWxvZ1JlZjxhbnk+LFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX2RpYWxvZzogTWF0TGVnYWN5RGlhbG9nLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLl9kaWFsb2dSZWYpIHtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZiA9IGdldENsb3Nlc3REaWFsb2codGhpcy5fZWxlbWVudFJlZiwgdGhpcy5fZGlhbG9nLm9wZW5EaWFsb2dzKSE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RpYWxvZ1JlZikge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2RpYWxvZ1JlZi5fY29udGFpbmVySW5zdGFuY2U7XG5cbiAgICAgICAgaWYgKGNvbnRhaW5lciAmJiAhY29udGFpbmVyLl9hcmlhTGFiZWxsZWRCeSkge1xuICAgICAgICAgIGNvbnRhaW5lci5fYXJpYUxhYmVsbGVkQnkgPSB0aGlzLmlkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTY3JvbGxhYmxlIGNvbnRlbnQgY29udGFpbmVyIG9mIGEgZGlhbG9nLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXREaWFsb2dDb250ZW50YCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2dgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgW21hdC1kaWFsb2ctY29udGVudF0sIG1hdC1kaWFsb2ctY29udGVudCwgW21hdERpYWxvZ0NvbnRlbnRdYCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtZGlhbG9nLWNvbnRlbnQnfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5RGlhbG9nQ29udGVudCB7fVxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgdGhlIGJvdHRvbSBhY3Rpb24gYnV0dG9ucyBpbiBhIGRpYWxvZy5cbiAqIFN0YXlzIGZpeGVkIHRvIHRoZSBib3R0b20gd2hlbiBzY3JvbGxpbmcuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdERpYWxvZ0FjdGlvbnNgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2RpYWxvZ2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBbbWF0LWRpYWxvZy1hY3Rpb25zXSwgbWF0LWRpYWxvZy1hY3Rpb25zLCBbbWF0RGlhbG9nQWN0aW9uc11gLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1kaWFsb2ctYWN0aW9ucycsXG4gICAgJ1tjbGFzcy5tYXQtZGlhbG9nLWFjdGlvbnMtYWxpZ24tY2VudGVyXSc6ICdhbGlnbiA9PT0gXCJjZW50ZXJcIicsXG4gICAgJ1tjbGFzcy5tYXQtZGlhbG9nLWFjdGlvbnMtYWxpZ24tZW5kXSc6ICdhbGlnbiA9PT0gXCJlbmRcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeURpYWxvZ0FjdGlvbnMge1xuICAvKipcbiAgICogSG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgYWN0aW9uIGJ1dHRvbnMuXG4gICAqL1xuICBASW5wdXQoKSBhbGlnbj86ICdzdGFydCcgfCAnY2VudGVyJyB8ICdlbmQnID0gJ3N0YXJ0Jztcbn1cblxuLy8gVE9ETyhjcmlzYmV0byk6IHRoaXMgdXRpbGl0eSBzaG91bGRuJ3QgYmUgbmVjZXNzYXJ5IGFueW1vcmUsIGJlY2F1c2UgdGhlIGRpYWxvZyByZWYgaXMgcHJvdmlkZWRcbi8vIGJvdGggdG8gY29tcG9uZW50IGFuZCB0ZW1wbGF0ZSBkaWFsb2dzIHRocm91Z2ggREkuIFdlIG5lZWQgdG8ga2VlcCBpdCBhcm91bmQsIGJlY2F1c2UgdGhlcmUgYXJlXG4vLyBzb21lIGludGVybmFsIHdyYXBwZXJzIGFyb3VuZCBgTWF0RGlhbG9nYCB0aGF0IGhhcHBlbmVkIHRvIHdvcmsgYnkgYWNjaWRlbnQsIGJlY2F1c2Ugd2UgaGFkIHRoaXNcbi8vIGZhbGxiYWNrIGxvZ2ljIGluIHBsYWNlLlxuLyoqXG4gKiBGaW5kcyB0aGUgY2xvc2VzdCBNYXREaWFsb2dSZWYgdG8gYW4gZWxlbWVudCBieSBsb29raW5nIGF0IHRoZSBET00uXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHJlbGF0aXZlIHRvIHdoaWNoIHRvIGxvb2sgZm9yIGEgZGlhbG9nLlxuICogQHBhcmFtIG9wZW5EaWFsb2dzIFJlZmVyZW5jZXMgdG8gdGhlIGN1cnJlbnRseS1vcGVuIGRpYWxvZ3MuXG4gKi9cbmZ1bmN0aW9uIGdldENsb3Nlc3REaWFsb2coXG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICBvcGVuRGlhbG9nczogTWF0TGVnYWN5RGlhbG9nUmVmPGFueT5bXSxcbikge1xuICBsZXQgcGFyZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICB3aGlsZSAocGFyZW50ICYmICFwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYXQtZGlhbG9nLWNvbnRhaW5lcicpKSB7XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gcGFyZW50ID8gb3BlbkRpYWxvZ3MuZmluZChkaWFsb2cgPT4gZGlhbG9nLmlkID09PSBwYXJlbnQhLmlkKSA6IG51bGw7XG59XG4iXX0=