import { __awaiter } from 'tslib';
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { coerceNumberProperty } from '@angular/cdk/coercion';

/** Harness for interacting with a thumb inside of a Material slider in tests. */
class MatSliderThumbHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slider thumb with specific attributes.
     * @param options Options for filtering which thumb instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('position', options.position, (harness, value) => __awaiter(this, void 0, void 0, function* () {
            return (yield harness.getPosition()) === value;
        }));
    }
    /** Gets the position of the thumb inside the slider. */
    getPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            // Meant to mimic MDC's logic where `matSliderThumb` is treated as END.
            const isStart = (yield (yield this.host()).getAttribute('matSliderStartThumb')) != null;
            return isStart ? 0 /* ThumbPosition.START */ : 1 /* ThumbPosition.END */;
        });
    }
    /** Gets the value of the thumb. */
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.host()).getProperty('valueAsNumber');
        });
    }
    /** Sets the value of the thumb. */
    setValue(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield this.host();
            // Since this is a range input, we can't simulate the user interacting with it so we set the
            // value directly and dispatch a couple of fake events to ensure that everything fires.
            yield input.setInputValue(newValue + '');
            yield input.dispatchEvent('input');
            yield input.dispatchEvent('change');
        });
    }
    /** Gets the current percentage value of the slider. */
    getPercentage() {
        return __awaiter(this, void 0, void 0, function* () {
            const [value, min, max] = yield parallel(() => [
                this.getValue(),
                this.getMinValue(),
                this.getMaxValue(),
            ]);
            return (value - min) / (max - min);
        });
    }
    /** Gets the maximum value of the thumb. */
    getMaxValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return coerceNumberProperty(yield (yield this.host()).getProperty('max'));
        });
    }
    /** Gets the minimum value of the thumb. */
    getMinValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return coerceNumberProperty(yield (yield this.host()).getProperty('min'));
        });
    }
    /** Gets the text representation of the slider's value. */
    getDisplayValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-valuetext')) || '';
        });
    }
    /** Whether the thumb is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getProperty('disabled');
        });
    }
    /** Gets the name of the thumb. */
    getName() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.host()).getProperty('name');
        });
    }
    /** Gets the id of the thumb. */
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.host()).getProperty('id');
        });
    }
    /**
     * Focuses the thumb and returns a promise that indicates when the
     * action is complete.
     */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /**
     * Blurs the thumb and returns a promise that indicates when the
     * action is complete.
     */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the thumb is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
}
MatSliderThumbHarness.hostSelector = 'input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]';

/** Harness for interacting with a MDC mat-slider in tests. */
class MatSliderHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slider with specific attributes.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('isRange', options.isRange, (harness, value) => __awaiter(this, void 0, void 0, function* () {
            return (yield harness.isRange()) === value;
        }));
    }
    /** Gets the start thumb of the slider (only applicable for range sliders). */
    getStartThumb() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isRange())) {
                throw Error('`getStartThumb` is only applicable for range sliders. ' +
                    'Did you mean to use `getEndThumb`?');
            }
            return this.locatorFor(MatSliderThumbHarness.with({ position: 0 /* ThumbPosition.START */ }))();
        });
    }
    /** Gets the thumb (for single point sliders), or the end thumb (for range sliders). */
    getEndThumb() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorFor(MatSliderThumbHarness.with({ position: 1 /* ThumbPosition.END */ }))();
        });
    }
    /** Gets whether the slider is a range slider. */
    isRange() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.host()).hasClass('mdc-slider--range');
        });
    }
    /** Gets whether the slider is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.host()).hasClass('mdc-slider--disabled');
        });
    }
    /** Gets the value step increments of the slider. */
    getStep() {
        return __awaiter(this, void 0, void 0, function* () {
            // The same step value is forwarded to both thumbs.
            const startHost = yield (yield this.getEndThumb()).host();
            return coerceNumberProperty(yield startHost.getProperty('step'));
        });
    }
    /** Gets the maximum value of the slider. */
    getMaxValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getEndThumb()).getMaxValue();
        });
    }
    /** Gets the minimum value of the slider. */
    getMinValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const startThumb = (yield this.isRange())
                ? yield this.getStartThumb()
                : yield this.getEndThumb();
            return startThumb.getMinValue();
        });
    }
}
MatSliderHarness.hostSelector = '.mat-mdc-slider';

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

export { MatSliderHarness, MatSliderThumbHarness };
//# sourceMappingURL=testing.mjs.map
