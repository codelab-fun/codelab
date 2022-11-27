import { __awaiter } from 'tslib';
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

class _MatSlideToggleHarnessBase extends ComponentHarness {
    constructor() {
        super(...arguments);
        this._label = this.locatorFor('label');
    }
    /** Whether the slide-toggle is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const disabled = (yield this._nativeElement()).getAttribute('disabled');
            return coerceBooleanProperty(yield disabled);
        });
    }
    /** Whether the slide-toggle is required. */
    isRequired() {
        return __awaiter(this, void 0, void 0, function* () {
            const required = (yield this._nativeElement()).getAttribute('required');
            return coerceBooleanProperty(yield required);
        });
    }
    /** Whether the slide-toggle is valid. */
    isValid() {
        return __awaiter(this, void 0, void 0, function* () {
            const invalid = (yield this.host()).hasClass('ng-invalid');
            return !(yield invalid);
        });
    }
    /** Gets the slide-toggle's name. */
    getName() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._nativeElement()).getAttribute('name');
        });
    }
    /** Gets the slide-toggle's aria-label. */
    getAriaLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._nativeElement()).getAttribute('aria-label');
        });
    }
    /** Gets the slide-toggle's aria-labelledby. */
    getAriaLabelledby() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._nativeElement()).getAttribute('aria-labelledby');
        });
    }
    /** Gets the slide-toggle's label text. */
    getLabelText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._label()).text();
        });
    }
    /** Focuses the slide-toggle. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._nativeElement()).focus();
        });
    }
    /** Blurs the slide-toggle. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._nativeElement()).blur();
        });
    }
    /** Whether the slide-toggle is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._nativeElement()).isFocused();
        });
    }
    /**
     * Puts the slide-toggle in a checked state by toggling it if it is currently unchecked, or doing
     * nothing if it is already checked.
     */
    check() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isChecked())) {
                yield this.toggle();
            }
        });
    }
    /**
     * Puts the slide-toggle in an unchecked state by toggling it if it is currently checked, or doing
     * nothing if it is already unchecked.
     */
    uncheck() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isChecked()) {
                yield this.toggle();
            }
        });
    }
}
/** Harness for interacting with a MDC-based mat-slide-toggle in tests. */
class MatSlideToggleHarness extends _MatSlideToggleHarnessBase {
    constructor() {
        super(...arguments);
        this._nativeElement = this.locatorFor('button');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slide-toggle w/ specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a slide-toggle whose host element matches the given selector.
     *   - `label` finds a slide-toggle with specific label text.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return (new HarnessPredicate(this, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabelText(), label))
            // We want to provide a filter option for "name" because the name of the slide-toggle is
            // only set on the underlying input. This means that it's not possible for developers
            // to retrieve the harness of a specific checkbox with name through a CSS selector.
            .addOption('name', options.name, (harness, name) => __awaiter(this, void 0, void 0, function* () { return (yield harness.getName()) === name; }))
            .addOption('checked', options.checked, (harness, checked) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isChecked()) == checked; }))
            .addOption('disabled', options.disabled, (harness, disabled) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isDisabled()) == disabled; })));
    }
    toggle() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._nativeElement()).click();
        });
    }
    isRequired() {
        return __awaiter(this, void 0, void 0, function* () {
            const ariaRequired = yield (yield this._nativeElement()).getAttribute('aria-required');
            return ariaRequired === 'true';
        });
    }
    isChecked() {
        return __awaiter(this, void 0, void 0, function* () {
            const checked = (yield this._nativeElement()).getAttribute('aria-checked');
            return coerceBooleanProperty(yield checked);
        });
    }
}
MatSlideToggleHarness.hostSelector = '.mat-mdc-slide-toggle';

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

export { MatSlideToggleHarness, _MatSlideToggleHarnessBase };
//# sourceMappingURL=testing.mjs.map
