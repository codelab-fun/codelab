import * as i1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i4 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import * as i7 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Inject, Optional, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import * as i2 from '@angular/cdk/scrolling';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import * as i6 from '@angular/cdk/layout';
import { Breakpoints } from '@angular/cdk/layout';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { _MatTooltipBase, MAT_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_DEFAULT_OPTIONS, _TooltipComponentBase, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
export { SCROLL_THROTTLE_MS as LEGACY_SCROLL_THROTTLE_MS, MAT_TOOLTIP_DEFAULT_OPTIONS as MAT_LEGACY_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY as MAT_LEGACY_TOOLTIP_DEFAULT_OPTIONS_FACTORY, MAT_TOOLTIP_SCROLL_STRATEGY as MAT_LEGACY_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY as MAT_LEGACY_TOOLTIP_SCROLL_STRATEGY_FACTORY, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER as MAT_LEGACY_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, getMatTooltipInvalidPositionError as getMatLegacyTooltipInvalidPositionError } from '@angular/material/tooltip';
import * as i3 from '@angular/cdk/platform';
import * as i5 from '@angular/cdk/bidi';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.io/design/components/tooltips.html
 *
 * @deprecated Use `MatTooltip` from `@angular/material/tooltip` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyTooltip extends _MatTooltipBase {
    constructor(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document) {
        super(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document);
        this._tooltipComponent = LegacyTooltipComponent;
    }
}
MatLegacyTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTooltip, deps: [{ token: i1.Overlay }, { token: i0.ElementRef }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: i0.NgZone }, { token: i3.Platform }, { token: i4.AriaDescriber }, { token: i4.FocusMonitor }, { token: MAT_TOOLTIP_SCROLL_STRATEGY }, { token: i5.Directionality, optional: true }, { token: MAT_TOOLTIP_DEFAULT_OPTIONS, optional: true }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyTooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyTooltip, selector: "[matTooltip]", host: { classAttribute: "mat-tooltip-trigger" }, exportAs: ["matTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTooltip]',
                    exportAs: 'matTooltip',
                    host: {
                        'class': 'mat-tooltip-trigger',
                    },
                }]
        }], ctorParameters: function () {
        return [{ type: i1.Overlay }, { type: i0.ElementRef }, { type: i2.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: i0.NgZone }, { type: i3.Platform }, { type: i4.AriaDescriber }, { type: i4.FocusMonitor }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MAT_TOOLTIP_SCROLL_STRATEGY]
                    }] }, { type: i5.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MAT_TOOLTIP_DEFAULT_OPTIONS]
                    }] }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    } });
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 * @deprecated Use `TooltipComponent` from `@angular/material/tooltip` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class LegacyTooltipComponent extends _TooltipComponentBase {
    constructor(changeDetectorRef, _breakpointObserver, animationMode) {
        super(changeDetectorRef, animationMode);
        this._breakpointObserver = _breakpointObserver;
        /** Stream that emits whether the user has a handset-sized display.  */
        this._isHandset = this._breakpointObserver.observe(Breakpoints.Handset);
        this._showAnimation = 'mat-tooltip-show';
        this._hideAnimation = 'mat-tooltip-hide';
    }
}
LegacyTooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: LegacyTooltipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i6.BreakpointObserver }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
LegacyTooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: LegacyTooltipComponent, selector: "mat-tooltip-component", host: { attributes: { "aria-hidden": "true" }, listeners: { "mouseleave": "_handleMouseLeave($event)" }, properties: { "style.zoom": "isVisible() ? 1 : null" } }, viewQueries: [{ propertyName: "_tooltip", first: true, predicate: ["tooltip"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div #tooltip\n     class=\"mat-tooltip\"\n     (animationend)=\"_handleAnimationEnd($event)\"\n     [ngClass]=\"tooltipClass\"\n     [class.mat-tooltip-handset]=\"(_isHandset | async)?.matches\">{{message}}</div>\n", styles: [".mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis;transform:scale(0)}.mat-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}.mat-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-tooltip-show{0%{opacity:0;transform:scale(0)}50%{opacity:.5;transform:scale(0.99)}100%{opacity:1;transform:scale(1)}}@keyframes mat-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1)}}.mat-tooltip-show{animation:mat-tooltip-show 200ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-tooltip-hide{animation:mat-tooltip-hide 100ms cubic-bezier(0, 0, 0.2, 1) forwards}"], dependencies: [{ kind: "directive", type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "pipe", type: i7.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: LegacyTooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tooltip-component', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                        // won't be rendered if the animations are disabled or there is no web animations polyfill.
                        '[style.zoom]': 'isVisible() ? 1 : null',
                        '(mouseleave)': '_handleMouseLeave($event)',
                        'aria-hidden': 'true',
                    }, template: "<div #tooltip\n     class=\"mat-tooltip\"\n     (animationend)=\"_handleAnimationEnd($event)\"\n     [ngClass]=\"tooltipClass\"\n     [class.mat-tooltip-handset]=\"(_isHandset | async)?.matches\">{{message}}</div>\n", styles: [".mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis;transform:scale(0)}.mat-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}.mat-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-tooltip-show{0%{opacity:0;transform:scale(0)}50%{opacity:.5;transform:scale(0.99)}100%{opacity:1;transform:scale(1)}}@keyframes mat-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1)}}.mat-tooltip-show{animation:mat-tooltip-show 200ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-tooltip-hide{animation:mat-tooltip-hide 100ms cubic-bezier(0, 0, 0.2, 1) forwards}"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i6.BreakpointObserver }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [ANIMATION_MODULE_TYPE]
                    }] }];
    }, propDecorators: { _tooltip: [{
                type: ViewChild,
                args: ['tooltip', {
                        // Use a static query here since we interact directly with
                        // the DOM which can happen before `ngAfterViewInit`.
                        static: true,
                    }]
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @deprecated Use `MatTooltipModule` from `@angular/material/tooltip` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyTooltipModule {
}
MatLegacyTooltipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyTooltipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTooltipModule, declarations: [MatLegacyTooltip, LegacyTooltipComponent], imports: [A11yModule, CommonModule, OverlayModule, MatCommonModule], exports: [MatLegacyTooltip, LegacyTooltipComponent, MatCommonModule, CdkScrollableModule] });
MatLegacyTooltipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTooltipModule, providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [A11yModule, CommonModule, OverlayModule, MatCommonModule, MatCommonModule, CdkScrollableModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [A11yModule, CommonModule, OverlayModule, MatCommonModule],
                    exports: [MatLegacyTooltip, LegacyTooltipComponent, MatCommonModule, CdkScrollableModule],
                    declarations: [MatLegacyTooltip, LegacyTooltipComponent],
                    providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
                }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Animations used by MatTooltip.
 * @docs-private
 * @deprecated Use `matTooltipAnimations` from `@angular/material/tooltip` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
const matLegacyTooltipAnimations = {
    /** Animation that transitions a tooltip in and out. */
    tooltipState: trigger('state', [
        state('initial, void, hidden', style({ opacity: 0, transform: 'scale(0)' })),
        state('visible', style({ transform: 'scale(1)' })),
        transition('* => visible', animate('200ms cubic-bezier(0, 0, 0.2, 1)', keyframes([
            style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
            style({ opacity: 0.5, transform: 'scale(0.99)', offset: 0.5 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
        ]))),
        transition('* => hidden', animate('100ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 0 }))),
    ]),
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LegacyTooltipComponent, MatLegacyTooltip, MatLegacyTooltipModule, matLegacyTooltipAnimations };
//# sourceMappingURL=legacy-tooltip.mjs.map
