import { AsyncFactoryFn } from '@angular/cdk/testing';
import { ComponentType } from '@angular/cdk/overlay';
import { HarnessPredicate } from '@angular/cdk/testing';
import { DialogHarnessFilters as LegacyDialogHarnessFilters } from '@angular/material/dialog/testing';
import { _MatDialogHarnessBase } from '@angular/material/dialog/testing';
import { MatLegacyDialog } from '@angular/material/legacy-dialog';
import { MatLegacyDialogConfig } from '@angular/material/legacy-dialog';
import { MatLegacyDialogContainer } from '@angular/material/legacy-dialog';
import { _MatTestDialogOpenerBase } from '@angular/material/dialog/testing';
import { TestElement } from '@angular/cdk/testing';

export { LegacyDialogHarnessFilters }

/**
 * Harness for interacting with a standard `MatDialog` in tests.
 * @deprecated Use `MatDialogHarness` from `@angular/material/dialog/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyDialogHarness extends _MatDialogHarnessBase {
    /** The selector for the host element of a `MatDialog` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatDialogHarness` that meets
     * certain criteria.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyDialogHarnessFilters): HarnessPredicate<MatLegacyDialogHarness>;
    protected _title: AsyncFactoryFn<TestElement | null>;
    protected _content: AsyncFactoryFn<TestElement | null>;
    protected _actions: AsyncFactoryFn<TestElement | null>;
}

/**
 * Selectors for different sections of the mat-dialog that can contain user content.
 * @deprecated Use `enum` from `@angular/material/dialog/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare const enum MatLegacyDialogSection {
    TITLE = ".mat-dialog-title",
    CONTENT = ".mat-dialog-content",
    ACTIONS = ".mat-dialog-actions"
}

/**
 * Test component that immediately opens a dialog when created.
 * @deprecated Use `MatTestDialogOpener` from `@angular/material/dialog/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatTestLegacyDialogOpener<T = unknown, R = unknown> extends _MatTestDialogOpenerBase<MatLegacyDialogContainer, T, R> {
    constructor(dialog: MatLegacyDialog);
    /** Static method that prepares this class to open the provided component. */
    static withComponent<T = unknown, R = unknown>(component: ComponentType<T>, config?: MatLegacyDialogConfig): ComponentType<MatTestLegacyDialogOpener<T, R>>;
}

/**
 * @deprecated Use `MatTestDialogOpenerModule` from `@angular/material/dialog/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatTestLegacyDialogOpenerModule {
}

export { }
