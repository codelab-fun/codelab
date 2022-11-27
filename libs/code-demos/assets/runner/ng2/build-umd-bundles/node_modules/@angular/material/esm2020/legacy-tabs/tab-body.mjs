/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, forwardRef, Inject, Optional, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { _MatTabBodyBase, MatTabBodyPortal as MatNonLegacyTabBodyPortal, matTabsAnimations, } from '@angular/material/tabs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 * @deprecated Use `MatTabBodyPortal` from `@angular/material/tabs` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabBodyPortal extends MatNonLegacyTabBodyPortal {
    constructor(componentFactoryResolver, viewContainerRef, host, _document) {
        super(componentFactoryResolver, viewContainerRef, host, _document);
    }
}
MatLegacyTabBodyPortal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabBodyPortal, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ViewContainerRef }, { token: forwardRef(() => MatLegacyTabBody) }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyTabBodyPortal.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyTabBodyPortal, selector: "[matTabBodyHost]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabBodyPortal, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTabBodyHost]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ViewContainerRef }, { type: MatLegacyTabBody, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MatLegacyTabBody)]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 * @deprecated Use `MatTabBody` from `@angular/material/tabs` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabBody extends _MatTabBodyBase {
    constructor(elementRef, dir, changeDetectorRef) {
        super(elementRef, dir, changeDetectorRef);
    }
}
MatLegacyTabBody.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabBody, deps: [{ token: i0.ElementRef }, { token: i1.Directionality, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MatLegacyTabBody.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyTabBody, selector: "mat-tab-body", host: { classAttribute: "mat-tab-body" }, viewQueries: [{ propertyName: "_portalHost", first: true, predicate: CdkPortalOutlet, descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"mat-tab-body-content\" #content\n     [@translateTab]=\"{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"_onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"_translateTabComplete.next($event)\"\n     cdkScrollable>\n  <ng-template matTabBodyHost></ng-template>\n</div>\n", styles: [".mat-tab-body-content{height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}.mat-tab-body-content[style*=\"visibility: hidden\"]{display:none}"], dependencies: [{ kind: "directive", type: MatLegacyTabBodyPortal, selector: "[matTabBodyHost]" }], animations: [matTabsAnimations.translateTab], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabBody, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tab-body', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.Default, animations: [matTabsAnimations.translateTab], host: {
                        'class': 'mat-tab-body',
                    }, template: "<div class=\"mat-tab-body-content\" #content\n     [@translateTab]=\"{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"_onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"_translateTabComplete.next($event)\"\n     cdkScrollable>\n  <ng-template matTabBodyHost></ng-template>\n</div>\n", styles: [".mat-tab-body-content{height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}.mat-tab-body-content[style*=\"visibility: hidden\"]{display:none}"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _portalHost: [{
                type: ViewChild,
                args: [CdkPortalOutlet]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXRhYnMvdGFiLWJvZHkudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXRhYnMvdGFiLWJvZHkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGVBQWUsRUFDZixnQkFBZ0IsSUFBSSx5QkFBeUIsRUFDN0MsaUJBQWlCLEdBQ2xCLE1BQU0sd0JBQXdCLENBQUM7OztBQUVoQzs7Ozs7R0FLRztBQUlILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSx5QkFBeUI7SUFDbkUsWUFDRSx3QkFBa0QsRUFDbEQsZ0JBQWtDLEVBQ1UsSUFBc0IsRUFDaEQsU0FBYztRQUVoQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7O3dIQVJVLHNCQUFzQiwwRkFJdkIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGFBQ2xDLFFBQVE7NEdBTFAsc0JBQXNCO2dHQUF0QixzQkFBc0I7a0JBSGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtpQkFDN0I7OzBCQUtJLE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDOzswQkFDekMsTUFBTTsyQkFBQyxRQUFROztBQU1wQjs7Ozs7R0FLRztBQWFILE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxlQUFlO0lBR25ELFlBQ0UsVUFBbUMsRUFDdkIsR0FBbUIsRUFDL0IsaUJBQW9DO1FBRXBDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDNUMsQ0FBQzs7a0hBVFUsZ0JBQWdCO3NHQUFoQixnQkFBZ0IsMklBQ2hCLGVBQWUsdUVDdEU1QixtWEFVQSxnUEQ4QmEsc0JBQXNCLCtDQXdCckIsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7Z0dBS2pDLGdCQUFnQjtrQkFaNUIsU0FBUzsrQkFDRSxjQUFjLGlCQUdULGlCQUFpQixDQUFDLElBQUksbUJBRXBCLHVCQUF1QixDQUFDLE9BQU8sY0FDcEMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsUUFDdEM7d0JBQ0osT0FBTyxFQUFFLGNBQWM7cUJBQ3hCOzswQkFPRSxRQUFROzRFQUppQixXQUFXO3NCQUF0QyxTQUFTO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2RrUG9ydGFsT3V0bGV0fSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBfTWF0VGFiQm9keUJhc2UsXG4gIE1hdFRhYkJvZHlQb3J0YWwgYXMgTWF0Tm9uTGVnYWN5VGFiQm9keVBvcnRhbCxcbiAgbWF0VGFic0FuaW1hdGlvbnMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuXG4vKipcbiAqIFRoZSBwb3J0YWwgaG9zdCBkaXJlY3RpdmUgZm9yIHRoZSBjb250ZW50cyBvZiB0aGUgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRUYWJCb2R5UG9ydGFsYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC90YWJzYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRUYWJCb2R5SG9zdF0nLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lUYWJCb2R5UG9ydGFsIGV4dGVuZHMgTWF0Tm9uTGVnYWN5VGFiQm9keVBvcnRhbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdExlZ2FjeVRhYkJvZHkpKSBob3N0OiBNYXRMZWdhY3lUYWJCb2R5LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICApIHtcbiAgICBzdXBlcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHZpZXdDb250YWluZXJSZWYsIGhvc3QsIF9kb2N1bWVudCk7XG4gIH1cbn1cblxuLyoqXG4gKiBXcmFwcGVyIGZvciB0aGUgY29udGVudHMgb2YgYSB0YWIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFRhYkJvZHlgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3RhYnNgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXRhYi1ib2R5JyxcbiAgdGVtcGxhdGVVcmw6ICd0YWItYm9keS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYi1ib2R5LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGFuaW1hdGlvbnM6IFttYXRUYWJzQW5pbWF0aW9ucy50cmFuc2xhdGVUYWJdLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC10YWItYm9keScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVRhYkJvZHkgZXh0ZW5kcyBfTWF0VGFiQm9keUJhc2Uge1xuICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCkgX3BvcnRhbEhvc3Q6IENka1BvcnRhbE91dGxldDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgZGlyLCBjaGFuZ2VEZXRlY3RvclJlZik7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtYXQtdGFiLWJvZHktY29udGVudFwiICNjb250ZW50XG4gICAgIFtAdHJhbnNsYXRlVGFiXT1cIntcbiAgICAgICAgdmFsdWU6IF9wb3NpdGlvbixcbiAgICAgICAgcGFyYW1zOiB7YW5pbWF0aW9uRHVyYXRpb246IGFuaW1hdGlvbkR1cmF0aW9ufVxuICAgICB9XCJcbiAgICAgKEB0cmFuc2xhdGVUYWIuc3RhcnQpPVwiX29uVHJhbnNsYXRlVGFiU3RhcnRlZCgkZXZlbnQpXCJcbiAgICAgKEB0cmFuc2xhdGVUYWIuZG9uZSk9XCJfdHJhbnNsYXRlVGFiQ29tcGxldGUubmV4dCgkZXZlbnQpXCJcbiAgICAgY2RrU2Nyb2xsYWJsZT5cbiAgPG5nLXRlbXBsYXRlIG1hdFRhYkJvZHlIb3N0PjwvbmctdGVtcGxhdGU+XG48L2Rpdj5cbiJdfQ==