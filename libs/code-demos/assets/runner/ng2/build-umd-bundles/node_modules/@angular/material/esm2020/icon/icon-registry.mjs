/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Optional, SecurityContext, SkipSelf, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, of as observableOf, throwError as observableThrow } from 'rxjs';
import { catchError, finalize, map, share, tap } from 'rxjs/operators';
import { trustedHTMLFromString } from './trusted-types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/platform-browser";
/**
 * Returns an exception to be thrown in the case when attempting to
 * load an icon with a name that cannot be found.
 * @docs-private
 */
export function getMatIconNameNotFoundError(iconName) {
    return Error(`Unable to find icon with the name "${iconName}"`);
}
/**
 * Returns an exception to be thrown when the consumer attempts to use
 * `<mat-icon>` without including @angular/common/http.
 * @docs-private
 */
export function getMatIconNoHttpProviderError() {
    return Error('Could not find HttpClient provider for use with Angular Material icons. ' +
        'Please include the HttpClientModule from @angular/common/http in your ' +
        'app imports.');
}
/**
 * Returns an exception to be thrown when a URL couldn't be sanitized.
 * @param url URL that was attempted to be sanitized.
 * @docs-private
 */
export function getMatIconFailedToSanitizeUrlError(url) {
    return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL ` +
        `via Angular's DomSanitizer. Attempted URL was "${url}".`);
}
/**
 * Returns an exception to be thrown when a HTML string couldn't be sanitized.
 * @param literal HTML that was attempted to be sanitized.
 * @docs-private
 */
export function getMatIconFailedToSanitizeLiteralError(literal) {
    return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by ` +
        `Angular's DomSanitizer. Attempted literal was "${literal}".`);
}
/**
 * Configuration for an icon, including the URL and possibly the cached SVG element.
 * @docs-private
 */
class SvgIconConfig {
    constructor(url, svgText, options) {
        this.url = url;
        this.svgText = svgText;
        this.options = options;
    }
}
/**
 * Service to register and display icons used by the `<mat-icon>` component.
 * - Registers icon URLs by namespace and name.
 * - Registers icon set URLs by namespace.
 * - Registers aliases for CSS classes, for use with icon fonts.
 * - Loads icons from URLs and extracts individual icons from icon sets.
 */
export class MatIconRegistry {
    constructor(_httpClient, _sanitizer, document, _errorHandler) {
        this._httpClient = _httpClient;
        this._sanitizer = _sanitizer;
        this._errorHandler = _errorHandler;
        /**
         * URLs and cached SVG elements for individual icons. Keys are of the format "[namespace]:[icon]".
         */
        this._svgIconConfigs = new Map();
        /**
         * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
         * Multiple icon sets can be registered under the same namespace.
         */
        this._iconSetConfigs = new Map();
        /** Cache for icons loaded by direct URLs. */
        this._cachedIconsByUrl = new Map();
        /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
        this._inProgressUrlFetches = new Map();
        /** Map from font identifiers to their CSS class names. Used for icon fonts. */
        this._fontCssClassesByAlias = new Map();
        /** Registered icon resolver functions. */
        this._resolvers = [];
        /**
         * The CSS classes to apply when an `<mat-icon>` component has no icon name, url, or font
         * specified. The default 'material-icons' value assumes that the material icon font has been
         * loaded as described at http://google.github.io/material-design-icons/#icon-font-for-the-web
         */
        this._defaultFontSetClass = ['material-icons', 'mat-ligature-font'];
        this._document = document;
    }
    /**
     * Registers an icon by URL in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    addSvgIcon(iconName, url, options) {
        return this.addSvgIconInNamespace('', iconName, url, options);
    }
    /**
     * Registers an icon using an HTML string in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    addSvgIconLiteral(iconName, literal, options) {
        return this.addSvgIconLiteralInNamespace('', iconName, literal, options);
    }
    /**
     * Registers an icon by URL in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    addSvgIconInNamespace(namespace, iconName, url, options) {
        return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig(url, null, options));
    }
    /**
     * Registers an icon resolver function with the registry. The function will be invoked with the
     * name and namespace of an icon when the registry tries to resolve the URL from which to fetch
     * the icon. The resolver is expected to return a `SafeResourceUrl` that points to the icon,
     * an object with the icon URL and icon options, or `null` if the icon is not supported. Resolvers
     * will be invoked in the order in which they have been registered.
     * @param resolver Resolver function to be registered.
     */
    addSvgIconResolver(resolver) {
        this._resolvers.push(resolver);
        return this;
    }
    /**
     * Registers an icon using an HTML string in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param literal SVG source of the icon.
     */
    addSvgIconLiteralInNamespace(namespace, iconName, literal, options) {
        const cleanLiteral = this._sanitizer.sanitize(SecurityContext.HTML, literal);
        // TODO: add an ngDevMode check
        if (!cleanLiteral) {
            throw getMatIconFailedToSanitizeLiteralError(literal);
        }
        // Security: The literal is passed in as SafeHtml, and is thus trusted.
        const trustedLiteral = trustedHTMLFromString(cleanLiteral);
        return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig('', trustedLiteral, options));
    }
    /**
     * Registers an icon set by URL in the default namespace.
     * @param url
     */
    addSvgIconSet(url, options) {
        return this.addSvgIconSetInNamespace('', url, options);
    }
    /**
     * Registers an icon set using an HTML string in the default namespace.
     * @param literal SVG source of the icon set.
     */
    addSvgIconSetLiteral(literal, options) {
        return this.addSvgIconSetLiteralInNamespace('', literal, options);
    }
    /**
     * Registers an icon set by URL in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param url
     */
    addSvgIconSetInNamespace(namespace, url, options) {
        return this._addSvgIconSetConfig(namespace, new SvgIconConfig(url, null, options));
    }
    /**
     * Registers an icon set using an HTML string in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param literal SVG source of the icon set.
     */
    addSvgIconSetLiteralInNamespace(namespace, literal, options) {
        const cleanLiteral = this._sanitizer.sanitize(SecurityContext.HTML, literal);
        if (!cleanLiteral) {
            throw getMatIconFailedToSanitizeLiteralError(literal);
        }
        // Security: The literal is passed in as SafeHtml, and is thus trusted.
        const trustedLiteral = trustedHTMLFromString(cleanLiteral);
        return this._addSvgIconSetConfig(namespace, new SvgIconConfig('', trustedLiteral, options));
    }
    /**
     * Defines an alias for CSS class names to be used for icon fonts. Creating an matIcon
     * component with the alias as the fontSet input will cause the class name to be applied
     * to the `<mat-icon>` element.
     *
     * If the registered font is a ligature font, then don't forget to also include the special
     * class `mat-ligature-font` to allow the usage via attribute. So register like this:
     *
     * ```ts
     * iconRegistry.registerFontClassAlias('f1', 'font1 mat-ligature-font');
     * ```
     *
     * And use like this:
     *
     * ```html
     * <mat-icon fontSet="f1" fontIcon="home"></mat-icon>
     * ```
     *
     * @param alias Alias for the font.
     * @param classNames Class names override to be used instead of the alias.
     */
    registerFontClassAlias(alias, classNames = alias) {
        this._fontCssClassesByAlias.set(alias, classNames);
        return this;
    }
    /**
     * Returns the CSS class name associated with the alias by a previous call to
     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
     */
    classNameForFontAlias(alias) {
        return this._fontCssClassesByAlias.get(alias) || alias;
    }
    /**
     * Sets the CSS classes to be used for icon fonts when an `<mat-icon>` component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     */
    setDefaultFontSetClass(...classNames) {
        this._defaultFontSetClass = classNames;
        return this;
    }
    /**
     * Returns the CSS classes to be used for icon fonts when an `<mat-icon>` component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     */
    getDefaultFontSetClass() {
        return this._defaultFontSetClass;
    }
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
     * The response from the URL may be cached so this will not always cause an HTTP request, but
     * the produced element will always be a new copy of the originally fetched icon. (That is,
     * it will not contain any modifications made to elements previously returned).
     *
     * @param safeUrl URL from which to fetch the SVG icon.
     */
    getSvgIconFromUrl(safeUrl) {
        const url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
        if (!url) {
            throw getMatIconFailedToSanitizeUrlError(safeUrl);
        }
        const cachedIcon = this._cachedIconsByUrl.get(url);
        if (cachedIcon) {
            return observableOf(cloneSvg(cachedIcon));
        }
        return this._loadSvgIconFromConfig(new SvgIconConfig(safeUrl, null)).pipe(tap(svg => this._cachedIconsByUrl.set(url, svg)), map(svg => cloneSvg(svg)));
    }
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
     * if not, the Observable will throw an error.
     *
     * @param name Name of the icon to be retrieved.
     * @param namespace Namespace in which to look for the icon.
     */
    getNamedSvgIcon(name, namespace = '') {
        const key = iconKey(namespace, name);
        let config = this._svgIconConfigs.get(key);
        // Return (copy of) cached icon if possible.
        if (config) {
            return this._getSvgFromConfig(config);
        }
        // Otherwise try to resolve the config from one of the resolver functions.
        config = this._getIconConfigFromResolvers(namespace, name);
        if (config) {
            this._svgIconConfigs.set(key, config);
            return this._getSvgFromConfig(config);
        }
        // See if we have any icon sets registered for the namespace.
        const iconSetConfigs = this._iconSetConfigs.get(namespace);
        if (iconSetConfigs) {
            return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
        }
        return observableThrow(getMatIconNameNotFoundError(key));
    }
    ngOnDestroy() {
        this._resolvers = [];
        this._svgIconConfigs.clear();
        this._iconSetConfigs.clear();
        this._cachedIconsByUrl.clear();
    }
    /**
     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
     */
    _getSvgFromConfig(config) {
        if (config.svgText) {
            // We already have the SVG element for this icon, return a copy.
            return observableOf(cloneSvg(this._svgElementFromConfig(config)));
        }
        else {
            // Fetch the icon from the config's URL, cache it, and return a copy.
            return this._loadSvgIconFromConfig(config).pipe(map(svg => cloneSvg(svg)));
        }
    }
    /**
     * Attempts to find an icon with the specified name in any of the SVG icon sets.
     * First searches the available cached icons for a nested element with a matching name, and
     * if found copies the element to a new `<svg>` element. If not found, fetches all icon sets
     * that have not been cached, and searches again after all fetches are completed.
     * The returned Observable produces the SVG element if possible, and throws
     * an error if no icon with the specified name can be found.
     */
    _getSvgFromIconSetConfigs(name, iconSetConfigs) {
        // For all the icon set SVG elements we've fetched, see if any contain an icon with the
        // requested name.
        const namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
        if (namedIcon) {
            // We could cache namedIcon in _svgIconConfigs, but since we have to make a copy every
            // time anyway, there's probably not much advantage compared to just always extracting
            // it from the icon set.
            return observableOf(namedIcon);
        }
        // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
        // fetched, fetch them now and look for iconName in the results.
        const iconSetFetchRequests = iconSetConfigs
            .filter(iconSetConfig => !iconSetConfig.svgText)
            .map(iconSetConfig => {
            return this._loadSvgIconSetFromConfig(iconSetConfig).pipe(catchError((err) => {
                const url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, iconSetConfig.url);
                // Swallow errors fetching individual URLs so the
                // combined Observable won't necessarily fail.
                const errorMessage = `Loading icon set URL: ${url} failed: ${err.message}`;
                this._errorHandler.handleError(new Error(errorMessage));
                return observableOf(null);
            }));
        });
        // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
        // cached SVG element (unless the request failed), and we can check again for the icon.
        return forkJoin(iconSetFetchRequests).pipe(map(() => {
            const foundIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
            // TODO: add an ngDevMode check
            if (!foundIcon) {
                throw getMatIconNameNotFoundError(name);
            }
            return foundIcon;
        }));
    }
    /**
     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    _extractIconWithNameFromAnySet(iconName, iconSetConfigs) {
        // Iterate backwards, so icon sets added later have precedence.
        for (let i = iconSetConfigs.length - 1; i >= 0; i--) {
            const config = iconSetConfigs[i];
            // Parsing the icon set's text into an SVG element can be expensive. We can avoid some of
            // the parsing by doing a quick check using `indexOf` to see if there's any chance for the
            // icon to be in the set. This won't be 100% accurate, but it should help us avoid at least
            // some of the parsing.
            if (config.svgText && config.svgText.toString().indexOf(iconName) > -1) {
                const svg = this._svgElementFromConfig(config);
                const foundIcon = this._extractSvgIconFromSet(svg, iconName, config.options);
                if (foundIcon) {
                    return foundIcon;
                }
            }
        }
        return null;
    }
    /**
     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     */
    _loadSvgIconFromConfig(config) {
        return this._fetchIcon(config).pipe(tap(svgText => (config.svgText = svgText)), map(() => this._svgElementFromConfig(config)));
    }
    /**
     * Loads the content of the icon set URL specified in the
     * SvgIconConfig and attaches it to the config.
     */
    _loadSvgIconSetFromConfig(config) {
        if (config.svgText) {
            return observableOf(null);
        }
        return this._fetchIcon(config).pipe(tap(svgText => (config.svgText = svgText)));
    }
    /**
     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     */
    _extractSvgIconFromSet(iconSet, iconName, options) {
        // Use the `id="iconName"` syntax in order to escape special
        // characters in the ID (versus using the #iconName syntax).
        const iconSource = iconSet.querySelector(`[id="${iconName}"]`);
        if (!iconSource) {
            return null;
        }
        // Clone the element and remove the ID to prevent multiple elements from being added
        // to the page with the same ID.
        const iconElement = iconSource.cloneNode(true);
        iconElement.removeAttribute('id');
        // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
        // the content of a new <svg> node.
        if (iconElement.nodeName.toLowerCase() === 'svg') {
            return this._setSvgAttributes(iconElement, options);
        }
        // If the node is a <symbol>, it won't be rendered so we have to convert it into <svg>. Note
        // that the same could be achieved by referring to it via <use href="#id">, however the <use>
        // tag is problematic on Firefox, because it needs to include the current page path.
        if (iconElement.nodeName.toLowerCase() === 'symbol') {
            return this._setSvgAttributes(this._toSvgElement(iconElement), options);
        }
        // createElement('SVG') doesn't work as expected; the DOM ends up with
        // the correct nodes, but the SVG content doesn't render. Instead we
        // have to create an empty SVG node using innerHTML and append its content.
        // Elements created using DOMParser.parseFromString have the same problem.
        // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
        const svg = this._svgElementFromString(trustedHTMLFromString('<svg></svg>'));
        // Clone the node so we don't remove it from the parent icon set element.
        svg.appendChild(iconElement);
        return this._setSvgAttributes(svg, options);
    }
    /**
     * Creates a DOM element from the given SVG string.
     */
    _svgElementFromString(str) {
        const div = this._document.createElement('DIV');
        div.innerHTML = str;
        const svg = div.querySelector('svg');
        // TODO: add an ngDevMode check
        if (!svg) {
            throw Error('<svg> tag not found');
        }
        return svg;
    }
    /**
     * Converts an element into an SVG node by cloning all of its children.
     */
    _toSvgElement(element) {
        const svg = this._svgElementFromString(trustedHTMLFromString('<svg></svg>'));
        const attributes = element.attributes;
        // Copy over all the attributes from the `symbol` to the new SVG, except the id.
        for (let i = 0; i < attributes.length; i++) {
            const { name, value } = attributes[i];
            if (name !== 'id') {
                svg.setAttribute(name, value);
            }
        }
        for (let i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType === this._document.ELEMENT_NODE) {
                svg.appendChild(element.childNodes[i].cloneNode(true));
            }
        }
        return svg;
    }
    /**
     * Sets the default attributes for an SVG element to be used as an icon.
     */
    _setSvgAttributes(svg, options) {
        svg.setAttribute('fit', '');
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
        if (options && options.viewBox) {
            svg.setAttribute('viewBox', options.viewBox);
        }
        return svg;
    }
    /**
     * Returns an Observable which produces the string contents of the given icon. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     */
    _fetchIcon(iconConfig) {
        const { url: safeUrl, options } = iconConfig;
        const withCredentials = options?.withCredentials ?? false;
        if (!this._httpClient) {
            throw getMatIconNoHttpProviderError();
        }
        // TODO: add an ngDevMode check
        if (safeUrl == null) {
            throw Error(`Cannot fetch icon from URL "${safeUrl}".`);
        }
        const url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
        // TODO: add an ngDevMode check
        if (!url) {
            throw getMatIconFailedToSanitizeUrlError(safeUrl);
        }
        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
        // already a request in progress for that URL. It's necessary to call share() on the
        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
        const inProgressFetch = this._inProgressUrlFetches.get(url);
        if (inProgressFetch) {
            return inProgressFetch;
        }
        const req = this._httpClient.get(url, { responseType: 'text', withCredentials }).pipe(map(svg => {
            // Security: This SVG is fetched from a SafeResourceUrl, and is thus
            // trusted HTML.
            return trustedHTMLFromString(svg);
        }), finalize(() => this._inProgressUrlFetches.delete(url)), share());
        this._inProgressUrlFetches.set(url, req);
        return req;
    }
    /**
     * Registers an icon config by name in the specified namespace.
     * @param namespace Namespace in which to register the icon config.
     * @param iconName Name under which to register the config.
     * @param config Config to be registered.
     */
    _addSvgIconConfig(namespace, iconName, config) {
        this._svgIconConfigs.set(iconKey(namespace, iconName), config);
        return this;
    }
    /**
     * Registers an icon set config in the specified namespace.
     * @param namespace Namespace in which to register the icon config.
     * @param config Config to be registered.
     */
    _addSvgIconSetConfig(namespace, config) {
        const configNamespace = this._iconSetConfigs.get(namespace);
        if (configNamespace) {
            configNamespace.push(config);
        }
        else {
            this._iconSetConfigs.set(namespace, [config]);
        }
        return this;
    }
    /** Parses a config's text into an SVG element. */
    _svgElementFromConfig(config) {
        if (!config.svgElement) {
            const svg = this._svgElementFromString(config.svgText);
            this._setSvgAttributes(svg, config.options);
            config.svgElement = svg;
        }
        return config.svgElement;
    }
    /** Tries to create an icon config through the registered resolver functions. */
    _getIconConfigFromResolvers(namespace, name) {
        for (let i = 0; i < this._resolvers.length; i++) {
            const result = this._resolvers[i](name, namespace);
            if (result) {
                return isSafeUrlWithOptions(result)
                    ? new SvgIconConfig(result.url, null, result.options)
                    : new SvgIconConfig(result, null);
            }
        }
        return undefined;
    }
}
MatIconRegistry.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatIconRegistry, deps: [{ token: i1.HttpClient, optional: true }, { token: i2.DomSanitizer }, { token: DOCUMENT, optional: true }, { token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Injectable });
MatIconRegistry.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatIconRegistry, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatIconRegistry, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient, decorators: [{
                    type: Optional
                }] }, { type: i2.DomSanitizer }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ErrorHandler }]; } });
