import { CdkAccordionItem } from '@angular/cdk/accordion';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, Optional, Output, SkipSelf, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, startWith, take } from 'rxjs/operators';
import { MAT_ACCORDION } from './accordion-base';
import { matExpansionAnimations } from './expansion-animations';
import { MAT_EXPANSION_PANEL } from './expansion-panel-base';
import { MatExpansionPanelContent } from './expansion-panel-content';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/collections";
import * as i2 from "@angular/cdk/portal";
/** Counter for generating unique element ids. */
let uniqueId = 0;
/**
 * Injection token that can be used to configure the default
 * options for the expansion panel component.
 */
export const MAT_EXPANSION_PANEL_DEFAULT_OPTIONS = new InjectionToken('MAT_EXPANSION_PANEL_DEFAULT_OPTIONS');
/**
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the MatAccordion directive attached.
 */
export class MatExpansionPanel extends CdkAccordionItem {
    constructor(accordion, _changeDetectorRef, _uniqueSelectionDispatcher, _viewContainerRef, _document, _animationMode, defaultOptions) {
        super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
        this._viewContainerRef = _viewContainerRef;
        this._animationMode = _animationMode;
        this._hideToggle = false;
        /** An event emitted after the body's expansion animation happens. */
        this.afterExpand = new EventEmitter();
        /** An event emitted after the body's collapse animation happens. */
        this.afterCollapse = new EventEmitter();
        /** Stream that emits for changes in `@Input` properties. */
        this._inputChanges = new Subject();
        /** ID for the associated header element. Used for a11y labelling. */
        this._headerId = `mat-expansion-panel-header-${uniqueId++}`;
        /** Stream of body animation done events. */
        this._bodyAnimationDone = new Subject();
        this.accordion = accordion;
        this._document = _document;
        // We need a Subject with distinctUntilChanged, because the `done` event
        // fires twice on some browsers. See https://github.com/angular/angular/issues/24084
        this._bodyAnimationDone
            .pipe(distinctUntilChanged((x, y) => {
            return x.fromState === y.fromState && x.toState === y.toState;
        }))
            .subscribe(event => {
            if (event.fromState !== 'void') {
                if (event.toState === 'expanded') {
                    this.afterExpand.emit();
                }
                else if (event.toState === 'collapsed') {
                    this.afterCollapse.emit();
                }
            }
        });
        if (defaultOptions) {
            this.hideToggle = defaultOptions.hideToggle;
        }
    }
    /** Whether the toggle indicator should be hidden. */
    get hideToggle() {
        return this._hideToggle || (this.accordion && this.accordion.hideToggle);
    }
    set hideToggle(value) {
        this._hideToggle = coerceBooleanProperty(value);
    }
    /** The position of the expansion indicator. */
    get togglePosition() {
        return this._togglePosition || (this.accordion && this.accordion.togglePosition);
    }
    set togglePosition(value) {
        this._togglePosition = value;
    }
    /** Determines whether the expansion panel should have spacing between it and its siblings. */
    _hasSpacing() {
        if (this.accordion) {
            return this.expanded && this.accordion.displayMode === 'default';
        }
        return false;
    }
    /** Gets the expanded state string. */
    _getExpandedState() {
        return this.expanded ? 'expanded' : 'collapsed';
    }
    /** Toggles the expanded state of the expansion panel. */
    toggle() {
        this.expanded = !this.expanded;
    }
    /** Sets the expanded state of the expansion panel to false. */
    close() {
        this.expanded = false;
    }
    /** Sets the expanded state of the expansion panel to true. */
    open() {
        this.expanded = true;
    }
    ngAfterContentInit() {
        if (this._lazyContent && this._lazyContent._expansionPanel === this) {
            // Render the content as soon as the panel becomes open.
            this.opened
                .pipe(startWith(null), filter(() => this.expanded && !this._portal), take(1))
                .subscribe(() => {
                this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
            });
        }
    }
    ngOnChanges(changes) {
        this._inputChanges.next(changes);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._bodyAnimationDone.complete();
        this._inputChanges.complete();
    }
    /** Checks whether the expansion panel's content contains the currently-focused element. */
    _containsFocus() {
        if (this._body) {
            const focusedElement = this._document.activeElement;
            const bodyElement = this._body.nativeElement;
            return focusedElement === bodyElement || bodyElement.contains(focusedElement);
        }
        return false;
    }
}
MatExpansionPanel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatExpansionPanel, deps: [{ token: MAT_ACCORDION, optional: true, skipSelf: true }, { token: i0.ChangeDetectorRef }, { token: i1.UniqueSelectionDispatcher }, { token: i0.ViewContainerRef }, { token: DOCUMENT }, { token: ANIMATION_MODULE_TYPE, optional: true }, { token: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatExpansionPanel.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatExpansionPanel, selector: "mat-expansion-panel", inputs: { disabled: "disabled", expanded: "expanded", hideToggle: "hideToggle", togglePosition: "togglePosition" }, outputs: { opened: "opened", closed: "closed", expandedChange: "expandedChange", afterExpand: "afterExpand", afterCollapse: "afterCollapse" }, host: { properties: { "class.mat-expanded": "expanded", "class._mat-animation-noopable": "_animationMode === \"NoopAnimations\"", "class.mat-expansion-panel-spacing": "_hasSpacing()" }, classAttribute: "mat-expansion-panel" }, providers: [
        // Provide MatAccordion as undefined to prevent nested expansion panels from registering
        // to the same accordion.
        { provide: MAT_ACCORDION, useValue: undefined },
        { provide: MAT_EXPANSION_PANEL, useExisting: MatExpansionPanel },
    ], queries: [{ propertyName: "_lazyContent", first: true, predicate: MatExpansionPanelContent, descendants: true }], viewQueries: [{ propertyName: "_body", first: true, predicate: ["body"], descendants: true }], exportAs: ["matExpansionPanel"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-content select=\"mat-expansion-panel-header\"></ng-content>\n<div class=\"mat-expansion-panel-content\"\n     role=\"region\"\n     [@bodyExpansion]=\"_getExpandedState()\"\n     (@bodyExpansion.done)=\"_bodyAnimationDone.next($event)\"\n     [attr.aria-labelledby]=\"_headerId\"\n     [id]=\"id\"\n     #body>\n  <div class=\"mat-expansion-panel-body\">\n    <ng-content></ng-content>\n    <ng-template [cdkPortalOutlet]=\"_portal\"></ng-template>\n  </div>\n  <ng-content select=\"mat-action-row\"></ng-content>\n</div>\n", styles: [".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.mat-expansion-panel-content[style*=\"visibility: hidden\"] *{visibility:hidden !important}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}"], dependencies: [{ kind: "directive", type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [matExpansionAnimations.bodyExpansion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatExpansionPanel, decorators: [{
            type: Component,
            args: [{ selector: 'mat-expansion-panel', exportAs: 'matExpansionPanel', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['disabled', 'expanded'], outputs: ['opened', 'closed', 'expandedChange'], animations: [matExpansionAnimations.bodyExpansion], providers: [
                        // Provide MatAccordion as undefined to prevent nested expansion panels from registering
                        // to the same accordion.
                        { provide: MAT_ACCORDION, useValue: undefined },
                        { provide: MAT_EXPANSION_PANEL, useExisting: MatExpansionPanel },
                    ], host: {
                        'class': 'mat-expansion-panel',
                        '[class.mat-expanded]': 'expanded',
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                        '[class.mat-expansion-panel-spacing]': '_hasSpacing()',
                    }, template: "<ng-content select=\"mat-expansion-panel-header\"></ng-content>\n<div class=\"mat-expansion-panel-content\"\n     role=\"region\"\n     [@bodyExpansion]=\"_getExpandedState()\"\n     (@bodyExpansion.done)=\"_bodyAnimationDone.next($event)\"\n     [attr.aria-labelledby]=\"_headerId\"\n     [id]=\"id\"\n     #body>\n  <div class=\"mat-expansion-panel-body\">\n    <ng-content></ng-content>\n    <ng-template [cdkPortalOutlet]=\"_portal\"></ng-template>\n  </div>\n  <ng-content select=\"mat-action-row\"></ng-content>\n</div>\n", styles: [".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.mat-expansion-panel-content[style*=\"visibility: hidden\"] *{visibility:hidden !important}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }, {
                    type: Inject,
                    args: [MAT_ACCORDION]
                }] }, { type: i0.ChangeDetectorRef }, { type: i1.UniqueSelectionDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_EXPANSION_PANEL_DEFAULT_OPTIONS]
                }, {
                    type: Optional
                }] }]; }, propDecorators: { hideToggle: [{
                type: Input
            }], togglePosition: [{
                type: Input
            }], afterExpand: [{
                type: Output
            }], afterCollapse: [{
                type: Output
            }], _lazyContent: [{
                type: ContentChild,
                args: [MatExpansionPanelContent]
            }], _body: [{
                type: ViewChild,
                args: ['body']
            }] } });
/**
 * Actions of a `<mat-expansion-panel>`.
 */
export class MatExpansionPanelActionRow {
}
MatExpansionPanelActionRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatExpansionPanelActionRow, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatExpansionPanelActionRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatExpansionPanelActionRow, selector: "mat-action-row", host: { classAttribute: "mat-action-row" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatExpansionPanelActionRow, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-action-row',
                    host: {
                        class: 'mat-action-row',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2V4cGFuc2lvbi9leHBhbnNpb24tcGFuZWwudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZXhwYW5zaW9uL2V4cGFuc2lvbi1wYW5lbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFFBQVEsRUFDUixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdFLE9BQU8sRUFBK0MsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDN0YsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FB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QWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDZGtBY2NvcmRpb25JdGVtfSBmcm9tICdAYW5ndWxhci9jZGsvYWNjb3JkaW9uJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1VuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1RlbXBsYXRlUG9ydGFsfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBTa2lwU2VsZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIHN0YXJ0V2l0aCwgdGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRBY2NvcmRpb25CYXNlLCBNYXRBY2NvcmRpb25Ub2dnbGVQb3NpdGlvbiwgTUFUX0FDQ09SRElPTn0gZnJvbSAnLi9hY2NvcmRpb24tYmFzZSc7XG5pbXBvcnQge21hdEV4cGFuc2lvbkFuaW1hdGlvbnN9IGZyb20gJy4vZXhwYW5zaW9uLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHtNQVRfRVhQQU5TSU9OX1BBTkVMfSBmcm9tICcuL2V4cGFuc2lvbi1wYW5lbC1iYXNlJztcbmltcG9ydCB7TWF0RXhwYW5zaW9uUGFuZWxDb250ZW50fSBmcm9tICcuL2V4cGFuc2lvbi1wYW5lbC1jb250ZW50JztcblxuLyoqIE1hdEV4cGFuc2lvblBhbmVsJ3Mgc3RhdGVzLiAqL1xuZXhwb3J0IHR5cGUgTWF0RXhwYW5zaW9uUGFuZWxTdGF0ZSA9ICdleHBhbmRlZCcgfCAnY29sbGFwc2VkJztcblxuLyoqIENvdW50ZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGVsZW1lbnQgaWRzLiAqL1xubGV0IHVuaXF1ZUlkID0gMDtcblxuLyoqXG4gKiBPYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zXG4gKiBmb3IgYWxsIG9mIHRoZSBleHBhbnNpb24gcGFuZWxzIGluIGEgbW9kdWxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdEV4cGFuc2lvblBhbmVsRGVmYXVsdE9wdGlvbnMge1xuICAvKiogSGVpZ2h0IG9mIHRoZSBoZWFkZXIgd2hpbGUgdGhlIHBhbmVsIGlzIGV4cGFuZGVkLiAqL1xuICBleHBhbmRlZEhlaWdodDogc3RyaW5nO1xuXG4gIC8qKiBIZWlnaHQgb2YgdGhlIGhlYWRlciB3aGlsZSB0aGUgcGFuZWwgaXMgY29sbGFwc2VkLiAqL1xuICBjb2xsYXBzZWRIZWlnaHQ6IHN0cmluZztcblxuICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGluZGljYXRvciBzaG91bGQgYmUgaGlkZGVuLiAqL1xuICBoaWRlVG9nZ2xlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgZGVmYXVsdFxuICogb3B0aW9ucyBmb3IgdGhlIGV4cGFuc2lvbiBwYW5lbCBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfRVhQQU5TSU9OX1BBTkVMX0RFRkFVTFRfT1BUSU9OUyA9XG4gIG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRFeHBhbnNpb25QYW5lbERlZmF1bHRPcHRpb25zPignTUFUX0VYUEFOU0lPTl9QQU5FTF9ERUZBVUxUX09QVElPTlMnKTtcblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBjYW4gYmUgdXNlZCBhcyBhIHNpbmdsZSBlbGVtZW50IHRvIHNob3cgZXhwYW5kYWJsZSBjb250ZW50LCBvciBhcyBvbmUgb2ZcbiAqIG11bHRpcGxlIGNoaWxkcmVuIG9mIGFuIGVsZW1lbnQgd2l0aCB0aGUgTWF0QWNjb3JkaW9uIGRpcmVjdGl2ZSBhdHRhY2hlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHN0eWxlVXJsczogWydleHBhbnNpb24tcGFuZWwuY3NzJ10sXG4gIHNlbGVjdG9yOiAnbWF0LWV4cGFuc2lvbi1wYW5lbCcsXG4gIGV4cG9ydEFzOiAnbWF0RXhwYW5zaW9uUGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJ2V4cGFuc2lvbi1wYW5lbC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICdleHBhbmRlZCddLFxuICBvdXRwdXRzOiBbJ29wZW5lZCcsICdjbG9zZWQnLCAnZXhwYW5kZWRDaGFuZ2UnXSxcbiAgYW5pbWF0aW9uczogW21hdEV4cGFuc2lvbkFuaW1hdGlvbnMuYm9keUV4cGFuc2lvbl0sXG4gIHByb3ZpZGVyczogW1xuICAgIC8vIFByb3ZpZGUgTWF0QWNjb3JkaW9uIGFzIHVuZGVmaW5lZCB0byBwcmV2ZW50IG5lc3RlZCBleHBhbnNpb24gcGFuZWxzIGZyb20gcmVnaXN0ZXJpbmdcbiAgICAvLyB0byB0aGUgc2FtZSBhY2NvcmRpb24uXG4gICAge3Byb3ZpZGU6IE1BVF9BQ0NPUkRJT04sIHVzZVZhbHVlOiB1bmRlZmluZWR9LFxuICAgIHtwcm92aWRlOiBNQVRfRVhQQU5TSU9OX1BBTkVMLCB1c2VFeGlzdGluZzogTWF0RXhwYW5zaW9uUGFuZWx9LFxuICBdLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1leHBhbnNpb24tcGFuZWwnLFxuICAgICdbY2xhc3MubWF0LWV4cGFuZGVkXSc6ICdleHBhbmRlZCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gICAgJ1tjbGFzcy5tYXQtZXhwYW5zaW9uLXBhbmVsLXNwYWNpbmddJzogJ19oYXNTcGFjaW5nKCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFeHBhbnNpb25QYW5lbFxuICBleHRlbmRzIENka0FjY29yZGlvbkl0ZW1cbiAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveVxue1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG4gIHByaXZhdGUgX2hpZGVUb2dnbGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdG9nZ2xlUG9zaXRpb246IE1hdEFjY29yZGlvblRvZ2dsZVBvc2l0aW9uO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgaW5kaWNhdG9yIHNob3VsZCBiZSBoaWRkZW4uICovXG4gIEBJbnB1dCgpXG4gIGdldCBoaWRlVG9nZ2xlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlVG9nZ2xlIHx8ICh0aGlzLmFjY29yZGlvbiAmJiB0aGlzLmFjY29yZGlvbi5oaWRlVG9nZ2xlKTtcbiAgfVxuICBzZXQgaGlkZVRvZ2dsZSh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5faGlkZVRvZ2dsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKiogVGhlIHBvc2l0aW9uIG9mIHRoZSBleHBhbnNpb24gaW5kaWNhdG9yLiAqL1xuICBASW5wdXQoKVxuICBnZXQgdG9nZ2xlUG9zaXRpb24oKTogTWF0QWNjb3JkaW9uVG9nZ2xlUG9zaXRpb24ge1xuICAgIHJldHVybiB0aGlzLl90b2dnbGVQb3NpdGlvbiB8fCAodGhpcy5hY2NvcmRpb24gJiYgdGhpcy5hY2NvcmRpb24udG9nZ2xlUG9zaXRpb24pO1xuICB9XG4gIHNldCB0b2dnbGVQb3NpdGlvbih2YWx1ZTogTWF0QWNjb3JkaW9uVG9nZ2xlUG9zaXRpb24pIHtcbiAgICB0aGlzLl90b2dnbGVQb3NpdGlvbiA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIEFuIGV2ZW50IGVtaXR0ZWQgYWZ0ZXIgdGhlIGJvZHkncyBleHBhbnNpb24gYW5pbWF0aW9uIGhhcHBlbnMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBhZnRlckV4cGFuZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogQW4gZXZlbnQgZW1pdHRlZCBhZnRlciB0aGUgYm9keSdzIGNvbGxhcHNlIGFuaW1hdGlvbiBoYXBwZW5zLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgYWZ0ZXJDb2xsYXBzZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgZm9yIGNoYW5nZXMgaW4gYEBJbnB1dGAgcHJvcGVydGllcy4gKi9cbiAgcmVhZG9ubHkgX2lucHV0Q2hhbmdlcyA9IG5ldyBTdWJqZWN0PFNpbXBsZUNoYW5nZXM+KCk7XG5cbiAgLyoqIE9wdGlvbmFsbHkgZGVmaW5lZCBhY2NvcmRpb24gdGhlIGV4cGFuc2lvbiBwYW5lbCBiZWxvbmdzIHRvLiAqL1xuICBvdmVycmlkZSBhY2NvcmRpb246IE1hdEFjY29yZGlvbkJhc2U7XG5cbiAgLyoqIENvbnRlbnQgdGhhdCB3aWxsIGJlIHJlbmRlcmVkIGxhemlseS4gKi9cbiAgQENvbnRlbnRDaGlsZChNYXRFeHBhbnNpb25QYW5lbENvbnRlbnQpIF9sYXp5Q29udGVudDogTWF0RXhwYW5zaW9uUGFuZWxDb250ZW50O1xuXG4gIC8qKiBFbGVtZW50IGNvbnRhaW5pbmcgdGhlIHBhbmVsJ3MgdXNlci1wcm92aWRlZCBjb250ZW50LiAqL1xuICBAVmlld0NoaWxkKCdib2R5JykgX2JvZHk6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBQb3J0YWwgaG9sZGluZyB0aGUgdXNlcidzIGNvbnRlbnQuICovXG4gIF9wb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuXG4gIC8qKiBJRCBmb3IgdGhlIGFzc29jaWF0ZWQgaGVhZGVyIGVsZW1lbnQuIFVzZWQgZm9yIGExMXkgbGFiZWxsaW5nLiAqL1xuICBfaGVhZGVySWQgPSBgbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItJHt1bmlxdWVJZCsrfWA7XG5cbiAgLyoqIFN0cmVhbSBvZiBib2R5IGFuaW1hdGlvbiBkb25lIGV2ZW50cy4gKi9cbiAgcmVhZG9ubHkgX2JvZHlBbmltYXRpb25Eb25lID0gbmV3IFN1YmplY3Q8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgQEluamVjdChNQVRfQUNDT1JESU9OKSBhY2NvcmRpb246IE1hdEFjY29yZGlvbkJhc2UsXG4gICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBfdW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlcjogVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlcixcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgX2FuaW1hdGlvbk1vZGU6IHN0cmluZyxcbiAgICBASW5qZWN0KE1BVF9FWFBBTlNJT05fUEFORUxfREVGQVVMVF9PUFRJT05TKVxuICAgIEBPcHRpb25hbCgpXG4gICAgZGVmYXVsdE9wdGlvbnM/OiBNYXRFeHBhbnNpb25QYW5lbERlZmF1bHRPcHRpb25zLFxuICApIHtcbiAgICBzdXBlcihhY2NvcmRpb24sIF9jaGFuZ2VEZXRlY3RvclJlZiwgX3VuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIpO1xuICAgIHRoaXMuYWNjb3JkaW9uID0gYWNjb3JkaW9uO1xuICAgIHRoaXMuX2RvY3VtZW50ID0gX2RvY3VtZW50O1xuXG4gICAgLy8gV2UgbmVlZCBhIFN1YmplY3Qgd2l0aCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgYmVjYXVzZSB0aGUgYGRvbmVgIGV2ZW50XG4gICAgLy8gZmlyZXMgdHdpY2Ugb24gc29tZSBicm93c2Vycy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI0MDg0XG4gICAgdGhpcy5fYm9keUFuaW1hdGlvbkRvbmVcbiAgICAgIC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoeCwgeSkgPT4ge1xuICAgICAgICAgIHJldHVybiB4LmZyb21TdGF0ZSA9PT0geS5mcm9tU3RhdGUgJiYgeC50b1N0YXRlID09PSB5LnRvU3RhdGU7XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5mcm9tU3RhdGUgIT09ICd2b2lkJykge1xuICAgICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnZXhwYW5kZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmFmdGVyRXhwYW5kLmVtaXQoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdjb2xsYXBzZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmFmdGVyQ29sbGFwc2UuZW1pdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBpZiAoZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgIHRoaXMuaGlkZVRvZ2dsZSA9IGRlZmF1bHRPcHRpb25zLmhpZGVUb2dnbGU7XG4gICAgfVxuICB9XG5cbiAgLyoqIERldGVybWluZXMgd2hldGhlciB0aGUgZXhwYW5zaW9uIHBhbmVsIHNob3VsZCBoYXZlIHNwYWNpbmcgYmV0d2VlbiBpdCBhbmQgaXRzIHNpYmxpbmdzLiAqL1xuICBfaGFzU3BhY2luZygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5hY2NvcmRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkICYmIHRoaXMuYWNjb3JkaW9uLmRpc3BsYXlNb2RlID09PSAnZGVmYXVsdCc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBleHBhbmRlZCBzdGF0ZSBzdHJpbmcuICovXG4gIF9nZXRFeHBhbmRlZFN0YXRlKCk6IE1hdEV4cGFuc2lvblBhbmVsU3RhdGUge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID8gJ2V4cGFuZGVkJyA6ICdjb2xsYXBzZWQnO1xuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIGV4cGFuZGVkIHN0YXRlIG9mIHRoZSBleHBhbnNpb24gcGFuZWwuICovXG4gIG92ZXJyaWRlIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZXhwYW5kZWQgc3RhdGUgb2YgdGhlIGV4cGFuc2lvbiBwYW5lbCB0byBmYWxzZS4gKi9cbiAgb3ZlcnJpZGUgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIGV4cGFuZGVkIHN0YXRlIG9mIHRoZSBleHBhbnNpb24gcGFuZWwgdG8gdHJ1ZS4gKi9cbiAgb3ZlcnJpZGUgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5fbGF6eUNvbnRlbnQgJiYgdGhpcy5fbGF6eUNvbnRlbnQuX2V4cGFuc2lvblBhbmVsID09PSB0aGlzKSB7XG4gICAgICAvLyBSZW5kZXIgdGhlIGNvbnRlbnQgYXMgc29vbiBhcyB0aGUgcGFuZWwgYmVjb21lcyBvcGVuLlxuICAgICAgdGhpcy5vcGVuZWRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmV4cGFuZGVkICYmICF0aGlzLl9wb3J0YWwpLFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuX2xhenlDb250ZW50Ll90ZW1wbGF0ZSwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLl9pbnB1dENoYW5nZXMubmV4dChjaGFuZ2VzKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fYm9keUFuaW1hdGlvbkRvbmUuY29tcGxldGUoKTtcbiAgICB0aGlzLl9pbnB1dENoYW5nZXMuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgZXhwYW5zaW9uIHBhbmVsJ3MgY29udGVudCBjb250YWlucyB0aGUgY3VycmVudGx5LWZvY3VzZWQgZWxlbWVudC4gKi9cbiAgX2NvbnRhaW5zRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2JvZHkpIHtcbiAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGJvZHlFbGVtZW50ID0gdGhpcy5fYm9keS5uYXRpdmVFbGVtZW50O1xuICAgICAgcmV0dXJuIGZvY3VzZWRFbGVtZW50ID09PSBib2R5RWxlbWVudCB8fCBib2R5RWxlbWVudC5jb250YWlucyhmb2N1c2VkRWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogQWN0aW9ucyBvZiBhIGA8bWF0LWV4cGFuc2lvbi1wYW5lbD5gLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtYWN0aW9uLXJvdycsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ21hdC1hY3Rpb24tcm93JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RXhwYW5zaW9uUGFuZWxBY3Rpb25Sb3cge31cbiIsIjxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuPGRpdiBjbGFzcz1cIm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudFwiXG4gICAgIHJvbGU9XCJyZWdpb25cIlxuICAgICBbQGJvZHlFeHBhbnNpb25dPVwiX2dldEV4cGFuZGVkU3RhdGUoKVwiXG4gICAgIChAYm9keUV4cGFuc2lvbi5kb25lKT1cIl9ib2R5QW5pbWF0aW9uRG9uZS5uZXh0KCRldmVudClcIlxuICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiX2hlYWRlcklkXCJcbiAgICAgW2lkXT1cImlkXCJcbiAgICAgI2JvZHk+XG4gIDxkaXYgY2xhc3M9XCJtYXQtZXhwYW5zaW9uLXBhbmVsLWJvZHlcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLXRlbXBsYXRlIFtjZGtQb3J0YWxPdXRsZXRdPVwiX3BvcnRhbFwiPjwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJtYXQtYWN0aW9uLXJvd1wiPjwvbmctY29udGVudD5cbjwvZGl2PlxuIl19