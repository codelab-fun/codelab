import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatTooltipHarnessBase } from '@angular/material/tooltip/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard mat-tooltip in tests.
 * @deprecated Use `MatTooltipHarness` from `@angular/material/tooltip/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyTooltipHarness extends _MatTooltipHarnessBase {
    constructor() {
        super(...arguments);
        this._optionalPanel = this.documentRootLocatorFactory().locatorForOptional('.mat-tooltip');
        this._hiddenClass = 'mat-tooltip-hide';
        this._showAnimationName = 'mat-tooltip-show';
        this._hideAnimationName = 'mat-tooltip-hide';
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search
     * for a tooltip trigger with specific attributes.
     * @param options Options for narrowing the search.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyTooltipHarness, options);
    }
}
MatLegacyTooltipHarness.hostSelector = '.mat-tooltip-trigger';

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

export { MatLegacyTooltipHarness };
//# sourceMappingURL=testing.mjs.map
