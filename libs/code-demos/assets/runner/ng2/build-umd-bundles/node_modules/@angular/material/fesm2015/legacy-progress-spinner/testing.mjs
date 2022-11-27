import { __awaiter } from 'tslib';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

/**
 * Harness for interacting with a standard mat-progress-spinner in tests.
 * @deprecated Use `MatProgressSpinnerHarness` from `@angular/material/progress-spinner/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyProgressSpinnerHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatProgressSpinnerHarness` that
     * meets certain criteria.
     * @param options Options for filtering which progress spinner instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyProgressSpinnerHarness, options);
    }
    /** Gets the progress spinner's value. */
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const host = yield this.host();
            const ariaValue = yield host.getAttribute('aria-valuenow');
            return ariaValue ? coerceNumberProperty(ariaValue) : null;
        });
    }
    /** Gets the progress spinner's mode. */
    getMode() {
        return __awaiter(this, void 0, void 0, function* () {
            const modeAttr = (yield this.host()).getAttribute('mode');
            return (yield modeAttr);
        });
    }
}
/** The selector for the host element of a Progress Spinner instance. */
MatLegacyProgressSpinnerHarness.hostSelector = '.mat-progress-spinner';

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

export { MatLegacyProgressSpinnerHarness };
//# sourceMappingURL=testing.mjs.map
