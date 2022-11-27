import { ComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { ProgressBarHarnessFilters as LegacyProgressBarHarnessFilters } from '@angular/material/progress-bar/testing';

export { LegacyProgressBarHarnessFilters }

/**
 * Harness for interacting with a standard mat-progress-bar in tests.
 * @deprecated Use `MatProgressBarHarness` from `@angular/material/progress-bar/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyProgressBarHarness extends ComponentHarness {
    /** The selector for the host element of a `MatProgressBar` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatProgressBarHarness` that meets
     * certain criteria.
     * @param options Options for filtering which progress bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyProgressBarHarnessFilters): HarnessPredicate<MatLegacyProgressBarHarness>;
    /** Gets the progress bar's value. */
    getValue(): Promise<number | null>;
    /** Gets the progress bar's mode. */
    getMode(): Promise<string | null>;
}

export { }
