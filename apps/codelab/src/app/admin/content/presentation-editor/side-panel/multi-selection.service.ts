import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export function isCtrlEvent(event: MouseEvent) {
  return event.metaKey || event.ctrlKey;
}

export function isShiftEvent(event: MouseEvent) {
  return event.shiftKey;
}

@Injectable()
export class MultiSelectionService {

  public selections$ = new BehaviorSubject<number[]>([]);
  public selections: number[] = [];

  public lastSingleSelection: number | null = null;

  constructor() {
  }

  isAlreadySelected(index: number): boolean {
    return this.selections.indexOf(index) >= 0;
  }

  normalizeSelections(indexes: number[]): number[] {
    return indexes.sort((a, b) => a - b);
  }

  isSelectionEmpty(): boolean {
    return this.selections.length < 1;
  }

  setSelections(indexes: number[]) {
    this.selections = this.normalizeSelections(indexes);
    this.selections$.next(this.selections);
  }

  addToSelections(index: number) {
    if (!this.isAlreadySelected(index)) {
      this.setSelections([...this.selections, index]);
    }
  }

  select(event: MouseEvent, selectedIndex: number) {
    const shiftSelect = isShiftEvent(event) &&
      (this.lastSingleSelection || this.lastSingleSelection === 0) &&
      this.lastSingleSelection !== selectedIndex;

    if (this.isSelectionEmpty()) {

      this.setSelections([selectedIndex]);
      this.lastSingleSelection = selectedIndex;

    } else if (isCtrlEvent(event)) {

      const alreadySelected = this.isAlreadySelected(selectedIndex);

      if (alreadySelected) {
        const selectionsWithoutSelectedIndex = this.selections.filter((index) => index !== selectedIndex);

        if (selectionsWithoutSelectedIndex.length > 0) {
          this.setSelections(selectionsWithoutSelectedIndex);
        } else  {
          this.setSelections([selectedIndex]);
          this.lastSingleSelection = selectedIndex;
        }
      } else {
        this.setSelections([...this.selections, selectedIndex]);
        this.lastSingleSelection = selectedIndex;
      }

    } else if (shiftSelect) {

      const newSelectionBefore = selectedIndex < this.lastSingleSelection;
      const count = (
        newSelectionBefore
          ? this.lastSingleSelection - (selectedIndex - 1)
          : (selectedIndex + 1) - this.lastSingleSelection
      );

      const shiftSelection = new Array(count)
        .fill(0)
        .map((_, index) => newSelectionBefore
          ? this.lastSingleSelection - index
          : this.lastSingleSelection + index
        );

      this.setSelections([...shiftSelection]);

    } else {
      this.resetSelection(selectedIndex);
    }
  }

  resetSelection(currentIndex: number) {
    this.lastSingleSelection = currentIndex;

    this.setSelections([currentIndex]);
  }

  selectAll(indexes: number[]) {
    this.setSelections(indexes);
  }

}
