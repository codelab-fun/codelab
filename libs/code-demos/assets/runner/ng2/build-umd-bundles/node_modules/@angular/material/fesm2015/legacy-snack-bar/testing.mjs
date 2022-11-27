import { __awaiter } from 'tslib';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatSnackBarHarnessBase } from '@angular/material/snack-bar/testing';

/**
 * Harness for interacting with a standard mat-snack-bar in tests.
 * @deprecated Use `MatSnackBarHarness` from `@angular/material/snack-bar/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacySnackBarHarness extends _MatSnackBarHarnessBase {
    constructor() {
        super(...arguments);
        this._messageSelector = '.mat-simple-snackbar > span';
        this._actionButtonSelector = '.mat-simple-snackbar-action > button';
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a snack bar with specific attributes.
     * @param options Options for filtering which snack bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacySnackBarHarness, options);
    }
    _assertContentAnnotated() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._isSimpleSnackBar())) {
                throw Error('Method cannot be used for snack-bar with custom content.');
            }
        });
    }
    /** Whether the snack-bar is using the default content template. */
    _isSimpleSnackBar() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.locatorForOptional('.mat-simple-snackbar')()) !== null;
        });
    }
}
// Developers can provide a custom component or template for the snackbar. The canonical snack-bar
// parent is the "MatSnackBarContainer". We use `:not([mat-exit])` to exclude snack bars that
// are in the process of being dismissed, because the element only gets removed after the
// animation is finished and since it runs outside of Angular, we don't have a way of being
// notified when it's done.
/** The selector for the host element of a `MatSnackBar` instance. */
MatLegacySnackBarHarness.hostSelector = '.mat-snack-bar-container';

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

export { MatLegacySnackBarHarness };
//# sourceMappingURL=testing.mjs.map
