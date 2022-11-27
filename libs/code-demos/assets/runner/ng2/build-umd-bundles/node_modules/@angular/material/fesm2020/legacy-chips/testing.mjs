import { ComponentHarness, HarnessPredicate, ContentContainerComponentHarness, TestKey, parallel } from '@angular/cdk/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard Material chip avatar in tests.
 * @deprecated Use `MatChipAvatarHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyChipAvatarHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipAvatarHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyChipAvatarHarness, options);
    }
}
MatLegacyChipAvatarHarness.hostSelector = '.mat-chip-avatar';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard Material chip remove button in tests.
 * @deprecated Use `MatChipRemoveHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyChipRemoveHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipRemoveHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyChipRemoveHarness, options);
    }
    /** Clicks the remove button. */
    async click() {
        return (await this.host()).click();
    }
}
MatLegacyChipRemoveHarness.hostSelector = '.mat-chip-remove';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard selectable Angular Material chip in tests.
 * @deprecated Use `MatChipHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyChipHarness extends ContentContainerComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipHarness` that meets
     * certain criteria.
     * @param options Options for filtering which chip instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyChipHarness, options)
            .addOption('text', options.text, (harness, label) => HarnessPredicate.stringMatches(harness.getText(), label))
            .addOption('selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected);
    }
    /** Gets the text of the chip. */
    async getText() {
        return (await this.host()).text({
            exclude: '.mat-chip-avatar, .mat-chip-trailing-icon, .mat-icon',
        });
    }
    /**
     * Whether the chip is selected.
     * @deprecated Use `MatChipOptionHarness.isSelected` instead.
     * @breaking-change 12.0.0
     */
    async isSelected() {
        return (await this.host()).hasClass('mat-chip-selected');
    }
    /** Whether the chip is disabled. */
    async isDisabled() {
        return (await this.host()).hasClass('mat-chip-disabled');
    }
    /**
     * Selects the given chip. Only applies if it's selectable.
     * @deprecated Use `MatChipOptionHarness.select` instead.
     * @breaking-change 12.0.0
     */
    async select() {
        if (!(await this.isSelected())) {
            await this.toggle();
        }
    }
    /**
     * Deselects the given chip. Only applies if it's selectable.
     * @deprecated Use `MatChipOptionHarness.deselect` instead.
     * @breaking-change 12.0.0
     */
    async deselect() {
        if (await this.isSelected()) {
            await this.toggle();
        }
    }
    /**
     * Toggles the selected state of the given chip. Only applies if it's selectable.
     * @deprecated Use `MatChipOptionHarness.toggle` instead.
     * @breaking-change 12.0.0
     */
    async toggle() {
        return (await this.host()).sendKeys(' ');
    }
    /** Removes the given chip. Only applies if it's removable. */
    async remove() {
        await (await this.host()).sendKeys(TestKey.DELETE);
    }
    /**
     * Gets the remove button inside of a chip.
     * @param filter Optionally filters which remove buttons are included.
     */
    async getRemoveButton(filter = {}) {
        return this.locatorFor(MatLegacyChipRemoveHarness.with(filter))();
    }
    /**
     * Gets the avatar inside a chip.
     * @param filter Optionally filters which avatars are included.
     */
    async getAvatar(filter = {}) {
        return this.locatorForOptional(MatLegacyChipAvatarHarness.with(filter))();
    }
}
/** The selector for the host element of a `MatChip` instance. */
MatLegacyChipHarness.hostSelector = '.mat-chip';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard Material chip inputs in tests.
 * @deprecated Use `MatChipInputHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyChipInputHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipInputHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyChipInputHarness, options)
            .addOption('value', options.value, async (harness, value) => {
            return (await harness.getValue()) === value;
        })
            .addOption('placeholder', options.placeholder, async (harness, placeholder) => {
            return (await harness.getPlaceholder()) === placeholder;
        });
    }
    /** Whether the input is disabled. */
    async isDisabled() {
        return (await this.host()).getProperty('disabled');
    }
    /** Whether the input is required. */
    async isRequired() {
        return (await this.host()).getProperty('required');
    }
    /** Gets the value of the input. */
    async getValue() {
        // The "value" property of the native input is never undefined.
        return (await (await this.host()).getProperty('value'));
    }
    /** Gets the placeholder of the input. */
    async getPlaceholder() {
        return await (await this.host()).getProperty('placeholder');
    }
    /**
     * Focuses the input and returns a promise that indicates when the
     * action is complete.
     */
    async focus() {
        return (await this.host()).focus();
    }
    /**
     * Blurs the input and returns a promise that indicates when the
     * action is complete.
     */
    async blur() {
        return (await this.host()).blur();
    }
    /** Whether the input is focused. */
    async isFocused() {
        return (await this.host()).isFocused();
    }
    /**
     * Sets the value of the input. The value will be set by simulating
     * keypresses that correspond to the given value.
     */
    async setValue(newValue) {
        const inputEl = await this.host();
        await inputEl.clear();
        // We don't want to send keys for the value if the value is an empty
        // string in order to clear the value. Sending keys with an empty string
        // still results in unnecessary focus events.
        if (newValue) {
            await inputEl.sendKeys(newValue);
        }
    }
    /** Sends a chip separator key to the input element. */
    async sendSeparatorKey(key) {
        const inputEl = await this.host();
        return inputEl.sendKeys(key);
    }
}
MatLegacyChipInputHarness.hostSelector = '.mat-chip-input';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Base class for chip list harnesses.
 * @deprecated Use `class` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class _MatChipListHarnessBase extends ComponentHarness {
    /** Gets whether the chip list is disabled. */
    async isDisabled() {
        return (await (await this.host()).getAttribute('aria-disabled')) === 'true';
    }
    /** Gets whether the chip list is required. */
    async isRequired() {
        return (await (await this.host()).getAttribute('aria-required')) === 'true';
    }
    /** Gets whether the chip list is invalid. */
    async isInvalid() {
        return (await (await this.host()).getAttribute('aria-invalid')) === 'true';
    }
    /** Gets whether the chip list is in multi selection mode. */
    async isMultiple() {
        return (await (await this.host()).getAttribute('aria-multiselectable')) === 'true';
    }
    /** Gets whether the orientation of the chip list. */
    async getOrientation() {
        const orientation = await (await this.host()).getAttribute('aria-orientation');
        return orientation === 'vertical' ? 'vertical' : 'horizontal';
    }
}
/**
 * Harness for interacting with a standard chip list in tests.
 * @deprecated Use `MatChipListHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyChipListHarness extends _MatChipListHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which chip list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyChipListHarness, options);
    }
    /**
     * Gets the list of chips inside the chip list.
     * @param filter Optionally filters which chips are included.
     */
    async getChips(filter = {}) {
        return this.locatorForAll(MatLegacyChipHarness.with(filter))();
    }
    /**
     * Selects a chip inside the chip list.
     * @param filter An optional filter to apply to the child chips.
     *    All the chips matching the filter will be selected.
     * @deprecated Use `MatChipListboxHarness.selectChips` instead.
     * @breaking-change 12.0.0
     */
    async selectChips(filter = {}) {
        const chips = await this.getChips(filter);
        if (!chips.length) {
            throw Error(`Cannot find chip matching filter ${JSON.stringify(filter)}`);
        }
        await parallel(() => chips.map(chip => chip.select()));
    }
    /**
     * Gets the `MatChipInput` inside the chip list.
     * @param filter Optionally filters which chip input is included.
     */
    async getInput(filter = {}) {
        // The input isn't required to be a descendant of the chip list so we have to look it up by id.
        const inputId = await (await this.host()).getAttribute('data-mat-chip-input');
        if (!inputId) {
            throw Error(`Chip list is not associated with an input`);
        }
        return this.documentRootLocatorFactory().locatorFor(MatLegacyChipInputHarness.with({ ...filter, selector: `#${inputId}` }))();
    }
}
/** The selector for the host element of a `MatChipList` instance. */
MatLegacyChipListHarness.hostSelector = '.mat-chip-list';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @deprecated Use `MatChipOptionHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyChipOptionHarness extends MatLegacyChipHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipOptionHarness`
     * that meets certain criteria.
     * @param options Options for filtering which chip instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyChipOptionHarness, options)
            .addOption('text', options.text, (harness, label) => HarnessPredicate.stringMatches(harness.getText(), label))
            .addOption('selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected);
    }
    /** Whether the chip is selected. */
    async isSelected() {
        return (await this.host()).hasClass('mat-chip-selected');
    }
    /** Selects the given chip. Only applies if it's selectable. */
    async select() {
        if (!(await this.isSelected())) {
            await this.toggle();
        }
    }
    /** Deselects the given chip. Only applies if it's selectable. */
    async deselect() {
        if (await this.isSelected()) {
            await this.toggle();
        }
    }
    /** Toggles the selected state of the given chip. */
    async toggle() {
        return (await this.host()).sendKeys(' ');
    }
}
/** The selector for the host element of a selectable chip instance. */
MatLegacyChipOptionHarness.hostSelector = '.mat-chip';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard selectable chip list in tests.
 * @deprecated Use `MatChipListboxHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyChipListboxHarness extends _MatChipListHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which chip list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyChipListboxHarness, options);
    }
    /**
     * Gets the list of chips inside the chip list.
     * @param filter Optionally filters which chips are included.
     */
    async getChips(filter = {}) {
        return this.locatorForAll(MatLegacyChipOptionHarness.with(filter))();
    }
    /**
     * Selects a chip inside the chip list.
     * @param filter An optional filter to apply to the child chips.
     *    All the chips matching the filter will be selected.
     */
    async selectChips(filter = {}) {
        const chips = await this.getChips(filter);
        if (!chips.length) {
            throw Error(`Cannot find chip matching filter ${JSON.stringify(filter)}`);
        }
        await parallel(() => chips.map(chip => chip.select()));
    }
}
/** The selector for the host element of a `MatChipList` instance. */
MatLegacyChipListboxHarness.hostSelector = '.mat-chip-list';

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

export { MatLegacyChipHarness, MatLegacyChipInputHarness, MatLegacyChipListHarness, MatLegacyChipListboxHarness, MatLegacyChipOptionHarness, MatLegacyChipRemoveHarness };
//# sourceMappingURL=testing.mjs.map
