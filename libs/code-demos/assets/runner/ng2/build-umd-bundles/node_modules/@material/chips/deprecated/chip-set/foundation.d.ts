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
import { MDCChipInteractionEventDetail, MDCChipNavigationEventDetail, MDCChipRemovalEventDetail, MDCChipSelectionEventDetail } from '../chip/types';
import { MDCChipSetAdapter } from './adapter';
export declare class MDCChipSetFoundation extends MDCFoundation<MDCChipSetAdapter> {
    static get strings(): {
        CHIP_SELECTOR: string;
    };
    static get cssClasses(): {
        CHOICE: string;
        FILTER: string;
    };
    static get defaultAdapter(): MDCChipSetAdapter;
    /**
     * The ids of the selected chips in the set. Only used for choice chip set or filter chip set.
     */
    private selectedChipIds;
    constructor(adapter?: Partial<MDCChipSetAdapter>);
    /**
     * Returns an array of the IDs of all selected chips.
     */
    getSelectedChipIds(): ReadonlyArray<string>;
    /**
     * Selects the chip with the given id. Deselects all other chips if the chip set is of the choice variant.
     * Does not notify clients of the updated selection state.
     */
    select(chipId: string): void;
    /**
     * Handles a chip interaction event
     */
    handleChipInteraction({ chipId }: MDCChipInteractionEventDetail): void;
    /**
     * Handles a chip selection event, used to handle discrepancy when selection state is set directly on the Chip.
     */
    handleChipSelection({ chipId, selected, shouldIgnore }: MDCChipSelectionEventDetail): void;
    /**
     * Handles the event when a chip is removed.
     */
    handleChipRemoval({ chipId, removedAnnouncement }: MDCChipRemovalEventDetail): void;
    /**
     * Handles a chip navigation event.
     */
    handleChipNavigation({ chipId, key, source }: MDCChipNavigationEventDetail): void;
    private focusChipAction;
    private getDirection;
    /**
     * Deselects the chip with the given id and optionally notifies clients.
     */
    private deselectImpl;
    /**
     * Deselects the chip with the given id and notifies clients.
     */
    private deselectAndNotifyClients;
    /**
     * Toggles selection of the chip with the given id.
     */
    private toggleSelect;
    private removeFocusFromChipsExcept;
    private selectAndNotifyClients;
    private selectImpl;
}
export default MDCChipSetFoundation;
