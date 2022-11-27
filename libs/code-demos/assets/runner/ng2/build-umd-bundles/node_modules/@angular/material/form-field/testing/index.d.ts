import { AsyncFactoryFn } from '@angular/cdk/testing';
import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatDateRangeInputHarness } from '@angular/material/datepicker/testing';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { TestElement } from '@angular/cdk/testing';

declare interface ErrorBase extends ComponentHarness {
    getText(): Promise<string>;
}

/** A set of criteria that can be used to filter a list of error harness instances. */
export declare interface ErrorHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
}

/** Possible harnesses of controls which can be bound to a form-field. */
export declare type FormFieldControlHarness = MatInputHarness | MatSelectHarness | MatDatepickerInputHarness | MatDateRangeInputHarness;

/** A set of criteria that can be used to filter a list of `MatFormFieldHarness` instances. */
export declare interface FormFieldHarnessFilters extends BaseHarnessFilters {
    /** Filters based on the text of the form field's floating label. */
    floatingLabelText?: string | RegExp;
    /** Filters based on whether the form field has error messages. */
    hasErrors?: boolean;
}

/** Harness for interacting with an MDC-based `mat-error` in tests. */
export declare class MatErrorHarness extends _MatErrorHarnessBase {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for an error with specific
     * attributes.
     * @param options Options for filtering which error instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatErrorHarness>(this: ComponentHarnessConstructor<T>, options?: ErrorHarnessFilters): HarnessPredicate<T>;
}

export declare abstract class _MatErrorHarnessBase extends ComponentHarness {
    /** Gets a promise for the error's label text. */
    getText(): Promise<string>;
    protected static _getErrorPredicate<T extends MatErrorHarness>(type: ComponentHarnessConstructor<T>, options: ErrorHarnessFilters): HarnessPredicate<T>;
}

export { MatFormFieldControlHarness }

/** Harness for interacting with a MDC-based form-field's in tests. */
export declare class MatFormFieldHarness extends _MatFormFieldHarnessBase<FormFieldControlHarness, typeof MatErrorHarness> {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a form field with specific
     * attributes.
     * @param options Options for filtering which form field instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatFormFieldHarness>(this: ComponentHarnessConstructor<T>, options?: FormFieldHarnessFilters): HarnessPredicate<T>;
    protected _prefixContainer: AsyncFactoryFn<TestElement | null>;
    protected _suffixContainer: AsyncFactoryFn<TestElement | null>;
    protected _label: AsyncFactoryFn<TestElement | null>;
    protected _hints: AsyncFactoryFn<TestElement[]>;
    protected _inputControl: AsyncFactoryFn<MatInputHarness | null>;
    protected _selectControl: AsyncFactoryFn<MatSelectHarness | null>;
    protected _datepickerInputControl: AsyncFactoryFn<MatDatepickerInputHarness | null>;
    protected _dateRangeInputControl: AsyncFactoryFn<MatDateRangeInputHarness | null>;
    protected _errorHarness: typeof MatErrorHarness;
    private _mdcTextField;
    /** Gets the appearance of the form-field. */
    getAppearance(): Promise<'fill' | 'outline'>;
    /** Whether the form-field has a label. */
    hasLabel(): Promise<boolean>;
    /** Whether the label is currently floating. */
    isLabelFloating(): Promise<boolean>;
}

export declare abstract class _MatFormFieldHarnessBase<ControlHarness extends MatFormFieldControlHarness, ErrorType extends ComponentHarnessConstructor<ErrorBase> & {
    with: (options?: ErrorHarnessFilters) => HarnessPredicate<ErrorBase>;
}> extends ComponentHarness {
    protected abstract _prefixContainer: AsyncFactoryFn<TestElement | null>;
    protected abstract _suffixContainer: AsyncFactoryFn<TestElement | null>;
    protected abstract _label: AsyncFactoryFn<TestElement | null>;
    protected abstract _hints: AsyncFactoryFn<TestElement[]>;
    protected abstract _inputControl: AsyncFactoryFn<ControlHarness | null>;
    protected abstract _selectControl: AsyncFactoryFn<ControlHarness | null>;
    protected abstract _datepickerInputControl: AsyncFactoryFn<ControlHarness | null>;
    protected abstract _dateRangeInputControl: AsyncFactoryFn<ControlHarness | null>;
    protected abstract _errorHarness: ErrorType;
    /** Gets the appearance of the form-field. */
    abstract getAppearance(): Promise<string>;
    /** Whether the label is currently floating. */
    abstract isLabelFloating(): Promise<boolean>;
    /** Whether the form-field has a label. */
    abstract hasLabel(): Promise<boolean>;
    /** Gets the label of the form-field. */
    getLabel(): Promise<string | null>;
    /** Whether the form-field has errors. */
    hasErrors(): Promise<boolean>;
    /** Whether the form-field is disabled. */
    isDisabled(): Promise<boolean>;
    /** Whether the form-field is currently autofilled. */
    isAutofilled(): Promise<boolean>;
    /**
     * Gets the harness of the control that is bound to the form-field. Only
     * default controls such as "MatInputHarness" and "MatSelectHarness" are
     * supported.
     */
    getControl(): Promise<ControlHarness | null>;
    /**
     * Gets the harness of the control that is bound to the form-field. Searches
     * for a control that matches the specified harness type.
     */
    getControl<X extends MatFormFieldControlHarness>(type: ComponentHarnessConstructor<X>): Promise<X | null>;
    /**
     * Gets the harness of the control that is bound to the form-field. Searches
     * for a control that matches the specified harness predicate.
     */
    getControl<X extends MatFormFieldControlHarness>(type: HarnessPredicate<X>): Promise<X | null>;
    /** Gets the theme color of the form-field. */
    getThemeColor(): Promise<'primary' | 'accent' | 'warn'>;
    /** Gets error messages which are currently displayed in the form-field. */
    getTextErrors(): Promise<string[]>;
    /** Gets all of the error harnesses in the form field. */
    getErrors(filter?: ErrorHarnessFilters): Promise<MatErrorHarness[]>;
    /** Gets hint messages which are currently displayed in the form-field. */
    getTextHints(): Promise<string[]>;
    /** Gets the text inside the prefix element. */
    getPrefixText(): Promise<string>;
    /** Gets the text inside the suffix element. */
    getSuffixText(): Promise<string>;
    /**
     * Whether the form control has been touched. Returns "null"
     * if no form control is set up.
     */
    isControlTouched(): Promise<boolean | null>;
    /**
     * Whether the form control is dirty. Returns "null"
     * if no form control is set up.
     */
    isControlDirty(): Promise<boolean | null>;
    /**
     * Whether the form control is valid. Returns "null"
     * if no form control is set up.
     */
    isControlValid(): Promise<boolean | null>;
    /**
     * Whether the form control is pending validation. Returns "null"
     * if no form control is set up.
     */
    isControlPending(): Promise<boolean | null>;
    /** Checks whether the form-field control has set up a form control. */
    private _hasFormControl;
}

export { }
