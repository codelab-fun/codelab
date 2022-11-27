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
import { MDCFoundation } from '@material/base/foundation';
import { MDCListAdapter } from './adapter';
import { MDCListIndex } from './types';
declare type SelectionUpdateOptions = {
    /** Whether the update was triggered by a user interaction. */
    isUserInteraction?: boolean;
    /**
     * Whether the UI should be updated regardless of whether the
     * selection would be a noop according to the foundation state.
     * https://github.com/material-components/material-components-web/commit/5d060518804437aa1ae3152562f1bb78b1af4aa6.
     */
    forceUpdate?: boolean;
};
export declare class MDCListFoundation extends MDCFoundation<MDCListAdapter> {
    static get strings(): {
        ACTION_EVENT: string;
        SELECTION_CHANGE_EVENT: string;
        ARIA_CHECKED: string;
        ARIA_CHECKED_CHECKBOX_SELECTOR: string;
        ARIA_CHECKED_RADIO_SELECTOR: string;
        ARIA_CURRENT: string;
        ARIA_DISABLED: string;
        ARIA_ORIENTATION: string;
        ARIA_ORIENTATION_HORIZONTAL: string;
        ARIA_ROLE_CHECKBOX_SELECTOR: string;
        ARIA_SELECTED: string;
        ARIA_INTERACTIVE_ROLES_SELECTOR: string;
        ARIA_MULTI_SELECTABLE_SELECTOR: string;
        CHECKBOX_RADIO_SELECTOR: string;
        CHECKBOX_SELECTOR: string;
        CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: string;
        DEPRECATED_SELECTOR: string;
        FOCUSABLE_CHILD_ELEMENTS: string;
        RADIO_SELECTOR: string;
        SELECTED_ITEM_SELECTOR: string;
    };
    static get cssClasses(): {
        LIST_ITEM_ACTIVATED_CLASS: string;
        LIST_ITEM_CLASS: string;
        LIST_ITEM_DISABLED_CLASS: string;
        LIST_ITEM_SELECTED_CLASS: string;
        LIST_ITEM_TEXT_CLASS: string;
        LIST_ITEM_PRIMARY_TEXT_CLASS: string;
        ROOT: string;
    };
    static get numbers(): {
        UNSET_INDEX: number;
        TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: number;
    };
    static get defaultAdapter(): MDCListAdapter;
    private wrapFocus;
    private isVertical;
    private isSingleSelectionList;
    private areDisabledItemsFocusable;
    private selectedIndex;
    private focusedItemIndex;
    private useActivatedClass;
    private useSelectedAttr;
    private ariaCurrentAttrValue;
    private isCheckboxList;
    private isRadioList;
    private lastSelectedIndex;
    private hasTypeahead;
    private readonly typeaheadState;
    private sortedIndexByFirstChar;
    constructor(adapter?: Partial<MDCListAdapter>);
    layout(): void;
    /** Returns the index of the item that was last focused. */
    getFocusedItemIndex(): number;
    /** Toggles focus wrapping with keyboard navigation. */
    setWrapFocus(value: boolean): void;
    /**
     * Toggles orientation direction for keyboard navigation (true for vertical,
     * false for horizontal).
     */
    setVerticalOrientation(value: boolean): void;
    /** Toggles single-selection behavior. */
    setSingleSelection(value: boolean): void;
    setDisabledItemsFocusable(value: boolean): void;
    /**
     * Automatically determines whether the list is single selection list. If so,
     * initializes the internal state to match the selected item.
     */
    private maybeInitializeSingleSelection;
    /** @return Index of the first selected item based on the DOM state. */
    private getSelectedIndexFromDOM;
    /**
     * Sets whether typeahead is enabled on the list.
     * @param hasTypeahead Whether typeahead is enabled.
     */
    setHasTypeahead(hasTypeahead: boolean): void;
    /**
     * @return Whether typeahead is currently matching a user-specified prefix.
     */
    isTypeaheadInProgress(): boolean;
    /** Toggle use of the "activated" CSS class. */
    setUseActivatedClass(useActivated: boolean): void;
    /**
     * Toggles use of the selected attribute (true for aria-selected, false for
     * aria-checked).
     */
    setUseSelectedAttribute(useSelected: boolean): void;
    getSelectedIndex(): MDCListIndex;
    setSelectedIndex(index: MDCListIndex, options?: SelectionUpdateOptions): void;
    /**
     * Focus in handler for the list items.
     */
    handleFocusIn(listItemIndex: number): void;
    /**
     * Focus out handler for the list items.
     */
    handleFocusOut(listItemIndex: number): void;
    private isIndexDisabled;
    /**
     * Key handler for the list.
     */
    handleKeydown(event: KeyboardEvent, isRootListItem: boolean, listItemIndex: number): void;
    /**
     * Click handler for the list.
     *
     * @param index Index for the item that has been clicked.
     * @param isCheckboxAlreadyUpdatedInAdapter Whether the checkbox for
     *   the list item has already been updated in the adapter. This attribute
     *   should be set to `true` when e.g. the click event directly landed on
     *   the underlying native checkbox element which would cause the checked
     *   state to be already toggled within `adapter.isCheckboxCheckedAtIndex`.
     */
    handleClick(index: number, isCheckboxAlreadyUpdatedInAdapter: boolean, event?: MouseEvent): void;
    /**
     * Focuses the next element on the list.
     */
    focusNextElement(index: number): number;
    /**
     * Focuses the previous element on the list.
     */
    focusPrevElement(index: number): number;
    focusFirstElement(): number;
    focusLastElement(): number;
    focusInitialElement(): number;
    /**
     * @param itemIndex Index of the list item
     * @param isEnabled Sets the list item to enabled or disabled.
     */
    setEnabled(itemIndex: number, isEnabled: boolean): void;
    private setSingleSelectionAtIndex;
    /**
     * Sets aria attribute for single selection at given index.
     */
    private setAriaForSingleSelectionAtIndex;
    /**
     * Returns the attribute to use for indicating selection status.
     */
    private getSelectionAttribute;
    /**
     * Toggles radio at give index. Radio doesn't change the checked state if it
     * is already checked.
     */
    private setRadioAtIndex;
    private setCheckboxAtIndex;
    /**
     * Toggles the state of all checkboxes in the given range (inclusive) based on
     * the state of the checkbox at the `toggleIndex`. To determine whether to set
     * the given range to checked or unchecked, read the value of the checkbox at
     * the `toggleIndex` and negate it. Then apply that new checked state to all
     * checkboxes in the range.
     * @param fromIndex The start of the range of checkboxes to toggle
     * @param toIndex The end of the range of checkboxes to toggle
     * @param toggleIndex The index that will be used to determine the new state
     *     of the given checkbox range.
     */
    private toggleCheckboxRange;
    private setTabindexAtIndex;
    /**
     * @return Return true if it is single selectin list, checkbox list or radio
     *     list.
     */
    private isSelectableList;
    private setTabindexToFirstSelectedOrFocusedItem;
    private getFirstSelectedOrFocusedItemIndex;
    private isIndexValid;
    private isIndexInRange;
    /**
     * Sets selected index on user action, toggles checkboxes in checkbox lists
     * by default, unless `isCheckboxAlreadyUpdatedInAdapter` is set to `true`.
     *
     * In cases where `isCheckboxAlreadyUpdatedInAdapter` is set to `true`, the
     * UI is just updated to reflect the value returned by the adapter.
     *
     * When calling this, make sure user interaction does not toggle disabled
     * list items.
     */
    private setSelectedIndexOnAction;
    private toggleCheckboxAtIndex;
    private focusItemAtIndex;
    private checkboxListToggleAll;
    /**
     * Given the next desired character from the user, adds it to the typeahead
     * buffer. Then, attempts to find the next option matching the buffer. Wraps
     * around if at the end of options.
     *
     * @param nextChar The next character to add to the prefix buffer.
     * @param startingIndex The index from which to start matching. Only relevant
     *     when starting a new match sequence. To start a new match sequence,
     *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
     *     to clear after a set interval defined in list foundation. Defaults to
     *     the currently focused index.
     * @return The index of the matched item, or -1 if no match.
     */
    typeaheadMatchItem(nextChar: string, startingIndex?: number, skipFocus?: boolean): number;
    /**
     * Initializes the MDCListTextAndIndex data structure by indexing the current
     * list items by primary text.
     *
     * @return The primary texts of all the list items sorted by first character.
     */
    private typeaheadInitSortedIndex;
    /**
     * Clears the typeahead buffer.
     */
    clearTypeaheadBuffer(): void;
}
export default MDCListFoundation;
