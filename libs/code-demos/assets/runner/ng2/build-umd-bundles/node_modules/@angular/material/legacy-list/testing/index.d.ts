import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { DividerHarnessFilters } from '@angular/material/divider/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatDividerHarness } from '@angular/material/divider/testing';
import { MatLegacyListOptionCheckboxPosition } from '@angular/material/legacy-list';

/**
 * @deprecated Use `ActionListHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyActionListHarnessFilters extends BaseHarnessFilters {
}

/**
 * @deprecated Use `ActionListItemHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyActionListItemHarnessFilters extends LegacyBaseListItemHarnessFilters {
}

/**
 * @deprecated Use `BaseListItemHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyBaseListItemHarnessFilters extends BaseHarnessFilters {
    text?: string | RegExp;
}

/**
 * @deprecated Use `ListHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyListHarnessFilters extends BaseHarnessFilters {
}

/**
 * @deprecated Use `ListItemHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyListItemHarnessFilters extends LegacyBaseListItemHarnessFilters {
}

/**
 * @deprecated Use `ListOptionHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyListOptionHarnessFilters extends LegacyBaseListItemHarnessFilters {
    selected?: boolean;
}

/**
 * @deprecated Use `NavListHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyNavListHarnessFilters extends BaseHarnessFilters {
}

/**
 * @deprecated Use `NavListItemHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyNavListItemHarnessFilters extends LegacyBaseListItemHarnessFilters {
    href?: string | RegExp | null;
}

/**
 * @deprecated Use `SelectionListHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacySelectionListHarnessFilters extends BaseHarnessFilters {
}

/**
 * @deprecated Use `SubheaderHarnessFilters` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacySubheaderHarnessFilters extends BaseHarnessFilters {
    text?: string | RegExp;
}

/**
 * Represents a section of a list falling under a specific header.
 * @deprecated Use `ListSection` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
declare interface ListSection<I> {
    /** The heading for this list section. `undefined` if there is no heading. */
    heading?: string;
    /** The items in this list section. */
    items: I[];
}

/**
 * Harness for interacting with a standard mat-action-list in tests.
 * @deprecated Use `MatActionListHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyActionListHarness extends MatLegacyListHarnessBase<typeof MatLegacyActionListItemHarness, MatLegacyActionListItemHarness, LegacyActionListItemHarnessFilters> {
    /** The selector for the host element of a `MatActionList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatActionListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which action list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyActionListHarnessFilters): HarnessPredicate<MatLegacyActionListHarness>;
    _itemHarness: typeof MatLegacyActionListItemHarness;
}

/**
 * Harness for interacting with an action list item.
 * @deprecated Use `MatActionListItemHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyActionListItemHarness extends MatLegacyListItemHarnessBase {
    /** The selector for the host element of a `MatListItem` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatActionListItemHarness` that
     * meets certain criteria.
     * @param options Options for filtering which action list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyActionListItemHarnessFilters): HarnessPredicate<MatLegacyActionListItemHarness>;
    /** Clicks on the action list item. */
    click(): Promise<void>;
    /** Focuses the action list item. */
    focus(): Promise<void>;
    /** Blurs the action list item. */
    blur(): Promise<void>;
    /** Whether the action list item is focused. */
    isFocused(): Promise<boolean>;
}

/**
 * Harness for interacting with a standard mat-list in tests.
 * @deprecated Use `MatListHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyListHarness extends MatLegacyListHarnessBase<typeof MatLegacyListItemHarness, MatLegacyListItemHarness, LegacyListItemHarnessFilters> {
    /** The selector for the host element of a `MatList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatListHarness` that meets certain
     * criteria.
     * @param options Options for filtering which list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyListHarnessFilters): HarnessPredicate<MatLegacyListHarness>;
    _itemHarness: typeof MatLegacyListItemHarness;
}

/**
 * Shared behavior among the harnesses for the various `MatList` flavors.
 * @template T A constructor type for a list item harness type used by this list harness.
 * @template C The list item harness type that `T` constructs.
 * @template F The filter type used filter list item harness of type `C`.
 * @docs-private
 * @deprecated Use `class` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
declare abstract class MatLegacyListHarnessBase<T extends ComponentHarnessConstructor<C> & {
    with: (options?: F) => HarnessPredicate<C>;
}, C extends ComponentHarness, F extends LegacyBaseListItemHarnessFilters> extends ComponentHarness {
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
        subheader?: LegacySubheaderHarnessFilters | false;
        divider: false;
    }): Promise<MatLegacySubheaderHarness[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item: false;
        subheader: false;
        divider?: DividerHarnessFilters | false;
    }): Promise<MatDividerHarness[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item?: F | false;
        subheader?: LegacySubheaderHarnessFilters | false;
        divider: false;
    }): Promise<(C | MatLegacySubheaderHarness)[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item?: F | false;
        subheader: false;
        divider?: false | DividerHarnessFilters;
    }): Promise<(C | MatDividerHarness)[]>;
    getItemsWithSubheadersAndDividers(filters: {
        item: false;
        subheader?: false | LegacySubheaderHarnessFilters;
        divider?: false | DividerHarnessFilters;
    }): Promise<(MatLegacySubheaderHarness | MatDividerHarness)[]>;
    getItemsWithSubheadersAndDividers(filters?: {
        item?: F | false;
        subheader?: LegacySubheaderHarnessFilters | false;
        divider?: DividerHarnessFilters | false;
    }): Promise<(C | MatLegacySubheaderHarness | MatDividerHarness)[]>;
}

/**
 * Harness for interacting with a list item.
 * @deprecated Use `MatListItemHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyListItemHarness extends MatLegacyListItemHarnessBase {
    /** The selector for the host element of a `MatListItem` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatListItemHarness` that meets
     * certain criteria.
     * @param options Options for filtering which list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyListItemHarnessFilters): HarnessPredicate<MatLegacyListItemHarness>;
}

/**
 * Shared behavior among the harnesses for the various `MatListItem` flavors.
 * @docs-private
 * @deprecated Use `class` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
declare abstract class MatLegacyListItemHarnessBase extends ContentContainerComponentHarness<MatLegacyListItemSection> {
    private _lines;
    private _avatar;
    private _icon;
    /** Gets the full text content of the list item. */
    getText(): Promise<string>;
    /** Gets the lines of text (`mat-line` elements) in this nav list item. */
    getLinesText(): Promise<string[]>;
    /** Whether this list item has an avatar. */
    hasAvatar(): Promise<boolean>;
    /** Whether this list item has an icon. */
    hasIcon(): Promise<boolean>;
    /** Whether this list option is disabled. */
    isDisabled(): Promise<boolean>;
}

