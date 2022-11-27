import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';

/** A set of criteria that can be used to filter a list of `MatInputHarness` instances. */
export declare interface InputHarnessFilters extends BaseHarnessFilters {
    /** Filters based on the value of the input. */
    value?: string | RegExp;
    /** Filters based on the placeholder text of the input. */
    placeholder?: string | RegExp;
}

/** Harness for interacting with a standard Material inputs in tests. */
export declare class MatInputHarness extends MatFormFieldControlHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatInputHarness` that meets
     * certain criteria.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: InputHarnessFilters): HarnessPredicate<MatInputHarness>;
    /** Whether the input is disabled. */
    isDisabled(): Promise<boolean>;
    /** Whether the input is required. */
    isRequired(): Promise<boolean>;
    /** Whether the input is readonly. */
    isReadonly(): Promise<boolean>;
    /** Gets the value of the input. */
    getValue(): Promise<string>;
    /** Gets the name of the input. */
    getName(): Promise<string>;
    /**
     * Gets the type of the input. Returns "textarea" if the input is
     * a textarea.
     */
    getType(): Promise<string>;
    /** Gets the placeholder of the input. */
    getPlaceholder(): Promise<string>;
    /** Gets the id of the input. */
    getId(): Promise<string>;
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
}

/** Harness for interacting with a native `option` in tests. */
export declare class MatNativeOptionHarness extends ComponentHarness {
    /** Selector used to locate option instances. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatNativeOptionHarness` that meets
     * certain criteria.
     * @param options Options for filtering which option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: NativeOptionHarnessFilters): HarnessPredicate<MatNativeOptionHarness>;
    /** Gets the option's label text. */
    getText(): Promise<string>;
    /** Index of the option within the native `select` element. */
    getIndex(): Promise<number>;
    /** Gets whether the option is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets whether the option is selected. */
    isSelected(): Promise<boolean>;
}

/** Harness for interacting with a native `select` in tests. */
export declare class MatNativeSelectHarness extends MatFormFieldControlHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatNativeSelectHarness` that meets
     * certain criteria.
     * @param options Options for filtering which select instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: NativeSelectHarnessFilters): HarnessPredicate<MatNativeSelectHarness>;
    /** Gets a boolean promise indicating if the select is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets a boolean promise indicating if the select is required. */
    isRequired(): Promise<boolean>;
    /** Gets a boolean promise indicating if the select is in multi-selection mode. */
    isMultiple(): Promise<boolean>;
    /** Gets the name of the select. */
    getName(): Promise<string>;
    /** Gets the id of the select. */
    getId(): Promise<string>;
    /** Focuses the select and returns a void promise that indicates when the action is complete. */
    focus(): Promise<void>;
    /** Blurs the select and returns a void promise that indicates when the action is complete. */
    blur(): Promise<void>;
    /** Whether the select is focused. */
    isFocused(): Promise<boolean>;
    /** Gets the options inside the select panel. */
    getOptions(filter?: NativeOptionHarnessFilters): Promise<MatNativeOptionHarness[]>;
    /**
     * Selects the options that match the passed-in filter. If the select is in multi-selection
     * mode all options will be clicked, otherwise the harness will pick the first matching option.
     */
    selectOptions(filter?: NativeOptionHarnessFilters): Promise<void>;
}

/** A set of criteria that can be used to filter a list of `MatNativeOptionHarness` instances. */
export declare interface NativeOptionHarnessFilters extends BaseHarnessFilters {
    text?: string | RegExp;
    index?: number;
    isSelected?: boolean;
}

/** A set of criteria that can be used to filter a list of `MatNativeSelectHarness` instances. */
export declare interface NativeSelectHarnessFilters extends BaseHarnessFilters {
}

export { }
