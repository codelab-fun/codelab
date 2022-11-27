import { HarnessPredicate } from '@angular/cdk/testing';
import { MatLegacySelectHarness } from '@angular/material/legacy-select/testing';
import { _MatPaginatorHarnessBase } from '@angular/material/paginator/testing';
export { _MatPaginatorHarnessBase as _MatLegacyPaginatorHarnessBase } from '@angular/material/paginator/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard mat-paginator in tests.
 * @deprecated Use `MatPaginatorHarness` from `@angular/material/paginator/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyPaginatorHarness extends _MatPaginatorHarnessBase {
    constructor() {
        super(...arguments);
        this._nextButton = this.locatorFor('.mat-paginator-navigation-next');
        this._previousButton = this.locatorFor('.mat-paginator-navigation-previous');
        this._firstPageButton = this.locatorForOptional('.mat-paginator-navigation-first');
        this._lastPageButton = this.locatorForOptional('.mat-paginator-navigation-last');
        this._select = this.locatorForOptional(MatLegacySelectHarness.with({
            ancestor: '.mat-paginator-page-size',
        }));
        this._pageSizeFallback = this.locatorFor('.mat-paginator-page-size-value');
        this._rangeLabel = this.locatorFor('.mat-paginator-range-label');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatPaginatorHarness` that meets
     * certain criteria.
     * @param options Options for filtering which paginator instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyPaginatorHarness, options);
    }
}
/** Selector used to find paginator instances. */
MatLegacyPaginatorHarness.hostSelector = '.mat-paginator';

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

export { MatLegacyPaginatorHarness };
//# sourceMappingURL=testing.mjs.map
