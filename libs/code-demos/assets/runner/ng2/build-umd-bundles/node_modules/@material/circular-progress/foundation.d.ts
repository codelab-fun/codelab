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
import { MDCProgressIndicatorFoundation } from '@material/progress-indicator/foundation';
import { MDCCircularProgressAdapter } from './adapter';
export declare class MDCCircularProgressFoundation extends MDCFoundation<MDCCircularProgressAdapter> implements MDCProgressIndicatorFoundation {
    static get cssClasses(): {
        INDETERMINATE_CLASS: string;
        CLOSED_CLASS: string;
    };
    static get strings(): {
        ARIA_HIDDEN: string;
        ARIA_VALUENOW: string;
        DETERMINATE_CIRCLE_SELECTOR: string;
        RADIUS: string;
        STROKE_DASHOFFSET: string;
    };
    static get defaultAdapter(): MDCCircularProgressAdapter;
    private closed;
    private determinate;
    private progress;
    private radius;
    constructor(adapter?: Partial<MDCCircularProgressAdapter>);
    init(): void;
    /**
     * Sets whether the progress indicator is in determinate mode.
     * @param determinate Whether the indicator should be determinate.
     */
    setDeterminate(determinate: boolean): void;
    isDeterminate(): boolean;
    /**
     * Sets the current progress value. In indeterminate mode, this has no
     * visual effect but will be reflected if the indicator is switched to
     * determinate mode.
     * @param value The current progress value, which must be between 0 and 1.
     */
    setProgress(value: number): void;
    getProgress(): number;
    /**
     * Shows the progress indicator.
     */
    open(): void;
    /**
     * Hides the progress indicator
     */
    close(): void;
    /**
     * @return Returns whether the progress indicator is hidden.
     */
    isClosed(): boolean;
}
export default MDCCircularProgressFoundation;
