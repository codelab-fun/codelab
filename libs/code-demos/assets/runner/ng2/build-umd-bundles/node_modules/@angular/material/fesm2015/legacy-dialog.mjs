import { DialogModule } from '@angular/cdk/dialog';
import * as i1$1 from '@angular/cdk/overlay';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import * as i4 from '@angular/cdk/portal';
import { PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, Inject, InjectionToken, Injectable, SkipSelf, Directive, Input, NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import * as i2 from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { MatDialogConfig, _defaultParams, _MatDialogContainerBase, matDialogAnimations, MatDialogRef, _MatDialogBase, _closeDialogVia } from '@angular/material/dialog';
export { MAT_DIALOG_SCROLL_STRATEGY_FACTORY as MAT_LEGACY_DIALOG_SCROLL_STRATEGY_FACTORY, _MatDialogBase as _MatLegacyDialogBase, _MatDialogContainerBase as _MatLegacyDialogContainerBase, _closeDialogVia as _closeLegacyDialogVia, matDialogAnimations as matLegacyDialogAnimations } from '@angular/material/dialog';
import * as i1 from '@angular/cdk/a11y';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Default parameters for the animation for backwards compatibility.
 * @docs-private
 * @deprecated Use `defaultParams` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
const defaultParams = {
    params: { enterAnimationDuration: '150ms', exitAnimationDuration: '75ms' },
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @deprecated Use `MatDialogConfig` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialogConfig extends MatDialogConfig {
    constructor() {
        super(...arguments);
        /** Duration of the enter animation. Has to be a valid CSS value (e.g. 100ms). */
        this.enterAnimationDuration = _defaultParams.params.enterAnimationDuration;
        /** Duration of the exit animation. Has to be a valid CSS value (e.g. 50ms). */
        this.exitAnimationDuration = _defaultParams.params.exitAnimationDuration;
    }
}

/**
 * Internal component that wraps user-provided dialog content.
 * Animation is based on https://material.io/guidelines/motion/choreography.html.
 * @docs-private
 * @deprecated Use `MatDialogContainer` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialogContainer extends _MatDialogContainerBase {
    constructor(elementRef, focusTrapFactory, document, dialogConfig, checker, ngZone, overlayRef, _changeDetectorRef, focusMonitor) {
        super(elementRef, focusTrapFactory, document, dialogConfig, checker, ngZone, overlayRef, focusMonitor);
        this._changeDetectorRef = _changeDetectorRef;
        /** State of the dialog animation. */
        this._state = 'enter';
    }
    /** Callback, invoked whenever an animation on the host completes. */
    _onAnimationDone({ toState, totalTime }) {
        if (toState === 'enter') {
            this._openAnimationDone(totalTime);
        }
        else if (toState === 'exit') {
            this._animationStateChanged.next({ state: 'closed', totalTime });
        }
    }
    /** Callback, invoked when an animation on the host starts. */
    _onAnimationStart({ toState, totalTime }) {
        if (toState === 'enter') {
            this._animationStateChanged.next({ state: 'opening', totalTime });
        }
        else if (toState === 'exit' || toState === 'void') {
            this._animationStateChanged.next({ state: 'closing', totalTime });
        }
    }
    /** Starts the dialog exit animation. */
    _startExitAnimation() {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._changeDetectorRef.markForCheck();
    }
    _getAnimationState() {
        return {
            value: this._state,
            params: {
                'enterAnimationDuration': this._config.enterAnimationDuration || defaultParams.params.enterAnimationDuration,
                'exitAnimationDuration': this._config.exitAnimationDuration || defaultParams.params.exitAnimationDuration,
            },
        };
    }
}
MatLegacyDialogContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogContainer, deps: [{ token: i0.ElementRef }, { token: i1.FocusTrapFactory }, { token: DOCUMENT, optional: true }, { token: MatLegacyDialogConfig }, { token: i1.InteractivityChecker }, { token: i0.NgZone }, { token: i1$1.OverlayRef }, { token: i0.ChangeDetectorRef }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
MatLegacyDialogContainer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyDialogContainer, selector: "mat-dialog-container", host: { attributes: { "tabindex": "-1" }, listeners: { "@dialogContainer.start": "_onAnimationStart($event)", "@dialogContainer.done": "_onAnimationDone($event)" }, properties: { "attr.aria-modal": "_config.ariaModal", "id": "_config.id", "attr.role": "_config.role", "attr.aria-labelledby": "_config.ariaLabel ? null : _ariaLabelledBy", "attr.aria-label": "_config.ariaLabel", "attr.aria-describedby": "_config.ariaDescribedBy || null", "@dialogContainer": "_getAnimationState()" }, classAttribute: "mat-dialog-container" }, usesInheritance: true, ngImport: i0, template: "<ng-template cdkPortalOutlet></ng-template>\n", styles: [".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;box-sizing:content-box;margin-bottom:-24px}.mat-dialog-actions.mat-dialog-actions-align-center,.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions.mat-dialog-actions-align-end,.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}"], dependencies: [{ kind: "directive", type: i4.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [matDialogAnimations.dialogContainer], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogContainer, decorators: [{
            type: Component,
            args: [{ selector: 'mat-dialog-container', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.Default, animations: [matDialogAnimations.dialogContainer], host: {
                        'class': 'mat-dialog-container',
                        'tabindex': '-1',
                        '[attr.aria-modal]': '_config.ariaModal',
                        '[id]': '_config.id',
                        '[attr.role]': '_config.role',
                        '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledBy',
                        '[attr.aria-label]': '_config.ariaLabel',
                        '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
                        '[@dialogContainer]': `_getAnimationState()`,
                        '(@dialogContainer.start)': '_onAnimationStart($event)',
                        '(@dialogContainer.done)': '_onAnimationDone($event)',
                    }, template: "<ng-template cdkPortalOutlet></ng-template>\n", styles: [".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;box-sizing:content-box;margin-bottom:-24px}.mat-dialog-actions.mat-dialog-actions-align-center,.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions.mat-dialog-actions-align-end,.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i1.FocusTrapFactory }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: MatLegacyDialogConfig }, { type: i1.InteractivityChecker }, { type: i0.NgZone }, { type: i1$1.OverlayRef }, { type: i0.ChangeDetectorRef }, { type: i1.FocusMonitor }];
    } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Reference to a dialog opened via the MatDialog service.
 * @deprecated Use `MatDialogRef` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialogRef extends MatDialogRef {
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to access the data that was passed in to a dialog.
 * @deprecated Use `MAT_DIALOG_DATA` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
const MAT_LEGACY_DIALOG_DATA = new InjectionToken('MatDialogData');
/**
 * Injection token that can be used to specify default dialog options.
 * @deprecated Use `MAT_DIALOG_DEFAULT_OPTIONS` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
const MAT_LEGACY_DIALOG_DEFAULT_OPTIONS = new InjectionToken('mat-dialog-default-options');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 * @deprecated Use `MAT_DIALOG_SCROLL_STRATEGY` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
const MAT_LEGACY_DIALOG_SCROLL_STRATEGY = new InjectionToken('mat-dialog-scroll-strategy');
/**
 * @docs-private
 * @deprecated Use `MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
function MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
/**
 * @docs-private
 * @deprecated Use `MAT_DIALOG_SCROLL_STRATEGY_PROVIDER` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
const MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: MAT_LEGACY_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/**
 * Service to open Material Design modal dialogs.
 * @deprecated Use `MatDialog` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialog extends _MatDialogBase {
    constructor(overlay, injector, 
    /**
     * @deprecated `_location` parameter to be removed.
     * @breaking-change 10.0.0
     */
    _location, defaultOptions, scrollStrategy, parentDialog, 
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 15.0.0
     */
    overlayContainer, 
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 14.0.0
     */
    animationMode) {
        super(overlay, injector, defaultOptions, parentDialog, overlayContainer, scrollStrategy, MatLegacyDialogRef, MatLegacyDialogContainer, MAT_LEGACY_DIALOG_DATA, animationMode);
        this.dialogConfigClass = MatLegacyDialogConfig;
    }
}
MatLegacyDialog.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialog, deps: [{ token: i1$1.Overlay }, { token: i0.Injector }, { token: i2.Location, optional: true }, { token: MAT_LEGACY_DIALOG_DEFAULT_OPTIONS, optional: true }, { token: MAT_LEGACY_DIALOG_SCROLL_STRATEGY }, { token: MatLegacyDialog, optional: true, skipSelf: true }, { token: i1$1.OverlayContainer }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
MatLegacyDialog.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialog });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialog, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: i1$1.Overlay }, { type: i0.Injector }, { type: i2.Location, decorators: [{
                        type: Optional
                    }] }, { type: MatLegacyDialogConfig, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MAT_LEGACY_DIALOG_DEFAULT_OPTIONS]
                    }] }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MAT_LEGACY_DIALOG_SCROLL_STRATEGY]
                    }] }, { type: MatLegacyDialog, decorators: [{
                        type: Optional
                    }, {
                        type: SkipSelf
                    }] }, { type: i1$1.OverlayContainer }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [ANIMATION_MODULE_TYPE]
                    }] }];
    } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;
/**
 * Button that will close the current dialog.
 * @deprecated Use `MatDialogClose` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialogClose {
    constructor(
    /**
     * Reference to the containing dialog.
     * @deprecated `dialogRef` property to become private.
     * @breaking-change 13.0.0
     */
    // The dialog title directive is always used in combination with a `MatDialogRef`.
    // tslint:disable-next-line: lightweight-tokens
    dialogRef, _elementRef, _dialog) {
        this.dialogRef = dialogRef;
        this._elementRef = _elementRef;
        this._dialog = _dialog;
        /** Default to "button" to prevents accidental form submits. */
        this.type = 'button';
    }
    ngOnInit() {
        if (!this.dialogRef) {
            // When this directive is included in a dialog via TemplateRef (rather than being
            // in a Component), the DialogRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the DialogRef by
            // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
            // be resolved at constructor time.
            this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
        }
    }
    ngOnChanges(changes) {
        const proxiedChange = changes['_matDialogClose'] || changes['_matDialogCloseResult'];
        if (proxiedChange) {
            this.dialogResult = proxiedChange.currentValue;
        }
    }
    _onButtonClick(event) {
        // Determinate the focus origin using the click event, because using the FocusMonitor will
        // result in incorrect origins. Most of the time, close buttons will be auto focused in the
        // dialog, and therefore clicking the button won't result in a focus change. This means that
        // the FocusMonitor won't detect any origin change, and will always output `program`.
        _closeDialogVia(this.dialogRef, event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse', this.dialogResult);
    }
}
MatLegacyDialogClose.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogClose, deps: [{ token: MatLegacyDialogRef, optional: true }, { token: i0.ElementRef }, { token: MatLegacyDialog }], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyDialogClose.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: { ariaLabel: ["aria-label", "ariaLabel"], type: "type", dialogResult: ["mat-dialog-close", "dialogResult"], _matDialogClose: ["matDialogClose", "_matDialogClose"] }, host: { listeners: { "click": "_onButtonClick($event)" }, properties: { "attr.aria-label": "ariaLabel || null", "attr.type": "type" } }, exportAs: ["matDialogClose"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogClose, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-dialog-close], [matDialogClose]',
                    exportAs: 'matDialogClose',
                    host: {
                        '(click)': '_onButtonClick($event)',
                        '[attr.aria-label]': 'ariaLabel || null',
                        '[attr.type]': 'type',
                    },
                }]
        }], ctorParameters: function () {
        return [{ type: MatLegacyDialogRef, decorators: [{
                        type: Optional
                    }] }, { type: i0.ElementRef }, { type: MatLegacyDialog }];
    }, propDecorators: { ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], type: [{
                type: Input
            }], dialogResult: [{
                type: Input,
                args: ['mat-dialog-close']
            }], _matDialogClose: [{
                type: Input,
                args: ['matDialogClose']
            }] } });
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 * @deprecated Use `MatDialogTitle` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialogTitle {
    constructor(
    // The dialog title directive is always used in combination with a `MatDialogRef`.
    // tslint:disable-next-line: lightweight-tokens
    _dialogRef, _elementRef, _dialog) {
        this._dialogRef = _dialogRef;
        this._elementRef = _elementRef;
        this._dialog = _dialog;
        /** Unique id for the dialog title. If none is supplied, it will be auto-generated. */
        this.id = `mat-dialog-title-${dialogElementUid++}`;
    }
    ngOnInit() {
        if (!this._dialogRef) {
            this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
        }
        if (this._dialogRef) {
            Promise.resolve().then(() => {
                const container = this._dialogRef._containerInstance;
                if (container && !container._ariaLabelledBy) {
                    container._ariaLabelledBy = this.id;
                }
            });
        }
    }
}
MatLegacyDialogTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogTitle, deps: [{ token: MatLegacyDialogRef, optional: true }, { token: i0.ElementRef }, { token: MatLegacyDialog }], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyDialogTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: { id: "id" }, host: { properties: { "id": "id" }, classAttribute: "mat-dialog-title" }, exportAs: ["matDialogTitle"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-dialog-title], [matDialogTitle]',
                    exportAs: 'matDialogTitle',
                    host: {
                        'class': 'mat-dialog-title',
                        '[id]': 'id',
                    },
                }]
        }], ctorParameters: function () {
        return [{ type: MatLegacyDialogRef, decorators: [{
                        type: Optional
                    }] }, { type: i0.ElementRef }, { type: MatLegacyDialog }];
    }, propDecorators: { id: [{
                type: Input
            }] } });
/**
 * Scrollable content container of a dialog.
 * @deprecated Use `MatDialogContent` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialogContent {
}
MatLegacyDialogContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogContent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyDialogContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]", host: { classAttribute: "mat-dialog-content" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogContent, decorators: [{
            type: Directive,
            args: [{
                    selector: `[mat-dialog-content], mat-dialog-content, [matDialogContent]`,
                    host: { 'class': 'mat-dialog-content' },
                }]
        }] });
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 * @deprecated Use `MatDialogActions` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialogActions {
    constructor() {
        /**
         * Horizontal alignment of action buttons.
         */
        this.align = 'start';
    }
}
MatLegacyDialogActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogActions, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyDialogActions.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: { align: "align" }, host: { properties: { "class.mat-dialog-actions-align-center": "align === \"center\"", "class.mat-dialog-actions-align-end": "align === \"end\"" }, classAttribute: "mat-dialog-actions" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogActions, decorators: [{
            type: Directive,
            args: [{
                    selector: `[mat-dialog-actions], mat-dialog-actions, [matDialogActions]`,
                    host: {
                        'class': 'mat-dialog-actions',
                        '[class.mat-dialog-actions-align-center]': 'align === "center"',
                        '[class.mat-dialog-actions-align-end]': 'align === "end"',
                    },
                }]
        }], propDecorators: { align: [{
                type: Input
            }] } });
