import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

/** Harness for interacting with a MDC mat-slider in tests. */
export declare class MatSliderHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slider with specific attributes.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatSliderHarness>(this: ComponentHarnessConstructor<T>, options?: SliderHarnessFilters): HarnessPredicate<T>;
    /** Gets the start thumb of the slider (only applicable for range sliders). */
    getStartThumb(): Promise<MatSliderThumbHarness>;
    /** Gets the thumb (for single point sliders), or the end thumb (for range sliders). */
    getEndThumb(): Promise<MatSliderThumbHarness>;
    /** Gets whether the slider is a range slider. */
    isRange(): Promise<boolean>;
    /** Gets whether the slider is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the value step increments of the slider. */
    getStep(): Promise<number>;
    /** Gets the maximum value of the slider. */
    getMaxValue(): Promise<number>;
    /** Gets the minimum value of the slider. */
    getMinValue(): Promise<number>;
}

/** Harness for interacting with a thumb inside of a Material slider in tests. */
export declare class MatSliderThumbHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slider thumb with specific attributes.
     * @param options Options for filtering which thumb instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatSliderThumbHarness>(this: ComponentHarnessConstructor<T>, options?: SliderThumbHarnessFilters): HarnessPredicate<T>;
    /** Gets the position of the thumb inside the slider. */
    getPosition(): Promise<ThumbPosition>;
    /** Gets the value of the thumb. */
    getValue(): Promise<number>;
    /** Sets the value of the thumb. */
    setValue(newValue: number): Promise<void>;
    /** Gets the current percentage value of the slider. */
    getPercentage(): Promise<number>;
    /** Gets the maximum value of the thumb. */
    getMaxValue(): Promise<number>;
    /** Gets the minimum value of the thumb. */
    getMinValue(): Promise<number>;
    /** Gets the text representation of the slider's value. */
    getDisplayValue(): Promise<string>;
    /** Whether the thumb is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the name of the thumb. */
    getName(): Promise<string>;
    /** Gets the id of the thumb. */
    getId(): Promise<string>;
    /**
     * Focuses the thumb and returns a promise that indicates when the
     * action is complete.
     */
    focus(): Promise<void>;
    /**
     * Blurs the thumb and returns a promise that indicates when the
     * action is complete.
     */
    blur(): Promise<void>;
    /** Whether the thumb is focused. */
    isFocused(): Promise<boolean>;
}

/** A set of criteria that can be used to filter a list of `MatSliderHarness` instances. */
export declare interface SliderHarnessFilters extends BaseHarnessFilters {
    /** Filters out only range/non-range sliders. */
    isRange?: boolean;
}

/** A set of criteria that can be used to filter a list of `MatSliderThumbHarness` instances. */
export declare interface SliderThumbHarnessFilters extends BaseHarnessFilters {
    /** Filters out slider thumbs with a particular position. */
    position?: ThumbPosition;
}

/** Possible positions of a slider thumb. */
export declare const enum ThumbPosition {
    START = 0,
    END = 1
}

export { }
