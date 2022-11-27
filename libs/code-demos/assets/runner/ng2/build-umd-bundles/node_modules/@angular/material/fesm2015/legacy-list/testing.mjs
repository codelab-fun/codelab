import { __awaiter } from 'tslib';
import { HarnessPredicate, ComponentHarness, ContentContainerComponentHarness, parallel } from '@angular/cdk/testing';
import { MatDividerHarness } from '@angular/material/divider/testing';

const iconSelector = '.mat-list-icon';
const avatarSelector = '.mat-list-avatar';
/**
 * Gets a `HarnessPredicate` that applies the given `BaseListItemHarnessFilters` to the given
 * list item harness.
 * @template H The type of list item harness to create a predicate for.
 * @param harnessType A constructor for a list item harness.
 * @param options An instance of `BaseListItemHarnessFilters` to apply.
 * @return A `HarnessPredicate` for the given harness type with the given options applied.
 * @deprecated Use `getListItemPredicate` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
function getListItemPredicate(harnessType, options) {
    return new HarnessPredicate(harnessType, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
}
/**
 * Harness for interacting with a list subheader.
 * @deprecated Use `MatSubheaderHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacySubheaderHarness extends ComponentHarness {
    static with(options = {}) {
        return new HarnessPredicate(MatLegacySubheaderHarness, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
    }
    /** Gets the full text content of the list item (including text from any font icons). */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text();
        });
    }
}
MatLegacySubheaderHarness.hostSelector = '.mat-subheader';
/**
 * Shared behavior among the harnesses for the various `MatListItem` flavors.
 * @docs-private
 * @deprecated Use `class` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyListItemHarnessBase extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._lines = this.locatorForAll('.mat-line');
        this._avatar = this.locatorForOptional(avatarSelector);
        this._icon = this.locatorForOptional(iconSelector);
    }
    /** Gets the full text content of the list item. */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text({ exclude: `${iconSelector}, ${avatarSelector}` });
        });
    }
    /** Gets the lines of text (`mat-line` elements) in this nav list item. */
    getLinesText() {
        return __awaiter(this, void 0, void 0, function* () {
            const lines = yield this._lines();
            return parallel(() => lines.map(l => l.text()));
        });
    }
    /** Whether this list item has an avatar. */
    hasAvatar() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this._avatar());
        });
    }
    /** Whether this list item has an icon. */
    hasIcon() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this._icon());
        });
    }
    /** Whether this list option is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mat-list-item-disabled');
        });
    }
}

/**
 * Shared behavior among the harnesses for the various `MatList` flavors.
 * @template T A constructor type for a list item harness type used by this list harness.
 * @template C The list item harness type that `T` constructs.
 * @template F The filter type used filter list item harness of type `C`.
 * @docs-private
 * @deprecated Use `class` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyListHarnessBase extends ComponentHarness {
    /**
     * Gets a list of harnesses representing the items in this list.
     * @param filters Optional filters used to narrow which harnesses are included
     * @return The list of items matching the given filters.
     */
    getItems(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(this._itemHarness.with(filters))();
        });
    }
    /**
     * Gets a list of `ListSection` representing the list items grouped by subheaders. If the list has
     * no subheaders it is represented as a single `ListSection` with an undefined `heading` property.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sections by subheader.
     */
    getItemsGroupedBySubheader(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const listSections = [];
            let currentSection = { items: [] };
            const itemsAndSubheaders = yield this.getItemsWithSubheadersAndDividers({
                item: filters,
                divider: false,
            });
            for (const itemOrSubheader of itemsAndSubheaders) {
                if (itemOrSubheader instanceof MatLegacySubheaderHarness) {
                    if (currentSection.heading !== undefined || currentSection.items.length) {
                        listSections.push(currentSection);
                    }
                    currentSection = { heading: itemOrSubheader.getText(), items: [] };
                }
                else {
                    currentSection.items.push(itemOrSubheader);
                }
            }
            if (currentSection.heading !== undefined ||
                currentSection.items.length ||
                !listSections.length) {
                listSections.push(currentSection);
            }
            // Concurrently wait for all sections to resolve their heading if present.
            return parallel(() => listSections.map((s) => __awaiter(this, void 0, void 0, function* () { return ({ items: s.items, heading: yield s.heading }); })));
        });
    }
    /**
     * Gets a list of sub-lists representing the list items grouped by dividers. If the list has no
     * dividers it is represented as a list with a single sub-list.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sub-lists by divider.
     */
    getItemsGroupedByDividers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const listSections = [[]];
            const itemsAndDividers = yield this.getItemsWithSubheadersAndDividers({
                item: filters,
                subheader: false,
            });
            for (const itemOrDivider of itemsAndDividers) {
                if (itemOrDivider instanceof MatDividerHarness) {
                    listSections.push([]);
                }
                else {
                    listSections[listSections.length - 1].push(itemOrDivider);
                }
            }
            return listSections;
        });
    }
    getItemsWithSubheadersAndDividers(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = [];
            if (filters.item !== false) {
                query.push(this._itemHarness.with(filters.item || {}));
            }
            if (filters.subheader !== false) {
                query.push(MatLegacySubheaderHarness.with(filters.subheader));
            }
            if (filters.divider !== false) {
                query.push(MatDividerHarness.with(filters.divider));
            }
            return this.locatorForAll(...query)();
        });
    }
}

