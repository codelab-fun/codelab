import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { ButtonHarnessFilters as LegacyButtonHarnessFilters } from '@angular/material/button/testing';
import { ButtonVariant as LegacyButtonVariant } from '@angular/material/button/testing';

export { LegacyButtonHarnessFilters }

export { LegacyButtonVariant }

/**
 * Harness for interacting with a standard mat-button in tests.
 * @deprecated Use `MatButtonHarness` from `@angular/material/button/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyButtonHarness extends ContentContainerComponentHarness {
    /** The selector for the host element of a button instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a button harness that meets
     * certain criteria.
     * @param options Options for filtering which button instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyButtonHarnessFilters): HarnessPredicate<MatLegacyButtonHarness>;
    /**
     * Clicks the button at the given position relative to its top-left.
     * @param relativeX The relative x position of the click.
     * @param relativeY The relative y position of the click.
     */
    click(relativeX: number, relativeY: number): Promise<void>;
    /** Clicks the button at its center. */
    click(location: 'center'): Promise<void>;
    /** Clicks the button. */
    click(): Promise<void>;
    /** Whether the button is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the button's label text. */
    getText(): Promise<string>;
    /** Focuses the button. */
    focus(): Promise<void>;
    /** Blurs the button. */
    blur(): Promise<void>;
    /** Whether the button is focused. */
    isFocused(): Promise<boolean>;
    /** Gets the variant of the button. */
    getVariant(): Promise<LegacyButtonVariant>;
}

export { }
