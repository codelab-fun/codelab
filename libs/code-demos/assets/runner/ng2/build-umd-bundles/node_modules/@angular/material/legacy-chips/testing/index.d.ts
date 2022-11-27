import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { TestKey } from '@angular/cdk/testing';

/**
 * A set of criteria that can be used to filter a list of `MatChipAvatarHarness` instances.
 * @deprecated Use `ChipAvatarHarnessFilters` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyChipAvatarHarnessFilters extends BaseHarnessFilters {
}

/**
 * A set of criteria that can be used to filter a list of chip instances.
 * @deprecated Use `ChipHarnessFilters` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyChipHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
    /**
     * Only find chip instances whose selected state matches the given value.
     * @deprecated Use Legacy Chip Option Harness together with Legacy Chip Option Harness Filters.
     * @breaking-change 12.0.0
     */
    selected?: boolean;
}

/**
 * A set of criteria that can be used to filter a list of `MatChipListInputHarness` instances.
 * @deprecated Use `ChipInputHarnessFilters` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyChipInputHarnessFilters extends BaseHarnessFilters {
    /** Filters based on the value of the input. */
    value?: string | RegExp;
    /** Filters based on the placeholder text of the input. */
    placeholder?: string | RegExp;
}

/**
 * A set of criteria that can be used to filter selectable chip list instances.
 * @deprecated Use `ChipListboxHarnessFilters` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyChipListboxHarnessFilters extends BaseHarnessFilters {
}

/**
 * A set of criteria that can be used to filter chip list instances.
 * @deprecated Use `ChipListHarnessFilters` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyChipListHarnessFilters extends BaseHarnessFilters {
}

/**
 * A set of criteria that can be used to filter a list of selectable chip instances.
 * @deprecated Use `ChipOptionHarnessFilters` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyChipOptionHarnessFilters extends LegacyChipHarnessFilters {
    /** Only find chip instances whose selected state matches the given value. */
    selected?: boolean;
}

/**
 * A set of criteria that can be used to filter a list of `MatChipRemoveHarness` instances.
 * @deprecated Use `ChipRemoveHarnessFilters` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyChipRemoveHarnessFilters extends BaseHarnessFilters {
}

/**
 * Base class for chip list harnesses.
 * @deprecated Use `class` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
declare abstract class _MatChipListHarnessBase extends ComponentHarness {
    /** Gets whether the chip list is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets whether the chip list is required. */
    isRequired(): Promise<boolean>;
    /** Gets whether the chip list is invalid. */
    isInvalid(): Promise<boolean>;
    /** Gets whether the chip list is in multi selection mode. */
    isMultiple(): Promise<boolean>;
    /** Gets whether the orientation of the chip list. */
    getOrientation(): Promise<'horizontal' | 'vertical'>;
}

/**
 * Harness for interacting with a standard Material chip avatar in tests.
 * @deprecated Use `MatChipAvatarHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
declare class MatLegacyChipAvatarHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipAvatarHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyChipAvatarHarnessFilters): HarnessPredicate<MatLegacyChipAvatarHarness>;
}

/**
 * Harness for interacting with a standard selectable Angular Material chip in tests.
 * @deprecated Use `MatChipHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyChipHarness extends ContentContainerComponentHarness {
    /** The selector for the host element of a `MatChip` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipHarness` that meets
     * certain criteria.
     * @param options Options for filtering which chip instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyChipHarnessFilters): HarnessPredicate<MatLegacyChipHarness>;
    /** Gets the text of the chip. */
    getText(): Promise<string>;
    /**
     * Whether the chip is selected.
     * @deprecated Use `MatChipOptionHarness.isSelected` instead.
     * @breaking-change 12.0.0
     */
    isSelected(): Promise<boolean>;
    /** Whether the chip is disabled. */
    isDisabled(): Promise<boolean>;
    /**
     * Selects the given chip. Only applies if it's selectable.
     * @deprecated Use `MatChipOptionHarness.select` instead.
     * @breaking-change 12.0.0
     */
    select(): Promise<void>;
    /**
     * Deselects the given chip. Only applies if it's selectable.
     * @deprecated Use `MatChipOptionHarness.deselect` instead.
     * @breaking-change 12.0.0
     */
    deselect(): Promise<void>;
    /**
     * Toggles the selected state of the given chip. Only applies if it's selectable.
     * @deprecated Use `MatChipOptionHarness.toggle` instead.
     * @breaking-change 12.0.0
     */
    toggle(): Promise<void>;
    /** Removes the given chip. Only applies if it's removable. */
    remove(): Promise<void>;
    /**
     * Gets the remove button inside of a chip.
     * @param filter Optionally filters which remove buttons are included.
     */
    getRemoveButton(filter?: LegacyChipRemoveHarnessFilters): Promise<MatLegacyChipRemoveHarness>;
    /**
     * Gets the avatar inside a chip.
     * @param filter Optionally filters which avatars are included.
     */
    getAvatar(filter?: LegacyChipAvatarHarnessFilters): Promise<MatLegacyChipAvatarHarness | null>;
}

