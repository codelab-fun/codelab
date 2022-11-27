/**
 * @license
 * Copyright 2016 Google Inc.
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
import { MDCChipTrailingActionFactory } from '../trailingaction/component';
import { MDCChipFoundation } from './foundation';
export declare type MDCChipFactory = (el: Element, foundation?: MDCChipFoundation) => MDCChip;
export declare class MDCChip extends MDCComponent<MDCChipFoundation> implements MDCRippleCapableSurface {
    /**
     * @return Whether the chip is selected.
     */
    get selected(): boolean;
    /**
     * Sets selected state on the chip.
     */
    set selected(selected: boolean);
    /**
     * @return Whether a trailing icon click should trigger exit/removal of the chip.
     */
    get shouldRemoveOnTrailingIconClick(): boolean;
    /**
     * Sets whether a trailing icon click should trigger exit/removal of the chip.
     */
    set shouldRemoveOnTrailingIconClick(shouldRemove: boolean);
    /**
     * Sets whether a clicking on the chip should focus the primary action.
     */
    set setShouldFocusPrimaryActionOnClick(shouldFocus: boolean);
    get ripple(): MDCRipple;
    get id(): string;
    static attachTo(root: Element): MDCChip;
    private leadingIcon;
    private checkmark;
    private primaryAction;
    private trailingAction;
    private rippleSurface;
    private handleTrailingActionInteraction;
    private handleTrailingActionNavigation;
    private handleTransitionEnd;
    private handleClick;
    private handleKeydown;
    private handleFocusIn;
    private handleFocusOut;
    initialize(rippleFactory?: MDCRippleFactory, trailingActionFactory?: MDCChipTrailingActionFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    /**
     * Begins the exit animation which leads to removal of the chip.
     */
    beginExit(): void;
    getDefaultFoundation(): MDCChipFoundation;
    setSelectedFromChipSet(selected: boolean, shouldNotifyClients: boolean): void;
    focusPrimaryAction(): void;
    focusTrailingAction(): void;
    removeFocus(): void;
    remove(): void;
}
