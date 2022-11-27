/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Input, Optional, } from '@angular/core';
import { MatDialog } from './dialog';
import { _closeDialogVia, MatDialogRef } from './dialog-ref';
import * as i0 from "@angular/core";
import * as i1 from "./dialog-ref";
import * as i2 from "./dialog";
/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;
/**
 * Button that will close the current dialog.
 */
export class MatDialogClose {
    constructor(
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
MatDialogClose.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogClose, deps: [{ token: i1.MatDialogRef, optional: true }, { token: i0.ElementRef }, { token: i2.MatDialog }], target: i0.ɵɵFactoryTarget.Directive });
MatDialogClose.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: { ariaLabel: ["aria-label", "ariaLabel"], type: "type", dialogResult: ["mat-dialog-close", "dialogResult"], _matDialogClose: ["matDialogClose", "_matDialogClose"] }, host: { listeners: { "click": "_onButtonClick($event)" }, properties: { "attr.aria-label": "ariaLabel || null", "attr.type": "type" } }, exportAs: ["matDialogClose"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogClose, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i2.MatDialog }]; }, propDecorators: { ariaLabel: [{
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
 */
export class MatDialogTitle {
    constructor(
    // The dialog title directive is always used in combination with a `MatDialogRef`.
    // tslint:disable-next-line: lightweight-tokens
    _dialogRef, _elementRef, _dialog) {
        this._dialogRef = _dialogRef;
        this._elementRef = _elementRef;
        this._dialog = _dialog;
        this.id = `mat-mdc-dialog-title-${dialogElementUid++}`;
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
MatDialogTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogTitle, deps: [{ token: i1.MatDialogRef, optional: true }, { token: i0.ElementRef }, { token: i2.MatDialog }], target: i0.ɵɵFactoryTarget.Directive });
MatDialogTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: { id: "id" }, host: { properties: { "id": "id" }, classAttribute: "mat-mdc-dialog-title mdc-dialog__title" }, exportAs: ["matDialogTitle"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-dialog-title], [matDialogTitle]',
                    exportAs: 'matDialogTitle',
                    host: {
                        'class': 'mat-mdc-dialog-title mdc-dialog__title',
                        '[id]': 'id',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i2.MatDialog }]; }, propDecorators: { id: [{
                type: Input
            }] } });
/**
 * Scrollable content container of a dialog.
 */
export class MatDialogContent {
}
MatDialogContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogContent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatDialogContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]", host: { classAttribute: "mat-mdc-dialog-content mdc-dialog__content" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogContent, decorators: [{
            type: Directive,
            args: [{
                    selector: `[mat-dialog-content], mat-dialog-content, [matDialogContent]`,
                    host: { 'class': 'mat-mdc-dialog-content mdc-dialog__content' },
                }]
        }] });
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
export class MatDialogActions {
    constructor() {
        /**
         * Horizontal alignment of action buttons.
         */
        this.align = 'start';
    }
}
MatDialogActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogActions, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatDialogActions.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: { align: "align" }, host: { properties: { "class.mat-mdc-dialog-actions-align-center": "align === \"center\"", "class.mat-mdc-dialog-actions-align-end": "align === \"end\"" }, classAttribute: "mat-mdc-dialog-actions mdc-dialog__actions" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogActions, decorators: [{
            type: Directive,
            args: [{
                    selector: `[mat-dialog-actions], mat-dialog-actions, [matDialogActions]`,
                    host: {
                        'class': 'mat-mdc-dialog-actions mdc-dialog__actions',
                        '[class.mat-mdc-dialog-actions-align-center]': 'align === "center"',
                        '[class.mat-mdc-dialog-actions-align-end]': 'align === "end"',
                    },
                }]
        }], propDecorators: { align: [{
                type: Input
            }] } });
