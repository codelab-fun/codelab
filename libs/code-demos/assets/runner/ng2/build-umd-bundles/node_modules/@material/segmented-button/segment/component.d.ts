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
import { MDCRipple, MDCRippleFactory } from '@material/ripple/component';
import { MDCRippleCapableSurface } from '@material/ripple/types';
import { MDCSegmentedButtonSegmentFoundation } from './foundation';
/**
 * MDCSegmentedButtonSegment factory type.
 */
export declare type MDCSegmentedButtonSegmentFactory = (el: Element, foundation?: MDCSegmentedButtonSegmentFoundation) => MDCSegmentedButtonSegment;
/**
 * Implementation of MDCSegmentedButtonSegmentFoundation
 */
export declare class MDCSegmentedButtonSegment extends MDCComponent<MDCSegmentedButtonSegmentFoundation> implements MDCRippleCapableSurface {
    get ripple(): MDCRipple;
    static attachTo(root: Element): MDCSegmentedButtonSegment;
    private index;
    private isSingleSelect;
    private rippleComponent;
    private handleClick;
    initialize(rippleFactory?: MDCRippleFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): MDCSegmentedButtonSegmentFoundation;
    /**
     * Sets segment's index value
     *
     * @param index Segment's index within wrapping segmented button
     */
    setIndex(index: number): void;
    /**
     * Sets segment's isSingleSelect value
     *
     * @param isSingleSelect True if wrapping segmented button is single select
     */
    setIsSingleSelect(isSingleSelect: boolean): void;
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
}
