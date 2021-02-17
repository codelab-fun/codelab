import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export function isCtrlEvent(event: MouseEvent) {
  return event.metaKey || event.ctrlKey;
}

export function isShiftEvent(event: MouseEvent) {
  return event.shiftKey;
}

@Injectable()
export class MultiselectService {
  public selection$ = new BehaviorSubject<number[]>([]);
  public selection: number[] = [];

  public lastSingleSelection: number | null = null;

  constructor() {}

  isAlreadySelected(index: number): boolean {
    return this.selection.indexOf(index) >= 0;
  }

  normalizeSelection(indexes: number[]): number[] {
    return indexes.sort((a, b) => a - b);
  }

  isSelectionEmpty(): boolean {
    return this.selection.length < 1;
  }

  setSelection(indexes: number[]) {
    this.selection = this.normalizeSelection(indexes);
    this.selection$.next(this.selection);
  }

  addToSelection(index: number) {
    if (!this.isAlreadySelected(index)) {
      this.setSelection([...this.selection, index]);
    }
  }

  select(event: MouseEvent, selectedIndex: number) {
    const shiftSelect = isShiftEvent(event)
      && this.lastSingleSelection >= 0
      && this.lastSingleSelection !== selectedIndex;

    if (this.isSelectionEmpty()) {
      this.setSelection([selectedIndex]);
      this.lastSingleSelection = selectedIndex;
    } else if (isCtrlEvent(event)) {
      const alreadySelected = this.isAlreadySelected(selectedIndex);

      if (alreadySelected) {
        const selectionWithoutSelectedIndex = this.selection.filter(
          index => index !== selectedIndex
        );

        if (selectionWithoutSelectedIndex.length > 0) {
          this.setSelection(selectionWithoutSelectedIndex);
        } else {
          this.setSelection([selectedIndex]);
          this.lastSingleSelection = selectedIndex;
        }
      } else {
        this.setSelection([...this.selection, selectedIndex]);
        this.lastSingleSelection = selectedIndex;
      }
    } else if (shiftSelect) {
      const newSelectionBefore = selectedIndex < this.lastSingleSelection;
      const count = newSelectionBefore
        ? this.lastSingleSelection - (selectedIndex - 1)
        : selectedIndex + 1 - this.lastSingleSelection;

      const shiftSelection = new Array(count)
        .fill(0)
        .map((_, index) =>
          newSelectionBefore
            ? this.lastSingleSelection - index
            : this.lastSingleSelection + index
        );

      this.setSelection([...shiftSelection]);
    } else {
      this.resetSelection(selectedIndex);
    }
  }

  resetSelection(currentIndex: number) {
    this.lastSingleSelection = currentIndex;

    this.setSelection([currentIndex]);
  }

  selectAll(indexes: number[]) {
    this.setSelection(indexes);
  }
}