/**
 * Harness for interacting with a standard mat-action-list in tests.
 * @deprecated Use `MatActionListHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyActionListHarness extends MatLegacyListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatLegacyActionListItemHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatActionListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which action list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyActionListHarness, options);
    }
}
/** The selector for the host element of a `MatActionList` instance. */
MatLegacyActionListHarness.hostSelector = 'mat-action-list.mat-list';
/**
 * Harness for interacting with an action list item.
 * @deprecated Use `MatActionListItemHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyActionListItemHarness extends MatLegacyListItemHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatActionListItemHarness` that
     * meets certain criteria.
     * @param options Options for filtering which action list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(MatLegacyActionListItemHarness, options);
    }
    /** Clicks on the action list item. */
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).click();
        });
    }
    /** Focuses the action list item. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /** Blurs the action list item. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the action list item is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
}
/** The selector for the host element of a `MatListItem` instance. */
MatLegacyActionListItemHarness.hostSelector = `${MatLegacyActionListHarness.hostSelector} .mat-list-item`;

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Harness for interacting with a standard mat-list in tests.
 * @deprecated Use `MatListHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyListHarness extends MatLegacyListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatLegacyListItemHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatListHarness` that meets certain
     * criteria.
     * @param options Options for filtering which list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyListHarness, options);
    }
}
/** The selector for the host element of a `MatList` instance. */
MatLegacyListHarness.hostSelector = '.mat-list:not(mat-action-list)';
/**
 * Harness for interacting with a list item.
 * @deprecated Use `MatListItemHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyListItemHarness extends MatLegacyListItemHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatListItemHarness` that meets
     * certain criteria.
     * @param options Options for filtering which list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(MatLegacyListItemHarness, options);
    }
}
/** The selector for the host element of a `MatListItem` instance. */
MatLegacyListItemHarness.hostSelector = `${MatLegacyListHarness.hostSelector} .mat-list-item`;

