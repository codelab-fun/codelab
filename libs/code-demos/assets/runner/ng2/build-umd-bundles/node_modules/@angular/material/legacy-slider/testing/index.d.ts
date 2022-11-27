import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

/**
 * A set of criteria that can be used to filter a list of `MatSliderHarness` instances.
 * @deprecated Use `SliderHarnessFilters` from `@angular/material/slider/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacySliderHarnessFilters extends BaseHarnessFilters {
}

/**
 * Harness for interacting with a standard mat-slider in tests.
 * @deprecated Use `MatSliderHarness` from `@angular/material/slider/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacySliderHarness extends ComponentHarness {
    /** The selector for the host element of a `MatSlider` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSliderHarness` that meets
     * certain criteria.
     * @param options Options for filtering which slider instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacySliderHarnessFilters): HarnessPredicate<MatLegacySliderHarness>;
    private _textLabel;
    private _wrapper;
    /** Gets the slider's id. */
    getId(): Promise<string | null>;
    /**
     * Gets the current display value of the slider. Returns a null promise if the thumb label is
     * disabled.
     */
    getDisplayValue(): Promise<string | null>;
    /** Gets the current percentage value of the slider. */
    getPercentage(): Promise<number>;
    /** Gets the current value of the slider. */
    getValue(): Promise<number>;
    /** Gets the maximum value of the slider. */
    getMaxValue(): Promise<number>;
    /** Gets the minimum value of the slider. */
    getMinValue(): Promise<number>;
    /** Whether the slider is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the orientation of the slider. */
    getOrientation(): Promise<'horizontal' | 'vertical'>;
    /**
     * Sets the value of the slider by clicking on the slider track.
     *
     * Note that in rare cases the value cannot be set to the exact specified value. This
     * can happen if not every value of the slider maps to a single pixel that could be
     * clicked using mouse interaction. In such cases consider using the keyboard to
     * select the given value or expand the slider's size for a better user experience.
     */
    setValue(value: number): Promise<void>;
    /** Focuses the slider. */
    focus(): Promise<void>;
    /** Blurs the slider. */
    blur(): Promise<void>;
    /** Whether the slider is focused. */
    isFocused(): Promise<boolean>;
    /** Calculates the percentage of the given value. */
    private _calculatePercentage;
}

export { }
