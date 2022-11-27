/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { matTabsAnimations } from './tabs-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
export class MatTabBodyPortal extends CdkPortalOutlet {
    constructor(componentFactoryResolver, viewContainerRef, _host, _document) {
        super(componentFactoryResolver, viewContainerRef, _document);
        this._host = _host;
        /** Subscription to events for when the tab body begins centering. */
        this._centeringSub = Subscription.EMPTY;
        /** Subscription to events for when the tab body finishes leaving from center position. */
        this._leavingSub = Subscription.EMPTY;
    }
    /** Set initial visibility or set up subscription for changing visibility. */
    ngOnInit() {
        super.ngOnInit();
        this._centeringSub = this._host._beforeCentering
            .pipe(startWith(this._host._isCenterPosition(this._host._position)))
            .subscribe((isCentering) => {
            if (isCentering && !this.hasAttached()) {
                this.attach(this._host._content);
            }
        });
        this._leavingSub = this._host._afterLeavingCenter.subscribe(() => {
            if (!this._host.preserveContent) {
                this.detach();
            }
        });
    }
    /** Clean up centering subscription. */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._centeringSub.unsubscribe();
        this._leavingSub.unsubscribe();
    }
}
MatTabBodyPortal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTabBodyPortal, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ViewContainerRef }, { token: forwardRef(() => MatTabBody) }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatTabBodyPortal.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatTabBodyPortal, selector: "[matTabBodyHost]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTabBodyPortal, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTabBodyHost]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ViewContainerRef }, { type: MatTabBody, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MatTabBody)]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
/**
 * Base class with all of the `MatTabBody` functionality.
 * @docs-private
 */
