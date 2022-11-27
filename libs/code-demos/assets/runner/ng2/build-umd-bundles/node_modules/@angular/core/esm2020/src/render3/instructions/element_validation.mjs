/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { formatRuntimeError, RuntimeError } from '../../errors';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '../../metadata/schema';
import { throwError } from '../../util/assert';
import { getComponentDef } from '../definition';
import { CONTEXT, DECLARATION_COMPONENT_VIEW } from '../interfaces/view';
import { isAnimationProp } from '../util/attrs_utils';
let shouldThrowErrorOnUnknownElement = false;
/**
 * Sets a strict mode for JIT-compiled components to throw an error on unknown elements,
 * instead of just logging the error.
 * (for AOT-compiled ones this check happens at build time).
 */
export function ɵsetUnknownElementStrictMode(shouldThrow) {
    shouldThrowErrorOnUnknownElement = shouldThrow;
}
/**
 * Gets the current value of the strict mode.
 */
export function ɵgetUnknownElementStrictMode() {
    return shouldThrowErrorOnUnknownElement;
}
let shouldThrowErrorOnUnknownProperty = false;
/**
 * Sets a strict mode for JIT-compiled components to throw an error on unknown properties,
 * instead of just logging the error.
 * (for AOT-compiled ones this check happens at build time).
 */
export function ɵsetUnknownPropertyStrictMode(shouldThrow) {
    shouldThrowErrorOnUnknownProperty = shouldThrow;
}
/**
 * Gets the current value of the strict mode.
 */
export function ɵgetUnknownPropertyStrictMode() {
    return shouldThrowErrorOnUnknownProperty;
}
/**
 * Validates that the element is known at runtime and produces
 * an error if it's not the case.
 * This check is relevant for JIT-compiled components (for AOT-compiled
 * ones this check happens at build time).
 *
 * The element is considered known if either:
 * - it's a known HTML element
 * - it's a known custom element
 * - the element matches any directive
 * - the element is allowed by one of the schemas
 *
 * @param element Element to validate
 * @param lView An `LView` that represents a current component that is being rendered
 * @param tagName Name of the tag to check
 * @param schemas Array of schemas
 * @param hasDirectives Boolean indicating that the element matches any directive
 */
export function validateElementIsKnown(element, lView, tagName, schemas, hasDirectives) {
    // If `schemas` is set to `null`, that's an indication that this Component was compiled in AOT
    // mode where this check happens at compile time. In JIT mode, `schemas` is always present and
    // defined as an array (as an empty array in case `schemas` field is not defined) and we should
    // execute the check below.
    if (schemas === null)
        return;
    // If the element matches any directive, it's considered as valid.
    if (!hasDirectives && tagName !== null) {
        // The element is unknown if it's an instance of HTMLUnknownElement, or it isn't registered
        // as a custom element. Note that unknown elements with a dash in their name won't be instances
        // of HTMLUnknownElement in browsers that support web components.
        const isUnknown = 
        // Note that we can't check for `typeof HTMLUnknownElement === 'function'`,
        // because while most browsers return 'function', IE returns 'object'.
        (typeof HTMLUnknownElement !== 'undefined' && HTMLUnknownElement &&
            element instanceof HTMLUnknownElement) ||
            (typeof customElements !== 'undefined' && tagName.indexOf('-') > -1 &&
                !customElements.get(tagName));
        if (isUnknown && !matchingSchemas(schemas, tagName)) {
            const isHostStandalone = isHostComponentStandalone(lView);
            const templateLocation = getTemplateLocationDetails(lView);
            const schemas = `'${isHostStandalone ? '@Component' : '@NgModule'}.schemas'`;
            let message = `'${tagName}' is not a known element${templateLocation}:\n`;
            message += `1. If '${tagName}' is an Angular component, then verify that it is ${isHostStandalone ? 'included in the \'@Component.imports\' of this component' :
                'a part of an @NgModule where this component is declared'}.\n`;
            if (tagName && tagName.indexOf('-') > -1) {
                message +=
                    `2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${schemas} of this component to suppress this message.`;
            }
            else {
                message +=
                    `2. To allow any element add 'NO_ERRORS_SCHEMA' to the ${schemas} of this component.`;
            }
            if (shouldThrowErrorOnUnknownElement) {
                throw new RuntimeError(304 /* RuntimeErrorCode.UNKNOWN_ELEMENT */, message);
            }
            else {
                console.error(formatRuntimeError(304 /* RuntimeErrorCode.UNKNOWN_ELEMENT */, message));
            }
        }
    }
}
/**
 * Validates that the property of the element is known at runtime and returns
 * false if it's not the case.
 * This check is relevant for JIT-compiled components (for AOT-compiled
 * ones this check happens at build time).
 *
 * The property is considered known if either:
 * - it's a known property of the element
 * - the element is allowed by one of the schemas
 * - the property is used for animations
 *
 * @param element Element to validate
 * @param propName Name of the property to check
 * @param tagName Name of the tag hosting the property
 * @param schemas Array of schemas
 */
export function isPropertyValid(element, propName, tagName, schemas) {
    // If `schemas` is set to `null`, that's an indication that this Component was compiled in AOT
    // mode where this check happens at compile time. In JIT mode, `schemas` is always present and
    // defined as an array (as an empty array in case `schemas` field is not defined) and we should
    // execute the check below.
    if (schemas === null)
        return true;
    // The property is considered valid if the element matches the schema, it exists on the element,
    // or it is synthetic, and we are in a browser context (web worker nodes should be skipped).
    if (matchingSchemas(schemas, tagName) || propName in element || isAnimationProp(propName)) {
        return true;
    }
    // Note: `typeof Node` returns 'function' in most browsers, but on IE it is 'object' so we
    // need to account for both here, while being careful with `typeof null` also returning 'object'.
    return typeof Node === 'undefined' || Node === null || !(element instanceof Node);
}
/**
 * Logs or throws an error that a property is not supported on an element.
 *
 * @param propName Name of the invalid property
 * @param tagName Name of the tag hosting the property
 * @param nodeType Type of the node hosting the property
 * @param lView An `LView` that represents a current component
 */
