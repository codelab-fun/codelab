import { __awaiter } from 'tslib';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

/** Harness for interacting with an MDC-based `mat-progress-bar` in tests. */
class MatProgressBarHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a progress bar with specific
     * attributes.
     * @param options Options for filtering which progress bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
    /** Gets a promise for the progress bar's value. */
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const host = yield this.host();
            const ariaValue = yield host.getAttribute('aria-valuenow');
            return ariaValue ? coerceNumberProperty(ariaValue) : null;
        });
    }
    /** Gets a promise for the progress bar's mode. */
    getMode() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getAttribute('mode');
        });
    }
}
MatProgressBarHarness.hostSelector = '.mat-mdc-progress-bar';

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

export { MatProgressBarHarness };
//# sourceMappingURL=testing.mjs.map