/**
 * Harness for interacting with a standard Material chip inputs in tests.
 * @deprecated Use `MatChipInputHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyChipInputHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipInputHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyChipInputHarnessFilters): HarnessPredicate<MatLegacyChipInputHarness>;
    /** Whether the input is disabled. */
    isDisabled(): Promise<boolean>;
    /** Whether the input is required. */
    isRequired(): Promise<boolean>;
    /** Gets the value of the input. */
    getValue(): Promise<string>;
    /** Gets the placeholder of the input. */
    getPlaceholder(): Promise<string>;
    /**
     * Focuses the input and returns a promise that indicates when the
     * action is complete.
     */
    focus(): Promise<void>;
    /**
     * Blurs the input and returns a promise that indicates when the
     * action is complete.
     */
    blur(): Promise<void>;
    /** Whether the input is focused. */
    isFocused(): Promise<boolean>;
    /**
     * Sets the value of the input. The value will be set by simulating
     * keypresses that correspond to the given value.
     */
    setValue(newValue: string): Promise<void>;
    /** Sends a chip separator key to the input element. */
    sendSeparatorKey(key: TestKey | string): Promise<void>;
}

/**
 * Harness for interacting with a standard selectable chip list in tests.
 * @deprecated Use `MatChipListboxHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyChipListboxHarness extends _MatChipListHarnessBase {
    /** The selector for the host element of a `MatChipList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which chip list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyChipListboxHarnessFilters): HarnessPredicate<MatLegacyChipListboxHarness>;
    /**
     * Gets the list of chips inside the chip list.
     * @param filter Optionally filters which chips are included.
     */
    getChips(filter?: LegacyChipOptionHarnessFilters): Promise<MatLegacyChipOptionHarness[]>;
    /**
     * Selects a chip inside the chip list.
     * @param filter An optional filter to apply to the child chips.
     *    All the chips matching the filter will be selected.
     */
    selectChips(filter?: LegacyChipOptionHarnessFilters): Promise<void>;
}

/**
 * Harness for interacting with a standard chip list in tests.
 * @deprecated Use `MatChipListHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyChipListHarness extends _MatChipListHarnessBase {
    /** The selector for the host element of a `MatChipList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which chip list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyChipListHarnessFilters): HarnessPredicate<MatLegacyChipListHarness>;
    /**
     * Gets the list of chips inside the chip list.
     * @param filter Optionally filters which chips are included.
     */
    getChips(filter?: LegacyChipHarnessFilters): Promise<MatLegacyChipHarness[]>;
    /**
     * Selects a chip inside the chip list.
     * @param filter An optional filter to apply to the child chips.
     *    All the chips matching the filter will be selected.
     * @deprecated Use `MatChipListboxHarness.selectChips` instead.
     * @breaking-change 12.0.0
     */
    selectChips(filter?: LegacyChipHarnessFilters): Promise<void>;
    /**
     * Gets the `MatChipInput` inside the chip list.
     * @param filter Optionally filters which chip input is included.
     */
    getInput(filter?: LegacyChipInputHarnessFilters): Promise<MatLegacyChipInputHarness>;
}

/**
 * @deprecated Use `MatChipOptionHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyChipOptionHarness extends MatLegacyChipHarness {
    /** The selector for the host element of a selectable chip instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipOptionHarness`
     * that meets certain criteria.
     * @param options Options for filtering which chip instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyChipOptionHarnessFilters): HarnessPredicate<MatLegacyChipOptionHarness>;
    /** Whether the chip is selected. */
    isSelected(): Promise<boolean>;
    /** Selects the given chip. Only applies if it's selectable. */
    select(): Promise<void>;
    /** Deselects the given chip. Only applies if it's selectable. */
    deselect(): Promise<void>;
    /** Toggles the selected state of the given chip. */
    toggle(): Promise<void>;
}

/**
 * Harness for interacting with a standard Material chip remove button in tests.
 * @deprecated Use `MatChipRemoveHarness` from `@angular/material/chips/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyChipRemoveHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatChipRemoveHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyChipRemoveHarnessFilters): HarnessPredicate<MatLegacyChipRemoveHarness>;
    /** Clicks the remove button. */
    click(): Promise<void>;
}

export { }