/**
 * Selectors for the various list item sections that may contain user content.
 * @deprecated Use `enum` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare const enum MatLegacyListItemSection {
    CONTENT = ".mat-list-item-content"
}

/**
 * Harness for interacting with a list option.
 * @deprecated Use `MatListOptionHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyListOptionHarness extends MatLegacyListItemHarnessBase {
    /** The selector for the host element of a `MatListOption` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatListOptionHarness` that
     * meets certain criteria.
     * @param options Options for filtering which list option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyListOptionHarnessFilters): HarnessPredicate<MatLegacyListOptionHarness>;
    private _itemContent;
    /** Gets the position of the checkbox relative to the list option content. */
    getCheckboxPosition(): Promise<MatLegacyListOptionCheckboxPosition>;
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
     * Puts the list option in a checked state by toggling it if it is currently unchecked, or doing
     * nothing if it is already checked.
     */
    select(): Promise<void>;
    /**
     * Puts the list option in an unchecked state by toggling it if it is currently checked, or doing
     * nothing if it is already unchecked.
     */
    deselect(): Promise<void>;
}

/**
 * Harness for interacting with a standard mat-nav-list in tests.
 * @deprecated Use `MatNavListHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyNavListHarness extends MatLegacyListHarnessBase<typeof MatLegacyNavListItemHarness, MatLegacyNavListItemHarness, LegacyNavListItemHarnessFilters> {
    /** The selector for the host element of a `MatNavList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatNavListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which nav list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyNavListHarnessFilters): HarnessPredicate<MatLegacyNavListHarness>;
    _itemHarness: typeof MatLegacyNavListItemHarness;
}

/**
 * Harness for interacting with a nav list item.
 * @deprecated Use `MatNavListItemHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyNavListItemHarness extends MatLegacyListItemHarnessBase {
    /** The selector for the host element of a `MatListItem` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatNavListItemHarness` that
     * meets certain criteria.
     * @param options Options for filtering which nav list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyNavListItemHarnessFilters): HarnessPredicate<MatLegacyNavListItemHarness>;
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
}

/**
 * Harness for interacting with a standard mat-selection-list in tests.
 * @deprecated Use `MatSelectionListHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacySelectionListHarness extends MatLegacyListHarnessBase<typeof MatLegacyListOptionHarness, MatLegacyListOptionHarness, LegacyListOptionHarnessFilters> {
    /** The selector for the host element of a `MatSelectionList` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSelectionListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which selection list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacySelectionListHarnessFilters): HarnessPredicate<MatLegacySelectionListHarness>;
    _itemHarness: typeof MatLegacyListOptionHarness;
    /** Whether the selection list is disabled. */
    isDisabled(): Promise<boolean>;
    /**
     * Selects all items matching any of the given filters.
     * @param filters Filters that specify which items should be selected.
     */
    selectItems(...filters: LegacyListOptionHarnessFilters[]): Promise<void>;
    /**
     * Deselects all items matching any of the given filters.
     * @param filters Filters that specify which items should be deselected.
     */
    deselectItems(...filters: LegacyListItemHarnessFilters[]): Promise<void>;
    /** Gets all items matching the given list of filters. */
    private _getItems;
}

/**
 * Harness for interacting with a list subheader.
 * @deprecated Use `MatSubheaderHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
declare class MatLegacySubheaderHarness extends ComponentHarness {
    static hostSelector: string;
    static with(options?: LegacySubheaderHarnessFilters): HarnessPredicate<MatLegacySubheaderHarness>;
    /** Gets the full text content of the list item (including text from any font icons). */
    getText(): Promise<string>;
}

export { }
