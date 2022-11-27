/**
 * @license
 * Copyright 2017 Google Inc.
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
import { MDCDialogFoundation } from './foundation';
import { MDCDialogFocusTrapFactory } from './util';
export declare class MDCDialog extends MDCComponent<MDCDialogFoundation> {
    get isOpen(): boolean;
    get escapeKeyAction(): string;
    set escapeKeyAction(action: string);
    get scrimClickAction(): string;
    set scrimClickAction(action: string);
    get autoStackButtons(): boolean;
    set autoStackButtons(autoStack: boolean);
    static attachTo(root: Element): MDCDialog;
    private buttonRipples;
    private buttons;
    private container;
    private content;
    private defaultButton;
    private focusTrap;
    private focusTrapFactory;
    private handleClick;
    private handleKeydown;
    private handleDocumentKeydown;
    private handleOpening;
    private handleClosing;
    initialize(focusTrapFactory?: MDCDialogFocusTrapFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    layout(): void;
    open(): void;
    close(action?: string): void;
    getDefaultFoundation(): MDCDialogFoundation;
    private getInitialFocusEl;
}
