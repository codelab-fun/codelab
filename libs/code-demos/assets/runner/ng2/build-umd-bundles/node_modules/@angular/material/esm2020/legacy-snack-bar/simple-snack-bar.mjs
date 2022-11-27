/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/legacy-button";
/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 * @deprecated Use `SimpleSnackBar` from `@angular/material/snack-bar` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class LegacySimpleSnackBar {
    constructor(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
    /** Performs the action on the snack bar. */
    action() {
        this.snackBarRef.dismissWithAction();
    }
    /** If the action button should be shown. */
    get hasAction() {
        return !!this.data.action;
    }
}
LegacySimpleSnackBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: LegacySimpleSnackBar, deps: [{ token: i1.MatSnackBarRef }, { token: MAT_SNACK_BAR_DATA }], target: i0.ɵɵFactoryTarget.Component });
LegacySimpleSnackBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: LegacySimpleSnackBar, selector: "simple-snack-bar", host: { classAttribute: "mat-simple-snackbar" }, ngImport: i0, template: "<span class=\"mat-simple-snack-bar-content\">{{data.message}}</span>\n<div class=\"mat-simple-snackbar-action\"  *ngIf=\"hasAction\">\n  <button mat-button (click)=\"action()\">{{data.action}}</button>\n</div>\n", styles: [".mat-simple-snackbar{display:flex;justify-content:space-between;align-items:center;line-height:20px;opacity:1}.mat-simple-snackbar-action{flex-shrink:0;margin:-8px -8px -8px 8px}.mat-simple-snackbar-action button{max-height:36px;min-width:0}[dir=rtl] .mat-simple-snackbar-action{margin-left:-8px;margin-right:8px}.mat-simple-snack-bar-content{overflow:hidden;text-overflow:ellipsis}"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatLegacyButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: LegacySimpleSnackBar, decorators: [{
            type: Component,
            args: [{ selector: 'simple-snack-bar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'class': 'mat-simple-snackbar',
                    }, template: "<span class=\"mat-simple-snack-bar-content\">{{data.message}}</span>\n<div class=\"mat-simple-snackbar-action\"  *ngIf=\"hasAction\">\n  <button mat-button (click)=\"action()\">{{data.action}}</button>\n</div>\n", styles: [".mat-simple-snackbar{display:flex;justify-content:space-between;align-items:center;line-height:20px;opacity:1}.mat-simple-snackbar-action{flex-shrink:0;margin:-8px -8px -8px 8px}.mat-simple-snackbar-action button{max-height:36px;min-width:0}[dir=rtl] .mat-simple-snackbar-action{margin-left:-8px;margin-right:8px}.mat-simple-snack-bar-content{overflow:hidden;text-overflow:ellipsis}"] }]
        }], ctorParameters: function () { return [{ type: i1.MatSnackBarRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_SNACK_BAR_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNuYWNrLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktc25hY2stYmFyL3NpbXBsZS1zbmFjay1iYXIudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXNuYWNrLWJhci9zaW1wbGUtc25hY2stYmFyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUYsT0FBTyxFQUFtQixjQUFjLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7QUFFakc7Ozs7O0dBS0c7QUFXSCxNQUFNLE9BQU8sb0JBQW9CO0lBSS9CLFlBQ1MsV0FBaUQsRUFDNUIsSUFBUztRQUQ5QixnQkFBVyxHQUFYLFdBQVcsQ0FBc0M7UUFHeEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELDRDQUE0QztJQUM1QyxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw0Q0FBNEM7SUFDNUMsSUFBSSxTQUFTO1FBQ1gsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQzs7c0hBbkJVLG9CQUFvQixnREFNckIsa0JBQWtCOzBHQU5qQixvQkFBb0IseUdDM0JqQyxxTkFJQTtnR0R1QmEsb0JBQW9CO2tCQVZoQyxTQUFTOytCQUNFLGtCQUFrQixpQkFHYixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDO3dCQUNKLE9BQU8sRUFBRSxxQkFBcUI7cUJBQy9COzswQkFRRSxNQUFNOzJCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUZXh0T25seVNuYWNrQmFyLCBNYXRTbmFja0JhclJlZiwgTUFUX1NOQUNLX0JBUl9EQVRBfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHVzZWQgdG8gb3BlbiBhcyB0aGUgZGVmYXVsdCBzbmFjayBiYXIsIG1hdGNoaW5nIG1hdGVyaWFsIHNwZWMuXG4gKiBUaGlzIHNob3VsZCBvbmx5IGJlIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc25hY2sgYmFyIHNlcnZpY2UuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFNpbXBsZVNuYWNrQmFyYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXJgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2ltcGxlLXNuYWNrLWJhcicsXG4gIHRlbXBsYXRlVXJsOiAnc2ltcGxlLXNuYWNrLWJhci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NpbXBsZS1zbmFjay1iYXIuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1zaW1wbGUtc25hY2tiYXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBMZWdhY3lTaW1wbGVTbmFja0JhciBpbXBsZW1lbnRzIFRleHRPbmx5U25hY2tCYXIge1xuICAvKiogRGF0YSB0aGF0IHdhcyBpbmplY3RlZCBpbnRvIHRoZSBzbmFjayBiYXIuICovXG4gIGRhdGE6IHttZXNzYWdlOiBzdHJpbmc7IGFjdGlvbjogc3RyaW5nfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc25hY2tCYXJSZWY6IE1hdFNuYWNrQmFyUmVmPExlZ2FjeVNpbXBsZVNuYWNrQmFyPixcbiAgICBASW5qZWN0KE1BVF9TTkFDS19CQVJfREFUQSkgZGF0YTogYW55LFxuICApIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgLyoqIFBlcmZvcm1zIHRoZSBhY3Rpb24gb24gdGhlIHNuYWNrIGJhci4gKi9cbiAgYWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuc25hY2tCYXJSZWYuZGlzbWlzc1dpdGhBY3Rpb24oKTtcbiAgfVxuXG4gIC8qKiBJZiB0aGUgYWN0aW9uIGJ1dHRvbiBzaG91bGQgYmUgc2hvd24uICovXG4gIGdldCBoYXNBY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5kYXRhLmFjdGlvbjtcbiAgfVxufVxuIiwiPHNwYW4gY2xhc3M9XCJtYXQtc2ltcGxlLXNuYWNrLWJhci1jb250ZW50XCI+e3tkYXRhLm1lc3NhZ2V9fTwvc3Bhbj5cbjxkaXYgY2xhc3M9XCJtYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvblwiICAqbmdJZj1cImhhc0FjdGlvblwiPlxuICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cImFjdGlvbigpXCI+e3tkYXRhLmFjdGlvbn19PC9idXR0b24+XG48L2Rpdj5cbiJdfQ==