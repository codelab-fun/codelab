import { mapLiteral } from '../../../output/map_util';
import * as o from '../../../output/output_ast';
import { serializeIcuNode } from './icu_serializer';
import { i18nMetaToJSDoc } from './meta';
import { formatI18nPlaceholderName, formatI18nPlaceholderNamesInMap } from './util';
/** Closure uses `goog.getMsg(message)` to lookup translations */
const GOOG_GET_MSG = 'goog.getMsg';
/**
 * Generates a `goog.getMsg()` statement and reassignment. The template:
 *
 * ```html
 * <div i18n>Sent from {{ sender }} to <span class="receiver">{{ receiver }}</span></div>
 * ```
 *
 * Generates:
 *
 * ```typescript
 * const MSG_FOO = goog.getMsg(
 *   // Message template.
 *   'Sent from {$interpolation} to {$startTagSpan}{$interpolation_1}{$closeTagSpan}.',
 *   // Placeholder values, set to magic strings which get replaced by the Angular runtime.
 *   {
 *     'interpolation': '\uFFFD0\uFFFD',
 *     'startTagSpan': '\uFFFD1\uFFFD',
 *     'interpolation_1': '\uFFFD2\uFFFD',
 *     'closeTagSpan': '\uFFFD3\uFFFD',
 *   },
 *   // Options bag.
 *   {
 *     // Maps each placeholder to the original Angular source code which generates it's value.
 *     original_code: {
 *       'interpolation': '{{ sender }}',
 *       'startTagSpan': '<span class="receiver">',
 *       'interpolation_1': '{{ receiver }}',
 *       'closeTagSpan': '</span>',
 *     },
 *   },
 * );
 * const I18N_0 = MSG_FOO;
 * ```
 */
export function createGoogleGetMsgStatements(variable, message, closureVar, placeholderValues) {
    const messageString = serializeI18nMessageForGetMsg(message);
    const args = [o.literal(messageString)];
    if (Object.keys(placeholderValues).length) {
        // Message template parameters containing the magic strings replaced by the Angular runtime with
        // real data, e.g. `{'interpolation': '\uFFFD0\uFFFD'}`.
        args.push(mapLiteral(formatI18nPlaceholderNamesInMap(placeholderValues, true /* useCamelCase */), true /* quoted */));
        // Message options object, which contains original source code for placeholders (as they are
        // present in a template, e.g.
        // `{original_code: {'interpolation': '{{ name }}', 'startTagSpan': '<span>'}}`.
        args.push(mapLiteral({
            original_code: o.literalMap(Object.keys(placeholderValues)
                .map((param) => ({
                key: formatI18nPlaceholderName(param),
                quoted: true,
                value: message.placeholders[param] ?
                    // Get source span for typical placeholder if it exists.
                    o.literal(message.placeholders[param].sourceSpan.toString()) :
                    // Otherwise must be an ICU expression, get it's source span.
                    o.literal(message.placeholderToMessage[param]
                        .nodes.map((node) => node.sourceSpan.toString())
                        .join('')),
            }))),
        }));
    }
    // /**
    //  * @desc description of message
    //  * @meaning meaning of message
    //  */
    // const MSG_... = goog.getMsg(..);
    // I18N_X = MSG_...;
    const googGetMsgStmt = closureVar.set(o.variable(GOOG_GET_MSG).callFn(args)).toConstDecl();
    googGetMsgStmt.addLeadingComment(i18nMetaToJSDoc(message));
    const i18nAssignmentStmt = new o.ExpressionStatement(variable.set(closureVar));
    return [googGetMsgStmt, i18nAssignmentStmt];
}
/**
 * This visitor walks over i18n tree and generates its string representation, including ICUs and
 * placeholders in `{$placeholder}` (for plain messages) or `{PLACEHOLDER}` (inside ICUs) format.
 */
