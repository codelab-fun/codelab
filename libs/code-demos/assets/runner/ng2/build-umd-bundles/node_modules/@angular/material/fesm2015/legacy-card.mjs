import * as i0 from '@angular/core';
import { Directive, Input, Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, Inject, NgModule } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Content of a card, needed as it's used as a selector in the API.
 * @docs-private
 * @deprecated Use `MatCardContent` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyCardContent {
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
class MatLegacyCardTitle {
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
class MatLegacyCardSubtitle {
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
class MatLegacyCardActions {
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
class MatLegacyCardFooter {
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
class MatLegacyCardImage {
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
class MatLegacyCardSmImage {
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
class MatLegacyCardMdImage {
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
class MatLegacyCardLgImage {
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
class MatLegacyCardXlImage {
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
class MatLegacyCardAvatar {
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
class MatLegacyCard {
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
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [ANIMATION_MODULE_TYPE]
                    }] }];
    } });
/**
 * Component intended to be used within the `<mat-card>` component. It adds styles for a
 * preset header section (i.e. a title, subtitle, and avatar layout).
 * @docs-private
 * @deprecated Use `MatCardHeader` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyCardHeader {
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
class MatLegacyCardTitleGroup {
}
MatLegacyCardTitleGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardTitleGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
MatLegacyCardTitleGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyCardTitleGroup, selector: "mat-card-title-group", host: { classAttribute: "mat-card-title-group" }, ngImport: i0, template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"img\"></ng-content>\n<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardTitleGroup, decorators: [{
            type: Component,
            args: [{ selector: 'mat-card-title-group', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'class': 'mat-card-title-group' }, template: "<div>\n  <ng-content\n      select=\"mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]\"></ng-content>\n</div>\n<ng-content select=\"img\"></ng-content>\n<ng-content></ng-content>\n" }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @deprecated Use `MatCardModule` from `@angular/material/card` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyCardModule {
}
MatLegacyCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardModule, declarations: [MatLegacyCard,
        MatLegacyCardHeader,
        MatLegacyCardTitleGroup,
        MatLegacyCardContent,
        MatLegacyCardTitle,
        MatLegacyCardSubtitle,
        MatLegacyCardActions,
        MatLegacyCardFooter,
        MatLegacyCardSmImage,
        MatLegacyCardMdImage,
        MatLegacyCardLgImage,
        MatLegacyCardImage,
        MatLegacyCardXlImage,
        MatLegacyCardAvatar], imports: [MatCommonModule], exports: [MatLegacyCard,
        MatLegacyCardHeader,
        MatLegacyCardTitleGroup,
        MatLegacyCardContent,
        MatLegacyCardTitle,
        MatLegacyCardSubtitle,
        MatLegacyCardActions,
        MatLegacyCardFooter,
        MatLegacyCardSmImage,
        MatLegacyCardMdImage,
        MatLegacyCardLgImage,
        MatLegacyCardImage,
        MatLegacyCardXlImage,
        MatLegacyCardAvatar,
        MatCommonModule] });
MatLegacyCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardModule, imports: [MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule],
                    exports: [
                        MatLegacyCard,
                        MatLegacyCardHeader,
                        MatLegacyCardTitleGroup,
                        MatLegacyCardContent,
                        MatLegacyCardTitle,
                        MatLegacyCardSubtitle,
                        MatLegacyCardActions,
                        MatLegacyCardFooter,
                        MatLegacyCardSmImage,
                        MatLegacyCardMdImage,
                        MatLegacyCardLgImage,
                        MatLegacyCardImage,
                        MatLegacyCardXlImage,
                        MatLegacyCardAvatar,
                        MatCommonModule,
                    ],
                    declarations: [
                        MatLegacyCard,
                        MatLegacyCardHeader,
                        MatLegacyCardTitleGroup,
                        MatLegacyCardContent,
                        MatLegacyCardTitle,
                        MatLegacyCardSubtitle,
                        MatLegacyCardActions,
                        MatLegacyCardFooter,
                        MatLegacyCardSmImage,
                        MatLegacyCardMdImage,
                        MatLegacyCardLgImage,
                        MatLegacyCardImage,
                        MatLegacyCardXlImage,
                        MatLegacyCardAvatar,
                    ],
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

export { MatLegacyCard, MatLegacyCardActions, MatLegacyCardAvatar, MatLegacyCardContent, MatLegacyCardFooter, MatLegacyCardHeader, MatLegacyCardImage, MatLegacyCardLgImage, MatLegacyCardMdImage, MatLegacyCardModule, MatLegacyCardSmImage, MatLegacyCardSubtitle, MatLegacyCardTitle, MatLegacyCardTitleGroup, MatLegacyCardXlImage };
//# sourceMappingURL=legacy-card.mjs.map
