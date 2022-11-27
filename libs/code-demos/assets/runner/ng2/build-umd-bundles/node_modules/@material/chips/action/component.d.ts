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
import { MDCChipActionFocusBehavior, MDCChipActionType } from './constants';
import { MDCChipActionFoundation } from './foundation';
import { MDCChipPrimaryActionFoundation } from './primary-foundation';
import { MDCChipTrailingActionFoundation } from './trailing-foundation';
/**
 * MDCChipActionFactory is used by the parent MDCChip component to initialize
 * chip actions.
 */
export declare type MDCChipActionFactory = (el: Element, foundation?: MDCChipActionFoundation) => MDCChipAction;
/**
 * MDCChipAction provides component encapsulation of the different foundation
 * implementations.
 */
export declare class MDCChipAction extends MDCComponent<MDCChipActionFoundation> implements MDCRippleCapableSurface {
    static attachTo(root: Element): MDCChipAction;
    private readonly rootHTML;
    private rippleInstance;
    private handleClick;
    private handleKeydown;
    get ripple(): MDCRipple;
    initialize(rippleFactory?: MDCRippleFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): MDCChipPrimaryActionFoundation | MDCChipTrailingActionFoundation;
    setDisabled(isDisabled: boolean): void;
    isDisabled(): boolean;
    setFocus(behavior: MDCChipActionFocusBehavior): void;
    isFocusable(): boolean;
    setSelected(isSelected: boolean): void;
    isSelected(): boolean;
    isSelectable(): boolean;
    actionType(): MDCChipActionType;
    private computeRippleClientRect;
}
