/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, forwardRef, Inject, Input, ViewEncapsulation, QueryList, ElementRef, NgZone, } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MAT_DRAWER_CONTAINER } from './drawer';
import { matDrawerAnimations } from './drawer-animations';
import { coerceBooleanProperty, coerceNumberProperty, } from '@angular/cdk/coercion';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/scrolling";
import * as i2 from "@angular/common";
export class MatSidenavContent extends MatDrawerContent {
    constructor(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) {
        super(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone);
    }
}
MatSidenavContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenavContent, deps: [{ token: i0.ChangeDetectorRef }, { token: forwardRef(() => MatSidenavContainer) }, { token: i0.ElementRef }, { token: i1.ScrollDispatcher }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
MatSidenavContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatSidenavContent, selector: "mat-sidenav-content", host: { properties: { "style.margin-left.px": "_container._contentMargins.left", "style.margin-right.px": "_container._contentMargins.right" }, classAttribute: "mat-drawer-content mat-sidenav-content" }, providers: [
        {
            provide: CdkScrollable,
            useExisting: MatSidenavContent,
        },
    ], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenavContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-sidenav-content',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-drawer-content mat-sidenav-content',
                        '[style.margin-left.px]': '_container._contentMargins.left',
                        '[style.margin-right.px]': '_container._contentMargins.right',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: CdkScrollable,
                            useExisting: MatSidenavContent,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: MatSidenavContainer, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MatSidenavContainer)]
                }] }, { type: i0.ElementRef }, { type: i1.ScrollDispatcher }, { type: i0.NgZone }]; } });
