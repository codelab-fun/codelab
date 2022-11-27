/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { convertToBitFlags } from '../di/injector_compatibility';
import { EnvironmentInjector } from '../di/r3_injector';
import { RuntimeError } from '../errors';
import { ComponentFactory as AbstractComponentFactory, ComponentRef as AbstractComponentRef } from '../linker/component_factory';
import { ComponentFactoryResolver as AbstractComponentFactoryResolver } from '../linker/component_factory_resolver';
import { createElementRef } from '../linker/element_ref';
import { RendererFactory2 } from '../render/api';
import { Sanitizer } from '../sanitization/sanitizer';
import { assertDefined, assertGreaterThan, assertIndexInRange } from '../util/assert';
import { VERSION } from '../version';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '../view/provider_flags';
import { assertComponentType } from './assert';
import { attachPatchData } from './context_discovery';
import { getComponentDef } from './definition';
import { getNodeInjectable, NodeInjector } from './di';
import { throwProviderNotFoundError } from './errors_di';
import { registerPostOrderHooks } from './hooks';
import { reportUnknownPropertyError } from './instructions/element_validation';
import { addToViewTree, createLView, createTView, executeContentQueries, getOrCreateComponentTView, getOrCreateTNode, initializeDirectives, invokeDirectivesHostBindings, locateHostElement, markAsComponentHost, markDirtyIfOnPush, renderView, setInputsForProperty } from './instructions/shared';
import { CONTEXT, HEADER_OFFSET, TVIEW } from './interfaces/view';
import { MATH_ML_NAMESPACE, SVG_NAMESPACE } from './namespaces';
import { createElementNode, setupStaticAttributes, writeDirectClass } from './node_manipulation';
import { extractAttrsAndClassesFromSelector, stringifyCSSSelectorList } from './node_selector_matcher';
import { enterView, getCurrentTNode, getLView, leaveView } from './state';
import { computeStaticStyling } from './styling/static_styling';
import { mergeHostAttrs, setUpAttributes } from './util/attrs_utils';
import { stringifyForError } from './util/stringify_utils';
import { getNativeByTNode, getTNode } from './util/view_utils';
import { RootViewRef } from './view_ref';
export class ComponentFactoryResolver extends AbstractComponentFactoryResolver {
    /**
     * @param ngModule The NgModuleRef to which all resolved factories are bound.
     */
    constructor(ngModule) {
        super();
        this.ngModule = ngModule;
    }
    resolveComponentFactory(component) {
        ngDevMode && assertComponentType(component);
        const componentDef = getComponentDef(component);
        return new ComponentFactory(componentDef, this.ngModule);
    }
}
function toRefArray(map) {
    const array = [];
    for (let nonMinified in map) {
        if (map.hasOwnProperty(nonMinified)) {
            const minified = map[nonMinified];
            array.push({ propName: minified, templateName: nonMinified });
        }
    }
    return array;
}
function getNamespace(elementName) {
    const name = elementName.toLowerCase();
    return name === 'svg' ? SVG_NAMESPACE : (name === 'math' ? MATH_ML_NAMESPACE : null);
}
/**
 * Injector that looks up a value using a specific injector, before falling back to the module
 * injector. Used primarily when creating components or embedded views dynamically.
 */
class ChainedInjector {
    constructor(injector, parentInjector) {
        this.injector = injector;
        this.parentInjector = parentInjector;
    }
    get(token, notFoundValue, flags) {
        flags = convertToBitFlags(flags);
        const value = this.injector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, flags);
        if (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ||
            notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
            // Return the value from the root element injector when
            // - it provides it
            //   (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
            // - the module injector should not be checked
            //   (notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
            return value;
        }
        return this.parentInjector.get(token, notFoundValue, flags);
    }
}
/**
 * ComponentFactory interface implementation.
 */
export class ComponentFactory extends AbstractComponentFactory {
    /**
     * @param componentDef The component definition.
     * @param ngModule The NgModuleRef to which the factory is bound.
     */
    constructor(componentDef, ngModule) {
        super();
        this.componentDef = componentDef;
        this.ngModule = ngModule;
        this.componentType = componentDef.type;
        this.selector = stringifyCSSSelectorList(componentDef.selectors);
        this.ngContentSelectors =
            componentDef.ngContentSelectors ? componentDef.ngContentSelectors : [];
        this.isBoundToModule = !!ngModule;
    }
    get inputs() {
        return toRefArray(this.componentDef.inputs);
    }
    get outputs() {
        return toRefArray(this.componentDef.outputs);
    }
    create(injector, projectableNodes, rootSelectorOrNode, environmentInjector) {
        environmentInjector = environmentInjector || this.ngModule;
        let realEnvironmentInjector = environmentInjector instanceof EnvironmentInjector ?
            environmentInjector :
            environmentInjector?.injector;
        if (realEnvironmentInjector && this.componentDef.getStandaloneInjector !== null) {
            realEnvironmentInjector = this.componentDef.getStandaloneInjector(realEnvironmentInjector) ||
                realEnvironmentInjector;
        }
        const rootViewInjector = realEnvironmentInjector ? new ChainedInjector(injector, realEnvironmentInjector) : injector;
        const rendererFactory = rootViewInjector.get(RendererFactory2, null);
        if (rendererFactory === null) {
            throw new RuntimeError(407 /* RuntimeErrorCode.RENDERER_NOT_FOUND */, ngDevMode &&
                'Angular was not able to inject a renderer (RendererFactory2). ' +
                    'Likely this is due to a broken DI hierarchy. ' +
                    'Make sure that any injector used to create this component has a correct parent.');
        }
        const sanitizer = rootViewInjector.get(Sanitizer, null);
        const hostRenderer = rendererFactory.createRenderer(null, this.componentDef);
        // Determine a tag name used for creating host elements when this component is created
        // dynamically. Default to 'div' if this component did not specify any tag name in its selector.
        const elementName = this.componentDef.selectors[0][0] || 'div';
        const hostRNode = rootSelectorOrNode ?
            locateHostElement(hostRenderer, rootSelectorOrNode, this.componentDef.encapsulation) :
            createElementNode(hostRenderer, elementName, getNamespace(elementName));
        const rootFlags = this.componentDef.onPush ? 32 /* LViewFlags.Dirty */ | 256 /* LViewFlags.IsRoot */ :
            16 /* LViewFlags.CheckAlways */ | 256 /* LViewFlags.IsRoot */;
        // Create the root view. Uses empty TView and ContentTemplate.
        const rootTView = createTView(0 /* TViewType.Root */, null, null, 1, 0, null, null, null, null, null);
        const rootLView = createLView(null, rootTView, null, rootFlags, null, null, rendererFactory, hostRenderer, sanitizer, rootViewInjector, null);
        // rootView is the parent when bootstrapping
        // TODO(misko): it looks like we are entering view here but we don't really need to as
        // `renderView` does that. However as the code is written it is needed because
        // `createRootComponentView` and `createRootComponent` both read global state. Fixing those
        // issues would allow us to drop this.
        enterView(rootLView);
        let component;
        let tElementNode;
        try {
            const rootComponentDef = this.componentDef;
            let rootDirectives;
            let hostDirectiveDefs = null;
            if (rootComponentDef.findHostDirectiveDefs) {
                rootDirectives = [];
                hostDirectiveDefs = new Map();
                rootComponentDef.findHostDirectiveDefs(rootComponentDef, rootDirectives, hostDirectiveDefs);
                rootDirectives.push(rootComponentDef);
            }
            else {
                rootDirectives = [rootComponentDef];
            }
            const hostTNode = createRootComponentTNode(rootLView, hostRNode);
            const componentView = createRootComponentView(hostTNode, hostRNode, rootComponentDef, rootDirectives, rootLView, rendererFactory, hostRenderer);
            tElementNode = getTNode(rootTView, HEADER_OFFSET);
            // TODO(crisbeto): in practice `hostRNode` should always be defined, but there are some tests
            // where the renderer is mocked out and `undefined` is returned. We should update the tests so
            // that this check can be removed.
            if (hostRNode) {
                setRootNodeAttributes(hostRenderer, rootComponentDef, hostRNode, rootSelectorOrNode);
            }
            if (projectableNodes !== undefined) {
                projectNodes(tElementNode, this.ngContentSelectors, projectableNodes);
            }
            // TODO: should LifecycleHooksFeature and other host features be generated by the compiler and
            // executed here?
            // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-vcref
            component = createRootComponent(componentView, rootComponentDef, rootDirectives, hostDirectiveDefs, rootLView, [LifecycleHooksFeature]);
            renderView(rootTView, rootLView, null);
        }
        finally {
            leaveView();
        }
        return new ComponentRef(this.componentType, component, createElementRef(tElementNode, rootLView), rootLView, tElementNode);
    }
}
const componentFactoryResolver = new ComponentFactoryResolver();
/**
 * Creates a ComponentFactoryResolver and stores it on the injector. Or, if the
 * ComponentFactoryResolver
 * already exists, retrieves the existing ComponentFactoryResolver.
 *
 * @returns The ComponentFactoryResolver instance to use
 */
