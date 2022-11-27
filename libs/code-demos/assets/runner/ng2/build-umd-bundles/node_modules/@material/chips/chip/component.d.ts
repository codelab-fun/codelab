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
import { MDCChipActionFactory } from '../action/component';
import { MDCChipActionFocusBehavior, MDCChipActionType } from '../action/constants';
import { MDCChipAnimation } from './constants';
import { MDCChipFoundation } from './foundation';
/**
 * MDCChipFactory is used by the parent MDCChipSet component to initialize
 * chips.
 */
export declare type MDCChipFactory = (el: Element, foundation?: MDCChipFoundation) => MDCChip;
/**
 * MDCChip provides component encapsulation of the foundation implementation.
 */
export declare class MDCChip extends MDCComponent<MDCChipFoundation> {
    static attachTo(root: Element): MDCChip;
    private readonly rootHTML;
    private handleActionInteraction;
    private handleActionNavigation;
    private actions;
    initialize(actionFactory?: MDCChipActionFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): MDCChipFoundation;
    /** Exposed to be called by the parent chip set. */
    remove(): void;
    /** Returns the MDCChipActionTypes for the encapsulated actions. */
    getActions(): MDCChipActionType[];
    /** Returns the ID of the root element. */
    getElementID(): string;
    isDisabled(): boolean;
    setDisabled(isDisabled: boolean): void;
    /** Returns the focusability of the action. */
    isActionFocusable(action: MDCChipActionType): boolean;
    /** Returns the selectability of the action. */
    isActionSelectable(action: MDCChipActionType): boolean;
    /** Returns the selected state of the action. */
    isActionSelected(action: MDCChipActionType): boolean;
    /** Sets the focus behavior of the action. */
    setActionFocus(action: MDCChipActionType, focus: MDCChipActionFocusBehavior): void;
    /** Sets the selected state of the action. */
    setActionSelected(action: MDCChipActionType, isSelected: boolean): void;
    /** Starts the animation on the chip. */
    startAnimation(animation: MDCChipAnimation): void;
}
