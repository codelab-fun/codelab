/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, Input, ViewEncapsulation, ViewChild, } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { MatDatepickerIntl } from './datepicker-intl';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-intl";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
/** Can be used to override the icon of a `matDatepickerToggle`. */
export class MatDatepickerToggleIcon {
}
MatDatepickerToggleIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerToggleIcon, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatDatepickerToggleIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDatepickerToggleIcon, selector: "[matDatepickerToggleIcon]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerToggleIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matDatepickerToggleIcon]',
                }]
        }] });
export class MatDatepickerToggle {
    constructor(_intl, _changeDetectorRef, defaultTabIndex) {
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._stateChanges = Subscription.EMPTY;
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        if (this._disabled === undefined && this.datepicker) {
            return this.datepicker.disabled;
        }
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnChanges(changes) {
        if (changes['datepicker']) {
            this._watchStateChanges();
        }
    }
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
    }
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    _open(event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
    _watchStateChanges() {
        const datepickerStateChanged = this.datepicker ? this.datepicker.stateChanges : observableOf();
        const inputStateChanged = this.datepicker && this.datepicker.datepickerInput
            ? this.datepicker.datepickerInput.stateChanges
            : observableOf();
        const datepickerToggled = this.datepicker
            ? merge(this.datepicker.openedStream, this.datepicker.closedStream)
            : observableOf();
        this._stateChanges.unsubscribe();
        this._stateChanges = merge(this._intl.changes, datepickerStateChanged, inputStateChanged, datepickerToggled).subscribe(() => this._changeDetectorRef.markForCheck());
    }
}
MatDatepickerToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerToggle, deps: [{ token: i1.MatDatepickerIntl }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
MatDatepickerToggle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: { datepicker: ["for", "datepicker"], tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], disabled: "disabled", disableRipple: "disableRipple" }, host: { listeners: { "click": "_open($event)" }, properties: { "attr.tabindex": "null", "class.mat-datepicker-toggle-active": "datepicker && datepicker.opened", "class.mat-accent": "datepicker && datepicker.color === \"accent\"", "class.mat-warn": "datepicker && datepicker.color === \"warn\"", "attr.data-mat-calendar": "datepicker ? datepicker.id : null" }, classAttribute: "mat-datepicker-toggle" }, queries: [{ propertyName: "_customIcon", first: true, predicate: MatDatepickerToggleIcon, descendants: true }], viewQueries: [{ propertyName: "_button", first: true, predicate: ["button"], descendants: true }], exportAs: ["matDatepickerToggle"], usesOnChanges: true, ngImport: i0, template: "<button\n  #button\n  mat-icon-button\n  type=\"button\"\n  [attr.aria-haspopup]=\"datepicker ? 'dialog' : null\"\n  [attr.aria-label]=\"ariaLabel || _intl.openCalendarLabel\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  [disableRipple]=\"disableRipple\">\n\n  <svg\n    *ngIf=\"!_customIcon\"\n    class=\"mat-datepicker-toggle-default-icon\"\n    viewBox=\"0 0 24 24\"\n    width=\"24px\"\n    height=\"24px\"\n    fill=\"currentColor\"\n    focusable=\"false\">\n    <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\n  </svg>\n\n  <ng-content select=\"[matDatepickerToggleIcon]\"></ng-content>\n</button>\n", styles: [".mat-datepicker-toggle{pointer-events:auto}.cdk-high-contrast-active .mat-datepicker-toggle-default-icon{color:CanvasText}"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDatepickerToggle, decorators: [{
            type: Component,
            args: [{ selector: 'mat-datepicker-toggle', host: {
                        'class': 'mat-datepicker-toggle',
                        '[attr.tabindex]': 'null',
                        '[class.mat-datepicker-toggle-active]': 'datepicker && datepicker.opened',
                        '[class.mat-accent]': 'datepicker && datepicker.color === "accent"',
                        '[class.mat-warn]': 'datepicker && datepicker.color === "warn"',
                        // Used by the test harness to tie this toggle to its datepicker.
                        '[attr.data-mat-calendar]': 'datepicker ? datepicker.id : null',
                        // Bind the `click` on the host, rather than the inner `button`, so that we can call
                        // `stopPropagation` on it without affecting the user's `click` handlers. We need to stop
                        // it so that the input doesn't get focused automatically by the form field (See #21836).
                        '(click)': '_open($event)',
                    }, exportAs: 'matDatepickerToggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  #button\n  mat-icon-button\n  type=\"button\"\n  [attr.aria-haspopup]=\"datepicker ? 'dialog' : null\"\n  [attr.aria-label]=\"ariaLabel || _intl.openCalendarLabel\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  [disableRipple]=\"disableRipple\">\n\n  <svg\n    *ngIf=\"!_customIcon\"\n    class=\"mat-datepicker-toggle-default-icon\"\n    viewBox=\"0 0 24 24\"\n    width=\"24px\"\n    height=\"24px\"\n    fill=\"currentColor\"\n    focusable=\"false\">\n    <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\n  </svg>\n\n  <ng-content select=\"[matDatepickerToggleIcon]\"></ng-content>\n</button>\n", styles: [".mat-datepicker-toggle{pointer-events:auto}.cdk-high-contrast-active .mat-datepicker-toggle-default-icon{color:CanvasText}"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerIntl }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }]; }, propDecorators: { datepicker: [{
                type: Input,
                args: ['for']
            }], tabIndex: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], disabled: [{
                type: Input
            }], disableRipple: [{
                type: Input
            }], _customIcon: [{
                type: ContentChild,
                args: [MatDatepickerToggleIcon]
            }], _button: [{
                type: ViewChild,
                args: ['button']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZGF0ZXBpY2tlci9kYXRlcGlja2VyLXRvZ2dsZS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9kYXRlcGlja2VyL2RhdGVwaWNrZXItdG9nZ2xlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULEtBQUssRUFJTCxpQkFBaUIsRUFDakIsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsS0FBSyxFQUFjLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7OztBQUdwRCxtRUFBbUU7QUFJbkUsTUFBTSxPQUFPLHVCQUF1Qjs7eUhBQXZCLHVCQUF1Qjs2R0FBdkIsdUJBQXVCO2dHQUF2Qix1QkFBdUI7a0JBSG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7O0FBd0JELE1BQU0sT0FBTyxtQkFBbUI7SUFtQzlCLFlBQ1MsS0FBd0IsRUFDdkIsa0JBQXFDLEVBQ3RCLGVBQXVCO1FBRnZDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3ZCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFwQ3ZDLGtCQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQXVDekMsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFD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LFlBQ1MscUJBQXFCLGlCQUNoQixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzswQkF3QzVDLFNBQVM7MkJBQUMsVUFBVTs0Q0FsQ1QsVUFBVTtzQkFBdkIsS0FBSzt1QkFBQyxLQUFLO2dCQUdILFFBQVE7c0JBQWhCLEtBQUs7Z0JBR2UsU0FBUztzQkFBN0IsS0FBSzt1QkFBQyxZQUFZO2dCQUlmLFFBQVE7c0JBRFgsS0FBSztnQkFjRyxhQUFhO3NCQUFyQixLQUFLO2dCQUdpQyxXQUFXO3NCQUFqRCxZQUFZO3VCQUFDLHVCQUF1QjtnQkFHaEIsT0FBTztzQkFBM0IsU0FBUzt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0QnV0dG9ufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHttZXJnZSwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtNYXREYXRlcGlja2VySW50bH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuaW1wb3J0IHtNYXREYXRlcGlja2VyQ29udHJvbCwgTWF0RGF0ZXBpY2tlclBhbmVsfSBmcm9tICcuL2RhdGVwaWNrZXItYmFzZSc7XG5cbi8qKiBDYW4gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgaWNvbiBvZiBhIGBtYXREYXRlcGlja2VyVG9nZ2xlYC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXREYXRlcGlja2VyVG9nZ2xlSWNvbl0nLFxufSlcbmV4cG9ydCBjbGFzcyBNYXREYXRlcGlja2VyVG9nZ2xlSWNvbiB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtZGF0ZXBpY2tlci10b2dnbGUnLFxuICB0ZW1wbGF0ZVVybDogJ2RhdGVwaWNrZXItdG9nZ2xlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF0ZXBpY2tlci10b2dnbGUuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWRhdGVwaWNrZXItdG9nZ2xlJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ251bGwnLFxuICAgICdbY2xhc3MubWF0LWRhdGVwaWNrZXItdG9nZ2xlLWFjdGl2ZV0nOiAnZGF0ZXBpY2tlciAmJiBkYXRlcGlja2VyLm9wZW5lZCcsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdkYXRlcGlja2VyICYmIGRhdGVwaWNrZXIuY29sb3IgPT09IFwiYWNjZW50XCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2RhdGVwaWNrZXIgJiYgZGF0ZXBpY2tlci5jb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgIC8vIFVzZWQgYnkgdGhlIHRlc3QgaGFybmVzcyB0byB0aWUgdGhpcyB0b2dnbGUgdG8gaXRzIGRhdGVwaWNrZXIuXG4gICAgJ1thdHRyLmRhdGEtbWF0LWNhbGVuZGFyXSc6ICdkYXRlcGlja2VyID8gZGF0ZXBpY2tlci5pZCA6IG51bGwnLFxuICAgIC8vIEJpbmQgdGhlIGBjbGlja2Agb24gdGhlIGhvc3QsIHJhdGhlciB0aGFuIHRoZSBpbm5lciBgYnV0dG9uYCwgc28gdGhhdCB3ZSBjYW4gY2FsbFxuICAgIC8vIGBzdG9wUHJvcGFnYXRpb25gIG9uIGl0IHdpdGhvdXQgYWZmZWN0aW5nIHRoZSB1c2VyJ3MgYGNsaWNrYCBoYW5kbGVycy4gV2UgbmVlZCB0byBzdG9wXG4gICAgLy8gaXQgc28gdGhhdCB0aGUgaW5wdXQgZG9lc24ndCBnZXQgZm9jdXNlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBmb3JtIGZpZWxkIChTZWUgIzIxODM2KS5cbiAgICAnKGNsaWNrKSc6ICdfb3BlbigkZXZlbnQpJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdtYXREYXRlcGlja2VyVG9nZ2xlJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdERhdGVwaWNrZXJUb2dnbGU8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3N0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogRGF0ZXBpY2tlciBpbnN0YW5jZSB0aGF0IHRoZSBidXR0b24gd2lsbCB0b2dnbGUuICovXG4gIEBJbnB1dCgnZm9yJykgZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlclBhbmVsPE1hdERhdGVwaWNrZXJDb250cm9sPGFueT4sIEQ+O1xuXG4gIC8qKiBUYWJpbmRleCBmb3IgdGhlIHRvZ2dsZS4gKi9cbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciB8IG51bGw7XG5cbiAgLyoqIFNjcmVlbi1yZWFkZXIgbGFiZWwgZm9yIHRoZSBidXR0b24uICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5kYXRlcGlja2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyLmRpc2FibGVkO1xuICAgIH1cblxuICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHJpcHBsZXMgb24gdGhlIHRvZ2dsZSBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpIGRpc2FibGVSaXBwbGU6IGJvb2xlYW47XG5cbiAgLyoqIEN1c3RvbSBpY29uIHNldCBieSB0aGUgY29uc3VtZXIuICovXG4gIEBDb250ZW50Q2hpbGQoTWF0RGF0ZXBpY2tlclRvZ2dsZUljb24pIF9jdXN0b21JY29uOiBNYXREYXRlcGlja2VyVG9nZ2xlSWNvbjtcblxuICAvKiogVW5kZXJseWluZyBidXR0b24gZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnYnV0dG9uJykgX2J1dHRvbjogTWF0QnV0dG9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfaW50bDogTWF0RGF0ZXBpY2tlckludGwsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgZGVmYXVsdFRhYkluZGV4OiBzdHJpbmcsXG4gICkge1xuICAgIGNvbnN0IHBhcnNlZFRhYkluZGV4ID0gTnVtYmVyKGRlZmF1bHRUYWJJbmRleCk7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlZFRhYkluZGV4IHx8IHBhcnNlZFRhYkluZGV4ID09PSAwID8gcGFyc2VkVGFiSW5kZXggOiBudWxsO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydkYXRlcGlja2VyJ10pIHtcbiAgICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIF9vcGVuKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRhdGVwaWNrZXIgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlci5vcGVuKCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFN0YXRlQ2hhbmdlcygpIHtcbiAgICBjb25zdCBkYXRlcGlja2VyU3RhdGVDaGFuZ2VkID0gdGhpcy5kYXRlcGlja2VyID8gdGhpcy5kYXRlcGlja2VyLnN0YXRlQ2hhbmdlcyA6IG9ic2VydmFibGVPZigpO1xuICAgIGNvbnN0IGlucHV0U3RhdGVDaGFuZ2VkID1cbiAgICAgIHRoaXMuZGF0ZXBpY2tlciAmJiB0aGlzLmRhdGVwaWNrZXIuZGF0ZXBpY2tlcklucHV0XG4gICAgICAgID8gdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXJJbnB1dC5zdGF0ZUNoYW5nZXNcbiAgICAgICAgOiBvYnNlcnZhYmxlT2YoKTtcbiAgICBjb25zdCBkYXRlcGlja2VyVG9nZ2xlZCA9IHRoaXMuZGF0ZXBpY2tlclxuICAgICAgPyBtZXJnZSh0aGlzLmRhdGVwaWNrZXIub3BlbmVkU3RyZWFtLCB0aGlzLmRhdGVwaWNrZXIuY2xvc2VkU3RyZWFtKVxuICAgICAgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcyA9IG1lcmdlKFxuICAgICAgdGhpcy5faW50bC5jaGFuZ2VzLFxuICAgICAgZGF0ZXBpY2tlclN0YXRlQ2hhbmdlZCBhcyBPYnNlcnZhYmxlPHZvaWQ+LFxuICAgICAgaW5wdXRTdGF0ZUNoYW5nZWQsXG4gICAgICBkYXRlcGlja2VyVG9nZ2xlZCxcbiAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgI2J1dHRvblxuICBtYXQtaWNvbi1idXR0b25cbiAgdHlwZT1cImJ1dHRvblwiXG4gIFthdHRyLmFyaWEtaGFzcG9wdXBdPVwiZGF0ZXBpY2tlciA/ICdkaWFsb2cnIDogbnVsbFwiXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsIHx8IF9pbnRsLm9wZW5DYWxlbmRhckxhYmVsXCJcbiAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyAtMSA6IHRhYkluZGV4XCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgW2Rpc2FibGVSaXBwbGVdPVwiZGlzYWJsZVJpcHBsZVwiPlxuXG4gIDxzdmdcbiAgICAqbmdJZj1cIiFfY3VzdG9tSWNvblwiXG4gICAgY2xhc3M9XCJtYXQtZGF0ZXBpY2tlci10b2dnbGUtZGVmYXVsdC1pY29uXCJcbiAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICB3aWR0aD1cIjI0cHhcIlxuICAgIGhlaWdodD1cIjI0cHhcIlxuICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCI+XG4gICAgPHBhdGggZD1cIk0xOSAzaC0xVjFoLTJ2Mkg4VjFINnYySDVjLTEuMTEgMC0xLjk5LjktMS45OSAyTDMgMTljMCAxLjEuODkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnptMCAxNkg1VjhoMTR2MTF6TTcgMTBoNXY1SDd6XCIvPlxuICA8L3N2Zz5cblxuICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWF0RGF0ZXBpY2tlclRvZ2dsZUljb25dXCI+PC9uZy1jb250ZW50PlxuPC9idXR0b24+XG4iXX0=