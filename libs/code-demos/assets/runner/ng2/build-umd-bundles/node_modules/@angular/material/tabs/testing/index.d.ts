import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

/** Harness for interacting with an MDC-based mat-tab-group in tests. */
export declare class MatTabGroupHarness extends ComponentHarness {
    /** The selector for the host element of a `MatTabGroup` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tab group with specific attributes.
     * @param options Options for filtering which tab group instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatTabGroupHarness>(this: ComponentHarnessConstructor<T>, options?: TabGroupHarnessFilters): HarnessPredicate<T>;
    /**
     * Gets the list of tabs in the tab group.
     * @param filter Optionally filters which tabs are included.
     */
    getTabs(filter?: TabHarnessFilters): Promise<MatTabHarness[]>;
    /** Gets the selected tab of the tab group. */
    getSelectedTab(): Promise<MatTabHarness>;
    /**
     * Selects a tab in this tab group.
     * @param filter An optional filter to apply to the child tabs. The first tab matching the filter
     *     will be selected.
     */
    selectTab(filter?: TabHarnessFilters): Promise<void>;
}

/** Harness for interacting with an MDC_based Angular Material tab in tests. */
export declare class MatTabHarness extends ContentContainerComponentHarness<string> {
    /** The selector for the host element of a `MatTab` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tab with specific attributes.
     * @param options Options for filtering which tab instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatTabHarness>(this: ComponentHarnessConstructor<T>, options?: TabHarnessFilters): HarnessPredicate<T>;
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

/** Harness for interacting with an MDC-based Angular Material tab link in tests. */
export declare class MatTabLinkHarness extends ComponentHarness {
    /** The selector for the host element of a `MatTabLink` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tab link with specific attributes.
     * @param options Options for filtering which tab link instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatTabLinkHarness>(this: ComponentHarnessConstructor<T>, options?: TabLinkHarnessFilters): HarnessPredicate<T>;
    /** Gets the label of the link. */
    getLabel(): Promise<string>;
    /** Whether the link is active. */
    isActive(): Promise<boolean>;
    /** Whether the link is disabled. */
    isDisabled(): Promise<boolean>;
    /** Clicks on the link. */
    click(): Promise<void>;
}

/** Harness for interacting with an MDC-based mat-tab-nav-bar in tests. */
export declare class MatTabNavBarHarness extends ComponentHarness {
    /** The selector for the host element of a `MatTabNavBar` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tab nav bar with specific
     * attributes.
     * @param options Options for filtering which tab nav bar instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatTabNavBarHarness>(this: ComponentHarnessConstructor<T>, options?: TabNavBarHarnessFilters): HarnessPredicate<T>;
    /**
     * Gets the list of links in the nav bar.
     * @param filter Optionally filters which links are included.
     */
    getLinks(filter?: TabLinkHarnessFilters): Promise<MatTabLinkHarness[]>;
    /** Gets the active link in the nav bar. */
    getActiveLink(): Promise<MatTabLinkHarness>;
    /**
     * Clicks a link inside the nav bar.
     * @param filter An optional filter to apply to the child link. The first link matching the filter
     *     will be clicked.
     */
    clickLink(filter?: TabLinkHarnessFilters): Promise<void>;
    /** Gets the panel associated with the nav bar. */
    getPanel(): Promise<MatTabNavPanelHarness>;
}

/** Harness for interacting with a standard mat-tab-nav-panel in tests. */
declare class MatTabNavPanelHarness extends ContentContainerComponentHarness {
    /** The selector for the host element of a `MatTabNavPanel` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tab nav panel with specific
     * attributes.
     * @param options Options for filtering which tab nav panel instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatTabNavPanelHarness>(this: ComponentHarnessConstructor<T>, options?: TabNavPanelHarnessFilters): HarnessPredicate<T>;
    /** Gets the tab panel text content. */
    getTextContent(): Promise<string>;
}

/** A set of criteria that can be used to filter a list of `MatRadioButtonHarness` instances. */
export declare interface TabGroupHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose selected tab label matches the given value. */
    selectedTabLabel?: string | RegExp;
}

/** A set of criteria that can be used to filter a list of `MatRadioButtonHarness` instances. */
export declare interface TabHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose label matches the given value. */
    label?: string | RegExp;
}

/** A set of criteria that can be used to filter a list of `MatTabLinkHarness` instances. */
export declare interface TabLinkHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose label matches the given value. */
    label?: string | RegExp;
}

/** A set of criteria that can be used to filter a list of `MatTabNavBarHarness` instances. */
export declare interface TabNavBarHarnessFilters extends BaseHarnessFilters {
}

/** A set of criteria that can be used to filter a list of `MatTabNavBarHarness` instances. */
export declare interface TabNavPanelHarnessFilters extends BaseHarnessFilters {
}

export { }