export function injectComponentFactoryResolver() {
    return componentFactoryResolver;
}
/**
 * Represents an instance of a Component created via a {@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
 * method.
 *
 */
export class ComponentRef extends AbstractComponentRef {
    constructor(componentType, instance, location, _rootLView, _tNode) {
        super();
        this.location = location;
        this._rootLView = _rootLView;
        this._tNode = _tNode;
        this.instance = instance;
        this.hostView = this.changeDetectorRef = new RootViewRef(_rootLView);
        this.componentType = componentType;
    }
    setInput(name, value) {
        const inputData = this._tNode.inputs;
        let dataValue;
        if (inputData !== null && (dataValue = inputData[name])) {
            const lView = this._rootLView;
            setInputsForProperty(lView[TVIEW], lView, dataValue, name, value);
            markDirtyIfOnPush(lView, this._tNode.index);
        }
        else {
            if (ngDevMode) {
                const cmpNameForError = stringifyForError(this.componentType);
                let message = `Can't set value of the '${name}' input on the '${cmpNameForError}' component. `;
                message += `Make sure that the '${name}' property is annotated with @Input() or a mapped @Input('${name}') exists.`;
                reportUnknownPropertyError(message);
            }
        }
    }
    get injector() {
        return new NodeInjector(this._tNode, this._rootLView);
    }
    destroy() {
        this.hostView.destroy();
    }
    onDestroy(callback) {
        this.hostView.onDestroy(callback);
    }
}
// TODO: A hack to not pull in the NullInjector from @angular/core.
export const NULL_INJECTOR = {
    get: (token, notFoundValue) => {
        throwProviderNotFoundError(token, 'NullInjector');
    }
};
/** Creates a TNode that can be used to instantiate a root component. */
function createRootComponentTNode(lView, rNode) {
    const tView = lView[TVIEW];
    const index = HEADER_OFFSET;
    ngDevMode && assertIndexInRange(lView, index);
    lView[index] = rNode;
    // '#host' is added here as we don't know the real host DOM name (we don't want to read it) and at
    // the same time we want to communicate the debug `TNode` that this is a special `TNode`
    // representing a host element.
    return getOrCreateTNode(tView, index, 2 /* TNodeType.Element */, '#host', null);
}
/**
 * Creates the root component view and the root component node.
 *
 * @param rNode Render host element.
 * @param rootComponentDef ComponentDef
 * @param rootView The parent view where the host node is stored
 * @param rendererFactory Factory to be used for creating child renderers.
 * @param hostRenderer The current renderer
 * @param sanitizer The sanitizer, if provided
 *
 * @returns Component view created
 */
function createRootComponentView(tNode, rNode, rootComponentDef, rootDirectives, rootView, rendererFactory, hostRenderer, sanitizer) {
    const tView = rootView[TVIEW];
    applyRootComponentStyling(rootDirectives, tNode, rNode, hostRenderer);
    const viewRenderer = rendererFactory.createRenderer(rNode, rootComponentDef);
    const componentView = createLView(rootView, getOrCreateComponentTView(rootComponentDef), null, rootComponentDef.onPush ? 32 /* LViewFlags.Dirty */ : 16 /* LViewFlags.CheckAlways */, rootView[tNode.index], tNode, rendererFactory, viewRenderer, sanitizer || null, null, null);
    if (tView.firstCreatePass) {
        markAsComponentHost(tView, tNode, rootDirectives.length - 1);
    }
    addToViewTree(rootView, componentView);
    // Store component view at node index, with node as the HOST
    return rootView[tNode.index] = componentView;
}
/** Sets up the styling information on a root component. */
function applyRootComponentStyling(rootDirectives, tNode, rNode, hostRenderer) {
    for (const def of rootDirectives) {
        tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, def.hostAttrs);
    }
    if (tNode.mergedAttrs !== null) {
        computeStaticStyling(tNode, tNode.mergedAttrs, true);
        if (rNode !== null) {
            setupStaticAttributes(hostRenderer, rNode, tNode);
        }
    }
}
/**
 * Creates a root component and sets it up with features and host bindings.Shared by
 * renderComponent() and ViewContainerRef.createComponent().
 */
function createRootComponent(componentView, rootComponentDef, rootDirectives, hostDirectiveDefs, rootLView, hostFeatures) {
    const rootTNode = getCurrentTNode();
    ngDevMode && assertDefined(rootTNode, 'tNode should have been already created');
    const tView = rootLView[TVIEW];
    const native = getNativeByTNode(rootTNode, rootLView);
    initializeDirectives(tView, rootLView, rootTNode, rootDirectives, null, hostDirectiveDefs);
    for (let i = 0; i < rootDirectives.length; i++) {
        const directiveIndex = rootTNode.directiveStart + i;
        const directiveInstance = getNodeInjectable(rootLView, tView, directiveIndex, rootTNode);
        attachPatchData(directiveInstance, rootLView);
    }
    invokeDirectivesHostBindings(tView, rootLView, rootTNode);
    if (native) {
        attachPatchData(native, rootLView);
    }
    // We're guaranteed for the `componentOffset` to be positive here
    // since a root component always matches a component def.
    ngDevMode &&
        assertGreaterThan(rootTNode.componentOffset, -1, 'componentOffset must be great than -1');
    const component = getNodeInjectable(rootLView, tView, rootTNode.directiveStart + rootTNode.componentOffset, rootTNode);
    componentView[CONTEXT] = rootLView[CONTEXT] = component;
    if (hostFeatures !== null) {
        for (const feature of hostFeatures) {
            feature(component, rootComponentDef);
        }
    }
    // We want to generate an empty QueryList for root content queries for backwards
    // compatibility with ViewEngine.
    executeContentQueries(tView, rootTNode, componentView);
    return component;
}
/** Sets the static attributes on a root component. */
function setRootNodeAttributes(hostRenderer, componentDef, hostRNode, rootSelectorOrNode) {
    if (rootSelectorOrNode) {
        setUpAttributes(hostRenderer, hostRNode, ['ng-version', VERSION.full]);
    }
    else {
        // If host element is created as a part of this function call (i.e. `rootSelectorOrNode`
        // is not defined), also apply attributes and classes extracted from component selector.
        // Extract attributes and classes from the first selector only to match VE behavior.
        const { attrs, classes } = extractAttrsAndClassesFromSelector(componentDef.selectors[0]);
        if (attrs) {
            setUpAttributes(hostRenderer, hostRNode, attrs);
        }
        if (classes && classes.length > 0) {
            writeDirectClass(hostRenderer, hostRNode, classes.join(' '));
        }
    }
}
/** Projects the `projectableNodes` that were specified when creating a root component. */
function projectNodes(tNode, ngContentSelectors, projectableNodes) {
    const projection = tNode.projection = [];
    for (let i = 0; i < ngContentSelectors.length; i++) {
        const nodesforSlot = projectableNodes[i];
        // Projectable nodes can be passed as array of arrays or an array of iterables (ngUpgrade
        // case). Here we do normalize passed data structure to be an array of arrays to avoid
        // complex checks down the line.
        // We also normalize the length of the passed in projectable nodes (to match the number of
        // <ng-container> slots defined by a component).
        projection.push(nodesforSlot != null ? Array.from(nodesforSlot) : null);
    }
}
/**
 * Used to enable lifecycle hooks on the root component.
 *
 * Include this feature when calling `renderComponent` if the root component
 * you are rendering has lifecycle hooks defined. Otherwise, the hooks won't
 * be called properly.
 *
 * Example:
 *
 * ```
 * renderComponent(AppComponent, {hostFeatures: [LifecycleHooksFeature]});
 * ```
 */
