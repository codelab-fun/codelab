/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { SafeHtml } from '../../internals/html_impl';
/** Safely parses a string using the HTML parser. */
export declare function parseHtml(parser: DOMParser, html: SafeHtml): HTMLDocument;
/** Safely parses a string using the HTML or XML parser. */
export declare function parseFromString(parser: DOMParser, content: SafeHtml, contentType: DOMParserSupportedType): Document;
