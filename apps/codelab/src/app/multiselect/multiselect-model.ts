import { Subject } from 'rxjs';

export class MultiselectModel<T> {
  private selection = new Set<T>();

  private stack: T[] = [];

  changed = new Subject<T[]>();

  constructor(private items: T[] = []) {}

  get selected(): T[] {
    return Array.from(this.selection.values());
  }

  setItems(items: T[]): void {
    this.items = items;
  }

  findBetween(item1: T, item2: T): T[] {
    const index1 = this.items.indexOf(item1);
    const index2 = this.items.indexOf(item2);

    const numberOfItems = Math.abs(index1 - index2) + 1;
    const firstIndex = index1 < index2 ? index1 : index2;

    return this.items.slice(firstIndex, firstIndex + numberOfItems);
  }

  toggleAllItems(items: T[], shouldSelect: boolean): void {
    for (const item of items) {
      if (shouldSelect) {
        this.selection.add(item);
      } else {
        this.selection.delete(item);
      }
    }

    this.emitChangeEvent();
  }

  toggleSingle(item: T): void {
    if (this.isSelected(item)) {
      this.toggleAllItems([item], false);
      this.stack = this.stack.filter(v => v !== item);
    } else {
      this.toggleAllItems([item], true);
      this.stack.push(item);
    }
  }

  toggleContinuous(item: T): void {
    const between = this.findBetween(this.stack[this.stack.length - 1], item);

    this.toggleAllItems(between, !this.isSelected(item));

    this.stack.push(item);
  }

  toggleAll(): void {
    if (this.selected.length === this.items.length) {
      this.clear();
    } else {
      this.toggleAllItems(this.items, true);
    }
  }

  selectSingle(item: T): void {
    this.selection.clear();

    this.toggleAllItems([item], true);

    this.stack.push(item);
  }

  isSelected(item: T): boolean {
    return this.selection.has(item);
  }

  getSelectedIndexes(): number[] {
    return this.selected.map(item => this.items.indexOf(item));
  }

  clear(): void {
    this.selection.clear();
    this.emitChangeEvent();
  }

  isEmpty(): boolean {
    return this.selection.size === 0;
  }

  emitChangeEvent(): void {
    this.changed.next(this.selected);
  }
}