export function handleUnknownPropertyError(propName, tagName, nodeType, lView) {
    // Special-case a situation when a structural directive is applied to
    // an `<ng-template>` element, for example: `<ng-template *ngIf="true">`.
    // In this case the compiler generates the `ɵɵtemplate` instruction with
    // the `null` as the tagName. The directive matching logic at runtime relies
    // on this effect (see `isInlineTemplate`), thus using the 'ng-template' as
    // a default value of the `tNode.value` is not feasible at this moment.
    if (!tagName && nodeType === 4 /* TNodeType.Container */) {
        tagName = 'ng-template';
    }
    const isHostStandalone = isHostComponentStandalone(lView);
    const templateLocation = getTemplateLocationDetails(lView);
    let message = `Can't bind to '${propName}' since it isn't a known property of '${tagName}'${templateLocation}.`;
    const schemas = `'${isHostStandalone ? '@Component' : '@NgModule'}.schemas'`;
    const importLocation = isHostStandalone ?
        'included in the \'@Component.imports\' of this component' :
        'a part of an @NgModule where this component is declared';
    if (KNOWN_CONTROL_FLOW_DIRECTIVES.has(propName)) {
        // Most likely this is a control flow directive (such as `*ngIf`) used in
        // a template, but the directive or the `CommonModule` is not imported.
        const correspondingImport = KNOWN_CONTROL_FLOW_DIRECTIVES.get(propName);
        message += `\nIf the '${propName}' is an Angular control flow directive, ` +
            `please make sure that either the '${correspondingImport}' directive or the 'CommonModule' is ${importLocation}.`;
    }
    else {
        // May be an Angular component, which is not imported/declared?
        message += `\n1. If '${tagName}' is an Angular component and it has the ` +
            `'${propName}' input, then verify that it is ${importLocation}.`;
        // May be a Web Component?
        if (tagName && tagName.indexOf('-') > -1) {
            message += `\n2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' ` +
                `to the ${schemas} of this component to suppress this message.`;
            message += `\n3. To allow any property add 'NO_ERRORS_SCHEMA' to ` +
                `the ${schemas} of this component.`;
        }
        else {
            // If it's expected, the error can be suppressed by the `NO_ERRORS_SCHEMA` schema.
            message += `\n2. To allow any property add 'NO_ERRORS_SCHEMA' to ` +
                `the ${schemas} of this component.`;
        }
    }
    reportUnknownPropertyError(message);
}
export function reportUnknownPropertyError(message) {
    if (shouldThrowErrorOnUnknownProperty) {
        throw new RuntimeError(303 /* RuntimeErrorCode.UNKNOWN_BINDING */, message);
    }
    else {
        console.error(formatRuntimeError(303 /* RuntimeErrorCode.UNKNOWN_BINDING */, message));
    }
}
/**
 * WARNING: this is a **dev-mode only** function (thus should always be guarded by the `ngDevMode`)
 * and must **not** be used in production bundles. The function makes megamorphic reads, which might
 * be too slow for production mode and also it relies on the constructor function being available.
 *
 * Gets a reference to the host component def (where a current component is declared).
 *
 * @param lView An `LView` that represents a current component that is being rendered.
 */
function getDeclarationComponentDef(lView) {
    !ngDevMode && throwError('Must never be called in production mode');
    const declarationLView = lView[DECLARATION_COMPONENT_VIEW];
    const context = declarationLView[CONTEXT];
    // Unable to obtain a context.
    if (!context)
        return null;
    return context.constructor ? getComponentDef(context.constructor) : null;
}
/**
 * WARNING: this is a **dev-mode only** function (thus should always be guarded by the `ngDevMode`)
 * and must **not** be used in production bundles. The function makes megamorphic reads, which might
 * be too slow for production mode.
 *
 * Checks if the current component is declared inside of a standalone component template.
 *
 * @param lView An `LView` that represents a current component that is being rendered.
 */
export function isHostComponentStandalone(lView) {
    !ngDevMode && throwError('Must never be called in production mode');
    const componentDef = getDeclarationComponentDef(lView);
    // Treat host component as non-standalone if we can't obtain the def.
    return !!componentDef?.standalone;
}
/**
 * WARNING: this is a **dev-mode only** function (thus should always be guarded by the `ngDevMode`)
 * and must **not** be used in production bundles. The function makes megamorphic reads, which might
 * be too slow for production mode.
 *
 * Constructs a string describing the location of the host component template. The function is used
 * in dev mode to produce error messages.
 *
 * @param lView An `LView` that represents a current component that is being rendered.
 */
export function getTemplateLocationDetails(lView) {
    !ngDevMode && throwError('Must never be called in production mode');
    const hostComponentDef = getDeclarationComponentDef(lView);
    const componentClassName = hostComponentDef?.type?.name;
    return componentClassName ? ` (used in the '${componentClassName}' component template)` : '';
}
/**
 * The set of known control flow directives and their corresponding imports.
 * We use this set to produce a more precises error message with a note
 * that the `CommonModule` should also be included.
 */
export const KNOWN_CONTROL_FLOW_DIRECTIVES = new Map([
    ['ngIf', 'NgIf'], ['ngFor', 'NgFor'], ['ngSwitchCase', 'NgSwitchCase'],
    ['ngSwitchDefault', 'NgSwitchDefault']
]);
/**
 * Returns true if the tag name is allowed by specified schemas.
 * @param schemas Array of schemas
 * @param tagName Name of the tag
 */
export function matchingSchemas(schemas, tagName) {
    if (schemas !== null) {
        for (let i = 0; i < schemas.length; i++) {
            const schema = schemas[i];
            if (schema === NO_ERRORS_SCHEMA ||
                schema === CUSTOM_ELEMENTS_SCHEMA && tagName && tagName.indexOf('-') > -1) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF92YWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9pbnN0cnVjdGlvbnMvZWxlbWVudF92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQW1CLE1BQU0sY0FBYyxDQUFDO0FBRWhGLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxnQkFBZ0IsRUFBaUIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvRixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUk5QyxPQUFPLEVBQUMsT0FBTyxFQUFFLDBCQUEwQixFQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFDOUUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXBELElBQUksZ0NBQWdDLEdBQUcsS0FBSyxDQUFDO0FBRTdDOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsV0FBb0I7SUFDL0QsZ0NBQWdDLEdBQUcsV0FBVyxDQUFDO0FBQ2pELENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSw0QkFBNEI7SUFDMUMsT0FBTyxnQ0FBZ0MsQ0FBQztBQUMxQyxDQUFDO0FBRUQsSUFBSSxpQ0FBaUMsR0FBRyxLQUFLLENBQUM7QUFFOUM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxXQUFvQjtJQUNoRSxpQ0FBaUMsR0FBRyxXQUFXLENBQUM7QUFDbEQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QjtJQUMzQyxPQUFPLGlDQUFpQyxDQUFDO0FBQzNDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLFVB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RUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Zm9ybWF0UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uLy4uL2Vycm9ycyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7Q1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQSwgU2NoZW1hTWV0YWRhdGF9IGZyb20gJy4uLy4uL21ldGFkYXRhL3NjaGVtYSc7XG5pbXBvcnQge3Rocm93RXJyb3J9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7Z2V0Q29tcG9uZW50RGVmfSBmcm9tICcuLi9kZWZpbml0aW9uJztcbmltcG9ydCB7Q29tcG9uZW50RGVmfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtUTm9kZVR5cGV9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1JDb21tZW50LCBSRWxlbWVudH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcl9kb20nO1xuaW1wb3J0IHtDT05URVhULCBERUNMQVJBVElPTl9DT01QT05FTlRfVklFVywgTFZpZXd9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2lzQW5pbWF0aW9uUHJvcH0gZnJvbSAnLi4vdXRpbC9hdHRyc191dGlscyc7XG5cbmxldCBzaG91bGRUaHJvd0Vycm9yT25Vbmtub3duRWxlbWVudCA9IGZhbHNlO1xuXG4vKipcbiAqIFNldHMgYSBzdHJpY3QgbW9kZSBmb3IgSklULWNvbXBpbGVkIGNvbXBvbmVudHMgdG8gdGhyb3cgYW4gZXJyb3Igb24gdW5rbm93biBlbGVtZW50cyxcbiAqIGluc3RlYWQgb2YganVzdCBsb2dnaW5nIHRoZSBlcnJvci5cbiAqIChmb3IgQU9ULWNvbXBpbGVkIG9uZXMgdGhpcyBjaGVjayBoYXBwZW5zIGF0IGJ1aWxkIHRpbWUpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gybVzZXRVbmtub3duRWxlbWVudFN0cmljdE1vZGUoc2hvdWxkVGhyb3c6IGJvb2xlYW4pIHtcbiAgc2hvdWxkVGhyb3dFcnJvck9uVW5rbm93bkVsZW1lbnQgPSBzaG91bGRUaHJvdztcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBzdHJpY3QgbW9kZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1Z2V0VW5rbm93bkVsZW1lbnRTdHJpY3RNb2RlKCkge1xuICByZXR1cm4gc2hvdWxkVGhyb3dFcnJvck9uVW5rbm93bkVsZW1lbnQ7XG59XG5cbmxldCBzaG91bGRUaHJvd0Vycm9yT25Vbmtub3duUHJvcGVydHkgPSBmYWxzZTtcblxuLyoqXG4gKiBTZXRzIGEgc3RyaWN0IG1vZGUgZm9yIEpJVC1jb21waWxlZCBjb21wb25lbnRzIHRvIHRocm93IGFuIGVycm9yIG9uIHVua25vd24gcHJvcGVydGllcyxcbiAqIGluc3RlYWQgb2YganVzdCBsb2dnaW5nIHRoZSBlcnJvci5cbiAqIChmb3IgQU9ULWNvbXBpbGVkIG9uZXMgdGhpcyBjaGVjayBoYXBwZW5zIGF0IGJ1aWxkIHRpbWUpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gybVzZXRVbmtub3duUHJvcGVydHlTdHJpY3RNb2RlKHNob3VsZFRocm93OiBib29sZWFuKSB7XG4gIHNob3VsZFRocm93RXJyb3JPblVua25vd25Qcm9wZXJ0eSA9IHNob3VsZFRocm93O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHN0cmljdCBtb2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gybVnZXRVbmtub3duUHJvcGVydHlTdHJpY3RNb2RlKCkge1xuICByZXR1cm4gc2hvdWxkVGhyb3dFcnJvck9uVW5rbm93blByb3BlcnR5O1xufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IHRoZSBlbGVtZW50IGlzIGtub3duIGF0IHJ1bnRpbWUgYW5kIHByb2R1Y2VzXG4gKiBhbiBlcnJvciBpZiBpdCdzIG5vdCB0aGUgY2FzZS5cbiAqIFRoaXMgY2hlY2sgaXMgcmVsZXZhbnQgZm9yIEpJVC1jb21waWxlZCBjb21wb25lbnRzIChmb3IgQU9ULWNvbXBpbGVkXG4gKiBvbmVzIHRoaXMgY2hlY2sgaGFwcGVucyBhdCBidWlsZCB0aW1lKS5cbiAqXG4gKiBUaGUgZWxlbWVudCBpcyBjb25zaWRlcmVkIGtub3duIGlmIGVpdGhlcjpcbiAqIC0gaXQncyBhIGtub3duIEhUTUwgZWxlbWVudFxuICogLSBpdCdzIGEga25vd24gY3VzdG9tIGVsZW1lbnRcbiAqIC0gdGhlIGVsZW1lbnQgbWF0Y2hlcyBhbnkgZGlyZWN0aXZlXG4gKiAtIHRoZSBlbGVtZW50IGlzIGFsbG93ZWQgYnkgb25lIG9mIHRoZSBzY2hlbWFzXG4gKlxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byB2YWxpZGF0ZVxuICogQHBhcmFtIGxWaWV3IEFuIGBMVmlld2AgdGhhdCByZXByZXNlbnRzIGEgY3VycmVudCBjb21wb25lbnQgdGhhdCBpcyBiZWluZyByZW5kZXJlZFxuICogQHBhcmFtIHRhZ05hbWUgTmFtZSBvZiB0aGUgdGFnIHRvIGNoZWNrXG4gKiBAcGFyYW0gc2NoZW1hcyBBcnJheSBvZiBzY2hlbWFzXG4gKiBAcGFyYW0gaGFzRGlyZWN0aXZlcyBCb29sZWFuIGluZGljYXRpbmcgdGhhdCB0aGUgZWxlbWVudCBtYXRjaGVzIGFueSBkaXJlY3RpdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRWxlbWVudElzS25vd24oXG4gICAgZWxlbWVudDogUkVsZW1lbnQsIGxWaWV3OiBMVmlldywgdGFnTmFtZTogc3RyaW5nfG51bGwsIHNjaGVtYXM6IFNjaGVtYU1ldGFkYXRhW118bnVsbCxcbiAgICBoYXNEaXJlY3RpdmVzOiBib29sZWFuKTogdm9pZCB7XG4gIC8vIElmIGBzY2hlbWFzYCBpcyBzZXQgdG8gYG51bGxgLCB0aGF0J3MgYW4gaW5kaWNhdGlvbiB0aGF0IHRoaXMgQ29tcG9uZW50IHdhcyBjb21waWxlZCBpbiBBT1RcbiAgLy8gbW9kZSB3aGVyZSB0aGlzIGNoZWNrIGhhcHBlbnMgYXQgY29tcGlsZSB0aW1lLiBJbiBKSVQgbW9kZSwgYHNjaGVtYXNgIGlzIGFsd2F5cyBwcmVzZW50IGFuZFxuICAvLyBkZWZpbmVkIGFzIGFuIGFycmF5IChhcyBhbiBlbXB0eSBhcnJheSBpbiBjYXNlIGBzY2hlbWFzYCBmaWVsZCBpcyBub3QgZGVmaW5lZCkgYW5kIHdlIHNob3VsZFxuICAvLyBleGVjdXRlIHRoZSBjaGVjayBiZWxvdy5cbiAgaWYgKHNjaGVtYXMgPT09IG51bGwpIHJldHVybjtcblxuICAvLyBJZiB0aGUgZWxlbWVudCBtYXRjaGVzIGFueSBkaXJlY3RpdmUsIGl0J3MgY29uc2lkZXJlZCBhcyB2YWxpZC5cbiAgaWYgKCFoYXNEaXJlY3RpdmVzICYmIHRhZ05hbWUgIT09IG51bGwpIHtcbiAgICAvLyBUaGUgZWxlbWVudCBpcyB1bmtub3duIGlmIGl0J3MgYW4gaW5zdGFuY2Ugb2YgSFRNTFVua25vd25FbGVtZW50LCBvciBpdCBpc24ndCByZWdpc3RlcmVkXG4gICAgLy8gYXMgYSBjdXN0b20gZWxlbWVudC4gTm90ZSB0aGF0IHVua25vd24gZWxlbWVudHMgd2l0aCBhIGRhc2ggaW4gdGhlaXIgbmFtZSB3b24ndCBiZSBpbnN0YW5jZXNcbiAgICAvLyBvZiBIVE1MVW5rbm93bkVsZW1lbnQgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IHdlYiBjb21wb25lbnRzLlxuICAgIGNvbnN0IGlzVW5rbm93biA9XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4ndCBjaGVjayBmb3IgYHR5cGVvZiBIVE1MVW5rbm93bkVsZW1lbnQgPT09ICdmdW5jdGlvbidgLFxuICAgICAgICAvLyBiZWNhdXNlIHdoaWxlIG1vc3QgYnJvd3NlcnMgcmV0dXJuICdmdW5jdGlvbicsIElFIHJldHVybnMgJ29iamVjdCcuXG4gICAgICAgICh0eXBlb2YgSFRNTFVua25vd25FbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBIVE1MVW5rbm93bkVsZW1lbnQgJiZcbiAgICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVW5rbm93bkVsZW1lbnQpIHx8XG4gICAgICAgICh0eXBlb2YgY3VzdG9tRWxlbWVudHMgIT09ICd1bmRlZmluZWQnICYmIHRhZ05hbWUuaW5kZXhPZignLScpID4gLTEgJiZcbiAgICAgICAgICFjdXN0b21FbGVtZW50cy5nZXQodGFnTmFtZSkpO1xuXG4gICAgaWYgKGlzVW5rbm93biAmJiAhbWF0Y2hpbmdTY2hlbWFzKHNjaGVtYXMsIHRhZ05hbWUpKSB7XG4gICAgICBjb25zdCBpc0hvc3RTdGFuZGFsb25lID0gaXNIb3N0Q29tcG9uZW50U3RhbmRhbG9uZShsVmlldyk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZUxvY2F0aW9uID0gZ2V0VGVtcGxhdGVMb2NhdGlvbkRldGFpbHMobFZpZXcpO1xuICAgICAgY29uc3Qgc2NoZW1hcyA9IGAnJHtpc0hvc3RTdGFuZGFsb25lID8gJ0BDb21wb25lbnQnIDogJ0BOZ01vZHVsZSd9LnNjaGVtYXMnYDtcblxuICAgICAgbGV0IG1lc3NhZ2UgPSBgJyR7dGFnTmFtZX0nIGlzIG5vdCBhIGtub3duIGVsZW1lbnQke3RlbXBsYXRlTG9jYXRpb259OlxcbmA7XG4gICAgICBtZXNzYWdlICs9IGAxLiBJZiAnJHt0YWdOYW1lfScgaXMgYW4gQW5ndWxhciBjb21wb25lbnQsIHRoZW4gdmVyaWZ5IHRoYXQgaXQgaXMgJHtcbiAgICAgICAgICBpc0hvc3RTdGFuZGFsb25lID8gJ2luY2x1ZGVkIGluIHRoZSBcXCdAQ29tcG9uZW50LmltcG9ydHNcXCcgb2YgdGhpcyBjb21wb25lbnQnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2EgcGFydCBvZiBhbiBATmdNb2R1bGUgd2hlcmUgdGhpcyBjb21wb25lbnQgaXMgZGVjbGFyZWQnfS5cXG5gO1xuICAgICAgaWYgKHRhZ05hbWUgJiYgdGFnTmFtZS5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgICBtZXNzYWdlICs9XG4gICAgICAgICAgICBgMi4gSWYgJyR7dGFnTmFtZX0nIGlzIGEgV2ViIENvbXBvbmVudCB0aGVuIGFkZCAnQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQScgdG8gdGhlICR7XG4gICAgICAgICAgICAgICAgc2NoZW1hc30gb2YgdGhpcyBjb21wb25lbnQgdG8gc3VwcHJlc3MgdGhpcyBtZXNzYWdlLmA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlICs9XG4gICAgICAgICAgICBgMi4gVG8gYWxsb3cgYW55IGVsZW1lbnQgYWRkICdOT19FUlJPUlNfU0NIRU1BJyB0byB0aGUgJHtzY2hlbWFzfSBvZiB0aGlzIGNvbXBvbmVudC5gO1xuICAgICAgfVxuICAgICAgaWYgKHNob3VsZFRocm93RXJyb3JPblVua25vd25FbGVtZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoUnVudGltZUVycm9yQ29kZS5VTktOT1dOX0VMRU1FTlQsIG1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXRSdW50aW1lRXJyb3IoUnVudGltZUVycm9yQ29kZS5VTktOT1dOX0VMRU1FTlQsIG1lc3NhZ2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCB0aGUgcHJvcGVydHkgb2YgdGhlIGVsZW1lbnQgaXMga25vd24gYXQgcnVudGltZSBhbmQgcmV0dXJuc1xuICogZmFsc2UgaWYgaXQncyBub3QgdGhlIGNhc2UuXG4gKiBUaGlzIGNoZWNrIGlzIHJlbGV2YW50IGZvciBKSVQtY29tcGlsZWQgY29tcG9uZW50cyAoZm9yIEFPVC1jb21waWxlZFxuICogb25lcyB0aGlzIGNoZWNrIGhhcHBlbnMgYXQgYnVpbGQgdGltZSkuXG4gKlxuICogVGhlIHByb3BlcnR5IGlzIGNvbnNpZGVyZWQga25vd24gaWYgZWl0aGVyOlxuICogLSBpdCdzIGEga25vd24gcHJvcGVydHkgb2YgdGhlIGVsZW1lbnRcbiAqIC0gdGhlIGVsZW1lbnQgaXMgYWxsb3dlZCBieSBvbmUgb2YgdGhlIHNjaGVtYXNcbiAqIC0gdGhlIHByb3BlcnR5IGlzIHVzZWQgZm9yIGFuaW1hdGlvbnNcbiAqXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHRvIHZhbGlkYXRlXG4gKiBAcGFyYW0gcHJvcE5hbWUgTmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gY2hlY2tcbiAqIEBwYXJhbSB0YWdOYW1lIE5hbWUgb2YgdGhlIHRhZyBob3N0aW5nIHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtIHNjaGVtYXMgQXJyYXkgb2Ygc2NoZW1hc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9wZXJ0eVZhbGlkKFxuICAgIGVsZW1lbnQ6IFJFbGVtZW50fFJDb21tZW50LCBwcm9wTmFtZTogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmd8bnVsbCxcbiAgICBzY2hlbWFzOiBTY2hlbWFNZXRhZGF0YVtdfG51bGwpOiBib29sZWFuIHtcbiAgLy8gSWYgYHNjaGVtYXNgIGlzIHNldCB0byBgbnVsbGAsIHRoYXQncyBhbiBpbmRpY2F0aW9uIHRoYXQgdGhpcyBDb21wb25lbnQgd2FzIGNvbXBpbGVkIGluIEFPVFxuICAvLyBtb2RlIHdoZXJlIHRoaXMgY2hlY2sgaGFwcGVucyBhdCBjb21waWxlIHRpbWUuIEluIEpJVCBtb2RlLCBgc2NoZW1hc2AgaXMgYWx3YXlzIHByZXNlbnQgYW5kXG4gIC8vIGRlZmluZWQgYXMgYW4gYXJyYXkgKGFzIGFuIGVtcHR5IGFycmF5IGluIGNhc2UgYHNjaGVtYXNgIGZpZWxkIGlzIG5vdCBkZWZpbmVkKSBhbmQgd2Ugc2hvdWxkXG4gIC8vIGV4ZWN1dGUgdGhlIGNoZWNrIGJlbG93LlxuICBpZiAoc2NoZW1hcyA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgLy8gVGhlIHByb3BlcnR5IGlzIGNvbnNpZGVyZWQgdmFsaWQgaWYgdGhlIGVsZW1lbnQgbWF0Y2hlcyB0aGUgc2NoZW1hLCBpdCBleGlzdHMgb24gdGhlIGVsZW1lbnQsXG4gIC8vIG9yIGl0IGlzIHN5bnRoZXRpYywgYW5kIHdlIGFyZSBpbiBhIGJyb3dzZXIgY29udGV4dCAod2ViIHdvcmtlciBub2RlcyBzaG91bGQgYmUgc2tpcHBlZCkuXG4gIGlmIChtYXRjaGluZ1NjaGVtYXMoc2NoZW1hcywgdGFnTmFtZSkgfHwgcHJvcE5hbWUgaW4gZWxlbWVudCB8fCBpc0FuaW1hdGlvblByb3AocHJvcE5hbWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBOb3RlOiBgdHlwZW9mIE5vZGVgIHJldHVybnMgJ2Z1bmN0aW9uJyBpbiBtb3N0IGJyb3dzZXJzLCBidXQgb24gSUUgaXQgaXMgJ29iamVjdCcgc28gd2VcbiAgLy8gbmVlZCB0byBhY2NvdW50IGZvciBib3RoIGhlcmUsIHdoaWxlIGJlaW5nIGNhcmVmdWwgd2l0aCBgdHlwZW9mIG51bGxgIGFsc28gcmV0dXJuaW5nICdvYmplY3QnLlxuICByZXR1cm4gdHlwZW9mIE5vZGUgPT09ICd1bmRlZmluZWQnIHx8IE5vZGUgPT09IG51bGwgfHwgIShlbGVtZW50IGluc3RhbmNlb2YgTm9kZSk7XG59XG5cbi8qKlxuICogTG9ncyBvciB0aHJvd3MgYW4gZXJyb3IgdGhhdCBhIHByb3BlcnR5IGlzIG5vdCBzdXBwb3J0ZWQgb24gYW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gcHJvcE5hbWUgTmFtZSBvZiB0aGUgaW52YWxpZCBwcm9wZXJ0eVxuICogQHBhcmFtIHRhZ05hbWUgTmFtZSBvZiB0aGUgdGFnIGhvc3RpbmcgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0gbm9kZVR5cGUgVHlwZSBvZiB0aGUgbm9kZSBob3N0aW5nIHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtIGxWaWV3IEFuIGBMVmlld2AgdGhhdCByZXByZXNlbnRzIGEgY3VycmVudCBjb21wb25lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVVua25vd25Qcm9wZXJ0eUVycm9yKFxuICAgIHByb3BOYW1lOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZ3xudWxsLCBub2RlVHlwZTogVE5vZGVUeXBlLCBsVmlldzogTFZpZXcpOiB2b2lkIHtcbiAgLy8gU3BlY2lhbC1jYXNlIGEgc2l0dWF0aW9uIHdoZW4gYSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSBpcyBhcHBsaWVkIHRvXG4gIC8vIGFuIGA8bmctdGVtcGxhdGU+YCBlbGVtZW50LCBmb3IgZXhhbXBsZTogYDxuZy10ZW1wbGF0ZSAqbmdJZj1cInRydWVcIj5gLlxuICAvLyBJbiB0aGlzIGNhc2UgdGhlIGNvbXBpbGVyIGdlbmVyYXRlcyB0aGUgYMm1ybV0ZW1wbGF0ZWAgaW5zdHJ1Y3Rpb24gd2l0aFxuICAvLyB0aGUgYG51bGxgIGFzIHRoZSB0YWdOYW1lLiBUaGUgZGlyZWN0aXZlIG1hdGNoaW5nIGxvZ2ljIGF0IHJ1bnRpbWUgcmVsaWVzXG4gIC8vIG9uIHRoaXMgZWZmZWN0IChzZWUgYGlzSW5saW5lVGVtcGxhdGVgKSwgdGh1cyB1c2luZyB0aGUgJ25nLXRlbXBsYXRlJyBhc1xuICAvLyBhIGRlZmF1bHQgdmFsdWUgb2YgdGhlIGB0Tm9kZS52YWx1ZWAgaXMgbm90IGZlYXNpYmxlIGF0IHRoaXMgbW9tZW50LlxuICBpZiAoIXRhZ05hbWUgJiYgbm9kZVR5cGUgPT09IFROb2RlVHlwZS5Db250YWluZXIpIHtcbiAgICB0YWdOYW1lID0gJ25nLXRlbXBsYXRlJztcbiAgfVxuXG4gIGNvbnN0IGlzSG9zdFN0YW5kYWxvbmUgPSBpc0hvc3RDb21wb25lbnRTdGFuZGFsb25lKGxWaWV3KTtcbiAgY29uc3QgdGVtcGxhdGVMb2NhdGlvbiA9IGdldFRlbXBsYXRlTG9jYXRpb25EZXRhaWxzKGxWaWV3KTtcblxuICBsZXQgbWVzc2FnZSA9IGBDYW4ndCBiaW5kIHRvICcke3Byb3BOYW1lfScgc2luY2UgaXQgaXNuJ3QgYSBrbm93biBwcm9wZXJ0eSBvZiAnJHt0YWdOYW1lfScke1xuICAgICAgdGVtcGxhdGVMb2NhdGlvbn0uYDtcblxuICBjb25zdCBzY2hlbWFzID0gYCcke2lzSG9zdFN0YW5kYWxvbmUgPyAnQENvbXBvbmVudCcgOiAnQE5nTW9kdWxlJ30uc2NoZW1hcydgO1xuICBjb25zdCBpbXBvcnRMb2NhdGlvbiA9IGlzSG9zdFN0YW5kYWxvbmUgP1xuICAgICAgJ2luY2x1ZGVkIGluIHRoZSBcXCdAQ29tcG9uZW50LmltcG9ydHNcXCcgb2YgdGhpcyBjb21wb25lbnQnIDpcbiAgICAgICdhIHBhcnQgb2YgYW4gQE5nTW9kdWxlIHdoZXJlIHRoaXMgY29tcG9uZW50IGlzIGRlY2xhcmVkJztcbiAgaWYgKEtOT1dOX0NPTlRST0xfRkxPV19ESVJFQ1RJVkVTLmhhcyhwcm9wTmFtZSkpIHtcbiAgICAvLyBNb3N0IGxpa2VseSB0aGlzIGlzIGEgY29udHJvbCBmbG93IGRpcmVjdGl2ZSAoc3VjaCBhcyBgKm5nSWZgKSB1c2VkIGluXG4gICAgLy8gYSB0ZW1wbGF0ZSwgYnV0IHRoZSBkaXJlY3RpdmUgb3IgdGhlIGBDb21tb25Nb2R1bGVgIGlzIG5vdCBpbXBvcnRlZC5cbiAgICBjb25zdCBjb3JyZXNwb25kaW5nSW1wb3J0ID0gS05PV05fQ09OVFJPTF9GTE9XX0RJUkVDVElWRVMuZ2V0KHByb3BOYW1lKTtcbiAgICBtZXNzYWdlICs9IGBcXG5JZiB0aGUgJyR7cHJvcE5hbWV9JyBpcyBhbiBBbmd1bGFyIGNvbnRyb2wgZmxvdyBkaXJlY3RpdmUsIGAgK1xuICAgICAgICBgcGxlYXNlIG1ha2Ugc3VyZSB0aGF0IGVpdGhlciB0aGUgJyR7XG4gICAgICAgICAgICAgICAgICAgY29ycmVzcG9uZGluZ0ltcG9ydH0nIGRpcmVjdGl2ZSBvciB0aGUgJ0NvbW1vbk1vZHVsZScgaXMgJHtpbXBvcnRMb2NhdGlvbn0uYDtcbiAgfSBlbHNlIHtcbiAgICAvLyBNYXkgYmUgYW4gQW5ndWxhciBjb21wb25lbnQsIHdoaWNoIGlzIG5vdCBpbXBvcnRlZC9kZWNsYXJlZD9cbiAgICBtZXNzYWdlICs9IGBcXG4xLiBJZiAnJHt0YWdOYW1lfScgaXMgYW4gQW5ndWxhciBjb21wb25lbnQgYW5kIGl0IGhhcyB0aGUgYCArXG4gICAgICAgIGAnJHtwcm9wTmFtZX0nIGlucHV0LCB0aGVuIHZlcmlmeSB0aGF0IGl0IGlzICR7aW1wb3J0TG9jYXRpb259LmA7XG4gICAgLy8gTWF5IGJlIGEgV2ViIENvbXBvbmVudD9cbiAgICBpZiAodGFnTmFtZSAmJiB0YWdOYW1lLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICBtZXNzYWdlICs9IGBcXG4yLiBJZiAnJHt0YWdOYW1lfScgaXMgYSBXZWIgQ29tcG9uZW50IHRoZW4gYWRkICdDVVNUT01fRUxFTUVOVFNfU0NIRU1BJyBgICtcbiAgICAgICAgICBgdG8gdGhlICR7c2NoZW1hc30gb2YgdGhpcyBjb21wb25lbnQgdG8gc3VwcHJlc3MgdGhpcyBtZXNzYWdlLmA7XG4gICAgICBtZXNzYWdlICs9IGBcXG4zLiBUbyBhbGxvdyBhbnkgcHJvcGVydHkgYWRkICdOT19FUlJPUlNfU0NIRU1BJyB0byBgICtcbiAgICAgICAgICBgdGhlICR7c2NoZW1hc30gb2YgdGhpcyBjb21wb25lbnQuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgaXQncyBleHBlY3RlZCwgdGhlIGVycm9yIGNhbiBiZSBzdXBwcmVzc2VkIGJ5IHRoZSBgTk9fRVJST1JTX1NDSEVNQWAgc2NoZW1hLlxuICAgICAgbWVzc2FnZSArPSBgXFxuMi4gVG8gYWxsb3cgYW55IHByb3BlcnR5IGFkZCAnTk9fRVJST1JTX1NDSEVNQScgdG8gYCArXG4gICAgICAgICAgYHRoZSAke3NjaGVtYXN9IG9mIHRoaXMgY29tcG9uZW50LmA7XG4gICAgfVxuICB9XG5cbiAgcmVwb3J0VW5rbm93blByb3BlcnR5RXJyb3IobWVzc2FnZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBvcnRVbmtub3duUHJvcGVydHlFcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgaWYgKHNob3VsZFRocm93RXJyb3JPblVua25vd25Qcm9wZXJ0eSkge1xuICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoUnVudGltZUVycm9yQ29kZS5VTktOT1dOX0JJTkRJTkcsIG1lc3NhZ2UpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0UnVudGltZUVycm9yKFJ1bnRpbWVFcnJvckNvZGUuVU5LTk9XTl9CSU5ESU5HLCBtZXNzYWdlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXQVJOSU5HOiB0aGlzIGlzIGEgKipkZXYtbW9kZSBvbmx5KiogZnVuY3Rpb24gKHRodXMgc2hvdWxkIGFsd2F5cyBiZSBndWFyZGVkIGJ5IHRoZSBgbmdEZXZNb2RlYClcbiAqIGFuZCBtdXN0ICoqbm90KiogYmUgdXNlZCBpbiBwcm9kdWN0aW9uIGJ1bmRsZXMuIFRoZSBmdW5jdGlvbiBtYWtlcyBtZWdhbW9ycGhpYyByZWFkcywgd2hpY2ggbWlnaHRcbiAqIGJlIHRvbyBzbG93IGZvciBwcm9kdWN0aW9uIG1vZGUgYW5kIGFsc28gaXQgcmVsaWVzIG9uIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBiZWluZyBhdmFpbGFibGUuXG4gKlxuICogR2V0cyBhIHJlZmVyZW5jZSB0byB0aGUgaG9zdCBjb21wb25lbnQgZGVmICh3aGVyZSBhIGN1cnJlbnQgY29tcG9uZW50IGlzIGRlY2xhcmVkKS5cbiAqXG4gKiBAcGFyYW0gbFZpZXcgQW4gYExWaWV3YCB0aGF0IHJlcHJlc2VudHMgYSBjdXJyZW50IGNvbXBvbmVudCB0aGF0IGlzIGJlaW5nIHJlbmRlcmVkLlxuICovXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkNvbXBvbmVudERlZihsVmlldzogTFZpZXcpOiBDb21wb25lbnREZWY8dW5rbm93bj58bnVsbCB7XG4gICFuZ0Rldk1vZGUgJiYgdGhyb3dFcnJvcignTXVzdCBuZXZlciBiZSBjYWxsZWQgaW4gcHJvZHVjdGlvbiBtb2RlJyk7XG5cbiAgY29uc3QgZGVjbGFyYXRpb25MVmlldyA9IGxWaWV3W0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXSBhcyBMVmlldzxUeXBlPHVua25vd24+PjtcbiAgY29uc3QgY29udGV4dCA9IGRlY2xhcmF0aW9uTFZpZXdbQ09OVEVYVF07XG5cbiAgLy8gVW5hYmxlIHRvIG9idGFpbiBhIGNvbnRleHQuXG4gIGlmICghY29udGV4dCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIGNvbnRleHQuY29uc3RydWN0b3IgPyBnZXRDb21wb25lbnREZWYoY29udGV4dC5jb25zdHJ1Y3RvcikgOiBudWxsO1xufVxuXG4vKipcbiAqIFdBUk5JTkc6IHRoaXMgaXMgYSAqKmRldi1tb2RlIG9ubHkqKiBmdW5jdGlvbiAodGh1cyBzaG91bGQgYWx3YXlzIGJlIGd1YXJkZWQgYnkgdGhlIGBuZ0Rldk1vZGVgKVxuICogYW5kIG11c3QgKipub3QqKiBiZSB1c2VkIGluIHByb2R1Y3Rpb24gYnVuZGxlcy4gVGhlIGZ1bmN0aW9uIG1ha2VzIG1lZ2Ftb3JwaGljIHJlYWRzLCB3aGljaCBtaWdodFxuICogYmUgdG9vIHNsb3cgZm9yIHByb2R1Y3Rpb24gbW9kZS5cbiAqXG4gKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgY29tcG9uZW50IGlzIGRlY2xhcmVkIGluc2lkZSBvZiBhIHN0YW5kYWxvbmUgY29tcG9uZW50IHRlbXBsYXRlLlxuICpcbiAqIEBwYXJhbSBsVmlldyBBbiBgTFZpZXdgIHRoYXQgcmVwcmVzZW50cyBhIGN1cnJlbnQgY29tcG9uZW50IHRoYXQgaXMgYmVpbmcgcmVuZGVyZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0hvc3RDb21wb25lbnRTdGFuZGFsb25lKGxWaWV3OiBMVmlldyk6IGJvb2xlYW4ge1xuICAhbmdEZXZNb2RlICYmIHRocm93RXJyb3IoJ011c3QgbmV2ZXIgYmUgY2FsbGVkIGluIHByb2R1Y3Rpb24gbW9kZScpO1xuXG4gIGNvbnN0IGNvbXBvbmVudERlZiA9IGdldERlY2xhcmF0aW9uQ29tcG9uZW50RGVmKGxWaWV3KTtcbiAgLy8gVHJlYXQgaG9zdCBjb21wb25lbnQgYXMgbm9uLXN0YW5kYWxvbmUgaWYgd2UgY2FuJ3Qgb2J0YWluIHRoZSBkZWYuXG4gIHJldHVybiAhIWNvbXBvbmVudERlZj8uc3RhbmRhbG9uZTtcbn1cblxuLyoqXG4gKiBXQVJOSU5HOiB0aGlzIGlzIGEgKipkZXYtbW9kZSBvbmx5KiogZnVuY3Rpb24gKHRodXMgc2hvdWxkIGFsd2F5cyBiZSBndWFyZGVkIGJ5IHRoZSBgbmdEZXZNb2RlYClcbiAqIGFuZCBtdXN0ICoqbm90KiogYmUgdXNlZCBpbiBwcm9kdWN0aW9uIGJ1bmRsZXMuIFRoZSBmdW5jdGlvbiBtYWtlcyBtZWdhbW9ycGhpYyByZWFkcywgd2hpY2ggbWlnaHRcbiAqIGJlIHRvbyBzbG93IGZvciBwcm9kdWN0aW9uIG1vZGUuXG4gKlxuICogQ29uc3RydWN0cyBhIHN0cmluZyBkZXNjcmliaW5nIHRoZSBsb2NhdGlvbiBvZiB0aGUgaG9zdCBjb21wb25lbnQgdGVtcGxhdGUuIFRoZSBmdW5jdGlvbiBpcyB1c2VkXG4gKiBpbiBkZXYgbW9kZSB0byBwcm9kdWNlIGVycm9yIG1lc3NhZ2VzLlxuICpcbiAqIEBwYXJhbSBsVmlldyBBbiBgTFZpZXdgIHRoYXQgcmVwcmVzZW50cyBhIGN1cnJlbnQgY29tcG9uZW50IHRoYXQgaXMgYmVpbmcgcmVuZGVyZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZW1wbGF0ZUxvY2F0aW9uRGV0YWlscyhsVmlldzogTFZpZXcpOiBzdHJpbmcge1xuICAhbmdEZXZNb2RlICYmIHRocm93RXJyb3IoJ011c3QgbmV2ZXIgYmUgY2FsbGVkIGluIHByb2R1Y3Rpb24gbW9kZScpO1xuXG4gIGNvbnN0IGhvc3RDb21wb25lbnREZWYgPSBnZXREZWNsYXJhdGlvbkNvbXBvbmVudERlZihsVmlldyk7XG4gIGNvbnN0IGNvbXBvbmVudENsYXNzTmFtZSA9IGhvc3RDb21wb25lbnREZWY/LnR5cGU/Lm5hbWU7XG4gIHJldHVybiBjb21wb25lbnRDbGFzc05hbWUgPyBgICh1c2VkIGluIHRoZSAnJHtjb21wb25lbnRDbGFzc05hbWV9JyBjb21wb25lbnQgdGVtcGxhdGUpYCA6ICcnO1xufVxuXG4vKipcbiAqIFRoZSBzZXQgb2Yga25vd24gY29udHJvbCBmbG93IGRpcmVjdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgaW1wb3J0cy5cbiAqIFdlIHVzZSB0aGlzIHNldCB0byBwcm9kdWNlIGEgbW9yZSBwcmVjaXNlcyBlcnJvciBtZXNzYWdlIHdpdGggYSBub3RlXG4gKiB0aGF0IHRoZSBgQ29tbW9uTW9kdWxlYCBzaG91bGQgYWxzbyBiZSBpbmNsdWRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IEtOT1dOX0NPTlRST0xfRkxPV19ESVJFQ1RJVkVTID0gbmV3IE1hcChbXG4gIFsnbmdJZicsICdOZ0lmJ10sIFsnbmdGb3InLCAnTmdGb3InXSwgWyduZ1N3aXRjaENhc2UnLCAnTmdTd2l0Y2hDYXNlJ10sXG4gIFsnbmdTd2l0Y2hEZWZhdWx0JywgJ05nU3dpdGNoRGVmYXVsdCddXG5dKTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgbmFtZSBpcyBhbGxvd2VkIGJ5IHNwZWNpZmllZCBzY2hlbWFzLlxuICogQHBhcmFtIHNjaGVtYXMgQXJyYXkgb2Ygc2NoZW1hc1xuICogQHBhcmFtIHRhZ05hbWUgTmFtZSBvZiB0aGUgdGFnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGluZ1NjaGVtYXMoc2NoZW1hczogU2NoZW1hTWV0YWRhdGFbXXxudWxsLCB0YWdOYW1lOiBzdHJpbmd8bnVsbCk6IGJvb2xlYW4ge1xuICBpZiAoc2NoZW1hcyAhPT0gbnVsbCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NoZW1hcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2NoZW1hID0gc2NoZW1hc1tpXTtcbiAgICAgIGlmIChzY2hlbWEgPT09IE5PX0VSUk9SU19TQ0hFTUEgfHxcbiAgICAgICAgICBzY2hlbWEgPT09IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgJiYgdGFnTmFtZSAmJiB0YWdOYW1lLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==