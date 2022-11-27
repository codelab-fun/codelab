/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assembleBoundTextPlaceholders, getSeqNumberGenerator, updatePlaceholderMap, wrapI18nPlaceholder } from './util';
var TagType;
(function (TagType) {
    TagType[TagType["ELEMENT"] = 0] = "ELEMENT";
    TagType[TagType["TEMPLATE"] = 1] = "TEMPLATE";
})(TagType || (TagType = {}));
/**
 * Generates an object that is used as a shared state between parent and all child contexts.
 */
function setupRegistry() {
    return { getUniqueId: getSeqNumberGenerator(), icus: new Map() };
}
/**
 * I18nContext is a helper class which keeps track of all i18n-related aspects
 * (accumulates placeholders, bindings, etc) between i18nStart and i18nEnd instructions.
 *
 * When we enter a nested template, the top-level context is being passed down
 * to the nested component, which uses this context to generate a child instance
 * of I18nContext class (to handle nested template) and at the end, reconciles it back
 * with the parent context.
 *
 * @param index Instruction index of i18nStart, which initiates this context
 * @param ref Reference to a translation const that represents the content if thus context
 * @param level Nesting level defined for child contexts
 * @param templateIndex Instruction index of a template which this context belongs to
 * @param meta Meta information (id, meaning, description, etc) associated with this context
 */
