(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('rxjs/operators'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs', '@angular/common', 'rxjs/operators', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@angular/router"] = {}, global.ng, global.rxjs, global.ngCommon, global.rxjsOperators, global.ngPlatformBrowser));
})(this, (function (exports, i0, rxjs, i3, operators, i1) { 'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespaceDefault(i0);
    var i3__namespace = /*#__PURE__*/_interopNamespaceDefault(i3);
    var i1__namespace = /*#__PURE__*/_interopNamespaceDefault(i1);

    /**
     * @license Angular v15.0.1
     * (c) 2010-2022 Google LLC. https://angular.io/
     * License: MIT
     */

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * The primary routing outlet.
     *
     * @publicApi
     */
    const PRIMARY_OUTLET = 'primary';
    /**
     * A private symbol used to store the value of `Route.title` inside the `Route.data` if it is a
     * static string or `Route.resolve` if anything else. This allows us to reuse the existing route
     * data/resolvers to support the title feature without new instrumentation in the `Router` pipeline.
     */
    const RouteTitleKey = Symbol('RouteTitle');
    class ParamsAsMap {
        constructor(params) {
            this.params = params || {};
        }
        has(name) {
            return Object.prototype.hasOwnProperty.call(this.params, name);
        }
        get(name) {
            if (this.has(name)) {
                const v = this.params[name];
                return Array.isArray(v) ? v[0] : v;
            }
            return null;
        }
        getAll(name) {
            if (this.has(name)) {
                const v = this.params[name];
                return Array.isArray(v) ? v : [v];
            }
            return [];
        }
        get keys() {
            return Object.keys(this.params);
        }
    }
    /**
     * Converts a `Params` instance to a `ParamMap`.
     * @param params The instance to convert.
     * @returns The new map instance.
     *
     * @publicApi
     */
    function convertToParamMap(params) {
        return new ParamsAsMap(params);
    }
    /**
     * Matches the route configuration (`route`) against the actual URL (`segments`).
     *
     * When no matcher is defined on a `Route`, this is the matcher used by the Router by default.
     *
     * @param segments The remaining unmatched segments in the current navigation
     * @param segmentGroup The current segment group being matched
     * @param route The `Route` to match against.
     *
     * @see UrlMatchResult
     * @see Route
     *
     * @returns The resulting match information or `null` if the `route` should not match.
     * @publicApi
     */
    function defaultUrlMatcher(segments, segmentGroup, route) {
        const parts = route.path.split('/');
        if (parts.length > segments.length) {
            // The actual URL is shorter than the config, no match
            return null;
        }
        if (route.pathMatch === 'full' &&
            (segmentGroup.hasChildren() || parts.length < segments.length)) {
            // The config is longer than the actual URL but we are looking for a full match, return null
            return null;
        }
        const posParams = {};
        // Check each config part against the actual URL
        for (let index = 0; index < parts.length; index++) {
            const part = parts[index];
            const segment = segments[index];
            const isParameter = part.startsWith(':');
            if (isParameter) {
                posParams[part.substring(1)] = segment;
            }
            else if (part !== segment.path) {
                // The actual URL part does not match the config, no match
                return null;
            }
        }
        return { consumed: segments.slice(0, parts.length), posParams };
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function shallowEqualArrays(a, b) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; ++i) {
            if (!shallowEqual(a[i], b[i]))
                return false;
        }
        return true;
    }
    function shallowEqual(a, b) {
        // While `undefined` should never be possible, it would sometimes be the case in IE 11
        // and pre-chromium Edge. The check below accounts for this edge case.
        const k1 = a ? Object.keys(a) : undefined;
        const k2 = b ? Object.keys(b) : undefined;
        if (!k1 || !k2 || k1.length != k2.length) {
            return false;
        }
        let key;
        for (let i = 0; i < k1.length; i++) {
            key = k1[i];
            if (!equalArraysOrString(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    /**
     * Test equality for arrays of strings or a string.
     */
    function equalArraysOrString(a, b) {
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length)
                return false;
            const aSorted = [...a].sort();
            const bSorted = [...b].sort();
            return aSorted.every((val, index) => bSorted[index] === val);
        }
        else {
            return a === b;
        }
    }
    /**
     * Flattens single-level nested arrays.
     */
    function flatten(arr) {
        return Array.prototype.concat.apply([], arr);
    }
    /**
     * Return the last element of an array.
     */
    function last(a) {
        return a.length > 0 ? a[a.length - 1] : null;
    }
    function forEach(map, callback) {
        for (const prop in map) {
            if (map.hasOwnProperty(prop)) {
                callback(map[prop], prop);
            }
        }
    }
    function wrapIntoObservable(value) {
        if (i0["ɵisObservable"](value)) {
            return value;
        }
        if (i0["ɵisPromise"](value)) {
            // Use `Promise.resolve()` to wrap promise-like instances.
            // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
            // change detection.
            return rxjs.from(Promise.resolve(value));
        }
        return rxjs.of(value);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$a = typeof ngDevMode === 'undefined' || ngDevMode;
    const pathCompareMap = {
        'exact': equalSegmentGroups,
        'subset': containsSegmentGroup,
    };
    const paramCompareMap = {
        'exact': equalParams,
        'subset': containsParams,
        'ignored': () => true,
    };
    function containsTree(container, containee, options) {
        return pathCompareMap[options.paths](container.root, containee.root, options.matrixParams) &&
            paramCompareMap[options.queryParams](container.queryParams, containee.queryParams) &&
            !(options.fragment === 'exact' && container.fragment !== containee.fragment);
    }
    function equalParams(container, containee) {
        // TODO: This does not handle array params correctly.
        return shallowEqual(container, containee);
    }
    function equalSegmentGroups(container, containee, matrixParams) {
        if (!equalPath(container.segments, containee.segments))
            return false;
        if (!matrixParamsMatch(container.segments, containee.segments, matrixParams)) {
            return false;
        }
        if (container.numberOfChildren !== containee.numberOfChildren)
            return false;
        for (const c in containee.children) {
            if (!container.children[c])
                return false;
            if (!equalSegmentGroups(container.children[c], containee.children[c], matrixParams))
                return false;
        }
        return true;
    }
    function containsParams(container, containee) {
        return Object.keys(containee).length <= Object.keys(container).length &&
            Object.keys(containee).every(key => equalArraysOrString(container[key], containee[key]));
    }
    function containsSegmentGroup(container, containee, matrixParams) {
        return containsSegmentGroupHelper(container, containee, containee.segments, matrixParams);
    }
    function containsSegmentGroupHelper(container, containee, containeePaths, matrixParams) {
        if (container.segments.length > containeePaths.length) {
            const current = container.segments.slice(0, containeePaths.length);
            if (!equalPath(current, containeePaths))
                return false;
            if (containee.hasChildren())
                return false;
            if (!matrixParamsMatch(current, containeePaths, matrixParams))
                return false;
            return true;
        }
        else if (container.segments.length === containeePaths.length) {
            if (!equalPath(container.segments, containeePaths))
                return false;
            if (!matrixParamsMatch(container.segments, containeePaths, matrixParams))
                return false;
            for (const c in containee.children) {
                if (!container.children[c])
                    return false;
                if (!containsSegmentGroup(container.children[c], containee.children[c], matrixParams)) {
                    return false;
                }
            }
            return true;
        }
        else {
            const current = containeePaths.slice(0, container.segments.length);
            const next = containeePaths.slice(container.segments.length);
            if (!equalPath(container.segments, current))
                return false;
            if (!matrixParamsMatch(container.segments, current, matrixParams))
                return false;
            if (!container.children[PRIMARY_OUTLET])
                return false;
            return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next, matrixParams);
        }
    }
    function matrixParamsMatch(containerPaths, containeePaths, options) {
        return containeePaths.every((containeeSegment, i) => {
            return paramCompareMap[options](containerPaths[i].parameters, containeeSegment.parameters);
        });
    }
    /**
     * @description
     *
     * Represents the parsed URL.
     *
     * Since a router state is a tree, and the URL is nothing but a serialized state, the URL is a
     * serialized tree.
     * UrlTree is a data structure that provides a lot of affordances in dealing with URLs
     *
     * @usageNotes
     * ### Example
     *
     * ```
     * @Component({templateUrl:'template.html'})
     * class MyComponent {
     *   constructor(router: Router) {
     *     const tree: UrlTree =
     *       router.parseUrl('/team/33/(user/victor//support:help)?debug=true#fragment');
     *     const f = tree.fragment; // return 'fragment'
     *     const q = tree.queryParams; // returns {debug: 'true'}
     *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
     *     const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
     *     g.children[PRIMARY_OUTLET].segments; // returns 2 segments 'user' and 'victor'
     *     g.children['support'].segments; // return 1 segment 'help'
     *   }
     * }
     * ```
     *
     * @publicApi
     */
    class UrlTree {
        constructor(
        /** The root segment group of the URL tree */
        root = new UrlSegmentGroup([], {}), 
        /** The query params of the URL */
        queryParams = {}, 
        /** The fragment of the URL */
        fragment = null) {
            this.root = root;
            this.queryParams = queryParams;
            this.fragment = fragment;
            if (NG_DEV_MODE$a) {
                if (root.segments.length > 0) {
                    throw new i0["ɵRuntimeError"](4015 /* RuntimeErrorCode.INVALID_ROOT_URL_SEGMENT */, 'The root `UrlSegmentGroup` should not contain `segments`. ' +
                        'Instead, these segments belong in the `children` so they can be associated with a named outlet.');
                }
            }
        }
        get queryParamMap() {
            if (!this._queryParamMap) {
                this._queryParamMap = convertToParamMap(this.queryParams);
            }
            return this._queryParamMap;
        }
        /** @docsNotRequired */
        toString() {
            return DEFAULT_SERIALIZER.serialize(this);
        }
    }
    /**
     * @description
     *
     * Represents the parsed URL segment group.
     *
     * See `UrlTree` for more information.
     *
     * @publicApi
     */
    class UrlSegmentGroup {
        constructor(
        /** The URL segments of this group. See `UrlSegment` for more information */
        segments, 
        /** The list of children of this group */
        children) {
            this.segments = segments;
            this.children = children;
            /** The parent node in the url tree */
            this.parent = null;
            forEach(children, (v, k) => v.parent = this);
        }
        /** Whether the segment has child segments */
        hasChildren() {
            return this.numberOfChildren > 0;
        }
        /** Number of child segments */
        get numberOfChildren() {
            return Object.keys(this.children).length;
        }
        /** @docsNotRequired */
        toString() {
            return serializePaths(this);
        }
    }
    /**
     * @description
     *
     * Represents a single URL segment.
     *
     * A UrlSegment is a part of a URL between the two slashes. It contains a path and the matrix
     * parameters associated with the segment.
     *
     * @usageNotes
     * ### Example
     *
     * ```
     * @Component({templateUrl:'template.html'})
     * class MyComponent {
     *   constructor(router: Router) {
     *     const tree: UrlTree = router.parseUrl('/team;id=33');
     *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
     *     const s: UrlSegment[] = g.segments;
     *     s[0].path; // returns 'team'
     *     s[0].parameters; // returns {id: 33}
     *   }
     * }
     * ```
     *
     * @publicApi
     */
    class UrlSegment {
        constructor(
        /** The path part of a URL segment */
        path, 
        /** The matrix parameters associated with a segment */
        parameters) {
            this.path = path;
            this.parameters = parameters;
        }
        get parameterMap() {
            if (!this._parameterMap) {
                this._parameterMap = convertToParamMap(this.parameters);
            }
            return this._parameterMap;
        }
        /** @docsNotRequired */
        toString() {
            return serializePath(this);
        }
    }
    function equalSegments(as, bs) {
        return equalPath(as, bs) && as.every((a, i) => shallowEqual(a.parameters, bs[i].parameters));
    }
    function equalPath(as, bs) {
        if (as.length !== bs.length)
            return false;
        return as.every((a, i) => a.path === bs[i].path);
    }
    function mapChildrenIntoArray(segment, fn) {
        let res = [];
        forEach(segment.children, (child, childOutlet) => {
            if (childOutlet === PRIMARY_OUTLET) {
                res = res.concat(fn(child, childOutlet));
            }
        });
        forEach(segment.children, (child, childOutlet) => {
            if (childOutlet !== PRIMARY_OUTLET) {
                res = res.concat(fn(child, childOutlet));
            }
        });
        return res;
    }
    /**
     * @description
     *
     * Serializes and deserializes a URL string into a URL tree.
     *
     * The url serialization strategy is customizable. You can
     * make all URLs case insensitive by providing a custom UrlSerializer.
     *
     * See `DefaultUrlSerializer` for an example of a URL serializer.
     *
     * @publicApi
     */
    class UrlSerializer {
    }
    UrlSerializer.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: UrlSerializer, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    UrlSerializer.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: UrlSerializer, providedIn: 'root', useFactory: () => new DefaultUrlSerializer() });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: UrlSerializer, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root', useFactory: () => new DefaultUrlSerializer() }]
            }] });
    /**
     * @description
     *
     * A default implementation of the `UrlSerializer`.
     *
     * Example URLs:
     *
     * ```
     * /inbox/33(popup:compose)
     * /inbox/33;open=true/messages/44
     * ```
     *
     * DefaultUrlSerializer uses parentheses to serialize secondary segments (e.g., popup:compose), the
     * colon syntax to specify the outlet, and the ';parameter=value' syntax (e.g., open=true) to
     * specify route specific parameters.
     *
     * @publicApi
     */
    class DefaultUrlSerializer {
        /** Parses a url into a `UrlTree` */
        parse(url) {
            const p = new UrlParser(url);
            return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
        }
        /** Converts a `UrlTree` into a url */
        serialize(tree) {
            const segment = `/${serializeSegment(tree.root, true)}`;
            const query = serializeQueryParams(tree.queryParams);
            const fragment = typeof tree.fragment === `string` ? `#${encodeUriFragment(tree.fragment)}` : '';
            return `${segment}${query}${fragment}`;
        }
    }
    const DEFAULT_SERIALIZER = new DefaultUrlSerializer();
    function serializePaths(segment) {
        return segment.segments.map(p => serializePath(p)).join('/');
    }
    function serializeSegment(segment, root) {
        if (!segment.hasChildren()) {
            return serializePaths(segment);
        }
        if (root) {
            const primary = segment.children[PRIMARY_OUTLET] ?
                serializeSegment(segment.children[PRIMARY_OUTLET], false) :
                '';
            const children = [];
            forEach(segment.children, (v, k) => {
                if (k !== PRIMARY_OUTLET) {
                    children.push(`${k}:${serializeSegment(v, false)}`);
                }
            });
            return children.length > 0 ? `${primary}(${children.join('//')})` : primary;
        }
        else {
            const children = mapChildrenIntoArray(segment, (v, k) => {
                if (k === PRIMARY_OUTLET) {
                    return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
                }
                return [`${k}:${serializeSegment(v, false)}`];
            });
            // use no parenthesis if the only child is a primary outlet route
            if (Object.keys(segment.children).length === 1 && segment.children[PRIMARY_OUTLET] != null) {
                return `${serializePaths(segment)}/${children[0]}`;
            }
            return `${serializePaths(segment)}/(${children.join('//')})`;
        }
    }
    /**
     * Encodes a URI string with the default encoding. This function will only ever be called from
     * `encodeUriQuery` or `encodeUriSegment` as it's the base set of encodings to be used. We need
     * a custom encoding because encodeURIComponent is too aggressive and encodes stuff that doesn't
     * have to be encoded per https://url.spec.whatwg.org.
     */
    function encodeUriString(s) {
        return encodeURIComponent(s)
            .replace(/%40/g, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',');
    }
    /**
     * This function should be used to encode both keys and values in a query string key/value. In
     * the following URL, you need to call encodeUriQuery on "k" and "v":
     *
     * http://www.site.org/html;mk=mv?k=v#f
     */
    function encodeUriQuery(s) {
        return encodeUriString(s).replace(/%3B/gi, ';');
    }
    /**
     * This function should be used to encode a URL fragment. In the following URL, you need to call
     * encodeUriFragment on "f":
     *
     * http://www.site.org/html;mk=mv?k=v#f
     */
    function encodeUriFragment(s) {
        return encodeURI(s);
    }
    /**
     * This function should be run on any URI segment as well as the key and value in a key/value
     * pair for matrix params. In the following URL, you need to call encodeUriSegment on "html",
     * "mk", and "mv":
     *
     * http://www.site.org/html;mk=mv?k=v#f
     */
    function encodeUriSegment(s) {
        return encodeUriString(s).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
    }
    function decode(s) {
        return decodeURIComponent(s);
    }
    // Query keys/values should have the "+" replaced first, as "+" in a query string is " ".
    // decodeURIComponent function will not decode "+" as a space.
    function decodeQuery(s) {
        return decode(s.replace(/\+/g, '%20'));
    }
    function serializePath(path) {
        return `${encodeUriSegment(path.path)}${serializeMatrixParams(path.parameters)}`;
    }
    function serializeMatrixParams(params) {
        return Object.keys(params)
            .map(key => `;${encodeUriSegment(key)}=${encodeUriSegment(params[key])}`)
            .join('');
    }
    function serializeQueryParams(params) {
        const strParams = Object.keys(params)
            .map((name) => {
            const value = params[name];
            return Array.isArray(value) ?
                value.map(v => `${encodeUriQuery(name)}=${encodeUriQuery(v)}`).join('&') :
                `${encodeUriQuery(name)}=${encodeUriQuery(value)}`;
        })
            .filter(s => !!s);
        return strParams.length ? `?${strParams.join('&')}` : '';
    }
    const SEGMENT_RE = /^[^\/()?;=#]+/;
    function matchSegments(str) {
        const match = str.match(SEGMENT_RE);
        return match ? match[0] : '';
    }
    const QUERY_PARAM_RE = /^[^=?&#]+/;
    // Return the name of the query param at the start of the string or an empty string
    function matchQueryParams(str) {
        const match = str.match(QUERY_PARAM_RE);
        return match ? match[0] : '';
    }
    const QUERY_PARAM_VALUE_RE = /^[^&#]+/;
    // Return the value of the query param at the start of the string or an empty string
    function matchUrlQueryParamValue(str) {
        const match = str.match(QUERY_PARAM_VALUE_RE);
        return match ? match[0] : '';
    }
    class UrlParser {
        constructor(url) {
            this.url = url;
            this.remaining = url;
        }
        parseRootSegment() {
            this.consumeOptional('/');
            if (this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')) {
                return new UrlSegmentGroup([], {});
            }
            // The root segment group never has segments
            return new UrlSegmentGroup([], this.parseChildren());
        }
        parseQueryParams() {
            const params = {};
            if (this.consumeOptional('?')) {
                do {
                    this.parseQueryParam(params);
                } while (this.consumeOptional('&'));
            }
            return params;
        }
        parseFragment() {
            return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
        }
        parseChildren() {
            if (this.remaining === '') {
                return {};
            }
            this.consumeOptional('/');
            const segments = [];
            if (!this.peekStartsWith('(')) {
                segments.push(this.parseSegment());
            }
            while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
                this.capture('/');
                segments.push(this.parseSegment());
            }
            let children = {};
            if (this.peekStartsWith('/(')) {
                this.capture('/');
                children = this.parseParens(true);
            }
            let res = {};
            if (this.peekStartsWith('(')) {
                res = this.parseParens(false);
            }
            if (segments.length > 0 || Object.keys(children).length > 0) {
                res[PRIMARY_OUTLET] = new UrlSegmentGroup(segments, children);
            }
            return res;
        }
        // parse a segment with its matrix parameters
        // ie `name;k1=v1;k2`
        parseSegment() {
            const path = matchSegments(this.remaining);
            if (path === '' && this.peekStartsWith(';')) {
                throw new i0["ɵRuntimeError"](4009 /* RuntimeErrorCode.EMPTY_PATH_WITH_PARAMS */, NG_DEV_MODE$a && `Empty path url segment cannot have parameters: '${this.remaining}'.`);
            }
            this.capture(path);
            return new UrlSegment(decode(path), this.parseMatrixParams());
        }
        parseMatrixParams() {
            const params = {};
            while (this.consumeOptional(';')) {
                this.parseParam(params);
            }
            return params;
        }
        parseParam(params) {
            const key = matchSegments(this.remaining);
            if (!key) {
                return;
            }
            this.capture(key);
            let value = '';
            if (this.consumeOptional('=')) {
                const valueMatch = matchSegments(this.remaining);
                if (valueMatch) {
                    value = valueMatch;
                    this.capture(value);
                }
            }
            params[decode(key)] = decode(value);
        }
        // Parse a single query parameter `name[=value]`
        parseQueryParam(params) {
            const key = matchQueryParams(this.remaining);
            if (!key) {
                return;
            }
            this.capture(key);
            let value = '';
            if (this.consumeOptional('=')) {
                const valueMatch = matchUrlQueryParamValue(this.remaining);
                if (valueMatch) {
                    value = valueMatch;
                    this.capture(value);
                }
            }
            const decodedKey = decodeQuery(key);
            const decodedVal = decodeQuery(value);
            if (params.hasOwnProperty(decodedKey)) {
                // Append to existing values
                let currentVal = params[decodedKey];
                if (!Array.isArray(currentVal)) {
                    currentVal = [currentVal];
                    params[decodedKey] = currentVal;
                }
                currentVal.push(decodedVal);
            }
            else {
                // Create a new value
                params[decodedKey] = decodedVal;
            }
        }
        // parse `(a/b//outlet_name:c/d)`
        parseParens(allowPrimary) {
            const segments = {};
            this.capture('(');
            while (!this.consumeOptional(')') && this.remaining.length > 0) {
                const path = matchSegments(this.remaining);
                const next = this.remaining[path.length];
                // if is is not one of these characters, then the segment was unescaped
                // or the group was not closed
                if (next !== '/' && next !== ')' && next !== ';') {
                    throw new i0["ɵRuntimeError"](4010 /* RuntimeErrorCode.UNPARSABLE_URL */, NG_DEV_MODE$a && `Cannot parse url '${this.url}'`);
                }
                let outletName = undefined;
                if (path.indexOf(':') > -1) {
                    outletName = path.slice(0, path.indexOf(':'));
                    this.capture(outletName);
                    this.capture(':');
                }
                else if (allowPrimary) {
                    outletName = PRIMARY_OUTLET;
                }
                const children = this.parseChildren();
                segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] :
                    new UrlSegmentGroup([], children);
                this.consumeOptional('//');
            }
            return segments;
        }
        peekStartsWith(str) {
            return this.remaining.startsWith(str);
        }
        // Consumes the prefix when it is present and returns whether it has been consumed
        consumeOptional(str) {
            if (this.peekStartsWith(str)) {
                this.remaining = this.remaining.substring(str.length);
                return true;
            }
            return false;
        }
        capture(str) {
            if (!this.consumeOptional(str)) {
                throw new i0["ɵRuntimeError"](4011 /* RuntimeErrorCode.UNEXPECTED_VALUE_IN_URL */, NG_DEV_MODE$a && `Expected "${str}".`);
            }
        }
    }
    function createRoot(rootCandidate) {
        return rootCandidate.segments.length > 0 ?
            new UrlSegmentGroup([], { [PRIMARY_OUTLET]: rootCandidate }) :
            rootCandidate;
    }
    /**
     * Recursively merges primary segment children into their parents and also drops empty children
     * (those which have no segments and no children themselves). The latter prevents serializing a
     * group into something like `/a(aux:)`, where `aux` is an empty child segment.
     */
    function squashSegmentGroup(segmentGroup) {
        const newChildren = {};
        for (const childOutlet of Object.keys(segmentGroup.children)) {
            const child = segmentGroup.children[childOutlet];
            const childCandidate = squashSegmentGroup(child);
            // don't add empty children
            if (childCandidate.segments.length > 0 || childCandidate.hasChildren()) {
                newChildren[childOutlet] = childCandidate;
            }
        }
        const s = new UrlSegmentGroup(segmentGroup.segments, newChildren);
        return mergeTrivialChildren(s);
    }
    /**
     * When possible, merges the primary outlet child into the parent `UrlSegmentGroup`.
     *
     * When a segment group has only one child which is a primary outlet, merges that child into the
     * parent. That is, the child segment group's segments are merged into the `s` and the child's
     * children become the children of `s`. Think of this like a 'squash', merging the child segment
     * group into the parent.
     */
    function mergeTrivialChildren(s) {
        if (s.numberOfChildren === 1 && s.children[PRIMARY_OUTLET]) {
            const c = s.children[PRIMARY_OUTLET];
            return new UrlSegmentGroup(s.segments.concat(c.segments), c.children);
        }
        return s;
    }
    function isUrlTree(v) {
        return v instanceof UrlTree;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$9 = typeof ngDevMode === 'undefined' || ngDevMode;
    /**
     * Creates a `UrlTree` relative to an `ActivatedRouteSnapshot`.
     *
     * @publicApi
     *
     *
     * @param relativeTo The `ActivatedRouteSnapshot` to apply the commands to
     * @param commands An array of URL fragments with which to construct the new URL tree.
     * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
     * segments, followed by the parameters for each segment.
     * The fragments are applied to the one provided in the `relativeTo` parameter.
     * @param queryParams The query parameters for the `UrlTree`. `null` if the `UrlTree` does not have
     *     any query parameters.
     * @param fragment The fragment for the `UrlTree`. `null` if the `UrlTree` does not have a fragment.
     *
     * @usageNotes
     *
     * ```
     * // create /team/33/user/11
     * createUrlTreeFromSnapshot(snapshot, ['/team', 33, 'user', 11]);
     *
     * // create /team/33;expand=true/user/11
     * createUrlTreeFromSnapshot(snapshot, ['/team', 33, {expand: true}, 'user', 11]);
     *
     * // you can collapse static segments like this (this works only with the first passed-in value):
     * createUrlTreeFromSnapshot(snapshot, ['/team/33/user', userId]);
     *
     * // If the first segment can contain slashes, and you do not want the router to split it,
     * // you can do the following:
     * createUrlTreeFromSnapshot(snapshot, [{segmentPath: '/one/two'}]);
     *
     * // create /team/33/(user/11//right:chat)
     * createUrlTreeFromSnapshot(snapshot, ['/team', 33, {outlets: {primary: 'user/11', right:
     * 'chat'}}], null, null);
     *
     * // remove the right secondary node
     * createUrlTreeFromSnapshot(snapshot, ['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
     *
     * // For the examples below, assume the current URL is for the `/team/33/user/11` and the
     * `ActivatedRouteSnapshot` points to `user/11`:
     *
     * // navigate to /team/33/user/11/details
     * createUrlTreeFromSnapshot(snapshot, ['details']);
     *
     * // navigate to /team/33/user/22
     * createUrlTreeFromSnapshot(snapshot, ['../22']);
     *
     * // navigate to /team/44/user/22
     * createUrlTreeFromSnapshot(snapshot, ['../../team/44/user/22']);
     * ```
     */
    function createUrlTreeFromSnapshot(relativeTo, commands, queryParams = null, fragment = null) {
        const relativeToUrlSegmentGroup = createSegmentGroupFromRoute(relativeTo);
        return createUrlTreeFromSegmentGroup(relativeToUrlSegmentGroup, commands, queryParams, fragment);
    }
    function createSegmentGroupFromRoute(route) {
        let targetGroup;
        function createSegmentGroupFromRouteRecursive(currentRoute) {
            const childOutlets = {};
            for (const childSnapshot of currentRoute.children) {
                const root = createSegmentGroupFromRouteRecursive(childSnapshot);
                childOutlets[childSnapshot.outlet] = root;
            }
            const segmentGroup = new UrlSegmentGroup(currentRoute.url, childOutlets);
            if (currentRoute === route) {
                targetGroup = segmentGroup;
            }
            return segmentGroup;
        }
        const rootCandidate = createSegmentGroupFromRouteRecursive(route.root);
        const rootSegmentGroup = createRoot(rootCandidate);
        return targetGroup !== null && targetGroup !== void 0 ? targetGroup : rootSegmentGroup;
    }
    function createUrlTreeFromSegmentGroup(relativeTo, commands, queryParams, fragment) {
        let root = relativeTo;
        while (root.parent) {
            root = root.parent;
        }
        // There are no commands so the `UrlTree` goes to the same path as the one created from the
        // `UrlSegmentGroup`. All we need to do is update the `queryParams` and `fragment` without
        // applying any other logic.
        if (commands.length === 0) {
            return tree(root, root, root, queryParams, fragment);
        }
        const nav = computeNavigation(commands);
        if (nav.toRoot()) {
            return tree(root, root, new UrlSegmentGroup([], {}), queryParams, fragment);
        }
        const position = findStartingPositionForTargetGroup(nav, root, relativeTo);
        const newSegmentGroup = position.processChildren ?
            updateSegmentGroupChildren(position.segmentGroup, position.index, nav.commands) :
            updateSegmentGroup(position.segmentGroup, position.index, nav.commands);
        return tree(root, position.segmentGroup, newSegmentGroup, queryParams, fragment);
    }
    function createUrlTree(route, urlTree, commands, queryParams, fragment) {
        var _a;
        if (commands.length === 0) {
            return tree(urlTree.root, urlTree.root, urlTree.root, queryParams, fragment);
        }
        const nav = computeNavigation(commands);
        if (nav.toRoot()) {
            return tree(urlTree.root, urlTree.root, new UrlSegmentGroup([], {}), queryParams, fragment);
        }
        function createTreeUsingPathIndex(lastPathIndex) {
            var _a;
            const startingPosition = findStartingPosition(nav, urlTree, (_a = route.snapshot) === null || _a === void 0 ? void 0 : _a._urlSegment, lastPathIndex);
            const segmentGroup = startingPosition.processChildren ?
                updateSegmentGroupChildren(startingPosition.segmentGroup, startingPosition.index, nav.commands) :
                updateSegmentGroup(startingPosition.segmentGroup, startingPosition.index, nav.commands);
            return tree(urlTree.root, startingPosition.segmentGroup, segmentGroup, queryParams, fragment);
        }
        // Note: The types should disallow `snapshot` from being `undefined` but due to test mocks, this
        // may be the case. Since we try to access it at an earlier point before the refactor to add the
        // warning for `relativeLinkResolution: 'legacy'`, this may cause failures in tests where it
        // didn't before.
        const result = createTreeUsingPathIndex((_a = route.snapshot) === null || _a === void 0 ? void 0 : _a._lastPathIndex);
        return result;
    }
    function isMatrixParams(command) {
        return typeof command === 'object' && command != null && !command.outlets && !command.segmentPath;
    }
    /**
     * Determines if a given command has an `outlets` map. When we encounter a command
     * with an outlets k/v map, we need to apply each outlet individually to the existing segment.
     */
    function isCommandWithOutlets(command) {
        return typeof command === 'object' && command != null && command.outlets;
    }
    function tree(oldRoot, oldSegmentGroup, newSegmentGroup, queryParams, fragment) {
        let qp = {};
        if (queryParams) {
            forEach(queryParams, (value, name) => {
                qp[name] = Array.isArray(value) ? value.map((v) => `${v}`) : `${value}`;
            });
        }
        let rootCandidate;
        if (oldRoot === oldSegmentGroup) {
            rootCandidate = newSegmentGroup;
        }
        else {
            rootCandidate = replaceSegment(oldRoot, oldSegmentGroup, newSegmentGroup);
        }
        const newRoot = createRoot(squashSegmentGroup(rootCandidate));
        return new UrlTree(newRoot, qp, fragment);
    }
    /**
     * Replaces the `oldSegment` which is located in some child of the `current` with the `newSegment`.
     * This also has the effect of creating new `UrlSegmentGroup` copies to update references. This
     * shouldn't be necessary but the fallback logic for an invalid ActivatedRoute in the creation uses
     * the Router's current url tree. If we don't create new segment groups, we end up modifying that
     * value.
     */
    function replaceSegment(current, oldSegment, newSegment) {
        const children = {};
        forEach(current.children, (c, outletName) => {
            if (c === oldSegment) {
                children[outletName] = newSegment;
            }
            else {
                children[outletName] = replaceSegment(c, oldSegment, newSegment);
            }
        });
        return new UrlSegmentGroup(current.segments, children);
    }
    class Navigation {
        constructor(isAbsolute, numberOfDoubleDots, commands) {
            this.isAbsolute = isAbsolute;
            this.numberOfDoubleDots = numberOfDoubleDots;
            this.commands = commands;
            if (isAbsolute && commands.length > 0 && isMatrixParams(commands[0])) {
                throw new i0["ɵRuntimeError"](4003 /* RuntimeErrorCode.ROOT_SEGMENT_MATRIX_PARAMS */, NG_DEV_MODE$9 && 'Root segment cannot have matrix parameters');
            }
            const cmdWithOutlet = commands.find(isCommandWithOutlets);
            if (cmdWithOutlet && cmdWithOutlet !== last(commands)) {
                throw new i0["ɵRuntimeError"](4004 /* RuntimeErrorCode.MISPLACED_OUTLETS_COMMAND */, NG_DEV_MODE$9 && '{outlets:{}} has to be the last command');
            }
        }
        toRoot() {
            return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
        }
    }
    /** Transforms commands to a normalized `Navigation` */
    function computeNavigation(commands) {
        if ((typeof commands[0] === 'string') && commands.length === 1 && commands[0] === '/') {
            return new Navigation(true, 0, commands);
        }
        let numberOfDoubleDots = 0;
        let isAbsolute = false;
        const res = commands.reduce((res, cmd, cmdIdx) => {
            if (typeof cmd === 'object' && cmd != null) {
                if (cmd.outlets) {
                    const outlets = {};
                    forEach(cmd.outlets, (commands, name) => {
                        outlets[name] = typeof commands === 'string' ? commands.split('/') : commands;
                    });
                    return [...res, { outlets }];
                }
                if (cmd.segmentPath) {
                    return [...res, cmd.segmentPath];
                }
            }
            if (!(typeof cmd === 'string')) {
                return [...res, cmd];
            }
            if (cmdIdx === 0) {
                cmd.split('/').forEach((urlPart, partIndex) => {
                    if (partIndex == 0 && urlPart === '.') ;
                    else if (partIndex == 0 && urlPart === '') { //  '/a'
                        isAbsolute = true;
                    }
                    else if (urlPart === '..') { //  '../a'
                        numberOfDoubleDots++;
                    }
                    else if (urlPart != '') {
                        res.push(urlPart);
                    }
                });
                return res;
            }
            return [...res, cmd];
        }, []);
        return new Navigation(isAbsolute, numberOfDoubleDots, res);
    }
    class Position {
        constructor(segmentGroup, processChildren, index) {
            this.segmentGroup = segmentGroup;
            this.processChildren = processChildren;
            this.index = index;
        }
    }
    function findStartingPositionForTargetGroup(nav, root, target) {
        if (nav.isAbsolute) {
            return new Position(root, true, 0);
        }
        if (!target) {
            // `NaN` is used only to maintain backwards compatibility with incorrectly mocked
            // `ActivatedRouteSnapshot` in tests. In prior versions of this code, the position here was
            // determined based on an internal property that was rarely mocked, resulting in `NaN`. In
            // reality, this code path should _never_ be touched since `target` is not allowed to be falsey.
            return new Position(root, false, NaN);
        }
        if (target.parent === null) {
            return new Position(target, true, 0);
        }
        const modifier = isMatrixParams(nav.commands[0]) ? 0 : 1;
        const index = target.segments.length - 1 + modifier;
        return createPositionApplyingDoubleDots(target, index, nav.numberOfDoubleDots);
    }
    function findStartingPosition(nav, tree, segmentGroup, lastPathIndex) {
        if (nav.isAbsolute) {
            return new Position(tree.root, true, 0);
        }
        if (lastPathIndex === -1) {
            // Pathless ActivatedRoute has _lastPathIndex === -1 but should not process children
            // see issue #26224, #13011, #35687
            // However, if the ActivatedRoute is the root we should process children like above.
            const processChildren = segmentGroup === tree.root;
            return new Position(segmentGroup, processChildren, 0);
        }
        const modifier = isMatrixParams(nav.commands[0]) ? 0 : 1;
        const index = lastPathIndex + modifier;
        return createPositionApplyingDoubleDots(segmentGroup, index, nav.numberOfDoubleDots);
    }
    function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
        let g = group;
        let ci = index;
        let dd = numberOfDoubleDots;
        while (dd > ci) {
            dd -= ci;
            g = g.parent;
            if (!g) {
                throw new i0["ɵRuntimeError"](4005 /* RuntimeErrorCode.INVALID_DOUBLE_DOTS */, NG_DEV_MODE$9 && 'Invalid number of \'../\'');
            }
            ci = g.segments.length;
        }
        return new Position(g, false, ci - dd);
    }
    function getOutlets(commands) {
        if (isCommandWithOutlets(commands[0])) {
            return commands[0].outlets;
        }
        return { [PRIMARY_OUTLET]: commands };
    }
    function updateSegmentGroup(segmentGroup, startIndex, commands) {
        if (!segmentGroup) {
            segmentGroup = new UrlSegmentGroup([], {});
        }
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
            return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
        }
        const m = prefixedWith(segmentGroup, startIndex, commands);
        const slicedCommands = commands.slice(m.commandIndex);
        if (m.match && m.pathIndex < segmentGroup.segments.length) {
            const g = new UrlSegmentGroup(segmentGroup.segments.slice(0, m.pathIndex), {});
            g.children[PRIMARY_OUTLET] =
                new UrlSegmentGroup(segmentGroup.segments.slice(m.pathIndex), segmentGroup.children);
            return updateSegmentGroupChildren(g, 0, slicedCommands);
        }
        else if (m.match && slicedCommands.length === 0) {
            return new UrlSegmentGroup(segmentGroup.segments, {});
        }
        else if (m.match && !segmentGroup.hasChildren()) {
            return createNewSegmentGroup(segmentGroup, startIndex, commands);
        }
        else if (m.match) {
            return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
        }
        else {
            return createNewSegmentGroup(segmentGroup, startIndex, commands);
        }
    }
    function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
        if (commands.length === 0) {
            return new UrlSegmentGroup(segmentGroup.segments, {});
        }
        else {
            const outlets = getOutlets(commands);
            const children = {};
            forEach(outlets, (commands, outlet) => {
                if (typeof commands === 'string') {
                    commands = [commands];
                }
                if (commands !== null) {
                    children[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands);
                }
            });
            forEach(segmentGroup.children, (child, childOutlet) => {
                if (outlets[childOutlet] === undefined) {
                    children[childOutlet] = child;
                }
            });
            return new UrlSegmentGroup(segmentGroup.segments, children);
        }
    }
    function prefixedWith(segmentGroup, startIndex, commands) {
        let currentCommandIndex = 0;
        let currentPathIndex = startIndex;
        const noMatch = { match: false, pathIndex: 0, commandIndex: 0 };
        while (currentPathIndex < segmentGroup.segments.length) {
            if (currentCommandIndex >= commands.length)
                return noMatch;
            const path = segmentGroup.segments[currentPathIndex];
            const command = commands[currentCommandIndex];
            // Do not try to consume command as part of the prefixing if it has outlets because it can
            // contain outlets other than the one being processed. Consuming the outlets command would
            // result in other outlets being ignored.
            if (isCommandWithOutlets(command)) {
                break;
            }
            const curr = `${command}`;
            const next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
            if (currentPathIndex > 0 && curr === undefined)
                break;
            if (curr && next && (typeof next === 'object') && next.outlets === undefined) {
                if (!compare(curr, next, path))
                    return noMatch;
                currentCommandIndex += 2;
            }
            else {
                if (!compare(curr, {}, path))
                    return noMatch;
                currentCommandIndex++;
            }
            currentPathIndex++;
        }
        return { match: true, pathIndex: currentPathIndex, commandIndex: currentCommandIndex };
    }
    function createNewSegmentGroup(segmentGroup, startIndex, commands) {
        const paths = segmentGroup.segments.slice(0, startIndex);
        let i = 0;
        while (i < commands.length) {
            const command = commands[i];
            if (isCommandWithOutlets(command)) {
                const children = createNewSegmentChildren(command.outlets);
                return new UrlSegmentGroup(paths, children);
            }
            // if we start with an object literal, we need to reuse the path part from the segment
            if (i === 0 && isMatrixParams(commands[0])) {
                const p = segmentGroup.segments[startIndex];
                paths.push(new UrlSegment(p.path, stringify(commands[0])));
                i++;
                continue;
            }
            const curr = isCommandWithOutlets(command) ? command.outlets[PRIMARY_OUTLET] : `${command}`;
            const next = (i < commands.length - 1) ? commands[i + 1] : null;
            if (curr && next && isMatrixParams(next)) {
                paths.push(new UrlSegment(curr, stringify(next)));
                i += 2;
            }
            else {
                paths.push(new UrlSegment(curr, {}));
                i++;
            }
        }
        return new UrlSegmentGroup(paths, {});
    }
    function createNewSegmentChildren(outlets) {
        const children = {};
        forEach(outlets, (commands, outlet) => {
            if (typeof commands === 'string') {
                commands = [commands];
            }
            if (commands !== null) {
                children[outlet] = createNewSegmentGroup(new UrlSegmentGroup([], {}), 0, commands);
            }
        });
        return children;
    }
    function stringify(params) {
        const res = {};
        forEach(params, (v, k) => res[k] = `${v}`);
        return res;
    }
    function compare(path, params, segment) {
        return path == segment.path && shallowEqual(params, segment.parameters);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Base for events the router goes through, as opposed to events tied to a specific
     * route. Fired one time for any given navigation.
     *
     * The following code shows how a class subscribes to router events.
     *
     * ```ts
     * import {Event, RouterEvent, Router} from '@angular/router';
     *
     * class MyService {
     *   constructor(public router: Router) {
     *     router.events.pipe(
     *        filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
     *     ).subscribe((e: RouterEvent) => {
     *       // Do something
     *     });
     *   }
     * }
     * ```
     *
     * @see `Event`
     * @see [Router events summary](guide/router-reference#router-events)
     * @publicApi
     */
    class RouterEvent {
        constructor(
        /** A unique ID that the router assigns to every router navigation. */
        id, 
        /** The URL that is the destination for this navigation. */
        url) {
            this.id = id;
            this.url = url;
        }
    }
    /**
     * An event triggered when a navigation starts.
     *
     * @publicApi
     */
    class NavigationStart extends RouterEvent {
        constructor(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        navigationTrigger = 'imperative', 
        /** @docsNotRequired */
        restoredState = null) {
            super(id, url);
            this.type = 0 /* EventType.NavigationStart */;
            this.navigationTrigger = navigationTrigger;
            this.restoredState = restoredState;
        }
        /** @docsNotRequired */
        toString() {
            return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
    }
    /**
     * An event triggered when a navigation ends successfully.
     *
     * @see `NavigationStart`
     * @see `NavigationCancel`
     * @see `NavigationError`
     *
     * @publicApi
     */
    class NavigationEnd extends RouterEvent {
        constructor(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        urlAfterRedirects) {
            super(id, url);
            this.urlAfterRedirects = urlAfterRedirects;
            this.type = 1 /* EventType.NavigationEnd */;
        }
        /** @docsNotRequired */
        toString() {
            return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
    }
    /**
     * An event triggered when a navigation is canceled, directly or indirectly.
     * This can happen for several reasons including when a route guard
     * returns `false` or initiates a redirect by returning a `UrlTree`.
     *
     * @see `NavigationStart`
     * @see `NavigationEnd`
     * @see `NavigationError`
     *
     * @publicApi
     */
    class NavigationCancel extends RouterEvent {
        constructor(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /**
         * A description of why the navigation was cancelled. For debug purposes only. Use `code`
         * instead for a stable cancellation reason that can be used in production.
         */
        reason, 
        /**
         * A code to indicate why the navigation was canceled. This cancellation code is stable for
         * the reason and can be relied on whereas the `reason` string could change and should not be
         * used in production.
         */
        code) {
            super(id, url);
            this.reason = reason;
            this.code = code;
            this.type = 2 /* EventType.NavigationCancel */;
        }
        /** @docsNotRequired */
        toString() {
            return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
    }
    /**
     * An event triggered when a navigation fails due to an unexpected error.
     *
     * @see `NavigationStart`
     * @see `NavigationEnd`
     * @see `NavigationCancel`
     *
     * @publicApi
     */
    class NavigationError extends RouterEvent {
        constructor(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        error, 
        /**
         * The target of the navigation when the error occurred.
         *
         * Note that this can be `undefined` because an error could have occurred before the
         * `RouterStateSnapshot` was created for the navigation.
         */
        target) {
            super(id, url);
            this.error = error;
            this.target = target;
            this.type = 3 /* EventType.NavigationError */;
        }
        /** @docsNotRequired */
        toString() {
            return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
    }
    /**
     * An event triggered when routes are recognized.
     *
     * @publicApi
     */
    class RoutesRecognized extends RouterEvent {
        constructor(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        urlAfterRedirects, 
        /** @docsNotRequired */
        state) {
            super(id, url);
            this.urlAfterRedirects = urlAfterRedirects;
            this.state = state;
            this.type = 4 /* EventType.RoutesRecognized */;
        }
        /** @docsNotRequired */
        toString() {
            return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    }
    /**
     * An event triggered at the start of the Guard phase of routing.
     *
     * @see `GuardsCheckEnd`
     *
     * @publicApi
     */
    class GuardsCheckStart extends RouterEvent {
        constructor(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        urlAfterRedirects, 
        /** @docsNotRequired */
        state) {
            super(id, url);
            this.urlAfterRedirects = urlAfterRedirects;
            this.state = state;
            this.type = 7 /* EventType.GuardsCheckStart */;
        }
        toString() {
            return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    }
    /**
     * An event triggered at the end of the Guard phase of routing.
     *
     * @see `GuardsCheckStart`
     *
     * @publicApi
     */
    class GuardsCheckEnd extends RouterEvent {
        constructor(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        urlAfterRedirects, 
        /** @docsNotRequired */
        state, 
        /** @docsNotRequired */
        shouldActivate) {
            super(id, url);
            this.urlAfterRedirects = urlAfterRedirects;
            this.state = state;
            this.shouldActivate = shouldActivate;
            this.type = 8 /* EventType.GuardsCheckEnd */;
        }
        toString() {
            return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
    }
    /**
     * An event triggered at the start of the Resolve phase of routing.
     *
     * Runs in the "resolve" phase whether or not there is anything to resolve.
     * In future, may change to only run when there are things to be resolved.
     *
     * @see `ResolveEnd`
     *
     * @publicApi
     */
    class ResolveStart extends RouterEvent {
        constructor(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        urlAfterRedirects, 
        /** @docsNotRequired */
        state) {
            super(id, url);
            this.urlAfterRedirects = urlAfterRedirects;
            this.state = state;
            this.type = 5 /* EventType.ResolveStart */;
        }
        toString() {
            return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    }
    /**
     * An event triggered at the end of the Resolve phase of routing.
     * @see `ResolveStart`.
     *
     * @publicApi
     */
    class ResolveEnd extends RouterEvent {
        constructor(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        urlAfterRedirects, 
        /** @docsNotRequired */
        state) {
            super(id, url);
            this.urlAfterRedirects = urlAfterRedirects;
            this.state = state;
            this.type = 6 /* EventType.ResolveEnd */;
        }
        toString() {
            return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    }
    /**
     * An event triggered before lazy loading a route configuration.
     *
     * @see `RouteConfigLoadEnd`
     *
     * @publicApi
     */
    class RouteConfigLoadStart {
        constructor(
        /** @docsNotRequired */
        route) {
            this.route = route;
            this.type = 9 /* EventType.RouteConfigLoadStart */;
        }
        toString() {
            return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
    }
    /**
     * An event triggered when a route has been lazy loaded.
     *
     * @see `RouteConfigLoadStart`
     *
     * @publicApi
     */
    class RouteConfigLoadEnd {
        constructor(
        /** @docsNotRequired */
        route) {
            this.route = route;
            this.type = 10 /* EventType.RouteConfigLoadEnd */;
        }
        toString() {
            return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
    }
    /**
     * An event triggered at the start of the child-activation
     * part of the Resolve phase of routing.
     * @see  `ChildActivationEnd`
     * @see `ResolveStart`
     *
     * @publicApi
     */
    class ChildActivationStart {
        constructor(
        /** @docsNotRequired */
        snapshot) {
            this.snapshot = snapshot;
            this.type = 11 /* EventType.ChildActivationStart */;
        }
        toString() {
            const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
            return `ChildActivationStart(path: '${path}')`;
        }
    }
    /**
     * An event triggered at the end of the child-activation part
     * of the Resolve phase of routing.
     * @see `ChildActivationStart`
     * @see `ResolveStart`
     * @publicApi
     */
    class ChildActivationEnd {
        constructor(
        /** @docsNotRequired */
        snapshot) {
            this.snapshot = snapshot;
            this.type = 12 /* EventType.ChildActivationEnd */;
        }
        toString() {
            const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
            return `ChildActivationEnd(path: '${path}')`;
        }
    }
    /**
     * An event triggered at the start of the activation part
     * of the Resolve phase of routing.
     * @see `ActivationEnd`
     * @see `ResolveStart`
     *
     * @publicApi
     */
    class ActivationStart {
        constructor(
        /** @docsNotRequired */
        snapshot) {
            this.snapshot = snapshot;
            this.type = 13 /* EventType.ActivationStart */;
        }
        toString() {
            const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
            return `ActivationStart(path: '${path}')`;
        }
    }
    /**
     * An event triggered at the end of the activation part
     * of the Resolve phase of routing.
     * @see `ActivationStart`
     * @see `ResolveStart`
     *
     * @publicApi
     */
    class ActivationEnd {
        constructor(
        /** @docsNotRequired */
        snapshot) {
            this.snapshot = snapshot;
            this.type = 14 /* EventType.ActivationEnd */;
        }
        toString() {
            const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
            return `ActivationEnd(path: '${path}')`;
        }
    }
    /**
     * An event triggered by scrolling.
     *
     * @publicApi
     */
    class Scroll {
        constructor(
        /** @docsNotRequired */
        routerEvent, 
        /** @docsNotRequired */
        position, 
        /** @docsNotRequired */
        anchor) {
            this.routerEvent = routerEvent;
            this.position = position;
            this.anchor = anchor;
            this.type = 15 /* EventType.Scroll */;
        }
        toString() {
            const pos = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
            return `Scroll(anchor: '${this.anchor}', position: '${pos}')`;
        }
    }
    function stringifyEvent(routerEvent) {
        var _a, _b, _c, _d;
        if (!('type' in routerEvent)) {
            return `Unknown Router Event: ${routerEvent.constructor.name}`;
        }
        switch (routerEvent.type) {
            case 14 /* EventType.ActivationEnd */:
                return `ActivationEnd(path: '${((_a = routerEvent.snapshot.routeConfig) === null || _a === void 0 ? void 0 : _a.path) || ''}')`;
            case 13 /* EventType.ActivationStart */:
                return `ActivationStart(path: '${((_b = routerEvent.snapshot.routeConfig) === null || _b === void 0 ? void 0 : _b.path) || ''}')`;
            case 12 /* EventType.ChildActivationEnd */:
                return `ChildActivationEnd(path: '${((_c = routerEvent.snapshot.routeConfig) === null || _c === void 0 ? void 0 : _c.path) || ''}')`;
            case 11 /* EventType.ChildActivationStart */:
                return `ChildActivationStart(path: '${((_d = routerEvent.snapshot.routeConfig) === null || _d === void 0 ? void 0 : _d.path) || ''}')`;
            case 8 /* EventType.GuardsCheckEnd */:
                return `GuardsCheckEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state}, shouldActivate: ${routerEvent.shouldActivate})`;
            case 7 /* EventType.GuardsCheckStart */:
                return `GuardsCheckStart(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
            case 2 /* EventType.NavigationCancel */:
                return `NavigationCancel(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
            case 1 /* EventType.NavigationEnd */:
                return `NavigationEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}')`;
            case 3 /* EventType.NavigationError */:
                return `NavigationError(id: ${routerEvent.id}, url: '${routerEvent.url}', error: ${routerEvent.error})`;
            case 0 /* EventType.NavigationStart */:
                return `NavigationStart(id: ${routerEvent.id}, url: '${routerEvent.url}')`;
            case 6 /* EventType.ResolveEnd */:
                return `ResolveEnd(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
            case 5 /* EventType.ResolveStart */:
                return `ResolveStart(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
            case 10 /* EventType.RouteConfigLoadEnd */:
                return `RouteConfigLoadEnd(path: ${routerEvent.route.path})`;
            case 9 /* EventType.RouteConfigLoadStart */:
                return `RouteConfigLoadStart(path: ${routerEvent.route.path})`;
            case 4 /* EventType.RoutesRecognized */:
                return `RoutesRecognized(id: ${routerEvent.id}, url: '${routerEvent.url}', urlAfterRedirects: '${routerEvent.urlAfterRedirects}', state: ${routerEvent.state})`;
            case 15 /* EventType.Scroll */:
                const pos = routerEvent.position ? `${routerEvent.position[0]}, ${routerEvent.position[1]}` : null;
                return `Scroll(anchor: '${routerEvent.anchor}', position: '${pos}')`;
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    class Tree {
        constructor(root) {
            this._root = root;
        }
        get root() {
            return this._root.value;
        }
        /**
         * @internal
         */
        parent(t) {
            const p = this.pathFromRoot(t);
            return p.length > 1 ? p[p.length - 2] : null;
        }
        /**
         * @internal
         */
        children(t) {
            const n = findNode(t, this._root);
            return n ? n.children.map(t => t.value) : [];
        }
        /**
         * @internal
         */
        firstChild(t) {
            const n = findNode(t, this._root);
            return n && n.children.length > 0 ? n.children[0].value : null;
        }
        /**
         * @internal
         */
        siblings(t) {
            const p = findPath(t, this._root);
            if (p.length < 2)
                return [];
            const c = p[p.length - 2].children.map(c => c.value);
            return c.filter(cc => cc !== t);
        }
        /**
         * @internal
         */
        pathFromRoot(t) {
            return findPath(t, this._root).map(s => s.value);
        }
    }
    // DFS for the node matching the value
    function findNode(value, node) {
        if (value === node.value)
            return node;
        for (const child of node.children) {
            const node = findNode(value, child);
            if (node)
                return node;
        }
        return null;
    }
    // Return the path to the node with the given value using DFS
    function findPath(value, node) {
        if (value === node.value)
            return [node];
        for (const child of node.children) {
            const path = findPath(value, child);
            if (path.length) {
                path.unshift(node);
                return path;
            }
        }
        return [];
    }
    class TreeNode {
        constructor(value, children) {
            this.value = value;
            this.children = children;
        }
        toString() {
            return `TreeNode(${this.value})`;
        }
    }
    // Return the list of T indexed by outlet name
    function nodeChildrenAsMap(node) {
        const map = {};
        if (node) {
            node.children.forEach(child => map[child.value.outlet] = child);
        }
        return map;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Represents the state of the router as a tree of activated routes.
     *
     * @usageNotes
     *
     * Every node in the route tree is an `ActivatedRoute` instance
     * that knows about the "consumed" URL segments, the extracted parameters,
     * and the resolved data.
     * Use the `ActivatedRoute` properties to traverse the tree from any node.
     *
     * The following fragment shows how a component gets the root node
     * of the current state to establish its own route tree:
     *
     * ```
     * @Component({templateUrl:'template.html'})
     * class MyComponent {
     *   constructor(router: Router) {
     *     const state: RouterState = router.routerState;
     *     const root: ActivatedRoute = state.root;
     *     const child = root.firstChild;
     *     const id: Observable<string> = child.params.map(p => p.id);
     *     //...
     *   }
     * }
     * ```
     *
     * @see `ActivatedRoute`
     * @see [Getting route information](guide/router#getting-route-information)
     *
     * @publicApi
     */
    class RouterState extends Tree {
        /** @internal */
        constructor(root, 
        /** The current snapshot of the router state */
        snapshot) {
            super(root);
            this.snapshot = snapshot;
            setRouterState(this, root);
        }
        toString() {
            return this.snapshot.toString();
        }
    }
    function createEmptyState(urlTree, rootComponent) {
        const snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
        const emptyUrl = new rxjs.BehaviorSubject([new UrlSegment('', {})]);
        const emptyParams = new rxjs.BehaviorSubject({});
        const emptyData = new rxjs.BehaviorSubject({});
        const emptyQueryParams = new rxjs.BehaviorSubject({});
        const fragment = new rxjs.BehaviorSubject('');
        const activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
        activated.snapshot = snapshot.root;
        return new RouterState(new TreeNode(activated, []), snapshot);
    }
    function createEmptyStateSnapshot(urlTree, rootComponent) {
        const emptyParams = {};
        const emptyData = {};
        const emptyQueryParams = {};
        const fragment = '';
        const activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, null, urlTree.root, -1, {});
        return new RouterStateSnapshot('', new TreeNode(activated, []));
    }
    /**
     * Provides access to information about a route associated with a component
     * that is loaded in an outlet.
     * Use to traverse the `RouterState` tree and extract information from nodes.
     *
     * The following example shows how to construct a component using information from a
     * currently activated route.
     *
     * Note: the observables in this class only emit when the current and previous values differ based
     * on shallow equality. For example, changing deeply nested properties in resolved `data` will not
     * cause the `ActivatedRoute.data` `Observable` to emit a new value.
     *
     * {@example router/activated-route/module.ts region="activated-route"
     *     header="activated-route.component.ts"}
     *
     * @see [Getting route information](guide/router#getting-route-information)
     *
     * @publicApi
     */
    class ActivatedRoute {
        /** @internal */
        constructor(
        /** An observable of the URL segments matched by this route. */
        url, 
        /** An observable of the matrix parameters scoped to this route. */
        params, 
        /** An observable of the query parameters shared by all the routes. */
        queryParams, 
        /** An observable of the URL fragment shared by all the routes. */
        fragment, 
        /** An observable of the static and resolved data of this route. */
        data, 
        /** The outlet name of the route, a constant. */
        outlet, 
        /** The component of the route, a constant. */
        component, futureSnapshot) {
            var _a, _b;
            this.url = url;
            this.params = params;
            this.queryParams = queryParams;
            this.fragment = fragment;
            this.data = data;
            this.outlet = outlet;
            this.component = component;
            /** An Observable of the resolved route title */
            this.title = (_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.pipe(operators.map((d) => d[RouteTitleKey]))) !== null && _b !== void 0 ? _b : rxjs.of(undefined);
            this._futureSnapshot = futureSnapshot;
        }
        /** The configuration used to match this route. */
        get routeConfig() {
            return this._futureSnapshot.routeConfig;
        }
        /** The root of the router state. */
        get root() {
            return this._routerState.root;
        }
        /** The parent of this route in the router state tree. */
        get parent() {
            return this._routerState.parent(this);
        }
        /** The first child of this route in the router state tree. */
        get firstChild() {
            return this._routerState.firstChild(this);
        }
        /** The children of this route in the router state tree. */
        get children() {
            return this._routerState.children(this);
        }
        /** The path from the root of the router state tree to this route. */
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this);
        }
        /**
         * An Observable that contains a map of the required and optional parameters
         * specific to the route.
         * The map supports retrieving single and multiple values from the same parameter.
         */
        get paramMap() {
            if (!this._paramMap) {
                this._paramMap = this.params.pipe(operators.map((p) => convertToParamMap(p)));
            }
            return this._paramMap;
        }
        /**
         * An Observable that contains a map of the query parameters available to all routes.
         * The map supports retrieving single and multiple values from the query parameter.
         */
        get queryParamMap() {
            if (!this._queryParamMap) {
                this._queryParamMap =
                    this.queryParams.pipe(operators.map((p) => convertToParamMap(p)));
            }
            return this._queryParamMap;
        }
        toString() {
            return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
        }
    }
    /**
     * Returns the inherited params, data, and resolve for a given route.
     * By default, this only inherits values up to the nearest path-less or component-less route.
     * @internal
     */
    function inheritedParamsDataResolve(route, paramsInheritanceStrategy = 'emptyOnly') {
        const pathFromRoot = route.pathFromRoot;
        let inheritingStartingFrom = 0;
        if (paramsInheritanceStrategy !== 'always') {
            inheritingStartingFrom = pathFromRoot.length - 1;
            while (inheritingStartingFrom >= 1) {
                const current = pathFromRoot[inheritingStartingFrom];
                const parent = pathFromRoot[inheritingStartingFrom - 1];
                // current route is an empty path => inherits its parent's params and data
                if (current.routeConfig && current.routeConfig.path === '') {
                    inheritingStartingFrom--;
                    // parent is componentless => current route should inherit its params and data
                }
                else if (!parent.component) {
                    inheritingStartingFrom--;
                }
                else {
                    break;
                }
            }
        }
        return flattenInherited(pathFromRoot.slice(inheritingStartingFrom));
    }
    /** @internal */
    function flattenInherited(pathFromRoot) {
        return pathFromRoot.reduce((res, curr) => {
            var _a;
            const params = Object.assign(Object.assign({}, res.params), curr.params);
            const data = Object.assign(Object.assign({}, res.data), curr.data);
            const resolve = Object.assign(Object.assign(Object.assign(Object.assign({}, curr.data), res.resolve), (_a = curr.routeConfig) === null || _a === void 0 ? void 0 : _a.data), curr._resolvedData);
            return { params, data, resolve };
        }, { params: {}, data: {}, resolve: {} });
    }
    /**
     * @description
     *
     * Contains the information about a route associated with a component loaded in an
     * outlet at a particular moment in time. ActivatedRouteSnapshot can also be used to
     * traverse the router state tree.
     *
     * The following example initializes a component with route information extracted
     * from the snapshot of the root node at the time of creation.
     *
     * ```
     * @Component({templateUrl:'./my-component.html'})
     * class MyComponent {
     *   constructor(route: ActivatedRoute) {
     *     const id: string = route.snapshot.params.id;
     *     const url: string = route.snapshot.url.join('');
     *     const user = route.snapshot.data.user;
     *   }
     * }
     * ```
     *
     * @publicApi
     */
    class ActivatedRouteSnapshot {
        /** @internal */
        constructor(
        /** The URL segments matched by this route */
        url, 
        /**
         *  The matrix parameters scoped to this route.
         *
         *  You can compute all params (or data) in the router state or to get params outside
         *  of an activated component by traversing the `RouterState` tree as in the following
         *  example:
         *  ```
         *  collectRouteParams(router: Router) {
         *    let params = {};
         *    let stack: ActivatedRouteSnapshot[] = [router.routerState.snapshot.root];
         *    while (stack.length > 0) {
         *      const route = stack.pop()!;
         *      params = {...params, ...route.params};
         *      stack.push(...route.children);
         *    }
         *    return params;
         *  }
         *  ```
         */
        params, 
        /** The query parameters shared by all the routes */
        queryParams, 
        /** The URL fragment shared by all the routes */
        fragment, 
        /** The static and resolved data of this route */
        data, 
        /** The outlet name of the route */
        outlet, 
        /** The component of the route */
        component, routeConfig, urlSegment, lastPathIndex, resolve) {
            this.url = url;
            this.params = params;
            this.queryParams = queryParams;
            this.fragment = fragment;
            this.data = data;
            this.outlet = outlet;
            this.component = component;
            this.routeConfig = routeConfig;
            this._urlSegment = urlSegment;
            this._lastPathIndex = lastPathIndex;
            this._resolve = resolve;
        }
        /** The resolved route title */
        get title() {
            var _a;
            // Note: This _must_ be a getter because the data is mutated in the resolvers. Title will not be
            // available at the time of class instantiation.
            return (_a = this.data) === null || _a === void 0 ? void 0 : _a[RouteTitleKey];
        }
        /** The root of the router state */
        get root() {
            return this._routerState.root;
        }
        /** The parent of this route in the router state tree */
        get parent() {
            return this._routerState.parent(this);
        }
        /** The first child of this route in the router state tree */
        get firstChild() {
            return this._routerState.firstChild(this);
        }
        /** The children of this route in the router state tree */
        get children() {
            return this._routerState.children(this);
        }
        /** The path from the root of the router state tree to this route */
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
            if (!this._paramMap) {
                this._paramMap = convertToParamMap(this.params);
            }
            return this._paramMap;
        }
        get queryParamMap() {
            if (!this._queryParamMap) {
                this._queryParamMap = convertToParamMap(this.queryParams);
            }
            return this._queryParamMap;
        }
        toString() {
            const url = this.url.map(segment => segment.toString()).join('/');
            const matched = this.routeConfig ? this.routeConfig.path : '';
            return `Route(url:'${url}', path:'${matched}')`;
        }
    }
    /**
     * @description
     *
     * Represents the state of the router at a moment in time.
     *
     * This is a tree of activated route snapshots. Every node in this tree knows about
     * the "consumed" URL segments, the extracted parameters, and the resolved data.
     *
     * The following example shows how a component is initialized with information
     * from the snapshot of the root node's state at the time of creation.
     *
     * ```
     * @Component({templateUrl:'template.html'})
     * class MyComponent {
     *   constructor(router: Router) {
     *     const state: RouterState = router.routerState;
     *     const snapshot: RouterStateSnapshot = state.snapshot;
     *     const root: ActivatedRouteSnapshot = snapshot.root;
     *     const child = root.firstChild;
     *     const id: Observable<string> = child.params.map(p => p.id);
     *     //...
     *   }
     * }
     * ```
     *
     * @publicApi
     */
    class RouterStateSnapshot extends Tree {
        /** @internal */
        constructor(
        /** The url from which this snapshot was created */
        url, root) {
            super(root);
            this.url = url;
            setRouterState(this, root);
        }
        toString() {
            return serializeNode(this._root);
        }
    }
    function setRouterState(state, node) {
        node.value._routerState = state;
        node.children.forEach(c => setRouterState(state, c));
    }
    function serializeNode(node) {
        const c = node.children.length > 0 ? ` { ${node.children.map(serializeNode).join(', ')} } ` : '';
        return `${node.value}${c}`;
    }
    /**
     * The expectation is that the activate route is created with the right set of parameters.
     * So we push new values into the observables only when they are not the initial values.
     * And we detect that by checking if the snapshot field is set.
     */
    function advanceActivatedRoute(route) {
        if (route.snapshot) {
            const currentSnapshot = route.snapshot;
            const nextSnapshot = route._futureSnapshot;
            route.snapshot = nextSnapshot;
            if (!shallowEqual(currentSnapshot.queryParams, nextSnapshot.queryParams)) {
                route.queryParams.next(nextSnapshot.queryParams);
            }
            if (currentSnapshot.fragment !== nextSnapshot.fragment) {
                route.fragment.next(nextSnapshot.fragment);
            }
            if (!shallowEqual(currentSnapshot.params, nextSnapshot.params)) {
                route.params.next(nextSnapshot.params);
            }
            if (!shallowEqualArrays(currentSnapshot.url, nextSnapshot.url)) {
                route.url.next(nextSnapshot.url);
            }
            if (!shallowEqual(currentSnapshot.data, nextSnapshot.data)) {
                route.data.next(nextSnapshot.data);
            }
        }
        else {
            route.snapshot = route._futureSnapshot;
            // this is for resolved data
            route.data.next(route._futureSnapshot.data);
        }
    }
    function equalParamsAndUrlSegments(a, b) {
        const equalUrlParams = shallowEqual(a.params, b.params) && equalSegments(a.url, b.url);
        const parentsMismatch = !a.parent !== !b.parent;
        return equalUrlParams && !parentsMismatch &&
            (!a.parent || equalParamsAndUrlSegments(a.parent, b.parent));
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function createRouterState(routeReuseStrategy, curr, prevState) {
        const root = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : undefined);
        return new RouterState(root, curr);
    }
    function createNode(routeReuseStrategy, curr, prevState) {
        // reuse an activated route that is currently displayed on the screen
        if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
            const value = prevState.value;
            value._futureSnapshot = curr.value;
            const children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
            return new TreeNode(value, children);
        }
        else {
            if (routeReuseStrategy.shouldAttach(curr.value)) {
                // retrieve an activated route that is used to be displayed, but is not currently displayed
                const detachedRouteHandle = routeReuseStrategy.retrieve(curr.value);
                if (detachedRouteHandle !== null) {
                    const tree = detachedRouteHandle.route;
                    tree.value._futureSnapshot = curr.value;
                    tree.children = curr.children.map(c => createNode(routeReuseStrategy, c));
                    return tree;
                }
            }
            const value = createActivatedRoute(curr.value);
            const children = curr.children.map(c => createNode(routeReuseStrategy, c));
            return new TreeNode(value, children);
        }
    }
    function createOrReuseChildren(routeReuseStrategy, curr, prevState) {
        return curr.children.map(child => {
            for (const p of prevState.children) {
                if (routeReuseStrategy.shouldReuseRoute(child.value, p.value.snapshot)) {
                    return createNode(routeReuseStrategy, child, p);
                }
            }
            return createNode(routeReuseStrategy, child);
        });
    }
    function createActivatedRoute(c) {
        return new ActivatedRoute(new rxjs.BehaviorSubject(c.url), new rxjs.BehaviorSubject(c.params), new rxjs.BehaviorSubject(c.queryParams), new rxjs.BehaviorSubject(c.fragment), new rxjs.BehaviorSubject(c.data), c.outlet, c.component, c);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NAVIGATION_CANCELING_ERROR = 'ngNavigationCancelingError';
    function redirectingNavigationError(urlSerializer, redirect) {
        const { redirectTo, navigationBehaviorOptions } = isUrlTree(redirect) ? { redirectTo: redirect, navigationBehaviorOptions: undefined } : redirect;
        const error = navigationCancelingError(ngDevMode && `Redirecting to "${urlSerializer.serialize(redirectTo)}"`, 0 /* NavigationCancellationCode.Redirect */, redirect);
        error.url = redirectTo;
        error.navigationBehaviorOptions = navigationBehaviorOptions;
        return error;
    }
    function navigationCancelingError(message, code, redirectUrl) {
        const error = new Error('NavigationCancelingError: ' + (message || ''));
        error[NAVIGATION_CANCELING_ERROR] = true;
        error.cancellationCode = code;
        if (redirectUrl) {
            error.url = redirectUrl;
        }
        return error;
    }
    function isRedirectingNavigationCancelingError$1(error) {
        return isNavigationCancelingError$1(error) && isUrlTree(error.url);
    }
    function isNavigationCancelingError$1(error) {
        return error && error[NAVIGATION_CANCELING_ERROR];
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Store contextual information about a `RouterOutlet`
     *
     * @publicApi
     */
    class OutletContext {
        constructor() {
            this.outlet = null;
            this.route = null;
            /**
             * @deprecated Passing a resolver to retrieve a component factory is not required and is
             *     deprecated since v14.
             */
            this.resolver = null;
            this.injector = null;
            this.children = new ChildrenOutletContexts();
            this.attachRef = null;
        }
    }
    /**
     * Store contextual information about the children (= nested) `RouterOutlet`
     *
     * @publicApi
     */
    class ChildrenOutletContexts {
        constructor() {
            // contexts for child outlets, by name.
            this.contexts = new Map();
        }
        /** Called when a `RouterOutlet` directive is instantiated */
        onChildOutletCreated(childName, outlet) {
            const context = this.getOrCreateContext(childName);
            context.outlet = outlet;
            this.contexts.set(childName, context);
        }
        /**
         * Called when a `RouterOutlet` directive is destroyed.
         * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
         * re-created later.
         */
        onChildOutletDestroyed(childName) {
            const context = this.getContext(childName);
            if (context) {
                context.outlet = null;
                context.attachRef = null;
            }
        }
        /**
         * Called when the corresponding route is deactivated during navigation.
         * Because the component get destroyed, all children outlet are destroyed.
         */
        onOutletDeactivated() {
            const contexts = this.contexts;
            this.contexts = new Map();
            return contexts;
        }
        onOutletReAttached(contexts) {
            this.contexts = contexts;
        }
        getOrCreateContext(childName) {
            let context = this.getContext(childName);
            if (!context) {
                context = new OutletContext();
                this.contexts.set(childName, context);
            }
            return context;
        }
        getContext(childName) {
            return this.contexts.get(childName) || null;
        }
    }
    ChildrenOutletContexts.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: ChildrenOutletContexts, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ChildrenOutletContexts.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: ChildrenOutletContexts, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: ChildrenOutletContexts, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }] });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$8 = typeof ngDevMode === 'undefined' || ngDevMode;
    /**
     * @description
     *
     * Acts as a placeholder that Angular dynamically fills based on the current router state.
     *
     * Each outlet can have a unique name, determined by the optional `name` attribute.
     * The name cannot be set or changed dynamically. If not set, default value is "primary".
     *
     * ```
     * <router-outlet></router-outlet>
     * <router-outlet name='left'></router-outlet>
     * <router-outlet name='right'></router-outlet>
     * ```
     *
     * Named outlets can be the targets of secondary routes.
     * The `Route` object for a secondary route has an `outlet` property to identify the target outlet:
     *
     * `{path: <base-path>, component: <component>, outlet: <target_outlet_name>}`
     *
     * Using named outlets and secondary routes, you can target multiple outlets in
     * the same `RouterLink` directive.
     *
     * The router keeps track of separate branches in a navigation tree for each named outlet and
     * generates a representation of that tree in the URL.
     * The URL for a secondary route uses the following syntax to specify both the primary and secondary
     * routes at the same time:
     *
     * `http://base-path/primary-route-path(outlet-name:route-path)`
     *
     * A router outlet emits an activate event when a new component is instantiated,
     * deactivate event when a component is destroyed.
     * An attached event emits when the `RouteReuseStrategy` instructs the outlet to reattach the
     * subtree, and the detached event emits when the `RouteReuseStrategy` instructs the outlet to
     * detach the subtree.
     *
     * ```
     * <router-outlet
     *   (activate)='onActivate($event)'
     *   (deactivate)='onDeactivate($event)'
     *   (attach)='onAttach($event)'
     *   (detach)='onDetach($event)'></router-outlet>
     * ```
     *
     * @see [Routing tutorial](guide/router-tutorial-toh#named-outlets "Example of a named
     * outlet and secondary route configuration").
     * @see `RouterLink`
     * @see `Route`
     * @ngModule RouterModule
     *
     * @publicApi
     */
    class RouterOutlet {
        constructor() {
            this.activated = null;
            this._activatedRoute = null;
            /**
             * The name of the outlet
             *
             * @see [named outlets](guide/router-tutorial-toh#displaying-multiple-routes-in-named-outlets)
             */
            this.name = PRIMARY_OUTLET;
            this.activateEvents = new i0.EventEmitter();
            this.deactivateEvents = new i0.EventEmitter();
            /**
             * Emits an attached component instance when the `RouteReuseStrategy` instructs to re-attach a
             * previously detached subtree.
             **/
            this.attachEvents = new i0.EventEmitter();
            /**
             * Emits a detached component instance when the `RouteReuseStrategy` instructs to detach the
             * subtree.
             */
            this.detachEvents = new i0.EventEmitter();
            this.parentContexts = i0.inject(ChildrenOutletContexts);
            this.location = i0.inject(i0.ViewContainerRef);
            this.changeDetector = i0.inject(i0.ChangeDetectorRef);
            this.environmentInjector = i0.inject(i0.EnvironmentInjector);
        }
        /** @nodoc */
        ngOnChanges(changes) {
            if (changes['name']) {
                const { firstChange, previousValue } = changes['name'];
                if (firstChange) {
                    // The first change is handled by ngOnInit. Because ngOnChanges doesn't get called when no
                    // input is set at all, we need to centrally handle the first change there.
                    return;
                }
                // unregister with the old name
                if (this.isTrackedInParentContexts(previousValue)) {
                    this.deactivate();
                    this.parentContexts.onChildOutletDestroyed(previousValue);
                }
                // register the new name
                this.initializeOutletWithName();
            }
        }
        /** @nodoc */
        ngOnDestroy() {
            // Ensure that the registered outlet is this one before removing it on the context.
            if (this.isTrackedInParentContexts(this.name)) {
                this.parentContexts.onChildOutletDestroyed(this.name);
            }
        }
        isTrackedInParentContexts(outletName) {
            var _a;
            return ((_a = this.parentContexts.getContext(outletName)) === null || _a === void 0 ? void 0 : _a.outlet) === this;
        }
        /** @nodoc */
        ngOnInit() {
            this.initializeOutletWithName();
        }
        initializeOutletWithName() {
            this.parentContexts.onChildOutletCreated(this.name, this);
            if (this.activated) {
                return;
            }
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            const context = this.parentContexts.getContext(this.name);
            if (context === null || context === void 0 ? void 0 : context.route) {
                if (context.attachRef) {
                    // `attachRef` is populated when there is an existing component to mount
                    this.attach(context.attachRef, context.route);
                }
                else {
                    // otherwise the component defined in the configuration is created
                    this.activateWith(context.route, context.injector);
                }
            }
        }
        get isActivated() {
            return !!this.activated;
        }
        /**
         * @returns The currently activated component instance.
         * @throws An error if the outlet is not activated.
         */
        get component() {
            if (!this.activated)
                throw new i0["ɵRuntimeError"](4012 /* RuntimeErrorCode.OUTLET_NOT_ACTIVATED */, NG_DEV_MODE$8 && 'Outlet is not activated');
            return this.activated.instance;
        }
        get activatedRoute() {
            if (!this.activated)
                throw new i0["ɵRuntimeError"](4012 /* RuntimeErrorCode.OUTLET_NOT_ACTIVATED */, NG_DEV_MODE$8 && 'Outlet is not activated');
            return this._activatedRoute;
        }
        get activatedRouteData() {
            if (this._activatedRoute) {
                return this._activatedRoute.snapshot.data;
            }
            return {};
        }
        /**
         * Called when the `RouteReuseStrategy` instructs to detach the subtree
         */
        detach() {
            if (!this.activated)
                throw new i0["ɵRuntimeError"](4012 /* RuntimeErrorCode.OUTLET_NOT_ACTIVATED */, NG_DEV_MODE$8 && 'Outlet is not activated');
            this.location.detach();
            const cmp = this.activated;
            this.activated = null;
            this._activatedRoute = null;
            this.detachEvents.emit(cmp.instance);
            return cmp;
        }
        /**
         * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
         */
        attach(ref, activatedRoute) {
            this.activated = ref;
            this._activatedRoute = activatedRoute;
            this.location.insert(ref.hostView);
            this.attachEvents.emit(ref.instance);
        }
        deactivate() {
            if (this.activated) {
                const c = this.component;
                this.activated.destroy();
                this.activated = null;
                this._activatedRoute = null;
                this.deactivateEvents.emit(c);
            }
        }
        activateWith(activatedRoute, resolverOrInjector) {
            if (this.isActivated) {
                throw new i0["ɵRuntimeError"](4013 /* RuntimeErrorCode.OUTLET_ALREADY_ACTIVATED */, NG_DEV_MODE$8 && 'Cannot activate an already activated outlet');
            }
            this._activatedRoute = activatedRoute;
            const location = this.location;
            const snapshot = activatedRoute.snapshot;
            const component = snapshot.component;
            const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
            const injector = new OutletInjector(activatedRoute, childContexts, location.injector);
            if (resolverOrInjector && isComponentFactoryResolver(resolverOrInjector)) {
                const factory = resolverOrInjector.resolveComponentFactory(component);
                this.activated = location.createComponent(factory, location.length, injector);
            }
            else {
                const environmentInjector = resolverOrInjector !== null && resolverOrInjector !== void 0 ? resolverOrInjector : this.environmentInjector;
                this.activated = location.createComponent(component, { index: location.length, injector, environmentInjector });
            }
            // Calling `markForCheck` to make sure we will run the change detection when the
            // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
            this.changeDetector.markForCheck();
            this.activateEvents.emit(this.activated.instance);
        }
    }
    RouterOutlet.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterOutlet, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RouterOutlet.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.1", type: RouterOutlet, isStandalone: true, selector: "router-outlet", inputs: { name: "name" }, outputs: { activateEvents: "activate", deactivateEvents: "deactivate", attachEvents: "attach", detachEvents: "detach" }, exportAs: ["outlet"], usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterOutlet, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'router-outlet',
                        exportAs: 'outlet',
                        standalone: true,
                    }]
            }], propDecorators: { name: [{
                    type: i0.Input
                }], activateEvents: [{
                    type: i0.Output,
                    args: ['activate']
                }], deactivateEvents: [{
                    type: i0.Output,
                    args: ['deactivate']
                }], attachEvents: [{
                    type: i0.Output,
                    args: ['attach']
                }], detachEvents: [{
                    type: i0.Output,
                    args: ['detach']
                }] } });
    class OutletInjector {
        constructor(route, childContexts, parent) {
            this.route = route;
            this.childContexts = childContexts;
            this.parent = parent;
        }
        get(token, notFoundValue) {
            if (token === ActivatedRoute) {
                return this.route;
            }
            if (token === ChildrenOutletContexts) {
                return this.childContexts;
            }
            return this.parent.get(token, notFoundValue);
        }
    }
    function isComponentFactoryResolver(item) {
        return !!item.resolveComponentFactory;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * This component is used internally within the router to be a placeholder when an empty
     * router-outlet is needed. For example, with a config such as:
     *
     * `{path: 'parent', outlet: 'nav', children: [...]}`
     *
     * In order to render, there needs to be a component on this config, which will default
     * to this `EmptyOutletComponent`.
     */
    class ɵEmptyOutletComponent {
    }
    ɵEmptyOutletComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: ɵEmptyOutletComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    ɵEmptyOutletComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.1", type: ɵEmptyOutletComponent, isStandalone: true, selector: "ng-component", ngImport: i0__namespace, template: `<router-outlet></router-outlet>`, isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: ɵEmptyOutletComponent, decorators: [{
                type: i0.Component,
                args: [{
                        template: `<router-outlet></router-outlet>`,
                        imports: [RouterOutlet],
                        standalone: true,
                    }]
            }] });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Creates an `EnvironmentInjector` if the `Route` has providers and one does not already exist
     * and returns the injector. Otherwise, if the `Route` does not have `providers`, returns the
     * `currentInjector`.
     *
     * @param route The route that might have providers
     * @param currentInjector The parent injector of the `Route`
     */
    function getOrCreateRouteInjectorIfNeeded(route, currentInjector) {
        var _a;
        if (route.providers && !route._injector) {
            route._injector =
                i0.createEnvironmentInjector(route.providers, currentInjector, `Route: ${route.path}`);
        }
        return (_a = route._injector) !== null && _a !== void 0 ? _a : currentInjector;
    }
    function validateConfig(config, parentPath = '', requireStandaloneComponents = false) {
        // forEach doesn't iterate undefined values
        for (let i = 0; i < config.length; i++) {
            const route = config[i];
            const fullPath = getFullPath(parentPath, route);
            validateNode(route, fullPath, requireStandaloneComponents);
        }
    }
    function assertStandalone(fullPath, component) {
        if (component && !i0["ɵisStandalone"](component)) {
            throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}'. The component must be standalone.`);
        }
    }
    function validateNode(route, fullPath, requireStandaloneComponents) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!route) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `
      Invalid configuration of route '${fullPath}': Encountered undefined route.
      The reason might be an extra comma.

      Example:
      const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard',  component: DashboardComponent },, << two commas
        { path: 'detail/:id', component: HeroDetailComponent }
      ];
    `);
            }
            if (Array.isArray(route)) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': Array cannot be specified`);
            }
            if (!route.redirectTo && !route.component && !route.loadComponent && !route.children &&
                !route.loadChildren && (route.outlet && route.outlet !== PRIMARY_OUTLET)) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': a componentless route without children or loadChildren cannot have a named outlet set`);
            }
            if (route.redirectTo && route.children) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': redirectTo and children cannot be used together`);
            }
            if (route.redirectTo && route.loadChildren) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': redirectTo and loadChildren cannot be used together`);
            }
            if (route.children && route.loadChildren) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': children and loadChildren cannot be used together`);
            }
            if (route.redirectTo && (route.component || route.loadComponent)) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': redirectTo and component/loadComponent cannot be used together`);
            }
            if (route.component && route.loadComponent) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': component and loadComponent cannot be used together`);
            }
            if (route.redirectTo && route.canActivate) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': redirectTo and canActivate cannot be used together. Redirects happen before activation ` +
                    `so canActivate will never be executed.`);
            }
            if (route.path && route.matcher) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': path and matcher cannot be used together`);
            }
            if (route.redirectTo === void 0 && !route.component && !route.loadComponent &&
                !route.children && !route.loadChildren) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}'. One of the following must be provided: component, loadComponent, redirectTo, children or loadChildren`);
            }
            if (route.path === void 0 && route.matcher === void 0) {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': routes must have either a path or a matcher specified`);
            }
            if (typeof route.path === 'string' && route.path.charAt(0) === '/') {
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '${fullPath}': path cannot start with a slash`);
            }
            if (route.path === '' && route.redirectTo !== void 0 && route.pathMatch === void 0) {
                const exp = `The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`;
                throw new i0["ɵRuntimeError"](4014 /* RuntimeErrorCode.INVALID_ROUTE_CONFIG */, `Invalid configuration of route '{path: "${fullPath}", redirectTo: "${route.redirectTo}"}': please provide 'pathMatch'. ${exp}`);
            }
            if (requireStandaloneComponents) {
                assertStandalone(fullPath, route.component);
            }
        }
        if (route.children) {
            validateConfig(route.children, fullPath, requireStandaloneComponents);
        }
    }
    function getFullPath(parentPath, currentRoute) {
        if (!currentRoute) {
            return parentPath;
        }
        if (!parentPath && !currentRoute.path) {
            return '';
        }
        else if (parentPath && !currentRoute.path) {
            return `${parentPath}/`;
        }
        else if (!parentPath && currentRoute.path) {
            return currentRoute.path;
        }
        else {
            return `${parentPath}/${currentRoute.path}`;
        }
    }
    /**
     * Makes a copy of the config and adds any default required properties.
     */
    function standardizeConfig(r) {
        const children = r.children && r.children.map(standardizeConfig);
        const c = children ? Object.assign(Object.assign({}, r), { children }) : Object.assign({}, r);
        if ((!c.component && !c.loadComponent) && (children || c.loadChildren) &&
            (c.outlet && c.outlet !== PRIMARY_OUTLET)) {
            c.component = ɵEmptyOutletComponent;
        }
        return c;
    }
    /** Returns the `route.outlet` or PRIMARY_OUTLET if none exists. */
    function getOutlet(route) {
        return route.outlet || PRIMARY_OUTLET;
    }
    /**
     * Sorts the `routes` such that the ones with an outlet matching `outletName` come first.
     * The order of the configs is otherwise preserved.
     */
    function sortByMatchingOutlets(routes, outletName) {
        const sortedConfig = routes.filter(r => getOutlet(r) === outletName);
        sortedConfig.push(...routes.filter(r => getOutlet(r) !== outletName));
        return sortedConfig;
    }
    /**
     * Gets the first injector in the snapshot's parent tree.
     *
     * If the `Route` has a static list of providers, the returned injector will be the one created from
     * those. If it does not exist, the returned injector may come from the parents, which may be from a
     * loaded config or their static providers.
     *
     * Returns `null` if there is neither this nor any parents have a stored injector.
     *
     * Generally used for retrieving the injector to use for getting tokens for guards/resolvers and
     * also used for getting the correct injector to use for creating components.
     */
    function getClosestRouteInjector(snapshot) {
        var _a;
        if (!snapshot)
            return null;
        // If the current route has its own injector, which is created from the static providers on the
        // route itself, we should use that. Otherwise, we start at the parent since we do not want to
        // include the lazy loaded injector from this route.
        if ((_a = snapshot.routeConfig) === null || _a === void 0 ? void 0 : _a._injector) {
            return snapshot.routeConfig._injector;
        }
        for (let s = snapshot.parent; s; s = s.parent) {
            const route = s.routeConfig;
            // Note that the order here is important. `_loadedInjector` stored on the route with
            // `loadChildren: () => NgModule` so it applies to child routes with priority. The `_injector`
            // is created from the static providers on that parent route, so it applies to the children as
            // well, but only if there is no lazy loaded NgModuleRef injector.
            if (route === null || route === void 0 ? void 0 : route._loadedInjector)
                return route._loadedInjector;
            if (route === null || route === void 0 ? void 0 : route._injector)
                return route._injector;
        }
        return null;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const activateRoutes = (rootContexts, routeReuseStrategy, forwardEvent) => operators.map(t => {
        new ActivateRoutes(routeReuseStrategy, t.targetRouterState, t.currentRouterState, forwardEvent)
            .activate(rootContexts);
        return t;
    });
    class ActivateRoutes {
        constructor(routeReuseStrategy, futureState, currState, forwardEvent) {
            this.routeReuseStrategy = routeReuseStrategy;
            this.futureState = futureState;
            this.currState = currState;
            this.forwardEvent = forwardEvent;
        }
        activate(parentContexts) {
            const futureRoot = this.futureState._root;
            const currRoot = this.currState ? this.currState._root : null;
            this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
            advanceActivatedRoute(this.futureState.root);
            this.activateChildRoutes(futureRoot, currRoot, parentContexts);
        }
        // De-activate the child route that are not re-used for the future state
        deactivateChildRoutes(futureNode, currNode, contexts) {
            const children = nodeChildrenAsMap(currNode);
            // Recurse on the routes active in the future state to de-activate deeper children
            futureNode.children.forEach(futureChild => {
                const childOutletName = futureChild.value.outlet;
                this.deactivateRoutes(futureChild, children[childOutletName], contexts);
                delete children[childOutletName];
            });
            // De-activate the routes that will not be re-used
            forEach(children, (v, childName) => {
                this.deactivateRouteAndItsChildren(v, contexts);
            });
        }
        deactivateRoutes(futureNode, currNode, parentContext) {
            const future = futureNode.value;
            const curr = currNode ? currNode.value : null;
            if (future === curr) {
                // Reusing the node, check to see if the children need to be de-activated
                if (future.component) {
                    // If we have a normal route, we need to go through an outlet.
                    const context = parentContext.getContext(future.outlet);
                    if (context) {
                        this.deactivateChildRoutes(futureNode, currNode, context.children);
                    }
                }
                else {
                    // if we have a componentless route, we recurse but keep the same outlet map.
                    this.deactivateChildRoutes(futureNode, currNode, parentContext);
                }
            }
            else {
                if (curr) {
                    // Deactivate the current route which will not be re-used
                    this.deactivateRouteAndItsChildren(currNode, parentContext);
                }
            }
        }
        deactivateRouteAndItsChildren(route, parentContexts) {
            // If there is no component, the Route is never attached to an outlet (because there is no
            // component to attach).
            if (route.value.component && this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
                this.detachAndStoreRouteSubtree(route, parentContexts);
            }
            else {
                this.deactivateRouteAndOutlet(route, parentContexts);
            }
        }
        detachAndStoreRouteSubtree(route, parentContexts) {
            const context = parentContexts.getContext(route.value.outlet);
            const contexts = context && route.value.component ? context.children : parentContexts;
            const children = nodeChildrenAsMap(route);
            for (const childOutlet of Object.keys(children)) {
                this.deactivateRouteAndItsChildren(children[childOutlet], contexts);
            }
            if (context && context.outlet) {
                const componentRef = context.outlet.detach();
                const contexts = context.children.onOutletDeactivated();
                this.routeReuseStrategy.store(route.value.snapshot, { componentRef, route, contexts });
            }
        }
        deactivateRouteAndOutlet(route, parentContexts) {
            const context = parentContexts.getContext(route.value.outlet);
            // The context could be `null` if we are on a componentless route but there may still be
            // children that need deactivating.
            const contexts = context && route.value.component ? context.children : parentContexts;
            const children = nodeChildrenAsMap(route);
            for (const childOutlet of Object.keys(children)) {
                this.deactivateRouteAndItsChildren(children[childOutlet], contexts);
            }
            if (context && context.outlet) {
                // Destroy the component
                context.outlet.deactivate();
                // Destroy the contexts for all the outlets that were in the component
                context.children.onOutletDeactivated();
                // Clear the information about the attached component on the context but keep the reference to
                // the outlet.
                context.attachRef = null;
                context.resolver = null;
                context.route = null;
            }
        }
        activateChildRoutes(futureNode, currNode, contexts) {
            const children = nodeChildrenAsMap(currNode);
            futureNode.children.forEach(c => {
                this.activateRoutes(c, children[c.value.outlet], contexts);
                this.forwardEvent(new ActivationEnd(c.value.snapshot));
            });
            if (futureNode.children.length) {
                this.forwardEvent(new ChildActivationEnd(futureNode.value.snapshot));
            }
        }
        activateRoutes(futureNode, currNode, parentContexts) {
            var _a;
            const future = futureNode.value;
            const curr = currNode ? currNode.value : null;
            advanceActivatedRoute(future);
            // reusing the node
            if (future === curr) {
                if (future.component) {
                    // If we have a normal route, we need to go through an outlet.
                    const context = parentContexts.getOrCreateContext(future.outlet);
                    this.activateChildRoutes(futureNode, currNode, context.children);
                }
                else {
                    // if we have a componentless route, we recurse but keep the same outlet map.
                    this.activateChildRoutes(futureNode, currNode, parentContexts);
                }
            }
            else {
                if (future.component) {
                    // if we have a normal route, we need to place the component into the outlet and recurse.
                    const context = parentContexts.getOrCreateContext(future.outlet);
                    if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
                        const stored = this.routeReuseStrategy.retrieve(future.snapshot);
                        this.routeReuseStrategy.store(future.snapshot, null);
                        context.children.onOutletReAttached(stored.contexts);
                        context.attachRef = stored.componentRef;
                        context.route = stored.route.value;
                        if (context.outlet) {
                            // Attach right away when the outlet has already been instantiated
                            // Otherwise attach from `RouterOutlet.ngOnInit` when it is instantiated
                            context.outlet.attach(stored.componentRef, stored.route.value);
                        }
                        advanceActivatedRoute(stored.route.value);
                        this.activateChildRoutes(futureNode, null, context.children);
                    }
                    else {
                        const injector = getClosestRouteInjector(future.snapshot);
                        const cmpFactoryResolver = (_a = injector === null || injector === void 0 ? void 0 : injector.get(i0.ComponentFactoryResolver)) !== null && _a !== void 0 ? _a : null;
                        context.attachRef = null;
                        context.route = future;
                        context.resolver = cmpFactoryResolver;
                        context.injector = injector;
                        if (context.outlet) {
                            // Activate the outlet when it has already been instantiated
                            // Otherwise it will get activated from its `ngOnInit` when instantiated
                            context.outlet.activateWith(future, context.injector);
                        }
                        this.activateChildRoutes(futureNode, null, context.children);
                    }
                }
                else {
                    // if we have a componentless route, we recurse but keep the same outlet map.
                    this.activateChildRoutes(futureNode, null, parentContexts);
                }
            }
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    class CanActivate {
        constructor(path) {
            this.path = path;
            this.route = this.path[this.path.length - 1];
        }
    }
    class CanDeactivate {
        constructor(component, route) {
            this.component = component;
            this.route = route;
        }
    }
    function getAllRouteGuards(future, curr, parentContexts) {
        const futureRoot = future._root;
        const currRoot = curr ? curr._root : null;
        return getChildRouteGuards(futureRoot, currRoot, parentContexts, [futureRoot.value]);
    }
    function getCanActivateChild(p) {
        const canActivateChild = p.routeConfig ? p.routeConfig.canActivateChild : null;
        if (!canActivateChild || canActivateChild.length === 0)
            return null;
        return { node: p, guards: canActivateChild };
    }
    function getTokenOrFunctionIdentity(tokenOrFunction, injector) {
        const NOT_FOUND = Symbol();
        const result = injector.get(tokenOrFunction, NOT_FOUND);
        if (result === NOT_FOUND) {
            if (typeof tokenOrFunction === 'function' && !i0["ɵisInjectable"](tokenOrFunction)) {
                // We think the token is just a function so return it as-is
                return tokenOrFunction;
            }
            else {
                // This will throw the not found error
                return injector.get(tokenOrFunction);
            }
        }
        return result;
    }
    function getChildRouteGuards(futureNode, currNode, contexts, futurePath, checks = {
        canDeactivateChecks: [],
        canActivateChecks: []
    }) {
        const prevChildren = nodeChildrenAsMap(currNode);
        // Process the children of the future route
        futureNode.children.forEach(c => {
            getRouteGuards(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]), checks);
            delete prevChildren[c.value.outlet];
        });
        // Process any children left from the current route (not active for the future route)
        forEach(prevChildren, (v, k) => deactivateRouteAndItsChildren(v, contexts.getContext(k), checks));
        return checks;
    }
    function getRouteGuards(futureNode, currNode, parentContexts, futurePath, checks = {
        canDeactivateChecks: [],
        canActivateChecks: []
    }) {
        const future = futureNode.value;
        const curr = currNode ? currNode.value : null;
        const context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
        // reusing the node
        if (curr && future.routeConfig === curr.routeConfig) {
            const shouldRun = shouldRunGuardsAndResolvers(curr, future, future.routeConfig.runGuardsAndResolvers);
            if (shouldRun) {
                checks.canActivateChecks.push(new CanActivate(futurePath));
            }
            else {
                // we need to set the data
                future.data = curr.data;
                future._resolvedData = curr._resolvedData;
            }
            // If we have a component, we need to go through an outlet.
            if (future.component) {
                getChildRouteGuards(futureNode, currNode, context ? context.children : null, futurePath, checks);
                // if we have a componentless route, we recurse but keep the same outlet map.
            }
            else {
                getChildRouteGuards(futureNode, currNode, parentContexts, futurePath, checks);
            }
            if (shouldRun && context && context.outlet && context.outlet.isActivated) {
                checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, curr));
            }
        }
        else {
            if (curr) {
                deactivateRouteAndItsChildren(currNode, context, checks);
            }
            checks.canActivateChecks.push(new CanActivate(futurePath));
            // If we have a component, we need to go through an outlet.
            if (future.component) {
                getChildRouteGuards(futureNode, null, context ? context.children : null, futurePath, checks);
                // if we have a componentless route, we recurse but keep the same outlet map.
            }
            else {
                getChildRouteGuards(futureNode, null, parentContexts, futurePath, checks);
            }
        }
        return checks;
    }
    function shouldRunGuardsAndResolvers(curr, future, mode) {
        if (typeof mode === 'function') {
            return mode(curr, future);
        }
        switch (mode) {
            case 'pathParamsChange':
                return !equalPath(curr.url, future.url);
            case 'pathParamsOrQueryParamsChange':
                return !equalPath(curr.url, future.url) ||
                    !shallowEqual(curr.queryParams, future.queryParams);
            case 'always':
                return true;
            case 'paramsOrQueryParamsChange':
                return !equalParamsAndUrlSegments(curr, future) ||
                    !shallowEqual(curr.queryParams, future.queryParams);
            case 'paramsChange':
            default:
                return !equalParamsAndUrlSegments(curr, future);
        }
    }
    function deactivateRouteAndItsChildren(route, context, checks) {
        const children = nodeChildrenAsMap(route);
        const r = route.value;
        forEach(children, (node, childName) => {
            if (!r.component) {
                deactivateRouteAndItsChildren(node, context, checks);
            }
            else if (context) {
                deactivateRouteAndItsChildren(node, context.children.getContext(childName), checks);
            }
            else {
                deactivateRouteAndItsChildren(node, null, checks);
            }
        });
        if (!r.component) {
            checks.canDeactivateChecks.push(new CanDeactivate(null, r));
        }
        else if (context && context.outlet && context.outlet.isActivated) {
            checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
        }
        else {
            checks.canDeactivateChecks.push(new CanDeactivate(null, r));
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Simple function check, but generic so type inference will flow. Example:
     *
     * function product(a: number, b: number) {
     *   return a * b;
     * }
     *
     * if (isFunction<product>(fn)) {
     *   return fn(1, 2);
     * } else {
     *   throw "Must provide the `product` function";
     * }
     */
    function isFunction(v) {
        return typeof v === 'function';
    }
    function isBoolean(v) {
        return typeof v === 'boolean';
    }
    function isCanLoad(guard) {
        return guard && isFunction(guard.canLoad);
    }
    function isCanActivate(guard) {
        return guard && isFunction(guard.canActivate);
    }
    function isCanActivateChild(guard) {
        return guard && isFunction(guard.canActivateChild);
    }
    function isCanDeactivate(guard) {
        return guard && isFunction(guard.canDeactivate);
    }
    function isCanMatch(guard) {
        return guard && isFunction(guard.canMatch);
    }
    function isEmptyError(e) {
        return e instanceof rxjs.EmptyError || (e === null || e === void 0 ? void 0 : e.name) === 'EmptyError';
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const INITIAL_VALUE = Symbol('INITIAL_VALUE');
    function prioritizedGuardValue() {
        return operators.switchMap(obs => {
            return rxjs.combineLatest(obs.map(o => o.pipe(operators.take(1), operators.startWith(INITIAL_VALUE))))
                .pipe(operators.map((results) => {
                for (const result of results) {
                    if (result === true) {
                        // If result is true, check the next one
                        continue;
                    }
                    else if (result === INITIAL_VALUE) {
                        // If guard has not finished, we need to stop processing.
                        return INITIAL_VALUE;
                    }
                    else if (result === false || result instanceof UrlTree) {
                        // Result finished and was not true. Return the result.
                        // Note that we only allow false/UrlTree. Other values are considered invalid and
                        // ignored.
                        return result;
                    }
                }
                // Everything resolved to true. Return true.
                return true;
            }), operators.filter((item) => item !== INITIAL_VALUE), operators.take(1));
        });
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function checkGuards(injector, forwardEvent) {
        return operators.mergeMap(t => {
            const { targetSnapshot, currentSnapshot, guards: { canActivateChecks, canDeactivateChecks } } = t;
            if (canDeactivateChecks.length === 0 && canActivateChecks.length === 0) {
                return rxjs.of(Object.assign(Object.assign({}, t), { guardsResult: true }));
            }
            return runCanDeactivateChecks(canDeactivateChecks, targetSnapshot, currentSnapshot, injector)
                .pipe(operators.mergeMap(canDeactivate => {
                return canDeactivate && isBoolean(canDeactivate) ?
                    runCanActivateChecks(targetSnapshot, canActivateChecks, injector, forwardEvent) :
                    rxjs.of(canDeactivate);
            }), operators.map(guardsResult => (Object.assign(Object.assign({}, t), { guardsResult }))));
        });
    }
    function runCanDeactivateChecks(checks, futureRSS, currRSS, injector) {
        return rxjs.from(checks).pipe(operators.mergeMap(check => runCanDeactivate(check.component, check.route, currRSS, futureRSS, injector)), operators.first(result => {
            return result !== true;
        }, true));
    }
    function runCanActivateChecks(futureSnapshot, checks, injector, forwardEvent) {
        return rxjs.from(checks).pipe(operators.concatMap((check) => {
            return rxjs.concat(fireChildActivationStart(check.route.parent, forwardEvent), fireActivationStart(check.route, forwardEvent), runCanActivateChild(futureSnapshot, check.path, injector), runCanActivate(futureSnapshot, check.route, injector));
        }), operators.first(result => {
            return result !== true;
        }, true));
    }
    /**
     * This should fire off `ActivationStart` events for each route being activated at this
     * level.
     * In other words, if you're activating `a` and `b` below, `path` will contain the
     * `ActivatedRouteSnapshot`s for both and we will fire `ActivationStart` for both. Always
     * return
     * `true` so checks continue to run.
     */
    function fireActivationStart(snapshot, forwardEvent) {
        if (snapshot !== null && forwardEvent) {
            forwardEvent(new ActivationStart(snapshot));
        }
        return rxjs.of(true);
    }
    /**
     * This should fire off `ChildActivationStart` events for each route being activated at this
     * level.
     * In other words, if you're activating `a` and `b` below, `path` will contain the
     * `ActivatedRouteSnapshot`s for both and we will fire `ChildActivationStart` for both. Always
     * return
     * `true` so checks continue to run.
     */
    function fireChildActivationStart(snapshot, forwardEvent) {
        if (snapshot !== null && forwardEvent) {
            forwardEvent(new ChildActivationStart(snapshot));
        }
        return rxjs.of(true);
    }
    function runCanActivate(futureRSS, futureARS, injector) {
        const canActivate = futureARS.routeConfig ? futureARS.routeConfig.canActivate : null;
        if (!canActivate || canActivate.length === 0)
            return rxjs.of(true);
        const canActivateObservables = canActivate.map((canActivate) => {
            return rxjs.defer(() => {
                var _a;
                const closestInjector = (_a = getClosestRouteInjector(futureARS)) !== null && _a !== void 0 ? _a : injector;
                const guard = getTokenOrFunctionIdentity(canActivate, closestInjector);
                const guardVal = isCanActivate(guard) ?
                    guard.canActivate(futureARS, futureRSS) :
                    closestInjector.runInContext(() => guard(futureARS, futureRSS));
                return wrapIntoObservable(guardVal).pipe(operators.first());
            });
        });
        return rxjs.of(canActivateObservables).pipe(prioritizedGuardValue());
    }
    function runCanActivateChild(futureRSS, path, injector) {
        const futureARS = path[path.length - 1];
        const canActivateChildGuards = path.slice(0, path.length - 1)
            .reverse()
            .map(p => getCanActivateChild(p))
            .filter(_ => _ !== null);
        const canActivateChildGuardsMapped = canActivateChildGuards.map((d) => {
            return rxjs.defer(() => {
                const guardsMapped = d.guards.map((canActivateChild) => {
                    var _a;
                    const closestInjector = (_a = getClosestRouteInjector(d.node)) !== null && _a !== void 0 ? _a : injector;
                    const guard = getTokenOrFunctionIdentity(canActivateChild, closestInjector);
                    const guardVal = isCanActivateChild(guard) ?
                        guard.canActivateChild(futureARS, futureRSS) :
                        closestInjector.runInContext(() => guard(futureARS, futureRSS));
                    return wrapIntoObservable(guardVal).pipe(operators.first());
                });
                return rxjs.of(guardsMapped).pipe(prioritizedGuardValue());
            });
        });
        return rxjs.of(canActivateChildGuardsMapped).pipe(prioritizedGuardValue());
    }
    function runCanDeactivate(component, currARS, currRSS, futureRSS, injector) {
        const canDeactivate = currARS && currARS.routeConfig ? currARS.routeConfig.canDeactivate : null;
        if (!canDeactivate || canDeactivate.length === 0)
            return rxjs.of(true);
        const canDeactivateObservables = canDeactivate.map((c) => {
            var _a;
            const closestInjector = (_a = getClosestRouteInjector(currARS)) !== null && _a !== void 0 ? _a : injector;
            const guard = getTokenOrFunctionIdentity(c, closestInjector);
            const guardVal = isCanDeactivate(guard) ?
                guard.canDeactivate(component, currARS, currRSS, futureRSS) :
                closestInjector.runInContext(() => guard(component, currARS, currRSS, futureRSS));
            return wrapIntoObservable(guardVal).pipe(operators.first());
        });
        return rxjs.of(canDeactivateObservables).pipe(prioritizedGuardValue());
    }
    function runCanLoadGuards(injector, route, segments, urlSerializer) {
        const canLoad = route.canLoad;
        if (canLoad === undefined || canLoad.length === 0) {
            return rxjs.of(true);
        }
        const canLoadObservables = canLoad.map((injectionToken) => {
            const guard = getTokenOrFunctionIdentity(injectionToken, injector);
            const guardVal = isCanLoad(guard) ?
                guard.canLoad(route, segments) :
                injector.runInContext(() => guard(route, segments));
            return wrapIntoObservable(guardVal);
        });
        return rxjs.of(canLoadObservables)
            .pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
    }
    function redirectIfUrlTree(urlSerializer) {
        return rxjs.pipe(operators.tap((result) => {
            if (!isUrlTree(result))
                return;
            throw redirectingNavigationError(urlSerializer, result);
        }), operators.map(result => result === true));
    }
    function runCanMatchGuards(injector, route, segments, urlSerializer) {
        const canMatch = route.canMatch;
        if (!canMatch || canMatch.length === 0)
            return rxjs.of(true);
        const canMatchObservables = canMatch.map(injectionToken => {
            const guard = getTokenOrFunctionIdentity(injectionToken, injector);
            const guardVal = isCanMatch(guard) ?
                guard.canMatch(route, segments) :
                injector.runInContext(() => guard(route, segments));
            return wrapIntoObservable(guardVal);
        });
        return rxjs.of(canMatchObservables)
            .pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const noMatch$1 = {
        matched: false,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {}
    };
    function matchWithChecks(segmentGroup, route, segments, injector, urlSerializer) {
        const result = match(segmentGroup, route, segments);
        if (!result.matched) {
            return rxjs.of(result);
        }
        // Only create the Route's `EnvironmentInjector` if it matches the attempted
        // navigation
        injector = getOrCreateRouteInjectorIfNeeded(route, injector);
        return runCanMatchGuards(injector, route, segments, urlSerializer)
            .pipe(operators.map((v) => v === true ? result : Object.assign({}, noMatch$1)));
    }
    function match(segmentGroup, route, segments) {
        var _a;
        if (route.path === '') {
            if (route.pathMatch === 'full' && (segmentGroup.hasChildren() || segments.length > 0)) {
                return Object.assign({}, noMatch$1);
            }
            return {
                matched: true,
                consumedSegments: [],
                remainingSegments: segments,
                parameters: {},
                positionalParamSegments: {}
            };
        }
        const matcher = route.matcher || defaultUrlMatcher;
        const res = matcher(segments, segmentGroup, route);
        if (!res)
            return Object.assign({}, noMatch$1);
        const posParams = {};
        forEach(res.posParams, (v, k) => {
            posParams[k] = v.path;
        });
        const parameters = res.consumed.length > 0 ? Object.assign(Object.assign({}, posParams), res.consumed[res.consumed.length - 1].parameters) :
            posParams;
        return {
            matched: true,
            consumedSegments: res.consumed,
            remainingSegments: segments.slice(res.consumed.length),
            // TODO(atscott): investigate combining parameters and positionalParamSegments
            parameters,
            positionalParamSegments: (_a = res.posParams) !== null && _a !== void 0 ? _a : {}
        };
    }
    function split(segmentGroup, consumedSegments, slicedSegments, config) {
        if (slicedSegments.length > 0 &&
            containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
            const s = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(segmentGroup, consumedSegments, config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
            s._sourceSegment = segmentGroup;
            s._segmentIndexShift = consumedSegments.length;
            return { segmentGroup: s, slicedSegments: [] };
        }
        if (slicedSegments.length === 0 &&
            containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
            const s = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, consumedSegments, slicedSegments, config, segmentGroup.children));
            s._sourceSegment = segmentGroup;
            s._segmentIndexShift = consumedSegments.length;
            return { segmentGroup: s, slicedSegments };
        }
        const s = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s, slicedSegments };
    }
    function addEmptyPathsToChildrenIfNeeded(segmentGroup, consumedSegments, slicedSegments, routes, children) {
        const res = {};
        for (const r of routes) {
            if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
                const s = new UrlSegmentGroup([], {});
                s._sourceSegment = segmentGroup;
                s._segmentIndexShift = consumedSegments.length;
                res[getOutlet(r)] = s;
            }
        }
        return Object.assign(Object.assign({}, children), res);
    }
    function createChildrenForEmptyPaths(segmentGroup, consumedSegments, routes, primarySegment) {
        const res = {};
        res[PRIMARY_OUTLET] = primarySegment;
        primarySegment._sourceSegment = segmentGroup;
        primarySegment._segmentIndexShift = consumedSegments.length;
        for (const r of routes) {
            if (r.path === '' && getOutlet(r) !== PRIMARY_OUTLET) {
                const s = new UrlSegmentGroup([], {});
                s._sourceSegment = segmentGroup;
                s._segmentIndexShift = consumedSegments.length;
                res[getOutlet(r)] = s;
            }
        }
        return res;
    }
    function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
        return routes.some(r => emptyPathMatch(segmentGroup, slicedSegments, r) && getOutlet(r) !== PRIMARY_OUTLET);
    }
    function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
        return routes.some(r => emptyPathMatch(segmentGroup, slicedSegments, r));
    }
    function emptyPathMatch(segmentGroup, slicedSegments, r) {
        if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full') {
            return false;
        }
        return r.path === '';
    }
    /**
     * Determines if `route` is a path match for the `rawSegment`, `segments`, and `outlet` without
     * verifying that its children are a full match for the remainder of the `rawSegment` children as
     * well.
     */
    function isImmediateMatch(route, rawSegment, segments, outlet) {
        // We allow matches to empty paths when the outlets differ so we can match a url like `/(b:b)` to
        // a config like
        // * `{path: '', children: [{path: 'b', outlet: 'b'}]}`
        // or even
        // * `{path: '', outlet: 'a', children: [{path: 'b', outlet: 'b'}]`
        //
        // The exception here is when the segment outlet is for the primary outlet. This would
        // result in a match inside the named outlet because all children there are written as primary
        // outlets. So we need to prevent child named outlet matches in a url like `/b` in a config like
        // * `{path: '', outlet: 'x' children: [{path: 'b'}]}`
        // This should only match if the url is `/(x:b)`.
        if (getOutlet(route) !== outlet &&
            (outlet === PRIMARY_OUTLET || !emptyPathMatch(rawSegment, segments, route))) {
            return false;
        }
        if (route.path === '**') {
            return true;
        }
        return match(rawSegment, route, segments).matched;
    }
    function noLeftoversInUrl(segmentGroup, segments, outlet) {
        return segments.length === 0 && !segmentGroup.children[outlet];
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$7 = typeof ngDevMode === 'undefined' || ngDevMode;
    class NoMatch$1 {
        constructor(segmentGroup) {
            this.segmentGroup = segmentGroup || null;
        }
    }
    class AbsoluteRedirect {
        constructor(urlTree) {
            this.urlTree = urlTree;
        }
    }
    function noMatch(segmentGroup) {
        return rxjs.throwError(new NoMatch$1(segmentGroup));
    }
    function absoluteRedirect(newTree) {
        return rxjs.throwError(new AbsoluteRedirect(newTree));
    }
    function namedOutletsRedirect(redirectTo) {
        return rxjs.throwError(new i0["ɵRuntimeError"](4000 /* RuntimeErrorCode.NAMED_OUTLET_REDIRECT */, NG_DEV_MODE$7 &&
            `Only absolute redirects can have named outlets. redirectTo: '${redirectTo}'`));
    }
    function canLoadFails(route) {
        return rxjs.throwError(navigationCancelingError(NG_DEV_MODE$7 &&
            `Cannot load children because the guard of the route "path: '${route.path}'" returned false`, 3 /* NavigationCancellationCode.GuardRejected */));
    }
    /**
     * Returns the `UrlTree` with the redirection applied.
     *
     * Lazy modules are loaded along the way.
     */
    function applyRedirects$1(injector, configLoader, urlSerializer, urlTree, config) {
        return new ApplyRedirects(injector, configLoader, urlSerializer, urlTree, config).apply();
    }
    class ApplyRedirects {
        constructor(injector, configLoader, urlSerializer, urlTree, config) {
            this.injector = injector;
            this.configLoader = configLoader;
            this.urlSerializer = urlSerializer;
            this.urlTree = urlTree;
            this.config = config;
            this.allowRedirects = true;
        }
        apply() {
            const splitGroup = split(this.urlTree.root, [], [], this.config).segmentGroup;
            // TODO(atscott): creating a new segment removes the _sourceSegment _segmentIndexShift, which is
            // only necessary to prevent failures in tests which assert exact object matches. The `split` is
            // now shared between `applyRedirects` and `recognize` but only the `recognize` step needs these
            // properties. Before the implementations were merged, the `applyRedirects` would not assign
            // them. We should be able to remove this logic as a "breaking change" but should do some more
            // investigation into the failures first.
            const rootSegmentGroup = new UrlSegmentGroup(splitGroup.segments, splitGroup.children);
            const expanded$ = this.expandSegmentGroup(this.injector, this.config, rootSegmentGroup, PRIMARY_OUTLET);
            const urlTrees$ = expanded$.pipe(operators.map((rootSegmentGroup) => {
                return this.createUrlTree(squashSegmentGroup(rootSegmentGroup), this.urlTree.queryParams, this.urlTree.fragment);
            }));
            return urlTrees$.pipe(operators.catchError((e) => {
                if (e instanceof AbsoluteRedirect) {
                    // After an absolute redirect we do not apply any more redirects!
                    // If this implementation changes, update the documentation note in `redirectTo`.
                    this.allowRedirects = false;
                    // we need to run matching, so we can fetch all lazy-loaded modules
                    return this.match(e.urlTree);
                }
                if (e instanceof NoMatch$1) {
                    throw this.noMatchError(e);
                }
                throw e;
            }));
        }
        match(tree) {
            const expanded$ = this.expandSegmentGroup(this.injector, this.config, tree.root, PRIMARY_OUTLET);
            const mapped$ = expanded$.pipe(operators.map((rootSegmentGroup) => {
                return this.createUrlTree(squashSegmentGroup(rootSegmentGroup), tree.queryParams, tree.fragment);
            }));
            return mapped$.pipe(operators.catchError((e) => {
                if (e instanceof NoMatch$1) {
                    throw this.noMatchError(e);
                }
                throw e;
            }));
        }
        noMatchError(e) {
            return new i0["ɵRuntimeError"](4002 /* RuntimeErrorCode.NO_MATCH */, NG_DEV_MODE$7 && `Cannot match any routes. URL Segment: '${e.segmentGroup}'`);
        }
        createUrlTree(rootCandidate, queryParams, fragment) {
            const root = createRoot(rootCandidate);
            return new UrlTree(root, queryParams, fragment);
        }
        expandSegmentGroup(injector, routes, segmentGroup, outlet) {
            if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
                return this.expandChildren(injector, routes, segmentGroup)
                    .pipe(operators.map((children) => new UrlSegmentGroup([], children)));
            }
            return this.expandSegment(injector, segmentGroup, routes, segmentGroup.segments, outlet, true);
        }
        // Recursively expand segment groups for all the child outlets
        expandChildren(injector, routes, segmentGroup) {
            // Expand outlets one at a time, starting with the primary outlet. We need to do it this way
            // because an absolute redirect from the primary outlet takes precedence.
            const childOutlets = [];
            for (const child of Object.keys(segmentGroup.children)) {
                if (child === 'primary') {
                    childOutlets.unshift(child);
                }
                else {
                    childOutlets.push(child);
                }
            }
            return rxjs.from(childOutlets)
                .pipe(operators.concatMap(childOutlet => {
                const child = segmentGroup.children[childOutlet];
                // Sort the routes so routes with outlets that match the segment appear
                // first, followed by routes for other outlets, which might match if they have an
                // empty path.
                const sortedRoutes = sortByMatchingOutlets(routes, childOutlet);
                return this.expandSegmentGroup(injector, sortedRoutes, child, childOutlet)
                    .pipe(operators.map(s => ({ segment: s, outlet: childOutlet })));
            }), operators.scan((children, expandedChild) => {
                children[expandedChild.outlet] = expandedChild.segment;
                return children;
            }, {}), operators.last());
        }
        expandSegment(injector, segmentGroup, routes, segments, outlet, allowRedirects) {
            return rxjs.from(routes).pipe(operators.concatMap(r => {
                const expanded$ = this.expandSegmentAgainstRoute(injector, segmentGroup, routes, r, segments, outlet, allowRedirects);
                return expanded$.pipe(operators.catchError((e) => {
                    if (e instanceof NoMatch$1) {
                        return rxjs.of(null);
                    }
                    throw e;
                }));
            }), operators.first((s) => !!s), operators.catchError((e, _) => {
                if (isEmptyError(e)) {
                    if (noLeftoversInUrl(segmentGroup, segments, outlet)) {
                        return rxjs.of(new UrlSegmentGroup([], {}));
                    }
                    return noMatch(segmentGroup);
                }
                throw e;
            }));
        }
        expandSegmentAgainstRoute(injector, segmentGroup, routes, route, paths, outlet, allowRedirects) {
            if (!isImmediateMatch(route, segmentGroup, paths, outlet)) {
                return noMatch(segmentGroup);
            }
            if (route.redirectTo === undefined) {
                return this.matchSegmentAgainstRoute(injector, segmentGroup, route, paths, outlet);
            }
            if (allowRedirects && this.allowRedirects) {
                return this.expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, paths, outlet);
            }
            return noMatch(segmentGroup);
        }
        expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet) {
            if (route.path === '**') {
                return this.expandWildCardWithParamsAgainstRouteUsingRedirect(injector, routes, route, outlet);
            }
            return this.expandRegularSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet);
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(injector, routes, route, outlet) {
            const newTree = this.applyRedirectCommands([], route.redirectTo, {});
            if (route.redirectTo.startsWith('/')) {
                return absoluteRedirect(newTree);
            }
            return this.lineralizeSegments(route, newTree).pipe(operators.mergeMap((newSegments) => {
                const group = new UrlSegmentGroup(newSegments, {});
                return this.expandSegment(injector, group, routes, newSegments, outlet, false);
            }));
        }
        expandRegularSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet) {
            const { matched, consumedSegments, remainingSegments, positionalParamSegments } = match(segmentGroup, route, segments);
            if (!matched)
                return noMatch(segmentGroup);
            const newTree = this.applyRedirectCommands(consumedSegments, route.redirectTo, positionalParamSegments);
            if (route.redirectTo.startsWith('/')) {
                return absoluteRedirect(newTree);
            }
            return this.lineralizeSegments(route, newTree).pipe(operators.mergeMap((newSegments) => {
                return this.expandSegment(injector, segmentGroup, routes, newSegments.concat(remainingSegments), outlet, false);
            }));
        }
        matchSegmentAgainstRoute(injector, rawSegmentGroup, route, segments, outlet) {
            if (route.path === '**') {
                // Only create the Route's `EnvironmentInjector` if it matches the attempted navigation
                injector = getOrCreateRouteInjectorIfNeeded(route, injector);
                if (route.loadChildren) {
                    const loaded$ = route._loadedRoutes ?
                        rxjs.of({ routes: route._loadedRoutes, injector: route._loadedInjector }) :
                        this.configLoader.loadChildren(injector, route);
                    return loaded$.pipe(operators.map((cfg) => {
                        route._loadedRoutes = cfg.routes;
                        route._loadedInjector = cfg.injector;
                        return new UrlSegmentGroup(segments, {});
                    }));
                }
                return rxjs.of(new UrlSegmentGroup(segments, {}));
            }
            return matchWithChecks(rawSegmentGroup, route, segments, injector, this.urlSerializer)
                .pipe(operators.switchMap(({ matched, consumedSegments, remainingSegments }) => {
                var _a;
                if (!matched)
                    return noMatch(rawSegmentGroup);
                // If the route has an injector created from providers, we should start using that.
                injector = (_a = route._injector) !== null && _a !== void 0 ? _a : injector;
                const childConfig$ = this.getChildConfig(injector, route, segments);
                return childConfig$.pipe(operators.mergeMap((routerConfig) => {
                    var _a;
                    const childInjector = (_a = routerConfig.injector) !== null && _a !== void 0 ? _a : injector;
                    const childConfig = routerConfig.routes;
                    const { segmentGroup: splitSegmentGroup, slicedSegments } = split(rawSegmentGroup, consumedSegments, remainingSegments, childConfig);
                    // See comment on the other call to `split` about why this is necessary.
                    const segmentGroup = new UrlSegmentGroup(splitSegmentGroup.segments, splitSegmentGroup.children);
                    if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
                        const expanded$ = this.expandChildren(childInjector, childConfig, segmentGroup);
                        return expanded$.pipe(operators.map((children) => new UrlSegmentGroup(consumedSegments, children)));
                    }
                    if (childConfig.length === 0 && slicedSegments.length === 0) {
                        return rxjs.of(new UrlSegmentGroup(consumedSegments, {}));
                    }
                    const matchedOnOutlet = getOutlet(route) === outlet;
                    const expanded$ = this.expandSegment(childInjector, segmentGroup, childConfig, slicedSegments, matchedOnOutlet ? PRIMARY_OUTLET : outlet, true);
                    return expanded$.pipe(operators.map((cs) => new UrlSegmentGroup(consumedSegments.concat(cs.segments), cs.children)));
                }));
            }));
        }
        getChildConfig(injector, route, segments) {
            if (route.children) {
                // The children belong to the same module
                return rxjs.of({ routes: route.children, injector });
            }
            if (route.loadChildren) {
                // lazy children belong to the loaded module
                if (route._loadedRoutes !== undefined) {
                    return rxjs.of({ routes: route._loadedRoutes, injector: route._loadedInjector });
                }
                return runCanLoadGuards(injector, route, segments, this.urlSerializer)
                    .pipe(operators.mergeMap((shouldLoadResult) => {
                    if (shouldLoadResult) {
                        return this.configLoader.loadChildren(injector, route)
                            .pipe(operators.tap((cfg) => {
                            route._loadedRoutes = cfg.routes;
                            route._loadedInjector = cfg.injector;
                        }));
                    }
                    return canLoadFails(route);
                }));
            }
            return rxjs.of({ routes: [], injector });
        }
        lineralizeSegments(route, urlTree) {
            let res = [];
            let c = urlTree.root;
            while (true) {
                res = res.concat(c.segments);
                if (c.numberOfChildren === 0) {
                    return rxjs.of(res);
                }
                if (c.numberOfChildren > 1 || !c.children[PRIMARY_OUTLET]) {
                    return namedOutletsRedirect(route.redirectTo);
                }
                c = c.children[PRIMARY_OUTLET];
            }
        }
        applyRedirectCommands(segments, redirectTo, posParams) {
            return this.applyRedirectCreateUrlTree(redirectTo, this.urlSerializer.parse(redirectTo), segments, posParams);
        }
        applyRedirectCreateUrlTree(redirectTo, urlTree, segments, posParams) {
            const newRoot = this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams);
            return new UrlTree(newRoot, this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
        }
        createQueryParams(redirectToParams, actualParams) {
            const res = {};
            forEach(redirectToParams, (v, k) => {
                const copySourceValue = typeof v === 'string' && v.startsWith(':');
                if (copySourceValue) {
                    const sourceName = v.substring(1);
                    res[k] = actualParams[sourceName];
                }
                else {
                    res[k] = v;
                }
            });
            return res;
        }
        createSegmentGroup(redirectTo, group, segments, posParams) {
            const updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
            let children = {};
            forEach(group.children, (child, name) => {
                children[name] = this.createSegmentGroup(redirectTo, child, segments, posParams);
            });
            return new UrlSegmentGroup(updatedSegments, children);
        }
        createSegments(redirectTo, redirectToSegments, actualSegments, posParams) {
            return redirectToSegments.map(s => s.path.startsWith(':') ? this.findPosParam(redirectTo, s, posParams) :
                this.findOrReturn(s, actualSegments));
        }
        findPosParam(redirectTo, redirectToUrlSegment, posParams) {
            const pos = posParams[redirectToUrlSegment.path.substring(1)];
            if (!pos)
                throw new i0["ɵRuntimeError"](4001 /* RuntimeErrorCode.MISSING_REDIRECT */, NG_DEV_MODE$7 &&
                    `Cannot redirect to '${redirectTo}'. Cannot find '${redirectToUrlSegment.path}'.`);
            return pos;
        }
        findOrReturn(redirectToUrlSegment, actualSegments) {
            let idx = 0;
            for (const s of actualSegments) {
                if (s.path === redirectToUrlSegment.path) {
                    actualSegments.splice(idx);
                    return s;
                }
                idx++;
            }
            return redirectToUrlSegment;
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function applyRedirects(environmentInjector, configLoader, urlSerializer, config) {
        return operators.switchMap(t => applyRedirects$1(environmentInjector, configLoader, urlSerializer, t.extractedUrl, config)
            .pipe(operators.map(urlAfterRedirects => (Object.assign(Object.assign({}, t), { urlAfterRedirects })))));
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$6 = typeof ngDevMode === 'undefined' || !!ngDevMode;
    class NoMatch {
    }
    function newObservableError(e) {
        // TODO(atscott): This pattern is used throughout the router code and can be `throwError` instead.
        return new rxjs.Observable((obs) => obs.error(e));
    }
    function recognize$1(injector, rootComponentType, config, urlTree, url, urlSerializer, paramsInheritanceStrategy = 'emptyOnly') {
        return new Recognizer(injector, rootComponentType, config, urlTree, url, paramsInheritanceStrategy, urlSerializer)
            .recognize()
            .pipe(operators.switchMap(result => {
            if (result === null) {
                return newObservableError(new NoMatch());
            }
            else {
                return rxjs.of(result);
            }
        }));
    }
    class Recognizer {
        constructor(injector, rootComponentType, config, urlTree, url, paramsInheritanceStrategy, urlSerializer) {
            this.injector = injector;
            this.rootComponentType = rootComponentType;
            this.config = config;
            this.urlTree = urlTree;
            this.url = url;
            this.paramsInheritanceStrategy = paramsInheritanceStrategy;
            this.urlSerializer = urlSerializer;
        }
        recognize() {
            const rootSegmentGroup = split(this.urlTree.root, [], [], this.config.filter(c => c.redirectTo === undefined))
                .segmentGroup;
            return this.processSegmentGroup(this.injector, this.config, rootSegmentGroup, PRIMARY_OUTLET)
                .pipe(operators.map(children => {
                if (children === null) {
                    return null;
                }
                // Use Object.freeze to prevent readers of the Router state from modifying it outside of a
                // navigation, resulting in the router being out of sync with the browser.
                const root = new ActivatedRouteSnapshot([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, PRIMARY_OUTLET, this.rootComponentType, null, this.urlTree.root, -1, {});
                const rootNode = new TreeNode(root, children);
                const routeState = new RouterStateSnapshot(this.url, rootNode);
                this.inheritParamsAndData(routeState._root);
                return routeState;
            }));
        }
        inheritParamsAndData(routeNode) {
            const route = routeNode.value;
            const i = inheritedParamsDataResolve(route, this.paramsInheritanceStrategy);
            route.params = Object.freeze(i.params);
            route.data = Object.freeze(i.data);
            routeNode.children.forEach(n => this.inheritParamsAndData(n));
        }
        processSegmentGroup(injector, config, segmentGroup, outlet) {
            if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
                return this.processChildren(injector, config, segmentGroup);
            }
            return this.processSegment(injector, config, segmentGroup, segmentGroup.segments, outlet);
        }
        /**
         * Matches every child outlet in the `segmentGroup` to a `Route` in the config. Returns `null` if
         * we cannot find a match for _any_ of the children.
         *
         * @param config - The `Routes` to match against
         * @param segmentGroup - The `UrlSegmentGroup` whose children need to be matched against the
         *     config.
         */
        processChildren(injector, config, segmentGroup) {
            return rxjs.from(Object.keys(segmentGroup.children))
                .pipe(operators.concatMap(childOutlet => {
                const child = segmentGroup.children[childOutlet];
                // Sort the config so that routes with outlets that match the one being activated
                // appear first, followed by routes for other outlets, which might match if they have
                // an empty path.
                const sortedConfig = sortByMatchingOutlets(config, childOutlet);
                return this.processSegmentGroup(injector, sortedConfig, child, childOutlet);
            }), operators.scan((children, outletChildren) => {
                if (!children || !outletChildren)
                    return null;
                children.push(...outletChildren);
                return children;
            }), operators.takeWhile(children => children !== null), operators.defaultIfEmpty(null), operators.last(), operators.map(children => {
                if (children === null)
                    return null;
                // Because we may have matched two outlets to the same empty path segment, we can have
                // multiple activated results for the same outlet. We should merge the children of
                // these results so the final return value is only one `TreeNode` per outlet.
                const mergedChildren = mergeEmptyPathMatches(children);
                if (NG_DEV_MODE$6) {
                    // This should really never happen - we are only taking the first match for each
                    // outlet and merge the empty path matches.
                    checkOutletNameUniqueness(mergedChildren);
                }
                sortActivatedRouteSnapshots(mergedChildren);
                return mergedChildren;
            }));
        }
        processSegment(injector, routes, segmentGroup, segments, outlet) {
            return rxjs.from(routes).pipe(operators.concatMap(r => {
                var _a;
                return this.processSegmentAgainstRoute((_a = r._injector) !== null && _a !== void 0 ? _a : injector, r, segmentGroup, segments, outlet);
            }), operators.first((x) => !!x), operators.catchError(e => {
                if (isEmptyError(e)) {
                    if (noLeftoversInUrl(segmentGroup, segments, outlet)) {
                        return rxjs.of([]);
                    }
                    return rxjs.of(null);
                }
                throw e;
            }));
        }
        processSegmentAgainstRoute(injector, route, rawSegment, segments, outlet) {
            var _a, _b;
            if (route.redirectTo || !isImmediateMatch(route, rawSegment, segments, outlet))
                return rxjs.of(null);
            let matchResult;
            if (route.path === '**') {
                const params = segments.length > 0 ? last(segments).parameters : {};
                const pathIndexShift = getPathIndexShift(rawSegment) + segments.length;
                const snapshot = new ActivatedRouteSnapshot(segments, params, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), getOutlet(route), (_b = (_a = route.component) !== null && _a !== void 0 ? _a : route._loadedComponent) !== null && _b !== void 0 ? _b : null, route, getSourceSegmentGroup(rawSegment), pathIndexShift, getResolve(route));
                matchResult = rxjs.of({
                    snapshot,
                    consumedSegments: [],
                    remainingSegments: [],
                });
            }
            else {
                matchResult =
                    matchWithChecks(rawSegment, route, segments, injector, this.urlSerializer)
                        .pipe(operators.map(({ matched, consumedSegments, remainingSegments, parameters }) => {
                        var _a, _b;
                        if (!matched) {
                            return null;
                        }
                        const pathIndexShift = getPathIndexShift(rawSegment) + consumedSegments.length;
                        const snapshot = new ActivatedRouteSnapshot(consumedSegments, parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), getOutlet(route), (_b = (_a = route.component) !== null && _a !== void 0 ? _a : route._loadedComponent) !== null && _b !== void 0 ? _b : null, route, getSourceSegmentGroup(rawSegment), pathIndexShift, getResolve(route));
                        return { snapshot, consumedSegments, remainingSegments };
                    }));
            }
            return matchResult.pipe(operators.switchMap((result) => {
                var _a, _b;
                if (result === null) {
                    return rxjs.of(null);
                }
                const { snapshot, consumedSegments, remainingSegments } = result;
                // If the route has an injector created from providers, we should start using that.
                injector = (_a = route._injector) !== null && _a !== void 0 ? _a : injector;
                const childInjector = (_b = route._loadedInjector) !== null && _b !== void 0 ? _b : injector;
                const childConfig = getChildConfig(route);
                const { segmentGroup, slicedSegments } = split(rawSegment, consumedSegments, remainingSegments, 
                // Filter out routes with redirectTo because we are trying to create activated route
                // snapshots and don't handle redirects here. That should have been done in
                // `applyRedirects`.
                childConfig.filter(c => c.redirectTo === undefined));
                if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
                    return this.processChildren(childInjector, childConfig, segmentGroup).pipe(operators.map(children => {
                        if (children === null) {
                            return null;
                        }
                        return [new TreeNode(snapshot, children)];
                    }));
                }
                if (childConfig.length === 0 && slicedSegments.length === 0) {
                    return rxjs.of([new TreeNode(snapshot, [])]);
                }
                const matchedOnOutlet = getOutlet(route) === outlet;
                // If we matched a config due to empty path match on a different outlet, we need to
                // continue passing the current outlet for the segment rather than switch to PRIMARY.
                // Note that we switch to primary when we have a match because outlet configs look like
                // this: {path: 'a', outlet: 'a', children: [
                //  {path: 'b', component: B},
                //  {path: 'c', component: C},
                // ]}
                // Notice that the children of the named outlet are configured with the primary outlet
                return this
                    .processSegment(childInjector, childConfig, segmentGroup, slicedSegments, matchedOnOutlet ? PRIMARY_OUTLET : outlet)
                    .pipe(operators.map(children => {
                    if (children === null) {
                        return null;
                    }
                    return [new TreeNode(snapshot, children)];
                }));
            }));
        }
    }
    function sortActivatedRouteSnapshots(nodes) {
        nodes.sort((a, b) => {
            if (a.value.outlet === PRIMARY_OUTLET)
                return -1;
            if (b.value.outlet === PRIMARY_OUTLET)
                return 1;
            return a.value.outlet.localeCompare(b.value.outlet);
        });
    }
    function getChildConfig(route) {
        if (route.children) {
            return route.children;
        }
        if (route.loadChildren) {
            return route._loadedRoutes;
        }
        return [];
    }
    function hasEmptyPathConfig(node) {
        const config = node.value.routeConfig;
        return config && config.path === '' && config.redirectTo === undefined;
    }
    /**
     * Finds `TreeNode`s with matching empty path route configs and merges them into `TreeNode` with
     * the children from each duplicate. This is necessary because different outlets can match a
     * single empty path route config and the results need to then be merged.
     */
    function mergeEmptyPathMatches(nodes) {
        const result = [];
        // The set of nodes which contain children that were merged from two duplicate empty path nodes.
        const mergedNodes = new Set();
        for (const node of nodes) {
            if (!hasEmptyPathConfig(node)) {
                result.push(node);
                continue;
            }
            const duplicateEmptyPathNode = result.find(resultNode => node.value.routeConfig === resultNode.value.routeConfig);
            if (duplicateEmptyPathNode !== undefined) {
                duplicateEmptyPathNode.children.push(...node.children);
                mergedNodes.add(duplicateEmptyPathNode);
            }
            else {
                result.push(node);
            }
        }
        // For each node which has children from multiple sources, we need to recompute a new `TreeNode`
        // by also merging those children. This is necessary when there are multiple empty path configs
        // in a row. Put another way: whenever we combine children of two nodes, we need to also check
        // if any of those children can be combined into a single node as well.
        for (const mergedNode of mergedNodes) {
            const mergedChildren = mergeEmptyPathMatches(mergedNode.children);
            result.push(new TreeNode(mergedNode.value, mergedChildren));
        }
        return result.filter(n => !mergedNodes.has(n));
    }
    function checkOutletNameUniqueness(nodes) {
        const names = {};
        nodes.forEach(n => {
            const routeWithSameOutletName = names[n.value.outlet];
            if (routeWithSameOutletName) {
                const p = routeWithSameOutletName.url.map(s => s.toString()).join('/');
                const c = n.value.url.map(s => s.toString()).join('/');
                throw new i0["ɵRuntimeError"](4006 /* RuntimeErrorCode.TWO_SEGMENTS_WITH_SAME_OUTLET */, NG_DEV_MODE$6 && `Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
            }
            names[n.value.outlet] = n.value;
        });
    }
    function getSourceSegmentGroup(segmentGroup) {
        let s = segmentGroup;
        while (s._sourceSegment) {
            s = s._sourceSegment;
        }
        return s;
    }
    function getPathIndexShift(segmentGroup) {
        var _a, _b;
        let s = segmentGroup;
        let res = (_a = s._segmentIndexShift) !== null && _a !== void 0 ? _a : 0;
        while (s._sourceSegment) {
            s = s._sourceSegment;
            res += (_b = s._segmentIndexShift) !== null && _b !== void 0 ? _b : 0;
        }
        return res - 1;
    }
    function getData(route) {
        return route.data || {};
    }
    function getResolve(route) {
        return route.resolve || {};
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function recognize(injector, rootComponentType, config, serializer, paramsInheritanceStrategy) {
        return operators.mergeMap(t => recognize$1(injector, rootComponentType, config, t.urlAfterRedirects, serializer.serialize(t.urlAfterRedirects), serializer, paramsInheritanceStrategy)
            .pipe(operators.map(targetSnapshot => (Object.assign(Object.assign({}, t), { targetSnapshot })))));
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function resolveData(paramsInheritanceStrategy, injector) {
        return operators.mergeMap(t => {
            const { targetSnapshot, guards: { canActivateChecks } } = t;
            if (!canActivateChecks.length) {
                return rxjs.of(t);
            }
            let canActivateChecksResolved = 0;
            return rxjs.from(canActivateChecks)
                .pipe(operators.concatMap(check => runResolve(check.route, targetSnapshot, paramsInheritanceStrategy, injector)), operators.tap(() => canActivateChecksResolved++), operators.takeLast(1), operators.mergeMap(_ => canActivateChecksResolved === canActivateChecks.length ? rxjs.of(t) : rxjs.EMPTY));
        });
    }
    function runResolve(futureARS, futureRSS, paramsInheritanceStrategy, injector) {
        const config = futureARS.routeConfig;
        const resolve = futureARS._resolve;
        if ((config === null || config === void 0 ? void 0 : config.title) !== undefined && !hasStaticTitle(config)) {
            resolve[RouteTitleKey] = config.title;
        }
        return resolveNode(resolve, futureARS, futureRSS, injector).pipe(operators.map((resolvedData) => {
            futureARS._resolvedData = resolvedData;
            futureARS.data = inheritedParamsDataResolve(futureARS, paramsInheritanceStrategy).resolve;
            if (config && hasStaticTitle(config)) {
                futureARS.data[RouteTitleKey] = config.title;
            }
            return null;
        }));
    }
    function resolveNode(resolve, futureARS, futureRSS, injector) {
        const keys = getDataKeys(resolve);
        if (keys.length === 0) {
            return rxjs.of({});
        }
        const data = {};
        return rxjs.from(keys).pipe(operators.mergeMap(key => getResolver(resolve[key], futureARS, futureRSS, injector)
            .pipe(operators.first(), operators.tap((value) => {
            data[key] = value;
        }))), operators.takeLast(1), operators.mapTo(data), operators.catchError((e) => isEmptyError(e) ? rxjs.EMPTY : rxjs.throwError(e)));
    }
    function getDataKeys(obj) {
        return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
    }
    function getResolver(injectionToken, futureARS, futureRSS, injector) {
        var _a;
        const closestInjector = (_a = getClosestRouteInjector(futureARS)) !== null && _a !== void 0 ? _a : injector;
        const resolver = getTokenOrFunctionIdentity(injectionToken, closestInjector);
        const resolverValue = resolver.resolve ?
            resolver.resolve(futureARS, futureRSS) :
            closestInjector.runInContext(() => resolver(futureARS, futureRSS));
        return wrapIntoObservable(resolverValue);
    }
    function hasStaticTitle(config) {
        return typeof config.title === 'string' || config.title === null;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Perform a side effect through a switchMap for every emission on the source Observable,
     * but return an Observable that is identical to the source. It's essentially the same as
     * the `tap` operator, but if the side effectful `next` function returns an ObservableInput,
     * it will wait before continuing with the original value.
     */
    function switchTap(next) {
        return operators.switchMap(v => {
            const nextResult = next(v);
            if (nextResult) {
                return rxjs.from(nextResult).pipe(operators.map(() => v));
            }
            return rxjs.of(v);
        });
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$5 = typeof ngDevMode === 'undefined' || !!ngDevMode;
    class NavigationTransitions {
        constructor(router) {
            this.router = router;
            this.currentNavigation = null;
        }
        setupNavigations(transitions) {
            const eventsSubject = this.router.events;
            return transitions.pipe(operators.filter(t => t.id !== 0), 
            // Extract URL
            operators.map(t => (Object.assign(Object.assign({}, t), { extractedUrl: this.router.urlHandlingStrategy.extract(t.rawUrl) }))), 
            // Using switchMap so we cancel executing navigations when a new one comes in
            operators.switchMap(overallTransitionState => {
                let completed = false;
                let errored = false;
                return rxjs.of(overallTransitionState)
                    .pipe(
                // Store the Navigation object
                operators.tap(t => {
                    this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.rawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: !this.router.lastSuccessfulNavigation ? null : Object.assign(Object.assign({}, this.router.lastSuccessfulNavigation), { previousNavigation: null }),
                    };
                }), operators.switchMap(t => {
                    const browserUrlTree = this.router.browserUrlTree.toString();
                    const urlTransition = !this.router.navigated ||
                        t.extractedUrl.toString() !== browserUrlTree ||
                        // Navigations which succeed or ones which fail and are cleaned up
                        // correctly should result in `browserUrlTree` and `currentUrlTree`
                        // matching. If this is not the case, assume something went wrong and
                        // try processing the URL again.
                        browserUrlTree !== this.router.currentUrlTree.toString();
                    const processCurrentUrl = (this.router.onSameUrlNavigation === 'reload' ? true :
                        urlTransition) &&
                        this.router.urlHandlingStrategy.shouldProcessUrl(t.rawUrl);
                    if (processCurrentUrl) {
                        // If the source of the navigation is from a browser event, the URL is
                        // already updated. We already need to sync the internal state.
                        if (isBrowserTriggeredNavigation(t.source)) {
                            this.router.browserUrlTree = t.extractedUrl;
                        }
                        return rxjs.of(t).pipe(
                        // Fire NavigationStart event
                        operators.switchMap(t => {
                            const transition = this.router.transitions.getValue();
                            eventsSubject.next(new NavigationStart(t.id, this.router.serializeUrl(t.extractedUrl), t.source, t.restoredState));
                            if (transition !== this.router.transitions.getValue()) {
                                return rxjs.EMPTY;
                            }
                            // This delay is required to match old behavior that forced
                            // navigation to always be async
                            return Promise.resolve(t);
                        }), 
                        // ApplyRedirects
                        applyRedirects(this.router.ngModule.injector, this.router.configLoader, this.router.urlSerializer, this.router.config), 
                        // Update the currentNavigation
                        // `urlAfterRedirects` is guaranteed to be set after this point
                        operators.tap(t => {
                            this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), { finalUrl: t.urlAfterRedirects });
                            overallTransitionState.urlAfterRedirects = t.urlAfterRedirects;
                        }), 
                        // Recognize
                        recognize(this.router.ngModule.injector, this.router.rootComponentType, this.router.config, this.router.urlSerializer, this.router.paramsInheritanceStrategy), 
                        // Update URL if in `eager` update mode
                        operators.tap(t => {
                            overallTransitionState.targetSnapshot = t.targetSnapshot;
                            if (this.router.urlUpdateStrategy === 'eager') {
                                if (!t.extras.skipLocationChange) {
                                    const rawUrl = this.router.urlHandlingStrategy.merge(t.urlAfterRedirects, t.rawUrl);
                                    this.router.setBrowserUrl(rawUrl, t);
                                }
                                this.router.browserUrlTree = t.urlAfterRedirects;
                            }
                            // Fire RoutesRecognized
                            const routesRecognized = new RoutesRecognized(t.id, this.router.serializeUrl(t.extractedUrl), this.router.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                            eventsSubject.next(routesRecognized);
                        }));
                    }
                    else {
                        const processPreviousUrl = urlTransition && this.router.rawUrlTree &&
                            this.router.urlHandlingStrategy.shouldProcessUrl(this.router.rawUrlTree);
                        /* When the current URL shouldn't be processed, but the previous one
                         * was, we handle this "error condition" by navigating to the
                         * previously successful URL, but leaving the URL intact.*/
                        if (processPreviousUrl) {
                            const { id, extractedUrl, source, restoredState, extras } = t;
                            const navStart = new NavigationStart(id, this.router.serializeUrl(extractedUrl), source, restoredState);
                            eventsSubject.next(navStart);
                            const targetSnapshot = createEmptyState(extractedUrl, this.router.rootComponentType)
                                .snapshot;
                            overallTransitionState = Object.assign(Object.assign({}, t), { targetSnapshot, urlAfterRedirects: extractedUrl, extras: Object.assign(Object.assign({}, extras), { skipLocationChange: false, replaceUrl: false }) });
                            return rxjs.of(overallTransitionState);
                        }
                        else {
                            /* When neither the current or previous URL can be processed, do
                             * nothing other than update router's internal reference to the
                             * current "settled" URL. This way the next navigation will be coming
                             * from the current URL in the browser.
                             */
                            this.router.rawUrlTree = t.rawUrl;
                            t.resolve(null);
                            return rxjs.EMPTY;
                        }
                    }
                }), 
                // --- GUARDS ---
                operators.tap(t => {
                    const guardsStart = new GuardsCheckStart(t.id, this.router.serializeUrl(t.extractedUrl), this.router.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                    this.router.triggerEvent(guardsStart);
                }), operators.map(t => {
                    overallTransitionState = Object.assign(Object.assign({}, t), { guards: getAllRouteGuards(t.targetSnapshot, t.currentSnapshot, this.router.rootContexts) });
                    return overallTransitionState;
                }), checkGuards(this.router.ngModule.injector, (evt) => this.router.triggerEvent(evt)), operators.tap(t => {
                    overallTransitionState.guardsResult = t.guardsResult;
                    if (isUrlTree(t.guardsResult)) {
                        throw redirectingNavigationError(this.router.urlSerializer, t.guardsResult);
                    }
                    const guardsEnd = new GuardsCheckEnd(t.id, this.router.serializeUrl(t.extractedUrl), this.router.serializeUrl(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
                    this.router.triggerEvent(guardsEnd);
                }), operators.filter(t => {
                    if (!t.guardsResult) {
                        this.router.restoreHistory(t);
                        this.router.cancelNavigationTransition(t, '', 3 /* NavigationCancellationCode.GuardRejected */);
                        return false;
                    }
                    return true;
                }), 
                // --- RESOLVE ---
                switchTap(t => {
                    if (t.guards.canActivateChecks.length) {
                        return rxjs.of(t).pipe(operators.tap(t => {
                            const resolveStart = new ResolveStart(t.id, this.router.serializeUrl(t.extractedUrl), this.router.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                            this.router.triggerEvent(resolveStart);
                        }), operators.switchMap(t => {
                            let dataResolved = false;
                            return rxjs.of(t).pipe(resolveData(this.router.paramsInheritanceStrategy, this.router.ngModule.injector), operators.tap({
                                next: () => dataResolved = true,
                                complete: () => {
                                    if (!dataResolved) {
                                        this.router.restoreHistory(t);
                                        this.router.cancelNavigationTransition(t, NG_DEV_MODE$5 ?
                                            `At least one route resolver didn't emit any value.` :
                                            '', 2 /* NavigationCancellationCode.NoDataFromResolver */);
                                    }
                                }
                            }));
                        }), operators.tap(t => {
                            const resolveEnd = new ResolveEnd(t.id, this.router.serializeUrl(t.extractedUrl), this.router.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                            this.router.triggerEvent(resolveEnd);
                        }));
                    }
                    return undefined;
                }), 
                // --- LOAD COMPONENTS ---
                switchTap((t) => {
                    const loadComponents = (route) => {
                        var _a;
                        const loaders = [];
                        if (((_a = route.routeConfig) === null || _a === void 0 ? void 0 : _a.loadComponent) &&
                            !route.routeConfig._loadedComponent) {
                            loaders.push(this.router.configLoader.loadComponent(route.routeConfig)
                                .pipe(operators.tap(loadedComponent => {
                                route.component = loadedComponent;
                            }), operators.map(() => void 0)));
                        }
                        for (const child of route.children) {
                            loaders.push(...loadComponents(child));
                        }
                        return loaders;
                    };
                    return rxjs.combineLatest(loadComponents(t.targetSnapshot.root))
                        .pipe(operators.defaultIfEmpty(), operators.take(1));
                }), switchTap(() => this.router.afterPreactivation()), operators.map((t) => {
                    const targetRouterState = createRouterState(this.router.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                    overallTransitionState = Object.assign(Object.assign({}, t), { targetRouterState });
                    return (overallTransitionState);
                }), 
                /* Once here, we are about to activate synchronously. The assumption is
                   this will succeed, and user code may read from the Router service.
                   Therefore before activation, we need to update router properties storing
                   the current URL and the RouterState, as well as updated the browser URL.
                   All this should happen *before* activating. */
                operators.tap((t) => {
                    this.router.currentUrlTree = t.urlAfterRedirects;
                    this.router.rawUrlTree = this.router.urlHandlingStrategy.merge(t.urlAfterRedirects, t.rawUrl);
                    this.router.routerState =
                        t.targetRouterState;
                    if (this.router.urlUpdateStrategy === 'deferred') {
                        if (!t.extras.skipLocationChange) {
                            this.router.setBrowserUrl(this.router.rawUrlTree, t);
                        }
                        this.router.browserUrlTree = t.urlAfterRedirects;
                    }
                }), activateRoutes(this.router.rootContexts, this.router.routeReuseStrategy, (evt) => this.router.triggerEvent(evt)), operators.tap({
                    next() {
                        completed = true;
                    },
                    complete() {
                        completed = true;
                    }
                }), operators.finalize(() => {
                    var _a;
                    /* When the navigation stream finishes either through error or success,
                     * we set the `completed` or `errored` flag. However, there are some
                     * situations where we could get here without either of those being set.
                     * For instance, a redirect during NavigationStart. Therefore, this is a
                     * catch-all to make sure the NavigationCancel event is fired when a
                     * navigation gets cancelled but not caught by other means. */
                    if (!completed && !errored) {
                        const cancelationReason = NG_DEV_MODE$5 ?
                            `Navigation ID ${overallTransitionState
                            .id} is not equal to the current navigation id ${this.router.navigationId}` :
                            '';
                        this.router.cancelNavigationTransition(overallTransitionState, cancelationReason, 1 /* NavigationCancellationCode.SupersededByNewNavigation */);
                    }
                    // Only clear current navigation if it is still set to the one that
                    // finalized.
                    if (((_a = this.currentNavigation) === null || _a === void 0 ? void 0 : _a.id) === overallTransitionState.id) {
                        this.currentNavigation = null;
                    }
                }), operators.catchError((e) => {
                    var _a;
                    errored = true;
                    /* This error type is issued during Redirect, and is handled as a
                     * cancellation rather than an error. */
                    if (isNavigationCancelingError$1(e)) {
                        if (!isRedirectingNavigationCancelingError$1(e)) {
                            // Set property only if we're not redirecting. If we landed on a page
                            // and redirect to `/` route, the new navigation is going to see the
                            // `/` isn't a change from the default currentUrlTree and won't
                            // navigate. This is only applicable with initial navigation, so
                            // setting `navigated` only when not redirecting resolves this
                            // scenario.
                            this.router.navigated = true;
                            this.router.restoreHistory(overallTransitionState, true);
                        }
                        const navCancel = new NavigationCancel(overallTransitionState.id, this.router.serializeUrl(overallTransitionState.extractedUrl), e.message, e.cancellationCode);
                        eventsSubject.next(navCancel);
                        // When redirecting, we need to delay resolving the navigation
                        // promise and push it to the redirect navigation
                        if (!isRedirectingNavigationCancelingError$1(e)) {
                            overallTransitionState.resolve(false);
                        }
                        else {
                            const mergedTree = this.router.urlHandlingStrategy.merge(e.url, this.router.rawUrlTree);
                            const extras = {
                                skipLocationChange: overallTransitionState.extras.skipLocationChange,
                                // The URL is already updated at this point if we have 'eager' URL
                                // updates or if the navigation was triggered by the browser (back
                                // button, URL bar, etc). We want to replace that item in history
                                // if the navigation is rejected.
                                replaceUrl: this.router.urlUpdateStrategy === 'eager' ||
                                    isBrowserTriggeredNavigation(overallTransitionState.source)
                            };
                            this.router.scheduleNavigation(mergedTree, 'imperative', null, extras, {
                                resolve: overallTransitionState.resolve,
                                reject: overallTransitionState.reject,
                                promise: overallTransitionState.promise
                            });
                        }
                        /* All other errors should reset to the router's internal URL reference
                         * to the pre-error state. */
                    }
                    else {
                        this.router.restoreHistory(overallTransitionState, true);
                        const navError = new NavigationError(overallTransitionState.id, this.router.serializeUrl(overallTransitionState.extractedUrl), e, (_a = overallTransitionState.targetSnapshot) !== null && _a !== void 0 ? _a : undefined);
                        eventsSubject.next(navError);
                        try {
                            overallTransitionState.resolve(this.router.errorHandler(e));
                        }
                        catch (ee) {
                            overallTransitionState.reject(ee);
                        }
                    }
                    return rxjs.EMPTY;
                }));
                // TODO(jasonaden): remove cast once g3 is on updated TypeScript
            }));
        }
    }
    function isBrowserTriggeredNavigation(source) {
        return source !== 'imperative';
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Provides a strategy for setting the page title after a router navigation.
     *
     * The built-in implementation traverses the router state snapshot and finds the deepest primary
     * outlet with `title` property. Given the `Routes` below, navigating to
     * `/base/child(popup:aux)` would result in the document title being set to "child".
     * ```
     * [
     *   {path: 'base', title: 'base', children: [
     *     {path: 'child', title: 'child'},
     *   ],
     *   {path: 'aux', outlet: 'popup', title: 'popupTitle'}
     * ]
     * ```
     *
     * This class can be used as a base class for custom title strategies. That is, you can create your
     * own class that extends the `TitleStrategy`. Note that in the above example, the `title`
     * from the named outlet is never used. However, a custom strategy might be implemented to
     * incorporate titles in named outlets.
     *
     * @publicApi
     * @see [Page title guide](guide/router#setting-the-page-title)
     */
    class TitleStrategy {
        /**
         * @returns The `title` of the deepest primary route.
         */
        buildTitle(snapshot) {
            var _a;
            let pageTitle;
            let route = snapshot.root;
            while (route !== undefined) {
                pageTitle = (_a = this.getResolvedTitleForRoute(route)) !== null && _a !== void 0 ? _a : pageTitle;
                route = route.children.find(child => child.outlet === PRIMARY_OUTLET);
            }
            return pageTitle;
        }
        /**
         * Given an `ActivatedRouteSnapshot`, returns the final value of the
         * `Route.title` property, which can either be a static string or a resolved value.
         */
        getResolvedTitleForRoute(snapshot) {
            return snapshot.data[RouteTitleKey];
        }
    }
    TitleStrategy.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: TitleStrategy, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    TitleStrategy.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: TitleStrategy, providedIn: 'root', useFactory: () => i0.inject(DefaultTitleStrategy) });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: TitleStrategy, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root', useFactory: () => i0.inject(DefaultTitleStrategy) }]
            }] });
    /**
     * The default `TitleStrategy` used by the router that updates the title using the `Title` service.
     */
    class DefaultTitleStrategy extends TitleStrategy {
        constructor(title) {
            super();
            this.title = title;
        }
        /**
         * Sets the title of the browser to the given value.
         *
         * @param title The `pageTitle` from the deepest primary route.
         */
        updateTitle(snapshot) {
            const title = this.buildTitle(snapshot);
            if (title !== undefined) {
                this.title.setTitle(title);
            }
        }
    }
    DefaultTitleStrategy.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DefaultTitleStrategy, deps: [{ token: i1__namespace.Title }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DefaultTitleStrategy.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DefaultTitleStrategy, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DefaultTitleStrategy, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], ctorParameters: function () { return [{ type: i1__namespace.Title }]; } });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     *
     * Provides a way to customize when activated routes get reused.
     *
     * @publicApi
     */
    class RouteReuseStrategy {
    }
    RouteReuseStrategy.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouteReuseStrategy, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RouteReuseStrategy.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouteReuseStrategy, providedIn: 'root', useFactory: () => i0.inject(DefaultRouteReuseStrategy) });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouteReuseStrategy, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root', useFactory: () => i0.inject(DefaultRouteReuseStrategy) }]
            }] });
    /**
     * @description
     *
     * This base route reuse strategy only reuses routes when the matched router configs are
     * identical. This prevents components from being destroyed and recreated
     * when just the route parameters, query parameters or fragment change
     * (that is, the existing component is _reused_).
     *
     * This strategy does not store any routes for later reuse.
     *
     * Angular uses this strategy by default.
     *
     *
     * It can be used as a base class for custom route reuse strategies, i.e. you can create your own
     * class that extends the `BaseRouteReuseStrategy` one.
     * @publicApi
     */
    class BaseRouteReuseStrategy {
        /**
         * Whether the given route should detach for later reuse.
         * Always returns false for `BaseRouteReuseStrategy`.
         * */
        shouldDetach(route) {
            return false;
        }
        /**
         * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
         */
        store(route, detachedTree) { }
        /** Returns `false`, meaning the route (and its subtree) is never reattached */
        shouldAttach(route) {
            return false;
        }
        /** Returns `null` because this strategy does not store routes for later re-use. */
        retrieve(route) {
            return null;
        }
        /**
         * Determines if a route should be reused.
         * This strategy returns `true` when the future route config and current route config are
         * identical.
         */
        shouldReuseRoute(future, curr) {
            return future.routeConfig === curr.routeConfig;
        }
    }
    class DefaultRouteReuseStrategy extends BaseRouteReuseStrategy {
    }
    DefaultRouteReuseStrategy.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DefaultRouteReuseStrategy, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DefaultRouteReuseStrategy.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DefaultRouteReuseStrategy, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DefaultRouteReuseStrategy, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }] });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$4 = typeof ngDevMode === 'undefined' || !!ngDevMode;
    /**
     * A [DI token](guide/glossary/#di-token) for the router service.
     *
     * @publicApi
     */
    const ROUTER_CONFIGURATION = new i0.InjectionToken(NG_DEV_MODE$4 ? 'router config' : '', {
        providedIn: 'root',
        factory: () => ({}),
    });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function deprecatedLoadChildrenString(injector, loadChildren) {
        return null;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$3 = typeof ngDevMode === 'undefined' || !!ngDevMode;
    /**
     * The [DI token](guide/glossary/#di-token) for a router configuration.
     *
     * `ROUTES` is a low level API for router configuration via dependency injection.
     *
     * We recommend that in almost all cases to use higher level APIs such as `RouterModule.forRoot()`,
     * `RouterModule.forChild()`, `provideRoutes`, or `Router.resetConfig()`.
     *
     * @publicApi
     */
    const ROUTES = new i0.InjectionToken('ROUTES');
    class RouterConfigLoader {
        constructor(injector, compiler) {
            this.injector = injector;
            this.compiler = compiler;
            this.componentLoaders = new WeakMap();
            this.childrenLoaders = new WeakMap();
        }
        loadComponent(route) {
            if (this.componentLoaders.get(route)) {
                return this.componentLoaders.get(route);
            }
            else if (route._loadedComponent) {
                return rxjs.of(route._loadedComponent);
            }
            if (this.onLoadStartListener) {
                this.onLoadStartListener(route);
            }
            const loadRunner = wrapIntoObservable(route.loadComponent())
                .pipe(operators.map(maybeUnwrapDefaultExport), operators.tap(component => {
                var _a;
                if (this.onLoadEndListener) {
                    this.onLoadEndListener(route);
                }
                NG_DEV_MODE$3 && assertStandalone((_a = route.path) !== null && _a !== void 0 ? _a : '', component);
                route._loadedComponent = component;
            }), operators.finalize(() => {
                this.componentLoaders.delete(route);
            }));
            // Use custom ConnectableObservable as share in runners pipe increasing the bundle size too much
            const loader = new rxjs.ConnectableObservable(loadRunner, () => new rxjs.Subject()).pipe(operators.refCount());
            this.componentLoaders.set(route, loader);
            return loader;
        }
        loadChildren(parentInjector, route) {
            if (this.childrenLoaders.get(route)) {
                return this.childrenLoaders.get(route);
            }
            else if (route._loadedRoutes) {
                return rxjs.of({ routes: route._loadedRoutes, injector: route._loadedInjector });
            }
            if (this.onLoadStartListener) {
                this.onLoadStartListener(route);
            }
            const moduleFactoryOrRoutes$ = this.loadModuleFactoryOrRoutes(route.loadChildren);
            const loadRunner = moduleFactoryOrRoutes$.pipe(operators.map((factoryOrRoutes) => {
                if (this.onLoadEndListener) {
                    this.onLoadEndListener(route);
                }
                // This injector comes from the `NgModuleRef` when lazy loading an `NgModule`. There is no
                // injector associated with lazy loading a `Route` array.
                let injector;
                let rawRoutes;
                let requireStandaloneComponents = false;
                if (Array.isArray(factoryOrRoutes)) {
                    rawRoutes = factoryOrRoutes;
                    requireStandaloneComponents = true;
                }
                else {
                    injector = factoryOrRoutes.create(parentInjector).injector;
                    // When loading a module that doesn't provide `RouterModule.forChild()` preloader
                    // will get stuck in an infinite loop. The child module's Injector will look to
                    // its parent `Injector` when it doesn't find any ROUTES so it will return routes
                    // for it's parent module instead.
                    rawRoutes = flatten(injector.get(ROUTES, [], i0.InjectFlags.Self | i0.InjectFlags.Optional));
                }
                const routes = rawRoutes.map(standardizeConfig);
                NG_DEV_MODE$3 && validateConfig(routes, route.path, requireStandaloneComponents);
                return { routes, injector };
            }), operators.finalize(() => {
                this.childrenLoaders.delete(route);
            }));
            // Use custom ConnectableObservable as share in runners pipe increasing the bundle size too much
            const loader = new rxjs.ConnectableObservable(loadRunner, () => new rxjs.Subject())
                .pipe(operators.refCount());
            this.childrenLoaders.set(route, loader);
            return loader;
        }
        loadModuleFactoryOrRoutes(loadChildren) {
            deprecatedLoadChildrenString(this.injector);
            return wrapIntoObservable(loadChildren())
                .pipe(operators.map(maybeUnwrapDefaultExport), operators.mergeMap((t) => {
                if (t instanceof i0.NgModuleFactory || Array.isArray(t)) {
                    return rxjs.of(t);
                }
                else {
                    return rxjs.from(this.compiler.compileModuleAsync(t));
                }
            }));
        }
    }
    RouterConfigLoader.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterConfigLoader, deps: [{ token: i0__namespace.Injector }, { token: i0__namespace.Compiler }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RouterConfigLoader.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterConfigLoader, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterConfigLoader, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i0__namespace.Compiler }]; } });
    function isWrappedDefaultExport(value) {
        // We use `in` here with a string key `'default'`, because we expect `DefaultExport` objects to be
        // dynamically imported ES modules with a spec-mandated `default` key. Thus we don't expect that
        // `default` will be a renamed property.
        return value && typeof value === 'object' && 'default' in value;
    }
    function maybeUnwrapDefaultExport(input) {
        // As per `isWrappedDefaultExport`, the `default` key here is generated by the browser and not
        // subject to property renaming, so we reference it with bracket access.
        return isWrappedDefaultExport(input) ? input['default'] : input;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     *
     * Provides a way to migrate AngularJS applications to Angular.
     *
     * @publicApi
     */
    class UrlHandlingStrategy {
    }
    UrlHandlingStrategy.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: UrlHandlingStrategy, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    UrlHandlingStrategy.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: UrlHandlingStrategy, providedIn: 'root', useFactory: () => i0.inject(DefaultUrlHandlingStrategy) });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: UrlHandlingStrategy, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root', useFactory: () => i0.inject(DefaultUrlHandlingStrategy) }]
            }] });
    /**
     * @publicApi
     */
    class DefaultUrlHandlingStrategy {
        shouldProcessUrl(url) {
            return true;
        }
        extract(url) {
            return url;
        }
        merge(newUrlPart, wholeUrl) {
            return newUrlPart;
        }
    }
    DefaultUrlHandlingStrategy.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DefaultUrlHandlingStrategy, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DefaultUrlHandlingStrategy.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DefaultUrlHandlingStrategy, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DefaultUrlHandlingStrategy, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }] });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$2 = typeof ngDevMode === 'undefined' || !!ngDevMode;
    function defaultErrorHandler(error) {
        throw error;
    }
    function defaultMalformedUriErrorHandler(error, urlSerializer, url) {
        return urlSerializer.parse('/');
    }
    /**
     * The equivalent `IsActiveMatchOptions` options for `Router.isActive` is called with `true`
     * (exact = true).
     */
    const exactMatchOptions = {
        paths: 'exact',
        fragment: 'ignored',
        matrixParams: 'ignored',
        queryParams: 'exact'
    };
    /**
     * The equivalent `IsActiveMatchOptions` options for `Router.isActive` is called with `false`
     * (exact = false).
     */
    const subsetMatchOptions = {
        paths: 'subset',
        fragment: 'ignored',
        matrixParams: 'ignored',
        queryParams: 'subset'
    };
    function assignExtraOptionsToRouter(opts, router) {
        if (opts.errorHandler) {
            router.errorHandler = opts.errorHandler;
        }
        if (opts.malformedUriErrorHandler) {
            router.malformedUriErrorHandler = opts.malformedUriErrorHandler;
        }
        if (opts.onSameUrlNavigation) {
            router.onSameUrlNavigation = opts.onSameUrlNavigation;
        }
        if (opts.paramsInheritanceStrategy) {
            router.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
        }
        if (opts.urlUpdateStrategy) {
            router.urlUpdateStrategy = opts.urlUpdateStrategy;
        }
        if (opts.canceledNavigationResolution) {
            router.canceledNavigationResolution = opts.canceledNavigationResolution;
        }
    }
    function setupRouter() {
        var _a, _b;
        const urlSerializer = i0.inject(UrlSerializer);
        const contexts = i0.inject(ChildrenOutletContexts);
        const location = i0.inject(i3.Location);
        const injector = i0.inject(i0.Injector);
        const compiler = i0.inject(i0.Compiler);
        const config = (_a = i0.inject(ROUTES, { optional: true })) !== null && _a !== void 0 ? _a : [];
        const opts = (_b = i0.inject(ROUTER_CONFIGURATION, { optional: true })) !== null && _b !== void 0 ? _b : {};
        const router = new Router(null, urlSerializer, contexts, location, injector, compiler, flatten(config));
        assignExtraOptionsToRouter(opts, router);
        return router;
    }
    /**
     * @description
     *
     * A service that provides navigation among views and URL manipulation capabilities.
     *
     * @see `Route`.
     * @see [Routing and Navigation Guide](guide/router).
     *
     * @ngModule RouterModule
     *
     * @publicApi
     */
    class Router {
        /**
         * Creates the router service.
         */
        // TODO: vsavkin make internal after the final is out.
        constructor(
        /** @internal */
        rootComponentType, 
        /** @internal */
        urlSerializer, 
        /** @internal */
        rootContexts, 
        /** @internal */
        location, injector, compiler, config) {
            this.rootComponentType = rootComponentType;
            this.urlSerializer = urlSerializer;
            this.rootContexts = rootContexts;
            this.location = location;
            this.config = config;
            /** @internal */
            this.lastSuccessfulNavigation = null;
            this.disposed = false;
            /** @internal */
            this.navigationId = 0;
            /**
             * The id of the currently active page in the router.
             * Updated to the transition's target id on a successful navigation.
             *
             * This is used to track what page the router last activated. When an attempted navigation fails,
             * the router can then use this to compute how to restore the state back to the previously active
             * page.
             */
            this.currentPageId = 0;
            this.isNgZoneEnabled = false;
            /**
             * An event stream for routing events in this NgModule.
             */
            this.events = new rxjs.Subject();
            /**
             * A handler for navigation errors in this NgModule.
             */
            this.errorHandler = defaultErrorHandler;
            /**
             * A handler for errors thrown by `Router.parseUrl(url)`
             * when `url` contains an invalid character.
             * The most common case is a `%` sign
             * that's not encoded and is not part of a percent encoded sequence.
             */
            this.malformedUriErrorHandler = defaultMalformedUriErrorHandler;
            /**
             * True if at least one navigation event has occurred,
             * false otherwise.
             */
            this.navigated = false;
            this.lastSuccessfulId = -1;
            /**
             * Hook that enables you to pause navigation after the preactivation phase.
             * Used by `RouterModule`.
             *
             * @internal
             */
            this.afterPreactivation = () => rxjs.of(void 0);
            /**
             * A strategy for extracting and merging URLs.
             * Used for AngularJS to Angular migrations.
             */
            this.urlHandlingStrategy = i0.inject(UrlHandlingStrategy);
            /**
             * A strategy for re-using routes.
             */
            this.routeReuseStrategy = i0.inject(RouteReuseStrategy);
            /**
             * A strategy for setting the title based on the `routerState`.
             */
            this.titleStrategy = i0.inject(TitleStrategy);
            /**
             * How to handle a navigation request to the current URL. One of:
             *
             * - `'ignore'` :  The router ignores the request.
             * - `'reload'` : The router reloads the URL. Use to implement a "refresh" feature.
             *
             * Note that this only configures whether the Route reprocesses the URL and triggers related
             * action and events like redirects, guards, and resolvers. By default, the router re-uses a
             * component instance when it re-navigates to the same component type without visiting a different
             * component first. This behavior is configured by the `RouteReuseStrategy`. In order to reload
             * routed components on same url navigation, you need to set `onSameUrlNavigation` to `'reload'`
             * _and_ provide a `RouteReuseStrategy` which returns `false` for `shouldReuseRoute`.
             */
            this.onSameUrlNavigation = 'ignore';
            /**
             * How to merge parameters, data, resolved data, and title from parent to child
             * routes. One of:
             *
             * - `'emptyOnly'` : Inherit parent parameters, data, and resolved data
             * for path-less or component-less routes.
             * - `'always'` : Inherit parent parameters, data, and resolved data
             * for all child routes.
             */
            this.paramsInheritanceStrategy = 'emptyOnly';
            /**
             * Determines when the router updates the browser URL.
             * By default (`"deferred"`), updates the browser URL after navigation has finished.
             * Set to `'eager'` to update the browser URL at the beginning of navigation.
             * You can choose to update early so that, if navigation fails,
             * you can show an error message with the URL that failed.
             */
            this.urlUpdateStrategy = 'deferred';
            /**
             * Configures how the Router attempts to restore state when a navigation is cancelled.
             *
             * 'replace' - Always uses `location.replaceState` to set the browser state to the state of the
             * router before the navigation started. This means that if the URL of the browser is updated
             * _before_ the navigation is canceled, the Router will simply replace the item in history rather
             * than trying to restore to the previous location in the session history. This happens most
             * frequently with `urlUpdateStrategy: 'eager'` and navigations with the browser back/forward
             * buttons.
             *
             * 'computed' - Will attempt to return to the same index in the session history that corresponds
             * to the Angular route when the navigation gets cancelled. For example, if the browser back
             * button is clicked and the navigation is cancelled, the Router will trigger a forward navigation
             * and vice versa.
             *
             * Note: the 'computed' option is incompatible with any `UrlHandlingStrategy` which only
             * handles a portion of the URL because the history restoration navigates to the previous place in
             * the browser history rather than simply resetting a portion of the URL.
             *
             * The default value is `replace`.
             *
             */
            this.canceledNavigationResolution = 'replace';
            this.navigationTransitions = new NavigationTransitions(this);
            const onLoadStart = (r) => this.triggerEvent(new RouteConfigLoadStart(r));
            const onLoadEnd = (r) => this.triggerEvent(new RouteConfigLoadEnd(r));
            this.configLoader = injector.get(RouterConfigLoader);
            this.configLoader.onLoadEndListener = onLoadEnd;
            this.configLoader.onLoadStartListener = onLoadStart;
            this.ngModule = injector.get(i0.NgModuleRef);
            this.console = injector.get(i0["ɵConsole"]);
            const ngZone = injector.get(i0.NgZone);
            this.isNgZoneEnabled = ngZone instanceof i0.NgZone && i0.NgZone.isInAngularZone();
            this.resetConfig(config);
            this.currentUrlTree = new UrlTree();
            this.rawUrlTree = this.currentUrlTree;
            this.browserUrlTree = this.currentUrlTree;
            this.routerState = createEmptyState(this.currentUrlTree, this.rootComponentType);
            this.transitions = new rxjs.BehaviorSubject({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(true),
                source: 'imperative',
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
            });
            this.navigations = this.navigationTransitions.setupNavigations(this.transitions);
            this.processNavigations();
        }
        /**
         * The ɵrouterPageId of whatever page is currently active in the browser history. This is
         * important for computing the target page id for new navigations because we need to ensure each
         * page id in the browser history is 1 more than the previous entry.
         */
        get browserPageId() {
            var _a;
            return (_a = this.location.getState()) === null || _a === void 0 ? void 0 : _a.ɵrouterPageId;
        }
        /**
         * @internal
         * TODO: this should be removed once the constructor of the router made internal
         */
        resetRootComponentType(rootComponentType) {
            this.rootComponentType = rootComponentType;
            // TODO: vsavkin router 4.0 should make the root component set to null
            // this will simplify the lifecycle of the router.
            this.routerState.root.component = this.rootComponentType;
        }
        setTransition(t) {
            this.transitions.next(Object.assign(Object.assign({}, this.transitions.value), t));
        }
        /**
         * Sets up the location change listener and performs the initial navigation.
         */
        initialNavigation() {
            this.setUpLocationChangeListener();
            if (this.navigationId === 0) {
                this.navigateByUrl(this.location.path(true), { replaceUrl: true });
            }
        }
        /**
         * Sets up the location change listener. This listener detects navigations triggered from outside
         * the Router (the browser back/forward buttons, for example) and schedules a corresponding Router
         * navigation so that the correct events, guards, etc. are triggered.
         */
        setUpLocationChangeListener() {
            // Don't need to use Zone.wrap any more, because zone.js
            // already patch onPopState, so location change callback will
            // run into ngZone
            if (!this.locationSubscription) {
                this.locationSubscription = this.location.subscribe(event => {
                    const source = event['type'] === 'popstate' ? 'popstate' : 'hashchange';
                    if (source === 'popstate') {
                        // The `setTimeout` was added in #12160 and is likely to support Angular/AngularJS
                        // hybrid apps.
                        setTimeout(() => {
                            var _a;
                            const extras = { replaceUrl: true };
                            // TODO: restoredState should always include the entire state, regardless
                            // of navigationId. This requires a breaking change to update the type on
                            // NavigationStart’s restoredState, which currently requires navigationId
                            // to always be present. The Router used to only restore history state if
                            // a navigationId was present.
                            // The stored navigationId is used by the RouterScroller to retrieve the scroll
                            // position for the page.
                            const restoredState = ((_a = event.state) === null || _a === void 0 ? void 0 : _a.navigationId) ? event.state : null;
                            // Separate to NavigationStart.restoredState, we must also restore the state to
                            // history.state and generate a new navigationId, since it will be overwritten
                            if (event.state) {
                                const stateCopy = Object.assign({}, event.state);
                                delete stateCopy.navigationId;
                                delete stateCopy.ɵrouterPageId;
                                if (Object.keys(stateCopy).length !== 0) {
                                    extras.state = stateCopy;
                                }
                            }
                            const urlTree = this.parseUrl(event['url']);
                            this.scheduleNavigation(urlTree, source, restoredState, extras);
                        }, 0);
                    }
                });
            }
        }
        /** The current URL. */
        get url() {
            return this.serializeUrl(this.currentUrlTree);
        }
        /**
         * Returns the current `Navigation` object when the router is navigating,
         * and `null` when idle.
         */
        getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
        }
        /** @internal */
        triggerEvent(event) {
            this.events.next(event);
        }
        /**
         * Resets the route configuration used for navigation and generating links.
         *
         * @param config The route array for the new configuration.
         *
         * @usageNotes
         *
         * ```
         * router.resetConfig([
         *  { path: 'team/:id', component: TeamCmp, children: [
         *    { path: 'simple', component: SimpleCmp },
         *    { path: 'user/:name', component: UserCmp }
         *  ]}
         * ]);
         * ```
         */
        resetConfig(config) {
            NG_DEV_MODE$2 && validateConfig(config);
            this.config = config.map(standardizeConfig);
            this.navigated = false;
            this.lastSuccessfulId = -1;
        }
        /** @nodoc */
        ngOnDestroy() {
            this.dispose();
        }
        /** Disposes of the router. */
        dispose() {
            this.transitions.complete();
            if (this.locationSubscription) {
                this.locationSubscription.unsubscribe();
                this.locationSubscription = undefined;
            }
            this.disposed = true;
        }
        /**
         * Appends URL segments to the current URL tree to create a new URL tree.
         *
         * @param commands An array of URL fragments with which to construct the new URL tree.
         * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
         * segments, followed by the parameters for each segment.
         * The fragments are applied to the current URL tree or the one provided  in the `relativeTo`
         * property of the options object, if supplied.
         * @param navigationExtras Options that control the navigation strategy.
         * @returns The new URL tree.
         *
         * @usageNotes
         *
         * ```
         * // create /team/33/user/11
         * router.createUrlTree(['/team', 33, 'user', 11]);
         *
         * // create /team/33;expand=true/user/11
         * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
         *
         * // you can collapse static segments like this (this works only with the first passed-in value):
         * router.createUrlTree(['/team/33/user', userId]);
         *
         * // If the first segment can contain slashes, and you do not want the router to split it,
         * // you can do the following:
         * router.createUrlTree([{segmentPath: '/one/two'}]);
         *
         * // create /team/33/(user/11//right:chat)
         * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
         *
         * // remove the right secondary node
         * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
         *
         * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
         *
         * // navigate to /team/33/user/11/details
         * router.createUrlTree(['details'], {relativeTo: route});
         *
         * // navigate to /team/33/user/22
         * router.createUrlTree(['../22'], {relativeTo: route});
         *
         * // navigate to /team/44/user/22
         * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
         *
         * Note that a value of `null` or `undefined` for `relativeTo` indicates that the
         * tree should be created relative to the root.
         * ```
         */
        createUrlTree(commands, navigationExtras = {}) {
            const { relativeTo, queryParams, fragment, queryParamsHandling, preserveFragment } = navigationExtras;
            const a = relativeTo || this.routerState.root;
            const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
            let q = null;
            switch (queryParamsHandling) {
                case 'merge':
                    q = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), queryParams);
                    break;
                case 'preserve':
                    q = this.currentUrlTree.queryParams;
                    break;
                default:
                    q = queryParams || null;
            }
            if (q !== null) {
                q = this.removeEmptyProps(q);
            }
            return createUrlTree(a, this.currentUrlTree, commands, q, f !== null && f !== void 0 ? f : null);
        }
        /**
         * Navigates to a view using an absolute route path.
         *
         * @param url An absolute path for a defined route. The function does not apply any delta to the
         *     current URL.
         * @param extras An object containing properties that modify the navigation strategy.
         *
         * @returns A Promise that resolves to 'true' when navigation succeeds,
         * to 'false' when navigation fails, or is rejected on error.
         *
         * @usageNotes
         *
         * The following calls request navigation to an absolute path.
         *
         * ```
         * router.navigateByUrl("/team/33/user/11");
         *
         * // Navigate without updating the URL
         * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
         * ```
         *
         * @see [Routing and Navigation guide](guide/router)
         *
         */
        navigateByUrl(url, extras = {
            skipLocationChange: false
        }) {
            if (typeof ngDevMode === 'undefined' ||
                ngDevMode && this.isNgZoneEnabled && !i0.NgZone.isInAngularZone()) {
                this.console.warn(`Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?`);
            }
            const urlTree = isUrlTree(url) ? url : this.parseUrl(url);
            const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
            return this.scheduleNavigation(mergedTree, 'imperative', null, extras);
        }
        /**
         * Navigate based on the provided array of commands and a starting point.
         * If no starting route is provided, the navigation is absolute.
         *
         * @param commands An array of URL fragments with which to construct the target URL.
         * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
         * segments, followed by the parameters for each segment.
         * The fragments are applied to the current URL or the one provided  in the `relativeTo` property
         * of the options object, if supplied.
         * @param extras An options object that determines how the URL should be constructed or
         *     interpreted.
         *
         * @returns A Promise that resolves to `true` when navigation succeeds, to `false` when navigation
         *     fails,
         * or is rejected on error.
         *
         * @usageNotes
         *
         * The following calls request navigation to a dynamic route path relative to the current URL.
         *
         * ```
         * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
         *
         * // Navigate without updating the URL, overriding the default behavior
         * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
         * ```
         *
         * @see [Routing and Navigation guide](guide/router)
         *
         */
        navigate(commands, extras = { skipLocationChange: false }) {
            validateCommands(commands);
            return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
        }
        /** Serializes a `UrlTree` into a string */
        serializeUrl(url) {
            return this.urlSerializer.serialize(url);
        }
        /** Parses a string into a `UrlTree` */
        parseUrl(url) {
            let urlTree;
            try {
                urlTree = this.urlSerializer.parse(url);
            }
            catch (e) {
                urlTree = this.malformedUriErrorHandler(e, this.urlSerializer, url);
            }
            return urlTree;
        }
        isActive(url, matchOptions) {
            let options;
            if (matchOptions === true) {
                options = Object.assign({}, exactMatchOptions);
            }
            else if (matchOptions === false) {
                options = Object.assign({}, subsetMatchOptions);
            }
            else {
                options = matchOptions;
            }
            if (isUrlTree(url)) {
                return containsTree(this.currentUrlTree, url, options);
            }
            const urlTree = this.parseUrl(url);
            return containsTree(this.currentUrlTree, urlTree, options);
        }
        removeEmptyProps(params) {
            return Object.keys(params).reduce((result, key) => {
                const value = params[key];
                if (value !== null && value !== undefined) {
                    result[key] = value;
                }
                return result;
            }, {});
        }
        processNavigations() {
            this.navigations.subscribe(t => {
                var _a;
                this.navigated = true;
                this.lastSuccessfulId = t.id;
                this.currentPageId = t.targetPageId;
                this.events
                    .next(new NavigationEnd(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(this.currentUrlTree)));
                this.lastSuccessfulNavigation = this.getCurrentNavigation();
                (_a = this.titleStrategy) === null || _a === void 0 ? void 0 : _a.updateTitle(this.routerState.snapshot);
                t.resolve(true);
            }, e => {
                this.console.warn(`Unhandled Navigation Error: ${e}`);
            });
        }
        /** @internal */
        scheduleNavigation(rawUrl, source, restoredState, extras, priorPromise) {
            var _a, _b;
            if (this.disposed) {
                return Promise.resolve(false);
            }
            let resolve;
            let reject;
            let promise;
            if (priorPromise) {
                resolve = priorPromise.resolve;
                reject = priorPromise.reject;
                promise = priorPromise.promise;
            }
            else {
                promise = new Promise((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
            }
            const id = ++this.navigationId;
            let targetPageId;
            if (this.canceledNavigationResolution === 'computed') {
                const isInitialPage = this.currentPageId === 0;
                if (isInitialPage) {
                    restoredState = this.location.getState();
                }
                // If the `ɵrouterPageId` exist in the state then `targetpageId` should have the value of
                // `ɵrouterPageId`. This is the case for something like a page refresh where we assign the
                // target id to the previously set value for that page.
                if (restoredState && restoredState.ɵrouterPageId) {
                    targetPageId = restoredState.ɵrouterPageId;
                }
                else {
                    // If we're replacing the URL or doing a silent navigation, we do not want to increment the
                    // page id because we aren't pushing a new entry to history.
                    if (extras.replaceUrl || extras.skipLocationChange) {
                        targetPageId = (_a = this.browserPageId) !== null && _a !== void 0 ? _a : 0;
                    }
                    else {
                        targetPageId = ((_b = this.browserPageId) !== null && _b !== void 0 ? _b : 0) + 1;
                    }
                }
            }
            else {
                // This is unused when `canceledNavigationResolution` is not computed.
                targetPageId = 0;
            }
            this.setTransition({
                id,
                targetPageId,
                source,
                restoredState,
                currentUrlTree: this.currentUrlTree,
                rawUrl,
                extras,
                resolve,
                reject,
                promise,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState
            });
            // Make sure that the error is propagated even though `processNavigations` catch
            // handler does not rethrow
            return promise.catch((e) => {
                return Promise.reject(e);
            });
        }
        /** @internal */
        setBrowserUrl(url, transition) {
            const path = this.urlSerializer.serialize(url);
            const state = Object.assign(Object.assign({}, transition.extras.state), this.generateNgRouterState(transition.id, transition.targetPageId));
            if (this.location.isCurrentPathEqualTo(path) || !!transition.extras.replaceUrl) {
                this.location.replaceState(path, '', state);
            }
            else {
                this.location.go(path, '', state);
            }
        }
        /**
         * Performs the necessary rollback action to restore the browser URL to the
         * state before the transition.
         * @internal
         */
        restoreHistory(transition, restoringFromCaughtError = false) {
            var _a, _b;
            if (this.canceledNavigationResolution === 'computed') {
                const targetPagePosition = this.currentPageId - transition.targetPageId;
                // The navigator change the location before triggered the browser event,
                // so we need to go back to the current url if the navigation is canceled.
                // Also, when navigation gets cancelled while using url update strategy eager, then we need to
                // go back. Because, when `urlUpdateStrategy` is `eager`; `setBrowserUrl` method is called
                // before any verification.
                const browserUrlUpdateOccurred = (transition.source === 'popstate' || this.urlUpdateStrategy === 'eager' ||
                    this.currentUrlTree === ((_a = this.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.finalUrl));
                if (browserUrlUpdateOccurred && targetPagePosition !== 0) {
                    this.location.historyGo(targetPagePosition);
                }
                else if (this.currentUrlTree === ((_b = this.getCurrentNavigation()) === null || _b === void 0 ? void 0 : _b.finalUrl) &&
                    targetPagePosition === 0) {
                    // We got to the activation stage (where currentUrlTree is set to the navigation's
                    // finalUrl), but we weren't moving anywhere in history (skipLocationChange or replaceUrl).
                    // We still need to reset the router state back to what it was when the navigation started.
                    this.resetState(transition);
                    // TODO(atscott): resetting the `browserUrlTree` should really be done in `resetState`.
                    // Investigate if this can be done by running TGP.
                    this.browserUrlTree = transition.currentUrlTree;
                    this.resetUrlToCurrentUrlTree();
                }
                else ;
            }
            else if (this.canceledNavigationResolution === 'replace') {
                // TODO(atscott): It seems like we should _always_ reset the state here. It would be a no-op
                // for `deferred` navigations that haven't change the internal state yet because guards
                // reject. For 'eager' navigations, it seems like we also really should reset the state
                // because the navigation was cancelled. Investigate if this can be done by running TGP.
                if (restoringFromCaughtError) {
                    this.resetState(transition);
                }
                this.resetUrlToCurrentUrlTree();
            }
        }
        resetState(t) {
            this.routerState = t.currentRouterState;
            this.currentUrlTree = t.currentUrlTree;
            // Note here that we use the urlHandlingStrategy to get the reset `rawUrlTree` because it may be
            // configured to handle only part of the navigation URL. This means we would only want to reset
            // the part of the navigation handled by the Angular router rather than the whole URL. In
            // addition, the URLHandlingStrategy may be configured to specifically preserve parts of the URL
            // when merging, such as the query params so they are not lost on a refresh.
            this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl);
        }
        resetUrlToCurrentUrlTree() {
            this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), '', this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId));
        }
        /** @internal */
        cancelNavigationTransition(transition, reason, code) {
            const navCancel = new NavigationCancel(transition.id, this.serializeUrl(transition.extractedUrl), reason, code);
            this.triggerEvent(navCancel);
            transition.resolve(false);
        }
        generateNgRouterState(navigationId, routerPageId) {
            if (this.canceledNavigationResolution === 'computed') {
                return { navigationId, ɵrouterPageId: routerPageId };
            }
            return { navigationId };
        }
    }
    Router.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: Router, deps: "invalid", target: i0__namespace.ɵɵFactoryTarget.Injectable });
    Router.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: Router, providedIn: 'root', useFactory: setupRouter });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: Router, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                        useFactory: setupRouter,
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Type }, { type: UrlSerializer }, { type: ChildrenOutletContexts }, { type: i3__namespace.Location }, { type: i0__namespace.Injector }, { type: i0__namespace.Compiler }, { type: undefined }]; } });
    function validateCommands(commands) {
        for (let i = 0; i < commands.length; i++) {
            const cmd = commands[i];
            if (cmd == null) {
                throw new i0["ɵRuntimeError"](4008 /* RuntimeErrorCode.NULLISH_COMMAND */, NG_DEV_MODE$2 && `The requested path contains ${cmd} segment at index ${i}`);
            }
        }
    }

    /**
     * @description
     *
     * When applied to an element in a template, makes that element a link
     * that initiates navigation to a route. Navigation opens one or more routed components
     * in one or more `<router-outlet>` locations on the page.
     *
     * Given a route configuration `[{ path: 'user/:name', component: UserCmp }]`,
     * the following creates a static link to the route:
     * `<a routerLink="/user/bob">link to user component</a>`
     *
     * You can use dynamic values to generate the link.
     * For a dynamic link, pass an array of path segments,
     * followed by the params for each segment.
     * For example, `['/team', teamId, 'user', userName, {details: true}]`
     * generates a link to `/team/11/user/bob;details=true`.
     *
     * Multiple static segments can be merged into one term and combined with dynamic segments.
     * For example, `['/team/11/user', userName, {details: true}]`
     *
     * The input that you provide to the link is treated as a delta to the current URL.
     * For instance, suppose the current URL is `/user/(box//aux:team)`.
     * The link `<a [routerLink]="['/user/jim']">Jim</a>` creates the URL
     * `/user/(jim//aux:team)`.
     * See {@link Router#createUrlTree createUrlTree} for more information.
     *
     * @usageNotes
     *
     * You can use absolute or relative paths in a link, set query parameters,
     * control how parameters are handled, and keep a history of navigation states.
     *
     * ### Relative link paths
     *
     * The first segment name can be prepended with `/`, `./`, or `../`.
     * * If the first segment begins with `/`, the router looks up the route from the root of the
     *   app.
     * * If the first segment begins with `./`, or doesn't begin with a slash, the router
     *   looks in the children of the current activated route.
     * * If the first segment begins with `../`, the router goes up one level in the route tree.
     *
     * ### Setting and handling query params and fragments
     *
     * The following link adds a query parameter and a fragment to the generated URL:
     *
     * ```
     * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
     *   link to user component
     * </a>
     * ```
     * By default, the directive constructs the new URL using the given query parameters.
     * The example generates the link: `/user/bob?debug=true#education`.
     *
     * You can instruct the directive to handle query parameters differently
     * by specifying the `queryParamsHandling` option in the link.
     * Allowed values are:
     *
     *  - `'merge'`: Merge the given `queryParams` into the current query params.
     *  - `'preserve'`: Preserve the current query params.
     *
     * For example:
     *
     * ```
     * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" queryParamsHandling="merge">
     *   link to user component
     * </a>
     * ```
     *
     * See {@link UrlCreationOptions.queryParamsHandling UrlCreationOptions#queryParamsHandling}.
     *
     * ### Preserving navigation history
     *
     * You can provide a `state` value to be persisted to the browser's
     * [`History.state` property](https://developer.mozilla.org/en-US/docs/Web/API/History#Properties).
     * For example:
     *
     * ```
     * <a [routerLink]="['/user/bob']" [state]="{tracingId: 123}">
     *   link to user component
     * </a>
     * ```
     *
     * Use {@link Router.getCurrentNavigation() Router#getCurrentNavigation} to retrieve a saved
     * navigation-state value. For example, to capture the `tracingId` during the `NavigationStart`
     * event:
     *
     * ```
     * // Get NavigationStart events
     * router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
     *   const navigation = router.getCurrentNavigation();
     *   tracingService.trace({id: navigation.extras.state.tracingId});
     * });
     * ```
     *
     * @ngModule RouterModule
     *
     * @publicApi
     */
    class RouterLink {
        constructor(router, route, tabIndexAttribute, renderer, el, locationStrategy) {
            this.router = router;
            this.route = route;
            this.tabIndexAttribute = tabIndexAttribute;
            this.renderer = renderer;
            this.el = el;
            this.locationStrategy = locationStrategy;
            this._preserveFragment = false;
            this._skipLocationChange = false;
            this._replaceUrl = false;
            /**
             * Represents an `href` attribute value applied to a host element,
             * when a host element is `<a>`. For other tags, the value is `null`.
             */
            this.href = null;
            this.commands = null;
            /** @internal */
            this.onChanges = new rxjs.Subject();
            const tagName = el.nativeElement.tagName;
            this.isAnchorElement = tagName === 'A' || tagName === 'AREA';
            if (this.isAnchorElement) {
                this.subscription = router.events.subscribe((s) => {
                    if (s instanceof NavigationEnd) {
                        this.updateHref();
                    }
                });
            }
            else {
                this.setTabIndexIfNotOnNativeEl('0');
            }
        }
        /**
         * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the
         * `UrlCreationOptions`.
         * @see {@link UrlCreationOptions#preserveFragment UrlCreationOptions#preserveFragment}
         * @see {@link Router#createUrlTree Router#createUrlTree}
         */
        set preserveFragment(preserveFragment) {
            this._preserveFragment = i0["ɵcoerceToBoolean"](preserveFragment);
        }
        get preserveFragment() {
            return this._preserveFragment;
        }
        /**
         * Passed to {@link Router#navigateByUrl Router#navigateByUrl} as part of the
         * `NavigationBehaviorOptions`.
         * @see {@link NavigationBehaviorOptions#skipLocationChange NavigationBehaviorOptions#skipLocationChange}
         * @see {@link Router#navigateByUrl Router#navigateByUrl}
         */
        set skipLocationChange(skipLocationChange) {
            this._skipLocationChange = i0["ɵcoerceToBoolean"](skipLocationChange);
        }
        get skipLocationChange() {
            return this._skipLocationChange;
        }
        /**
         * Passed to {@link Router#navigateByUrl Router#navigateByUrl} as part of the
         * `NavigationBehaviorOptions`.
         * @see {@link NavigationBehaviorOptions#replaceUrl NavigationBehaviorOptions#replaceUrl}
         * @see {@link Router#navigateByUrl Router#navigateByUrl}
         */
        set replaceUrl(replaceUrl) {
            this._replaceUrl = i0["ɵcoerceToBoolean"](replaceUrl);
        }
        get replaceUrl() {
            return this._replaceUrl;
        }
        /**
         * Modifies the tab index if there was not a tabindex attribute on the element during
         * instantiation.
         */
        setTabIndexIfNotOnNativeEl(newTabIndex) {
            if (this.tabIndexAttribute != null /* both `null` and `undefined` */ || this.isAnchorElement) {
                return;
            }
            this.applyAttributeValue('tabindex', newTabIndex);
        }
        /** @nodoc */
        ngOnChanges(changes) {
            if (this.isAnchorElement) {
                this.updateHref();
            }
            // This is subscribed to by `RouterLinkActive` so that it knows to update when there are changes
            // to the RouterLinks it's tracking.
            this.onChanges.next(this);
        }
        /**
         * Commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
         *   - **array**: commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
         *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
         *   - **null|undefined**: effectively disables the `routerLink`
         * @see {@link Router#createUrlTree Router#createUrlTree}
         */
        set routerLink(commands) {
            if (commands != null) {
                this.commands = Array.isArray(commands) ? commands : [commands];
                this.setTabIndexIfNotOnNativeEl('0');
            }
            else {
                this.commands = null;
                this.setTabIndexIfNotOnNativeEl(null);
            }
        }
        /** @nodoc */
        onClick(button, ctrlKey, shiftKey, altKey, metaKey) {
            if (this.urlTree === null) {
                return true;
            }
            if (this.isAnchorElement) {
                if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
                    return true;
                }
                if (typeof this.target === 'string' && this.target != '_self') {
                    return true;
                }
            }
            const extras = {
                skipLocationChange: this.skipLocationChange,
                replaceUrl: this.replaceUrl,
                state: this.state,
            };
            this.router.navigateByUrl(this.urlTree, extras);
            // Return `false` for `<a>` elements to prevent default action
            // and cancel the native behavior, since the navigation is handled
            // by the Router.
            return !this.isAnchorElement;
        }
        /** @nodoc */
        ngOnDestroy() {
            var _a;
            (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        }
        updateHref() {
            var _a;
            this.href = this.urlTree !== null && this.locationStrategy ?
                (_a = this.locationStrategy) === null || _a === void 0 ? void 0 : _a.prepareExternalUrl(this.router.serializeUrl(this.urlTree)) :
                null;
            const sanitizedValue = this.href === null ?
                null :
                // This class represents a directive that can be added to both `<a>` elements,
                // as well as other elements. As a result, we can't define security context at
                // compile time. So the security context is deferred to runtime.
                // The `ɵɵsanitizeUrlOrResourceUrl` selects the necessary sanitizer function
                // based on the tag and property names. The logic mimics the one from
                // `packages/compiler/src/schema/dom_security_schema.ts`, which is used at compile time.
                //
                // Note: we should investigate whether we can switch to using `@HostBinding('attr.href')`
                // instead of applying a value via a renderer, after a final merge of the
                // `RouterLinkWithHref` directive.
                i0["ɵɵsanitizeUrlOrResourceUrl"](this.href, this.el.nativeElement.tagName.toLowerCase(), 'href');
            this.applyAttributeValue('href', sanitizedValue);
        }
        applyAttributeValue(attrName, attrValue) {
            const renderer = this.renderer;
            const nativeElement = this.el.nativeElement;
            if (attrValue !== null) {
                renderer.setAttribute(nativeElement, attrName, attrValue);
            }
            else {
                renderer.removeAttribute(nativeElement, attrName);
            }
        }
        get urlTree() {
            if (this.commands === null) {
                return null;
            }
            return this.router.createUrlTree(this.commands, {
                // If the `relativeTo` input is not defined, we want to use `this.route` by default.
                // Otherwise, we should use the value provided by the user in the input.
                relativeTo: this.relativeTo !== undefined ? this.relativeTo : this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: this.preserveFragment,
            });
        }
    }
    RouterLink.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterLink, deps: [{ token: Router }, { token: ActivatedRoute }, { token: 'tabindex', attribute: true }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ElementRef }, { token: i3__namespace.LocationStrategy }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RouterLink.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.1", type: RouterLink, isStandalone: true, selector: "[routerLink]", inputs: { target: "target", queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", state: "state", relativeTo: "relativeTo", preserveFragment: "preserveFragment", skipLocationChange: "skipLocationChange", replaceUrl: "replaceUrl", routerLink: "routerLink" }, host: { listeners: { "click": "onClick($event.button,$event.ctrlKey,$event.shiftKey,$event.altKey,$event.metaKey)" }, properties: { "attr.target": "this.target" } }, usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterLink, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[routerLink]',
                        standalone: true,
                    }]
            }], ctorParameters: function () {
            return [{ type: Router }, { type: ActivatedRoute }, { type: undefined, decorators: [{
                            type: i0.Attribute,
                            args: ['tabindex']
                        }] }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ElementRef }, { type: i3__namespace.LocationStrategy }];
        }, propDecorators: { target: [{
                    type: i0.HostBinding,
                    args: ['attr.target']
                }, {
                    type: i0.Input
                }], queryParams: [{
                    type: i0.Input
                }], fragment: [{
                    type: i0.Input
                }], queryParamsHandling: [{
                    type: i0.Input
                }], state: [{
                    type: i0.Input
                }], relativeTo: [{
                    type: i0.Input
                }], preserveFragment: [{
                    type: i0.Input
                }], skipLocationChange: [{
                    type: i0.Input
                }], replaceUrl: [{
                    type: i0.Input
                }], routerLink: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click',
                        ['$event.button', '$event.ctrlKey', '$event.shiftKey', '$event.altKey', '$event.metaKey']]
                }] } });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     *
     * @description
     *
     * Tracks whether the linked route of an element is currently active, and allows you
     * to specify one or more CSS classes to add to the element when the linked route
     * is active.
     *
     * Use this directive to create a visual distinction for elements associated with an active route.
     * For example, the following code highlights the word "Bob" when the router
     * activates the associated route:
     *
     * ```
     * <a routerLink="/user/bob" routerLinkActive="active-link">Bob</a>
     * ```
     *
     * Whenever the URL is either '/user' or '/user/bob', the "active-link" class is
     * added to the anchor tag. If the URL changes, the class is removed.
     *
     * You can set more than one class using a space-separated string or an array.
     * For example:
     *
     * ```
     * <a routerLink="/user/bob" routerLinkActive="class1 class2">Bob</a>
     * <a routerLink="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a>
     * ```
     *
     * To add the classes only when the URL matches the link exactly, add the option `exact: true`:
     *
     * ```
     * <a routerLink="/user/bob" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:
     * true}">Bob</a>
     * ```
     *
     * To directly check the `isActive` status of the link, assign the `RouterLinkActive`
     * instance to a template variable.
     * For example, the following checks the status without assigning any CSS classes:
     *
     * ```
     * <a routerLink="/user/bob" routerLinkActive #rla="routerLinkActive">
     *   Bob {{ rla.isActive ? '(already open)' : ''}}
     * </a>
     * ```
     *
     * You can apply the `RouterLinkActive` directive to an ancestor of linked elements.
     * For example, the following sets the active-link class on the `<div>`  parent tag
     * when the URL is either '/user/jim' or '/user/bob'.
     *
     * ```
     * <div routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
     *   <a routerLink="/user/jim">Jim</a>
     *   <a routerLink="/user/bob">Bob</a>
     * </div>
     * ```
     *
     * The `RouterLinkActive` directive can also be used to set the aria-current attribute
     * to provide an alternative distinction for active elements to visually impaired users.
     *
     * For example, the following code adds the 'active' class to the Home Page link when it is
     * indeed active and in such case also sets its aria-current attribute to 'page':
     *
     * ```
     * <a routerLink="/" routerLinkActive="active" ariaCurrentWhenActive="page">Home Page</a>
     * ```
     *
     * @ngModule RouterModule
     *
     * @publicApi
     */
    class RouterLinkActive {
        constructor(router, element, renderer, cdr, link) {
            this.router = router;
            this.element = element;
            this.renderer = renderer;
            this.cdr = cdr;
            this.link = link;
            this.classes = [];
            this.isActive = false;
            /**
             * Options to configure how to determine if the router link is active.
             *
             * These options are passed to the `Router.isActive()` function.
             *
             * @see Router.isActive
             */
            this.routerLinkActiveOptions = { exact: false };
            /**
             *
             * You can use the output `isActiveChange` to get notified each time the link becomes
             * active or inactive.
             *
             * Emits:
             * true  -> Route is active
             * false -> Route is inactive
             *
             * ```
             * <a
             *  routerLink="/user/bob"
             *  routerLinkActive="active-link"
             *  (isActiveChange)="this.onRouterLinkActive($event)">Bob</a>
             * ```
             */
            this.isActiveChange = new i0.EventEmitter();
            this.routerEventsSubscription = router.events.subscribe((s) => {
                if (s instanceof NavigationEnd) {
                    this.update();
                }
            });
        }
        /** @nodoc */
        ngAfterContentInit() {
            // `of(null)` is used to force subscribe body to execute once immediately (like `startWith`).
            rxjs.of(this.links.changes, rxjs.of(null)).pipe(operators.mergeAll()).subscribe(_ => {
                this.update();
                this.subscribeToEachLinkOnChanges();
            });
        }
        subscribeToEachLinkOnChanges() {
            var _a;
            (_a = this.linkInputChangesSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            const allLinkChanges = [...this.links.toArray(), this.link]
                .filter((link) => !!link)
                .map(link => link.onChanges);
            this.linkInputChangesSubscription = rxjs.from(allLinkChanges).pipe(operators.mergeAll()).subscribe(link => {
                if (this.isActive !== this.isLinkActive(this.router)(link)) {
                    this.update();
                }
            });
        }
        set routerLinkActive(data) {
            const classes = Array.isArray(data) ? data : data.split(' ');
            this.classes = classes.filter(c => !!c);
        }
        /** @nodoc */
        ngOnChanges(changes) {
            this.update();
        }
        /** @nodoc */
        ngOnDestroy() {
            var _a;
            this.routerEventsSubscription.unsubscribe();
            (_a = this.linkInputChangesSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        }
        update() {
            if (!this.links || !this.router.navigated)
                return;
            Promise.resolve().then(() => {
                const hasActiveLinks = this.hasActiveLinks();
                if (this.isActive !== hasActiveLinks) {
                    this.isActive = hasActiveLinks;
                    this.cdr.markForCheck();
                    this.classes.forEach((c) => {
                        if (hasActiveLinks) {
                            this.renderer.addClass(this.element.nativeElement, c);
                        }
                        else {
                            this.renderer.removeClass(this.element.nativeElement, c);
                        }
                    });
                    if (hasActiveLinks && this.ariaCurrentWhenActive !== undefined) {
                        this.renderer.setAttribute(this.element.nativeElement, 'aria-current', this.ariaCurrentWhenActive.toString());
                    }
                    else {
                        this.renderer.removeAttribute(this.element.nativeElement, 'aria-current');
                    }
                    // Emit on isActiveChange after classes are updated
                    this.isActiveChange.emit(hasActiveLinks);
                }
            });
        }
        isLinkActive(router) {
            const options = isActiveMatchOptions(this.routerLinkActiveOptions) ?
                this.routerLinkActiveOptions :
                // While the types should disallow `undefined` here, it's possible without strict inputs
                (this.routerLinkActiveOptions.exact || false);
            return (link) => link.urlTree ? router.isActive(link.urlTree, options) : false;
        }
        hasActiveLinks() {
            const isActiveCheckFn = this.isLinkActive(this.router);
            return this.link && isActiveCheckFn(this.link) || this.links.some(isActiveCheckFn);
        }
    }
    RouterLinkActive.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterLinkActive, deps: [{ token: Router }, { token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }, { token: RouterLink, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    RouterLinkActive.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.1", type: RouterLinkActive, isStandalone: true, selector: "[routerLinkActive]", inputs: { routerLinkActiveOptions: "routerLinkActiveOptions", ariaCurrentWhenActive: "ariaCurrentWhenActive", routerLinkActive: "routerLinkActive" }, outputs: { isActiveChange: "isActiveChange" }, queries: [{ propertyName: "links", predicate: RouterLink, descendants: true }], exportAs: ["routerLinkActive"], usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterLinkActive, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[routerLinkActive]',
                        exportAs: 'routerLinkActive',
                        standalone: true,
                    }]
            }], ctorParameters: function () {
            return [{ type: Router }, { type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }, { type: RouterLink, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { links: [{
                    type: i0.ContentChildren,
                    args: [RouterLink, { descendants: true }]
                }], routerLinkActiveOptions: [{
                    type: i0.Input
                }], ariaCurrentWhenActive: [{
                    type: i0.Input
                }], isActiveChange: [{
                    type: i0.Output
                }], routerLinkActive: [{
                    type: i0.Input
                }] } });
    /**
     * Use instead of `'paths' in options` to be compatible with property renaming
     */
    function isActiveMatchOptions(options) {
        return !!options.paths;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     *
     * Provides a preloading strategy.
     *
     * @publicApi
     */
    class PreloadingStrategy {
    }
    /**
     * @description
     *
     * Provides a preloading strategy that preloads all modules as quickly as possible.
     *
     * ```
     * RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
     * ```
     *
     * @publicApi
     */
    class PreloadAllModules {
        preload(route, fn) {
            return fn().pipe(operators.catchError(() => rxjs.of(null)));
        }
    }
    PreloadAllModules.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: PreloadAllModules, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    PreloadAllModules.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: PreloadAllModules, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: PreloadAllModules, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }] });
    /**
     * @description
     *
     * Provides a preloading strategy that does not preload any modules.
     *
     * This strategy is enabled by default.
     *
     * @publicApi
     */
    class NoPreloading {
        preload(route, fn) {
            return rxjs.of(null);
        }
    }
    NoPreloading.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: NoPreloading, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    NoPreloading.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: NoPreloading, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: NoPreloading, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }] });
    /**
     * The preloader optimistically loads all router configurations to
     * make navigations into lazily-loaded sections of the application faster.
     *
     * The preloader runs in the background. When the router bootstraps, the preloader
     * starts listening to all navigation events. After every such event, the preloader
     * will check if any configurations can be loaded lazily.
     *
     * If a route is protected by `canLoad` guards, the preloaded will not load it.
     *
     * @publicApi
     */
    class RouterPreloader {
        constructor(router, compiler, injector, preloadingStrategy, loader) {
            this.router = router;
            this.injector = injector;
            this.preloadingStrategy = preloadingStrategy;
            this.loader = loader;
        }
        setUpPreloading() {
            this.subscription =
                this.router.events
                    .pipe(operators.filter((e) => e instanceof NavigationEnd), operators.concatMap(() => this.preload()))
                    .subscribe(() => { });
        }
        preload() {
            return this.processRoutes(this.injector, this.router.config);
        }
        /** @nodoc */
        ngOnDestroy() {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        }
        processRoutes(injector, routes) {
            var _a, _b, _c;
            const res = [];
            for (const route of routes) {
                if (route.providers && !route._injector) {
                    route._injector =
                        i0.createEnvironmentInjector(route.providers, injector, `Route: ${route.path}`);
                }
                const injectorForCurrentRoute = (_a = route._injector) !== null && _a !== void 0 ? _a : injector;
                const injectorForChildren = (_b = route._loadedInjector) !== null && _b !== void 0 ? _b : injectorForCurrentRoute;
                // Note that `canLoad` is only checked as a condition that prevents `loadChildren` and not
                // `loadComponent`. `canLoad` guards only block loading of child routes by design. This
                // happens as a consequence of needing to descend into children for route matching immediately
                // while component loading is deferred until route activation. Because `canLoad` guards can
                // have side effects, we cannot execute them here so we instead skip preloading altogether
                // when present. Lastly, it remains to be decided whether `canLoad` should behave this way
                // at all. Code splitting and lazy loading is separate from client-side authorization checks
                // and should not be used as a security measure to prevent loading of code.
                if ((route.loadChildren && !route._loadedRoutes && route.canLoad === undefined) ||
                    (route.loadComponent && !route._loadedComponent)) {
                    res.push(this.preloadConfig(injectorForCurrentRoute, route));
                }
                else if (route.children || route._loadedRoutes) {
                    res.push(this.processRoutes(injectorForChildren, ((_c = route.children) !== null && _c !== void 0 ? _c : route._loadedRoutes)));
                }
            }
            return rxjs.from(res).pipe(operators.mergeAll());
        }
        preloadConfig(injector, route) {
            return this.preloadingStrategy.preload(route, () => {
                let loadedChildren$;
                if (route.loadChildren && route.canLoad === undefined) {
                    loadedChildren$ = this.loader.loadChildren(injector, route);
                }
                else {
                    loadedChildren$ = rxjs.of(null);
                }
                const recursiveLoadChildren$ = loadedChildren$.pipe(operators.mergeMap((config) => {
                    var _a;
                    if (config === null) {
                        return rxjs.of(void 0);
                    }
                    route._loadedRoutes = config.routes;
                    route._loadedInjector = config.injector;
                    // If the loaded config was a module, use that as the module/module injector going
                    // forward. Otherwise, continue using the current module/module injector.
                    return this.processRoutes((_a = config.injector) !== null && _a !== void 0 ? _a : injector, config.routes);
                }));
                if (route.loadComponent && !route._loadedComponent) {
                    const loadComponent$ = this.loader.loadComponent(route);
                    return rxjs.from([recursiveLoadChildren$, loadComponent$]).pipe(operators.mergeAll());
                }
                else {
                    return recursiveLoadChildren$;
                }
            });
        }
    }
    RouterPreloader.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterPreloader, deps: [{ token: Router }, { token: i0__namespace.Compiler }, { token: i0__namespace.EnvironmentInjector }, { token: PreloadingStrategy }, { token: RouterConfigLoader }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RouterPreloader.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterPreloader, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterPreloader, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], ctorParameters: function () { return [{ type: Router }, { type: i0__namespace.Compiler }, { type: i0__namespace.EnvironmentInjector }, { type: PreloadingStrategy }, { type: RouterConfigLoader }]; } });

    const ROUTER_SCROLLER = new i0.InjectionToken('');
    class RouterScroller {
        constructor(router, 
        /** @docsNotRequired */ viewportScroller, zone, options = {}) {
            this.router = router;
            this.viewportScroller = viewportScroller;
            this.zone = zone;
            this.options = options;
            this.lastId = 0;
            this.lastSource = 'imperative';
            this.restoredId = 0;
            this.store = {};
            // Default both options to 'disabled'
            options.scrollPositionRestoration = options.scrollPositionRestoration || 'disabled';
            options.anchorScrolling = options.anchorScrolling || 'disabled';
        }
        init() {
            // we want to disable the automatic scrolling because having two places
            // responsible for scrolling results race conditions, especially given
            // that browser don't implement this behavior consistently
            if (this.options.scrollPositionRestoration !== 'disabled') {
                this.viewportScroller.setHistoryScrollRestoration('manual');
            }
            this.routerEventsSubscription = this.createScrollEvents();
            this.scrollEventsSubscription = this.consumeScrollEvents();
        }
        createScrollEvents() {
            return this.router.events.subscribe(e => {
                if (e instanceof NavigationStart) {
                    // store the scroll position of the current stable navigations.
                    this.store[this.lastId] = this.viewportScroller.getScrollPosition();
                    this.lastSource = e.navigationTrigger;
                    this.restoredId = e.restoredState ? e.restoredState.navigationId : 0;
                }
                else if (e instanceof NavigationEnd) {
                    this.lastId = e.id;
                    this.scheduleScrollEvent(e, this.router.parseUrl(e.urlAfterRedirects).fragment);
                }
            });
        }
        consumeScrollEvents() {
            return this.router.events.subscribe(e => {
                if (!(e instanceof Scroll))
                    return;
                // a popstate event. The pop state event will always ignore anchor scrolling.
                if (e.position) {
                    if (this.options.scrollPositionRestoration === 'top') {
                        this.viewportScroller.scrollToPosition([0, 0]);
                    }
                    else if (this.options.scrollPositionRestoration === 'enabled') {
                        this.viewportScroller.scrollToPosition(e.position);
                    }
                    // imperative navigation "forward"
                }
                else {
                    if (e.anchor && this.options.anchorScrolling === 'enabled') {
                        this.viewportScroller.scrollToAnchor(e.anchor);
                    }
                    else if (this.options.scrollPositionRestoration !== 'disabled') {
                        this.viewportScroller.scrollToPosition([0, 0]);
                    }
                }
            });
        }
        scheduleScrollEvent(routerEvent, anchor) {
            this.zone.runOutsideAngular(() => {
                // The scroll event needs to be delayed until after change detection. Otherwise, we may
                // attempt to restore the scroll position before the router outlet has fully rendered the
                // component by executing its update block of the template function.
                setTimeout(() => {
                    this.zone.run(() => {
                        this.router.triggerEvent(new Scroll(routerEvent, this.lastSource === 'popstate' ? this.store[this.restoredId] : null, anchor));
                    });
                }, 0);
            });
        }
        /** @nodoc */
        ngOnDestroy() {
            if (this.routerEventsSubscription) {
                this.routerEventsSubscription.unsubscribe();
            }
            if (this.scrollEventsSubscription) {
                this.scrollEventsSubscription.unsubscribe();
            }
        }
    }
    RouterScroller.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterScroller, deps: "invalid", target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RouterScroller.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterScroller });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterScroller, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: Router }, { type: i3__namespace.ViewportScroller }, { type: i0__namespace.NgZone }, { type: undefined }]; } });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE$1 = typeof ngDevMode === 'undefined' || ngDevMode;
    /**
     * Sets up providers necessary to enable `Router` functionality for the application.
     * Allows to configure a set of routes as well as extra features that should be enabled.
     *
     * @usageNotes
     *
     * Basic example of how you can add a Router to your application:
     * ```
     * const appRoutes: Routes = [];
     * bootstrapApplication(AppComponent, {
     *   providers: [provideRouter(appRoutes)]
     * });
     * ```
     *
     * You can also enable optional features in the Router by adding functions from the `RouterFeatures`
     * type:
     * ```
     * const appRoutes: Routes = [];
     * bootstrapApplication(AppComponent,
     *   {
     *     providers: [
     *       provideRouter(appRoutes,
     *         withDebugTracing(),
     *         withRouterConfig({paramsInheritanceStrategy: 'always'}))
     *     ]
     *   }
     * );
     * ```
     *
     * @see `RouterFeatures`
     *
     * @publicApi
     * @param routes A set of `Route`s to use for the application routing table.
     * @param features Optional features to configure additional router behaviors.
     * @returns A set of providers to setup a Router.
     */
    function provideRouter(routes, ...features) {
        return i0.makeEnvironmentProviders([
            { provide: ROUTES, multi: true, useValue: routes },
            NG_DEV_MODE$1 ? { provide: ROUTER_IS_PROVIDED, useValue: true } : [],
            { provide: ActivatedRoute, useFactory: rootRoute, deps: [Router] },
            { provide: i0.APP_BOOTSTRAP_LISTENER, multi: true, useFactory: getBootstrapListener },
            features.map(feature => feature.ɵproviders),
            // TODO: All options used by the `assignExtraOptionsToRouter` factory need to be reviewed for
            // how we want them to be configured. This API doesn't currently have a way to configure them
            // and we should decide what the _best_ way to do that is rather than just sticking with the
            // status quo of how it's done today.
        ]);
    }
    function rootRoute(router) {
        return router.routerState.root;
    }
    /**
     * Helper function to create an object that represents a Router feature.
     */
    function routerFeature(kind, providers) {
        return { ɵkind: kind, ɵproviders: providers };
    }
    /**
     * An Injection token used to indicate whether `provideRouter` or `RouterModule.forRoot` was ever
     * called.
     */
    const ROUTER_IS_PROVIDED = new i0.InjectionToken('', { providedIn: 'root', factory: () => false });
    const routerIsProvidedDevModeCheck = {
        provide: i0.ENVIRONMENT_INITIALIZER,
        multi: true,
        useFactory() {
            return () => {
                if (!i0.inject(ROUTER_IS_PROVIDED)) {
                    console.warn('`provideRoutes` was called without `provideRouter` or `RouterModule.forRoot`. ' +
                        'This is likely a mistake.');
                }
            };
        }
    };
    /**
     * Registers a [DI provider](guide/glossary#provider) for a set of routes.
     * @param routes The route configuration to provide.
     *
     * @usageNotes
     *
     * ```
     * @NgModule({
     *   providers: [provideRoutes(ROUTES)]
     * })
     * class LazyLoadedChildModule {}
     * ```
     *
     * @deprecated If necessary, provide routes using the `ROUTES` `InjectionToken`.
     * @see `ROUTES`
     * @publicApi
     */
    function provideRoutes(routes) {
        return [
            { provide: ROUTES, multi: true, useValue: routes },
            NG_DEV_MODE$1 ? routerIsProvidedDevModeCheck : [],
        ];
    }
    /**
     * Enables customizable scrolling behavior for router navigations.
     *
     * @usageNotes
     *
     * Basic example of how you can enable scrolling feature:
     * ```
     * const appRoutes: Routes = [];
     * bootstrapApplication(AppComponent,
     *   {
     *     providers: [
     *       provideRouter(appRoutes, withInMemoryScrolling())
     *     ]
     *   }
     * );
     * ```
     *
     * @see `provideRouter`
     * @see `ViewportScroller`
     *
     * @publicApi
     * @param options Set of configuration parameters to customize scrolling behavior, see
     *     `InMemoryScrollingOptions` for additional information.
     * @returns A set of providers for use with `provideRouter`.
     */
    function withInMemoryScrolling(options = {}) {
        const providers = [{
                provide: ROUTER_SCROLLER,
                useFactory: () => {
                    const router = i0.inject(Router);
                    const viewportScroller = i0.inject(i3.ViewportScroller);
                    const zone = i0.inject(i0.NgZone);
                    return new RouterScroller(router, viewportScroller, zone, options);
                },
            }];
        return routerFeature(4 /* RouterFeatureKind.InMemoryScrollingFeature */, providers);
    }
    function getBootstrapListener() {
        const injector = i0.inject(i0.Injector);
        return (bootstrappedComponentRef) => {
            var _a, _b;
            const ref = injector.get(i0.ApplicationRef);
            if (bootstrappedComponentRef !== ref.components[0]) {
                return;
            }
            const router = injector.get(Router);
            const bootstrapDone = injector.get(BOOTSTRAP_DONE);
            if (injector.get(INITIAL_NAVIGATION) === 1 /* InitialNavigation.EnabledNonBlocking */) {
                router.initialNavigation();
            }
            (_a = injector.get(ROUTER_PRELOADER, null, i0.InjectFlags.Optional)) === null || _a === void 0 ? void 0 : _a.setUpPreloading();
            (_b = injector.get(ROUTER_SCROLLER, null, i0.InjectFlags.Optional)) === null || _b === void 0 ? void 0 : _b.init();
            router.resetRootComponentType(ref.componentTypes[0]);
            if (!bootstrapDone.closed) {
                bootstrapDone.next();
                bootstrapDone.unsubscribe();
            }
        };
    }
    /**
     * A subject used to indicate that the bootstrapping phase is done. When initial navigation is
     * `enabledBlocking`, the first navigation waits until bootstrapping is finished before continuing
     * to the activation phase.
     */
    const BOOTSTRAP_DONE = new i0.InjectionToken(NG_DEV_MODE$1 ? 'bootstrap done indicator' : '', {
        factory: () => {
            return new rxjs.Subject();
        }
    });
    const INITIAL_NAVIGATION = new i0.InjectionToken(NG_DEV_MODE$1 ? 'initial navigation' : '', { providedIn: 'root', factory: () => 1 /* InitialNavigation.EnabledNonBlocking */ });
    /**
     * Configures initial navigation to start before the root component is created.
     *
     * The bootstrap is blocked until the initial navigation is complete. This value is required for
     * [server-side rendering](guide/universal) to work.
     *
     * @usageNotes
     *
     * Basic example of how you can enable this navigation behavior:
     * ```
     * const appRoutes: Routes = [];
     * bootstrapApplication(AppComponent,
     *   {
     *     providers: [
     *       provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
     *     ]
     *   }
     * );
     * ```
     *
     * @see `provideRouter`
     *
     * @publicApi
     * @returns A set of providers for use with `provideRouter`.
     */
    function withEnabledBlockingInitialNavigation() {
        const providers = [
            { provide: INITIAL_NAVIGATION, useValue: 0 /* InitialNavigation.EnabledBlocking */ },
            {
                provide: i0.APP_INITIALIZER,
                multi: true,
                deps: [i0.Injector],
                useFactory: (injector) => {
                    const locationInitialized = injector.get(i3.LOCATION_INITIALIZED, Promise.resolve());
                    /**
                     * Performs the given action once the router finishes its next/current navigation.
                     *
                     * If the navigation is canceled or errors without a redirect, the navigation is considered
                     * complete. If the `NavigationEnd` event emits, the navigation is also considered complete.
                     */
                    function afterNextNavigation(action) {
                        const router = injector.get(Router);
                        router.events
                            .pipe(operators.filter((e) => e instanceof NavigationEnd || e instanceof NavigationCancel ||
                            e instanceof NavigationError), operators.map(e => {
                            if (e instanceof NavigationEnd) {
                                // Navigation assumed to succeed if we get `ActivationStart`
                                return true;
                            }
                            const redirecting = e instanceof NavigationCancel ?
                                (e.code === 0 /* NavigationCancellationCode.Redirect */ ||
                                    e.code === 1 /* NavigationCancellationCode.SupersededByNewNavigation */) :
                                false;
                            return redirecting ? null : false;
                        }), operators.filter((result) => result !== null), operators.take(1))
                            .subscribe(() => {
                            action();
                        });
                    }
                    return () => {
                        return locationInitialized.then(() => {
                            return new Promise(resolve => {
                                const router = injector.get(Router);
                                const bootstrapDone = injector.get(BOOTSTRAP_DONE);
                                afterNextNavigation(() => {
                                    // Unblock APP_INITIALIZER in case the initial navigation was canceled or errored
                                    // without a redirect.
                                    resolve(true);
                                });
                                router.afterPreactivation = () => {
                                    // Unblock APP_INITIALIZER once we get to `afterPreactivation`. At this point, we
                                    // assume activation will complete successfully (even though this is not
                                    // guaranteed).
                                    resolve(true);
                                    return bootstrapDone.closed ? rxjs.of(void 0) : bootstrapDone;
                                };
                                router.initialNavigation();
                            });
                        });
                    };
                }
            },
        ];
        return routerFeature(2 /* RouterFeatureKind.EnabledBlockingInitialNavigationFeature */, providers);
    }
    /**
     * Disables initial navigation.
     *
     * Use if there is a reason to have more control over when the router starts its initial navigation
     * due to some complex initialization logic.
     *
     * @usageNotes
     *
     * Basic example of how you can disable initial navigation:
     * ```
     * const appRoutes: Routes = [];
     * bootstrapApplication(AppComponent,
     *   {
     *     providers: [
     *       provideRouter(appRoutes, withDisabledInitialNavigation())
     *     ]
     *   }
     * );
     * ```
     *
     * @see `provideRouter`
     *
     * @returns A set of providers for use with `provideRouter`.
     *
     * @publicApi
     */
    function withDisabledInitialNavigation() {
        const providers = [
            {
                provide: i0.APP_INITIALIZER,
                multi: true,
                useFactory: () => {
                    const router = i0.inject(Router);
                    return () => {
                        router.setUpLocationChangeListener();
                    };
                }
            },
            { provide: INITIAL_NAVIGATION, useValue: 2 /* InitialNavigation.Disabled */ }
        ];
        return routerFeature(3 /* RouterFeatureKind.DisabledInitialNavigationFeature */, providers);
    }
    /**
     * Enables logging of all internal navigation events to the console.
     * Extra logging might be useful for debugging purposes to inspect Router event sequence.
     *
     * @usageNotes
     *
     * Basic example of how you can enable debug tracing:
     * ```
     * const appRoutes: Routes = [];
     * bootstrapApplication(AppComponent,
     *   {
     *     providers: [
     *       provideRouter(appRoutes, withDebugTracing())
     *     ]
     *   }
     * );
     * ```
     *
     * @see `provideRouter`
     *
     * @returns A set of providers for use with `provideRouter`.
     *
     * @publicApi
     */
    function withDebugTracing() {
        let providers = [];
        if (NG_DEV_MODE$1) {
            providers = [{
                    provide: i0.ENVIRONMENT_INITIALIZER,
                    multi: true,
                    useFactory: () => {
                        const router = i0.inject(Router);
                        return () => router.events.subscribe((e) => {
                            var _a, _b;
                            // tslint:disable:no-console
                            (_a = console.group) === null || _a === void 0 ? void 0 : _a.call(console, `Router Event: ${e.constructor.name}`);
                            console.log(stringifyEvent(e));
                            console.log(e);
                            (_b = console.groupEnd) === null || _b === void 0 ? void 0 : _b.call(console);
                            // tslint:enable:no-console
                        });
                    }
                }];
        }
        else {
            providers = [];
        }
        return routerFeature(1 /* RouterFeatureKind.DebugTracingFeature */, providers);
    }
    const ROUTER_PRELOADER = new i0.InjectionToken(NG_DEV_MODE$1 ? 'router preloader' : '');
    /**
     * Allows to configure a preloading strategy to use. The strategy is configured by providing a
     * reference to a class that implements a `PreloadingStrategy`.
     *
     * @usageNotes
     *
     * Basic example of how you can configure preloading:
     * ```
     * const appRoutes: Routes = [];
     * bootstrapApplication(AppComponent,
     *   {
     *     providers: [
     *       provideRouter(appRoutes, withPreloading(PreloadAllModules))
     *     ]
     *   }
     * );
     * ```
     *
     * @see `provideRouter`
     *
     * @param preloadingStrategy A reference to a class that implements a `PreloadingStrategy` that
     *     should be used.
     * @returns A set of providers for use with `provideRouter`.
     *
     * @publicApi
     */
    function withPreloading(preloadingStrategy) {
        const providers = [
            { provide: ROUTER_PRELOADER, useExisting: RouterPreloader },
            { provide: PreloadingStrategy, useExisting: preloadingStrategy },
        ];
        return routerFeature(0 /* RouterFeatureKind.PreloadingFeature */, providers);
    }
    /**
     * Allows to provide extra parameters to configure Router.
     *
     * @usageNotes
     *
     * Basic example of how you can provide extra configuration options:
     * ```
     * const appRoutes: Routes = [];
     * bootstrapApplication(AppComponent,
     *   {
     *     providers: [
     *       provideRouter(appRoutes, withRouterConfig({
     *          onSameUrlNavigation: 'reload'
     *       }))
     *     ]
     *   }
     * );
     * ```
     *
     * @see `provideRouter`
     *
     * @param options A set of parameters to configure Router, see `RouterConfigOptions` for
     *     additional information.
     * @returns A set of providers for use with `provideRouter`.
     *
     * @publicApi
     */
    function withRouterConfig(options) {
        const providers = [
            { provide: ROUTER_CONFIGURATION, useValue: options },
        ];
        return routerFeature(5 /* RouterFeatureKind.RouterConfigurationFeature */, providers);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_DEV_MODE = typeof ngDevMode === 'undefined' || ngDevMode;
    /**
     * The directives defined in the `RouterModule`.
     */
    const ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkActive, ɵEmptyOutletComponent];
    /**
     * @docsNotRequired
     */
    const ROUTER_FORROOT_GUARD = new i0.InjectionToken(NG_DEV_MODE ? 'router duplicate forRoot guard' : 'ROUTER_FORROOT_GUARD');
    // TODO(atscott): All of these except `ActivatedRoute` are `providedIn: 'root'`. They are only kept
    // here to avoid a breaking change whereby the provider order matters based on where the
    // `RouterModule`/`RouterTestingModule` is imported. These can/should be removed as a "breaking"
    // change in a major version.
    const ROUTER_PROVIDERS = [
        i3.Location,
        { provide: UrlSerializer, useClass: DefaultUrlSerializer },
        { provide: Router, useFactory: setupRouter },
        ChildrenOutletContexts,
        { provide: ActivatedRoute, useFactory: rootRoute, deps: [Router] },
        RouterConfigLoader,
        // Only used to warn when `provideRoutes` is used without `RouterModule` or `provideRouter`. Can
        // be removed when `provideRoutes` is removed.
        NG_DEV_MODE ? { provide: ROUTER_IS_PROVIDED, useValue: true } : [],
    ];
    function routerNgProbeToken() {
        return new i0.NgProbeToken('Router', Router);
    }
    /**
     * @description
     *
     * Adds directives and providers for in-app navigation among views defined in an application.
     * Use the Angular `Router` service to declaratively specify application states and manage state
     * transitions.
     *
     * You can import this NgModule multiple times, once for each lazy-loaded bundle.
     * However, only one `Router` service can be active.
     * To ensure this, there are two ways to register routes when importing this module:
     *
     * * The `forRoot()` method creates an `NgModule` that contains all the directives, the given
     * routes, and the `Router` service itself.
     * * The `forChild()` method creates an `NgModule` that contains all the directives and the given
     * routes, but does not include the `Router` service.
     *
     * @see [Routing and Navigation guide](guide/router) for an
     * overview of how the `Router` service should be used.
     *
     * @publicApi
     */
    class RouterModule {
        constructor(guard) { }
        /**
         * Creates and configures a module with all the router providers and directives.
         * Optionally sets up an application listener to perform an initial navigation.
         *
         * When registering the NgModule at the root, import as follows:
         *
         * ```
         * @NgModule({
         *   imports: [RouterModule.forRoot(ROUTES)]
         * })
         * class MyNgModule {}
         * ```
         *
         * @param routes An array of `Route` objects that define the navigation paths for the application.
         * @param config An `ExtraOptions` configuration object that controls how navigation is performed.
         * @return The new `NgModule`.
         *
         */
        static forRoot(routes, config) {
            return {
                ngModule: RouterModule,
                providers: [
                    ROUTER_PROVIDERS,
                    NG_DEV_MODE ? ((config === null || config === void 0 ? void 0 : config.enableTracing) ? withDebugTracing().ɵproviders : []) : [],
                    { provide: ROUTES, multi: true, useValue: routes },
                    {
                        provide: ROUTER_FORROOT_GUARD,
                        useFactory: provideForRootGuard,
                        deps: [[Router, new i0.Optional(), new i0.SkipSelf()]]
                    },
                    { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} },
                    (config === null || config === void 0 ? void 0 : config.useHash) ? provideHashLocationStrategy() : providePathLocationStrategy(),
                    provideRouterScroller(),
                    (config === null || config === void 0 ? void 0 : config.preloadingStrategy) ? withPreloading(config.preloadingStrategy).ɵproviders : [],
                    { provide: i0.NgProbeToken, multi: true, useFactory: routerNgProbeToken },
                    (config === null || config === void 0 ? void 0 : config.initialNavigation) ? provideInitialNavigation(config) : [],
                    provideRouterInitializer(),
                ],
            };
        }
        /**
         * Creates a module with all the router directives and a provider registering routes,
         * without creating a new Router service.
         * When registering for submodules and lazy-loaded submodules, create the NgModule as follows:
         *
         * ```
         * @NgModule({
         *   imports: [RouterModule.forChild(ROUTES)]
         * })
         * class MyNgModule {}
         * ```
         *
         * @param routes An array of `Route` objects that define the navigation paths for the submodule.
         * @return The new NgModule.
         *
         */
        static forChild(routes) {
            return {
                ngModule: RouterModule,
                providers: [{ provide: ROUTES, multi: true, useValue: routes }],
            };
        }
    }
    RouterModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterModule, deps: [{ token: ROUTER_FORROOT_GUARD, optional: true }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RouterModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterModule, imports: [RouterOutlet, RouterLink, RouterLinkActive, ɵEmptyOutletComponent], exports: [RouterOutlet, RouterLink, RouterLinkActive, ɵEmptyOutletComponent] });
    RouterModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterModule, imports: [ɵEmptyOutletComponent] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: RouterModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: ROUTER_DIRECTIVES,
                        exports: ROUTER_DIRECTIVES,
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [ROUTER_FORROOT_GUARD]
                        }] }];
        } });
    /**
     * For internal use by `RouterModule` only. Note that this differs from `withInMemoryRouterScroller`
     * because it reads from the `ExtraOptions` which should not be used in the standalone world.
     */
    function provideRouterScroller() {
        return {
            provide: ROUTER_SCROLLER,
            useFactory: () => {
                const router = i0.inject(Router);
                const viewportScroller = i0.inject(i3.ViewportScroller);
                const zone = i0.inject(i0.NgZone);
                const config = i0.inject(ROUTER_CONFIGURATION);
                if (config.scrollOffset) {
                    viewportScroller.setOffset(config.scrollOffset);
                }
                return new RouterScroller(router, viewportScroller, zone, config);
            },
        };
    }
    // Note: For internal use only with `RouterModule`. Standalone setup via `provideRouter` should
    // provide hash location directly via `{provide: LocationStrategy, useClass: HashLocationStrategy}`.
    function provideHashLocationStrategy() {
        return { provide: i3.LocationStrategy, useClass: i3.HashLocationStrategy };
    }
    // Note: For internal use only with `RouterModule`. Standalone setup via `provideRouter` does not
    // need this at all because `PathLocationStrategy` is the default factory for `LocationStrategy`.
    function providePathLocationStrategy() {
        return { provide: i3.LocationStrategy, useClass: i3.PathLocationStrategy };
    }
    function provideForRootGuard(router) {
        if (NG_DEV_MODE && router) {
            throw new i0["ɵRuntimeError"](4007 /* RuntimeErrorCode.FOR_ROOT_CALLED_TWICE */, `The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector.` +
                ` Lazy loaded modules should use RouterModule.forChild() instead.`);
        }
        return 'guarded';
    }
    // Note: For internal use only with `RouterModule`. Standalone router setup with `provideRouter`
    // users call `withXInitialNavigation` directly.
    function provideInitialNavigation(config) {
        return [
            config.initialNavigation === 'disabled' ? withDisabledInitialNavigation().ɵproviders : [],
            config.initialNavigation === 'enabledBlocking' ?
                withEnabledBlockingInitialNavigation().ɵproviders :
                [],
        ];
    }
    // TODO(atscott): This should not be in the public API
    /**
     * A [DI token](guide/glossary/#di-token) for the router initializer that
     * is called after the app is bootstrapped.
     *
     * @publicApi
     */
    const ROUTER_INITIALIZER = new i0.InjectionToken(NG_DEV_MODE ? 'Router Initializer' : '');
    function provideRouterInitializer() {
        return [
            // ROUTER_INITIALIZER token should be removed. It's public API but shouldn't be. We can just
            // have `getBootstrapListener` directly attached to APP_BOOTSTRAP_LISTENER.
            { provide: ROUTER_INITIALIZER, useFactory: getBootstrapListener },
            { provide: i0.APP_BOOTSTRAP_LISTENER, multi: true, useExisting: ROUTER_INITIALIZER },
        ];
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @publicApi
     */
    const VERSION = new i0.Version('15.0.1');

    exports.ActivatedRoute = ActivatedRoute;
    exports.ActivatedRouteSnapshot = ActivatedRouteSnapshot;
    exports.ActivationEnd = ActivationEnd;
    exports.ActivationStart = ActivationStart;
    exports.BaseRouteReuseStrategy = BaseRouteReuseStrategy;
    exports.ChildActivationEnd = ChildActivationEnd;
    exports.ChildActivationStart = ChildActivationStart;
    exports.ChildrenOutletContexts = ChildrenOutletContexts;
    exports.DefaultTitleStrategy = DefaultTitleStrategy;
    exports.DefaultUrlSerializer = DefaultUrlSerializer;
    exports.GuardsCheckEnd = GuardsCheckEnd;
    exports.GuardsCheckStart = GuardsCheckStart;
    exports.NavigationCancel = NavigationCancel;
    exports.NavigationEnd = NavigationEnd;
    exports.NavigationError = NavigationError;
    exports.NavigationStart = NavigationStart;
    exports.NoPreloading = NoPreloading;
    exports.OutletContext = OutletContext;
    exports.PRIMARY_OUTLET = PRIMARY_OUTLET;
    exports.PreloadAllModules = PreloadAllModules;
    exports.PreloadingStrategy = PreloadingStrategy;
    exports.ROUTER_CONFIGURATION = ROUTER_CONFIGURATION;
    exports.ROUTER_INITIALIZER = ROUTER_INITIALIZER;
    exports.ROUTES = ROUTES;
    exports.ResolveEnd = ResolveEnd;
    exports.ResolveStart = ResolveStart;
    exports.RouteConfigLoadEnd = RouteConfigLoadEnd;
    exports.RouteConfigLoadStart = RouteConfigLoadStart;
    exports.RouteReuseStrategy = RouteReuseStrategy;
    exports.Router = Router;
    exports.RouterEvent = RouterEvent;
    exports.RouterLink = RouterLink;
    exports.RouterLinkActive = RouterLinkActive;
    exports.RouterLinkWithHref = RouterLink;
    exports.RouterModule = RouterModule;
    exports.RouterOutlet = RouterOutlet;
    exports.RouterPreloader = RouterPreloader;
    exports.RouterState = RouterState;
    exports.RouterStateSnapshot = RouterStateSnapshot;
    exports.RoutesRecognized = RoutesRecognized;
    exports.Scroll = Scroll;
    exports.TitleStrategy = TitleStrategy;
    exports.UrlHandlingStrategy = UrlHandlingStrategy;
    exports.UrlSegment = UrlSegment;
    exports.UrlSegmentGroup = UrlSegmentGroup;
    exports.UrlSerializer = UrlSerializer;
    exports.UrlTree = UrlTree;
    exports.VERSION = VERSION;
    exports.convertToParamMap = convertToParamMap;
    exports.createUrlTreeFromSnapshot = createUrlTreeFromSnapshot;
    exports.defaultUrlMatcher = defaultUrlMatcher;
    exports.provideRouter = provideRouter;
    exports.provideRoutes = provideRoutes;
    exports.withDebugTracing = withDebugTracing;
    exports.withDisabledInitialNavigation = withDisabledInitialNavigation;
    exports.withEnabledBlockingInitialNavigation = withEnabledBlockingInitialNavigation;
    exports.withInMemoryScrolling = withInMemoryScrolling;
    exports.withPreloading = withPreloading;
    exports.withRouterConfig = withRouterConfig;
    exports["ɵEmptyOutletComponent"] = ɵEmptyOutletComponent;
    exports["ɵROUTER_PROVIDERS"] = ROUTER_PROVIDERS;
    exports["ɵassignExtraOptionsToRouter"] = assignExtraOptionsToRouter;
    exports["ɵflatten"] = flatten;
    exports["ɵwithPreloading"] = withPreloading;

}));
