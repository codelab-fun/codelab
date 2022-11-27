import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { DividerHarnessFilters } from '@angular/material/divider/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatDividerHarness } from '@angular/material/divider/testing';
import { MatListOptionCheckboxPosition } from '@angular/material/list';

export declare interface ActionListHarnessFilters extends BaseHarnessFilters {
}

export declare interface ActionListItemHarnessFilters extends BaseListItemHarnessFilters {
}

export declare interface BaseListItemHarnessFilters extends BaseHarnessFilters {
    title?: string | RegExp;
    secondaryText?: string | RegExp | null;
    tertiaryText?: string | RegExp | null;
    fullText?: string | RegExp;
    /**
     * @deprecated Use the `fullText` filter instead.
     * @breaking-change 16.0.0
     */
    text?: string | RegExp;
}

export declare interface ListHarnessFilters extends BaseHarnessFilters {
}

export declare interface ListItemHarnessFilters extends BaseListItemHarnessFilters {
}

export declare interface ListOptionHarnessFilters extends BaseListItemHarnessFilters {
    selected?: boolean;
}

/** Represents a section of a list falling under a specific header. */
declare interface ListSection<I> {
    /** The heading for this list section. `undefined` if there is no heading. */
    heading?: string;
    /** The items in this list section. */
    items: I[];
}

/** Harness for interacting with a MDC-based action-list in tests. */
export declare class MatActionListHarness extends MatListHarnessBase<typeof MatActionListItemHarness, MatActionListItemHarness, ActionListItemHarnessFilters> {
    /** The selector for the host element of a `MatActionList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for an action list with specific
     * attributes.
     * @param options Options for filtering which action list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatActionListHarness>(this: ComponentHarnessConstructor<T>, options?: ActionListHarnessFilters): HarnessPredicate<T>;
    _itemHarness: typeof MatActionListItemHarness;
}

/** Harness for interacting with an action list item. */
export declare class MatActionListItemHarness extends MatListItemHarnessBase {
    /** The selector for the host element of a `MatListItem` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a list item with specific
     * attributes.
     * @param options Options for filtering which action list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatActionListItemHarness>(this: ComponentHarnessConstructor<T>, options?: ActionListItemHarnessFilters): HarnessPredicate<T>;
    /** Clicks on the action list item. */
    click(): Promise<void>;
    /** Focuses the action list item. */
    focus(): Promise<void>;
    /** Blurs the action list item. */
    blur(): Promise<void>;
    /** Whether the action list item is focused. */
    isFocused(): Promise<boolean>;
}

/** Harness for interacting with a MDC-based list in tests. */
export declare class MatListHarness extends MatListHarnessBase<typeof MatListItemHarness, MatListItemHarness, ListItemHarnessFilters> {
    /** The selector for the host element of a `MatList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a list with specific attributes.
     * @param options Options for filtering which list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatListHarness>(this: ComponentHarnessConstructor<T>, options?: ListHarnessFilters): HarnessPredicate<T>;
    _itemHarness: typeof MatListItemHarness;
}

/**
 * Shared behavior among the harnesses for the various `MatList` flavors.
 * @template T A constructor type for a list item harness type used by this list harness.
 * @template C The list item harness type that `T` constructs.
 * @template F The filter type used filter list item harness of type `C`.
 * @docs-private
 */
declare abstract class MatListHarnessBase<T extends ComponentHarnessConstructor<C> & {
    with: (options?: F) => HarnessPredicate<C>;
}, C extends ComponentHarness, F extends BaseListItemHarnessFilters> extends ComponentHarness {
    protected _itemHarness: T;
    /**
     * Gets a list of harnesses representing the items in this list.
     * @param filters Optional filters used to narrow which harnesses are included
     * @return The list of items matching the given filters.
     */
    getItems(filters?: F): Promise<C[]>;
    /**
     * Gets a list of `ListSection` representing the list items grouped by subheaders. If the list has
     * no subheaders it is represented as a single `ListSection` with an undefined `heading` property.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sections by subheader.
     */
    getItemsGroupedBySubheader(filters?: F): Promise<ListSection<C>[]>;
    /**
     * Gets a list of sub-lists representing the list items grouped by dividers. If the list has no
     * dividers it is represented as a list with a single sub-list.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sub-lists by divider.
     */
    getItemsGroupedByDividers(filters?: F): Promise<C[][]>;
    /**
     * Gets a list of harnesses representing all of the items, subheaders, and dividers
     * (in the order they appear in the list). Use `instanceof` to check which type of harness a given
     * item is.
     * @param filters Optional filters used to narrow which list items, subheaders, and dividers are
     *     included. A value of `false` for the `item`, `subheader`, or `divider` properties indicates
     *     that the respective harness type should be omitted completely.
     * @return The list of harnesses representing the items, subheaders, and dividers matching the
     *     given filters.
     */
    getItemsWithSubheadersAndDividers(filters: {
        item: false;
        subheader: false;
        divider: false;
    }): Promise<[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item?: F | false;
        subheader: false;
        divider: false;
    }): Promise<C[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item: false;
        subheader?: SubheaderHarnessFilters | false;
        divider: false;
    }): Promise<MatSubheaderHarness[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item: false;
        subheader: false;
        divider?: DividerHarnessFilters | false;
    }): Promise<MatDividerHarness[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item?: F | false;
        subheader?: SubheaderHarnessFilters | false;
        divider: false;
    }): Promise<(C | MatSubheaderHarness)[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item?: F | false;
        subheader: false;
        divider?: false | DividerHarnessFilters;
    }): Promise<(C | MatDividerHarness)[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item: false;
        subheader?: false | SubheaderHarnessFilters;
        divider?: false | DividerHarnessFilters;
    }): Promise<(MatSubheaderHarness | MatDividerHarness)[]>;
    getItemsWithSubheadersAndDividers(filters?: {
        item?: F | false;
        subheader?: SubheaderHarnessFilters | false;
        divider?: DividerHarnessFilters | false;
    }): Promise<(C | MatSubheaderHarness | MatDividerHarness)[]>;
}

