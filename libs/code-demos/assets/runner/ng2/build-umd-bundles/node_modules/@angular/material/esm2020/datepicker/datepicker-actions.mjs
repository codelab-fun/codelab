/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Directive, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatDatepickerBase } from './datepicker-base';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-base";
/** Button that will close the datepicker and assign the current selection to the data model. */
export class MatDatepickerApply {
    constructor(_datepicker) {
        this._datepicker = _datepicker;
    }
    _applySelection() {
        this._datepicker._applyPendingSelection();
        this._datepicker.close();
    }
}
MatDatepickerApply.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerApply, deps: [{ token: i1.MatDatepickerBase }], target: i0.ɵɵFactoryTarget.Directive });
MatDatepickerApply.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDatepickerApply, selector: "[matDatepickerApply], [matDateRangePickerApply]", host: { listeners: { "click": "_applySelection()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerApply, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matDatepickerApply], [matDateRangePickerApply]',
                    host: { '(click)': '_applySelection()' },
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerBase }]; } });
/** Button that will close the datepicker and discard the current selection. */
export class MatDatepickerCancel {
    constructor(_datepicker) {
        this._datepicker = _datepicker;
    }
}
MatDatepickerCancel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerCancel, deps: [{ token: i1.MatDatepickerBase }], target: i0.ɵɵFactoryTarget.Directive });
MatDatepickerCancel.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDatepickerCancel, selector: "[matDatepickerCancel], [matDateRangePickerCancel]", host: { listeners: { "click": "_datepicker.close()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerCancel, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matDatepickerCancel], [matDateRangePickerCancel]',
                    host: { '(click)': '_datepicker.close()' },
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerBase }]; } });
/**
 * Container that can be used to project a row of action buttons
 * to the bottom of a datepicker or date range picker.
 */
