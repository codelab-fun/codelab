import { AsyncFactoryFn } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { SlideToggleHarnessFilters as LegacySlideToggleHarnessFilters } from '@angular/material/slide-toggle/testing';
import { _MatSlideToggleHarnessBase as _MatLegacySlideToggleHarnessBase } from '@angular/material/slide-toggle/testing';
import { TestElement } from '@angular/cdk/testing';

export { LegacySlideToggleHarnessFilters }

/**
 * Harness for interacting with a standard mat-slide-toggle in tests.
 * @deprecated Use `MatSlideToggleHarness` from `@angular/material/slide-toggle/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacySlideToggleHarness extends _MatLegacySlideToggleHarnessBase {
    private _inputContainer;
    protected _nativeElement: AsyncFactoryFn<TestElement>;
    /** The selector for the host element of a `MatSlideToggle` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSlideToggleHarness` that meets
     * certain criteria.
     * @param options Options for filtering which slide toggle instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacySlideToggleHarnessFilters): HarnessPredicate<MatLegacySlideToggleHarness>;
    /** Toggle the checked state of the slide-toggle. */
    toggle(): Promise<void>;
    /** Whether the slide-toggle is checked. */
    isChecked(): Promise<boolean>;
}

export { _MatLegacySlideToggleHarnessBase }

export { }
