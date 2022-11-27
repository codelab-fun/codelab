/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertIndexInRange } from '../../util/assert';
import { isObservable } from '../../util/lang';
import { isDirectiveHost } from '../interfaces/type_checks';
import { CLEANUP, CONTEXT, RENDERER } from '../interfaces/view';
import { assertTNodeType } from '../node_assert';
import { profiler } from '../profiler';
import { getCurrentDirectiveDef, getCurrentTNode, getLView, getTView } from '../state';
import { getComponentLViewByIndex, getNativeByTNode, unwrapRNode } from '../util/view_utils';
import { getOrCreateLViewCleanup, getOrCreateTViewCleanup, handleError, loadComponentRenderer, markViewDirty } from './shared';
/**
 * Adds an event listener to the current node.
 *
 * If an output exists on one of the node's directives, it also subscribes to the output
 * and saves the subscription for later cleanup.
 *
 * @param eventName Name of the event
 * @param listenerFn The function to be called when event emits
 * @param useCapture Whether or not to use capture in event listener - this argument is a reminder
 *     from the Renderer3 infrastructure and should be removed from the instruction arguments
 * @param eventTargetResolver Function that returns global target information in case this listener
 * should be attached to a global object like window, document or body
 *
 * @codeGenApi
 */
export function ɵɵlistener(eventName, listenerFn, useCapture, eventTargetResolver) {
    const lView = getLView();
    const tView = getTView();
    const tNode = getCurrentTNode();
    listenerInternal(tView, lView, lView[RENDERER], tNode, eventName, listenerFn, eventTargetResolver);
    return ɵɵlistener;
}
/**
 * Registers a synthetic host listener (e.g. `(@foo.start)`) on a component or directive.
 *
 * This instruction is for compatibility purposes and is designed to ensure that a
 * synthetic host listener (e.g. `@HostListener('@foo.start')`) properly gets rendered
 * in the component's renderer. Normally all host listeners are evaluated with the
 * parent component's renderer, but, in the case of animation @triggers, they need
 * to be evaluated with the sub component's renderer (because that's where the
 * animation triggers are defined).
 *
 * Do not use this instruction as a replacement for `listener`. This instruction
 * only exists to ensure compatibility with the ViewEngine's host binding behavior.
 *
 * @param eventName Name of the event
 * @param listenerFn The function to be called when event emits
 * @param useCapture Whether or not to use capture in event listener
 * @param eventTargetResolver Function that returns global target information in case this listener
 * should be attached to a global object like window, document or body
 *
 * @codeGenApi
 */
export function ɵɵsyntheticHostListener(eventName, listenerFn) {
    const tNode = getCurrentTNode();
    const lView = getLView();
    const tView = getTView();
    const currentDef = getCurrentDirectiveDef(tView.data);
    const renderer = loadComponentRenderer(currentDef, tNode, lView);
    listenerInternal(tView, lView, renderer, tNode, eventName, listenerFn);
    return ɵɵsyntheticHostListener;
}
/**
 * A utility function that checks if a given element has already an event handler registered for an
 * event with a specified name. The TView.cleanup data structure is used to find out which events
 * are registered for a given element.
 */