/**
 * Finds the closest MatDialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(element, openDialogs) {
    let parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mat-mdc-dialog-container')) {
        parent = parent.parentElement;
    }
    return parent ? openDialogs.find(dialog => dialog.id === parent.id) : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQtZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9kaWFsb2cvZGlhbG9nLWNvbnRlbnQtZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDbkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7QUFFM0QsK0RBQStEO0FBQy9ELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBRXpCOztHQUVHO0FBVUgsTUFBTSxPQUFPLGNBQWM7SUFZekI7SUFDRSxrRkFBa0Y7SUFDbEYsK0NBQStDO0lBQzVCLFNBQTRCLEVBQ3ZDLFdBQW9DLEVBQ3BDLE9BQWtCO1FBRlAsY0FBUyxHQUFULFNBQVMsQ0FBbUI7UUFDdkMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQ3BDLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFiNUIsK0RBQStEO1FBQ3RELFNBQUksR0FBa0MsUUFBUSxDQUFDO0lBYXJELENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsaUZBQWlGO1lBQ2pGLGdGQUFnRjtZQUNoRixnRkFBZ0Y7WUFDaEYsb0ZBQW9GO1lBQ3BGLG1DQUFtQztZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUUsQ0FBQztTQUNoRjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGlC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LFVBQUssR0FBZ0MsT0FBTyxDQUFDO0tBQ3ZEOztrSEFMWSxnQkFBZ0I7c0dBQWhCLGdCQUFnQjtnR0FBaEIsZ0JBQWdCO2tCQVI1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4REFBOEQ7b0JBQ3hFLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsNENBQTRDO3dCQUNyRCw2Q0FBNkMsRUFBRSxvQkFBb0I7d0JBQ25FLDBDQUEwQyxFQUFFLGlCQUFpQjtxQkFDOUQ7aUJBQ0Y7OEJBS1UsS0FBSztzQkFBYixLQUFLOztBQUdSOzs7O0dBSUc7QUFDSCxTQUFTLGdCQUFnQixDQUFDLE9BQWdDLEVBQUUsV0FBZ0M7SUFDMUYsSUFBSSxNQUFNLEdBQXVCLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0lBRXJFLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsRUFBRTtRQUN2RSxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztLQUMvQjtJQUVELE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxNQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUM5RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TWF0RGlhbG9nfSBmcm9tICcuL2RpYWxvZyc7XG5pbXBvcnQge19jbG9zZURpYWxvZ1ZpYSwgTWF0RGlhbG9nUmVmfSBmcm9tICcuL2RpYWxvZy1yZWYnO1xuXG4vKiogQ291bnRlciB1c2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRHMgZm9yIGRpYWxvZyBlbGVtZW50cy4gKi9cbmxldCBkaWFsb2dFbGVtZW50VWlkID0gMDtcblxuLyoqXG4gKiBCdXR0b24gdGhhdCB3aWxsIGNsb3NlIHRoZSBjdXJyZW50IGRpYWxvZy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1kaWFsb2ctY2xvc2VdLCBbbWF0RGlhbG9nQ2xvc2VdJyxcbiAgZXhwb3J0QXM6ICdtYXREaWFsb2dDbG9zZScsXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdfb25CdXR0b25DbGljaygkZXZlbnQpJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnYXJpYUxhYmVsIHx8IG51bGwnLFxuICAgICdbYXR0ci50eXBlXSc6ICd0eXBlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGlhbG9nQ2xvc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8qKiBTY3JlZW4tcmVhZGVyIGxhYmVsIGZvciB0aGUgYnV0dG9uLiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAvKiogRGVmYXVsdCB0byBcImJ1dHRvblwiIHRvIHByZXZlbnRzIGFjY2lkZW50YWwgZm9ybSBzdWJtaXRzLiAqL1xuICBASW5wdXQoKSB0eXBlOiAnc3VibWl0JyB8ICdidXR0b24nIHwgJ3Jlc2V0JyA9ICdidXR0b24nO1xuXG4gIC8qKiBEaWFsb2cgY2xvc2UgaW5wdXQuICovXG4gIEBJbnB1dCgnbWF0LWRpYWxvZy1jbG9zZScpIGRpYWxvZ1Jlc3VsdDogYW55O1xuXG4gIEBJbnB1dCgnbWF0RGlhbG9nQ2xvc2UnKSBfbWF0RGlhbG9nQ2xvc2U6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyBUaGUgZGlhbG9nIHRpdGxlIGRpcmVjdGl2ZSBpcyBhbHdheXMgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGEgYE1hdERpYWxvZ1JlZmAuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBsaWdodHdlaWdodC10b2tlbnNcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8YW55PixcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5kaWFsb2dSZWYpIHtcbiAgICAgIC8vIFdoZW4gdGhpcyBkaXJlY3RpdmUgaXMgaW5jbHVkZWQgaW4gYSBkaWFsb2cgdmlhIFRlbXBsYXRlUmVmIChyYXRoZXIgdGhhbiBiZWluZ1xuICAgICAgLy8gaW4gYSBDb21wb25lbnQpLCB0aGUgRGlhbG9nUmVmIGlzbid0IGF2YWlsYWJsZSB2aWEgaW5qZWN0aW9uIGJlY2F1c2UgZW1iZWRkZWRcbiAgICAgIC8vIHZpZXdzIGNhbm5vdCBiZSBnaXZlbiBhIGN1c3RvbSBpbmplY3Rvci4gSW5zdGVhZCwgd2UgbG9vayB1cCB0aGUgRGlhbG9nUmVmIGJ5XG4gICAgICAvLyBJRC4gVGhpcyBtdXN0IG9jY3VyIGluIGBvbkluaXRgLCBhcyB0aGUgSUQgYmluZGluZyBmb3IgdGhlIGRpYWxvZyBjb250YWluZXIgd29uJ3RcbiAgICAgIC8vIGJlIHJlc29sdmVkIGF0IGNvbnN0cnVjdG9yIHRpbWUuXG4gICAgICB0aGlzLmRpYWxvZ1JlZiA9IGdldENsb3Nlc3REaWFsb2codGhpcy5fZWxlbWVudFJlZiwgdGhpcy5fZGlhbG9nLm9wZW5EaWFsb2dzKSE7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHByb3hpZWRDaGFuZ2UgPSBjaGFuZ2VzWydfbWF0RGlhbG9nQ2xvc2UnXSB8fCBjaGFuZ2VzWydfbWF0RGlhbG9nQ2xvc2VSZXN1bHQnXTtcblxuICAgIGlmIChwcm94aWVkQ2hhbmdlKSB7XG4gICAgICB0aGlzLmRpYWxvZ1Jlc3VsdCA9IHByb3hpZWRDaGFuZ2UuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIF9vbkJ1dHRvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgLy8gRGV0ZXJtaW5hdGUgdGhlIGZvY3VzIG9yaWdpbiB1c2luZyB0aGUgY2xpY2sgZXZlbnQsIGJlY2F1c2UgdXNpbmcgdGhlIEZvY3VzTW9uaXRvciB3aWxsXG4gICAgLy8gcmVzdWx0IGluIGluY29ycmVjdCBvcmlnaW5zLiBNb3N0IG9mIHRoZSB0aW1lLCBjbG9zZSBidXR0b25zIHdpbGwgYmUgYXV0byBmb2N1c2VkIGluIHRoZVxuICAgIC8vIGRpYWxvZywgYW5kIHRoZXJlZm9yZSBjbGlja2luZyB0aGUgYnV0dG9uIHdvbid0IHJlc3VsdCBpbiBhIGZvY3VzIGNoYW5nZS4gVGhpcyBtZWFucyB0aGF0XG4gICAgLy8gdGhlIEZvY3VzTW9uaXRvciB3b24ndCBkZXRlY3QgYW55IG9yaWdpbiBjaGFuZ2UsIGFuZCB3aWxsIGFsd2F5cyBvdXRwdXQgYHByb2dyYW1gLlxuICAgIF9jbG9zZURpYWxvZ1ZpYShcbiAgICAgIHRoaXMuZGlhbG9nUmVmLFxuICAgICAgZXZlbnQuc2NyZWVuWCA9PT0gMCAmJiBldmVudC5zY3JlZW5ZID09PSAwID8gJ2tleWJvYXJkJyA6ICdtb3VzZScsXG4gICAgICB0aGlzLmRpYWxvZ1Jlc3VsdCxcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogVGl0bGUgb2YgYSBkaWFsb2cgZWxlbWVudC4gU3RheXMgZml4ZWQgdG8gdGhlIHRvcCBvZiB0aGUgZGlhbG9nIHdoZW4gc2Nyb2xsaW5nLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWRpYWxvZy10aXRsZV0sIFttYXREaWFsb2dUaXRsZV0nLFxuICBleHBvcnRBczogJ21hdERpYWxvZ1RpdGxlJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWRpYWxvZy10aXRsZSBtZGMtZGlhbG9nX190aXRsZScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXREaWFsb2dUaXRsZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWF0LW1kYy1kaWFsb2ctdGl0bGUtJHtkaWFsb2dFbGVtZW50VWlkKyt9YDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyBUaGUgZGlhbG9nIHRpdGxlIGRpcmVjdGl2ZSBpcyBhbHdheXMgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGEgYE1hdERpYWxvZ1JlZmAuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBsaWdodHdlaWdodC10b2tlbnNcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxhbnk+LFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLl9kaWFsb2dSZWYpIHtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZiA9IGdldENsb3Nlc3REaWFsb2codGhpcy5fZWxlbWVudFJlZiwgdGhpcy5fZGlhbG9nLm9wZW5EaWFsb2dzKSE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RpYWxvZ1JlZikge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2RpYWxvZ1JlZi5fY29udGFpbmVySW5zdGFuY2U7XG5cbiAgICAgICAgaWYgKGNvbnRhaW5lciAmJiAhY29udGFpbmVyLl9hcmlhTGFiZWxsZWRCeSkge1xuICAgICAgICAgIGNvbnRhaW5lci5fYXJpYUxhYmVsbGVkQnkgPSB0aGlzLmlkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTY3JvbGxhYmxlIGNvbnRlbnQgY29udGFpbmVyIG9mIGEgZGlhbG9nLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBbbWF0LWRpYWxvZy1jb250ZW50XSwgbWF0LWRpYWxvZy1jb250ZW50LCBbbWF0RGlhbG9nQ29udGVudF1gLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtZGlhbG9nLWNvbnRlbnQgbWRjLWRpYWxvZ19fY29udGVudCd9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXREaWFsb2dDb250ZW50IHt9XG5cbi8qKlxuICogQ29udGFpbmVyIGZvciB0aGUgYm90dG9tIGFjdGlvbiBidXR0b25zIGluIGEgZGlhbG9nLlxuICogU3RheXMgZml4ZWQgdG8gdGhlIGJvdHRvbSB3aGVuIHNjcm9sbGluZy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgW21hdC1kaWFsb2ctYWN0aW9uc10sIG1hdC1kaWFsb2ctYWN0aW9ucywgW21hdERpYWxvZ0FjdGlvbnNdYCxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWRpYWxvZy1hY3Rpb25zIG1kYy1kaWFsb2dfX2FjdGlvbnMnLFxuICAgICdbY2xhc3MubWF0LW1kYy1kaWFsb2ctYWN0aW9ucy1hbGlnbi1jZW50ZXJdJzogJ2FsaWduID09PSBcImNlbnRlclwiJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtZGlhbG9nLWFjdGlvbnMtYWxpZ24tZW5kXSc6ICdhbGlnbiA9PT0gXCJlbmRcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdERpYWxvZ0FjdGlvbnMge1xuICAvKipcbiAgICogSG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgYWN0aW9uIGJ1dHRvbnMuXG4gICAqL1xuICBASW5wdXQoKSBhbGlnbj86ICdzdGFydCcgfCAnY2VudGVyJyB8ICdlbmQnID0gJ3N0YXJ0Jztcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgY2xvc2VzdCBNYXREaWFsb2dSZWYgdG8gYW4gZWxlbWVudCBieSBsb29raW5nIGF0IHRoZSBET00uXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHJlbGF0aXZlIHRvIHdoaWNoIHRvIGxvb2sgZm9yIGEgZGlhbG9nLlxuICogQHBhcmFtIG9wZW5EaWFsb2dzIFJlZmVyZW5jZXMgdG8gdGhlIGN1cnJlbnRseS1vcGVuIGRpYWxvZ3MuXG4gKi9cbmZ1bmN0aW9uIGdldENsb3Nlc3REaWFsb2coZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIG9wZW5EaWFsb2dzOiBNYXREaWFsb2dSZWY8YW55PltdKSB7XG4gIGxldCBwYXJlbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gIHdoaWxlIChwYXJlbnQgJiYgIXBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21hdC1tZGMtZGlhbG9nLWNvbnRhaW5lcicpKSB7XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gcGFyZW50ID8gb3BlbkRpYWxvZ3MuZmluZChkaWFsb2cgPT4gZGlhbG9nLmlkID09PSBwYXJlbnQhLmlkKSA6IG51bGw7XG59XG4iXX0=