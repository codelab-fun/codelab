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
        define("@angular/core/schematics/migrations/path-match-type/util", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findExpressionsToMigrate = void 0;
    const typescript_1 = __importDefault(require("typescript"));
    function findExpressionsToMigrate(sourceFile, importManager) {
        const migratedNodesMap = new Map();
        let _currentVariableDecl = null;
        (() => {
            sourceFile.forEachChild(function visitNode(node) {
                if (typescript_1.default.isVariableDeclaration(node)) {
                    _currentVariableDecl = node;
                    node.forEachChild(visitNode);
                    _currentVariableDecl = null;
                }
                if (isRouteOrRoutesVariableDeclaration(node)) {
                    // The variable declaration is already explicitly typed as `Route` or `Routes` so it does
                    // not need a migration.
                    return;
                }
                else if (typescript_1.default.isObjectLiteralExpression(node)) {
                    if (_currentVariableDecl !== null && _currentVariableDecl.type === undefined) {
                        visitObjectLiteral(node);
                    }
                }
                else {
                    node.forEachChild(visitNode);
                }
            });
            function visitObjectLiteral(obj) {
                const hasPathMatch = obj.properties.some(p => isPropertyWithName(p, 'pathMatch'));
                const hasPath = obj.properties.some(p => isPropertyWithName(p, 'path'));
                const childrenProperty = obj.properties.find(p => isPropertyWithName(p, 'children'));
                // The object must have _both_ pathMatch _and_ path for us to be reasonably sure that it's
                // a `Route` definition.
                if (hasPath && hasPathMatch) {
                    updateCurrentVariableDeclaration();
                }
                else if (childrenProperty !== undefined && typescript_1.default.isPropertyAssignment(childrenProperty) &&
                    typescript_1.default.isArrayLiteralExpression(childrenProperty.initializer)) {
                    // Also need to check the children if it exists
                    for (const child of childrenProperty.initializer.elements) {
                        if (typescript_1.default.isObjectLiteralExpression(child)) {
                            visitObjectLiteral(child);
                            // If the child caused a migration, we can exit early
                            if (_currentVariableDecl && migratedNodesMap.has(_currentVariableDecl)) {
                                break;
                            }
                        }
                    }
                }
            }
            function isPropertyWithName(p, name) {
                if (typescript_1.default.isPropertyAssignment(p)) {
                    return p.name.getText() === name;
                }
                else if (typescript_1.default.isShorthandPropertyAssignment(p)) {
                    return p.name.getText() === name;
                }
                else {
                    // Don't attempt to migrate edge case spreadAssignment
                    return false;
                }
            }
            function updateCurrentVariableDeclaration() {
                if (_currentVariableDecl === null || _currentVariableDecl.initializer === undefined) {
                    return;
                }
                let typeToUse;
                if (typescript_1.default.isArrayLiteralExpression(_currentVariableDecl.initializer)) {
                    typeToUse = importManager.addImportToSourceFile(sourceFile, 'Routes', '@angular/router');
                }
                else {
                    typeToUse = importManager.addImportToSourceFile(sourceFile, 'Route', '@angular/router');
                }
                const migrated = typescript_1.default.factory.updateVariableDeclaration(_currentVariableDecl, _currentVariableDecl.name, _currentVariableDecl.exclamationToken, typeToUse, _currentVariableDecl.initializer);
                migratedNodesMap.set(_currentVariableDecl, migrated);
            }
        })();
        return migratedNodesMap;
    }
    exports.findExpressionsToMigrate = findExpressionsToMigrate;
    function isRouteOrRoutesVariableDeclaration(node) {
        return typescript_1.default.isVariableDeclaration(node) && node.type &&
            (node.type.getText() === 'Route' || node.type.getText() === 'Routes');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc2NoZW1hdGljcy9taWdyYXRpb25zL3BhdGgtbWF0Y2gtdHlwZS91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7OztJQUVILDREQUE0QjtJQUs1QixTQUFnQix3QkFBd0IsQ0FBQyxVQUF5QixFQUFFLGFBQTRCO1FBQzlGLE1BQU0sZ0JBQWdCLEdBQXdELElBQUksR0FBRyxFQUFFLENBQUM7UUFDeEYsSUFBSSxvQkFBb0IsR0FBZ0MsSUFBSSxDQUFDO1FBQzdELENBQUMsR0FBRyxFQUFFO1lBQ0osVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLFNBQVMsQ0FBQyxJQUFhO2dCQUN0RCxJQUFJLG9CQUFFLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2xDLG9CQUFvQixHQUFHLElBQUksQ0FBQztvQkFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0Isb0JBQW9CLEdBQUcsSUFBSSxDQUFDO2lCQUM3QjtnQkFDRCxJQUFJLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM1Qyx5RkFBeUY7b0JBQ3pGLHdCQUF3QjtvQkFDeEIsT0FBTztpQkFDUjtxQkFBTSxJQUFJLG9CQUFFLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzdDLElBQUksb0JBQW9CLEtBQUssSUFBSSxJQUFJLG9CQUFvQixDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7d0JBQzVFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUMxQjtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM5QjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxrQkFBa0IsQ0FBQyxHQUErQjtn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LDREQStFQztJQUVELFNBQVMsa0NBQWtDLENBQUMsSUFBYTtRQUN2RCxPQUFPLG9CQUFFLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUk7WUFDOUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDO0lBQzVFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge0ltcG9ydE1hbmFnZXJ9IGZyb20gJy4uLy4uL3V0aWxzL2ltcG9ydF9tYW5hZ2VyJztcblxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEV4cHJlc3Npb25zVG9NaWdyYXRlKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIGltcG9ydE1hbmFnZXI6IEltcG9ydE1hbmFnZXIpIHtcbiAgY29uc3QgbWlncmF0ZWROb2Rlc01hcDogTWFwPHRzLlZhcmlhYmxlRGVjbGFyYXRpb24sIHRzLlZhcmlhYmxlRGVjbGFyYXRpb24+ID0gbmV3IE1hcCgpO1xuICBsZXQgX2N1cnJlbnRWYXJpYWJsZURlY2w6IHRzLlZhcmlhYmxlRGVjbGFyYXRpb258bnVsbCA9IG51bGw7XG4gICgoKSA9PiB7XG4gICAgc291cmNlRmlsZS5mb3JFYWNoQ2hpbGQoZnVuY3Rpb24gdmlzaXROb2RlKG5vZGU6IHRzLk5vZGUpIHtcbiAgICAgIGlmICh0cy5pc1ZhcmlhYmxlRGVjbGFyYXRpb24obm9kZSkpIHtcbiAgICAgICAgX2N1cnJlbnRWYXJpYWJsZURlY2wgPSBub2RlO1xuICAgICAgICBub2RlLmZvckVhY2hDaGlsZCh2aXNpdE5vZGUpO1xuICAgICAgICBfY3VycmVudFZhcmlhYmxlRGVjbCA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoaXNSb3V0ZU9yUm91dGVzVmFyaWFibGVEZWNsYXJhdGlvbihub2RlKSkge1xuICAgICAgICAvLyBUaGUgdmFyaWFibGUgZGVjbGFyYXRpb24gaXMgYWxyZWFkeSBleHBsaWNpdGx5IHR5cGVkIGFzIGBSb3V0ZWAgb3IgYFJvdXRlc2Agc28gaXQgZG9lc1xuICAgICAgICAvLyBub3QgbmVlZCBhIG1pZ3JhdGlvbi5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmICh0cy5pc09iamVjdExpdGVyYWxFeHByZXNzaW9uKG5vZGUpKSB7XG4gICAgICAgIGlmIChfY3VycmVudFZhcmlhYmxlRGVjbCAhPT0gbnVsbCAmJiBfY3VycmVudFZhcmlhYmxlRGVjbC50eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2aXNpdE9iamVjdExpdGVyYWwobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuZm9yRWFjaENoaWxkKHZpc2l0Tm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB2aXNpdE9iamVjdExpdGVyYWwob2JqOiB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbikge1xuICAgICAgY29uc3QgaGFzUGF0aE1hdGNoID0gb2JqLnByb3BlcnRpZXMuc29tZShwID0+IGlzUHJvcGVydHlXaXRoTmFtZShwLCAncGF0aE1hdGNoJykpO1xuICAgICAgY29uc3QgaGFzUGF0aCA9IG9iai5wcm9wZXJ0aWVzLnNvbWUocCA9PiBpc1Byb3BlcnR5V2l0aE5hbWUocCwgJ3BhdGgnKSk7XG4gICAgICBjb25zdCBjaGlsZHJlblByb3BlcnR5ID0gb2JqLnByb3BlcnRpZXMuZmluZChwID0+IGlzUHJvcGVydHlXaXRoTmFtZShwLCAnY2hpbGRyZW4nKSk7XG4gICAgICAvLyBUaGUgb2JqZWN0IG11c3QgaGF2ZSBfYm90aF8gcGF0aE1hdGNoIF9hbmRfIHBhdGggZm9yIHVzIHRvIGJlIHJlYXNvbmFibHkgc3VyZSB0aGF0IGl0J3NcbiAgICAgIC8vIGEgYFJvdXRlYCBkZWZpbml0aW9uLlxuICAgICAgaWYgKGhhc1BhdGggJiYgaGFzUGF0aE1hdGNoKSB7XG4gICAgICAgIHVwZGF0ZUN1cnJlbnRWYXJpYWJsZURlY2xhcmF0aW9uKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGNoaWxkcmVuUHJvcGVydHkgIT09IHVuZGVmaW5lZCAmJiB0cy5pc1Byb3BlcnR5QXNzaWdubWVudChjaGlsZHJlblByb3BlcnR5KSAmJlxuICAgICAgICAgIHRzLmlzQXJyYXlMaXRlcmFsRXhwcmVzc2lvbihjaGlsZHJlblByb3BlcnR5LmluaXRpYWxpemVyKSkge1xuICAgICAgICAvLyBBbHNvIG5lZWQgdG8gY2hlY2sgdGhlIGNoaWxkcmVuIGlmIGl0IGV4aXN0c1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuUHJvcGVydHkuaW5pdGlhbGl6ZXIuZWxlbWVudHMpIHtcbiAgICAgICAgICBpZiAodHMuaXNPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihjaGlsZCkpIHtcbiAgICAgICAgICAgIHZpc2l0T2JqZWN0TGl0ZXJhbChjaGlsZCk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgY2hpbGQgY2F1c2VkIGEgbWlncmF0aW9uLCB3ZSBjYW4gZXhpdCBlYXJseVxuICAgICAgICAgICAgaWYgKF9jdXJyZW50VmFyaWFibGVEZWNsICYmIG1pZ3JhdGVkTm9kZXNNYXAuaGFzKF9jdXJyZW50VmFyaWFibGVEZWNsKSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1Byb3BlcnR5V2l0aE5hbWUocDogdHMuT2JqZWN0TGl0ZXJhbEVsZW1lbnRMaWtlLCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgIGlmICh0cy5pc1Byb3BlcnR5QXNzaWdubWVudChwKSkge1xuICAgICAgICByZXR1cm4gcC5uYW1lLmdldFRleHQoKSA9PT0gbmFtZTtcbiAgICAgIH0gZWxzZSBpZiAodHMuaXNTaG9ydGhhbmRQcm9wZXJ0eUFzc2lnbm1lbnQocCkpIHtcbiAgICAgICAgcmV0dXJuIHAubmFtZS5nZXRUZXh0KCkgPT09IG5hbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEb24ndCBhdHRlbXB0IHRvIG1pZ3JhdGUgZWRnZSBjYXNlIHNwcmVhZEFzc2lnbm1lbnRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUN1cnJlbnRWYXJpYWJsZURlY2xhcmF0aW9uKCkge1xuICAgICAgaWYgKF9jdXJyZW50VmFyaWFibGVEZWNsID09PSBudWxsIHx8IF9jdXJyZW50VmFyaWFibGVEZWNsLmluaXRpYWxpemVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IHR5cGVUb1VzZTogdHMuVHlwZU5vZGU7XG4gICAgICBpZiAodHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKF9jdXJyZW50VmFyaWFibGVEZWNsLmluaXRpYWxpemVyKSkge1xuICAgICAgICB0eXBlVG9Vc2UgPSBpbXBvcnRNYW5hZ2VyLmFkZEltcG9ydFRvU291cmNlRmlsZShzb3VyY2VGaWxlLCAnUm91dGVzJywgJ0Bhbmd1bGFyL3JvdXRlcicpIGFzXG4gICAgICAgICAgICB1bmtub3duIGFzIHRzLlR5cGVOb2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZVRvVXNlID0gaW1wb3J0TWFuYWdlci5hZGRJbXBvcnRUb1NvdXJjZUZpbGUoc291cmNlRmlsZSwgJ1JvdXRlJywgJ0Bhbmd1bGFyL3JvdXRlcicpIGFzXG4gICAgICAgICAgICB1bmtub3duIGFzIHRzLlR5cGVOb2RlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtaWdyYXRlZCA9IHRzLmZhY3RvcnkudXBkYXRlVmFyaWFibGVEZWNsYXJhdGlvbihcbiAgICAgICAgICBfY3VycmVudFZhcmlhYmxlRGVjbCwgX2N1cnJlbnRWYXJpYWJsZURlY2wubmFtZSwgX2N1cnJlbnRWYXJpYWJsZURlY2wuZXhjbGFtYXRpb25Ub2tlbixcbiAgICAgICAgICB0eXBlVG9Vc2UsIF9jdXJyZW50VmFyaWFibGVEZWNsLmluaXRpYWxpemVyKTtcbiAgICAgIG1pZ3JhdGVkTm9kZXNNYXAuc2V0KF9jdXJyZW50VmFyaWFibGVEZWNsLCBtaWdyYXRlZCk7XG4gICAgfVxuICB9KSgpO1xuXG4gIHJldHVybiBtaWdyYXRlZE5vZGVzTWFwO1xufVxuXG5mdW5jdGlvbiBpc1JvdXRlT3JSb3V0ZXNWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGU6IHRzLk5vZGUpIHtcbiAgcmV0dXJuIHRzLmlzVmFyaWFibGVEZWNsYXJhdGlvbihub2RlKSAmJiBub2RlLnR5cGUgJiZcbiAgICAgIChub2RlLnR5cGUuZ2V0VGV4dCgpID09PSAnUm91dGUnIHx8IG5vZGUudHlwZS5nZXRUZXh0KCkgPT09ICdSb3V0ZXMnKTtcbn1cbiJdfQ==