import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

/** Harness for interacting with an MDC-based mat-menu in tests. */
export declare class MatMenuHarness extends _MatMenuHarnessBase<typeof MatMenuItemHarness, MatMenuItemHarness, MenuItemHarnessFilters> {
    /** The selector for the host element of a `MatMenu` instance. */
    static hostSelector: string;
    protected _itemClass: typeof MatMenuItemHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a menu with specific attributes.
     * @param options Options for filtering which menu instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatMenuHarness>(this: ComponentHarnessConstructor<T>, options?: MenuHarnessFilters): HarnessPredicate<T>;
}

export declare abstract class _MatMenuHarnessBase<ItemType extends ComponentHarnessConstructor<Item> & {
    with: (options?: ItemFilters) => HarnessPredicate<Item>;
}, Item extends ComponentHarness & {
    click(): Promise<void>;
    getSubmenu(): Promise<_MatMenuHarnessBase<ItemType, Item, ItemFilters> | null>;
}, ItemFilters extends BaseHarnessFilters> extends ContentContainerComponentHarness<string> {
    private _documentRootLocator;
    protected abstract _itemClass: ItemType;
    /** Whether the menu is disabled. */
    isDisabled(): Promise<boolean>;
    /** Whether the menu is open. */
    isOpen(): Promise<boolean>;
    /** Gets the text of the menu's trigger element. */
    getTriggerText(): Promise<string>;
    /** Focuses the menu. */
    focus(): Promise<void>;
    /** Blurs the menu. */
    blur(): Promise<void>;
    /** Whether the menu is focused. */
    isFocused(): Promise<boolean>;
    /** Opens the menu. */
    open(): Promise<void>;
    /** Closes the menu. */
    close(): Promise<void>;
    /**
     * Gets a list of `MatMenuItemHarness` representing the items in the menu.
     * @param filters Optionally filters which menu items are included.
     */
    getItems(filters?: Omit<ItemFilters, 'ancestor'>): Promise<Item[]>;
    /**
     * Clicks an item in the menu, and optionally continues clicking items in subsequent sub-menus.
     * @param itemFilter A filter used to represent which item in the menu should be clicked. The
     *     first matching menu item will be clicked.
     * @param subItemFilters A list of filters representing the items to click in any subsequent
     *     sub-menus. The first item in the sub-menu matching the corresponding filter in
     *     `subItemFilters` will be clicked.
     */
    clickItem(itemFilter: Omit<ItemFilters, 'ancestor'>, ...subItemFilters: Omit<ItemFilters, 'ancestor'>[]): Promise<void>;
    protected getRootHarnessLoader(): Promise<HarnessLoader>;
    /** Gets the menu panel associated with this menu. */
    private _getMenuPanel;
    /** Gets the id of the menu panel associated with this menu. */
    private _getPanelId;
}

/** Harness for interacting with an MDC-based mat-menu-item in tests. */
export declare class MatMenuItemHarness extends _MatMenuItemHarnessBase<typeof MatMenuHarness, MatMenuHarness> {
    /** The selector for the host element of a `MatMenuItem` instance. */
    static hostSelector: string;
    protected _menuClass: typeof MatMenuHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a menu item with specific attributes.
     * @param options Options for filtering which menu item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatMenuItemHarness>(this: ComponentHarnessConstructor<T>, options?: MenuItemHarnessFilters): HarnessPredicate<T>;
}

export declare abstract class _MatMenuItemHarnessBase<MenuType extends ComponentHarnessConstructor<Menu>, Menu extends ComponentHarness> extends ContentContainerComponentHarness<string> {
    protected abstract _menuClass: MenuType;
    /** Whether the menu is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the text of the menu item. */
    getText(): Promise<string>;
    /** Focuses the menu item. */
    focus(): Promise<void>;
    /** Blurs the menu item. */
    blur(): Promise<void>;
    /** Whether the menu item is focused. */
    isFocused(): Promise<boolean>;
    /** Clicks the menu item. */
    click(): Promise<void>;
    /** Whether this item has a submenu. */
    hasSubmenu(): Promise<boolean>;
    /** Gets the submenu associated with this menu item, or null if none. */
    getSubmenu(): Promise<Menu | null>;
}

/** A set of criteria that can be used to filter a list of `MatMenuHarness` instances. */
export declare interface MenuHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose trigger text matches the given value. */
    triggerText?: string | RegExp;
}

/** A set of criteria that can be used to filter a list of `MatMenuItemHarness` instances. */
export declare interface MenuItemHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
    /** Only find instances that have a sub-menu. */
    hasSubmenu?: boolean;
}

export { }
