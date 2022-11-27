"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributePolicyAction = exports.SanitizerTable = void 0;
/** Class for holding element and attribute policies used for sanitization. */
var SanitizerTable = /** @class */ (function () {
    function SanitizerTable(allowedElements, elementPolicies, allowedGlobalAttributes, globalAttributePolicies) {
        this.allowedElements = allowedElements;
        this.elementPolicies = elementPolicies;
        this.allowedGlobalAttributes = allowedGlobalAttributes;
        this.globalAttributePolicies = globalAttributePolicies;
    }
    SanitizerTable.prototype.isAllowedElement = function (elementName) {
        // Note: `HTMLFormElement`s are always dropped, supporting them is very
        // costly because of the DOM clobberring they can cause. The additional code
        // size required to properly work around DOM clobberring issues is large and
        // shouldn't be put on every user of the sanitizer. Thoroughly review
        // b/210975025 and the CLs linked there before you start allowing form
        // elements.
        return elementName.toLowerCase() !== 'form' &&
            (this.allowedElements.has(elementName) ||
                this.elementPolicies.has(elementName));
    };
    SanitizerTable.prototype.getAttributePolicy = function (attributeName, elementName) {
        var elementPolicy = this.elementPolicies.get(elementName);
        if (elementPolicy === null || elementPolicy === void 0 ? void 0 : elementPolicy.has(attributeName)) {
            return elementPolicy.get(attributeName);
        }
        if (this.allowedGlobalAttributes.has(attributeName)) {
            return { policyAction: AttributePolicyAction.KEEP };
        }
        var globalPolicy = this.globalAttributePolicies.get(attributeName);
        return globalPolicy || { policyAction: AttributePolicyAction.DROP };
    };
    return SanitizerTable;
}());
exports.SanitizerTable = SanitizerTable;
/**
 * Values derived from
 * https://godoc.corp.google.com/pkg/google3/third_party/safehtml/sanitizer/policy#AttributePolicy
 */
var AttributePolicyAction;
(function (AttributePolicyAction) {
    AttributePolicyAction[AttributePolicyAction["DROP"] = 0] = "DROP";
    AttributePolicyAction[AttributePolicyAction["KEEP"] = 1] = "KEEP";
    AttributePolicyAction[AttributePolicyAction["KEEP_AND_SANITIZE_URL"] = 2] = "KEEP_AND_SANITIZE_URL";
    AttributePolicyAction[AttributePolicyAction["KEEP_AND_NORMALIZE"] = 3] = "KEEP_AND_NORMALIZE";
    AttributePolicyAction[AttributePolicyAction["KEEP_AND_SANITIZE_STYLE"] = 4] = "KEEP_AND_SANITIZE_STYLE";
})(AttributePolicyAction = exports.AttributePolicyAction || (exports.AttributePolicyAction = {}));