export function LifecycleHooksFeature() {
    const tNode = getCurrentTNode();
    ngDevMode && assertDefined(tNode, 'TNode is required');
    registerPostOrderHooks(getLView()[TVIEW], tNode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50X3JlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvY29tcG9uZW50X3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUcvRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFtQixNQUFNLFdBQVcsQ0FBQztBQUV6RCxPQUFPLEVBQUMsZ0JBQWdCLElBQUksd0JBQXdCLEVBQUUsWUFBWSxJQUFJLG9CQUFvQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDL0gsT0FBTyxFQUFDLHdCQUF3QixJQUFJLGdDQUFnQyxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDbEgsT0FBTyxFQUFDLGdCQUFnQixFQUFhLE1BQU0sdUJBQXVCLENBQUM7QUFFbkUsT0FBTyxFQUFZLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMscUNBQXFDLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FB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QUN0RixnQ0FBZ0M7UUFDaEMsMEZBQTBGO1FBQzFGLGdEQUFnRDtRQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3pFO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsTUFBTSxLQUFLLEdBQUcsZUFBZSxFQUFHLENBQUM7SUFDakMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUN2RCxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNuRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdG9yX3JlZic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge2NvbnZlcnRUb0JpdEZsYWdzfSBmcm9tICcuLi9kaS9pbmplY3Rvcl9jb21wYXRpYmlsaXR5JztcbmltcG9ydCB7SW5qZWN0RmxhZ3MsIEluamVjdE9wdGlvbnN9IGZyb20gJy4uL2RpL2ludGVyZmFjZS9pbmplY3Rvcic7XG5pbXBvcnQge1Byb3ZpZGVyVG9rZW59IGZyb20gJy4uL2RpL3Byb3ZpZGVyX3Rva2VuJztcbmltcG9ydCB7RW52aXJvbm1lbnRJbmplY3Rvcn0gZnJvbSAnLi4vZGkvcjNfaW5qZWN0b3InO1xuaW1wb3J0IHtSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeSBhcyBBYnN0cmFjdENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiBhcyBBYnN0cmFjdENvbXBvbmVudFJlZn0gZnJvbSAnLi4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyIGFzIEFic3RyYWN0Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyfSBmcm9tICcuLi9saW5rZXIvY29tcG9uZW50X2ZhY3RvcnlfcmVzb2x2ZXInO1xuaW1wb3J0IHtjcmVhdGVFbGVtZW50UmVmLCBFbGVtZW50UmVmfSBmcm9tICcuLi9saW5rZXIvZWxlbWVudF9yZWYnO1xuaW1wb3J0IHtOZ01vZHVsZVJlZn0gZnJvbSAnLi4vbGlua2VyL25nX21vZHVsZV9mYWN0b3J5JztcbmltcG9ydCB7UmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyfSBmcm9tICcuLi9yZW5kZXIvYXBpJztcbmltcG9ydCB7U2FuaXRpemVyfSBmcm9tICcuLi9zYW5pdGl6YXRpb24vc2FuaXRpemVyJztcbmltcG9ydCB7YXNzZXJ0RGVmaW5lZCwgYXNzZXJ0R3JlYXRlclRoYW4sIGFzc2VydEluZGV4SW5SYW5nZX0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuLi92ZXJzaW9uJztcbmltcG9ydCB7Tk9UX0ZPVU5EX0NIRUNLX09OTFlfRUxFTUVOVF9JTkpFQ1RPUn0gZnJvbSAnLi4vdmlldy9wcm92aWRlcl9mbGFncyc7XG5cbmltcG9ydCB7YXNzZXJ0Q29tcG9uZW50VHlwZX0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHthdHRhY2hQYXRjaERhdGF9IGZyb20gJy4vY29udGV4dF9kaXNjb3ZlcnknO1xuaW1wb3J0IHtnZXRDb21wb25lbnREZWZ9IGZyb20gJy4vZGVmaW5pdGlvbic7XG5pbXBvcnQge2dldE5vZGVJbmplY3RhYmxlLCBOb2RlSW5qZWN0b3J9IGZyb20gJy4vZGknO1xuaW1wb3J0IHt0aHJvd1Byb3ZpZGVyTm90Rm91bmRFcnJvcn0gZnJvbSAnLi9lcnJvcnNfZGknO1xuaW1wb3J0IHtyZWdpc3RlclBvc3RPcmRlckhvb2tzfSBmcm9tICcuL2hvb2tzJztcbmltcG9ydCB7cmVwb3J0VW5rbm93blByb3BlcnR5RXJyb3J9IGZyb20gJy4vaW5zdHJ1Y3Rpb25zL2VsZW1lbnRfdmFsaWRhdGlvbic7XG5pbXBvcnQge2FkZFRvVmlld1RyZWUsIGNyZWF0ZUxWaWV3LCBjcmVhdGVUVmlldywgZXhlY3V0ZUNvbnRlbnRRdWVyaWVzLCBnZXRPckNyZWF0ZUNvbXBvbmVudFRWaWV3LCBnZXRPckNyZWF0ZVROb2RlLCBpbml0aWFsaXplRGlyZWN0aXZlcywgaW52b2tlRGlyZWN0aXZlc0hvc3RCaW5kaW5ncywgbG9jYXRlSG9zdEVsZW1lbnQsIG1hcmtBc0NvbXBvbmVudEhvc3QsIG1hcmtEaXJ0eUlmT25QdXNoLCByZW5kZXJWaWV3LCBzZXRJbnB1dHNGb3JQcm9wZXJ0eX0gZnJvbSAnLi9pbnN0cnVjdGlvbnMvc2hhcmVkJztcbmltcG9ydCB7Q29tcG9uZW50RGVmLCBEaXJlY3RpdmVEZWYsIEhvc3REaXJlY3RpdmVEZWZzfSBmcm9tICcuL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge1Byb3BlcnR5QWxpYXNWYWx1ZSwgVENvbnRhaW5lck5vZGUsIFRFbGVtZW50Q29udGFpbmVyTm9kZSwgVEVsZW1lbnROb2RlLCBUTm9kZSwgVE5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1JlbmRlcmVyLCBSZW5kZXJlckZhY3Rvcnl9IGZyb20gJy4vaW50ZXJmYWNlcy9yZW5kZXJlcic7XG5pbXBvcnQge1JFbGVtZW50LCBSTm9kZX0gZnJvbSAnLi9pbnRlcmZhY2VzL3JlbmRlcmVyX2RvbSc7XG5pbXBvcnQge0NPTlRFWFQsIEhFQURFUl9PRkZTRVQsIExWaWV3LCBMVmlld0ZsYWdzLCBUVklFVywgVFZpZXdUeXBlfSBmcm9tICcuL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge01BVEhfTUxfTkFNRVNQQUNFLCBTVkdfTkFNRVNQQUNFfSBmcm9tICcuL25hbWVzcGFjZXMnO1xuaW1wb3J0IHtjcmVhdGVFbGVtZW50Tm9kZSwgc2V0dXBTdGF0aWNBdHRyaWJ1dGVzLCB3cml0ZURpcmVjdENsYXNzfSBmcm9tICcuL25vZGVfbWFuaXB1bGF0aW9uJztcbmltcG9ydCB7ZXh0cmFjdEF0dHJzQW5kQ2xhc3Nlc0Zyb21TZWxlY3Rvciwgc3RyaW5naWZ5Q1NTU2VsZWN0b3JMaXN0fSBmcm9tICcuL25vZGVfc2VsZWN0b3JfbWF0Y2hlcic7XG5pbXBvcnQge2VudGVyVmlldywgZ2V0Q3VycmVudFROb2RlLCBnZXRMVmlldywgbGVhdmVWaWV3fSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7Y29tcHV0ZVN0YXRpY1N0eWxpbmd9IGZyb20gJy4vc3R5bGluZy9zdGF0aWNfc3R5bGluZyc7XG5pbXBvcnQge21lcmdlSG9zdEF0dHJzLCBzZXRVcEF0dHJpYnV0ZXN9IGZyb20gJy4vdXRpbC9hdHRyc191dGlscyc7XG5pbXBvcnQge3N0cmluZ2lmeUZvckVycm9yfSBmcm9tICcuL3V0aWwvc3RyaW5naWZ5X3V0aWxzJztcbmltcG9ydCB7Z2V0TmF0aXZlQnlUTm9kZSwgZ2V0VE5vZGV9IGZyb20gJy4vdXRpbC92aWV3X3V0aWxzJztcbmltcG9ydCB7Um9vdFZpZXdSZWYsIFZpZXdSZWZ9IGZyb20gJy4vdmlld19yZWYnO1xuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIge1xuICAvKipcbiAgICogQHBhcmFtIG5nTW9kdWxlIFRoZSBOZ01vZHVsZVJlZiB0byB3aGljaCBhbGwgcmVzb2x2ZWQgZmFjdG9yaWVzIGFyZSBib3VuZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdNb2R1bGU/OiBOZ01vZHVsZVJlZjxhbnk+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlc29sdmVDb21wb25lbnRGYWN0b3J5PFQ+KGNvbXBvbmVudDogVHlwZTxUPik6IEFic3RyYWN0Q29tcG9uZW50RmFjdG9yeTxUPiB7XG4gICAgbmdEZXZNb2RlICYmIGFzc2VydENvbXBvbmVudFR5cGUoY29tcG9uZW50KTtcbiAgICBjb25zdCBjb21wb25lbnREZWYgPSBnZXRDb21wb25lbnREZWYoY29tcG9uZW50KSE7XG4gICAgcmV0dXJuIG5ldyBDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudERlZiwgdGhpcy5uZ01vZHVsZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9SZWZBcnJheShtYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KToge3Byb3BOYW1lOiBzdHJpbmc7IHRlbXBsYXRlTmFtZTogc3RyaW5nO31bXSB7XG4gIGNvbnN0IGFycmF5OiB7cHJvcE5hbWU6IHN0cmluZzsgdGVtcGxhdGVOYW1lOiBzdHJpbmc7fVtdID0gW107XG4gIGZvciAobGV0IG5vbk1pbmlmaWVkIGluIG1hcCkge1xuICAgIGlmIChtYXAuaGFzT3duUHJvcGVydHkobm9uTWluaWZpZWQpKSB7XG4gICAgICBjb25zdCBtaW5pZmllZCA9IG1hcFtub25NaW5pZmllZF07XG4gICAgICBhcnJheS5wdXNoKHtwcm9wTmFtZTogbWluaWZpZWQsIHRlbXBsYXRlTmFtZTogbm9uTWluaWZpZWR9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXROYW1lc3BhY2UoZWxlbWVudE5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgY29uc3QgbmFtZSA9IGVsZW1lbnROYW1lLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBuYW1lID09PSAnc3ZnJyA/IFNWR19OQU1FU1BBQ0UgOiAobmFtZSA9PT0gJ21hdGgnID8gTUFUSF9NTF9OQU1FU1BBQ0UgOiBudWxsKTtcbn1cblxuLyoqXG4gKiBJbmplY3RvciB0aGF0IGxvb2tzIHVwIGEgdmFsdWUgdXNpbmcgYSBzcGVjaWZpYyBpbmplY3RvciwgYmVmb3JlIGZhbGxpbmcgYmFjayB0byB0aGUgbW9kdWxlXG4gKiBpbmplY3Rvci4gVXNlZCBwcmltYXJpbHkgd2hlbiBjcmVhdGluZyBjb21wb25lbnRzIG9yIGVtYmVkZGVkIHZpZXdzIGR5bmFtaWNhbGx5LlxuICovXG5jbGFzcyBDaGFpbmVkSW5qZWN0b3IgaW1wbGVtZW50cyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIHBhcmVudEluamVjdG9yOiBJbmplY3Rvcikge31cblxuICBnZXQ8VD4odG9rZW46IFByb3ZpZGVyVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU/OiBULCBmbGFncz86IEluamVjdEZsYWdzfEluamVjdE9wdGlvbnMpOiBUIHtcbiAgICBmbGFncyA9IGNvbnZlcnRUb0JpdEZsYWdzKGZsYWdzKTtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0PFR8dHlwZW9mIE5PVF9GT1VORF9DSEVDS19PTkxZX0VMRU1FTlRfSU5KRUNUT1I+KFxuICAgICAgICB0b2tlbiwgTk9UX0ZPVU5EX0NIRUNLX09OTFlfRUxFTUVOVF9JTkpFQ1RPUiwgZmxhZ3MpO1xuXG4gICAgaWYgKHZhbHVlICE9PSBOT1RfRk9VTkRfQ0hFQ0tfT05MWV9FTEVNRU5UX0lOSkVDVE9SIHx8XG4gICAgICAgIG5vdEZvdW5kVmFsdWUgPT09IChOT1RfRk9VTkRfQ0hFQ0tfT05MWV9FTEVNRU5UX0lOSkVDVE9SIGFzIHVua25vd24gYXMgVCkpIHtcbiAgICAgIC8vIFJldHVybiB0aGUgdmFsdWUgZnJvbSB0aGUgcm9vdCBlbGVtZW50IGluamVjdG9yIHdoZW5cbiAgICAgIC8vIC0gaXQgcHJvdmlkZXMgaXRcbiAgICAgIC8vICAgKHZhbHVlICE9PSBOT1RfRk9VTkRfQ0hFQ0tfT05MWV9FTEVNRU5UX0lOSkVDVE9SKVxuICAgICAgLy8gLSB0aGUgbW9kdWxlIGluamVjdG9yIHNob3VsZCBub3QgYmUgY2hlY2tlZFxuICAgICAgLy8gICAobm90Rm91bmRWYWx1ZSA9PT0gTk9UX0ZPVU5EX0NIRUNLX09OTFlfRUxFTUVOVF9JTkpFQ1RPUilcbiAgICAgIHJldHVybiB2YWx1ZSBhcyBUO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhcmVudEluamVjdG9yLmdldCh0b2tlbiwgbm90Rm91bmRWYWx1ZSwgZmxhZ3MpO1xuICB9XG59XG5cbi8qKlxuICogQ29tcG9uZW50RmFjdG9yeSBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRGYWN0b3J5PFQ+IGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnRGYWN0b3J5PFQ+IHtcbiAgb3ZlcnJpZGUgc2VsZWN0b3I6IHN0cmluZztcbiAgb3ZlcnJpZGUgY29tcG9uZW50VHlwZTogVHlwZTxhbnk+O1xuICBvdmVycmlkZSBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdO1xuICBpc0JvdW5kVG9Nb2R1bGU6IGJvb2xlYW47XG5cbiAgb3ZlcnJpZGUgZ2V0IGlucHV0cygpOiB7cHJvcE5hbWU6IHN0cmluZzsgdGVtcGxhdGVOYW1lOiBzdHJpbmc7fVtdIHtcbiAgICByZXR1cm4gdG9SZWZBcnJheSh0aGlzLmNvbXBvbmVudERlZi5pbnB1dHMpO1xuICB9XG5cbiAgb3ZlcnJpZGUgZ2V0IG91dHB1dHMoKToge3Byb3BOYW1lOiBzdHJpbmc7IHRlbXBsYXRlTmFtZTogc3RyaW5nO31bXSB7XG4gICAgcmV0dXJuIHRvUmVmQXJyYXkodGhpcy5jb21wb25lbnREZWYub3V0cHV0cyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGNvbXBvbmVudERlZiBUaGUgY29tcG9uZW50IGRlZmluaXRpb24uXG4gICAqIEBwYXJhbSBuZ01vZHVsZSBUaGUgTmdNb2R1bGVSZWYgdG8gd2hpY2ggdGhlIGZhY3RvcnkgaXMgYm91bmQuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudERlZjogQ29tcG9uZW50RGVmPGFueT4sIHByaXZhdGUgbmdNb2R1bGU/OiBOZ01vZHVsZVJlZjxhbnk+KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnREZWYudHlwZTtcbiAgICB0aGlzLnNlbGVjdG9yID0gc3RyaW5naWZ5Q1NTU2VsZWN0b3JMaXN0KGNvbXBvbmVudERlZi5zZWxlY3RvcnMpO1xuICAgIHRoaXMubmdDb250ZW50U2VsZWN0b3JzID1cbiAgICAgICAgY29tcG9uZW50RGVmLm5nQ29udGVudFNlbGVjdG9ycyA/IGNvbXBvbmVudERlZi5uZ0NvbnRlbnRTZWxlY3RvcnMgOiBbXTtcbiAgICB0aGlzLmlzQm91bmRUb01vZHVsZSA9ICEhbmdNb2R1bGU7XG4gIH1cblxuICBvdmVycmlkZSBjcmVhdGUoXG4gICAgICBpbmplY3RvcjogSW5qZWN0b3IsIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdfHVuZGVmaW5lZCwgcm9vdFNlbGVjdG9yT3JOb2RlPzogYW55LFxuICAgICAgZW52aXJvbm1lbnRJbmplY3Rvcj86IE5nTW9kdWxlUmVmPGFueT58RW52aXJvbm1lbnRJbmplY3RvcnxcbiAgICAgIHVuZGVmaW5lZCk6IEFic3RyYWN0Q29tcG9uZW50UmVmPFQ+IHtcbiAgICBlbnZpcm9ubWVudEluamVjdG9yID0gZW52aXJvbm1lbnRJbmplY3RvciB8fCB0aGlzLm5nTW9kdWxlO1xuXG4gICAgbGV0IHJlYWxFbnZpcm9ubWVudEluamVjdG9yID0gZW52aXJvbm1lbnRJbmplY3RvciBpbnN0YW5jZW9mIEVudmlyb25tZW50SW5qZWN0b3IgP1xuICAgICAgICBlbnZpcm9ubWVudEluamVjdG9yIDpcbiAgICAgICAgZW52aXJvbm1lbnRJbmplY3Rvcj8uaW5qZWN0b3I7XG5cbiAgICBpZiAocmVhbEVudmlyb25tZW50SW5qZWN0b3IgJiYgdGhpcy5jb21wb25lbnREZWYuZ2V0U3RhbmRhbG9uZUluamVjdG9yICE9PSBudWxsKSB7XG4gICAgICByZWFsRW52aXJvbm1lbnRJbmplY3RvciA9IHRoaXMuY29tcG9uZW50RGVmLmdldFN0YW5kYWxvbmVJbmplY3RvcihyZWFsRW52aXJvbm1lbnRJbmplY3RvcikgfHxcbiAgICAgICAgICByZWFsRW52aXJvbm1lbnRJbmplY3RvcjtcbiAgICB9XG5cbiAgICBjb25zdCByb290Vmlld0luamVjdG9yID1cbiAgICAgICAgcmVhbEVudmlyb25tZW50SW5qZWN0b3IgPyBuZXcgQ2hhaW5lZEluamVjdG9yKGluamVjdG9yLCByZWFsRW52aXJvbm1lbnRJbmplY3RvcikgOiBpbmplY3RvcjtcblxuICAgIGNvbnN0IHJlbmRlcmVyRmFjdG9yeSA9IHJvb3RWaWV3SW5qZWN0b3IuZ2V0KFJlbmRlcmVyRmFjdG9yeTIsIG51bGwpO1xuICAgIGlmIChyZW5kZXJlckZhY3RvcnkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5SRU5ERVJFUl9OT1RfRk9VTkQsXG4gICAgICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgICAgICAgICdBbmd1bGFyIHdhcyBub3QgYWJsZSB0byBpbmplY3QgYSByZW5kZXJlciAoUmVuZGVyZXJGYWN0b3J5MikuICcgK1xuICAgICAgICAgICAgICAgICAgJ0xpa2VseSB0aGlzIGlzIGR1ZSB0byBhIGJyb2tlbiBESSBoaWVyYXJjaHkuICcgK1xuICAgICAgICAgICAgICAgICAgJ01ha2Ugc3VyZSB0aGF0IGFueSBpbmplY3RvciB1c2VkIHRvIGNyZWF0ZSB0aGlzIGNvbXBvbmVudCBoYXMgYSBjb3JyZWN0IHBhcmVudC4nKTtcbiAgICB9XG4gICAgY29uc3Qgc2FuaXRpemVyID0gcm9vdFZpZXdJbmplY3Rvci5nZXQoU2FuaXRpemVyLCBudWxsKTtcblxuICAgIGNvbnN0IGhvc3RSZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCB0aGlzLmNvbXBvbmVudERlZik7XG4gICAgLy8gRGV0ZXJtaW5lIGEgdGFnIG5hbWUgdXNlZCBmb3IgY3JlYXRpbmcgaG9zdCBlbGVtZW50cyB3aGVuIHRoaXMgY29tcG9uZW50IGlzIGNyZWF0ZWRcbiAgICAvLyBkeW5hbWljYWxseS4gRGVmYXVsdCB0byAnZGl2JyBpZiB0aGlzIGNvbXBvbmVudCBkaWQgbm90IHNwZWNpZnkgYW55IHRhZyBuYW1lIGluIGl0cyBzZWxlY3Rvci5cbiAgICBjb25zdCBlbGVtZW50TmFtZSA9IHRoaXMuY29tcG9uZW50RGVmLnNlbGVjdG9yc1swXVswXSBhcyBzdHJpbmcgfHwgJ2Rpdic7XG4gICAgY29uc3QgaG9zdFJOb2RlID0gcm9vdFNlbGVjdG9yT3JOb2RlID9cbiAgICAgICAgbG9jYXRlSG9zdEVsZW1lbnQoaG9zdFJlbmRlcmVyLCByb290U2VsZWN0b3JPck5vZGUsIHRoaXMuY29tcG9uZW50RGVmLmVuY2Fwc3VsYXRpb24pIDpcbiAgICAgICAgY3JlYXRlRWxlbWVudE5vZGUoaG9zdFJlbmRlcmVyLCBlbGVtZW50TmFtZSwgZ2V0TmFtZXNwYWNlKGVsZW1lbnROYW1lKSk7XG5cbiAgICBjb25zdCByb290RmxhZ3MgPSB0aGlzLmNvbXBvbmVudERlZi5vblB1c2ggPyBMVmlld0ZsYWdzLkRpcnR5IHwgTFZpZXdGbGFncy5Jc1Jvb3QgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExWaWV3RmxhZ3MuQ2hlY2tBbHdheXMgfCBMVmlld0ZsYWdzLklzUm9vdDtcblxuICAgIC8vIENyZWF0ZSB0aGUgcm9vdCB2aWV3LiBVc2VzIGVtcHR5IFRWaWV3IGFuZCBDb250ZW50VGVtcGxhdGUuXG4gICAgY29uc3Qgcm9vdFRWaWV3ID0gY3JlYXRlVFZpZXcoVFZpZXdUeXBlLlJvb3QsIG51bGwsIG51bGwsIDEsIDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xuICAgIGNvbnN0IHJvb3RMVmlldyA9IGNyZWF0ZUxWaWV3KFxuICAgICAgICBudWxsLCByb290VFZpZXcsIG51bGwsIHJvb3RGbGFncywgbnVsbCwgbnVsbCwgcmVuZGVyZXJGYWN0b3J5LCBob3N0UmVuZGVyZXIsIHNhbml0aXplcixcbiAgICAgICAgcm9vdFZpZXdJbmplY3RvciwgbnVsbCk7XG5cbiAgICAvLyByb290VmlldyBpcyB0aGUgcGFyZW50IHdoZW4gYm9vdHN0cmFwcGluZ1xuICAgIC8vIFRPRE8obWlza28pOiBpdCBsb29rcyBsaWtlIHdlIGFyZSBlbnRlcmluZyB2aWV3IGhlcmUgYnV0IHdlIGRvbid0IHJlYWxseSBuZWVkIHRvIGFzXG4gICAgLy8gYHJlbmRlclZpZXdgIGRvZXMgdGhhdC4gSG93ZXZlciBhcyB0aGUgY29kZSBpcyB3cml0dGVuIGl0IGlzIG5lZWRlZCBiZWNhdXNlXG4gICAgLy8gYGNyZWF0ZVJvb3RDb21wb25lbnRWaWV3YCBhbmQgYGNyZWF0ZVJvb3RDb21wb25lbnRgIGJvdGggcmVhZCBnbG9iYWwgc3RhdGUuIEZpeGluZyB0aG9zZVxuICAgIC8vIGlzc3VlcyB3b3VsZCBhbGxvdyB1cyB0byBkcm9wIHRoaXMuXG4gICAgZW50ZXJWaWV3KHJvb3RMVmlldyk7XG5cbiAgICBsZXQgY29tcG9uZW50OiBUO1xuICAgIGxldCB0RWxlbWVudE5vZGU6IFRFbGVtZW50Tm9kZTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByb290Q29tcG9uZW50RGVmID0gdGhpcy5jb21wb25lbnREZWY7XG4gICAgICBsZXQgcm9vdERpcmVjdGl2ZXM6IERpcmVjdGl2ZURlZjx1bmtub3duPltdO1xuICAgICAgbGV0IGhvc3REaXJlY3RpdmVEZWZzOiBIb3N0RGlyZWN0aXZlRGVmc3xudWxsID0gbnVsbDtcblxuICAgICAgaWYgKHJvb3RDb21wb25lbnREZWYuZmluZEhvc3REaXJlY3RpdmVEZWZzKSB7XG4gICAgICAgIHJvb3REaXJlY3RpdmVzID0gW107XG4gICAgICAgIGhvc3REaXJlY3RpdmVEZWZzID0gbmV3IE1hcCgpO1xuICAgICAgICByb290Q29tcG9uZW50RGVmLmZpbmRIb3N0RGlyZWN0aXZlRGVmcyhyb290Q29tcG9uZW50RGVmLCByb290RGlyZWN0aXZlcywgaG9zdERpcmVjdGl2ZURlZnMpO1xuICAgICAgICByb290RGlyZWN0aXZlcy5wdXNoKHJvb3RDb21wb25lbnREZWYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdERpcmVjdGl2ZXMgPSBbcm9vdENvbXBvbmVudERlZl07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhvc3RUTm9kZSA9IGNyZWF0ZVJvb3RDb21wb25lbnRUTm9kZShyb290TFZpZXcsIGhvc3RSTm9kZSk7XG4gICAgICBjb25zdCBjb21wb25lbnRWaWV3ID0gY3JlYXRlUm9vdENvbXBvbmVudFZpZXcoXG4gICAgICAgICAgaG9zdFROb2RlLCBob3N0Uk5vZGUsIHJvb3RDb21wb25lbnREZWYsIHJvb3REaXJlY3RpdmVzLCByb290TFZpZXcsIHJlbmRlcmVyRmFjdG9yeSxcbiAgICAgICAgICBob3N0UmVuZGVyZXIpO1xuXG4gICAgICB0RWxlbWVudE5vZGUgPSBnZXRUTm9kZShyb290VFZpZXcsIEhFQURFUl9PRkZTRVQpIGFzIFRFbGVtZW50Tm9kZTtcblxuICAgICAgLy8gVE9ETyhjcmlzYmV0byk6IGluIHByYWN0aWNlIGBob3N0Uk5vZGVgIHNob3VsZCBhbHdheXMgYmUgZGVmaW5lZCwgYnV0IHRoZXJlIGFyZSBzb21lIHRlc3RzXG4gICAgICAvLyB3aGVyZSB0aGUgcmVuZGVyZXIgaXMgbW9ja2VkIG91dCBhbmQgYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWQuIFdlIHNob3VsZCB1cGRhdGUgdGhlIHRlc3RzIHNvXG4gICAgICAvLyB0aGF0IHRoaXMgY2hlY2sgY2FuIGJlIHJlbW92ZWQuXG4gICAgICBpZiAoaG9zdFJOb2RlKSB7XG4gICAgICAgIHNldFJvb3ROb2RlQXR0cmlidXRlcyhob3N0UmVuZGVyZXIsIHJvb3RDb21wb25lbnREZWYsIGhvc3RSTm9kZSwgcm9vdFNlbGVjdG9yT3JOb2RlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2plY3RhYmxlTm9kZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9qZWN0Tm9kZXModEVsZW1lbnROb2RlLCB0aGlzLm5nQ29udGVudFNlbGVjdG9ycywgcHJvamVjdGFibGVOb2Rlcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IHNob3VsZCBMaWZlY3ljbGVIb29rc0ZlYXR1cmUgYW5kIG90aGVyIGhvc3QgZmVhdHVyZXMgYmUgZ2VuZXJhdGVkIGJ5IHRoZSBjb21waWxlciBhbmRcbiAgICAgIC8vIGV4ZWN1dGVkIGhlcmU/XG4gICAgICAvLyBBbmd1bGFyIDUgcmVmZXJlbmNlOiBodHRwczovL3N0YWNrYmxpdHouY29tL2VkaXQvbGlmZWN5Y2xlLWhvb2tzLXZjcmVmXG4gICAgICBjb21wb25lbnQgPSBjcmVhdGVSb290Q29tcG9uZW50KFxuICAgICAgICAgIGNvbXBvbmVudFZpZXcsIHJvb3RDb21wb25lbnREZWYsIHJvb3REaXJlY3RpdmVzLCBob3N0RGlyZWN0aXZlRGVmcywgcm9vdExWaWV3LFxuICAgICAgICAgIFtMaWZlY3ljbGVIb29rc0ZlYXR1cmVdKTtcbiAgICAgIHJlbmRlclZpZXcocm9vdFRWaWV3LCByb290TFZpZXcsIG51bGwpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsZWF2ZVZpZXcoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbXBvbmVudFJlZihcbiAgICAgICAgdGhpcy5jb21wb25lbnRUeXBlLCBjb21wb25lbnQsIGNyZWF0ZUVsZW1lbnRSZWYodEVsZW1lbnROb2RlLCByb290TFZpZXcpLCByb290TFZpZXcsXG4gICAgICAgIHRFbGVtZW50Tm9kZSk7XG4gIH1cbn1cblxuY29uc3QgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgPSBuZXcgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciBhbmQgc3RvcmVzIGl0IG9uIHRoZSBpbmplY3Rvci4gT3IsIGlmIHRoZVxuICogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gKiBhbHJlYWR5IGV4aXN0cywgcmV0cmlldmVzIHRoZSBleGlzdGluZyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIuXG4gKlxuICogQHJldHVybnMgVGhlIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciBpbnN0YW5jZSB0byB1c2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcigpOiBBYnN0cmFjdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB7XG4gIHJldHVybiBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnN0YW5jZSBvZiBhIENvbXBvbmVudCBjcmVhdGVkIHZpYSBhIHtAbGluayBDb21wb25lbnRGYWN0b3J5fS5cbiAqXG4gKiBgQ29tcG9uZW50UmVmYCBwcm92aWRlcyBhY2Nlc3MgdG8gdGhlIENvbXBvbmVudCBJbnN0YW5jZSBhcyB3ZWxsIG90aGVyIG9iamVjdHMgcmVsYXRlZCB0byB0aGlzXG4gKiBDb21wb25lbnQgSW5zdGFuY2UgYW5kIGFsbG93cyB5b3UgdG8gZGVzdHJveSB0aGUgQ29tcG9uZW50IEluc3RhbmNlIHZpYSB0aGUge0BsaW5rICNkZXN0cm95fVxuICogbWV0aG9kLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudFJlZjxUPiBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50UmVmPFQ+IHtcbiAgb3ZlcnJpZGUgaW5zdGFuY2U6IFQ7XG4gIG92ZXJyaWRlIGhvc3RWaWV3OiBWaWV3UmVmPFQ+O1xuICBvdmVycmlkZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG4gIG92ZXJyaWRlIGNvbXBvbmVudFR5cGU6IFR5cGU8VD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBjb21wb25lbnRUeXBlOiBUeXBlPFQ+LCBpbnN0YW5jZTogVCwgcHVibGljIGxvY2F0aW9uOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yb290TFZpZXc6IExWaWV3LFxuICAgICAgcHJpdmF0ZSBfdE5vZGU6IFRFbGVtZW50Tm9kZXxUQ29udGFpbmVyTm9kZXxURWxlbWVudENvbnRhaW5lck5vZGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICB0aGlzLmhvc3RWaWV3ID0gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZiA9IG5ldyBSb290Vmlld1JlZjxUPihfcm9vdExWaWV3KTtcbiAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuICB9XG5cbiAgb3ZlcnJpZGUgc2V0SW5wdXQobmFtZTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bik6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0RGF0YSA9IHRoaXMuX3ROb2RlLmlucHV0cztcbiAgICBsZXQgZGF0YVZhbHVlOiBQcm9wZXJ0eUFsaWFzVmFsdWV8dW5kZWZpbmVkO1xuICAgIGlmIChpbnB1dERhdGEgIT09IG51bGwgJiYgKGRhdGFWYWx1ZSA9IGlucHV0RGF0YVtuYW1lXSkpIHtcbiAgICAgIGNvbnN0IGxWaWV3ID0gdGhpcy5fcm9vdExWaWV3O1xuICAgICAgc2V0SW5wdXRzRm9yUHJvcGVydHkobFZpZXdbVFZJRVddLCBsVmlldywgZGF0YVZhbHVlLCBuYW1lLCB2YWx1ZSk7XG4gICAgICBtYXJrRGlydHlJZk9uUHVzaChsVmlldywgdGhpcy5fdE5vZGUuaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobmdEZXZNb2RlKSB7XG4gICAgICAgIGNvbnN0IGNtcE5hbWVGb3JFcnJvciA9IHN0cmluZ2lmeUZvckVycm9yKHRoaXMuY29tcG9uZW50VHlwZSk7XG4gICAgICAgIGxldCBtZXNzYWdlID1cbiAgICAgICAgICAgIGBDYW4ndCBzZXQgdmFsdWUgb2YgdGhlICcke25hbWV9JyBpbnB1dCBvbiB0aGUgJyR7Y21wTmFtZUZvckVycm9yfScgY29tcG9uZW50LiBgO1xuICAgICAgICBtZXNzYWdlICs9IGBNYWtlIHN1cmUgdGhhdCB0aGUgJyR7XG4gICAgICAgICAgICBuYW1lfScgcHJvcGVydHkgaXMgYW5ub3RhdGVkIHdpdGggQElucHV0KCkgb3IgYSBtYXBwZWQgQElucHV0KCcke25hbWV9JykgZXhpc3RzLmA7XG4gICAgICAgIHJlcG9ydFVua25vd25Qcm9wZXJ0eUVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7XG4gICAgcmV0dXJuIG5ldyBOb2RlSW5qZWN0b3IodGhpcy5fdE5vZGUsIHRoaXMuX3Jvb3RMVmlldyk7XG4gIH1cblxuICBvdmVycmlkZSBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaG9zdFZpZXcuZGVzdHJveSgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgb25EZXN0cm95KGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5ob3N0Vmlldy5vbkRlc3Ryb3koY2FsbGJhY2spO1xuICB9XG59XG5cbi8qKiBSZXByZXNlbnRzIGEgSG9zdEZlYXR1cmUgZnVuY3Rpb24uICovXG50eXBlIEhvc3RGZWF0dXJlID0gKDxUPihjb21wb25lbnQ6IFQsIGNvbXBvbmVudERlZjogQ29tcG9uZW50RGVmPFQ+KSA9PiB2b2lkKTtcblxuLy8gVE9ETzogQSBoYWNrIHRvIG5vdCBwdWxsIGluIHRoZSBOdWxsSW5qZWN0b3IgZnJvbSBAYW5ndWxhci9jb3JlLlxuZXhwb3J0IGNvbnN0IE5VTExfSU5KRUNUT1I6IEluamVjdG9yID0ge1xuICBnZXQ6ICh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KSA9PiB7XG4gICAgdGhyb3dQcm92aWRlck5vdEZvdW5kRXJyb3IodG9rZW4sICdOdWxsSW5qZWN0b3InKTtcbiAgfVxufTtcblxuLyoqIENyZWF0ZXMgYSBUTm9kZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGluc3RhbnRpYXRlIGEgcm9vdCBjb21wb25lbnQuICovXG5mdW5jdGlvbiBjcmVhdGVSb290Q29tcG9uZW50VE5vZGUobFZpZXc6IExWaWV3LCByTm9kZTogUk5vZGUpOiBURWxlbWVudE5vZGUge1xuICBjb25zdCB0VmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgY29uc3QgaW5kZXggPSBIRUFERVJfT0ZGU0VUO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0SW5kZXhJblJhbmdlKGxWaWV3LCBpbmRleCk7XG4gIGxWaWV3W2luZGV4XSA9IHJOb2RlO1xuXG4gIC8vICcjaG9zdCcgaXMgYWRkZWQgaGVyZSBhcyB3ZSBkb24ndCBrbm93IHRoZSByZWFsIGhvc3QgRE9NIG5hbWUgKHdlIGRvbid0IHdhbnQgdG8gcmVhZCBpdCkgYW5kIGF0XG4gIC8vIHRoZSBzYW1lIHRpbWUgd2Ugd2FudCB0byBjb21tdW5pY2F0ZSB0aGUgZGVidWcgYFROb2RlYCB0aGF0IHRoaXMgaXMgYSBzcGVjaWFsIGBUTm9kZWBcbiAgLy8gcmVwcmVzZW50aW5nIGEgaG9zdCBlbGVtZW50LlxuICByZXR1cm4gZ2V0T3JDcmVhdGVUTm9kZSh0VmlldywgaW5kZXgsIFROb2RlVHlwZS5FbGVtZW50LCAnI2hvc3QnLCBudWxsKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSByb290IGNvbXBvbmVudCB2aWV3IGFuZCB0aGUgcm9vdCBjb21wb25lbnQgbm9kZS5cbiAqXG4gKiBAcGFyYW0gck5vZGUgUmVuZGVyIGhvc3QgZWxlbWVudC5cbiAqIEBwYXJhbSByb290Q29tcG9uZW50RGVmIENvbXBvbmVudERlZlxuICogQHBhcmFtIHJvb3RWaWV3IFRoZSBwYXJlbnQgdmlldyB3aGVyZSB0aGUgaG9zdCBub2RlIGlzIHN0b3JlZFxuICogQHBhcmFtIHJlbmRlcmVyRmFjdG9yeSBGYWN0b3J5IHRvIGJlIHVzZWQgZm9yIGNyZWF0aW5nIGNoaWxkIHJlbmRlcmVycy5cbiAqIEBwYXJhbSBob3N0UmVuZGVyZXIgVGhlIGN1cnJlbnQgcmVuZGVyZXJcbiAqIEBwYXJhbSBzYW5pdGl6ZXIgVGhlIHNhbml0aXplciwgaWYgcHJvdmlkZWRcbiAqXG4gKiBAcmV0dXJucyBDb21wb25lbnQgdmlldyBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJvb3RDb21wb25lbnRWaWV3KFxuICAgIHROb2RlOiBURWxlbWVudE5vZGUsIHJOb2RlOiBSRWxlbWVudHxudWxsLCByb290Q29tcG9uZW50RGVmOiBDb21wb25lbnREZWY8YW55PixcbiAgICByb290RGlyZWN0aXZlczogRGlyZWN0aXZlRGVmPGFueT5bXSwgcm9vdFZpZXc6IExWaWV3LCByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeSxcbiAgICBob3N0UmVuZGVyZXI6IFJlbmRlcmVyLCBzYW5pdGl6ZXI/OiBTYW5pdGl6ZXJ8bnVsbCk6IExWaWV3IHtcbiAgY29uc3QgdFZpZXcgPSByb290Vmlld1tUVklFV107XG4gIGFwcGx5Um9vdENvbXBvbmVudFN0eWxpbmcocm9vdERpcmVjdGl2ZXMsIHROb2RlLCByTm9kZSwgaG9zdFJlbmRlcmVyKTtcblxuICBjb25zdCB2aWV3UmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIock5vZGUsIHJvb3RDb21wb25lbnREZWYpO1xuICBjb25zdCBjb21wb25lbnRWaWV3ID0gY3JlYXRlTFZpZXcoXG4gICAgICByb290VmlldywgZ2V0T3JDcmVhdGVDb21wb25lbnRUVmlldyhyb290Q29tcG9uZW50RGVmKSwgbnVsbCxcbiAgICAgIHJvb3RDb21wb25lbnREZWYub25QdXNoID8gTFZpZXdGbGFncy5EaXJ0eSA6IExWaWV3RmxhZ3MuQ2hlY2tBbHdheXMsIHJvb3RWaWV3W3ROb2RlLmluZGV4XSxcbiAgICAgIHROb2RlLCByZW5kZXJlckZhY3RvcnksIHZpZXdSZW5kZXJlciwgc2FuaXRpemVyIHx8IG51bGwsIG51bGwsIG51bGwpO1xuXG4gIGlmICh0Vmlldy5maXJzdENyZWF0ZVBhc3MpIHtcbiAgICBtYXJrQXNDb21wb25lbnRIb3N0KHRWaWV3LCB0Tm9kZSwgcm9vdERpcmVjdGl2ZXMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICBhZGRUb1ZpZXdUcmVlKHJvb3RWaWV3LCBjb21wb25lbnRWaWV3KTtcblxuICAvLyBTdG9yZSBjb21wb25lbnQgdmlldyBhdCBub2RlIGluZGV4LCB3aXRoIG5vZGUgYXMgdGhlIEhPU1RcbiAgcmV0dXJuIHJvb3RWaWV3W3ROb2RlLmluZGV4XSA9IGNvbXBvbmVudFZpZXc7XG59XG5cbi8qKiBTZXRzIHVwIHRoZSBzdHlsaW5nIGluZm9ybWF0aW9uIG9uIGEgcm9vdCBjb21wb25lbnQuICovXG5mdW5jdGlvbiBhcHBseVJvb3RDb21wb25lbnRTdHlsaW5nKFxuICAgIHJvb3REaXJlY3RpdmVzOiBEaXJlY3RpdmVEZWY8YW55PltdLCB0Tm9kZTogVEVsZW1lbnROb2RlLCByTm9kZTogUkVsZW1lbnR8bnVsbCxcbiAgICBob3N0UmVuZGVyZXI6IFJlbmRlcmVyKTogdm9pZCB7XG4gIGZvciAoY29uc3QgZGVmIG9mIHJvb3REaXJlY3RpdmVzKSB7XG4gICAgdE5vZGUubWVyZ2VkQXR0cnMgPSBtZXJnZUhvc3RBdHRycyh0Tm9kZS5tZXJnZWRBdHRycywgZGVmLmhvc3RBdHRycyk7XG4gIH1cblxuICBpZiAodE5vZGUubWVyZ2VkQXR0cnMgIT09IG51bGwpIHtcbiAgICBjb21wdXRlU3RhdGljU3R5bGluZyh0Tm9kZSwgdE5vZGUubWVyZ2VkQXR0cnMsIHRydWUpO1xuXG4gICAgaWYgKHJOb2RlICE9PSBudWxsKSB7XG4gICAgICBzZXR1cFN0YXRpY0F0dHJpYnV0ZXMoaG9zdFJlbmRlcmVyLCByTm9kZSwgdE5vZGUpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSByb290IGNvbXBvbmVudCBhbmQgc2V0cyBpdCB1cCB3aXRoIGZlYXR1cmVzIGFuZCBob3N0IGJpbmRpbmdzLlNoYXJlZCBieVxuICogcmVuZGVyQ29tcG9uZW50KCkgYW5kIFZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KCkuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJvb3RDb21wb25lbnQ8VD4oXG4gICAgY29tcG9uZW50VmlldzogTFZpZXcsIHJvb3RDb21wb25lbnREZWY6IENvbXBvbmVudERlZjxUPiwgcm9vdERpcmVjdGl2ZXM6IERpcmVjdGl2ZURlZjxhbnk+W10sXG4gICAgaG9zdERpcmVjdGl2ZURlZnM6IEhvc3REaXJlY3RpdmVEZWZzfG51bGwsIHJvb3RMVmlldzogTFZpZXcsXG4gICAgaG9zdEZlYXR1cmVzOiBIb3N0RmVhdHVyZVtdfG51bGwpOiBhbnkge1xuICBjb25zdCByb290VE5vZGUgPSBnZXRDdXJyZW50VE5vZGUoKSBhcyBURWxlbWVudE5vZGU7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHJvb3RUTm9kZSwgJ3ROb2RlIHNob3VsZCBoYXZlIGJlZW4gYWxyZWFkeSBjcmVhdGVkJyk7XG4gIGNvbnN0IHRWaWV3ID0gcm9vdExWaWV3W1RWSUVXXTtcbiAgY29uc3QgbmF0aXZlID0gZ2V0TmF0aXZlQnlUTm9kZShyb290VE5vZGUsIHJvb3RMVmlldyk7XG5cbiAgaW5pdGlhbGl6ZURpcmVjdGl2ZXModFZpZXcsIHJvb3RMVmlldywgcm9vdFROb2RlLCByb290RGlyZWN0aXZlcywgbnVsbCwgaG9zdERpcmVjdGl2ZURlZnMpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vdERpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkaXJlY3RpdmVJbmRleCA9IHJvb3RUTm9kZS5kaXJlY3RpdmVTdGFydCArIGk7XG4gICAgY29uc3QgZGlyZWN0aXZlSW5zdGFuY2UgPSBnZXROb2RlSW5qZWN0YWJsZShyb290TFZpZXcsIHRWaWV3LCBkaXJlY3RpdmVJbmRleCwgcm9vdFROb2RlKTtcbiAgICBhdHRhY2hQYXRjaERhdGEoZGlyZWN0aXZlSW5zdGFuY2UsIHJvb3RMVmlldyk7XG4gIH1cblxuICBpbnZva2VEaXJlY3RpdmVzSG9zdEJpbmRpbmdzKHRWaWV3LCByb290TFZpZXcsIHJvb3RUTm9kZSk7XG5cbiAgaWYgKG5hdGl2ZSkge1xuICAgIGF0dGFjaFBhdGNoRGF0YShuYXRpdmUsIHJvb3RMVmlldyk7XG4gIH1cblxuICAvLyBXZSdyZSBndWFyYW50ZWVkIGZvciB0aGUgYGNvbXBvbmVudE9mZnNldGAgdG8gYmUgcG9zaXRpdmUgaGVyZVxuICAvLyBzaW5jZSBhIHJvb3QgY29tcG9uZW50IGFsd2F5cyBtYXRjaGVzIGEgY29tcG9uZW50IGRlZi5cbiAgbmdEZXZNb2RlICYmXG4gICAgICBhc3NlcnRHcmVhdGVyVGhhbihyb290VE5vZGUuY29tcG9uZW50T2Zmc2V0LCAtMSwgJ2NvbXBvbmVudE9mZnNldCBtdXN0IGJlIGdyZWF0IHRoYW4gLTEnKTtcbiAgY29uc3QgY29tcG9uZW50ID0gZ2V0Tm9kZUluamVjdGFibGUoXG4gICAgICByb290TFZpZXcsIHRWaWV3LCByb290VE5vZGUuZGlyZWN0aXZlU3RhcnQgKyByb290VE5vZGUuY29tcG9uZW50T2Zmc2V0LCByb290VE5vZGUpO1xuICBjb21wb25lbnRWaWV3W0NPTlRFWFRdID0gcm9vdExWaWV3W0NPTlRFWFRdID0gY29tcG9uZW50O1xuXG4gIGlmIChob3N0RmVhdHVyZXMgIT09IG51bGwpIHtcbiAgICBmb3IgKGNvbnN0IGZlYXR1cmUgb2YgaG9zdEZlYXR1cmVzKSB7XG4gICAgICBmZWF0dXJlKGNvbXBvbmVudCwgcm9vdENvbXBvbmVudERlZik7XG4gICAgfVxuICB9XG5cbiAgLy8gV2Ugd2FudCB0byBnZW5lcmF0ZSBhbiBlbXB0eSBRdWVyeUxpc3QgZm9yIHJvb3QgY29udGVudCBxdWVyaWVzIGZvciBiYWNrd2FyZHNcbiAgLy8gY29tcGF0aWJpbGl0eSB3aXRoIFZpZXdFbmdpbmUuXG4gIGV4ZWN1dGVDb250ZW50UXVlcmllcyh0Vmlldywgcm9vdFROb2RlLCBjb21wb25lbnRWaWV3KTtcblxuICByZXR1cm4gY29tcG9uZW50O1xufVxuXG4vKiogU2V0cyB0aGUgc3RhdGljIGF0dHJpYnV0ZXMgb24gYSByb290IGNvbXBvbmVudC4gKi9cbmZ1bmN0aW9uIHNldFJvb3ROb2RlQXR0cmlidXRlcyhcbiAgICBob3N0UmVuZGVyZXI6IFJlbmRlcmVyMiwgY29tcG9uZW50RGVmOiBDb21wb25lbnREZWY8dW5rbm93bj4sIGhvc3RSTm9kZTogUkVsZW1lbnQsXG4gICAgcm9vdFNlbGVjdG9yT3JOb2RlOiBhbnkpIHtcbiAgaWYgKHJvb3RTZWxlY3Rvck9yTm9kZSkge1xuICAgIHNldFVwQXR0cmlidXRlcyhob3N0UmVuZGVyZXIsIGhvc3RSTm9kZSwgWyduZy12ZXJzaW9uJywgVkVSU0lPTi5mdWxsXSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgaG9zdCBlbGVtZW50IGlzIGNyZWF0ZWQgYXMgYSBwYXJ0IG9mIHRoaXMgZnVuY3Rpb24gY2FsbCAoaS5lLiBgcm9vdFNlbGVjdG9yT3JOb2RlYFxuICAgIC8vIGlzIG5vdCBkZWZpbmVkKSwgYWxzbyBhcHBseSBhdHRyaWJ1dGVzIGFuZCBjbGFzc2VzIGV4dHJhY3RlZCBmcm9tIGNvbXBvbmVudCBzZWxlY3Rvci5cbiAgICAvLyBFeHRyYWN0IGF0dHJpYnV0ZXMgYW5kIGNsYXNzZXMgZnJvbSB0aGUgZmlyc3Qgc2VsZWN0b3Igb25seSB0byBtYXRjaCBWRSBiZWhhdmlvci5cbiAgICBjb25zdCB7YXR0cnMsIGNsYXNzZXN9ID0gZXh0cmFjdEF0dHJzQW5kQ2xhc3Nlc0Zyb21TZWxlY3Rvcihjb21wb25lbnREZWYuc2VsZWN0b3JzWzBdKTtcbiAgICBpZiAoYXR0cnMpIHtcbiAgICAgIHNldFVwQXR0cmlidXRlcyhob3N0UmVuZGVyZXIsIGhvc3RSTm9kZSwgYXR0cnMpO1xuICAgIH1cbiAgICBpZiAoY2xhc3NlcyAmJiBjbGFzc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHdyaXRlRGlyZWN0Q2xhc3MoaG9zdFJlbmRlcmVyLCBob3N0Uk5vZGUsIGNsYXNzZXMuam9pbignICcpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqIFByb2plY3RzIHRoZSBgcHJvamVjdGFibGVOb2Rlc2AgdGhhdCB3ZXJlIHNwZWNpZmllZCB3aGVuIGNyZWF0aW5nIGEgcm9vdCBjb21wb25lbnQuICovXG5mdW5jdGlvbiBwcm9qZWN0Tm9kZXMoXG4gICAgdE5vZGU6IFRFbGVtZW50Tm9kZSwgbmdDb250ZW50U2VsZWN0b3JzOiBzdHJpbmdbXSwgcHJvamVjdGFibGVOb2RlczogYW55W11bXSkge1xuICBjb25zdCBwcm9qZWN0aW9uOiAoVE5vZGV8Uk5vZGVbXXxudWxsKVtdID0gdE5vZGUucHJvamVjdGlvbiA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5nQ29udGVudFNlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG5vZGVzZm9yU2xvdCA9IHByb2plY3RhYmxlTm9kZXNbaV07XG4gICAgLy8gUHJvamVjdGFibGUgbm9kZXMgY2FuIGJlIHBhc3NlZCBhcyBhcnJheSBvZiBhcnJheXMgb3IgYW4gYXJyYXkgb2YgaXRlcmFibGVzIChuZ1VwZ3JhZGVcbiAgICAvLyBjYXNlKS4gSGVyZSB3ZSBkbyBub3JtYWxpemUgcGFzc2VkIGRhdGEgc3RydWN0dXJlIHRvIGJlIGFuIGFycmF5IG9mIGFycmF5cyB0byBhdm9pZFxuICAgIC8vIGNvbXBsZXggY2hlY2tzIGRvd24gdGhlIGxpbmUuXG4gICAgLy8gV2UgYWxzbyBub3JtYWxpemUgdGhlIGxlbmd0aCBvZiB0aGUgcGFzc2VkIGluIHByb2plY3RhYmxlIG5vZGVzICh0byBtYXRjaCB0aGUgbnVtYmVyIG9mXG4gICAgLy8gPG5nLWNvbnRhaW5lcj4gc2xvdHMgZGVmaW5lZCBieSBhIGNvbXBvbmVudCkuXG4gICAgcHJvamVjdGlvbi5wdXNoKG5vZGVzZm9yU2xvdCAhPSBudWxsID8gQXJyYXkuZnJvbShub2Rlc2ZvclNsb3QpIDogbnVsbCk7XG4gIH1cbn1cblxuLyoqXG4gKiBVc2VkIHRvIGVuYWJsZSBsaWZlY3ljbGUgaG9va3Mgb24gdGhlIHJvb3QgY29tcG9uZW50LlxuICpcbiAqIEluY2x1ZGUgdGhpcyBmZWF0dXJlIHdoZW4gY2FsbGluZyBgcmVuZGVyQ29tcG9uZW50YCBpZiB0aGUgcm9vdCBjb21wb25lbnRcbiAqIHlvdSBhcmUgcmVuZGVyaW5nIGhhcyBsaWZlY3ljbGUgaG9va3MgZGVmaW5lZC4gT3RoZXJ3aXNlLCB0aGUgaG9va3Mgd29uJ3RcbiAqIGJlIGNhbGxlZCBwcm9wZXJseS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogcmVuZGVyQ29tcG9uZW50KEFwcENvbXBvbmVudCwge2hvc3RGZWF0dXJlczogW0xpZmVjeWNsZUhvb2tzRmVhdHVyZV19KTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gTGlmZWN5Y2xlSG9va3NGZWF0dXJlKCk6IHZvaWQge1xuICBjb25zdCB0Tm9kZSA9IGdldEN1cnJlbnRUTm9kZSgpITtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodE5vZGUsICdUTm9kZSBpcyByZXF1aXJlZCcpO1xuICByZWdpc3RlclBvc3RPcmRlckhvb2tzKGdldExWaWV3KClbVFZJRVddLCB0Tm9kZSk7XG59XG4iXX0=