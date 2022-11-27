/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { MDCFoundation } from '@material/base/foundation';
import { MDCSliderAdapter } from './adapter';
import { Thumb } from './types';
/**
 * Foundation class for slider. Responsibilities include:
 * - Updating slider values (internal state and DOM updates) based on client
 *   'x' position.
 * - Updating DOM after slider property updates (e.g. min, max).
 */
export declare class MDCSliderFoundation extends MDCFoundation<MDCSliderAdapter> {
    static SUPPORTS_POINTER_EVENTS: boolean;
    private initialStylesRemoved;
    private min;
    private max;
    private valueStart;
    private value;
    private rect;
    private isDisabled;
    private isDiscrete;
    private step;
    private minRange;
    private numDecimalPlaces;
    private hasTickMarks;
    private isRange;
    private thumb;
    private downEventClientX;
    private valueStartBeforeDownEvent;
    private valueBeforeDownEvent;
    private startThumbKnobWidth;
    private endThumbKnobWidth;
    private readonly animFrame;
    private mousedownOrTouchstartListener;
    private moveListener;
    private pointerdownListener;
    private pointerupListener;
    private thumbMouseenterListener;
    private thumbMouseleaveListener;
    private inputStartChangeListener;
    private inputEndChangeListener;
    private inputStartFocusListener;
    private inputEndFocusListener;
    private inputStartBlurListener;
    private inputEndBlurListener;
    private resizeListener;
    constructor(adapter?: Partial<MDCSliderAdapter>);
    static get defaultAdapter(): MDCSliderAdapter;
    init(): void;
    destroy(): void;
    setMin(value: number): void;
    setMax(value: number): void;
    getMin(): number;
    getMax(): number;
    /**
     * - For single point sliders, returns the thumb value.
     * - For range (two-thumb) sliders, returns the end thumb's value.
     */
    getValue(): number;
    /**
     * - For single point sliders, sets the thumb value.
     * - For range (two-thumb) sliders, sets the end thumb's value.
     */
    setValue(value: number): void;
    /**
     * Only applicable for range sliders.
     * @return The start thumb's value.
     */
    getValueStart(): number;
    /**
     * Only applicable for range sliders. Sets the start thumb's value.
     */
    setValueStart(valueStart: number): void;
    setStep(value: number): void;
    /**
     * Only applicable for range sliders. Sets the minimum difference between the
     * start and end values.
     */
    setMinRange(value: number): void;
    setIsDiscrete(value: boolean): void;
    getStep(): number;
    getMinRange(): number;
    setHasTickMarks(value: boolean): void;
    getDisabled(): boolean;
    /**
     * Sets disabled state, including updating styles and thumb tabindex.
     */
    setDisabled(disabled: boolean): void;
    /** @return Whether the slider is a range slider. */
    getIsRange(): boolean;
    /**
     * - Syncs slider boundingClientRect with the current DOM.
     * - Updates UI based on internal state.
     */
    layout({ skipUpdateUI }?: {
        skipUpdateUI?: boolean;
    }): void;
    /** Handles resize events on the window. */
    handleResize(): void;
    /**
     * Handles pointer down events on the slider root element.
     */
    handleDown(event: PointerEvent | MouseEvent | TouchEvent): void;
    /**
     * Handles pointer move events on the slider root element.
     */
    handleMove(event: PointerEvent | MouseEvent | TouchEvent): void;
    /**
     * Handles pointer up events on the slider root element.
     */
    handleUp(): void;
    /**
     * For range, discrete slider, shows the value indicator on both thumbs.
     */
    handleThumbMouseenter(): void;
    /**
     * For range, discrete slider, hides the value indicator on both thumbs.
     */
    handleThumbMouseleave(): void;
    handleMousedownOrTouchstart(event: MouseEvent | TouchEvent): void;
    handlePointerdown(event: PointerEvent): void;
    /**
     * Handles input `change` event by setting internal slider value to match
     * input's new value.
     */
    handleInputChange(thumb: Thumb): void;
    /** Shows activated state and value indicator on thumb(s). */
    handleInputFocus(thumb: Thumb): void;
    /** Removes activated state and value indicator from thumb(s). */
    handleInputBlur(thumb: Thumb): void;
    /**
     * Emits custom dragStart event, along with focusing the underlying input.
     */
    private handleDragStart;
    /**
     * @return The thumb to be moved based on initial down event.
     */
    private getThumbFromDownEvent;
    /**
     * @return The thumb to be moved based on move event (based on drag
     *     direction from original down event). Only applicable if thumbs
     *     were overlapping in the down event.
     */
    private getThumbFromMoveEvent;
    /**
     * Updates UI based on internal state.
     * @param thumb Thumb whose value is being updated. If undefined, UI is
     *     updated for both thumbs based on current internal state.
     */
    private updateUI;
    /**
     * Updates thumb and input attributes based on current value.
     * @param thumb Thumb whose aria attributes to update.
     */
    private updateThumbAndInputAttributes;
    /**
     * Updates value indicator UI based on current value.
     * @param thumb Thumb whose value indicator to update. If undefined, all
     *     thumbs' value indicators are updated.
     */
    private updateValueIndicatorUI;
    /**
     * Updates tick marks UI within slider, based on current min, max, and step.
     */
    private updateTickMarksUI;
    /** Maps clientX to a value on the slider scale. */
    private mapClientXOnSliderScale;
    /** Calculates the quantized value based on step value. */
    private quantize;
    /**
     * Updates slider value (internal state and UI) based on the given value.
     */
    private updateValue;
    /**
     * Clamps the given value for the given thumb based on slider properties:
     * - Restricts value within [min, max].
     * - If range slider, clamp start value <= end value - min range, and
     *   end value >= start value + min range.
     */
    private clampValue;
    /**
     * Updates the active track and thumb style properties to reflect current
     * value.
     */
    private updateThumbAndTrackUI;
    /**
     * Shifts the value indicator to either side if it would otherwise stick
     * beyond the slider's length while keeping the caret above the knob.
     */
    private alignValueIndicator;
    /**
     * Removes initial inline styles if not already removed. `left:<...>%`
     * inline styles can be added to position the thumb correctly before JS
     * initialization. However, they need to be removed before the JS starts
     * positioning the thumb. This is because the JS uses
     * `transform:translateX(<...>)px` (for performance reasons) to position
     * the thumb (which is not possible for initial styles since we need the
     * bounding rect measurements).
     */
    private removeInitialStyles;
    /**
     * Resets track/thumb animation to prevent animation when adding
     * `transform` styles to thumb initially.
     */
    private resetTrackAndThumbAnimation;
    /**
     * Adds THUMB_TOP class to active thumb if thumb knobs overlap; otherwise
     * removes THUMB_TOP class from both thumbs.
     * @param thumb Thumb that is active (being moved).
     */
    private updateOverlappingThumbsUI;
    /**
     * Converts attribute value to a number, e.g. '100' => 100. Throws errors
     * for invalid values.
     * @param attributeValue Attribute value, e.g. 100.
     * @param attributeName Attribute name, e.g. `aria-valuemax`.
     */
    private convertAttributeValueToNumber;
    /** Checks that the given properties are valid slider values. */
    private validateProperties;
    private registerEventHandlers;
    private deregisterEventHandlers;
    private handlePointerup;
}
