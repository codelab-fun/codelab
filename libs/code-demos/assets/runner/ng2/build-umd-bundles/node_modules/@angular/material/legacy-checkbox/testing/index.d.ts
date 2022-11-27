import { AsyncFactoryFn } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { CheckboxHarnessFilters as LegacyCheckboxHarnessFilters } from '@angular/material/checkbox/testing';
import { _MatCheckboxHarnessBase } from '@angular/material/checkbox/testing';
import { TestElement } from '@angular/cdk/testing';

export { LegacyCheckboxHarnessFilters }

/**
 * Harness for interacting with a standard mat-checkbox in tests.
 * @deprecated Use `MatCheckboxHarness` from `@angular/material/checkbox/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyCheckboxHarness extends _MatCheckboxHarnessBase {
    /** The selector for the host element of a checkbox instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a checkbox harness that meets
     * certain criteria.
     * @param options Options for filtering which checkbox instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyCheckboxHarnessFilters): HarnessPredicate<MatLegacyCheckboxHarness>;
    protected _input: AsyncFactoryFn<TestElement>;
    protected _label: AsyncFactoryFn<TestElement>;
    private _inputContainer;
    toggle(): Promise<void>;
}

export { }
