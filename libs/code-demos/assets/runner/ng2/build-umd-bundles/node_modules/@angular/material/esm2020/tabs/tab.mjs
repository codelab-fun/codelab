/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ContentChild, Directive, Inject, InjectionToken, Input, Optional, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { MatTabContent } from './tab-content';
import { MAT_TAB, MatTabLabel } from './tab-label';
import { mixinDisabled } from '@angular/material/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
// Boilerplate for applying mixins to MatTab.
/** @docs-private */
const _MatTabMixinBase = mixinDisabled(class {
});
/**
 * Used to provide a tab group to a tab without causing a circular dependency.
 * @docs-private
 */
export const MAT_TAB_GROUP = new InjectionToken('MAT_TAB_GROUP');
/** @docs-private */
export class _MatTabBase extends _MatTabMixinBase {
    constructor(_viewContainerRef, _closestTabGroup) {
        super();
        this._viewContainerRef = _viewContainerRef;
        this._closestTabGroup = _closestTabGroup;
        /** Plain text label for the tab, used when there is no template label. */
        this.textLabel = '';
        /** Portal that will be the hosted content of the tab */
        this._contentPortal = null;
        /** Emits whenever the internal state of the tab changes. */
        this._stateChanges = new Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        this.origin = null;
        /**
         * Whether the tab is currently active.
         */
        this.isActive = false;
    }
    /** @docs-private */
    get content() {
        return this._contentPortal;
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this._stateChanges.next();
        }
    }
    ngOnDestroy() {
        this._stateChanges.complete();
    }
    ngOnInit() {
        this._contentPortal = new TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    _setTemplateLabelInput(value) {
        // Only update the label if the query managed to find one. This works around an issue where a
        // user may have manually set `templateLabel` during creation mode, which would then get
        // clobbered by `undefined` when the query resolves. Also note that we check that the closest
        // tab matches the current one so that we don't pick up labels from nested tabs.
        if (value && value._closestTab === this) {
            this._templateLabel = value;
        }
    }
}
_MatTabBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatTabBase, deps: [{ token: i0.ViewContainerRef }, { token: MAT_TAB_GROUP, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
_MatTabBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _MatTabBase, inputs: { textLabel: ["label", "textLabel"], ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], labelClass: "labelClass", bodyClass: "bodyClass" }, viewQueries: [{ propertyName: "_implicitContent", first: true, predicate: TemplateRef, descendants: true, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatTabBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_TAB_GROUP]
                }, {
                    type: Optional
                }] }]; }, propDecorators: { _implicitContent: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], textLabel: [{
                type: Input,
                args: ['label']
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], ariaLabelledby: [{
                type: Input,
                args: ['aria-labelledby']
            }], labelClass: [{
                type: Input
            }], bodyClass: [{
                type: Input
            }] } });
