import { AsyncFactoryFn } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { PaginatorHarnessFilters as LegacyPaginatorHarnessFilters } from '@angular/material/paginator/testing';
import { _MatPaginatorHarnessBase as _MatLegacyPaginatorHarnessBase } from '@angular/material/paginator/testing';
import { MatLegacySelectHarness } from '@angular/material/legacy-select/testing';
import { TestElement } from '@angular/cdk/testing';

export { LegacyPaginatorHarnessFilters }

/**
 * Harness for interacting with a standard mat-paginator in tests.
 * @deprecated Use `MatPaginatorHarness` from `@angular/material/paginator/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyPaginatorHarness extends _MatLegacyPaginatorHarnessBase {
    /** Selector used to find paginator instances. */
    static hostSelector: string;
    protected _nextButton: AsyncFactoryFn<TestElement>;
    protected _previousButton: AsyncFactoryFn<TestElement>;
    protected _firstPageButton: AsyncFactoryFn<TestElement | null>;
    protected _lastPageButton: AsyncFactoryFn<TestElement | null>;
    protected _select: AsyncFactoryFn<MatLegacySelectHarness | null>;
    protected _pageSizeFallback: AsyncFactoryFn<TestElement>;
    protected _rangeLabel: AsyncFactoryFn<TestElement>;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatPaginatorHarness` that meets
     * certain criteria.
     * @param options Options for filtering which paginator instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyPaginatorHarnessFilters): HarnessPredicate<MatLegacyPaginatorHarness>;
}

export { _MatLegacyPaginatorHarnessBase }

export { }