class GetMsgSerializerVisitor {
    formatPh(value) {
        return `{$${formatI18nPlaceholderName(value)}}`;
    }
    visitText(text) {
        return text.value;
    }
    visitContainer(container) {
        return container.children.map(child => child.visit(this)).join('');
    }
    visitIcu(icu) {
        return serializeIcuNode(icu);
    }
    visitTagPlaceholder(ph) {
        return ph.isVoid ?
            this.formatPh(ph.startName) :
            `${this.formatPh(ph.startName)}${ph.children.map(child => child.visit(this)).join('')}${this.formatPh(ph.closeName)}`;
    }
    visitPlaceholder(ph) {
        return this.formatPh(ph.name);
    }
    visitIcuPlaceholder(ph, context) {
        return this.formatPh(ph.name);
    }
}
const serializerVisitor = new GetMsgSerializerVisitor();
export function serializeI18nMessageForGetMsg(message) {
    return message.nodes.map(node => node.visit(serializerVisitor, null)).join('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0X21zZ191dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3ZpZXcvaTE4bi9nZXRfbXNnX3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEtBQUssQ0FBQyxNQUFNLDRCQUE0QixDQUFDO0FBRWhELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkMsT0FBTyxFQUFDLHlCQUF5QixFQUFFLCtCQUErQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBRWxGLGlFQUFpRTtBQUNqRSxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUM7QUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FDeEMsUUFBdUIsRUFBRSxPQUFxQixFQUFFLFVBQXlCLEVBQ3pFLGlCQUFpRDtJQUNuRCxNQUFNLGFBQWEsR0FBRyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFpQixDQUFDLENBQUM7SUFDeEQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxFQUFFO1FBQ3pDLGdHQUFnRztRQUNoRyx3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQ2hCLCtCQUErQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUV4Qiw0RkFBNEY7UUFDNUYsOEJBQThCO1FBQzlCLGdGQUFnRjtRQUNoRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQixhQUFhLEVBQ1QsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2lCQUN6QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ1YsR0FBRyxFQUFFLHlCQUF5QixDQUFDLEtBQUssQ0FBQztnQkFDckMsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsd0RBQXdEO29CQUN4RCxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDOUQsNkRBQTZEO29CQUM3RCxDQUFDLENBQUMsT0FBTyxDQUNMLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7eUJBQzlCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7eUJBQy9DLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDWjthQUNWLENBQUMsQ0FBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQyxDQUFDO0tBQ0w7SUFFRCxNQUFNO0lBQ04sa0NBQWtDO0lBQ2xDLGlDQUFpQztJQUNqQyxNQUFNO0lBQ04sbUNBQW1DO0lBQ25DLG9CQUFvQjtJQUNwQixNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0YsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQy9FLE9BQU8sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSx1QkFBdUI7SUFDbkIsUUFBUSxDQUFDLEtBQWE7UUFDNUIsT0FBTyxLQUFLLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDbEQsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFlO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQXlCO1FBQ3RDLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBYTtRQUNwQixPQUFPLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxFQUF1QjtRQUN6QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQ2pGLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQW9CO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELG1CQUFtQixDQUFDLEVBQXVCLEVBQUUsT0FBYTtRQUN4RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQUVELE1BQU0saUJBQWlCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO0FBRXhELE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxPQUFxQjtJQUNqRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNqRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyBpMThuIGZyb20gJy4uLy4uLy4uL2kxOG4vaTE4bl9hc3QnO1xuaW1wb3J0IHttYXBMaXRlcmFsfSBmcm9tICcuLi8uLi8uLi9vdXRwdXQvbWFwX3V0aWwnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi8uLi8uLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5cbmltcG9ydCB7c2VyaWFsaXplSWN1Tm9kZX0gZnJvbSAnLi9pY3Vfc2VyaWFsaXplcic7XG5pbXBvcnQge2kxOG5NZXRhVG9KU0RvY30gZnJvbSAnLi9tZXRhJztcbmltcG9ydCB7Zm9ybWF0STE4blBsYWNlaG9sZGVyTmFtZSwgZm9ybWF0STE4blBsYWNlaG9sZGVyTmFtZXNJbk1hcH0gZnJvbSAnLi91dGlsJztcblxuLyoqIENsb3N1cmUgdXNlcyBgZ29vZy5nZXRNc2cobWVzc2FnZSlgIHRvIGxvb2t1cCB0cmFuc2xhdGlvbnMgKi9cbmNvbnN0IEdPT0dfR0VUX01TRyA9ICdnb29nLmdldE1zZyc7XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgYGdvb2cuZ2V0TXNnKClgIHN0YXRlbWVudCBhbmQgcmVhc3NpZ25tZW50LiBUaGUgdGVtcGxhdGU6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBpMThuPlNlbnQgZnJvbSB7eyBzZW5kZXIgfX0gdG8gPHNwYW4gY2xhc3M9XCJyZWNlaXZlclwiPnt7IHJlY2VpdmVyIH19PC9zcGFuPjwvZGl2PlxuICogYGBgXG4gKlxuICogR2VuZXJhdGVzOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IE1TR19GT08gPSBnb29nLmdldE1zZyhcbiAqICAgLy8gTWVzc2FnZSB0ZW1wbGF0ZS5cbiAqICAgJ1NlbnQgZnJvbSB7JGludGVycG9sYXRpb259IHRvIHskc3RhcnRUYWdTcGFufXskaW50ZXJwb2xhdGlvbl8xfXskY2xvc2VUYWdTcGFufS4nLFxuICogICAvLyBQbGFjZWhvbGRlciB2YWx1ZXMsIHNldCB0byBtYWdpYyBzdHJpbmdzIHdoaWNoIGdldCByZXBsYWNlZCBieSB0aGUgQW5ndWxhciBydW50aW1lLlxuICogICB7XG4gKiAgICAgJ2ludGVycG9sYXRpb24nOiAnXFx1RkZGRDBcXHVGRkZEJyxcbiAqICAgICAnc3RhcnRUYWdTcGFuJzogJ1xcdUZGRkQxXFx1RkZGRCcsXG4gKiAgICAgJ2ludGVycG9sYXRpb25fMSc6ICdcXHVGRkZEMlxcdUZGRkQnLFxuICogICAgICdjbG9zZVRhZ1NwYW4nOiAnXFx1RkZGRDNcXHVGRkZEJyxcbiAqICAgfSxcbiAqICAgLy8gT3B0aW9ucyBiYWcuXG4gKiAgIHtcbiAqICAgICAvLyBNYXBzIGVhY2ggcGxhY2Vob2xkZXIgdG8gdGhlIG9yaWdpbmFsIEFuZ3VsYXIgc291cmNlIGNvZGUgd2hpY2ggZ2VuZXJhdGVzIGl0J3MgdmFsdWUuXG4gKiAgICAgb3JpZ2luYWxfY29kZToge1xuICogICAgICAgJ2ludGVycG9sYXRpb24nOiAne3sgc2VuZGVyIH19JyxcbiAqICAgICAgICdzdGFydFRhZ1NwYW4nOiAnPHNwYW4gY2xhc3M9XCJyZWNlaXZlclwiPicsXG4gKiAgICAgICAnaW50ZXJwb2xhdGlvbl8xJzogJ3t7IHJlY2VpdmVyIH19JyxcbiAqICAgICAgICdjbG9zZVRhZ1NwYW4nOiAnPC9zcGFuPicsXG4gKiAgICAgfSxcbiAqICAgfSxcbiAqICk7XG4gKiBjb25zdCBJMThOXzAgPSBNU0dfRk9PO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHb29nbGVHZXRNc2dTdGF0ZW1lbnRzKFxuICAgIHZhcmlhYmxlOiBvLlJlYWRWYXJFeHByLCBtZXNzYWdlOiBpMThuLk1lc3NhZ2UsIGNsb3N1cmVWYXI6IG8uUmVhZFZhckV4cHIsXG4gICAgcGxhY2Vob2xkZXJWYWx1ZXM6IHtbbmFtZTogc3RyaW5nXTogby5FeHByZXNzaW9ufSk6IG8uU3RhdGVtZW50W10ge1xuICBjb25zdCBtZXNzYWdlU3RyaW5nID0gc2VyaWFsaXplSTE4bk1lc3NhZ2VGb3JHZXRNc2cobWVzc2FnZSk7XG4gIGNvbnN0IGFyZ3MgPSBbby5saXRlcmFsKG1lc3NhZ2VTdHJpbmcpIGFzIG8uRXhwcmVzc2lvbl07XG4gIGlmIChPYmplY3Qua2V5cyhwbGFjZWhvbGRlclZhbHVlcykubGVuZ3RoKSB7XG4gICAgLy8gTWVzc2FnZSB0ZW1wbGF0ZSBwYXJhbWV0ZXJzIGNvbnRhaW5pbmcgdGhlIG1hZ2ljIHN0cmluZ3MgcmVwbGFjZWQgYnkgdGhlIEFuZ3VsYXIgcnVudGltZSB3aXRoXG4gICAgLy8gcmVhbCBkYXRhLCBlLmcuIGB7J2ludGVycG9sYXRpb24nOiAnXFx1RkZGRDBcXHVGRkZEJ31gLlxuICAgIGFyZ3MucHVzaChtYXBMaXRlcmFsKFxuICAgICAgICBmb3JtYXRJMThuUGxhY2Vob2xkZXJOYW1lc0luTWFwKHBsYWNlaG9sZGVyVmFsdWVzLCB0cnVlIC8qIHVzZUNhbWVsQ2FzZSAqLyksXG4gICAgICAgIHRydWUgLyogcXVvdGVkICovKSk7XG5cbiAgICAvLyBNZXNzYWdlIG9wdGlvbnMgb2JqZWN0LCB3aGljaCBjb250YWlucyBvcmlnaW5hbCBzb3VyY2UgY29kZSBmb3IgcGxhY2Vob2xkZXJzIChhcyB0aGV5IGFyZVxuICAgIC8vIHByZXNlbnQgaW4gYSB0ZW1wbGF0ZSwgZS5nLlxuICAgIC8vIGB7b3JpZ2luYWxfY29kZTogeydpbnRlcnBvbGF0aW9uJzogJ3t7IG5hbWUgfX0nLCAnc3RhcnRUYWdTcGFuJzogJzxzcGFuPid9fWAuXG4gICAgYXJncy5wdXNoKG1hcExpdGVyYWwoe1xuICAgICAgb3JpZ2luYWxfY29kZTpcbiAgICAgICAgICBvLmxpdGVyYWxNYXAoT2JqZWN0LmtleXMocGxhY2Vob2xkZXJWYWx1ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChwYXJhbSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGZvcm1hdEkxOG5QbGFjZWhvbGRlck5hbWUocGFyYW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1b3RlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbWVzc2FnZS5wbGFjZWhvbGRlcnNbcGFyYW1dID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHNvdXJjZSBzcGFuIGZvciB0eXBpY2FsIHBsYWNlaG9sZGVyIGlmIGl0IGV4aXN0cy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5saXRlcmFsKG1lc3NhZ2UucGxhY2Vob2xkZXJzW3BhcmFtXS5zb3VyY2VTcGFuLnRvU3RyaW5nKCkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIG11c3QgYmUgYW4gSUNVIGV4cHJlc3Npb24sIGdldCBpdCdzIHNvdXJjZSBzcGFuLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmxpdGVyYWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnBsYWNlaG9sZGVyVG9NZXNzYWdlW3BhcmFtXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2Rlcy5tYXAoKG5vZGUpID0+IG5vZGUuc291cmNlU3Bhbi50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSksXG4gICAgfSkpO1xuICB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIEBkZXNjIGRlc2NyaXB0aW9uIG9mIG1lc3NhZ2VcbiAgLy8gICogQG1lYW5pbmcgbWVhbmluZyBvZiBtZXNzYWdlXG4gIC8vICAqL1xuICAvLyBjb25zdCBNU0dfLi4uID0gZ29vZy5nZXRNc2coLi4pO1xuICAvLyBJMThOX1ggPSBNU0dfLi4uO1xuICBjb25zdCBnb29nR2V0TXNnU3RtdCA9IGNsb3N1cmVWYXIuc2V0KG8udmFyaWFibGUoR09PR19HRVRfTVNHKS5jYWxsRm4oYXJncykpLnRvQ29uc3REZWNsKCk7XG4gIGdvb2dHZXRNc2dTdG10LmFkZExlYWRpbmdDb21tZW50KGkxOG5NZXRhVG9KU0RvYyhtZXNzYWdlKSk7XG4gIGNvbnN0IGkxOG5Bc3NpZ25tZW50U3RtdCA9IG5ldyBvLkV4cHJlc3Npb25TdGF0ZW1lbnQodmFyaWFibGUuc2V0KGNsb3N1cmVWYXIpKTtcbiAgcmV0dXJuIFtnb29nR2V0TXNnU3RtdCwgaTE4bkFzc2lnbm1lbnRTdG10XTtcbn1cblxuLyoqXG4gKiBUaGlzIHZpc2l0b3Igd2Fsa3Mgb3ZlciBpMThuIHRyZWUgYW5kIGdlbmVyYXRlcyBpdHMgc3RyaW5nIHJlcHJlc2VudGF0aW9uLCBpbmNsdWRpbmcgSUNVcyBhbmRcbiAqIHBsYWNlaG9sZGVycyBpbiBgeyRwbGFjZWhvbGRlcn1gIChmb3IgcGxhaW4gbWVzc2FnZXMpIG9yIGB7UExBQ0VIT0xERVJ9YCAoaW5zaWRlIElDVXMpIGZvcm1hdC5cbiAqL1xuY2xhc3MgR2V0TXNnU2VyaWFsaXplclZpc2l0b3IgaW1wbGVtZW50cyBpMThuLlZpc2l0b3Ige1xuICBwcml2YXRlIGZvcm1hdFBoKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgeyQke2Zvcm1hdEkxOG5QbGFjZWhvbGRlck5hbWUodmFsdWUpfX1gO1xuICB9XG5cbiAgdmlzaXRUZXh0KHRleHQ6IGkxOG4uVGV4dCk6IGFueSB7XG4gICAgcmV0dXJuIHRleHQudmFsdWU7XG4gIH1cblxuICB2aXNpdENvbnRhaW5lcihjb250YWluZXI6IGkxOG4uQ29udGFpbmVyKTogYW55IHtcbiAgICByZXR1cm4gY29udGFpbmVyLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZC52aXNpdCh0aGlzKSkuam9pbignJyk7XG4gIH1cblxuICB2aXNpdEljdShpY3U6IGkxOG4uSWN1KTogYW55IHtcbiAgICByZXR1cm4gc2VyaWFsaXplSWN1Tm9kZShpY3UpO1xuICB9XG5cbiAgdmlzaXRUYWdQbGFjZWhvbGRlcihwaDogaTE4bi5UYWdQbGFjZWhvbGRlcik6IGFueSB7XG4gICAgcmV0dXJuIHBoLmlzVm9pZCA/XG4gICAgICAgIHRoaXMuZm9ybWF0UGgocGguc3RhcnROYW1lKSA6XG4gICAgICAgIGAke3RoaXMuZm9ybWF0UGgocGguc3RhcnROYW1lKX0ke3BoLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZC52aXNpdCh0aGlzKSkuam9pbignJyl9JHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0UGgocGguY2xvc2VOYW1lKX1gO1xuICB9XG5cbiAgdmlzaXRQbGFjZWhvbGRlcihwaDogaTE4bi5QbGFjZWhvbGRlcik6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0UGgocGgubmFtZSk7XG4gIH1cblxuICB2aXNpdEljdVBsYWNlaG9sZGVyKHBoOiBpMThuLkljdVBsYWNlaG9sZGVyLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXRQaChwaC5uYW1lKTtcbiAgfVxufVxuXG5jb25zdCBzZXJpYWxpemVyVmlzaXRvciA9IG5ldyBHZXRNc2dTZXJpYWxpemVyVmlzaXRvcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplSTE4bk1lc3NhZ2VGb3JHZXRNc2cobWVzc2FnZTogaTE4bi5NZXNzYWdlKTogc3RyaW5nIHtcbiAgcmV0dXJuIG1lc3NhZ2Uubm9kZXMubWFwKG5vZGUgPT4gbm9kZS52aXNpdChzZXJpYWxpemVyVmlzaXRvciwgbnVsbCkpLmpvaW4oJycpO1xufVxuIl19