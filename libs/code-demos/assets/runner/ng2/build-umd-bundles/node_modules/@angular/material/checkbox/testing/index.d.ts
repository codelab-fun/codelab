import { AsyncFactoryFn } from '@angular/cdk/testing';
import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { TestElement } from '@angular/cdk/testing';

/** A set of criteria that can be used to filter a list of `MatCheckboxHarness` instances. */
export declare interface CheckboxHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose label matches the given value. */
    label?: string | RegExp;
    /** Only find instances whose name attribute is the given value. */
    name?: string;
    /** Only find instances with the given checked value. */
    checked?: boolean;
}

/** Harness for interacting with a MDC-based mat-checkbox in tests. */
export declare class MatCheckboxHarness extends _MatCheckboxHarnessBase {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a checkbox with specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a checkbox whose host element matches the given selector.
     *   - `label` finds a checkbox with specific label text.
     *   - `name` finds a checkbox with specific name.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatCheckboxHarness>(this: ComponentHarnessConstructor<T>, options?: CheckboxHarnessFilters): HarnessPredicate<T>;
    protected _input: AsyncFactoryFn<TestElement>;
    protected _label: AsyncFactoryFn<TestElement>;
    private _inputContainer;
    toggle(): Promise<void>;
}

export declare abstract class _MatCheckboxHarnessBase extends ComponentHarness {
    protected abstract _input: AsyncFactoryFn<TestElement>;
    protected abstract _label: AsyncFactoryFn<TestElement>;
    /** Whether the checkbox is checked. */
    isChecked(): Promise<boolean>;
    /** Whether the checkbox is in an indeterminate state. */
    isIndeterminate(): Promise<boolean>;
    /** Whether the checkbox is disabled. */
    isDisabled(): Promise<boolean>;
    /** Whether the checkbox is required. */
    isRequired(): Promise<boolean>;
    /** Whether the checkbox is valid. */
    isValid(): Promise<boolean>;
    /** Gets the checkbox's name. */
    getName(): Promise<string | null>;
    /** Gets the checkbox's value. */
    getValue(): Promise<string | null>;
    /** Gets the checkbox's aria-label. */
    getAriaLabel(): Promise<string | null>;
    /** Gets the checkbox's aria-labelledby. */
    getAriaLabelledby(): Promise<string | null>;
    /** Gets the checkbox's label text. */
    getLabelText(): Promise<string>;
    /** Focuses the checkbox. */
    focus(): Promise<void>;
    /** Blurs the checkbox. */
    blur(): Promise<void>;
    /** Whether the checkbox is focused. */
    isFocused(): Promise<boolean>;
    /**
     * Toggles the checked state of the checkbox.
     *
     * Note: This attempts to toggle the checkbox as a user would, by clicking it. Therefore if you
     * are using `MAT_CHECKBOX_DEFAULT_OPTIONS` to change the behavior on click, calling this method
     * might not have the expected result.
     */
    abstract toggle(): Promise<void>;
    /**
     * Puts the checkbox in a checked state by toggling it if it is currently unchecked, or doing
     * nothing if it is already checked.
     *
     * Note: This attempts to check the checkbox as a user would, by clicking it. Therefore if you
     * are using `MAT_CHECKBOX_DEFAULT_OPTIONS` to change the behavior on click, calling this method
     * might not have the expected result.
     */
    check(): Promise<void>;
    /**
     * Puts the checkbox in an unchecked state by toggling it if it is currently checked, or doing
     * nothing if it is already unchecked.
     *
     * Note: This attempts to uncheck the checkbox as a user would, by clicking it. Therefore if you
     * are using `MAT_CHECKBOX_DEFAULT_OPTIONS` to change the behavior on click, calling this method
     * might not have the expected result.
     */
    uncheck(): Promise<void>;
}

export { }
