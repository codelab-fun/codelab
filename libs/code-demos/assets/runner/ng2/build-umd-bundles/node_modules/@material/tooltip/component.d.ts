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
import { EventType, SpecificEventListener } from '@material/base/types';
import { AnchorBoundaryType, PositionWithCaret, XPosition, YPosition } from './constants';
import { MDCTooltipFoundation } from './foundation';
export declare class MDCTooltip extends MDCComponent<MDCTooltipFoundation> {
    static attachTo(root: Element): MDCTooltip;
    private anchorElem;
    private isTooltipRich;
    private isTooltipPersistent;
    private handleMouseEnter;
    private handleFocus;
    private handleMouseLeave;
    private handleTransitionEnd;
    private handleClick;
    private handleTouchstart;
    private handleTouchend;
    initialize(): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    setTooltipPosition(position: {
        xPos?: XPosition;
        yPos?: YPosition;
        withCaretPos?: PositionWithCaret;
    }): void;
    setAnchorBoundaryType(type: AnchorBoundaryType): void;
    setShowDelay(delayMs: number): void;
    setHideDelay(delayMs: number): void;
    hide(): void;
    isShown(): boolean;
    /**
     * Method that allows user to specify additional elements that should have a
     * scroll event listener attached to it. This should be used in instances
     * where the anchor element is placed inside a scrollable container (that is
     * not the body element), and will ensure that the tooltip will stay attached
     * to the anchor on scroll.
     */
    attachScrollHandler(addEventListenerFn: <K extends EventType>(event: K, handler: SpecificEventListener<K>) => void): void;
    /**
     * Must be used in conjunction with #attachScrollHandler. Removes the scroll
     * event handler from elements on the page.
     */
    removeScrollHandler(removeEventHandlerFn: <K extends EventType>(event: K, handler: SpecificEventListener<K>) => void): void;
    getDefaultFoundation(): MDCTooltipFoundation;
}
