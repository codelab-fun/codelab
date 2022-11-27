import { HarnessPredicate } from '@angular/cdk/testing';
import { MenuHarnessFilters as LegacyMenuHarnessFilters } from '@angular/material/menu/testing';
import { MenuItemHarnessFilters as LegacyMenuItemHarnessFilters } from '@angular/material/menu/testing';
import { _MatMenuHarnessBase } from '@angular/material/menu/testing';
import { _MatMenuItemHarnessBase } from '@angular/material/menu/testing';

export { LegacyMenuHarnessFilters }

export { LegacyMenuItemHarnessFilters }

/**
 * Harness for interacting with a standard mat-menu in tests.
 * @deprecated Use `MatMenuHarness` from `@angular/material/menu/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyMenuHarness extends _MatMenuHarnessBase<typeof MatLegacyMenuItemHarness, MatLegacyMenuItemHarness, LegacyMenuItemHarnessFilters> {
    /** The selector for the host element of a `MatMenu` instance. */
    static hostSelector: string;
    protected _itemClass: typeof MatLegacyMenuItemHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatMenuHarness` that meets certain
     * criteria.
     * @param options Options for filtering which menu instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyMenuHarnessFilters): HarnessPredicate<MatLegacyMenuHarness>;
}

/**
 * Harness for interacting with a standard mat-menu-item in tests.
 * @deprecated Use `MatMenuItemHarness` from `@angular/material/menu/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyMenuItemHarness extends _MatMenuItemHarnessBase<typeof MatLegacyMenuHarness, MatLegacyMenuHarness> {
    /** The selector for the host element of a `MatMenuItem` instance. */
    static hostSelector: string;
    protected _menuClass: typeof MatLegacyMenuHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatMenuItemHarness` that meets
     * certain criteria.
     * @param options Options for filtering which menu item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyMenuItemHarnessFilters): HarnessPredicate<MatLegacyMenuItemHarness>;
}

export { }
