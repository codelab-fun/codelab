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
import { MDCSegmentedButtonSegmentAdapter } from './adapter';
export declare class MDCSegmentedButtonSegmentFoundation extends MDCFoundation<MDCSegmentedButtonSegmentAdapter> {
    static get defaultAdapter(): MDCSegmentedButtonSegmentAdapter;
    constructor(adapter?: Partial<MDCSegmentedButtonSegmentAdapter>);
    /**
     * @return Returns true if segment is currently selected, otherwise returns
     * false
     */
    isSelected(): boolean;
    /**
     * Sets segment to be selected
     */
    setSelected(): void;
    /**
     * Sets segment to be not selected
     */
    setUnselected(): void;
    /**
     * @return Returns segment's segmentId if it was set by client
     */
    getSegmentId(): string | undefined;
    /**
     * Called when segment is clicked. If the wrapping segmented button is single
     * select, doesn't allow segment to be set to not selected. Otherwise, toggles
     * segment's selected status. Finally, emits event to wrapping segmented
     * button.
     *
     * @event selected With detail - SegmentDetail
     */
    handleClick(): void;
    /**
     * @return Returns bounding rectangle for ripple effect
     */
    getDimensions(): DOMRect;
    /**
     * Sets segment from not selected to selected, or selected to not selected
     */
    private toggleSelection;
    /**
     * Sets appropriate aria attribute, based on wrapping segmented button's
     * single selected value, to new value
     *
     * @param value Value that represents selected status
     */
    private setAriaAttr;
}
