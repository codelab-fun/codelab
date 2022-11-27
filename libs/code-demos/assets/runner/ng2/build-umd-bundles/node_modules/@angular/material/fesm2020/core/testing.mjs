import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with an MDC-based `mat-option` in tests. */
class MatOptionHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        /** Element containing the option's text. */
        this._text = this.locatorFor('.mdc-list-item__primary-text');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for an option with specific attributes.
     * @param options Options for filtering which option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options)
            .addOption('text', options.text, async (harness, title) => HarnessPredicate.stringMatches(await harness.getText(), title))
            .addOption('isSelected', options.isSelected, async (harness, isSelected) => (await harness.isSelected()) === isSelected);
    }
    /** Clicks the option. */
    async click() {
        return (await this.host()).click();
    }
    /** Gets the option's label text. */
    async getText() {
        return (await this._text()).text();
    }
    /** Gets whether the option is disabled. */
    async isDisabled() {
        return (await this.host()).hasClass('mdc-list-item--disabled');
    }
    /** Gets whether the option is selected. */
    async isSelected() {
        return (await this.host()).hasClass('mdc-list-item--selected');
    }
    /** Gets whether the option is active. */
    async isActive() {
        return (await this.host()).hasClass('mat-mdc-option-active');
    }
    /** Gets whether the option is in multiple selection mode. */
    async isMultiple() {
        return (await this.host()).hasClass('mat-mdc-option-multiple');
    }
}
/** Selector used to locate option instances. */
MatOptionHarness.hostSelector = '.mat-mdc-option';

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
/** Harness for interacting with an MDC-based `mat-optgroup` in tests. */
class MatOptgroupHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        this._label = this.locatorFor('.mat-mdc-optgroup-label');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a option group with specific
     * attributes.
     * @param options Options for filtering which option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('labelText', options.labelText, async (harness, title) => HarnessPredicate.stringMatches(await harness.getLabelText(), title));
    }
    /** Gets the option group's label text. */
    async getLabelText() {
        return (await this._label()).text();
    }
    /** Gets whether the option group is disabled. */
    async isDisabled() {
        return (await (await this.host()).getAttribute('aria-disabled')) === 'true';
    }
    /**
     * Gets the options that are inside the group.
     * @param filter Optionally filters which options are included.
     */
    async getOptions(filter = {}) {
        return this.locatorForAll(MatOptionHarness.with(filter))();
    }
}
/** Selector used to locate option group instances. */
MatOptgroupHarness.hostSelector = '.mat-mdc-optgroup';

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
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { MatOptgroupHarness, MatOptionHarness };
//# sourceMappingURL=testing.mjs.map
