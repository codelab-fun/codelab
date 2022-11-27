import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

/** Harness for interacting with an MDC-based `mat-progress-bar` in tests. */
export declare class MatProgressBarHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a progress bar with specific
     * attributes.
     * @param options Options for filtering which progress bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatProgressBarHarness>(this: ComponentHarnessConstructor<T>, options?: ProgressBarHarnessFilters): HarnessPredicate<T>;
    /** Gets a promise for the progress bar's value. */
    getValue(): Promise<number | null>;
    /** Gets a promise for the progress bar's mode. */
    getMode(): Promise<string | null>;
}

/** A set of criteria that can be used to filter a list of `MatProgressBarHarness` instances. */
export declare interface ProgressBarHarnessFilters extends BaseHarnessFilters {
}

export { }
