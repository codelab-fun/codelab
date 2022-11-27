/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { unwrapHtml } from '../../internals/html_impl';
/** Safely parses a string using the HTML parser. */
export function parseHtml(parser, html) {
    return parseFromString(parser, html, 'text/html');
}
/** Safely parses a string using the HTML or XML parser. */
export function parseFromString(parser, content, contentType) {
    return parser.parseFromString(unwrapHtml(content), contentType);
}
