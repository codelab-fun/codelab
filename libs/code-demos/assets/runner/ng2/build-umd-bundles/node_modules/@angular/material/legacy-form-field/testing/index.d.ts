import { AsyncFactoryFn } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { ErrorHarnessFilters as LegacyErrorHarnessFilters } from '@angular/material/form-field/testing';
import { FormFieldHarnessFilters as LegacyFormFieldHarnessFilters } from '@angular/material/form-field/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatDateRangeInputHarness } from '@angular/material/datepicker/testing';
import { _MatErrorHarnessBase } from '@angular/material/form-field/testing';
import { _MatFormFieldHarnessBase } from '@angular/material/form-field/testing';
import { MatFormFieldControlHarness as MatLegacyFormFieldControlHarness } from '@angular/material/form-field/testing/control';
import { MatLegacyInputHarness } from '@angular/material/legacy-input/testing';
import { MatLegacySelectHarness } from '@angular/material/legacy-select/testing';
import { TestElement } from '@angular/cdk/testing';

export { LegacyErrorHarnessFilters }

/**
 * Possible harnesses of controls which can be bound to a form-field.
 * @deprecated Use `FormFieldControlHarness` from `@angular/material/form-field/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare type LegacyFormFieldControlHarness = MatLegacyInputHarness | MatLegacySelectHarness | MatDatepickerInputHarness | MatDateRangeInputHarness;

export { LegacyFormFieldHarnessFilters }

/**
 * Harness for interacting with a `mat-error` in tests.
 * @deprecated Use `MatErrorHarness` from `@angular/material/form-field/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyErrorHarness extends _MatErrorHarnessBase {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for an error with specific
     * attributes.
     * @param options Options for filtering which error instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatLegacyErrorHarness>(this: ComponentHarnessConstructor<T>, options?: LegacyErrorHarnessFilters): HarnessPredicate<T>;
}

export { MatLegacyFormFieldControlHarness }

/**
 * Harness for interacting with a standard Material form-field's in tests.
 * @deprecated Use `MatFormFieldHarness` from `@angular/material/form-field/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyFormFieldHarness extends _MatFormFieldHarnessBase<LegacyFormFieldControlHarness, typeof MatLegacyErrorHarness> {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatFormFieldHarness` that meets
     * certain criteria.
     * @param options Options for filtering which form field instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyFormFieldHarnessFilters): HarnessPredicate<MatLegacyFormFieldHarness>;
    protected _prefixContainer: AsyncFactoryFn<TestElement | null>;
    protected _suffixContainer: AsyncFactoryFn<TestElement | null>;
    protected _label: AsyncFactoryFn<TestElement | null>;
    protected _errors: AsyncFactoryFn<TestElement[]>;
    protected _hints: AsyncFactoryFn<TestElement[]>;
    protected _inputControl: AsyncFactoryFn<MatLegacyInputHarness | null>;
    protected _selectControl: AsyncFactoryFn<MatLegacySelectHarness | null>;
    protected _datepickerInputControl: AsyncFactoryFn<MatDatepickerInputHarness | null>;
    protected _dateRangeInputControl: AsyncFactoryFn<MatDateRangeInputHarness | null>;
    protected _errorHarness: typeof MatLegacyErrorHarness;
    /** Gets the appearance of the form-field. */
    getAppearance(): Promise<'legacy' | 'standard' | 'fill' | 'outline'>;
    /** Whether the form-field has a label. */
    hasLabel(): Promise<boolean>;
    /** Whether the label is currently floating. */
    isLabelFloating(): Promise<boolean>;
}

export { }