export class I18nContext {
    constructor(index, ref, level = 0, templateIndex = null, meta, registry) {
        this.index = index;
        this.ref = ref;
        this.level = level;
        this.templateIndex = templateIndex;
        this.meta = meta;
        this.registry = registry;
        this.bindings = new Set();
        this.placeholders = new Map();
        this.isEmitted = false;
        this._unresolvedCtxCount = 0;
        this._registry = registry || setupRegistry();
        this.id = this._registry.getUniqueId();
    }
    appendTag(type, node, index, closed) {
        if (node.isVoid && closed) {
            return; // ignore "close" for void tags
        }
        const ph = node.isVoid || !closed ? node.startName : node.closeName;
        const content = { type, index, ctx: this.id, isVoid: node.isVoid, closed };
        updatePlaceholderMap(this.placeholders, ph, content);
    }
    get icus() {
        return this._registry.icus;
    }
    get isRoot() {
        return this.level === 0;
    }
    get isResolved() {
        return this._unresolvedCtxCount === 0;
    }
    getSerializedPlaceholders() {
        const result = new Map();
        this.placeholders.forEach((values, key) => result.set(key, values.map(serializePlaceholderValue)));
        return result;
    }
    // public API to accumulate i18n-related content
    appendBinding(binding) {
        this.bindings.add(binding);
    }
    appendIcu(name, ref) {
        updatePlaceholderMap(this._registry.icus, name, ref);
    }
    appendBoundText(node) {
        const phs = assembleBoundTextPlaceholders(node, this.bindings.size, this.id);
        phs.forEach((values, key) => updatePlaceholderMap(this.placeholders, key, ...values));
    }
    appendTemplate(node, index) {
        // add open and close tags at the same time,
        // since we process nested templates separately
        this.appendTag(TagType.TEMPLATE, node, index, false);
        this.appendTag(TagType.TEMPLATE, node, index, true);
        this._unresolvedCtxCount++;
    }
    appendElement(node, index, closed) {
        this.appendTag(TagType.ELEMENT, node, index, closed);
    }
    appendProjection(node, index) {
        // Add open and close tags at the same time, since `<ng-content>` has no content,
        // so when we come across `<ng-content>` we can register both open and close tags.
        // Note: runtime i18n logic doesn't distinguish `<ng-content>` tag placeholders and
        // regular element tag placeholders, so we generate element placeholders for both types.
        this.appendTag(TagType.ELEMENT, node, index, false);
        this.appendTag(TagType.ELEMENT, node, index, true);
    }
    /**
     * Generates an instance of a child context based on the root one,
     * when we enter a nested template within I18n section.
     *
     * @param index Instruction index of corresponding i18nStart, which initiates this context
     * @param templateIndex Instruction index of a template which this context belongs to
     * @param meta Meta information (id, meaning, description, etc) associated with this context
     *
     * @returns I18nContext instance
     */
    forkChildContext(index, templateIndex, meta) {
        return new I18nContext(index, this.ref, this.level + 1, templateIndex, meta, this._registry);
    }
    /**
     * Reconciles child context into parent one once the end of the i18n block is reached (i18nEnd).
     *
     * @param context Child I18nContext instance to be reconciled with parent context.
     */
    reconcileChildContext(context) {
        // set the right context id for open and close
        // template tags, so we can use it as sub-block ids
        ['start', 'close'].forEach((op) => {
            const key = context.meta[`${op}Name`];
            const phs = this.placeholders.get(key) || [];
            const tag = phs.find(findTemplateFn(this.id, context.templateIndex));
            if (tag) {
                tag.ctx = context.id;
            }
        });
        // reconcile placeholders
        const childPhs = context.placeholders;
        childPhs.forEach((values, key) => {
            const phs = this.placeholders.get(key);
            if (!phs) {
                this.placeholders.set(key, values);
                return;
            }
            // try to find matching template...
            const tmplIdx = phs.findIndex(findTemplateFn(context.id, context.templateIndex));
            if (tmplIdx >= 0) {
                // ... if found - replace it with nested template content
                const isCloseTag = key.startsWith('CLOSE');
                const isTemplateTag = key.endsWith('NG-TEMPLATE');
                if (isTemplateTag) {
                    // current template's content is placed before or after
                    // parent template tag, depending on the open/close attribute
                    phs.splice(tmplIdx + (isCloseTag ? 0 : 1), 0, ...values);
                }
                else {
                    const idx = isCloseTag ? values.length - 1 : 0;
                    values[idx].tmpl = phs[tmplIdx];
                    phs.splice(tmplIdx, 1, ...values);
                }
            }
            else {
                // ... otherwise just append content to placeholder value
                phs.push(...values);
            }
            this.placeholders.set(key, phs);
        });
        this._unresolvedCtxCount--;
    }
}
//
// Helper methods
//
function wrap(symbol, index, contextId, closed) {
    const state = closed ? '/' : '';
    return wrapI18nPlaceholder(`${state}${symbol}${index}`, contextId);
}
function wrapTag(symbol, { index, ctx, isVoid }, closed) {
    return isVoid ? wrap(symbol, index, ctx) + wrap(symbol, index, ctx, true) :
        wrap(symbol, index, ctx, closed);
}
function findTemplateFn(ctx, templateIndex) {
    return (token) => typeof token === 'object' && token.type === TagType.TEMPLATE &&
        token.index === templateIndex && token.ctx === ctx;
}
function serializePlaceholderValue(value) {
    const element = (data, closed) => wrapTag('#', data, closed);
    const template = (data, closed) => wrapTag('*', data, closed);
    const projection = (data, closed) => wrapTag('!', data, closed);
    switch (value.type) {
        case TagType.ELEMENT:
            // close element tag
            if (value.closed) {
                return element(value, true) + (value.tmpl ? template(value.tmpl, true) : '');
            }
            // open element tag that also initiates a template
            if (value.tmpl) {
                return template(value.tmpl) + element(value) +
                    (value.isVoid ? template(value.tmpl, true) : '');
            }
            return element(value);
        case TagType.TEMPLATE:
            return template(value, value.closed);
        default:
            return value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3ZpZXcvaTE4bi9jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQU1ILE9BQU8sRUFBQyw2QkFBNkIsRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUV2SCxJQUFLLE9BR0o7QUFIRCxXQUFLLE9BQU87SUFDViwyQ0FBTyxDQUFBO0lBQ1AsNkNBQVEsQ0FBQTtBQUNWLENBQUMsRUFISSxPQUFPLEtBQVAsT0FBTyxRQUdYO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGFBQWE7SUFDcEIsT0FBTyxFQUFDLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBaUIsRUFBQyxDQUFDO0FBQ2hGLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBU3RCLFlBQ2EsS0FBYSxFQUFXLEdBQWtCLEVBQVcsUUFBZ0IsQ0FBQyxFQUN0RSxnQkFBNkIsSUFBSSxFQUFXLElBQW1CLEVBQ2hFLFFBQWM7UUFGYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVcsUUFBRyxHQUFILEdBQUcsQ0FBZTtRQUFXLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDdEUsa0JBQWEsR0FBYixhQUFhLENBQW9CO1FBQVcsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUNoRSxhQUFRLEdBQVIsUUFBUSxDQUFNO1FBVm5CLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBTyxDQUFDO1FBQzFCLGlCQUFZLEdBQUcsSUFBSSxHQUFHLEVBQWlCLENBQUM7UUFDeEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUcxQix3QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFNdEMsSUFBSSxDQUFDLFNBQVMs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S0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsS0FBSyxPQUFPLENBQUMsUUFBUTtZQUNuQixPQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZDO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QVNUfSBmcm9tICcuLi8uLi8uLi9leHByZXNzaW9uX3BhcnNlci9hc3QnO1xuaW1wb3J0ICogYXMgaTE4biBmcm9tICcuLi8uLi8uLi9pMThuL2kxOG5fYXN0JztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vLi4vLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuXG5pbXBvcnQge2Fzc2VtYmxlQm91bmRUZXh0UGxhY2Vob2xkZXJzLCBnZXRTZXFOdW1iZXJHZW5lcmF0b3IsIHVwZGF0ZVBsYWNlaG9sZGVyTWFwLCB3cmFwSTE4blBsYWNlaG9sZGVyfSBmcm9tICcuL3V0aWwnO1xuXG5lbnVtIFRhZ1R5cGUge1xuICBFTEVNRU5ULFxuICBURU1QTEFURSxcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gb2JqZWN0IHRoYXQgaXMgdXNlZCBhcyBhIHNoYXJlZCBzdGF0ZSBiZXR3ZWVuIHBhcmVudCBhbmQgYWxsIGNoaWxkIGNvbnRleHRzLlxuICovXG5mdW5jdGlvbiBzZXR1cFJlZ2lzdHJ5KCkge1xuICByZXR1cm4ge2dldFVuaXF1ZUlkOiBnZXRTZXFOdW1iZXJHZW5lcmF0b3IoKSwgaWN1czogbmV3IE1hcDxzdHJpbmcsIGFueVtdPigpfTtcbn1cblxuLyoqXG4gKiBJMThuQ29udGV4dCBpcyBhIGhlbHBlciBjbGFzcyB3aGljaCBrZWVwcyB0cmFjayBvZiBhbGwgaTE4bi1yZWxhdGVkIGFzcGVjdHNcbiAqIChhY2N1bXVsYXRlcyBwbGFjZWhvbGRlcnMsIGJpbmRpbmdzLCBldGMpIGJldHdlZW4gaTE4blN0YXJ0IGFuZCBpMThuRW5kIGluc3RydWN0aW9ucy5cbiAqXG4gKiBXaGVuIHdlIGVudGVyIGEgbmVzdGVkIHRlbXBsYXRlLCB0aGUgdG9wLWxldmVsIGNvbnRleHQgaXMgYmVpbmcgcGFzc2VkIGRvd25cbiAqIHRvIHRoZSBuZXN0ZWQgY29tcG9uZW50LCB3aGljaCB1c2VzIHRoaXMgY29udGV4dCB0byBnZW5lcmF0ZSBhIGNoaWxkIGluc3RhbmNlXG4gKiBvZiBJMThuQ29udGV4dCBjbGFzcyAodG8gaGFuZGxlIG5lc3RlZCB0ZW1wbGF0ZSkgYW5kIGF0IHRoZSBlbmQsIHJlY29uY2lsZXMgaXQgYmFja1xuICogd2l0aCB0aGUgcGFyZW50IGNvbnRleHQuXG4gKlxuICogQHBhcmFtIGluZGV4IEluc3RydWN0aW9uIGluZGV4IG9mIGkxOG5TdGFydCwgd2hpY2ggaW5pdGlhdGVzIHRoaXMgY29udGV4dFxuICogQHBhcmFtIHJlZiBSZWZlcmVuY2UgdG8gYSB0cmFuc2xhdGlvbiBjb25zdCB0aGF0IHJlcHJlc2VudHMgdGhlIGNvbnRlbnQgaWYgdGh1cyBjb250ZXh0XG4gKiBAcGFyYW0gbGV2ZWwgTmVzdGluZyBsZXZlbCBkZWZpbmVkIGZvciBjaGlsZCBjb250ZXh0c1xuICogQHBhcmFtIHRlbXBsYXRlSW5kZXggSW5zdHJ1Y3Rpb24gaW5kZXggb2YgYSB0ZW1wbGF0ZSB3aGljaCB0aGlzIGNvbnRleHQgYmVsb25ncyB0b1xuICogQHBhcmFtIG1ldGEgTWV0YSBpbmZvcm1hdGlvbiAoaWQsIG1lYW5pbmcsIGRlc2NyaXB0aW9uLCBldGMpIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNvbnRleHRcbiAqL1xuZXhwb3J0IGNsYXNzIEkxOG5Db250ZXh0IHtcbiAgcHVibGljIHJlYWRvbmx5IGlkOiBudW1iZXI7XG4gIHB1YmxpYyBiaW5kaW5ncyA9IG5ldyBTZXQ8QVNUPigpO1xuICBwdWJsaWMgcGxhY2Vob2xkZXJzID0gbmV3IE1hcDxzdHJpbmcsIGFueVtdPigpO1xuICBwdWJsaWMgaXNFbWl0dGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfcmVnaXN0cnkhOiBhbnk7XG4gIHByaXZhdGUgX3VucmVzb2x2ZWRDdHhDb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlYWRvbmx5IGluZGV4OiBudW1iZXIsIHJlYWRvbmx5IHJlZjogby5SZWFkVmFyRXhwciwgcmVhZG9ubHkgbGV2ZWw6IG51bWJlciA9IDAsXG4gICAgICByZWFkb25seSB0ZW1wbGF0ZUluZGV4OiBudW1iZXJ8bnVsbCA9IG51bGwsIHJlYWRvbmx5IG1ldGE6IGkxOG4uSTE4bk1ldGEsXG4gICAgICBwcml2YXRlIHJlZ2lzdHJ5PzogYW55KSB7XG4gICAgdGhpcy5fcmVnaXN0cnkgPSByZWdpc3RyeSB8fCBzZXR1cFJlZ2lzdHJ5KCk7XG4gICAgdGhpcy5pZCA9IHRoaXMuX3JlZ2lzdHJ5LmdldFVuaXF1ZUlkKCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZFRhZyh0eXBlOiBUYWdUeXBlLCBub2RlOiBpMThuLlRhZ1BsYWNlaG9sZGVyLCBpbmRleDogbnVtYmVyLCBjbG9zZWQ/OiBib29sZWFuKSB7XG4gICAgaWYgKG5vZGUuaXNWb2lkICYmIGNsb3NlZCkge1xuICAgICAgcmV0dXJuOyAgLy8gaWdub3JlIFwiY2xvc2VcIiBmb3Igdm9pZCB0YWdzXG4gICAgfVxuICAgIGNvbnN0IHBoID0gbm9kZS5pc1ZvaWQgfHwgIWNsb3NlZCA/IG5vZGUuc3RhcnROYW1lIDogbm9kZS5jbG9zZU5hbWU7XG4gICAgY29uc3QgY29udGVudCA9IHt0eXBlLCBpbmRleCwgY3R4OiB0aGlzLmlkLCBpc1ZvaWQ6IG5vZGUuaXNWb2lkLCBjbG9zZWR9O1xuICAgIHVwZGF0ZVBsYWNlaG9sZGVyTWFwKHRoaXMucGxhY2Vob2xkZXJzLCBwaCwgY29udGVudCk7XG4gIH1cblxuICBnZXQgaWN1cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnkuaWN1cztcbiAgfVxuICBnZXQgaXNSb290KCkge1xuICAgIHJldHVybiB0aGlzLmxldmVsID09PSAwO1xuICB9XG4gIGdldCBpc1Jlc29sdmVkKCkge1xuICAgIHJldHVybiB0aGlzLl91bnJlc29sdmVkQ3R4Q291bnQgPT09IDA7XG4gIH1cblxuICBnZXRTZXJpYWxpemVkUGxhY2Vob2xkZXJzKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBhbnlbXT4oKTtcbiAgICB0aGlzLnBsYWNlaG9sZGVycy5mb3JFYWNoKFxuICAgICAgICAodmFsdWVzLCBrZXkpID0+IHJlc3VsdC5zZXQoa2V5LCB2YWx1ZXMubWFwKHNlcmlhbGl6ZVBsYWNlaG9sZGVyVmFsdWUpKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIHB1YmxpYyBBUEkgdG8gYWNjdW11bGF0ZSBpMThuLXJlbGF0ZWQgY29udGVudFxuICBhcHBlbmRCaW5kaW5nKGJpbmRpbmc6IEFTVCkge1xuICAgIHRoaXMuYmluZGluZ3MuYWRkKGJpbmRpbmcpO1xuICB9XG4gIGFwcGVuZEljdShuYW1lOiBzdHJpbmcsIHJlZjogby5FeHByZXNzaW9uKSB7XG4gICAgdXBkYXRlUGxhY2Vob2xkZXJNYXAodGhpcy5fcmVnaXN0cnkuaWN1cywgbmFtZSwgcmVmKTtcbiAgfVxuICBhcHBlbmRCb3VuZFRleHQobm9kZTogaTE4bi5JMThuTWV0YSkge1xuICAgIGNvbnN0IHBocyA9IGFzc2VtYmxlQm91bmRUZXh0UGxhY2Vob2xkZXJzKG5vZGUsIHRoaXMuYmluZGluZ3Muc2l6ZSwgdGhpcy5pZCk7XG4gICAgcGhzLmZvckVhY2goKHZhbHVlcywga2V5KSA9PiB1cGRhdGVQbGFjZWhvbGRlck1hcCh0aGlzLnBsYWNlaG9sZGVycywga2V5LCAuLi52YWx1ZXMpKTtcbiAgfVxuICBhcHBlbmRUZW1wbGF0ZShub2RlOiBpMThuLkkxOG5NZXRhLCBpbmRleDogbnVtYmVyKSB7XG4gICAgLy8gYWRkIG9wZW4gYW5kIGNsb3NlIHRhZ3MgYXQgdGhlIHNhbWUgdGltZSxcbiAgICAvLyBzaW5jZSB3ZSBwcm9jZXNzIG5lc3RlZCB0ZW1wbGF0ZXMgc2VwYXJhdGVseVxuICAgIHRoaXMuYXBwZW5kVGFnKFRhZ1R5cGUuVEVNUExBVEUsIG5vZGUgYXMgaTE4bi5UYWdQbGFjZWhvbGRlciwgaW5kZXgsIGZhbHNlKTtcbiAgICB0aGlzLmFwcGVuZFRhZyhUYWdUeXBlLlRFTVBMQVRFLCBub2RlIGFzIGkxOG4uVGFnUGxhY2Vob2xkZXIsIGluZGV4LCB0cnVlKTtcbiAgICB0aGlzLl91bnJlc29sdmVkQ3R4Q291bnQrKztcbiAgfVxuICBhcHBlbmRFbGVtZW50KG5vZGU6IGkxOG4uSTE4bk1ldGEsIGluZGV4OiBudW1iZXIsIGNsb3NlZD86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFwcGVuZFRhZyhUYWdUeXBlLkVMRU1FTlQsIG5vZGUgYXMgaTE4bi5UYWdQbGFjZWhvbGRlciwgaW5kZXgsIGNsb3NlZCk7XG4gIH1cbiAgYXBwZW5kUHJvamVjdGlvbihub2RlOiBpMThuLkkxOG5NZXRhLCBpbmRleDogbnVtYmVyKSB7XG4gICAgLy8gQWRkIG9wZW4gYW5kIGNsb3NlIHRhZ3MgYXQgdGhlIHNhbWUgdGltZSwgc2luY2UgYDxuZy1jb250ZW50PmAgaGFzIG5vIGNvbnRlbnQsXG4gICAgLy8gc28gd2hlbiB3ZSBjb21lIGFjcm9zcyBgPG5nLWNvbnRlbnQ+YCB3ZSBjYW4gcmVnaXN0ZXIgYm90aCBvcGVuIGFuZCBjbG9zZSB0YWdzLlxuICAgIC8vIE5vdGU6IHJ1bnRpbWUgaTE4biBsb2dpYyBkb2Vzbid0IGRpc3Rpbmd1aXNoIGA8bmctY29udGVudD5gIHRhZyBwbGFjZWhvbGRlcnMgYW5kXG4gICAgLy8gcmVndWxhciBlbGVtZW50IHRhZyBwbGFjZWhvbGRlcnMsIHNvIHdlIGdlbmVyYXRlIGVsZW1lbnQgcGxhY2Vob2xkZXJzIGZvciBib3RoIHR5cGVzLlxuICAgIHRoaXMuYXBwZW5kVGFnKFRhZ1R5cGUuRUxFTUVOVCwgbm9kZSBhcyBpMThuLlRhZ1BsYWNlaG9sZGVyLCBpbmRleCwgZmFsc2UpO1xuICAgIHRoaXMuYXBwZW5kVGFnKFRhZ1R5cGUuRUxFTUVOVCwgbm9kZSBhcyBpMThuLlRhZ1BsYWNlaG9sZGVyLCBpbmRleCwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGluc3RhbmNlIG9mIGEgY2hpbGQgY29udGV4dCBiYXNlZCBvbiB0aGUgcm9vdCBvbmUsXG4gICAqIHdoZW4gd2UgZW50ZXIgYSBuZXN0ZWQgdGVtcGxhdGUgd2l0aGluIEkxOG4gc2VjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIGluZGV4IEluc3RydWN0aW9uIGluZGV4IG9mIGNvcnJlc3BvbmRpbmcgaTE4blN0YXJ0LCB3aGljaCBpbml0aWF0ZXMgdGhpcyBjb250ZXh0XG4gICAqIEBwYXJhbSB0ZW1wbGF0ZUluZGV4IEluc3RydWN0aW9uIGluZGV4IG9mIGEgdGVtcGxhdGUgd2hpY2ggdGhpcyBjb250ZXh0IGJlbG9uZ3MgdG9cbiAgICogQHBhcmFtIG1ldGEgTWV0YSBpbmZvcm1hdGlvbiAoaWQsIG1lYW5pbmcsIGRlc2NyaXB0aW9uLCBldGMpIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNvbnRleHRcbiAgICpcbiAgICogQHJldHVybnMgSTE4bkNvbnRleHQgaW5zdGFuY2VcbiAgICovXG4gIGZvcmtDaGlsZENvbnRleHQoaW5kZXg6IG51bWJlciwgdGVtcGxhdGVJbmRleDogbnVtYmVyLCBtZXRhOiBpMThuLkkxOG5NZXRhKSB7XG4gICAgcmV0dXJuIG5ldyBJMThuQ29udGV4dChpbmRleCwgdGhpcy5yZWYsIHRoaXMubGV2ZWwgKyAxLCB0ZW1wbGF0ZUluZGV4LCBtZXRhLCB0aGlzLl9yZWdpc3RyeSk7XG4gIH1cblxuICAvKipcbiAgICogUmVjb25jaWxlcyBjaGlsZCBjb250ZXh0IGludG8gcGFyZW50IG9uZSBvbmNlIHRoZSBlbmQgb2YgdGhlIGkxOG4gYmxvY2sgaXMgcmVhY2hlZCAoaTE4bkVuZCkuXG4gICAqXG4gICAqIEBwYXJhbSBjb250ZXh0IENoaWxkIEkxOG5Db250ZXh0IGluc3RhbmNlIHRvIGJlIHJlY29uY2lsZWQgd2l0aCBwYXJlbnQgY29udGV4dC5cbiAgICovXG4gIHJlY29uY2lsZUNoaWxkQ29udGV4dChjb250ZXh0OiBJMThuQ29udGV4dCkge1xuICAgIC8vIHNldCB0aGUgcmlnaHQgY29udGV4dCBpZCBmb3Igb3BlbiBhbmQgY2xvc2VcbiAgICAvLyB0ZW1wbGF0ZSB0YWdzLCBzbyB3ZSBjYW4gdXNlIGl0IGFzIHN1Yi1ibG9jayBpZHNcbiAgICBbJ3N0YXJ0JywgJ2Nsb3NlJ10uZm9yRWFjaCgob3A6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gKGNvbnRleHQubWV0YSBhcyBhbnkpW2Ake29wfU5hbWVgXTtcbiAgICAgIGNvbnN0IHBocyA9IHRoaXMucGxhY2Vob2xkZXJzLmdldChrZXkpIHx8IFtdO1xuICAgICAgY29uc3QgdGFnID0gcGhzLmZpbmQoZmluZFRlbXBsYXRlRm4odGhpcy5pZCwgY29udGV4dC50ZW1wbGF0ZUluZGV4KSk7XG4gICAgICBpZiAodGFnKSB7XG4gICAgICAgIHRhZy5jdHggPSBjb250ZXh0LmlkO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gcmVjb25jaWxlIHBsYWNlaG9sZGVyc1xuICAgIGNvbnN0IGNoaWxkUGhzID0gY29udGV4dC5wbGFjZWhvbGRlcnM7XG4gICAgY2hpbGRQaHMuZm9yRWFjaCgodmFsdWVzOiBhbnlbXSwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHBocyA9IHRoaXMucGxhY2Vob2xkZXJzLmdldChrZXkpO1xuICAgICAgaWYgKCFwaHMpIHtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlcnMuc2V0KGtleSwgdmFsdWVzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gdHJ5IHRvIGZpbmQgbWF0Y2hpbmcgdGVtcGxhdGUuLi5cbiAgICAgIGNvbnN0IHRtcGxJZHggPSBwaHMuZmluZEluZGV4KGZpbmRUZW1wbGF0ZUZuKGNvbnRleHQuaWQsIGNvbnRleHQudGVtcGxhdGVJbmRleCkpO1xuICAgICAgaWYgKHRtcGxJZHggPj0gMCkge1xuICAgICAgICAvLyAuLi4gaWYgZm91bmQgLSByZXBsYWNlIGl0IHdpdGggbmVzdGVkIHRlbXBsYXRlIGNvbnRlbnRcbiAgICAgICAgY29uc3QgaXNDbG9zZVRhZyA9IGtleS5zdGFydHNXaXRoKCdDTE9TRScpO1xuICAgICAgICBjb25zdCBpc1RlbXBsYXRlVGFnID0ga2V5LmVuZHNXaXRoKCdORy1URU1QTEFURScpO1xuICAgICAgICBpZiAoaXNUZW1wbGF0ZVRhZykge1xuICAgICAgICAgIC8vIGN1cnJlbnQgdGVtcGxhdGUncyBjb250ZW50IGlzIHBsYWNlZCBiZWZvcmUgb3IgYWZ0ZXJcbiAgICAgICAgICAvLyBwYXJlbnQgdGVtcGxhdGUgdGFnLCBkZXBlbmRpbmcgb24gdGhlIG9wZW4vY2xvc2UgYXR0cmlidXRlXG4gICAgICAgICAgcGhzLnNwbGljZSh0bXBsSWR4ICsgKGlzQ2xvc2VUYWcgPyAwIDogMSksIDAsIC4uLnZhbHVlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaWR4ID0gaXNDbG9zZVRhZyA/IHZhbHVlcy5sZW5ndGggLSAxIDogMDtcbiAgICAgICAgICB2YWx1ZXNbaWR4XS50bXBsID0gcGhzW3RtcGxJZHhdO1xuICAgICAgICAgIHBocy5zcGxpY2UodG1wbElkeCwgMSwgLi4udmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gLi4uIG90aGVyd2lzZSBqdXN0IGFwcGVuZCBjb250ZW50IHRvIHBsYWNlaG9sZGVyIHZhbHVlXG4gICAgICAgIHBocy5wdXNoKC4uLnZhbHVlcyk7XG4gICAgICB9XG4gICAgICB0aGlzLnBsYWNlaG9sZGVycy5zZXQoa2V5LCBwaHMpO1xuICAgIH0pO1xuICAgIHRoaXMuX3VucmVzb2x2ZWRDdHhDb3VudC0tO1xuICB9XG59XG5cbi8vXG4vLyBIZWxwZXIgbWV0aG9kc1xuLy9cblxuZnVuY3Rpb24gd3JhcChzeW1ib2w6IHN0cmluZywgaW5kZXg6IG51bWJlciwgY29udGV4dElkOiBudW1iZXIsIGNsb3NlZD86IGJvb2xlYW4pOiBzdHJpbmcge1xuICBjb25zdCBzdGF0ZSA9IGNsb3NlZCA/ICcvJyA6ICcnO1xuICByZXR1cm4gd3JhcEkxOG5QbGFjZWhvbGRlcihgJHtzdGF0ZX0ke3N5bWJvbH0ke2luZGV4fWAsIGNvbnRleHRJZCk7XG59XG5cbmZ1bmN0aW9uIHdyYXBUYWcoc3ltYm9sOiBzdHJpbmcsIHtpbmRleCwgY3R4LCBpc1ZvaWR9OiBhbnksIGNsb3NlZD86IGJvb2xlYW4pOiBzdHJpbmcge1xuICByZXR1cm4gaXNWb2lkID8gd3JhcChzeW1ib2wsIGluZGV4LCBjdHgpICsgd3JhcChzeW1ib2wsIGluZGV4LCBjdHgsIHRydWUpIDpcbiAgICAgICAgICAgICAgICAgIHdyYXAoc3ltYm9sLCBpbmRleCwgY3R4LCBjbG9zZWQpO1xufVxuXG5mdW5jdGlvbiBmaW5kVGVtcGxhdGVGbihjdHg6IG51bWJlciwgdGVtcGxhdGVJbmRleDogbnVtYmVyfG51bGwpIHtcbiAgcmV0dXJuICh0b2tlbjogYW55KSA9PiB0eXBlb2YgdG9rZW4gPT09ICdvYmplY3QnICYmIHRva2VuLnR5cGUgPT09IFRhZ1R5cGUuVEVNUExBVEUgJiZcbiAgICAgIHRva2VuLmluZGV4ID09PSB0ZW1wbGF0ZUluZGV4ICYmIHRva2VuLmN0eCA9PT0gY3R4O1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVQbGFjZWhvbGRlclZhbHVlKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBlbGVtZW50ID0gKGRhdGE6IGFueSwgY2xvc2VkPzogYm9vbGVhbikgPT4gd3JhcFRhZygnIycsIGRhdGEsIGNsb3NlZCk7XG4gIGNvbnN0IHRlbXBsYXRlID0gKGRhdGE6IGFueSwgY2xvc2VkPzogYm9vbGVhbikgPT4gd3JhcFRhZygnKicsIGRhdGEsIGNsb3NlZCk7XG4gIGNvbnN0IHByb2plY3Rpb24gPSAoZGF0YTogYW55LCBjbG9zZWQ/OiBib29sZWFuKSA9PiB3cmFwVGFnKCchJywgZGF0YSwgY2xvc2VkKTtcblxuICBzd2l0Y2ggKHZhbHVlLnR5cGUpIHtcbiAgICBjYXNlIFRhZ1R5cGUuRUxFTUVOVDpcbiAgICAgIC8vIGNsb3NlIGVsZW1lbnQgdGFnXG4gICAgICBpZiAodmFsdWUuY2xvc2VkKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50KHZhbHVlLCB0cnVlKSArICh2YWx1ZS50bXBsID8gdGVtcGxhdGUodmFsdWUudG1wbCwgdHJ1ZSkgOiAnJyk7XG4gICAgICB9XG4gICAgICAvLyBvcGVuIGVsZW1lbnQgdGFnIHRoYXQgYWxzbyBpbml0aWF0ZXMgYSB0ZW1wbGF0ZVxuICAgICAgaWYgKHZhbHVlLnRtcGwpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlKHZhbHVlLnRtcGwpICsgZWxlbWVudCh2YWx1ZSkgK1xuICAgICAgICAgICAgKHZhbHVlLmlzVm9pZCA/IHRlbXBsYXRlKHZhbHVlLnRtcGwsIHRydWUpIDogJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW1lbnQodmFsdWUpO1xuXG4gICAgY2FzZSBUYWdUeXBlLlRFTVBMQVRFOlxuICAgICAgcmV0dXJuIHRlbXBsYXRlKHZhbHVlLCB2YWx1ZS5jbG9zZWQpO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIl19