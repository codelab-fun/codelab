import { ComponentHarness, HarnessPredicate, ContentContainerComponentHarness, TestKey, parallel } from '@angular/cdk/testing';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a standard Material chip avatar in tests. */
class MatChipAvatarHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip avatar with specific
     * attributes.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
MatChipAvatarHarness.hostSelector = '.mat-mdc-chip-avatar';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a standard Material chip remove button in tests. */
class MatChipRemoveHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip remove with specific
     * attributes.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
    /** Clicks the remove button. */
    async click() {
        return (await this.host()).click();
    }
}
MatChipRemoveHarness.hostSelector = '.mat-mdc-chip-remove';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip in tests. */
class MatChipHarness extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._primaryAction = this.locatorFor('.mdc-evolution-chip__action--primary');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip with specific attributes.
     * @param options Options for narrowing the search.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('text', options.text, (harness, label) => {
            return HarnessPredicate.stringMatches(harness.getText(), label);
        });
    }
    /** Gets a promise for the text content the option. */
    async getText() {
        return (await this.host()).text({
            exclude: '.mat-mdc-chip-avatar, .mat-mdc-chip-trailing-icon, .mat-icon',
        });
    }
    /** Whether the chip is disabled. */
    async isDisabled() {
        return (await this.host()).hasClass('mat-mdc-chip-disabled');
    }
    /** Delete a chip from the set. */
    async remove() {
        const hostEl = await this.host();
        await hostEl.sendKeys(TestKey.DELETE);
    }
    /**
     * Gets the remove button inside of a chip.
     * @param filter Optionally filters which chips are included.
     */
    async getRemoveButton(filter = {}) {
        return this.locatorFor(MatChipRemoveHarness.with(filter))();
    }
    /**
     * Gets the avatar inside a chip.
     * @param filter Optionally filters which avatars are included.
     */
    async getAvatar(filter = {}) {
        return this.locatorForOptional(MatChipAvatarHarness.with(filter))();
    }
}
MatChipHarness.hostSelector = '.mat-mdc-basic-chip, .mat-mdc-chip';

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
/** Harness for interacting with a grid's chip input in tests. */
class MatChipInputHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip input with specific
     * attributes.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options)
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
        return await (await this.host()).getProperty('value');
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
MatChipInputHarness.hostSelector = '.mat-mdc-chip-input';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-option in tests. */
class MatChipOptionHarness extends MatChipHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip option with specific
     * attributes.
     * @param options Options for narrowing the search.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatChipOptionHarness, options)
            .addOption('text', options.text, (harness, label) => HarnessPredicate.stringMatches(harness.getText(), label))
            .addOption('selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected);
    }
    /** Whether the chip is selected. */
    async isSelected() {
        return (await this.host()).hasClass('mat-mdc-chip-selected');
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
        return (await this._primaryAction()).click();
    }
}
MatChipOptionHarness.hostSelector = '.mat-mdc-chip-option';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-listbox in tests. */
class MatChipListboxHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip listbox with specific
     * attributes.
     * @param options Options for narrowing the search.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
    /** Gets whether the chip listbox is disabled. */
    async isDisabled() {
        return (await (await this.host()).getAttribute('aria-disabled')) === 'true';
    }
    /** Gets whether the chip listbox is required. */
    async isRequired() {
        return (await (await this.host()).getAttribute('aria-required')) === 'true';
    }
    /** Gets whether the chip listbox is in multi selection mode. */
    async isMultiple() {
        return (await (await this.host()).getAttribute('aria-multiselectable')) === 'true';
    }
    /** Gets whether the orientation of the chip list. */
    async getOrientation() {
        const orientation = await (await this.host()).getAttribute('aria-orientation');
        return orientation === 'vertical' ? 'vertical' : 'horizontal';
    }
    /**
     * Gets the list of chips inside the chip list.
     * @param filter Optionally filters which chips are included.
     */
    async getChips(filter = {}) {
        return this.locatorForAll(MatChipOptionHarness.with(filter))();
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
MatChipListboxHarness.hostSelector = '.mat-mdc-chip-listbox';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO(crisbeto): add harness for the chip edit input inside the row.
/** Harness for interacting with a mat-chip-row in tests. */
class MatChipRowHarness extends MatChipHarness {
    /** Whether the chip is editable. */
    async isEditable() {
        return (await this.host()).hasClass('mat-mdc-chip-editable');
    }
    /** Whether the chip is currently being edited. */
    async isEditing() {
        return (await this.host()).hasClass('mat-mdc-chip-editing');
    }
}
MatChipRowHarness.hostSelector = '.mat-mdc-chip-row';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-grid in tests. */
class MatChipGridHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip grid with specific attributes.
     * @param options Options for filtering which chip grid instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
    /** Gets whether the chip grid is disabled. */
    async isDisabled() {
        return (await (await this.host()).getAttribute('aria-disabled')) === 'true';
    }
    /** Gets whether the chip grid is required. */
    async isRequired() {
        return await (await this.host()).hasClass('mat-mdc-chip-list-required');
    }
    /** Gets whether the chip grid is invalid. */
    async isInvalid() {
        return (await (await this.host()).getAttribute('aria-invalid')) === 'true';
    }
    /** Gets promise of the harnesses for the chip rows. */
    getRows(filter = {}) {
        return this.locatorForAll(MatChipRowHarness.with(filter))();
    }
    /** Gets promise of the chip text input harness. */
    getInput(filter = {}) {
        return this.locatorFor(MatChipInputHarness.with(filter))();
    }
}
MatChipGridHarness.hostSelector = '.mat-mdc-chip-grid';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a mat-chip-set in tests. */
class MatChipSetHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a chip set with specific attributes.
     * @param options Options for filtering which chip set instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
    /** Gets promise of the harnesses for the chips. */
    async getChips(filter = {}) {
        return await this.locatorForAll(MatChipHarness.with(filter))();
    }
}
MatChipSetHarness.hostSelector = '.mat-mdc-chip-set';

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

export { MatChipAvatarHarness, MatChipGridHarness, MatChipHarness, MatChipInputHarness, MatChipListboxHarness, MatChipOptionHarness, MatChipRemoveHarness, MatChipRowHarness, MatChipSetHarness };
//# sourceMappingURL=testing.mjs.map
