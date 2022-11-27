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
import { MDCComponent } from '@material/base/component';
import { MDCSliderFoundation } from './foundation';
/** Vanilla JS implementation of slider component. */
export declare class MDCSlider extends MDCComponent<MDCSliderFoundation> {
    static attachTo(root: Element, options?: {
        skipInitialUIUpdate?: boolean;
    }): MDCSlider;
    root: HTMLElement;
    private inputs;
    private thumbs;
    private trackActive;
    private ripples;
    private skipInitialUIUpdate;
    private valueToAriaValueTextFn;
    getDefaultFoundation(): MDCSliderFoundation;
    /**
     * Initializes component, with the following options:
     * - `skipInitialUIUpdate`: Whether to skip updating the UI when initially
     *   syncing with the DOM. This should be enabled when the slider position
     *   is set before component initialization.
     */
    initialize({ skipInitialUIUpdate }?: {
        skipInitialUIUpdate?: boolean;
    }): void;
    initialSyncWithDOM(): void;
    /** Redraws UI based on DOM (e.g. element dimensions, RTL). */
    layout(): void;
    getValueStart(): number;
    setValueStart(valueStart: number): void;
    getValue(): number;
    setValue(value: number): void;
    /** @return Slider disabled state. */
    getDisabled(): boolean;
    /** Sets slider disabled state. */
    setDisabled(disabled: boolean): void;
    /**
     * Sets a function that maps the slider value to the value of the
     * `aria-valuetext` attribute on the thumb element.
     */
    setValueToAriaValueTextFn(mapFn: ((value: number) => string) | null): void;
    private getThumbEl;
    private getInput;
    private getRipple;
    /** Adds tick mark elements to the given container. */
    private addTickMarks;
    /** Updates tick mark elements' classes in the given container. */
    private updateTickMarks;
    /** Initializes thumb ripples. */
    private createRipples;
}
