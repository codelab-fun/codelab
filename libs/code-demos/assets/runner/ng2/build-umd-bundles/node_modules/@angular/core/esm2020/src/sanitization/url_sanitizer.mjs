/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { XSS_SECURITY_URL } from '../error_details_base_url';
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * This regular expression matches a subset of URLs that will not cause script
 * execution if used in URL context within a HTML document. Specifically, this
 * regular expression matches if (comment from here on and regex copied from
 * Soy's EscapingConventions):
 * (1) Either an allowed protocol (http, https, mailto or ftp).
 * (2) or no protocol.  A protocol must be followed by a colon. The below
 *     allows that by allowing colons only after one of the characters [/?#].
 *     A colon after a hash (#) must be in the fragment.
 *     Otherwise, a colon after a (?) must be in a query.
 *     Otherwise, a colon after a single solidus (/) must be in a path.
 *     Otherwise, a colon after a double solidus (//) must be in the authority
 *     (before port).
 *
 * The pattern disallows &, used in HTML entity declarations before
 * one of the characters in [/?#]. This disallows HTML entities used in the
 * protocol name, which should never happen, e.g. "h&#116;tp" for "http".
 * It also disallows HTML entities in the first path part of a relative path,
 * e.g. "foo&lt;bar/baz".  Our existing escaping functions should not produce
 * that. More importantly, it disallows masking of a colon,
 * e.g. "javascript&#58;...".
 *
 * This regular expression was taken from the Closure sanitization library.
 */
const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
export function _sanitizeUrl(url) {
    url = String(url);
    if (url.match(SAFE_URL_PATTERN))
        return url;
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        console.warn(`WARNING: sanitizing unsafe URL value ${url} (see ${XSS_SECURITY_URL})`);
    }
    return 'unsafe:' + url;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3Nhbml0aXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3Nhbml0aXphdGlvbi91cmxfc2FuaXRpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRyxzRUFBc0UsQ0FBQztBQUVoRyxNQUFNLFVBQVUsWUFBWSxDQUFDLEdBQVc7SUFDdEMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUU1QyxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7UUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsR0FBRyxTQUFTLGdCQUFnQixHQUFHLENBQUMsQ0FBQztLQUN2RjtJQUVELE9BQU8sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7WFNTX1NFQ1VSSVRZX1VSTH0gZnJvbSAnLi4vZXJyb3JfZGV0YWlsc19iYXNlX3VybCc7XG5cbi8qKlxuICogQSBwYXR0ZXJuIHRoYXQgcmVjb2duaXplcyBhIGNvbW1vbmx5IHVzZWZ1bCBzdWJzZXQgb2YgVVJMcyB0aGF0IGFyZSBzYWZlLlxuICpcbiAqIFRoaXMgcmVndWxhciBleHByZXNzaW9uIG1hdGNoZXMgYSBzdWJzZXQgb2YgVVJMcyB0aGF0IHdpbGwgbm90IGNhdXNlIHNjcmlwdFxuICogZXhlY3V0aW9uIGlmIHVzZWQgaW4gVVJMIGNvbnRleHQgd2l0aGluIGEgSFRNTCBkb2N1bWVudC4gU3BlY2lmaWNhbGx5LCB0aGlzXG4gKiByZWd1bGFyIGV4cHJlc3Npb24gbWF0Y2hlcyBpZiAoY29tbWVudCBmcm9tIGhlcmUgb24gYW5kIHJlZ2V4IGNvcGllZCBmcm9tXG4gKiBTb3kncyBFc2NhcGluZ0NvbnZlbnRpb25zKTpcbiAqICgxKSBFaXRoZXIgYW4gYWxsb3dlZCBwcm90b2NvbCAoaHR0cCwgaHR0cHMsIG1haWx0byBvciBmdHApLlxuICogKDIpIG9yIG5vIHByb3RvY29sLiAgQSBwcm90b2NvbCBtdXN0IGJlIGZvbGxvd2VkIGJ5IGEgY29sb24uIFRoZSBiZWxvd1xuICogICAgIGFsbG93cyB0aGF0IGJ5IGFsbG93aW5nIGNvbG9ucyBvbmx5IGFmdGVyIG9uZSBvZiB0aGUgY2hhcmFjdGVycyBbLz8jXS5cbiAqICAgICBBIGNvbG9uIGFmdGVyIGEgaGFzaCAoIykgbXVzdCBiZSBpbiB0aGUgZnJhZ21lbnQuXG4gKiAgICAgT3RoZXJ3aXNlLCBhIGNvbG9uIGFmdGVyIGEgKD8pIG11c3QgYmUgaW4gYSBxdWVyeS5cbiAqICAgICBPdGhlcndpc2UsIGEgY29sb24gYWZ0ZXIgYSBzaW5nbGUgc29saWR1cyAoLykgbXVzdCBiZSBpbiBhIHBhdGguXG4gKiAgICAgT3RoZXJ3aXNlLCBhIGNvbG9uIGFmdGVyIGEgZG91YmxlIHNvbGlkdXMgKC8vKSBtdXN0IGJlIGluIHRoZSBhdXRob3JpdHlcbiAqICAgICAoYmVmb3JlIHBvcnQpLlxuICpcbiAqIFRoZSBwYXR0ZXJuIGRpc2FsbG93cyAmLCB1c2VkIGluIEhUTUwgZW50aXR5IGRlY2xhcmF0aW9ucyBiZWZvcmVcbiAqIG9uZSBvZiB0aGUgY2hhcmFjdGVycyBpbiBbLz8jXS4gVGhpcyBkaXNhbGxvd3MgSFRNTCBlbnRpdGllcyB1c2VkIGluIHRoZVxuICogcHJvdG9jb2wgbmFtZSwgd2hpY2ggc2hvdWxkIG5ldmVyIGhhcHBlbiwgZS5nLiBcImgmIzExNjt0cFwiIGZvciBcImh0dHBcIi5cbiAqIEl0IGFsc28gZGlzYWxsb3dzIEhUTUwgZW50aXRpZXMgaW4gdGhlIGZpcnN0IHBhdGggcGFydCBvZiBhIHJlbGF0aXZlIHBhdGgsXG4gKiBlLmcuIFwiZm9vJmx0O2Jhci9iYXpcIi4gIE91ciBleGlzdGluZyBlc2NhcGluZyBmdW5jdGlvbnMgc2hvdWxkIG5vdCBwcm9kdWNlXG4gKiB0aGF0LiBNb3JlIGltcG9ydGFudGx5LCBpdCBkaXNhbGxvd3MgbWFza2luZyBvZiBhIGNvbG9uLFxuICogZS5nLiBcImphdmFzY3JpcHQmIzU4Oy4uLlwiLlxuICpcbiAqIFRoaXMgcmVndWxhciBleHByZXNzaW9uIHdhcyB0YWtlbiBmcm9tIHRoZSBDbG9zdXJlIHNhbml0aXphdGlvbiBsaWJyYXJ5LlxuICovXG5jb25zdCBTQUZFX1VSTF9QQVRURVJOID0gL14oPzooPzpodHRwcz98bWFpbHRvfGRhdGF8ZnRwfHRlbHxmaWxlfHNtcyk6fFteJjovPyNdKig/OlsvPyNdfCQpKS9naTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9zYW5pdGl6ZVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIHVybCA9IFN0cmluZyh1cmwpO1xuICBpZiAodXJsLm1hdGNoKFNBRkVfVVJMX1BBVFRFUk4pKSByZXR1cm4gdXJsO1xuXG4gIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICBjb25zb2xlLndhcm4oYFdBUk5JTkc6IHNhbml0aXppbmcgdW5zYWZlIFVSTCB2YWx1ZSAke3VybH0gKHNlZSAke1hTU19TRUNVUklUWV9VUkx9KWApO1xuICB9XG5cbiAgcmV0dXJuICd1bnNhZmU6JyArIHVybDtcbn1cbiJdfQ==