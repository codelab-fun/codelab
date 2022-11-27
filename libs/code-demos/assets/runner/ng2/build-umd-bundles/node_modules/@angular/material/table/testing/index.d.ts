import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

/** A set of criteria that can be used to filter a list of cell harness instances. */
export declare interface CellHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
    /** Only find instances whose column name matches the given value. */
    columnName?: string | RegExp;
}

/** Harness for interacting with an MDC-based Angular Material table cell. */
export declare class MatCellHarness extends _MatCellHarnessBase {
    /** The selector for the host element of a `MatCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: CellHarnessFilters): HarnessPredicate<MatCellHarness>;
}

export declare abstract class _MatCellHarnessBase extends ContentContainerComponentHarness {
    /** Gets the cell's text. */
    getText(): Promise<string>;
    /** Gets the name of the column that the cell belongs to. */
    getColumnName(): Promise<string>;
    protected static _getCellPredicate<T extends MatCellHarness>(type: ComponentHarnessConstructor<T>, options: CellHarnessFilters): HarnessPredicate<T>;
}

/** Harness for interacting with an MDC-based Angular Material table footer cell. */
export declare class MatFooterCellHarness extends _MatCellHarnessBase {
    /** The selector for the host element of a `MatFooterCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table footer cell with specific
     * attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: CellHarnessFilters): HarnessPredicate<MatFooterCellHarness>;
}

/** Harness for interacting with an MDC-based Angular Material table footer row. */
export declare class MatFooterRowHarness extends _MatRowHarnessBase<typeof MatFooterCellHarness, MatFooterCellHarness> {
    /** The selector for the host element of a `MatFooterRowHarness` instance. */
    static hostSelector: string;
    protected _cellHarness: typeof MatFooterCellHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table footer row cell with specific
     * attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatFooterRowHarness>(this: ComponentHarnessConstructor<T>, options?: RowHarnessFilters): HarnessPredicate<T>;
}

/** Harness for interacting with an MDC-based Angular Material table header cell. */
export declare class MatHeaderCellHarness extends _MatCellHarnessBase {
    /** The selector for the host element of a `MatHeaderCellHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table header cell with specific
     * attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: CellHarnessFilters): HarnessPredicate<MatHeaderCellHarness>;
}

/** Harness for interacting with an MDC-based Angular Material table header row. */
export declare class MatHeaderRowHarness extends _MatRowHarnessBase<typeof MatHeaderCellHarness, MatHeaderCellHarness> {
    /** The selector for the host element of a `MatHeaderRowHarness` instance. */
    static hostSelector: string;
    protected _cellHarness: typeof MatHeaderCellHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table header row with specific
     * attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatHeaderRowHarness>(this: ComponentHarnessConstructor<T>, options?: RowHarnessFilters): HarnessPredicate<T>;
}

/** Harness for interacting with an MDC-based Angular Material table row. */
export declare class MatRowHarness extends _MatRowHarnessBase<typeof MatCellHarness, MatCellHarness> {
    /** The selector for the host element of a `MatRowHarness` instance. */
    static hostSelector: string;
    protected _cellHarness: typeof MatCellHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatRowHarness>(this: ComponentHarnessConstructor<T>, options?: RowHarnessFilters): HarnessPredicate<T>;
}

export declare abstract class _MatRowHarnessBase<CellType extends ComponentHarnessConstructor<Cell> & {
    with: (options?: CellHarnessFilters) => HarnessPredicate<Cell>;
}, Cell extends _MatCellHarnessBase> extends ComponentHarness {
    protected abstract _cellHarness: CellType;
    /** Gets a list of `MatCellHarness` for all cells in the row. */
    getCells(filter?: CellHarnessFilters): Promise<Cell[]>;
    /** Gets the text of the cells in the row. */
    getCellTextByIndex(filter?: CellHarnessFilters): Promise<string[]>;
    /** Gets the text inside the row organized by columns. */
    getCellTextByColumnName(): Promise<MatRowHarnessColumnsText>;
}

/** Text extracted from a table row organized by columns. */
export declare interface MatRowHarnessColumnsText {
    [columnName: string]: string;
}

/** Harness for interacting with an MDC-based mat-table in tests. */
export declare class MatTableHarness extends _MatTableHarnessBase<typeof MatHeaderRowHarness, MatHeaderRowHarness, typeof MatRowHarness, MatRowHarness, typeof MatFooterRowHarness, MatFooterRowHarness> {
    /** The selector for the host element of a `MatTableHarness` instance. */
    static hostSelector: string;
    protected _headerRowHarness: typeof MatHeaderRowHarness;
    protected _rowHarness: typeof MatRowHarness;
    protected _footerRowHarness: typeof MatFooterRowHarness;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatTableHarness>(this: ComponentHarnessConstructor<T>, options?: TableHarnessFilters): HarnessPredicate<T>;
}

export declare abstract class _MatTableHarnessBase<HeaderRowType extends ComponentHarnessConstructor<HeaderRow> & {
    with: (options?: RowHarnessFilters) => HarnessPredicate<HeaderRow>;
}, HeaderRow extends RowBase, RowType extends ComponentHarnessConstructor<Row> & {
    with: (options?: RowHarnessFilters) => HarnessPredicate<Row>;
}, Row extends RowBase, FooterRowType extends ComponentHarnessConstructor<FooterRow> & {
    with: (options?: RowHarnessFilters) => HarnessPredicate<FooterRow>;
}, FooterRow extends RowBase> extends ContentContainerComponentHarness<string> {
    protected abstract _headerRowHarness: HeaderRowType;
    protected abstract _rowHarness: RowType;
    protected abstract _footerRowHarness: FooterRowType;
    /** Gets all of the header rows in a table. */
    getHeaderRows(filter?: RowHarnessFilters): Promise<HeaderRow[]>;
    /** Gets all of the regular data rows in a table. */
    getRows(filter?: RowHarnessFilters): Promise<Row[]>;
    /** Gets all of the footer rows in a table. */
    getFooterRows(filter?: RowHarnessFilters): Promise<FooterRow[]>;
    /** Gets the text inside the entire table organized by rows. */
    getCellTextByIndex(): Promise<string[][]>;
    /** Gets the text inside the entire table organized by columns. */
    getCellTextByColumnName(): Promise<MatTableHarnessColumnsText>;
}

/** Text extracted from a table organized by columns. */
export declare interface MatTableHarnessColumnsText {
    [columnName: string]: {
        text: string[];
        headerText: string[];
        footerText: string[];
    };
}

declare interface RowBase extends ComponentHarness {
    getCellTextByColumnName(): Promise<MatRowHarnessColumnsText>;
    getCellTextByIndex(): Promise<string[]>;
}

/** A set of criteria that can be used to filter a list of row harness instances. */
export declare interface RowHarnessFilters extends BaseHarnessFilters {
}

/** A set of criteria that can be used to filter a list of table harness instances. */
export declare interface TableHarnessFilters extends BaseHarnessFilters {
}

export { }
