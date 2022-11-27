/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/core/schematics/migrations/relative-link-resolution/util", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.migrateFile = void 0;
    const typescript_1 = __importDefault(require("typescript"));
    const relativeLinkResolution = 'relativeLinkResolution';
    const knownConfigValues = new Set([`'legacy'`, `'corrected'`]);
    function migrateFile(sourceFile, rewriteFn) {
        let rewrites = [];
        const usages = getUsages(sourceFile);
        for (const { objectLiteral, property } of usages) {
            const replacementNode = typescript_1.default.factory.updateObjectLiteralExpression(objectLiteral, objectLiteral.properties.filter(prop => prop !== property));
            const printer = typescript_1.default.createPrinter();
            const replacementText = printer.printNode(typescript_1.default.EmitHint.Unspecified, replacementNode, sourceFile);
            rewrites.push({
                startPos: objectLiteral.getStart(),
                width: objectLiteral.getWidth(),
                replacement: replacementText,
            });
        }
        // Process rewrites last-to-first (based on start pos) to avoid offset shifts during rewrites.
        rewrites = sortByStartPosDescending(rewrites);
        for (const rewrite of rewrites) {
            rewriteFn(rewrite.startPos, rewrite.width, rewrite.replacement);
        }
    }
    exports.migrateFile = migrateFile;
    function getUsages(sourceFile) {
        const usages = [];
        const visitNode = (node) => {
            if (typescript_1.default.isObjectLiteralExpression(node)) {
                // Look for patterns like the following:
                // ```
                // { ... relativeLinkResolution: 'legacy', ... }
                // ```
                // or:
                // ```
                // { ... relativeLinkResolution: 'corrected', ... }
                // ```
                // If the value is unknown (i.e. not 'legacy' or 'corrected'),
                // do not attempt to rewrite (this might be an application-specific
                // configuration, not a part of Router).
                const property = node.properties.find(prop => typescript_1.default.isPropertyAssignment(prop) && typescript_1.default.isIdentifier(prop.name) &&
                    prop.name.text === relativeLinkResolution &&
                    knownConfigValues.has(prop.initializer.getText()));
                if (property) {
                    usages.push({ objectLiteral: node, property });
                }
            }
            typescript_1.default.forEachChild(node, visitNode);
        };
        typescript_1.default.forEachChild(sourceFile, visitNode);
        return usages;
    }
    /**
     * Sort all found usages based on their start positions in the source file in descending order (i.e.
     * last usage goes first on the list, etc). This is needed to avoid shifting offsets in the source
     * file (in case there are multiple usages) as we rewrite symbols.
     */
    function sortByStartPosDescending(rewrites) {
        return rewrites.sort((entityA, entityB) => entityB.startPos - entityA.startPos);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc2NoZW1hdGljcy9taWdyYXRpb25zL3JlbGF0aXZlLWxpbmstcmVzb2x1dGlvbi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7OztJQUVILDREQUE0QjtJQUU1QixNQUFNLHNCQUFzQixHQUFHLHdCQUF3QixDQUFDO0lBQ3hELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztJQWUvRCxTQUFnQixXQUFXLENBQUMsVUFBeUIsRUFBRSxTQUFvQjtRQUN6RSxJQUFJLFFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBQ25DLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxLQUFLLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLElBQUksTUFBTSxFQUFFO1lBQzlDLE1BQU0sZUFBZSxHQUFHLG9CQUFFLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUM1RCxhQUFhLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvRSxNQUFNLE9BQU8sR0FBRyxvQkFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ25DLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsb0JBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNoRyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNaLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFO2dCQUNsQyxLQUFLLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRTtnQkFDL0IsV0FBVyxFQUFFLGVBQWU7YUFDN0IsQ0FBQyxDQUFDO1NBQ0o7UUFFRCw4RkFBOEY7UUFDOUYsUUFBUSxHQUFHLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLEtBQUssTUFBTSxPQUFPLElBQUksUUFBUSxFQUFFO1lBQzlCLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQXBCRCxrQ0FvQkM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxVQUF5QjtRQUMxQyxNQUFNLE1BQU0sR0FBcUIsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBYSxFQUFFLEVBQUU7WUFDbEMsSUFBSSxvQkFBRSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN0Qyx3Q0FBd0M7Z0JBQ3hDLE1BQU07Z0JBQ04sZ0RBQWdEO2dCQUNoRCxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixtREFBbUQ7Z0JBQ25ELE1BQU07Z0JBQ04sOERBQThEO2dCQUM5RCxtRUFBbUU7Z0JBQ25FLHdDQUF3QztnQkFDeEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxzQkFBc0I7b0JBQ3pDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxRQUFRLEVBQUU7b0JBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztpQkFDOUM7YUFDRjtZQUNELG9CQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUM7UUFDRixvQkFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLHdCQUF3QixDQUFDLFFBQXlCO1FBQ3pELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5jb25zdCByZWxhdGl2ZUxpbmtSZXNvbHV0aW9uID0gJ3JlbGF0aXZlTGlua1Jlc29sdXRpb24nO1xuY29uc3Qga25vd25Db25maWdWYWx1ZXMgPSBuZXcgU2V0KFtgJ2xlZ2FjeSdgLCBgJ2NvcnJlY3RlZCdgXSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV3cml0ZUVudGl0eSB7XG4gIHN0YXJ0UG9zOiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIHJlcGxhY2VtZW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWlncmF0YWJsZU5vZGUge1xuICBvYmplY3RMaXRlcmFsOiB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbjtcbiAgcHJvcGVydHk6IHRzLk9iamVjdExpdGVyYWxFbGVtZW50TGlrZTtcbn1cblxuZXhwb3J0IHR5cGUgUmV3cml0ZUZuID0gKHN0YXJ0UG9zOiBudW1iZXIsIG9yaWdMZW5ndGg6IG51bWJlciwgdGV4dDogc3RyaW5nKSA9PiB2b2lkO1xuXG5leHBvcnQgZnVuY3Rpb24gbWlncmF0ZUZpbGUoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgcmV3cml0ZUZuOiBSZXdyaXRlRm4pIHtcbiAgbGV0IHJld3JpdGVzOiBSZXdyaXRlRW50aXR5W10gPSBbXTtcbiAgY29uc3QgdXNhZ2VzID0gZ2V0VXNhZ2VzKHNvdXJjZUZpbGUpO1xuICBmb3IgKGNvbnN0IHtvYmplY3RMaXRlcmFsLCBwcm9wZXJ0eX0gb2YgdXNhZ2VzKSB7XG4gICAgY29uc3QgcmVwbGFjZW1lbnROb2RlID0gdHMuZmFjdG9yeS51cGRhdGVPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihcbiAgICAgICAgb2JqZWN0TGl0ZXJhbCwgb2JqZWN0TGl0ZXJhbC5wcm9wZXJ0aWVzLmZpbHRlcihwcm9wID0+IHByb3AgIT09IHByb3BlcnR5KSk7XG4gICAgY29uc3QgcHJpbnRlciA9IHRzLmNyZWF0ZVByaW50ZXIoKTtcbiAgICBjb25zdCByZXBsYWNlbWVudFRleHQgPSBwcmludGVyLnByaW50Tm9kZSh0cy5FbWl0SGludC5VbnNwZWNpZmllZCwgcmVwbGFjZW1lbnROb2RlLCBzb3VyY2VGaWxlKTtcbiAgICByZXdyaXRlcy5wdXNoKHtcbiAgICAgIHN0YXJ0UG9zOiBvYmplY3RMaXRlcmFsLmdldFN0YXJ0KCksXG4gICAgICB3aWR0aDogb2JqZWN0TGl0ZXJhbC5nZXRXaWR0aCgpLFxuICAgICAgcmVwbGFjZW1lbnQ6IHJlcGxhY2VtZW50VGV4dCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFByb2Nlc3MgcmV3cml0ZXMgbGFzdC10by1maXJzdCAoYmFzZWQgb24gc3RhcnQgcG9zKSB0byBhdm9pZCBvZmZzZXQgc2hpZnRzIGR1cmluZyByZXdyaXRlcy5cbiAgcmV3cml0ZXMgPSBzb3J0QnlTdGFydFBvc0Rlc2NlbmRpbmcocmV3cml0ZXMpO1xuICBmb3IgKGNvbnN0IHJld3JpdGUgb2YgcmV3cml0ZXMpIHtcbiAgICByZXdyaXRlRm4ocmV3cml0ZS5zdGFydFBvcywgcmV3cml0ZS53aWR0aCwgcmV3cml0ZS5yZXBsYWNlbWVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VXNhZ2VzKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBNaWdyYXRhYmxlTm9kZVtdIHtcbiAgY29uc3QgdXNhZ2VzOiBNaWdyYXRhYmxlTm9kZVtdID0gW107XG4gIGNvbnN0IHZpc2l0Tm9kZSA9IChub2RlOiB0cy5Ob2RlKSA9PiB7XG4gICAgaWYgKHRzLmlzT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24obm9kZSkpIHtcbiAgICAgIC8vIExvb2sgZm9yIHBhdHRlcm5zIGxpa2UgdGhlIGZvbGxvd2luZzpcbiAgICAgIC8vIGBgYFxuICAgICAgLy8geyAuLi4gcmVsYXRpdmVMaW5rUmVzb2x1dGlvbjogJ2xlZ2FjeScsIC4uLiB9XG4gICAgICAvLyBgYGBcbiAgICAgIC8vIG9yOlxuICAgICAgLy8gYGBgXG4gICAgICAvLyB7IC4uLiByZWxhdGl2ZUxpbmtSZXNvbHV0aW9uOiAnY29ycmVjdGVkJywgLi4uIH1cbiAgICAgIC8vIGBgYFxuICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIHVua25vd24gKGkuZS4gbm90ICdsZWdhY3knIG9yICdjb3JyZWN0ZWQnKSxcbiAgICAgIC8vIGRvIG5vdCBhdHRlbXB0IHRvIHJld3JpdGUgKHRoaXMgbWlnaHQgYmUgYW4gYXBwbGljYXRpb24tc3BlY2lmaWNcbiAgICAgIC8vIGNvbmZpZ3VyYXRpb24sIG5vdCBhIHBhcnQgb2YgUm91dGVyKS5cbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gbm9kZS5wcm9wZXJ0aWVzLmZpbmQoXG4gICAgICAgICAgcHJvcCA9PiB0cy5pc1Byb3BlcnR5QXNzaWdubWVudChwcm9wKSAmJiB0cy5pc0lkZW50aWZpZXIocHJvcC5uYW1lKSAmJlxuICAgICAgICAgICAgICBwcm9wLm5hbWUudGV4dCA9PT0gcmVsYXRpdmVMaW5rUmVzb2x1dGlvbiAmJlxuICAgICAgICAgICAgICBrbm93bkNvbmZpZ1ZhbHVlcy5oYXMocHJvcC5pbml0aWFsaXplci5nZXRUZXh0KCkpKTtcbiAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICB1c2FnZXMucHVzaCh7b2JqZWN0TGl0ZXJhbDogbm9kZSwgcHJvcGVydHl9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIHZpc2l0Tm9kZSk7XG4gIH07XG4gIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCB2aXNpdE5vZGUpO1xuICByZXR1cm4gdXNhZ2VzO1xufVxuXG4vKipcbiAqIFNvcnQgYWxsIGZvdW5kIHVzYWdlcyBiYXNlZCBvbiB0aGVpciBzdGFydCBwb3NpdGlvbnMgaW4gdGhlIHNvdXJjZSBmaWxlIGluIGRlc2NlbmRpbmcgb3JkZXIgKGkuZS5cbiAqIGxhc3QgdXNhZ2UgZ29lcyBmaXJzdCBvbiB0aGUgbGlzdCwgZXRjKS4gVGhpcyBpcyBuZWVkZWQgdG8gYXZvaWQgc2hpZnRpbmcgb2Zmc2V0cyBpbiB0aGUgc291cmNlXG4gKiBmaWxlIChpbiBjYXNlIHRoZXJlIGFyZSBtdWx0aXBsZSB1c2FnZXMpIGFzIHdlIHJld3JpdGUgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gc29ydEJ5U3RhcnRQb3NEZXNjZW5kaW5nKHJld3JpdGVzOiBSZXdyaXRlRW50aXR5W10pOiBSZXdyaXRlRW50aXR5W10ge1xuICByZXR1cm4gcmV3cml0ZXMuc29ydCgoZW50aXR5QSwgZW50aXR5QikgPT4gZW50aXR5Qi5zdGFydFBvcyAtIGVudGl0eUEuc3RhcnRQb3MpO1xufVxuIl19