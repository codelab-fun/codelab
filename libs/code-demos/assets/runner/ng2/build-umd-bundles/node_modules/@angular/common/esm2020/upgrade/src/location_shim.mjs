/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ReplaySubject } from 'rxjs';
import { deepEqual, isAnchor, isPromise } from './utils';
const PATH_MATCH = /^([^?#]*)(\?([^#]*))?(#(.*))?$/;
const DOUBLE_SLASH_REGEX = /^\s*[\\/]{2,}/;
const IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
const DEFAULT_PORTS = {
    'http:': 80,
    'https:': 443,
    'ftp:': 21
};
/**
 * Location service that provides a drop-in replacement for the $location service
 * provided in AngularJS.
 *
 * @see [Using the Angular Unified Location Service](guide/upgrade#using-the-unified-angular-location-service)
 *
 * @publicApi
 */
export class $locationShim {
    constructor($injector, location, platformLocation, urlCodec, locationStrategy) {
        this.location = location;
        this.platformLocation = platformLocation;
        this.urlCodec = urlCodec;
        this.locationStrategy = locationStrategy;
        this.initializing = true;
        this.updateBrowser = false;
        this.$$absUrl = '';
        this.$$url = '';
        this.$$host = '';
        this.$$replace = false;
        this.$$path = '';
        this.$$search = '';
        this.$$hash = '';
        this.$$changeListeners = [];
        this.cachedState = null;
        this.urlChanges = new ReplaySubject(1);
        this.lastBrowserUrl = '';
        // This variable should be used *only* inside the cacheState function.
        this.lastCachedState = null;
        const initialUrl = this.browserUrl();
        let parsedUrl = this.urlCodec.parse(initialUrl);
        if (typeof parsedUrl === 'string') {
            throw 'Invalid URL';
        }
        this.$$protocol = parsedUrl.protocol;
        this.$$host = parsedUrl.hostname;
        this.$$port = parseInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;
        this.$$parseLinkUrl(initialUrl, initialUrl);
        this.cacheState();
        this.$$state = this.browserState();
        this.location.onUrlChange((newUrl, newState) => {
            this.urlChanges.next({ newUrl, newState });
        });
        if (isPromise($injector)) {
            $injector.then($i => this.initialize($i));
        }
        else {
            this.initialize($injector);
        }
    }
    initialize($injector) {
        const $rootScope = $injector.get('$rootScope');
        const $rootElement = $injector.get('$rootElement');
        $rootElement.on('click', (event) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2 ||
                event.button === 2) {
                return;
            }
            let elm = event.target;
            // traverse the DOM up to find first A tag
            while (elm && elm.nodeName.toLowerCase() !== 'a') {
                // ignore rewriting if no A tag (reached root element, or no parent - removed from document)
                if (elm === $rootElement[0] || !(elm = elm.parentNode)) {
                    return;
                }
            }
            if (!isAnchor(elm)) {
                return;
            }
            const absHref = elm.href;
            const relHref = elm.getAttribute('href');
            // Ignore when url is started with javascript: or mailto:
            if (IGNORE_URI_REGEXP.test(absHref)) {
                return;
            }
            if (absHref && !elm.getAttribute('target') && !event.isDefaultPrevented()) {
                if (this.$$parseLinkUrl(absHref, relHref)) {
                    // We do a preventDefault for all urls that are part of the AngularJS application,
                    // in html5mode and also without, so that we are able to abort navigation without
                    // getting double entries in the location history.
                    event.preventDefault();
                    // update location manually
                    if (this.absUrl() !== this.browserUrl()) {
                        $rootScope.$apply();
                    }
                }
            }
        });
        this.urlChanges.subscribe(({ newUrl, newState }) => {
            const oldUrl = this.absUrl();
            const oldState = this.$$state;
            this.$$parse(newUrl);
            newUrl = this.absUrl();
            this.$$state = newState;
            const defaultPrevented = $rootScope.$broadcast('$locationChangeStart', newUrl, oldUrl, newState, oldState)
                .defaultPrevented;
            // if the location was changed by a `$locationChangeStart` handler then stop
            // processing this location change
            if (this.absUrl() !== newUrl)
                return;
            // If default was prevented, set back to old state. This is the state that was locally
            // cached in the $location service.
            if (defaultPrevented) {
                this.$$parse(oldUrl);
                this.state(oldState);
                this.setBrowserUrlWithFallback(oldUrl, false, oldState);
                this.$$notifyChangeListeners(this.url(), this.$$state, oldUrl, oldState);
            }
            else {
                this.initializing = false;
                $rootScope.$broadcast('$locationChangeSuccess', newUrl, oldUrl, newState, oldState);
                this.resetBrowserUpdate();
            }
            if (!$rootScope.$$phase) {
                $rootScope.$digest();
            }
        });
        // update browser
        $rootScope.$watch(() => {
            if (this.initializing || this.updateBrowser) {
                this.updateBrowser = false;
                const oldUrl = this.browserUrl();
                const newUrl = this.absUrl();
                const oldState = this.browserState();
                let currentReplace = this.$$replace;
                const urlOrStateChanged = !this.urlCodec.areEqual(oldUrl, newUrl) || oldState !== this.$$state;
                // Fire location changes one time to on initialization. This must be done on the
                // next tick (thus inside $evalAsync()) in order for listeners to be registered
                // before the event fires. Mimicing behavior from $locationWatch:
                // https://github.com/angular/angular.js/blob/master/src/ng/location.js#L983
                if (this.initializing || urlOrStateChanged) {
                    this.initializing = false;
                    $rootScope.$evalAsync(() => {
                        // Get the new URL again since it could have changed due to async update
                        const newUrl = this.absUrl();
                        const defaultPrevented = $rootScope
                            .$broadcast('$locationChangeStart', newUrl, oldUrl, this.$$state, oldState)
                            .defaultPrevented;
                        // if the location was changed by a `$locationChangeStart` handler then stop
                        // processing this location change
                        if (this.absUrl() !== newUrl)
                            return;
                        if (defaultPrevented) {
                            this.$$parse(oldUrl);
                            this.$$state = oldState;
                        }
                        else {
                            // This block doesn't run when initializing because it's going to perform the update
                            // to the URL which shouldn't be needed when initializing.
                            if (urlOrStateChanged) {
                                this.setBrowserUrlWithFallback(newUrl, currentReplace, oldState === this.$$state ? null : this.$$state);
                                this.$$replace = false;
                            }
                            $rootScope.$broadcast('$locationChangeSuccess', newUrl, oldUrl, this.$$state, oldState);
                            if (urlOrStateChanged) {
                                this.$$notifyChangeListeners(this.url(), this.$$state, oldUrl, oldState);
                            }
                        }
                    });
                }
            }
            this.$$replace = false;
        });
    }
    resetBrowserUpdate() {
        this.$$replace = false;
        this.$$state = this.browserState();
        this.updateBrowser = false;
        this.lastBrowserUrl = this.browserUrl();
    }
    browserUrl(url, replace, state) {
        // In modern browsers `history.state` is `null` by default; treating it separately
        // from `undefined` would cause `$browser.url('/foo')` to change `history.state`
        // to undefined via `pushState`. Instead, let's change `undefined` to `null` here.
        if (typeof state === 'undefined') {
            state = null;
        }
        // setter
        if (url) {
            let sameState = this.lastHistoryState === state;
            // Normalize the inputted URL
            url = this.urlCodec.parse(url).href;
            // Don't change anything if previous and current URLs and states match.
            if (this.lastBrowserUrl === url && sameState) {
                return this;
            }
            this.lastBrowserUrl = url;
            this.lastHistoryState = state;
            // Remove server base from URL as the Angular APIs for updating URL require
            // it to be the path+.
            url = this.stripBaseUrl(this.getServerBase(), url) || url;
            // Set the URL
            if (replace) {
                this.locationStrategy.replaceState(state, '', url, '');
            }
            else {
                this.locationStrategy.pushState(state, '', url, '');
            }
            this.cacheState();
            return this;
            // getter
        }
        else {
            return this.platformLocation.href;
        }
    }
    cacheState() {
        // This should be the only place in $browser where `history.state` is read.
        this.cachedState = this.platformLocation.getState();
        if (typeof this.cachedState === 'undefined') {
            this.cachedState = null;
        }
        // Prevent callbacks fo fire twice if both hashchange & popstate were fired.
        if (deepEqual(this.cachedState, this.lastCachedState)) {
            this.cachedState = this.lastCachedState;
        }
        this.lastCachedState = this.cachedState;
        this.lastHistoryState = this.cachedState;
    }
    /**
     * This function emulates the $browser.state() function from AngularJS. It will cause
     * history.state to be cached unless changed with deep equality check.
     */
    browserState() {
        return this.cachedState;
    }
    stripBaseUrl(base, url) {
        if (url.startsWith(base)) {
            return url.slice(base.length);
        }
        return undefined;
    }
    getServerBase() {
        const { protocol, hostname, port } = this.platformLocation;
        const baseHref = this.locationStrategy.getBaseHref();
        let url = `${protocol}//${hostname}${port ? ':' + port : ''}${baseHref || '/'}`;
        return url.endsWith('/') ? url : url + '/';
    }
    parseAppUrl(url) {
        if (DOUBLE_SLASH_REGEX.test(url)) {
            throw new Error(`Bad Path - URL cannot start with double slashes: ${url}`);
        }
        let prefixed = (url.charAt(0) !== '/');
        if (prefixed) {
            url = '/' + url;
        }
        let match = this.urlCodec.parse(url, this.getServerBase());
        if (typeof match === 'string') {
            throw new Error(`Bad URL - Cannot parse URL: ${url}`);
        }
        let path = prefixed && match.pathname.charAt(0) === '/' ? match.pathname.substring(1) : match.pathname;
        this.$$path = this.urlCodec.decodePath(path);
        this.$$search = this.urlCodec.decodeSearch(match.search);
        this.$$hash = this.urlCodec.decodeHash(match.hash);
        // make sure path starts with '/';
        if (this.$$path && this.$$path.charAt(0) !== '/') {
            this.$$path = '/' + this.$$path;
        }
    }
    /**
     * Registers listeners for URL changes. This API is used to catch updates performed by the
     * AngularJS framework. These changes are a subset of the `$locationChangeStart` and
     * `$locationChangeSuccess` events which fire when AngularJS updates its internally-referenced
     * version of the browser URL.
     *
     * It's possible for `$locationChange` events to happen, but for the browser URL
     * (window.location) to remain unchanged. This `onChange` callback will fire only when AngularJS
     * actually updates the browser URL (window.location).
     *
     * @param fn The callback function that is triggered for the listener when the URL changes.
     * @param err The callback function that is triggered when an error occurs.
     */
    onChange(fn, err = (e) => { }) {
        this.$$changeListeners.push([fn, err]);
    }
    /** @internal */
    $$notifyChangeListeners(url = '', state, oldUrl = '', oldState) {
        this.$$changeListeners.forEach(([fn, err]) => {
            try {
                fn(url, state, oldUrl, oldState);
            }
            catch (e) {
                err(e);
            }
        });
    }
    /**
     * Parses the provided URL, and sets the current URL to the parsed result.
     *
     * @param url The URL string.
     */
    $$parse(url) {
        let pathUrl;
        if (url.startsWith('/')) {
            pathUrl = url;
        }
        else {
            // Remove protocol & hostname if URL starts with it
            pathUrl = this.stripBaseUrl(this.getServerBase(), url);
        }
        if (typeof pathUrl === 'undefined') {
            throw new Error(`Invalid url "${url}", missing path prefix "${this.getServerBase()}".`);
        }
        this.parseAppUrl(pathUrl);
        if (!this.$$path) {
            this.$$path = '/';
        }
        this.composeUrls();
    }
    /**
     * Parses the provided URL and its relative URL.
     *
     * @param url The full URL string.
     * @param relHref A URL string relative to the full URL string.
     */
    $$parseLinkUrl(url, relHref) {
        // When relHref is passed, it should be a hash and is handled separately
        if (relHref && relHref[0] === '#') {
            this.hash(relHref.slice(1));
            return true;
        }
        let rewrittenUrl;
        let appUrl = this.stripBaseUrl(this.getServerBase(), url);
        if (typeof appUrl !== 'undefined') {
            rewrittenUrl = this.getServerBase() + appUrl;
        }
        else if (this.getServerBase() === url + '/') {
            rewrittenUrl = this.getServerBase();
        }
        // Set the URL
        if (rewrittenUrl) {
            this.$$parse(rewrittenUrl);
        }
        return !!rewrittenUrl;
    }
    setBrowserUrlWithFallback(url, replace, state) {
        const oldUrl = this.url();
        const oldState = this.$$state;
        try {
            this.browserUrl(url, replace, state);
            // Make sure $location.state() returns referentially identical (not just deeply equal)
            // state object; this makes possible quick checking if the state changed in the digest
            // loop. Checking deep equality would be too expensive.
            this.$$state = this.browserState();
        }
        catch (e) {
            // Restore old values if pushState fails
            this.url(oldUrl);
            this.$$state = oldState;
            throw e;
        }
    }
    composeUrls() {
        this.$$url = this.urlCodec.normalize(this.$$path, this.$$search, this.$$hash);
        this.$$absUrl = this.getServerBase() + this.$$url.slice(1); // remove '/' from front of URL
        this.updateBrowser = true;
    }
    /**
     * Retrieves the full URL representation with all segments encoded according to
     * rules specified in
     * [RFC 3986](https://tools.ietf.org/html/rfc3986).
     *
     *
     * ```js
     * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
     * let absUrl = $location.absUrl();
     * // => "http://example.com/#/some/path?foo=bar&baz=xoxo"
     * ```
     */
    absUrl() {
        return this.$$absUrl;
    }
    url(url) {
        if (typeof url === 'string') {
            if (!url.length) {
                url = '/';
            }
            const match = PATH_MATCH.exec(url);
            if (!match)
                return this;
            if (match[1] || url === '')
                this.path(this.urlCodec.decodePath(match[1]));
            if (match[2] || match[1] || url === '')
                this.search(match[3] || '');
            this.hash(match[5] || '');
            // Chainable method
            return this;
        }
        return this.$$url;
    }
    /**
     * Retrieves the protocol of the current URL.
     *
     * ```js
     * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
     * let protocol = $location.protocol();
     * // => "http"
     * ```
     */
    protocol() {
        return this.$$protocol;
    }
    /**
     * Retrieves the protocol of the current URL.
     *
     * In contrast to the non-AngularJS version `location.host` which returns `hostname:port`, this
     * returns the `hostname` portion only.
     *
     *
     * ```js
     * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
     * let host = $location.host();
     * // => "example.com"
     *
     * // given URL http://user:password@example.com:8080/#/some/path?foo=bar&baz=xoxo
     * host = $location.host();
     * // => "example.com"
     * host = location.host;
     * // => "example.com:8080"
     * ```
     */
    host() {
        return this.$$host;
    }
    /**
     * Retrieves the port of the current URL.
     *
     * ```js
     * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
     * let port = $location.port();
     * // => 80
     * ```
     */
    port() {
        return this.$$port;
    }
    path(path) {
        if (typeof path === 'undefined') {
            return this.$$path;
        }
        // null path converts to empty string. Prepend with "/" if needed.
        path = path !== null ? path.toString() : '';
        path = path.charAt(0) === '/' ? path : '/' + path;
        this.$$path = path;
        this.composeUrls();
        return this;
    }
    search(search, paramValue) {
        switch (arguments.length) {
            case 0:
                return this.$$search;
            case 1:
                if (typeof search === 'string' || typeof search === 'number') {
                    this.$$search = this.urlCodec.decodeSearch(search.toString());
                }
                else if (typeof search === 'object' && search !== null) {
                    // Copy the object so it's never mutated
                    search = { ...search };
                    // remove object undefined or null properties
                    for (const key in search) {
                        if (search[key] == null)
                            delete search[key];
                    }
                    this.$$search = search;
                }
                else {
                    throw new Error('LocationProvider.search(): First argument must be a string or an object.');
                }
                break;
            default:
                if (typeof search === 'string') {
                    const currentSearch = this.search();
                    if (typeof paramValue === 'undefined' || paramValue === null) {
                        delete currentSearch[search];
                        return this.search(currentSearch);
                    }
                    else {
                        currentSearch[search] = paramValue;
                        return this.search(currentSearch);
                    }
                }
        }
        this.composeUrls();
        return this;
    }
    hash(hash) {
        if (typeof hash === 'undefined') {
            return this.$$hash;
        }
        this.$$hash = hash !== null ? hash.toString() : '';
        this.composeUrls();
        return this;
    }
    /**
     * Changes to `$location` during the current `$digest` will replace the current
     * history record, instead of adding a new one.
     */
    replace() {
        this.$$replace = true;
        return this;
    }
    state(state) {
        if (typeof state === 'undefined') {
            return this.$$state;
        }
        this.$$state = state;
        return this;
    }
}
/**
 * The factory function used to create an instance of the `$locationShim` in Angular,
 * and provides an API-compatible `$locationProvider` for AngularJS.
 *
 * @publicApi
 */