/** Harness for interacting with a list item. */
export declare class MatListItemHarness extends MatListItemHarnessBase {
    /** The selector for the host element of a `MatListItem` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a list item with specific attributes.
     * @param options Options for filtering which list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatListItemHarness>(this: ComponentHarnessConstructor<T>, options?: ListItemHarnessFilters): HarnessPredicate<T>;
}

/**
 * Shared behavior among the harnesses for the various `MatListItem` flavors.
 * @docs-private
 */
declare abstract class MatListItemHarnessBase extends ContentContainerComponentHarness<MatListItemSection> {
    private _lines;
    private _primaryText;
    private _avatar;
    private _icon;
    private _unscopedTextContent;
    /** Gets the type of the list item, currently describing how many lines there are. */
    getType(): Promise<MatListItemType>;
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     *
     * @deprecated Use the `getFullText` method instead.
     * @breaking-change 16.0.0
     */
    getText(): Promise<string>;
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     */
    getFullText(): Promise<string>;
    /** Gets the title of the list item. */
    getTitle(): Promise<string>;
    /** Whether the list item is disabled. */
    isDisabled(): Promise<boolean>;
    /**
     * Gets the secondary line text of the list item. Null if the list item
     * does not have a secondary line.
     */
    getSecondaryText(): Promise<string | null>;
    /**
     * Gets the tertiary line text of the list item. Null if the list item
     * does not have a tertiary line.
     */
    getTertiaryText(): Promise<string | null>;
    /** Whether this list item has an avatar. */
    hasAvatar(): Promise<boolean>;
    /** Whether this list item has an icon. */
    hasIcon(): Promise<boolean>;
}

/** Selectors for the various list item sections that may contain user content. */
export declare const enum MatListItemSection {
    CONTENT = ".mdc-list-item__content"
}

/** Enum describing the possible variants of a list item. */
export declare const enum MatListItemType {
    ONE_LINE_ITEM = 0,
    TWO_LINE_ITEM = 1,
    THREE_LINE_ITEM = 2
}

/** Harness for interacting with a MDC-based list option. */
export declare class MatListOptionHarness extends MatListItemHarnessBase {
    /** The selector for the host element of a `MatListOption` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a list option with specific
     * attributes.
     * @param options Options for filtering which list option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatListOptionHarness>(this: ComponentHarnessConstructor<T>, options?: ListOptionHarnessFilters): HarnessPredicate<T>;
    private _beforeCheckbox;
    /** Gets the position of the checkbox relative to the list option content. */
    getCheckboxPosition(): Promise<MatListOptionCheckboxPosition>;
    /** Whether the list option is selected. */
    isSelected(): Promise<boolean>;
    /** Focuses the list option. */
    focus(): Promise<void>;
    /** Blurs the list option. */
    blur(): Promise<void>;
    /** Whether the list option is focused. */
    isFocused(): Promise<boolean>;
    /** Toggles the checked state of the checkbox. */
    toggle(): Promise<void>;
    /**
     * Puts the list option in a checked state by toggling it if it is currently
     * unchecked, or doing nothing if it is already checked.
     */
    select(): Promise<void>;
    /**
     * Puts the list option in an unchecked state by toggling it if it is currently
     * checked, or doing nothing if it is already unchecked.
     */
    deselect(): Promise<void>;
}

/** Harness for interacting with a MDC-based mat-nav-list in tests. */
export declare class MatNavListHarness extends MatListHarnessBase<typeof MatNavListItemHarness, MatNavListItemHarness, NavListItemHarnessFilters> {
    /** The selector for the host element of a `MatNavList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a nav list with specific
     * attributes.
     * @param options Options for filtering which nav list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatNavListHarness>(this: ComponentHarnessConstructor<T>, options?: NavListHarnessFilters): HarnessPredicate<T>;
    _itemHarness: typeof MatNavListItemHarness;
}

/** Harness for interacting with a MDC-based nav-list item. */
export declare class MatNavListItemHarness extends MatListItemHarnessBase {
    /** The selector for the host element of a `MatListItem` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a nav list item with specific
     * attributes.
     * @param options Options for filtering which nav list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatNavListItemHarness>(this: ComponentHarnessConstructor<T>, options?: NavListItemHarnessFilters): HarnessPredicate<T>;
    /** Gets the href for this nav list item. */
    getHref(): Promise<string | null>;
    /** Clicks on the nav list item. */
    click(): Promise<void>;
    /** Focuses the nav list item. */
    focus(): Promise<void>;
    /** Blurs the nav list item. */
    blur(): Promise<void>;
    /** Whether the nav list item is focused. */
    isFocused(): Promise<boolean>;
    /** Whether the list item is activated. Should only be used for nav list items. */
    isActivated(): Promise<boolean>;
}

/** Harness for interacting with a MDC_based selection-list in tests. */
export declare class MatSelectionListHarness extends MatListHarnessBase<typeof MatListOptionHarness, MatListOptionHarness, ListOptionHarnessFilters> {
    /** The selector for the host element of a `MatSelectionList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a selection list with specific
     * attributes.
     * @param options Options for filtering which selection list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatSelectionListHarness>(this: ComponentHarnessConstructor<T>, options?: SelectionListHarnessFilters): HarnessPredicate<T>;
    _itemHarness: typeof MatListOptionHarness;
    /** Whether the selection list is disabled. */
    isDisabled(): Promise<boolean>;
    /**
     * Selects all items matching any of the given filters.
     * @param filters Filters that specify which items should be selected.
     */
    selectItems(...filters: ListOptionHarnessFilters[]): Promise<void>;
    /**
     * Deselects all items matching any of the given filters.
     * @param filters Filters that specify which items should be deselected.
     */
    deselectItems(...filters: ListItemHarnessFilters[]): Promise<void>;
    /** Gets all items matching the given list of filters. */
    private _getItems;
}

/** Harness for interacting with a MDC-based list subheader. */
export declare class MatSubheaderHarness extends ComponentHarness {
    static hostSelector: string;
    static with(options?: SubheaderHarnessFilters): HarnessPredicate<MatSubheaderHarness>;
    /** Gets the full text content of the list item (including text from any font icons). */
    getText(): Promise<string>;
}

export declare interface NavListHarnessFilters extends BaseHarnessFilters {
}

export declare interface NavListItemHarnessFilters extends BaseListItemHarnessFilters {
    href?: string | RegExp | null;
    activated?: boolean;
}

export declare interface SelectionListHarnessFilters extends BaseHarnessFilters {
}

export declare interface SubheaderHarnessFilters extends BaseHarnessFilters {
    text?: string | RegExp;
}

export { }
