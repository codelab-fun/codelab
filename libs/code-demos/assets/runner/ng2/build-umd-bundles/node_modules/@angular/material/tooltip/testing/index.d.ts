import { AsyncFactoryFn } from '@angular/cdk/testing';
import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { TestElement } from '@angular/cdk/testing';

/** Harness for interacting with a standard mat-tooltip in tests. */
export declare class MatTooltipHarness extends _MatTooltipHarnessBase {
    protected _optionalPanel: AsyncFactoryFn<TestElement | null>;
    static hostSelector: string;
    protected _hiddenClass: string;
    protected _showAnimationName: string;
    protected _hideAnimationName: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tooltip trigger with specific
     * attributes.
     * @param options Options for narrowing the search.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatTooltipHarness>(this: ComponentHarnessConstructor<T>, options?: TooltipHarnessFilters): HarnessPredicate<T>;
}

export declare abstract class _MatTooltipHarnessBase extends ComponentHarness {
    protected abstract _optionalPanel: AsyncFactoryFn<TestElement | null>;
    protected abstract _hiddenClass: string;
    protected abstract _showAnimationName: string;
    protected abstract _hideAnimationName: string;
    /** Shows the tooltip. */
    show(): Promise<void>;
    /** Hides the tooltip. */
    hide(): Promise<void>;
    /** Gets whether the tooltip is open. */
    isOpen(): Promise<boolean>;
    /** Gets a promise for the tooltip panel's text. */
    getTooltipText(): Promise<string>;
}

/** A set of criteria that can be used to filter a list of `MatTooltipHarness` instances. */
export declare interface TooltipHarnessFilters extends BaseHarnessFilters {
}

export { }
