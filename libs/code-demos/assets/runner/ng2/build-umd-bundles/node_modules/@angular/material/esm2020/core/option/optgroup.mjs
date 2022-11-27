/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Inject, Optional, InjectionToken, Directive, } from '@angular/core';
import { mixinDisabled } from '../common-behaviors/disabled';
import { MAT_OPTION_PARENT_COMPONENT } from './option-parent';
import * as i0 from "@angular/core";
// Notes on the accessibility pattern used for `mat-optgroup`.
// The option group has two different "modes": regular and inert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `mat-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `inert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<mat-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<mat-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on
// Boilerplate for applying mixins to MatOptgroup.
/** @docs-private */
const _MatOptgroupMixinBase = mixinDisabled(class {
});
// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;
export class _MatOptgroupBase extends _MatOptgroupMixinBase {
    constructor(parent) {
        super();
        /** Unique id for the underlying label. */
        this._labelId = `mat-optgroup-label-${_uniqueOptgroupIdCounter++}`;
        this._inert = parent?.inertGroups ?? false;
    }
}
_MatOptgroupBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatOptgroupBase, deps: [{ token: MAT_OPTION_PARENT_COMPONENT, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
_MatOptgroupBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _MatOptgroupBase, inputs: { label: "label" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatOptgroupBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_OPTION_PARENT_COMPONENT]
                }, {
                    type: Optional
                }] }]; }, propDecorators: { label: [{
                type: Input
            }] } });
/**
 * Injection token that can be used to reference instances of `MatOptgroup`. It serves as
 * alternative token to the actual `MatOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export const MAT_OPTGROUP = new InjectionToken('MatOptgroup');
/**
 * Component that is used to group instances of `mat-option`.
 */
