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
import { MDCFoundation } from '@material/base/foundation';
import { MDCDialogAdapter } from './adapter';
import { DialogConfigOptions } from './types';
export declare class MDCDialogFoundation extends MDCFoundation<MDCDialogAdapter> {
    static get cssClasses(): {
        CLOSING: string;
        OPEN: string;
        OPENING: string;
        SCROLLABLE: string;
        SCROLL_LOCK: string;
        STACKED: string;
        FULLSCREEN: string;
        SCROLL_DIVIDER_HEADER: string;
        SCROLL_DIVIDER_FOOTER: string;
        SURFACE_SCRIM_SHOWN: string;
        SURFACE_SCRIM_SHOWING: string;
        SURFACE_SCRIM_HIDING: string;
        SCRIM_HIDDEN: string;
    };
    static get strings(): {
        ACTION_ATTRIBUTE: string;
        BUTTON_DEFAULT_ATTRIBUTE: string;
        BUTTON_SELECTOR: string;
        CLOSED_EVENT: string;
        CLOSE_ACTION: string;
        CLOSING_EVENT: string;
        CONTAINER_SELECTOR: string;
        CONTENT_SELECTOR: string;
        DESTROY_ACTION: string;
        INITIAL_FOCUS_ATTRIBUTE: string;
        OPENED_EVENT: string;
        OPENING_EVENT: string;
        SCRIM_SELECTOR: string;
        SUPPRESS_DEFAULT_PRESS_SELECTOR: string;
        SURFACE_SELECTOR: string;
    };
    static get numbers(): {
        DIALOG_ANIMATION_CLOSE_TIME_MS: number;
        DIALOG_ANIMATION_OPEN_TIME_MS: number;
    };
    static get defaultAdapter(): MDCDialogAdapter;
    private dialogOpen;
    private isFullscreen;
    private animationFrame;
    private animationTimer;
    private escapeKeyAction;
    private scrimClickAction;
    private autoStackButtons;
    private areButtonsStacked;
    private suppressDefaultPressSelector;
    private readonly contentScrollHandler;
    private readonly animFrame;
    private readonly windowResizeHandler;
    private readonly windowOrientationChangeHandler;
    constructor(adapter?: Partial<MDCDialogAdapter>);
    init(): void;
    destroy(): void;
    open(dialogOptions?: DialogConfigOptions): void;
    close(action?: string): void;
    /**
     * Used only in instances of showing a secondary dialog over a full-screen
     * dialog. Shows the "surface scrim" displayed over the full-screen dialog.
     */
    showSurfaceScrim(): void;
    /**
     * Used only in instances of showing a secondary dialog over a full-screen
     * dialog. Hides the "surface scrim" displayed over the full-screen dialog.
     */
    hideSurfaceScrim(): void;
    /**
     * Handles `transitionend` event triggered when surface scrim animation is
     * finished.
     */
    handleSurfaceScrimTransitionEnd(): void;
    isOpen(): boolean;
    getEscapeKeyAction(): string;
    setEscapeKeyAction(action: string): void;
    getScrimClickAction(): string;
    setScrimClickAction(action: string): void;
    getAutoStackButtons(): boolean;
    setAutoStackButtons(autoStack: boolean): void;
    getSuppressDefaultPressSelector(): string;
    setSuppressDefaultPressSelector(selector: string): void;
    layout(): void;
    /** Handles click on the dialog root element. */
    handleClick(evt: MouseEvent): void;
    /** Handles keydown on the dialog root element. */
    handleKeydown(evt: KeyboardEvent): void;
    /** Handles keydown on the document. */
    handleDocumentKeydown(evt: KeyboardEvent): void;
    /**
     * Handles scroll event on the dialog's content element -- showing a scroll
     * divider on the header or footer based on the scroll position. This handler
     * should only be registered on full-screen dialogs with scrollable content.
     */
    private handleScrollEvent;
    private layoutInternal;
    private handleAnimationTimerEnd;
    /**
     * Runs the given logic on the next animation frame, using setTimeout to
     * factor in Firefox reflow behavior.
     */
    private runNextAnimationFrame;
    private detectStackedButtons;
    private toggleScrollableClasses;
    private toggleScrollDividerHeader;
    private toggleScrollDividerFooter;
}
export default MDCDialogFoundation;