export class MatTab extends _MatTabBase {
    /** Content for the tab label given by `<ng-template mat-tab-label>`. */
    get templateLabel() {
        return this._templateLabel;
    }
    set templateLabel(value) {
        this._setTemplateLabelInput(value);
    }
}
MatTab.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTab, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatTab.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatTab, selector: "mat-tab", inputs: { disabled: "disabled" }, providers: [{ provide: MAT_TAB, useExisting: MatTab }], queries: [{ propertyName: "_explicitContent", first: true, predicate: MatTabContent, descendants: true, read: TemplateRef, static: true }, { propertyName: "templateLabel", first: true, predicate: MatTabLabel, descendants: true }], exportAs: ["matTab"], usesInheritance: true, ngImport: i0, template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n", changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTab, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tab', inputs: ['disabled'], changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, exportAs: 'matTab', providers: [{ provide: MAT_TAB, useExisting: MatTab }], template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n" }]
        }], propDecorators: { _explicitContent: [{
                type: ContentChild,
                args: [MatTabContent, { read: TemplateRef, static: true }]
            }], templateLabel: [{
                type: ContentChild,
                args: [MatTabLabel]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3RhYnMvdGFiLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3RhYnMvdGFiLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFJTCxRQUFRLEVBRVIsV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDakQsT0FBTyxFQUFhLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUU3Qiw2Q0FBNkM7QUFDN0Msb0JBQW9CO0FBQ3BCLE1BQU0sZ0JBQWdCLEdBQUcsYUFBYSxDQUFDO0NBQVEsQ0FBQyxDQUFDO0FBRWpEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBTSxlQUFlLENBQUMsQ0FBQztBQUV0RSxvQkFBb0I7QUFFcEIsTUFBTSxPQUFPLFdBQ1gsU0FBUSxnQkFBZ0I7SUFrRXhCLFlBQ1UsaUJBQW1DLEVBQ0QsZ0JBQXFCO1FBRS9ELEtBQUssRUFBRSxDQUFDO1FBSEEsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBSztRQXREakUsMEVBQTBFO1FBQzFELGNBQVMsR0FBVyxFQUFFLENBQUM7UUF1QnZDLHdEQUF3RDtRQUNoRCxtQkFBYyxHQUEwQixJQUFJLENBQUM7UUFPckQsNERBQTREO1FBQ25ELGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUU3Qzs7O1dBR0c7UUFDSCxhQUFRLEdBQWtCLElBQUksQ0FBQztRQUUvQjs7O1dBR0c7UUFDSCxXQUFNLEdBQWtCLElBQUksQ0FBQztRQUU3Qjs7V0FFRztRQUNILGFBQVEsR0FBRyxLQUFLLENBQUM7SUFPakIsQ0FBQztJQTlCRCxvQkFBb0I7SUFDcEIsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUE2QkQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUN0QyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQ3ZCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyxzQkFBc0IsQ0FBQyxLQUE4QjtRQUM3RCw2RkFBNkY7UUFDN0Ysd0ZBQXdGO1FBQ3hGLDZGQUE2RjtRQUM3RixnRkFBZ0Y7UUFDaEYsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs2R0F6R1UsV0FBVyxrREFxRVosYUFBYTtpR0FyRVosV0FBVyw0UUFhWCxXQUFXO2dHQWJYLFdBQVc7a0JBRHZCLFNBQVM7OzBCQXNFTCxNQUFNOzJCQUFDLGFBQWE7OzBCQUFHLFFBQVE7NENBeERNLGdCQUFnQjtzQkFBdkQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO2dCQUd0QixTQUFTO3NCQUF4QixLQUFLO3VCQUFDLE9BQU87Z0JBR08sU0FBUztzQkFBN0IsS0FBSzt1QkFBQyxZQUFZO2dCQU1PLGNBQWM7c0JBQXZDLEtBQUs7dUJBQUMsaUJBQWlCO2dCQU1mLFVBQVU7c0JBQWxCLEtBQUs7Z0JBTUcsU0FBUztzQkFBakIsS0FBSzs7QUFxRlIsTUFBTSxPQUFPLE1BQU8sU0FBUSxXQUFXO0lBT3JDLHdFQUF3RTtJQUN4RSxJQUNJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksYUFBYSxDQUFDLEtBQWtCO1FBQ2xDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDOzt3R0FkVSxNQUFNOzRGQUFOLE1BQU0sb0VBRk4sQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBQyxDQUFDLHdFQU10QyxhQUFhLDJCQUFTLFdBQVcsMkVBSWpDLFdBQVcsNkZDOUszQiwrUUFJQTtnR0RrS2EsTUFBTTtrQkFkbEIsU0FBUzsrQkFDRSxTQUFTLFVBTVgsQ0FBQyxVQUFVLENBQUMsbUJBRUgsdUJBQXVCLENBQUMsT0FBTyxpQkFDakMsaUJBQWlCLENBQUMsSUFBSSxZQUMzQixRQUFRLGFBQ1AsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxRQUFRLEVBQUMsQ0FBQzs4QkFPM0MsZ0JBQWdCO3NCQUR4QixZQUFZO3VCQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQztnQkFLMUQsYUFBYTtzQkFEaEIsWUFBWTt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0VGFiQ29udGVudH0gZnJvbSAnLi90YWItY29udGVudCc7XG5pbXBvcnQge01BVF9UQUIsIE1hdFRhYkxhYmVsfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5pbXBvcnQge0NhbkRpc2FibGUsIG1peGluRGlzYWJsZWR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtUZW1wbGF0ZVBvcnRhbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdFRhYi5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jb25zdCBfTWF0VGFiTWl4aW5CYXNlID0gbWl4aW5EaXNhYmxlZChjbGFzcyB7fSk7XG5cbi8qKlxuICogVXNlZCB0byBwcm92aWRlIGEgdGFiIGdyb3VwIHRvIGEgdGFiIHdpdGhvdXQgY2F1c2luZyBhIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfVEFCX0dST1VQID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ01BVF9UQUJfR1JPVVAnKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIF9NYXRUYWJCYXNlXG4gIGV4dGVuZHMgX01hdFRhYk1peGluQmFzZVxuICBpbXBsZW1lbnRzIENhbkRpc2FibGUsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3lcbntcbiAgLyoqIENvbnRlbnQgZm9yIHRoZSB0YWIgbGFiZWwgZ2l2ZW4gYnkgYDxuZy10ZW1wbGF0ZSBtYXQtdGFiLWxhYmVsPmAuICovXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVMYWJlbDogTWF0VGFiTGFiZWw7XG5cbiAgLyoqXG4gICAqIFRlbXBsYXRlIHByb3ZpZGVkIGluIHRoZSB0YWIgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICovXG4gIF9leHBsaWNpdENvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqIFRlbXBsYXRlIGluc2lkZSB0aGUgTWF0VGFiIHZpZXcgdGhhdCBjb250YWlucyBhbiBgPG5nLWNvbnRlbnQ+YC4gKi9cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogdHJ1ZX0pIF9pbXBsaWNpdENvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqIFBsYWluIHRleHQgbGFiZWwgZm9yIHRoZSB0YWIsIHVzZWQgd2hlbiB0aGVyZSBpcyBubyB0ZW1wbGF0ZSBsYWJlbC4gKi9cbiAgQElucHV0KCdsYWJlbCcpIHRleHRMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSB0YWIuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgdGhhdCB0aGUgdGFiIGlzIGxhYmVsbGVkIGJ5LlxuICAgKiBXaWxsIGJlIGNsZWFyZWQgaWYgYGFyaWEtbGFiZWxgIGlzIHNldCBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDbGFzc2VzIHRvIGJlIHBhc3NlZCB0byB0aGUgdGFiIGxhYmVsIGluc2lkZSB0aGUgbWF0LXRhYi1oZWFkZXIgY29udGFpbmVyLlxuICAgKiBTdXBwb3J0cyBzdHJpbmcgYW5kIHN0cmluZyBhcnJheSB2YWx1ZXMsIHNhbWUgYXMgYG5nQ2xhc3NgLlxuICAgKi9cbiAgQElucHV0KCkgbGFiZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSB0YWIgbWF0LXRhYi1ib2R5IGNvbnRhaW5lci5cbiAgICogU3VwcG9ydHMgc3RyaW5nIGFuZCBzdHJpbmcgYXJyYXkgdmFsdWVzLCBzYW1lIGFzIGBuZ0NsYXNzYC5cbiAgICovXG4gIEBJbnB1dCgpIGJvZHlDbGFzczogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLyoqIFBvcnRhbCB0aGF0IHdpbGwgYmUgdGhlIGhvc3RlZCBjb250ZW50IG9mIHRoZSB0YWIgKi9cbiAgcHJpdmF0ZSBfY29udGVudFBvcnRhbDogVGVtcGxhdGVQb3J0YWwgfCBudWxsID0gbnVsbDtcblxuICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICBnZXQgY29udGVudCgpOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50UG9ydGFsO1xuICB9XG5cbiAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgdGFiIGNoYW5nZXMuICovXG4gIHJlYWRvbmx5IF9zdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVsYXRpdmVseSBpbmRleGVkIHBvc2l0aW9uIHdoZXJlIDAgcmVwcmVzZW50cyB0aGUgY2VudGVyLCBuZWdhdGl2ZSBpcyBsZWZ0LCBhbmQgcG9zaXRpdmVcbiAgICogcmVwcmVzZW50cyB0aGUgcmlnaHQuXG4gICAqL1xuICBwb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIHJlbGF0aXZlbHkgaW5kZXggb3JpZ2luIG9mIHRoZSB0YWIgaWYgaXQgd2FzIGNyZWF0ZWQgYW5kIHNlbGVjdGVkIGFmdGVyIHRoZXJlXG4gICAqIHdhcyBhbHJlYWR5IGEgc2VsZWN0ZWQgdGFiLiBQcm92aWRlcyBjb250ZXh0IG9mIHdoYXQgcG9zaXRpb24gdGhlIHRhYiBzaG91bGQgb3JpZ2luYXRlIGZyb20uXG4gICAqL1xuICBvcmlnaW46IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSB0YWIgaXMgY3VycmVudGx5IGFjdGl2ZS5cbiAgICovXG4gIGlzQWN0aXZlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KE1BVF9UQUJfR1JPVVApIEBPcHRpb25hbCgpIHB1YmxpYyBfY2xvc2VzdFRhYkdyb3VwOiBhbnksXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3RleHRMYWJlbCcpIHx8IGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2Rpc2FibGVkJykpIHtcbiAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZW50UG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKFxuICAgICAgdGhpcy5fZXhwbGljaXRDb250ZW50IHx8IHRoaXMuX2ltcGxpY2l0Q29udGVudCxcbiAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGhhcyBiZWVuIGV4dHJhY3RlZCB0byBhIHV0aWwgYmVjYXVzZSBvZiBUUyA0IGFuZCBWRS5cbiAgICogVmlldyBFbmdpbmUgZG9lc24ndCBzdXBwb3J0IHByb3BlcnR5IHJlbmFtZSBpbmhlcml0YW5jZS5cbiAgICogVFMgNC4wIGRvZXNuJ3QgYWxsb3cgcHJvcGVydGllcyB0byBvdmVycmlkZSBhY2Nlc3NvcnMgb3IgdmljZS12ZXJzYS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9zZXRUZW1wbGF0ZUxhYmVsSW5wdXQodmFsdWU6IE1hdFRhYkxhYmVsIHwgdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSB1cGRhdGUgdGhlIGxhYmVsIGlmIHRoZSBxdWVyeSBtYW5hZ2VkIHRvIGZpbmQgb25lLiBUaGlzIHdvcmtzIGFyb3VuZCBhbiBpc3N1ZSB3aGVyZSBhXG4gICAgLy8gdXNlciBtYXkgaGF2ZSBtYW51YWxseSBzZXQgYHRlbXBsYXRlTGFiZWxgIGR1cmluZyBjcmVhdGlvbiBtb2RlLCB3aGljaCB3b3VsZCB0aGVuIGdldFxuICAgIC8vIGNsb2JiZXJlZCBieSBgdW5kZWZpbmVkYCB3aGVuIHRoZSBxdWVyeSByZXNvbHZlcy4gQWxzbyBub3RlIHRoYXQgd2UgY2hlY2sgdGhhdCB0aGUgY2xvc2VzdFxuICAgIC8vIHRhYiBtYXRjaGVzIHRoZSBjdXJyZW50IG9uZSBzbyB0aGF0IHdlIGRvbid0IHBpY2sgdXAgbGFiZWxzIGZyb20gbmVzdGVkIHRhYnMuXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLl9jbG9zZXN0VGFiID09PSB0aGlzKSB7XG4gICAgICB0aGlzLl90ZW1wbGF0ZUxhYmVsID0gdmFsdWU7XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC10YWInLFxuXG4gIC8vIE5vdGUgdGhhdCB1c3VhbGx5IHdlJ2QgZ28gdGhyb3VnaCBhIGJpdCBtb3JlIHRyb3VibGUgYW5kIHNldCB1cCBhbm90aGVyIGNsYXNzIHNvIHRoYXRcbiAgLy8gdGhlIGlubGluZWQgdGVtcGxhdGUgb2YgYE1hdFRhYmAgaXNuJ3QgZHVwbGljYXRlZCwgaG93ZXZlciB0aGUgdGVtcGxhdGUgaXMgc21hbGwgZW5vdWdoXG4gIC8vIHRoYXQgY3JlYXRpbmcgdGhlIGV4dHJhIGNsYXNzIHdpbGwgZ2VuZXJhdGUgbW9yZSBjb2RlIHRoYW4ganVzdCBkdXBsaWNhdGluZyB0aGUgdGVtcGxhdGUuXG4gIHRlbXBsYXRlVXJsOiAndGFiLmh0bWwnLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21hdFRhYicsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfVEFCLCB1c2VFeGlzdGluZzogTWF0VGFifV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYiBleHRlbmRzIF9NYXRUYWJCYXNlIHtcbiAgLyoqXG4gICAqIFRlbXBsYXRlIHByb3ZpZGVkIGluIHRoZSB0YWIgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoTWF0VGFiQ29udGVudCwge3JlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWV9KVxuICBvdmVycmlkZSBfZXhwbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKiBDb250ZW50IGZvciB0aGUgdGFiIGxhYmVsIGdpdmVuIGJ5IGA8bmctdGVtcGxhdGUgbWF0LXRhYi1sYWJlbD5gLiAqL1xuICBAQ29udGVudENoaWxkKE1hdFRhYkxhYmVsKVxuICBnZXQgdGVtcGxhdGVMYWJlbCgpOiBNYXRUYWJMYWJlbCB7XG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlTGFiZWw7XG4gIH1cbiAgc2V0IHRlbXBsYXRlTGFiZWwodmFsdWU6IE1hdFRhYkxhYmVsKSB7XG4gICAgdGhpcy5fc2V0VGVtcGxhdGVMYWJlbElucHV0KHZhbHVlKTtcbiAgfVxufVxuIiwiPCEtLSBDcmVhdGUgYSB0ZW1wbGF0ZSBmb3IgdGhlIGNvbnRlbnQgb2YgdGhlIDxtYXQtdGFiPiBzbyB0aGF0IHdlIGNhbiBncmFiIGEgcmVmZXJlbmNlIHRvIHRoaXNcbiAgICBUZW1wbGF0ZVJlZiBhbmQgdXNlIGl0IGluIGEgUG9ydGFsIHRvIHJlbmRlciB0aGUgdGFiIGNvbnRlbnQgaW4gdGhlIGFwcHJvcHJpYXRlIHBsYWNlIGluIHRoZVxuICAgIHRhYi1ncm91cC4gLS0+XG48bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+XG4iXX0=