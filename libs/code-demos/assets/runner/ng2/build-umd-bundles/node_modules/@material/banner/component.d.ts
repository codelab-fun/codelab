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
import { CloseReason, MDCBannerFocusTrapFactory } from './constants';
import { MDCBannerFoundation } from './foundation';
/** Vanilla JS implementation of banner component. */
export declare class MDCBanner extends MDCComponent<MDCBannerFoundation> {
    static attachTo(root: Element): MDCBanner;
    root: HTMLElement;
    private handleContentClick;
    private primaryActionEl;
    private secondaryActionEl;
    private textEl;
    private contentEl;
    private focusTrap;
    private focusTrapFactory;
    initialize(focusTrapFactory?: MDCBannerFocusTrapFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    layout(): void;
    /**
     * Opens the banner and fires events.OPENING to indicate the beginning of its
     * opening animation and then events.OPENED once the animation finishes.
     */
    open(): void;
    /**
     * Closes the banner and fires events.CLOSING to indicate the beginning of its
     * closing animation and then events.CLOSED once the animation finishes.
     * @param reason Why the banner was closed. Value will be passed to
     *     events.CLOSING and events.CLOSED via the `event.detail.reason`
     *     property. Standard values are CloseReason.PRIMARY and
     *     CloseReason.SECONDARY, but CloseReason.UNSPECIFIED is provided for
     *     custom handling of programmatic closing of the banner.
     */
    close(reason: CloseReason): void;
    getDefaultFoundation(): MDCBannerFoundation;
    get isOpen(): boolean;
    getText(): string;
    setText(text: string): void;
    getPrimaryActionText(): string;
    setPrimaryActionText(actionButtonText: string): void;
    /** Returns null if the banner has no secondary action. */
    getSecondaryActionText(): string | null;
    setSecondaryActionText(actionButtonText: string): void;
    private registerContentClickHandler;
    private deregisterContentClickHandler;
}
