import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

/** Harness for interacting with an MDC-based `mat-optgroup` in tests. */
export declare class MatOptgroupHarness extends ComponentHarness {
    /** Selector used to locate option group instances. */
    static hostSelector: string;
    private _label;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a option group with specific
     * attributes.
     * @param options Options for filtering which option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatOptgroupHarness>(this: ComponentHarnessConstructor<T>, options?: OptgroupHarnessFilters): HarnessPredicate<T>;
    /** Gets the option group's label text. */
    getLabelText(): Promise<string>;
    /** Gets whether the option group is disabled. */
    isDisabled(): Promise<boolean>;
    /**
     * Gets the options that are inside the group.
     * @param filter Optionally filters which options are included.
     */
    getOptions(filter?: OptionHarnessFilters): Promise<MatOptionHarness[]>;
}

/** Harness for interacting with an MDC-based `mat-option` in tests. */
export declare class MatOptionHarness extends ComponentHarness {
    /** Selector used to locate option instances. */
    static hostSelector: string;
    /** Element containing the option's text. */
    private _text;
    /**
     * Gets a `HarnessPredicate` that can be used to search for an option with specific attributes.
     * @param options Options for filtering which option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatOptionHarness>(this: ComponentHarnessConstructor<T>, options?: OptionHarnessFilters): HarnessPredicate<T>;
    /** Clicks the option. */
    click(): Promise<void>;
    /** Gets the option's label text. */
    getText(): Promise<string>;
    /** Gets whether the option is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets whether the option is selected. */
    isSelected(): Promise<boolean>;
    /** Gets whether the option is active. */
    isActive(): Promise<boolean>;
    /** Gets whether the option is in multiple selection mode. */
    isMultiple(): Promise<boolean>;
}

export declare interface OptgroupHarnessFilters extends BaseHarnessFilters {
    labelText?: string | RegExp;
}

export declare interface OptionHarnessFilters extends BaseHarnessFilters {
    text?: string | RegExp;
    isSelected?: boolean;
}

export { }
