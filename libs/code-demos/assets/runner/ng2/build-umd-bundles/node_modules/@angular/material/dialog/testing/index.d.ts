import { AsyncFactoryFn } from '@angular/cdk/testing';
import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { ComponentType } from '@angular/cdk/overlay';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { DialogRole } from '@angular/material/dialog';
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatDialog } from '@angular/material/dialog';
import { _MatDialogBase } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialogContainer } from '@angular/material/dialog';
import { _MatDialogContainerBase } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { OnDestroy } from '@angular/core';
import { TestElement } from '@angular/cdk/testing';

/** A set of criteria that can be used to filter a list of `MatDialogHarness` instances. */
export declare interface DialogHarnessFilters extends BaseHarnessFilters {
}

/** Harness for interacting with a standard `MatDialog` in tests. */
export declare class MatDialogHarness extends _MatDialogHarnessBase {
    /** The selector for the host element of a `MatDialog` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a dialog with specific attributes.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatDialogHarness>(this: ComponentHarnessConstructor<T>, options?: DialogHarnessFilters): HarnessPredicate<T>;
}

/** Base class for the `MatDialogHarness` implementation. */
export declare class _MatDialogHarnessBase extends ContentContainerComponentHarness<MatDialogSection | string> {
    protected _title: AsyncFactoryFn<TestElement | null>;
    protected _content: AsyncFactoryFn<TestElement | null>;
    protected _actions: AsyncFactoryFn<TestElement | null>;
    /** Gets the id of the dialog. */
    getId(): Promise<string | null>;
    /** Gets the role of the dialog. */
    getRole(): Promise<DialogRole | null>;
    /** Gets the value of the dialog's "aria-label" attribute. */
    getAriaLabel(): Promise<string | null>;
    /** Gets the value of the dialog's "aria-labelledby" attribute. */
    getAriaLabelledby(): Promise<string | null>;
    /** Gets the value of the dialog's "aria-describedby" attribute. */
    getAriaDescribedby(): Promise<string | null>;
    /**
     * Closes the dialog by pressing escape.
     *
     * Note: this method does nothing if `disableClose` has been set to `true` for the dialog.
     */
    close(): Promise<void>;
    /** Gets te dialog's text. */
    getText(): Promise<string>;
    /** Gets the dialog's title text. This only works if the dialog is using mat-dialog-title. */
    getTitleText(): Promise<string>;
    /** Gets the dialog's content text. This only works if the dialog is using mat-dialog-content. */
    getContentText(): Promise<string>;
    /** Gets the dialog's actions text. This only works if the dialog is using mat-dialog-actions. */
    getActionsText(): Promise<string>;
}

/** Selectors for different sections of the mat-dialog that can contain user content. */
export declare const enum MatDialogSection {
    TITLE = ".mat-mdc-dialog-title",
    CONTENT = ".mat-mdc-dialog-content",
    ACTIONS = ".mat-mdc-dialog-actions"
}

/** Test component that immediately opens a dialog when bootstrapped. */
export declare class MatTestDialogOpener<T = unknown, R = unknown> extends _MatTestDialogOpenerBase<MatDialogContainer, T, R> {
    constructor(dialog: MatDialog);
    /** Static method that prepares this class to open the provided component. */
    static withComponent<T = unknown, R = unknown>(component: ComponentType<T>, config?: MatDialogConfig): ComponentType<MatTestDialogOpener<T, R>>;
}

/** Base class for a component that immediately opens a dialog when created. */
export declare class _MatTestDialogOpenerBase<C extends _MatDialogContainerBase, T, R> implements OnDestroy {
    dialog: _MatDialogBase<C>;
    /** Component that should be opened with the MatDialog `open` method. */
    protected static component: ComponentType<unknown> | undefined;
    /** Config that should be provided to the MatDialog `open` method. */
    protected static config: MatDialogConfig | undefined;
    /** MatDialogRef returned from the MatDialog `open` method. */
    dialogRef: MatDialogRef<T, R>;
    /** Data passed to the `MatDialog` close method. */
    closedResult: R | undefined;
    private readonly _afterClosedSubscription;
    constructor(dialog: _MatDialogBase<C>);
    ngOnDestroy(): void;
}

export declare class MatTestDialogOpenerModule {
}

export { }
