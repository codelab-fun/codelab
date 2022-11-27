import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatDialogHarnessBase, _MatTestDialogOpenerBase } from '@angular/material/dialog/testing';
import { __decorate, __metadata } from 'tslib';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { MatLegacyDialog, MatLegacyDialogModule } from '@angular/material/legacy-dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard `MatDialog` in tests.
 * @deprecated Use `MatDialogHarness` from `@angular/material/dialog/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyDialogHarness extends _MatDialogHarnessBase {
    constructor() {
        super(...arguments);
        this._title = this.locatorForOptional(".mat-dialog-title" /* MatLegacyDialogSection.TITLE */);
        this._content = this.locatorForOptional(".mat-dialog-content" /* MatLegacyDialogSection.CONTENT */);
        this._actions = this.locatorForOptional(".mat-dialog-actions" /* MatLegacyDialogSection.ACTIONS */);
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatDialogHarness` that meets
     * certain criteria.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyDialogHarness, options);
    }
}
// Developers can provide a custom component or template for the
// dialog. The canonical dialog parent is the "MatDialogContainer".
/** The selector for the host element of a `MatDialog` instance. */
MatLegacyDialogHarness.hostSelector = '.mat-dialog-container';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MatTestLegacyDialogOpener_1;
/**
 * Test component that immediately opens a dialog when created.
 * @deprecated Use `MatTestDialogOpener` from `@angular/material/dialog/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
let MatTestLegacyDialogOpener = MatTestLegacyDialogOpener_1 = class MatTestLegacyDialogOpener extends _MatTestDialogOpenerBase {
    constructor(dialog) {
        super(dialog);
    }
    /** Static method that prepares this class to open the provided component. */
    static withComponent(component, config) {
        _MatTestDialogOpenerBase.component = component;
        _MatTestDialogOpenerBase.config = config;
        return MatTestLegacyDialogOpener_1;
    }
};
MatTestLegacyDialogOpener = MatTestLegacyDialogOpener_1 = __decorate([
    Component({
        selector: 'mat-test-dialog-opener',
        template: '',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
    }),
    __metadata("design:paramtypes", [MatLegacyDialog])
], MatTestLegacyDialogOpener);
/**
 * @deprecated Use `MatTestDialogOpenerModule` from `@angular/material/dialog/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
let MatTestLegacyDialogOpenerModule = class MatTestLegacyDialogOpenerModule {
};
MatTestLegacyDialogOpenerModule = __decorate([
    NgModule({
        declarations: [MatTestLegacyDialogOpener],
        imports: [MatLegacyDialogModule, NoopAnimationsModule],
    })
], MatTestLegacyDialogOpenerModule);

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

export { MatLegacyDialogHarness, MatTestLegacyDialogOpener, MatTestLegacyDialogOpenerModule };
//# sourceMappingURL=testing.mjs.map
