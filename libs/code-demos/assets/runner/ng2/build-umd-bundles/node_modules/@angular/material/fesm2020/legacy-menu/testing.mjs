import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatMenuHarnessBase, _MatMenuItemHarnessBase } from '@angular/material/menu/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard mat-menu in tests.
 * @deprecated Use `MatMenuHarness` from `@angular/material/menu/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyMenuHarness extends _MatMenuHarnessBase {
    constructor() {
        super(...arguments);
        this._itemClass = MatLegacyMenuItemHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatMenuHarness` that meets certain
     * criteria.
     * @param options Options for filtering which menu instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyMenuHarness, options).addOption('triggerText', options.triggerText, (harness, text) => HarnessPredicate.stringMatches(harness.getTriggerText(), text));
    }
}
/** The selector for the host element of a `MatMenu` instance. */
MatLegacyMenuHarness.hostSelector = '.mat-menu-trigger';
/**
 * Harness for interacting with a standard mat-menu-item in tests.
 * @deprecated Use `MatMenuItemHarness` from `@angular/material/menu/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyMenuItemHarness extends _MatMenuItemHarnessBase {
    constructor() {
        super(...arguments);
        this._menuClass = MatLegacyMenuHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatMenuItemHarness` that meets
     * certain criteria.
     * @param options Options for filtering which menu item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyMenuItemHarness, options)
            .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
            .addOption('hasSubmenu', options.hasSubmenu, async (harness, hasSubmenu) => (await harness.hasSubmenu()) === hasSubmenu);
    }
}
/** The selector for the host element of a `MatMenuItem` instance. */
MatLegacyMenuItemHarness.hostSelector = '.mat-menu-item';

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

export { MatLegacyMenuHarness, MatLegacyMenuItemHarness };
//# sourceMappingURL=testing.mjs.map
