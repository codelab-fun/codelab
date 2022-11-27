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
import { MDCChipActionType } from '../action/constants';
import { MDCChipSetAdapter } from './adapter';
import { ChipAnimationEvent, ChipInteractionEvent, ChipNavigationEvent } from './types';
/**
 * MDCChipSetFoundation provides a foundation for all chips.
 */
export declare class MDCChipSetFoundation extends MDCFoundation<MDCChipSetAdapter> {
    static get defaultAdapter(): MDCChipSetAdapter;
    constructor(adapter?: Partial<MDCChipSetAdapter>);
    handleChipAnimation({ detail }: ChipAnimationEvent): void;
    handleChipInteraction({ detail }: ChipInteractionEvent): void;
    handleChipNavigation({ detail }: ChipNavigationEvent): void;
    /** Returns the unique selected indexes of the chips. */
    getSelectedChipIndexes(): ReadonlySet<number>;
    /** Sets the selected state of the chip at the given index and action. */
    setChipSelected(index: number, action: MDCChipActionType, isSelected: boolean): void;
    /** Returns the selected state of the chip at the given index and action. */
    isChipSelected(index: number, action: MDCChipActionType): boolean;
    /** Removes the chip at the given index. */
    removeChip(index: number): void;
    addChip(index: number): void;
    /**
     * Increments to find the first focusable chip.
     */
    private focusNextChipFrom;
    /**
     * Decrements to find the first focusable chip. Takes an optional target
     * action that can be used to focus the first matching focusable action.
     */
    private focusPrevChipFrom;
    /** Returns the appropriate focusable action, or null if none exist. */
    private getFocusableAction;
    /**
     * Returs the first focusable action, regardless of type, or null if no
     * focusable actions exist.
     */
    private getFirstFocusableAction;
    /**
     * If the actions contain a focusable action that matches the target action,
     * return that. Otherwise, return the first focusable action, or null if no
     * focusable action exists.
     */
    private getMatchingFocusableAction;
    private focusChip;
    private supportsMultiSelect;
    private setSelection;
    private removeAfterAnimation;
    /**
     * Find the first focusable action by moving bidirectionally horizontally
     * from the start index.
     *
     * Given chip set [A, B, C, D, E, F, G]...
     * Let's say we remove chip "F". We don't know where the nearest focusable
     * action is since any of them could be disabled. The nearest focusable
     * action could be E, it could be G, it could even be A. To find it, we
     * start from the source index (5 for "F" in this case) and move out
     * horizontally, checking each chip at each index.
     *
     */
    private focusNearestFocusableAction;
    private getNearestFocusableAction;
}
export default MDCChipSetFoundation;