export class _MatTabBodyBase {
    constructor(_elementRef, _dir, changeDetectorRef) {
        this._elementRef = _elementRef;
        this._dir = _dir;
        /** Subscription to the directionality change observable. */
        this._dirChangeSubscription = Subscription.EMPTY;
        /** Emits when an animation on the tab is complete. */
        this._translateTabComplete = new Subject();
        /** Event emitted when the tab begins to animate towards the center as the active tab. */
        this._onCentering = new EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this._beforeCentering = new EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this._afterLeavingCenter = new EventEmitter();
        /** Event emitted when the tab completes its animation towards the center. */
        this._onCentered = new EventEmitter(true);
        // Note that the default value will always be overwritten by `MatTabBody`, but we need one
        // anyway to prevent the animations module from throwing an error if the body is used on its own.
        /** Duration for the tab's animation. */
        this.animationDuration = '500ms';
        /** Whether the tab's content should be kept in the DOM while it's off-screen. */
        this.preserveContent = false;
        if (_dir) {
            this._dirChangeSubscription = _dir.change.subscribe((dir) => {
                this._computePositionAnimationState(dir);
                changeDetectorRef.markForCheck();
            });
        }
        // Ensure that we get unique animation events, because the `.done` callback can get
        // invoked twice in some browsers. See https://github.com/angular/angular/issues/24084.
        this._translateTabComplete
            .pipe(distinctUntilChanged((x, y) => {
            return x.fromState === y.fromState && x.toState === y.toState;
        }))
            .subscribe(event => {
            // If the transition to the center is complete, emit an event.
            if (this._isCenterPosition(event.toState) && this._isCenterPosition(this._position)) {
                this._onCentered.emit();
            }
            if (this._isCenterPosition(event.fromState) && !this._isCenterPosition(this._position)) {
                this._afterLeavingCenter.emit();
            }
        });
    }
    /** The shifted index position of the tab body, where zero represents the active center tab. */
    set position(position) {
        this._positionIndex = position;
        this._computePositionAnimationState();
    }
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     */
    ngOnInit() {
        if (this._position == 'center' && this.origin != null) {
            this._position = this._computePositionFromOrigin(this.origin);
        }
    }
    ngOnDestroy() {
        this._dirChangeSubscription.unsubscribe();
        this._translateTabComplete.complete();
    }
    _onTranslateTabStarted(event) {
        const isCentering = this._isCenterPosition(event.toState);
        this._beforeCentering.emit(isCentering);
        if (isCentering) {
            this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    }
    /** The text direction of the containing app. */
    _getLayoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /** Whether the provided position state is considered center, regardless of origin. */
    _isCenterPosition(position) {
        return (position == 'center' || position == 'left-origin-center' || position == 'right-origin-center');
    }
    /** Computes the position state that will be used for the tab-body animation trigger. */
    _computePositionAnimationState(dir = this._getLayoutDirection()) {
        if (this._positionIndex < 0) {
            this._position = dir == 'ltr' ? 'left' : 'right';
        }
        else if (this._positionIndex > 0) {
            this._position = dir == 'ltr' ? 'right' : 'left';
        }
        else {
            this._position = 'center';
        }
    }
    /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     */
    _computePositionFromOrigin(origin) {
        const dir = this._getLayoutDirection();
        if ((dir == 'ltr' && origin <= 0) || (dir == 'rtl' && origin > 0)) {
            return 'left-origin-center';
        }
        return 'right-origin-center';
    }
}
_MatTabBodyBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatTabBodyBase, deps: [{ token: i0.ElementRef }, { token: i1.Directionality, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
_MatTabBodyBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _MatTabBodyBase, inputs: { _content: ["content", "_content"], origin: "origin", animationDuration: "animationDuration", preserveContent: "preserveContent", position: "position" }, outputs: { _onCentering: "_onCentering", _beforeCentering: "_beforeCentering", _afterLeavingCenter: "_afterLeavingCenter", _onCentered: "_onCentered" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatTabBodyBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _onCentering: [{
                type: Output
            }], _beforeCentering: [{
                type: Output
            }], _afterLeavingCenter: [{
                type: Output
            }], _onCentered: [{
                type: Output
            }], _content: [{
                type: Input,
                args: ['content']
            }], origin: [{
                type: Input
            }], animationDuration: [{
                type: Input
            }], preserveContent: [{
                type: Input
            }], position: [{
                type: Input
            }] } });
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
export class MatTabBody extends _MatTabBodyBase {
    constructor(elementRef, dir, changeDetectorRef) {
        super(elementRef, dir, changeDetectorRef);
    }
}
MatTabBody.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTabBody, deps: [{ token: i0.ElementRef }, { token: i1.Directionality, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MatTabBody.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatTabBody, selector: "mat-tab-body", host: { classAttribute: "mat-mdc-tab-body" }, viewQueries: [{ propertyName: "_portalHost", first: true, predicate: CdkPortalOutlet, descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"mat-mdc-tab-body-content\" #content\n     [@translateTab]=\"{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"_onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"_translateTabComplete.next($event)\"\n     cdkScrollable>\n  <ng-template matTabBodyHost></ng-template>\n</div>\n", styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-mdc-tab-body-content[style*=\"visibility: hidden\"]{display:none}"], dependencies: [{ kind: "directive", type: MatTabBodyPortal, selector: "[matTabBodyHost]" }], animations: [matTabsAnimations.translateTab], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTabBody, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tab-body', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.Default, animations: [matTabsAnimations.translateTab], host: {
                        'class': 'mat-mdc-tab-body',
                    }, template: "<div class=\"mat-mdc-tab-body-content\" #content\n     [@translateTab]=\"{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"_onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"_translateTabComplete.next($event)\"\n     cdkScrollable>\n  <ng-template matTabBodyHost></ng-template>\n</div>\n", styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-mdc-tab-body-content[style*=\"visibility: hidden\"]{display:none}"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _portalHost: [{
                type: ViewChild,
                args: [CdkPortalOutlet]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvdGFicy90YWItYm9keS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC90YWJzL3RhYi1ib2R5Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxlQUFlLEVBQUUsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDcEUsT0FBTyxFQUFZLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7OztBQUVwRDs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZUFBZTtJQU1uRCxZQUNFLHdCQUFrRCxFQUNsRCxnQkFBa0MsRUFDWSxLQUFpQixFQUM3QyxTQUFjO1FBRWhDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUhmLFVBQUssR0FBTCxLQUFLLENBQVk7UUFSakUscUVBQXFFO1FBQzdELGtCQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMzQywwRkFBMEY7UUFDbEYsZ0JBQVcsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBU3pDLENBQUM7SUFFRCw2RUFBNkU7SUFDcEUsUUFBUTtRQUNmLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO2FBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDbkUsU0FBUyxDQUFDLENBQUMsV0FBb0IsRUFBRSxFQUFFO1lBQ2xDLElBQUksV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx1Q0FBdUM7SUFDOUIsV0FBVztRQUNsQixLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7O2tIQXZDVSxnQkFBZ0IsMEZBU2pCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFDNUIsUUFBUTtzR0FWUCxnQkFBZ0I7Z0dBQWhCLGdCQUFnQjtrQkFINUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2lCQUM3Qjs7MEJBVUksTUFBTTsyQkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDOzswQkFDbkMsTUFBTTsyQkFBQyxRQUFROztBQWlEcEI7OztHQUdHO0FBRUgsTUFBTSxPQUFnQixlQUFlO0lBaURuQyxZQUNVLFdBQW9DLEVBQ3hCLElBQW9CLEVBQ3hDLGlCQUFvQztRQUY1QixnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUEvQzFDLDREQUE0RDtRQUNwRCwyQkFBc0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBS3BELHNEQUFzRDtRQUM3QywwQkFBcUIsR0FBRyxJQUFJLE9BQU8sRUFBa0IsQ0FBQztRQUUvRCx5RkFBeUY7UUFDdEUsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVuRiw0REFBNEQ7UUFDekMscUJBQWdCLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFFekYsNERBQTREO1FBQ3pDLHdCQUFtQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXRGLDZFQUE2RTtRQUMxRCxnQkFBVyxHQUF1QixJQUFJLFlBQVksQ0FBTyxJQUFJLENBQUMsQ0FBQztRQVdsRiwwRkFBMEY7UUFDMUYsaUdBQWlHO1FBQ2pHLHdDQUF3QztRQUMvQixzQkFBaUIsR0FBVyxPQUFPLENBQUM7UUFFN0MsaUZBQWlGO1FBQ3hFLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBY3hDLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBYyxFQUFFLEVBQUU7Z0JBQ3JFLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELG1GQUFtRjtRQUNuRix1RkFBdUY7UUFDdkYsSUFBSSxDQUFDLHFCQUFxQjthQUN2QixJQUFJLENBQ0gsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsT0FBTyxDQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLDhEQUE4RDtZQUM5RCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDbkYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QjtZQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3RGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJDRCwrRkFBK0Y7SUFDL0YsSUFDSSxRQUFRLENBQUMsUUFBZ0I7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQWtDRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0Q7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELHNCQUFzQixDQUFDLEtBQXFCO1FBQzFDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztJQUVELGdEQUFnRDtJQUNoRCxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDaEUsQ0FBQztJQUVELHNGQUFzRjtJQUN0RixpQkFBaUIsQ0FBQyxRQUEwQztRQUMxRCxPQUFPLENBQ0wsUUFBUSxJQUFJLFFBQVEsSUFBSSxRQUFRLElBQUksb0JBQW9CLElBQUksUUFBUSxJQUFJLHFCQUFxQixDQUM5RixDQUFDO0lBQ0osQ0FBQztJQUVELHdGQUF3RjtJQUNoRiw4QkFBOEIsQ0FBQyxNQUFpQixJQUFJLENBQUMsbUJBQW1CLEVBQUU7UUFDaEYsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQ2xEO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ2xEO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSywwQkFBMEIsQ0FBQyxNQUFjO1FBQy9DLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXZDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2pFLE9BQU8sb0JBQW9CLENBQUM7U0FDN0I7UUFFRCxPQUFPLHFCQUFxQixDQUFDO0lBQy9CLENBQUM7O2lIQTNJbUIsZUFBZTtxR0FBZixlQUFlO2dHQUFmLGVBQWU7a0JBRHBDLFNBQVM7OzBCQW9ETCxRQUFROzRFQXJDUSxZQUFZO3NCQUE5QixNQUFNO2dCQUdZLGdCQUFnQjtzQkFBbEMsTUFBTTtnQkFHWSxtQkFBbUI7c0JBQXJDLE1BQU07Z0JBR1ksV0FBVztzQkFBN0IsTUFBTTtnQkFNVyxRQUFRO3NCQUF6QixLQUFLO3VCQUFDLFNBQVM7Z0JBR1AsTUFBTTtzQkFBZCxLQUFLO2dCQUtHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFHRyxlQUFlO3NCQUF2QixLQUFLO2dCQUlGLFFBQVE7c0JBRFgsS0FBSzs7QUFtR1I7OztHQUdHO0FBYUgsTUFBTSxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBRzdDLFlBQ0UsVUFBbUMsRUFDdkIsR0FBbUIsRUFDL0IsaUJBQW9DO1FBRXBDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDNUMsQ0FBQzs7NEdBVFUsVUFBVTtnR0FBVixVQUFVLCtJQUNWLGVBQWUsdUVDelE1Qix1WEFVQSw4bEJEZ0NhLGdCQUFnQiwrQ0F5TmYsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7Z0dBS2pDLFVBQVU7a0JBWnRCLFNBQVM7K0JBQ0UsY0FBYyxpQkFHVCxpQkFBaUIsQ0FBQyxJQUFJLG1CQUVwQix1QkFBdUIsQ0FBQyxPQUFPLGNBQ3BDLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFFBQ3RDO3dCQUNKLE9BQU8sRUFBRSxrQkFBa0I7cUJBQzVCOzswQkFPRSxRQUFROzRFQUppQixXQUFXO3NCQUF0QyxTQUFTO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2RrUG9ydGFsT3V0bGV0LCBUZW1wbGF0ZVBvcnRhbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge0RpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7QW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHttYXRUYWJzQW5pbWF0aW9uc30gZnJvbSAnLi90YWJzLWFuaW1hdGlvbnMnO1xuXG4vKipcbiAqIFRoZSBwb3J0YWwgaG9zdCBkaXJlY3RpdmUgZm9yIHRoZSBjb250ZW50cyBvZiB0aGUgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0VGFiQm9keUhvc3RdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiQm9keVBvcnRhbCBleHRlbmRzIENka1BvcnRhbE91dGxldCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBldmVudHMgZm9yIHdoZW4gdGhlIHRhYiBib2R5IGJlZ2lucyBjZW50ZXJpbmcuICovXG4gIHByaXZhdGUgX2NlbnRlcmluZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBldmVudHMgZm9yIHdoZW4gdGhlIHRhYiBib2R5IGZpbmlzaGVzIGxlYXZpbmcgZnJvbSBjZW50ZXIgcG9zaXRpb24uICovXG4gIHByaXZhdGUgX2xlYXZpbmdTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWF0VGFiQm9keSkpIHByaXZhdGUgX2hvc3Q6IE1hdFRhYkJvZHksXG4gICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICkge1xuICAgIHN1cGVyKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZiwgX2RvY3VtZW50KTtcbiAgfVxuXG4gIC8qKiBTZXQgaW5pdGlhbCB2aXNpYmlsaXR5IG9yIHNldCB1cCBzdWJzY3JpcHRpb24gZm9yIGNoYW5naW5nIHZpc2liaWxpdHkuICovXG4gIG92ZXJyaWRlIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICB0aGlzLl9jZW50ZXJpbmdTdWIgPSB0aGlzLl9ob3N0Ll9iZWZvcmVDZW50ZXJpbmdcbiAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLl9ob3N0Ll9pc0NlbnRlclBvc2l0aW9uKHRoaXMuX2hvc3QuX3Bvc2l0aW9uKSkpXG4gICAgICAuc3Vic2NyaWJlKChpc0NlbnRlcmluZzogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoaXNDZW50ZXJpbmcgJiYgIXRoaXMuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgIHRoaXMuYXR0YWNoKHRoaXMuX2hvc3QuX2NvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuX2xlYXZpbmdTdWIgPSB0aGlzLl9ob3N0Ll9hZnRlckxlYXZpbmdDZW50ZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5faG9zdC5wcmVzZXJ2ZUNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBDbGVhbiB1cCBjZW50ZXJpbmcgc3Vic2NyaXB0aW9uLiAqL1xuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX2NlbnRlcmluZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2xlYXZpbmdTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZXNlIHBvc2l0aW9uIHN0YXRlcyBhcmUgdXNlZCBpbnRlcm5hbGx5IGFzIGFuaW1hdGlvbiBzdGF0ZXMgZm9yIHRoZSB0YWIgYm9keS4gU2V0dGluZyB0aGVcbiAqIHBvc2l0aW9uIHN0YXRlIHRvIGxlZnQsIHJpZ2h0LCBvciBjZW50ZXIgd2lsbCB0cmFuc2l0aW9uIHRoZSB0YWIgYm9keSBmcm9tIGl0cyBjdXJyZW50XG4gKiBwb3NpdGlvbiB0byBpdHMgcmVzcGVjdGl2ZSBzdGF0ZS4gSWYgdGhlcmUgaXMgbm90IGN1cnJlbnQgcG9zaXRpb24gKHZvaWQsIGluIHRoZSBjYXNlIG9mIGEgbmV3XG4gKiB0YWIgYm9keSksIHRoZW4gdGhlcmUgd2lsbCBiZSBubyB0cmFuc2l0aW9uIGFuaW1hdGlvbiB0byBpdHMgc3RhdGUuXG4gKlxuICogSW4gdGhlIGNhc2Ugb2YgYSBuZXcgdGFiIGJvZHkgdGhhdCBzaG91bGQgaW1tZWRpYXRlbHkgYmUgY2VudGVyZWQgd2l0aCBhbiBhbmltYXRpbmcgdHJhbnNpdGlvbixcbiAqIHRoZW4gbGVmdC1vcmlnaW4tY2VudGVyIG9yIHJpZ2h0LW9yaWdpbi1jZW50ZXIgY2FuIGJlIHVzZWQsIHdoaWNoIHdpbGwgdXNlIGxlZnQgb3IgcmlnaHQgYXMgaXRzXG4gKiBwc2V1ZG8tcHJpb3Igc3RhdGUuXG4gKi9cbmV4cG9ydCB0eXBlIE1hdFRhYkJvZHlQb3NpdGlvblN0YXRlID1cbiAgfCAnbGVmdCdcbiAgfCAnY2VudGVyJ1xuICB8ICdyaWdodCdcbiAgfCAnbGVmdC1vcmlnaW4tY2VudGVyJ1xuICB8ICdyaWdodC1vcmlnaW4tY2VudGVyJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIHdpdGggYWxsIG9mIHRoZSBgTWF0VGFiQm9keWAgZnVuY3Rpb25hbGl0eS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgX01hdFRhYkJvZHlCYXNlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKiogQ3VycmVudCBwb3NpdGlvbiBvZiB0aGUgdGFiLWJvZHkgaW4gdGhlIHRhYi1ncm91cC4gWmVybyBtZWFucyB0aGF0IHRoZSB0YWIgaXMgdmlzaWJsZS4gKi9cbiAgcHJpdmF0ZSBfcG9zaXRpb25JbmRleDogbnVtYmVyO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gdGhlIGRpcmVjdGlvbmFsaXR5IGNoYW5nZSBvYnNlcnZhYmxlLiAqL1xuICBwcml2YXRlIF9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqIFRhYiBib2R5IHBvc2l0aW9uIHN0YXRlLiBVc2VkIGJ5IHRoZSBhbmltYXRpb24gdHJpZ2dlciBmb3IgdGhlIGN1cnJlbnQgc3RhdGUuICovXG4gIF9wb3NpdGlvbjogTWF0VGFiQm9keVBvc2l0aW9uU3RhdGU7XG5cbiAgLyoqIEVtaXRzIHdoZW4gYW4gYW5pbWF0aW9uIG9uIHRoZSB0YWIgaXMgY29tcGxldGUuICovXG4gIHJlYWRvbmx5IF90cmFuc2xhdGVUYWJDb21wbGV0ZSA9IG5ldyBTdWJqZWN0PEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHRhYiBiZWdpbnMgdG8gYW5pbWF0ZSB0b3dhcmRzIHRoZSBjZW50ZXIgYXMgdGhlIGFjdGl2ZSB0YWIuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBfb25DZW50ZXJpbmc6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgYmVmb3JlIHRoZSBjZW50ZXJpbmcgb2YgdGhlIHRhYiBiZWdpbnMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBfYmVmb3JlQ2VudGVyaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgYmVmb3JlIHRoZSBjZW50ZXJpbmcgb2YgdGhlIHRhYiBiZWdpbnMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBfYWZ0ZXJMZWF2aW5nQ2VudGVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdGFiIGNvbXBsZXRlcyBpdHMgYW5pbWF0aW9uIHRvd2FyZHMgdGhlIGNlbnRlci4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IF9vbkNlbnRlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KHRydWUpO1xuXG4gIC8qKiBUaGUgcG9ydGFsIGhvc3QgaW5zaWRlIG9mIHRoaXMgY29udGFpbmVyIGludG8gd2hpY2ggdGhlIHRhYiBib2R5IGNvbnRlbnQgd2lsbCBiZSBsb2FkZWQuICovXG4gIGFic3RyYWN0IF9wb3J0YWxIb3N0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgLyoqIFRoZSB0YWIgYm9keSBjb250ZW50IHRvIGRpc3BsYXkuICovXG4gIEBJbnB1dCgnY29udGVudCcpIF9jb250ZW50OiBUZW1wbGF0ZVBvcnRhbDtcblxuICAvKiogUG9zaXRpb24gdGhhdCB3aWxsIGJlIHVzZWQgd2hlbiB0aGUgdGFiIGlzIGltbWVkaWF0ZWx5IGJlY29taW5nIHZpc2libGUgYWZ0ZXIgY3JlYXRpb24uICovXG4gIEBJbnB1dCgpIG9yaWdpbjogbnVtYmVyIHwgbnVsbDtcblxuICAvLyBOb3RlIHRoYXQgdGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBhbHdheXMgYmUgb3ZlcndyaXR0ZW4gYnkgYE1hdFRhYkJvZHlgLCBidXQgd2UgbmVlZCBvbmVcbiAgLy8gYW55d2F5IHRvIHByZXZlbnQgdGhlIGFuaW1hdGlvbnMgbW9kdWxlIGZyb20gdGhyb3dpbmcgYW4gZXJyb3IgaWYgdGhlIGJvZHkgaXMgdXNlZCBvbiBpdHMgb3duLlxuICAvKiogRHVyYXRpb24gZm9yIHRoZSB0YWIncyBhbmltYXRpb24uICovXG4gIEBJbnB1dCgpIGFuaW1hdGlvbkR1cmF0aW9uOiBzdHJpbmcgPSAnNTAwbXMnO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB0YWIncyBjb250ZW50IHNob3VsZCBiZSBrZXB0IGluIHRoZSBET00gd2hpbGUgaXQncyBvZmYtc2NyZWVuLiAqL1xuICBASW5wdXQoKSBwcmVzZXJ2ZUNvbnRlbnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIHNoaWZ0ZWQgaW5kZXggcG9zaXRpb24gb2YgdGhlIHRhYiBib2R5LCB3aGVyZSB6ZXJvIHJlcHJlc2VudHMgdGhlIGFjdGl2ZSBjZW50ZXIgdGFiLiAqL1xuICBASW5wdXQoKVxuICBzZXQgcG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX3Bvc2l0aW9uSW5kZXggPSBwb3NpdGlvbjtcbiAgICB0aGlzLl9jb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIGlmIChfZGlyKSB7XG4gICAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBfZGlyLmNoYW5nZS5zdWJzY3JpYmUoKGRpcjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX2NvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKGRpcik7XG4gICAgICAgIGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoYXQgd2UgZ2V0IHVuaXF1ZSBhbmltYXRpb24gZXZlbnRzLCBiZWNhdXNlIHRoZSBgLmRvbmVgIGNhbGxiYWNrIGNhbiBnZXRcbiAgICAvLyBpbnZva2VkIHR3aWNlIGluIHNvbWUgYnJvd3NlcnMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yNDA4NC5cbiAgICB0aGlzLl90cmFuc2xhdGVUYWJDb21wbGV0ZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHguZnJvbVN0YXRlID09PSB5LmZyb21TdGF0ZSAmJiB4LnRvU3RhdGUgPT09IHkudG9TdGF0ZTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgLy8gSWYgdGhlIHRyYW5zaXRpb24gdG8gdGhlIGNlbnRlciBpcyBjb21wbGV0ZSwgZW1pdCBhbiBldmVudC5cbiAgICAgICAgaWYgKHRoaXMuX2lzQ2VudGVyUG9zaXRpb24oZXZlbnQudG9TdGF0ZSkgJiYgdGhpcy5faXNDZW50ZXJQb3NpdGlvbih0aGlzLl9wb3NpdGlvbikpIHtcbiAgICAgICAgICB0aGlzLl9vbkNlbnRlcmVkLmVtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc0NlbnRlclBvc2l0aW9uKGV2ZW50LmZyb21TdGF0ZSkgJiYgIXRoaXMuX2lzQ2VudGVyUG9zaXRpb24odGhpcy5fcG9zaXRpb24pKSB7XG4gICAgICAgICAgdGhpcy5fYWZ0ZXJMZWF2aW5nQ2VudGVyLmVtaXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgaW5pdGlhbGl6ZWQsIGNoZWNrIGlmIHRoZSBjb250ZW50IGlzIGNlbnRlcmVkIGFuZCBoYXMgYW4gb3JpZ2luLiBJZiBzbywgc2V0IHRoZVxuICAgKiBzcGVjaWFsIHBvc2l0aW9uIHN0YXRlcyB0aGF0IHRyYW5zaXRpb24gdGhlIHRhYiBmcm9tIHRoZSBsZWZ0IG9yIHJpZ2h0IGJlZm9yZSBjZW50ZXJpbmcuXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5fcG9zaXRpb24gPT0gJ2NlbnRlcicgJiYgdGhpcy5vcmlnaW4gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcG9zaXRpb24gPSB0aGlzLl9jb21wdXRlUG9zaXRpb25Gcm9tT3JpZ2luKHRoaXMub3JpZ2luKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kaXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl90cmFuc2xhdGVUYWJDb21wbGV0ZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgX29uVHJhbnNsYXRlVGFiU3RhcnRlZChldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpc0NlbnRlcmluZyA9IHRoaXMuX2lzQ2VudGVyUG9zaXRpb24oZXZlbnQudG9TdGF0ZSk7XG4gICAgdGhpcy5fYmVmb3JlQ2VudGVyaW5nLmVtaXQoaXNDZW50ZXJpbmcpO1xuICAgIGlmIChpc0NlbnRlcmluZykge1xuICAgICAgdGhpcy5fb25DZW50ZXJpbmcuZW1pdCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIHRleHQgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluaW5nIGFwcC4gKi9cbiAgX2dldExheW91dERpcmVjdGlvbigpOiBEaXJlY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyA/ICdydGwnIDogJ2x0cic7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgcHJvdmlkZWQgcG9zaXRpb24gc3RhdGUgaXMgY29uc2lkZXJlZCBjZW50ZXIsIHJlZ2FyZGxlc3Mgb2Ygb3JpZ2luLiAqL1xuICBfaXNDZW50ZXJQb3NpdGlvbihwb3NpdGlvbjogTWF0VGFiQm9keVBvc2l0aW9uU3RhdGUgfCBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgcG9zaXRpb24gPT0gJ2NlbnRlcicgfHwgcG9zaXRpb24gPT0gJ2xlZnQtb3JpZ2luLWNlbnRlcicgfHwgcG9zaXRpb24gPT0gJ3JpZ2h0LW9yaWdpbi1jZW50ZXInXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBDb21wdXRlcyB0aGUgcG9zaXRpb24gc3RhdGUgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSB0YWItYm9keSBhbmltYXRpb24gdHJpZ2dlci4gKi9cbiAgcHJpdmF0ZSBfY29tcHV0ZVBvc2l0aW9uQW5pbWF0aW9uU3RhdGUoZGlyOiBEaXJlY3Rpb24gPSB0aGlzLl9nZXRMYXlvdXREaXJlY3Rpb24oKSkge1xuICAgIGlmICh0aGlzLl9wb3NpdGlvbkluZGV4IDwgMCkge1xuICAgICAgdGhpcy5fcG9zaXRpb24gPSBkaXIgPT0gJ2x0cicgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcG9zaXRpb25JbmRleCA+IDApIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gZGlyID09ICdsdHInID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcG9zaXRpb24gPSAnY2VudGVyJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIHBvc2l0aW9uIHN0YXRlIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgb3JpZ2luIHBvc2l0aW9uLiBUaGlzIGlzIHVzZWQgaWYgdGhlXG4gICAqIHRhYiBpcyBiZWNvbWluZyB2aXNpYmxlIGltbWVkaWF0ZWx5IGFmdGVyIGNyZWF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfY29tcHV0ZVBvc2l0aW9uRnJvbU9yaWdpbihvcmlnaW46IG51bWJlcik6IE1hdFRhYkJvZHlQb3NpdGlvblN0YXRlIHtcbiAgICBjb25zdCBkaXIgPSB0aGlzLl9nZXRMYXlvdXREaXJlY3Rpb24oKTtcblxuICAgIGlmICgoZGlyID09ICdsdHInICYmIG9yaWdpbiA8PSAwKSB8fCAoZGlyID09ICdydGwnICYmIG9yaWdpbiA+IDApKSB7XG4gICAgICByZXR1cm4gJ2xlZnQtb3JpZ2luLWNlbnRlcic7XG4gICAgfVxuXG4gICAgcmV0dXJuICdyaWdodC1vcmlnaW4tY2VudGVyJztcbiAgfVxufVxuXG4vKipcbiAqIFdyYXBwZXIgZm9yIHRoZSBjb250ZW50cyBvZiBhIHRhYi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXRhYi1ib2R5JyxcbiAgdGVtcGxhdGVVcmw6ICd0YWItYm9keS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYi1ib2R5LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGFuaW1hdGlvbnM6IFttYXRUYWJzQW5pbWF0aW9ucy50cmFuc2xhdGVUYWJdLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtdGFiLWJvZHknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJCb2R5IGV4dGVuZHMgX01hdFRhYkJvZHlCYXNlIHtcbiAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQpIF9wb3J0YWxIb3N0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGRpciwgY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIG9yaWdpbiBzdGF0ZSBpcyBhbiBpbnRlcm5hbGx5IHVzZWQgc3RhdGUgdGhhdCBpcyBzZXQgb24gYSBuZXcgdGFiIGJvZHkgaW5kaWNhdGluZyBpZiBpdFxuICogYmVnYW4gdG8gdGhlIGxlZnQgb3IgcmlnaHQgb2YgdGhlIHByaW9yIHNlbGVjdGVkIGluZGV4LiBGb3IgZXhhbXBsZSwgaWYgdGhlIHNlbGVjdGVkIGluZGV4IHdhc1xuICogc2V0IHRvIDEsIGFuZCBhIG5ldyB0YWIgaXMgY3JlYXRlZCBhbmQgc2VsZWN0ZWQgYXQgaW5kZXggMiwgdGhlbiB0aGUgdGFiIGJvZHkgd291bGQgaGF2ZSBhblxuICogb3JpZ2luIG9mIHJpZ2h0IGJlY2F1c2UgaXRzIGluZGV4IHdhcyBncmVhdGVyIHRoYW4gdGhlIHByaW9yIHNlbGVjdGVkIGluZGV4LlxuICovXG5leHBvcnQgdHlwZSBNYXRUYWJCb2R5T3JpZ2luU3RhdGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuIiwiPGRpdiBjbGFzcz1cIm1hdC1tZGMtdGFiLWJvZHktY29udGVudFwiICNjb250ZW50XG4gICAgIFtAdHJhbnNsYXRlVGFiXT1cIntcbiAgICAgICAgdmFsdWU6IF9wb3NpdGlvbixcbiAgICAgICAgcGFyYW1zOiB7YW5pbWF0aW9uRHVyYXRpb246IGFuaW1hdGlvbkR1cmF0aW9ufVxuICAgICB9XCJcbiAgICAgKEB0cmFuc2xhdGVUYWIuc3RhcnQpPVwiX29uVHJhbnNsYXRlVGFiU3RhcnRlZCgkZXZlbnQpXCJcbiAgICAgKEB0cmFuc2xhdGVUYWIuZG9uZSk9XCJfdHJhbnNsYXRlVGFiQ29tcGxldGUubmV4dCgkZXZlbnQpXCJcbiAgICAgY2RrU2Nyb2xsYWJsZT5cbiAgPG5nLXRlbXBsYXRlIG1hdFRhYkJvZHlIb3N0PjwvbmctdGVtcGxhdGU+XG48L2Rpdj5cbiJdfQ==