function findExistingListener(tView, lView, eventName, tNodeIdx) {
    const tCleanup = tView.cleanup;
    if (tCleanup != null) {
        for (let i = 0; i < tCleanup.length - 1; i += 2) {
            const cleanupEventName = tCleanup[i];
            if (cleanupEventName === eventName && tCleanup[i + 1] === tNodeIdx) {
                // We have found a matching event name on the same node but it might not have been
                // registered yet, so we must explicitly verify entries in the LView cleanup data
                // structures.
                const lCleanup = lView[CLEANUP];
                const listenerIdxInLCleanup = tCleanup[i + 2];
                return lCleanup.length > listenerIdxInLCleanup ? lCleanup[listenerIdxInLCleanup] : null;
            }
            // TView.cleanup can have a mix of 4-elements entries (for event handler cleanups) or
            // 2-element entries (for directive and queries destroy hooks). As such we can encounter
            // blocks of 4 or 2 items in the tView.cleanup and this is why we iterate over 2 elements
            // first and jump another 2 elements if we detect listeners cleanup (4 elements). Also check
            // documentation of TView.cleanup for more details of this data structure layout.
            if (typeof cleanupEventName === 'string') {
                i += 2;
            }
        }
    }
    return null;
}
function listenerInternal(tView, lView, renderer, tNode, eventName, listenerFn, eventTargetResolver) {
    const isTNodeDirectiveHost = isDirectiveHost(tNode);
    const firstCreatePass = tView.firstCreatePass;
    const tCleanup = firstCreatePass && getOrCreateTViewCleanup(tView);
    const context = lView[CONTEXT];
    // When the ɵɵlistener instruction was generated and is executed we know that there is either a
    // native listener or a directive output on this element. As such we we know that we will have to
    // register a listener and store its cleanup function on LView.
    const lCleanup = getOrCreateLViewCleanup(lView);
    ngDevMode && assertTNodeType(tNode, 3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */);
    let processOutputs = true;
    // Adding a native event listener is applicable when:
    // - The corresponding TNode represents a DOM element.
    // - The event target has a resolver (usually resulting in a global object,
    //   such as `window` or `document`).
    if ((tNode.type & 3 /* TNodeType.AnyRNode */) || eventTargetResolver) {
        const native = getNativeByTNode(tNode, lView);
        const target = eventTargetResolver ? eventTargetResolver(native) : native;
        const lCleanupIndex = lCleanup.length;
        const idxOrTargetGetter = eventTargetResolver ?
            (_lView) => eventTargetResolver(unwrapRNode(_lView[tNode.index])) :
            tNode.index;
        // In order to match current behavior, native DOM event listeners must be added for all
        // events (including outputs).
        // There might be cases where multiple directives on the same element try to register an event
        // handler function for the same event. In this situation we want to avoid registration of
        // several native listeners as each registration would be intercepted by NgZone and
        // trigger change detection. This would mean that a single user action would result in several
        // change detections being invoked. To avoid this situation we want to have only one call to
        // native handler registration (for the same element and same type of event).
        //
        // In order to have just one native event handler in presence of multiple handler functions,
        // we just register a first handler function as a native event listener and then chain
        // (coalesce) other handler functions on top of the first native handler function.
        let existingListener = null;
        // Please note that the coalescing described here doesn't happen for events specifying an
        // alternative target (ex. (document:click)) - this is to keep backward compatibility with the
        // view engine.
        // Also, we don't have to search for existing listeners is there are no directives
        // matching on a given node as we can't register multiple event handlers for the same event in
        // a template (this would mean having duplicate attributes).
        if (!eventTargetResolver && isTNodeDirectiveHost) {
            existingListener = findExistingListener(tView, lView, eventName, tNode.index);
        }
        if (existingListener !== null) {
            // Attach a new listener to coalesced listeners list, maintaining the order in which
            // listeners are registered. For performance reasons, we keep a reference to the last
            // listener in that list (in `__ngLastListenerFn__` field), so we can avoid going through
            // the entire set each time we need to add a new listener.
            const lastListenerFn = existingListener.__ngLastListenerFn__ || existingListener;
            lastListenerFn.__ngNextListenerFn__ = listenerFn;
            existingListener.__ngLastListenerFn__ = listenerFn;
            processOutputs = false;
        }
        else {
            listenerFn = wrapListener(tNode, lView, context, listenerFn, false /** preventDefault */);
            const cleanupFn = renderer.listen(target, eventName, listenerFn);
            ngDevMode && ngDevMode.rendererAddEventListener++;
            lCleanup.push(listenerFn, cleanupFn);
            tCleanup && tCleanup.push(eventName, idxOrTargetGetter, lCleanupIndex, lCleanupIndex + 1);
        }
    }
    else {
        // Even if there is no native listener to add, we still need to wrap the listener so that OnPush
        // ancestors are marked dirty when an event occurs.
        listenerFn = wrapListener(tNode, lView, context, listenerFn, false /** preventDefault */);
    }
    // subscribe to directive outputs
    const outputs = tNode.outputs;
    let props;
    if (processOutputs && outputs !== null && (props = outputs[eventName])) {
        const propsLength = props.length;
        if (propsLength) {
            for (let i = 0; i < propsLength; i += 2) {
                const index = props[i];
                ngDevMode && assertIndexInRange(lView, index);
                const minifiedName = props[i + 1];
                const directiveInstance = lView[index];
                const output = directiveInstance[minifiedName];
                if (ngDevMode && !isObservable(output)) {
                    throw new Error(`@Output ${minifiedName} not initialized in '${directiveInstance.constructor.name}'.`);
                }
                const subscription = output.subscribe(listenerFn);
                const idx = lCleanup.length;
                lCleanup.push(listenerFn, subscription);
                tCleanup && tCleanup.push(eventName, tNode.index, idx, -(idx + 1));
            }
        }
    }
}
function executeListenerWithErrorHandling(lView, context, listenerFn, e) {
    try {
        profiler(6 /* ProfilerEvent.OutputStart */, context, listenerFn);
        // Only explicitly returning false from a listener should preventDefault
        return listenerFn(e) !== false;
    }
    catch (error) {
        handleError(lView, error);
        return false;
    }
    finally {
        profiler(7 /* ProfilerEvent.OutputEnd */, context, listenerFn);
    }
}
/**
 * Wraps an event listener with a function that marks ancestors dirty and prevents default behavior,
 * if applicable.
 *
 * @param tNode The TNode associated with this listener
 * @param lView The LView that contains this listener
 * @param listenerFn The listener function to call
 * @param wrapWithPreventDefault Whether or not to prevent default behavior
 * (the procedural renderer does this already, so in those cases, we should skip)
 */
