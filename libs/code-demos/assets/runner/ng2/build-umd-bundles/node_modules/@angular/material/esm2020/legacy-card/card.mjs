/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Directive, Input, Optional, Inject, } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import * as i0 from "@angular/core";
/**
 * Content of a card, needed as it's used as a selector in the API.
 * @docs-private
 * @deprecated Use `MatCardContent` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardContent {
}
MatLegacyCardContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardContent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardContent, selector: "mat-card-content, [mat-card-content], [matCardContent]", host: { classAttribute: "mat-card-content" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-card-content, [mat-card-content], [matCardContent]',
                    host: { 'class': 'mat-card-content' },
                }]
        }] });
/**
 * Title of a card, needed as it's used as a selector in the API.
 * @docs-private
 * @deprecated Use `MatCardTitle` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardTitle {
}
MatLegacyCardTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardTitle, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]", host: { classAttribute: "mat-card-title" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: `mat-card-title, [mat-card-title], [matCardTitle]`,
                    host: {
                        'class': 'mat-card-title',
                    },
                }]
        }] });
/**
 * Sub-title of a card, needed as it's used as a selector in the API.
 * @docs-private
 * @deprecated Use `MatCardSubtitle` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardSubtitle {
}
MatLegacyCardSubtitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardSubtitle, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardSubtitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardSubtitle, selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]", host: { classAttribute: "mat-card-subtitle" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardSubtitle, decorators: [{
            type: Directive,
            args: [{
                    selector: `mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]`,
                    host: {
                        'class': 'mat-card-subtitle',
                    },
                }]
        }] });
/**
 * Action section of a card, needed as it's used as a selector in the API.
 * @docs-private
 * @deprecated Use `MatCardActions` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardActions {
    constructor() {
        /** Position of the actions inside the card. */
        this.align = 'start';
    }
}
MatLegacyCardActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardActions, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardActions.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardActions, selector: "mat-card-actions", inputs: { align: "align" }, host: { properties: { "class.mat-card-actions-align-end": "align === \"end\"" }, classAttribute: "mat-card-actions" }, exportAs: ["matCardActions"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardActions, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-card-actions',
                    exportAs: 'matCardActions',
                    host: {
                        'class': 'mat-card-actions',
                        '[class.mat-card-actions-align-end]': 'align === "end"',
                    },
                }]
        }], propDecorators: { align: [{
                type: Input
            }] } });
/**
 * Footer of a card, needed as it's used as a selector in the API.
 * @docs-private
 * @deprecated Use `MatCardFooter` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardFooter {
}
MatLegacyCardFooter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardFooter, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardFooter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardFooter, selector: "mat-card-footer", host: { classAttribute: "mat-card-footer" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardFooter, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-card-footer',
                    host: { 'class': 'mat-card-footer' },
                }]
        }] });
/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 * @deprecated Use `MatCardImage` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardImage {
}
MatLegacyCardImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardImage, selector: "[mat-card-image], [matCardImage]", host: { classAttribute: "mat-card-image" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-image], [matCardImage]',
                    host: { 'class': 'mat-card-image' },
                }]
        }] });
/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 * @deprecated Use `MatCardSmImage` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardSmImage {
}
MatLegacyCardSmImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardSmImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardSmImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardSmImage, selector: "[mat-card-sm-image], [matCardImageSmall]", host: { classAttribute: "mat-card-sm-image" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardSmImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-sm-image], [matCardImageSmall]',
                    host: { 'class': 'mat-card-sm-image' },
                }]
        }] });
/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 * @deprecated Use `MatCardMdImage` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardMdImage {
}
MatLegacyCardMdImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardMdImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardMdImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardMdImage, selector: "[mat-card-md-image], [matCardImageMedium]", host: { classAttribute: "mat-card-md-image" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardMdImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-md-image], [matCardImageMedium]',
                    host: { 'class': 'mat-card-md-image' },
                }]
        }] });
/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 * @deprecated Use `MatCardLgImage` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardLgImage {
}
MatLegacyCardLgImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardLgImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardLgImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardLgImage, selector: "[mat-card-lg-image], [matCardImageLarge]", host: { classAttribute: "mat-card-lg-image" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardLgImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-lg-image], [matCardImageLarge]',
                    host: { 'class': 'mat-card-lg-image' },
                }]
        }] });
/**
 * Large image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 * @deprecated Use `MatCardXlImage` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardXlImage {
}
MatLegacyCardXlImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardXlImage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardXlImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardXlImage, selector: "[mat-card-xl-image], [matCardImageXLarge]", host: { classAttribute: "mat-card-xl-image" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardXlImage, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-xl-image], [matCardImageXLarge]',
                    host: { 'class': 'mat-card-xl-image' },
                }]
        }] });
/**
 * Avatar image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 * @deprecated Use `MatCardAvatar` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardAvatar {
}
MatLegacyCardAvatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardAvatar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyCardAvatar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardAvatar, selector: "[mat-card-avatar], [matCardAvatar]", host: { classAttribute: "mat-card-avatar" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardAvatar, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-card-avatar], [matCardAvatar]',
                    host: { 'class': 'mat-card-avatar' },
                }]
        }] });
/**
 * A basic content container component that adds the styles of a Material design card.
 *
 * While this component can be used alone, it also provides a number
 * of preset styles for common card sections, including:
 * - mat-card-title
 * - mat-card-subtitle
 * - mat-card-content
 * - mat-card-actions
 * - mat-card-footer
 *
 * @deprecated Use `MatCard` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCard {
    // @breaking-change 9.0.0 `_animationMode` parameter to be made required.
    constructor(_animationMode) {
        this._animationMode = _animationMode;
    }
}
MatLegacyCard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCard, deps: [{ token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatLegacyCard.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCard, selector: "mat-card", host: { properties: { "class._mat-animation-noopable": "_animationMode === \"NoopAnimations\"" }, classAttribute: "mat-card mat-focus-indicator" }, exportAs: ["matCard"], ngImport: i0, template: "<ng-content></ng-content>\n<ng-content select=\"mat-card-footer\"></ng-content>\n", styles: [".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card._mat-animation-noopable{transition:none !important;animation:none !important}.mat-card>.mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card>.mat-divider-horizontal{left:auto;right:0}.mat-card>.mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card>.mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px;display:block;overflow:hidden}.mat-card-image img{width:100%}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions:not(.mat-card-actions-align-end) .mat-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-raised-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-actions-align-end .mat-button:last-child,.mat-card-actions-align-end .mat-raised-button:last-child,.mat-card-actions-align-end .mat-stroked-button:last-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCard, decorators: [{
            type: Component,
            args: [{ selector: 'mat-card', exportAs: 'matCard', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'class': 'mat-card mat-focus-indicator',
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                    }, template: "<ng-content></ng-content>\n<ng-content select=\"mat-card-footer\"></ng-content>\n", styles: [".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card._mat-animation-noopable{transition:none !important;animation:none !important}.mat-card>.mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card>.mat-divider-horizontal{left:auto;right:0}.mat-card>.mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card>.mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px;display:block;overflow:hidden}.mat-card-image img{width:100%}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions:not(.mat-card-actions-align-end) .mat-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-raised-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-actions-align-end .mat-button:last-child,.mat-card-actions-align-end .mat-raised-button:last-child,.mat-card-actions-align-end .mat-stroked-button:last-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; } });
/**
 * Component intended to be used within the `<mat-card>` component. It adds styles for a
 * preset header section (i.e. a title, subtitle, and avatar layout).
 * @docs-private
 * @deprecated Use `MatCardHeader` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardHeader {
}
MatLegacyCardHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
MatLegacyCardHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardHeader, selector: "mat-card-header", host: { classAttribute: "mat-card-header" }, ngImport: i0, template: "<ng-content select=\"[mat-card-avatar], [matCardAvatar]\"></ng-content>\n<div class=\"mat-card-header-text\">\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardHeader, decorators: [{
            type: Component,
            args: [{ selector: 'mat-card-header', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'class': 'mat-card-header' }, template: "<ng-content select=\"[mat-card-avatar], [matCardAvatar]\"></ng-content>\n<div class=\"mat-card-header-text\">\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content></ng-content>\n" }]
        }] });
/**
 * Component intended to be used within the `<mat-card>` component. It adds styles for a preset
 * layout that groups an image with a title section.
 * @docs-private
 * @deprecated Use `MatCardTitleGroup` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCardTitleGroup {
}
MatLegacyCardTitleGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardTitleGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
MatLegacyCardTitleGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardTitleGroup, selector: "mat-card-title-group", host: { classAttribute: "mat-card-title-group" }, ngImport: i0, template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"img\"></ng-content>\n<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardTitleGroup, decorators: [{
            type: Component,
            args: [{ selector: 'mat-card-title-group', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'class': 'mat-card-title-group' }, template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"img\"></ng-content>\n<ng-content></ng-content>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktY2FyZC9jYXJkLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1jYXJkL2NhcmQuaHRtbCIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktY2FyZC9jYXJkLWhlYWRlci5odG1sIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1jYXJkL2NhcmQtdGl0bGUtZ3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDOztBQUUzRTs7Ozs7R0FLRztBQUtILE1BQU0sT0FBTyxvQkFBb0I7O3NIQUFwQixvQkFBb0I7MEdBQXBCLG9CQUFvQjtnR0FBcEIsb0JBQW9CO2tCQUpoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3REFBd0Q7b0JBQ2xFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBQztpQkFDcEM7O0FBR0Q7Ozs7O0dBS0c7QUFPSCxNQUFNLE9BQU8sa0JBQWtCOztvSEFBbEIsa0JBQWtCO3dHQUFsQixrQkFBa0I7Z0dBQWxCLGtCQUFrQjtrQkFOOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0RBQWtEO29CQUM1RCxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLGdCQUFnQjtxQkFDMUI7aUJBQ0Y7O0FBR0Q7Ozs7O0dBS0c7QUFPSCxNQUFNLE9BQU8scUJBQXFCOzt1SEFBckIscUJBQXFCOzJHQUFyQixxQkFBcUI7Z0dB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QVUsWUFDVixTQUFTLGlCQUdKLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sUUFDekM7d0JBQ0osT0FBTyxFQUFFLDhCQUE4Qjt3QkFDdkMsaUNBQWlDLEVBQUUscUNBQXFDO3FCQUN6RTs7MEJBSVksUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxxQkFBcUI7O0FBR3ZEOzs7Ozs7R0FNRztBQVFILE1BQU0sT0FBTyxtQkFBbUI7O3FIQUFuQixtQkFBbUI7eUdBQW5CLG1CQUFtQixvR0UvTWhDLDZUQVFBO2dHRnVNYSxtQkFBbUI7a0JBUC9CLFNBQVM7K0JBQ0UsaUJBQWlCLGlCQUVaLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sUUFDekMsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUM7O0FBSXBDOzs7Ozs7R0FNRztBQVFILE1BQU0sT0FBTyx1QkFBdUI7O3lIQUF2Qix1QkFBdUI7NkdBQXZCLHVCQUF1Qiw4R0cvTnBDLCtQQVFBO2dHSHVOYSx1QkFBdUI7a0JBUG5DLFNBQVM7K0JBQ0Usc0JBQXNCLGlCQUVqQixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG4vKipcbiAqIENvbnRlbnQgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2FyZENvbnRlbnRgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NhcmRgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcmQtY29udGVudCwgW21hdC1jYXJkLWNvbnRlbnRdLCBbbWF0Q2FyZENvbnRlbnRdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtY2FyZC1jb250ZW50J30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUNhcmRDb250ZW50IHt9XG5cbi8qKlxuICogVGl0bGUgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2FyZFRpdGxlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9jYXJkYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYG1hdC1jYXJkLXRpdGxlLCBbbWF0LWNhcmQtdGl0bGVdLCBbbWF0Q2FyZFRpdGxlXWAsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWNhcmQtdGl0bGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lDYXJkVGl0bGUge31cblxuLyoqXG4gKiBTdWItdGl0bGUgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2FyZFN1YnRpdGxlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9jYXJkYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYG1hdC1jYXJkLXN1YnRpdGxlLCBbbWF0LWNhcmQtc3VidGl0bGVdLCBbbWF0Q2FyZFN1YnRpdGxlXWAsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWNhcmQtc3VidGl0bGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lDYXJkU3VidGl0bGUge31cblxuLyoqXG4gKiBBY3Rpb24gc2VjdGlvbiBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICogQGRvY3MtcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRDYXJkQWN0aW9uc2AgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtY2FyZC1hY3Rpb25zJyxcbiAgZXhwb3J0QXM6ICdtYXRDYXJkQWN0aW9ucycsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWNhcmQtYWN0aW9ucycsXG4gICAgJ1tjbGFzcy5tYXQtY2FyZC1hY3Rpb25zLWFsaWduLWVuZF0nOiAnYWxpZ24gPT09IFwiZW5kXCInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lDYXJkQWN0aW9ucyB7XG4gIC8qKiBQb3NpdGlvbiBvZiB0aGUgYWN0aW9ucyBpbnNpZGUgdGhlIGNhcmQuICovXG4gIEBJbnB1dCgpIGFsaWduOiAnc3RhcnQnIHwgJ2VuZCcgPSAnc3RhcnQnO1xufVxuXG4vKipcbiAqIEZvb3RlciBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICogQGRvY3MtcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRDYXJkRm9vdGVyYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9jYXJkYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJkLWZvb3RlcicsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LWNhcmQtZm9vdGVyJ30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUNhcmRGb290ZXIge31cblxuLyoqXG4gKiBJbWFnZSB1c2VkIGluIGEgY2FyZCwgbmVlZGVkIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2FyZEltYWdlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9jYXJkYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtY2FyZC1pbWFnZV0sIFttYXRDYXJkSW1hZ2VdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtY2FyZC1pbWFnZSd9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lDYXJkSW1hZ2Uge31cblxuLyoqXG4gKiBJbWFnZSB1c2VkIGluIGEgY2FyZCwgbmVlZGVkIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2FyZFNtSW1hZ2VgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NhcmRgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLXNtLWltYWdlXSwgW21hdENhcmRJbWFnZVNtYWxsXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LWNhcmQtc20taW1hZ2UnfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Q2FyZFNtSW1hZ2Uge31cblxuLyoqXG4gKiBJbWFnZSB1c2VkIGluIGEgY2FyZCwgbmVlZGVkIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2FyZE1kSW1hZ2VgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NhcmRgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1jYXJkLW1kLWltYWdlXSwgW21hdENhcmRJbWFnZU1lZGl1bV0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1jYXJkLW1kLWltYWdlJ30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUNhcmRNZEltYWdlIHt9XG5cbi8qKlxuICogSW1hZ2UgdXNlZCBpbiBhIGNhcmQsIG5lZWRlZCB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcuXG4gKiBAZG9jcy1wcml2YXRlXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdENhcmRMZ0ltYWdlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9jYXJkYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtY2FyZC1sZy1pbWFnZV0sIFttYXRDYXJkSW1hZ2VMYXJnZV0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1jYXJkLWxnLWltYWdlJ30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUNhcmRMZ0ltYWdlIHt9XG5cbi8qKlxuICogTGFyZ2UgaW1hZ2UgdXNlZCBpbiBhIGNhcmQsIG5lZWRlZCB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcuXG4gKiBAZG9jcy1wcml2YXRlXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdENhcmRYbEltYWdlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9jYXJkYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtY2FyZC14bC1pbWFnZV0sIFttYXRDYXJkSW1hZ2VYTGFyZ2VdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtY2FyZC14bC1pbWFnZSd9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lDYXJkWGxJbWFnZSB7fVxuXG4vKipcbiAqIEF2YXRhciBpbWFnZSB1c2VkIGluIGEgY2FyZCwgbmVlZGVkIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2FyZEF2YXRhcmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0LWNhcmQtYXZhdGFyXSwgW21hdENhcmRBdmF0YXJdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtY2FyZC1hdmF0YXInfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Q2FyZEF2YXRhciB7fVxuXG4vKipcbiAqIEEgYmFzaWMgY29udGVudCBjb250YWluZXIgY29tcG9uZW50IHRoYXQgYWRkcyB0aGUgc3R5bGVzIG9mIGEgTWF0ZXJpYWwgZGVzaWduIGNhcmQuXG4gKlxuICogV2hpbGUgdGhpcyBjb21wb25lbnQgY2FuIGJlIHVzZWQgYWxvbmUsIGl0IGFsc28gcHJvdmlkZXMgYSBudW1iZXJcbiAqIG9mIHByZXNldCBzdHlsZXMgZm9yIGNvbW1vbiBjYXJkIHNlY3Rpb25zLCBpbmNsdWRpbmc6XG4gKiAtIG1hdC1jYXJkLXRpdGxlXG4gKiAtIG1hdC1jYXJkLXN1YnRpdGxlXG4gKiAtIG1hdC1jYXJkLWNvbnRlbnRcbiAqIC0gbWF0LWNhcmQtYWN0aW9uc1xuICogLSBtYXQtY2FyZC1mb290ZXJcbiAqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdENhcmRgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NhcmRgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcmQnLFxuICBleHBvcnRBczogJ21hdENhcmQnLFxuICB0ZW1wbGF0ZVVybDogJ2NhcmQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjYXJkLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtY2FyZCBtYXQtZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Q2FyZCB7XG4gIC8vIEBicmVha2luZy1jaGFuZ2UgOS4wLjAgYF9hbmltYXRpb25Nb2RlYCBwYXJhbWV0ZXIgdG8gYmUgbWFkZSByZXF1aXJlZC5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZykge31cbn1cblxuLyoqXG4gKiBDb21wb25lbnQgaW50ZW5kZWQgdG8gYmUgdXNlZCB3aXRoaW4gdGhlIGA8bWF0LWNhcmQ+YCBjb21wb25lbnQuIEl0IGFkZHMgc3R5bGVzIGZvciBhXG4gKiBwcmVzZXQgaGVhZGVyIHNlY3Rpb24gKGkuZS4gYSB0aXRsZSwgc3VidGl0bGUsIGFuZCBhdmF0YXIgbGF5b3V0KS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2FyZEhlYWRlcmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2FyZC1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJ2NhcmQtaGVhZGVyLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtY2FyZC1oZWFkZXInfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Q2FyZEhlYWRlciB7fVxuXG4vKipcbiAqIENvbXBvbmVudCBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGhpbiB0aGUgYDxtYXQtY2FyZD5gIGNvbXBvbmVudC4gSXQgYWRkcyBzdHlsZXMgZm9yIGEgcHJlc2V0XG4gKiBsYXlvdXQgdGhhdCBncm91cHMgYW4gaW1hZ2Ugd2l0aCBhIHRpdGxlIHNlY3Rpb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdENhcmRUaXRsZUdyb3VwYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9jYXJkYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJkLXRpdGxlLWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdjYXJkLXRpdGxlLWdyb3VwLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtY2FyZC10aXRsZS1ncm91cCd9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lDYXJkVGl0bGVHcm91cCB7fVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWF0LWNhcmQtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuIiwiPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21hdC1jYXJkLWF2YXRhcl0sIFttYXRDYXJkQXZhdGFyXVwiPjwvbmctY29udGVudD5cbjxkaXYgY2xhc3M9XCJtYXQtY2FyZC1oZWFkZXItdGV4dFwiPlxuICA8bmctY29udGVudFxuICAgICAgc2VsZWN0PVwibWF0LWNhcmQtdGl0bGUsIG1hdC1jYXJkLXN1YnRpdGxlLFxuICAgICAgW21hdC1jYXJkLXRpdGxlXSwgW21hdC1jYXJkLXN1YnRpdGxlXSxcbiAgICAgIFttYXRDYXJkVGl0bGVdLCBbbWF0Q2FyZFN1YnRpdGxlXVwiPjwvbmctY29udGVudD5cbjwvZGl2PlxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIiwiPGRpdj5cbiAgPG5nLWNvbnRlbnRcbiAgICAgIHNlbGVjdD1cIm1hdC1jYXJkLXRpdGxlLCBtYXQtY2FyZC1zdWJ0aXRsZSxcbiAgICAgIFttYXQtY2FyZC10aXRsZV0sIFttYXQtY2FyZC1zdWJ0aXRsZV0sXG4gICAgICBbbWF0Q2FyZFRpdGxlXSwgW21hdENhcmRTdWJ0aXRsZV1cIj48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbjxuZy1jb250ZW50IHNlbGVjdD1cImltZ1wiPjwvbmctY29udGVudD5cbjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==