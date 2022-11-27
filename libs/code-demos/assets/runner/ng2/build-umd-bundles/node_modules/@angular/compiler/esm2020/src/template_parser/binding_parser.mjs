/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SecurityContext } from '../core';
import { AbsoluteSourceSpan, BoundElementProperty, EmptyExpr, ParsedEvent, ParsedProperty, ParsedPropertyType, ParsedVariable, RecursiveAstVisitor, VariableBinding } from '../expression_parser/ast';
import { mergeNsAndName } from '../ml_parser/tags';
import { ParseError, ParseErrorLevel, ParseSourceSpan } from '../parse_util';
import { CssSelector } from '../selector';
import { splitAtColon, splitAtPeriod } from '../util';
const PROPERTY_PARTS_SEPARATOR = '.';
const ATTRIBUTE_PREFIX = 'attr';
const CLASS_PREFIX = 'class';
const STYLE_PREFIX = 'style';
const TEMPLATE_ATTR_PREFIX = '*';
const ANIMATE_PROP_PREFIX = 'animate-';
/**
 * Parses bindings in templates and in the directive host area.
 */
export class BindingParser {
    constructor(_exprParser, _interpolationConfig, _schemaRegistry, errors) {
        this._exprParser = _exprParser;
        this._interpolationConfig = _interpolationConfig;
        this._schemaRegistry = _schemaRegistry;
        this.errors = errors;
    }
    get interpolationConfig() {
        return this._interpolationConfig;
    }
    createBoundHostProperties(properties, sourceSpan) {
        const boundProps = [];
        for (const propName of Object.keys(properties)) {
            const expression = properties[propName];
            if (typeof expression === 'string') {
                this.parsePropertyBinding(propName, expression, true, sourceSpan, sourceSpan.start.offset, undefined, [], 
                // Use the `sourceSpan` for  `keySpan`. This isn't really accurate, but neither is the
                // sourceSpan, as it represents the sourceSpan of the host itself rather than the
                // source of the host binding (which doesn't exist in the template). Regardless,
                // neither of these values are used in Ivy but are only here to satisfy the function
                // signature. This should likely be refactored in the future so that `sourceSpan`
                // isn't being used inaccurately.
                boundProps, sourceSpan);
            }
            else {
                this._reportError(`Value of the host property binding "${propName}" needs to be a string representing an expression but got "${expression}" (${typeof expression})`, sourceSpan);
            }
        }
        return boundProps;
    }
    createDirectiveHostEventAsts(hostListeners, sourceSpan) {
        const targetEvents = [];
        for (const propName of Object.keys(hostListeners)) {
            const expression = hostListeners[propName];
            if (typeof expression === 'string') {
                // Use the `sourceSpan` for  `keySpan` and `handlerSpan`. This isn't really accurate, but
                // neither is the `sourceSpan`, as it represents the `sourceSpan` of the host itself
                // rather than the source of the host binding (which doesn't exist in the template).
                // Regardless, neither of these values are used in Ivy but are only here to satisfy the
                // function signature. This should likely be refactored in the future so that `sourceSpan`
                // isn't being used inaccurately.
                this.parseEvent(propName, expression, /* isAssignmentEvent */ false, sourceSpan, sourceSpan, [], targetEvents, sourceSpan);
            }
            else {
                this._reportError(`Value of the host listener "${propName}" needs to be a string representing an expression but got "${expression}" (${typeof expression})`, sourceSpan);
            }
        }
        return targetEvents;
    }
    parseInterpolation(value, sourceSpan, interpolatedTokens) {
        const sourceInfo = sourceSpan.start.toString();
        const absoluteOffset = sourceSpan.fullStart.offset;
        try {
            const ast = this._exprParser.parseInterpolation(value, sourceInfo, absoluteOffset, interpolatedTokens, this._interpolationConfig);
            if (ast)
                this._reportExpressionParserErrors(ast.errors, sourceSpan);
            return ast;
        }
        catch (e) {
            this._reportError(`${e}`, sourceSpan);
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo, absoluteOffset);
        }
    }
    /**
     * Similar to `parseInterpolation`, but treats the provided string as a single expression
     * element that would normally appear within the interpolation prefix and suffix (`{{` and `}}`).
     * This is used for parsing the switch expression in ICUs.
     */
    parseInterpolationExpression(expression, sourceSpan) {
        const sourceInfo = sourceSpan.start.toString();
        const absoluteOffset = sourceSpan.start.offset;
        try {
            const ast = this._exprParser.parseInterpolationExpression(expression, sourceInfo, absoluteOffset);
            if (ast)
                this._reportExpressionParserErrors(ast.errors, sourceSpan);
            return ast;
        }
        catch (e) {
            this._reportError(`${e}`, sourceSpan);
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo, absoluteOffset);
        }
    }
    /**
     * Parses the bindings in a microsyntax expression, and converts them to
     * `ParsedProperty` or `ParsedVariable`.
     *
     * @param tplKey template binding name
     * @param tplValue template binding value
     * @param sourceSpan span of template binding relative to entire the template
     * @param absoluteValueOffset start of the tplValue relative to the entire template
     * @param targetMatchableAttrs potential attributes to match in the template
     * @param targetProps target property bindings in the template
     * @param targetVars target variables in the template
     */
    parseInlineTemplateBinding(tplKey, tplValue, sourceSpan, absoluteValueOffset, targetMatchableAttrs, targetProps, targetVars, isIvyAst) {
        const absoluteKeyOffset = sourceSpan.start.offset + TEMPLATE_ATTR_PREFIX.length;
        const bindings = this._parseTemplateBindings(tplKey, tplValue, sourceSpan, absoluteKeyOffset, absoluteValueOffset);
        for (const binding of bindings) {
            // sourceSpan is for the entire HTML attribute. bindingSpan is for a particular
            // binding within the microsyntax expression so it's more narrow than sourceSpan.
            const bindingSpan = moveParseSourceSpan(sourceSpan, binding.sourceSpan);
            const key = binding.key.source;
            const keySpan = moveParseSourceSpan(sourceSpan, binding.key.span);
            if (binding instanceof VariableBinding) {
                const value = binding.value ? binding.value.source : '$implicit';
                const valueSpan = binding.value ? moveParseSourceSpan(sourceSpan, binding.value.span) : undefined;
                targetVars.push(new ParsedVariable(key, value, bindingSpan, keySpan, valueSpan));
            }
            else if (binding.value) {
                const srcSpan = isIvyAst ? bindingSpan : sourceSpan;
                const valueSpan = moveParseSourceSpan(sourceSpan, binding.value.ast.sourceSpan);
                this._parsePropertyAst(key, binding.value, srcSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps);
            }
            else {
                targetMatchableAttrs.push([key, '' /* value */]);
                // Since this is a literal attribute with no RHS, source span should be
                // just the key span.
                this.parseLiteralAttr(key, null /* value */, keySpan, absoluteValueOffset, undefined /* valueSpan */, targetMatchableAttrs, targetProps, keySpan);
            }
        }
    }
    /**
     * Parses the bindings in a microsyntax expression, e.g.
     * ```
     *    <tag *tplKey="let value1 = prop; let value2 = localVar">
     * ```
     *
     * @param tplKey template binding name
     * @param tplValue template binding value
     * @param sourceSpan span of template binding relative to entire the template
     * @param absoluteKeyOffset start of the `tplKey`
     * @param absoluteValueOffset start of the `tplValue`
     */
    _parseTemplateBindings(tplKey, tplValue, sourceSpan, absoluteKeyOffset, absoluteValueOffset) {
        const sourceInfo = sourceSpan.start.toString();
        try {
            const bindingsResult = this._exprParser.parseTemplateBindings(tplKey, tplValue, sourceInfo, absoluteKeyOffset, absoluteValueOffset);
            this._reportExpressionParserErrors(bindingsResult.errors, sourceSpan);
            bindingsResult.warnings.forEach((warning) => {
                this._reportError(warning, sourceSpan, ParseErrorLevel.WARNING);
            });
            return bindingsResult.templateBindings;
        }
        catch (e) {
            this._reportError(`${e}`, sourceSpan);
            return [];
        }
    }
    parseLiteralAttr(name, value, sourceSpan, absoluteOffset, valueSpan, targetMatchableAttrs, targetProps, keySpan) {
        if (isAnimationLabel(name)) {
            name = name.substring(1);
            if (keySpan !== undefined) {
                keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + 1, keySpan.end.offset));
            }
            if (value) {
                this._reportError(`Assigning animation triggers via @prop="exp" attributes with an expression is invalid.` +
                    ` Use property bindings (e.g. [@prop]="exp") or use an attribute without a value (e.g. @prop) instead.`, sourceSpan, ParseErrorLevel.ERROR);
            }
            this._parseAnimation(name, value, sourceSpan, absoluteOffset, keySpan, valueSpan, targetMatchableAttrs, targetProps);
        }
        else {
            targetProps.push(new ParsedProperty(name, this._exprParser.wrapLiteralPrimitive(value, '', absoluteOffset), ParsedPropertyType.LITERAL_ATTR, sourceSpan, keySpan, valueSpan));
        }
    }
    parsePropertyBinding(name, expression, isHost, sourceSpan, absoluteOffset, valueSpan, targetMatchableAttrs, targetProps, keySpan) {
        if (name.length === 0) {
            this._reportError(`Property name is missing in binding`, sourceSpan);
        }
        let isAnimationProp = false;
        if (name.startsWith(ANIMATE_PROP_PREFIX)) {
            isAnimationProp = true;
            name = name.substring(ANIMATE_PROP_PREFIX.length);
            if (keySpan !== undefined) {
                keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + ANIMATE_PROP_PREFIX.length, keySpan.end.offset));
            }
        }
        else if (isAnimationLabel(name)) {
            isAnimationProp = true;
            name = name.substring(1);
            if (keySpan !== undefined) {
                keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + 1, keySpan.end.offset));
            }
        }
        if (isAnimationProp) {
            this._parseAnimation(name, expression, sourceSpan, absoluteOffset, keySpan, valueSpan, targetMatchableAttrs, targetProps);
        }
        else {
            this._parsePropertyAst(name, this._parseBinding(expression, isHost, valueSpan || sourceSpan, absoluteOffset), sourceSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps);
        }
    }
    parsePropertyInterpolation(name, value, sourceSpan, valueSpan, targetMatchableAttrs, targetProps, keySpan, interpolatedTokens) {
        const expr = this.parseInterpolation(value, valueSpan || sourceSpan, interpolatedTokens);
        if (expr) {
            this._parsePropertyAst(name, expr, sourceSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps);
            return true;
        }
        return false;
    }
    _parsePropertyAst(name, ast, sourceSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps) {
        targetMatchableAttrs.push([name, ast.source]);
        targetProps.push(new ParsedProperty(name, ast, ParsedPropertyType.DEFAULT, sourceSpan, keySpan, valueSpan));
    }
    _parseAnimation(name, expression, sourceSpan, absoluteOffset, keySpan, valueSpan, targetMatchableAttrs, targetProps) {
        if (name.length === 0) {
            this._reportError('Animation trigger is missing', sourceSpan);
        }
        // This will occur when a @trigger is not paired with an expression.
        // For animations it is valid to not have an expression since */void
        // states will be applied by angular when the element is attached/detached
        const ast = this._parseBinding(expression || 'undefined', false, valueSpan || sourceSpan, absoluteOffset);
        targetMatchableAttrs.push([name, ast.source]);
        targetProps.push(new ParsedProperty(name, ast, ParsedPropertyType.ANIMATION, sourceSpan, keySpan, valueSpan));
    }
    _parseBinding(value, isHostBinding, sourceSpan, absoluteOffset) {
        const sourceInfo = (sourceSpan && sourceSpan.start || '(unknown)').toString();
        try {
            const ast = isHostBinding ?
                this._exprParser.parseSimpleBinding(value, sourceInfo, absoluteOffset, this._interpolationConfig) :
                this._exprParser.parseBinding(value, sourceInfo, absoluteOffset, this._interpolationConfig);
            if (ast)
                this._reportExpressionParserErrors(ast.errors, sourceSpan);
            return ast;
        }
        catch (e) {
            this._reportError(`${e}`, sourceSpan);
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo, absoluteOffset);
        }
    }
    createBoundElementProperty(elementSelector, boundProp, skipValidation = false, mapPropertyName = true) {
        if (boundProp.isAnimation) {
            return new BoundElementProperty(boundProp.name, 4 /* BindingType.Animation */, SecurityContext.NONE, boundProp.expression, null, boundProp.sourceSpan, boundProp.keySpan, boundProp.valueSpan);
        }
        let unit = null;
        let bindingType = undefined;
        let boundPropertyName = null;
        const parts = boundProp.name.split(PROPERTY_PARTS_SEPARATOR);
        let securityContexts = undefined;
        // Check for special cases (prefix style, attr, class)
        if (parts.length > 1) {
            if (parts[0] == ATTRIBUTE_PREFIX) {
                boundPropertyName = parts.slice(1).join(PROPERTY_PARTS_SEPARATOR);
                if (!skipValidation) {
                    this._validatePropertyOrAttributeName(boundPropertyName, boundProp.sourceSpan, true);
                }
                securityContexts = calcPossibleSecurityContexts(this._schemaRegistry, elementSelector, boundPropertyName, true);
                const nsSeparatorIdx = boundPropertyName.indexOf(':');
                if (nsSeparatorIdx > -1) {
                    const ns = boundPropertyName.substring(0, nsSeparatorIdx);
                    const name = boundPropertyName.substring(nsSeparatorIdx + 1);
                    boundPropertyName = mergeNsAndName(ns, name);
                }
                bindingType = 1 /* BindingType.Attribute */;
            }
            else if (parts[0] == CLASS_PREFIX) {
                boundPropertyName = parts[1];
                bindingType = 2 /* BindingType.Class */;
                securityContexts = [SecurityContext.NONE];
            }
            else if (parts[0] == STYLE_PREFIX) {
                unit = parts.length > 2 ? parts[2] : null;
                boundPropertyName = parts[1];
                bindingType = 3 /* BindingType.Style */;
                securityContexts = [SecurityContext.STYLE];
            }
        }
        // If not a special case, use the full property name
        if (boundPropertyName === null) {
            const mappedPropName = this._schemaRegistry.getMappedPropName(boundProp.name);
            boundPropertyName = mapPropertyName ? mappedPropName : boundProp.name;
            securityContexts = calcPossibleSecurityContexts(this._schemaRegistry, elementSelector, mappedPropName, false);
            bindingType = 0 /* BindingType.Property */;
            if (!skipValidation) {
                this._validatePropertyOrAttributeName(mappedPropName, boundProp.sourceSpan, false);
            }
        }
        return new BoundElementProperty(boundPropertyName, bindingType, securityContexts[0], boundProp.expression, unit, boundProp.sourceSpan, boundProp.keySpan, boundProp.valueSpan);
    }
    // TODO: keySpan should be required but was made optional to avoid changing VE parser.
    parseEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetMatchableAttrs, targetEvents, keySpan) {
        if (name.length === 0) {
            this._reportError(`Event name is missing in binding`, sourceSpan);
        }
        if (isAnimationLabel(name)) {
            name = name.slice(1);
            if (keySpan !== undefined) {
                keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + 1, keySpan.end.offset));
            }
            this._parseAnimationEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetEvents, keySpan);
        }
        else {
            this._parseRegularEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetMatchableAttrs, targetEvents, keySpan);
        }
    }
    calcPossibleSecurityContexts(selector, propName, isAttribute) {
        const prop = this._schemaRegistry.getMappedPropName(propName);
        return calcPossibleSecurityContexts(this._schemaRegistry, selector, prop, isAttribute);
    }
    _parseAnimationEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetEvents, keySpan) {
        const matches = splitAtPeriod(name, [name, '']);
        const eventName = matches[0];
        const phase = matches[1].toLowerCase();
        const ast = this._parseAction(expression, isAssignmentEvent, handlerSpan);
        targetEvents.push(new ParsedEvent(eventName, phase, 1 /* ParsedEventType.Animation */, ast, sourceSpan, handlerSpan, keySpan));
        if (eventName.length === 0) {
            this._reportError(`Animation event name is missing in binding`, sourceSpan);
        }
        if (phase) {
            if (phase !== 'start' && phase !== 'done') {
                this._reportError(`The provided animation output phase value "${phase}" for "@${eventName}" is not supported (use start or done)`, sourceSpan);
            }
        }
        else {
            this._reportError(`The animation trigger output event (@${eventName}) is missing its phase value name (start or done are currently supported)`, sourceSpan);
        }
    }
    _parseRegularEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetMatchableAttrs, targetEvents, keySpan) {
        // long format: 'target: eventName'
        const [target, eventName] = splitAtColon(name, [null, name]);
        const ast = this._parseAction(expression, isAssignmentEvent, handlerSpan);
        targetMatchableAttrs.push([name, ast.source]);
        targetEvents.push(new ParsedEvent(eventName, target, 0 /* ParsedEventType.Regular */, ast, sourceSpan, handlerSpan, keySpan));
        // Don't detect directives for event names for now,
        // so don't add the event name to the matchableAttrs
    }
    _parseAction(value, isAssignmentEvent, sourceSpan) {
        const sourceInfo = (sourceSpan && sourceSpan.start || '(unknown').toString();
        const absoluteOffset = (sourceSpan && sourceSpan.start) ? sourceSpan.start.offset : 0;
        try {
            const ast = this._exprParser.parseAction(value, isAssignmentEvent, sourceInfo, absoluteOffset, this._interpolationConfig);
            if (ast) {
                this._reportExpressionParserErrors(ast.errors, sourceSpan);
            }
            if (!ast || ast.ast instanceof EmptyExpr) {
                this._reportError(`Empty expressions are not allowed`, sourceSpan);
                return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo, absoluteOffset);
            }
            return ast;
        }
        catch (e) {
            this._reportError(`${e}`, sourceSpan);
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo, absoluteOffset);
        }
    }
    _reportError(message, sourceSpan, level = ParseErrorLevel.ERROR) {
        this.errors.push(new ParseError(sourceSpan, message, level));
    }
    _reportExpressionParserErrors(errors, sourceSpan) {
        for (const error of errors) {
            this._reportError(error.message, sourceSpan);
        }
    }
    /**
     * @param propName the name of the property / attribute
     * @param sourceSpan
     * @param isAttr true when binding to an attribute
     */
    _validatePropertyOrAttributeName(propName, sourceSpan, isAttr) {
        const report = isAttr ? this._schemaRegistry.validateAttribute(propName) :
            this._schemaRegistry.validateProperty(propName);
        if (report.error) {
            this._reportError(report.msg, sourceSpan, ParseErrorLevel.ERROR);
        }
    }
}
export class PipeCollector extends RecursiveAstVisitor {
    constructor() {
        super(...arguments);
        this.pipes = new Map();
    }
    visitPipe(ast, context) {
        this.pipes.set(ast.name, ast);
        ast.exp.visit(this);
        this.visitAll(ast.args, context);
        return null;
    }
}
function isAnimationLabel(name) {
    return name[0] == '@';
}
export function calcPossibleSecurityContexts(registry, selector, propName, isAttribute) {
    const ctxs = [];
    CssSelector.parse(selector).forEach((selector) => {
        const elementNames = selector.element ? [selector.element] : registry.allKnownElementNames();
        const notElementNames = new Set(selector.notSelectors.filter(selector => selector.isElementSelector())
            .map((selector) => selector.element));
        const possibleElementNames = elementNames.filter(elementName => !notElementNames.has(elementName));
        ctxs.push(...possibleElementNames.map(elementName => registry.securityContext(elementName, propName, isAttribute)));
    });
    return ctxs.length === 0 ? [SecurityContext.NONE] : Array.from(new Set(ctxs)).sort();
}
/**
 * Compute a new ParseSourceSpan based off an original `sourceSpan` by using
 * absolute offsets from the specified `absoluteSpan`.
 *
 * @param sourceSpan original source span
 * @param absoluteSpan absolute source span to move to
 */
