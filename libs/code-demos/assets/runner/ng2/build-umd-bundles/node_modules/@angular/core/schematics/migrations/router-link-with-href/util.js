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
        define("@angular/core/schematics/migrations/router-link-with-href/util", ["require", "exports", "typescript", "@angular/core/schematics/utils/typescript/imports", "@angular/core/schematics/utils/typescript/nodes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.migrateFile = exports.routerModule = exports.routerLinkWithHref = exports.routerLink = void 0;
    const typescript_1 = __importDefault(require("typescript"));
    const imports_1 = require("@angular/core/schematics/utils/typescript/imports");
    const nodes_1 = require("@angular/core/schematics/utils/typescript/nodes");
    exports.routerLink = 'RouterLink';
    exports.routerLinkWithHref = 'RouterLinkWithHref';
    exports.routerModule = '@angular/router';
    function migrateFile(sourceFile, typeChecker, rewrite) {
        const routerLinkWithHrefSpec = (0, imports_1.getImportSpecifier)(sourceFile, exports.routerModule, exports.routerLinkWithHref);
        // No `RouterLinkWithHref` found, nothing to migrate, exit early.
        if (routerLinkWithHrefSpec === null)
            return;
        let rewrites = findUsages(sourceFile, typeChecker);
        // There are some usages of the `RouterLinkWithHref` symbol, which need to
        // be rewritten to `RouterLink` instead. Let's check if the `RouterLink` is
        // already imported.
        const routerLinkSpec = (0, imports_1.getImportSpecifier)(sourceFile, exports.routerModule, exports.routerLink);
        if (routerLinkSpec) {
            // The `RouterLink` symbol is already imported, just drop the `RouterLinkWithHref` one.
            const routerLinkNamedImports = routerLinkWithHrefSpec ?
                (0, nodes_1.closestNode)(routerLinkWithHrefSpec, typescript_1.default.SyntaxKind.NamedImports) :
                null;
            if (routerLinkNamedImports !== null) {
                // Given an original import like this one:
                // ```
                // import {RouterModule, RouterLinkWithHref, RouterLink} from '@angular/router';
                // ```
                // The code below removes the `RouterLinkWithHref` from the named imports section
                // (i.e. `{RouterModule, RouterLinkWithHref, RouterLink}`) and prints an updated
                // version (`{RouterModule, RouterLink}`) to a string, which is used as a
                // replacement.
                const rewrittenNamedImports = (0, imports_1.removeSymbolFromNamedImports)(routerLinkNamedImports, routerLinkWithHrefSpec);
                const printer = typescript_1.default.createPrinter();
                const replacement = printer.printNode(typescript_1.default.EmitHint.Unspecified, rewrittenNamedImports, sourceFile);
                rewrites.push({
                    startPos: routerLinkNamedImports.getStart(),
                    width: routerLinkNamedImports.getWidth(),
                    replacement: replacement,
                });
            }
        }
        else {
            // The `RouterLink` symbol is not imported, but the `RouterLinkWithHref` is imported,
            // so rewrite `RouterLinkWithHref` -> `RouterLink`.
            rewrites.push({
                startPos: routerLinkWithHrefSpec.getStart(),
                width: routerLinkWithHrefSpec.getWidth(),
                replacement: exports.routerLink,
            });
        }
        // Process rewrites last-to-first (based on start pos) to avoid offset shifts during rewrites.
        rewrites = sortByStartPosDescending(rewrites);
        for (const usage of rewrites) {
            rewrite(usage.startPos, usage.width, usage.replacement);
        }
    }
    exports.migrateFile = migrateFile;
    function findUsages(sourceFile, typeChecker) {
        const usages = [];
        const visitNode = (node) => {
            if (typescript_1.default.isImportSpecifier(node)) {
                // Skip this node and all of its children; imports are a special case.
                return;
            }
            if (typescript_1.default.isIdentifier(node)) {
                const importIdentifier = (0, imports_1.getImportOfIdentifier)(typeChecker, node);
                if ((importIdentifier === null || importIdentifier === void 0 ? void 0 : importIdentifier.importModule) === exports.routerModule &&
                    importIdentifier.name === exports.routerLinkWithHref) {
                    usages.push({
                        startPos: node.getStart(),
                        width: node.getWidth(),
                        replacement: exports.routerLink,
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc2NoZW1hdGljcy9taWdyYXRpb25zL3JvdXRlci1saW5rLXdpdGgtaHJlZi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7OztJQUVILDREQUE0QjtJQUU1QiwrRUFBdUg7SUFDdkgsMkVBQXlEO0lBRTVDLFFBQUEsVUFBVSxHQUFHLFlBQVksQ0FBQztJQUMxQixRQUFBLGtCQUFrQixHQUFHLG9CQUFvQixDQUFDO0lBQzFDLFFBQUEsWUFBWSxHQUFHLGlCQUFpQixDQUFDO0lBVTlDLFNBQWdCLFdBQVcsQ0FDdkIsVUFBeUIsRUFBRSxXQUEyQixFQUFFLE9BQWtCO1FBQzVFLE1BQU0sc0JBQXNCLEdBQUcsSUFBQSw0QkFBa0IsRUFBQyxVQUFVLEVBQUUsb0JBQVksRUFBRSwwQkFBa0IsQ0FBQyxDQUFDO1FBRWhHLGlFQUFpRTtRQUNqRSxJQUFJLHNCQUFzQixLQUFLLElBQUk7WUFBRSxPQUFPO1FBRTVDLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFbkQsMEVBQTBFO1FBQzFFLDJFQUEyRTtRQUMzRSxvQkFBb0I7UUFDcEIsTUFBTSxjQUFjLEdBQUcsSUFBQSw0QkFBa0IsRUFBQyxVQUFVLEVBQUUsb0JBQVksRUFBRSxrQkFBVSxDQUFDLENBQUM7UUFFaEYsSUFBSSxjQUFjLEVBQUU7WUFDbEIsdUZBQXVGO1lBQ3ZGLE1BQU0sc0JBQXNCLEdBQUcsc0JBQXNCLENBQUMsQ0FBQztnQkFDbkQsSUFBQSxtQkFBVyxFQUFrQixzQkFBc0IsRUFBRSxvQkFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixJQUFJLENBQUM7WUFDVCxJQUFJLHNCQUFzQixLQUFLLElBQUksRUFBRTtnQkFDbkMsMENBQTBDO2dCQUMxQyxNQUFNO2dCQUNOLGdGQUFnRjtnQkFDaEYsTUFBTTtnQkFDTixpRkFBaUY7Z0JBQ2pGLGdGQUFnRjtnQkFDaEYseUVBQXlFO2dCQUN6RSxlQUFlO2dCQUNmLE1BQU0scUJBQXFCLEdBQ3ZCLElBQUEsc0NBQTRCLEVBQUMsc0JBQXNCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztnQkFDakYsTUFBTSxPQUFPLEdBQUcsb0JBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxXQUFXLEdBQ2IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxvQkFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2xGLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ1osUUFBUSxFQUFFLHNCQUFzQixDQUFDLFFBQVEsRUFBRTtvQkFDM0MsS0FBSyxFQUFFLHNCQUFzQixDQUFDLFFBQVEsRUFBRTtvQkFDeEMsV0FBVyxFQUFFLFdBQVc7aUJBQ3pCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7YUFBTTtZQUNMLHFGQUFxRjtZQUNyRixtREFBbUQ7WUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDWixRQUFRLEVBQUUsc0JBQXNCLENBQUMsUUFBUSxFQUFFO2dCQUMzQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsUUFBUSxFQUFFO2dCQUN4QyxXQUFXLEVBQUUsa0JBQVU7YUFDeEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCw4RkFBOEY7UUFDOUYsUUFBUSxHQUFHLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLEtBQUssTUFBTSxLQUFLLElBQUksUUFBUSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQXRERCxrQ0FzREM7SUFFRCxTQUFTLFVBQVUsQ0FBQyxVQUF5QixFQUFFLFdBQTJCO1FBQ3hFLE1BQU0sTUFBTSxHQUFvQixFQUFFLENBQUM7UUFDbkMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFhLEVBQUUsRUFBRTtZQUNsQyxJQUFJLG9CQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLHNFQUFzRTtnQkFDdEUsT0FBTzthQUNSO1lBQ0QsSUFBSSxvQkFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLCtCQUFxQixFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFBLGdCQUFnQixhQUFoQixnQkFBZ0IsdUJBQWhCLGdCQUFnQixDQUFFLFlBQVksTUFBSyxvQkFBWTtvQkFDL0MsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLDBCQUFrQixFQUFFO29CQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNWLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDdEIsV0FBVyxFQUFFLGtCQUFVO3FCQUN4QixDQUFDLENBQUM7aUJBQ0o7YUFDRjtZQUNELG9CQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUM7UUFDRixvQkFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLHdCQUF3QixDQUFDLFFBQXlCO1FBQ3pELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge2dldEltcG9ydE9mSWRlbnRpZmllciwgZ2V0SW1wb3J0U3BlY2lmaWVyLCByZW1vdmVTeW1ib2xGcm9tTmFtZWRJbXBvcnRzfSBmcm9tICcuLi8uLi91dGlscy90eXBlc2NyaXB0L2ltcG9ydHMnO1xuaW1wb3J0IHtjbG9zZXN0Tm9kZX0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXNjcmlwdC9ub2Rlcyc7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXJMaW5rID0gJ1JvdXRlckxpbmsnO1xuZXhwb3J0IGNvbnN0IHJvdXRlckxpbmtXaXRoSHJlZiA9ICdSb3V0ZXJMaW5rV2l0aEhyZWYnO1xuZXhwb3J0IGNvbnN0IHJvdXRlck1vZHVsZSA9ICdAYW5ndWxhci9yb3V0ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJld3JpdGVFbnRpdHkge1xuICBzdGFydFBvczogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICByZXBsYWNlbWVudDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBSZXdyaXRlRm4gPSAoc3RhcnRQb3M6IG51bWJlciwgd2lkdGg6IG51bWJlciwgdGV4dDogc3RyaW5nKSA9PiB2b2lkO1xuXG5leHBvcnQgZnVuY3Rpb24gbWlncmF0ZUZpbGUoXG4gICAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgdHlwZUNoZWNrZXI6IHRzLlR5cGVDaGVja2VyLCByZXdyaXRlOiBSZXdyaXRlRm4pIHtcbiAgY29uc3Qgcm91dGVyTGlua1dpdGhIcmVmU3BlYyA9IGdldEltcG9ydFNwZWNpZmllcihzb3VyY2VGaWxlLCByb3V0ZXJNb2R1bGUsIHJvdXRlckxpbmtXaXRoSHJlZik7XG5cbiAgLy8gTm8gYFJvdXRlckxpbmtXaXRoSHJlZmAgZm91bmQsIG5vdGhpbmcgdG8gbWlncmF0ZSwgZXhpdCBlYXJseS5cbiAgaWYgKHJvdXRlckxpbmtXaXRoSHJlZlNwZWMgPT09IG51bGwpIHJldHVybjtcblxuICBsZXQgcmV3cml0ZXMgPSBmaW5kVXNhZ2VzKHNvdXJjZUZpbGUsIHR5cGVDaGVja2VyKTtcblxuICAvLyBUaGVyZSBhcmUgc29tZSB1c2FnZXMgb2YgdGhlIGBSb3V0ZXJMaW5rV2l0aEhyZWZgIHN5bWJvbCwgd2hpY2ggbmVlZCB0b1xuICAvLyBiZSByZXdyaXR0ZW4gdG8gYFJvdXRlckxpbmtgIGluc3RlYWQuIExldCdzIGNoZWNrIGlmIHRoZSBgUm91dGVyTGlua2AgaXNcbiAgLy8gYWxyZWFkeSBpbXBvcnRlZC5cbiAgY29uc3Qgcm91dGVyTGlua1NwZWMgPSBnZXRJbXBvcnRTcGVjaWZpZXIoc291cmNlRmlsZSwgcm91dGVyTW9kdWxlLCByb3V0ZXJMaW5rKTtcblxuICBpZiAocm91dGVyTGlua1NwZWMpIHtcbiAgICAvLyBUaGUgYFJvdXRlckxpbmtgIHN5bWJvbCBpcyBhbHJlYWR5IGltcG9ydGVkLCBqdXN0IGRyb3AgdGhlIGBSb3V0ZXJMaW5rV2l0aEhyZWZgIG9uZS5cbiAgICBjb25zdCByb3V0ZXJMaW5rTmFtZWRJbXBvcnRzID0gcm91dGVyTGlua1dpdGhIcmVmU3BlYyA/XG4gICAgICAgIGNsb3Nlc3ROb2RlPHRzLk5hbWVkSW1wb3J0cz4ocm91dGVyTGlua1dpdGhIcmVmU3BlYywgdHMuU3ludGF4S2luZC5OYW1lZEltcG9ydHMpIDpcbiAgICAgICAgbnVsbDtcbiAgICBpZiAocm91dGVyTGlua05hbWVkSW1wb3J0cyAhPT0gbnVsbCkge1xuICAgICAgLy8gR2l2ZW4gYW4gb3JpZ2luYWwgaW1wb3J0IGxpa2UgdGhpcyBvbmU6XG4gICAgICAvLyBgYGBcbiAgICAgIC8vIGltcG9ydCB7Um91dGVyTW9kdWxlLCBSb3V0ZXJMaW5rV2l0aEhyZWYsIFJvdXRlckxpbmt9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG4gICAgICAvLyBgYGBcbiAgICAgIC8vIFRoZSBjb2RlIGJlbG93IHJlbW92ZXMgdGhlIGBSb3V0ZXJMaW5rV2l0aEhyZWZgIGZyb20gdGhlIG5hbWVkIGltcG9ydHMgc2VjdGlvblxuICAgICAgLy8gKGkuZS4gYHtSb3V0ZXJNb2R1bGUsIFJvdXRlckxpbmtXaXRoSHJlZiwgUm91dGVyTGlua31gKSBhbmQgcHJpbnRzIGFuIHVwZGF0ZWRcbiAgICAgIC8vIHZlcnNpb24gKGB7Um91dGVyTW9kdWxlLCBSb3V0ZXJMaW5rfWApIHRvIGEgc3RyaW5nLCB3aGljaCBpcyB1c2VkIGFzIGFcbiAgICAgIC8vIHJlcGxhY2VtZW50LlxuICAgICAgY29uc3QgcmV3cml0dGVuTmFtZWRJbXBvcnRzID1cbiAgICAgICAgICByZW1vdmVTeW1ib2xGcm9tTmFtZWRJbXBvcnRzKHJvdXRlckxpbmtOYW1lZEltcG9ydHMsIHJvdXRlckxpbmtXaXRoSHJlZlNwZWMpO1xuICAgICAgY29uc3QgcHJpbnRlciA9IHRzLmNyZWF0ZVByaW50ZXIoKTtcbiAgICAgIGNvbnN0IHJlcGxhY2VtZW50ID1cbiAgICAgICAgICBwcmludGVyLnByaW50Tm9kZSh0cy5FbWl0SGludC5VbnNwZWNpZmllZCwgcmV3cml0dGVuTmFtZWRJbXBvcnRzLCBzb3VyY2VGaWxlKTtcbiAgICAgIHJld3JpdGVzLnB1c2goe1xuICAgICAgICBzdGFydFBvczogcm91dGVyTGlua05hbWVkSW1wb3J0cy5nZXRTdGFydCgpLFxuICAgICAgICB3aWR0aDogcm91dGVyTGlua05hbWVkSW1wb3J0cy5nZXRXaWR0aCgpLFxuICAgICAgICByZXBsYWNlbWVudDogcmVwbGFjZW1lbnQsXG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhlIGBSb3V0ZXJMaW5rYCBzeW1ib2wgaXMgbm90IGltcG9ydGVkLCBidXQgdGhlIGBSb3V0ZXJMaW5rV2l0aEhyZWZgIGlzIGltcG9ydGVkLFxuICAgIC8vIHNvIHJld3JpdGUgYFJvdXRlckxpbmtXaXRoSHJlZmAgLT4gYFJvdXRlckxpbmtgLlxuICAgIHJld3JpdGVzLnB1c2goe1xuICAgICAgc3RhcnRQb3M6IHJvdXRlckxpbmtXaXRoSHJlZlNwZWMuZ2V0U3RhcnQoKSxcbiAgICAgIHdpZHRoOiByb3V0ZXJMaW5rV2l0aEhyZWZTcGVjLmdldFdpZHRoKCksXG4gICAgICByZXBsYWNlbWVudDogcm91dGVyTGluayxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFByb2Nlc3MgcmV3cml0ZXMgbGFzdC10by1maXJzdCAoYmFzZWQgb24gc3RhcnQgcG9zKSB0byBhdm9pZCBvZmZzZXQgc2hpZnRzIGR1cmluZyByZXdyaXRlcy5cbiAgcmV3cml0ZXMgPSBzb3J0QnlTdGFydFBvc0Rlc2NlbmRpbmcocmV3cml0ZXMpO1xuICBmb3IgKGNvbnN0IHVzYWdlIG9mIHJld3JpdGVzKSB7XG4gICAgcmV3cml0ZSh1c2FnZS5zdGFydFBvcywgdXNhZ2Uud2lkdGgsIHVzYWdlLnJlcGxhY2VtZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kVXNhZ2VzKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlcik6IFJld3JpdGVFbnRpdHlbXSB7XG4gIGNvbnN0IHVzYWdlczogUmV3cml0ZUVudGl0eVtdID0gW107XG4gIGNvbnN0IHZpc2l0Tm9kZSA9IChub2RlOiB0cy5Ob2RlKSA9PiB7XG4gICAgaWYgKHRzLmlzSW1wb3J0U3BlY2lmaWVyKG5vZGUpKSB7XG4gICAgICAvLyBTa2lwIHRoaXMgbm9kZSBhbmQgYWxsIG9mIGl0cyBjaGlsZHJlbjsgaW1wb3J0cyBhcmUgYSBzcGVjaWFsIGNhc2UuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0cy5pc0lkZW50aWZpZXIobm9kZSkpIHtcbiAgICAgIGNvbnN0IGltcG9ydElkZW50aWZpZXIgPSBnZXRJbXBvcnRPZklkZW50aWZpZXIodHlwZUNoZWNrZXIsIG5vZGUpO1xuICAgICAgaWYgKGltcG9ydElkZW50aWZpZXI/LmltcG9ydE1vZHVsZSA9PT0gcm91dGVyTW9kdWxlICYmXG4gICAgICAgICAgaW1wb3J0SWRlbnRpZmllci5uYW1lID09PSByb3V0ZXJMaW5rV2l0aEhyZWYpIHtcbiAgICAgICAgdXNhZ2VzLnB1c2goe1xuICAgICAgICAgIHN0YXJ0UG9zOiBub2RlLmdldFN0YXJ0KCksXG4gICAgICAgICAgd2lkdGg6IG5vZGUuZ2V0V2lkdGgoKSxcbiAgICAgICAgICByZXBsYWNlbWVudDogcm91dGVyTGluayxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRzLmZvckVhY2hDaGlsZChub2RlLCB2aXNpdE5vZGUpO1xuICB9O1xuICB0cy5mb3JFYWNoQ2hpbGQoc291cmNlRmlsZSwgdmlzaXROb2RlKTtcbiAgcmV0dXJuIHVzYWdlcztcbn1cblxuLyoqXG4gKiBTb3J0IGFsbCBmb3VuZCB1c2FnZXMgYmFzZWQgb24gdGhlaXIgc3RhcnQgcG9zaXRpb25zIGluIHRoZSBzb3VyY2UgZmlsZSBpbiBkZXNjZW5kaW5nIG9yZGVyIChpLmUuXG4gKiBsYXN0IHVzYWdlIGdvZXMgZmlyc3Qgb24gdGhlIGxpc3QsIGV0YykuIFRoaXMgaXMgbmVlZGVkIHRvIGF2b2lkIHNoaWZ0aW5nIG9mZnNldHMgaW4gdGhlIHNvdXJjZVxuICogZmlsZSAoaW4gY2FzZSB0aGVyZSBhcmUgbXVsdGlwbGUgdXNhZ2VzKSBhcyB3ZSByZXdyaXRlIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIHNvcnRCeVN0YXJ0UG9zRGVzY2VuZGluZyhyZXdyaXRlczogUmV3cml0ZUVudGl0eVtdKTogUmV3cml0ZUVudGl0eVtdIHtcbiAgcmV0dXJuIHJld3JpdGVzLnNvcnQoKGVudGl0eUEsIGVudGl0eUIpID0+IGVudGl0eUIuc3RhcnRQb3MgLSBlbnRpdHlBLnN0YXJ0UG9zKTtcbn1cbiJdfQ==