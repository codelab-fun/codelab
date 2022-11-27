/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { MDCFoundation } from '@material/base/foundation';
import { MDCTextFieldAdapter } from './adapter';
import { MDCTextFieldFoundationMap } from './types';
export declare class MDCTextFieldFoundation extends MDCFoundation<MDCTextFieldAdapter> {
    static get cssClasses(): {
        DISABLED: string;
        FOCUSED: string;
        HELPER_LINE: string;
        INVALID: string;
        LABEL_FLOATING: string;
        NO_LABEL: string;
        OUTLINED: string;
        ROOT: string;
        TEXTAREA: string;
        WITH_LEADING_ICON: string;
        WITH_TRAILING_ICON: string;
        WITH_INTERNAL_COUNTER: string;
    };
    static get strings(): {
        ARIA_CONTROLS: string;
        ARIA_DESCRIBEDBY: string;
        INPUT_SELECTOR: string;
        LABEL_SELECTOR: string;
        LEADING_ICON_SELECTOR: string;
        LINE_RIPPLE_SELECTOR: string;
        OUTLINE_SELECTOR: string;
        PREFIX_SELECTOR: string;
        SUFFIX_SELECTOR: string;
        TRAILING_ICON_SELECTOR: string;
    };
    static get numbers(): {
        LABEL_SCALE: number;
    };
    private get shouldAlwaysFloat();
    get shouldFloat(): boolean;
    get shouldShake(): boolean;
    /**
     * See {@link MDCTextFieldAdapter} for typing information on parameters and
     * return types.
     */
    static get defaultAdapter(): MDCTextFieldAdapter;
    private isFocused;
    private receivedUserInput;
    private valid;
    private useNativeValidation;
    private validateOnValueChange;
    private readonly inputFocusHandler;
    private readonly inputBlurHandler;
    private readonly inputInputHandler;
    private readonly setPointerXOffset;
    private readonly textFieldInteractionHandler;
    private readonly validationAttributeChangeHandler;
    private validationObserver;
    private readonly helperText?;
    private readonly characterCounter?;
    private readonly leadingIcon?;
    private readonly trailingIcon?;
    /**
     * @param adapter
     * @param foundationMap Map from subcomponent names to their subfoundations.
     */
    constructor(adapter?: Partial<MDCTextFieldAdapter>, foundationMap?: Partial<MDCTextFieldFoundationMap>);
    init(): void;
    destroy(): void;
    /**
     * Handles user interactions with the Text Field.
     */
    handleTextFieldInteraction(): void;
    /**
     * Handles validation attribute changes
     */
    handleValidationAttributeChange(attributesList: string[]): void;
    /**
     * Opens/closes the notched outline.
     */
    notchOutline(openNotch: boolean): void;
    /**
     * Activates the text field focus state.
     */
    activateFocus(): void;
    /**
     * Sets the line ripple's transform origin, so that the line ripple activate
     * animation will animate out from the user's click location.
     */
    setTransformOrigin(evt: TouchEvent | MouseEvent): void;
    /**
     * Handles input change of text input and text area.
     */
    handleInput(): void;
    /**
     * Activates the Text Field's focus state in cases when the input value
     * changes without user input (e.g. programmatically).
     */
    autoCompleteFocus(): void;
    /**
     * Deactivates the Text Field's focus state.
     */
    deactivateFocus(): void;
    getValue(): string;
    /**
     * @param value The value to set on the input Element.
     */
    setValue(value: string): void;
    /**
     * @return The custom validity state, if set; otherwise, the result of a
     *     native validity check.
     */
    isValid(): boolean;
    /**
     * @param isValid Sets the custom validity state of the Text Field.
     */
    setValid(isValid: boolean): void;
    /**
     * @param shouldValidate Whether or not validity should be updated on
     *     value change.
     */
    setValidateOnValueChange(shouldValidate: boolean): void;
    /**
     * @return Whether or not validity should be updated on value change. `true`
     *     by default.
     */
    getValidateOnValueChange(): boolean;
    /**
     * Enables or disables the use of native validation. Use this for custom
     * validation.
     * @param useNativeValidation Set this to false to ignore native input
     *     validation.
     */
    setUseNativeValidation(useNativeValidation: boolean): void;
    isDisabled(): boolean;
    /**
     * @param disabled Sets the text-field disabled or enabled.
     */
    setDisabled(disabled: boolean): void;
    /**
     * @param content Sets the content of the helper text.
     */
    setHelperTextContent(content: string): void;
    /**
     * Sets the aria label of the leading icon.
     */
    setLeadingIconAriaLabel(label: string): void;
    /**
     * Sets the text content of the leading icon.
     */
    setLeadingIconContent(content: string): void;
    /**
     * Sets the aria label of the trailing icon.
     */
    setTrailingIconAriaLabel(label: string): void;
    /**
     * Sets the text content of the trailing icon.
     */
    setTrailingIconContent(content: string): void;
    /**
     * Sets character counter values that shows characters used and the total
     * character limit.
     */
    private setcharacterCounter;
    /**
     * @return True if the Text Field input fails in converting the user-supplied
     *     value.
     */
    private isBadInput;
    /**
     * @return The result of native validity checking (ValidityState.valid).
     */
    private isNativeInputValid;
    /**
     * Styles the component based on the validity state.
     */
    private styleValidity;
    /**
     * Styles the component based on the focused state.
     */
    private styleFocused;
    /**
     * Styles the component based on the disabled state.
     */
    private styleDisabled;
    /**
     * Styles the component based on the label floating state.
     */
    private styleFloating;
    /**
     * @return The native text input element from the host environment, or an
     *     object with the same shape for unit tests.
     */
    private getNativeInput;
}
export default MDCTextFieldFoundation;