export class MatDatepickerActions {
    constructor(_datepicker, _viewContainerRef) {
        this._datepicker = _datepicker;
        this._viewContainerRef = _viewContainerRef;
    }
    ngAfterViewInit() {
        this._portal = new TemplatePortal(this._template, this._viewContainerRef);
        this._datepicker.registerActions(this._portal);
    }
    ngOnDestroy() {
        this._datepicker.removeActions(this._portal);
        // Needs to be null checked since we initialize it in `ngAfterViewInit`.
        if (this._portal && this._portal.isAttached) {
            this._portal?.detach();
        }
    }
}
MatDatepickerActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerActions, deps: [{ token: i1.MatDatepickerBase }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
MatDatepickerActions.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDatepickerActions, selector: "mat-datepicker-actions, mat-date-range-picker-actions", viewQueries: [{ propertyName: "_template", first: true, predicate: TemplateRef, descendants: true }], ngImport: i0, template: `
    <ng-template>
      <div class="mat-datepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, isInline: true, styles: [".mat-datepicker-actions{display:flex;justify-content:flex-end;align-items:center;padding:0 8px 8px 8px}.mat-datepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-datepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerActions, decorators: [{
            type: Component,
            args: [{ selector: 'mat-datepicker-actions, mat-date-range-picker-actions', template: `
    <ng-template>
      <div class="mat-datepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".mat-datepicker-actions{display:flex;justify-content:flex-end;align-items:center;padding:0 8px 8px 8px}.mat-datepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-datepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerBase }, { type: i0.ViewContainerRef }]; }, propDecorators: { _template: [{
                type: ViewChild,
                args: [TemplateRef]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBRTFFLGdHQUFnRztBQUtoRyxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLFdBQWtFO1FBQWxFLGdCQUFXLEdBQVgsV0FBVyxDQUF1RDtJQUFHLENBQUM7SUFFMUYsZUFBZTtRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7O29IQU5VLGtCQUFrQjt3R0FBbEIsa0JBQWtCO2dHQUFsQixrQkFBa0I7a0JBSjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlEQUFpRDtvQkFDM0QsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLG1CQUFtQixFQUFDO2lCQUN2Qzs7QUFVRCwrRUFBK0U7QUFLL0UsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFtQixXQUFrRTtRQUFsRSxnQkFBVyxHQUFYLFdBQVcsQ0FBdUQ7SUFBRyxDQUFDOztxSEFEOUUsbUJBQW1CO3lHQUFuQixtQkFBbUI7Z0dBQW5CLG1CQUFtQjtrQkFKL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbURBQW1EO29CQUM3RCxJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUM7aUJBQ3pDOztBQUtEOzs7R0FHRztBQWNILE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsWUFDVSxXQUFrRSxFQUNsRSxpQkFBbUM7UUFEbkMsZ0JBQVcsR0FBWCxXQUFXLENBQXVEO1FBQ2xFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFDMUMsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdDLHdFQUF3RTtRQUN4RSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7O3NIQXJCVSxvQkFBb0I7MEdBQXBCLG9CQUFvQix3SUFDcEIsV0FBVyxnREFYWjs7Ozs7O0dBTVQ7Z0dBSVUsb0JBQW9CO2tCQWJoQyxTQUFTOytCQUNFLHVEQUF1RCxZQUV2RDs7Ozs7O0dBTVQsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7dUlBR2IsU0FBUztzQkFBaEMsU0FBUzt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RlbXBsYXRlUG9ydGFsfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7TWF0RGF0ZXBpY2tlckJhc2UsIE1hdERhdGVwaWNrZXJDb250cm9sfSBmcm9tICcuL2RhdGVwaWNrZXItYmFzZSc7XG5cbi8qKiBCdXR0b24gdGhhdCB3aWxsIGNsb3NlIHRoZSBkYXRlcGlja2VyIGFuZCBhc3NpZ24gdGhlIGN1cnJlbnQgc2VsZWN0aW9uIHRvIHRoZSBkYXRhIG1vZGVsLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdERhdGVwaWNrZXJBcHBseV0sIFttYXREYXRlUmFuZ2VQaWNrZXJBcHBseV0nLFxuICBob3N0OiB7JyhjbGljayknOiAnX2FwcGx5U2VsZWN0aW9uKCknfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlckFwcGx5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlckJhc2U8TWF0RGF0ZXBpY2tlckNvbnRyb2w8YW55PiwgdW5rbm93bj4pIHt9XG5cbiAgX2FwcGx5U2VsZWN0aW9uKCkge1xuICAgIHRoaXMuX2RhdGVwaWNrZXIuX2FwcGx5UGVuZGluZ1NlbGVjdGlvbigpO1xuICAgIHRoaXMuX2RhdGVwaWNrZXIuY2xvc2UoKTtcbiAgfVxufVxuXG4vKiogQnV0dG9uIHRoYXQgd2lsbCBjbG9zZSB0aGUgZGF0ZXBpY2tlciBhbmQgZGlzY2FyZCB0aGUgY3VycmVudCBzZWxlY3Rpb24uICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0RGF0ZXBpY2tlckNhbmNlbF0sIFttYXREYXRlUmFuZ2VQaWNrZXJDYW5jZWxdJyxcbiAgaG9zdDogeycoY2xpY2spJzogJ19kYXRlcGlja2VyLmNsb3NlKCknfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlckNhbmNlbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlckJhc2U8TWF0RGF0ZXBpY2tlckNvbnRyb2w8YW55PiwgdW5rbm93bj4pIHt9XG59XG5cbi8qKlxuICogQ29udGFpbmVyIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvamVjdCBhIHJvdyBvZiBhY3Rpb24gYnV0dG9uc1xuICogdG8gdGhlIGJvdHRvbSBvZiBhIGRhdGVwaWNrZXIgb3IgZGF0ZSByYW5nZSBwaWNrZXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1kYXRlcGlja2VyLWFjdGlvbnMsIG1hdC1kYXRlLXJhbmdlLXBpY2tlci1hY3Rpb25zJyxcbiAgc3R5bGVVcmxzOiBbJ2RhdGVwaWNrZXItYWN0aW9ucy5jc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwibWF0LWRhdGVwaWNrZXItYWN0aW9uc1wiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlckFjdGlvbnMgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKSBfdGVtcGxhdGU6IFRlbXBsYXRlUmVmPHVua25vd24+O1xuICBwcml2YXRlIF9wb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2RhdGVwaWNrZXI6IE1hdERhdGVwaWNrZXJCYXNlPE1hdERhdGVwaWNrZXJDb250cm9sPGFueT4sIHVua25vd24+LFxuICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fcG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuX3RlbXBsYXRlLCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgICB0aGlzLl9kYXRlcGlja2VyLnJlZ2lzdGVyQWN0aW9ucyh0aGlzLl9wb3J0YWwpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGF0ZXBpY2tlci5yZW1vdmVBY3Rpb25zKHRoaXMuX3BvcnRhbCk7XG5cbiAgICAvLyBOZWVkcyB0byBiZSBudWxsIGNoZWNrZWQgc2luY2Ugd2UgaW5pdGlhbGl6ZSBpdCBpbiBgbmdBZnRlclZpZXdJbml0YC5cbiAgICBpZiAodGhpcy5fcG9ydGFsICYmIHRoaXMuX3BvcnRhbC5pc0F0dGFjaGVkKSB7XG4gICAgICB0aGlzLl9wb3J0YWw/LmRldGFjaCgpO1xuICAgIH1cbiAgfVxufVxuIl19