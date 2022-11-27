import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

/** Harness for interacting with a standard mat-toolbar in tests. */
export declare class MatToolbarHarness extends ContentContainerComponentHarness<MatToolbarSection> {
    static hostSelector: string;
    private _getRows;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatToolbarHarness` that meets
     * certain criteria.
     * @param options Options for filtering which card instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: ToolbarHarnessFilters): HarnessPredicate<MatToolbarHarness>;
    /** Whether the toolbar has multiple rows. */
    hasMultipleRows(): Promise<boolean>;
    /** Gets all of the toolbar's content as text. */
    private _getText;
    /** Gets the text of each row in the toolbar. */
    getRowsAsText(): Promise<string[]>;
}

/** Selectors for different sections of the mat-toolbar that contain user content. */
export declare const enum MatToolbarSection {
    ROW = ".mat-toolbar-row"
}

/** A set of criteria that can be used to filter a list of `MatToolbarHarness` instances. */
export declare interface ToolbarHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
}

export { }
