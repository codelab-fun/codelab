/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The following set contains all keywords that can be used in the animation css shorthand
 * property and is used during the scoping of keyframes to make sure such keywords
 * are not modified.
 */
const animationKeywords = new Set([
    // global values
    'inherit', 'initial', 'revert', 'unset',
    // animation-direction
    'alternate', 'alternate-reverse', 'normal', 'reverse',
    // animation-fill-mode
    'backwards', 'both', 'forwards', 'none',
    // animation-play-state
    'paused', 'running',
    // animation-timing-function
    'ease', 'ease-in', 'ease-in-out', 'ease-out', 'linear', 'step-start', 'step-end',
    // `steps()` function
    'end', 'jump-both', 'jump-end', 'jump-none', 'jump-start', 'start'
]);
/**
 * The following class is a port of shadowCSS from webcomponents.js to TypeScript.
 *
 * Please make sure to keep to edits in sync with the source file.
 *
 * Source:
 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
 *
 * The original file level comment is reproduced below
 */
/*
  This is a limited shim for ShadowDOM css styling.
  https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#styles

  The intention here is to support only the styling features which can be
  relatively simply implemented. The goal is to allow users to avoid the
  most obvious pitfalls and do so without compromising performance significantly.
  For ShadowDOM styling that's not covered here, a set of best practices
  can be provided that should allow users to accomplish more complex styling.

  The following is a list of specific ShadowDOM styling features and a brief
  discussion of the approach used to shim.

  Shimmed features:

  * :host, :host-context: ShadowDOM allows styling of the shadowRoot's host
  element using the :host rule. To shim this feature, the :host styles are
  reformatted and prefixed with a given scope name and promoted to a
  document level stylesheet.
  For example, given a scope name of .foo, a rule like this:

    :host {
        background: red;
      }
    }

  becomes:

    .foo {
      background: red;
    }

  * encapsulation: Styles defined within ShadowDOM, apply only to
  dom inside the ShadowDOM. Polymer uses one of two techniques to implement
  this feature.

  By default, rules are prefixed with the host element tag name
  as a descendant selector. This ensures styling does not leak out of the 'top'
  of the element's ShadowDOM. For example,

  div {
      font-weight: bold;
    }

  becomes:

  x-foo div {
      font-weight: bold;
    }

  becomes:


  Alternatively, if WebComponents.ShadowCSS.strictStyling is set to true then
  selectors are scoped by adding an attribute selector suffix to each
  simple selector that contains the host element tag name. Each element
  in the element's ShadowDOM template is also given the scope attribute.
  Thus, these rules match only elements that have the scope attribute.
  For example, given a scope name of x-foo, a rule like this:

    div {
      font-weight: bold;
    }

  becomes:

    div[x-foo] {
      font-weight: bold;
    }

  Note that elements that are dynamically added to a scope must have the scope
  selector added to them manually.

  * upper/lower bound encapsulation: Styles which are defined outside a
  shadowRoot should not cross the ShadowDOM boundary and should not apply
  inside a shadowRoot.

  This styling behavior is not emulated. Some possible ways to do this that
  were rejected due to complexity and/or performance concerns include: (1) reset
  every possible property for every possible selector for a given scope name;
  (2) re-implement css in javascript.

  As an alternative, users should make sure to use selectors
  specific to the scope in which they are working.

  * ::distributed: This behavior is not emulated. It's often not necessary
  to style the contents of a specific insertion point and instead, descendants
  of the host element can be styled selectively. Users can also create an
  extra node around an insertion point and style that node's contents
  via descendent selectors. For example, with a shadowRoot like this:

    <style>
      ::content(div) {
        background: red;
      }
    </style>
    <content></content>

  could become:

    <style>
      / *@polyfill .content-container div * /
      ::content(div) {
        background: red;
      }
    </style>
    <div class="content-container">
      <content></content>
    </div>

  Note the use of @polyfill in the comment above a ShadowDOM specific style
  declaration. This is a directive to the styling shim to use the selector
  in comments in lieu of the next selector when running under polyfill.
*/
export class ShadowCss {
    constructor() {
        this.strictStyling = true;
        /**
         * Regular expression used to extrapolate the possible keyframes from an
         * animation declaration (with possibly multiple animation definitions)
         *
         * The regular expression can be divided in three parts
         *  - (^|\s+)
         *    simply captures how many (if any) leading whitespaces are present
         *  - (?:(?:(['"])((?:\\\\|\\\2|(?!\2).)+)\2)|(-?[A-Za-z][\w\-]*))
         *    captures two different possible keyframes, ones which are quoted or ones which are valid css
         * idents (custom properties excluded)
         *  - (?=[,\s;]|$)
         *    simply matches the end of the possible keyframe, valid endings are: a comma, a space, a
         * semicolon or the end of the string
         */
        this._animationDeclarationKeyframesRe = /(^|\s+)(?:(?:(['"])((?:\\\\|\\\2|(?!\2).)+)\2)|(-?[A-Za-z][\w\-]*))(?=[,\s]|$)/g;
    }
    /*
     * Shim some cssText with the given selector. Returns cssText that can
     * be included in the document via WebComponents.ShadowCSS.addCssToDocument(css).
     *
     * When strictStyling is true:
     * - selector is the attribute added to all elements inside the host,
     * - hostSelector is the attribute added to the host itself.
     */
    shimCssText(cssText, selector, hostSelector = '') {
        const commentsWithHash = extractCommentsWithHash(cssText);
        cssText = stripComments(cssText);
        cssText = this._insertDirectives(cssText);
        const scopedCssText = this._scopeCssText(cssText, selector, hostSelector);
        return [scopedCssText, ...commentsWithHash].join('\n');
    }
    _insertDirectives(cssText) {
        cssText = this._insertPolyfillDirectivesInCssText(cssText);
        return this._insertPolyfillRulesInCssText(cssText);
    }
    /**
     * Process styles to add scope to keyframes.
     *
     * Modify both the names of the keyframes defined in the component styles and also the css
     * animation rules using them.
     *
     * Animation rules using keyframes defined elsewhere are not modified to allow for globally
     * defined keyframes.
     *
     * For example, we convert this css:
     *
     * ```
     * .box {
     *   animation: box-animation 1s forwards;
     * }
     *
     * @keyframes box-animation {
     *   to {
     *     background-color: green;
     *   }
     * }
     * ```
     *
     * to this:
     *
     * ```
     * .box {
     *   animation: scopeName_box-animation 1s forwards;
     * }
     *
     * @keyframes scopeName_box-animation {
     *   to {
     *     background-color: green;
     *   }
     * }
     * ```
     *
     * @param cssText the component's css text that needs to be scoped.
     * @param scopeSelector the component's scope selector.
     *
     * @returns the scoped css text.
     */
    _scopeKeyframesRelatedCss(cssText, scopeSelector) {
        const unscopedKeyframesSet = new Set();
        const scopedKeyframesCssText = processRules(cssText, rule => this._scopeLocalKeyframeDeclarations(rule, scopeSelector, unscopedKeyframesSet));
        return processRules(scopedKeyframesCssText, rule => this._scopeAnimationRule(rule, scopeSelector, unscopedKeyframesSet));
    }
    /**
     * Scopes local keyframes names, returning the updated css rule and it also
     * adds the original keyframe name to a provided set to collect all keyframes names
     * so that it can later be used to scope the animation rules.
     *
     * For example, it takes a rule such as:
     *
     * ```
     * @keyframes box-animation {
     *   to {
     *     background-color: green;
     *   }
     * }
     * ```
     *
     * and returns:
     *
     * ```
     * @keyframes scopeName_box-animation {
     *   to {
     *     background-color: green;
     *   }
     * }
     * ```
     * and as a side effect it adds "box-animation" to the `unscopedKeyframesSet` set
     *
     * @param cssRule the css rule to process.
     * @param scopeSelector the component's scope selector.
     * @param unscopedKeyframesSet the set of unscoped keyframes names (which can be
     * modified as a side effect)
     *
     * @returns the css rule modified with the scoped keyframes name.
     */
    _scopeLocalKeyframeDeclarations(rule, scopeSelector, unscopedKeyframesSet) {
        return {
            ...rule,
            selector: rule.selector.replace(/(^@(?:-webkit-)?keyframes(?:\s+))(['"]?)(.+)\2(\s*)$/, (_, start, quote, keyframeName, endSpaces) => {
                unscopedKeyframesSet.add(unescapeQuotes(keyframeName, quote));
                return `${start}${quote}${scopeSelector}_${keyframeName}${quote}${endSpaces}`;
            }),
        };
    }
    /**
     * Function used to scope a keyframes name (obtained from an animation declaration)
     * using an existing set of unscopedKeyframes names to discern if the scoping needs to be
     * performed (keyframes names of keyframes not defined in the component's css need not to be
     * scoped).
     *
     * @param keyframe the keyframes name to check.
     * @param scopeSelector the component's scope selector.
     * @param unscopedKeyframesSet the set of unscoped keyframes names.
     *
     * @returns the scoped name of the keyframe, or the original name is the name need not to be
     * scoped.
     */
    _scopeAnimationKeyframe(keyframe, scopeSelector, unscopedKeyframesSet) {
        return keyframe.replace(/^(\s*)(['"]?)(.+?)\2(\s*)$/, (_, spaces1, quote, name, spaces2) => {
            name = `${unscopedKeyframesSet.has(unescapeQuotes(name, quote)) ? scopeSelector + '_' : ''}${name}`;
            return `${spaces1}${quote}${name}${quote}${spaces2}`;
        });
    }
    /**
     * Scope an animation rule so that the keyframes mentioned in such rule
     * are scoped if defined in the component's css and left untouched otherwise.
     *
     * It can scope values of both the 'animation' and 'animation-name' properties.
     *
     * @param rule css rule to scope.
     * @param scopeSelector the component's scope selector.
     * @param unscopedKeyframesSet the set of unscoped keyframes names.
     *
     * @returns the updated css rule.
     **/
    _scopeAnimationRule(rule, scopeSelector, unscopedKeyframesSet) {
        let content = rule.content.replace(/((?:^|\s+|;)(?:-webkit-)?animation(?:\s*):(?:\s*))([^;]+)/g, (_, start, animationDeclarations) => start +
            animationDeclarations.replace(this._animationDeclarationKeyframesRe, (original, leadingSpaces, quote = '', quotedName, nonQuotedName) => {
                if (quotedName) {
                    return `${leadingSpaces}${this._scopeAnimationKeyframe(`${quote}${quotedName}${quote}`, scopeSelector, unscopedKeyframesSet)}`;
                }
                else {
                    return animationKeywords.has(nonQuotedName) ?
                        original :
                        `${leadingSpaces}${this._scopeAnimationKeyframe(nonQuotedName, scopeSelector, unscopedKeyframesSet)}`;
                }
            }));
        content = content.replace(/((?:^|\s+|;)(?:-webkit-)?animation-name(?:\s*):(?:\s*))([^;]+)/g, (_match, start, commaSeparatedKeyframes) => `${start}${commaSeparatedKeyframes.split(',')
            .map((keyframe) => this._scopeAnimationKeyframe(keyframe, scopeSelector, unscopedKeyframesSet))
            .join(',')}`);
        return { ...rule, content };
    }
    /*
     * Process styles to convert native ShadowDOM rules that will trip
     * up the css parser; we rely on decorating the stylesheet with inert rules.
     *
     * For example, we convert this rule:
     *
     * polyfill-next-selector { content: ':host menu-item'; }
     * ::content menu-item {
     *
     * to this:
     *
     * scopeName menu-item {
     *
     **/
    _insertPolyfillDirectivesInCssText(cssText) {
        // Difference with webcomponents.js: does not handle comments
        return cssText.replace(_cssContentNextSelectorRe, function (...m) {
            return m[2] + '{';
        });
    }
    /*
     * Process styles to add rules which will only apply under the polyfill
     *
     * For example, we convert this rule:
     *
     * polyfill-rule {
     *   content: ':host menu-item';
     * ...
     * }
     *
     * to this:
     *
     * scopeName menu-item {...}
     *
     **/
    _insertPolyfillRulesInCssText(cssText) {
        // Difference with webcomponents.js: does not handle comments
        return cssText.replace(_cssContentRuleRe, (...m) => {
            const rule = m[0].replace(m[1], '').replace(m[2], '');
            return m[4] + rule;
        });
    }
    /* Ensure styles are scoped. Pseudo-scoping takes a rule like:
     *
     *  .foo {... }
     *
     *  and converts this to
     *
     *  scopeName .foo { ... }
     */
    _scopeCssText(cssText, scopeSelector, hostSelector) {
        const unscopedRules = this._extractUnscopedRulesFromCssText(cssText);
        // replace :host and :host-context -shadowcsshost and -shadowcsshost respectively
        cssText = this._insertPolyfillHostInCssText(cssText);
        cssText = this._convertColonHost(cssText);
        cssText = this._convertColonHostContext(cssText);
        cssText = this._convertShadowDOMSelectors(cssText);
        if (scopeSelector) {
            cssText = this._scopeKeyframesRelatedCss(cssText, scopeSelector);
            cssText = this._scopeSelectors(cssText, scopeSelector, hostSelector);
        }
        cssText = cssText + '\n' + unscopedRules;
        return cssText.trim();
    }
    /*
     * Process styles to add rules which will only apply under the polyfill
     * and do not process via CSSOM. (CSSOM is destructive to rules on rare
     * occasions, e.g. -webkit-calc on Safari.)
     * For example, we convert this rule:
     *
     * @polyfill-unscoped-rule {
     *   content: 'menu-item';
     * ... }
     *
     * to this:
     *
     * menu-item {...}
     *
     **/
    _extractUnscopedRulesFromCssText(cssText) {
        // Difference with webcomponents.js: does not handle comments
        let r = '';
        let m;
        _cssContentUnscopedRuleRe.lastIndex = 0;
        while ((m = _cssContentUnscopedRuleRe.exec(cssText)) !== null) {
            const rule = m[0].replace(m[2], '').replace(m[1], m[4]);
            r += rule + '\n\n';
        }
        return r;
    }
    /*
     * convert a rule like :host(.foo) > .bar { }
     *
     * to
     *
     * .foo<scopeName> > .bar
     */
    _convertColonHost(cssText) {
        return cssText.replace(_cssColonHostRe, (_, hostSelectors, otherSelectors) => {
            if (hostSelectors) {
                const convertedSelectors = [];
                const hostSelectorArray = hostSelectors.split(',').map(p => p.trim());
                for (const hostSelector of hostSelectorArray) {
                    if (!hostSelector)
                        break;
                    const convertedSelector = _polyfillHostNoCombinator + hostSelector.replace(_polyfillHost, '') + otherSelectors;
                    convertedSelectors.push(convertedSelector);
                }
                return convertedSelectors.join(',');
            }
            else {
                return _polyfillHostNoCombinator + otherSelectors;
            }
        });
    }
    /*
     * convert a rule like :host-context(.foo) > .bar { }
     *
     * to
     *
     * .foo<scopeName> > .bar, .foo <scopeName> > .bar { }
     *
     * and
     *
     * :host-context(.foo:host) .bar { ... }
     *
     * to
     *
     * .foo<scopeName> .bar { ... }
     */
    _convertColonHostContext(cssText) {
        return cssText.replace(_cssColonHostContextReGlobal, selectorText => {
            // We have captured a selector that contains a `:host-context` rule.
            // For backward compatibility `:host-context` may contain a comma separated list of selectors.
            // Each context selector group will contain a list of host-context selectors that must match
            // an ancestor of the host.
            // (Normally `contextSelectorGroups` will only contain a single array of context selectors.)
            const contextSelectorGroups = [[]];
            // There may be more than `:host-context` in this selector so `selectorText` could look like:
            // `:host-context(.one):host-context(.two)`.
            // Execute `_cssColonHostContextRe` over and over until we have extracted all the
            // `:host-context` selectors from this selector.
            let match;
            while (match = _cssColonHostContextRe.exec(selectorText)) {
                // `match` = [':host-context(<selectors>)<rest>', <selectors>, <rest>]
                // The `<selectors>` could actually be a comma separated list: `:host-context(.one, .two)`.
                const newContextSelectors = (match[1] ?? '').trim().split(',').map(m => m.trim()).filter(m => m !== '');
                // We must duplicate the current selector group for each of these new selectors.
                // For example if the current groups are:
                // ```
                // [
                //   ['a', 'b', 'c'],
                //   ['x', 'y', 'z'],
                // ]
                // ```
                // And we have a new set of comma separated selectors: `:host-context(m,n)` then the new
                // groups are:
                // ```
                // [
                //   ['a', 'b', 'c', 'm'],
                //   ['x', 'y', 'z', 'm'],
                //   ['a', 'b', 'c', 'n'],
                //   ['x', 'y', 'z', 'n'],
                // ]
                // ```
                const contextSelectorGroupsLength = contextSelectorGroups.length;
                repeatGroups(contextSelectorGroups, newContextSelectors.length);
                for (let i = 0; i < newContextSelectors.length; i++) {
                    for (let j = 0; j < contextSelectorGroupsLength; j++) {
                        contextSelectorGroups[j + (i * contextSelectorGroupsLength)].push(newContextSelectors[i]);
                    }
                }
                // Update the `selectorText` and see repeat to see if there are more `:host-context`s.
                selectorText = match[2];
            }
            // The context selectors now must be combined with each other to capture all the possible
            // selectors that `:host-context` can match. See `combineHostContextSelectors()` for more
            // info about how this is done.
            return contextSelectorGroups
                .map(contextSelectors => combineHostContextSelectors(contextSelectors, selectorText))
                .join(', ');
        });
    }
    /*
     * Convert combinators like ::shadow and pseudo-elements like ::content
     * by replacing with space.
     */
    _convertShadowDOMSelectors(cssText) {
        return _shadowDOMSelectorsRe.reduce((result, pattern) => result.replace(pattern, ' '), cssText);
    }
    // change a selector like 'div' to 'name div'
    _scopeSelectors(cssText, scopeSelector, hostSelector) {
        return processRules(cssText, (rule) => {
            let selector = rule.selector;
            let content = rule.content;
            if (rule.selector[0] !== '@') {
                selector =
                    this._scopeSelector(rule.selector, scopeSelector, hostSelector, this.strictStyling);
            }
            else if (rule.selector.startsWith('@media') || rule.selector.startsWith('@supports') ||
                rule.selector.startsWith('@document') || rule.selector.startsWith('@layer')) {
                content = this._scopeSelectors(rule.content, scopeSelector, hostSelector);
            }
            else if (rule.selector.startsWith('@font-face') || rule.selector.startsWith('@page')) {
                content = this._stripScopingSelectors(rule.content);
            }
            return new CssRule(selector, content);
        });
    }
    /**
     * Handle a css text that is within a rule that should not contain scope selectors by simply
     * removing them! An example of such a rule is `@font-face`.
     *
     * `@font-face` rules cannot contain nested selectors. Nor can they be nested under a selector.
     * Normally this would be a syntax error by the author of the styles. But in some rare cases, such
     * as importing styles from a library, and applying `:host ::ng-deep` to the imported styles, we
     * can end up with broken css if the imported styles happen to contain @font-face rules.
     *
     * For example:
     *
     * ```
     * :host ::ng-deep {
     *   import 'some/lib/containing/font-face';
     * }
     *
     * Similar logic applies to `@page` rules which can contain a particular set of properties,
     * as well as some specific at-rules. Since they can't be encapsulated, we have to strip
     * any scoping selectors from them. For more information: https://www.w3.org/TR/css-page-3
     * ```
     */
    _stripScopingSelectors(cssText) {
        return processRules(cssText, rule => {
            const selector = rule.selector.replace(_shadowDeepSelectors, ' ')
                .replace(_polyfillHostNoCombinatorRe, ' ');
            return new CssRule(selector, rule.content);
        });
    }
    _scopeSelector(selector, scopeSelector, hostSelector, strict) {
        return selector.split(',')
            .map(part => part.trim().split(_shadowDeepSelectors))
            .map((deepParts) => {
            const [shallowPart, ...otherParts] = deepParts;
            const applyScope = (shallowPart) => {
                if (this._selectorNeedsScoping(shallowPart, scopeSelector)) {
                    return strict ?
                        this._applyStrictSelectorScope(shallowPart, scopeSelector, hostSelector) :
                        this._applySelectorScope(shallowPart, scopeSelector, hostSelector);
                }
                else {
                    return shallowPart;
                }
            };
            return [applyScope(shallowPart), ...otherParts].join(' ');
        })
            .join(', ');
    }
    _selectorNeedsScoping(selector, scopeSelector) {
        const re = this._makeScopeMatcher(scopeSelector);
        return !re.test(selector);
    }
    _makeScopeMatcher(scopeSelector) {
        const lre = /\[/g;
        const rre = /\]/g;
        scopeSelector = scopeSelector.replace(lre, '\\[').replace(rre, '\\]');
        return new RegExp('^(' + scopeSelector + ')' + _selectorReSuffix, 'm');
    }
    _applySelectorScope(selector, scopeSelector, hostSelector) {
        // Difference from webcomponents.js: scopeSelector could not be an array
        return this._applySimpleSelectorScope(selector, scopeSelector, hostSelector);
    }
    // scope via name and [is=name]
    _applySimpleSelectorScope(selector, scopeSelector, hostSelector) {
        // In Android browser, the lastIndex is not reset when the regex is used in String.replace()
        _polyfillHostRe.lastIndex = 0;
        if (_polyfillHostRe.test(selector)) {
            const replaceBy = this.strictStyling ? `[${hostSelector}]` : scopeSelector;
            return selector
                .replace(_polyfillHostNoCombinatorRe, (hnc, selector) => {
                return selector.replace(/([^:]*)(:*)(.*)/, (_, before, colon, after) => {
                    return before + replaceBy + colon + after;
                });
            })
                .replace(_polyfillHostRe, replaceBy + ' ');
        }
        return scopeSelector + ' ' + selector;
    }
    // return a selector with [name] suffix on each simple selector
    // e.g. .foo.bar > .zot becomes .foo[name].bar[name] > .zot[name]  /** @internal */
    _applyStrictSelectorScope(selector, scopeSelector, hostSelector) {
        const isRe = /\[is=([^\]]*)\]/g;
        scopeSelector = scopeSelector.replace(isRe, (_, ...parts) => parts[0]);
        const attrName = '[' + scopeSelector + ']';
        const _scopeSelectorPart = (p) => {
            let scopedP = p.trim();
            if (!scopedP) {
                return '';
            }
            if (p.indexOf(_polyfillHostNoCombinator) > -1) {
                scopedP = this._applySimpleSelectorScope(p, scopeSelector, hostSelector);
            }
            else {
                // remove :host since it should be unnecessary
                const t = p.replace(_polyfillHostRe, '');
                if (t.length > 0) {
                    const matches = t.match(/([^:]*)(:*)(.*)/);
                    if (matches) {
                        scopedP = matches[1] + attrName + matches[2] + matches[3];
                    }
                }
            }
            return scopedP;
        };
        const safeContent = new SafeSelector(selector);
        selector = safeContent.content();
        let scopedSelector = '';
        let startIndex = 0;
        let res;
        const sep = /( |>|\+|~(?!=))\s*/g;
        // If a selector appears before :host it should not be shimmed as it
        // matches on ancestor elements and not on elements in the host's shadow
        // `:host-context(div)` is transformed to
        // `-shadowcsshost-no-combinatordiv, div -shadowcsshost-no-combinator`
        // the `div` is not part of the component in the 2nd selectors and should not be scoped.
        // Historically `component-tag:host` was matching the component so we also want to preserve
        // this behavior to avoid breaking legacy apps (it should not match).
        // The behavior should be:
        // - `tag:host` -> `tag[h]` (this is to avoid breaking legacy apps, should not match anything)
        // - `tag :host` -> `tag [h]` (`tag` is not scoped because it's considered part of a
        //   `:host-context(tag)`)
        const hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1;
        // Only scope parts after the first `-shadowcsshost-no-combinator` when it is present
        let shouldScope = !hasHost;
        while ((res = sep.exec(selector)) !== null) {
            const separator = res[1];
            const part = selector.slice(startIndex, res.index).trim();
            shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
            const scopedPart = shouldScope ? _scopeSelectorPart(part) : part;
            scopedSelector += `${scopedPart} ${separator} `;
            startIndex = sep.lastIndex;
        }
        const part = selector.substring(startIndex);
        shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
        scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
        // replace the placeholders with their original values
        return safeContent.restore(scopedSelector);
    }
    _insertPolyfillHostInCssText(selector) {
        return selector.replace(_colonHostContextRe, _polyfillHostContext)
            .replace(_colonHostRe, _polyfillHost);
    }
}
class SafeSelector {
    constructor(selector) {
        this.placeholders = [];
        this.index = 0;
        // Replaces attribute selectors with placeholders.
        // The WS in [attr="va lue"] would otherwise be interpreted as a selector separator.
        selector = this._escapeRegexMatches(selector, /(\[[^\]]*\])/g);
        // CSS allows for certain special characters to be used in selectors if they're escaped.
        // E.g. `.foo:blue` won't match a class called `foo:blue`, because the colon denotes a
        // pseudo-class, but writing `.foo\:blue` will match, because the colon was escaped.
        // Replace all escape sequences (`\` followed by a character) with a placeholder so
        // that our handling of pseudo-selectors doesn't mess with them.
        selector = this._escapeRegexMatches(selector, /(\\.)/g);
        // Replaces the expression in `:nth-child(2n + 1)` with a placeholder.
        // WS and "+" would otherwise be interpreted as selector separators.
        this._content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, (_, pseudo, exp) => {
            const replaceBy = `__ph-${this.index}__`;
            this.placeholders.push(exp);
            this.index++;
            return pseudo + replaceBy;
        });
    }
    restore(content) {
        return content.replace(/__ph-(\d+)__/g, (_ph, index) => this.placeholders[+index]);
    }
    content() {
        return this._content;
    }
    /**
     * Replaces all of the substrings that match a regex within a
     * special string (e.g. `__ph-0__`, `__ph-1__`, etc).
     */
    _escapeRegexMatches(content, pattern) {
        return content.replace(pattern, (_, keep) => {
            const replaceBy = `__ph-${this.index}__`;
            this.placeholders.push(keep);
            this.index++;
            return replaceBy;
        });
    }
}
const _cssContentNextSelectorRe = /polyfill-next-selector[^}]*content:[\s]*?(['"])(.*?)\1[;\s]*}([^{]*?){/gim;
const _cssContentRuleRe = /(polyfill-rule)[^}]*(content:[\s]*(['"])(.*?)\3)[;\s]*[^}]*}/gim;
const _cssContentUnscopedRuleRe = /(polyfill-unscoped-rule)[^}]*(content:[\s]*(['"])(.*?)\3)[;\s]*[^}]*}/gim;
const _polyfillHost = '-shadowcsshost';
// note: :host-context pre-processed to -shadowcsshostcontext.
const _polyfillHostContext = '-shadowcsscontext';
const _parenSuffix = '(?:\\((' +
    '(?:\\([^)(]*\\)|[^)(]*)+?' +
    ')\\))?([^,{]*)';
const _cssColonHostRe = new RegExp(_polyfillHost + _parenSuffix, 'gim');
const _cssColonHostContextReGlobal = new RegExp(_polyfillHostContext + _parenSuffix, 'gim');
const _cssColonHostContextRe = new RegExp(_polyfillHostContext + _parenSuffix, 'im');
const _polyfillHostNoCombinator = _polyfillHost + '-no-combinator';
const _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
const _shadowDOMSelectorsRe = [
    /::shadow/g,
    /::content/g,
    // Deprecated selectors
    /\/shadow-deep\//g,
    /\/shadow\//g,
];
// The deep combinator is deprecated in the CSS spec
// Support for `>>>`, `deep`, `::ng-deep` is then also deprecated and will be removed in the future.
// see https://github.com/angular/angular/pull/17677
const _shadowDeepSelectors = /(?:>>>)|(?:\/deep\/)|(?:::ng-deep)/g;
const _selectorReSuffix = '([>\\s~+[.,{:][\\s\\S]*)?$';
const _polyfillHostRe = /-shadowcsshost/gim;
const _colonHostRe = /:host/gim;
const _colonHostContextRe = /:host-context/gim;
const _commentRe = /\/\*[\s\S]*?\*\//g;
function stripComments(input) {
    return input.replace(_commentRe, '');
}
const _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;
function extractCommentsWithHash(input) {
    return input.match(_commentWithHashRe) || [];
}
const BLOCK_PLACEHOLDER = '%BLOCK%';
const _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
const CONTENT_PAIRS = new Map([['{', '}']]);
const COMMA_IN_PLACEHOLDER = '%COMMA_IN_PLACEHOLDER%';
const SEMI_IN_PLACEHOLDER = '%SEMI_IN_PLACEHOLDER%';
const COLON_IN_PLACEHOLDER = '%COLON_IN_PLACEHOLDER%';
const _cssCommaInPlaceholderReGlobal = new RegExp(COMMA_IN_PLACEHOLDER, 'g');
const _cssSemiInPlaceholderReGlobal = new RegExp(SEMI_IN_PLACEHOLDER, 'g');
const _cssColonInPlaceholderReGlobal = new RegExp(COLON_IN_PLACEHOLDER, 'g');
export class CssRule {
    constructor(selector, content) {
        this.selector = selector;
        this.content = content;
    }
}
export function processRules(input, ruleCallback) {
    const escaped = escapeInStrings(input);
    const inputWithEscapedBlocks = escapeBlocks(escaped, CONTENT_PAIRS, BLOCK_PLACEHOLDER);
    let nextBlockIndex = 0;
    const escapedResult = inputWithEscapedBlocks.escapedString.replace(_ruleRe, (...m) => {
        const selector = m[2];
        let content = '';
        let suffix = m[4];
        let contentPrefix = '';
        if (suffix && suffix.startsWith('{' + BLOCK_PLACEHOLDER)) {
            content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
            suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
            contentPrefix = '{';
        }
        const rule = ruleCallback(new CssRule(selector, content));
        return `${m[1]}${rule.selector}${m[3]}${contentPrefix}${rule.content}${suffix}`;
    });
    return unescapeInStrings(escapedResult);
}
class StringWithEscapedBlocks {
    constructor(escapedString, blocks) {
        this.escapedString = escapedString;
        this.blocks = blocks;
    }
}
function escapeBlocks(input, charPairs, placeholder) {
    const resultParts = [];
    const escapedBlocks = [];
    let openCharCount = 0;
    let nonBlockStartIndex = 0;
    let blockStartIndex = -1;
    let openChar;
    let closeChar;
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (char === '\\') {
            i++;
        }
        else if (char === closeChar) {
            openCharCount--;
            if (openCharCount === 0) {
                escapedBlocks.push(input.substring(blockStartIndex, i));
                resultParts.push(placeholder);
                nonBlockStartIndex = i;
                blockStartIndex = -1;
                openChar = closeChar = undefined;
            }
        }
        else if (char === openChar) {
            openCharCount++;
        }
        else if (openCharCount === 0 && charPairs.has(char)) {
            openChar = char;
            closeChar = charPairs.get(char);
            openCharCount = 1;
            blockStartIndex = i + 1;
            resultParts.push(input.substring(nonBlockStartIndex, blockStartIndex));
        }
    }
    if (blockStartIndex !== -1) {
        escapedBlocks.push(input.substring(blockStartIndex));
        resultParts.push(placeholder);
    }
    else {
        resultParts.push(input.substring(nonBlockStartIndex));
    }
    return new StringWithEscapedBlocks(resultParts.join(''), escapedBlocks);
}
/**
 * Object containing as keys characters that should be substituted by placeholders
 * when found in strings during the css text parsing, and as values the respective
 * placeholders
 */
const ESCAPE_IN_STRING_MAP = {
    ';': SEMI_IN_PLACEHOLDER,
    ',': COMMA_IN_PLACEHOLDER,
    ':': COLON_IN_PLACEHOLDER
};
/**
 * Parse the provided css text and inside strings (meaning, inside pairs of unescaped single or
 * double quotes) replace specific characters with their respective placeholders as indicated
 * by the `ESCAPE_IN_STRING_MAP` map.
 *
 * For example convert the text
 *  `animation: "my-anim:at\"ion" 1s;`
 * to
 *  `animation: "my-anim%COLON_IN_PLACEHOLDER%at\"ion" 1s;`
 *
 * This is necessary in order to remove the meaning of some characters when found inside strings
 * (for example `;` indicates the end of a css declaration, `,` the sequence of values and `:` the
 * division between property and value during a declaration, none of these meanings apply when such
 * characters are within strings and so in order to prevent parsing issues they need to be replaced
 * with placeholder text for the duration of the css manipulation process).
 *
 * @param input the original css text.
 *
 * @returns the css text with specific characters in strings replaced by placeholders.
 **/
function escapeInStrings(input) {
    let result = input;
    let currentQuoteChar = null;
    for (let i = 0; i < result.length; i++) {
        const char = result[i];
        if (char === '\\') {
            i++;
        }
        else {
            if (currentQuoteChar !== null) {
                // index i is inside a quoted sub-string
                if (char === currentQuoteChar) {
                    currentQuoteChar = null;
                }
                else {
                    const placeholder = ESCAPE_IN_STRING_MAP[char];
                    if (placeholder) {
                        result = `${result.substr(0, i)}${placeholder}${result.substr(i + 1)}`;
                        i += placeholder.length - 1;
                    }
                }
            }
            else if (char === '\'' || char === '"') {
                currentQuoteChar = char;
            }
        }
    }
    return result;
}
/**
 * Replace in a string all occurrences of keys in the `ESCAPE_IN_STRING_MAP` map with their
 * original representation, this is simply used to revert the changes applied by the
 * escapeInStrings function.
 *
 * For example it reverts the text:
 *  `animation: "my-anim%COLON_IN_PLACEHOLDER%at\"ion" 1s;`
 * to it's original form of:
 *  `animation: "my-anim:at\"ion" 1s;`
 *
 * Note: For the sake of simplicity this function does not check that the placeholders are
 * actually inside strings as it would anyway be extremely unlikely to find them outside of strings.
 *
 * @param input the css text containing the placeholders.
 *
 * @returns the css text without the placeholders.
 */
function unescapeInStrings(input) {
    let result = input.replace(_cssCommaInPlaceholderReGlobal, ',');
    result = result.replace(_cssSemiInPlaceholderReGlobal, ';');
    result = result.replace(_cssColonInPlaceholderReGlobal, ':');
    return result;
}
/**
 * Unescape all quotes present in a string, but only if the string was actually already
 * quoted.
 *
 * This generates a "canonical" representation of strings which can be used to match strings
 * which would otherwise only differ because of differently escaped quotes.
 *
 * For example it converts the string (assumed to be quoted):
 *  `this \\"is\\" a \\'\\\\'test`
 * to:
 *  `this "is" a '\\\\'test`
 * (note that the latter backslashes are not removed as they are not actually escaping the single
 * quote)
 *
 *
 * @param input the string possibly containing escaped quotes.
 * @param isQuoted boolean indicating whether the string was quoted inside a bigger string (if not
 * then it means that it doesn't represent an inner string and thus no unescaping is required)
 *
 * @returns the string in the "canonical" representation without escaped quotes.
 */
function unescapeQuotes(str, isQuoted) {
    return !isQuoted ? str : str.replace(/((?:^|[^\\])(?:\\\\)*)\\(?=['"])/g, '$1');
}
/**
 * Combine the `contextSelectors` with the `hostMarker` and the `otherSelectors`
 * to create a selector that matches the same as `:host-context()`.
 *
 * Given a single context selector `A` we need to output selectors that match on the host and as an
 * ancestor of the host:
 *
 * ```
 * A <hostMarker>, A<hostMarker> {}
 * ```
 *
 * When there is more than one context selector we also have to create combinations of those
 * selectors with each other. For example if there are `A` and `B` selectors the output is:
 *
 * ```
 * AB<hostMarker>, AB <hostMarker>, A B<hostMarker>,
 * B A<hostMarker>, A B <hostMarker>, B A <hostMarker> {}
 * ```
 *
 * And so on...
 *
 * @param hostMarker the string that selects the host element.
 * @param contextSelectors an array of context selectors that will be combined.
 * @param otherSelectors the rest of the selectors that are not context selectors.
 */
function combineHostContextSelectors(contextSelectors, otherSelectors) {
    const hostMarker = _polyfillHostNoCombinator;
    _polyfillHostRe.lastIndex = 0; // reset the regex to ensure we get an accurate test
    const otherSelectorsHasHost = _polyfillHostRe.test(otherSelectors);
    // If there are no context selectors then just output a host marker
    if (contextSelectors.length === 0) {
        return hostMarker + otherSelectors;
    }
    const combined = [contextSelectors.pop() || ''];
    while (contextSelectors.length > 0) {
        const length = combined.length;
        const contextSelector = contextSelectors.pop();
        for (let i = 0; i < length; i++) {
            const previousSelectors = combined[i];
            // Add the new selector as a descendant of the previous selectors
            combined[length * 2 + i] = previousSelectors + ' ' + contextSelector;
            // Add the new selector as an ancestor of the previous selectors
            combined[length + i] = contextSelector + ' ' + previousSelectors;
            // Add the new selector to act on the same element as the previous selectors
            combined[i] = contextSelector + previousSelectors;
        }
    }
    // Finally connect the selector to the `hostMarker`s: either acting directly on the host
    // (A<hostMarker>) or as an ancestor (A <hostMarker>).
    return combined
        .map(s => otherSelectorsHasHost ?
        `${s}${otherSelectors}` :
        `${s}${hostMarker}${otherSelectors}, ${s} ${hostMarker}${otherSelectors}`)
        .join(',');
}
/**
 * Mutate the given `groups` array so that there are `multiples` clones of the original array
 * stored.
 *
 * For example `repeatGroups([a, b], 3)` will result in `[a, b, a, b, a, b]` - but importantly the
 * newly added groups will be clones of the original.
 *
 * @param groups An array of groups of strings that will be repeated. This array is mutated
 *     in-place.
 * @param multiples The number of times the current groups should appear.
 */
export function repeatGroups(groups, multiples) {
    const length = groups.length;
    for (let i = 1; i < multiples; i++) {
        for (let j = 0; j < length; j++) {
            groups[j + (i * length)] = groups[j].slice(0);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZG93X2Nzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9zaGFkb3dfY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIOzs7O0dBSUc7QUFDSCxNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxDQUFDO0lBQ2hDLGdCQUFnQjtJQUNoQixTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPO0lBQ3ZDLHNCQUFzQjtJQUN0QixXQUFXLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLFNBQVM7SUFDckQsc0JBQXNCO0lBQ3RCLFdBQVcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU07SUFDdkMsdUJBQXVCO0lBQ3ZCLFFBQVEsRUFBRSxTQUFTO0lBQ25CLDRCQUE0QjtJQUM1QixNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVO0lBQ2hGLHFCQUFxQjtJQUNyQixLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE9BQU87Q0FDbkUsQ0FBQyxDQUFDO0FBRUg7Ozs7Ozs7OztHQVNHO0FBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaUhFO0FBQ0YsTUFBTSxPQUFPLFNBQVM7SUFBdEI7UUFDRSxrQkFBYSxHQUFZLElBQUksQ0FBQztRQWdKOUI7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNLLHFDQUFnQyxHQUNwQyxpRkFBaUYsQ0FBQztJQW1ieEYsQ0FBQztJQWhsQkM7Ozs7Ozs7T0FPRztJQUNILFdBQVcsQ0FBQyxPQUFlLEVBQUUsUUFBZ0IsRUFBRSxlQUF1QixF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Q0FBQztJQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0M7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBUaGUgZm9sbG93aW5nIHNldCBjb250YWlucyBhbGwga2V5d29yZHMgdGhhdCBjYW4gYmUgdXNlZCBpbiB0aGUgYW5pbWF0aW9uIGNzcyBzaG9ydGhhbmRcbiAqIHByb3BlcnR5IGFuZCBpcyB1c2VkIGR1cmluZyB0aGUgc2NvcGluZyBvZiBrZXlmcmFtZXMgdG8gbWFrZSBzdXJlIHN1Y2gga2V5d29yZHNcbiAqIGFyZSBub3QgbW9kaWZpZWQuXG4gKi9cbmNvbnN0IGFuaW1hdGlvbktleXdvcmRzID0gbmV3IFNldChbXG4gIC8vIGdsb2JhbCB2YWx1ZXNcbiAgJ2luaGVyaXQnLCAnaW5pdGlhbCcsICdyZXZlcnQnLCAndW5zZXQnLFxuICAvLyBhbmltYXRpb24tZGlyZWN0aW9uXG4gICdhbHRlcm5hdGUnLCAnYWx0ZXJuYXRlLXJldmVyc2UnLCAnbm9ybWFsJywgJ3JldmVyc2UnLFxuICAvLyBhbmltYXRpb24tZmlsbC1tb2RlXG4gICdiYWNrd2FyZHMnLCAnYm90aCcsICdmb3J3YXJkcycsICdub25lJyxcbiAgLy8gYW5pbWF0aW9uLXBsYXktc3RhdGVcbiAgJ3BhdXNlZCcsICdydW5uaW5nJyxcbiAgLy8gYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblxuICAnZWFzZScsICdlYXNlLWluJywgJ2Vhc2UtaW4tb3V0JywgJ2Vhc2Utb3V0JywgJ2xpbmVhcicsICdzdGVwLXN0YXJ0JywgJ3N0ZXAtZW5kJyxcbiAgLy8gYHN0ZXBzKClgIGZ1bmN0aW9uXG4gICdlbmQnLCAnanVtcC1ib3RoJywgJ2p1bXAtZW5kJywgJ2p1bXAtbm9uZScsICdqdW1wLXN0YXJ0JywgJ3N0YXJ0J1xuXSk7XG5cbi8qKlxuICogVGhlIGZvbGxvd2luZyBjbGFzcyBpcyBhIHBvcnQgb2Ygc2hhZG93Q1NTIGZyb20gd2ViY29tcG9uZW50cy5qcyB0byBUeXBlU2NyaXB0LlxuICpcbiAqIFBsZWFzZSBtYWtlIHN1cmUgdG8ga2VlcCB0byBlZGl0cyBpbiBzeW5jIHdpdGggdGhlIHNvdXJjZSBmaWxlLlxuICpcbiAqIFNvdXJjZTpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqcy9ibG9iLzRlZmVjZDdlMGUvc3JjL1NoYWRvd0NTUy9TaGFkb3dDU1MuanNcbiAqXG4gKiBUaGUgb3JpZ2luYWwgZmlsZSBsZXZlbCBjb21tZW50IGlzIHJlcHJvZHVjZWQgYmVsb3dcbiAqL1xuXG4vKlxuICBUaGlzIGlzIGEgbGltaXRlZCBzaGltIGZvciBTaGFkb3dET00gY3NzIHN0eWxpbmcuXG4gIGh0dHBzOi8vZHZjcy53My5vcmcvaGcvd2ViY29tcG9uZW50cy9yYXctZmlsZS90aXAvc3BlYy9zaGFkb3cvaW5kZXguaHRtbCNzdHlsZXNcblxuICBUaGUgaW50ZW50aW9uIGhlcmUgaXMgdG8gc3VwcG9ydCBvbmx5IHRoZSBzdHlsaW5nIGZlYXR1cmVzIHdoaWNoIGNhbiBiZVxuICByZWxhdGl2ZWx5IHNpbXBseSBpbXBsZW1lbnRlZC4gVGhlIGdvYWwgaXMgdG8gYWxsb3cgdXNlcnMgdG8gYXZvaWQgdGhlXG4gIG1vc3Qgb2J2aW91cyBwaXRmYWxscyBhbmQgZG8gc28gd2l0aG91dCBjb21wcm9taXNpbmcgcGVyZm9ybWFuY2Ugc2lnbmlmaWNhbnRseS5cbiAgRm9yIFNoYWRvd0RPTSBzdHlsaW5nIHRoYXQncyBub3QgY292ZXJlZCBoZXJlLCBhIHNldCBvZiBiZXN0IHByYWN0aWNlc1xuICBjYW4gYmUgcHJvdmlkZWQgdGhhdCBzaG91bGQgYWxsb3cgdXNlcnMgdG8gYWNjb21wbGlzaCBtb3JlIGNvbXBsZXggc3R5bGluZy5cblxuICBUaGUgZm9sbG93aW5nIGlzIGEgbGlzdCBvZiBzcGVjaWZpYyBTaGFkb3dET00gc3R5bGluZyBmZWF0dXJlcyBhbmQgYSBicmllZlxuICBkaXNjdXNzaW9uIG9mIHRoZSBhcHByb2FjaCB1c2VkIHRvIHNoaW0uXG5cbiAgU2hpbW1lZCBmZWF0dXJlczpcblxuICAqIDpob3N0LCA6aG9zdC1jb250ZXh0OiBTaGFkb3dET00gYWxsb3dzIHN0eWxpbmcgb2YgdGhlIHNoYWRvd1Jvb3QncyBob3N0XG4gIGVsZW1lbnQgdXNpbmcgdGhlIDpob3N0IHJ1bGUuIFRvIHNoaW0gdGhpcyBmZWF0dXJlLCB0aGUgOmhvc3Qgc3R5bGVzIGFyZVxuICByZWZvcm1hdHRlZCBhbmQgcHJlZml4ZWQgd2l0aCBhIGdpdmVuIHNjb3BlIG5hbWUgYW5kIHByb21vdGVkIHRvIGFcbiAgZG9jdW1lbnQgbGV2ZWwgc3R5bGVzaGVldC5cbiAgRm9yIGV4YW1wbGUsIGdpdmVuIGEgc2NvcGUgbmFtZSBvZiAuZm9vLCBhIHJ1bGUgbGlrZSB0aGlzOlxuXG4gICAgOmhvc3Qge1xuICAgICAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gIGJlY29tZXM6XG5cbiAgICAuZm9vIHtcbiAgICAgIGJhY2tncm91bmQ6IHJlZDtcbiAgICB9XG5cbiAgKiBlbmNhcHN1bGF0aW9uOiBTdHlsZXMgZGVmaW5lZCB3aXRoaW4gU2hhZG93RE9NLCBhcHBseSBvbmx5IHRvXG4gIGRvbSBpbnNpZGUgdGhlIFNoYWRvd0RPTS4gUG9seW1lciB1c2VzIG9uZSBvZiB0d28gdGVjaG5pcXVlcyB0byBpbXBsZW1lbnRcbiAgdGhpcyBmZWF0dXJlLlxuXG4gIEJ5IGRlZmF1bHQsIHJ1bGVzIGFyZSBwcmVmaXhlZCB3aXRoIHRoZSBob3N0IGVsZW1lbnQgdGFnIG5hbWVcbiAgYXMgYSBkZXNjZW5kYW50IHNlbGVjdG9yLiBUaGlzIGVuc3VyZXMgc3R5bGluZyBkb2VzIG5vdCBsZWFrIG91dCBvZiB0aGUgJ3RvcCdcbiAgb2YgdGhlIGVsZW1lbnQncyBTaGFkb3dET00uIEZvciBleGFtcGxlLFxuXG4gIGRpdiB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG5cbiAgYmVjb21lczpcblxuICB4LWZvbyBkaXYge1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gIGJlY29tZXM6XG5cblxuICBBbHRlcm5hdGl2ZWx5LCBpZiBXZWJDb21wb25lbnRzLlNoYWRvd0NTUy5zdHJpY3RTdHlsaW5nIGlzIHNldCB0byB0cnVlIHRoZW5cbiAgc2VsZWN0b3JzIGFyZSBzY29wZWQgYnkgYWRkaW5nIGFuIGF0dHJpYnV0ZSBzZWxlY3RvciBzdWZmaXggdG8gZWFjaFxuICBzaW1wbGUgc2VsZWN0b3IgdGhhdCBjb250YWlucyB0aGUgaG9zdCBlbGVtZW50IHRhZyBuYW1lLiBFYWNoIGVsZW1lbnRcbiAgaW4gdGhlIGVsZW1lbnQncyBTaGFkb3dET00gdGVtcGxhdGUgaXMgYWxzbyBnaXZlbiB0aGUgc2NvcGUgYXR0cmlidXRlLlxuICBUaHVzLCB0aGVzZSBydWxlcyBtYXRjaCBvbmx5IGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgc2NvcGUgYXR0cmlidXRlLlxuICBGb3IgZXhhbXBsZSwgZ2l2ZW4gYSBzY29wZSBuYW1lIG9mIHgtZm9vLCBhIHJ1bGUgbGlrZSB0aGlzOlxuXG4gICAgZGl2IHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICBiZWNvbWVzOlxuXG4gICAgZGl2W3gtZm9vXSB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG5cbiAgTm90ZSB0aGF0IGVsZW1lbnRzIHRoYXQgYXJlIGR5bmFtaWNhbGx5IGFkZGVkIHRvIGEgc2NvcGUgbXVzdCBoYXZlIHRoZSBzY29wZVxuICBzZWxlY3RvciBhZGRlZCB0byB0aGVtIG1hbnVhbGx5LlxuXG4gICogdXBwZXIvbG93ZXIgYm91bmQgZW5jYXBzdWxhdGlvbjogU3R5bGVzIHdoaWNoIGFyZSBkZWZpbmVkIG91dHNpZGUgYVxuICBzaGFkb3dSb290IHNob3VsZCBub3QgY3Jvc3MgdGhlIFNoYWRvd0RPTSBib3VuZGFyeSBhbmQgc2hvdWxkIG5vdCBhcHBseVxuICBpbnNpZGUgYSBzaGFkb3dSb290LlxuXG4gIFRoaXMgc3R5bGluZyBiZWhhdmlvciBpcyBub3QgZW11bGF0ZWQuIFNvbWUgcG9zc2libGUgd2F5cyB0byBkbyB0aGlzIHRoYXRcbiAgd2VyZSByZWplY3RlZCBkdWUgdG8gY29tcGxleGl0eSBhbmQvb3IgcGVyZm9ybWFuY2UgY29uY2VybnMgaW5jbHVkZTogKDEpIHJlc2V0XG4gIGV2ZXJ5IHBvc3NpYmxlIHByb3BlcnR5IGZvciBldmVyeSBwb3NzaWJsZSBzZWxlY3RvciBmb3IgYSBnaXZlbiBzY29wZSBuYW1lO1xuICAoMikgcmUtaW1wbGVtZW50IGNzcyBpbiBqYXZhc2NyaXB0LlxuXG4gIEFzIGFuIGFsdGVybmF0aXZlLCB1c2VycyBzaG91bGQgbWFrZSBzdXJlIHRvIHVzZSBzZWxlY3RvcnNcbiAgc3BlY2lmaWMgdG8gdGhlIHNjb3BlIGluIHdoaWNoIHRoZXkgYXJlIHdvcmtpbmcuXG5cbiAgKiA6OmRpc3RyaWJ1dGVkOiBUaGlzIGJlaGF2aW9yIGlzIG5vdCBlbXVsYXRlZC4gSXQncyBvZnRlbiBub3QgbmVjZXNzYXJ5XG4gIHRvIHN0eWxlIHRoZSBjb250ZW50cyBvZiBhIHNwZWNpZmljIGluc2VydGlvbiBwb2ludCBhbmQgaW5zdGVhZCwgZGVzY2VuZGFudHNcbiAgb2YgdGhlIGhvc3QgZWxlbWVudCBjYW4gYmUgc3R5bGVkIHNlbGVjdGl2ZWx5LiBVc2VycyBjYW4gYWxzbyBjcmVhdGUgYW5cbiAgZXh0cmEgbm9kZSBhcm91bmQgYW4gaW5zZXJ0aW9uIHBvaW50IGFuZCBzdHlsZSB0aGF0IG5vZGUncyBjb250ZW50c1xuICB2aWEgZGVzY2VuZGVudCBzZWxlY3RvcnMuIEZvciBleGFtcGxlLCB3aXRoIGEgc2hhZG93Um9vdCBsaWtlIHRoaXM6XG5cbiAgICA8c3R5bGU+XG4gICAgICA6OmNvbnRlbnQoZGl2KSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHJlZDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDxjb250ZW50PjwvY29udGVudD5cblxuICBjb3VsZCBiZWNvbWU6XG5cbiAgICA8c3R5bGU+XG4gICAgICAvICpAcG9seWZpbGwgLmNvbnRlbnQtY29udGFpbmVyIGRpdiAqIC9cbiAgICAgIDo6Y29udGVudChkaXYpIHtcbiAgICAgICAgYmFja2dyb3VuZDogcmVkO1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtY29udGFpbmVyXCI+XG4gICAgICA8Y29udGVudD48L2NvbnRlbnQ+XG4gICAgPC9kaXY+XG5cbiAgTm90ZSB0aGUgdXNlIG9mIEBwb2x5ZmlsbCBpbiB0aGUgY29tbWVudCBhYm92ZSBhIFNoYWRvd0RPTSBzcGVjaWZpYyBzdHlsZVxuICBkZWNsYXJhdGlvbi4gVGhpcyBpcyBhIGRpcmVjdGl2ZSB0byB0aGUgc3R5bGluZyBzaGltIHRvIHVzZSB0aGUgc2VsZWN0b3JcbiAgaW4gY29tbWVudHMgaW4gbGlldSBvZiB0aGUgbmV4dCBzZWxlY3RvciB3aGVuIHJ1bm5pbmcgdW5kZXIgcG9seWZpbGwuXG4qL1xuZXhwb3J0IGNsYXNzIFNoYWRvd0NzcyB7XG4gIHN0cmljdFN0eWxpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qXG4gICAqIFNoaW0gc29tZSBjc3NUZXh0IHdpdGggdGhlIGdpdmVuIHNlbGVjdG9yLiBSZXR1cm5zIGNzc1RleHQgdGhhdCBjYW5cbiAgICogYmUgaW5jbHVkZWQgaW4gdGhlIGRvY3VtZW50IHZpYSBXZWJDb21wb25lbnRzLlNoYWRvd0NTUy5hZGRDc3NUb0RvY3VtZW50KGNzcykuXG4gICAqXG4gICAqIFdoZW4gc3RyaWN0U3R5bGluZyBpcyB0cnVlOlxuICAgKiAtIHNlbGVjdG9yIGlzIHRoZSBhdHRyaWJ1dGUgYWRkZWQgdG8gYWxsIGVsZW1lbnRzIGluc2lkZSB0aGUgaG9zdCxcbiAgICogLSBob3N0U2VsZWN0b3IgaXMgdGhlIGF0dHJpYnV0ZSBhZGRlZCB0byB0aGUgaG9zdCBpdHNlbGYuXG4gICAqL1xuICBzaGltQ3NzVGV4dChjc3NUZXh0OiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcsIGhvc3RTZWxlY3Rvcjogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbW1lbnRzV2l0aEhhc2ggPSBleHRyYWN0Q29tbWVudHNXaXRoSGFzaChjc3NUZXh0KTtcbiAgICBjc3NUZXh0ID0gc3RyaXBDb21tZW50cyhjc3NUZXh0KTtcbiAgICBjc3NUZXh0ID0gdGhpcy5faW5zZXJ0RGlyZWN0aXZlcyhjc3NUZXh0KTtcblxuICAgIGNvbnN0IHNjb3BlZENzc1RleHQgPSB0aGlzLl9zY29wZUNzc1RleHQoY3NzVGV4dCwgc2VsZWN0b3IsIGhvc3RTZWxlY3Rvcik7XG4gICAgcmV0dXJuIFtzY29wZWRDc3NUZXh0LCAuLi5jb21tZW50c1dpdGhIYXNoXS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luc2VydERpcmVjdGl2ZXMoY3NzVGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjc3NUZXh0ID0gdGhpcy5faW5zZXJ0UG9seWZpbGxEaXJlY3RpdmVzSW5Dc3NUZXh0KGNzc1RleHQpO1xuICAgIHJldHVybiB0aGlzLl9pbnNlcnRQb2x5ZmlsbFJ1bGVzSW5Dc3NUZXh0KGNzc1RleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgc3R5bGVzIHRvIGFkZCBzY29wZSB0byBrZXlmcmFtZXMuXG4gICAqXG4gICAqIE1vZGlmeSBib3RoIHRoZSBuYW1lcyBvZiB0aGUga2V5ZnJhbWVzIGRlZmluZWQgaW4gdGhlIGNvbXBvbmVudCBzdHlsZXMgYW5kIGFsc28gdGhlIGNzc1xuICAgKiBhbmltYXRpb24gcnVsZXMgdXNpbmcgdGhlbS5cbiAgICpcbiAgICogQW5pbWF0aW9uIHJ1bGVzIHVzaW5nIGtleWZyYW1lcyBkZWZpbmVkIGVsc2V3aGVyZSBhcmUgbm90IG1vZGlmaWVkIHRvIGFsbG93IGZvciBnbG9iYWxseVxuICAgKiBkZWZpbmVkIGtleWZyYW1lcy5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHdlIGNvbnZlcnQgdGhpcyBjc3M6XG4gICAqXG4gICAqIGBgYFxuICAgKiAuYm94IHtcbiAgICogICBhbmltYXRpb246IGJveC1hbmltYXRpb24gMXMgZm9yd2FyZHM7XG4gICAqIH1cbiAgICpcbiAgICogQGtleWZyYW1lcyBib3gtYW5pbWF0aW9uIHtcbiAgICogICB0byB7XG4gICAqICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbiAgICogICB9XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIHRvIHRoaXM6XG4gICAqXG4gICAqIGBgYFxuICAgKiAuYm94IHtcbiAgICogICBhbmltYXRpb246IHNjb3BlTmFtZV9ib3gtYW5pbWF0aW9uIDFzIGZvcndhcmRzO1xuICAgKiB9XG4gICAqXG4gICAqIEBrZXlmcmFtZXMgc2NvcGVOYW1lX2JveC1hbmltYXRpb24ge1xuICAgKiAgIHRvIHtcbiAgICogICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICAgKiAgIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIGNzc1RleHQgdGhlIGNvbXBvbmVudCdzIGNzcyB0ZXh0IHRoYXQgbmVlZHMgdG8gYmUgc2NvcGVkLlxuICAgKiBAcGFyYW0gc2NvcGVTZWxlY3RvciB0aGUgY29tcG9uZW50J3Mgc2NvcGUgc2VsZWN0b3IuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoZSBzY29wZWQgY3NzIHRleHQuXG4gICAqL1xuICBwcml2YXRlIF9zY29wZUtleWZyYW1lc1JlbGF0ZWRDc3MoY3NzVGV4dDogc3RyaW5nLCBzY29wZVNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHVuc2NvcGVkS2V5ZnJhbWVzU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgY29uc3Qgc2NvcGVkS2V5ZnJhbWVzQ3NzVGV4dCA9IHByb2Nlc3NSdWxlcyhcbiAgICAgICAgY3NzVGV4dCxcbiAgICAgICAgcnVsZSA9PiB0aGlzLl9zY29wZUxvY2FsS2V5ZnJhbWVEZWNsYXJhdGlvbnMocnVsZSwgc2NvcGVTZWxlY3RvciwgdW5zY29wZWRLZXlmcmFtZXNTZXQpKTtcbiAgICByZXR1cm4gcHJvY2Vzc1J1bGVzKFxuICAgICAgICBzY29wZWRLZXlmcmFtZXNDc3NUZXh0LFxuICAgICAgICBydWxlID0+IHRoaXMuX3Njb3BlQW5pbWF0aW9uUnVsZShydWxlLCBzY29wZVNlbGVjdG9yLCB1bnNjb3BlZEtleWZyYW1lc1NldCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjb3BlcyBsb2NhbCBrZXlmcmFtZXMgbmFtZXMsIHJldHVybmluZyB0aGUgdXBkYXRlZCBjc3MgcnVsZSBhbmQgaXQgYWxzb1xuICAgKiBhZGRzIHRoZSBvcmlnaW5hbCBrZXlmcmFtZSBuYW1lIHRvIGEgcHJvdmlkZWQgc2V0IHRvIGNvbGxlY3QgYWxsIGtleWZyYW1lcyBuYW1lc1xuICAgKiBzbyB0aGF0IGl0IGNhbiBsYXRlciBiZSB1c2VkIHRvIHNjb3BlIHRoZSBhbmltYXRpb24gcnVsZXMuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBpdCB0YWtlcyBhIHJ1bGUgc3VjaCBhczpcbiAgICpcbiAgICogYGBgXG4gICAqIEBrZXlmcmFtZXMgYm94LWFuaW1hdGlvbiB7XG4gICAqICAgdG8ge1xuICAgKiAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG4gICAqICAgfVxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBhbmQgcmV0dXJuczpcbiAgICpcbiAgICogYGBgXG4gICAqIEBrZXlmcmFtZXMgc2NvcGVOYW1lX2JveC1hbmltYXRpb24ge1xuICAgKiAgIHRvIHtcbiAgICogICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICAgKiAgIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICogYW5kIGFzIGEgc2lkZSBlZmZlY3QgaXQgYWRkcyBcImJveC1hbmltYXRpb25cIiB0byB0aGUgYHVuc2NvcGVkS2V5ZnJhbWVzU2V0YCBzZXRcbiAgICpcbiAgICogQHBhcmFtIGNzc1J1bGUgdGhlIGNzcyBydWxlIHRvIHByb2Nlc3MuXG4gICAqIEBwYXJhbSBzY29wZVNlbGVjdG9yIHRoZSBjb21wb25lbnQncyBzY29wZSBzZWxlY3Rvci5cbiAgICogQHBhcmFtIHVuc2NvcGVkS2V5ZnJhbWVzU2V0IHRoZSBzZXQgb2YgdW5zY29wZWQga2V5ZnJhbWVzIG5hbWVzICh3aGljaCBjYW4gYmVcbiAgICogbW9kaWZpZWQgYXMgYSBzaWRlIGVmZmVjdClcbiAgICpcbiAgICogQHJldHVybnMgdGhlIGNzcyBydWxlIG1vZGlmaWVkIHdpdGggdGhlIHNjb3BlZCBrZXlmcmFtZXMgbmFtZS5cbiAgICovXG4gIHByaXZhdGUgX3Njb3BlTG9jYWxLZXlmcmFtZURlY2xhcmF0aW9ucyhcbiAgICAgIHJ1bGU6IENzc1J1bGUsIHNjb3BlU2VsZWN0b3I6IHN0cmluZywgdW5zY29wZWRLZXlmcmFtZXNTZXQ6IFNldDxzdHJpbmc+KTogQ3NzUnVsZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJ1bGUsXG4gICAgICBzZWxlY3RvcjogcnVsZS5zZWxlY3Rvci5yZXBsYWNlKFxuICAgICAgICAgIC8oXkAoPzotd2Via2l0LSk/a2V5ZnJhbWVzKD86XFxzKykpKFsnXCJdPykoLispXFwyKFxccyopJC8sXG4gICAgICAgICAgKF8sIHN0YXJ0LCBxdW90ZSwga2V5ZnJhbWVOYW1lLCBlbmRTcGFjZXMpID0+IHtcbiAgICAgICAgICAgIHVuc2NvcGVkS2V5ZnJhbWVzU2V0LmFkZCh1bmVzY2FwZVF1b3RlcyhrZXlmcmFtZU5hbWUsIHF1b3RlKSk7XG4gICAgICAgICAgICByZXR1cm4gYCR7c3RhcnR9JHtxdW90ZX0ke3Njb3BlU2VsZWN0b3J9XyR7a2V5ZnJhbWVOYW1lfSR7cXVvdGV9JHtlbmRTcGFjZXN9YDtcbiAgICAgICAgICB9KSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHVzZWQgdG8gc2NvcGUgYSBrZXlmcmFtZXMgbmFtZSAob2J0YWluZWQgZnJvbSBhbiBhbmltYXRpb24gZGVjbGFyYXRpb24pXG4gICAqIHVzaW5nIGFuIGV4aXN0aW5nIHNldCBvZiB1bnNjb3BlZEtleWZyYW1lcyBuYW1lcyB0byBkaXNjZXJuIGlmIHRoZSBzY29waW5nIG5lZWRzIHRvIGJlXG4gICAqIHBlcmZvcm1lZCAoa2V5ZnJhbWVzIG5hbWVzIG9mIGtleWZyYW1lcyBub3QgZGVmaW5lZCBpbiB0aGUgY29tcG9uZW50J3MgY3NzIG5lZWQgbm90IHRvIGJlXG4gICAqIHNjb3BlZCkuXG4gICAqXG4gICAqIEBwYXJhbSBrZXlmcmFtZSB0aGUga2V5ZnJhbWVzIG5hbWUgdG8gY2hlY2suXG4gICAqIEBwYXJhbSBzY29wZVNlbGVjdG9yIHRoZSBjb21wb25lbnQncyBzY29wZSBzZWxlY3Rvci5cbiAgICogQHBhcmFtIHVuc2NvcGVkS2V5ZnJhbWVzU2V0IHRoZSBzZXQgb2YgdW5zY29wZWQga2V5ZnJhbWVzIG5hbWVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGUgc2NvcGVkIG5hbWUgb2YgdGhlIGtleWZyYW1lLCBvciB0aGUgb3JpZ2luYWwgbmFtZSBpcyB0aGUgbmFtZSBuZWVkIG5vdCB0byBiZVxuICAgKiBzY29wZWQuXG4gICAqL1xuICBwcml2YXRlIF9zY29wZUFuaW1hdGlvbktleWZyYW1lKFxuICAgICAga2V5ZnJhbWU6IHN0cmluZywgc2NvcGVTZWxlY3Rvcjogc3RyaW5nLCB1bnNjb3BlZEtleWZyYW1lc1NldDogUmVhZG9ubHlTZXQ8c3RyaW5nPik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGtleWZyYW1lLnJlcGxhY2UoL14oXFxzKikoWydcIl0/KSguKz8pXFwyKFxccyopJC8sIChfLCBzcGFjZXMxLCBxdW90ZSwgbmFtZSwgc3BhY2VzMikgPT4ge1xuICAgICAgbmFtZSA9IGAke3Vuc2NvcGVkS2V5ZnJhbWVzU2V0Lmhhcyh1bmVzY2FwZVF1b3RlcyhuYW1lLCBxdW90ZSkpID8gc2NvcGVTZWxlY3RvciArICdfJyA6ICcnfSR7XG4gICAgICAgICAgbmFtZX1gO1xuICAgICAgcmV0dXJuIGAke3NwYWNlczF9JHtxdW90ZX0ke25hbWV9JHtxdW90ZX0ke3NwYWNlczJ9YDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byBleHRyYXBvbGF0ZSB0aGUgcG9zc2libGUga2V5ZnJhbWVzIGZyb20gYW5cbiAgICogYW5pbWF0aW9uIGRlY2xhcmF0aW9uICh3aXRoIHBvc3NpYmx5IG11bHRpcGxlIGFuaW1hdGlvbiBkZWZpbml0aW9ucylcbiAgICpcbiAgICogVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgZGl2aWRlZCBpbiB0aHJlZSBwYXJ0c1xuICAgKiAgLSAoXnxcXHMrKVxuICAgKiAgICBzaW1wbHkgY2FwdHVyZXMgaG93IG1hbnkgKGlmIGFueSkgbGVhZGluZyB3aGl0ZXNwYWNlcyBhcmUgcHJlc2VudFxuICAgKiAgLSAoPzooPzooWydcIl0pKCg/OlxcXFxcXFxcfFxcXFxcXDJ8KD8hXFwyKS4pKylcXDIpfCgtP1tBLVphLXpdW1xcd1xcLV0qKSlcbiAgICogICAgY2FwdHVyZXMgdHdvIGRpZmZlcmVudCBwb3NzaWJsZSBrZXlmcmFtZXMsIG9uZXMgd2hpY2ggYXJlIHF1b3RlZCBvciBvbmVzIHdoaWNoIGFyZSB2YWxpZCBjc3NcbiAgICogaWRlbnRzIChjdXN0b20gcHJvcGVydGllcyBleGNsdWRlZClcbiAgICogIC0gKD89WyxcXHM7XXwkKVxuICAgKiAgICBzaW1wbHkgbWF0Y2hlcyB0aGUgZW5kIG9mIHRoZSBwb3NzaWJsZSBrZXlmcmFtZSwgdmFsaWQgZW5kaW5ncyBhcmU6IGEgY29tbWEsIGEgc3BhY2UsIGFcbiAgICogc2VtaWNvbG9uIG9yIHRoZSBlbmQgb2YgdGhlIHN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uRGVjbGFyYXRpb25LZXlmcmFtZXNSZSA9XG4gICAgICAvKF58XFxzKykoPzooPzooWydcIl0pKCg/OlxcXFxcXFxcfFxcXFxcXDJ8KD8hXFwyKS4pKylcXDIpfCgtP1tBLVphLXpdW1xcd1xcLV0qKSkoPz1bLFxcc118JCkvZztcblxuICAvKipcbiAgICogU2NvcGUgYW4gYW5pbWF0aW9uIHJ1bGUgc28gdGhhdCB0aGUga2V5ZnJhbWVzIG1lbnRpb25lZCBpbiBzdWNoIHJ1bGVcbiAgICogYXJlIHNjb3BlZCBpZiBkZWZpbmVkIGluIHRoZSBjb21wb25lbnQncyBjc3MgYW5kIGxlZnQgdW50b3VjaGVkIG90aGVyd2lzZS5cbiAgICpcbiAgICogSXQgY2FuIHNjb3BlIHZhbHVlcyBvZiBib3RoIHRoZSAnYW5pbWF0aW9uJyBhbmQgJ2FuaW1hdGlvbi1uYW1lJyBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0gcnVsZSBjc3MgcnVsZSB0byBzY29wZS5cbiAgICogQHBhcmFtIHNjb3BlU2VsZWN0b3IgdGhlIGNvbXBvbmVudCdzIHNjb3BlIHNlbGVjdG9yLlxuICAgKiBAcGFyYW0gdW5zY29wZWRLZXlmcmFtZXNTZXQgdGhlIHNldCBvZiB1bnNjb3BlZCBrZXlmcmFtZXMgbmFtZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoZSB1cGRhdGVkIGNzcyBydWxlLlxuICAgKiovXG4gIHByaXZhdGUgX3Njb3BlQW5pbWF0aW9uUnVsZShcbiAgICAgIHJ1bGU6IENzc1J1bGUsIHNjb3BlU2VsZWN0b3I6IHN0cmluZywgdW5zY29wZWRLZXlmcmFtZXNTZXQ6IFJlYWRvbmx5U2V0PHN0cmluZz4pOiBDc3NSdWxlIHtcbiAgICBsZXQgY29udGVudCA9IHJ1bGUuY29udGVudC5yZXBsYWNlKFxuICAgICAgICAvKCg/Ol58XFxzK3w7KSg/Oi13ZWJraXQtKT9hbmltYXRpb24oPzpcXHMqKTooPzpcXHMqKSkoW147XSspL2csXG4gICAgICAgIChfLCBzdGFydCwgYW5pbWF0aW9uRGVjbGFyYXRpb25zKSA9PiBzdGFydCArXG4gICAgICAgICAgICBhbmltYXRpb25EZWNsYXJhdGlvbnMucmVwbGFjZShcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb25EZWNsYXJhdGlvbktleWZyYW1lc1JlLFxuICAgICAgICAgICAgICAgIChvcmlnaW5hbDogc3RyaW5nLCBsZWFkaW5nU3BhY2VzOiBzdHJpbmcsIHF1b3RlID0gJycsIHF1b3RlZE5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgbm9uUXVvdGVkTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocXVvdGVkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7bGVhZGluZ1NwYWNlc30ke1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2NvcGVBbmltYXRpb25LZXlmcmFtZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHtxdW90ZX0ke3F1b3RlZE5hbWV9JHtxdW90ZX1gLCBzY29wZVNlbGVjdG9yLCB1bnNjb3BlZEtleWZyYW1lc1NldCl9YDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmltYXRpb25LZXl3b3Jkcy5oYXMobm9uUXVvdGVkTmFtZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgYCR7bGVhZGluZ1NwYWNlc30ke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlQW5pbWF0aW9uS2V5ZnJhbWUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vblF1b3RlZE5hbWUsIHNjb3BlU2VsZWN0b3IsIHVuc2NvcGVkS2V5ZnJhbWVzU2V0KX1gO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKFxuICAgICAgICAvKCg/Ol58XFxzK3w7KSg/Oi13ZWJraXQtKT9hbmltYXRpb24tbmFtZSg/OlxccyopOig/OlxccyopKShbXjtdKykvZyxcbiAgICAgICAgKF9tYXRjaCwgc3RhcnQsIGNvbW1hU2VwYXJhdGVkS2V5ZnJhbWVzKSA9PiBgJHtzdGFydH0ke1xuICAgICAgICAgICAgY29tbWFTZXBhcmF0ZWRLZXlmcmFtZXMuc3BsaXQoJywnKVxuICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChrZXlmcmFtZTogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2NvcGVBbmltYXRpb25LZXlmcmFtZShrZXlmcmFtZSwgc2NvcGVTZWxlY3RvciwgdW5zY29wZWRLZXlmcmFtZXNTZXQpKVxuICAgICAgICAgICAgICAgIC5qb2luKCcsJyl9YCk7XG4gICAgcmV0dXJuIHsuLi5ydWxlLCBjb250ZW50fTtcbiAgfVxuXG4gIC8qXG4gICAqIFByb2Nlc3Mgc3R5bGVzIHRvIGNvbnZlcnQgbmF0aXZlIFNoYWRvd0RPTSBydWxlcyB0aGF0IHdpbGwgdHJpcFxuICAgKiB1cCB0aGUgY3NzIHBhcnNlcjsgd2UgcmVseSBvbiBkZWNvcmF0aW5nIHRoZSBzdHlsZXNoZWV0IHdpdGggaW5lcnQgcnVsZXMuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCB3ZSBjb252ZXJ0IHRoaXMgcnVsZTpcbiAgICpcbiAgICogcG9seWZpbGwtbmV4dC1zZWxlY3RvciB7IGNvbnRlbnQ6ICc6aG9zdCBtZW51LWl0ZW0nOyB9XG4gICAqIDo6Y29udGVudCBtZW51LWl0ZW0ge1xuICAgKlxuICAgKiB0byB0aGlzOlxuICAgKlxuICAgKiBzY29wZU5hbWUgbWVudS1pdGVtIHtcbiAgICpcbiAgICoqL1xuICBwcml2YXRlIF9pbnNlcnRQb2x5ZmlsbERpcmVjdGl2ZXNJbkNzc1RleHQoY3NzVGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBEaWZmZXJlbmNlIHdpdGggd2ViY29tcG9uZW50cy5qczogZG9lcyBub3QgaGFuZGxlIGNvbW1lbnRzXG4gICAgcmV0dXJuIGNzc1RleHQucmVwbGFjZShfY3NzQ29udGVudE5leHRTZWxlY3RvclJlLCBmdW5jdGlvbiguLi5tOiBzdHJpbmdbXSkge1xuICAgICAgcmV0dXJuIG1bMl0gKyAneyc7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBQcm9jZXNzIHN0eWxlcyB0byBhZGQgcnVsZXMgd2hpY2ggd2lsbCBvbmx5IGFwcGx5IHVuZGVyIHRoZSBwb2x5ZmlsbFxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgd2UgY29udmVydCB0aGlzIHJ1bGU6XG4gICAqXG4gICAqIHBvbHlmaWxsLXJ1bGUge1xuICAgKiAgIGNvbnRlbnQ6ICc6aG9zdCBtZW51LWl0ZW0nO1xuICAgKiAuLi5cbiAgICogfVxuICAgKlxuICAgKiB0byB0aGlzOlxuICAgKlxuICAgKiBzY29wZU5hbWUgbWVudS1pdGVtIHsuLi59XG4gICAqXG4gICAqKi9cbiAgcHJpdmF0ZSBfaW5zZXJ0UG9seWZpbGxSdWxlc0luQ3NzVGV4dChjc3NUZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIERpZmZlcmVuY2Ugd2l0aCB3ZWJjb21wb25lbnRzLmpzOiBkb2VzIG5vdCBoYW5kbGUgY29tbWVudHNcbiAgICByZXR1cm4gY3NzVGV4dC5yZXBsYWNlKF9jc3NDb250ZW50UnVsZVJlLCAoLi4ubTogc3RyaW5nW10pID0+IHtcbiAgICAgIGNvbnN0IHJ1bGUgPSBtWzBdLnJlcGxhY2UobVsxXSwgJycpLnJlcGxhY2UobVsyXSwgJycpO1xuICAgICAgcmV0dXJuIG1bNF0gKyBydWxlO1xuICAgIH0pO1xuICB9XG5cbiAgLyogRW5zdXJlIHN0eWxlcyBhcmUgc2NvcGVkLiBQc2V1ZG8tc2NvcGluZyB0YWtlcyBhIHJ1bGUgbGlrZTpcbiAgICpcbiAgICogIC5mb28gey4uLiB9XG4gICAqXG4gICAqICBhbmQgY29udmVydHMgdGhpcyB0b1xuICAgKlxuICAgKiAgc2NvcGVOYW1lIC5mb28geyAuLi4gfVxuICAgKi9cbiAgcHJpdmF0ZSBfc2NvcGVDc3NUZXh0KGNzc1RleHQ6IHN0cmluZywgc2NvcGVTZWxlY3Rvcjogc3RyaW5nLCBob3N0U2VsZWN0b3I6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgdW5zY29wZWRSdWxlcyA9IHRoaXMuX2V4dHJhY3RVbnNjb3BlZFJ1bGVzRnJvbUNzc1RleHQoY3NzVGV4dCk7XG4gICAgLy8gcmVwbGFjZSA6aG9zdCBhbmQgOmhvc3QtY29udGV4dCAtc2hhZG93Y3NzaG9zdCBhbmQgLXNoYWRvd2Nzc2hvc3QgcmVzcGVjdGl2ZWx5XG4gICAgY3NzVGV4dCA9IHRoaXMuX2luc2VydFBvbHlmaWxsSG9zdEluQ3NzVGV4dChjc3NUZXh0KTtcbiAgICBjc3NUZXh0ID0gdGhpcy5fY29udmVydENvbG9uSG9zdChjc3NUZXh0KTtcbiAgICBjc3NUZXh0ID0gdGhpcy5fY29udmVydENvbG9uSG9zdENvbnRleHQoY3NzVGV4dCk7XG4gICAgY3NzVGV4dCA9IHRoaXMuX2NvbnZlcnRTaGFkb3dET01TZWxlY3RvcnMoY3NzVGV4dCk7XG4gICAgaWYgKHNjb3BlU2VsZWN0b3IpIHtcbiAgICAgIGNzc1RleHQgPSB0aGlzLl9zY29wZUtleWZyYW1lc1JlbGF0ZWRDc3MoY3NzVGV4dCwgc2NvcGVTZWxlY3Rvcik7XG4gICAgICBjc3NUZXh0ID0gdGhpcy5fc2NvcGVTZWxlY3RvcnMoY3NzVGV4dCwgc2NvcGVTZWxlY3RvciwgaG9zdFNlbGVjdG9yKTtcbiAgICB9XG4gICAgY3NzVGV4dCA9IGNzc1RleHQgKyAnXFxuJyArIHVuc2NvcGVkUnVsZXM7XG4gICAgcmV0dXJuIGNzc1RleHQudHJpbSgpO1xuICB9XG5cbiAgLypcbiAgICogUHJvY2VzcyBzdHlsZXMgdG8gYWRkIHJ1bGVzIHdoaWNoIHdpbGwgb25seSBhcHBseSB1bmRlciB0aGUgcG9seWZpbGxcbiAgICogYW5kIGRvIG5vdCBwcm9jZXNzIHZpYSBDU1NPTS4gKENTU09NIGlzIGRlc3RydWN0aXZlIHRvIHJ1bGVzIG9uIHJhcmVcbiAgICogb2NjYXNpb25zLCBlLmcuIC13ZWJraXQtY2FsYyBvbiBTYWZhcmkuKVxuICAgKiBGb3IgZXhhbXBsZSwgd2UgY29udmVydCB0aGlzIHJ1bGU6XG4gICAqXG4gICAqIEBwb2x5ZmlsbC11bnNjb3BlZC1ydWxlIHtcbiAgICogICBjb250ZW50OiAnbWVudS1pdGVtJztcbiAgICogLi4uIH1cbiAgICpcbiAgICogdG8gdGhpczpcbiAgICpcbiAgICogbWVudS1pdGVtIHsuLi59XG4gICAqXG4gICAqKi9cbiAgcHJpdmF0ZSBfZXh0cmFjdFVuc2NvcGVkUnVsZXNGcm9tQ3NzVGV4dChjc3NUZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIERpZmZlcmVuY2Ugd2l0aCB3ZWJjb21wb25lbnRzLmpzOiBkb2VzIG5vdCBoYW5kbGUgY29tbWVudHNcbiAgICBsZXQgciA9ICcnO1xuICAgIGxldCBtOiBSZWdFeHBFeGVjQXJyYXl8bnVsbDtcbiAgICBfY3NzQ29udGVudFVuc2NvcGVkUnVsZVJlLmxhc3RJbmRleCA9IDA7XG4gICAgd2hpbGUgKChtID0gX2Nzc0NvbnRlbnRVbnNjb3BlZFJ1bGVSZS5leGVjKGNzc1RleHQpKSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcnVsZSA9IG1bMF0ucmVwbGFjZShtWzJdLCAnJykucmVwbGFjZShtWzFdLCBtWzRdKTtcbiAgICAgIHIgKz0gcnVsZSArICdcXG5cXG4nO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfVxuXG4gIC8qXG4gICAqIGNvbnZlcnQgYSBydWxlIGxpa2UgOmhvc3QoLmZvbykgPiAuYmFyIHsgfVxuICAgKlxuICAgKiB0b1xuICAgKlxuICAgKiAuZm9vPHNjb3BlTmFtZT4gPiAuYmFyXG4gICAqL1xuICBwcml2YXRlIF9jb252ZXJ0Q29sb25Ib3N0KGNzc1RleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNzc1RleHQucmVwbGFjZShfY3NzQ29sb25Ib3N0UmUsIChfLCBob3N0U2VsZWN0b3JzOiBzdHJpbmcsIG90aGVyU2VsZWN0b3JzOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChob3N0U2VsZWN0b3JzKSB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZFNlbGVjdG9yczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgY29uc3QgaG9zdFNlbGVjdG9yQXJyYXkgPSBob3N0U2VsZWN0b3JzLnNwbGl0KCcsJykubWFwKHAgPT4gcC50cmltKCkpO1xuICAgICAgICBmb3IgKGNvbnN0IGhvc3RTZWxlY3RvciBvZiBob3N0U2VsZWN0b3JBcnJheSkge1xuICAgICAgICAgIGlmICghaG9zdFNlbGVjdG9yKSBicmVhaztcbiAgICAgICAgICBjb25zdCBjb252ZXJ0ZWRTZWxlY3RvciA9XG4gICAgICAgICAgICAgIF9wb2x5ZmlsbEhvc3ROb0NvbWJpbmF0b3IgKyBob3N0U2VsZWN0b3IucmVwbGFjZShfcG9seWZpbGxIb3N0LCAnJykgKyBvdGhlclNlbGVjdG9ycztcbiAgICAgICAgICBjb252ZXJ0ZWRTZWxlY3RvcnMucHVzaChjb252ZXJ0ZWRTZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnZlcnRlZFNlbGVjdG9ycy5qb2luKCcsJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gX3BvbHlmaWxsSG9zdE5vQ29tYmluYXRvciArIG90aGVyU2VsZWN0b3JzO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogY29udmVydCBhIHJ1bGUgbGlrZSA6aG9zdC1jb250ZXh0KC5mb28pID4gLmJhciB7IH1cbiAgICpcbiAgICogdG9cbiAgICpcbiAgICogLmZvbzxzY29wZU5hbWU+ID4gLmJhciwgLmZvbyA8c2NvcGVOYW1lPiA+IC5iYXIgeyB9XG4gICAqXG4gICAqIGFuZFxuICAgKlxuICAgKiA6aG9zdC1jb250ZXh0KC5mb286aG9zdCkgLmJhciB7IC4uLiB9XG4gICAqXG4gICAqIHRvXG4gICAqXG4gICAqIC5mb288c2NvcGVOYW1lPiAuYmFyIHsgLi4uIH1cbiAgICovXG4gIHByaXZhdGUgX2NvbnZlcnRDb2xvbkhvc3RDb250ZXh0KGNzc1RleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNzc1RleHQucmVwbGFjZShfY3NzQ29sb25Ib3N0Q29udGV4dFJlR2xvYmFsLCBzZWxlY3RvclRleHQgPT4ge1xuICAgICAgLy8gV2UgaGF2ZSBjYXB0dXJlZCBhIHNlbGVjdG9yIHRoYXQgY29udGFpbnMgYSBgOmhvc3QtY29udGV4dGAgcnVsZS5cblxuICAgICAgLy8gRm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYDpob3N0LWNvbnRleHRgIG1heSBjb250YWluIGEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2Ygc2VsZWN0b3JzLlxuICAgICAgLy8gRWFjaCBjb250ZXh0IHNlbGVjdG9yIGdyb3VwIHdpbGwgY29udGFpbiBhIGxpc3Qgb2YgaG9zdC1jb250ZXh0IHNlbGVjdG9ycyB0aGF0IG11c3QgbWF0Y2hcbiAgICAgIC8vIGFuIGFuY2VzdG9yIG9mIHRoZSBob3N0LlxuICAgICAgLy8gKE5vcm1hbGx5IGBjb250ZXh0U2VsZWN0b3JHcm91cHNgIHdpbGwgb25seSBjb250YWluIGEgc2luZ2xlIGFycmF5IG9mIGNvbnRleHQgc2VsZWN0b3JzLilcbiAgICAgIGNvbnN0IGNvbnRleHRTZWxlY3Rvckdyb3Vwczogc3RyaW5nW11bXSA9IFtbXV07XG5cbiAgICAgIC8vIFRoZXJlIG1heSBiZSBtb3JlIHRoYW4gYDpob3N0LWNvbnRleHRgIGluIHRoaXMgc2VsZWN0b3Igc28gYHNlbGVjdG9yVGV4dGAgY291bGQgbG9vayBsaWtlOlxuICAgICAgLy8gYDpob3N0LWNvbnRleHQoLm9uZSk6aG9zdC1jb250ZXh0KC50d28pYC5cbiAgICAgIC8vIEV4ZWN1dGUgYF9jc3NDb2xvbkhvc3RDb250ZXh0UmVgIG92ZXIgYW5kIG92ZXIgdW50aWwgd2UgaGF2ZSBleHRyYWN0ZWQgYWxsIHRoZVxuICAgICAgLy8gYDpob3N0LWNvbnRleHRgIHNlbGVjdG9ycyBmcm9tIHRoaXMgc2VsZWN0b3IuXG4gICAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheXxudWxsO1xuICAgICAgd2hpbGUgKG1hdGNoID0gX2Nzc0NvbG9uSG9zdENvbnRleHRSZS5leGVjKHNlbGVjdG9yVGV4dCkpIHtcbiAgICAgICAgLy8gYG1hdGNoYCA9IFsnOmhvc3QtY29udGV4dCg8c2VsZWN0b3JzPik8cmVzdD4nLCA8c2VsZWN0b3JzPiwgPHJlc3Q+XVxuXG4gICAgICAgIC8vIFRoZSBgPHNlbGVjdG9ycz5gIGNvdWxkIGFjdHVhbGx5IGJlIGEgY29tbWEgc2VwYXJhdGVkIGxpc3Q6IGA6aG9zdC1jb250ZXh0KC5vbmUsIC50d28pYC5cbiAgICAgICAgY29uc3QgbmV3Q29udGV4dFNlbGVjdG9ycyA9XG4gICAgICAgICAgICAobWF0Y2hbMV0gPz8gJycpLnRyaW0oKS5zcGxpdCgnLCcpLm1hcChtID0+IG0udHJpbSgpKS5maWx0ZXIobSA9PiBtICE9PSAnJyk7XG5cbiAgICAgICAgLy8gV2UgbXVzdCBkdXBsaWNhdGUgdGhlIGN1cnJlbnQgc2VsZWN0b3IgZ3JvdXAgZm9yIGVhY2ggb2YgdGhlc2UgbmV3IHNlbGVjdG9ycy5cbiAgICAgICAgLy8gRm9yIGV4YW1wbGUgaWYgdGhlIGN1cnJlbnQgZ3JvdXBzIGFyZTpcbiAgICAgICAgLy8gYGBgXG4gICAgICAgIC8vIFtcbiAgICAgICAgLy8gICBbJ2EnLCAnYicsICdjJ10sXG4gICAgICAgIC8vICAgWyd4JywgJ3knLCAneiddLFxuICAgICAgICAvLyBdXG4gICAgICAgIC8vIGBgYFxuICAgICAgICAvLyBBbmQgd2UgaGF2ZSBhIG5ldyBzZXQgb2YgY29tbWEgc2VwYXJhdGVkIHNlbGVjdG9yczogYDpob3N0LWNvbnRleHQobSxuKWAgdGhlbiB0aGUgbmV3XG4gICAgICAgIC8vIGdyb3VwcyBhcmU6XG4gICAgICAgIC8vIGBgYFxuICAgICAgICAvLyBbXG4gICAgICAgIC8vICAgWydhJywgJ2InLCAnYycsICdtJ10sXG4gICAgICAgIC8vICAgWyd4JywgJ3knLCAneicsICdtJ10sXG4gICAgICAgIC8vICAgWydhJywgJ2InLCAnYycsICduJ10sXG4gICAgICAgIC8vICAgWyd4JywgJ3knLCAneicsICduJ10sXG4gICAgICAgIC8vIF1cbiAgICAgICAgLy8gYGBgXG4gICAgICAgIGNvbnN0IGNvbnRleHRTZWxlY3Rvckdyb3Vwc0xlbmd0aCA9IGNvbnRleHRTZWxlY3Rvckdyb3Vwcy5sZW5ndGg7XG4gICAgICAgIHJlcGVhdEdyb3Vwcyhjb250ZXh0U2VsZWN0b3JHcm91cHMsIG5ld0NvbnRleHRTZWxlY3RvcnMubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdDb250ZXh0U2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb250ZXh0U2VsZWN0b3JHcm91cHNMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29udGV4dFNlbGVjdG9yR3JvdXBzW2ogKyAoaSAqIGNvbnRleHRTZWxlY3Rvckdyb3Vwc0xlbmd0aCldLnB1c2goXG4gICAgICAgICAgICAgICAgbmV3Q29udGV4dFNlbGVjdG9yc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBgc2VsZWN0b3JUZXh0YCBhbmQgc2VlIHJlcGVhdCB0byBzZWUgaWYgdGhlcmUgYXJlIG1vcmUgYDpob3N0LWNvbnRleHRgcy5cbiAgICAgICAgc2VsZWN0b3JUZXh0ID0gbWF0Y2hbMl07XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0IHNlbGVjdG9ycyBub3cgbXVzdCBiZSBjb21iaW5lZCB3aXRoIGVhY2ggb3RoZXIgdG8gY2FwdHVyZSBhbGwgdGhlIHBvc3NpYmxlXG4gICAgICAvLyBzZWxlY3RvcnMgdGhhdCBgOmhvc3QtY29udGV4dGAgY2FuIG1hdGNoLiBTZWUgYGNvbWJpbmVIb3N0Q29udGV4dFNlbGVjdG9ycygpYCBmb3IgbW9yZVxuICAgICAgLy8gaW5mbyBhYm91dCBob3cgdGhpcyBpcyBkb25lLlxuICAgICAgcmV0dXJuIGNvbnRleHRTZWxlY3Rvckdyb3Vwc1xuICAgICAgICAgIC5tYXAoY29udGV4dFNlbGVjdG9ycyA9PiBjb21iaW5lSG9zdENvbnRleHRTZWxlY3RvcnMoY29udGV4dFNlbGVjdG9ycywgc2VsZWN0b3JUZXh0KSlcbiAgICAgICAgICAuam9pbignLCAnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIENvbnZlcnQgY29tYmluYXRvcnMgbGlrZSA6OnNoYWRvdyBhbmQgcHNldWRvLWVsZW1lbnRzIGxpa2UgOjpjb250ZW50XG4gICAqIGJ5IHJlcGxhY2luZyB3aXRoIHNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfY29udmVydFNoYWRvd0RPTVNlbGVjdG9ycyhjc3NUZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBfc2hhZG93RE9NU2VsZWN0b3JzUmUucmVkdWNlKChyZXN1bHQsIHBhdHRlcm4pID0+IHJlc3VsdC5yZXBsYWNlKHBhdHRlcm4sICcgJyksIGNzc1RleHQpO1xuICB9XG5cbiAgLy8gY2hhbmdlIGEgc2VsZWN0b3IgbGlrZSAnZGl2JyB0byAnbmFtZSBkaXYnXG4gIHByaXZhdGUgX3Njb3BlU2VsZWN0b3JzKGNzc1RleHQ6IHN0cmluZywgc2NvcGVTZWxlY3Rvcjogc3RyaW5nLCBob3N0U2VsZWN0b3I6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHByb2Nlc3NSdWxlcyhjc3NUZXh0LCAocnVsZTogQ3NzUnVsZSkgPT4ge1xuICAgICAgbGV0IHNlbGVjdG9yID0gcnVsZS5zZWxlY3RvcjtcbiAgICAgIGxldCBjb250ZW50ID0gcnVsZS5jb250ZW50O1xuICAgICAgaWYgKHJ1bGUuc2VsZWN0b3JbMF0gIT09ICdAJykge1xuICAgICAgICBzZWxlY3RvciA9XG4gICAgICAgICAgICB0aGlzLl9zY29wZVNlbGVjdG9yKHJ1bGUuc2VsZWN0b3IsIHNjb3BlU2VsZWN0b3IsIGhvc3RTZWxlY3RvciwgdGhpcy5zdHJpY3RTdHlsaW5nKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgcnVsZS5zZWxlY3Rvci5zdGFydHNXaXRoKCdAbWVkaWEnKSB8fCBydWxlLnNlbGVjdG9yLnN0YXJ0c1dpdGgoJ0BzdXBwb3J0cycpIHx8XG4gICAgICAgICAgcnVsZS5zZWxlY3Rvci5zdGFydHNXaXRoKCdAZG9jdW1lbnQnKSB8fCBydWxlLnNlbGVjdG9yLnN0YXJ0c1dpdGgoJ0BsYXllcicpKSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLl9zY29wZVNlbGVjdG9ycyhydWxlLmNvbnRlbnQsIHNjb3BlU2VsZWN0b3IsIGhvc3RTZWxlY3Rvcik7XG4gICAgICB9IGVsc2UgaWYgKHJ1bGUuc2VsZWN0b3Iuc3RhcnRzV2l0aCgnQGZvbnQtZmFjZScpIHx8IHJ1bGUuc2VsZWN0b3Iuc3RhcnRzV2l0aCgnQHBhZ2UnKSkge1xuICAgICAgICBjb250ZW50ID0gdGhpcy5fc3RyaXBTY29waW5nU2VsZWN0b3JzKHJ1bGUuY29udGVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IENzc1J1bGUoc2VsZWN0b3IsIGNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBhIGNzcyB0ZXh0IHRoYXQgaXMgd2l0aGluIGEgcnVsZSB0aGF0IHNob3VsZCBub3QgY29udGFpbiBzY29wZSBzZWxlY3RvcnMgYnkgc2ltcGx5XG4gICAqIHJlbW92aW5nIHRoZW0hIEFuIGV4YW1wbGUgb2Ygc3VjaCBhIHJ1bGUgaXMgYEBmb250LWZhY2VgLlxuICAgKlxuICAgKiBgQGZvbnQtZmFjZWAgcnVsZXMgY2Fubm90IGNvbnRhaW4gbmVzdGVkIHNlbGVjdG9ycy4gTm9yIGNhbiB0aGV5IGJlIG5lc3RlZCB1bmRlciBhIHNlbGVjdG9yLlxuICAgKiBOb3JtYWxseSB0aGlzIHdvdWxkIGJlIGEgc3ludGF4IGVycm9yIGJ5IHRoZSBhdXRob3Igb2YgdGhlIHN0eWxlcy4gQnV0IGluIHNvbWUgcmFyZSBjYXNlcywgc3VjaFxuICAgKiBhcyBpbXBvcnRpbmcgc3R5bGVzIGZyb20gYSBsaWJyYXJ5LCBhbmQgYXBwbHlpbmcgYDpob3N0IDo6bmctZGVlcGAgdG8gdGhlIGltcG9ydGVkIHN0eWxlcywgd2VcbiAgICogY2FuIGVuZCB1cCB3aXRoIGJyb2tlbiBjc3MgaWYgdGhlIGltcG9ydGVkIHN0eWxlcyBoYXBwZW4gdG8gY29udGFpbiBAZm9udC1mYWNlIHJ1bGVzLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogYGBgXG4gICAqIDpob3N0IDo6bmctZGVlcCB7XG4gICAqICAgaW1wb3J0ICdzb21lL2xpYi9jb250YWluaW5nL2ZvbnQtZmFjZSc7XG4gICAqIH1cbiAgICpcbiAgICogU2ltaWxhciBsb2dpYyBhcHBsaWVzIHRvIGBAcGFnZWAgcnVsZXMgd2hpY2ggY2FuIGNvbnRhaW4gYSBwYXJ0aWN1bGFyIHNldCBvZiBwcm9wZXJ0aWVzLFxuICAgKiBhcyB3ZWxsIGFzIHNvbWUgc3BlY2lmaWMgYXQtcnVsZXMuIFNpbmNlIHRoZXkgY2FuJ3QgYmUgZW5jYXBzdWxhdGVkLCB3ZSBoYXZlIHRvIHN0cmlwXG4gICAqIGFueSBzY29waW5nIHNlbGVjdG9ycyBmcm9tIHRoZW0uIEZvciBtb3JlIGluZm9ybWF0aW9uOiBodHRwczovL3d3dy53My5vcmcvVFIvY3NzLXBhZ2UtM1xuICAgKiBgYGBcbiAgICovXG4gIHByaXZhdGUgX3N0cmlwU2NvcGluZ1NlbGVjdG9ycyhjc3NUZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBwcm9jZXNzUnVsZXMoY3NzVGV4dCwgcnVsZSA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IHJ1bGUuc2VsZWN0b3IucmVwbGFjZShfc2hhZG93RGVlcFNlbGVjdG9ycywgJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoX3BvbHlmaWxsSG9zdE5vQ29tYmluYXRvclJlLCAnICcpO1xuICAgICAgcmV0dXJuIG5ldyBDc3NSdWxlKHNlbGVjdG9yLCBydWxlLmNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2NvcGVTZWxlY3RvcihcbiAgICAgIHNlbGVjdG9yOiBzdHJpbmcsIHNjb3BlU2VsZWN0b3I6IHN0cmluZywgaG9zdFNlbGVjdG9yOiBzdHJpbmcsIHN0cmljdDogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNlbGVjdG9yLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcChwYXJ0ID0+IHBhcnQudHJpbSgpLnNwbGl0KF9zaGFkb3dEZWVwU2VsZWN0b3JzKSlcbiAgICAgICAgLm1hcCgoZGVlcFBhcnRzKSA9PiB7XG4gICAgICAgICAgY29uc3QgW3NoYWxsb3dQYXJ0LCAuLi5vdGhlclBhcnRzXSA9IGRlZXBQYXJ0cztcbiAgICAgICAgICBjb25zdCBhcHBseVNjb3BlID0gKHNoYWxsb3dQYXJ0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3Rvck5lZWRzU2NvcGluZyhzaGFsbG93UGFydCwgc2NvcGVTZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0cmljdCA/XG4gICAgICAgICAgICAgICAgICB0aGlzLl9hcHBseVN0cmljdFNlbGVjdG9yU2NvcGUoc2hhbGxvd1BhcnQsIHNjb3BlU2VsZWN0b3IsIGhvc3RTZWxlY3RvcikgOlxuICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlTZWxlY3RvclNjb3BlKHNoYWxsb3dQYXJ0LCBzY29wZVNlbGVjdG9yLCBob3N0U2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNoYWxsb3dQYXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIFthcHBseVNjb3BlKHNoYWxsb3dQYXJ0KSwgLi4ub3RoZXJQYXJ0c10uam9pbignICcpO1xuICAgICAgICB9KVxuICAgICAgICAuam9pbignLCAnKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdG9yTmVlZHNTY29waW5nKHNlbGVjdG9yOiBzdHJpbmcsIHNjb3BlU2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlID0gdGhpcy5fbWFrZVNjb3BlTWF0Y2hlcihzY29wZVNlbGVjdG9yKTtcbiAgICByZXR1cm4gIXJlLnRlc3Qoc2VsZWN0b3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWFrZVNjb3BlTWF0Y2hlcihzY29wZVNlbGVjdG9yOiBzdHJpbmcpOiBSZWdFeHAge1xuICAgIGNvbnN0IGxyZSA9IC9cXFsvZztcbiAgICBjb25zdCBycmUgPSAvXFxdL2c7XG4gICAgc2NvcGVTZWxlY3RvciA9IHNjb3BlU2VsZWN0b3IucmVwbGFjZShscmUsICdcXFxcWycpLnJlcGxhY2UocnJlLCAnXFxcXF0nKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXignICsgc2NvcGVTZWxlY3RvciArICcpJyArIF9zZWxlY3RvclJlU3VmZml4LCAnbScpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlTZWxlY3RvclNjb3BlKHNlbGVjdG9yOiBzdHJpbmcsIHNjb3BlU2VsZWN0b3I6IHN0cmluZywgaG9zdFNlbGVjdG9yOiBzdHJpbmcpOlxuICAgICAgc3RyaW5nIHtcbiAgICAvLyBEaWZmZXJlbmNlIGZyb20gd2ViY29tcG9uZW50cy5qczogc2NvcGVTZWxlY3RvciBjb3VsZCBub3QgYmUgYW4gYXJyYXlcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlTaW1wbGVTZWxlY3RvclNjb3BlKHNlbGVjdG9yLCBzY29wZVNlbGVjdG9yLCBob3N0U2VsZWN0b3IpO1xuICB9XG5cbiAgLy8gc2NvcGUgdmlhIG5hbWUgYW5kIFtpcz1uYW1lXVxuICBwcml2YXRlIF9hcHBseVNpbXBsZVNlbGVjdG9yU2NvcGUoc2VsZWN0b3I6IHN0cmluZywgc2NvcGVTZWxlY3Rvcjogc3RyaW5nLCBob3N0U2VsZWN0b3I6IHN0cmluZyk6XG4gICAgICBzdHJpbmcge1xuICAgIC8vIEluIEFuZHJvaWQgYnJvd3NlciwgdGhlIGxhc3RJbmRleCBpcyBub3QgcmVzZXQgd2hlbiB0aGUgcmVnZXggaXMgdXNlZCBpbiBTdHJpbmcucmVwbGFjZSgpXG4gICAgX3BvbHlmaWxsSG9zdFJlLmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKF9wb2x5ZmlsbEhvc3RSZS50ZXN0KHNlbGVjdG9yKSkge1xuICAgICAgY29uc3QgcmVwbGFjZUJ5ID0gdGhpcy5zdHJpY3RTdHlsaW5nID8gYFske2hvc3RTZWxlY3Rvcn1dYCA6IHNjb3BlU2VsZWN0b3I7XG4gICAgICByZXR1cm4gc2VsZWN0b3JcbiAgICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAgICAgX3BvbHlmaWxsSG9zdE5vQ29tYmluYXRvclJlLFxuICAgICAgICAgICAgICAoaG5jLCBzZWxlY3RvcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3Rvci5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAvKFteOl0qKSg6KikoLiopLyxcbiAgICAgICAgICAgICAgICAgICAgKF86IHN0cmluZywgYmVmb3JlOiBzdHJpbmcsIGNvbG9uOiBzdHJpbmcsIGFmdGVyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVmb3JlICsgcmVwbGFjZUJ5ICsgY29sb24gKyBhZnRlcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgLnJlcGxhY2UoX3BvbHlmaWxsSG9zdFJlLCByZXBsYWNlQnkgKyAnICcpO1xuICAgIH1cblxuICAgIHJldHVybiBzY29wZVNlbGVjdG9yICsgJyAnICsgc2VsZWN0b3I7XG4gIH1cblxuICAvLyByZXR1cm4gYSBzZWxlY3RvciB3aXRoIFtuYW1lXSBzdWZmaXggb24gZWFjaCBzaW1wbGUgc2VsZWN0b3JcbiAgLy8gZS5nLiAuZm9vLmJhciA+IC56b3QgYmVjb21lcyAuZm9vW25hbWVdLmJhcltuYW1lXSA+IC56b3RbbmFtZV0gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfYXBwbHlTdHJpY3RTZWxlY3RvclNjb3BlKHNlbGVjdG9yOiBzdHJpbmcsIHNjb3BlU2VsZWN0b3I6IHN0cmluZywgaG9zdFNlbGVjdG9yOiBzdHJpbmcpOlxuICAgICAgc3RyaW5nIHtcbiAgICBjb25zdCBpc1JlID0gL1xcW2lzPShbXlxcXV0qKVxcXS9nO1xuICAgIHNjb3BlU2VsZWN0b3IgPSBzY29wZVNlbGVjdG9yLnJlcGxhY2UoaXNSZSwgKF86IHN0cmluZywgLi4ucGFydHM6IHN0cmluZ1tdKSA9PiBwYXJ0c1swXSk7XG5cbiAgICBjb25zdCBhdHRyTmFtZSA9ICdbJyArIHNjb3BlU2VsZWN0b3IgKyAnXSc7XG5cbiAgICBjb25zdCBfc2NvcGVTZWxlY3RvclBhcnQgPSAocDogc3RyaW5nKSA9PiB7XG4gICAgICBsZXQgc2NvcGVkUCA9IHAudHJpbSgpO1xuXG4gICAgICBpZiAoIXNjb3BlZFApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICBpZiAocC5pbmRleE9mKF9wb2x5ZmlsbEhvc3ROb0NvbWJpbmF0b3IpID4gLTEpIHtcbiAgICAgICAgc2NvcGVkUCA9IHRoaXMuX2FwcGx5U2ltcGxlU2VsZWN0b3JTY29wZShwLCBzY29wZVNlbGVjdG9yLCBob3N0U2VsZWN0b3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVtb3ZlIDpob3N0IHNpbmNlIGl0IHNob3VsZCBiZSB1bm5lY2Vzc2FyeVxuICAgICAgICBjb25zdCB0ID0gcC5yZXBsYWNlKF9wb2x5ZmlsbEhvc3RSZSwgJycpO1xuICAgICAgICBpZiAodC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHQubWF0Y2goLyhbXjpdKikoOiopKC4qKS8pO1xuICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBzY29wZWRQID0gbWF0Y2hlc1sxXSArIGF0dHJOYW1lICsgbWF0Y2hlc1syXSArIG1hdGNoZXNbM107XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzY29wZWRQO1xuICAgIH07XG5cbiAgICBjb25zdCBzYWZlQ29udGVudCA9IG5ldyBTYWZlU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIHNlbGVjdG9yID0gc2FmZUNvbnRlbnQuY29udGVudCgpO1xuXG4gICAgbGV0IHNjb3BlZFNlbGVjdG9yID0gJyc7XG4gICAgbGV0IHN0YXJ0SW5kZXggPSAwO1xuICAgIGxldCByZXM6IFJlZ0V4cEV4ZWNBcnJheXxudWxsO1xuICAgIGNvbnN0IHNlcCA9IC8oIHw+fFxcK3x+KD8hPSkpXFxzKi9nO1xuXG4gICAgLy8gSWYgYSBzZWxlY3RvciBhcHBlYXJzIGJlZm9yZSA6aG9zdCBpdCBzaG91bGQgbm90IGJlIHNoaW1tZWQgYXMgaXRcbiAgICAvLyBtYXRjaGVzIG9uIGFuY2VzdG9yIGVsZW1lbnRzIGFuZCBub3Qgb24gZWxlbWVudHMgaW4gdGhlIGhvc3QncyBzaGFkb3dcbiAgICAvLyBgOmhvc3QtY29udGV4dChkaXYpYCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAgIC8vIGAtc2hhZG93Y3NzaG9zdC1uby1jb21iaW5hdG9yZGl2LCBkaXYgLXNoYWRvd2Nzc2hvc3Qtbm8tY29tYmluYXRvcmBcbiAgICAvLyB0aGUgYGRpdmAgaXMgbm90IHBhcnQgb2YgdGhlIGNvbXBvbmVudCBpbiB0aGUgMm5kIHNlbGVjdG9ycyBhbmQgc2hvdWxkIG5vdCBiZSBzY29wZWQuXG4gICAgLy8gSGlzdG9yaWNhbGx5IGBjb21wb25lbnQtdGFnOmhvc3RgIHdhcyBtYXRjaGluZyB0aGUgY29tcG9uZW50IHNvIHdlIGFsc28gd2FudCB0byBwcmVzZXJ2ZVxuICAgIC8vIHRoaXMgYmVoYXZpb3IgdG8gYXZvaWQgYnJlYWtpbmcgbGVnYWN5IGFwcHMgKGl0IHNob3VsZCBub3QgbWF0Y2gpLlxuICAgIC8vIFRoZSBiZWhhdmlvciBzaG91bGQgYmU6XG4gICAgLy8gLSBgdGFnOmhvc3RgIC0+IGB0YWdbaF1gICh0aGlzIGlzIHRvIGF2b2lkIGJyZWFraW5nIGxlZ2FjeSBhcHBzLCBzaG91bGQgbm90IG1hdGNoIGFueXRoaW5nKVxuICAgIC8vIC0gYHRhZyA6aG9zdGAgLT4gYHRhZyBbaF1gIChgdGFnYCBpcyBub3Qgc2NvcGVkIGJlY2F1c2UgaXQncyBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vICAgYDpob3N0LWNvbnRleHQodGFnKWApXG4gICAgY29uc3QgaGFzSG9zdCA9IHNlbGVjdG9yLmluZGV4T2YoX3BvbHlmaWxsSG9zdE5vQ29tYmluYXRvcikgPiAtMTtcbiAgICAvLyBPbmx5IHNjb3BlIHBhcnRzIGFmdGVyIHRoZSBmaXJzdCBgLXNoYWRvd2Nzc2hvc3Qtbm8tY29tYmluYXRvcmAgd2hlbiBpdCBpcyBwcmVzZW50XG4gICAgbGV0IHNob3VsZFNjb3BlID0gIWhhc0hvc3Q7XG5cbiAgICB3aGlsZSAoKHJlcyA9IHNlcC5leGVjKHNlbGVjdG9yKSkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlcGFyYXRvciA9IHJlc1sxXTtcbiAgICAgIGNvbnN0IHBhcnQgPSBzZWxlY3Rvci5zbGljZShzdGFydEluZGV4LCByZXMuaW5kZXgpLnRyaW0oKTtcbiAgICAgIHNob3VsZFNjb3BlID0gc2hvdWxkU2NvcGUgfHwgcGFydC5pbmRleE9mKF9wb2x5ZmlsbEhvc3ROb0NvbWJpbmF0b3IpID4gLTE7XG4gICAgICBjb25zdCBzY29wZWRQYXJ0ID0gc2hvdWxkU2NvcGUgPyBfc2NvcGVTZWxlY3RvclBhcnQocGFydCkgOiBwYXJ0O1xuICAgICAgc2NvcGVkU2VsZWN0b3IgKz0gYCR7c2NvcGVkUGFydH0gJHtzZXBhcmF0b3J9IGA7XG4gICAgICBzdGFydEluZGV4ID0gc2VwLmxhc3RJbmRleDtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJ0ID0gc2VsZWN0b3Iuc3Vic3RyaW5nKHN0YXJ0SW5kZXgpO1xuICAgIHNob3VsZFNjb3BlID0gc2hvdWxkU2NvcGUgfHwgcGFydC5pbmRleE9mKF9wb2x5ZmlsbEhvc3ROb0NvbWJpbmF0b3IpID4gLTE7XG4gICAgc2NvcGVkU2VsZWN0b3IgKz0gc2hvdWxkU2NvcGUgPyBfc2NvcGVTZWxlY3RvclBhcnQocGFydCkgOiBwYXJ0O1xuXG4gICAgLy8gcmVwbGFjZSB0aGUgcGxhY2Vob2xkZXJzIHdpdGggdGhlaXIgb3JpZ2luYWwgdmFsdWVzXG4gICAgcmV0dXJuIHNhZmVDb250ZW50LnJlc3RvcmUoc2NvcGVkU2VsZWN0b3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5zZXJ0UG9seWZpbGxIb3N0SW5Dc3NUZXh0KHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzZWxlY3Rvci5yZXBsYWNlKF9jb2xvbkhvc3RDb250ZXh0UmUsIF9wb2x5ZmlsbEhvc3RDb250ZXh0KVxuICAgICAgICAucmVwbGFjZShfY29sb25Ib3N0UmUsIF9wb2x5ZmlsbEhvc3QpO1xuICB9XG59XG5cbmNsYXNzIFNhZmVTZWxlY3RvciB7XG4gIHByaXZhdGUgcGxhY2Vob2xkZXJzOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIGluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfY29udGVudDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICAvLyBSZXBsYWNlcyBhdHRyaWJ1dGUgc2VsZWN0b3JzIHdpdGggcGxhY2Vob2xkZXJzLlxuICAgIC8vIFRoZSBXUyBpbiBbYXR0cj1cInZhIGx1ZVwiXSB3b3VsZCBvdGhlcndpc2UgYmUgaW50ZXJwcmV0ZWQgYXMgYSBzZWxlY3RvciBzZXBhcmF0b3IuXG4gICAgc2VsZWN0b3IgPSB0aGlzLl9lc2NhcGVSZWdleE1hdGNoZXMoc2VsZWN0b3IsIC8oXFxbW15cXF1dKlxcXSkvZyk7XG5cbiAgICAvLyBDU1MgYWxsb3dzIGZvciBjZXJ0YWluIHNwZWNpYWwgY2hhcmFjdGVycyB0byBiZSB1c2VkIGluIHNlbGVjdG9ycyBpZiB0aGV5J3JlIGVzY2FwZWQuXG4gICAgLy8gRS5nLiBgLmZvbzpibHVlYCB3b24ndCBtYXRjaCBhIGNsYXNzIGNhbGxlZCBgZm9vOmJsdWVgLCBiZWNhdXNlIHRoZSBjb2xvbiBkZW5vdGVzIGFcbiAgICAvLyBwc2V1ZG8tY2xhc3MsIGJ1dCB3cml0aW5nIGAuZm9vXFw6Ymx1ZWAgd2lsbCBtYXRjaCwgYmVjYXVzZSB0aGUgY29sb24gd2FzIGVzY2FwZWQuXG4gICAgLy8gUmVwbGFjZSBhbGwgZXNjYXBlIHNlcXVlbmNlcyAoYFxcYCBmb2xsb3dlZCBieSBhIGNoYXJhY3Rlcikgd2l0aCBhIHBsYWNlaG9sZGVyIHNvXG4gICAgLy8gdGhhdCBvdXIgaGFuZGxpbmcgb2YgcHNldWRvLXNlbGVjdG9ycyBkb2Vzbid0IG1lc3Mgd2l0aCB0aGVtLlxuICAgIHNlbGVjdG9yID0gdGhpcy5fZXNjYXBlUmVnZXhNYXRjaGVzKHNlbGVjdG9yLCAvKFxcXFwuKS9nKTtcblxuICAgIC8vIFJlcGxhY2VzIHRoZSBleHByZXNzaW9uIGluIGA6bnRoLWNoaWxkKDJuICsgMSlgIHdpdGggYSBwbGFjZWhvbGRlci5cbiAgICAvLyBXUyBhbmQgXCIrXCIgd291bGQgb3RoZXJ3aXNlIGJlIGludGVycHJldGVkIGFzIHNlbGVjdG9yIHNlcGFyYXRvcnMuXG4gICAgdGhpcy5fY29udGVudCA9IHNlbGVjdG9yLnJlcGxhY2UoLyg6bnRoLVstXFx3XSspKFxcKFteKV0rXFwpKS9nLCAoXywgcHNldWRvLCBleHApID0+IHtcbiAgICAgIGNvbnN0IHJlcGxhY2VCeSA9IGBfX3BoLSR7dGhpcy5pbmRleH1fX2A7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVycy5wdXNoKGV4cCk7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgICByZXR1cm4gcHNldWRvICsgcmVwbGFjZUJ5O1xuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZShjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb250ZW50LnJlcGxhY2UoL19fcGgtKFxcZCspX18vZywgKF9waCwgaW5kZXgpID0+IHRoaXMucGxhY2Vob2xkZXJzWytpbmRleF0pO1xuICB9XG5cbiAgY29udGVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3Vic3RyaW5ncyB0aGF0IG1hdGNoIGEgcmVnZXggd2l0aGluIGFcbiAgICogc3BlY2lhbCBzdHJpbmcgKGUuZy4gYF9fcGgtMF9fYCwgYF9fcGgtMV9fYCwgZXRjKS5cbiAgICovXG4gIHByaXZhdGUgX2VzY2FwZVJlZ2V4TWF0Y2hlcyhjb250ZW50OiBzdHJpbmcsIHBhdHRlcm46IFJlZ0V4cCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvbnRlbnQucmVwbGFjZShwYXR0ZXJuLCAoXywga2VlcCkgPT4ge1xuICAgICAgY29uc3QgcmVwbGFjZUJ5ID0gYF9fcGgtJHt0aGlzLmluZGV4fV9fYDtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJzLnB1c2goa2VlcCk7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgICByZXR1cm4gcmVwbGFjZUJ5O1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IF9jc3NDb250ZW50TmV4dFNlbGVjdG9yUmUgPVxuICAgIC9wb2x5ZmlsbC1uZXh0LXNlbGVjdG9yW159XSpjb250ZW50OltcXHNdKj8oWydcIl0pKC4qPylcXDFbO1xcc10qfShbXntdKj8pey9naW07XG5jb25zdCBfY3NzQ29udGVudFJ1bGVSZSA9IC8ocG9seWZpbGwtcnVsZSlbXn1dKihjb250ZW50OltcXHNdKihbJ1wiXSkoLio/KVxcMylbO1xcc10qW159XSp9L2dpbTtcbmNvbnN0IF9jc3NDb250ZW50VW5zY29wZWRSdWxlUmUgPVxuICAgIC8ocG9seWZpbGwtdW5zY29wZWQtcnVsZSlbXn1dKihjb250ZW50OltcXHNdKihbJ1wiXSkoLio/KVxcMylbO1xcc10qW159XSp9L2dpbTtcbmNvbnN0IF9wb2x5ZmlsbEhvc3QgPSAnLXNoYWRvd2Nzc2hvc3QnO1xuLy8gbm90ZTogOmhvc3QtY29udGV4dCBwcmUtcHJvY2Vzc2VkIHRvIC1zaGFkb3djc3Nob3N0Y29udGV4dC5cbmNvbnN0IF9wb2x5ZmlsbEhvc3RDb250ZXh0ID0gJy1zaGFkb3djc3Njb250ZXh0JztcbmNvbnN0IF9wYXJlblN1ZmZpeCA9ICcoPzpcXFxcKCgnICtcbiAgICAnKD86XFxcXChbXikoXSpcXFxcKXxbXikoXSopKz8nICtcbiAgICAnKVxcXFwpKT8oW14se10qKSc7XG5jb25zdCBfY3NzQ29sb25Ib3N0UmUgPSBuZXcgUmVnRXhwKF9wb2x5ZmlsbEhvc3QgKyBfcGFyZW5TdWZmaXgsICdnaW0nKTtcbmNvbnN0IF9jc3NDb2xvbkhvc3RDb250ZXh0UmVHbG9iYWwgPSBuZXcgUmVnRXhwKF9wb2x5ZmlsbEhvc3RDb250ZXh0ICsgX3BhcmVuU3VmZml4LCAnZ2ltJyk7XG5jb25zdCBfY3NzQ29sb25Ib3N0Q29udGV4dFJlID0gbmV3IFJlZ0V4cChfcG9seWZpbGxIb3N0Q29udGV4dCArIF9wYXJlblN1ZmZpeCwgJ2ltJyk7XG5jb25zdCBfcG9seWZpbGxIb3N0Tm9Db21iaW5hdG9yID0gX3BvbHlmaWxsSG9zdCArICctbm8tY29tYmluYXRvcic7XG5jb25zdCBfcG9seWZpbGxIb3N0Tm9Db21iaW5hdG9yUmUgPSAvLXNoYWRvd2Nzc2hvc3Qtbm8tY29tYmluYXRvcihbXlxcc10qKS87XG5jb25zdCBfc2hhZG93RE9NU2VsZWN0b3JzUmUgPSBbXG4gIC86OnNoYWRvdy9nLFxuICAvOjpjb250ZW50L2csXG4gIC8vIERlcHJlY2F0ZWQgc2VsZWN0b3JzXG4gIC9cXC9zaGFkb3ctZGVlcFxcLy9nLFxuICAvXFwvc2hhZG93XFwvL2csXG5dO1xuXG4vLyBUaGUgZGVlcCBjb21iaW5hdG9yIGlzIGRlcHJlY2F0ZWQgaW4gdGhlIENTUyBzcGVjXG4vLyBTdXBwb3J0IGZvciBgPj4+YCwgYGRlZXBgLCBgOjpuZy1kZWVwYCBpcyB0aGVuIGFsc28gZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUuXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9wdWxsLzE3Njc3XG5jb25zdCBfc2hhZG93RGVlcFNlbGVjdG9ycyA9IC8oPzo+Pj4pfCg/OlxcL2RlZXBcXC8pfCg/Ojo6bmctZGVlcCkvZztcbmNvbnN0IF9zZWxlY3RvclJlU3VmZml4ID0gJyhbPlxcXFxzfitbLix7Ol1bXFxcXHNcXFxcU10qKT8kJztcbmNvbnN0IF9wb2x5ZmlsbEhvc3RSZSA9IC8tc2hhZG93Y3NzaG9zdC9naW07XG5jb25zdCBfY29sb25Ib3N0UmUgPSAvOmhvc3QvZ2ltO1xuY29uc3QgX2NvbG9uSG9zdENvbnRleHRSZSA9IC86aG9zdC1jb250ZXh0L2dpbTtcblxuY29uc3QgX2NvbW1lbnRSZSA9IC9cXC9cXCpbXFxzXFxTXSo/XFwqXFwvL2c7XG5cbmZ1bmN0aW9uIHN0cmlwQ29tbWVudHMoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBpbnB1dC5yZXBsYWNlKF9jb21tZW50UmUsICcnKTtcbn1cblxuY29uc3QgX2NvbW1lbnRXaXRoSGFzaFJlID0gL1xcL1xcKlxccyojXFxzKnNvdXJjZShNYXBwaW5nKT9VUkw9W1xcc1xcU10rP1xcKlxcLy9nO1xuXG5mdW5jdGlvbiBleHRyYWN0Q29tbWVudHNXaXRoSGFzaChpbnB1dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICByZXR1cm4gaW5wdXQubWF0Y2goX2NvbW1lbnRXaXRoSGFzaFJlKSB8fCBbXTtcbn1cblxuY29uc3QgQkxPQ0tfUExBQ0VIT0xERVIgPSAnJUJMT0NLJSc7XG5jb25zdCBfcnVsZVJlID0gLyhcXHMqKShbXjtcXHtcXH1dKz8pKFxccyopKCg/OnslQkxPQ0slfT9cXHMqOz8pfCg/Olxccyo7KSkvZztcbmNvbnN0IENPTlRFTlRfUEFJUlMgPSBuZXcgTWFwKFtbJ3snLCAnfSddXSk7XG5cbmNvbnN0IENPTU1BX0lOX1BMQUNFSE9MREVSID0gJyVDT01NQV9JTl9QTEFDRUhPTERFUiUnO1xuY29uc3QgU0VNSV9JTl9QTEFDRUhPTERFUiA9ICclU0VNSV9JTl9QTEFDRUhPTERFUiUnO1xuY29uc3QgQ09MT05fSU5fUExBQ0VIT0xERVIgPSAnJUNPTE9OX0lOX1BMQUNFSE9MREVSJSc7XG5cbmNvbnN0IF9jc3NDb21tYUluUGxhY2Vob2xkZXJSZUdsb2JhbCA9IG5ldyBSZWdFeHAoQ09NTUFfSU5fUExBQ0VIT0xERVIsICdnJyk7XG5jb25zdCBfY3NzU2VtaUluUGxhY2Vob2xkZXJSZUdsb2JhbCA9IG5ldyBSZWdFeHAoU0VNSV9JTl9QTEFDRUhPTERFUiwgJ2cnKTtcbmNvbnN0IF9jc3NDb2xvbkluUGxhY2Vob2xkZXJSZUdsb2JhbCA9IG5ldyBSZWdFeHAoQ09MT05fSU5fUExBQ0VIT0xERVIsICdnJyk7XG5cbmV4cG9ydCBjbGFzcyBDc3NSdWxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNlbGVjdG9yOiBzdHJpbmcsIHB1YmxpYyBjb250ZW50OiBzdHJpbmcpIHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzUnVsZXMoaW5wdXQ6IHN0cmluZywgcnVsZUNhbGxiYWNrOiAocnVsZTogQ3NzUnVsZSkgPT4gQ3NzUnVsZSk6IHN0cmluZyB7XG4gIGNvbnN0IGVzY2FwZWQgPSBlc2NhcGVJblN0cmluZ3MoaW5wdXQpO1xuICBjb25zdCBpbnB1dFdpdGhFc2NhcGVkQmxvY2tzID0gZXNjYXBlQmxvY2tzKGVzY2FwZWQsIENPTlRFTlRfUEFJUlMsIEJMT0NLX1BMQUNFSE9MREVSKTtcbiAgbGV0IG5leHRCbG9ja0luZGV4ID0gMDtcbiAgY29uc3QgZXNjYXBlZFJlc3VsdCA9IGlucHV0V2l0aEVzY2FwZWRCbG9ja3MuZXNjYXBlZFN0cmluZy5yZXBsYWNlKF9ydWxlUmUsICguLi5tOiBzdHJpbmdbXSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gbVsyXTtcbiAgICBsZXQgY29udGVudCA9ICcnO1xuICAgIGxldCBzdWZmaXggPSBtWzRdO1xuICAgIGxldCBjb250ZW50UHJlZml4ID0gJyc7XG4gICAgaWYgKHN1ZmZpeCAmJiBzdWZmaXguc3RhcnRzV2l0aCgneycgKyBCTE9DS19QTEFDRUhPTERFUikpIHtcbiAgICAgIGNvbnRlbnQgPSBpbnB1dFdpdGhFc2NhcGVkQmxvY2tzLmJsb2Nrc1tuZXh0QmxvY2tJbmRleCsrXTtcbiAgICAgIHN1ZmZpeCA9IHN1ZmZpeC5zdWJzdHJpbmcoQkxPQ0tfUExBQ0VIT0xERVIubGVuZ3RoICsgMSk7XG4gICAgICBjb250ZW50UHJlZml4ID0gJ3snO1xuICAgIH1cbiAgICBjb25zdCBydWxlID0gcnVsZUNhbGxiYWNrKG5ldyBDc3NSdWxlKHNlbGVjdG9yLCBjb250ZW50KSk7XG4gICAgcmV0dXJuIGAke21bMV19JHtydWxlLnNlbGVjdG9yfSR7bVszXX0ke2NvbnRlbnRQcmVmaXh9JHtydWxlLmNvbnRlbnR9JHtzdWZmaXh9YDtcbiAgfSk7XG4gIHJldHVybiB1bmVzY2FwZUluU3RyaW5ncyhlc2NhcGVkUmVzdWx0KTtcbn1cblxuY2xhc3MgU3RyaW5nV2l0aEVzY2FwZWRCbG9ja3Mge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXNjYXBlZFN0cmluZzogc3RyaW5nLCBwdWJsaWMgYmxvY2tzOiBzdHJpbmdbXSkge31cbn1cblxuZnVuY3Rpb24gZXNjYXBlQmxvY2tzKFxuICAgIGlucHV0OiBzdHJpbmcsIGNoYXJQYWlyczogTWFwPHN0cmluZywgc3RyaW5nPiwgcGxhY2Vob2xkZXI6IHN0cmluZyk6IFN0cmluZ1dpdGhFc2NhcGVkQmxvY2tzIHtcbiAgY29uc3QgcmVzdWx0UGFydHM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IGVzY2FwZWRCbG9ja3M6IHN0cmluZ1tdID0gW107XG4gIGxldCBvcGVuQ2hhckNvdW50ID0gMDtcbiAgbGV0IG5vbkJsb2NrU3RhcnRJbmRleCA9IDA7XG4gIGxldCBibG9ja1N0YXJ0SW5kZXggPSAtMTtcbiAgbGV0IG9wZW5DaGFyOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBsZXQgY2xvc2VDaGFyOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IGlucHV0W2ldO1xuICAgIGlmIChjaGFyID09PSAnXFxcXCcpIHtcbiAgICAgIGkrKztcbiAgICB9IGVsc2UgaWYgKGNoYXIgPT09IGNsb3NlQ2hhcikge1xuICAgICAgb3BlbkNoYXJDb3VudC0tO1xuICAgICAgaWYgKG9wZW5DaGFyQ291bnQgPT09IDApIHtcbiAgICAgICAgZXNjYXBlZEJsb2Nrcy5wdXNoKGlucHV0LnN1YnN0cmluZyhibG9ja1N0YXJ0SW5kZXgsIGkpKTtcbiAgICAgICAgcmVzdWx0UGFydHMucHVzaChwbGFjZWhvbGRlcik7XG4gICAgICAgIG5vbkJsb2NrU3RhcnRJbmRleCA9IGk7XG4gICAgICAgIGJsb2NrU3RhcnRJbmRleCA9IC0xO1xuICAgICAgICBvcGVuQ2hhciA9IGNsb3NlQ2hhciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNoYXIgPT09IG9wZW5DaGFyKSB7XG4gICAgICBvcGVuQ2hhckNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChvcGVuQ2hhckNvdW50ID09PSAwICYmIGNoYXJQYWlycy5oYXMoY2hhcikpIHtcbiAgICAgIG9wZW5DaGFyID0gY2hhcjtcbiAgICAgIGNsb3NlQ2hhciA9IGNoYXJQYWlycy5nZXQoY2hhcik7XG4gICAgICBvcGVuQ2hhckNvdW50ID0gMTtcbiAgICAgIGJsb2NrU3RhcnRJbmRleCA9IGkgKyAxO1xuICAgICAgcmVzdWx0UGFydHMucHVzaChpbnB1dC5zdWJzdHJpbmcobm9uQmxvY2tTdGFydEluZGV4LCBibG9ja1N0YXJ0SW5kZXgpKTtcbiAgICB9XG4gIH1cbiAgaWYgKGJsb2NrU3RhcnRJbmRleCAhPT0gLTEpIHtcbiAgICBlc2NhcGVkQmxvY2tzLnB1c2goaW5wdXQuc3Vic3RyaW5nKGJsb2NrU3RhcnRJbmRleCkpO1xuICAgIHJlc3VsdFBhcnRzLnB1c2gocGxhY2Vob2xkZXIpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdFBhcnRzLnB1c2goaW5wdXQuc3Vic3RyaW5nKG5vbkJsb2NrU3RhcnRJbmRleCkpO1xuICB9XG4gIHJldHVybiBuZXcgU3RyaW5nV2l0aEVzY2FwZWRCbG9ja3MocmVzdWx0UGFydHMuam9pbignJyksIGVzY2FwZWRCbG9ja3MpO1xufVxuXG4vKipcbiAqIE9iamVjdCBjb250YWluaW5nIGFzIGtleXMgY2hhcmFjdGVycyB0aGF0IHNob3VsZCBiZSBzdWJzdGl0dXRlZCBieSBwbGFjZWhvbGRlcnNcbiAqIHdoZW4gZm91bmQgaW4gc3RyaW5ncyBkdXJpbmcgdGhlIGNzcyB0ZXh0IHBhcnNpbmcsIGFuZCBhcyB2YWx1ZXMgdGhlIHJlc3BlY3RpdmVcbiAqIHBsYWNlaG9sZGVyc1xuICovXG5jb25zdCBFU0NBUEVfSU5fU1RSSU5HX01BUDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICc7JzogU0VNSV9JTl9QTEFDRUhPTERFUixcbiAgJywnOiBDT01NQV9JTl9QTEFDRUhPTERFUixcbiAgJzonOiBDT0xPTl9JTl9QTEFDRUhPTERFUlxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgcHJvdmlkZWQgY3NzIHRleHQgYW5kIGluc2lkZSBzdHJpbmdzIChtZWFuaW5nLCBpbnNpZGUgcGFpcnMgb2YgdW5lc2NhcGVkIHNpbmdsZSBvclxuICogZG91YmxlIHF1b3RlcykgcmVwbGFjZSBzcGVjaWZpYyBjaGFyYWN0ZXJzIHdpdGggdGhlaXIgcmVzcGVjdGl2ZSBwbGFjZWhvbGRlcnMgYXMgaW5kaWNhdGVkXG4gKiBieSB0aGUgYEVTQ0FQRV9JTl9TVFJJTkdfTUFQYCBtYXAuXG4gKlxuICogRm9yIGV4YW1wbGUgY29udmVydCB0aGUgdGV4dFxuICogIGBhbmltYXRpb246IFwibXktYW5pbTphdFxcXCJpb25cIiAxcztgXG4gKiB0b1xuICogIGBhbmltYXRpb246IFwibXktYW5pbSVDT0xPTl9JTl9QTEFDRUhPTERFUiVhdFxcXCJpb25cIiAxcztgXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgaW4gb3JkZXIgdG8gcmVtb3ZlIHRoZSBtZWFuaW5nIG9mIHNvbWUgY2hhcmFjdGVycyB3aGVuIGZvdW5kIGluc2lkZSBzdHJpbmdzXG4gKiAoZm9yIGV4YW1wbGUgYDtgIGluZGljYXRlcyB0aGUgZW5kIG9mIGEgY3NzIGRlY2xhcmF0aW9uLCBgLGAgdGhlIHNlcXVlbmNlIG9mIHZhbHVlcyBhbmQgYDpgIHRoZVxuICogZGl2aXNpb24gYmV0d2VlbiBwcm9wZXJ0eSBhbmQgdmFsdWUgZHVyaW5nIGEgZGVjbGFyYXRpb24sIG5vbmUgb2YgdGhlc2UgbWVhbmluZ3MgYXBwbHkgd2hlbiBzdWNoXG4gKiBjaGFyYWN0ZXJzIGFyZSB3aXRoaW4gc3RyaW5ncyBhbmQgc28gaW4gb3JkZXIgdG8gcHJldmVudCBwYXJzaW5nIGlzc3VlcyB0aGV5IG5lZWQgdG8gYmUgcmVwbGFjZWRcbiAqIHdpdGggcGxhY2Vob2xkZXIgdGV4dCBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoZSBjc3MgbWFuaXB1bGF0aW9uIHByb2Nlc3MpLlxuICpcbiAqIEBwYXJhbSBpbnB1dCB0aGUgb3JpZ2luYWwgY3NzIHRleHQuXG4gKlxuICogQHJldHVybnMgdGhlIGNzcyB0ZXh0IHdpdGggc3BlY2lmaWMgY2hhcmFjdGVycyBpbiBzdHJpbmdzIHJlcGxhY2VkIGJ5IHBsYWNlaG9sZGVycy5cbiAqKi9cbmZ1bmN0aW9uIGVzY2FwZUluU3RyaW5ncyhpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9IGlucHV0O1xuICBsZXQgY3VycmVudFF1b3RlQ2hhcjogc3RyaW5nfG51bGwgPSBudWxsO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSByZXN1bHRbaV07XG4gICAgaWYgKGNoYXIgPT09ICdcXFxcJykge1xuICAgICAgaSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VycmVudFF1b3RlQ2hhciAhPT0gbnVsbCkge1xuICAgICAgICAvLyBpbmRleCBpIGlzIGluc2lkZSBhIHF1b3RlZCBzdWItc3RyaW5nXG4gICAgICAgIGlmIChjaGFyID09PSBjdXJyZW50UXVvdGVDaGFyKSB7XG4gICAgICAgICAgY3VycmVudFF1b3RlQ2hhciA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXI6IHN0cmluZ3x1bmRlZmluZWQgPSBFU0NBUEVfSU5fU1RSSU5HX01BUFtjaGFyXTtcbiAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGAke3Jlc3VsdC5zdWJzdHIoMCwgaSl9JHtwbGFjZWhvbGRlcn0ke3Jlc3VsdC5zdWJzdHIoaSArIDEpfWA7XG4gICAgICAgICAgICBpICs9IHBsYWNlaG9sZGVyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT09ICdcXCcnIHx8IGNoYXIgPT09ICdcIicpIHtcbiAgICAgICAgY3VycmVudFF1b3RlQ2hhciA9IGNoYXI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogUmVwbGFjZSBpbiBhIHN0cmluZyBhbGwgb2NjdXJyZW5jZXMgb2Yga2V5cyBpbiB0aGUgYEVTQ0FQRV9JTl9TVFJJTkdfTUFQYCBtYXAgd2l0aCB0aGVpclxuICogb3JpZ2luYWwgcmVwcmVzZW50YXRpb24sIHRoaXMgaXMgc2ltcGx5IHVzZWQgdG8gcmV2ZXJ0IHRoZSBjaGFuZ2VzIGFwcGxpZWQgYnkgdGhlXG4gKiBlc2NhcGVJblN0cmluZ3MgZnVuY3Rpb24uXG4gKlxuICogRm9yIGV4YW1wbGUgaXQgcmV2ZXJ0cyB0aGUgdGV4dDpcbiAqICBgYW5pbWF0aW9uOiBcIm15LWFuaW0lQ09MT05fSU5fUExBQ0VIT0xERVIlYXRcXFwiaW9uXCIgMXM7YFxuICogdG8gaXQncyBvcmlnaW5hbCBmb3JtIG9mOlxuICogIGBhbmltYXRpb246IFwibXktYW5pbTphdFxcXCJpb25cIiAxcztgXG4gKlxuICogTm90ZTogRm9yIHRoZSBzYWtlIG9mIHNpbXBsaWNpdHkgdGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBjaGVjayB0aGF0IHRoZSBwbGFjZWhvbGRlcnMgYXJlXG4gKiBhY3R1YWxseSBpbnNpZGUgc3RyaW5ncyBhcyBpdCB3b3VsZCBhbnl3YXkgYmUgZXh0cmVtZWx5IHVubGlrZWx5IHRvIGZpbmQgdGhlbSBvdXRzaWRlIG9mIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtIGlucHV0IHRoZSBjc3MgdGV4dCBjb250YWluaW5nIHRoZSBwbGFjZWhvbGRlcnMuXG4gKlxuICogQHJldHVybnMgdGhlIGNzcyB0ZXh0IHdpdGhvdXQgdGhlIHBsYWNlaG9sZGVycy5cbiAqL1xuZnVuY3Rpb24gdW5lc2NhcGVJblN0cmluZ3MoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCByZXN1bHQgPSBpbnB1dC5yZXBsYWNlKF9jc3NDb21tYUluUGxhY2Vob2xkZXJSZUdsb2JhbCwgJywnKTtcbiAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoX2Nzc1NlbWlJblBsYWNlaG9sZGVyUmVHbG9iYWwsICc7Jyk7XG4gIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKF9jc3NDb2xvbkluUGxhY2Vob2xkZXJSZUdsb2JhbCwgJzonKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBVbmVzY2FwZSBhbGwgcXVvdGVzIHByZXNlbnQgaW4gYSBzdHJpbmcsIGJ1dCBvbmx5IGlmIHRoZSBzdHJpbmcgd2FzIGFjdHVhbGx5IGFscmVhZHlcbiAqIHF1b3RlZC5cbiAqXG4gKiBUaGlzIGdlbmVyYXRlcyBhIFwiY2Fub25pY2FsXCIgcmVwcmVzZW50YXRpb24gb2Ygc3RyaW5ncyB3aGljaCBjYW4gYmUgdXNlZCB0byBtYXRjaCBzdHJpbmdzXG4gKiB3aGljaCB3b3VsZCBvdGhlcndpc2Ugb25seSBkaWZmZXIgYmVjYXVzZSBvZiBkaWZmZXJlbnRseSBlc2NhcGVkIHF1b3Rlcy5cbiAqXG4gKiBGb3IgZXhhbXBsZSBpdCBjb252ZXJ0cyB0aGUgc3RyaW5nIChhc3N1bWVkIHRvIGJlIHF1b3RlZCk6XG4gKiAgYHRoaXMgXFxcXFwiaXNcXFxcXCIgYSBcXFxcJ1xcXFxcXFxcJ3Rlc3RgXG4gKiB0bzpcbiAqICBgdGhpcyBcImlzXCIgYSAnXFxcXFxcXFwndGVzdGBcbiAqIChub3RlIHRoYXQgdGhlIGxhdHRlciBiYWNrc2xhc2hlcyBhcmUgbm90IHJlbW92ZWQgYXMgdGhleSBhcmUgbm90IGFjdHVhbGx5IGVzY2FwaW5nIHRoZSBzaW5nbGVcbiAqIHF1b3RlKVxuICpcbiAqXG4gKiBAcGFyYW0gaW5wdXQgdGhlIHN0cmluZyBwb3NzaWJseSBjb250YWluaW5nIGVzY2FwZWQgcXVvdGVzLlxuICogQHBhcmFtIGlzUXVvdGVkIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBzdHJpbmcgd2FzIHF1b3RlZCBpbnNpZGUgYSBiaWdnZXIgc3RyaW5nIChpZiBub3RcbiAqIHRoZW4gaXQgbWVhbnMgdGhhdCBpdCBkb2Vzbid0IHJlcHJlc2VudCBhbiBpbm5lciBzdHJpbmcgYW5kIHRodXMgbm8gdW5lc2NhcGluZyBpcyByZXF1aXJlZClcbiAqXG4gKiBAcmV0dXJucyB0aGUgc3RyaW5nIGluIHRoZSBcImNhbm9uaWNhbFwiIHJlcHJlc2VudGF0aW9uIHdpdGhvdXQgZXNjYXBlZCBxdW90ZXMuXG4gKi9cbmZ1bmN0aW9uIHVuZXNjYXBlUXVvdGVzKHN0cjogc3RyaW5nLCBpc1F1b3RlZDogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiAhaXNRdW90ZWQgPyBzdHIgOiBzdHIucmVwbGFjZSgvKCg/Ol58W15cXFxcXSkoPzpcXFxcXFxcXCkqKVxcXFwoPz1bJ1wiXSkvZywgJyQxJyk7XG59XG5cbi8qKlxuICogQ29tYmluZSB0aGUgYGNvbnRleHRTZWxlY3RvcnNgIHdpdGggdGhlIGBob3N0TWFya2VyYCBhbmQgdGhlIGBvdGhlclNlbGVjdG9yc2BcbiAqIHRvIGNyZWF0ZSBhIHNlbGVjdG9yIHRoYXQgbWF0Y2hlcyB0aGUgc2FtZSBhcyBgOmhvc3QtY29udGV4dCgpYC5cbiAqXG4gKiBHaXZlbiBhIHNpbmdsZSBjb250ZXh0IHNlbGVjdG9yIGBBYCB3ZSBuZWVkIHRvIG91dHB1dCBzZWxlY3RvcnMgdGhhdCBtYXRjaCBvbiB0aGUgaG9zdCBhbmQgYXMgYW5cbiAqIGFuY2VzdG9yIG9mIHRoZSBob3N0OlxuICpcbiAqIGBgYFxuICogQSA8aG9zdE1hcmtlcj4sIEE8aG9zdE1hcmtlcj4ge31cbiAqIGBgYFxuICpcbiAqIFdoZW4gdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBjb250ZXh0IHNlbGVjdG9yIHdlIGFsc28gaGF2ZSB0byBjcmVhdGUgY29tYmluYXRpb25zIG9mIHRob3NlXG4gKiBzZWxlY3RvcnMgd2l0aCBlYWNoIG90aGVyLiBGb3IgZXhhbXBsZSBpZiB0aGVyZSBhcmUgYEFgIGFuZCBgQmAgc2VsZWN0b3JzIHRoZSBvdXRwdXQgaXM6XG4gKlxuICogYGBgXG4gKiBBQjxob3N0TWFya2VyPiwgQUIgPGhvc3RNYXJrZXI+LCBBIEI8aG9zdE1hcmtlcj4sXG4gKiBCIEE8aG9zdE1hcmtlcj4sIEEgQiA8aG9zdE1hcmtlcj4sIEIgQSA8aG9zdE1hcmtlcj4ge31cbiAqIGBgYFxuICpcbiAqIEFuZCBzbyBvbi4uLlxuICpcbiAqIEBwYXJhbSBob3N0TWFya2VyIHRoZSBzdHJpbmcgdGhhdCBzZWxlY3RzIHRoZSBob3N0IGVsZW1lbnQuXG4gKiBAcGFyYW0gY29udGV4dFNlbGVjdG9ycyBhbiBhcnJheSBvZiBjb250ZXh0IHNlbGVjdG9ycyB0aGF0IHdpbGwgYmUgY29tYmluZWQuXG4gKiBAcGFyYW0gb3RoZXJTZWxlY3RvcnMgdGhlIHJlc3Qgb2YgdGhlIHNlbGVjdG9ycyB0aGF0IGFyZSBub3QgY29udGV4dCBzZWxlY3RvcnMuXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVIb3N0Q29udGV4dFNlbGVjdG9ycyhjb250ZXh0U2VsZWN0b3JzOiBzdHJpbmdbXSwgb3RoZXJTZWxlY3RvcnM6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGhvc3RNYXJrZXIgPSBfcG9seWZpbGxIb3N0Tm9Db21iaW5hdG9yO1xuICBfcG9seWZpbGxIb3N0UmUubGFzdEluZGV4ID0gMDsgIC8vIHJlc2V0IHRoZSByZWdleCB0byBlbnN1cmUgd2UgZ2V0IGFuIGFjY3VyYXRlIHRlc3RcbiAgY29uc3Qgb3RoZXJTZWxlY3RvcnNIYXNIb3N0ID0gX3BvbHlmaWxsSG9zdFJlLnRlc3Qob3RoZXJTZWxlY3RvcnMpO1xuXG4gIC8vIElmIHRoZXJlIGFyZSBubyBjb250ZXh0IHNlbGVjdG9ycyB0aGVuIGp1c3Qgb3V0cHV0IGEgaG9zdCBtYXJrZXJcbiAgaWYgKGNvbnRleHRTZWxlY3RvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGhvc3RNYXJrZXIgKyBvdGhlclNlbGVjdG9ycztcbiAgfVxuXG4gIGNvbnN0IGNvbWJpbmVkOiBzdHJpbmdbXSA9IFtjb250ZXh0U2VsZWN0b3JzLnBvcCgpIHx8ICcnXTtcbiAgd2hpbGUgKGNvbnRleHRTZWxlY3RvcnMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IGNvbWJpbmVkLmxlbmd0aDtcbiAgICBjb25zdCBjb250ZXh0U2VsZWN0b3IgPSBjb250ZXh0U2VsZWN0b3JzLnBvcCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0b3JzID0gY29tYmluZWRbaV07XG4gICAgICAvLyBBZGQgdGhlIG5ldyBzZWxlY3RvciBhcyBhIGRlc2NlbmRhbnQgb2YgdGhlIHByZXZpb3VzIHNlbGVjdG9yc1xuICAgICAgY29tYmluZWRbbGVuZ3RoICogMiArIGldID0gcHJldmlvdXNTZWxlY3RvcnMgKyAnICcgKyBjb250ZXh0U2VsZWN0b3I7XG4gICAgICAvLyBBZGQgdGhlIG5ldyBzZWxlY3RvciBhcyBhbiBhbmNlc3RvciBvZiB0aGUgcHJldmlvdXMgc2VsZWN0b3JzXG4gICAgICBjb21iaW5lZFtsZW5ndGggKyBpXSA9IGNvbnRleHRTZWxlY3RvciArICcgJyArIHByZXZpb3VzU2VsZWN0b3JzO1xuICAgICAgLy8gQWRkIHRoZSBuZXcgc2VsZWN0b3IgdG8gYWN0IG9uIHRoZSBzYW1lIGVsZW1lbnQgYXMgdGhlIHByZXZpb3VzIHNlbGVjdG9yc1xuICAgICAgY29tYmluZWRbaV0gPSBjb250ZXh0U2VsZWN0b3IgKyBwcmV2aW91c1NlbGVjdG9ycztcbiAgICB9XG4gIH1cbiAgLy8gRmluYWxseSBjb25uZWN0IHRoZSBzZWxlY3RvciB0byB0aGUgYGhvc3RNYXJrZXJgczogZWl0aGVyIGFjdGluZyBkaXJlY3RseSBvbiB0aGUgaG9zdFxuICAvLyAoQTxob3N0TWFya2VyPikgb3IgYXMgYW4gYW5jZXN0b3IgKEEgPGhvc3RNYXJrZXI+KS5cbiAgcmV0dXJuIGNvbWJpbmVkXG4gICAgICAubWFwKFxuICAgICAgICAgIHMgPT4gb3RoZXJTZWxlY3RvcnNIYXNIb3N0ID9cbiAgICAgICAgICAgICAgYCR7c30ke290aGVyU2VsZWN0b3JzfWAgOlxuICAgICAgICAgICAgICBgJHtzfSR7aG9zdE1hcmtlcn0ke290aGVyU2VsZWN0b3JzfSwgJHtzfSAke2hvc3RNYXJrZXJ9JHtvdGhlclNlbGVjdG9yc31gKVxuICAgICAgLmpvaW4oJywnKTtcbn1cblxuLyoqXG4gKiBNdXRhdGUgdGhlIGdpdmVuIGBncm91cHNgIGFycmF5IHNvIHRoYXQgdGhlcmUgYXJlIGBtdWx0aXBsZXNgIGNsb25lcyBvZiB0aGUgb3JpZ2luYWwgYXJyYXlcbiAqIHN0b3JlZC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBgcmVwZWF0R3JvdXBzKFthLCBiXSwgMylgIHdpbGwgcmVzdWx0IGluIGBbYSwgYiwgYSwgYiwgYSwgYl1gIC0gYnV0IGltcG9ydGFudGx5IHRoZVxuICogbmV3bHkgYWRkZWQgZ3JvdXBzIHdpbGwgYmUgY2xvbmVzIG9mIHRoZSBvcmlnaW5hbC5cbiAqXG4gKiBAcGFyYW0gZ3JvdXBzIEFuIGFycmF5IG9mIGdyb3VwcyBvZiBzdHJpbmdzIHRoYXQgd2lsbCBiZSByZXBlYXRlZC4gVGhpcyBhcnJheSBpcyBtdXRhdGVkXG4gKiAgICAgaW4tcGxhY2UuXG4gKiBAcGFyYW0gbXVsdGlwbGVzIFRoZSBudW1iZXIgb2YgdGltZXMgdGhlIGN1cnJlbnQgZ3JvdXBzIHNob3VsZCBhcHBlYXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXRHcm91cHMoZ3JvdXBzOiBzdHJpbmdbXVtdLCBtdWx0aXBsZXM6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBsZW5ndGggPSBncm91cHMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG11bHRpcGxlczsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgZ3JvdXBzW2ogKyAoaSAqIGxlbmd0aCldID0gZ3JvdXBzW2pdLnNsaWNlKDApO1xuICAgIH1cbiAgfVxufVxuIl19