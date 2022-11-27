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
import { FocusOptions, FocusTrap } from '@material/dom/focus-trap';
/** Banner element classes. */
export declare const cssClasses: {
    CLOSING: string;
    OPEN: string;
    OPENING: string;
};
/** Banner numbers. */
export declare const numbers: {
    BANNER_ANIMATION_CLOSE_TIME_MS: number;
    BANNER_ANIMATION_OPEN_TIME_MS: number;
};
/** Banner events. */
export declare const events: {
    CLOSED: string;
    CLOSING: string;
    OPENED: string;
    OPENING: string;
    ACTION_CLICKED: string;
};
/** Banner selectors. */
export declare const selectors: {
    CONTENT: string;
    PRIMARY_ACTION: string;
    SECONDARY_ACTION: string;
    TEXT: string;
};
/** Reason as to why the banner was closed. */
export declare enum CloseReason {
    PRIMARY = 0,
    SECONDARY = 1,
    UNSPECIFIED = 2
}
/**
 * Payload of actionClicked events to signify which action emitted the event.
 */
export declare const enum Action {
    PRIMARY = 0,
    SECONDARY = 1,
    UNKNOWN = 2
}
/** Interface for the detail of the closing and closed events emitted. */
export interface MDCBannerCloseEventDetail {
    reason: CloseReason;
}
/** Interface for the detail of the closing and closed events emitted. */
export interface MDCBannerActionEventDetail {
    action: Action;
}
/**  */
export declare type MDCBannerFocusTrapFactory = (element: HTMLElement, options: FocusOptions) => FocusTrap;