/**
 * Harness for interacting with a standard mat-nav-list in tests.
 * @deprecated Use `MatNavListHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyNavListHarness extends MatLegacyListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatLegacyNavListItemHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatNavListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which nav list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyNavListHarness, options);
    }
}
/** The selector for the host element of a `MatNavList` instance. */
MatLegacyNavListHarness.hostSelector = '.mat-nav-list';
/**
 * Harness for interacting with a nav list item.
 * @deprecated Use `MatNavListItemHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyNavListItemHarness extends MatLegacyListItemHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatNavListItemHarness` that
     * meets certain criteria.
     * @param options Options for filtering which nav list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(MatLegacyNavListItemHarness, options).addOption('href', options.href, (harness, href) => __awaiter(this, void 0, void 0, function* () { return HarnessPredicate.stringMatches(harness.getHref(), href); }));
    }
    /** Gets the href for this nav list item. */
    getHref() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getAttribute('href');
        });
    }
    /** Clicks on the nav list item. */
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).click();
        });
    }
    /** Focuses the nav list item. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /** Blurs the nav list item. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the nav list item is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
}
/** The selector for the host element of a `MatListItem` instance. */
MatLegacyNavListItemHarness.hostSelector = `${MatLegacyNavListHarness.hostSelector} .mat-list-item`;

/**
 * Harness for interacting with a standard mat-selection-list in tests.
 * @deprecated Use `MatSelectionListHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacySelectionListHarness extends MatLegacyListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatLegacyListOptionHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSelectionListHarness` that meets
     * certain criteria.
     * @param options Options for filtering which selection list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacySelectionListHarness, options);
    }
    /** Whether the selection list is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-disabled')) === 'true';
        });
    }
    /**
     * Selects all items matching any of the given filters.
     * @param filters Filters that specify which items should be selected.
     */
    selectItems(...filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this._getItems(filters);
            yield parallel(() => items.map(item => item.select()));
        });
    }
    /**
     * Deselects all items matching any of the given filters.
     * @param filters Filters that specify which items should be deselected.
     */
    deselectItems(...filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this._getItems(filters);
            yield parallel(() => items.map(item => item.deselect()));
        });
    }
    /** Gets all items matching the given list of filters. */
    _getItems(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filters.length) {
                return this.getItems();
            }
            const matches = yield parallel(() => {
                return filters.map(filter => this.locatorForAll(MatLegacyListOptionHarness.with(filter))());
            });
            return matches.reduce((result, current) => [...result, ...current], []);
        });
    }
}
/** The selector for the host element of a `MatSelectionList` instance. */
MatLegacySelectionListHarness.hostSelector = '.mat-selection-list';
/**
 * Harness for interacting with a list option.
 * @deprecated Use `MatListOptionHarness` from `@angular/material/list/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyListOptionHarness extends MatLegacyListItemHarnessBase {
    constructor() {
        super(...arguments);
        this._itemContent = this.locatorFor('.mat-list-item-content');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatListOptionHarness` that
     * meets certain criteria.
     * @param options Options for filtering which list option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(MatLegacyListOptionHarness, options).addOption('is selected', options.selected, (harness, selected) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isSelected()) === selected; }));
    }
    /** Gets the position of the checkbox relative to the list option content. */
    getCheckboxPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this._itemContent()).hasClass('mat-list-item-content-reverse'))
                ? 'after'
                : 'before';
        });
    }
    /** Whether the list option is selected. */
    isSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-selected')) === 'true';
        });
    }
    /** Focuses the list option. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /** Blurs the list option. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the list option is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
    /** Toggles the checked state of the checkbox. */
    toggle() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).click();
        });
    }
    /**
     * Puts the list option in a checked state by toggling it if it is currently unchecked, or doing
     * nothing if it is already checked.
     */
    select() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isSelected())) {
                return this.toggle();
            }
        });
    }
    /**
     * Puts the list option in an unchecked state by toggling it if it is currently checked, or doing
     * nothing if it is already unchecked.
     */
    deselect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isSelected()) {
                return this.toggle();
            }
        });
    }
}
/** The selector for the host element of a `MatListOption` instance. */
MatLegacyListOptionHarness.hostSelector = '.mat-list-option';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { MatLegacyActionListHarness, MatLegacyActionListItemHarness, MatLegacyListHarness, MatLegacyListItemHarness, MatLegacyListOptionHarness, MatLegacyNavListHarness, MatLegacyNavListItemHarness, MatLegacySelectionListHarness };
//# sourceMappingURL=testing.mjs.map
