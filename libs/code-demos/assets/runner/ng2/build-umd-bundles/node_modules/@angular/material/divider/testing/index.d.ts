import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

export declare interface DividerHarnessFilters extends BaseHarnessFilters {
}

/** Harness for interacting with a `mat-divider`. */
export declare class MatDividerHarness extends ComponentHarness {
    static hostSelector: string;
    static with(options?: DividerHarnessFilters): HarnessPredicate<MatDividerHarness>;
    getOrientation(): Promise<'horizontal' | 'vertical'>;
    isInset(): Promise<boolean>;
}

export { }