function moveParseSourceSpan(sourceSpan, absoluteSpan) {
    // The difference of two absolute offsets provide the relative offset
    const startDiff = absoluteSpan.start - sourceSpan.start.offset;
    const endDiff = absoluteSpan.end - sourceSpan.end.offset;
    return new ParseSourceSpan(sourceSpan.start.moveBy(startDiff), sourceSpan.end.moveBy(endDiff), sourceSpan.fullStart.moveBy(startDiff), sourceSpan.details);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ19wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvdGVtcGxhdGVfcGFyc2VyL2JpbmRpbmdfcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDeEMsT0FBTyxFQUFDLGtCQUFrQixFQUEyQyxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFtQixjQUFjLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFlLG1CQUFtQixFQUFtQixlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUc1UixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLFVBQVUsRUFBRSxlQUFlLEVBQWlCLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUxRixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxZQUFZLEVBQUUsYUFBYSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRXBELE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0FBQ3JDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO0FBQ2hDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQztBQUM3QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUM7QUFDN0IsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUM7QUFDakMsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUM7QUFVdkM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sYUFBYTtJQUN4QixZQUNZLFdBQW1CLEVBQVUsb0JBQXlDLEVBQ3RFLGVBQXNDLEVBQVMsTUFBb0I7UUFEbkUsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBVSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3RFLG9C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dEIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQ2pDLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkYsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQVMsbUJBQW1CLENBQ3hCLFVBQTJCLEVBQUUsWUFBZ0M7SUFDL0QscUVBQXFFO0lBQ3JFLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDL0QsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUN6RCxPQUFPLElBQUksZUFBZSxDQUN0QixVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDbEUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTZWN1cml0eUNvbnRleHR9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHtBYnNvbHV0ZVNvdXJjZVNwYW4sIEFTVFdpdGhTb3VyY2UsIEJpbmRpbmdQaXBlLCBCaW5kaW5nVHlwZSwgQm91bmRFbGVtZW50UHJvcGVydHksIEVtcHR5RXhwciwgUGFyc2VkRXZlbnQsIFBhcnNlZEV2ZW50VHlwZSwgUGFyc2VkUHJvcGVydHksIFBhcnNlZFByb3BlcnR5VHlwZSwgUGFyc2VkVmFyaWFibGUsIFBhcnNlckVycm9yLCBSZWN1cnNpdmVBc3RWaXNpdG9yLCBUZW1wbGF0ZUJpbmRpbmcsIFZhcmlhYmxlQmluZGluZ30gZnJvbSAnLi4vZXhwcmVzc2lvbl9wYXJzZXIvYXN0JztcbmltcG9ydCB7UGFyc2VyfSBmcm9tICcuLi9leHByZXNzaW9uX3BhcnNlci9wYXJzZXInO1xuaW1wb3J0IHtJbnRlcnBvbGF0aW9uQ29uZmlnfSBmcm9tICcuLi9tbF9wYXJzZXIvaW50ZXJwb2xhdGlvbl9jb25maWcnO1xuaW1wb3J0IHttZXJnZU5zQW5kTmFtZX0gZnJvbSAnLi4vbWxfcGFyc2VyL3RhZ3MnO1xuaW1wb3J0IHtJbnRlcnBvbGF0ZWRBdHRyaWJ1dGVUb2tlbiwgSW50ZXJwb2xhdGVkVGV4dFRva2VufSBmcm9tICcuLi9tbF9wYXJzZXIvdG9rZW5zJztcbmltcG9ydCB7UGFyc2VFcnJvciwgUGFyc2VFcnJvckxldmVsLCBQYXJzZUxvY2F0aW9uLCBQYXJzZVNvdXJjZVNwYW59IGZyb20gJy4uL3BhcnNlX3V0aWwnO1xuaW1wb3J0IHtFbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJy4uL3NjaGVtYS9lbGVtZW50X3NjaGVtYV9yZWdpc3RyeSc7XG5pbXBvcnQge0Nzc1NlbGVjdG9yfSBmcm9tICcuLi9zZWxlY3Rvcic7XG5pbXBvcnQge3NwbGl0QXRDb2xvbiwgc3BsaXRBdFBlcmlvZH0gZnJvbSAnLi4vdXRpbCc7XG5cbmNvbnN0IFBST1BFUlRZX1BBUlRTX1NFUEFSQVRPUiA9ICcuJztcbmNvbnN0IEFUVFJJQlVURV9QUkVGSVggPSAnYXR0cic7XG5jb25zdCBDTEFTU19QUkVGSVggPSAnY2xhc3MnO1xuY29uc3QgU1RZTEVfUFJFRklYID0gJ3N0eWxlJztcbmNvbnN0IFRFTVBMQVRFX0FUVFJfUFJFRklYID0gJyonO1xuY29uc3QgQU5JTUFURV9QUk9QX1BSRUZJWCA9ICdhbmltYXRlLSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdFByb3BlcnRpZXMge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdExpc3RlbmVycyB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuLyoqXG4gKiBQYXJzZXMgYmluZGluZ3MgaW4gdGVtcGxhdGVzIGFuZCBpbiB0aGUgZGlyZWN0aXZlIGhvc3QgYXJlYS5cbiAqL1xuZXhwb3J0IGNsYXNzIEJpbmRpbmdQYXJzZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2V4cHJQYXJzZXI6IFBhcnNlciwgcHJpdmF0ZSBfaW50ZXJwb2xhdGlvbkNvbmZpZzogSW50ZXJwb2xhdGlvbkNvbmZpZyxcbiAgICAgIHByaXZhdGUgX3NjaGVtYVJlZ2lzdHJ5OiBFbGVtZW50U2NoZW1hUmVnaXN0cnksIHB1YmxpYyBlcnJvcnM6IFBhcnNlRXJyb3JbXSkge31cblxuICBnZXQgaW50ZXJwb2xhdGlvbkNvbmZpZygpOiBJbnRlcnBvbGF0aW9uQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJwb2xhdGlvbkNvbmZpZztcbiAgfVxuXG4gIGNyZWF0ZUJvdW5kSG9zdFByb3BlcnRpZXMocHJvcGVydGllczogSG9zdFByb3BlcnRpZXMsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbik6XG4gICAgICBQYXJzZWRQcm9wZXJ0eVtdfG51bGwge1xuICAgIGNvbnN0IGJvdW5kUHJvcHM6IFBhcnNlZFByb3BlcnR5W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpKSB7XG4gICAgICBjb25zdCBleHByZXNzaW9uID0gcHJvcGVydGllc1twcm9wTmFtZV07XG4gICAgICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMucGFyc2VQcm9wZXJ0eUJpbmRpbmcoXG4gICAgICAgICAgICBwcm9wTmFtZSwgZXhwcmVzc2lvbiwgdHJ1ZSwgc291cmNlU3Bhbiwgc291cmNlU3Bhbi5zdGFydC5vZmZzZXQsIHVuZGVmaW5lZCwgW10sXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGBzb3VyY2VTcGFuYCBmb3IgIGBrZXlTcGFuYC4gVGhpcyBpc24ndCByZWFsbHkgYWNjdXJhdGUsIGJ1dCBuZWl0aGVyIGlzIHRoZVxuICAgICAgICAgICAgLy8gc291cmNlU3BhbiwgYXMgaXQgcmVwcmVzZW50cyB0aGUgc291cmNlU3BhbiBvZiB0aGUgaG9zdCBpdHNlbGYgcmF0aGVyIHRoYW4gdGhlXG4gICAgICAgICAgICAvLyBzb3VyY2Ugb2YgdGhlIGhvc3QgYmluZGluZyAod2hpY2ggZG9lc24ndCBleGlzdCBpbiB0aGUgdGVtcGxhdGUpLiBSZWdhcmRsZXNzLFxuICAgICAgICAgICAgLy8gbmVpdGhlciBvZiB0aGVzZSB2YWx1ZXMgYXJlIHVzZWQgaW4gSXZ5IGJ1dCBhcmUgb25seSBoZXJlIHRvIHNhdGlzZnkgdGhlIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyBzaWduYXR1cmUuIFRoaXMgc2hvdWxkIGxpa2VseSBiZSByZWZhY3RvcmVkIGluIHRoZSBmdXR1cmUgc28gdGhhdCBgc291cmNlU3BhbmBcbiAgICAgICAgICAgIC8vIGlzbid0IGJlaW5nIHVzZWQgaW5hY2N1cmF0ZWx5LlxuICAgICAgICAgICAgYm91bmRQcm9wcywgc291cmNlU3Bhbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZXBvcnRFcnJvcihcbiAgICAgICAgICAgIGBWYWx1ZSBvZiB0aGUgaG9zdCBwcm9wZXJ0eSBiaW5kaW5nIFwiJHtcbiAgICAgICAgICAgICAgICBwcm9wTmFtZX1cIiBuZWVkcyB0byBiZSBhIHN0cmluZyByZXByZXNlbnRpbmcgYW4gZXhwcmVzc2lvbiBidXQgZ290IFwiJHtcbiAgICAgICAgICAgICAgICBleHByZXNzaW9ufVwiICgke3R5cGVvZiBleHByZXNzaW9ufSlgLFxuICAgICAgICAgICAgc291cmNlU3Bhbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBib3VuZFByb3BzO1xuICB9XG5cbiAgY3JlYXRlRGlyZWN0aXZlSG9zdEV2ZW50QXN0cyhob3N0TGlzdGVuZXJzOiBIb3N0TGlzdGVuZXJzLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOlxuICAgICAgUGFyc2VkRXZlbnRbXXxudWxsIHtcbiAgICBjb25zdCB0YXJnZXRFdmVudHM6IFBhcnNlZEV2ZW50W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIE9iamVjdC5rZXlzKGhvc3RMaXN0ZW5lcnMpKSB7XG4gICAgICBjb25zdCBleHByZXNzaW9uID0gaG9zdExpc3RlbmVyc1twcm9wTmFtZV07XG4gICAgICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIFVzZSB0aGUgYHNvdXJjZVNwYW5gIGZvciAgYGtleVNwYW5gIGFuZCBgaGFuZGxlclNwYW5gLiBUaGlzIGlzbid0IHJlYWxseSBhY2N1cmF0ZSwgYnV0XG4gICAgICAgIC8vIG5laXRoZXIgaXMgdGhlIGBzb3VyY2VTcGFuYCwgYXMgaXQgcmVwcmVzZW50cyB0aGUgYHNvdXJjZVNwYW5gIG9mIHRoZSBob3N0IGl0c2VsZlxuICAgICAgICAvLyByYXRoZXIgdGhhbiB0aGUgc291cmNlIG9mIHRoZSBob3N0IGJpbmRpbmcgKHdoaWNoIGRvZXNuJ3QgZXhpc3QgaW4gdGhlIHRlbXBsYXRlKS5cbiAgICAgICAgLy8gUmVnYXJkbGVzcywgbmVpdGhlciBvZiB0aGVzZSB2YWx1ZXMgYXJlIHVzZWQgaW4gSXZ5IGJ1dCBhcmUgb25seSBoZXJlIHRvIHNhdGlzZnkgdGhlXG4gICAgICAgIC8vIGZ1bmN0aW9uIHNpZ25hdHVyZS4gVGhpcyBzaG91bGQgbGlrZWx5IGJlIHJlZmFjdG9yZWQgaW4gdGhlIGZ1dHVyZSBzbyB0aGF0IGBzb3VyY2VTcGFuYFxuICAgICAgICAvLyBpc24ndCBiZWluZyB1c2VkIGluYWNjdXJhdGVseS5cbiAgICAgICAgdGhpcy5wYXJzZUV2ZW50KFxuICAgICAgICAgICAgcHJvcE5hbWUsIGV4cHJlc3Npb24sIC8qIGlzQXNzaWdubWVudEV2ZW50ICovIGZhbHNlLCBzb3VyY2VTcGFuLCBzb3VyY2VTcGFuLCBbXSxcbiAgICAgICAgICAgIHRhcmdldEV2ZW50cywgc291cmNlU3Bhbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZXBvcnRFcnJvcihcbiAgICAgICAgICAgIGBWYWx1ZSBvZiB0aGUgaG9zdCBsaXN0ZW5lciBcIiR7XG4gICAgICAgICAgICAgICAgcHJvcE5hbWV9XCIgbmVlZHMgdG8gYmUgYSBzdHJpbmcgcmVwcmVzZW50aW5nIGFuIGV4cHJlc3Npb24gYnV0IGdvdCBcIiR7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbn1cIiAoJHt0eXBlb2YgZXhwcmVzc2lvbn0pYCxcbiAgICAgICAgICAgIHNvdXJjZVNwYW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0RXZlbnRzO1xuICB9XG5cbiAgcGFyc2VJbnRlcnBvbGF0aW9uKFxuICAgICAgdmFsdWU6IHN0cmluZywgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgaW50ZXJwb2xhdGVkVG9rZW5zOiBJbnRlcnBvbGF0ZWRBdHRyaWJ1dGVUb2tlbltdfEludGVycG9sYXRlZFRleHRUb2tlbltdfFxuICAgICAgbnVsbCk6IEFTVFdpdGhTb3VyY2Uge1xuICAgIGNvbnN0IHNvdXJjZUluZm8gPSBzb3VyY2VTcGFuLnN0YXJ0LnRvU3RyaW5nKCk7XG4gICAgY29uc3QgYWJzb2x1dGVPZmZzZXQgPSBzb3VyY2VTcGFuLmZ1bGxTdGFydC5vZmZzZXQ7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgYXN0ID0gdGhpcy5fZXhwclBhcnNlci5wYXJzZUludGVycG9sYXRpb24oXG4gICAgICAgICAgdmFsdWUsIHNvdXJjZUluZm8sIGFic29sdXRlT2Zmc2V0LCBpbnRlcnBvbGF0ZWRUb2tlbnMsIHRoaXMuX2ludGVycG9sYXRpb25Db25maWcpITtcbiAgICAgIGlmIChhc3QpIHRoaXMuX3JlcG9ydEV4cHJlc3Npb25QYXJzZXJFcnJvcnMoYXN0LmVycm9ycywgc291cmNlU3Bhbik7XG4gICAgICByZXR1cm4gYXN0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGAke2V9YCwgc291cmNlU3Bhbik7XG4gICAgICByZXR1cm4gdGhpcy5fZXhwclBhcnNlci53cmFwTGl0ZXJhbFByaW1pdGl2ZSgnRVJST1InLCBzb3VyY2VJbmZvLCBhYnNvbHV0ZU9mZnNldCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNpbWlsYXIgdG8gYHBhcnNlSW50ZXJwb2xhdGlvbmAsIGJ1dCB0cmVhdHMgdGhlIHByb3ZpZGVkIHN0cmluZyBhcyBhIHNpbmdsZSBleHByZXNzaW9uXG4gICAqIGVsZW1lbnQgdGhhdCB3b3VsZCBub3JtYWxseSBhcHBlYXIgd2l0aGluIHRoZSBpbnRlcnBvbGF0aW9uIHByZWZpeCBhbmQgc3VmZml4IChge3tgIGFuZCBgfX1gKS5cbiAgICogVGhpcyBpcyB1c2VkIGZvciBwYXJzaW5nIHRoZSBzd2l0Y2ggZXhwcmVzc2lvbiBpbiBJQ1VzLlxuICAgKi9cbiAgcGFyc2VJbnRlcnBvbGF0aW9uRXhwcmVzc2lvbihleHByZXNzaW9uOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbik6IEFTVFdpdGhTb3VyY2Uge1xuICAgIGNvbnN0IHNvdXJjZUluZm8gPSBzb3VyY2VTcGFuLnN0YXJ0LnRvU3RyaW5nKCk7XG4gICAgY29uc3QgYWJzb2x1dGVPZmZzZXQgPSBzb3VyY2VTcGFuLnN0YXJ0Lm9mZnNldDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBhc3QgPVxuICAgICAgICAgIHRoaXMuX2V4cHJQYXJzZXIucGFyc2VJbnRlcnBvbGF0aW9uRXhwcmVzc2lvbihleHByZXNzaW9uLCBzb3VyY2VJbmZvLCBhYnNvbHV0ZU9mZnNldCk7XG4gICAgICBpZiAoYXN0KSB0aGlzLl9yZXBvcnRFeHByZXNzaW9uUGFyc2VyRXJyb3JzKGFzdC5lcnJvcnMsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIGFzdDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgJHtlfWAsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIHRoaXMuX2V4cHJQYXJzZXIud3JhcExpdGVyYWxQcmltaXRpdmUoJ0VSUk9SJywgc291cmNlSW5mbywgYWJzb2x1dGVPZmZzZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGJpbmRpbmdzIGluIGEgbWljcm9zeW50YXggZXhwcmVzc2lvbiwgYW5kIGNvbnZlcnRzIHRoZW0gdG9cbiAgICogYFBhcnNlZFByb3BlcnR5YCBvciBgUGFyc2VkVmFyaWFibGVgLlxuICAgKlxuICAgKiBAcGFyYW0gdHBsS2V5IHRlbXBsYXRlIGJpbmRpbmcgbmFtZVxuICAgKiBAcGFyYW0gdHBsVmFsdWUgdGVtcGxhdGUgYmluZGluZyB2YWx1ZVxuICAgKiBAcGFyYW0gc291cmNlU3BhbiBzcGFuIG9mIHRlbXBsYXRlIGJpbmRpbmcgcmVsYXRpdmUgdG8gZW50aXJlIHRoZSB0ZW1wbGF0ZVxuICAgKiBAcGFyYW0gYWJzb2x1dGVWYWx1ZU9mZnNldCBzdGFydCBvZiB0aGUgdHBsVmFsdWUgcmVsYXRpdmUgdG8gdGhlIGVudGlyZSB0ZW1wbGF0ZVxuICAgKiBAcGFyYW0gdGFyZ2V0TWF0Y2hhYmxlQXR0cnMgcG90ZW50aWFsIGF0dHJpYnV0ZXMgdG8gbWF0Y2ggaW4gdGhlIHRlbXBsYXRlXG4gICAqIEBwYXJhbSB0YXJnZXRQcm9wcyB0YXJnZXQgcHJvcGVydHkgYmluZGluZ3MgaW4gdGhlIHRlbXBsYXRlXG4gICAqIEBwYXJhbSB0YXJnZXRWYXJzIHRhcmdldCB2YXJpYWJsZXMgaW4gdGhlIHRlbXBsYXRlXG4gICAqL1xuICBwYXJzZUlubGluZVRlbXBsYXRlQmluZGluZyhcbiAgICAgIHRwbEtleTogc3RyaW5nLCB0cGxWYWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIGFic29sdXRlVmFsdWVPZmZzZXQ6IG51bWJlcixcbiAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdLCB0YXJnZXRQcm9wczogUGFyc2VkUHJvcGVydHlbXSwgdGFyZ2V0VmFyczogUGFyc2VkVmFyaWFibGVbXSxcbiAgICAgIGlzSXZ5QXN0OiBib29sZWFuKSB7XG4gICAgY29uc3QgYWJzb2x1dGVLZXlPZmZzZXQgPSBzb3VyY2VTcGFuLnN0YXJ0Lm9mZnNldCArIFRFTVBMQVRFX0FUVFJfUFJFRklYLmxlbmd0aDtcbiAgICBjb25zdCBiaW5kaW5ncyA9IHRoaXMuX3BhcnNlVGVtcGxhdGVCaW5kaW5ncyhcbiAgICAgICAgdHBsS2V5LCB0cGxWYWx1ZSwgc291cmNlU3BhbiwgYWJzb2x1dGVLZXlPZmZzZXQsIGFic29sdXRlVmFsdWVPZmZzZXQpO1xuXG4gICAgZm9yIChjb25zdCBiaW5kaW5nIG9mIGJpbmRpbmdzKSB7XG4gICAgICAvLyBzb3VyY2VTcGFuIGlzIGZvciB0aGUgZW50aXJlIEhUTUwgYXR0cmlidXRlLiBiaW5kaW5nU3BhbiBpcyBmb3IgYSBwYXJ0aWN1bGFyXG4gICAgICAvLyBiaW5kaW5nIHdpdGhpbiB0aGUgbWljcm9zeW50YXggZXhwcmVzc2lvbiBzbyBpdCdzIG1vcmUgbmFycm93IHRoYW4gc291cmNlU3Bhbi5cbiAgICAgIGNvbnN0IGJpbmRpbmdTcGFuID0gbW92ZVBhcnNlU291cmNlU3Bhbihzb3VyY2VTcGFuLCBiaW5kaW5nLnNvdXJjZVNwYW4pO1xuICAgICAgY29uc3Qga2V5ID0gYmluZGluZy5rZXkuc291cmNlO1xuICAgICAgY29uc3Qga2V5U3BhbiA9IG1vdmVQYXJzZVNvdXJjZVNwYW4oc291cmNlU3BhbiwgYmluZGluZy5rZXkuc3Bhbik7XG4gICAgICBpZiAoYmluZGluZyBpbnN0YW5jZW9mIFZhcmlhYmxlQmluZGluZykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGJpbmRpbmcudmFsdWUgPyBiaW5kaW5nLnZhbHVlLnNvdXJjZSA6ICckaW1wbGljaXQnO1xuICAgICAgICBjb25zdCB2YWx1ZVNwYW4gPVxuICAgICAgICAgICAgYmluZGluZy52YWx1ZSA/IG1vdmVQYXJzZVNvdXJjZVNwYW4oc291cmNlU3BhbiwgYmluZGluZy52YWx1ZS5zcGFuKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGFyZ2V0VmFycy5wdXNoKG5ldyBQYXJzZWRWYXJpYWJsZShrZXksIHZhbHVlLCBiaW5kaW5nU3Bhbiwga2V5U3BhbiwgdmFsdWVTcGFuKSk7XG4gICAgICB9IGVsc2UgaWYgKGJpbmRpbmcudmFsdWUpIHtcbiAgICAgICAgY29uc3Qgc3JjU3BhbiA9IGlzSXZ5QXN0ID8gYmluZGluZ1NwYW4gOiBzb3VyY2VTcGFuO1xuICAgICAgICBjb25zdCB2YWx1ZVNwYW4gPSBtb3ZlUGFyc2VTb3VyY2VTcGFuKHNvdXJjZVNwYW4sIGJpbmRpbmcudmFsdWUuYXN0LnNvdXJjZVNwYW4pO1xuICAgICAgICB0aGlzLl9wYXJzZVByb3BlcnR5QXN0KFxuICAgICAgICAgICAga2V5LCBiaW5kaW5nLnZhbHVlLCBzcmNTcGFuLCBrZXlTcGFuLCB2YWx1ZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLCB0YXJnZXRQcm9wcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRNYXRjaGFibGVBdHRycy5wdXNoKFtrZXksICcnIC8qIHZhbHVlICovXSk7XG4gICAgICAgIC8vIFNpbmNlIHRoaXMgaXMgYSBsaXRlcmFsIGF0dHJpYnV0ZSB3aXRoIG5vIFJIUywgc291cmNlIHNwYW4gc2hvdWxkIGJlXG4gICAgICAgIC8vIGp1c3QgdGhlIGtleSBzcGFuLlxuICAgICAgICB0aGlzLnBhcnNlTGl0ZXJhbEF0dHIoXG4gICAgICAgICAgICBrZXksIG51bGwgLyogdmFsdWUgKi8sIGtleVNwYW4sIGFic29sdXRlVmFsdWVPZmZzZXQsIHVuZGVmaW5lZCAvKiB2YWx1ZVNwYW4gKi8sXG4gICAgICAgICAgICB0YXJnZXRNYXRjaGFibGVBdHRycywgdGFyZ2V0UHJvcHMsIGtleVNwYW4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGJpbmRpbmdzIGluIGEgbWljcm9zeW50YXggZXhwcmVzc2lvbiwgZS5nLlxuICAgKiBgYGBcbiAgICogICAgPHRhZyAqdHBsS2V5PVwibGV0IHZhbHVlMSA9IHByb3A7IGxldCB2YWx1ZTIgPSBsb2NhbFZhclwiPlxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHRwbEtleSB0ZW1wbGF0ZSBiaW5kaW5nIG5hbWVcbiAgICogQHBhcmFtIHRwbFZhbHVlIHRlbXBsYXRlIGJpbmRpbmcgdmFsdWVcbiAgICogQHBhcmFtIHNvdXJjZVNwYW4gc3BhbiBvZiB0ZW1wbGF0ZSBiaW5kaW5nIHJlbGF0aXZlIHRvIGVudGlyZSB0aGUgdGVtcGxhdGVcbiAgICogQHBhcmFtIGFic29sdXRlS2V5T2Zmc2V0IHN0YXJ0IG9mIHRoZSBgdHBsS2V5YFxuICAgKiBAcGFyYW0gYWJzb2x1dGVWYWx1ZU9mZnNldCBzdGFydCBvZiB0aGUgYHRwbFZhbHVlYFxuICAgKi9cbiAgcHJpdmF0ZSBfcGFyc2VUZW1wbGF0ZUJpbmRpbmdzKFxuICAgICAgdHBsS2V5OiBzdHJpbmcsIHRwbFZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgYWJzb2x1dGVLZXlPZmZzZXQ6IG51bWJlcixcbiAgICAgIGFic29sdXRlVmFsdWVPZmZzZXQ6IG51bWJlcik6IFRlbXBsYXRlQmluZGluZ1tdIHtcbiAgICBjb25zdCBzb3VyY2VJbmZvID0gc291cmNlU3Bhbi5zdGFydC50b1N0cmluZygpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJpbmRpbmdzUmVzdWx0ID0gdGhpcy5fZXhwclBhcnNlci5wYXJzZVRlbXBsYXRlQmluZGluZ3MoXG4gICAgICAgICAgdHBsS2V5LCB0cGxWYWx1ZSwgc291cmNlSW5mbywgYWJzb2x1dGVLZXlPZmZzZXQsIGFic29sdXRlVmFsdWVPZmZzZXQpO1xuICAgICAgdGhpcy5fcmVwb3J0RXhwcmVzc2lvblBhcnNlckVycm9ycyhiaW5kaW5nc1Jlc3VsdC5lcnJvcnMsIHNvdXJjZVNwYW4pO1xuICAgICAgYmluZGluZ3NSZXN1bHQud2FybmluZ3MuZm9yRWFjaCgod2FybmluZykgPT4ge1xuICAgICAgICB0aGlzLl9yZXBvcnRFcnJvcih3YXJuaW5nLCBzb3VyY2VTcGFuLCBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBiaW5kaW5nc1Jlc3VsdC50ZW1wbGF0ZUJpbmRpbmdzO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGAke2V9YCwgc291cmNlU3Bhbik7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgcGFyc2VMaXRlcmFsQXR0cihcbiAgICAgIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZ3xudWxsLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIGFic29sdXRlT2Zmc2V0OiBudW1iZXIsXG4gICAgICB2YWx1ZVNwYW46IFBhcnNlU291cmNlU3Bhbnx1bmRlZmluZWQsIHRhcmdldE1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdLFxuICAgICAgdGFyZ2V0UHJvcHM6IFBhcnNlZFByb3BlcnR5W10sIGtleVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIGlmIChpc0FuaW1hdGlvbkxhYmVsKG5hbWUpKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMSk7XG4gICAgICBpZiAoa2V5U3BhbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleVNwYW4gPSBtb3ZlUGFyc2VTb3VyY2VTcGFuKFxuICAgICAgICAgICAga2V5U3BhbiwgbmV3IEFic29sdXRlU291cmNlU3BhbihrZXlTcGFuLnN0YXJ0Lm9mZnNldCArIDEsIGtleVNwYW4uZW5kLm9mZnNldCkpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3JlcG9ydEVycm9yKFxuICAgICAgICAgICAgYEFzc2lnbmluZyBhbmltYXRpb24gdHJpZ2dlcnMgdmlhIEBwcm9wPVwiZXhwXCIgYXR0cmlidXRlcyB3aXRoIGFuIGV4cHJlc3Npb24gaXMgaW52YWxpZC5gICtcbiAgICAgICAgICAgICAgICBgIFVzZSBwcm9wZXJ0eSBiaW5kaW5ncyAoZS5nLiBbQHByb3BdPVwiZXhwXCIpIG9yIHVzZSBhbiBhdHRyaWJ1dGUgd2l0aG91dCBhIHZhbHVlIChlLmcuIEBwcm9wKSBpbnN0ZWFkLmAsXG4gICAgICAgICAgICBzb3VyY2VTcGFuLCBQYXJzZUVycm9yTGV2ZWwuRVJST1IpO1xuICAgICAgfVxuICAgICAgdGhpcy5fcGFyc2VBbmltYXRpb24oXG4gICAgICAgICAgbmFtZSwgdmFsdWUsIHNvdXJjZVNwYW4sIGFic29sdXRlT2Zmc2V0LCBrZXlTcGFuLCB2YWx1ZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLFxuICAgICAgICAgIHRhcmdldFByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0UHJvcHMucHVzaChuZXcgUGFyc2VkUHJvcGVydHkoXG4gICAgICAgICAgbmFtZSwgdGhpcy5fZXhwclBhcnNlci53cmFwTGl0ZXJhbFByaW1pdGl2ZSh2YWx1ZSwgJycsIGFic29sdXRlT2Zmc2V0KSxcbiAgICAgICAgICBQYXJzZWRQcm9wZXJ0eVR5cGUuTElURVJBTF9BVFRSLCBzb3VyY2VTcGFuLCBrZXlTcGFuLCB2YWx1ZVNwYW4pKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVByb3BlcnR5QmluZGluZyhcbiAgICAgIG5hbWU6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nLCBpc0hvc3Q6IGJvb2xlYW4sIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIGFic29sdXRlT2Zmc2V0OiBudW1iZXIsIHZhbHVlU3BhbjogUGFyc2VTb3VyY2VTcGFufHVuZGVmaW5lZCxcbiAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdLCB0YXJnZXRQcm9wczogUGFyc2VkUHJvcGVydHlbXSwga2V5U3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7XG4gICAgaWYgKG5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgUHJvcGVydHkgbmFtZSBpcyBtaXNzaW5nIGluIGJpbmRpbmdgLCBzb3VyY2VTcGFuKTtcbiAgICB9XG5cbiAgICBsZXQgaXNBbmltYXRpb25Qcm9wID0gZmFsc2U7XG4gICAgaWYgKG5hbWUuc3RhcnRzV2l0aChBTklNQVRFX1BST1BfUFJFRklYKSkge1xuICAgICAgaXNBbmltYXRpb25Qcm9wID0gdHJ1ZTtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZyhBTklNQVRFX1BST1BfUFJFRklYLmxlbmd0aCk7XG4gICAgICBpZiAoa2V5U3BhbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleVNwYW4gPSBtb3ZlUGFyc2VTb3VyY2VTcGFuKFxuICAgICAgICAgICAga2V5U3BhbixcbiAgICAgICAgICAgIG5ldyBBYnNvbHV0ZVNvdXJjZVNwYW4oXG4gICAgICAgICAgICAgICAga2V5U3Bhbi5zdGFydC5vZmZzZXQgKyBBTklNQVRFX1BST1BfUFJFRklYLmxlbmd0aCwga2V5U3Bhbi5lbmQub2Zmc2V0KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0FuaW1hdGlvbkxhYmVsKG5hbWUpKSB7XG4gICAgICBpc0FuaW1hdGlvblByb3AgPSB0cnVlO1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDEpO1xuICAgICAgaWYgKGtleVNwYW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXlTcGFuID0gbW92ZVBhcnNlU291cmNlU3BhbihcbiAgICAgICAgICAgIGtleVNwYW4sIG5ldyBBYnNvbHV0ZVNvdXJjZVNwYW4oa2V5U3Bhbi5zdGFydC5vZmZzZXQgKyAxLCBrZXlTcGFuLmVuZC5vZmZzZXQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNBbmltYXRpb25Qcm9wKSB7XG4gICAgICB0aGlzLl9wYXJzZUFuaW1hdGlvbihcbiAgICAgICAgICBuYW1lLCBleHByZXNzaW9uLCBzb3VyY2VTcGFuLCBhYnNvbHV0ZU9mZnNldCwga2V5U3BhbiwgdmFsdWVTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycyxcbiAgICAgICAgICB0YXJnZXRQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BhcnNlUHJvcGVydHlBc3QoXG4gICAgICAgICAgbmFtZSwgdGhpcy5fcGFyc2VCaW5kaW5nKGV4cHJlc3Npb24sIGlzSG9zdCwgdmFsdWVTcGFuIHx8IHNvdXJjZVNwYW4sIGFic29sdXRlT2Zmc2V0KSxcbiAgICAgICAgICBzb3VyY2VTcGFuLCBrZXlTcGFuLCB2YWx1ZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLCB0YXJnZXRQcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VQcm9wZXJ0eUludGVycG9sYXRpb24oXG4gICAgICBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHZhbHVlU3BhbjogUGFyc2VTb3VyY2VTcGFufHVuZGVmaW5lZCwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sXG4gICAgICB0YXJnZXRQcm9wczogUGFyc2VkUHJvcGVydHlbXSwga2V5U3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgaW50ZXJwb2xhdGVkVG9rZW5zOiBJbnRlcnBvbGF0ZWRBdHRyaWJ1dGVUb2tlbltdfEludGVycG9sYXRlZFRleHRUb2tlbltdfG51bGwpOiBib29sZWFuIHtcbiAgICBjb25zdCBleHByID0gdGhpcy5wYXJzZUludGVycG9sYXRpb24odmFsdWUsIHZhbHVlU3BhbiB8fCBzb3VyY2VTcGFuLCBpbnRlcnBvbGF0ZWRUb2tlbnMpO1xuICAgIGlmIChleHByKSB7XG4gICAgICB0aGlzLl9wYXJzZVByb3BlcnR5QXN0KFxuICAgICAgICAgIG5hbWUsIGV4cHIsIHNvdXJjZVNwYW4sIGtleVNwYW4sIHZhbHVlU3BhbiwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMsIHRhcmdldFByb3BzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVByb3BlcnR5QXN0KFxuICAgICAgbmFtZTogc3RyaW5nLCBhc3Q6IEFTVFdpdGhTb3VyY2UsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbiwga2V5U3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgdmFsdWVTcGFuOiBQYXJzZVNvdXJjZVNwYW58dW5kZWZpbmVkLCB0YXJnZXRNYXRjaGFibGVBdHRyczogc3RyaW5nW11bXSxcbiAgICAgIHRhcmdldFByb3BzOiBQYXJzZWRQcm9wZXJ0eVtdKSB7XG4gICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMucHVzaChbbmFtZSwgYXN0LnNvdXJjZSFdKTtcbiAgICB0YXJnZXRQcm9wcy5wdXNoKFxuICAgICAgICBuZXcgUGFyc2VkUHJvcGVydHkobmFtZSwgYXN0LCBQYXJzZWRQcm9wZXJ0eVR5cGUuREVGQVVMVCwgc291cmNlU3Bhbiwga2V5U3BhbiwgdmFsdWVTcGFuKSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUFuaW1hdGlvbihcbiAgICAgIG5hbWU6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nfG51bGwsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgYWJzb2x1dGVPZmZzZXQ6IG51bWJlcixcbiAgICAgIGtleVNwYW46IFBhcnNlU291cmNlU3BhbiwgdmFsdWVTcGFuOiBQYXJzZVNvdXJjZVNwYW58dW5kZWZpbmVkLFxuICAgICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sIHRhcmdldFByb3BzOiBQYXJzZWRQcm9wZXJ0eVtdKSB7XG4gICAgaWYgKG5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcignQW5pbWF0aW9uIHRyaWdnZXIgaXMgbWlzc2luZycsIHNvdXJjZVNwYW4pO1xuICAgIH1cblxuICAgIC8vIFRoaXMgd2lsbCBvY2N1ciB3aGVuIGEgQHRyaWdnZXIgaXMgbm90IHBhaXJlZCB3aXRoIGFuIGV4cHJlc3Npb24uXG4gICAgLy8gRm9yIGFuaW1hdGlvbnMgaXQgaXMgdmFsaWQgdG8gbm90IGhhdmUgYW4gZXhwcmVzc2lvbiBzaW5jZSAqL3ZvaWRcbiAgICAvLyBzdGF0ZXMgd2lsbCBiZSBhcHBsaWVkIGJ5IGFuZ3VsYXIgd2hlbiB0aGUgZWxlbWVudCBpcyBhdHRhY2hlZC9kZXRhY2hlZFxuICAgIGNvbnN0IGFzdCA9IHRoaXMuX3BhcnNlQmluZGluZyhcbiAgICAgICAgZXhwcmVzc2lvbiB8fCAndW5kZWZpbmVkJywgZmFsc2UsIHZhbHVlU3BhbiB8fCBzb3VyY2VTcGFuLCBhYnNvbHV0ZU9mZnNldCk7XG4gICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMucHVzaChbbmFtZSwgYXN0LnNvdXJjZSFdKTtcbiAgICB0YXJnZXRQcm9wcy5wdXNoKG5ldyBQYXJzZWRQcm9wZXJ0eShcbiAgICAgICAgbmFtZSwgYXN0LCBQYXJzZWRQcm9wZXJ0eVR5cGUuQU5JTUFUSU9OLCBzb3VyY2VTcGFuLCBrZXlTcGFuLCB2YWx1ZVNwYW4pKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlQmluZGluZyhcbiAgICAgIHZhbHVlOiBzdHJpbmcsIGlzSG9zdEJpbmRpbmc6IGJvb2xlYW4sIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIGFic29sdXRlT2Zmc2V0OiBudW1iZXIpOiBBU1RXaXRoU291cmNlIHtcbiAgICBjb25zdCBzb3VyY2VJbmZvID0gKHNvdXJjZVNwYW4gJiYgc291cmNlU3Bhbi5zdGFydCB8fCAnKHVua25vd24pJykudG9TdHJpbmcoKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBhc3QgPSBpc0hvc3RCaW5kaW5nID9cbiAgICAgICAgICB0aGlzLl9leHByUGFyc2VyLnBhcnNlU2ltcGxlQmluZGluZyhcbiAgICAgICAgICAgICAgdmFsdWUsIHNvdXJjZUluZm8sIGFic29sdXRlT2Zmc2V0LCB0aGlzLl9pbnRlcnBvbGF0aW9uQ29uZmlnKSA6XG4gICAgICAgICAgdGhpcy5fZXhwclBhcnNlci5wYXJzZUJpbmRpbmcoXG4gICAgICAgICAgICAgIHZhbHVlLCBzb3VyY2VJbmZvLCBhYnNvbHV0ZU9mZnNldCwgdGhpcy5faW50ZXJwb2xhdGlvbkNvbmZpZyk7XG4gICAgICBpZiAoYXN0KSB0aGlzLl9yZXBvcnRFeHByZXNzaW9uUGFyc2VyRXJyb3JzKGFzdC5lcnJvcnMsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIGFzdDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgJHtlfWAsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIHRoaXMuX2V4cHJQYXJzZXIud3JhcExpdGVyYWxQcmltaXRpdmUoJ0VSUk9SJywgc291cmNlSW5mbywgYWJzb2x1dGVPZmZzZXQpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUJvdW5kRWxlbWVudFByb3BlcnR5KFxuICAgICAgZWxlbWVudFNlbGVjdG9yOiBzdHJpbmcsIGJvdW5kUHJvcDogUGFyc2VkUHJvcGVydHksIHNraXBWYWxpZGF0aW9uOiBib29sZWFuID0gZmFsc2UsXG4gICAgICBtYXBQcm9wZXJ0eU5hbWU6IGJvb2xlYW4gPSB0cnVlKTogQm91bmRFbGVtZW50UHJvcGVydHkge1xuICAgIGlmIChib3VuZFByb3AuaXNBbmltYXRpb24pIHtcbiAgICAgIHJldHVybiBuZXcgQm91bmRFbGVtZW50UHJvcGVydHkoXG4gICAgICAgICAgYm91bmRQcm9wLm5hbWUsIEJpbmRpbmdUeXBlLkFuaW1hdGlvbiwgU2VjdXJpdHlDb250ZXh0Lk5PTkUsIGJvdW5kUHJvcC5leHByZXNzaW9uLCBudWxsLFxuICAgICAgICAgIGJvdW5kUHJvcC5zb3VyY2VTcGFuLCBib3VuZFByb3Aua2V5U3BhbiwgYm91bmRQcm9wLnZhbHVlU3Bhbik7XG4gICAgfVxuXG4gICAgbGV0IHVuaXQ6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgICBsZXQgYmluZGluZ1R5cGU6IEJpbmRpbmdUeXBlID0gdW5kZWZpbmVkITtcbiAgICBsZXQgYm91bmRQcm9wZXJ0eU5hbWU6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgICBjb25zdCBwYXJ0cyA9IGJvdW5kUHJvcC5uYW1lLnNwbGl0KFBST1BFUlRZX1BBUlRTX1NFUEFSQVRPUik7XG4gICAgbGV0IHNlY3VyaXR5Q29udGV4dHM6IFNlY3VyaXR5Q29udGV4dFtdID0gdW5kZWZpbmVkITtcblxuICAgIC8vIENoZWNrIGZvciBzcGVjaWFsIGNhc2VzIChwcmVmaXggc3R5bGUsIGF0dHIsIGNsYXNzKVxuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAocGFydHNbMF0gPT0gQVRUUklCVVRFX1BSRUZJWCkge1xuICAgICAgICBib3VuZFByb3BlcnR5TmFtZSA9IHBhcnRzLnNsaWNlKDEpLmpvaW4oUFJPUEVSVFlfUEFSVFNfU0VQQVJBVE9SKTtcbiAgICAgICAgaWYgKCFza2lwVmFsaWRhdGlvbikge1xuICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlUHJvcGVydHlPckF0dHJpYnV0ZU5hbWUoYm91bmRQcm9wZXJ0eU5hbWUsIGJvdW5kUHJvcC5zb3VyY2VTcGFuLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBzZWN1cml0eUNvbnRleHRzID0gY2FsY1Bvc3NpYmxlU2VjdXJpdHlDb250ZXh0cyhcbiAgICAgICAgICAgIHRoaXMuX3NjaGVtYVJlZ2lzdHJ5LCBlbGVtZW50U2VsZWN0b3IsIGJvdW5kUHJvcGVydHlOYW1lLCB0cnVlKTtcblxuICAgICAgICBjb25zdCBuc1NlcGFyYXRvcklkeCA9IGJvdW5kUHJvcGVydHlOYW1lLmluZGV4T2YoJzonKTtcbiAgICAgICAgaWYgKG5zU2VwYXJhdG9ySWR4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBucyA9IGJvdW5kUHJvcGVydHlOYW1lLnN1YnN0cmluZygwLCBuc1NlcGFyYXRvcklkeCk7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IGJvdW5kUHJvcGVydHlOYW1lLnN1YnN0cmluZyhuc1NlcGFyYXRvcklkeCArIDEpO1xuICAgICAgICAgIGJvdW5kUHJvcGVydHlOYW1lID0gbWVyZ2VOc0FuZE5hbWUobnMsIG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5BdHRyaWJ1dGU7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRzWzBdID09IENMQVNTX1BSRUZJWCkge1xuICAgICAgICBib3VuZFByb3BlcnR5TmFtZSA9IHBhcnRzWzFdO1xuICAgICAgICBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLkNsYXNzO1xuICAgICAgICBzZWN1cml0eUNvbnRleHRzID0gW1NlY3VyaXR5Q29udGV4dC5OT05FXTtcbiAgICAgIH0gZWxzZSBpZiAocGFydHNbMF0gPT0gU1RZTEVfUFJFRklYKSB7XG4gICAgICAgIHVuaXQgPSBwYXJ0cy5sZW5ndGggPiAyID8gcGFydHNbMl0gOiBudWxsO1xuICAgICAgICBib3VuZFByb3BlcnR5TmFtZSA9IHBhcnRzWzFdO1xuICAgICAgICBiaW5kaW5nVHlwZSA9IEJpbmRpbmdUeXBlLlN0eWxlO1xuICAgICAgICBzZWN1cml0eUNvbnRleHRzID0gW1NlY3VyaXR5Q29udGV4dC5TVFlMRV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgbm90IGEgc3BlY2lhbCBjYXNlLCB1c2UgdGhlIGZ1bGwgcHJvcGVydHkgbmFtZVxuICAgIGlmIChib3VuZFByb3BlcnR5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFwcGVkUHJvcE5hbWUgPSB0aGlzLl9zY2hlbWFSZWdpc3RyeS5nZXRNYXBwZWRQcm9wTmFtZShib3VuZFByb3AubmFtZSk7XG4gICAgICBib3VuZFByb3BlcnR5TmFtZSA9IG1hcFByb3BlcnR5TmFtZSA/IG1hcHBlZFByb3BOYW1lIDogYm91bmRQcm9wLm5hbWU7XG4gICAgICBzZWN1cml0eUNvbnRleHRzID0gY2FsY1Bvc3NpYmxlU2VjdXJpdHlDb250ZXh0cyhcbiAgICAgICAgICB0aGlzLl9zY2hlbWFSZWdpc3RyeSwgZWxlbWVudFNlbGVjdG9yLCBtYXBwZWRQcm9wTmFtZSwgZmFsc2UpO1xuICAgICAgYmluZGluZ1R5cGUgPSBCaW5kaW5nVHlwZS5Qcm9wZXJ0eTtcbiAgICAgIGlmICghc2tpcFZhbGlkYXRpb24pIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVQcm9wZXJ0eU9yQXR0cmlidXRlTmFtZShtYXBwZWRQcm9wTmFtZSwgYm91bmRQcm9wLnNvdXJjZVNwYW4sIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJvdW5kRWxlbWVudFByb3BlcnR5KFxuICAgICAgICBib3VuZFByb3BlcnR5TmFtZSwgYmluZGluZ1R5cGUsIHNlY3VyaXR5Q29udGV4dHNbMF0sIGJvdW5kUHJvcC5leHByZXNzaW9uLCB1bml0LFxuICAgICAgICBib3VuZFByb3Auc291cmNlU3BhbiwgYm91bmRQcm9wLmtleVNwYW4sIGJvdW5kUHJvcC52YWx1ZVNwYW4pO1xuICB9XG5cbiAgLy8gVE9ETzoga2V5U3BhbiBzaG91bGQgYmUgcmVxdWlyZWQgYnV0IHdhcyBtYWRlIG9wdGlvbmFsIHRvIGF2b2lkIGNoYW5naW5nIFZFIHBhcnNlci5cbiAgcGFyc2VFdmVudChcbiAgICAgIG5hbWU6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nLCBpc0Fzc2lnbm1lbnRFdmVudDogYm9vbGVhbiwgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgaGFuZGxlclNwYW46IFBhcnNlU291cmNlU3BhbiwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sIHRhcmdldEV2ZW50czogUGFyc2VkRXZlbnRbXSxcbiAgICAgIGtleVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIGlmIChuYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoYEV2ZW50IG5hbWUgaXMgbWlzc2luZyBpbiBiaW5kaW5nYCwgc291cmNlU3Bhbik7XG4gICAgfVxuXG4gICAgaWYgKGlzQW5pbWF0aW9uTGFiZWwobmFtZSkpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDEpO1xuICAgICAgaWYgKGtleVNwYW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXlTcGFuID0gbW92ZVBhcnNlU291cmNlU3BhbihcbiAgICAgICAgICAgIGtleVNwYW4sIG5ldyBBYnNvbHV0ZVNvdXJjZVNwYW4oa2V5U3Bhbi5zdGFydC5vZmZzZXQgKyAxLCBrZXlTcGFuLmVuZC5vZmZzZXQpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3BhcnNlQW5pbWF0aW9uRXZlbnQoXG4gICAgICAgICAgbmFtZSwgZXhwcmVzc2lvbiwgaXNBc3NpZ25tZW50RXZlbnQsIHNvdXJjZVNwYW4sIGhhbmRsZXJTcGFuLCB0YXJnZXRFdmVudHMsIGtleVNwYW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wYXJzZVJlZ3VsYXJFdmVudChcbiAgICAgICAgICBuYW1lLCBleHByZXNzaW9uLCBpc0Fzc2lnbm1lbnRFdmVudCwgc291cmNlU3BhbiwgaGFuZGxlclNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLFxuICAgICAgICAgIHRhcmdldEV2ZW50cywga2V5U3Bhbik7XG4gICAgfVxuICB9XG5cbiAgY2FsY1Bvc3NpYmxlU2VjdXJpdHlDb250ZXh0cyhzZWxlY3Rvcjogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBpc0F0dHJpYnV0ZTogYm9vbGVhbik6XG4gICAgICBTZWN1cml0eUNvbnRleHRbXSB7XG4gICAgY29uc3QgcHJvcCA9IHRoaXMuX3NjaGVtYVJlZ2lzdHJ5LmdldE1hcHBlZFByb3BOYW1lKHByb3BOYW1lKTtcbiAgICByZXR1cm4gY2FsY1Bvc3NpYmxlU2VjdXJpdHlDb250ZXh0cyh0aGlzLl9zY2hlbWFSZWdpc3RyeSwgc2VsZWN0b3IsIHByb3AsIGlzQXR0cmlidXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlQW5pbWF0aW9uRXZlbnQoXG4gICAgICBuYW1lOiBzdHJpbmcsIGV4cHJlc3Npb246IHN0cmluZywgaXNBc3NpZ25tZW50RXZlbnQ6IGJvb2xlYW4sIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIGhhbmRsZXJTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHRhcmdldEV2ZW50czogUGFyc2VkRXZlbnRbXSwga2V5U3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHNwbGl0QXRQZXJpb2QobmFtZSwgW25hbWUsICcnXSk7XG4gICAgY29uc3QgZXZlbnROYW1lID0gbWF0Y2hlc1swXTtcbiAgICBjb25zdCBwaGFzZSA9IG1hdGNoZXNbMV0udG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBhc3QgPSB0aGlzLl9wYXJzZUFjdGlvbihleHByZXNzaW9uLCBpc0Fzc2lnbm1lbnRFdmVudCwgaGFuZGxlclNwYW4pO1xuICAgIHRhcmdldEV2ZW50cy5wdXNoKG5ldyBQYXJzZWRFdmVudChcbiAgICAgICAgZXZlbnROYW1lLCBwaGFzZSwgUGFyc2VkRXZlbnRUeXBlLkFuaW1hdGlvbiwgYXN0LCBzb3VyY2VTcGFuLCBoYW5kbGVyU3Bhbiwga2V5U3BhbikpO1xuXG4gICAgaWYgKGV2ZW50TmFtZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGBBbmltYXRpb24gZXZlbnQgbmFtZSBpcyBtaXNzaW5nIGluIGJpbmRpbmdgLCBzb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgaWYgKHBoYXNlKSB7XG4gICAgICBpZiAocGhhc2UgIT09ICdzdGFydCcgJiYgcGhhc2UgIT09ICdkb25lJykge1xuICAgICAgICB0aGlzLl9yZXBvcnRFcnJvcihcbiAgICAgICAgICAgIGBUaGUgcHJvdmlkZWQgYW5pbWF0aW9uIG91dHB1dCBwaGFzZSB2YWx1ZSBcIiR7cGhhc2V9XCIgZm9yIFwiQCR7XG4gICAgICAgICAgICAgICAgZXZlbnROYW1lfVwiIGlzIG5vdCBzdXBwb3J0ZWQgKHVzZSBzdGFydCBvciBkb25lKWAsXG4gICAgICAgICAgICBzb3VyY2VTcGFuKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoXG4gICAgICAgICAgYFRoZSBhbmltYXRpb24gdHJpZ2dlciBvdXRwdXQgZXZlbnQgKEAke1xuICAgICAgICAgICAgICBldmVudE5hbWV9KSBpcyBtaXNzaW5nIGl0cyBwaGFzZSB2YWx1ZSBuYW1lIChzdGFydCBvciBkb25lIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkKWAsXG4gICAgICAgICAgc291cmNlU3Bhbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VSZWd1bGFyRXZlbnQoXG4gICAgICBuYW1lOiBzdHJpbmcsIGV4cHJlc3Npb246IHN0cmluZywgaXNBc3NpZ25tZW50RXZlbnQ6IGJvb2xlYW4sIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIGhhbmRsZXJTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdLCB0YXJnZXRFdmVudHM6IFBhcnNlZEV2ZW50W10sXG4gICAgICBrZXlTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHtcbiAgICAvLyBsb25nIGZvcm1hdDogJ3RhcmdldDogZXZlbnROYW1lJ1xuICAgIGNvbnN0IFt0YXJnZXQsIGV2ZW50TmFtZV0gPSBzcGxpdEF0Q29sb24obmFtZSwgW251bGwhLCBuYW1lXSk7XG4gICAgY29uc3QgYXN0ID0gdGhpcy5fcGFyc2VBY3Rpb24oZXhwcmVzc2lvbiwgaXNBc3NpZ25tZW50RXZlbnQsIGhhbmRsZXJTcGFuKTtcbiAgICB0YXJnZXRNYXRjaGFibGVBdHRycy5wdXNoKFtuYW1lISwgYXN0LnNvdXJjZSFdKTtcbiAgICB0YXJnZXRFdmVudHMucHVzaChuZXcgUGFyc2VkRXZlbnQoXG4gICAgICAgIGV2ZW50TmFtZSwgdGFyZ2V0LCBQYXJzZWRFdmVudFR5cGUuUmVndWxhciwgYXN0LCBzb3VyY2VTcGFuLCBoYW5kbGVyU3Bhbiwga2V5U3BhbikpO1xuICAgIC8vIERvbid0IGRldGVjdCBkaXJlY3RpdmVzIGZvciBldmVudCBuYW1lcyBmb3Igbm93LFxuICAgIC8vIHNvIGRvbid0IGFkZCB0aGUgZXZlbnQgbmFtZSB0byB0aGUgbWF0Y2hhYmxlQXR0cnNcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlQWN0aW9uKHZhbHVlOiBzdHJpbmcsIGlzQXNzaWdubWVudEV2ZW50OiBib29sZWFuLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOlxuICAgICAgQVNUV2l0aFNvdXJjZSB7XG4gICAgY29uc3Qgc291cmNlSW5mbyA9IChzb3VyY2VTcGFuICYmIHNvdXJjZVNwYW4uc3RhcnQgfHwgJyh1bmtub3duJykudG9TdHJpbmcoKTtcbiAgICBjb25zdCBhYnNvbHV0ZU9mZnNldCA9IChzb3VyY2VTcGFuICYmIHNvdXJjZVNwYW4uc3RhcnQpID8gc291cmNlU3Bhbi5zdGFydC5vZmZzZXQgOiAwO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFzdCA9IHRoaXMuX2V4cHJQYXJzZXIucGFyc2VBY3Rpb24oXG4gICAgICAgICAgdmFsdWUsIGlzQXNzaWdubWVudEV2ZW50LCBzb3VyY2VJbmZvLCBhYnNvbHV0ZU9mZnNldCwgdGhpcy5faW50ZXJwb2xhdGlvbkNvbmZpZyk7XG4gICAgICBpZiAoYXN0KSB7XG4gICAgICAgIHRoaXMuX3JlcG9ydEV4cHJlc3Npb25QYXJzZXJFcnJvcnMoYXN0LmVycm9ycywgc291cmNlU3Bhbik7XG4gICAgICB9XG4gICAgICBpZiAoIWFzdCB8fCBhc3QuYXN0IGluc3RhbmNlb2YgRW1wdHlFeHByKSB7XG4gICAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGBFbXB0eSBleHByZXNzaW9ucyBhcmUgbm90IGFsbG93ZWRgLCBzb3VyY2VTcGFuKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cHJQYXJzZXIud3JhcExpdGVyYWxQcmltaXRpdmUoJ0VSUk9SJywgc291cmNlSW5mbywgYWJzb2x1dGVPZmZzZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFzdDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgJHtlfWAsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIHRoaXMuX2V4cHJQYXJzZXIud3JhcExpdGVyYWxQcmltaXRpdmUoJ0VSUk9SJywgc291cmNlSW5mbywgYWJzb2x1dGVPZmZzZXQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlcG9ydEVycm9yKFxuICAgICAgbWVzc2FnZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICBsZXZlbDogUGFyc2VFcnJvckxldmVsID0gUGFyc2VFcnJvckxldmVsLkVSUk9SKSB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChuZXcgUGFyc2VFcnJvcihzb3VyY2VTcGFuLCBtZXNzYWdlLCBsZXZlbCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVwb3J0RXhwcmVzc2lvblBhcnNlckVycm9ycyhlcnJvcnM6IFBhcnNlckVycm9yW10sIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIGZvciAoY29uc3QgZXJyb3Igb2YgZXJyb3JzKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihlcnJvci5tZXNzYWdlLCBzb3VyY2VTcGFuKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHByb3BOYW1lIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSAvIGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0gc291cmNlU3BhblxuICAgKiBAcGFyYW0gaXNBdHRyIHRydWUgd2hlbiBiaW5kaW5nIHRvIGFuIGF0dHJpYnV0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfdmFsaWRhdGVQcm9wZXJ0eU9yQXR0cmlidXRlTmFtZShcbiAgICAgIHByb3BOYW1lOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgaXNBdHRyOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcmVwb3J0ID0gaXNBdHRyID8gdGhpcy5fc2NoZW1hUmVnaXN0cnkudmFsaWRhdGVBdHRyaWJ1dGUocHJvcE5hbWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY2hlbWFSZWdpc3RyeS52YWxpZGF0ZVByb3BlcnR5KHByb3BOYW1lKTtcbiAgICBpZiAocmVwb3J0LmVycm9yKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihyZXBvcnQubXNnISwgc291cmNlU3BhbiwgUGFyc2VFcnJvckxldmVsLkVSUk9SKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBpcGVDb2xsZWN0b3IgZXh0ZW5kcyBSZWN1cnNpdmVBc3RWaXNpdG9yIHtcbiAgcGlwZXMgPSBuZXcgTWFwPHN0cmluZywgQmluZGluZ1BpcGU+KCk7XG4gIG92ZXJyaWRlIHZpc2l0UGlwZShhc3Q6IEJpbmRpbmdQaXBlLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMucGlwZXMuc2V0KGFzdC5uYW1lLCBhc3QpO1xuICAgIGFzdC5leHAudmlzaXQodGhpcyk7XG4gICAgdGhpcy52aXNpdEFsbChhc3QuYXJncywgY29udGV4dCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNBbmltYXRpb25MYWJlbChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG5hbWVbMF0gPT0gJ0AnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY1Bvc3NpYmxlU2VjdXJpdHlDb250ZXh0cyhcbiAgICByZWdpc3RyeTogRWxlbWVudFNjaGVtYVJlZ2lzdHJ5LCBzZWxlY3Rvcjogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLFxuICAgIGlzQXR0cmlidXRlOiBib29sZWFuKTogU2VjdXJpdHlDb250ZXh0W10ge1xuICBjb25zdCBjdHhzOiBTZWN1cml0eUNvbnRleHRbXSA9IFtdO1xuICBDc3NTZWxlY3Rvci5wYXJzZShzZWxlY3RvcikuZm9yRWFjaCgoc2VsZWN0b3IpID0+IHtcbiAgICBjb25zdCBlbGVtZW50TmFtZXMgPSBzZWxlY3Rvci5lbGVtZW50ID8gW3NlbGVjdG9yLmVsZW1lbnRdIDogcmVnaXN0cnkuYWxsS25vd25FbGVtZW50TmFtZXMoKTtcbiAgICBjb25zdCBub3RFbGVtZW50TmFtZXMgPVxuICAgICAgICBuZXcgU2V0KHNlbGVjdG9yLm5vdFNlbGVjdG9ycy5maWx0ZXIoc2VsZWN0b3IgPT4gc2VsZWN0b3IuaXNFbGVtZW50U2VsZWN0b3IoKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoc2VsZWN0b3IpID0+IHNlbGVjdG9yLmVsZW1lbnQpKTtcbiAgICBjb25zdCBwb3NzaWJsZUVsZW1lbnROYW1lcyA9XG4gICAgICAgIGVsZW1lbnROYW1lcy5maWx0ZXIoZWxlbWVudE5hbWUgPT4gIW5vdEVsZW1lbnROYW1lcy5oYXMoZWxlbWVudE5hbWUpKTtcblxuICAgIGN0eHMucHVzaCguLi5wb3NzaWJsZUVsZW1lbnROYW1lcy5tYXAoXG4gICAgICAgIGVsZW1lbnROYW1lID0+IHJlZ2lzdHJ5LnNlY3VyaXR5Q29udGV4dChlbGVtZW50TmFtZSwgcHJvcE5hbWUsIGlzQXR0cmlidXRlKSkpO1xuICB9KTtcbiAgcmV0dXJuIGN0eHMubGVuZ3RoID09PSAwID8gW1NlY3VyaXR5Q29udGV4dC5OT05FXSA6IEFycmF5LmZyb20obmV3IFNldChjdHhzKSkuc29ydCgpO1xufVxuXG4vKipcbiAqIENvbXB1dGUgYSBuZXcgUGFyc2VTb3VyY2VTcGFuIGJhc2VkIG9mZiBhbiBvcmlnaW5hbCBgc291cmNlU3BhbmAgYnkgdXNpbmdcbiAqIGFic29sdXRlIG9mZnNldHMgZnJvbSB0aGUgc3BlY2lmaWVkIGBhYnNvbHV0ZVNwYW5gLlxuICpcbiAqIEBwYXJhbSBzb3VyY2VTcGFuIG9yaWdpbmFsIHNvdXJjZSBzcGFuXG4gKiBAcGFyYW0gYWJzb2x1dGVTcGFuIGFic29sdXRlIHNvdXJjZSBzcGFuIHRvIG1vdmUgdG9cbiAqL1xuZnVuY3Rpb24gbW92ZVBhcnNlU291cmNlU3BhbihcbiAgICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIGFic29sdXRlU3BhbjogQWJzb2x1dGVTb3VyY2VTcGFuKTogUGFyc2VTb3VyY2VTcGFuIHtcbiAgLy8gVGhlIGRpZmZlcmVuY2Ugb2YgdHdvIGFic29sdXRlIG9mZnNldHMgcHJvdmlkZSB0aGUgcmVsYXRpdmUgb2Zmc2V0XG4gIGNvbnN0IHN0YXJ0RGlmZiA9IGFic29sdXRlU3Bhbi5zdGFydCAtIHNvdXJjZVNwYW4uc3RhcnQub2Zmc2V0O1xuICBjb25zdCBlbmREaWZmID0gYWJzb2x1dGVTcGFuLmVuZCAtIHNvdXJjZVNwYW4uZW5kLm9mZnNldDtcbiAgcmV0dXJuIG5ldyBQYXJzZVNvdXJjZVNwYW4oXG4gICAgICBzb3VyY2VTcGFuLnN0YXJ0Lm1vdmVCeShzdGFydERpZmYpLCBzb3VyY2VTcGFuLmVuZC5tb3ZlQnkoZW5kRGlmZiksXG4gICAgICBzb3VyY2VTcGFuLmZ1bGxTdGFydC5tb3ZlQnkoc3RhcnREaWZmKSwgc291cmNlU3Bhbi5kZXRhaWxzKTtcbn1cbiJdfQ==