/** @docs-private */
export function ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, httpClient, sanitizer, errorHandler, document) {
    return parentRegistry || new MatIconRegistry(httpClient, sanitizer, document, errorHandler);
}
/** @docs-private */
export const ICON_REGISTRY_PROVIDER = {
    // If there is already an MatIconRegistry available, use that. Otherwise, provide a new one.
    provide: MatIconRegistry,
    deps: [
        [new Optional(), new SkipSelf(), MatIconRegistry],
        [new Optional(), HttpClient],
        DomSanitizer,
        ErrorHandler,
        [new Optional(), DOCUMENT],
    ],
    useFactory: ICON_REGISTRY_PROVIDER_FACTORY,
};
/** Clones an SVGElement while preserving type information. */
function cloneSvg(svg) {
    return svg.cloneNode(true);
}
/** Returns the cache key to use for an icon namespace and name. */
function iconKey(namespace, name) {
    return namespace + ':' + name;
}
function isSafeUrlWithOptions(value) {
    return !!(value.url && value.options);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1yZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9pY29uL2ljb24tcmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxVQUFVLEVBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDbkUsT0FBTyxFQUNMLFlBQVksRUFDWixNQUFNLEVBQ04sVUFBVSxFQUdWLFFBQVEsRUFDUixlQUFlLEVBQ2YsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQTRCLE1BQU0sMkJBQTJCLENBQUM7QUFDbEYsT0FBTyxFQUFDLFFBQVEsRUFBYyxFQUFFLElBQUksWUFBWSxFQUFFLFVBQVUsSUFBSSxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0YsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRSxPQUFPLEVBQWMscUJBQXFCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUVuRTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUFDLFFBQWdCO0lBQzFELE9BQU8sS0FBSyxDQUFDLHNDQUFzQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QjtJQUMzQyxPQUFPLEtBQUssQ0FDViwwRUFBMEU7UUFDeEUsd0VBQXdFO1FBQ3hFLGNBQWMsQ0FDakIsQ0FBQztBQUNKLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtDQUFrQyxDQUFDLEdBQW9CO0lBQ3JFLE9BQU8sS0FBSyxDQUNWLHdFQUF3RTtRQUN0RSxrREFBa0QsR0FBRyxJ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QUUsSUFBWTtJQUM5QyxPQUFPLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ2hDLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLEtBQVU7SUFDdEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1xuICBFcnJvckhhbmRsZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFNlY3VyaXR5Q29udGV4dCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCB0aHJvd0Vycm9yIGFzIG9ic2VydmFibGVUaHJvd30gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIGZpbmFsaXplLCBtYXAsIHNoYXJlLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7VHJ1c3RlZEhUTUwsIHRydXN0ZWRIVE1MRnJvbVN0cmluZ30gZnJvbSAnLi90cnVzdGVkLXR5cGVzJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gaW4gdGhlIGNhc2Ugd2hlbiBhdHRlbXB0aW5nIHRvXG4gKiBsb2FkIGFuIGljb24gd2l0aCBhIG5hbWUgdGhhdCBjYW5ub3QgYmUgZm91bmQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRJY29uTmFtZU5vdEZvdW5kRXJyb3IoaWNvbk5hbWU6IHN0cmluZyk6IEVycm9yIHtcbiAgcmV0dXJuIEVycm9yKGBVbmFibGUgdG8gZmluZCBpY29uIHdpdGggdGhlIG5hbWUgXCIke2ljb25OYW1lfVwiYCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duIHdoZW4gdGhlIGNvbnN1bWVyIGF0dGVtcHRzIHRvIHVzZVxuICogYDxtYXQtaWNvbj5gIHdpdGhvdXQgaW5jbHVkaW5nIEBhbmd1bGFyL2NvbW1vbi9odHRwLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0SWNvbk5vSHR0cFByb3ZpZGVyRXJyb3IoKTogRXJyb3Ige1xuICByZXR1cm4gRXJyb3IoXG4gICAgJ0NvdWxkIG5vdCBmaW5kIEh0dHBDbGllbnQgcHJvdmlkZXIgZm9yIHVzZSB3aXRoIEFuZ3VsYXIgTWF0ZXJpYWwgaWNvbnMuICcgK1xuICAgICAgJ1BsZWFzZSBpbmNsdWRlIHRoZSBIdHRwQ2xpZW50TW9kdWxlIGZyb20gQGFuZ3VsYXIvY29tbW9uL2h0dHAgaW4geW91ciAnICtcbiAgICAgICdhcHAgaW1wb3J0cy4nLFxuICApO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biB3aGVuIGEgVVJMIGNvdWxkbid0IGJlIHNhbml0aXplZC5cbiAqIEBwYXJhbSB1cmwgVVJMIHRoYXQgd2FzIGF0dGVtcHRlZCB0byBiZSBzYW5pdGl6ZWQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRJY29uRmFpbGVkVG9TYW5pdGl6ZVVybEVycm9yKHVybDogU2FmZVJlc291cmNlVXJsKTogRXJyb3Ige1xuICByZXR1cm4gRXJyb3IoXG4gICAgYFRoZSBVUkwgcHJvdmlkZWQgdG8gTWF0SWNvblJlZ2lzdHJ5IHdhcyBub3QgdHJ1c3RlZCBhcyBhIHJlc291cmNlIFVSTCBgICtcbiAgICAgIGB2aWEgQW5ndWxhcidzIERvbVNhbml0aXplci4gQXR0ZW1wdGVkIFVSTCB3YXMgXCIke3VybH1cIi5gLFxuICApO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biB3aGVuIGEgSFRNTCBzdHJpbmcgY291bGRuJ3QgYmUgc2FuaXRpemVkLlxuICogQHBhcmFtIGxpdGVyYWwgSFRNTCB0aGF0IHdhcyBhdHRlbXB0ZWQgdG8gYmUgc2FuaXRpemVkLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0SWNvbkZhaWxlZFRvU2FuaXRpemVMaXRlcmFsRXJyb3IobGl0ZXJhbDogU2FmZUh0bWwpOiBFcnJvciB7XG4gIHJldHVybiBFcnJvcihcbiAgICBgVGhlIGxpdGVyYWwgcHJvdmlkZWQgdG8gTWF0SWNvblJlZ2lzdHJ5IHdhcyBub3QgdHJ1c3RlZCBhcyBzYWZlIEhUTUwgYnkgYCArXG4gICAgICBgQW5ndWxhcidzIERvbVNhbml0aXplci4gQXR0ZW1wdGVkIGxpdGVyYWwgd2FzIFwiJHtsaXRlcmFsfVwiLmAsXG4gICk7XG59XG5cbi8qKiBPcHRpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIGhvdyBhbiBpY29uIG9yIHRoZSBpY29ucyBpbiBhbiBpY29uIHNldCBhcmUgcHJlc2VudGVkLiAqL1xuZXhwb3J0IGludGVyZmFjZSBJY29uT3B0aW9ucyB7XG4gIC8qKiBWaWV3IGJveCB0byBzZXQgb24gdGhlIGljb24uICovXG4gIHZpZXdCb3g/OiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRvIGZldGNoIHRoZSBpY29uIG9yIGljb24gc2V0IHVzaW5nIEhUVFAgY3JlZGVudGlhbHMuICovXG4gIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCB3aWxsIGJlIGludm9rZWQgYnkgdGhlIGljb24gcmVnaXN0cnkgd2hlbiB0cnlpbmcgdG8gcmVzb2x2ZSB0aGVcbiAqIFVSTCBmcm9tIHdoaWNoIHRvIGZldGNoIGFuIGljb24uIFRoZSByZXR1cm5lZCBVUkwgd2lsbCBiZSB1c2VkIHRvIG1ha2UgYSByZXF1ZXN0IGZvciB0aGUgaWNvbi5cbiAqL1xuZXhwb3J0IHR5cGUgSWNvblJlc29sdmVyID0gKFxuICBuYW1lOiBzdHJpbmcsXG4gIG5hbWVzcGFjZTogc3RyaW5nLFxuKSA9PiBTYWZlUmVzb3VyY2VVcmwgfCBTYWZlUmVzb3VyY2VVcmxXaXRoSWNvbk9wdGlvbnMgfCBudWxsO1xuXG4vKiogT2JqZWN0IHRoYXQgc3BlY2lmaWVzIGEgVVJMIGZyb20gd2hpY2ggdG8gZmV0Y2ggYW4gaWNvbiBhbmQgdGhlIG9wdGlvbnMgdG8gdXNlIGZvciBpdC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVJlc291cmNlVXJsV2l0aEljb25PcHRpb25zIHtcbiAgdXJsOiBTYWZlUmVzb3VyY2VVcmw7XG4gIG9wdGlvbnM6IEljb25PcHRpb25zO1xufVxuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGFuIGljb24sIGluY2x1ZGluZyB0aGUgVVJMIGFuZCBwb3NzaWJseSB0aGUgY2FjaGVkIFNWRyBlbGVtZW50LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5jbGFzcyBTdmdJY29uQ29uZmlnIHtcbiAgc3ZnRWxlbWVudDogU1ZHRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHVybDogU2FmZVJlc291cmNlVXJsLFxuICAgIHB1YmxpYyBzdmdUZXh0OiBUcnVzdGVkSFRNTCB8IG51bGwsXG4gICAgcHVibGljIG9wdGlvbnM/OiBJY29uT3B0aW9ucyxcbiAgKSB7fVxufVxuXG4vKiogSWNvbiBjb25maWd1cmF0aW9uIHdob3NlIGNvbnRlbnQgaGFzIGFscmVhZHkgYmVlbiBsb2FkZWQuICovXG50eXBlIExvYWRlZFN2Z0ljb25Db25maWcgPSBTdmdJY29uQ29uZmlnICYge3N2Z1RleHQ6IFRydXN0ZWRIVE1MfTtcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIHJlZ2lzdGVyIGFuZCBkaXNwbGF5IGljb25zIHVzZWQgYnkgdGhlIGA8bWF0LWljb24+YCBjb21wb25lbnQuXG4gKiAtIFJlZ2lzdGVycyBpY29uIFVSTHMgYnkgbmFtZXNwYWNlIGFuZCBuYW1lLlxuICogLSBSZWdpc3RlcnMgaWNvbiBzZXQgVVJMcyBieSBuYW1lc3BhY2UuXG4gKiAtIFJlZ2lzdGVycyBhbGlhc2VzIGZvciBDU1MgY2xhc3NlcywgZm9yIHVzZSB3aXRoIGljb24gZm9udHMuXG4gKiAtIExvYWRzIGljb25zIGZyb20gVVJMcyBhbmQgZXh0cmFjdHMgaW5kaXZpZHVhbCBpY29ucyBmcm9tIGljb24gc2V0cy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTWF0SWNvblJlZ2lzdHJ5IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIC8qKlxuICAgKiBVUkxzIGFuZCBjYWNoZWQgU1ZHIGVsZW1lbnRzIGZvciBpbmRpdmlkdWFsIGljb25zLiBLZXlzIGFyZSBvZiB0aGUgZm9ybWF0IFwiW25hbWVzcGFjZV06W2ljb25dXCIuXG4gICAqL1xuICBwcml2YXRlIF9zdmdJY29uQ29uZmlncyA9IG5ldyBNYXA8c3RyaW5nLCBTdmdJY29uQ29uZmlnPigpO1xuXG4gIC8qKlxuICAgKiBTdmdJY29uQ29uZmlnIG9iamVjdHMgYW5kIGNhY2hlZCBTVkcgZWxlbWVudHMgZm9yIGljb24gc2V0cywga2V5ZWQgYnkgbmFtZXNwYWNlLlxuICAgKiBNdWx0aXBsZSBpY29uIHNldHMgY2FuIGJlIHJlZ2lzdGVyZWQgdW5kZXIgdGhlIHNhbWUgbmFtZXNwYWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfaWNvblNldENvbmZpZ3MgPSBuZXcgTWFwPHN0cmluZywgU3ZnSWNvbkNvbmZpZ1tdPigpO1xuXG4gIC8qKiBDYWNoZSBmb3IgaWNvbnMgbG9hZGVkIGJ5IGRpcmVjdCBVUkxzLiAqL1xuICBwcml2YXRlIF9jYWNoZWRJY29uc0J5VXJsID0gbmV3IE1hcDxzdHJpbmcsIFNWR0VsZW1lbnQ+KCk7XG5cbiAgLyoqIEluLXByb2dyZXNzIGljb24gZmV0Y2hlcy4gVXNlZCB0byBjb2FsZXNjZSBtdWx0aXBsZSByZXF1ZXN0cyB0byB0aGUgc2FtZSBVUkwuICovXG4gIHByaXZhdGUgX2luUHJvZ3Jlc3NVcmxGZXRjaGVzID0gbmV3IE1hcDxzdHJpbmcsIE9ic2VydmFibGU8VHJ1c3RlZEhUTUw+PigpO1xuXG4gIC8qKiBNYXAgZnJvbSBmb250IGlkZW50aWZpZXJzIHRvIHRoZWlyIENTUyBjbGFzcyBuYW1lcy4gVXNlZCBmb3IgaWNvbiBmb250cy4gKi9cbiAgcHJpdmF0ZSBfZm9udENzc0NsYXNzZXNCeUFsaWFzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICAvKiogUmVnaXN0ZXJlZCBpY29uIHJlc29sdmVyIGZ1bmN0aW9ucy4gKi9cbiAgcHJpdmF0ZSBfcmVzb2x2ZXJzOiBJY29uUmVzb2x2ZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgQ1NTIGNsYXNzZXMgdG8gYXBwbHkgd2hlbiBhbiBgPG1hdC1pY29uPmAgY29tcG9uZW50IGhhcyBubyBpY29uIG5hbWUsIHVybCwgb3IgZm9udFxuICAgKiBzcGVjaWZpZWQuIFRoZSBkZWZhdWx0ICdtYXRlcmlhbC1pY29ucycgdmFsdWUgYXNzdW1lcyB0aGF0IHRoZSBtYXRlcmlhbCBpY29uIGZvbnQgaGFzIGJlZW5cbiAgICogbG9hZGVkIGFzIGRlc2NyaWJlZCBhdCBodHRwOi8vZ29vZ2xlLmdpdGh1Yi5pby9tYXRlcmlhbC1kZXNpZ24taWNvbnMvI2ljb24tZm9udC1mb3ItdGhlLXdlYlxuICAgKi9cbiAgcHJpdmF0ZSBfZGVmYXVsdEZvbnRTZXRDbGFzcyA9IFsnbWF0ZXJpYWwtaWNvbnMnLCAnbWF0LWxpZ2F0dXJlLWZvbnQnXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9odHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsXG4gICkge1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGljb24gYnkgVVJMIGluIHRoZSBkZWZhdWx0IG5hbWVzcGFjZS5cbiAgICogQHBhcmFtIGljb25OYW1lIE5hbWUgdW5kZXIgd2hpY2ggdGhlIGljb24gc2hvdWxkIGJlIHJlZ2lzdGVyZWQuXG4gICAqIEBwYXJhbSB1cmxcbiAgICovXG4gIGFkZFN2Z0ljb24oaWNvbk5hbWU6IHN0cmluZywgdXJsOiBTYWZlUmVzb3VyY2VVcmwsIG9wdGlvbnM/OiBJY29uT3B0aW9ucyk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzLmFkZFN2Z0ljb25Jbk5hbWVzcGFjZSgnJywgaWNvbk5hbWUsIHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGljb24gdXNpbmcgYW4gSFRNTCBzdHJpbmcgaW4gdGhlIGRlZmF1bHQgbmFtZXNwYWNlLlxuICAgKiBAcGFyYW0gaWNvbk5hbWUgTmFtZSB1bmRlciB3aGljaCB0aGUgaWNvbiBzaG91bGQgYmUgcmVnaXN0ZXJlZC5cbiAgICogQHBhcmFtIGxpdGVyYWwgU1ZHIHNvdXJjZSBvZiB0aGUgaWNvbi5cbiAgICovXG4gIGFkZFN2Z0ljb25MaXRlcmFsKGljb25OYW1lOiBzdHJpbmcsIGxpdGVyYWw6IFNhZmVIdG1sLCBvcHRpb25zPzogSWNvbk9wdGlvbnMpOiB0aGlzIHtcbiAgICByZXR1cm4gdGhpcy5hZGRTdmdJY29uTGl0ZXJhbEluTmFtZXNwYWNlKCcnLCBpY29uTmFtZSwgbGl0ZXJhbCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGljb24gYnkgVVJMIGluIHRoZSBzcGVjaWZpZWQgbmFtZXNwYWNlLlxuICAgKiBAcGFyYW0gbmFtZXNwYWNlIE5hbWVzcGFjZSBpbiB3aGljaCB0aGUgaWNvbiBzaG91bGQgYmUgcmVnaXN0ZXJlZC5cbiAgICogQHBhcmFtIGljb25OYW1lIE5hbWUgdW5kZXIgd2hpY2ggdGhlIGljb24gc2hvdWxkIGJlIHJlZ2lzdGVyZWQuXG4gICAqIEBwYXJhbSB1cmxcbiAgICovXG4gIGFkZFN2Z0ljb25Jbk5hbWVzcGFjZShcbiAgICBuYW1lc3BhY2U6IHN0cmluZyxcbiAgICBpY29uTmFtZTogc3RyaW5nLFxuICAgIHVybDogU2FmZVJlc291cmNlVXJsLFxuICAgIG9wdGlvbnM/OiBJY29uT3B0aW9ucyxcbiAgKTogdGhpcyB7XG4gICAgcmV0dXJuIHRoaXMuX2FkZFN2Z0ljb25Db25maWcobmFtZXNwYWNlLCBpY29uTmFtZSwgbmV3IFN2Z0ljb25Db25maWcodXJsLCBudWxsLCBvcHRpb25zKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGljb24gcmVzb2x2ZXIgZnVuY3Rpb24gd2l0aCB0aGUgcmVnaXN0cnkuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGludm9rZWQgd2l0aCB0aGVcbiAgICogbmFtZSBhbmQgbmFtZXNwYWNlIG9mIGFuIGljb24gd2hlbiB0aGUgcmVnaXN0cnkgdHJpZXMgdG8gcmVzb2x2ZSB0aGUgVVJMIGZyb20gd2hpY2ggdG8gZmV0Y2hcbiAgICogdGhlIGljb24uIFRoZSByZXNvbHZlciBpcyBleHBlY3RlZCB0byByZXR1cm4gYSBgU2FmZVJlc291cmNlVXJsYCB0aGF0IHBvaW50cyB0byB0aGUgaWNvbixcbiAgICogYW4gb2JqZWN0IHdpdGggdGhlIGljb24gVVJMIGFuZCBpY29uIG9wdGlvbnMsIG9yIGBudWxsYCBpZiB0aGUgaWNvbiBpcyBub3Qgc3VwcG9ydGVkLiBSZXNvbHZlcnNcbiAgICogd2lsbCBiZSBpbnZva2VkIGluIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IGhhdmUgYmVlbiByZWdpc3RlcmVkLlxuICAgKiBAcGFyYW0gcmVzb2x2ZXIgUmVzb2x2ZXIgZnVuY3Rpb24gdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIGFkZFN2Z0ljb25SZXNvbHZlcihyZXNvbHZlcjogSWNvblJlc29sdmVyKTogdGhpcyB7XG4gICAgdGhpcy5fcmVzb2x2ZXJzLnB1c2gocmVzb2x2ZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBpY29uIHVzaW5nIGFuIEhUTUwgc3RyaW5nIGluIHRoZSBzcGVjaWZpZWQgbmFtZXNwYWNlLlxuICAgKiBAcGFyYW0gbmFtZXNwYWNlIE5hbWVzcGFjZSBpbiB3aGljaCB0aGUgaWNvbiBzaG91bGQgYmUgcmVnaXN0ZXJlZC5cbiAgICogQHBhcmFtIGljb25OYW1lIE5hbWUgdW5kZXIgd2hpY2ggdGhlIGljb24gc2hvdWxkIGJlIHJlZ2lzdGVyZWQuXG4gICAqIEBwYXJhbSBsaXRlcmFsIFNWRyBzb3VyY2Ugb2YgdGhlIGljb24uXG4gICAqL1xuICBhZGRTdmdJY29uTGl0ZXJhbEluTmFtZXNwYWNlKFxuICAgIG5hbWVzcGFjZTogc3RyaW5nLFxuICAgIGljb25OYW1lOiBzdHJpbmcsXG4gICAgbGl0ZXJhbDogU2FmZUh0bWwsXG4gICAgb3B0aW9ucz86IEljb25PcHRpb25zLFxuICApOiB0aGlzIHtcbiAgICBjb25zdCBjbGVhbkxpdGVyYWwgPSB0aGlzLl9zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LkhUTUwsIGxpdGVyYWwpO1xuXG4gICAgLy8gVE9ETzogYWRkIGFuIG5nRGV2TW9kZSBjaGVja1xuICAgIGlmICghY2xlYW5MaXRlcmFsKSB7XG4gICAgICB0aHJvdyBnZXRNYXRJY29uRmFpbGVkVG9TYW5pdGl6ZUxpdGVyYWxFcnJvcihsaXRlcmFsKTtcbiAgICB9XG5cbiAgICAvLyBTZWN1cml0eTogVGhlIGxpdGVyYWwgaXMgcGFzc2VkIGluIGFzIFNhZmVIdG1sLCBhbmQgaXMgdGh1cyB0cnVzdGVkLlxuICAgIGNvbnN0IHRydXN0ZWRMaXRlcmFsID0gdHJ1c3RlZEhUTUxGcm9tU3RyaW5nKGNsZWFuTGl0ZXJhbCk7XG4gICAgcmV0dXJuIHRoaXMuX2FkZFN2Z0ljb25Db25maWcoXG4gICAgICBuYW1lc3BhY2UsXG4gICAgICBpY29uTmFtZSxcbiAgICAgIG5ldyBTdmdJY29uQ29uZmlnKCcnLCB0cnVzdGVkTGl0ZXJhbCwgb3B0aW9ucyksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gaWNvbiBzZXQgYnkgVVJMIGluIHRoZSBkZWZhdWx0IG5hbWVzcGFjZS5cbiAgICogQHBhcmFtIHVybFxuICAgKi9cbiAgYWRkU3ZnSWNvblNldCh1cmw6IFNhZmVSZXNvdXJjZVVybCwgb3B0aW9ucz86IEljb25PcHRpb25zKTogdGhpcyB7XG4gICAgcmV0dXJuIHRoaXMuYWRkU3ZnSWNvblNldEluTmFtZXNwYWNlKCcnLCB1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBpY29uIHNldCB1c2luZyBhbiBIVE1MIHN0cmluZyBpbiB0aGUgZGVmYXVsdCBuYW1lc3BhY2UuXG4gICAqIEBwYXJhbSBsaXRlcmFsIFNWRyBzb3VyY2Ugb2YgdGhlIGljb24gc2V0LlxuICAgKi9cbiAgYWRkU3ZnSWNvblNldExpdGVyYWwobGl0ZXJhbDogU2FmZUh0bWwsIG9wdGlvbnM/OiBJY29uT3B0aW9ucyk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzLmFkZFN2Z0ljb25TZXRMaXRlcmFsSW5OYW1lc3BhY2UoJycsIGxpdGVyYWwsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBpY29uIHNldCBieSBVUkwgaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgTmFtZXNwYWNlIGluIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBpY29uIHNldC5cbiAgICogQHBhcmFtIHVybFxuICAgKi9cbiAgYWRkU3ZnSWNvblNldEluTmFtZXNwYWNlKG5hbWVzcGFjZTogc3RyaW5nLCB1cmw6IFNhZmVSZXNvdXJjZVVybCwgb3B0aW9ucz86IEljb25PcHRpb25zKTogdGhpcyB7XG4gICAgcmV0dXJuIHRoaXMuX2FkZFN2Z0ljb25TZXRDb25maWcobmFtZXNwYWNlLCBuZXcgU3ZnSWNvbkNvbmZpZyh1cmwsIG51bGwsIG9wdGlvbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gaWNvbiBzZXQgdXNpbmcgYW4gSFRNTCBzdHJpbmcgaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgTmFtZXNwYWNlIGluIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBpY29uIHNldC5cbiAgICogQHBhcmFtIGxpdGVyYWwgU1ZHIHNvdXJjZSBvZiB0aGUgaWNvbiBzZXQuXG4gICAqL1xuICBhZGRTdmdJY29uU2V0TGl0ZXJhbEluTmFtZXNwYWNlKFxuICAgIG5hbWVzcGFjZTogc3RyaW5nLFxuICAgIGxpdGVyYWw6IFNhZmVIdG1sLFxuICAgIG9wdGlvbnM/OiBJY29uT3B0aW9ucyxcbiAgKTogdGhpcyB7XG4gICAgY29uc3QgY2xlYW5MaXRlcmFsID0gdGhpcy5fc2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5IVE1MLCBsaXRlcmFsKTtcblxuICAgIGlmICghY2xlYW5MaXRlcmFsKSB7XG4gICAgICB0aHJvdyBnZXRNYXRJY29uRmFpbGVkVG9TYW5pdGl6ZUxpdGVyYWxFcnJvcihsaXRlcmFsKTtcbiAgICB9XG5cbiAgICAvLyBTZWN1cml0eTogVGhlIGxpdGVyYWwgaXMgcGFzc2VkIGluIGFzIFNhZmVIdG1sLCBhbmQgaXMgdGh1cyB0cnVzdGVkLlxuICAgIGNvbnN0IHRydXN0ZWRMaXRlcmFsID0gdHJ1c3RlZEhUTUxGcm9tU3RyaW5nKGNsZWFuTGl0ZXJhbCk7XG4gICAgcmV0dXJuIHRoaXMuX2FkZFN2Z0ljb25TZXRDb25maWcobmFtZXNwYWNlLCBuZXcgU3ZnSWNvbkNvbmZpZygnJywgdHJ1c3RlZExpdGVyYWwsIG9wdGlvbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGFuIGFsaWFzIGZvciBDU1MgY2xhc3MgbmFtZXMgdG8gYmUgdXNlZCBmb3IgaWNvbiBmb250cy4gQ3JlYXRpbmcgYW4gbWF0SWNvblxuICAgKiBjb21wb25lbnQgd2l0aCB0aGUgYWxpYXMgYXMgdGhlIGZvbnRTZXQgaW5wdXQgd2lsbCBjYXVzZSB0aGUgY2xhc3MgbmFtZSB0byBiZSBhcHBsaWVkXG4gICAqIHRvIHRoZSBgPG1hdC1pY29uPmAgZWxlbWVudC5cbiAgICpcbiAgICogSWYgdGhlIHJlZ2lzdGVyZWQgZm9udCBpcyBhIGxpZ2F0dXJlIGZvbnQsIHRoZW4gZG9uJ3QgZm9yZ2V0IHRvIGFsc28gaW5jbHVkZSB0aGUgc3BlY2lhbFxuICAgKiBjbGFzcyBgbWF0LWxpZ2F0dXJlLWZvbnRgIHRvIGFsbG93IHRoZSB1c2FnZSB2aWEgYXR0cmlidXRlLiBTbyByZWdpc3RlciBsaWtlIHRoaXM6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGljb25SZWdpc3RyeS5yZWdpc3RlckZvbnRDbGFzc0FsaWFzKCdmMScsICdmb250MSBtYXQtbGlnYXR1cmUtZm9udCcpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQW5kIHVzZSBsaWtlIHRoaXM6XG4gICAqXG4gICAqIGBgYGh0bWxcbiAgICogPG1hdC1pY29uIGZvbnRTZXQ9XCJmMVwiIGZvbnRJY29uPVwiaG9tZVwiPjwvbWF0LWljb24+XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gYWxpYXMgQWxpYXMgZm9yIHRoZSBmb250LlxuICAgKiBAcGFyYW0gY2xhc3NOYW1lcyBDbGFzcyBuYW1lcyBvdmVycmlkZSB0byBiZSB1c2VkIGluc3RlYWQgb2YgdGhlIGFsaWFzLlxuICAgKi9cbiAgcmVnaXN0ZXJGb250Q2xhc3NBbGlhcyhhbGlhczogc3RyaW5nLCBjbGFzc05hbWVzOiBzdHJpbmcgPSBhbGlhcyk6IHRoaXMge1xuICAgIHRoaXMuX2ZvbnRDc3NDbGFzc2VzQnlBbGlhcy5zZXQoYWxpYXMsIGNsYXNzTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIENTUyBjbGFzcyBuYW1lIGFzc29jaWF0ZWQgd2l0aCB0aGUgYWxpYXMgYnkgYSBwcmV2aW91cyBjYWxsIHRvXG4gICAqIHJlZ2lzdGVyRm9udENsYXNzQWxpYXMuIElmIG5vIENTUyBjbGFzcyBoYXMgYmVlbiBhc3NvY2lhdGVkLCByZXR1cm5zIHRoZSBhbGlhcyB1bm1vZGlmaWVkLlxuICAgKi9cbiAgY2xhc3NOYW1lRm9yRm9udEFsaWFzKGFsaWFzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9mb250Q3NzQ2xhc3Nlc0J5QWxpYXMuZ2V0KGFsaWFzKSB8fCBhbGlhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBDU1MgY2xhc3NlcyB0byBiZSB1c2VkIGZvciBpY29uIGZvbnRzIHdoZW4gYW4gYDxtYXQtaWNvbj5gIGNvbXBvbmVudCBkb2VzIG5vdFxuICAgKiBoYXZlIGEgZm9udFNldCBpbnB1dCB2YWx1ZSwgYW5kIGlzIG5vdCBsb2FkaW5nIGFuIGljb24gYnkgbmFtZSBvciBVUkwuXG4gICAqL1xuICBzZXREZWZhdWx0Rm9udFNldENsYXNzKC4uLmNsYXNzTmFtZXM6IHN0cmluZ1tdKTogdGhpcyB7XG4gICAgdGhpcy5fZGVmYXVsdEZvbnRTZXRDbGFzcyA9IGNsYXNzTmFtZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgQ1NTIGNsYXNzZXMgdG8gYmUgdXNlZCBmb3IgaWNvbiBmb250cyB3aGVuIGFuIGA8bWF0LWljb24+YCBjb21wb25lbnQgZG9lcyBub3RcbiAgICogaGF2ZSBhIGZvbnRTZXQgaW5wdXQgdmFsdWUsIGFuZCBpcyBub3QgbG9hZGluZyBhbiBpY29uIGJ5IG5hbWUgb3IgVVJMLlxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvbnRTZXRDbGFzcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRGb250U2V0Q2xhc3M7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgcHJvZHVjZXMgdGhlIGljb24gKGFzIGFuIGA8c3ZnPmAgRE9NIGVsZW1lbnQpIGZyb20gdGhlIGdpdmVuIFVSTC5cbiAgICogVGhlIHJlc3BvbnNlIGZyb20gdGhlIFVSTCBtYXkgYmUgY2FjaGVkIHNvIHRoaXMgd2lsbCBub3QgYWx3YXlzIGNhdXNlIGFuIEhUVFAgcmVxdWVzdCwgYnV0XG4gICAqIHRoZSBwcm9kdWNlZCBlbGVtZW50IHdpbGwgYWx3YXlzIGJlIGEgbmV3IGNvcHkgb2YgdGhlIG9yaWdpbmFsbHkgZmV0Y2hlZCBpY29uLiAoVGhhdCBpcyxcbiAgICogaXQgd2lsbCBub3QgY29udGFpbiBhbnkgbW9kaWZpY2F0aW9ucyBtYWRlIHRvIGVsZW1lbnRzIHByZXZpb3VzbHkgcmV0dXJuZWQpLlxuICAgKlxuICAgKiBAcGFyYW0gc2FmZVVybCBVUkwgZnJvbSB3aGljaCB0byBmZXRjaCB0aGUgU1ZHIGljb24uXG4gICAqL1xuICBnZXRTdmdJY29uRnJvbVVybChzYWZlVXJsOiBTYWZlUmVzb3VyY2VVcmwpOiBPYnNlcnZhYmxlPFNWR0VsZW1lbnQ+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLl9zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LlJFU09VUkNFX1VSTCwgc2FmZVVybCk7XG5cbiAgICBpZiAoIXVybCkge1xuICAgICAgdGhyb3cgZ2V0TWF0SWNvbkZhaWxlZFRvU2FuaXRpemVVcmxFcnJvcihzYWZlVXJsKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZWRJY29uID0gdGhpcy5fY2FjaGVkSWNvbnNCeVVybC5nZXQodXJsKTtcblxuICAgIGlmIChjYWNoZWRJY29uKSB7XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKGNsb25lU3ZnKGNhY2hlZEljb24pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fbG9hZFN2Z0ljb25Gcm9tQ29uZmlnKG5ldyBTdmdJY29uQ29uZmlnKHNhZmVVcmwsIG51bGwpKS5waXBlKFxuICAgICAgdGFwKHN2ZyA9PiB0aGlzLl9jYWNoZWRJY29uc0J5VXJsLnNldCh1cmwhLCBzdmcpKSxcbiAgICAgIG1hcChzdmcgPT4gY2xvbmVTdmcoc3ZnKSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBwcm9kdWNlcyB0aGUgaWNvbiAoYXMgYW4gYDxzdmc+YCBET00gZWxlbWVudCkgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuICAgKiBhbmQgbmFtZXNwYWNlLiBUaGUgaWNvbiBtdXN0IGhhdmUgYmVlbiBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCBhZGRJY29uIG9yIGFkZEljb25TZXQ7XG4gICAqIGlmIG5vdCwgdGhlIE9ic2VydmFibGUgd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgaWNvbiB0byBiZSByZXRyaWV2ZWQuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgTmFtZXNwYWNlIGluIHdoaWNoIHRvIGxvb2sgZm9yIHRoZSBpY29uLlxuICAgKi9cbiAgZ2V0TmFtZWRTdmdJY29uKG5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcgPSAnJyk6IE9ic2VydmFibGU8U1ZHRWxlbWVudD4ge1xuICAgIGNvbnN0IGtleSA9IGljb25LZXkobmFtZXNwYWNlLCBuYW1lKTtcbiAgICBsZXQgY29uZmlnID0gdGhpcy5fc3ZnSWNvbkNvbmZpZ3MuZ2V0KGtleSk7XG5cbiAgICAvLyBSZXR1cm4gKGNvcHkgb2YpIGNhY2hlZCBpY29uIGlmIHBvc3NpYmxlLlxuICAgIGlmIChjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXRTdmdGcm9tQ29uZmlnKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIHRyeSB0byByZXNvbHZlIHRoZSBjb25maWcgZnJvbSBvbmUgb2YgdGhlIHJlc29sdmVyIGZ1bmN0aW9ucy5cbiAgICBjb25maWcgPSB0aGlzLl9nZXRJY29uQ29uZmlnRnJvbVJlc29sdmVycyhuYW1lc3BhY2UsIG5hbWUpO1xuXG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgdGhpcy5fc3ZnSWNvbkNvbmZpZ3Muc2V0KGtleSwgY29uZmlnKTtcbiAgICAgIHJldHVybiB0aGlzLl9nZXRTdmdGcm9tQ29uZmlnKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gU2VlIGlmIHdlIGhhdmUgYW55IGljb24gc2V0cyByZWdpc3RlcmVkIGZvciB0aGUgbmFtZXNwYWNlLlxuICAgIGNvbnN0IGljb25TZXRDb25maWdzID0gdGhpcy5faWNvblNldENvbmZpZ3MuZ2V0KG5hbWVzcGFjZSk7XG5cbiAgICBpZiAoaWNvblNldENvbmZpZ3MpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXRTdmdGcm9tSWNvblNldENvbmZpZ3MobmFtZSwgaWNvblNldENvbmZpZ3MpO1xuICAgIH1cblxuICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3coZ2V0TWF0SWNvbk5hbWVOb3RGb3VuZEVycm9yKGtleSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fcmVzb2x2ZXJzID0gW107XG4gICAgdGhpcy5fc3ZnSWNvbkNvbmZpZ3MuY2xlYXIoKTtcbiAgICB0aGlzLl9pY29uU2V0Q29uZmlncy5jbGVhcigpO1xuICAgIHRoaXMuX2NhY2hlZEljb25zQnlVcmwuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYWNoZWQgaWNvbiBmb3IgYSBTdmdJY29uQ29uZmlnIGlmIGF2YWlsYWJsZSwgb3IgZmV0Y2hlcyBpdCBmcm9tIGl0cyBVUkwgaWYgbm90LlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0U3ZnRnJvbUNvbmZpZyhjb25maWc6IFN2Z0ljb25Db25maWcpOiBPYnNlcnZhYmxlPFNWR0VsZW1lbnQ+IHtcbiAgICBpZiAoY29uZmlnLnN2Z1RleHQpIHtcbiAgICAgIC8vIFdlIGFscmVhZHkgaGF2ZSB0aGUgU1ZHIGVsZW1lbnQgZm9yIHRoaXMgaWNvbiwgcmV0dXJuIGEgY29weS5cbiAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoY2xvbmVTdmcodGhpcy5fc3ZnRWxlbWVudEZyb21Db25maWcoY29uZmlnIGFzIExvYWRlZFN2Z0ljb25Db25maWcpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZldGNoIHRoZSBpY29uIGZyb20gdGhlIGNvbmZpZydzIFVSTCwgY2FjaGUgaXQsIGFuZCByZXR1cm4gYSBjb3B5LlxuICAgICAgcmV0dXJuIHRoaXMuX2xvYWRTdmdJY29uRnJvbUNvbmZpZyhjb25maWcpLnBpcGUobWFwKHN2ZyA9PiBjbG9uZVN2ZyhzdmcpKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIGZpbmQgYW4gaWNvbiB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBpbiBhbnkgb2YgdGhlIFNWRyBpY29uIHNldHMuXG4gICAqIEZpcnN0IHNlYXJjaGVzIHRoZSBhdmFpbGFibGUgY2FjaGVkIGljb25zIGZvciBhIG5lc3RlZCBlbGVtZW50IHdpdGggYSBtYXRjaGluZyBuYW1lLCBhbmRcbiAgICogaWYgZm91bmQgY29waWVzIHRoZSBlbGVtZW50IHRvIGEgbmV3IGA8c3ZnPmAgZWxlbWVudC4gSWYgbm90IGZvdW5kLCBmZXRjaGVzIGFsbCBpY29uIHNldHNcbiAgICogdGhhdCBoYXZlIG5vdCBiZWVuIGNhY2hlZCwgYW5kIHNlYXJjaGVzIGFnYWluIGFmdGVyIGFsbCBmZXRjaGVzIGFyZSBjb21wbGV0ZWQuXG4gICAqIFRoZSByZXR1cm5lZCBPYnNlcnZhYmxlIHByb2R1Y2VzIHRoZSBTVkcgZWxlbWVudCBpZiBwb3NzaWJsZSwgYW5kIHRocm93c1xuICAgKiBhbiBlcnJvciBpZiBubyBpY29uIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGNhbiBiZSBmb3VuZC5cbiAgICovXG4gIHByaXZhdGUgX2dldFN2Z0Zyb21JY29uU2V0Q29uZmlncyhcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgaWNvblNldENvbmZpZ3M6IFN2Z0ljb25Db25maWdbXSxcbiAgKTogT2JzZXJ2YWJsZTxTVkdFbGVtZW50PiB7XG4gICAgLy8gRm9yIGFsbCB0aGUgaWNvbiBzZXQgU1ZHIGVsZW1lbnRzIHdlJ3ZlIGZldGNoZWQsIHNlZSBpZiBhbnkgY29udGFpbiBhbiBpY29uIHdpdGggdGhlXG4gICAgLy8gcmVxdWVzdGVkIG5hbWUuXG4gICAgY29uc3QgbmFtZWRJY29uID0gdGhpcy5fZXh0cmFjdEljb25XaXRoTmFtZUZyb21BbnlTZXQobmFtZSwgaWNvblNldENvbmZpZ3MpO1xuXG4gICAgaWYgKG5hbWVkSWNvbikge1xuICAgICAgLy8gV2UgY291bGQgY2FjaGUgbmFtZWRJY29uIGluIF9zdmdJY29uQ29uZmlncywgYnV0IHNpbmNlIHdlIGhhdmUgdG8gbWFrZSBhIGNvcHkgZXZlcnlcbiAgICAgIC8vIHRpbWUgYW55d2F5LCB0aGVyZSdzIHByb2JhYmx5IG5vdCBtdWNoIGFkdmFudGFnZSBjb21wYXJlZCB0byBqdXN0IGFsd2F5cyBleHRyYWN0aW5nXG4gICAgICAvLyBpdCBmcm9tIHRoZSBpY29uIHNldC5cbiAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YobmFtZWRJY29uKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgZm91bmQgaW4gYW55IGNhY2hlZCBpY29uIHNldHMuIElmIHRoZXJlIGFyZSBpY29uIHNldHMgd2l0aCBVUkxzIHRoYXQgd2UgaGF2ZW4ndFxuICAgIC8vIGZldGNoZWQsIGZldGNoIHRoZW0gbm93IGFuZCBsb29rIGZvciBpY29uTmFtZSBpbiB0aGUgcmVzdWx0cy5cbiAgICBjb25zdCBpY29uU2V0RmV0Y2hSZXF1ZXN0czogT2JzZXJ2YWJsZTxUcnVzdGVkSFRNTCB8IG51bGw+W10gPSBpY29uU2V0Q29uZmlnc1xuICAgICAgLmZpbHRlcihpY29uU2V0Q29uZmlnID0+ICFpY29uU2V0Q29uZmlnLnN2Z1RleHQpXG4gICAgICAubWFwKGljb25TZXRDb25maWcgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFN2Z0ljb25TZXRGcm9tQ29uZmlnKGljb25TZXRDb25maWcpLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fc2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5SRVNPVVJDRV9VUkwsIGljb25TZXRDb25maWcudXJsKTtcblxuICAgICAgICAgICAgLy8gU3dhbGxvdyBlcnJvcnMgZmV0Y2hpbmcgaW5kaXZpZHVhbCBVUkxzIHNvIHRoZVxuICAgICAgICAgICAgLy8gY29tYmluZWQgT2JzZXJ2YWJsZSB3b24ndCBuZWNlc3NhcmlseSBmYWlsLlxuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYExvYWRpbmcgaWNvbiBzZXQgVVJMOiAke3VybH0gZmFpbGVkOiAke2Vyci5tZXNzYWdlfWA7XG4gICAgICAgICAgICB0aGlzLl9lcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IobmV3IEVycm9yKGVycm9yTWVzc2FnZSkpO1xuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihudWxsKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgLy8gRmV0Y2ggYWxsIHRoZSBpY29uIHNldCBVUkxzLiBXaGVuIHRoZSByZXF1ZXN0cyBjb21wbGV0ZSwgZXZlcnkgSWNvblNldCBzaG91bGQgaGF2ZSBhXG4gICAgLy8gY2FjaGVkIFNWRyBlbGVtZW50ICh1bmxlc3MgdGhlIHJlcXVlc3QgZmFpbGVkKSwgYW5kIHdlIGNhbiBjaGVjayBhZ2FpbiBmb3IgdGhlIGljb24uXG4gICAgcmV0dXJuIGZvcmtKb2luKGljb25TZXRGZXRjaFJlcXVlc3RzKS5waXBlKFxuICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgY29uc3QgZm91bmRJY29uID0gdGhpcy5fZXh0cmFjdEljb25XaXRoTmFtZUZyb21BbnlTZXQobmFtZSwgaWNvblNldENvbmZpZ3MpO1xuXG4gICAgICAgIC8vIFRPRE86IGFkZCBhbiBuZ0Rldk1vZGUgY2hlY2tcbiAgICAgICAgaWYgKCFmb3VuZEljb24pIHtcbiAgICAgICAgICB0aHJvdyBnZXRNYXRJY29uTmFtZU5vdEZvdW5kRXJyb3IobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRJY29uO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyB0aGUgY2FjaGVkIFNWRyBlbGVtZW50cyBmb3IgdGhlIGdpdmVuIGljb24gc2V0cyBmb3IgYSBuZXN0ZWQgaWNvbiBlbGVtZW50IHdob3NlIFwiaWRcIlxuICAgKiB0YWcgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIG5hbWUuIElmIGZvdW5kLCBjb3BpZXMgdGhlIG5lc3RlZCBlbGVtZW50IHRvIGEgbmV3IFNWRyBlbGVtZW50IGFuZFxuICAgKiByZXR1cm5zIGl0LiBSZXR1cm5zIG51bGwgaWYgbm8gbWF0Y2hpbmcgZWxlbWVudCBpcyBmb3VuZC5cbiAgICovXG4gIHByaXZhdGUgX2V4dHJhY3RJY29uV2l0aE5hbWVGcm9tQW55U2V0KFxuICAgIGljb25OYW1lOiBzdHJpbmcsXG4gICAgaWNvblNldENvbmZpZ3M6IFN2Z0ljb25Db25maWdbXSxcbiAgKTogU1ZHRWxlbWVudCB8IG51bGwge1xuICAgIC8vIEl0ZXJhdGUgYmFja3dhcmRzLCBzbyBpY29uIHNldHMgYWRkZWQgbGF0ZXIgaGF2ZSBwcmVjZWRlbmNlLlxuICAgIGZvciAobGV0IGkgPSBpY29uU2V0Q29uZmlncy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgY29uZmlnID0gaWNvblNldENvbmZpZ3NbaV07XG5cbiAgICAgIC8vIFBhcnNpbmcgdGhlIGljb24gc2V0J3MgdGV4dCBpbnRvIGFuIFNWRyBlbGVtZW50IGNhbiBiZSBleHBlbnNpdmUuIFdlIGNhbiBhdm9pZCBzb21lIG9mXG4gICAgICAvLyB0aGUgcGFyc2luZyBieSBkb2luZyBhIHF1aWNrIGNoZWNrIHVzaW5nIGBpbmRleE9mYCB0byBzZWUgaWYgdGhlcmUncyBhbnkgY2hhbmNlIGZvciB0aGVcbiAgICAgIC8vIGljb24gdG8gYmUgaW4gdGhlIHNldC4gVGhpcyB3b24ndCBiZSAxMDAlIGFjY3VyYXRlLCBidXQgaXQgc2hvdWxkIGhlbHAgdXMgYXZvaWQgYXQgbGVhc3RcbiAgICAgIC8vIHNvbWUgb2YgdGhlIHBhcnNpbmcuXG4gICAgICBpZiAoY29uZmlnLnN2Z1RleHQgJiYgY29uZmlnLnN2Z1RleHQudG9TdHJpbmcoKS5pbmRleE9mKGljb25OYW1lKSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IHN2ZyA9IHRoaXMuX3N2Z0VsZW1lbnRGcm9tQ29uZmlnKGNvbmZpZyBhcyBMb2FkZWRTdmdJY29uQ29uZmlnKTtcbiAgICAgICAgY29uc3QgZm91bmRJY29uID0gdGhpcy5fZXh0cmFjdFN2Z0ljb25Gcm9tU2V0KHN2ZywgaWNvbk5hbWUsIGNvbmZpZy5vcHRpb25zKTtcbiAgICAgICAgaWYgKGZvdW5kSWNvbikge1xuICAgICAgICAgIHJldHVybiBmb3VuZEljb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgdGhlIGNvbnRlbnQgb2YgdGhlIGljb24gVVJMIHNwZWNpZmllZCBpbiB0aGUgU3ZnSWNvbkNvbmZpZyBhbmQgY3JlYXRlcyBhbiBTVkcgZWxlbWVudFxuICAgKiBmcm9tIGl0LlxuICAgKi9cbiAgcHJpdmF0ZSBfbG9hZFN2Z0ljb25Gcm9tQ29uZmlnKGNvbmZpZzogU3ZnSWNvbkNvbmZpZyk6IE9ic2VydmFibGU8U1ZHRWxlbWVudD4ge1xuICAgIHJldHVybiB0aGlzLl9mZXRjaEljb24oY29uZmlnKS5waXBlKFxuICAgICAgdGFwKHN2Z1RleHQgPT4gKGNvbmZpZy5zdmdUZXh0ID0gc3ZnVGV4dCkpLFxuICAgICAgbWFwKCgpID0+IHRoaXMuX3N2Z0VsZW1lbnRGcm9tQ29uZmlnKGNvbmZpZyBhcyBMb2FkZWRTdmdJY29uQ29uZmlnKSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyB0aGUgY29udGVudCBvZiB0aGUgaWNvbiBzZXQgVVJMIHNwZWNpZmllZCBpbiB0aGVcbiAgICogU3ZnSWNvbkNvbmZpZyBhbmQgYXR0YWNoZXMgaXQgdG8gdGhlIGNvbmZpZy5cbiAgICovXG4gIHByaXZhdGUgX2xvYWRTdmdJY29uU2V0RnJvbUNvbmZpZyhjb25maWc6IFN2Z0ljb25Db25maWcpOiBPYnNlcnZhYmxlPFRydXN0ZWRIVE1MIHwgbnVsbD4ge1xuICAgIGlmIChjb25maWcuc3ZnVGV4dCkge1xuICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZmV0Y2hJY29uKGNvbmZpZykucGlwZSh0YXAoc3ZnVGV4dCA9PiAoY29uZmlnLnN2Z1RleHQgPSBzdmdUZXh0KSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaGVzIHRoZSBjYWNoZWQgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gU3ZnSWNvbkNvbmZpZyBmb3IgYSBuZXN0ZWQgaWNvbiBlbGVtZW50IHdob3NlIFwiaWRcIlxuICAgKiB0YWcgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIG5hbWUuIElmIGZvdW5kLCBjb3BpZXMgdGhlIG5lc3RlZCBlbGVtZW50IHRvIGEgbmV3IFNWRyBlbGVtZW50IGFuZFxuICAgKiByZXR1cm5zIGl0LiBSZXR1cm5zIG51bGwgaWYgbm8gbWF0Y2hpbmcgZWxlbWVudCBpcyBmb3VuZC5cbiAgICovXG4gIHByaXZhdGUgX2V4dHJhY3RTdmdJY29uRnJvbVNldChcbiAgICBpY29uU2V0OiBTVkdFbGVtZW50LFxuICAgIGljb25OYW1lOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IEljb25PcHRpb25zLFxuICApOiBTVkdFbGVtZW50IHwgbnVsbCB7XG4gICAgLy8gVXNlIHRoZSBgaWQ9XCJpY29uTmFtZVwiYCBzeW50YXggaW4gb3JkZXIgdG8gZXNjYXBlIHNwZWNpYWxcbiAgICAvLyBjaGFyYWN0ZXJzIGluIHRoZSBJRCAodmVyc3VzIHVzaW5nIHRoZSAjaWNvbk5hbWUgc3ludGF4KS5cbiAgICBjb25zdCBpY29uU291cmNlID0gaWNvblNldC5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2ljb25OYW1lfVwiXWApO1xuXG4gICAgaWYgKCFpY29uU291cmNlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBDbG9uZSB0aGUgZWxlbWVudCBhbmQgcmVtb3ZlIHRoZSBJRCB0byBwcmV2ZW50IG11bHRpcGxlIGVsZW1lbnRzIGZyb20gYmVpbmcgYWRkZWRcbiAgICAvLyB0byB0aGUgcGFnZSB3aXRoIHRoZSBzYW1lIElELlxuICAgIGNvbnN0IGljb25FbGVtZW50ID0gaWNvblNvdXJjZS5jbG9uZU5vZGUodHJ1ZSkgYXMgRWxlbWVudDtcbiAgICBpY29uRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICAvLyBJZiB0aGUgaWNvbiBub2RlIGlzIGl0c2VsZiBhbiA8c3ZnPiBub2RlLCBjbG9uZSBhbmQgcmV0dXJuIGl0IGRpcmVjdGx5LiBJZiBub3QsIHNldCBpdCBhc1xuICAgIC8vIHRoZSBjb250ZW50IG9mIGEgbmV3IDxzdmc+IG5vZGUuXG4gICAgaWYgKGljb25FbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0U3ZnQXR0cmlidXRlcyhpY29uRWxlbWVudCBhcyBTVkdFbGVtZW50LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbm9kZSBpcyBhIDxzeW1ib2w+LCBpdCB3b24ndCBiZSByZW5kZXJlZCBzbyB3ZSBoYXZlIHRvIGNvbnZlcnQgaXQgaW50byA8c3ZnPi4gTm90ZVxuICAgIC8vIHRoYXQgdGhlIHNhbWUgY291bGQgYmUgYWNoaWV2ZWQgYnkgcmVmZXJyaW5nIHRvIGl0IHZpYSA8dXNlIGhyZWY9XCIjaWRcIj4sIGhvd2V2ZXIgdGhlIDx1c2U+XG4gICAgLy8gdGFnIGlzIHByb2JsZW1hdGljIG9uIEZpcmVmb3gsIGJlY2F1c2UgaXQgbmVlZHMgdG8gaW5jbHVkZSB0aGUgY3VycmVudCBwYWdlIHBhdGguXG4gICAgaWYgKGljb25FbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0U3ZnQXR0cmlidXRlcyh0aGlzLl90b1N2Z0VsZW1lbnQoaWNvbkVsZW1lbnQpLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGVFbGVtZW50KCdTVkcnKSBkb2Vzbid0IHdvcmsgYXMgZXhwZWN0ZWQ7IHRoZSBET00gZW5kcyB1cCB3aXRoXG4gICAgLy8gdGhlIGNvcnJlY3Qgbm9kZXMsIGJ1dCB0aGUgU1ZHIGNvbnRlbnQgZG9lc24ndCByZW5kZXIuIEluc3RlYWQgd2VcbiAgICAvLyBoYXZlIHRvIGNyZWF0ZSBhbiBlbXB0eSBTVkcgbm9kZSB1c2luZyBpbm5lckhUTUwgYW5kIGFwcGVuZCBpdHMgY29udGVudC5cbiAgICAvLyBFbGVtZW50cyBjcmVhdGVkIHVzaW5nIERPTVBhcnNlci5wYXJzZUZyb21TdHJpbmcgaGF2ZSB0aGUgc2FtZSBwcm9ibGVtLlxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjMwMDMyNzgvc3ZnLWlubmVyaHRtbC1pbi1maXJlZm94LWNhbi1ub3QtZGlzcGxheVxuICAgIGNvbnN0IHN2ZyA9IHRoaXMuX3N2Z0VsZW1lbnRGcm9tU3RyaW5nKHRydXN0ZWRIVE1MRnJvbVN0cmluZygnPHN2Zz48L3N2Zz4nKSk7XG4gICAgLy8gQ2xvbmUgdGhlIG5vZGUgc28gd2UgZG9uJ3QgcmVtb3ZlIGl0IGZyb20gdGhlIHBhcmVudCBpY29uIHNldCBlbGVtZW50LlxuICAgIHN2Zy5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XG5cbiAgICByZXR1cm4gdGhpcy5fc2V0U3ZnQXR0cmlidXRlcyhzdmcsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBET00gZWxlbWVudCBmcm9tIHRoZSBnaXZlbiBTVkcgc3RyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3ZnRWxlbWVudEZyb21TdHJpbmcoc3RyOiBUcnVzdGVkSFRNTCk6IFNWR0VsZW1lbnQge1xuICAgIGNvbnN0IGRpdiA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBzdHIgYXMgdW5rbm93biBhcyBzdHJpbmc7XG4gICAgY29uc3Qgc3ZnID0gZGl2LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpIGFzIFNWR0VsZW1lbnQ7XG5cbiAgICAvLyBUT0RPOiBhZGQgYW4gbmdEZXZNb2RlIGNoZWNrXG4gICAgaWYgKCFzdmcpIHtcbiAgICAgIHRocm93IEVycm9yKCc8c3ZnPiB0YWcgbm90IGZvdW5kJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN2ZztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBlbGVtZW50IGludG8gYW4gU1ZHIG5vZGUgYnkgY2xvbmluZyBhbGwgb2YgaXRzIGNoaWxkcmVuLlxuICAgKi9cbiAgcHJpdmF0ZSBfdG9TdmdFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBTVkdFbGVtZW50IHtcbiAgICBjb25zdCBzdmcgPSB0aGlzLl9zdmdFbGVtZW50RnJvbVN0cmluZyh0cnVzdGVkSFRNTEZyb21TdHJpbmcoJzxzdmc+PC9zdmc+JykpO1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XG5cbiAgICAvLyBDb3B5IG92ZXIgYWxsIHRoZSBhdHRyaWJ1dGVzIGZyb20gdGhlIGBzeW1ib2xgIHRvIHRoZSBuZXcgU1ZHLCBleGNlcHQgdGhlIGlkLlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qge25hbWUsIHZhbHVlfSA9IGF0dHJpYnV0ZXNbaV07XG5cbiAgICAgIGlmIChuYW1lICE9PSAnaWQnKSB7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZWxlbWVudC5jaGlsZE5vZGVzW2ldLm5vZGVUeXBlID09PSB0aGlzLl9kb2N1bWVudC5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgc3ZnLmFwcGVuZENoaWxkKGVsZW1lbnQuY2hpbGROb2Rlc1tpXS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdmc7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVmYXVsdCBhdHRyaWJ1dGVzIGZvciBhbiBTVkcgZWxlbWVudCB0byBiZSB1c2VkIGFzIGFuIGljb24uXG4gICAqL1xuICBwcml2YXRlIF9zZXRTdmdBdHRyaWJ1dGVzKHN2ZzogU1ZHRWxlbWVudCwgb3B0aW9ucz86IEljb25PcHRpb25zKTogU1ZHRWxlbWVudCB7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgnZml0JywgJycpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pZFlNaWQgbWVldCcpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2ZvY3VzYWJsZScsICdmYWxzZScpOyAvLyBEaXNhYmxlIElFMTEgZGVmYXVsdCBiZWhhdmlvciB0byBtYWtlIFNWR3MgZm9jdXNhYmxlLlxuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy52aWV3Qm94KSB7XG4gICAgICBzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94Jywgb3B0aW9ucy52aWV3Qm94KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3ZnO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB3aGljaCBwcm9kdWNlcyB0aGUgc3RyaW5nIGNvbnRlbnRzIG9mIHRoZSBnaXZlbiBpY29uLiBSZXN1bHRzIG1heSBiZVxuICAgKiBjYWNoZWQsIHNvIGZ1dHVyZSBjYWxscyB3aXRoIHRoZSBzYW1lIFVSTCBtYXkgbm90IGNhdXNlIGFub3RoZXIgSFRUUCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfZmV0Y2hJY29uKGljb25Db25maWc6IFN2Z0ljb25Db25maWcpOiBPYnNlcnZhYmxlPFRydXN0ZWRIVE1MPiB7XG4gICAgY29uc3Qge3VybDogc2FmZVVybCwgb3B0aW9uc30gPSBpY29uQ29uZmlnO1xuICAgIGNvbnN0IHdpdGhDcmVkZW50aWFscyA9IG9wdGlvbnM/LndpdGhDcmVkZW50aWFscyA/PyBmYWxzZTtcblxuICAgIGlmICghdGhpcy5faHR0cENsaWVudCkge1xuICAgICAgdGhyb3cgZ2V0TWF0SWNvbk5vSHR0cFByb3ZpZGVyRXJyb3IoKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBhZGQgYW4gbmdEZXZNb2RlIGNoZWNrXG4gICAgaWYgKHNhZmVVcmwgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBmZXRjaCBpY29uIGZyb20gVVJMIFwiJHtzYWZlVXJsfVwiLmApO1xuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IHRoaXMuX3Nhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuUkVTT1VSQ0VfVVJMLCBzYWZlVXJsKTtcblxuICAgIC8vIFRPRE86IGFkZCBhbiBuZ0Rldk1vZGUgY2hlY2tcbiAgICBpZiAoIXVybCkge1xuICAgICAgdGhyb3cgZ2V0TWF0SWNvbkZhaWxlZFRvU2FuaXRpemVVcmxFcnJvcihzYWZlVXJsKTtcbiAgICB9XG5cbiAgICAvLyBTdG9yZSBpbi1wcm9ncmVzcyBmZXRjaGVzIHRvIGF2b2lkIHNlbmRpbmcgYSBkdXBsaWNhdGUgcmVxdWVzdCBmb3IgYSBVUkwgd2hlbiB0aGVyZSBpc1xuICAgIC8vIGFscmVhZHkgYSByZXF1ZXN0IGluIHByb2dyZXNzIGZvciB0aGF0IFVSTC4gSXQncyBuZWNlc3NhcnkgdG8gY2FsbCBzaGFyZSgpIG9uIHRoZVxuICAgIC8vIE9ic2VydmFibGUgcmV0dXJuZWQgYnkgaHR0cC5nZXQoKSBzbyB0aGF0IG11bHRpcGxlIHN1YnNjcmliZXJzIGRvbid0IGNhdXNlIG11bHRpcGxlIFhIUnMuXG4gICAgY29uc3QgaW5Qcm9ncmVzc0ZldGNoID0gdGhpcy5faW5Qcm9ncmVzc1VybEZldGNoZXMuZ2V0KHVybCk7XG5cbiAgICBpZiAoaW5Qcm9ncmVzc0ZldGNoKSB7XG4gICAgICByZXR1cm4gaW5Qcm9ncmVzc0ZldGNoO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcSA9IHRoaXMuX2h0dHBDbGllbnQuZ2V0KHVybCwge3Jlc3BvbnNlVHlwZTogJ3RleHQnLCB3aXRoQ3JlZGVudGlhbHN9KS5waXBlKFxuICAgICAgbWFwKHN2ZyA9PiB7XG4gICAgICAgIC8vIFNlY3VyaXR5OiBUaGlzIFNWRyBpcyBmZXRjaGVkIGZyb20gYSBTYWZlUmVzb3VyY2VVcmwsIGFuZCBpcyB0aHVzXG4gICAgICAgIC8vIHRydXN0ZWQgSFRNTC5cbiAgICAgICAgcmV0dXJuIHRydXN0ZWRIVE1MRnJvbVN0cmluZyhzdmcpO1xuICAgICAgfSksXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLl9pblByb2dyZXNzVXJsRmV0Y2hlcy5kZWxldGUodXJsKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9pblByb2dyZXNzVXJsRmV0Y2hlcy5zZXQodXJsLCByZXEpO1xuICAgIHJldHVybiByZXE7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGljb24gY29uZmlnIGJ5IG5hbWUgaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgTmFtZXNwYWNlIGluIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBpY29uIGNvbmZpZy5cbiAgICogQHBhcmFtIGljb25OYW1lIE5hbWUgdW5kZXIgd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGNvbmZpZy5cbiAgICogQHBhcmFtIGNvbmZpZyBDb25maWcgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHByaXZhdGUgX2FkZFN2Z0ljb25Db25maWcobmFtZXNwYWNlOiBzdHJpbmcsIGljb25OYW1lOiBzdHJpbmcsIGNvbmZpZzogU3ZnSWNvbkNvbmZpZyk6IHRoaXMge1xuICAgIHRoaXMuX3N2Z0ljb25Db25maWdzLnNldChpY29uS2V5KG5hbWVzcGFjZSwgaWNvbk5hbWUpLCBjb25maWcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBpY29uIHNldCBjb25maWcgaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgTmFtZXNwYWNlIGluIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBpY29uIGNvbmZpZy5cbiAgICogQHBhcmFtIGNvbmZpZyBDb25maWcgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHByaXZhdGUgX2FkZFN2Z0ljb25TZXRDb25maWcobmFtZXNwYWNlOiBzdHJpbmcsIGNvbmZpZzogU3ZnSWNvbkNvbmZpZyk6IHRoaXMge1xuICAgIGNvbnN0IGNvbmZpZ05hbWVzcGFjZSA9IHRoaXMuX2ljb25TZXRDb25maWdzLmdldChuYW1lc3BhY2UpO1xuXG4gICAgaWYgKGNvbmZpZ05hbWVzcGFjZSkge1xuICAgICAgY29uZmlnTmFtZXNwYWNlLnB1c2goY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faWNvblNldENvbmZpZ3Muc2V0KG5hbWVzcGFjZSwgW2NvbmZpZ10pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIFBhcnNlcyBhIGNvbmZpZydzIHRleHQgaW50byBhbiBTVkcgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfc3ZnRWxlbWVudEZyb21Db25maWcoY29uZmlnOiBMb2FkZWRTdmdJY29uQ29uZmlnKTogU1ZHRWxlbWVudCB7XG4gICAgaWYgKCFjb25maWcuc3ZnRWxlbWVudCkge1xuICAgICAgY29uc3Qgc3ZnID0gdGhpcy5fc3ZnRWxlbWVudEZyb21TdHJpbmcoY29uZmlnLnN2Z1RleHQpO1xuICAgICAgdGhpcy5fc2V0U3ZnQXR0cmlidXRlcyhzdmcsIGNvbmZpZy5vcHRpb25zKTtcbiAgICAgIGNvbmZpZy5zdmdFbGVtZW50ID0gc3ZnO1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWcuc3ZnRWxlbWVudDtcbiAgfVxuXG4gIC8qKiBUcmllcyB0byBjcmVhdGUgYW4gaWNvbiBjb25maWcgdGhyb3VnaCB0aGUgcmVnaXN0ZXJlZCByZXNvbHZlciBmdW5jdGlvbnMuICovXG4gIHByaXZhdGUgX2dldEljb25Db25maWdGcm9tUmVzb2x2ZXJzKG5hbWVzcGFjZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBTdmdJY29uQ29uZmlnIHwgdW5kZWZpbmVkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Jlc29sdmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fcmVzb2x2ZXJzW2ldKG5hbWUsIG5hbWVzcGFjZSk7XG5cbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIGlzU2FmZVVybFdpdGhPcHRpb25zKHJlc3VsdClcbiAgICAgICAgICA/IG5ldyBTdmdJY29uQ29uZmlnKHJlc3VsdC51cmwsIG51bGwsIHJlc3VsdC5vcHRpb25zKVxuICAgICAgICAgIDogbmV3IFN2Z0ljb25Db25maWcocmVzdWx0LCBudWxsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gSUNPTl9SRUdJU1RSWV9QUk9WSURFUl9GQUNUT1JZKFxuICBwYXJlbnRSZWdpc3RyeTogTWF0SWNvblJlZ2lzdHJ5LFxuICBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsXG4gIGRvY3VtZW50PzogYW55LFxuKSB7XG4gIHJldHVybiBwYXJlbnRSZWdpc3RyeSB8fCBuZXcgTWF0SWNvblJlZ2lzdHJ5KGh0dHBDbGllbnQsIHNhbml0aXplciwgZG9jdW1lbnQsIGVycm9ySGFuZGxlcik7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgSUNPTl9SRUdJU1RSWV9QUk9WSURFUiA9IHtcbiAgLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhbiBNYXRJY29uUmVnaXN0cnkgYXZhaWxhYmxlLCB1c2UgdGhhdC4gT3RoZXJ3aXNlLCBwcm92aWRlIGEgbmV3IG9uZS5cbiAgcHJvdmlkZTogTWF0SWNvblJlZ2lzdHJ5LFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgTWF0SWNvblJlZ2lzdHJ5XSxcbiAgICBbbmV3IE9wdGlvbmFsKCksIEh0dHBDbGllbnRdLFxuICAgIERvbVNhbml0aXplcixcbiAgICBFcnJvckhhbmRsZXIsXG4gICAgW25ldyBPcHRpb25hbCgpLCBET0NVTUVOVCBhcyBJbmplY3Rpb25Ub2tlbjxhbnk+XSxcbiAgXSxcbiAgdXNlRmFjdG9yeTogSUNPTl9SRUdJU1RSWV9QUk9WSURFUl9GQUNUT1JZLFxufTtcblxuLyoqIENsb25lcyBhbiBTVkdFbGVtZW50IHdoaWxlIHByZXNlcnZpbmcgdHlwZSBpbmZvcm1hdGlvbi4gKi9cbmZ1bmN0aW9uIGNsb25lU3ZnKHN2ZzogU1ZHRWxlbWVudCk6IFNWR0VsZW1lbnQge1xuICByZXR1cm4gc3ZnLmNsb25lTm9kZSh0cnVlKSBhcyBTVkdFbGVtZW50O1xufVxuXG4vKiogUmV0dXJucyB0aGUgY2FjaGUga2V5IHRvIHVzZSBmb3IgYW4gaWNvbiBuYW1lc3BhY2UgYW5kIG5hbWUuICovXG5mdW5jdGlvbiBpY29uS2V5KG5hbWVzcGFjZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5hbWVzcGFjZSArICc6JyArIG5hbWU7XG59XG5cbmZ1bmN0aW9uIGlzU2FmZVVybFdpdGhPcHRpb25zKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBTYWZlUmVzb3VyY2VVcmxXaXRoSWNvbk9wdGlvbnMge1xuICByZXR1cm4gISEodmFsdWUudXJsICYmIHZhbHVlLm9wdGlvbnMpO1xufVxuIl19