export class MatSidenav extends MatDrawer {
    constructor() {
        super(...arguments);
        this._fixedInViewport = false;
        this._fixedTopGap = 0;
        this._fixedBottomGap = 0;
    }
    /** Whether the sidenav is fixed in the viewport. */
    get fixedInViewport() {
        return this._fixedInViewport;
    }
    set fixedInViewport(value) {
        this._fixedInViewport = coerceBooleanProperty(value);
    }
    /**
     * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
     * mode.
     */
    get fixedTopGap() {
        return this._fixedTopGap;
    }
    set fixedTopGap(value) {
        this._fixedTopGap = coerceNumberProperty(value);
    }
    /**
     * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
     * fixed mode.
     */
    get fixedBottomGap() {
        return this._fixedBottomGap;
    }
    set fixedBottomGap(value) {
        this._fixedBottomGap = coerceNumberProperty(value);
    }
}
MatSidenav.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenav, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatSidenav.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatSidenav, selector: "mat-sidenav", inputs: { fixedInViewport: "fixedInViewport", fixedTopGap: "fixedTopGap", fixedBottomGap: "fixedBottomGap" }, host: { attributes: { "tabIndex": "-1" }, properties: { "attr.align": "null", "class.mat-drawer-end": "position === \"end\"", "class.mat-drawer-over": "mode === \"over\"", "class.mat-drawer-push": "mode === \"push\"", "class.mat-drawer-side": "mode === \"side\"", "class.mat-drawer-opened": "opened", "class.mat-sidenav-fixed": "fixedInViewport", "style.top.px": "fixedInViewport ? fixedTopGap : null", "style.bottom.px": "fixedInViewport ? fixedBottomGap : null" }, classAttribute: "mat-drawer mat-sidenav" }, exportAs: ["matSidenav"], usesInheritance: true, ngImport: i0, template: "<div class=\"mat-drawer-inner-container\" cdkScrollable #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n", dependencies: [{ kind: "directive", type: i1.CdkScrollable, selector: "[cdk-scrollable], [cdkScrollable]" }], animations: [matDrawerAnimations.transformDrawer], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenav, decorators: [{
            type: Component,
            args: [{ selector: 'mat-sidenav', exportAs: 'matSidenav', animations: [matDrawerAnimations.transformDrawer], host: {
                        'class': 'mat-drawer mat-sidenav',
                        'tabIndex': '-1',
                        // must prevent the browser from aligning text based on value
                        '[attr.align]': 'null',
                        '[class.mat-drawer-end]': 'position === "end"',
                        '[class.mat-drawer-over]': 'mode === "over"',
                        '[class.mat-drawer-push]': 'mode === "push"',
                        '[class.mat-drawer-side]': 'mode === "side"',
                        '[class.mat-drawer-opened]': 'opened',
                        '[class.mat-sidenav-fixed]': 'fixedInViewport',
                        '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
                        '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mat-drawer-inner-container\" cdkScrollable #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n" }]
        }], propDecorators: { fixedInViewport: [{
                type: Input
            }], fixedTopGap: [{
                type: Input
            }], fixedBottomGap: [{
                type: Input
            }] } });
export class MatSidenavContainer extends MatDrawerContainer {
}
MatSidenavContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenavContainer, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatSidenavContainer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatSidenavContainer, selector: "mat-sidenav-container", host: { properties: { "class.mat-drawer-container-explicit-backdrop": "_backdropOverride" }, classAttribute: "mat-drawer-container mat-sidenav-container" }, providers: [
        {
            provide: MAT_DRAWER_CONTAINER,
            useExisting: MatSidenavContainer,
        },
    ], queries: [{ propertyName: "_content", first: true, predicate: MatSidenavContent, descendants: true }, { propertyName: "_allDrawers", predicate: MatSidenav, descendants: true }], exportAs: ["matSidenavContainer"], usesInheritance: true, ngImport: i0, template: "<div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\" *ngIf=\"hasBackdrop\"\n     [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div>\n\n<ng-content select=\"mat-sidenav\"></ng-content>\n\n<ng-content select=\"mat-sidenav-content\">\n</ng-content>\n<mat-sidenav-content *ngIf=\"!_content\">\n  <ng-content></ng-content>\n</mat-sidenav-content>\n", styles: [".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer{transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*=\"visibility: hidden\"]{display:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: MatSidenavContent, selector: "mat-sidenav-content" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenavContainer, decorators: [{
            type: Component,
            args: [{ selector: 'mat-sidenav-container', exportAs: 'matSidenavContainer', host: {
                        'class': 'mat-drawer-container mat-sidenav-container',
                        '[class.mat-drawer-container-explicit-backdrop]': '_backdropOverride',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [
                        {
                            provide: MAT_DRAWER_CONTAINER,
                            useExisting: MatSidenavContainer,
                        },
                    ], template: "<div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\" *ngIf=\"hasBackdrop\"\n     [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div>\n\n<ng-content select=\"mat-sidenav\"></ng-content>\n\n<ng-content select=\"mat-sidenav-content\">\n</ng-content>\n<mat-sidenav-content *ngIf=\"!_content\">\n  <ng-content></ng-content>\n</mat-sidenav-content>\n", styles: [".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer{transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*=\"visibility: hidden\"]{display:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}"] }]
        }], propDecorators: { _allDrawers: [{
                type: ContentChildren,
                args: [MatSidenav, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }], _content: [{
                type: ContentChild,
                args: [MatSidenavContent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zaWRlbmF2L3NpZGVuYXYudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2lkZW5hdi9kcmF3ZXIuaHRtbCIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zaWRlbmF2L3NpZGVuYXYtY29udGFpbmVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDL0YsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsR0FFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFtQnZFLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxnQkFBZ0I7SUFDckQsWUFDRSxpQkFBb0MsRUFDVyxTQUE4QixFQUM3RSxVQUFtQyxFQUNuQyxnQkFBa0MsRUFDbEMsTUFBYztRQUVkLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVFLENBQUM7O21IQVRVLGlCQUFpQixtREFHbEIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1C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RUFVYSxpQkFBaUIsaUVBUGQsVUFBVSwwR0U1STdCLDhXQVVBLCsxRUZ1Q2EsaUJBQWlCO2dHQTBGakIsbUJBQW1CO2tCQWxCL0IsU0FBUzsrQkFDRSx1QkFBdUIsWUFDdkIscUJBQXFCLFFBR3pCO3dCQUNKLE9BQU8sRUFBRSw0Q0FBNEM7d0JBQ3JELGdEQUFnRCxFQUFFLG1CQUFtQjtxQkFDdEUsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksYUFDMUI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLG9CQUFvQjs0QkFDN0IsV0FBVyxxQkFBcUI7eUJBQ2pDO3FCQUNGOzhCQVFRLFdBQVc7c0JBTG5CLGVBQWU7dUJBQUMsVUFBVSxFQUFFO3dCQUMzQix1RUFBdUU7d0JBQ3ZFLDhDQUE4Qzt3QkFDOUMsV0FBVyxFQUFFLElBQUk7cUJBQ2xCO2dCQUd5QyxRQUFRO3NCQUFqRCxZQUFZO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBRdWVyeUxpc3QsXG4gIEVsZW1lbnRSZWYsXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERyYXdlciwgTWF0RHJhd2VyQ29udGFpbmVyLCBNYXREcmF3ZXJDb250ZW50LCBNQVRfRFJBV0VSX0NPTlRBSU5FUn0gZnJvbSAnLi9kcmF3ZXInO1xuaW1wb3J0IHttYXREcmF3ZXJBbmltYXRpb25zfSBmcm9tICcuL2RyYXdlci1hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEJvb2xlYW5JbnB1dCxcbiAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICBjb2VyY2VOdW1iZXJQcm9wZXJ0eSxcbiAgTnVtYmVySW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1Njcm9sbERpc3BhdGNoZXIsIENka1Njcm9sbGFibGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2lkZW5hdi1jb250ZW50JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtZHJhd2VyLWNvbnRlbnQgbWF0LXNpZGVuYXYtY29udGVudCcsXG4gICAgJ1tzdHlsZS5tYXJnaW4tbGVmdC5weF0nOiAnX2NvbnRhaW5lci5fY29udGVudE1hcmdpbnMubGVmdCcsXG4gICAgJ1tzdHlsZS5tYXJnaW4tcmlnaHQucHhdJzogJ19jb250YWluZXIuX2NvbnRlbnRNYXJnaW5zLnJpZ2h0JyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IENka1Njcm9sbGFibGUsXG4gICAgICB1c2VFeGlzdGluZzogTWF0U2lkZW5hdkNvbnRlbnQsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2lkZW5hdkNvbnRlbnQgZXh0ZW5kcyBNYXREcmF3ZXJDb250ZW50IHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNYXRTaWRlbmF2Q29udGFpbmVyKSkgY29udGFpbmVyOiBNYXRTaWRlbmF2Q29udGFpbmVyLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgbmdab25lOiBOZ1pvbmUsXG4gICkge1xuICAgIHN1cGVyKGNoYW5nZURldGVjdG9yUmVmLCBjb250YWluZXIsIGVsZW1lbnRSZWYsIHNjcm9sbERpc3BhdGNoZXIsIG5nWm9uZSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNpZGVuYXYnLFxuICBleHBvcnRBczogJ21hdFNpZGVuYXYnLFxuICB0ZW1wbGF0ZVVybDogJ2RyYXdlci5odG1sJyxcbiAgYW5pbWF0aW9uczogW21hdERyYXdlckFuaW1hdGlvbnMudHJhbnNmb3JtRHJhd2VyXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtZHJhd2VyIG1hdC1zaWRlbmF2JyxcbiAgICAndGFiSW5kZXgnOiAnLTEnLFxuICAgIC8vIG11c3QgcHJldmVudCB0aGUgYnJvd3NlciBmcm9tIGFsaWduaW5nIHRleHQgYmFzZWQgb24gdmFsdWVcbiAgICAnW2F0dHIuYWxpZ25dJzogJ251bGwnLFxuICAgICdbY2xhc3MubWF0LWRyYXdlci1lbmRdJzogJ3Bvc2l0aW9uID09PSBcImVuZFwiJyxcbiAgICAnW2NsYXNzLm1hdC1kcmF3ZXItb3Zlcl0nOiAnbW9kZSA9PT0gXCJvdmVyXCInLFxuICAgICdbY2xhc3MubWF0LWRyYXdlci1wdXNoXSc6ICdtb2RlID09PSBcInB1c2hcIicsXG4gICAgJ1tjbGFzcy5tYXQtZHJhd2VyLXNpZGVdJzogJ21vZGUgPT09IFwic2lkZVwiJyxcbiAgICAnW2NsYXNzLm1hdC1kcmF3ZXItb3BlbmVkXSc6ICdvcGVuZWQnLFxuICAgICdbY2xhc3MubWF0LXNpZGVuYXYtZml4ZWRdJzogJ2ZpeGVkSW5WaWV3cG9ydCcsXG4gICAgJ1tzdHlsZS50b3AucHhdJzogJ2ZpeGVkSW5WaWV3cG9ydCA/IGZpeGVkVG9wR2FwIDogbnVsbCcsXG4gICAgJ1tzdHlsZS5ib3R0b20ucHhdJzogJ2ZpeGVkSW5WaWV3cG9ydCA/IGZpeGVkQm90dG9tR2FwIDogbnVsbCcsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTaWRlbmF2IGV4dGVuZHMgTWF0RHJhd2VyIHtcbiAgLyoqIFdoZXRoZXIgdGhlIHNpZGVuYXYgaXMgZml4ZWQgaW4gdGhlIHZpZXdwb3J0LiAqL1xuICBASW5wdXQoKVxuICBnZXQgZml4ZWRJblZpZXdwb3J0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZEluVmlld3BvcnQ7XG4gIH1cbiAgc2V0IGZpeGVkSW5WaWV3cG9ydCh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fZml4ZWRJblZpZXdwb3J0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9maXhlZEluVmlld3BvcnQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIGdhcCBiZXR3ZWVuIHRoZSB0b3Agb2YgdGhlIHNpZGVuYXYgYW5kIHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0IHdoZW4gdGhlIHNpZGVuYXYgaXMgaW4gZml4ZWRcbiAgICogbW9kZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBmaXhlZFRvcEdhcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXhlZFRvcEdhcDtcbiAgfVxuICBzZXQgZml4ZWRUb3BHYXAodmFsdWU6IE51bWJlcklucHV0KSB7XG4gICAgdGhpcy5fZml4ZWRUb3BHYXAgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZml4ZWRUb3BHYXAgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZ2FwIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgc2lkZW5hdiBhbmQgdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQgd2hlbiB0aGUgc2lkZW5hdiBpcyBpblxuICAgKiBmaXhlZCBtb2RlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpeGVkQm90dG9tR2FwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkQm90dG9tR2FwO1xuICB9XG4gIHNldCBmaXhlZEJvdHRvbUdhcCh2YWx1ZTogTnVtYmVySW5wdXQpIHtcbiAgICB0aGlzLl9maXhlZEJvdHRvbUdhcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9maXhlZEJvdHRvbUdhcCA9IDA7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zaWRlbmF2LWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnbWF0U2lkZW5hdkNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnc2lkZW5hdi1jb250YWluZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkcmF3ZXIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWRyYXdlci1jb250YWluZXIgbWF0LXNpZGVuYXYtY29udGFpbmVyJyxcbiAgICAnW2NsYXNzLm1hdC1kcmF3ZXItY29udGFpbmVyLWV4cGxpY2l0LWJhY2tkcm9wXSc6ICdfYmFja2Ryb3BPdmVycmlkZScsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBNQVRfRFJBV0VSX0NPTlRBSU5FUixcbiAgICAgIHVzZUV4aXN0aW5nOiBNYXRTaWRlbmF2Q29udGFpbmVyLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNpZGVuYXZDb250YWluZXIgZXh0ZW5kcyBNYXREcmF3ZXJDb250YWluZXIge1xuICBAQ29udGVudENoaWxkcmVuKE1hdFNpZGVuYXYsIHtcbiAgICAvLyBXZSBuZWVkIHRvIHVzZSBgZGVzY2VuZGFudHM6IHRydWVgLCBiZWNhdXNlIEl2eSB3aWxsIG5vIGxvbmdlciBtYXRjaFxuICAgIC8vIGluZGlyZWN0IGRlc2NlbmRhbnRzIGlmIGl0J3MgbGVmdCBhcyBmYWxzZS5cbiAgICBkZXNjZW5kYW50czogdHJ1ZSxcbiAgfSlcbiAgb3ZlcnJpZGUgX2FsbERyYXdlcnM6IFF1ZXJ5TGlzdDxNYXRTaWRlbmF2PjtcblxuICBAQ29udGVudENoaWxkKE1hdFNpZGVuYXZDb250ZW50KSBvdmVycmlkZSBfY29udGVudDogTWF0U2lkZW5hdkNvbnRlbnQ7XG59XG4iLCI8ZGl2IGNsYXNzPVwibWF0LWRyYXdlci1pbm5lci1jb250YWluZXJcIiBjZGtTY3JvbGxhYmxlICNjb250ZW50PlxyXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuPC9kaXY+XHJcbiIsIjxkaXYgY2xhc3M9XCJtYXQtZHJhd2VyLWJhY2tkcm9wXCIgKGNsaWNrKT1cIl9vbkJhY2tkcm9wQ2xpY2tlZCgpXCIgKm5nSWY9XCJoYXNCYWNrZHJvcFwiXG4gICAgIFtjbGFzcy5tYXQtZHJhd2VyLXNob3duXT1cIl9pc1Nob3dpbmdCYWNrZHJvcCgpXCI+PC9kaXY+XG5cbjxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1zaWRlbmF2XCI+PC9uZy1jb250ZW50PlxuXG48bmctY29udGVudCBzZWxlY3Q9XCJtYXQtc2lkZW5hdi1jb250ZW50XCI+XG48L25nLWNvbnRlbnQ+XG48bWF0LXNpZGVuYXYtY29udGVudCAqbmdJZj1cIiFfY29udGVudFwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L21hdC1zaWRlbmF2LWNvbnRlbnQ+XG4iXX0=