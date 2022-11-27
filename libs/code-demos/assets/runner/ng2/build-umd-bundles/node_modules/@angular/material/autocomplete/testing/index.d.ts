import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatOptgroupHarness } from '@angular/material/core/testing';
import { MatOptionHarness } from '@angular/material/core/testing';
import { OptgroupHarnessFilters } from '@angular/material/core/testing';
import { OptionHarnessFilters } from '@angular/material/core/testing';

/** A set of criteria that can be used to filter a list of `MatAutocompleteHarness` instances. */
export declare interface AutocompleteHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose associated input element matches the given value. */
    value?: string | RegExp;
}

/** Harness for interacting with an MDC-based mat-autocomplete in tests. */
export declare class MatAutocompleteHarness extends _MatAutocompleteHarnessBase<typeof MatOptionHarness, MatOptionHarness, OptionHarnessFilters, typeof MatOptgroupHarness, MatOptgroupHarness, OptgroupHarnessFilters> {
    protected _prefix: string;
    protected _optionClass: typeof MatOptionHarness;
    protected _optionGroupClass: typeof MatOptgroupHarness;
    /** The selector for the host element of a `MatAutocomplete` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for an autocomplete with specific
     * attributes.
     * @param options Options for filtering which autocomplete instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatAutocompleteHarness>(this: ComponentHarnessConstructor<T>, options?: AutocompleteHarnessFilters): HarnessPredicate<T>;
}

export declare abstract class _MatAutocompleteHarnessBase<OptionType extends ComponentHarnessConstructor<Option> & {
    with: (options?: OptionFilters) => HarnessPredicate<Option>;
}, Option extends ComponentHarness & {
    click(): Promise<void>;
}, OptionFilters extends BaseHarnessFilters, OptionGroupType extends ComponentHarnessConstructor<OptionGroup> & {
    with: (options?: OptionGroupFilters) => HarnessPredicate<OptionGroup>;
}, OptionGroup extends ComponentHarness, OptionGroupFilters extends BaseHarnessFilters> extends ComponentHarness {
    private _documentRootLocator;
    protected abstract _prefix: string;
    protected abstract _optionClass: OptionType;
    protected abstract _optionGroupClass: OptionGroupType;
    /** Gets the value of the autocomplete input. */
    getValue(): Promise<string>;
    /** Whether the autocomplete input is disabled. */
    isDisabled(): Promise<boolean>;
    /** Focuses the autocomplete input. */
    focus(): Promise<void>;
    /** Blurs the autocomplete input. */
    blur(): Promise<void>;
    /** Whether the autocomplete input is focused. */
    isFocused(): Promise<boolean>;
    /** Enters text into the autocomplete. */
    enterText(value: string): Promise<void>;
    /** Clears the input value. */
    clear(): Promise<void>;
    /** Gets the options inside the autocomplete panel. */
    getOptions(filters?: Omit<OptionFilters, 'ancestor'>): Promise<Option[]>;
    /** Gets the option groups inside the autocomplete panel. */
    getOptionGroups(filters?: Omit<OptionGroupFilters, 'ancestor'>): Promise<OptionGroup[]>;
    /** Selects the first option matching the given filters. */
    selectOption(filters: OptionFilters): Promise<void>;
    /** Whether the autocomplete is open. */
    isOpen(): Promise<boolean>;
    /** Gets the panel associated with this autocomplete trigger. */
    private _getPanel;
    /** Gets the selector that can be used to find the autocomplete trigger's panel. */
    private _getPanelSelector;
}

export { }
