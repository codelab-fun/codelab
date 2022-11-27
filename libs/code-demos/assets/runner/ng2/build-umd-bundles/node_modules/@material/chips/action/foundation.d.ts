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
import { MDCChipActionAdapter } from './adapter';
import { MDCChipActionFocusBehavior, MDCChipActionType } from './constants';
/**
 * MDCChipActionFoundation provides a base abstract foundation for all chip
 * actions.
 */
export declare abstract class MDCChipActionFoundation extends MDCFoundation<MDCChipActionAdapter> {
    static get defaultAdapter(): MDCChipActionAdapter;
    constructor(adapter?: Partial<MDCChipActionAdapter>);
    handleClick(): void;
    handleKeydown(event: KeyboardEvent): void;
    setDisabled(isDisabled: boolean): void;
    isDisabled(): boolean;
    setFocus(behavior: MDCChipActionFocusBehavior): void;
    isFocusable(): boolean;
    setSelected(isSelected: boolean): void;
    isSelected(): boolean;
    private emitInteraction;
    private emitNavigation;
    private shouldNotifyInteractionFromKey;
    private getTriggerFromKey;
    abstract actionType(): MDCChipActionType;
    abstract isSelectable(): boolean;
    protected abstract shouldEmitInteractionOnRemoveKey(): boolean;
}
export default MDCChipActionFoundation;
