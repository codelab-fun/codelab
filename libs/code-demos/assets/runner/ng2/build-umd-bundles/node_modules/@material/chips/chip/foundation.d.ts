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
import { MDCChipActionFocusBehavior, MDCChipActionType } from '../action/constants';
import { MDCChipAdapter } from './adapter';
import { MDCChipAnimation } from './constants';
import { ActionInteractionEvent, ActionNavigationEvent } from './types';
/**
 * MDCChipFoundation provides a foundation for all chips.
 */
export declare class MDCChipFoundation extends MDCFoundation<MDCChipAdapter> {
    static get defaultAdapter(): MDCChipAdapter;
    private readonly animFrame;
    constructor(adapter?: Partial<MDCChipAdapter>);
    destroy(): void;
    getElementID(): string;
    setDisabled(isDisabled: boolean): void;
    isDisabled(): boolean;
    getActions(): MDCChipActionType[];
    isActionFocusable(action: MDCChipActionType): boolean;
    isActionSelectable(action: MDCChipActionType): boolean;
    isActionSelected(action: MDCChipActionType): boolean;
    setActionFocus(action: MDCChipActionType, focus: MDCChipActionFocusBehavior): void;
    setActionSelected(action: MDCChipActionType, isSelected: boolean): void;
    startAnimation(animation: MDCChipAnimation): void;
    handleAnimationEnd(event: AnimationEvent): void;
    handleTransitionEnd(): void;
    handleActionInteraction({ detail }: ActionInteractionEvent): void;
    handleActionNavigation({ detail }: ActionNavigationEvent): void;
    private directionFromKey;
    private navigateActions;
    private shouldRemove;
    private getRemovedAnnouncement;
    private getAddedAnnouncement;
    private animateSelection;
    private resetAnimationStyles;
    private updateSelectionStyles;
}
export default MDCChipFoundation;