export class MatOptgroup extends _MatOptgroupBase {
}
MatOptgroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatOptgroup, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatOptgroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatOptgroup, selector: "mat-optgroup", inputs: { disabled: "disabled" }, host: { properties: { "attr.role": "_inert ? null : \"group\"", "attr.aria-disabled": "_inert ? null : disabled.toString()", "attr.aria-labelledby": "_inert ? null : _labelId" }, classAttribute: "mat-mdc-optgroup" }, providers: [{ provide: MAT_OPTGROUP, useExisting: MatOptgroup }], exportAs: ["matOptgroup"], usesInheritance: true, ngImport: i0, template: "<span\n  class=\"mat-mdc-optgroup-label\"\n  aria-hidden=\"true\"\n  [class.mdc-list-item--disabled]=\"disabled\"\n  [id]=\"_labelId\">\n  <span class=\"mdc-list-item__primary-text\">{{ label }} <ng-content></ng-content></span>\n</span>\n\n<ng-content select=\"mat-option, ng-container\"></ng-content>\n", styles: [".mat-mdc-optgroup-label{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;min-height:48px}.mat-mdc-optgroup-label:focus{outline:none}[dir=rtl] .mat-mdc-optgroup-label,.mat-mdc-optgroup-label[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-optgroup-label.mdc-list-item--disabled{opacity:.38}.mat-mdc-optgroup-label .mdc-list-item__primary-text{white-space:normal}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatOptgroup, decorators: [{
            type: Component,
            args: [{ selector: 'mat-optgroup', exportAs: 'matOptgroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['disabled'], host: {
                        'class': 'mat-mdc-optgroup',
                        '[attr.role]': '_inert ? null : "group"',
                        '[attr.aria-disabled]': '_inert ? null : disabled.toString()',
                        '[attr.aria-labelledby]': '_inert ? null : _labelId',
                    }, providers: [{ provide: MAT_OPTGROUP, useExisting: MatOptgroup }], template: "<span\n  class=\"mat-mdc-optgroup-label\"\n  aria-hidden=\"true\"\n  [class.mdc-list-item--disabled]=\"disabled\"\n  [id]=\"_labelId\">\n  <span class=\"mdc-list-item__primary-text\">{{ label }} <ng-content></ng-content></span>\n</span>\n\n<ng-content select=\"mat-option, ng-container\"></ng-content>\n", styles: [".mat-mdc-optgroup-label{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;min-height:48px}.mat-mdc-optgroup-label:focus{outline:none}[dir=rtl] .mat-mdc-optgroup-label,.mat-mdc-optgroup-label[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-optgroup-label.mdc-list-item--disabled{opacity:.38}.mat-mdc-optgroup-label .mdc-list-item__primary-text{white-space:normal}"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY29yZS9vcHRpb24vb3B0Z3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY29yZS9vcHRpb24vb3B0Z3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsY0FBYyxFQUNkLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUEyQiwyQkFBMkIsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUV0Riw4REFBOEQ7QUFDOUQsMkZBQTJGO0FBQzNGLGdHQUFnRztBQUNoRyxpR0FBaUc7QUFDakcsNkZBQTZGO0FBQzdGLDBGQUEwRjtBQUMxRix5Q0FBeUM7QUFDekMsOEZBQThGO0FBQzlGLG1HQUFtRztBQUNuRyxpR0FBaUc7QUFDakcsbUdBQW1HO0FBQ25HLG1GQUFtRjtBQUNuRixvR0FBb0c7QUFDcEcsMkZBQTJGO0FBQzNGLHdCQUF3QjtBQUN4QixpR0FBaUc7QUFDakcsNENBQTRDO0FBQzVDLCtGQUErRjtBQUMvRix3REFBd0Q7QUFFeEQsa0RBQWtEO0FBQ2xELG9CQUFvQjtBQUNwQixNQUFNLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztDQUFRLENBQUMsQ0FBQztBQUV0RCxnQ0FBZ0M7QUFDaEMsSUFBSSx3QkFBd0IsR0FBRyxDQUFDLENBQUM7QUFHakMsTUFBTSxPQUFPLGdCQUFpQixTQUFRLHFCQUFxQjtJQVV6RCxZQUE2RCxNQUFpQztRQUM1RixLQUFLLEVBQUUsQ0FBQztRQVBWLDBDQUEwQztRQUMxQyxhQUFRLEdBQVcsc0JBQXNCLHdCQUF3QixFQUFFLEVBQUUsQ0FBQztRQU9wRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRSxXQUFXLElBQUksS0FBSyxDQUFDO0lBQzdDLENBQUM7O2tIQWJVLGdCQUFnQixrQkFVUCwyQkFBMkI7c0dBVnBDLGdCQUFnQjtnR0FBaEIsZ0JBQWdCO2tCQUQ1QixTQUFTOzswQkFXSyxNQUFNOzJCQUFDLDJCQUEyQjs7MEJBQUcsUUFBUTs0Q0FSakQsS0FBSztzQkFBYixLQUFLOztBQWNSOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxjQUFjLENBQWMsYUFBYSxDQUFDLENBQUM7QUFFM0U7O0dBRUc7QUFpQkgsTUFBTSxPQUFPLFdBQVksU0FBUSxnQkFBZ0I7OzZHQUFwQyxXQUFXO2lHQUFYLFdBQVcsa1NBRlgsQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBQyxDQUFDLDRFQ3pGaEUsaVRBU0E7Z0dEa0ZhLFdBQVc7a0JBaEJ2QixTQUFTOytCQUNFLGNBQWMsWUFDZCxhQUFhLGlCQUVSLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sVUFDdkMsQ0FBQyxVQUFVLENBQUMsUUFFZDt3QkFDSixPQUFPLEVBQUUsa0JBQWtCO3dCQUMzQixhQUFhLEVBQUUseUJBQXlCO3dCQUN4QyxzQkFBc0IsRUFBRSxxQ0FBcUM7d0JBQzdELHdCQUF3QixFQUFFLDBCQUEwQjtxQkFDckQsYUFDVSxDQUFDLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLGFBQWEsRUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIERpcmVjdGl2ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NhbkRpc2FibGUsIG1peGluRGlzYWJsZWR9IGZyb20gJy4uL2NvbW1vbi1iZWhhdmlvcnMvZGlzYWJsZWQnO1xuaW1wb3J0IHtNYXRPcHRpb25QYXJlbnRDb21wb25lbnQsIE1BVF9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVH0gZnJvbSAnLi9vcHRpb24tcGFyZW50JztcblxuLy8gTm90ZXMgb24gdGhlIGFjY2Vzc2liaWxpdHkgcGF0dGVybiB1c2VkIGZvciBgbWF0LW9wdGdyb3VwYC5cbi8vIFRoZSBvcHRpb24gZ3JvdXAgaGFzIHR3byBkaWZmZXJlbnQgXCJtb2Rlc1wiOiByZWd1bGFyIGFuZCBpbmVydC4gVGhlIHJlZ3VsYXIgbW9kZSB1c2VzIHRoZVxuLy8gcmVjb21tZW5kZWQgYTExeSBwYXR0ZXJuIHdoaWNoIGhhcyBgcm9sZT1cImdyb3VwXCJgIG9uIHRoZSBncm91cCBlbGVtZW50IHdpdGggYGFyaWEtbGFiZWxsZWRieWBcbi8vIHBvaW50aW5nIHRvIHRoZSBsYWJlbC4gVGhpcyB3b3JrcyBmb3IgYG1hdC1zZWxlY3RgLCBidXQgaXQgc2VlbXMgdG8gaGl0IGEgYnVnIGZvciBhdXRvY29tcGxldGVcbi8vIHVuZGVyIFZvaWNlT3ZlciB3aGVyZSB0aGUgZ3JvdXAgZG9lc24ndCBnZXQgcmVhZCBvdXQgYXQgYWxsLiBUaGUgYnVnIGFwcGVhcnMgdG8gYmUgdGhhdCBpZlxuLy8gdGhlcmUncyBfX2FueV9fIGExMXktcmVsYXRlZCBhdHRyaWJ1dGUgb24gdGhlIGdyb3VwIChlLmcuIGByb2xlYCBvciBgYXJpYS1sYWJlbGxlZGJ5YCksXG4vLyBWb2ljZU92ZXIgb24gU2FmYXJpIHdvbid0IHJlYWQgaXQgb3V0LlxuLy8gV2UndmUgaW50cm9kdWNlZCB0aGUgYGluZXJ0YCBtb2RlIGFzIGEgd29ya2Fyb3VuZC4gVW5kZXIgdGhpcyBtb2RlLCBhbGwgYTExeSBhdHRyaWJ1dGVzIGFyZVxuLy8gcmVtb3ZlZCBmcm9tIHRoZSBncm91cCwgYW5kIHdlIGdldCB0aGUgc2NyZWVuIHJlYWRlciB0byByZWFkIG91dCB0aGUgZ3JvdXAgbGFiZWwgYnkgbWlycm9yaW5nIGl0XG4vLyBpbnNpZGUgYW4gaW52aXNpYmxlIGVsZW1lbnQgaW4gdGhlIG9wdGlvbi4gVGhpcyBpcyBzdWItb3B0aW1hbCwgYmVjYXVzZSB0aGUgc2NyZWVuIHJlYWRlciB3aWxsXG4vLyByZXBlYXQgdGhlIGdyb3VwIGxhYmVsIG9uIGVhY2ggbmF2aWdhdGlvbiwgd2hlcmVhcyB0aGUgZGVmYXVsdCBwYXR0ZXJuIG9ubHkgcmVhZHMgdGhlIGdyb3VwIHdoZW5cbi8vIHRoZSB1c2VyIGVudGVycyBhIG5ldyBncm91cC4gVGhlIGZvbGxvd2luZyBhbHRlcm5hdGUgYXBwcm9hY2hlcyB3ZXJlIGNvbnNpZGVyZWQ6XG4vLyAxLiBSZWFkaW5nIG91dCB0aGUgZ3JvdXAgbGFiZWwgdXNpbmcgdGhlIGBMaXZlQW5ub3VuY2VyYCBzb2x2ZXMgdGhlIHByb2JsZW0sIGJ1dCB3ZSBjYW4ndCBjb250cm9sXG4vLyAgICB3aGVuIHRoZSB0ZXh0IHdpbGwgYmUgcmVhZCBvdXQgc28gc29tZXRpbWVzIGl0IGNvbWVzIGluIHRvbyBsYXRlIG9yIG5ldmVyIGlmIHRoZSB1c2VyXG4vLyAgICBuYXZpZ2F0ZXMgcXVpY2tseS5cbi8vIDIuIGA8bWF0LW9wdGlvbiBhcmlhLWRlc2NyaWJlZGJ5PVwiZ3JvdXBMYWJlbFwiYCAtIFRoaXMgd29ya3Mgb24gU2FmYXJpLCBidXQgVm9pY2VPdmVyIGluIENocm9tZVxuLy8gICAgd29uJ3QgcmVhZCBvdXQgdGhlIGRlc2NyaXB0aW9uIGF0IGFsbC5cbi8vIDMuIGA8bWF0LW9wdGlvbiBhcmlhLWxhYmVsbGVkYnk9XCJvcHRpb25MYWJlbCBncm91cExhYmVsXCJgIC0gVGhpcyB3b3JrcyBvbiBDaHJvbWUsIGJ1dCBTYWZhcmlcbi8vICAgICBkb2Vzbid0IHJlYWQgb3V0IHRoZSB0ZXh0IGF0IGFsbC4gRnVydGhlcm1vcmUsIG9uXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0T3B0Z3JvdXAuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY29uc3QgX01hdE9wdGdyb3VwTWl4aW5CYXNlID0gbWl4aW5EaXNhYmxlZChjbGFzcyB7fSk7XG5cbi8vIENvdW50ZXIgZm9yIHVuaXF1ZSBncm91cCBpZHMuXG5sZXQgX3VuaXF1ZU9wdGdyb3VwSWRDb3VudGVyID0gMDtcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgX01hdE9wdGdyb3VwQmFzZSBleHRlbmRzIF9NYXRPcHRncm91cE1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUge1xuICAvKiogTGFiZWwgZm9yIHRoZSBvcHRpb24gZ3JvdXAuICovXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIHVuZGVybHlpbmcgbGFiZWwuICovXG4gIF9sYWJlbElkOiBzdHJpbmcgPSBgbWF0LW9wdGdyb3VwLWxhYmVsLSR7X3VuaXF1ZU9wdGdyb3VwSWRDb3VudGVyKyt9YDtcblxuICAvKiogV2hldGhlciB0aGUgZ3JvdXAgaXMgaW4gaW5lcnQgYTExeSBtb2RlLiAqL1xuICBfaW5lcnQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChNQVRfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQpIEBPcHRpb25hbCgpIHBhcmVudD86IE1hdE9wdGlvblBhcmVudENvbXBvbmVudCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faW5lcnQgPSBwYXJlbnQ/LmluZXJ0R3JvdXBzID8/IGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVmZXJlbmNlIGluc3RhbmNlcyBvZiBgTWF0T3B0Z3JvdXBgLiBJdCBzZXJ2ZXMgYXNcbiAqIGFsdGVybmF0aXZlIHRva2VuIHRvIHRoZSBhY3R1YWwgYE1hdE9wdGdyb3VwYCBjbGFzcyB3aGljaCBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBjbGFzcyBhbmQgaXRzIGNvbXBvbmVudCBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9PUFRHUk9VUCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRPcHRncm91cD4oJ01hdE9wdGdyb3VwJyk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgaXMgdXNlZCB0byBncm91cCBpbnN0YW5jZXMgb2YgYG1hdC1vcHRpb25gLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtb3B0Z3JvdXAnLFxuICBleHBvcnRBczogJ21hdE9wdGdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdvcHRncm91cC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGlucHV0czogWydkaXNhYmxlZCddLFxuICBzdHlsZVVybHM6IFsnb3B0Z3JvdXAuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1vcHRncm91cCcsXG4gICAgJ1thdHRyLnJvbGVdJzogJ19pbmVydCA/IG51bGwgOiBcImdyb3VwXCInLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdfaW5lcnQgPyBudWxsIDogZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnX2luZXJ0ID8gbnVsbCA6IF9sYWJlbElkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9PUFRHUk9VUCwgdXNlRXhpc3Rpbmc6IE1hdE9wdGdyb3VwfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE9wdGdyb3VwIGV4dGVuZHMgX01hdE9wdGdyb3VwQmFzZSB7fVxuIiwiPHNwYW5cbiAgY2xhc3M9XCJtYXQtbWRjLW9wdGdyb3VwLWxhYmVsXCJcbiAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgW2NsYXNzLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgW2lkXT1cIl9sYWJlbElkXCI+XG4gIDxzcGFuIGNsYXNzPVwibWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0XCI+e3sgbGFiZWwgfX0gPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pjwvc3Bhbj5cbjwvc3Bhbj5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWF0LW9wdGlvbiwgbmctY29udGFpbmVyXCI+PC9uZy1jb250ZW50PlxuIl19