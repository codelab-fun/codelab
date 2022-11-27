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
import { MDCProgressIndicator } from '@material/progress-indicator/component';
import { MDCCircularProgressFoundation } from './foundation';
export declare class MDCCircularProgress extends MDCComponent<MDCCircularProgressFoundation> implements MDCProgressIndicator {
    private determinateCircle;
    initialize(): void;
    static attachTo(root: Element): MDCCircularProgress;
    /**
     * Sets whether the progress indicator is in determinate mode.
     * @param isDeterminate Whether the indicator should be determinate.
     */
    set determinate(value: boolean);
    /**
     * Sets the current progress value. In indeterminate mode, this has no
     * visual effect but will be reflected if the indicator is switched to
     * determinate mode.
     * @param value The current progress value, which must be between 0 and 1.
     */
    set progress(value: number);
    /**
     * Whether the progress indicator is hidden.
     */
    get isClosed(): boolean;
    /**
     * Shows the progress indicator.
     */
    open(): void;
    /**
     * Hides the progress indicator.
     */
    close(): void;
    getDefaultFoundation(): MDCCircularProgressFoundation;
}
