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
        define("@angular/core/schematics/migrations/entry-components/util", ["require", "exports", "typescript", "@angular/core/schematics/utils/typescript/decorators"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.migrateEntryComponentsUsages = void 0;
    const typescript_1 = __importDefault(require("typescript"));
    const decorators_1 = require("@angular/core/schematics/utils/typescript/decorators");
    /** Finds and migrates all Angular decorators that pass in `entryComponents`. */
    function migrateEntryComponentsUsages(typeChecker, printer, sourceFile) {
        const results = [];
        sourceFile.forEachChild(function walk(node) {
            if (typescript_1.default.isDecorator(node) && typescript_1.default.isCallExpression(node.expression) &&
                node.expression.arguments.length === 1 &&
                typescript_1.default.isObjectLiteralExpression(node.expression.arguments[0])) {
                const analysis = (0, decorators_1.getCallDecoratorImport)(typeChecker, node);
                if (analysis && analysis.importModule === '@angular/core' &&
                    (analysis.name === 'Component' || analysis.name === 'NgModule')) {
                    const literal = node.expression.arguments[0];
                    const entryComponentsProp = literal.properties.find(property => typescript_1.default.isPropertyAssignment(property) && typescript_1.default.isIdentifier(property.name) &&
                        property.name.text === 'entryComponents');
                    if (entryComponentsProp) {
                        const replacementNode = typescript_1.default.factory.updateObjectLiteralExpression(literal, literal.properties.filter(prop => prop !== entryComponentsProp));
                        results.push({
                            start: literal.getStart(),
                            length: literal.getWidth(),
                            end: literal.getEnd(),
                            replacement: printer.printNode(typescript_1.default.EmitHint.Unspecified, replacementNode, sourceFile)
                        });
                    }
                }
            }
            node.forEachChild(walk);
        });
        // Sort the operations in reverse order in order to avoid
        // issues when migrating multiple usages within the same file.
        return results.sort((a, b) => b.start - a.start);
    }
    exports.migrateEntryComponentsUsages = migrateEntryComponentsUsages;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc2NoZW1hdGljcy9taWdyYXRpb25zL2VudHJ5LWNvbXBvbmVudHMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFSCw0REFBNEI7SUFFNUIscUZBQXlFO0lBRXpFLGdGQUFnRjtJQUNoRixTQUFnQiw0QkFBNEIsQ0FDeEMsV0FBMkIsRUFBRSxPQUFtQixFQUFFLFVBQXlCO1FBQzdFLE1BQU0sT0FBTyxHQUF3RSxFQUFFLENBQUM7UUFFeEYsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFhO1lBQ2pELElBQUksb0JBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDdEMsb0JBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM5RCxNQUFNLFFBQVEsR0FBRyxJQUFBLG1DQUFzQixFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFlBQVksS0FBSyxlQUFlO29CQUNyRCxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLEVBQUU7b0JBQ25FLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxNQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUMvQyxRQUFRLENBQUMsRUFBRSxDQUFDLG9CQUFFLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksb0JBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDM0UsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsQ0FBQztvQkFFbEQsSUFBSSxtQkFBbUIsRUFBRTt3QkFDdkIsTUFBTSxlQUFlLEdBQUcsb0JBQUUsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQzVELE9BQU8sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7d0JBRTlFLE9BQU8sQ0FBQyxJQUFJLENBQUM7NEJBQ1gsS0FBSyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7NEJBQ3pCLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFOzRCQUMxQixHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRTs0QkFDckIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsb0JBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7eUJBQ3JGLENBQUMsQ0FBQztxQkFDSjtpQkFDRjthQUNGO1lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUVILHlEQUF5RDtRQUN6RCw4REFBOEQ7UUFDOUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQXJDRCxvRUFxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge2dldENhbGxEZWNvcmF0b3JJbXBvcnR9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzY3JpcHQvZGVjb3JhdG9ycyc7XG5cbi8qKiBGaW5kcyBhbmQgbWlncmF0ZXMgYWxsIEFuZ3VsYXIgZGVjb3JhdG9ycyB0aGF0IHBhc3MgaW4gYGVudHJ5Q29tcG9uZW50c2AuICovXG5leHBvcnQgZnVuY3Rpb24gbWlncmF0ZUVudHJ5Q29tcG9uZW50c1VzYWdlcyhcbiAgICB0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIsIHByaW50ZXI6IHRzLlByaW50ZXIsIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpIHtcbiAgY29uc3QgcmVzdWx0czoge3N0YXJ0OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBlbmQ6IG51bWJlciwgcmVwbGFjZW1lbnQ6IHN0cmluZ31bXSA9IFtdO1xuXG4gIHNvdXJjZUZpbGUuZm9yRWFjaENoaWxkKGZ1bmN0aW9uIHdhbGsobm9kZTogdHMuTm9kZSkge1xuICAgIGlmICh0cy5pc0RlY29yYXRvcihub2RlKSAmJiB0cy5pc0NhbGxFeHByZXNzaW9uKG5vZGUuZXhwcmVzc2lvbikgJiZcbiAgICAgICAgbm9kZS5leHByZXNzaW9uLmFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgdHMuaXNPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihub2RlLmV4cHJlc3Npb24uYXJndW1lbnRzWzBdKSkge1xuICAgICAgY29uc3QgYW5hbHlzaXMgPSBnZXRDYWxsRGVjb3JhdG9ySW1wb3J0KHR5cGVDaGVja2VyLCBub2RlKTtcblxuICAgICAgaWYgKGFuYWx5c2lzICYmIGFuYWx5c2lzLmltcG9ydE1vZHVsZSA9PT0gJ0Bhbmd1bGFyL2NvcmUnICYmXG4gICAgICAgICAgKGFuYWx5c2lzLm5hbWUgPT09ICdDb21wb25lbnQnIHx8IGFuYWx5c2lzLm5hbWUgPT09ICdOZ01vZHVsZScpKSB7XG4gICAgICAgIGNvbnN0IGxpdGVyYWwgPSBub2RlLmV4cHJlc3Npb24uYXJndW1lbnRzWzBdO1xuICAgICAgICBjb25zdCBlbnRyeUNvbXBvbmVudHNQcm9wID0gbGl0ZXJhbC5wcm9wZXJ0aWVzLmZpbmQoXG4gICAgICAgICAgICBwcm9wZXJ0eSA9PiB0cy5pc1Byb3BlcnR5QXNzaWdubWVudChwcm9wZXJ0eSkgJiYgdHMuaXNJZGVudGlmaWVyKHByb3BlcnR5Lm5hbWUpICYmXG4gICAgICAgICAgICAgICAgcHJvcGVydHkubmFtZS50ZXh0ID09PSAnZW50cnlDb21wb25lbnRzJyk7XG5cbiAgICAgICAgaWYgKGVudHJ5Q29tcG9uZW50c1Byb3ApIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlbWVudE5vZGUgPSB0cy5mYWN0b3J5LnVwZGF0ZU9iamVjdExpdGVyYWxFeHByZXNzaW9uKFxuICAgICAgICAgICAgICBsaXRlcmFsLCBsaXRlcmFsLnByb3BlcnRpZXMuZmlsdGVyKHByb3AgPT4gcHJvcCAhPT0gZW50cnlDb21wb25lbnRzUHJvcCkpO1xuXG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgIHN0YXJ0OiBsaXRlcmFsLmdldFN0YXJ0KCksXG4gICAgICAgICAgICBsZW5ndGg6IGxpdGVyYWwuZ2V0V2lkdGgoKSxcbiAgICAgICAgICAgIGVuZDogbGl0ZXJhbC5nZXRFbmQoKSxcbiAgICAgICAgICAgIHJlcGxhY2VtZW50OiBwcmludGVyLnByaW50Tm9kZSh0cy5FbWl0SGludC5VbnNwZWNpZmllZCwgcmVwbGFjZW1lbnROb2RlLCBzb3VyY2VGaWxlKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbm9kZS5mb3JFYWNoQ2hpbGQod2Fsayk7XG4gIH0pO1xuXG4gIC8vIFNvcnQgdGhlIG9wZXJhdGlvbnMgaW4gcmV2ZXJzZSBvcmRlciBpbiBvcmRlciB0byBhdm9pZFxuICAvLyBpc3N1ZXMgd2hlbiBtaWdyYXRpbmcgbXVsdGlwbGUgdXNhZ2VzIHdpdGhpbiB0aGUgc2FtZSBmaWxlLlxuICByZXR1cm4gcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBiLnN0YXJ0IC0gYS5zdGFydCk7XG59XG4iXX0=