// TODO(crisbeto): this utility shouldn't be necessary anymore, because the dialog ref is provided
// both to component and template dialogs through DI. We need to keep it around, because there are
// some internal wrappers around `MatDialog` that happened to work by accident, because we had this
// fallback logic in place.
/**
 * Finds the closest MatDialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(element, openDialogs) {
    let parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mat-dialog-container')) {
        parent = parent.parentElement;
    }
    return parent ? openDialogs.find(dialog => dialog.id === parent.id) : null;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @deprecated Use `MatDialogModule` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialogModule {
}
MatLegacyDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogModule, declarations: [MatLegacyDialogContainer,
        MatLegacyDialogClose,
        MatLegacyDialogTitle,
        MatLegacyDialogActions,
        MatLegacyDialogContent], imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule], exports: [MatLegacyDialogContainer,
        MatLegacyDialogClose,
        MatLegacyDialogTitle,
        MatLegacyDialogContent,
        MatLegacyDialogActions,
        MatCommonModule] });
MatLegacyDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogModule, providers: [MatLegacyDialog, MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER], imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule],
                    exports: [
                        MatLegacyDialogContainer,
                        MatLegacyDialogClose,
                        MatLegacyDialogTitle,
                        MatLegacyDialogContent,
                        MatLegacyDialogActions,
                        MatCommonModule,
                    ],
                    declarations: [
                        MatLegacyDialogContainer,
                        MatLegacyDialogClose,
                        MatLegacyDialogTitle,
                        MatLegacyDialogActions,
                        MatLegacyDialogContent,
                    ],
                    providers: [MatLegacyDialog, MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER],
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
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MAT_LEGACY_DIALOG_DATA, MAT_LEGACY_DIALOG_DEFAULT_OPTIONS, MAT_LEGACY_DIALOG_SCROLL_STRATEGY, MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER, MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY, MatLegacyDialog, MatLegacyDialogActions, MatLegacyDialogClose, MatLegacyDialogConfig, MatLegacyDialogContainer, MatLegacyDialogContent, MatLegacyDialogModule, MatLegacyDialogRef, MatLegacyDialogTitle };
//# sourceMappingURL=legacy-dialog.mjs.map
