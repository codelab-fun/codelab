/**
 * @license
 * Copyright 2018 Google Inc.
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
import { MDCChipActionType } from '../action/constants';
import { MDCChipFactory } from '../chip/component';
import { MDCChipSetFoundation } from './foundation';
/**
 * MDCChip provides component encapsulation of the foundation implementation.
 */
export declare class MDCChipSet extends MDCComponent<MDCChipSetFoundation> {
    static attachTo(root: Element): MDCChipSet;
    private handleChipAnimation;
    private handleChipInteraction;
    private handleChipNavigation;
    private chips;
    initialize(chipFactory?: MDCChipFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): MDCChipSetFoundation;
    /** Returns the index of the chip with the given ID or -1 if none exists. */
    getChipIndexByID(chipID: string): number;
    /**
     * Returns the ID of the chip at the given index or an empty string if the
     * index is out of bounds.
     */
    getChipIdAtIndex(index: number): string;
    /** Returns the unique indexes of the selected chips. */
    getSelectedChipIndexes(): ReadonlySet<number>;
    /** Sets the selection state of the chip. */
    setChipSelected(index: number, action: MDCChipActionType, isSelected: boolean): void;
    /** Returns the selection state of the chip. */
    isChipSelected(index: number, action: MDCChipActionType): boolean;
    /** Animates the chip addition at the given index. */
    addChip(index: number): void;
    /** Removes the chip at the given index. */
    removeChip(index: number): void;
    private isIndexValid;
}
