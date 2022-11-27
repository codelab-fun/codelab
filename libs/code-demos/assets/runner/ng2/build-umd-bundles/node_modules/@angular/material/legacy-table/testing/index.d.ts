import { HarnessPredicate } from '@angular/cdk/testing';
import { CellHarnessFilters as LegacyCellHarnessFilters } from '@angular/material/table/testing';
import { RowHarnessFilters as LegacyRowHarnessFilters } from '@angular/material/table/testing';
import { TableHarnessFilters as LegacyTableHarnessFilters } from '@angular/material/table/testing';
import { _MatCellHarnessBase as _MatLegacyCellHarnessBase } from '@angular/material/table/testing';
import { _MatRowHarnessBase as _MatLegacyRowHarnessBase } from '@angular/material/table/testing';
import { MatRowHarnessColumnsText as MatLegacyRowHarnessColumnsText } from '@angular/material/table/testing';
import { _MatTableHarnessBase as _MatLegacyTableHarnessBase } from '@angular/material/table/testing';
import { MatTableHarnessColumnsText as MatLegacyTableHarnessColumnsText } from '@angular/material/table/testing';

export { LegacyCellHarnessFilters }

export { LegacyRowHarnessFilters }

export { LegacyTableHarnessFilters }

/**
 * Harness for interacting with a standard Angular Material table cell.
 * @deprecated Use `MatCellHarness` from `@angular/material/table/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyCellHarness extends _MatLegacyCellHarnessBase {
    /** The selector for the host element of a `MatCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyCellHarnessFilters): HarnessPredicate<MatLegacyCellHarness>;
}

export { _MatLegacyCellHarnessBase }

/**
 * Harness for interacting with a standard Angular Material table footer cell.
 * @deprecated Use `MatFooterCellHarness` from `@angular/material/table/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyFooterCellHarness extends _MatLegacyCellHarnessBase {
    /** The selector for the host element of a `MatFooterCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table footer cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyCellHarnessFilters): HarnessPredicate<MatLegacyFooterCellHarness>;
}

/**
 * Harness for interacting with a standard Angular Material table footer row.
 * @deprecated Use `MatFooterRowHarness` from `@angular/material/table/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyFooterRowHarness extends _MatLegacyRowHarnessBase<typeof MatLegacyFooterCellHarness, MatLegacyFooterCellHarness> {
    /** The selector for the host element of a `MatFooterRowHarness` instance. */
    static hostSelector: string;
    protected _cellHarness: typeof MatLegacyFooterCellHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table footer row cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyRowHarnessFilters): HarnessPredicate<MatLegacyFooterRowHarness>;
}

/**
 * Harness for interacting with a standard Angular Material table header cell.
 * @deprecated Use `MatHeaderCellHarness` from `@angular/material/table/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyHeaderCellHarness extends _MatLegacyCellHarnessBase {
    /** The selector for the host element of a `MatHeaderCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table header cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyCellHarnessFilters): HarnessPredicate<MatLegacyHeaderCellHarness>;
}

/**
 * Harness for interacting with a standard Angular Material table header row.
 * @deprecated Use `MatHeaderRowHarness` from `@angular/material/table/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyHeaderRowHarness extends _MatLegacyRowHarnessBase<typeof MatLegacyHeaderCellHarness, MatLegacyHeaderCellHarness> {
    /** The selector for the host element of a `MatHeaderRowHarness` instance. */
    static hostSelector: string;
    protected _cellHarness: typeof MatLegacyHeaderCellHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table header row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyRowHarnessFilters): HarnessPredicate<MatLegacyHeaderRowHarness>;
}

/**
 * Harness for interacting with a standard Angular Material table row.
 * @deprecated Use `MatRowHarness` from `@angular/material/table/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyRowHarness extends _MatLegacyRowHarnessBase<typeof MatLegacyCellHarness, MatLegacyCellHarness> {
    /** The selector for the host element of a `MatRowHarness` instance. */
    static hostSelector: string;
    protected _cellHarness: typeof MatLegacyCellHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyRowHarnessFilters): HarnessPredicate<MatLegacyRowHarness>;
}

export { _MatLegacyRowHarnessBase }

export { MatLegacyRowHarnessColumnsText }

/**
 * Harness for interacting with a standard mat-table in tests.
 * @deprecated Use `MatTableHarness` from `@angular/material/table/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyTableHarness extends _MatLegacyTableHarnessBase<typeof MatLegacyHeaderRowHarness, MatLegacyHeaderRowHarness, typeof MatLegacyRowHarness, MatLegacyRowHarness, typeof MatLegacyFooterRowHarness, MatLegacyFooterRowHarness> {
    /** The selector for the host element of a `MatTableHarness` instance. */
    static hostSelector: string;
    protected _headerRowHarness: typeof MatLegacyHeaderRowHarness;
    protected _rowHarness: typeof MatLegacyRowHarness;
    protected _footerRowHarness: typeof MatLegacyFooterRowHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyTableHarnessFilters): HarnessPredicate<MatLegacyTableHarness>;
}

export { _MatLegacyTableHarnessBase }

export { MatLegacyTableHarnessColumnsText }

export { }
