import { ComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { ProgressSpinnerHarnessFilters as LegacyProgressSpinnerHarnessFilters } from '@angular/material/progress-spinner/testing';
import { LegacyProgressSpinnerMode } from '@angular/material/legacy-progress-spinner';

export { LegacyProgressSpinnerHarnessFilters }

/**
 * Harness for interacting with a standard mat-progress-spinner in tests.
 * @deprecated Use `MatProgressSpinnerHarness` from `@angular/material/progress-spinner/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyProgressSpinnerHarness extends ComponentHarness {
    /** The selector for the host element of a Progress Spinner instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatProgressSpinnerHarness` that
     * meets certain criteria.
     * @param options Options for filtering which progress spinner instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyProgressSpinnerHarnessFilters): HarnessPredicate<MatLegacyProgressSpinnerHarness>;
    /** Gets the progress spinner's value. */
    getValue(): Promise<number | null>;
    /** Gets the progress spinner's mode. */
    getMode(): Promise<LegacyProgressSpinnerMode>;
}

export { }