export class $locationShimProvider {
    constructor(ngUpgrade, location, platformLocation, urlCodec, locationStrategy) {
        this.ngUpgrade = ngUpgrade;
        this.location = location;
        this.platformLocation = platformLocation;
        this.urlCodec = urlCodec;
        this.locationStrategy = locationStrategy;
    }
    /**
     * Factory method that returns an instance of the $locationShim
     */
    $get() {
        return new $locationShim(this.ngUpgrade.$injector, this.location, this.platformLocation, this.urlCodec, this.locationStrategy);
    }
    /**
     * Stub method used to keep API compatible with AngularJS. This setting is configured through
     * the LocationUpgradeModule's `config` method in your Angular app.
     */
    hashPrefix(prefix) {
        throw new Error('Configure LocationUpgrade through LocationUpgradeModule.config method.');
    }
    /**
     * Stub method used to keep API compatible with AngularJS. This setting is configured through
     * the LocationUpgradeModule's `config` method in your Angular app.
     */
    html5Mode(mode) {
        throw new Error('Configure LocationUpgrade through LocationUpgradeModule.config method.');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fc2hpbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi91cGdyYWRlL3NyYy9sb2NhdGlvbl9zaGltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUlILE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHbkMsT0FBTyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRXZELE1BQU0sVUFBVSxHQUFHLGdDQUFnQyxDQUFDO0FBQ3BELE1BQU0sa0JBQWtCLEdBQUcsZUFBZSxDQUFDO0FBQzNDLE1BQU0saUJBQWlCLEdBQUcsMkJBQTJCLENBQUM7QUFDdEQsTUFBTSxhQUFhLEdBQTRCO0lBQzdDLE9BQU8sRUFBRSxFQUFFO0lBQ1gsUUFBUSxFQUFFLEdBQUc7SUFDYixNQUFNLEVBQUUsRUFBRTtDQUNYLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLGFBQWE7SUF1QnhCLFlBQ0ksU0FBYyxFQUFVLFFBQWtCLEVBQVUsZ0JBQWtDLEVBQzlFLFFBQWtCLEVBQVUsZ0JBQWtDO1FBRDlDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzlFLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBeEJsRSxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFFbkIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixX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Q0gsSUFBSTtRQUNGLE9BQU8sSUFBSSxhQUFhLENBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLEVBQzdFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUMsTUFBZTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVMsQ0FBQyxJQUFVO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztJQUM1RixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbiwgTG9jYXRpb25TdHJhdGVneSwgUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7VXBncmFkZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvdXBncmFkZS9zdGF0aWMnO1xuaW1wb3J0IHtSZXBsYXlTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtVcmxDb2RlY30gZnJvbSAnLi9wYXJhbXMnO1xuaW1wb3J0IHtkZWVwRXF1YWwsIGlzQW5jaG9yLCBpc1Byb21pc2V9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBQQVRIX01BVENIID0gL14oW14/I10qKShcXD8oW14jXSopKT8oIyguKikpPyQvO1xuY29uc3QgRE9VQkxFX1NMQVNIX1JFR0VYID0gL15cXHMqW1xcXFwvXXsyLH0vO1xuY29uc3QgSUdOT1JFX1VSSV9SRUdFWFAgPSAvXlxccyooamF2YXNjcmlwdHxtYWlsdG8pOi9pO1xuY29uc3QgREVGQVVMVF9QT1JUUzoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7XG4gICdodHRwOic6IDgwLFxuICAnaHR0cHM6JzogNDQzLFxuICAnZnRwOic6IDIxXG59O1xuXG4vKipcbiAqIExvY2F0aW9uIHNlcnZpY2UgdGhhdCBwcm92aWRlcyBhIGRyb3AtaW4gcmVwbGFjZW1lbnQgZm9yIHRoZSAkbG9jYXRpb24gc2VydmljZVxuICogcHJvdmlkZWQgaW4gQW5ndWxhckpTLlxuICpcbiAqIEBzZWUgW1VzaW5nIHRoZSBBbmd1bGFyIFVuaWZpZWQgTG9jYXRpb24gU2VydmljZV0oZ3VpZGUvdXBncmFkZSN1c2luZy10aGUtdW5pZmllZC1hbmd1bGFyLWxvY2F0aW9uLXNlcnZpY2UpXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgJGxvY2F0aW9uU2hpbSB7XG4gIHByaXZhdGUgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgcHJpdmF0ZSB1cGRhdGVCcm93c2VyID0gZmFsc2U7XG4gIHByaXZhdGUgJCRhYnNVcmw6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlICQkdXJsOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSAkJHByb3RvY29sOiBzdHJpbmc7XG4gIHByaXZhdGUgJCRob3N0OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSAkJHBvcnQ6IG51bWJlcnxudWxsO1xuICBwcml2YXRlICQkcmVwbGFjZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlICQkcGF0aDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgJCRzZWFyY2g6IGFueSA9ICcnO1xuICBwcml2YXRlICQkaGFzaDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgJCRzdGF0ZTogdW5rbm93bjtcbiAgcHJpdmF0ZSAkJGNoYW5nZUxpc3RlbmVyczogW1xuICAgICgodXJsOiBzdHJpbmcsIHN0YXRlOiB1bmtub3duLCBvbGRVcmw6IHN0cmluZywgb2xkU3RhdGU6IHVua25vd24sIGVycj86IChlOiBFcnJvcikgPT4gdm9pZCkgPT5cbiAgICAgICAgIHZvaWQpLFxuICAgIChlOiBFcnJvcikgPT4gdm9pZFxuICBdW10gPSBbXTtcblxuICBwcml2YXRlIGNhY2hlZFN0YXRlOiB1bmtub3duID0gbnVsbDtcblxuICBwcml2YXRlIHVybENoYW5nZXMgPSBuZXcgUmVwbGF5U3ViamVjdDx7bmV3VXJsOiBzdHJpbmcsIG5ld1N0YXRlOiB1bmtub3dufT4oMSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICAkaW5qZWN0b3I6IGFueSwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgcGxhdGZvcm1Mb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICAgIHByaXZhdGUgdXJsQ29kZWM6IFVybENvZGVjLCBwcml2YXRlIGxvY2F0aW9uU3RyYXRlZ3k6IExvY2F0aW9uU3RyYXRlZ3kpIHtcbiAgICBjb25zdCBpbml0aWFsVXJsID0gdGhpcy5icm93c2VyVXJsKCk7XG5cbiAgICBsZXQgcGFyc2VkVXJsID0gdGhpcy51cmxDb2RlYy5wYXJzZShpbml0aWFsVXJsKTtcblxuICAgIGlmICh0eXBlb2YgcGFyc2VkVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgJ0ludmFsaWQgVVJMJztcbiAgICB9XG5cbiAgICB0aGlzLiQkcHJvdG9jb2wgPSBwYXJzZWRVcmwucHJvdG9jb2w7XG4gICAgdGhpcy4kJGhvc3QgPSBwYXJzZWRVcmwuaG9zdG5hbWU7XG4gICAgdGhpcy4kJHBvcnQgPSBwYXJzZUludChwYXJzZWRVcmwucG9ydCkgfHwgREVGQVVMVF9QT1JUU1twYXJzZWRVcmwucHJvdG9jb2xdIHx8IG51bGw7XG5cbiAgICB0aGlzLiQkcGFyc2VMaW5rVXJsKGluaXRpYWxVcmwsIGluaXRpYWxVcmwpO1xuICAgIHRoaXMuY2FjaGVTdGF0ZSgpO1xuICAgIHRoaXMuJCRzdGF0ZSA9IHRoaXMuYnJvd3NlclN0YXRlKCk7XG5cbiAgICB0aGlzLmxvY2F0aW9uLm9uVXJsQ2hhbmdlKChuZXdVcmwsIG5ld1N0YXRlKSA9PiB7XG4gICAgICB0aGlzLnVybENoYW5nZXMubmV4dCh7bmV3VXJsLCBuZXdTdGF0ZX0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzUHJvbWlzZSgkaW5qZWN0b3IpKSB7XG4gICAgICAkaW5qZWN0b3IudGhlbigkaSA9PiB0aGlzLmluaXRpYWxpemUoJGkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsaXplKCRpbmplY3Rvcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplKCRpbmplY3RvcjogYW55KSB7XG4gICAgY29uc3QgJHJvb3RTY29wZSA9ICRpbmplY3Rvci5nZXQoJyRyb290U2NvcGUnKTtcbiAgICBjb25zdCAkcm9vdEVsZW1lbnQgPSAkaW5qZWN0b3IuZ2V0KCckcm9vdEVsZW1lbnQnKTtcblxuICAgICRyb290RWxlbWVudC5vbignY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSB8fCBldmVudC5zaGlmdEtleSB8fCBldmVudC53aGljaCA9PT0gMiB8fFxuICAgICAgICAgIGV2ZW50LmJ1dHRvbiA9PT0gMikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBlbG06IChOb2RlJlBhcmVudE5vZGUpfG51bGwgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgIC8vIHRyYXZlcnNlIHRoZSBET00gdXAgdG8gZmluZCBmaXJzdCBBIHRhZ1xuICAgICAgd2hpbGUgKGVsbSAmJiBlbG0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2EnKSB7XG4gICAgICAgIC8vIGlnbm9yZSByZXdyaXRpbmcgaWYgbm8gQSB0YWcgKHJlYWNoZWQgcm9vdCBlbGVtZW50LCBvciBubyBwYXJlbnQgLSByZW1vdmVkIGZyb20gZG9jdW1lbnQpXG4gICAgICAgIGlmIChlbG0gPT09ICRyb290RWxlbWVudFswXSB8fCAhKGVsbSA9IGVsbS5wYXJlbnROb2RlKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWlzQW5jaG9yKGVsbSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhYnNIcmVmID0gZWxtLmhyZWY7XG4gICAgICBjb25zdCByZWxIcmVmID0gZWxtLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB1cmwgaXMgc3RhcnRlZCB3aXRoIGphdmFzY3JpcHQ6IG9yIG1haWx0bzpcbiAgICAgIGlmIChJR05PUkVfVVJJX1JFR0VYUC50ZXN0KGFic0hyZWYpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFic0hyZWYgJiYgIWVsbS5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICBpZiAodGhpcy4kJHBhcnNlTGlua1VybChhYnNIcmVmLCByZWxIcmVmKSkge1xuICAgICAgICAgIC8vIFdlIGRvIGEgcHJldmVudERlZmF1bHQgZm9yIGFsbCB1cmxzIHRoYXQgYXJlIHBhcnQgb2YgdGhlIEFuZ3VsYXJKUyBhcHBsaWNhdGlvbixcbiAgICAgICAgICAvLyBpbiBodG1sNW1vZGUgYW5kIGFsc28gd2l0aG91dCwgc28gdGhhdCB3ZSBhcmUgYWJsZSB0byBhYm9ydCBuYXZpZ2F0aW9uIHdpdGhvdXRcbiAgICAgICAgICAvLyBnZXR0aW5nIGRvdWJsZSBlbnRyaWVzIGluIHRoZSBsb2NhdGlvbiBoaXN0b3J5LlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgLy8gdXBkYXRlIGxvY2F0aW9uIG1hbnVhbGx5XG4gICAgICAgICAgaWYgKHRoaXMuYWJzVXJsKCkgIT09IHRoaXMuYnJvd3NlclVybCgpKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy51cmxDaGFuZ2VzLnN1YnNjcmliZSgoe25ld1VybCwgbmV3U3RhdGV9KSA9PiB7XG4gICAgICBjb25zdCBvbGRVcmwgPSB0aGlzLmFic1VybCgpO1xuICAgICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLiQkc3RhdGU7XG4gICAgICB0aGlzLiQkcGFyc2UobmV3VXJsKTtcbiAgICAgIG5ld1VybCA9IHRoaXMuYWJzVXJsKCk7XG4gICAgICB0aGlzLiQkc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgIGNvbnN0IGRlZmF1bHRQcmV2ZW50ZWQgPVxuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJGxvY2F0aW9uQ2hhbmdlU3RhcnQnLCBuZXdVcmwsIG9sZFVybCwgbmV3U3RhdGUsIG9sZFN0YXRlKVxuICAgICAgICAgICAgICAuZGVmYXVsdFByZXZlbnRlZDtcblxuICAgICAgLy8gaWYgdGhlIGxvY2F0aW9uIHdhcyBjaGFuZ2VkIGJ5IGEgYCRsb2NhdGlvbkNoYW5nZVN0YXJ0YCBoYW5kbGVyIHRoZW4gc3RvcFxuICAgICAgLy8gcHJvY2Vzc2luZyB0aGlzIGxvY2F0aW9uIGNoYW5nZVxuICAgICAgaWYgKHRoaXMuYWJzVXJsKCkgIT09IG5ld1VybCkgcmV0dXJuO1xuXG4gICAgICAvLyBJZiBkZWZhdWx0IHdhcyBwcmV2ZW50ZWQsIHNldCBiYWNrIHRvIG9sZCBzdGF0ZS4gVGhpcyBpcyB0aGUgc3RhdGUgdGhhdCB3YXMgbG9jYWxseVxuICAgICAgLy8gY2FjaGVkIGluIHRoZSAkbG9jYXRpb24gc2VydmljZS5cbiAgICAgIGlmIChkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHRoaXMuJCRwYXJzZShvbGRVcmwpO1xuICAgICAgICB0aGlzLnN0YXRlKG9sZFN0YXRlKTtcbiAgICAgICAgdGhpcy5zZXRCcm93c2VyVXJsV2l0aEZhbGxiYWNrKG9sZFVybCwgZmFsc2UsIG9sZFN0YXRlKTtcbiAgICAgICAgdGhpcy4kJG5vdGlmeUNoYW5nZUxpc3RlbmVycyh0aGlzLnVybCgpLCB0aGlzLiQkc3RhdGUsIG9sZFVybCwgb2xkU3RhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgbmV3VXJsLCBvbGRVcmwsIG5ld1N0YXRlLCBvbGRTdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRCcm93c2VyVXBkYXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAoISRyb290U2NvcGUuJCRwaGFzZSkge1xuICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBicm93c2VyXG4gICAgJHJvb3RTY29wZS4kd2F0Y2goKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6aW5nIHx8IHRoaXMudXBkYXRlQnJvd3Nlcikge1xuICAgICAgICB0aGlzLnVwZGF0ZUJyb3dzZXIgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBvbGRVcmwgPSB0aGlzLmJyb3dzZXJVcmwoKTtcbiAgICAgICAgY29uc3QgbmV3VXJsID0gdGhpcy5hYnNVcmwoKTtcbiAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLmJyb3dzZXJTdGF0ZSgpO1xuICAgICAgICBsZXQgY3VycmVudFJlcGxhY2UgPSB0aGlzLiQkcmVwbGFjZTtcblxuICAgICAgICBjb25zdCB1cmxPclN0YXRlQ2hhbmdlZCA9XG4gICAgICAgICAgICAhdGhpcy51cmxDb2RlYy5hcmVFcXVhbChvbGRVcmwsIG5ld1VybCkgfHwgb2xkU3RhdGUgIT09IHRoaXMuJCRzdGF0ZTtcblxuICAgICAgICAvLyBGaXJlIGxvY2F0aW9uIGNoYW5nZXMgb25lIHRpbWUgdG8gb24gaW5pdGlhbGl6YXRpb24uIFRoaXMgbXVzdCBiZSBkb25lIG9uIHRoZVxuICAgICAgICAvLyBuZXh0IHRpY2sgKHRodXMgaW5zaWRlICRldmFsQXN5bmMoKSkgaW4gb3JkZXIgZm9yIGxpc3RlbmVycyB0byBiZSByZWdpc3RlcmVkXG4gICAgICAgIC8vIGJlZm9yZSB0aGUgZXZlbnQgZmlyZXMuIE1pbWljaW5nIGJlaGF2aW9yIGZyb20gJGxvY2F0aW9uV2F0Y2g6XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIuanMvYmxvYi9tYXN0ZXIvc3JjL25nL2xvY2F0aW9uLmpzI0w5ODNcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6aW5nIHx8IHVybE9yU3RhdGVDaGFuZ2VkKSB7XG4gICAgICAgICAgdGhpcy5pbml0aWFsaXppbmcgPSBmYWxzZTtcblxuICAgICAgICAgICRyb290U2NvcGUuJGV2YWxBc3luYygoKSA9PiB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIG5ldyBVUkwgYWdhaW4gc2luY2UgaXQgY291bGQgaGF2ZSBjaGFuZ2VkIGR1ZSB0byBhc3luYyB1cGRhdGVcbiAgICAgICAgICAgIGNvbnN0IG5ld1VybCA9IHRoaXMuYWJzVXJsKCk7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0UHJldmVudGVkID1cbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlXG4gICAgICAgICAgICAgICAgICAgIC4kYnJvYWRjYXN0KCckbG9jYXRpb25DaGFuZ2VTdGFydCcsIG5ld1VybCwgb2xkVXJsLCB0aGlzLiQkc3RhdGUsIG9sZFN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdFByZXZlbnRlZDtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGxvY2F0aW9uIHdhcyBjaGFuZ2VkIGJ5IGEgYCRsb2NhdGlvbkNoYW5nZVN0YXJ0YCBoYW5kbGVyIHRoZW4gc3RvcFxuICAgICAgICAgICAgLy8gcHJvY2Vzc2luZyB0aGlzIGxvY2F0aW9uIGNoYW5nZVxuICAgICAgICAgICAgaWYgKHRoaXMuYWJzVXJsKCkgIT09IG5ld1VybCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICB0aGlzLiQkcGFyc2Uob2xkVXJsKTtcbiAgICAgICAgICAgICAgdGhpcy4kJHN0YXRlID0gb2xkU3RhdGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBUaGlzIGJsb2NrIGRvZXNuJ3QgcnVuIHdoZW4gaW5pdGlhbGl6aW5nIGJlY2F1c2UgaXQncyBnb2luZyB0byBwZXJmb3JtIHRoZSB1cGRhdGVcbiAgICAgICAgICAgICAgLy8gdG8gdGhlIFVSTCB3aGljaCBzaG91bGRuJ3QgYmUgbmVlZGVkIHdoZW4gaW5pdGlhbGl6aW5nLlxuICAgICAgICAgICAgICBpZiAodXJsT3JTdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJyb3dzZXJVcmxXaXRoRmFsbGJhY2soXG4gICAgICAgICAgICAgICAgICAgIG5ld1VybCwgY3VycmVudFJlcGxhY2UsIG9sZFN0YXRlID09PSB0aGlzLiQkc3RhdGUgPyBudWxsIDogdGhpcy4kJHN0YXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkcmVwbGFjZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChcbiAgICAgICAgICAgICAgICAgICckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgbmV3VXJsLCBvbGRVcmwsIHRoaXMuJCRzdGF0ZSwgb2xkU3RhdGUpO1xuICAgICAgICAgICAgICBpZiAodXJsT3JTdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiQkbm90aWZ5Q2hhbmdlTGlzdGVuZXJzKHRoaXMudXJsKCksIHRoaXMuJCRzdGF0ZSwgb2xkVXJsLCBvbGRTdGF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy4kJHJlcGxhY2UgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRCcm93c2VyVXBkYXRlKCkge1xuICAgIHRoaXMuJCRyZXBsYWNlID0gZmFsc2U7XG4gICAgdGhpcy4kJHN0YXRlID0gdGhpcy5icm93c2VyU3RhdGUoKTtcbiAgICB0aGlzLnVwZGF0ZUJyb3dzZXIgPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RCcm93c2VyVXJsID0gdGhpcy5icm93c2VyVXJsKCk7XG4gIH1cblxuICBwcml2YXRlIGxhc3RIaXN0b3J5U3RhdGU6IHVua25vd247XG4gIHByaXZhdGUgbGFzdEJyb3dzZXJVcmw6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIGJyb3dzZXJVcmwoKTogc3RyaW5nO1xuICBwcml2YXRlIGJyb3dzZXJVcmwodXJsOiBzdHJpbmcsIHJlcGxhY2U/OiBib29sZWFuLCBzdGF0ZT86IHVua25vd24pOiB0aGlzO1xuICBwcml2YXRlIGJyb3dzZXJVcmwodXJsPzogc3RyaW5nLCByZXBsYWNlPzogYm9vbGVhbiwgc3RhdGU/OiB1bmtub3duKSB7XG4gICAgLy8gSW4gbW9kZXJuIGJyb3dzZXJzIGBoaXN0b3J5LnN0YXRlYCBpcyBgbnVsbGAgYnkgZGVmYXVsdDsgdHJlYXRpbmcgaXQgc2VwYXJhdGVseVxuICAgIC8vIGZyb20gYHVuZGVmaW5lZGAgd291bGQgY2F1c2UgYCRicm93c2VyLnVybCgnL2ZvbycpYCB0byBjaGFuZ2UgYGhpc3Rvcnkuc3RhdGVgXG4gICAgLy8gdG8gdW5kZWZpbmVkIHZpYSBgcHVzaFN0YXRlYC4gSW5zdGVhZCwgbGV0J3MgY2hhbmdlIGB1bmRlZmluZWRgIHRvIGBudWxsYCBoZXJlLlxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBzdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2V0dGVyXG4gICAgaWYgKHVybCkge1xuICAgICAgbGV0IHNhbWVTdGF0ZSA9IHRoaXMubGFzdEhpc3RvcnlTdGF0ZSA9PT0gc3RhdGU7XG5cbiAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgaW5wdXR0ZWQgVVJMXG4gICAgICB1cmwgPSB0aGlzLnVybENvZGVjLnBhcnNlKHVybCkuaHJlZjtcblxuICAgICAgLy8gRG9uJ3QgY2hhbmdlIGFueXRoaW5nIGlmIHByZXZpb3VzIGFuZCBjdXJyZW50IFVSTHMgYW5kIHN0YXRlcyBtYXRjaC5cbiAgICAgIGlmICh0aGlzLmxhc3RCcm93c2VyVXJsID09PSB1cmwgJiYgc2FtZVN0YXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0QnJvd3NlclVybCA9IHVybDtcbiAgICAgIHRoaXMubGFzdEhpc3RvcnlTdGF0ZSA9IHN0YXRlO1xuXG4gICAgICAvLyBSZW1vdmUgc2VydmVyIGJhc2UgZnJvbSBVUkwgYXMgdGhlIEFuZ3VsYXIgQVBJcyBmb3IgdXBkYXRpbmcgVVJMIHJlcXVpcmVcbiAgICAgIC8vIGl0IHRvIGJlIHRoZSBwYXRoKy5cbiAgICAgIHVybCA9IHRoaXMuc3RyaXBCYXNlVXJsKHRoaXMuZ2V0U2VydmVyQmFzZSgpLCB1cmwpIHx8IHVybDtcblxuICAgICAgLy8gU2V0IHRoZSBVUkxcbiAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb25TdHJhdGVneS5yZXBsYWNlU3RhdGUoc3RhdGUsICcnLCB1cmwsICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9jYXRpb25TdHJhdGVneS5wdXNoU3RhdGUoc3RhdGUsICcnLCB1cmwsICcnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYWNoZVN0YXRlKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgICAgLy8gZ2V0dGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBsYXRmb3JtTG9jYXRpb24uaHJlZjtcbiAgICB9XG4gIH1cblxuICAvLyBUaGlzIHZhcmlhYmxlIHNob3VsZCBiZSB1c2VkICpvbmx5KiBpbnNpZGUgdGhlIGNhY2hlU3RhdGUgZnVuY3Rpb24uXG4gIHByaXZhdGUgbGFzdENhY2hlZFN0YXRlOiB1bmtub3duID0gbnVsbDtcbiAgcHJpdmF0ZSBjYWNoZVN0YXRlKCkge1xuICAgIC8vIFRoaXMgc2hvdWxkIGJlIHRoZSBvbmx5IHBsYWNlIGluICRicm93c2VyIHdoZXJlIGBoaXN0b3J5LnN0YXRlYCBpcyByZWFkLlxuICAgIHRoaXMuY2FjaGVkU3RhdGUgPSB0aGlzLnBsYXRmb3JtTG9jYXRpb24uZ2V0U3RhdGUoKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuY2FjaGVkU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmNhY2hlZFN0YXRlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBQcmV2ZW50IGNhbGxiYWNrcyBmbyBmaXJlIHR3aWNlIGlmIGJvdGggaGFzaGNoYW5nZSAmIHBvcHN0YXRlIHdlcmUgZmlyZWQuXG4gICAgaWYgKGRlZXBFcXVhbCh0aGlzLmNhY2hlZFN0YXRlLCB0aGlzLmxhc3RDYWNoZWRTdGF0ZSkpIHtcbiAgICAgIHRoaXMuY2FjaGVkU3RhdGUgPSB0aGlzLmxhc3RDYWNoZWRTdGF0ZTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RDYWNoZWRTdGF0ZSA9IHRoaXMuY2FjaGVkU3RhdGU7XG4gICAgdGhpcy5sYXN0SGlzdG9yeVN0YXRlID0gdGhpcy5jYWNoZWRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGVtdWxhdGVzIHRoZSAkYnJvd3Nlci5zdGF0ZSgpIGZ1bmN0aW9uIGZyb20gQW5ndWxhckpTLiBJdCB3aWxsIGNhdXNlXG4gICAqIGhpc3Rvcnkuc3RhdGUgdG8gYmUgY2FjaGVkIHVubGVzcyBjaGFuZ2VkIHdpdGggZGVlcCBlcXVhbGl0eSBjaGVjay5cbiAgICovXG4gIHByaXZhdGUgYnJvd3NlclN0YXRlKCk6IHVua25vd24ge1xuICAgIHJldHVybiB0aGlzLmNhY2hlZFN0YXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJpcEJhc2VVcmwoYmFzZTogc3RyaW5nLCB1cmw6IHN0cmluZykge1xuICAgIGlmICh1cmwuc3RhcnRzV2l0aChiYXNlKSkge1xuICAgICAgcmV0dXJuIHVybC5zbGljZShiYXNlLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGdldFNlcnZlckJhc2UoKSB7XG4gICAgY29uc3Qge3Byb3RvY29sLCBob3N0bmFtZSwgcG9ydH0gPSB0aGlzLnBsYXRmb3JtTG9jYXRpb247XG4gICAgY29uc3QgYmFzZUhyZWYgPSB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kuZ2V0QmFzZUhyZWYoKTtcbiAgICBsZXQgdXJsID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfSR7cG9ydCA/ICc6JyArIHBvcnQgOiAnJ30ke2Jhc2VIcmVmIHx8ICcvJ31gO1xuICAgIHJldHVybiB1cmwuZW5kc1dpdGgoJy8nKSA/IHVybCA6IHVybCArICcvJztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VBcHBVcmwodXJsOiBzdHJpbmcpIHtcbiAgICBpZiAoRE9VQkxFX1NMQVNIX1JFR0VYLnRlc3QodXJsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWQgUGF0aCAtIFVSTCBjYW5ub3Qgc3RhcnQgd2l0aCBkb3VibGUgc2xhc2hlczogJHt1cmx9YCk7XG4gICAgfVxuXG4gICAgbGV0IHByZWZpeGVkID0gKHVybC5jaGFyQXQoMCkgIT09ICcvJyk7XG4gICAgaWYgKHByZWZpeGVkKSB7XG4gICAgICB1cmwgPSAnLycgKyB1cmw7XG4gICAgfVxuICAgIGxldCBtYXRjaCA9IHRoaXMudXJsQ29kZWMucGFyc2UodXJsLCB0aGlzLmdldFNlcnZlckJhc2UoKSk7XG4gICAgaWYgKHR5cGVvZiBtYXRjaCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFkIFVSTCAtIENhbm5vdCBwYXJzZSBVUkw6ICR7dXJsfWApO1xuICAgIH1cbiAgICBsZXQgcGF0aCA9XG4gICAgICAgIHByZWZpeGVkICYmIG1hdGNoLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gbWF0Y2gucGF0aG5hbWUuc3Vic3RyaW5nKDEpIDogbWF0Y2gucGF0aG5hbWU7XG4gICAgdGhpcy4kJHBhdGggPSB0aGlzLnVybENvZGVjLmRlY29kZVBhdGgocGF0aCk7XG4gICAgdGhpcy4kJHNlYXJjaCA9IHRoaXMudXJsQ29kZWMuZGVjb2RlU2VhcmNoKG1hdGNoLnNlYXJjaCk7XG4gICAgdGhpcy4kJGhhc2ggPSB0aGlzLnVybENvZGVjLmRlY29kZUhhc2gobWF0Y2guaGFzaCk7XG5cbiAgICAvLyBtYWtlIHN1cmUgcGF0aCBzdGFydHMgd2l0aCAnLyc7XG4gICAgaWYgKHRoaXMuJCRwYXRoICYmIHRoaXMuJCRwYXRoLmNoYXJBdCgwKSAhPT0gJy8nKSB7XG4gICAgICB0aGlzLiQkcGF0aCA9ICcvJyArIHRoaXMuJCRwYXRoO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgbGlzdGVuZXJzIGZvciBVUkwgY2hhbmdlcy4gVGhpcyBBUEkgaXMgdXNlZCB0byBjYXRjaCB1cGRhdGVzIHBlcmZvcm1lZCBieSB0aGVcbiAgICogQW5ndWxhckpTIGZyYW1ld29yay4gVGhlc2UgY2hhbmdlcyBhcmUgYSBzdWJzZXQgb2YgdGhlIGAkbG9jYXRpb25DaGFuZ2VTdGFydGAgYW5kXG4gICAqIGAkbG9jYXRpb25DaGFuZ2VTdWNjZXNzYCBldmVudHMgd2hpY2ggZmlyZSB3aGVuIEFuZ3VsYXJKUyB1cGRhdGVzIGl0cyBpbnRlcm5hbGx5LXJlZmVyZW5jZWRcbiAgICogdmVyc2lvbiBvZiB0aGUgYnJvd3NlciBVUkwuXG4gICAqXG4gICAqIEl0J3MgcG9zc2libGUgZm9yIGAkbG9jYXRpb25DaGFuZ2VgIGV2ZW50cyB0byBoYXBwZW4sIGJ1dCBmb3IgdGhlIGJyb3dzZXIgVVJMXG4gICAqICh3aW5kb3cubG9jYXRpb24pIHRvIHJlbWFpbiB1bmNoYW5nZWQuIFRoaXMgYG9uQ2hhbmdlYCBjYWxsYmFjayB3aWxsIGZpcmUgb25seSB3aGVuIEFuZ3VsYXJKU1xuICAgKiBhY3R1YWxseSB1cGRhdGVzIHRoZSBicm93c2VyIFVSTCAod2luZG93LmxvY2F0aW9uKS5cbiAgICpcbiAgICogQHBhcmFtIGZuIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCBmb3IgdGhlIGxpc3RlbmVyIHdoZW4gdGhlIFVSTCBjaGFuZ2VzLlxuICAgKiBAcGFyYW0gZXJyIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIGFuIGVycm9yIG9jY3Vycy5cbiAgICovXG4gIG9uQ2hhbmdlKFxuICAgICAgZm46ICh1cmw6IHN0cmluZywgc3RhdGU6IHVua25vd24sIG9sZFVybDogc3RyaW5nLCBvbGRTdGF0ZTogdW5rbm93bikgPT4gdm9pZCxcbiAgICAgIGVycjogKGU6IEVycm9yKSA9PiB2b2lkID0gKGU6IEVycm9yKSA9PiB7fSkge1xuICAgIHRoaXMuJCRjaGFuZ2VMaXN0ZW5lcnMucHVzaChbZm4sIGVycl0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICAkJG5vdGlmeUNoYW5nZUxpc3RlbmVycyhcbiAgICAgIHVybDogc3RyaW5nID0gJycsIHN0YXRlOiB1bmtub3duLCBvbGRVcmw6IHN0cmluZyA9ICcnLCBvbGRTdGF0ZTogdW5rbm93bikge1xuICAgIHRoaXMuJCRjaGFuZ2VMaXN0ZW5lcnMuZm9yRWFjaCgoW2ZuLCBlcnJdKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBmbih1cmwsIHN0YXRlLCBvbGRVcmwsIG9sZFN0YXRlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyKGUgYXMgRXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgcHJvdmlkZWQgVVJMLCBhbmQgc2V0cyB0aGUgY3VycmVudCBVUkwgdG8gdGhlIHBhcnNlZCByZXN1bHQuXG4gICAqXG4gICAqIEBwYXJhbSB1cmwgVGhlIFVSTCBzdHJpbmcuXG4gICAqL1xuICAkJHBhcnNlKHVybDogc3RyaW5nKSB7XG4gICAgbGV0IHBhdGhVcmw6IHN0cmluZ3x1bmRlZmluZWQ7XG4gICAgaWYgKHVybC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgIHBhdGhVcmwgPSB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlbW92ZSBwcm90b2NvbCAmIGhvc3RuYW1lIGlmIFVSTCBzdGFydHMgd2l0aCBpdFxuICAgICAgcGF0aFVybCA9IHRoaXMuc3RyaXBCYXNlVXJsKHRoaXMuZ2V0U2VydmVyQmFzZSgpLCB1cmwpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHBhdGhVcmwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdXJsIFwiJHt1cmx9XCIsIG1pc3NpbmcgcGF0aCBwcmVmaXggXCIke3RoaXMuZ2V0U2VydmVyQmFzZSgpfVwiLmApO1xuICAgIH1cblxuICAgIHRoaXMucGFyc2VBcHBVcmwocGF0aFVybCk7XG5cbiAgICBpZiAoIXRoaXMuJCRwYXRoKSB7XG4gICAgICB0aGlzLiQkcGF0aCA9ICcvJztcbiAgICB9XG4gICAgdGhpcy5jb21wb3NlVXJscygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgcHJvdmlkZWQgVVJMIGFuZCBpdHMgcmVsYXRpdmUgVVJMLlxuICAgKlxuICAgKiBAcGFyYW0gdXJsIFRoZSBmdWxsIFVSTCBzdHJpbmcuXG4gICAqIEBwYXJhbSByZWxIcmVmIEEgVVJMIHN0cmluZyByZWxhdGl2ZSB0byB0aGUgZnVsbCBVUkwgc3RyaW5nLlxuICAgKi9cbiAgJCRwYXJzZUxpbmtVcmwodXJsOiBzdHJpbmcsIHJlbEhyZWY/OiBzdHJpbmd8bnVsbCk6IGJvb2xlYW4ge1xuICAgIC8vIFdoZW4gcmVsSHJlZiBpcyBwYXNzZWQsIGl0IHNob3VsZCBiZSBhIGhhc2ggYW5kIGlzIGhhbmRsZWQgc2VwYXJhdGVseVxuICAgIGlmIChyZWxIcmVmICYmIHJlbEhyZWZbMF0gPT09ICcjJykge1xuICAgICAgdGhpcy5oYXNoKHJlbEhyZWYuc2xpY2UoMSkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxldCByZXdyaXR0ZW5Vcmw7XG4gICAgbGV0IGFwcFVybCA9IHRoaXMuc3RyaXBCYXNlVXJsKHRoaXMuZ2V0U2VydmVyQmFzZSgpLCB1cmwpO1xuICAgIGlmICh0eXBlb2YgYXBwVXJsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV3cml0dGVuVXJsID0gdGhpcy5nZXRTZXJ2ZXJCYXNlKCkgKyBhcHBVcmw7XG4gICAgfSBlbHNlIGlmICh0aGlzLmdldFNlcnZlckJhc2UoKSA9PT0gdXJsICsgJy8nKSB7XG4gICAgICByZXdyaXR0ZW5VcmwgPSB0aGlzLmdldFNlcnZlckJhc2UoKTtcbiAgICB9XG4gICAgLy8gU2V0IHRoZSBVUkxcbiAgICBpZiAocmV3cml0dGVuVXJsKSB7XG4gICAgICB0aGlzLiQkcGFyc2UocmV3cml0dGVuVXJsKTtcbiAgICB9XG4gICAgcmV0dXJuICEhcmV3cml0dGVuVXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCcm93c2VyVXJsV2l0aEZhbGxiYWNrKHVybDogc3RyaW5nLCByZXBsYWNlOiBib29sZWFuLCBzdGF0ZTogdW5rbm93bikge1xuICAgIGNvbnN0IG9sZFVybCA9IHRoaXMudXJsKCk7XG4gICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLiQkc3RhdGU7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYnJvd3NlclVybCh1cmwsIHJlcGxhY2UsIHN0YXRlKTtcblxuICAgICAgLy8gTWFrZSBzdXJlICRsb2NhdGlvbi5zdGF0ZSgpIHJldHVybnMgcmVmZXJlbnRpYWxseSBpZGVudGljYWwgKG5vdCBqdXN0IGRlZXBseSBlcXVhbClcbiAgICAgIC8vIHN0YXRlIG9iamVjdDsgdGhpcyBtYWtlcyBwb3NzaWJsZSBxdWljayBjaGVja2luZyBpZiB0aGUgc3RhdGUgY2hhbmdlZCBpbiB0aGUgZGlnZXN0XG4gICAgICAvLyBsb29wLiBDaGVja2luZyBkZWVwIGVxdWFsaXR5IHdvdWxkIGJlIHRvbyBleHBlbnNpdmUuXG4gICAgICB0aGlzLiQkc3RhdGUgPSB0aGlzLmJyb3dzZXJTdGF0ZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFJlc3RvcmUgb2xkIHZhbHVlcyBpZiBwdXNoU3RhdGUgZmFpbHNcbiAgICAgIHRoaXMudXJsKG9sZFVybCk7XG4gICAgICB0aGlzLiQkc3RhdGUgPSBvbGRTdGF0ZTtcblxuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbXBvc2VVcmxzKCkge1xuICAgIHRoaXMuJCR1cmwgPSB0aGlzLnVybENvZGVjLm5vcm1hbGl6ZSh0aGlzLiQkcGF0aCwgdGhpcy4kJHNlYXJjaCwgdGhpcy4kJGhhc2gpO1xuICAgIHRoaXMuJCRhYnNVcmwgPSB0aGlzLmdldFNlcnZlckJhc2UoKSArIHRoaXMuJCR1cmwuc2xpY2UoMSk7ICAvLyByZW1vdmUgJy8nIGZyb20gZnJvbnQgb2YgVVJMXG4gICAgdGhpcy51cGRhdGVCcm93c2VyID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGZ1bGwgVVJMIHJlcHJlc2VudGF0aW9uIHdpdGggYWxsIHNlZ21lbnRzIGVuY29kZWQgYWNjb3JkaW5nIHRvXG4gICAqIHJ1bGVzIHNwZWNpZmllZCBpblxuICAgKiBbUkZDIDM5ODZdKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2KS5cbiAgICpcbiAgICpcbiAgICogYGBganNcbiAgICogLy8gZ2l2ZW4gVVJMIGh0dHA6Ly9leGFtcGxlLmNvbS8jL3NvbWUvcGF0aD9mb289YmFyJmJhej14b3hvXG4gICAqIGxldCBhYnNVcmwgPSAkbG9jYXRpb24uYWJzVXJsKCk7XG4gICAqIC8vID0+IFwiaHR0cDovL2V4YW1wbGUuY29tLyMvc29tZS9wYXRoP2Zvbz1iYXImYmF6PXhveG9cIlxuICAgKiBgYGBcbiAgICovXG4gIGFic1VybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLiQkYWJzVXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBVUkwsIG9yIHNldHMgYSBuZXcgVVJMLiBXaGVuIHNldHRpbmcgYSBVUkwsXG4gICAqIGNoYW5nZXMgdGhlIHBhdGgsIHNlYXJjaCwgYW5kIGhhc2gsIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIGl0cyBvd24gaW5zdGFuY2UuXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIC8vIGdpdmVuIFVSTCBodHRwOi8vZXhhbXBsZS5jb20vIy9zb21lL3BhdGg/Zm9vPWJhciZiYXo9eG94b1xuICAgKiBsZXQgdXJsID0gJGxvY2F0aW9uLnVybCgpO1xuICAgKiAvLyA9PiBcIi9zb21lL3BhdGg/Zm9vPWJhciZiYXo9eG94b1wiXG4gICAqIGBgYFxuICAgKi9cbiAgdXJsKCk6IHN0cmluZztcbiAgdXJsKHVybDogc3RyaW5nKTogdGhpcztcbiAgdXJsKHVybD86IHN0cmluZyk6IHN0cmluZ3x0aGlzIHtcbiAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICghdXJsLmxlbmd0aCkge1xuICAgICAgICB1cmwgPSAnLyc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hdGNoID0gUEFUSF9NQVRDSC5leGVjKHVybCk7XG4gICAgICBpZiAoIW1hdGNoKSByZXR1cm4gdGhpcztcbiAgICAgIGlmIChtYXRjaFsxXSB8fCB1cmwgPT09ICcnKSB0aGlzLnBhdGgodGhpcy51cmxDb2RlYy5kZWNvZGVQYXRoKG1hdGNoWzFdKSk7XG4gICAgICBpZiAobWF0Y2hbMl0gfHwgbWF0Y2hbMV0gfHwgdXJsID09PSAnJykgdGhpcy5zZWFyY2gobWF0Y2hbM10gfHwgJycpO1xuICAgICAgdGhpcy5oYXNoKG1hdGNoWzVdIHx8ICcnKTtcblxuICAgICAgLy8gQ2hhaW5hYmxlIG1ldGhvZFxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuJCR1cmw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBwcm90b2NvbCBvZiB0aGUgY3VycmVudCBVUkwuXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIC8vIGdpdmVuIFVSTCBodHRwOi8vZXhhbXBsZS5jb20vIy9zb21lL3BhdGg/Zm9vPWJhciZiYXo9eG94b1xuICAgKiBsZXQgcHJvdG9jb2wgPSAkbG9jYXRpb24ucHJvdG9jb2woKTtcbiAgICogLy8gPT4gXCJodHRwXCJcbiAgICogYGBgXG4gICAqL1xuICBwcm90b2NvbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLiQkcHJvdG9jb2w7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBwcm90b2NvbCBvZiB0aGUgY3VycmVudCBVUkwuXG4gICAqXG4gICAqIEluIGNvbnRyYXN0IHRvIHRoZSBub24tQW5ndWxhckpTIHZlcnNpb24gYGxvY2F0aW9uLmhvc3RgIHdoaWNoIHJldHVybnMgYGhvc3RuYW1lOnBvcnRgLCB0aGlzXG4gICAqIHJldHVybnMgdGhlIGBob3N0bmFtZWAgcG9ydGlvbiBvbmx5LlxuICAgKlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiAvLyBnaXZlbiBVUkwgaHR0cDovL2V4YW1wbGUuY29tLyMvc29tZS9wYXRoP2Zvbz1iYXImYmF6PXhveG9cbiAgICogbGV0IGhvc3QgPSAkbG9jYXRpb24uaG9zdCgpO1xuICAgKiAvLyA9PiBcImV4YW1wbGUuY29tXCJcbiAgICpcbiAgICogLy8gZ2l2ZW4gVVJMIGh0dHA6Ly91c2VyOnBhc3N3b3JkQGV4YW1wbGUuY29tOjgwODAvIy9zb21lL3BhdGg/Zm9vPWJhciZiYXo9eG94b1xuICAgKiBob3N0ID0gJGxvY2F0aW9uLmhvc3QoKTtcbiAgICogLy8gPT4gXCJleGFtcGxlLmNvbVwiXG4gICAqIGhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuICAgKiAvLyA9PiBcImV4YW1wbGUuY29tOjgwODBcIlxuICAgKiBgYGBcbiAgICovXG4gIGhvc3QoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy4kJGhvc3Q7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBwb3J0IG9mIHRoZSBjdXJyZW50IFVSTC5cbiAgICpcbiAgICogYGBganNcbiAgICogLy8gZ2l2ZW4gVVJMIGh0dHA6Ly9leGFtcGxlLmNvbS8jL3NvbWUvcGF0aD9mb289YmFyJmJhej14b3hvXG4gICAqIGxldCBwb3J0ID0gJGxvY2F0aW9uLnBvcnQoKTtcbiAgICogLy8gPT4gODBcbiAgICogYGBgXG4gICAqL1xuICBwb3J0KCk6IG51bWJlcnxudWxsIHtcbiAgICByZXR1cm4gdGhpcy4kJHBvcnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBwYXRoIG9mIHRoZSBjdXJyZW50IFVSTCwgb3IgY2hhbmdlcyB0aGUgcGF0aCBhbmQgcmV0dXJucyBhIHJlZmVyZW5jZSB0byBpdHMgb3duXG4gICAqIGluc3RhbmNlLlxuICAgKlxuICAgKiBQYXRocyBzaG91bGQgYWx3YXlzIGJlZ2luIHdpdGggZm9yd2FyZCBzbGFzaCAoLykuIFRoaXMgbWV0aG9kIGFkZHMgdGhlIGZvcndhcmQgc2xhc2hcbiAgICogaWYgaXQgaXMgbWlzc2luZy5cbiAgICpcbiAgICogYGBganNcbiAgICogLy8gZ2l2ZW4gVVJMIGh0dHA6Ly9leGFtcGxlLmNvbS8jL3NvbWUvcGF0aD9mb289YmFyJmJhej14b3hvXG4gICAqIGxldCBwYXRoID0gJGxvY2F0aW9uLnBhdGgoKTtcbiAgICogLy8gPT4gXCIvc29tZS9wYXRoXCJcbiAgICogYGBgXG4gICAqL1xuICBwYXRoKCk6IHN0cmluZztcbiAgcGF0aChwYXRoOiBzdHJpbmd8bnVtYmVyfG51bGwpOiB0aGlzO1xuICBwYXRoKHBhdGg/OiBzdHJpbmd8bnVtYmVyfG51bGwpOiBzdHJpbmd8dGhpcyB7XG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuJCRwYXRoO1xuICAgIH1cblxuICAgIC8vIG51bGwgcGF0aCBjb252ZXJ0cyB0byBlbXB0eSBzdHJpbmcuIFByZXBlbmQgd2l0aCBcIi9cIiBpZiBuZWVkZWQuXG4gICAgcGF0aCA9IHBhdGggIT09IG51bGwgPyBwYXRoLnRvU3RyaW5nKCkgOiAnJztcbiAgICBwYXRoID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJyA/IHBhdGggOiAnLycgKyBwYXRoO1xuXG4gICAgdGhpcy4kJHBhdGggPSBwYXRoO1xuXG4gICAgdGhpcy5jb21wb3NlVXJscygpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIG1hcCBvZiB0aGUgc2VhcmNoIHBhcmFtZXRlcnMgb2YgdGhlIGN1cnJlbnQgVVJMLCBvciBjaGFuZ2VzIGEgc2VhcmNoXG4gICAqIHBhcnQgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gaXRzIG93biBpbnN0YW5jZS5cbiAgICpcbiAgICpcbiAgICogYGBganNcbiAgICogLy8gZ2l2ZW4gVVJMIGh0dHA6Ly9leGFtcGxlLmNvbS8jL3NvbWUvcGF0aD9mb289YmFyJmJhej14b3hvXG4gICAqIGxldCBzZWFyY2hPYmplY3QgPSAkbG9jYXRpb24uc2VhcmNoKCk7XG4gICAqIC8vID0+IHtmb286ICdiYXInLCBiYXo6ICd4b3hvJ31cbiAgICpcbiAgICogLy8gc2V0IGZvbyB0byAneWlwZWUnXG4gICAqICRsb2NhdGlvbi5zZWFyY2goJ2ZvbycsICd5aXBlZScpO1xuICAgKiAvLyAkbG9jYXRpb24uc2VhcmNoKCkgPT4ge2ZvbzogJ3lpcGVlJywgYmF6OiAneG94byd9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xPYmplY3QuPHN0cmluZz58T2JqZWN0LjxBcnJheS48c3RyaW5nPj59IHNlYXJjaCBOZXcgc2VhcmNoIHBhcmFtcyAtIHN0cmluZyBvclxuICAgKiBoYXNoIG9iamVjdC5cbiAgICpcbiAgICogV2hlbiBjYWxsZWQgd2l0aCBhIHNpbmdsZSBhcmd1bWVudCB0aGUgbWV0aG9kIGFjdHMgYXMgYSBzZXR0ZXIsIHNldHRpbmcgdGhlIGBzZWFyY2hgIGNvbXBvbmVudFxuICAgKiBvZiBgJGxvY2F0aW9uYCB0byB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICAgKlxuICAgKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBoYXNoIG9iamVjdCBjb250YWluaW5nIGFuIGFycmF5IG9mIHZhbHVlcywgdGhlc2UgdmFsdWVzIHdpbGwgYmUgZW5jb2RlZFxuICAgKiBhcyBkdXBsaWNhdGUgc2VhcmNoIHBhcmFtZXRlcnMgaW4gdGhlIFVSTC5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfE51bWJlcnxBcnJheTxzdHJpbmc+fGJvb2xlYW4pPX0gcGFyYW1WYWx1ZSBJZiBgc2VhcmNoYCBpcyBhIHN0cmluZyBvciBudW1iZXIsXG4gICAqICAgICB0aGVuIGBwYXJhbVZhbHVlYFxuICAgKiB3aWxsIG92ZXJyaWRlIG9ubHkgYSBzaW5nbGUgc2VhcmNoIHByb3BlcnR5LlxuICAgKlxuICAgKiBJZiBgcGFyYW1WYWx1ZWAgaXMgYW4gYXJyYXksIGl0IHdpbGwgb3ZlcnJpZGUgdGhlIHByb3BlcnR5IG9mIHRoZSBgc2VhcmNoYCBjb21wb25lbnQgb2ZcbiAgICogYCRsb2NhdGlvbmAgc3BlY2lmaWVkIHZpYSB0aGUgZmlyc3QgYXJndW1lbnQuXG4gICAqXG4gICAqIElmIGBwYXJhbVZhbHVlYCBpcyBgbnVsbGAsIHRoZSBwcm9wZXJ0eSBzcGVjaWZpZWQgdmlhIHRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGJlIGRlbGV0ZWQuXG4gICAqXG4gICAqIElmIGBwYXJhbVZhbHVlYCBpcyBgdHJ1ZWAsIHRoZSBwcm9wZXJ0eSBzcGVjaWZpZWQgdmlhIHRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGJlIGFkZGVkIHdpdGggbm9cbiAgICogdmFsdWUgbm9yIHRyYWlsaW5nIGVxdWFsIHNpZ24uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gVGhlIHBhcnNlZCBgc2VhcmNoYCBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgVVJMLCBvciB0aGUgY2hhbmdlZCBgc2VhcmNoYCBvYmplY3QuXG4gICAqL1xuICBzZWFyY2goKToge1trZXk6IHN0cmluZ106IHVua25vd259O1xuICBzZWFyY2goc2VhcmNoOiBzdHJpbmd8bnVtYmVyfHtba2V5OiBzdHJpbmddOiB1bmtub3dufSk6IHRoaXM7XG4gIHNlYXJjaChcbiAgICAgIHNlYXJjaDogc3RyaW5nfG51bWJlcnx7W2tleTogc3RyaW5nXTogdW5rbm93bn0sXG4gICAgICBwYXJhbVZhbHVlOiBudWxsfHVuZGVmaW5lZHxzdHJpbmd8bnVtYmVyfGJvb2xlYW58c3RyaW5nW10pOiB0aGlzO1xuICBzZWFyY2goXG4gICAgICBzZWFyY2g/OiBzdHJpbmd8bnVtYmVyfHtba2V5OiBzdHJpbmddOiB1bmtub3dufSxcbiAgICAgIHBhcmFtVmFsdWU/OiBudWxsfHVuZGVmaW5lZHxzdHJpbmd8bnVtYmVyfGJvb2xlYW58c3RyaW5nW10pOiB7W2tleTogc3RyaW5nXTogdW5rbm93bn18dGhpcyB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiB0aGlzLiQkc2VhcmNoO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAodHlwZW9mIHNlYXJjaCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHNlYXJjaCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICB0aGlzLiQkc2VhcmNoID0gdGhpcy51cmxDb2RlYy5kZWNvZGVTZWFyY2goc2VhcmNoLnRvU3RyaW5nKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWFyY2ggPT09ICdvYmplY3QnICYmIHNlYXJjaCAhPT0gbnVsbCkge1xuICAgICAgICAgIC8vIENvcHkgdGhlIG9iamVjdCBzbyBpdCdzIG5ldmVyIG11dGF0ZWRcbiAgICAgICAgICBzZWFyY2ggPSB7Li4uc2VhcmNofTtcbiAgICAgICAgICAvLyByZW1vdmUgb2JqZWN0IHVuZGVmaW5lZCBvciBudWxsIHByb3BlcnRpZXNcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzZWFyY2gpIHtcbiAgICAgICAgICAgIGlmIChzZWFyY2hba2V5XSA9PSBudWxsKSBkZWxldGUgc2VhcmNoW2tleV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4kJHNlYXJjaCA9IHNlYXJjaDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICdMb2NhdGlvblByb3ZpZGVyLnNlYXJjaCgpOiBGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICh0eXBlb2Ygc2VhcmNoID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWFyY2ggPSB0aGlzLnNlYXJjaCgpO1xuICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1WYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcGFyYW1WYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgZGVsZXRlIGN1cnJlbnRTZWFyY2hbc2VhcmNoXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaChjdXJyZW50U2VhcmNoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFNlYXJjaFtzZWFyY2hdID0gcGFyYW1WYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaChjdXJyZW50U2VhcmNoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb21wb3NlVXJscygpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBoYXNoIGZyYWdtZW50LCBvciBjaGFuZ2VzIHRoZSBoYXNoIGZyYWdtZW50IGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvXG4gICAqIGl0cyBvd24gaW5zdGFuY2UuXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIC8vIGdpdmVuIFVSTCBodHRwOi8vZXhhbXBsZS5jb20vIy9zb21lL3BhdGg/Zm9vPWJhciZiYXo9eG94byNoYXNoVmFsdWVcbiAgICogbGV0IGhhc2ggPSAkbG9jYXRpb24uaGFzaCgpO1xuICAgKiAvLyA9PiBcImhhc2hWYWx1ZVwiXG4gICAqIGBgYFxuICAgKi9cbiAgaGFzaCgpOiBzdHJpbmc7XG4gIGhhc2goaGFzaDogc3RyaW5nfG51bWJlcnxudWxsKTogdGhpcztcbiAgaGFzaChoYXNoPzogc3RyaW5nfG51bWJlcnxudWxsKTogc3RyaW5nfHRoaXMge1xuICAgIGlmICh0eXBlb2YgaGFzaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLiQkaGFzaDtcbiAgICB9XG5cbiAgICB0aGlzLiQkaGFzaCA9IGhhc2ggIT09IG51bGwgPyBoYXNoLnRvU3RyaW5nKCkgOiAnJztcblxuICAgIHRoaXMuY29tcG9zZVVybHMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRvIGAkbG9jYXRpb25gIGR1cmluZyB0aGUgY3VycmVudCBgJGRpZ2VzdGAgd2lsbCByZXBsYWNlIHRoZSBjdXJyZW50XG4gICAqIGhpc3RvcnkgcmVjb3JkLCBpbnN0ZWFkIG9mIGFkZGluZyBhIG5ldyBvbmUuXG4gICAqL1xuICByZXBsYWNlKCk6IHRoaXMge1xuICAgIHRoaXMuJCRyZXBsYWNlID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGhpc3Rvcnkgc3RhdGUgb2JqZWN0IHdoZW4gY2FsbGVkIHdpdGhvdXQgYW55IHBhcmFtZXRlci5cbiAgICpcbiAgICogQ2hhbmdlIHRoZSBoaXN0b3J5IHN0YXRlIG9iamVjdCB3aGVuIGNhbGxlZCB3aXRoIG9uZSBwYXJhbWV0ZXIgYW5kIHJldHVybiBgJGxvY2F0aW9uYC5cbiAgICogVGhlIHN0YXRlIG9iamVjdCBpcyBsYXRlciBwYXNzZWQgdG8gYHB1c2hTdGF0ZWAgb3IgYHJlcGxhY2VTdGF0ZWAuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHN1cHBvcnRlZCBvbmx5IGluIEhUTUw1IG1vZGUgYW5kIG9ubHkgaW4gYnJvd3NlcnMgc3VwcG9ydGluZ1xuICAgKiB0aGUgSFRNTDUgSGlzdG9yeSBBUEkgbWV0aG9kcyBzdWNoIGFzIGBwdXNoU3RhdGVgIGFuZCBgcmVwbGFjZVN0YXRlYC4gSWYgeW91IG5lZWQgdG8gc3VwcG9ydFxuICAgKiBvbGRlciBicm93c2VycyAobGlrZSBBbmRyb2lkIDwgNC4wKSwgZG9uJ3QgdXNlIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKi9cbiAgc3RhdGUoKTogdW5rbm93bjtcbiAgc3RhdGUoc3RhdGU6IHVua25vd24pOiB0aGlzO1xuICBzdGF0ZShzdGF0ZT86IHVua25vd24pOiB1bmtub3dufHRoaXMge1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy4kJHN0YXRlO1xuICAgIH1cblxuICAgIHRoaXMuJCRzdGF0ZSA9IHN0YXRlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGZhY3RvcnkgZnVuY3Rpb24gdXNlZCB0byBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGAkbG9jYXRpb25TaGltYCBpbiBBbmd1bGFyLFxuICogYW5kIHByb3ZpZGVzIGFuIEFQSS1jb21wYXRpYmxlIGAkbG9jYXRpb25Qcm92aWRlcmAgZm9yIEFuZ3VsYXJKUy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyAkbG9jYXRpb25TaGltUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgbmdVcGdyYWRlOiBVcGdyYWRlTW9kdWxlLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgIHByaXZhdGUgcGxhdGZvcm1Mb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbiwgcHJpdmF0ZSB1cmxDb2RlYzogVXJsQ29kZWMsXG4gICAgICBwcml2YXRlIGxvY2F0aW9uU3RyYXRlZ3k6IExvY2F0aW9uU3RyYXRlZ3kpIHt9XG5cbiAgLyoqXG4gICAqIEZhY3RvcnkgbWV0aG9kIHRoYXQgcmV0dXJucyBhbiBpbnN0YW5jZSBvZiB0aGUgJGxvY2F0aW9uU2hpbVxuICAgKi9cbiAgJGdldCgpIHtcbiAgICByZXR1cm4gbmV3ICRsb2NhdGlvblNoaW0oXG4gICAgICAgIHRoaXMubmdVcGdyYWRlLiRpbmplY3RvciwgdGhpcy5sb2NhdGlvbiwgdGhpcy5wbGF0Zm9ybUxvY2F0aW9uLCB0aGlzLnVybENvZGVjLFxuICAgICAgICB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0dWIgbWV0aG9kIHVzZWQgdG8ga2VlcCBBUEkgY29tcGF0aWJsZSB3aXRoIEFuZ3VsYXJKUy4gVGhpcyBzZXR0aW5nIGlzIGNvbmZpZ3VyZWQgdGhyb3VnaFxuICAgKiB0aGUgTG9jYXRpb25VcGdyYWRlTW9kdWxlJ3MgYGNvbmZpZ2AgbWV0aG9kIGluIHlvdXIgQW5ndWxhciBhcHAuXG4gICAqL1xuICBoYXNoUHJlZml4KHByZWZpeD86IHN0cmluZykge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29uZmlndXJlIExvY2F0aW9uVXBncmFkZSB0aHJvdWdoIExvY2F0aW9uVXBncmFkZU1vZHVsZS5jb25maWcgbWV0aG9kLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0dWIgbWV0aG9kIHVzZWQgdG8ga2VlcCBBUEkgY29tcGF0aWJsZSB3aXRoIEFuZ3VsYXJKUy4gVGhpcyBzZXR0aW5nIGlzIGNvbmZpZ3VyZWQgdGhyb3VnaFxuICAgKiB0aGUgTG9jYXRpb25VcGdyYWRlTW9kdWxlJ3MgYGNvbmZpZ2AgbWV0aG9kIGluIHlvdXIgQW5ndWxhciBhcHAuXG4gICAqL1xuICBodG1sNU1vZGUobW9kZT86IGFueSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29uZmlndXJlIExvY2F0aW9uVXBncmFkZSB0aHJvdWdoIExvY2F0aW9uVXBncmFkZU1vZHVsZS5jb25maWcgbWV0aG9kLicpO1xuICB9XG59XG4iXX0=