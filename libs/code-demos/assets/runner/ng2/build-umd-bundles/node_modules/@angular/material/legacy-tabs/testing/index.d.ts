import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

/**
 * A set of criteria that can be used to filter a list of `MatTabGroupHarness` instances.
 * @deprecated Use `TabGroupHarnessFilters` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyTabGroupHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose selected tab label matches the given value. */
    selectedTabLabel?: string | RegExp;
}

/**
 * A set of criteria that can be used to filter a list of `MatTabHarness` instances.
 * @deprecated Use `TabHarnessFilters` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyTabHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose label matches the given value. */
    label?: string | RegExp;
}

/**
 * A set of criteria that can be used to filter a list of `MatTabLinkHarness` instances.
 * @deprecated Use `TabLinkHarnessFilters` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyTabLinkHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose label matches the given value. */
    label?: string | RegExp;
}

/**
 * A set of criteria that can be used to filter a list of `MatTabNavBarHarness` instances.
 * @deprecated Use `TabNavBarHarnessFilters` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyTabNavBarHarnessFilters extends BaseHarnessFilters {
}

/**
 * A set of criteria that can be used to filter a list of `MatTabNavBarHarness` instances.
 * @deprecated Use `TabNavPanelHarnessFilters` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare interface LegacyTabNavPanelHarnessFilters extends BaseHarnessFilters {
}

/**
 * Harness for interacting with a standard mat-tab-group in tests.
 * @deprecated Use `MatTabGroupHarness` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyTabGroupHarness extends ComponentHarness {
    /** The selector for the host element of a `MatTabGroup` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabGroupHarness` that meets
     * certain criteria.
     * @param options Options for filtering which tab group instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyTabGroupHarnessFilters): HarnessPredicate<MatLegacyTabGroupHarness>;
    /**
     * Gets the list of tabs in the tab group.
     * @param filter Optionally filters which tabs are included.
     */
    getTabs(filter?: LegacyTabHarnessFilters): Promise<MatLegacyTabHarness[]>;
    /** Gets the selected tab of the tab group. */
    getSelectedTab(): Promise<MatLegacyTabHarness>;
    /**
     * Selects a tab in this tab group.
     * @param filter An optional filter to apply to the child tabs. The first tab matching the filter
     *     will be selected.
     */
    selectTab(filter?: LegacyTabHarnessFilters): Promise<void>;
}

/**
 * Harness for interacting with a standard Angular Material tab-label in tests.
 * @deprecated Use `MatTabHarness` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyTabHarness extends ContentContainerComponentHarness<string> {
    /** The selector for the host element of a `MatTab` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabHarness` that meets
     * certain criteria.
     * @param options Options for filtering which tab instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyTabHarnessFilters): HarnessPredicate<MatLegacyTabHarness>;
    /** Gets the label of the tab. */
    getLabel(): Promise<string>;
    /** Gets the aria-label of the tab. */
    getAriaLabel(): Promise<string | null>;
    /** Gets the value of the "aria-labelledby" attribute. */
    getAriaLabelledby(): Promise<string | null>;
    /** Whether the tab is selected. */
    isSelected(): Promise<boolean>;
    /** Whether the tab is disabled. */
    isDisabled(): Promise<boolean>;
    /** Selects the given tab by clicking on the label. Tab cannot be selected if disabled. */
    select(): Promise<void>;
    /** Gets the text content of the tab. */
    getTextContent(): Promise<string>;
    protected getRootHarnessLoader(): Promise<HarnessLoader>;
    /** Gets the element id for the content of the current tab. */
    private _getContentId;
}

/**
 * Harness for interacting with a standard Angular Material tab link in tests.
 * @deprecated Use `MatTabLinkHarness` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyTabLinkHarness extends ComponentHarness {
    /** The selector for the host element of a `MatTabLink` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabLinkHarness` that meets
     * certain criteria.
     * @param options Options for filtering which tab link instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyTabLinkHarnessFilters): HarnessPredicate<MatLegacyTabLinkHarness>;
    /** Gets the label of the link. */
    getLabel(): Promise<string>;
    /** Whether the link is active. */
    isActive(): Promise<boolean>;
    /** Whether the link is disabled. */
    isDisabled(): Promise<boolean>;
    /** Clicks on the link. */
    click(): Promise<void>;
}

/**
 * Harness for interacting with a standard mat-tab-nav-bar in tests.
 * @deprecated Use `MatTabNavBarHarness` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export declare class MatLegacyTabNavBarHarness extends ComponentHarness {
    /** The selector for the host element of a `MatTabNavBar` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabNavBar` that meets
     * certain criteria.
     * @param options Options for filtering which tab nav bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyTabNavBarHarnessFilters): HarnessPredicate<MatLegacyTabNavBarHarness>;
    /**
     * Gets the list of links in the nav bar.
     * @param filter Optionally filters which links are included.
     */
    getLinks(filter?: LegacyTabLinkHarnessFilters): Promise<MatLegacyTabLinkHarness[]>;
    /** Gets the active link in the nav bar. */
    getActiveLink(): Promise<MatLegacyTabLinkHarness>;
    /**
     * Clicks a link inside the nav bar.
     * @param filter An optional filter to apply to the child link. The first link matching the filter
     *     will be clicked.
     */
    clickLink(filter?: LegacyTabLinkHarnessFilters): Promise<void>;
    /** Gets the panel associated with the nav bar. */
    getPanel(): Promise<MatLegacyTabNavPanelHarness>;
}

/**
 * Harness for interacting with a standard mat-tab-nav-panel in tests.
 * @deprecated Use `MatTabNavPanelHarness` from `@angular/material/tabs/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
declare class MatLegacyTabNavPanelHarness extends ContentContainerComponentHarness {
    /** The selector for the host element of a `MatTabNavPanel` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatTabNavPanel` that meets
     * certain criteria.
     * @param options Options for filtering which tab nav panel instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: LegacyTabNavPanelHarnessFilters): HarnessPredicate<MatLegacyTabNavPanelHarness>;
    /** Gets the tab panel text content. */
    getTextContent(): Promise<string>;
}

export { }
