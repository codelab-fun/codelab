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
import { MDCSnackbarFoundation } from './foundation';
import { MDCSnackbarAnnouncerFactory } from './types';
export declare class MDCSnackbar extends MDCComponent<MDCSnackbarFoundation> {
    static attachTo(root: Element): MDCSnackbar;
    private announce;
    private actionEl;
    private labelEl;
    private surfaceEl;
    private handleKeyDown;
    private handleSurfaceClick;
    initialize(announcerFactory?: MDCSnackbarAnnouncerFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    open(): void;
    /**
     * @param reason Why the snackbar was closed. Value will be passed to CLOSING_EVENT and CLOSED_EVENT via the
     *     `event.detail.reason` property. Standard values are REASON_ACTION and REASON_DISMISS, but custom
     *     client-specific values may also be used if desired.
     */
    close(reason?: string): void;
    getDefaultFoundation(): MDCSnackbarFoundation;
    get timeoutMs(): number;
    set timeoutMs(timeoutMs: number);
    get closeOnEscape(): boolean;
    set closeOnEscape(closeOnEscape: boolean);
    get isOpen(): boolean;
    get labelText(): string;
    set labelText(labelText: string);
    get actionButtonText(): string;
    set actionButtonText(actionButtonText: string);
    private registerKeyDownHandler;
    private deregisterKeyDownHandler;
    private registerSurfaceClickHandler;
    private deregisterSurfaceClickHandler;
    private isActionButton;
    private isActionIcon;
}
