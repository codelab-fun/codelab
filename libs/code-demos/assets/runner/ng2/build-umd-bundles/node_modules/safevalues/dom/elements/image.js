"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSrc = void 0;
var url_sanitizer_1 = require("../../builders/url_sanitizer");
/**
 * Sets the Src attribute from the given Url.
 */
function setSrc(img, url) {
    var sanitizedUrl = (0, url_sanitizer_1.unwrapUrlOrSanitize)(url);
    if (sanitizedUrl !== undefined) {
        img.src = sanitizedUrl;
    }
}
exports.setSrc = setSrc;