function wrapListener(tNode, lView, context, listenerFn, wrapWithPreventDefault) {
    // Note: we are performing most of the work in the listener function itself
    // to optimize listener registration.
    return function wrapListenerIn_markDirtyAndPreventDefault(e) {
        // Ivy uses `Function` as a special token that allows us to unwrap the function
        // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`.
        if (e === Function) {
            return listenerFn;
        }
        // In order to be backwards compatible with View Engine, events on component host nodes
        // must also mark the component view itself dirty (i.e. the view that it owns).
        const startView = tNode.componentOffset > -1 ? getComponentLViewByIndex(tNode.index, lView) : lView;
        markViewDirty(startView);
        let result = executeListenerWithErrorHandling(lView, context, listenerFn, e);
        // A just-invoked listener function might have coalesced listeners so we need to check for
        // their presence and invoke as needed.
        let nextListenerFn = wrapListenerIn_markDirtyAndPreventDefault.__ngNextListenerFn__;
        while (nextListenerFn) {
            // We should prevent default if any of the listeners explicitly return false
            result = executeListenerWithErrorHandling(lView, context, nextListenerFn, e) && result;
            nextListenerFn = nextListenerFn.__ngNextListenerFn__;
        }
        if (wrapWithPreventDefault && result === false) {
            e.preventDefault();
            // Necessary for legacy browsers that don't support preventDefault (e.g. IE)
            e.returnValue = false;
        }
        return result;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2luc3RydWN0aW9ucy9saXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFJN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFTLFFBQVEsRUFBUSxNQUFNLG9CQUFvQixDQUFDO0FBQzVFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsUUFBUSxFQUFnQixNQUFNLGFBQWEsQ0FBQztBQUNwRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDckYsT0FBTyxFQUFDLHdCQUF3QixFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTNGLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBSTdIOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FDdEIsU0FBaUIsRUFBRSxVQUE0QixFQUFFLFVBQW9CLEVBQ3JFLG1CQUEwQztJQUM1QyxNQUFNLEtBQUssR0FBRyxRQUFRLEVBQVcsQ0FBQztJQUNsQyxNQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUN6QixNQUFNLEtBQUssR0FBRyxlQUFlLEVBQUcsQ0FBQztJQUNqQyxnQkFBZ0IsQ0FDWixL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QUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQztZQUN2RixjQUFjLEdBQVMsY0FBZSxDQUFDLG9CQUFvQixDQUFDO1NBQzdEO1FBRUQsSUFBSSxzQkFBc0IsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQzlDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQiw0RUFBNEU7WUFDNUUsQ0FBQyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuaW1wb3J0IHthc3NlcnRJbmRleEluUmFuZ2V9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7aXNPYnNlcnZhYmxlfSBmcm9tICcuLi8uLi91dGlsL2xhbmcnO1xuaW1wb3J0IHtQcm9wZXJ0eUFsaWFzVmFsdWUsIFROb2RlLCBUTm9kZVR5cGV9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0dsb2JhbFRhcmdldFJlc29sdmVyLCBSZW5kZXJlcn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcic7XG5pbXBvcnQge1JFbGVtZW50fSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbmRlcmVyX2RvbSc7XG5pbXBvcnQge2lzRGlyZWN0aXZlSG9zdH0gZnJvbSAnLi4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0NMRUFOVVAsIENPTlRFWFQsIExWaWV3LCBSRU5ERVJFUiwgVFZpZXd9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2Fzc2VydFROb2RlVHlwZX0gZnJvbSAnLi4vbm9kZV9hc3NlcnQnO1xuaW1wb3J0IHtwcm9maWxlciwgUHJvZmlsZXJFdmVudH0gZnJvbSAnLi4vcHJvZmlsZXInO1xuaW1wb3J0IHtnZXRDdXJyZW50RGlyZWN0aXZlRGVmLCBnZXRDdXJyZW50VE5vZGUsIGdldExWaWV3LCBnZXRUVmlld30gZnJvbSAnLi4vc3RhdGUnO1xuaW1wb3J0IHtnZXRDb21wb25lbnRMVmlld0J5SW5kZXgsIGdldE5hdGl2ZUJ5VE5vZGUsIHVud3JhcFJOb2RlfSBmcm9tICcuLi91dGlsL3ZpZXdfdXRpbHMnO1xuXG5pbXBvcnQge2dldE9yQ3JlYXRlTFZpZXdDbGVhbnVwLCBnZXRPckNyZWF0ZVRWaWV3Q2xlYW51cCwgaGFuZGxlRXJyb3IsIGxvYWRDb21wb25lbnRSZW5kZXJlciwgbWFya1ZpZXdEaXJ0eX0gZnJvbSAnLi9zaGFyZWQnO1xuXG5cblxuLyoqXG4gKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjdXJyZW50IG5vZGUuXG4gKlxuICogSWYgYW4gb3V0cHV0IGV4aXN0cyBvbiBvbmUgb2YgdGhlIG5vZGUncyBkaXJlY3RpdmVzLCBpdCBhbHNvIHN1YnNjcmliZXMgdG8gdGhlIG91dHB1dFxuICogYW5kIHNhdmVzIHRoZSBzdWJzY3JpcHRpb24gZm9yIGxhdGVyIGNsZWFudXAuXG4gKlxuICogQHBhcmFtIGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudFxuICogQHBhcmFtIGxpc3RlbmVyRm4gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIGV2ZW50IGVtaXRzXG4gKiBAcGFyYW0gdXNlQ2FwdHVyZSBXaGV0aGVyIG9yIG5vdCB0byB1c2UgY2FwdHVyZSBpbiBldmVudCBsaXN0ZW5lciAtIHRoaXMgYXJndW1lbnQgaXMgYSByZW1pbmRlclxuICogICAgIGZyb20gdGhlIFJlbmRlcmVyMyBpbmZyYXN0cnVjdHVyZSBhbmQgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGUgaW5zdHJ1Y3Rpb24gYXJndW1lbnRzXG4gKiBAcGFyYW0gZXZlbnRUYXJnZXRSZXNvbHZlciBGdW5jdGlvbiB0aGF0IHJldHVybnMgZ2xvYmFsIHRhcmdldCBpbmZvcm1hdGlvbiBpbiBjYXNlIHRoaXMgbGlzdGVuZXJcbiAqIHNob3VsZCBiZSBhdHRhY2hlZCB0byBhIGdsb2JhbCBvYmplY3QgbGlrZSB3aW5kb3csIGRvY3VtZW50IG9yIGJvZHlcbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWxpc3RlbmVyKFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLCBsaXN0ZW5lckZuOiAoZT86IGFueSkgPT4gYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbixcbiAgICBldmVudFRhcmdldFJlc29sdmVyPzogR2xvYmFsVGFyZ2V0UmVzb2x2ZXIpOiB0eXBlb2YgybXJtWxpc3RlbmVyIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldzx7fXxudWxsPigpO1xuICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gIGNvbnN0IHROb2RlID0gZ2V0Q3VycmVudFROb2RlKCkhO1xuICBsaXN0ZW5lckludGVybmFsKFxuICAgICAgdFZpZXcsIGxWaWV3LCBsVmlld1tSRU5ERVJFUl0sIHROb2RlLCBldmVudE5hbWUsIGxpc3RlbmVyRm4sIGV2ZW50VGFyZ2V0UmVzb2x2ZXIpO1xuICByZXR1cm4gybXJtWxpc3RlbmVyO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBhIHN5bnRoZXRpYyBob3N0IGxpc3RlbmVyIChlLmcuIGAoQGZvby5zdGFydClgKSBvbiBhIGNvbXBvbmVudCBvciBkaXJlY3RpdmUuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBpcyBmb3IgY29tcGF0aWJpbGl0eSBwdXJwb3NlcyBhbmQgaXMgZGVzaWduZWQgdG8gZW5zdXJlIHRoYXQgYVxuICogc3ludGhldGljIGhvc3QgbGlzdGVuZXIgKGUuZy4gYEBIb3N0TGlzdGVuZXIoJ0Bmb28uc3RhcnQnKWApIHByb3Blcmx5IGdldHMgcmVuZGVyZWRcbiAqIGluIHRoZSBjb21wb25lbnQncyByZW5kZXJlci4gTm9ybWFsbHkgYWxsIGhvc3QgbGlzdGVuZXJzIGFyZSBldmFsdWF0ZWQgd2l0aCB0aGVcbiAqIHBhcmVudCBjb21wb25lbnQncyByZW5kZXJlciwgYnV0LCBpbiB0aGUgY2FzZSBvZiBhbmltYXRpb24gQHRyaWdnZXJzLCB0aGV5IG5lZWRcbiAqIHRvIGJlIGV2YWx1YXRlZCB3aXRoIHRoZSBzdWIgY29tcG9uZW50J3MgcmVuZGVyZXIgKGJlY2F1c2UgdGhhdCdzIHdoZXJlIHRoZVxuICogYW5pbWF0aW9uIHRyaWdnZXJzIGFyZSBkZWZpbmVkKS5cbiAqXG4gKiBEbyBub3QgdXNlIHRoaXMgaW5zdHJ1Y3Rpb24gYXMgYSByZXBsYWNlbWVudCBmb3IgYGxpc3RlbmVyYC4gVGhpcyBpbnN0cnVjdGlvblxuICogb25seSBleGlzdHMgdG8gZW5zdXJlIGNvbXBhdGliaWxpdHkgd2l0aCB0aGUgVmlld0VuZ2luZSdzIGhvc3QgYmluZGluZyBiZWhhdmlvci5cbiAqXG4gKiBAcGFyYW0gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0gbGlzdGVuZXJGbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gZXZlbnQgZW1pdHNcbiAqIEBwYXJhbSB1c2VDYXB0dXJlIFdoZXRoZXIgb3Igbm90IHRvIHVzZSBjYXB0dXJlIGluIGV2ZW50IGxpc3RlbmVyXG4gKiBAcGFyYW0gZXZlbnRUYXJnZXRSZXNvbHZlciBGdW5jdGlvbiB0aGF0IHJldHVybnMgZ2xvYmFsIHRhcmdldCBpbmZvcm1hdGlvbiBpbiBjYXNlIHRoaXMgbGlzdGVuZXJcbiAqIHNob3VsZCBiZSBhdHRhY2hlZCB0byBhIGdsb2JhbCBvYmplY3QgbGlrZSB3aW5kb3csIGRvY3VtZW50IG9yIGJvZHlcbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXN5bnRoZXRpY0hvc3RMaXN0ZW5lcihcbiAgICBldmVudE5hbWU6IHN0cmluZywgbGlzdGVuZXJGbjogKGU/OiBhbnkpID0+IGFueSk6IHR5cGVvZiDJtcm1c3ludGhldGljSG9zdExpc3RlbmVyIHtcbiAgY29uc3QgdE5vZGUgPSBnZXRDdXJyZW50VE5vZGUoKSE7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXc8e318bnVsbD4oKTtcbiAgY29uc3QgdFZpZXcgPSBnZXRUVmlldygpO1xuICBjb25zdCBjdXJyZW50RGVmID0gZ2V0Q3VycmVudERpcmVjdGl2ZURlZih0Vmlldy5kYXRhKTtcbiAgY29uc3QgcmVuZGVyZXIgPSBsb2FkQ29tcG9uZW50UmVuZGVyZXIoY3VycmVudERlZiwgdE5vZGUsIGxWaWV3KTtcbiAgbGlzdGVuZXJJbnRlcm5hbCh0VmlldywgbFZpZXcsIHJlbmRlcmVyLCB0Tm9kZSwgZXZlbnROYW1lLCBsaXN0ZW5lckZuKTtcbiAgcmV0dXJuIMm1ybVzeW50aGV0aWNIb3N0TGlzdGVuZXI7XG59XG5cbi8qKlxuICogQSB1dGlsaXR5IGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIGEgZ2l2ZW4gZWxlbWVudCBoYXMgYWxyZWFkeSBhbiBldmVudCBoYW5kbGVyIHJlZ2lzdGVyZWQgZm9yIGFuXG4gKiBldmVudCB3aXRoIGEgc3BlY2lmaWVkIG5hbWUuIFRoZSBUVmlldy5jbGVhbnVwIGRhdGEgc3RydWN0dXJlIGlzIHVzZWQgdG8gZmluZCBvdXQgd2hpY2ggZXZlbnRzXG4gKiBhcmUgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBlbGVtZW50LlxuICovXG5mdW5jdGlvbiBmaW5kRXhpc3RpbmdMaXN0ZW5lcihcbiAgICB0VmlldzogVFZpZXcsIGxWaWV3OiBMVmlldywgZXZlbnROYW1lOiBzdHJpbmcsIHROb2RlSWR4OiBudW1iZXIpOiAoKGU/OiBhbnkpID0+IGFueSl8bnVsbCB7XG4gIGNvbnN0IHRDbGVhbnVwID0gdFZpZXcuY2xlYW51cDtcbiAgaWYgKHRDbGVhbnVwICE9IG51bGwpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRDbGVhbnVwLmxlbmd0aCAtIDE7IGkgKz0gMikge1xuICAgICAgY29uc3QgY2xlYW51cEV2ZW50TmFtZSA9IHRDbGVhbnVwW2ldO1xuICAgICAgaWYgKGNsZWFudXBFdmVudE5hbWUgPT09IGV2ZW50TmFtZSAmJiB0Q2xlYW51cFtpICsgMV0gPT09IHROb2RlSWR4KSB7XG4gICAgICAgIC8vIFdlIGhhdmUgZm91bmQgYSBtYXRjaGluZyBldmVudCBuYW1lIG9uIHRoZSBzYW1lIG5vZGUgYnV0IGl0IG1pZ2h0IG5vdCBoYXZlIGJlZW5cbiAgICAgICAgLy8gcmVnaXN0ZXJlZCB5ZXQsIHNvIHdlIG11c3QgZXhwbGljaXRseSB2ZXJpZnkgZW50cmllcyBpbiB0aGUgTFZpZXcgY2xlYW51cCBkYXRhXG4gICAgICAgIC8vIHN0cnVjdHVyZXMuXG4gICAgICAgIGNvbnN0IGxDbGVhbnVwID0gbFZpZXdbQ0xFQU5VUF0hO1xuICAgICAgICBjb25zdCBsaXN0ZW5lcklkeEluTENsZWFudXAgPSB0Q2xlYW51cFtpICsgMl07XG4gICAgICAgIHJldHVybiBsQ2xlYW51cC5sZW5ndGggPiBsaXN0ZW5lcklkeEluTENsZWFudXAgPyBsQ2xlYW51cFtsaXN0ZW5lcklkeEluTENsZWFudXBdIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIFRWaWV3LmNsZWFudXAgY2FuIGhhdmUgYSBtaXggb2YgNC1lbGVtZW50cyBlbnRyaWVzIChmb3IgZXZlbnQgaGFuZGxlciBjbGVhbnVwcykgb3JcbiAgICAgIC8vIDItZWxlbWVudCBlbnRyaWVzIChmb3IgZGlyZWN0aXZlIGFuZCBxdWVyaWVzIGRlc3Ryb3kgaG9va3MpLiBBcyBzdWNoIHdlIGNhbiBlbmNvdW50ZXJcbiAgICAgIC8vIGJsb2NrcyBvZiA0IG9yIDIgaXRlbXMgaW4gdGhlIHRWaWV3LmNsZWFudXAgYW5kIHRoaXMgaXMgd2h5IHdlIGl0ZXJhdGUgb3ZlciAyIGVsZW1lbnRzXG4gICAgICAvLyBmaXJzdCBhbmQganVtcCBhbm90aGVyIDIgZWxlbWVudHMgaWYgd2UgZGV0ZWN0IGxpc3RlbmVycyBjbGVhbnVwICg0IGVsZW1lbnRzKS4gQWxzbyBjaGVja1xuICAgICAgLy8gZG9jdW1lbnRhdGlvbiBvZiBUVmlldy5jbGVhbnVwIGZvciBtb3JlIGRldGFpbHMgb2YgdGhpcyBkYXRhIHN0cnVjdHVyZSBsYXlvdXQuXG4gICAgICBpZiAodHlwZW9mIGNsZWFudXBFdmVudE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGkgKz0gMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGxpc3RlbmVySW50ZXJuYWwoXG4gICAgdFZpZXc6IFRWaWV3LCBsVmlldzogTFZpZXc8e318bnVsbD4sIHJlbmRlcmVyOiBSZW5kZXJlciwgdE5vZGU6IFROb2RlLCBldmVudE5hbWU6IHN0cmluZyxcbiAgICBsaXN0ZW5lckZuOiAoZT86IGFueSkgPT4gYW55LCBldmVudFRhcmdldFJlc29sdmVyPzogR2xvYmFsVGFyZ2V0UmVzb2x2ZXIpOiB2b2lkIHtcbiAgY29uc3QgaXNUTm9kZURpcmVjdGl2ZUhvc3QgPSBpc0RpcmVjdGl2ZUhvc3QodE5vZGUpO1xuICBjb25zdCBmaXJzdENyZWF0ZVBhc3MgPSB0Vmlldy5maXJzdENyZWF0ZVBhc3M7XG4gIGNvbnN0IHRDbGVhbnVwOiBmYWxzZXxhbnlbXSA9IGZpcnN0Q3JlYXRlUGFzcyAmJiBnZXRPckNyZWF0ZVRWaWV3Q2xlYW51cCh0Vmlldyk7XG4gIGNvbnN0IGNvbnRleHQgPSBsVmlld1tDT05URVhUXTtcblxuICAvLyBXaGVuIHRoZSDJtcm1bGlzdGVuZXIgaW5zdHJ1Y3Rpb24gd2FzIGdlbmVyYXRlZCBhbmQgaXMgZXhlY3V0ZWQgd2Uga25vdyB0aGF0IHRoZXJlIGlzIGVpdGhlciBhXG4gIC8vIG5hdGl2ZSBsaXN0ZW5lciBvciBhIGRpcmVjdGl2ZSBvdXRwdXQgb24gdGhpcyBlbGVtZW50LiBBcyBzdWNoIHdlIHdlIGtub3cgdGhhdCB3ZSB3aWxsIGhhdmUgdG9cbiAgLy8gcmVnaXN0ZXIgYSBsaXN0ZW5lciBhbmQgc3RvcmUgaXRzIGNsZWFudXAgZnVuY3Rpb24gb24gTFZpZXcuXG4gIGNvbnN0IGxDbGVhbnVwID0gZ2V0T3JDcmVhdGVMVmlld0NsZWFudXAobFZpZXcpO1xuXG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRUTm9kZVR5cGUodE5vZGUsIFROb2RlVHlwZS5BbnlSTm9kZSB8IFROb2RlVHlwZS5BbnlDb250YWluZXIpO1xuXG4gIGxldCBwcm9jZXNzT3V0cHV0cyA9IHRydWU7XG5cbiAgLy8gQWRkaW5nIGEgbmF0aXZlIGV2ZW50IGxpc3RlbmVyIGlzIGFwcGxpY2FibGUgd2hlbjpcbiAgLy8gLSBUaGUgY29ycmVzcG9uZGluZyBUTm9kZSByZXByZXNlbnRzIGEgRE9NIGVsZW1lbnQuXG4gIC8vIC0gVGhlIGV2ZW50IHRhcmdldCBoYXMgYSByZXNvbHZlciAodXN1YWxseSByZXN1bHRpbmcgaW4gYSBnbG9iYWwgb2JqZWN0LFxuICAvLyAgIHN1Y2ggYXMgYHdpbmRvd2Agb3IgYGRvY3VtZW50YCkuXG4gIGlmICgodE5vZGUudHlwZSAmIFROb2RlVHlwZS5BbnlSTm9kZSkgfHwgZXZlbnRUYXJnZXRSZXNvbHZlcikge1xuICAgIGNvbnN0IG5hdGl2ZSA9IGdldE5hdGl2ZUJ5VE5vZGUodE5vZGUsIGxWaWV3KSBhcyBSRWxlbWVudDtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudFRhcmdldFJlc29sdmVyID8gZXZlbnRUYXJnZXRSZXNvbHZlcihuYXRpdmUpIDogbmF0aXZlO1xuICAgIGNvbnN0IGxDbGVhbnVwSW5kZXggPSBsQ2xlYW51cC5sZW5ndGg7XG4gICAgY29uc3QgaWR4T3JUYXJnZXRHZXR0ZXIgPSBldmVudFRhcmdldFJlc29sdmVyID9cbiAgICAgICAgKF9sVmlldzogTFZpZXcpID0+IGV2ZW50VGFyZ2V0UmVzb2x2ZXIodW53cmFwUk5vZGUoX2xWaWV3W3ROb2RlLmluZGV4XSkpIDpcbiAgICAgICAgdE5vZGUuaW5kZXg7XG5cbiAgICAvLyBJbiBvcmRlciB0byBtYXRjaCBjdXJyZW50IGJlaGF2aW9yLCBuYXRpdmUgRE9NIGV2ZW50IGxpc3RlbmVycyBtdXN0IGJlIGFkZGVkIGZvciBhbGxcbiAgICAvLyBldmVudHMgKGluY2x1ZGluZyBvdXRwdXRzKS5cblxuICAgIC8vIFRoZXJlIG1pZ2h0IGJlIGNhc2VzIHdoZXJlIG11bHRpcGxlIGRpcmVjdGl2ZXMgb24gdGhlIHNhbWUgZWxlbWVudCB0cnkgdG8gcmVnaXN0ZXIgYW4gZXZlbnRcbiAgICAvLyBoYW5kbGVyIGZ1bmN0aW9uIGZvciB0aGUgc2FtZSBldmVudC4gSW4gdGhpcyBzaXR1YXRpb24gd2Ugd2FudCB0byBhdm9pZCByZWdpc3RyYXRpb24gb2ZcbiAgICAvLyBzZXZlcmFsIG5hdGl2ZSBsaXN0ZW5lcnMgYXMgZWFjaCByZWdpc3RyYXRpb24gd291bGQgYmUgaW50ZXJjZXB0ZWQgYnkgTmdab25lIGFuZFxuICAgIC8vIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbi4gVGhpcyB3b3VsZCBtZWFuIHRoYXQgYSBzaW5nbGUgdXNlciBhY3Rpb24gd291bGQgcmVzdWx0IGluIHNldmVyYWxcbiAgICAvLyBjaGFuZ2UgZGV0ZWN0aW9ucyBiZWluZyBpbnZva2VkLiBUbyBhdm9pZCB0aGlzIHNpdHVhdGlvbiB3ZSB3YW50IHRvIGhhdmUgb25seSBvbmUgY2FsbCB0b1xuICAgIC8vIG5hdGl2ZSBoYW5kbGVyIHJlZ2lzdHJhdGlvbiAoZm9yIHRoZSBzYW1lIGVsZW1lbnQgYW5kIHNhbWUgdHlwZSBvZiBldmVudCkuXG4gICAgLy9cbiAgICAvLyBJbiBvcmRlciB0byBoYXZlIGp1c3Qgb25lIG5hdGl2ZSBldmVudCBoYW5kbGVyIGluIHByZXNlbmNlIG9mIG11bHRpcGxlIGhhbmRsZXIgZnVuY3Rpb25zLFxuICAgIC8vIHdlIGp1c3QgcmVnaXN0ZXIgYSBmaXJzdCBoYW5kbGVyIGZ1bmN0aW9uIGFzIGEgbmF0aXZlIGV2ZW50IGxpc3RlbmVyIGFuZCB0aGVuIGNoYWluXG4gICAgLy8gKGNvYWxlc2NlKSBvdGhlciBoYW5kbGVyIGZ1bmN0aW9ucyBvbiB0b3Agb2YgdGhlIGZpcnN0IG5hdGl2ZSBoYW5kbGVyIGZ1bmN0aW9uLlxuICAgIGxldCBleGlzdGluZ0xpc3RlbmVyID0gbnVsbDtcbiAgICAvLyBQbGVhc2Ugbm90ZSB0aGF0IHRoZSBjb2FsZXNjaW5nIGRlc2NyaWJlZCBoZXJlIGRvZXNuJ3QgaGFwcGVuIGZvciBldmVudHMgc3BlY2lmeWluZyBhblxuICAgIC8vIGFsdGVybmF0aXZlIHRhcmdldCAoZXguIChkb2N1bWVudDpjbGljaykpIC0gdGhpcyBpcyB0byBrZWVwIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCB0aGVcbiAgICAvLyB2aWV3IGVuZ2luZS5cbiAgICAvLyBBbHNvLCB3ZSBkb24ndCBoYXZlIHRvIHNlYXJjaCBmb3IgZXhpc3RpbmcgbGlzdGVuZXJzIGlzIHRoZXJlIGFyZSBubyBkaXJlY3RpdmVzXG4gICAgLy8gbWF0Y2hpbmcgb24gYSBnaXZlbiBub2RlIGFzIHdlIGNhbid0IHJlZ2lzdGVyIG11bHRpcGxlIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgc2FtZSBldmVudCBpblxuICAgIC8vIGEgdGVtcGxhdGUgKHRoaXMgd291bGQgbWVhbiBoYXZpbmcgZHVwbGljYXRlIGF0dHJpYnV0ZXMpLlxuICAgIGlmICghZXZlbnRUYXJnZXRSZXNvbHZlciAmJiBpc1ROb2RlRGlyZWN0aXZlSG9zdCkge1xuICAgICAgZXhpc3RpbmdMaXN0ZW5lciA9IGZpbmRFeGlzdGluZ0xpc3RlbmVyKHRWaWV3LCBsVmlldywgZXZlbnROYW1lLCB0Tm9kZS5pbmRleCk7XG4gICAgfVxuICAgIGlmIChleGlzdGluZ0xpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgICAvLyBBdHRhY2ggYSBuZXcgbGlzdGVuZXIgdG8gY29hbGVzY2VkIGxpc3RlbmVycyBsaXN0LCBtYWludGFpbmluZyB0aGUgb3JkZXIgaW4gd2hpY2hcbiAgICAgIC8vIGxpc3RlbmVycyBhcmUgcmVnaXN0ZXJlZC4gRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHdlIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIGxhc3RcbiAgICAgIC8vIGxpc3RlbmVyIGluIHRoYXQgbGlzdCAoaW4gYF9fbmdMYXN0TGlzdGVuZXJGbl9fYCBmaWVsZCksIHNvIHdlIGNhbiBhdm9pZCBnb2luZyB0aHJvdWdoXG4gICAgICAvLyB0aGUgZW50aXJlIHNldCBlYWNoIHRpbWUgd2UgbmVlZCB0byBhZGQgYSBuZXcgbGlzdGVuZXIuXG4gICAgICBjb25zdCBsYXN0TGlzdGVuZXJGbiA9ICg8YW55PmV4aXN0aW5nTGlzdGVuZXIpLl9fbmdMYXN0TGlzdGVuZXJGbl9fIHx8IGV4aXN0aW5nTGlzdGVuZXI7XG4gICAgICBsYXN0TGlzdGVuZXJGbi5fX25nTmV4dExpc3RlbmVyRm5fXyA9IGxpc3RlbmVyRm47XG4gICAgICAoPGFueT5leGlzdGluZ0xpc3RlbmVyKS5fX25nTGFzdExpc3RlbmVyRm5fXyA9IGxpc3RlbmVyRm47XG4gICAgICBwcm9jZXNzT3V0cHV0cyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0ZW5lckZuID0gd3JhcExpc3RlbmVyKHROb2RlLCBsVmlldywgY29udGV4dCwgbGlzdGVuZXJGbiwgZmFsc2UgLyoqIHByZXZlbnREZWZhdWx0ICovKTtcbiAgICAgIGNvbnN0IGNsZWFudXBGbiA9IHJlbmRlcmVyLmxpc3Rlbih0YXJnZXQgYXMgUkVsZW1lbnQsIGV2ZW50TmFtZSwgbGlzdGVuZXJGbik7XG4gICAgICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyQWRkRXZlbnRMaXN0ZW5lcisrO1xuXG4gICAgICBsQ2xlYW51cC5wdXNoKGxpc3RlbmVyRm4sIGNsZWFudXBGbik7XG4gICAgICB0Q2xlYW51cCAmJiB0Q2xlYW51cC5wdXNoKGV2ZW50TmFtZSwgaWR4T3JUYXJnZXRHZXR0ZXIsIGxDbGVhbnVwSW5kZXgsIGxDbGVhbnVwSW5kZXggKyAxKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICAvLyBFdmVuIGlmIHRoZXJlIGlzIG5vIG5hdGl2ZSBsaXN0ZW5lciB0byBhZGQsIHdlIHN0aWxsIG5lZWQgdG8gd3JhcCB0aGUgbGlzdGVuZXIgc28gdGhhdCBPblB1c2hcbiAgICAvLyBhbmNlc3RvcnMgYXJlIG1hcmtlZCBkaXJ0eSB3aGVuIGFuIGV2ZW50IG9jY3Vycy5cbiAgICBsaXN0ZW5lckZuID0gd3JhcExpc3RlbmVyKHROb2RlLCBsVmlldywgY29udGV4dCwgbGlzdGVuZXJGbiwgZmFsc2UgLyoqIHByZXZlbnREZWZhdWx0ICovKTtcbiAgfVxuXG4gIC8vIHN1YnNjcmliZSB0byBkaXJlY3RpdmUgb3V0cHV0c1xuICBjb25zdCBvdXRwdXRzID0gdE5vZGUub3V0cHV0cztcbiAgbGV0IHByb3BzOiBQcm9wZXJ0eUFsaWFzVmFsdWV8dW5kZWZpbmVkO1xuICBpZiAocHJvY2Vzc091dHB1dHMgJiYgb3V0cHV0cyAhPT0gbnVsbCAmJiAocHJvcHMgPSBvdXRwdXRzW2V2ZW50TmFtZV0pKSB7XG4gICAgY29uc3QgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gICAgaWYgKHByb3BzTGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzTGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBwcm9wc1tpXSBhcyBudW1iZXI7XG4gICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRJbmRleEluUmFuZ2UobFZpZXcsIGluZGV4KTtcbiAgICAgICAgY29uc3QgbWluaWZpZWROYW1lID0gcHJvcHNbaSArIDFdO1xuICAgICAgICBjb25zdCBkaXJlY3RpdmVJbnN0YW5jZSA9IGxWaWV3W2luZGV4XTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gZGlyZWN0aXZlSW5zdGFuY2VbbWluaWZpZWROYW1lXTtcblxuICAgICAgICBpZiAobmdEZXZNb2RlICYmICFpc09ic2VydmFibGUob3V0cHV0KSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQE91dHB1dCAke21pbmlmaWVkTmFtZX0gbm90IGluaXRpYWxpemVkIGluICcke1xuICAgICAgICAgICAgICBkaXJlY3RpdmVJbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lfScuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBvdXRwdXQuc3Vic2NyaWJlKGxpc3RlbmVyRm4pO1xuICAgICAgICBjb25zdCBpZHggPSBsQ2xlYW51cC5sZW5ndGg7XG4gICAgICAgIGxDbGVhbnVwLnB1c2gobGlzdGVuZXJGbiwgc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgdENsZWFudXAgJiYgdENsZWFudXAucHVzaChldmVudE5hbWUsIHROb2RlLmluZGV4LCBpZHgsIC0oaWR4ICsgMSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBleGVjdXRlTGlzdGVuZXJXaXRoRXJyb3JIYW5kbGluZyhcbiAgICBsVmlldzogTFZpZXcsIGNvbnRleHQ6IHt9fG51bGwsIGxpc3RlbmVyRm46IChlPzogYW55KSA9PiBhbnksIGU6IGFueSk6IGJvb2xlYW4ge1xuICB0cnkge1xuICAgIHByb2ZpbGVyKFByb2ZpbGVyRXZlbnQuT3V0cHV0U3RhcnQsIGNvbnRleHQsIGxpc3RlbmVyRm4pO1xuICAgIC8vIE9ubHkgZXhwbGljaXRseSByZXR1cm5pbmcgZmFsc2UgZnJvbSBhIGxpc3RlbmVyIHNob3VsZCBwcmV2ZW50RGVmYXVsdFxuICAgIHJldHVybiBsaXN0ZW5lckZuKGUpICE9PSBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBoYW5kbGVFcnJvcihsVmlldywgZXJyb3IpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBwcm9maWxlcihQcm9maWxlckV2ZW50Lk91dHB1dEVuZCwgY29udGV4dCwgbGlzdGVuZXJGbik7XG4gIH1cbn1cblxuLyoqXG4gKiBXcmFwcyBhbiBldmVudCBsaXN0ZW5lciB3aXRoIGEgZnVuY3Rpb24gdGhhdCBtYXJrcyBhbmNlc3RvcnMgZGlydHkgYW5kIHByZXZlbnRzIGRlZmF1bHQgYmVoYXZpb3IsXG4gKiBpZiBhcHBsaWNhYmxlLlxuICpcbiAqIEBwYXJhbSB0Tm9kZSBUaGUgVE5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbGlzdGVuZXJcbiAqIEBwYXJhbSBsVmlldyBUaGUgTFZpZXcgdGhhdCBjb250YWlucyB0aGlzIGxpc3RlbmVyXG4gKiBAcGFyYW0gbGlzdGVuZXJGbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdG8gY2FsbFxuICogQHBhcmFtIHdyYXBXaXRoUHJldmVudERlZmF1bHQgV2hldGhlciBvciBub3QgdG8gcHJldmVudCBkZWZhdWx0IGJlaGF2aW9yXG4gKiAodGhlIHByb2NlZHVyYWwgcmVuZGVyZXIgZG9lcyB0aGlzIGFscmVhZHksIHNvIGluIHRob3NlIGNhc2VzLCB3ZSBzaG91bGQgc2tpcClcbiAqL1xuZnVuY3Rpb24gd3JhcExpc3RlbmVyKFxuICAgIHROb2RlOiBUTm9kZSwgbFZpZXc6IExWaWV3PHt9fG51bGw+LCBjb250ZXh0OiB7fXxudWxsLCBsaXN0ZW5lckZuOiAoZT86IGFueSkgPT4gYW55LFxuICAgIHdyYXBXaXRoUHJldmVudERlZmF1bHQ6IGJvb2xlYW4pOiBFdmVudExpc3RlbmVyIHtcbiAgLy8gTm90ZTogd2UgYXJlIHBlcmZvcm1pbmcgbW9zdCBvZiB0aGUgd29yayBpbiB0aGUgbGlzdGVuZXIgZnVuY3Rpb24gaXRzZWxmXG4gIC8vIHRvIG9wdGltaXplIGxpc3RlbmVyIHJlZ2lzdHJhdGlvbi5cbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lckluX21hcmtEaXJ0eUFuZFByZXZlbnREZWZhdWx0KGU6IGFueSkge1xuICAgIC8vIEl2eSB1c2VzIGBGdW5jdGlvbmAgYXMgYSBzcGVjaWFsIHRva2VuIHRoYXQgYWxsb3dzIHVzIHRvIHVud3JhcCB0aGUgZnVuY3Rpb25cbiAgICAvLyBzbyB0aGF0IGl0IGNhbiBiZSBpbnZva2VkIHByb2dyYW1tYXRpY2FsbHkgYnkgYERlYnVnTm9kZS50cmlnZ2VyRXZlbnRIYW5kbGVyYC5cbiAgICBpZiAoZSA9PT0gRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBsaXN0ZW5lckZuO1xuICAgIH1cblxuICAgIC8vIEluIG9yZGVyIHRvIGJlIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGggVmlldyBFbmdpbmUsIGV2ZW50cyBvbiBjb21wb25lbnQgaG9zdCBub2Rlc1xuICAgIC8vIG11c3QgYWxzbyBtYXJrIHRoZSBjb21wb25lbnQgdmlldyBpdHNlbGYgZGlydHkgKGkuZS4gdGhlIHZpZXcgdGhhdCBpdCBvd25zKS5cbiAgICBjb25zdCBzdGFydFZpZXcgPVxuICAgICAgICB0Tm9kZS5jb21wb25lbnRPZmZzZXQgPiAtMSA/IGdldENvbXBvbmVudExWaWV3QnlJbmRleCh0Tm9kZS5pbmRleCwgbFZpZXcpIDogbFZpZXc7XG4gICAgbWFya1ZpZXdEaXJ0eShzdGFydFZpZXcpO1xuXG4gICAgbGV0IHJlc3VsdCA9IGV4ZWN1dGVMaXN0ZW5lcldpdGhFcnJvckhhbmRsaW5nKGxWaWV3LCBjb250ZXh0LCBsaXN0ZW5lckZuLCBlKTtcbiAgICAvLyBBIGp1c3QtaW52b2tlZCBsaXN0ZW5lciBmdW5jdGlvbiBtaWdodCBoYXZlIGNvYWxlc2NlZCBsaXN0ZW5lcnMgc28gd2UgbmVlZCB0byBjaGVjayBmb3JcbiAgICAvLyB0aGVpciBwcmVzZW5jZSBhbmQgaW52b2tlIGFzIG5lZWRlZC5cbiAgICBsZXQgbmV4dExpc3RlbmVyRm4gPSAoPGFueT53cmFwTGlzdGVuZXJJbl9tYXJrRGlydHlBbmRQcmV2ZW50RGVmYXVsdCkuX19uZ05leHRMaXN0ZW5lckZuX187XG4gICAgd2hpbGUgKG5leHRMaXN0ZW5lckZuKSB7XG4gICAgICAvLyBXZSBzaG91bGQgcHJldmVudCBkZWZhdWx0IGlmIGFueSBvZiB0aGUgbGlzdGVuZXJzIGV4cGxpY2l0bHkgcmV0dXJuIGZhbHNlXG4gICAgICByZXN1bHQgPSBleGVjdXRlTGlzdGVuZXJXaXRoRXJyb3JIYW5kbGluZyhsVmlldywgY29udGV4dCwgbmV4dExpc3RlbmVyRm4sIGUpICYmIHJlc3VsdDtcbiAgICAgIG5leHRMaXN0ZW5lckZuID0gKDxhbnk+bmV4dExpc3RlbmVyRm4pLl9fbmdOZXh0TGlzdGVuZXJGbl9fO1xuICAgIH1cblxuICAgIGlmICh3cmFwV2l0aFByZXZlbnREZWZhdWx0ICYmIHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIE5lY2Vzc2FyeSBmb3IgbGVnYWN5IGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBwcmV2ZW50RGVmYXVsdCAoZS5nLiBJRSlcbiAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuIl19