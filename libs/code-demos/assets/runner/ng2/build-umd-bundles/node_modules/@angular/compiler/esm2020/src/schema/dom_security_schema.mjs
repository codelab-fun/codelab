/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SecurityContext } from '../core';
// =================================================================================================
// =================================================================================================
// =========== S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P  ===========
// =================================================================================================
// =================================================================================================
//
//        DO NOT EDIT THIS LIST OF SECURITY SENSITIVE PROPERTIES WITHOUT A SECURITY REVIEW!
//                               Reach out to mprobst for details.
//
// =================================================================================================
/** Map from tagName|propertyName to SecurityContext. Properties applying to all tags use '*'. */
let _SECURITY_SCHEMA;
export function SECURITY_SCHEMA() {
    if (!_SECURITY_SCHEMA) {
        _SECURITY_SCHEMA = {};
        // Case is insignificant below, all element and attribute names are lower-cased for lookup.
        registerContext(SecurityContext.HTML, [
            'iframe|srcdoc',
            '*|innerHTML',
            '*|outerHTML',
        ]);
        registerContext(SecurityContext.STYLE, ['*|style']);
        // NB: no SCRIPT contexts here, they are never allowed due to the parser stripping them.
        registerContext(SecurityContext.URL, [
            '*|formAction',
            'area|href',
            'area|ping',
            'audio|src',
            'a|href',
            'a|ping',
            'blockquote|cite',
            'body|background',
            'del|cite',
            'form|action',
            'img|src',
            'input|src',
            'ins|cite',
            'q|cite',
            'source|src',
            'track|src',
            'video|poster',
            'video|src',
        ]);
        registerContext(SecurityContext.RESOURCE_URL, [
            'applet|code',
            'applet|codebase',
            'base|href',
            'embed|src',
            'frame|src',
            'head|profile',
            'html|manifest',
            'iframe|src',
            'link|href',
            'media|src',
            'object|codebase',
            'object|data',
            'script|src',
        ]);
    }
    return _SECURITY_SCHEMA;
}
function registerContext(ctx, specs) {
    for (const spec of specs)
        _SECURITY_SCHEMA[spec.toLowerCase()] = ctx;
}
/**
 * The set of security-sensitive attributes of an `<iframe>` that *must* be
 * applied as a static attribute only. This ensures that all security-sensitive
 * attributes are taken into account while creating an instance of an `<iframe>`
 * at runtime.
 *
 * Note: avoid using this set directly, use the `isIframeSecuritySensitiveAttr` function
 * in the code instead.
 */
export const IFRAME_SECURITY_SENSITIVE_ATTRS = new Set(['sandbox', 'allow', 'allowfullscreen', 'referrerpolicy', 'csp', 'fetchpriority']);
/**
 * Checks whether a given attribute name might represent a security-sensitive
 * attribute of an <iframe>.
 */
export function isIframeSecuritySensitiveAttr(attrName) {
    // The `setAttribute` DOM API is case-insensitive, so we lowercase the value
    // before checking it against a known security-sensitive attributes.
    return IFRAME_SECURITY_SENSITIVE_ATTRS.has(attrName.toLowerCase());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3NlY3VyaXR5X3NjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9zY2hlbWEvZG9tX3NlY3VyaXR5X3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRXhDLG9HQUFvRztBQUNwRyxvR0FBb0c7QUFDcEcsb0dBQW9HO0FBQ3BHLG9HQUFvRztBQUNwRyxvR0FBb0c7QUFDcEcsRUFBRTtBQUNGLDJGQUEyRjtBQUMzRixrRUFBa0U7QUFDbEUsRUFBRTtBQUNGLG9HQUFvRztBQUVwRyxpR0FBaUc7QUFDakcsSUFBSSxnQkFBaUQsQ0FBQztBQUV0RCxNQUFNLFVBQVUsZUFBZTtJQUM3QixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFDckIsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLDJGQUEyRjtRQUUzRixlQUFlLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTtZQUNwQyxlQUFlO1lBQ2YsYUFBYTtZQUNiLGFBQWE7U0FDZCxDQUFDLENBQUM7UUFDSCxlQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsd0ZBQXdGO1FBQ3hGLGVBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQ25DLGNBQWM7WUFDZCxXQUFXO1lBQ1gsV0FBVztZQUNYLFdBQVc7WUFDWCxRQUFRO1lBQ1IsUUFBUTtZQUNSLGlCQUFpQjtZQUNqQixpQkFBaUI7WUFDakIsVUFBVTtZQUNWLGFBQWE7WUFDYixTQUFTO1lBQ1QsV0FBVztZQUNYLFVBQVU7WUFDVixRQUFRO1lBQ1IsWUFBWTtZQUNaLFdBQVc7WUFDWCxjQUFjO1lBQ2QsV0FBVztTQUNaLENBQUMsQ0FBQztRQUNILGVBQWUsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFO1lBQzVDLGFBQWE7WUFDYixpQkFBaUI7WUFDakIsV0FBVztZQUNYLFdBQVc7WUFDWCxXQUFXO1lBQ1gsY0FBYztZQUNkLGVBQWU7WUFDZixZQUFZO1lBQ1osV0FBVztZQUNYLFdBQVc7WUFDWCxpQkFBaUI7WUFDakIsYUFBYTtZQUNiLFlBQVk7U0FDYixDQUFDLENBQUM7S0FDSjtJQUNELE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQW9CLEVBQUUsS0FBZTtJQUM1RCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUs7UUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDdkUsQ0FBQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQ3hDLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUUvRjs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsUUFBZ0I7SUFDNUQsNEVBQTRFO0lBQzVFLG9FQUFvRTtJQUNwRSxPQUFPLCtCQUErQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUNyRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U2VjdXJpdHlDb250ZXh0fSBmcm9tICcuLi9jb3JlJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gPT09PT09PT09PT0gUyBUIE8gUCAgIC0gIFMgVCBPIFAgICAtICBTIFQgTyBQICAgLSAgUyBUIE8gUCAgIC0gIFMgVCBPIFAgICAtICBTIFQgTyBQICA9PT09PT09PT09PVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vICAgICAgICBETyBOT1QgRURJVCBUSElTIExJU1QgT0YgU0VDVVJJVFkgU0VOU0lUSVZFIFBST1BFUlRJRVMgV0lUSE9VVCBBIFNFQ1VSSVRZIFJFVklFVyFcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWNoIG91dCB0byBtcHJvYnN0IGZvciBkZXRhaWxzLlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqIE1hcCBmcm9tIHRhZ05hbWV8cHJvcGVydHlOYW1lIHRvIFNlY3VyaXR5Q29udGV4dC4gUHJvcGVydGllcyBhcHBseWluZyB0byBhbGwgdGFncyB1c2UgJyonLiAqL1xubGV0IF9TRUNVUklUWV9TQ0hFTUEhOiB7W2s6IHN0cmluZ106IFNlY3VyaXR5Q29udGV4dH07XG5cbmV4cG9ydCBmdW5jdGlvbiBTRUNVUklUWV9TQ0hFTUEoKToge1trOiBzdHJpbmddOiBTZWN1cml0eUNvbnRleHR9IHtcbiAgaWYgKCFfU0VDVVJJVFlfU0NIRU1BKSB7XG4gICAgX1NFQ1VSSVRZX1NDSEVNQSA9IHt9O1xuICAgIC8vIENhc2UgaXMgaW5zaWduaWZpY2FudCBiZWxvdywgYWxsIGVsZW1lbnQgYW5kIGF0dHJpYnV0ZSBuYW1lcyBhcmUgbG93ZXItY2FzZWQgZm9yIGxvb2t1cC5cblxuICAgIHJlZ2lzdGVyQ29udGV4dChTZWN1cml0eUNvbnRleHQuSFRNTCwgW1xuICAgICAgJ2lmcmFtZXxzcmNkb2MnLFxuICAgICAgJyp8aW5uZXJIVE1MJyxcbiAgICAgICcqfG91dGVySFRNTCcsXG4gICAgXSk7XG4gICAgcmVnaXN0ZXJDb250ZXh0KFNlY3VyaXR5Q29udGV4dC5TVFlMRSwgWycqfHN0eWxlJ10pO1xuICAgIC8vIE5COiBubyBTQ1JJUFQgY29udGV4dHMgaGVyZSwgdGhleSBhcmUgbmV2ZXIgYWxsb3dlZCBkdWUgdG8gdGhlIHBhcnNlciBzdHJpcHBpbmcgdGhlbS5cbiAgICByZWdpc3RlckNvbnRleHQoU2VjdXJpdHlDb250ZXh0LlVSTCwgW1xuICAgICAgJyp8Zm9ybUFjdGlvbicsXG4gICAgICAnYXJlYXxocmVmJyxcbiAgICAgICdhcmVhfHBpbmcnLFxuICAgICAgJ2F1ZGlvfHNyYycsXG4gICAgICAnYXxocmVmJyxcbiAgICAgICdhfHBpbmcnLFxuICAgICAgJ2Jsb2NrcXVvdGV8Y2l0ZScsXG4gICAgICAnYm9keXxiYWNrZ3JvdW5kJyxcbiAgICAgICdkZWx8Y2l0ZScsXG4gICAgICAnZm9ybXxhY3Rpb24nLFxuICAgICAgJ2ltZ3xzcmMnLFxuICAgICAgJ2lucHV0fHNyYycsXG4gICAgICAnaW5zfGNpdGUnLFxuICAgICAgJ3F8Y2l0ZScsXG4gICAgICAnc291cmNlfHNyYycsXG4gICAgICAndHJhY2t8c3JjJyxcbiAgICAgICd2aWRlb3xwb3N0ZXInLFxuICAgICAgJ3ZpZGVvfHNyYycsXG4gICAgXSk7XG4gICAgcmVnaXN0ZXJDb250ZXh0KFNlY3VyaXR5Q29udGV4dC5SRVNPVVJDRV9VUkwsIFtcbiAgICAgICdhcHBsZXR8Y29kZScsXG4gICAgICAnYXBwbGV0fGNvZGViYXNlJyxcbiAgICAgICdiYXNlfGhyZWYnLFxuICAgICAgJ2VtYmVkfHNyYycsXG4gICAgICAnZnJhbWV8c3JjJyxcbiAgICAgICdoZWFkfHByb2ZpbGUnLFxuICAgICAgJ2h0bWx8bWFuaWZlc3QnLFxuICAgICAgJ2lmcmFtZXxzcmMnLFxuICAgICAgJ2xpbmt8aHJlZicsXG4gICAgICAnbWVkaWF8c3JjJyxcbiAgICAgICdvYmplY3R8Y29kZWJhc2UnLFxuICAgICAgJ29iamVjdHxkYXRhJyxcbiAgICAgICdzY3JpcHR8c3JjJyxcbiAgICBdKTtcbiAgfVxuICByZXR1cm4gX1NFQ1VSSVRZX1NDSEVNQTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJDb250ZXh0KGN0eDogU2VjdXJpdHlDb250ZXh0LCBzcGVjczogc3RyaW5nW10pIHtcbiAgZm9yIChjb25zdCBzcGVjIG9mIHNwZWNzKSBfU0VDVVJJVFlfU0NIRU1BW3NwZWMudG9Mb3dlckNhc2UoKV0gPSBjdHg7XG59XG5cbi8qKlxuICogVGhlIHNldCBvZiBzZWN1cml0eS1zZW5zaXRpdmUgYXR0cmlidXRlcyBvZiBhbiBgPGlmcmFtZT5gIHRoYXQgKm11c3QqIGJlXG4gKiBhcHBsaWVkIGFzIGEgc3RhdGljIGF0dHJpYnV0ZSBvbmx5LiBUaGlzIGVuc3VyZXMgdGhhdCBhbGwgc2VjdXJpdHktc2Vuc2l0aXZlXG4gKiBhdHRyaWJ1dGVzIGFyZSB0YWtlbiBpbnRvIGFjY291bnQgd2hpbGUgY3JlYXRpbmcgYW4gaW5zdGFuY2Ugb2YgYW4gYDxpZnJhbWU+YFxuICogYXQgcnVudGltZS5cbiAqXG4gKiBOb3RlOiBhdm9pZCB1c2luZyB0aGlzIHNldCBkaXJlY3RseSwgdXNlIHRoZSBgaXNJZnJhbWVTZWN1cml0eVNlbnNpdGl2ZUF0dHJgIGZ1bmN0aW9uXG4gKiBpbiB0aGUgY29kZSBpbnN0ZWFkLlxuICovXG5leHBvcnQgY29uc3QgSUZSQU1FX1NFQ1VSSVRZX1NFTlNJVElWRV9BVFRSUyA9XG4gICAgbmV3IFNldChbJ3NhbmRib3gnLCAnYWxsb3cnLCAnYWxsb3dmdWxsc2NyZWVuJywgJ3JlZmVycmVycG9saWN5JywgJ2NzcCcsICdmZXRjaHByaW9yaXR5J10pO1xuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGEgZ2l2ZW4gYXR0cmlidXRlIG5hbWUgbWlnaHQgcmVwcmVzZW50IGEgc2VjdXJpdHktc2Vuc2l0aXZlXG4gKiBhdHRyaWJ1dGUgb2YgYW4gPGlmcmFtZT4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lmcmFtZVNlY3VyaXR5U2Vuc2l0aXZlQXR0cihhdHRyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIC8vIFRoZSBgc2V0QXR0cmlidXRlYCBET00gQVBJIGlzIGNhc2UtaW5zZW5zaXRpdmUsIHNvIHdlIGxvd2VyY2FzZSB0aGUgdmFsdWVcbiAgLy8gYmVmb3JlIGNoZWNraW5nIGl0IGFnYWluc3QgYSBrbm93biBzZWN1cml0eS1zZW5zaXRpdmUgYXR0cmlidXRlcy5cbiAgcmV0dXJuIElGUkFNRV9TRUNVUklUWV9TRU5TSVRJVkVfQVRUUlMuaGFzKGF0dHJOYW1lLnRvTG93ZXJDYXNlKCkpO1xufVxuIl19